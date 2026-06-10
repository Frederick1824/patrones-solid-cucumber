import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { WordDocument, PDFDocument, DocumentProcessor } from '../src/problema2';

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

let processor: DocumentProcessor;
let wordDoc: WordDocument;
let pdfDoc: PDFDocument;

Given('un documento Word', function () {
  wordDoc = new WordDocument();
  processor = new DocumentProcessor();
});

Given('un documento PDF', function () {
  pdfDoc = new PDFDocument();
  processor = new DocumentProcessor();
});

When('lo proceso con acceso completo', function () {
  captureLogs();
  processor.processFullAccess(wordDoc);
});

When('lo proceso como solo lectura', function () {
  captureLogs();
  processor.processReadOnly(pdfDoc);
});

Then('debe abrir, editar y guardar el documento', function () {
  try {
    assert.ok(consoleOutput.some(msg => msg.includes('Abriendo documento Word')));
    assert.ok(consoleOutput.some(msg => msg.includes('Editando texto')));
    assert.ok(consoleOutput.some(msg => msg.includes('Guardando cambios en disco')));
  } finally {
    restoreConsole();
  }
});

Then('debe abrir el documento sin editar ni guardar', function () {
  try {
    assert.ok(consoleOutput.some(msg => msg.includes('Abriendo PDF protegido')));
    assert.ok(!consoleOutput.some(msg => msg.includes('Editando')));
    assert.ok(!consoleOutput.some(msg => msg.includes('Guardando')));
  } finally {
    restoreConsole();
  }
});

Then('no debe responder a los métodos "edit" ni "save"', function () {
  // Verificar en tiempo de ejecución que las propiedades no existen
  assert.strictEqual((pdfDoc as any).edit, undefined);
  assert.strictEqual((pdfDoc as any).save, undefined);
});