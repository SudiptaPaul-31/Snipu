import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      // Get all unique tags
      const tags = await prisma.tag.findMany({
        select: {
          name: true,
        },
        orderBy: {
          name: "asc",
        },
      });

      // Extract just the tag names
      const tagNames = tags.map((tag) => tag.name);

      res.status(200).json({
        tags: tagNames,
        count: tagNames.length,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching tags:", error.message);
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
