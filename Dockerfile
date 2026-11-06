# Imagen de dependencias de producción
FROM node:20-alpine AS dependencies

WORKDIR /app

COPY package.json ./

RUN npm install --omit=dev --no-audit --no-fund

# Imagen final
FROM node:20-alpine

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json ./
COPY src ./src

# Ejecutar con usuario sin privilegios
USER node

EXPOSE 3000

CMD ["node", "src/server.js"]
