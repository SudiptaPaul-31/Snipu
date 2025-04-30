import React, { useRef, useEffect, useState } from "react";
import { useAccount, useDisconnect } from "@starknet-react/core";
import Image from "next/image";
import { useRouter } from "next/navigation";

const truncateAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function ConnectButton() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDisconnect = () => {
    disconnect();
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {isConnected && address ? (
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen((open) => !open)}
            className="flex items-center gap-2 bg-[#1C1D1F] text-white px-4 py-2 rounded-md hover:bg-[#2a2b2e] transition-colors"
          >
            <Image src="/1.png" alt="profile" width={20} height={23} className="rounded-full" />
            {truncateAddress(address)}
            <span
              className={`border-white border-b-2 border-r-2 inline-block w-2 h-2 transform ${
                isDropdownOpen ? "rotate-45 mb-1" : "-rotate-45"
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#1C1D1F] rounded-md shadow-lg z-10">
              <button
                onClick={handleDisconnect}
                className="w-full text-left px-4 py-2 hover:bg-[#2a2b2e] transition-colors"
              >
                Disconnect Wallet
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => router.push("/auth")}
          className="bg-white text-black px-4 py-2 rounded-md hover:bg-[#e5e6e7] transition-colors"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
