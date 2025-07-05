export async function createSnippet(prevState: any, formData: FormData) {
  "use server";

  try {
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    if (!title || title.length < 3) {
      return {
        message: "Title must be longer than 3 characters",
      };
    }

    if (!code || code.length < 10) {
      return {
        message: "Code must be longer than 10 characters",
      };
    }

    // Simulate a successful creation
    console.log("Snippet created:", { title, code });
    return { message: "Snippet created successfully!" };
  } catch (e: any) {
    return {
      message: "Failed to create snippet!",
    };
  }
}
