import React, { useRef, useEffect, useState } from "react";
import { useAccount, useDisconnect } from "@starknet-react/core";
import { useRouter } from "next/navigation";
import { Wallet } from "lucide-react"; // <-- Import Lucide wallet icon

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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
            className="flex items-center gap-3 bg-gradient-to-r from-[#232526] to-[#414345] text-white px-5 py-2 rounded-xl shadow-lg hover:from-[#2a2b2e] hover:to-[#232526] transition-all duration-200 focus:outline-none"
          >
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6a82fb] to-[#fc5c7d] flex items-center justify-center shadow-md">
              <Wallet size={20} strokeWidth={2.2} className="text-white" />
            </span>
            <span className="font-mono text-sm tracking-wide">
              {truncateAddress(address)}
            </span>
            <svg
              className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            className={`absolute right-0 mt-3 w-56 bg-[#232526] rounded-xl shadow-2xl border border-[#333] overflow-hidden z-20 transition-all duration-200 ${
              isDropdownOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
            style={{ minWidth: "180px" }}
          >
            <button
              onClick={handleDisconnect}
              className="w-full text-left px-5 py-3 text-white hover:bg-[#2a2b2e] transition-colors font-medium"
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => router.push("/auth")}
          className="bg-gradient-to-r from-[#6a82fb] to-[#fc5c7d] text-white px-6 py-2 rounded-xl shadow-lg hover:from-[#fc5c7d] hover:to-[#6a82fb] transition-all duration-200 font-semibold flex items-center gap-2"
        >
          <Wallet size={20} strokeWidth={2.2} className="text-white" />
          Connect Wallet
        </button>
      )}
    </div>
  );
}
