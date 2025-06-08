import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Layout from "../../../globals/widgets/Layout";
import dayjs from "dayjs";
import sales from "../../../../data/data.json";
import List from "../../../globals/virtualization/List";
import SearchBar from "../../../globals/widgets/SearchBar";
import useFilterData from "../../../../hooks/useFilterData";
import { IDate, ISaleItem } from "../../../../interfaces";
import ItemView from "../../view/ItemView";

export default function Sales() {
  const [startDate, setStartDate] = useState<Date>(
    dayjs("2025-05-01").toDate()
  );
  const [endDate, setEndDate] = useState<Date>(
    dayjs("2025-05-31").toDate()
  );
  const [salesData, setSalesData] = useState<(IDate | ISaleItem)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const error = null;

  function handleDateOnChange(e: dayjs.Dayjs | null, type: "start" | "end") {
    if (e) {
      if (type === "start") setStartDate(e.toDate());
      if (type === "end") setEndDate(e.toDate());
    }
  }

  useEffect(() => {
    const processedSalesData = [];
    let isDateWithinRange = false;

    for (const sale of sales) {
      if (sale.date) {
        const saleDate = dayjs(sale.date, "YYYY-MM-DD").toDate();
        const startOfDay = dayjs(startDate).startOf("day").toDate();
        const endOfDay = dayjs(endDate).endOf("day").toDate();
        isDateWithinRange = saleDate >= startOfDay && saleDate <= endOfDay;
        if (isDateWithinRange) {
          processedSalesData.push({
            date: sale.date,
            total: Number(sale.total),
          } as IDate);
        }
      } else {
        if (isDateWithinRange) {
          processedSalesData.push({
            id: sale.id,
            code: sale.code,
            product: sale.product,
            customer: sale.customer,
            total: Number(sale.total ?? 0),
            status: (sale.status as ISaleItem["status"]) ?? "unpaid",
          } as ISaleItem);
        }
      }
    }
    setSalesData(processedSalesData);
    setIsLoading(false);
  }, [startDate, endDate]);

  const { filteredData } = useFilterData(filter, salesData, (item) =>
    "code" in item && "product" in item ? `${item.code} ${item.product}` : ""
  );

  return (
    <Layout>
      <div className="tw-max-w-4xl tw-mx-auto tw-px-2 tw-pt-3">
        <div className="sm:tw-grid tw-grid-cols-2 tw-gap-4 tw-space-between tw-items-center">
          <div className="sm:tw-text-right tw-flex tw-gap-2 tw-mt-4 tw-mb-4">
            <div className="tw-min-w-[50%] sm:tw-min-[35%]">
                <LocalizationProvider
                adapterLocale="en"
                dateAdapter={AdapterDayjs}
                >
                <DatePicker
                  slotProps={{
                  textField: { size: "small", fullWidth: true },
                  }}
                  label="Start Date"
                  format="MM/DD/YYYY"
                  onChange={(e) => handleDateOnChange(e!, "start")}
                  defaultValue={dayjs("2025-05-01")}
                />
                </LocalizationProvider>
            </div>

            <div className="tw-min-w-[50%] sm:tw-min-[35%]">
              <LocalizationProvider
                adapterLocale="en"
                dateAdapter={AdapterDayjs}
              >
                <DatePicker
                  slotProps={{
                    textField: { size: "small", fullWidth: true },
                  }}
                  label="End Date"
                  format="DD/MM/YYYY"
                  onChange={(e) => handleDateOnChange(e!, "end")}
                 defaultValue={dayjs("2025-05-31")}
                />
              </LocalizationProvider>
            </div>
          </div>

          <SearchBar
            filter={filter}
            setFilter={setFilter}
            fullWidth />
        </div>
        <List
          viewType="list"
          data={filteredData}
          keyExtractor={(item: IDate | ISaleItem) =>
            "id" in item ? item.id : item.date
          }
          metadata={{ isLoading, error }}
          isSingleLine={false}
          renderItem={(item: any) => (

            <>
              {item && Object.keys(item).length === 2 && item.date ? (
                <div className="tw-flex lg:tw-justify-start tw-mx-2 tw-items-center tw-w-full tw-h-[50px]">
                  <p className="tw-text-lg tw-font-bold tw-text-blue-700">
                    {dayjs(item.date)
                      .format("dddd DD MMMM")
                      .charAt(0)
                      .toUpperCase() +
                      dayjs(item.date).format("dddd, DD MMMM").slice(1)}
                  </p>
                  <p className="tw-text-lg tw-font-bold tw-text-blue-700">
                    - $
                    {Number(item.total).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              ) : (
                <ItemView
                  key={item.id}
                  data={item}
                >
                  <div
                    key={item.id}
                    className="tw-w-full tw-overflow-hidden tw-overflow-ellipsis tw-whitespace-nowrap"
                  >
                    <div className="tw-overflow-hidden tw-overflow-ellipsis tw-flex tw-flex-col tw-justify-between tw-w-full tw-ml-2 md:tw-pr-2">
                      <div className="tw-flex tw-justify-between">
                        <p className="tw-font-bold tw-text-md tw-overflow-hidden tw-overflow-ellipsis">
                          {item.code}
                        </p>
                        <p
                          className={`tw-mr-2 tw-font-bold ${item.status === "pending"
                            ? "tw-text-yellow-600"
                            : item.status === "unPaid"
                              ? "tw-text-red-600"
                              : item.status === "paid"
                                ? "tw-text-green-600"
                                : "tw-text-gray-300"
                            }`}
                        >
                          {item.status.charAt(0).toUpperCase() +
                            item.status.slice(1)}
                        </p>
                      </div>

                      <div className="tw-flex tw-justify-between">
                        <p className="tw-overflow-hidden tw-text-gray-700 tw-text-[.95rem] tw-overflow-ellipsis">
                          {item.product}
                        </p>
                        <p className="tw-mr-2 tw-text-gray-700 tw-font-bold">
                          $
                          {Number(item.total).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                </ItemView>
              )}
            </>
          )}
        />
      </div>
    </Layout>
  );
}
