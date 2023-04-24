import {
  useAccount,
  useChainId,
  useConnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import ConnectButton from "./components/ConnectButton";
import AfterConnectContent from "components/AfterConnectContent";
import { bscTestnet } from "wagmi/chains";

function App() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork, isLoading: isSwitching } = useSwitchNetwork();

  if (chain.id !== bscTestnet.id) {
    return (
      <div>
        <h1>BSC Testnet Supported</h1>
        <button
          onClick={() => switchNetwork(bscTestnet.id)}
          disabled={isSwitching}
        >
          Switch to BNB Testnet
        </button>
      </div>
    );
  }

  return <div>{!address ? <ConnectButton /> : <AfterConnectContent />}</div>;
}

export default App;
