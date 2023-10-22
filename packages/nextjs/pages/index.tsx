import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { ListOrder } from "~~/components/orders/list-order";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />

      <div>
        <div className="text-l m-3">
          This websibe use push protocol, add push in your wallet
          <a className="ml-3" style={{ color: "beige" }} href="https://snaps.metamask.io/snap/npm/pushprotocol/snap/">
            https://snaps.metamask.io/snap/npm/pushprotocol/snap/
          </a>
        </div>
      </div>

      <ListOrder></ListOrder>
    </>
  );
};

export default Home;
