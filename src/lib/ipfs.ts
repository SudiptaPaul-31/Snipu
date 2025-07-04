import pinataSDK from "@pinata/sdk";

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY || "",
  process.env.PINATA_API_SECRET || "",
);

/**
 * Uploads a JSON-wrapped code snippet to IPFS via Pinata.
 *
 * @param content  The snippet text (or any JSON-serializable data)
 * @param name     A friendly name to appear in Pinata’s metadata
 * @returns        The IPFS content identifier (CID)
 */
export async function uploadToIPFS(
  content: string,
  name: string,
): Promise<string> {
  try {
    const result = await pinata.pinJSONToIPFS(
      { snippet: content },
      {
        pinataMetadata: { name },
        pinataOptions: { cidVersion: 1 },
      },
    );
    return result.IpfsHash;
  } catch (err) {
    console.error("Pinata upload error:", err);
    throw new Error("Failed to upload to IPFS");
  }
}

/** Given a CID, constructs a public gateway URL */
export function getIPFSUrl(cid: string): string {
  return `https://gateway.pinata.cloud/ipfs/${cid}`;
}
