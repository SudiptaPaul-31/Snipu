import React from "react";
import WalletConnectButtons from "@/components/WalletConnectButtons";
import SnippetUploader from './components/SnippetUploader';

export default function Authentication() {
  return (
    <section id="authentication" className="min-h-screen flex flex-col justify-center items-center text-white">
      <div className="space-y-6 text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold">
          Link Your Wallet
        </h1>
        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-400 max-w-md mx-auto">
          Access Snipu by connecting your preferred Starknet wallet.
        </p>
        {/* Wallet Connect Buttons */}
        <WalletConnectButtons />
      </div>
    </section>
  );
}