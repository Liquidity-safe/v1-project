import { useEffect, useState } from "react";
import tokens from "../constants/tokens";
import { LiqudityV2 } from "./liquidity-v2";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { useNetwork } from "wagmi";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useEthersSigner } from "~~/services/ethers";
import { Liquisafe__factory, PriceOracle__factory } from "~~/types/typechain";
import { Liquisafe } from "~~/types/typechain/Liquisafe";

export const CreateOrder = ({}) => {
  const [chainId, setChainId] = useState(31337);
  const [platform, setPlatform] = useState("v2");
  const [tokenA, setTokenA] = useState("WETH");
  const [tokenB, setTokenB] = useState("USDC");
  const [priceA, setPriceA] = useState("");
  const [priceB, setPriceB] = useState("");
  const [adrTokenA, setAdrTokenA] = useState("");
  const [adrTokenB, setAdrTokenB] = useState("");
  const [amountA, setAmountA] = useState(0);
  const [amountB, setAmountB] = useState(0);
  const [amountLiquidity, setAmountLiquidity] = useState(0);
  const [user, setUser] = useState("");

  const { chain } = useNetwork();
  const signer = useEthersSigner();
  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo("Liquisafe");
  const { data: oracleContractData, isLoading: oracleContractLoading } = useDeployedContractInfo("PriceOracle");
  const [open, setOpen] = useState(false);

  const [pool, setpool] = useState();

  useEffect(() => {
    setChainId(chain?.id || 1);

    if (chain && signer) {
      //getAllowance().then;

      console.log("chain id", chain.id);
    }
    if (signer) {
      signer.getAddress().then(r => setUser(r));
    }
  }, [chain, signer]);

  useEffect(() => {
    setChainId(chain?.id || 1);

    if (!oracleContractLoading && oracleContractData && chain && signer && open) {
      getPrice().then;

      console.log("chain id", chain.id);
    }
  }, [chain, signer, oracleContractLoading, oracleContractData, tokenA, tokenB, open]);

  const getPrice = async () => {
    const oracle = PriceOracle__factory.connect(oracleContractData!.address, signer);
    const tokA = tokens.find(x => x.symbol === tokenA);
    const tokB = tokens.find(x => x.symbol === tokenB);
    if (tokA) {
      console.log("tokA", tokA);
      const adrTokA = tokA.addresses.find(x => x.chainId === chain?.id);
      setAdrTokenA(adrTokA?.address);
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
      setAdrTokenB(adrTokB?.address);
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

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgb(57, 82, 132)",
    },
  };

  const create = async () => {
    const [token0, token1] = adrTokenA < adrTokenB ? [adrTokenA, adrTokenB] : [adrTokenB, adrTokenA];
    const [amount0, amount1] = adrTokenA < adrTokenB ? [amountA, amountB] : [amountB, amountA];

    if (platform === "v2") {
      const liquisafeFactory = Liquisafe__factory.connect(deployedContractData!.address, signer);

      try {
        const tx = await liquisafeFactory.addOrderV2(
          1,
          user,
          "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
          token0,
          token1,
          amountLiquidity,
          amountA,
          amountB,
        );
        await tx.wait();
        setOpen(false);
      } catch (err) {
        const parsed = parseCustomError(err, liquisafeFactory);
        console.log("create error", parsed);
      }
    } else {
    }
  };

  function parseCustomError(error: any, contract: any) {
    if (error?.revert) {
      return error.revert;
    }
    const data = error.data;
    if (typeof data !== "string" || !data.startsWith("0x")) {
      return null;
    }
    const selector = data.substring(0, 10);
    const fragment = contract.interface.fragments.find((fragment: any) => fragment.selector === selector);
    if (!fragment) {
      return null;
    }
    return {
      name: fragment.name,
      signature: fragment.format(),
      args: contract.interface.decodeErrorResult(fragment, data),
    };
  }

  return (
    <div>
      <button className="btn" onClick={() => setOpen(true)}>
        Add order
      </button>
      <Modal style={customStyles} isOpen={open} ariaHideApp={false}>
        <div className="trade-info" style={{ width: "400px" }}>
          <span className="block text-2xl mb-3">Create Order</span>
          <div className="trade-content">
            <div className="token-info">
              <span>Platform</span>
              <select className="s-select" value={platform} onChange={e => setPlatform(e.target.value)}>
                <option value={"v2"}>Uniswap v2</option>
                <option value={"v3"}>Uniswap v3</option>
              </select>
            </div>
            <div className="token-info">
              <span>Token A</span>
              <select className="s-select" value={tokenA} onChange={e => setTokenA(e.target.value)}>
                <option value={"WETH"}>WETH</option>
                <option value={"USDC"}>USDC</option>
                <option value={"WBTC"}>WBTC</option>
              </select>
              <span>{priceA}$</span>
            </div>
            <div className="token-info">
              <span>Token B</span>
              <select className="s-select" value={tokenB} onChange={e => setTokenB(e.target.value)}>
                <option value={"WETH"}>WETH</option>
                <option value={"USDC"}>USDC</option>
                <option value={"WBTC"}>WBTC</option>
              </select>
              <span>{priceB}$</span>
            </div>
            <div className="token-info">
              <span>Liquidity amount</span>
              <InformationCircleIcon className="ml-1 h-4 w-4" title="Liquidity amount to withdraw" />
              <input
                className="s-input"
                type="number"
                defaultValue={amountLiquidity}
                onChange={e => setAmountLiquidity(e.target.value)}
              ></input>
            </div>
            <div className="token-info">
              <span>Trigger A $</span>
              <InformationCircleIcon
                className="ml-1 h-4 w-4"
                title="Price to trigger liquidity withdraw (0 to ignore this token)"
              />
              <input
                className="s-input"
                type="number"
                defaultValue={amountA}
                onChange={e => setAmountA(e.target.value)}
              ></input>
            </div>
            <div className="token-info">
              <span>Trigger B $</span>
              <InformationCircleIcon
                className="ml-1 h-4 w-4"
                title="Price to trigger liquidity withdraw (0 to ignore this token)"
              />
              <input
                className="s-input"
                type="number"
                defaultValue={amountB}
                onChange={e => setAmountB(e.target.value)}
              ></input>
            </div>
          </div>
          {platform === "v2" && (
            <div>
              <LiqudityV2
                dex="0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
                tokenA={adrTokenA}
                tokenB={adrTokenB}
              ></LiqudityV2>
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <button className="s-button bg-base-300 mr-3" onClick={create}>
              Create
            </button>
            <button className="s-button" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
