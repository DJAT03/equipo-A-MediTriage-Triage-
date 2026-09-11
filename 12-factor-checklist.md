# Auditoría de los 12 Factores — MediTriage

Tabla de auditoría de los 12 factores basada en el diagnóstico oficial del proyecto MediTriage, incluyendo estados, acciones concretas y responsables.

| # | Factor | Estado | Evidencia / Diagnóstico | Acción Concreta / Responsable |
|---|---|---|---|---|
| 1 | **Codebase** | Cumple | Único repositorio Git (`equipo-AMediTriage-Triage`) con múltiples PRs. | Ya se cumple.<br>**Resp:** Todo el equipo |
| 2 | **Dependencies** | No cumple | Faltan manifiestos de dependencias versionados en frontend y Cloud Functions. | Declarar dependencias en `package.json` y fijar versiones exactas.<br>**Resp:** Vicente T. |
| 3 | **Config** | No cumple | Credenciales de Firebase y API key de AI Studio sin externalizar. | Mover keys a variables de entorno (`.env`) y Secret Manager.<br>**Resp:** Benjamín Z. |
| 4 | **Backing services** | No cumple | Firestore y Google AI Studio referenciados directamente en código. | Acceder vía URLs y keys inyectadas por variables de entorno.<br>**Resp:** Deyner A. |
| 5 | **Build, release, run** | No cumple | Falta pipeline CI/CD que separe estrictamente las 3 fases. | Configurar GitHub Actions (Build, Release, Run).<br>**Resp:** Gibran E. |
| 6 | **Processes** | No cumple | Riesgo de almacenar estado de sesión en memoria de servidores. | Mantener estado en cliente o tokens (Firestore/Auth), stateless.<br>**Resp:** Vicente T. |
| 7 | **Port binding** | No aplica | Delegado a Firebase Hosting y Cloud Functions (servicios gestionados). | N/A (Delegado al proveedor cloud) |
| 8 | **Concurrency** | No cumple | Falta diseño de escalamiento para múltiples peticiones simultáneas de triaje. | Desplegar motor IA como Cloud Function stateless con auto-scaling.<br>**Resp:** Jhorgely C. |
| 9 | **Disposability** | No cumple | Sin manejo de apagado graceful ante redeploys. | Implementar shutdown graceful (drenar tareas pendientes <30s).<br>**Resp:** Deyner A. |
| 10 | **Dev/prod parity** | No cumple | Posibles desfases al no estandarizar el entorno local de desarrollo. | Usar Firebase Local Emulator Suite en desarrollo.<br>**Resp:** Benjamín Z. |
| 11 | **Logs** | No cumple | Existe audit log clínico, pero falta event stream técnico de aplicación. | Emitir logs estructurados (JSON) a stdout (Cloud Logging).<br>**Resp:** Gibran E. |
| 12 | **Admin processes** | No aplica | No hay tareas administrativas one-off requeridas por el MVP actual. | N/A (Ejecutar como Cloud Functions cuando sea necesario) |
