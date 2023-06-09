import contractDetails from "constants/contractDetails";
import { ethers } from "ethers";
import React, { useRef } from "react";
import { useContractRead, useContractWrite } from "wagmi";

function BuyAndSellToken() {
  const buyInputRef = useRef(null);

  const {
    write: buyToken,
    error: buyTokenError,
    data: buyTokenData,
    isLoading: isBuyingToken,
  } = useContractWrite({
    abi: contractDetails.PRESALE_CONTRACT.abi,
    address: contractDetails.PRESALE_CONTRACT.address,
    functionName: "buy",
  });

  // const { data, write } = useContractWrite({
  //   abi: contractDetails.PRESALE_CONTRACT.abi,
  //   address: contractDetails.PRESALE_CONTRACT.address,
  //   functionName: "estimateTokensToReceive",
  //   args: ["10000000000000000"],
  //   overrides: {
  //     gasLimit: 300000,
  //   },
  // });

  // console.log(data);

  // console.log({ buyTokenData, buyTokenError });

  const buy = (e) => {
    e.preventDefault();

    const value = buyInputRef.current.value;

    buyToken({
      recklesslySetUnpreparedOverrides: {
        value: ethers.utils.parseEther(value).toString(),
        gasLimit: 300000, // Gas Limit must be atleast 21000
      },
    });
  };

  return (
    <div>
      <form onSubmit={buy}>
        <input
          ref={buyInputRef}
          disabled={isBuyingToken}
          type="text"
          placeholder="Enter Amount"
        />
        <button disabled={isBuyingToken} type="submit">
          Buy
        </button>
      </form>

      {/* <button onClick={write}>Write</button> */}
    </div>
  );
}

export default BuyAndSellToken;
