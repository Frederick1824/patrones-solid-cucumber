Feature: Control de dispositivos mediante interruptor (DIP)
  Como usuario
  Quiero encender y apagar diferentes dispositivos usando el mismo interruptor
  Para que el interruptor dependa de la abstracción Switchable, no de implementaciones concretas

  Background:
    Given un interruptor genérico

  Scenario Outline: Encender y apagar un dispositivo
    Given un dispositivo <tipo>
    When el interruptor opera "on"
    Then el dispositivo debe encenderse
    When el interruptor opera "off"
    Then el dispositivo debe apagarse

    Examples:
      | tipo               |
      | Bombilla tradicional |
      | SmartLight          |
      | Ventilador          |

  Scenario: El interruptor puede recibir cualquier dispositivo que implemente Switchable
    Given un dispositivo "Ventilador"
    Then el interruptor debe aceptarlo sin errores de tipo

  Scenario: El interruptor no depende de clases concretas
    Given el código fuente de la clase Switch
    Then no debe contener referencias a "TraditionalBulb", "SmartLight" ni "Fan"