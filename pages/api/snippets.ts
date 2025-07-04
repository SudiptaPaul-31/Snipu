import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const language = req.query.language as string;
      const tags =
        typeof req.query.tags === "string" ? req.query.tags.split(",") : [];

      // Calculate skip value for pagination
      const skip = (page - 1) * limit;

      // Build filter conditions
      const where: Prisma.SnippetWhereInput = {};
      if (language) {
        where.language = language;
      }

      if (tags.length > 0) {
        where.tags = {
          some: {
            name: {
              in: tags,
            },
          },
        };
      }

      // Get total count for pagination
      const total = await prisma.snippet.count({ where });

      // Get paginated and filtered snippets
      const snippets = await prisma.snippet.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          {
            isBookmarked: "desc",
          },
          {
            createdAt: "desc",
          },
        ],
      });

      res.status(200).json({
        snippets,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  } else if (req.method === "POST") {
    const {
      title,
      code,
      language,
      authorId,
      tags,
      description,
      isBookmarked = false,
    }: {
      title: string;
      code: string;
      language: string;
      authorId: string;
      tags: string[];
      description?: string;
      isBookmarked?: boolean;
    } = req.body;

    // Validation
    if (typeof title !== "string" || title.length < 2) {
      return res
        .status(400)
        .json({ message: "Title is required and must be longer" });
    }

    if (typeof code !== "string" || code.length < 8) {
      return res
        .status(400)
        .json({ message: "Code is required and must be longer" });
    }

    try {
      const snippet = await prisma.snippet.create({
        data: {
          title,
          code,
          language,
          authorId,
          description: description || "",
          tags: {
            create: tags.map((tag) => ({
              name: tag,
            })),
          },
          isBookmarked: false,
          views: 0,
          copies: 0,
        },
        include: {
          tags: true,
          author: true,
        },
      });

      res.status(201).json(snippet);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  } else if (req.method === "PATCH") {
    console.log("PATCH request received");

    const { id, isBookmarked } = req.body;

    console.log("Request body:", { id, isBookmarked });

    // Validate inputs
    if (!id || typeof isBookmarked !== "boolean") {
      console.log("Invalid input:", { id, isBookmarked });
      return res.status(400).json({
        message: "Invalid request. Both id and isBookmarked are required.",
      });
    }

    try {
      console.log("Attempting to update snippet with id:", id);

      const updatedSnippet = await prisma.snippet.update({
        where: { id: parseInt(id) },
        data: { isBookmarked },
      });

      console.log("Snippet updated successfully:", updatedSnippet);

      res.status(200).json(updatedSnippet);
    } catch (error: unknown) {
      console.error("Error updating snippet:", error);

      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to update bookmark status" });
      }
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
