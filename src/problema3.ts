// Problema 3: El Interruptor Rígido
// Abstracción: cualquier dispositivo encendible/apagable
export interface Switchable {
    turnOn(): void;
    turnOff(): void;
}

// Implementaciones concretas
export class TraditionalBulb implements Switchable {
    turnOn() { console.log("Bombilla tradicional encendida... consumiendo mucha energía."); }
    turnOff() { console.log("Bombilla tradicional apagada."); }
}

export class SmartLight implements Switchable {
    turnOn() { console.log("SmartLight encendida, color blanco."); }
    turnOff() { console.log("SmartLight apagada."); }
}

export class Fan implements Switchable {
    turnOn() { console.log("Ventilador girando a velocidad media."); }
    turnOff() { console.log("Ventilador apagado."); }
}

// Ahora el interruptor de alto nivel depende de la abstracción, no de la implementaciónn
export class Switch {
    constructor(private device: Switchable) {}

    operate(action: string) {
        if (action === "on") {
            this.device.turnOn();
        } else {
            this.device.turnOff();
        }
    }
}

// Prueba de funcionamiento
/*
console.log("Control de bombilla tradicional");
const bulb = new TraditionalBulb();
const wallSwitch = new Switch(bulb);
wallSwitch.operate("on");
wallSwitch.operate("off");

console.log("\nControl de SmartLight");
const light = new SmartLight();
const smartSwitch = new Switch(light);
smartSwitch.operate("on");
smartSwitch.operate("off");

console.log("\nControl de ventilador");
const fan = new Fan();
const fanSwitch = new Switch(fan);
fanSwitch.operate("on");
fanSwitch.operate("off");
*/