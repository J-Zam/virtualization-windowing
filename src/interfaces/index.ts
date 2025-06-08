export interface IProduct {
    id: number;
    sku: string;
    title: string;
    rating: number;
    description: string;
    category: string;
    price: number;
    brand: string;
    thumbnail: string;
    images: string[];
    discountPercentage: number;
    shippingInformation: string;
}

export interface IDate {
  date: string;
  total: number;
}

export interface ISaleItem {
  id: number;
  code: string;
  product: string;
  total: number;
  customer: string;
  status: "paid" | "unpaid" | "pending";
}