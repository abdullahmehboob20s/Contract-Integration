import presaleAbi from "constants/abi's/presaleAbi";
import contractDetails from "constants/contractDetails";
import { ethers } from "ethers";
import React from "react";
import { useAccount, useContract, useContractRead } from "wagmi";
import BuyAndSellToken from "./BuyAndSellToken";

function AfterConnectContent() {
  const { address, connector } = useAccount();
  // const contract = useContract({
  //   address: contractDetails.SMU_TOKEN_CONTRACT.address,
  //   abi: contractDetails.SMU_TOKEN_CONTRACT.abi,
  // });

  const { data: tokenSymbol, isLoading: isSymbolLoading } = useContractRead({
    address: contractDetails.SMU_TOKEN_CONTRACT.address,
    abi: contractDetails.SMU_TOKEN_CONTRACT.abi,
    functionName: "symbol",
    watch: true,
  });

  const { data: balance, isLoading: isBalanceLoading } = useContractRead({
    address: contractDetails.SMU_TOKEN_CONTRACT.address,
    abi: contractDetails.SMU_TOKEN_CONTRACT.abi,
    functionName: "balanceOf",
    watch: true,
    args: [address],
  });

  // console.log(contract);

  const loading = isSymbolLoading || isBalanceLoading;

  if (loading) {
    return (
      <div>
        <h1>Fetching Data...</h1>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h3>
          <span style={{ opacity: 0.5 }}>Connected to</span> {address}
        </h3>
        <h4>Wallet : {connector?.name}</h4>
      </div>

      <hr />

      <h1>
        Balance: {Number(ethers.utils.formatEther(balance)).toFixed(2)}{" "}
        {tokenSymbol}
      </h1>

      <p>
        {tokenSymbol} Token Address:{" "}
        <a
          rel="noreferrer"
          target="_blank"
          href="https://testnet.bscscan.com/address/0x12d7b8a3ae7f85cf81a5a5c5e92c8d549c0af30f"
        >
          0x12d...f30f
        </a>
      </p>

      <hr />
      <br />

      <BuyAndSellToken />
    </div>
  );
}

export default AfterConnectContent;
