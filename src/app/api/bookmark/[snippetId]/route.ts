import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request, { params }: { params: { snippetId: string } }) {
  try {
    const { walletAddress } = await request.json();
    const { snippetId } = await params; // Fix: await params
    const snippetIdNum = parseInt(snippetId);

    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
    }

    if (isNaN(snippetIdNum)) {
      return NextResponse.json({ error: 'Invalid snippet ID' }, { status: 400 });
    }

    // Check if bookmark exists
    const existingBookmark = await prisma.userBookmark.findUnique({
      where: {
        walletAddress_snippetId: {
          walletAddress,
          snippetId: snippetIdNum
        }
      }
    });

    let bookmarked: boolean;

    if (existingBookmark) {
      // Remove bookmark if it exists
      await prisma.userBookmark.delete({
        where: {
          walletAddress_snippetId: {
            walletAddress,
            snippetId: snippetIdNum
          }
        }
      });
      bookmarked = false;
    } else {
      // Create bookmark if it doesn't exist
      await prisma.userBookmark.create({
        data: {
          walletAddress,
          snippetId: snippetIdNum
        }
      });
      bookmarked = true;
    }

    return NextResponse.json({ bookmarked });
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    return NextResponse.json(
      { error: 'Failed to toggle bookmark' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request, { params }: { params: { snippetId: string } }) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');
    const { snippetId } = await params; // Fix: await params
    const snippetIdNum = parseInt(snippetId);

    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
    }

    if (isNaN(snippetIdNum)) {
      return NextResponse.json({ error: 'Invalid snippet ID' }, { status: 400 });
    }

    const bookmark = await prisma.userBookmark.findUnique({
      where: {
        walletAddress_snippetId: {
          walletAddress,
          snippetId: snippetIdNum
        }
      }
    });

    return NextResponse.json({ bookmarked: !!bookmark });
  } catch (error) {
    console.error('Error checking bookmark status:', error);
    return NextResponse.json(
      { error: 'Failed to check bookmark status' },
      { status: 500 }
    );
  }
}