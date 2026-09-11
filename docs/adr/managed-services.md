# Servicios Gestionados del C4 Nivel 2 — MediTriage

Definición de los servicios gestionados seleccionados para los contenedores del modelo C4 Nivel 2 del proyecto MediTriage, justificados mediante el marco de decisión correspondiente.

| Contenedor C4 L2 | Servicio gestionado elegido | Por qué (Framework de decisión S04) |
|---|---|---|
| **Frontend web** (Paciente, Enfermería, Auditor) | Firebase Hosting | No es diferenciador del producto; servicio managed maduro con CDN y HTTPS incluidos. |
| **Autenticación** (Enfermero/a, Auditor clínico) | Firebase Authentication | Evita construir gestión de sesiones/roles propia; se integra nativo con Firestore Security Rules. |
| **Base de datos clínica** (pacientes, formularios, historial) | Cloud Firestore | Ya definido en ADR-0002; NoSQL gestionado, escalable y con soporte offline nativo (requisito de US2). |
| **Motor IA ESI** (US3) | Cloud Functions + Google AI Studio (Gemini API) | Es el diferenciador del producto (lógica de negocio de triaje), pero la infraestructura de cómputo e inferencia se delega para cumplir el <3s / <5s de respuesta. |
| **Audit log clínico inmutable** (US5) | Cloud Logging + BigQuery (export de logs) | Managed y con retención/inmutabilidad configurable; cumple la normativa chilena de trazabilidad sin operar infraestructura propia. |
| **Firma digital / consentimiento informado** | Cloud Storage | Almacenamiento de objetos maduro y económico para PDFs/firmas, con reglas de acceso por rol. |

**Total:** 5 servicios gestionados principales cubriendo los contenedores del C4 Nivel 2.
