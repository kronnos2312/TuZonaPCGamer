import { Product } from "./Product";

export type InventoryItem = {
    id: number| "";
    quantity: number | "";
    price: number | "";
    description: string;
    product: Product;
    arrivalDate:string;
    barcode:string;
};