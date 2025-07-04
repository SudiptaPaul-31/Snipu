"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { uploadToIPFS } from "@/lib/ipfs";

export const saveSnippet = async (id: number, code: string) => {
  await prisma.snippet.update({
    where: {
      id,
    },
    data: {
      code,
    },
  });

  revalidatePath(`/snippet/${id}`);
  redirect(`/snippet/${id}`);
};

export const deleteSnippet = async (id: number) => {
  await prisma.snippet.delete({
    where: { id },
  });
  revalidatePath("/");
  redirect("/");
};

export async function createSnippet(prevState: any, formData: FormData) {
  "use server";

  try {
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
    const language = formData.get("language") as string;
    const authorId = formData.get("authorId") as string;
    const tags = formData.get("tags") as string;
    const description = (formData.get("description") as string) || ""; // Add description with default empty string

    // Validate inputs
    if (!title || title.length < 3) {
      return { message: "Title must be longer than 3 characters" };
    }
    if (!code || code.length < 10) {
      return { message: "Code must be longer than 10 characters" };
    }

    try {
      // Upload to IPFS
      const filename = `${title.replace(/\s+/g, "-")}.${language.toLowerCase()}`;
      const cid = await uploadToIPFS(code, filename);

      // Create snippet in database with CID
      await prisma.snippet.create({
        data: {
          title,
          code,
          language,
          authorId,
          description, // Add the description field
          tags: tags
            ? {
                create: tags.split(",").map((tag) => ({
                  name: tag.trim(),
                })),
              }
            : undefined,
          ipfsCid: cid,
        },
      });

      revalidatePath("/");
      redirect("/");
    } catch (ipfsError) {
      console.error("IPFS upload failed:", ipfsError);
      // Create snippet without CID if IPFS upload fails
      await prisma.snippet.create({
        data: {
          title,
          code,
          language,
          authorId,
          description, // Add the description field here too
          tags: tags
            ? {
                create: tags.split(",").map((tag) => ({
                  name: tag.trim(),
                })),
              }
            : undefined,
        },
      });

      revalidatePath("/");
      redirect("/");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: "Something went wrong" };
  }
}
