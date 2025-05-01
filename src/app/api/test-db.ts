import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Attempt a simple write operation
    const testRecord = await prisma.bookmark.create({
      data: {
        userId: 'test-user',
        snippetId: -1, // Using a dummy ID
      }
    });

    // If successful, clean up the test record
    await prisma.bookmark.delete({
      where: {
        id: testRecord.id
      }
    });

    return Response.json({ success: true, message: 'Database write access confirmed' });
  } catch (error) {
    console.error('Database write test failed:', error);
    return Response.json(
      {
        success: false,
        message: 'Database write access failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}