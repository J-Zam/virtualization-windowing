import Layout from "../../../globals/widgets/Layout";
import List from "../../../globals/virtualization/List";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RotatingLines } from "react-loader-spinner";
import useFilterData from "../../../../hooks/useFilterData";
import SearchBar from "../../../globals/widgets/SearchBar";
import { GoSortAsc } from "react-icons/go";
import { GoSortDesc } from "react-icons/go";
import ItemView from "../../view/ItemView";
import { IProduct } from "../../../../interfaces";

const fetchProducts = async () => {
  const response = await fetch(
    "https://dummyjson.com/products?limit=0&skip=0&select=sku,title,rating,description,category,price,brand,thumbnail,images,discountPercentage,shippingInformation,stock"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

export default function RowList() {
  const [isAscending, setIsAscending] = useState(true);
  const [isImgLoading, setImgLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const products = (data?.products as IProduct[]) || [];

  const { filteredData, toggleReverse } = useFilterData(
    filter,
    products,
    ({ price, title }) => `${price} ${title}`
  );

  return (
    <Layout>
      <div className="tw-max-w-4xl tw-mx-auto tw-px-2 tw-pt-3">
        <div className="tw-mb-4">
          <SearchBar filter={filter} setFilter={setFilter}>
            <button
              className="tw-font-bold tw-flex tw-gap-2 tw-mx-1 tw-p-2 tw-bg-gray-200 tw-rounded"
              title="Sort"
              onClick={() => {
                toggleReverse();
                setIsAscending(!isAscending);
              }}
            >
              Sort items
              {isAscending ? <GoSortDesc size={22} /> : <GoSortAsc size={22} />}
            </button>
          </SearchBar>

        </div>
        <List
          viewType="list"
          data={filteredData}
          keyExtractor={({ id }) => id}
          metadata={{ isLoading, error }}
          isSingleLine={false}
          renderItem={(item: any) => (
            <ItemView key={item.id} data={item}>
              <section className="tw-flex tw-relative">
                <div className="tw-relative tw-max-w-14 tw-min-h-14 tw-max-h-14 tw-min-w-14 lg:tw-max-w-[3.3rem] lg:tw-min-h-[3.3rem] lg:tw-max-h-[3.3rem] lg:tw-min-w-[3.3rem] tw-overflow-hidden tw-border-2 tw-border-gradient-to-r tw-from-blue-500 tw-via-purple-500 tw-to-pink-500">
                  <div
                  className="tw-absolute tw-inset-0 tw-blur-md tw-bg-cover tw-bg-center tw-bg-gray-100"
                  style={{
                    backgroundImage: `url(${item.thumbnail})`,
                  }}
                  ></div>
                  {isImgLoading && <RotatingLines width={"45"} />}
                  <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="tw-relative tw-max-w-16 tw-min-w-14 tw-max-h-14 tw-min-h-14 lg:tw-max-w-[3.3rem] lg:tw-min-w-[3.3rem] lg:tw-max-h-[3.3rem] lg:tw-min-h-[3.3rem] tw-overflow-hidden tw-cursor-pointer tw-opacity-0 tw-scale-95 tw-transition-all tw-duration-500"
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  onLoad={e => {
                    setImgLoading(false);
                    e.currentTarget.classList.remove("tw-opacity-0", "tw-scale-95");
                    e.currentTarget.classList.add("tw-opacity-100", "tw-scale-100");
                  }}
                  onError={() => setImgLoading(false)}
                  />
                </div>
                <div className="tw-overflow-hidden tw-overflow-ellipsis tw-flex tw-flex-col tw-justify-between tw-w-full tw-ml-2">
                  <div className="tw-flex tw-justify-between tw-items-center">
                    <p className="tw-font-bold tw-w-[70%] lg:tw-w-[90%] tw-overflow-hidden tw-overflow-ellipsis">
                      {item.title}
                    </p>
                    <div className="tw-mr-1 tw-text-gray-700">
                      <p className="tw-flex tw-overflow-hidden tw-text-gray-700 tw-text-sm tw-overflow-ellipsis tw-font-medium tw-items-center">
                        <span className="tw-text-green-600 tw-font-bold tw-mr-1">{item.stock}</span>
                        <span className="tw-text-gray-500 tw-font-bold">in stock</span>
                      </p>
                    </div>
                  </div>

                  <div className="tw-mr-1 tw-mb-1 tw-flex tw-justify-between">
                    <span className="tw-text-gray-700 tw-font-bold tw-flex tw-items-center tw-text-md">
                      ${item.price.toLocaleString("EN-US")}
                    </span>

                    <span className="tw-text-red-500 tw-text-sm tw-font-bold">
                      {item.discountPercentage}% off
                    </span>

                  </div>
                </div>
              </section>
            </ItemView>
          )}
        />
      </div>
    </Layout>
  );
}
