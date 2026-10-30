
# ADR 0005: Estrategia de Conciliación de Despliegue (Push vs. Pull)

## Estado
Aprobado

## Contexto
El proyecto MediTriage requiere un mecanismo automatizado, seguro y auditable para llevar los cambios de código desde la Integración Continua (CI) hasta el despliegue en Kubernetes (CD). En la sesión anterior (S07), logramos contenedorizar y desplegar la API en un clúster local `kind`, pero el proceso de despliegue seguía siendo manual o dependía de un flujo *push-based* clásico, donde el pipeline de CI necesitaba credenciales de administración del clúster para aplicar los cambios[cite: 2, 3]. Para MediTriage, como una plataforma HealthTech, la seguridad, la trazabilidad estricta y el cumplimiento normativo son críticos.

## Decisiones

Hemos evaluado dos estrategias principales de despliegue continuo en Kubernetes y hemos seleccionado las siguientes herramientas:

### 1. Estrategia: Conciliación Pull-Based (GitOps) sobre Push-Based
**Decisión:** Adoptar la estrategia de **Conciliación Pull-Based** (GitOps) para el despliegue[cite: 6].

*   **Push-Based (CI clásico):** El pipeline de CI (GitHub Actions) construye la imagen y ejecuta comandos como `kubectl apply` o `helm upgrade` contra el clúster.
*   **Pull-Based (GitOps):** Un agente de software dentro del clúster observa un repositorio de Git separado y concilia el estado deseado con el estado real de forma autónoma.

#### Justificación
Elegimos Pull-Based por los siguientes motivos, fundamentales para MediTriage:
*   **Seguridad Superior:** El pipeline de CI de GitHub Actions ya no necesita poseer ni almacenar credenciales de administración del clúster (PAT largos o certificados). Solo el agente interno del clúster tiene permisos de escritura dentro del mismo.
*   **Inmutabilidad y Auditoría:** La 'verdad' del despliegue reside en un repositorio de Git separado (`meditriage-gitops`), no en variables de entorno o configuraciones de pipeline. Cada despliegue es un Pull Request auditable y reversible (`rollback = revert de commit`).
*   **Detección de Drift:** El agente detecta automáticamente si alguien modifica el clúster manualmente y vuelve a aplicar la configuración definida en Git de forma autónoma.

### 2. Herramienta de GitOps: Argo CD sobre Flux
**Decisión:** Seleccionar **Argo CD** como la herramienta de implementación de GitOps[cite: 6].

*   **Flux:** Ligero, ligero, centrado en la CLI, modular. Ideal para flujos 100% Git-first[cite: 6].
*   **Argo CD:** Interfaz de usuario rica (UI), ApplicationSets, proyectos RBAC (Role-Based Access Control) robustos y visibilidad multi-cluster.

#### Justificación
Elegimos Argo CD para el equipo de 5 personas por los siguientes motivos:
*   **Visibilidad para el Equipo:** La interfaz gráfica de Argo CD facilita la auditoría visual y la comprensión del estado del clúster para todo el equipo, permitiendo ver rápidamente si una aplicación está `Synced` y `Healthy`[cite: 6].
*   **Control por Ambientes:** Los proyectos y el RBAC de Argo CD nos permiten gestionar de forma limpia los overlays de Kustomize para `dev` y `prod`, garantizando que solo PRs aprobados a ramas específicas se desplieguen[cite: 6].

### 3. Tagueo de Imagen: SHA over Latest
**Decisión:** Adoptar imágenes tagueadas estrictamente por el **hash único del commit (`${{ github.sha }}`)** en lugar de `:latest` o tags mutables[cite: 2, 3].

#### Justificación
*   **Inmutabilidad:** Garantiza que el código validado por los *Quality Gates* (Lint, Tests $\ge$ 70%, Semgrep) sea exactamente el mismo que se despliega.
*   **Trazabilidad:** Cada imagen en GHCR se correlaciona con un único commit auditable en el repositorio de código, cumpliendo con los requisitos de compliance de MediTriage.

## Consecuencias y Trade-offs

### Positivas
*   Mayor postura de seguridad del clúster (sin credenciales expuestas en CI)[cite: 6].
*   Proceso de despliegue auditable, auditable y reversible mediante Pull Requests[cite: 6].
*   Detección y reconciliación autónoma de drift de configuración[cite: 6].
*   Mejor visibilidad del estado de las aplicaciones para todo el equipo[cite: 6].

### Negativas / Costos
*   Curva de aprendizaje del lenguaje HCL de Terraform y los manifiestos de Argo CD.
*   Gestión delicada del state remoto en GCS[cite: 2, 3].
*   Overhead inicial de complejidad al gestionar dos repositorios separados y dos canalizaciones coordinadas[cite: 2, 3].
