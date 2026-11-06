# S10 - Seguridad de infraestructura y cadena de suministro

**Responsables según la distribución del equipo:** Gibran y Vicente.  
**Proyecto:** MediTriage.

## Objetivo

Incorporar controles de seguridad para revisar infraestructura como código, firmar imágenes de contenedor, exigir firmas antes de desplegar y detectar comportamientos sospechosos durante la ejecución.

## Archivos incorporados

| Archivo | Función |
|---|---|
| `.github/workflows/supply-chain-security.yml` | Ejecuta Checkov y, cuando existe un Dockerfile, construye, publica y firma la imagen con Cosign Keyless. |
| `k8s/policies/require-signature.yaml` | Política Kyverno que exige una firma válida para la imagen de MediTriage. |
| `falco/rules-custom.yaml` | Tres reglas Falco para detectar shells, escrituras en `/etc` y herramientas de cambio de usuario. |

## 1. Checkov

El workflow busca archivos `.tf` y ejecuta Checkov sobre Terraform cuando los encuentra. En la copia del repositorio revisada para esta entrega no se encontraron archivos Terraform. Por ese motivo, el workflow informa que el escaneo queda pendiente y no presenta un resultado de seguridad inexistente.

Cuando el equipo agregue Terraform, el job ejecutará Checkov con el framework `terraform`. No se debe declarar el escaneo Terraform como aprobado hasta que existan archivos `.tf` y el job se ejecute.

## 2. Cosign Keyless

En los eventos `push` a `main` y `workflow_dispatch`, si existe un `Dockerfile` en la raíz, el workflow:

1. Construye la imagen desde la raíz del repositorio.
2. Publica la imagen en GitHub Container Registry (GHCR) usando el SHA del commit como etiqueta.
3. Firma el digest publicado con Cosign y la identidad OIDC de GitHub Actions.
4. Verifica la firma utilizando el emisor OIDC y la identidad del workflow.

La firma Keyless no requiere almacenar una clave privada de Cosign como secreto. El workflow necesita el permiso `id-token: write`.

**Bloqueo detectado:** en el ZIP revisado no existe un `Dockerfile` en la raíz. Por ello, el job de construcción y firma se omitirá hasta que el equipo incorpore un Dockerfile funcional y compruebe que la aplicación puede construirse.

## 3. Kyverno

La política `require-signature.yaml` se aplica a Pods que utilicen imágenes bajo `ghcr.io/djat03/meditrriage-api`. Kyverno debe verificar que la imagen tenga una firma válida emitida por el workflow S10 del repositorio oficial.

La política está configurada en modo `Enforce`: si la verificación no se cumple, Kyverno rechaza el recurso. Antes de aplicarla en un clúster compartido, el equipo debe instalar Kyverno, confirmar que la identidad del certificado coincide con la ejecución real de Cosign y comprobar el acceso de Kyverno a GHCR.

## 4. Falco

El archivo `falco/rules-custom.yaml` contiene tres reglas:

1. **Shell interactiva:** alerta si se ejecuta `bash`, `sh`, `zsh` o `ash` dentro de un contenedor.
2. **Escritura en directorios sensibles:** alerta ante escrituras detectadas en `/etc` desde un contenedor.
3. **Cambio de usuario:** alerta si se ejecuta `su`, `sudo` o `doas` dentro de un contenedor.

Las reglas generan alertas de prioridad `WARNING`. Deben cargarse en Falco y probarse en un entorno controlado antes de considerarlas validadas.

## Pasos de validación

### Checkov
- Incorporar archivos Terraform al repositorio.
- Ejecutar el workflow `S10 - Supply Chain Security`.
- Revisar el job `Checkov - Terraform security scan`.
- Confirmar que el análisis termina sin fallos.

### Cosign
- Incorporar y validar un `Dockerfile` en la raíz.
- Ejecutar el workflow sobre `main`.
- Confirmar que la imagen aparece en GHCR.
- Confirmar que los pasos de firma y verificación terminan correctamente.

### Kyverno
- Instalar Kyverno en un clúster de pruebas.
- Aplicar la política:

```bash
kubectl apply -f k8s/policies/require-signature.yaml
```

- Probar un Pod con la imagen firmada y otro con una imagen sin firma.
- Comprobar que el firmado se admite y el no firmado se rechaza.

### Falco
- Cargar `falco/rules-custom.yaml` como reglas adicionales.
- Validar la sintaxis con la herramienta Falco correspondiente a la versión instalada.
- Generar, en un entorno de pruebas, los tres comportamientos descritos.
- Confirmar que cada comportamiento genera su alerta.

## Limitaciones encontradas en la copia revisada

- No se encontraron archivos Terraform (`.tf`).
- No se encontró un `Dockerfile` en la raíz.
- No se pudo validar la firma de una imagen porque no hay una imagen construida por este workflow.
- No se pudo probar Kyverno ni Falco contra un clúster Kubernetes desde esta revisión del repositorio.

Estas limitaciones deben resolverse y documentarse con ejecuciones reales antes de afirmar que todos los controles están operativos.

## Nota de integración

El Deployment existente utiliza `ghcr.io/djat03/meditrriage-api:v1`. El workflow nuevo publica una etiqueta basada en el SHA del commit. Antes de exigir la política en el clúster, el equipo debe desplegar una imagen que haya sido firmada por el workflow indicado y confirmar que la identidad Keyless coincide exactamente.

La ruta `workflows/ci.yml` existente no es una ruta automática de GitHub Actions. El workflow S10 se incorpora en `.github/workflows/`, que sí es la ubicación reconocida por GitHub Actions. La integración o migración del workflow CI existente debe coordinarse con el equipo para evitar duplicar o romper su pipeline.
