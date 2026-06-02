import { Order } from "./Order";
import { OrderService } from "./OrderService";

import { StandardShipping } from "./shipping/StandardShipping";
import { PaypalPayment } from "./payment/PaypalPayment";
import { EmailNotification } from "./notification/EmailNotification";

const order = new Order("ORD-001", 100);

const service = new OrderService(
    new StandardShipping(),
    new PaypalPayment(),
    new EmailNotification()
);

service.processOrder(order);