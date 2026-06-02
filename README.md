# Patrones SOLID con TypeScript y Cucumber

## Integrantes

- Federico Montoro
- Lauty

---

# Problema 1 - Sistema de Envíos Todopoderoso

## Principios aplicados

### SRP - Single Responsibility Principle

La implementación original concentraba múltiples responsabilidades dentro de la clase OrderService.

Para resolver este problema se dividió el sistema en componentes especializados:

- ShippingStrategy para el cálculo de envíos.
- PaymentStrategy para el procesamiento de pagos.
- EmailNotification para las notificaciones.
- OrderService para coordinar el proceso.

Cada clase posee una única responsabilidad, facilitando el mantenimiento y la reutilización.

### OCP - Open Closed Principle

La implementación original utilizaba estructuras condicionales para determinar el método de envío y el método de pago.

La solución se implementó mediante interfaces y polimorfismo.

De esta forma es posible incorporar nuevos métodos de envío o pago sin modificar el código existente.

Ejemplos:

- StandardShipping
- ExpressShipping
- PaypalPayment
- CreditCardPayment

El sistema queda abierto para extensión y cerrado para modificación.

## Resultado de prueba

Salida obtenida:

```text
Costo de envío: $10
Procesando pago de $110 vía PayPal
Email enviado: Su pedido ORD-001 ha sido procesado.
