import { ShippingStrategy } from "./ShippingStrategy";

export class ExpressShipping implements ShippingStrategy {
    calculate(): number {
        return 25;
    }
}