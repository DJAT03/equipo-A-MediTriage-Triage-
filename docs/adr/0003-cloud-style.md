# ADR-0003: Elección del Estilo Cloud y Servicios

- **Estado:** Aceptado (10-09-2026)
- **Decisores:** Gibran E., Vicente T., Benjamín Z., Deyner A., Jhorgely C.

## Contexto
MediTriage requiere optimizar el triaje clínico en urgencias reduciendo los tiempos de clasificación de 30 a 5 minutos y asegurando una correcta priorización de pacientes críticos mediante la escala ESI (US3). Cada recomendación del sistema debe registrarse de forma inmutable y trazable (US5), cumpliendo con la Ley 19.628 y Ley 21.719. Con un equipo reducido de 5 personas y la necesidad de un MVP funcional, se prioriza un stack moderno en la nube (React, Firebase, Google AI Studio) descartando alternativas locales o monolíticas obsoletas.

## Opciones Evaluadas
- **Monolito tradicional legacy (PHP/XAMPP + MySQL local):** Descartado por baja escalabilidad, falta de seguridad integrada y dificultad para conectar con APIs de IA modernas.
- **Microservicios completos:** Descartado por exceso de complejidad operacional para un equipo de 5 personas.
- **Serverless puro:** Descartado ya que la consistencia transaccional y el modelo de datos clínico se gestionan de manera más limpia en un monolito modular.
- **Híbrido (Monolito modular + Función serverless):** Elegido.

## Decisión
Implementar un monolito modular base sobre Firebase (Hosting, Firestore, Auth) para la gestión unificada de pacientes, formularios y tableros, complementado con una Cloud Function independiente para el motor IA ESI (US3) que consume la API de Google AI Studio.

## Consecuencias
- **Positivas:** Menor fricción operacional para un equipo pequeño, despliegues únicos simplificados, excelente tiempo de respuesta en la IA (<5s) gracias al escalado independiente y total alineación con el stack moderno aprobado en el ADR-0002.
- **Negativas / Riesgos:** Involucra un salto de red entre el monolito y la Cloud Function que requiere manejo de tiempos de espera (*timeouts*); dependencia estricta del ecosistema de Firebase y Google Cloud.
