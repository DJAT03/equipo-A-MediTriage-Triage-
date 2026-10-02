### User Stories
Las 5 historias
1.- Registro de paciente con RUT + consentimiento.
Como paciente,
quiero registrar mis datos con validación de RUT y firmar consentimiento digital,
para ingresar al sistema de urgencias cumpliendo la ley de datos sensibles.

2.- Formulario de síntomas y signos vitales.
Como paciente,
quiero reportar mis síntomas y entregar mis signos vitales en un formulario guiado,
para que la enfermera y la IA puedan evaluarme sin errores.

3.- Motor IA que sugiere categoría ESI.
Como paciente,
quiero que el sistema determine mi categoría ESI automáticamente,
para ser priorizado rápidamente según la gravedad de mi caso.

4.- Tablero médico con prioridad dinámica.
Como médico jefe de turno,
quiero ver un tablero con los pacientes ordenados por gravedad,
para atender primero los casos críticos.

5.- Audit log de cada recomendación IA.
Como auditor clínico,
quiero consultar el registro inmutable de las decisiones de la IA,
para asegurar trazabilidad y cumplir la normativa chilena.

### Los 15 escenarios Gherkin
Feature: Registro de paciente

Scenario: Registro exitoso con RUT válido (Caso Feliz)
  Given el paciente ingresa su RUT correctamente
  And acepta el consentimiento informado
  When el sistema valida los datos
  Then el registro se completa exitosamente
  And el paciente queda habilitado para triage

Scenario: RUT incompleto o inválido (Caso Borde)
  Given el paciente ingresa un RUT incompleto
  When el sistema intenta validar el RUT
  Then se muestra un mensaje indicando que el RUT es inválido
  And se solicita corregir el dato

Scenario: Fallo del servicio de validación (Caso Error)
  Given el paciente intenta registrarse
  When el servicio de validación de RUT no responde
  Then el sistema muestra un mensaje de error temporal
  And no permite avanzar al triage

Feature: Formulario de síntomas y signos vitales

Scenario: Ingreso completo de síntomas y signos vitales (Caso Feliz)
  Given el paciente completa todos los campos requeridos
  When la enfermera confirma el formulario
  Then los datos quedan registrados correctamente
  And el caso queda listo para evaluación de IA

Scenario: Campos obligatorios vacíos (Caso Borde)
  Given el paciente deja síntomas o signos vitales sin completar
  When la enfermera intenta guardar el formulario
  Then el sistema indica qué campos faltan
  And no permite continuar

Scenario: Error al guardar los datos (Caso Error)
  Given el formulario está completo
  When el sistema intenta guardar los datos
  Then ocurre un error inesperado
  And se muestra un mensaje indicando que se debe reintentar

Feature: Motor IA para sugerencia ESI

Scenario: Sugerencia exitosa con datos completos (Caso Feliz)
  Given síntomas y signos vitales completos
  When el motor IA evalúa el caso
  Then se muestra la categoría ESI sugerida
  And se explica la justificación clínica

Scenario: Datos insuficientes para evaluar (Caso Borde)
  Given faltan signos vitales o síntomas clave
  When se solicita la evaluación de IA
  Then el sistema indica que faltan datos
  And no genera ninguna categoría ESI

Scenario: IA no responde en el tiempo esperado (Caso Error)
  Given el paciente está registrado
  When el motor IA tarda más de 3 segundos
  Then el sistema activa triage manual
  And registra el fallo en el audit log

### La tabla MoSCoW
Must (obligatorio para el MVP)
Registro de paciente
Formulario de síntomas y signos vitales
Motor IA que sugiere categoría ESI

Should (importante)
Tablero médico dinámico

Could (opcional)
Audit log avanzado

Won’t (no va ahora)
Analítica avanzada
Reportes estadísticos
Panel administrativo complejo

### El MVP
El MVP incluye solo los Must:
Registro de paciente con validación de RUT y consentimiento.
Formulario de síntomas y signos vitales.
Motor IA que sugiere categoría ESI.
