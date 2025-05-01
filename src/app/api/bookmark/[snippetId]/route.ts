export async function POST(request: Request, { params }: { params: { snippetId: string } }) {
    try {
      const { walletAddress } = await request.json();

      if (!walletAddress) {
        return NextResponse.json(
          { error: "Wallet address is required" },
          { status: 400 }
        );
      }

      const user = await prisma.user.findUnique({
        where: { walletAddress },
      });

      if (!user) {
        return NextResponse.json(
          { error: "User not found. Please sign up first." },
          { status: 404 }
        );
      }

      const snippetId = parseInt(params.snippetId);
      if (isNaN(snippetId)) {
        return NextResponse.json(
          { error: "Invalid snippet ID" },
          { status: 400 }
        );
      }

      // ... rest of the code
    } catch (error) {
      console.error("Bookmark error:", error);
      return NextResponse.json(
        { error: error.message || "Internal server error" },
        { status: 500 }
      );
    }
  }