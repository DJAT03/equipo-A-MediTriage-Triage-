# ADR 0006 - Estrategia de Seguridad de la Cadena de Suministro

## Estado

APROBADO

## Contexto

MediTriage utiliza un pipeline CI/CD basado en GitHub Actions para construir imágenes Docker y desplegarlas en Kubernetes.

Aunque en la sesión anterior se incorporaron controles de calidad y seguridad mediante SAST, SCA y Secret Scanning, aún existe el riesgo de que una imagen no verificada o manipulada llegue al clúster.

Además, el equipo necesita demostrar el origen de las imágenes y mantener una cadena de confianza verificable desde el código fuente hasta producción.

Por este motivo se evaluaron mecanismos de firma de imágenes, attestations de procedencia y controles de admisión para Kubernetes.

---

## Decisiones

### 1. Firma de imágenes con Cosign

Se adopta Cosign como mecanismo oficial de firma de imágenes Docker.

Las imágenes construidas por GitHub Actions serán firmadas utilizando OIDC Keyless Signing.

La firma permitirá demostrar que la imagen fue generada por el pipeline oficial del proyecto.

---

### 2. Uso de Attestations SLSA Nivel 2

Se generarán attestations SLSA nivel 2 junto a cada imagen publicada.

Estas attestations registran:

- Origen del código
- Pipeline utilizado
- Momento del build
- Artefacto generado

De esta forma se mantiene trazabilidad completa de la construcción del software.

---

### 3. Verificación mediante Kyverno

Se utilizará una política Kyverno para validar firmas antes del despliegue en Kubernetes.

Las imágenes que no se encuentren firmadas serán rechazadas automáticamente por el clúster.

---

### 4. Runtime Security con Falco

Se adopta Falco para la detección de comportamientos sospechosos durante la ejecución.

Se definirán reglas personalizadas orientadas a:

- Apertura de shell dentro de contenedores.
- Modificaciones en directorios sensibles.
- Conexiones salientes inesperadas.

---

## Justificación

### Seguridad

La firma digital impide la ejecución de imágenes de origen desconocido.

### Integridad

Cada despliegue puede verificarse criptográficamente antes de llegar al clúster.

### Trazabilidad

Las attestations SLSA permiten rastrear exactamente qué proceso generó una imagen.

### Auditoría

Las decisiones quedan registradas en Git y pueden ser verificadas posteriormente.

### Detección Temprana

Falco permite detectar comportamientos anómalos una vez que la aplicación se encuentra ejecutándose.

---

## Consecuencias Positivas

- Mayor confianza en la cadena de suministro.
- Validación automática de imágenes.
- Evidencia verificable del proceso de construcción.
- Mejor postura de seguridad en Kubernetes.
- Mayor capacidad de auditoría.

---

## Consecuencias Negativas

- Incremento de complejidad en el pipeline.
- Curva de aprendizaje para Cosign y Kyverno.
- Necesidad de mantener políticas y reglas adicionales.

---

## Alternativas Evaluadas

### No firmar imágenes

Descartada por falta de garantías sobre el origen de los artefactos.

### Firma manual

Descartada por ser propensa a errores humanos y difícil de auditar.

### Solo escaneo de vulnerabilidades

Descartada porque detectar vulnerabilidades no garantiza la procedencia legítima de una imagen.

---

## Decisión Final

El equipo adopta una estrategia de seguridad de cadena de suministro basada en:

- Cosign para firma de imágenes.
- Attestations SLSA nivel 2.
- Validación mediante Kyverno.
- Monitoreo en ejecución con Falco.

Esta estrategia proporciona una cadena de confianza verificable desde el código fuente hasta el entorno de ejecución en Kubernetes.
