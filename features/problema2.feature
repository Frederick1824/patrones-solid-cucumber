Feature: Procesamiento de documentos respetando LSP e ISP
  Como procesador de documentos
  Quiero manejar documentos según sus capacidades reales
  Para no violar el principio de sustitución de Liskov

  Scenario: Procesar documento Word con acceso completo
    Given un documento Word
    When lo proceso con acceso completo
    Then debe abrir, editar y guardar el documento

  Scenario: Procesar documento PDF como solo lectura
    Given un documento PDF
    When lo proceso como solo lectura
    Then debe abrir el documento sin editar ni guardar

  Scenario: El documento PDF no tiene métodos edit() ni save()
    Given un documento PDF
    Then no debe responder a los métodos "edit" ni "save"