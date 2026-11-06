'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const { randomUUID } = require('node:crypto');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const JWT_SECRET = process.env.JWT_SECRET;

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));

// Almacenamiento temporal solo para demostraciones. Los datos se pierden al reiniciar.
const patients = new Map();
const triageSessions = new Map();
const consents = new Map();

function problem(res, status, title, detail) {
  return res.status(status).json({
    type: 'about:blank',
    title,
    status,
    detail,
    instance: res.req.originalUrl
  });
}

function requireBearerToken(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return problem(res, 401, 'No autorizado', 'Se requiere un token Bearer válido.');
  }
  if (!JWT_SECRET) {
    return problem(res, 503, 'Autenticación no configurada', 'Configure JWT_SECRET antes de utilizar los endpoints protegidos.');
  }

  try {
    req.auth = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (_error) {
    return problem(res, 401, 'No autorizado', 'El token Bearer no es válido o ha expirado.');
  }
}

// Comprobaciones de salud disponibles sin autenticación para Docker/Kubernetes.
app.get('/health', (_req, res) => res.status(200).json({ status: 'ok', app: 'MediTriage' }));
app.get('/ready', (_req, res) => res.status(200).json({ status: 'ready' }));

// Los endpoints de negocio siguen el esquema Bearer JWT descrito en OpenAPI.
app.use('/api/v1', requireBearerToken);

app.post('/api/v1/patients', (req, res) => {
  const { rut, fullName, birthDate } = req.body || {};
  if (!rut || !fullName || !birthDate) {
    return problem(res, 400, 'Datos inválidos', 'Los campos rut, fullName y birthDate son obligatorios.');
  }
  const patient = {
    id: `pat_${randomUUID()}`,
    rut: String(rut),
    fullName: String(fullName),
    birthDate: String(birthDate),
    createdAt: new Date().toISOString()
  };
  patients.set(patient.id, patient);
  return res.status(201).json(patient);
});

app.get('/api/v1/patients/:id', (req, res) => {
  const patient = patients.get(req.params.id);
  if (!patient) return problem(res, 404, 'No encontrado', 'No existe un paciente con ese identificador.');
  return res.json(patient);
});

app.post('/api/v1/triage/sessions', (req, res) => {
  const { patientId, symptoms, vitalSigns } = req.body || {};
  if (!patientId || !Array.isArray(symptoms) || symptoms.length === 0) {
    return problem(res, 400, 'Datos inválidos', 'Se requieren patientId y un arreglo symptoms no vacío.');
  }
  if (!patients.has(patientId)) {
    return problem(res, 400, 'Paciente inválido', 'Registre primero el paciente indicado en patientId.');
  }

  // No se inventa un nivel ESI: el repositorio no incluye un motor clínico validado.
  // La sesión queda registrada como pendiente de clasificación clínica real.
  const session = {
    id: `tri_${randomUUID()}`,
    patientId,
    symptoms: symptoms.map(String),
    vitalSigns: vitalSigns || null,
    esiLevel: null,
    status: 'pending_classification',
    createdAt: new Date().toISOString(),
    note: 'Demostración técnica: no constituye una clasificación médica ni debe usarse para decisiones clínicas.'
  };
  triageSessions.set(session.id, session);
  return res.status(201).json(session);
});

app.get('/api/v1/triage/sessions/:id', (req, res) => {
  const session = triageSessions.get(req.params.id);
  if (!session) return problem(res, 404, 'No encontrado', 'No existe una sesión con ese identificador.');
  return res.json(session);
});

app.post('/api/v1/consents', (req, res) => {
  const { patientId, consentType, accepted, signedAt } = req.body || {};
  if (!patientId || !consentType || typeof accepted !== 'boolean' || !signedAt) {
    return problem(res, 400, 'Datos inválidos', 'Se requieren patientId, consentType, accepted (boolean) y signedAt.');
  }
  if (!patients.has(patientId)) {
    return problem(res, 400, 'Paciente inválido', 'Registre primero el paciente indicado en patientId.');
  }
  const consent = {
    id: `con_${randomUUID()}`,
    patientId,
    consentType: String(consentType),
    accepted,
    createdAt: new Date().toISOString()
  };
  consents.set(consent.id, consent);
  return res.status(201).json(consent);
});

app.get('/api/v1/ejemplo', (_req, res) => {
  res.set('Deprecation', 'true');
  res.set('Sunset', 'Tue, 30 Jun 2027 23:59:59 GMT');
  return res.json({ message: 'Endpoint obsoleto de demostración.' });
});

app.use((err, _req, res, _next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return problem(res, 400, 'JSON inválido', 'El cuerpo de la solicitud no contiene JSON válido.');
  }
  return problem(res, 500, 'Error interno', 'Ocurrió un error inesperado.');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MediTriage API escuchando en 0.0.0.0:${PORT}`);
});
