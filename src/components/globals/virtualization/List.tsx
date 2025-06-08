import { ReactNode } from "react";
import { FixedSizeGrid, FixedSizeList } from "react-window";
import { ThreeDots } from "react-loader-spinner";
import AutoSizer from "react-virtualized-auto-sizer";
import "./styles/List.scss";

interface IProps<T> {
  metadata: { isLoading: boolean; error: unknown };
  renderItem: (item: T) => ReactNode;
  keyExtractor: (item: T) => number | string;
  data: T[];
  isSingleLine: boolean;
  viewType: "grid" | "list";
}

const VirtualizedView = <T,>({
  metadata,
  renderItem,
  keyExtractor,
  data,
  isSingleLine,
  viewType,
}: IProps<T>) => {
  const { isLoading, error } = metadata;

  return (
    <>
      {isLoading && (
        <div
          className="container tw-relative"
          style={{ minHeight: "calc(90vh - 112px)" }}
        >
          <div className="tw-absolute tw-inset-0 tw-flex tw-justify-center tw-items-center">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#D2CAC9"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </div>
        </div>
      )}

      {data.length === 0 && !isLoading && !error && <p>No data found</p>}
      {error && data.length === 0 && !isLoading && <p>{String(error)}</p>}

      {!isLoading && !error && data.length > 0 && (
        <div className="container">
          <AutoSizer className="autoSizer">
            {({ height, width }) => {
              if (viewType === "grid") {
                // For small screens (<= 768px), ensure a minimum item width of 150px and some padding.
                // For larger screens, use the same logic to maintain a minimum width and responsive columns or customize as needed.
                const itemWidth =
                  width <= 768
                  ? Math.max((width - 16) / Math.floor((width - 16) / 150), 150)
                  : Math.max((width - 16) / Math.floor((width - 16) / 150), 150);
                const itemHeight = isSingleLine ? 50 : 280;
                const columnCount = Math.floor(width / itemWidth) || 1;
                const rowCount = Math.ceil(data.length / columnCount);

                return (
                  <FixedSizeGrid
                    className="FixedSizeGrid tw-mt-4"
                    columnCount={columnCount}
                    columnWidth={itemWidth}
                    height={height}
                    rowCount={rowCount}
                    rowHeight={itemHeight}
                    width={width}
                  >
                    {({ columnIndex, rowIndex, style }) => {
                      const index = rowIndex * columnCount + columnIndex;
                      if (index >= data.length) return null;
                      return (
                        <div style={style} key={keyExtractor(data[index])}>
                          <section className="ItemBase">
                            {renderItem(data[index])}
                          </section>
                        </div>
                      );
                    }}
                  </FixedSizeGrid>
                );
              }

              // List View
              return (
                <FixedSizeList
                  className="FixedSizeList"
                  height={height}
                  itemCount={data.length}
                  itemSize={isSingleLine ? 50 : 75}
                  width={width}
                >
                  {({ index, style }) => (
                    <div style={style} className="tw-mt-4">
                      <section
                        className={index % 2 === 0 ? "ListItemEven" : "ListItemOdd"}
                      >
                        {renderItem(data[index])}
                      </section>
                    </div>
                  )}
                </FixedSizeList>
              );
            }}
          </AutoSizer>
        </div>
      )}
    </>
  );
};

export default VirtualizedView;
