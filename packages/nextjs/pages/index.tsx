import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { ListOrder } from "~~/components/orders/list-order";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />

      <ListOrder></ListOrder>
    </>
  );
};

export default Home;
