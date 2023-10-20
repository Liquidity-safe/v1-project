import { useEffect, useState } from "react";
import addresses from "../constants/addresses";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { useNetwork } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useEthersSigner } from "~~/services/ethers";
import { Liquisafe__factory } from "~~/types/typechain";
import { Liquisafe } from "~~/types/typechain/Liquisafe";
import { formatNumber } from "~~/utils/format-number";
import { getContractNames } from "~~/utils/scaffold-eth/contractNames";

export const ListOrder = ({}) => {
  const [orderList, setOrderList] = useState<Liquisafe.OrderStructOutput[]>([]);
  const [chainId, setChainId] = useState(420);
  const [user, setUser] = useState("");
  const { chain } = useNetwork();
  const signer = useEthersSigner();
  //const contractNames = getContractNames();
  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo("Liquisafe");

  useEffect(() => {
    setChainId(chain?.id || 420);

    if (chain && signer) {
      getOrders().then;
    }

    if (signer) {
      signer.getAddress().then(r => setUser(r));
    }
  }, [chain, signer]);

  useEffect(() => {
    // update data every 10 seconds
    const interval = setInterval(() => {
      if (chain && signer) {
        getOrders().then;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [chain, signer, deployedContractLoading]);

  // const fEth = addresses.find(x => x.symbol === "fEth");
  // const fLink = addresses.find(x => x.symbol === "fLink");
  // const fUSDC = addresses.find(x => x.symbol === "fUSDC");
  // const fBTC = addresses.find(x => x.symbol === "fBTC");
  // const mEth = addresses.find(x => x.symbol === "mEth");

  const getOrders = async () => {
    try {
      if (!deployedContractLoading && deployedContractData && signer) {
        const LiquisafeFactory = Liquisafe__factory.connect(deployedContractData.address, signer);
        const datas = await LiquisafeFactory.fetchPageOrders(0, 1000);
        setOrderList(datas[0]);
      }
    } catch (error) {
      console.error("get allowance", error);
    }
  };

  const cancelOrder = async (order: Liquisafe.OrderStruct) => {
    try {
      const contractSelected = addresses.find(x => x.name === "Stop Loss");
      const address = contractSelected?.addresses?.find(x => x.chainId === chainId)?.address;
      if (address && signer) {
        // const stopLossContract = StopLoss__factory.connect(address, signer);

        // toast("Canceling");
        // const execute = await stopLossContract.cancelOrder(order.sellToken, order.buyToken, order.index);
        // await execute.wait();

        toast.success("Order canceled!");
      } else {
        toast.error("Maybe you are not connected");
      }
    } catch (error) {
      toast.error("Error " + JSON.stringify(error));
    }
  };

  function getDate(timestamp: number) {
    // timestamp in second convert to ms
    return new Date(timestamp * 1000).toLocaleString();
  }

  function getStatus(orderStatus: bigint) {
    switch (parseInt(orderStatus)) {
      case 1:
        return "Active";
      case 2:
        return "Canceled";
      case 3:
        return "Executed";
      default:
        return "Unknow";
    }
  }

  function getType(orderType: bigint) {
    switch (parseInt(orderType)) {
      case 1:
        return "UniV2";
      case 2:
        return "UniV3";
      default:
        return "Unknow";
    }
  }

  function isMine(buyer: string) {
    return user?.toLowerCase() === buyer?.toLowerCase();
  }

  function getTrigger(sell: boolean, order: Liquisafe.OrderStruct) {
    if (order.orderType !== 3) {
      return "";
    }
    // if (sell) {
    //   const amt =
    //     order.buyAmount / order.sellAmount + ((order.buyAmount / order.sellAmount) * order.triggerPercent) / 10000;

    //   return formatNumber(amt);
    // } else {
    //   const amt =
    //     order.sellAmount / order.buyAmount + ((order.sellAmount / order.buyAmount) * order.triggerPercent) / 10000;
    //   return formatNumber(amt);
    // }
  }

  return (
    <div className="order-list">
      <div>All orders</div>
      <table>
        <tr>
          <th>Status</th>
          <th>Type</th>
          <th>
            Size <span className="info"></span>
          </th>
          <th>
            Price <span className="info"></span>
          </th>
          <th>
            Trigger <span className="info"></span>
          </th>
          <th>Date</th>
          <th>Mine</th>
          <th>Action</th>
        </tr>
        {orderList.map((el, index) => (
          <tr className="buy" key={index}>
            <td>{getStatus(el.orderStatus)}</td>
            <td>{getType(el.orderType)}</td>
            <td>{formatNumber(parseInt(el.minAmountToken0Usd))}</td>
            <td>{formatNumber(parseInt(el.minAmountToken1Usd))}</td>
            <td>{getTrigger(false, el)}</td>
            <td></td>
            <td>{isMine(el.owner) ? "✓" : "-"}</td>
            <td>
              {isMine(el.owner) && el.orderStatus.toString() === "1" && (
                <button className="s-button" onClick={() => cancelOrder(el)}>
                  Cancel
                </button>
              )}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
