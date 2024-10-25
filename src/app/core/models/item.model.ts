import { PaymentModel } from "./payment.model";

export interface ItemModel{
    name: string,
    total: number,
    payments: Array<PaymentModel>
}