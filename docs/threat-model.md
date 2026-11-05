### Threat Modeling – meditrriage-api (STRIDE)

El análisis de amenazas del microservicio meditrriage-api se realiza mediante el modelo STRIDE, con el objetivo de identificar posibles vulnerabilidades y establecer controles de seguridad que permitan proteger la información médica, garantizar la integridad de los datos y restringir el acceso no autorizado al sistema.

**Activos principales:** Datos de salud de pacientes (PII/PHI), credenciales de acceso del personal médico y registros inmutables de triaje.

**Límites de confianza (Trust Boundaries):** El paso de datos desde la red pública hacia el API, y la conexión interna entre el API y la base de datos.

| **Categoría STRIDE** | **Amenaza identificada** | **Medida de mitigación** |
|---|---|---|
| **Spoofing (Suplantación)** | Un atacante podría hacerse pasar por un cliente autorizado de la API para acceder a información confidencial de los pacientes. | Implementar autenticación mediante tokens JWT firmados, verificando la identidad y validez de cada solicitud. |
| **Tampering (Manipulación)** | Un tercero podría alterar los datos de triaje médico durante su transmisión, modificando información relevante sobre el estado o la prioridad de un paciente. | Proteger la comunicación mediante HTTPS con TLS y validar la estructura de los datos recibidos utilizando esquemas como Zod o Joi. |
| **Repudiation (Repudio)** | Un profesional de la salud podría negar haber realizado cambios en la prioridad o clasificación de un paciente. | Implementar registros de auditoría que permitan rastrear las modificaciones realizadas, utilizando identificadores únicos como `trace_id` y mecanismos que protejan la integridad de los registros. |
| **Information Disclosure (Divulgación de información)** | La información personal y médica de los pacientes podría quedar expuesta mediante mensajes de error, registros del sistema o trazas de ejecución. | Aplicar sanitización de logs, evitar registrar datos sensibles y ocultar los detalles técnicos de los errores en el entorno de producción. |
| **Denial of Service (Denegación de servicio)** | Un atacante podría enviar un volumen excesivo de solicitudes a los endpoints públicos, provocando la saturación de los recursos de la API. | Configurar mecanismos de limitación de solicitudes (*Rate Limiting*), como `express-rate-limit`, para controlar la cantidad de peticiones por dirección IP. |
| **Elevation of Privilege (Elevación de privilegios)** | Un usuario con permisos básicos podría intentar obtener privilegios administrativos o acceder a funcionalidades restringidas del sistema. | Implementar un control de acceso basado en roles (RBAC), aplicando el principio de mínimo privilegio y verificando los permisos antes de ejecutar cada operación. |

**Conclusión:** La aplicación de estos controles permite reducir los riesgos asociados a la API MediTriage, fortaleciendo la autenticación, la protección de los datos médicos, la trazabilidad de las operaciones y la gestión de privilegios. De esta manera, se contribuye a mantener la confidencialidad, integridad y disponibilidad del sistema.
