import Layout from "@components/layout";
import type { NextPage } from "next";
import ProductList from "@components/product-list";

const Sold: NextPage = () => {
  return (
    <Layout title="판매내역" canGoBack>
      <ProductList kind="sales" />
    </Layout>
  );
};

export default Sold;
