"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAccount, useConnect } from "@starknet-react/core";

const WalletConnectButtons = () => {
  const { connect, connectors } = useConnect();
  const { isConnected, connector: currentConnector } = useAccount();

  const braavosConnector = connectors.find((connector) =>
    connector.name.toLowerCase().includes("braavos"),
  );
  const argentConnector = connectors.find((connector) =>
    connector.name.toLowerCase().includes("argent"),
  );

  const isBraavosConnected =
    isConnected && currentConnector?.name.toLowerCase().includes("braavos");
  const isArgentConnected =
    isConnected && currentConnector?.name.toLowerCase().includes("argent");

  const handleBraavosConnect = () => {
    if (braavosConnector) {
      connect({ connector: braavosConnector });
    }
  };

  const handleArgentConnect = () => {
    if (argentConnector) {
      connect({ connector: argentConnector });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button
        size="lg"
        className="bg-white text-black hover:bg-gray-200"
        onClick={handleBraavosConnect}
        disabled={!braavosConnector || isBraavosConnected}
      >
        <Image
          src="/bravos.webp"
          alt="Braavos Logo"
          width={18}
          height={18}
          className="mr-2 rounded-full"
        />
        {isBraavosConnected ? "Connected" : "Connect with Braavos"}
      </Button>
      <Button
        size="lg"
        className="bg-white text-black hover:bg-gray-200"
        onClick={handleArgentConnect}
        disabled={!argentConnector || isArgentConnected}
      >
        <Image
          src="/argent.png"
          alt="Argent Logo"
          width={18}
          height={18}
          className="mr-2 rounded-full"
        />
        {isArgentConnected ? "Connected" : "Connect with Argent"}
      </Button>
    </div>
  );
};

export default WalletConnectButtons;
