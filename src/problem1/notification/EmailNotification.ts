export class EmailNotification {
    send(orderId: string): void {
        console.log(
            `Email enviado: Su pedido ${orderId} ha sido procesado.`
        );
    }
}