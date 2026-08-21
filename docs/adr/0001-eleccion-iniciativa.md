# ADR 0001: Elección de Iniciativa - MediTriage Triage

## Título
Seleccionar y documentar la iniciativa del proyecto MediTriage Triage para centros de atención primaria en Chile

## Contexto
La Red de centros de atención primaria en Chile enfrenta desafíos significativos con:
- Tiempos de espera prolongados en servicios de urgencias
- Falta de priorización estructurada de pacientes
- Necesidad de optimizar asignación de recursos médicos
- Obligación de cumplir con regulaciones chilenas de protección de datos (Ley 19.628 y Ley 21.719)

Se requiere una solución que integre tecnología de IA para mejorar el proceso de triaje mientras mantiene la seguridad, privacidad y conformidad normativa.

## Decisión
Se adopta el desarrollo de **MediTriage Triage**, una plataforma inteligente de priorización de pacientes que:

1. Utiliza un motor de IA para sugiere categorías ESI (1-5)
2. Integra registro de pacientes con validación de RUT
3. Captura síntomas y signos vitales de forma estructurada
4. Proporciona explicabilidad en las recomendaciones del sistema
5. Mantiene trazabilidad completa de decisiones (audit log)
6. Cumple estrictamente con normativa chilena de datos sensibles

### Componentes Principales
- **Frontend**: Interfaz de paciente y tablero médico
- **Backend**: APIs REST con autenticación y validaciones
- **Motor IA**: Algoritmo de triaje ESI con explicabilidad
- **Base de Datos**: Almacenamiento encriptado de datos clínicos
- **Auditoría**: Sistema de logs inmutables para trazabilidad

## Consecuencias

### Positivas ✅
- Reducción significativa de tiempos de espera en urgencias (objetivo: >30%)
- Decisiones de triaje más consistentes y basadas en datos
- Cumplimiento normativo asegurado desde el diseño
- Transparencia en decisiones automatizadas (explicabilidad IA)
- Trazabilidad completa para auditoría y mejora continua
- Mejor experiencia del paciente y optimización de recursos médicos

### Desafíos ⚠️
- Complejidad de integración con sistemas legacy de centros
- Requiere entrenamiento de personal médico en nueva plataforma
- Necesidad de validación clínica rigurosa antes de implementación
- Cumplimiento regulatorio en evolución continua
- Dependencia de calidad y confiabilidad del motor IA

### Mitigaciones
- Fase piloto en 1-2 centros antes de rollout completo
- Capacitación exhaustiva para personal médico
- Validación clínica con expertos médicos independientes
- Auditorías de privacidad y seguridad periódicas
- Equipo de compliance legal desde inicio del proyecto

## Fecha
21 de agosto de 2026

## Autores
- Equipo A: MediTriage Triage (DJAT03)

## Estado
✅ **Aceptado**

## Referencias
- [CHARTER.md](../../CHARTER.md) - Misión y valores del equipo
- Ley 19.628 - Protección de Datos Personales
- Ley 21.719 - Regulación de Inteligencia Artificial en Chile
