import { ICartItem } from "./ICartItem"

export interface ICart{

    id: number;
    sessionId: string;
    cartItems: ICartItem[];
    totalAmount: number;
}