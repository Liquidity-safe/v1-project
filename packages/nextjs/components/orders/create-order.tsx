import { useEffect, useState } from "react";
import tokens from "../constants/tokens";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { useNetwork } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useEthersSigner } from "~~/services/ethers";
import { Liquisafe__factory, PriceOracle__factory } from "~~/types/typechain";
import { Liquisafe } from "~~/types/typechain/Liquisafe";

export const CreateOrder = ({ close }) => {
  const [chainId, setChainId] = useState(31337);
  const [platform, setPlatform] = useState("v2");
  const [tokenA, setTokenA] = useState("WETH");
  const [tokenB, setTokenB] = useState("USDC");
  const [priceA, setPriceA] = useState("");
  const [priceB, setPriceB] = useState("");
  const [amountA, setAmountA] = useState(0);
  const [amountB, setAmountB] = useState(0);
  const [poolFee, setPoolFee] = useState(0);
  const [fee, setFee] = useState(500);
  const [swap, setSwap] = useState(["Uniswap V2", "Uniswap V3"]);
  const { chain } = useNetwork();
  const signer = useEthersSigner();
  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo("Liquisafe");
  const { data: oracleContractData, isLoading: oracleContractLoading } = useDeployedContractInfo("PriceOracle");

  useEffect(() => {
    setChainId(chain?.id || 1);

    if (chain && signer) {
      //getAllowance().then;

      console.log("chain id", chain.id);
    }
  }, [chain, signer]);

  useEffect(() => {
    setChainId(chain?.id || 1);

    if (!oracleContractLoading && oracleContractData && chain && signer) {
      getPrice().then;

      console.log("chain id", chain.id);
    }
  }, [chain, signer, oracleContractLoading, oracleContractData, tokenA, tokenB]);

  const getPrice = async () => {
    const oracle = PriceOracle__factory.connect(oracleContractData!.address, signer);
    const tokA = tokens.find(x => x.symbol === tokenA);
    const tokB = tokens.find(x => x.symbol === tokenB);
    if (tokA) {
      console.log("tokA", tokA);
      const adrTokA = tokA.addresses.find(x => x.chainId === chain?.id);
      if (adrTokA) {
        console.log("adrTokA", adrTokA);
        const dataA = await oracle.getAssetPriceInUsd(adrTokA.address);
        console.log("dataA", dataA);
        const priceA = ethers.formatUnits(dataA.price, dataA.decimals);
        setPriceA(priceA);
      } else {
        setTokenA("Not found");
      }
    } else {
      setTokenA("Not found");
    }
    if (tokB) {
      const adrTokB = tokB.addresses.find(x => x.chainId === chain?.id);
      if (adrTokB) {
        const dataB = await oracle.getAssetPriceInUsd(adrTokB.address);
        const priceB = ethers.formatUnits(dataB.price, dataB.decimals);
        console.log("priceB", priceB);
        setPriceB(priceB);
      } else {
        setTokenA("Not found");
      }
    } else {
      setTokenA("Not found");
    }
  };

  return (
    <div className="trade-info">
      <span className="block text-2xl">Create Order</span>
      <div className="trade-content">
        <div className="token-info">
          <span>Platform</span>
          <select className="s-select" value={platform} onChange={e => setPlatform(e.target.value)}>
            <option value={"v2"}>Uniswap v2</option>
            <option value={"v3"}>Uniswap v3</option>
          </select>
        </div>
        <div className="token-info">
          <span> Token A</span>
          <select className="s-select" value={tokenA} onChange={e => setTokenA(e.target.value)}>
            <option value={"WETH"}>WETH</option>
            <option value={"USDC"}>USDC</option>
            <option value={"WBTC"}>WBTC</option>
          </select>
          <span>{priceA}$</span>
        </div>
        <div className="token-info">
          <span> Token B</span>
          <select className="s-select" value={tokenB} onChange={e => setTokenB(e.target.value)}>
            <option value={"WETH"}>WETH</option>
            <option value={"USDC"}>USDC</option>
            <option value={"WBTC"}>WBTC</option>
          </select>
          <span>{priceB}$</span>
        </div>
        {platform === "v3" && (
          <div className="token-info">
            <span>Pool fee %</span>
            <input
              className="s-input"
              type="number"
              defaultValue={poolFee}
              onChange={e => setPoolFee(e.target.value)}
            ></input>
          </div>
        )}
        <div className="token-info">
          <span>Trigger A $</span>
          <input
            className="s-input"
            type="number"
            defaultValue={amountA}
            onChange={e => setAmountA(e.target.value)}
          ></input>
          <span>0 for no trigger</span>
        </div>
        <div className="token-info">
          <span>Trigger B $</span>
          <input
            className="s-input"
            type="number"
            defaultValue={amountB}
            onChange={e => setAmountB(e.target.value)}
          ></input>
          <span>0 for no trigger</span>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <form method="dialog">
          <button className="s-button">Close</button>
        </form>
      </div>
    </div>
  );
};
