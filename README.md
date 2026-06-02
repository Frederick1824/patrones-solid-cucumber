# Patrones SOLID con TypeScript y Cucumber

## Integrantes

- Federico Montoro
- Lautaro Rivieri

## Problema 1 - Sistema de Envíos Todopoderoso

### Principios aplicados

#### SRP - Single Responsibility Principle

La implementación original concentraba múltiples responsabilidades dentro de la clase OrderService.

Para resolver este problema se dividió el sistema en componentes especializados:

- ShippingStrategy para el cálculo de envíos.
- PaymentStrategy para el procesamiento de pagos.
- EmailNotification para las notificaciones.
- OrderService para coordinar el proceso.

Cada clase posee una única responsabilidad, facilitando el mantenimiento y la reutilización.

#### OCP - Open Closed Principle

La implementación original utilizaba estructuras condicionales para determinar el método de envío y el método de pago.

La solución se implementó mediante interfaces y polimorfismo.

De esta forma es posible incorporar nuevos métodos de envío o pago sin modificar el código existente.

Ejemplos:

- StandardShipping
- ExpressShipping
- PaypalPayment
- CreditCardPayment

El sistema queda abierto para extensión y cerrado para modificación.

#### Resultado de prueba

Salida obtenida:

```text
Costo de envío: $10
Procesando pago de $110 vía PayPal
Email enviado: Su pedido ORD-001 ha sido procesado.
```

--- 
## Problema 2 - El Procesador de Documentos Rebelde

### Violaciones originales

- La interfaz `DocumentHandler` obligaba a todos los documentos a tener métodos `edit()` y `save()`. Un `PDFDocument` de solo lectura no puede implementarlos, por lo que lanza excepciones.
- **LSP violado**: una subclase (`PDFDocument`) no puede sustituir a su base (`DocumentHandler`) sin romper el programa.
- **ISP violado**: las clases se ven forzadas a depender de métodos que no necesitan.

### Principios aplicados:

#### LSP - Liskov Substitution Principle
Se asegura que cualquier subclase o implementación pueda sustituir a su firma base sin romper el programa. Para ello, se diseñan interfaces que reflejan exactamente las capacidades reales de cada documento.

#### ISP - Interface Segregation Principle

Se segregó la interfaz `DocumentHandler` en tres roles más pequeños y específicos:

- `Openable` – solo para abrir.
- `Editable` – para editar.
- `Savable` – para guardar.

Luego:

- `WordDocument` implementa las tres interfaces.
- `PDFDocument` implementa solo `Openable` (y opcionalmente puede exponer `isReadonly`).

El cliente (procesador) ya no asume que todo documento es editable. Se crea un `DocumentProcessor` con dos métodos específicos:

- `processReadOnly(doc: Openable)` – solo requiere poder abrir.
- `processFullAccess(doc: Openable & Editable & Savable)` – requiere todas las capacidades.

De esta forma, cualquier implementación respeta el contrato que realmente necesita, sin lanzar excepciones inesperadas.

#### Resultado de prueba

Salida obtenida:

``` text
Procesando Word con acceso completo
Abriendo documento Word...
Editando texto...
Guardando cambios en disco...

Procesando PDF como solo lectura
Abriendo PDF protegido...
```
## Problema 3: El Interruptor Rígido

### Violación original

- La clase `Switch` crea internamente una instancia concreta de `TraditionalBulb`. Depende de un detalle de bajo nivel.
- Si se quiere controlar otro dispositivo (`SmartLight`, `Fan`), hay que modificar la clase``Switch`.

### Principio aplicado:

#### DIP - Dependency Inversion Principle

1. Se crea una **abstracción** `Switchable` con los métodos `turnOn()` y `turnOff()`.
2. `TraditionalBulb`, `SmartLight` y `Fan` implementan dicha abstracción.
3. `Switch` recibe cualquier `Switchable` por **inyección de dependencias** (constructor).
4. Ahora `Switch` depende de la abstracción, no de la concreción. Se puede cambiar el dispositivo sin modificar la clase `Switch`.

#### Resultado de prueba

Salida obtenida:

``` text
Control de bombilla tradicional
Bombilla tradicional encendida... consumiendo mucha energía.
Bombilla tradicional apagada.

Control de SmartLight
SmartLight encendida, color blanco.
SmartLight apagada.

Control de ventilador
Ventilador girando a velocidad media.
Ventilador apagado.
```

### [**Subir ⬆**](#integrantes)