import { ReactNode, useState } from "react";
import useScreenSize from "../../../hooks/useScreenSize";
import Modal from "../../globals/widgets/Modal";
import { IProduct, ISaleItem } from "../../../interfaces";
import { default as SaleForm } from "../row/sales/Form";
import { default as ProductForm } from "../row/products/Form";

interface ItemViewProps {
  data: IProduct | ISaleItem;
  children: ReactNode;
}

const ItemView: React.FC<ItemViewProps> = ({ data, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { windowSize } = useScreenSize();

  return (
    <>
      <div
        className="tw-w-full tw-overflow-hidden tw-overflow-ellipsis tw-whitespace-nowrap"
        onClick={() => setIsModalOpen(true)}
      >
        {children}
      </div>
      {isModalOpen && (
        <Modal
          handleCloseModal={() => setIsModalOpen(false)}
          open={isModalOpen}
          modalTitle={"sku" in data ? data.sku : data.code || "Details"}
          modalBody={
            "sku" in data ? (
              <ProductForm data={data} />
            ) : (
              <SaleForm data={data} />
            )
          }
          modalButtons={
            <button
              className="tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-shadow-md tw-transition-all tw-duration-300 tw-ease-in-out"
                onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          }
          modalSize="sm"
          fullScreen={windowSize.innerWidth < 576}
        />
      )}
    </>
  );
};

export default ItemView;
