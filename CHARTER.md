# CHARTER - Equipo A: MediTriage Triage

## Misión del Equipo
Desarrollar una plataforma inteligente de priorización de pacientes para centros de atención primaria en Chile que utilice IA para reducir tiempos de espera en urgencias, respetando rigurosamente la Ley 19.628 y Ley 21.719.

## Visión
Implementar un sistema de triaje asistido por IA que mejore la experiencia del paciente y optimice la asignación de recursos médicos en centros de atención primaria.

## Valores Fundamentales
- **Seguridad de Datos**: Cumplimiento estricto de Ley 19.628 y Ley 21.719 (protección de datos sensibles)
- **Transparencia**: Explicabilidad de todas las recomendaciones del motor IA
- **Calidad Clínica**: Priorizamos decisiones médicas éticas y basadas en evidencia
- **Colaboración**: Trabajo en equipo integrado entre desarrolladores.
- **Iteración Rápida**: Mejora continua basada en feedback.

## Reglas de Trabajo
1. **Códigos de Conducta**: Respeto mutuo, puntualidad, participación activa en reuniones
2. **Propiedad Compartida**: Todos son responsables de la calidad del código y la documentación
3. **Revisiones Peer**: Todo código debe pasar revisión (mínimo 1 aprobación)
4. **Documentación**: Cada cambio significativo debe documentarse (ADRs, READMEs actualizados)

## Canales de Comunicación
- **Reuniones Sincrónicas**: Semanales (día/hora a definir)
- **Chat**: Slack, Whatsapp, Discord y similar para comunicación diaria
- **Documentación**: GitHub Wiki y READMEs
- **Issues & PRs**: Seguimiento de trabajo y código
- **Escalaciones**: Contacto directo con Product Owner ante bloqueadores

## Cadencia de Reuniones
- **Weekly Standup** (30 min): Lunes - Progreso, bloqueadores, próximos pasos
- **Sprint Planning** (Bi-semanal): Definición de trabajo para próximas 2 semanas
- **Code Review Session** (Semanal): Revisión de PRs importantes y patrones
- **Retrospective** (Cada 2 semanas): Lecciones aprendidas y mejoras de proceso

## Definition of Done (DoD)
Una tarea se considera completada cuando cumple con ALL los siguientes criterios:

1. ✅ **Código Revisado**: Mínimo 1 integrante del equipo ha revisado y aprobado el código
2. ✅ **Pruebas Funcionales**: Tests unitarios ejecutados exitosamente (80% cobertura en módulos críticos)
3. ✅ **Documentación Actualizada**: READMEs, ADRs o comentarios en código actualizados según cambios
4. ✅ **Sin Errores Críticos**: Validación de seguridad, encriptación y cumplimiento de Ley 19.628/21.719
5. ✅ **Cumple Requisitos Funcionales**: La funcionalidad se ajusta exactamente a lo descrito en la user story
6. ✅ **Build & Deploy**: El código se integra sin conflictos y pasa el pipeline de CI/CD
7. ✅ **Trazabilidad**: Todos los cambios están registrados en el audit log (especialmente para funciones IA)

**Responsable**: Product Owner + Tech Lead validan el cumplimiento de DoD antes del merge a rama principal.

## Funcionalidades Core
1. ✅ Registro de paciente con validación de RUT y consentimiento informado
2. ✅ Formulario de síntomas + captura de signos vitales
3. ✅ Motor IA que sugiere categoría ESI (1–5) con explicación
4. ✅ Tablero para personal médico con priorización dinámica
5. ✅ Trazabilidad y audit log de cada recomendación IA

## Restricciones Regulatorias
- Cumplimiento de Ley 19.628 (Protección de Datos Personales)
- Cumplimiento de Ley 21.719 (Regulación de IA)
- Consentimiento informado explícito de pacientes
- Encriptación de datos en reposo y en tránsito
- Derecho a explicación de decisiones automatizadas

## Definición de Éxito
- Plataforma operacional en 3 meses
- Reducción >30% en tiempos de espera promedio
- 100% trazabilidad de decisiones IA
- 0 vulnerabilidades críticas de seguridad
- Satisfacción del usuario médico >4.5/5

---
**Versión**: 1.1  
**Fecha de Creación**: 21 de agosto de 2026  
**Última Actualización**: 21 de agosto de 2026  
**Propietario**: Equipo A MediTriage
