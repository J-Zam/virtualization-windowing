import { IProduct } from "../../../../interfaces";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

export default function CustomForm({ data }: { data: IProduct }) {
  return (
    <div className="tw-p-4 tw-flex tw-flex-col tw-gap-6 tw-bg-white ">
      <div key={data.id} className="tw-flex tw-flex-col tw-items-center tw-gap-6">
        <div className="tw-w-40 tw-h-40 tw-flex tw-items-center tw-justify-center tw-bg-gray-200 tw-rounded-lg tw-overflow-hidden tw-shadow-lg tw-relative">
          <img
            src={data.thumbnail}
            alt={data.title}
            className="tw-w-full tw-h-full tw-object-cover tw-transition-opacity tw-duration-300"
            onLoad={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.nextElementSibling?.classList.add('tw-hidden');
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('tw-hidden');
            }}
            style={{ opacity: '0' }}
          />
          <div className="tw-loader tw-animate-spin tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center"></div>
        </div>

        <div className="tw-flex tw-items-center">
          {Array.from({ length: 5 }, (_, index) => {
            const fullStars = Math.floor(data.rating);
            const hasHalfStar = data.rating % 1 !== 0;

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
        <div className="tw-flex tw-flex-col tw-items-start tw-gap-4 tw-w-full">
          <h2 className="tw-text-xl tw-font-bold tw-text-gray-800">{data.title}</h2>
          <p className="tw-text-base tw-text-gray-600">{data.description}</p>
          <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-w-full">
            <p className="tw-text-sm tw-text-gray-700">
              <span className="tw-font-semibold">Category:</span> {data.category}
            </p>
            <p className="tw-text-sm tw-text-gray-700">
              <span className="tw-font-semibold">Brand:</span> {data.brand}
            </p>
            <p className="tw-text-sm tw-text-gray-700">
              <span className="tw-font-semibold">Price:</span> ${data.price.toFixed(2)}
            </p>
            <p className="tw-text-sm tw-text-gray-700">
              <span className="tw-font-semibold">Discount:</span> {data.discountPercentage}%
            </p>
            <p className="tw-text-sm tw-text-gray-700">
              <span className="tw-font-semibold">Rating:</span> {data.rating} / 5
            </p>
            <p className="tw-text-sm tw-text-gray-700">
              <span className="tw-font-semibold">Shipping Info:</span> {data.shippingInformation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
