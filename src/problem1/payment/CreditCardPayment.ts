import { PaymentStrategy } from "./PaymentStrategy";

export class CreditCardPayment implements PaymentStrategy {
    pay(amount: number): void {
        console.log(`Cargando $${amount} a la tarjeta de crédito`);
    }
}