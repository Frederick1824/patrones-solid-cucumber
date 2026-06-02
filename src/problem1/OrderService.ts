import { Order } from "./Order";
import { ShippingStrategy } from "./shipping/ShippingStrategy";
import { PaymentStrategy } from "./payment/PaymentStrategy";
import { EmailNotification } from "./notification/EmailNotification";

export class OrderService {
    constructor(
        private shippingStrategy: ShippingStrategy,
        private paymentStrategy: PaymentStrategy,
        private notification: EmailNotification
    ) {}

    processOrder(order: Order): void {
        const shippingCost = this.shippingStrategy.calculate();
        const total = order.totalAmount + shippingCost;

        console.log(`Costo de envío: $${shippingCost}`);
        this.paymentStrategy.pay(total);
        this.notification.send(order.id);
    }
}