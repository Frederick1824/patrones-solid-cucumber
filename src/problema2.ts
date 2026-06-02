// Problema 2: El Procesador de Documentos Rebelde
// Interfaces segregadas
export interface Openable {
    open(): void;
}

export interface Editable {
    edit(): void;
}

export interface Savable {
    save(): void;
}

// Documento Word: soporta todas las operaciones
export class WordDocument implements Openable, Editable, Savable {
    open() { console.log("Abriendo documento Word..."); }
    edit() { console.log("Editando texto..."); }
    save() { console.log("Guardando cambios en disco..."); }
}

// Documento PDF de solo lectura: solo puede abrirse
export class PDFDocument implements Openable {
    open() { console.log("Abriendo PDF protegido..."); }
}

// Procesador que respeta LSP: solo usa lo que el documento puede hacer
export class DocumentProcessor {
    // Solo requiere que el documento se pueda abrir
    processReadOnly(doc: Openable) {
        doc.open();
    }

    // Requiere documento con todas las capacidades: abrir, editar y guardar
    processFullAccess(doc: Openable & Editable & Savable) {
        doc.open();
        doc.edit();
        doc.save();
    }
}

// Prueba de funcionamiento
/*
const processor = new DocumentProcessor();
const word = new WordDocument();
const pdf = new PDFDocument();

console.log("Procesando Word con acceso completo");
processor.processFullAccess(word);

console.log("\nProcesando PDF como solo lectura");
processor.processReadOnly(pdf);
*/
// El siguiente código NO compilaría porque PDF no tiene edit() ni save()
// processor.processFullAccess(pdf); // Error de TypeScript
