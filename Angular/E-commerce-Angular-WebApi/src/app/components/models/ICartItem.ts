import { Iproduct } from "./iproduct";

export interface ICartItem{
    id: number;
    productId: number;
    product: Iproduct;
    quantity: number;
    sessionId: string;
}