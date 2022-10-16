import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";

import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Layout from "@components/layout";
import { Product } from "@prisma/client";
import { SWRConfig } from "swr";
import client from "@libs/server/client";
import { useEffect } from "react";
import { useInfiniteScroll } from "@libs/client/useInfiniteScroll";
import useUser from "../libs/client/useUser";

export interface ProductWithCount extends Product {
  _count: { favs: number };
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWithCount[];
  pages: number;
}

const getKey = (pageIndex: number, previousPageData: ProductsResponse) => {
  if (previousPageData && !previousPageData.products.length) return null;
  console.log("pageIndex: getkey", pageIndex);

  return `/api/products?page=${pageIndex + 1}`;
};

const Home: NextPage = () => {
  const { user, isLoading } = useUser();

  // useSWRInfinite 사용법
  // https://swr.vercel.app/ko/docs/pagination#useswrinfinite
  const { data, setSize, size } = useSWRInfinite<ProductsResponse>(getKey);

  const page = useInfiniteScroll();

  useEffect(() => {
    console.log("size:useSWRInfinite 사이즈", size);
    console.log("data:useSWRInfinite 데이타", data);

    setSize(page);
  }, [setSize, page]);

  return (
    <Layout title="홈" seoTitle="Home" hasTabBar>
      <div className="flex flex-col mb-5 space-y-5">
        {data
          ? data?.map((result) => {
              return result?.products?.map((product) => (
                <Item
                  id={product?.id}
                  title={product?.name}
                  price={product?.price}
                  hearts={product?._count?.favs}
                  key={product?.id}
                  image={product?.image}
                />
              ));
            })
          : "Loading"}
        <FloatingButton href="/products/upload">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

const Page: NextPage<ProductsResponse> = ({ products, pages }) => {
  // unstable_serialize 사용
  // https://github.com/vercel/swr/issues/1520#issuecomment-933247768
  return (
    <SWRConfig
      value={{
        fallback: {
          [unstable_serialize(getKey)]: [
            {
              ok: true,
              products,
              pages,
            },
          ],
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const products = await client.product.findMany({
    include: {
      _count: {
        select: {
          favs: true,
        },
      },
    },
    take: 10,
    skip: 0,
  });
  console.log("products:홈화면 pages/index ", products);

  if (!products) return { props: {} };

  const productCount = await client.product.count();

  return {
    props: {
      ok: true,
      products: JSON.parse(JSON.stringify(products)),
      pages: Math.ceil(productCount / 10),
    },
  };
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   console.log(ctx);
//   const products = await client.product.findMany({
//     include: {
//       _count: {
//         select: {
//           favs: true,
//         },
//       },
//     },
//     take: 10,
//     skip: 0,
//   });

//   if (!products) return { props: {} };

//   const productCount = await client.product.count();
//   // await new Promise((resolve) => setTimeout(resolve, 5000));

//   return {
//     props: {
//       ok: true,
//       products: JSON.parse(JSON.stringify(products)),
//       pages: Math.ceil(productCount / 10),
//     },
//   };
// };

export default Page;
