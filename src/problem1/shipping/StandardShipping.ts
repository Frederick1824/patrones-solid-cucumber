import { ShippingStrategy } from "./ShippingStrategy";

export class StandardShipping implements ShippingStrategy {
    calculate(): number {
        return 10;
    }
}