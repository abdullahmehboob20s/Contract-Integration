import React from "react";
import { useConnect } from "wagmi";
import { bscTestnet } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";

function ConnectButton() {
  const { connect, isLoading: isConnecting } = useConnect({
    chainId: bscTestnet.id,
    connector: new InjectedConnector(),
  });

  return (
    <button onClick={connect} disabled={isConnecting}>
      {isConnecting ? "Connecting..." : "Connect"}
    </button>
  );
}

export default ConnectButton;
