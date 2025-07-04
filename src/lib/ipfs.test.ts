// Mock Pinata SDK before imports
const mockPinJSONToIPFS = jest.fn().mockResolvedValue({
  IpfsHash: "test-cid",
  PinSize: 1000,
  Timestamp: "2023-01-01T00:00:00.000Z",
});

jest.mock("@pinata/sdk", () => {
  return jest.fn().mockImplementation(() => {
    return {
      pinJSONToIPFS: mockPinJSONToIPFS,
    };
  });
});

import pinataSDK from "@pinata/sdk";
import { uploadToIPFS, getIPFSUrl } from "./ipfs";

describe("IPFS Service", () => {
  beforeEach(() => {
    // Clear mock calls
    mockPinJSONToIPFS.mockClear();
    // Reset resolved value to default
    mockPinJSONToIPFS.mockResolvedValue({
      IpfsHash: "test-cid",
      PinSize: 1000,
      Timestamp: "2023-01-01T00:00:00.000Z",
    });
  });

  it("should upload content to IPFS and return the CID", async () => {
    const cid = await uploadToIPFS("test content", "test.txt");
    expect(cid).toBe("test-cid");
    expect(mockPinJSONToIPFS).toHaveBeenCalledTimes(1);
  });

  it("should generate correct IPFS URL", () => {
    const url = getIPFSUrl("test-cid");
    expect(url).toBe("https://gateway.pinata.cloud/ipfs/test-cid");
  });

  it("should pass the filename into pinataMetadata when uploading", async () => {
    const content = "metadata check";
    const filename = "snippet.json";

    await uploadToIPFS(content, filename);

    expect(mockPinJSONToIPFS).toHaveBeenCalledWith(
      { snippet: content },
      expect.objectContaining({ pinataMetadata: { name: filename } }),
    );
  });

  it("should throw a descriptive error when Pinata upload fails", async () => {
    // Simulate a network or service error on the same instance
    mockPinJSONToIPFS.mockRejectedValueOnce(new Error("network failure"));

    await expect(uploadToIPFS("bad content", "fail.txt")).rejects.toThrow(
      "Failed to upload to IPFS",
    );
  });
});
