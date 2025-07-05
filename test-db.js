// test-db.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    // Try to query the database
    const snippetCount = await prisma.snippet.count();
    console.log(
      `Database connection successful. Found ${snippetCount} snippets.`,
    );
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
