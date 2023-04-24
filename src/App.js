import { useAccount } from "wagmi";
import ConnectButton from "./components/ConnectButton";
import AfterConnectContent from "components/AfterConnectContent";

function App() {
  const { address } = useAccount();

  return <div>{!address ? <ConnectButton /> : <AfterConnectContent />}</div>;
}

export default App;
