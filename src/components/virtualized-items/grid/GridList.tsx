import Layout from "../../globals/widgets/Layout";
import List from "../../globals/virtualization/List";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useFilterData from "../../../hooks/useFilterData";
import SearchBar from "../../globals/widgets/SearchBar";
import { GoSortAsc } from "react-icons/go";
import { GoSortDesc } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { IProduct } from "../../../interfaces";
import ItemView from "../view/ItemView";

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

export default function GridList() {
  const [isAscending, setIsAscending] = useState(true);
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
        <List
          viewType="grid"
          data={filteredData}
          keyExtractor={({ id }) => id}
          metadata={{ isLoading, error }}
          isSingleLine={false}
          renderItem={(item: any) => (
            <ItemView key={item.id} data={item}>
              <section className="tw-flex tw-flex-col tw-items-center tw-align-middle tw-relative tw-border-2">
                <div className="tw-relative tw-mt-2 tw-min-h-36 tw-max-h-36 tw-max-w-36 tw-min-w-2tw-max-w-36 lg:tw-max-w-[9rem] lg:tw-min-h-[9rem] lg:tw-max-h-[9rem] lg:tw-min-w-[9rem] tw-overflow-hidden tw-rounded-sm">
                  <div
                  className="tw-absolute tw-inset-0 tw-blur-2xl tw-bg-cover tw-bg-center "
                  style={{
                    backgroundImage: `url(${item.thumbnail})`,
                  }}
                  ></div>
                  <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="tw-relative tw-min-w-36 tw-max-w-3tw-min-w-36 tw-max-h-36 tw-max-w-36 tw-min-h-3tw-min-w-36 lg:tw-max-w-[9rem] lg:tw-min-w-[9rem] lg:tw-max-h-[9rem] lg:tw-min-h-[9rem] tw-overflow-hidden tw-cursor-pointer tw-opacity-0 tw-scale-95 tw-transition-all tw-duration-500"
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  onLoad={e => {
                    e.currentTarget.classList.remove("tw-opacity-0", "tw-scale-95");
                    e.currentTarget.classList.add("tw-opacity-100", "tw-scale-100");
                  }}
                  />
                </div>

                <div className="tw-flex tw-items-center tw-mt-2">
                  {Array.from({ length: 5 }, (_, index) => {
                    const fullStars = Math.floor(item.rating);
                    const hasHalfStar = item.rating % 1 !== 0;

                    if (index < fullStars) {
                      return (
                        <FaStar
                          key={index}
                          size={17}
                          className="tw-text-yellow-500 tw-mx-0.5"
                        />
                      );
                    } else if (index === fullStars && hasHalfStar) {
                      return (
                        <FaStarHalfAlt
                          key={index}
                          size={17}
                          className="tw-text-yellow-500 tw-mx-0.5"
                        />
                      );
                    } else {
                      return (
                        <FaRegStar
                          key={index}
                          size={17}
                          className="tw-text-gray-300 tw-mx-0.5"
                        />
                      );
                    }
                  })}
                </div>

                <div className="tw-text-center tw-mb-2 tw-mt-2">
                  {item.title && (
                    <h3 className="tw-font-bold tw-text-base tw-overflow-hidden tw-text-ellipsis tw-whitespace-normal tw-break-words tw-max-h-[1.3rem]">
                      {item.title}
                    </h3>
                  )}
                  <article className="tw-flex tw-flex-row tw-gap-1 tw-items-center tw-justify-center tw-text-center tw-p-0">
                    <p className="tw-text-gray-600 tw-text-lg tw-font-bold">
                      {item.discountPercentage > 0 && (
                        <span className="tw-text-red-500 tw-mr-1 tw-text-base">
                          -{item.discountPercentage.toFixed(0)}%
                        </span>
                      )}
                    </p>
                      <span className="tw-text-xs tw-mb-1 tw-text-gray-600 tw-font-bold">US$</span>
                    <p className="tw-text-gray-600 tw-text-base tw-font-bold">
                      {Number(item.price.toFixed(2)).toLocaleString("En-US")}
                    </p>
                  </article>
                  <p>
                    {item.shippingInformation && (
                      <span className="tw-text-gray-400 tw-text-[0.80rem] tw-font-bold">
                        {item.shippingInformation}
                      </span>
                    )}
                  </p>
                </div>
              </section>
            </ItemView>
          )}
        />
      </div>
    </Layout>
  );
}
