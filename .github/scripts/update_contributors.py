import os
import re
import sys
import requests
from typing import List, Dict, Any, Optional

# Configuration
START_MARKER = "<!-- CONTRIBUTORS-START -->"
END_MARKER = "<!-- CONTRIBUTORS-END -->"
MAX_CONTRIBUTORS = int(os.environ.get("MAX_CONTRIBUTORS", "20"))
EXCLUDE_BOTS = os.environ.get("EXCLUDE_BOTS", "true").lower() == "true"
PER_ROW = int(os.environ.get("PER_ROW", "6"))

# Repository info
GITHUB_REPOSITORY = os.environ.get("GITHUB_REPOSITORY", "")  # e.g. "owner/repo"
if "/" in GITHUB_REPOSITORY:
    REPO_OWNER, REPO_NAME = GITHUB_REPOSITORY.split("/", 1)
else:
    REPO_OWNER = os.environ.get("REPO_OWNER", "")
    REPO_NAME = os.environ.get("REPO_NAME", "")

# Auth
TOKEN = os.environ.get("GITHUB_TOKEN")

HEADERS = {
    "Accept": "application/vnd.github+json",
    "User-Agent": "update-contributors-script",
}
if TOKEN:
    HEADERS["Authorization"] = f"Bearer {TOKEN}"


def log(msg: str) -> None:
    print(msg, flush=True)


def fetch_all_contributors(owner: str, repo: str, per_page: int = 100) -> List[Dict[str, Any]]:
    """
    Fetch contributors with pagination. Returns a list of contributor dicts
    like GitHub's /contributors endpoint.
    """
    url = f"https://api.github.com/repos/{owner}/{repo}/contributors?per_page={per_page}&anon=0"
    contributors: List[Dict[str, Any]] = []

    while url:
        log(f"GET {url}")
        resp = requests.get(url, headers=HEADERS, timeout=30)
        try:
            resp.raise_for_status()
        except Exception as e:
            log(f"Error fetching contributors: {e}")
            break

        page_items = resp.json()
        if not isinstance(page_items, list):
            log(f"Unexpected response: {page_items}")
            break

        contributors.extend(page_items)

        # Parse pagination
        link = resp.headers.get("Link", "")
        next_url: Optional[str] = None
        if link:
            parts = [p.strip() for p in link.split(",")]
            for p in parts:
                if 'rel="next"' in p:
                    # <https://...>; rel="next"
                    start = p.find("<")
                    end = p.find(">")
                    if start != -1 and end != -1:
                        next_url = p[start + 1 : end]
        url = next_url

    return contributors


def filter_contributors(contribs: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Optionally exclude bots and ensure we only keep user-type accounts.
    """
    filtered = []
    for c in contribs:
        login = c.get("login", "")
        acc_type = c.get("type", "User")
        if EXCLUDE_BOTS and (login.endswith("[bot]") or acc_type == "Bot"):
            continue
        # Some "User" entries may still be orgs; stick to GitHub's type.
        if acc_type != "User":
            continue
        filtered.append(c)
    return filtered


def generate_contributors_section(contributors: List[Dict[str, Any]]) -> str:
    """
    Generate the HTML section bounded by START_MARKER and END_MARKER.
    """
    if not contributors:
        body = f"{START_MARKER}\n## Contributors\n\n_No contributors found._\n{END_MARKER}"
        return body

    # cap the number shown
    contributors = contributors[:MAX_CONTRIBUTORS]

    html = [START_MARKER, "## Contributors", ""]
    html.append("<table>")
    html.append("  <tr>")

    for i, c in enumerate(contributors):
        if i > 0 and i % PER_ROW == 0:
            html.append("  </tr>")
            html.append("  <tr>")

        username = c.get("login", "unknown")
        avatar_url = c.get("avatar_url", "")
        profile_url = c.get("html_url", "")
        contributions = c.get("contributions", 0)

        cell = f"""    <td align="center" valign="top">
      <a href="{profile_url}">
        <img src="{avatar_url}" width="64" height="64" alt="{username}" /><br />
        <sub><b>{username}</b></sub>
      </a><br />
      <sub>{contributions} commit{'s' if contributions != 1 else ''}</sub>
    </td>"""
        html.append(cell)

    html.append("  </tr>")
    html.append("</table>")
    html.append(END_MARKER)

    return "\n".join(html)


def read_readme(path: str) -> str:
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        log(f"{path} not found. Will create a new one.")
        return ""


def write_readme(path: str, content: str) -> None:
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)


def upsert_contributors_section(readme: str, section: str) -> str:
    """
    Replace existing section between markers, or append at the end if not found.
    """
    start = re.escape(START_MARKER)
    end = re.escape(END_MARKER)
    pattern = re.compile(f"{start}.*?{end}", flags=re.DOTALL)

    if pattern.search(readme):
        updated = pattern.sub(section, readme)
        return updated
    else:
        if readme and not readme.endswith("\n"):
            readme += "\n"
        return readme + "\n" + section + "\n"


def main() -> int:
    if not REPO_OWNER or not REPO_NAME:
        log("Missing repository info. Ensure GITHUB_REPOSITORY, REPO_OWNER and REPO_NAME are set.")
        return 1

    log(f"Repository: {REPO_OWNER}/{REPO_NAME}")
    contributors = fetch_all_contributors(REPO_OWNER, REPO_NAME)
    contributors = filter_contributors(contributors)
    log(f"Total contributors fetched (filtered): {len(contributors)}")

    section = generate_contributors_section(contributors)
    readme = read_readme(README_PATH)
    updated = upsert_contributors_section(readme, section)

    if updated != readme:
        write_readme(README_PATH, updated)
        log(f"README updated with {min(len(contributors), MAX_CONTRIBUTORS)} contributor(s).")
        return 0
    else:
        log("README already up to date. No changes.")
        return 0


if __name__ == "__main__":
    sys.exit(main())
