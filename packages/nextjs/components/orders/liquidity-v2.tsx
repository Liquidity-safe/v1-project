import { useCallback, useEffect, useRef, useState } from "react";
import addresses from "../constants/tokens";
import { CreateOrder } from "./create-order";
import toast from "react-hot-toast";
import { useNetwork } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useEthersSigner } from "~~/services/ethers";
import { IERC20__factory, IUniswapV2Factory__factory, Liquisafe__factory } from "~~/types/typechain";
import { formatNumber } from "~~/utils/format-number";

export const LiqudityV2 = ({ dex, tokenA, tokenB }) => {
  const [liquidity, setLiquidity] = useState<bigint>();
  const [chainId, setChainId] = useState(1);
  const [user, setUser] = useState("");
  const { chain } = useNetwork();
  const signer = useEthersSigner();
  //const contractNames = getContractNames();
  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo("Liquisafe");

  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setChainId(chain?.id || 420);

    if (chain && signer && dex && tokenA && tokenB && !deployedContractLoading) {
      getLiquidity().then;
    }

    if (signer) {
      signer.getAddress().then(r => setUser(r));
    }
  }, [chain, signer, dex, tokenA, tokenB, deployedContractData, deployedContractLoading]);

  const getLiquidity = async () => {
    try {
      console.log("dex", { dex, tokenA, tokenB });
      const factory = IUniswapV2Factory__factory.connect(dex, signer);
      const pair = await factory.getPair(tokenA, tokenB);
      console.log("pair", pair);
      const erc20 = IERC20__factory.connect(pair, signer);
      const liqui = await erc20.balanceOf(user);
      console.log("amount", liqui);
      const allowance = await erc20.allowance(user, deployedContractData!.address);
      console.log("allowance", allowance);
      const allow = allowance >= liqui;
      setAllowed(allow);
      setLiquidity(liqui);
    } catch (error) {
      console.error("get liquidity", error);
    }
  };

  const approve = async () => {
    const factory = IUniswapV2Factory__factory.connect(dex, signer);
    const pair = await factory.getPair(tokenA, tokenB);
    const erc20 = IERC20__factory.connect(pair, signer);
    const tx = await erc20.approve(deployedContractData!.address, liquidity);
    await tx.wait();
    const allowance = await erc20.allowance(user, deployedContractData!.address);
    console.log("allowance", allowance);
    const allow = allowance >= liquidity;
    setAllowed(allow);
  };

  return (
    <div className="mb-3">
      <span>Liquidity Amount : </span> <span>{parseInt(liquidity?.toString() || "0")}</span>
      {!allowed && (
        <button className="s-button ml-3 bg-base-300" onClick={approve} style={{ width: "100px" }}>
          Approve
        </button>
      )}
    </div>
  );
};
