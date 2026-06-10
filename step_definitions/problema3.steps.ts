import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import path from 'path';
import fs from 'fs';
import { Switchable, TraditionalBulb, SmartLight, Fan, Switch } from '../src/problema3';

// Capturar logs de consola
let consoleOutput: string[] = [];
const originalConsoleLog = console.log;

function captureLogs() {
  consoleOutput = [];
  console.log = (...args: any[]) => {
    consoleOutput.push(args.join(' '));
    originalConsoleLog(...args); // opcional: también mostrar en consola real
  };
}

function restoreConsole() {
  console.log = originalConsoleLog;
}

let switchDevice: Switch;
let currentDevice: Switchable;

Given('un interruptor genérico', function () {
  // El interruptor se creará con un dispositivo específico en el siguiente paso
  switchDevice = null as any;
});

Given('un dispositivo {string}', function (deviceType: string) {
  switch (deviceType) {
    case 'Bombilla tradicional':
      currentDevice = new TraditionalBulb();
      break;
    case 'SmartLight':
      currentDevice = new SmartLight();
      break;
    case 'Ventilador':
      currentDevice = new Fan();
      break;
    default:
      throw new Error(`Dispositivo desconocido: ${deviceType}`);
  }
  switchDevice = new Switch(currentDevice);
});

Given('un dispositivo Bombilla tradicional', function () {
  currentDevice = new TraditionalBulb();
  switchDevice = new Switch(currentDevice);
});

Given('un dispositivo SmartLight', function () {
  currentDevice = new SmartLight();
  switchDevice = new Switch(currentDevice);
});

Given('un dispositivo Ventilador', function () {
  currentDevice = new Fan();
  switchDevice = new Switch(currentDevice);
});

Given('el código fuente de la clase Switch', function () {
  // No se necesita acción, solo existe para que el paso no falle
  // El Then leerá el archivo
});

When('el interruptor opera {string}', function (action: string) {
  captureLogs();
  switchDevice.operate(action);
});

Then('el dispositivo debe encenderse', function () {
  try {
    const hasTurnOn = consoleOutput.some(msg => 
      msg.includes('encendida') || msg.includes('girando')
    );
    assert.ok(hasTurnOn, 'No se detectó mensaje de encendido');
  } finally {
    restoreConsole();
  }
});

Then('el dispositivo debe apagarse', function () {
  try {
    const hasTurnOff = consoleOutput.some(msg => msg.includes('apagada') || msg.includes('apagado'));
    assert.ok(hasTurnOff, 'No se detectó mensaje de apagado');
  } finally {
    restoreConsole();
  }
});

Then('el interruptor debe aceptarlo sin errores de tipo', function () {
  // En TypeScript esto ya se verifica en compilación.
  // En runtime, verificamos que la instancia de Switch exista y contenga un dispositivo.
  assert.ok(switchDevice instanceof Switch);
  assert.ok(currentDevice !== undefined);
});


Then('no debe contener referencias a "TraditionalBulb", "SmartLight" ni "Fan"', 
  function () {
    const sourcePath = path.join(__dirname, '../src/problema3.ts');
    const sourceCode = fs.readFileSync(sourcePath, 'utf-8');
    
    // Buscar la definición de la clase Switch
    const switchClassMatch = sourceCode.match(/export class Switch\s*\{([^}]*)\}/s);
    assert.ok(switchClassMatch, 'No se encontró la clase Switch');
    const switchBody = switchClassMatch[1];
    
    const forbidden = ['TraditionalBulb', 'SmartLight', 'Fan'];
    for (const name of forbidden) {
      const regex = new RegExp(`\\b${name}\\b`);
      assert.ok(!regex.test(switchBody), 
        `La clase Switch contiene referencia prohibida a ${name}`);
    }
  }
);