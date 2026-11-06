# Construcción
FROM node:20-alpine AS builder
WORKDIR /app
COPY workflows/package.json ./package.json
RUN npm install
COPY . .

# Producción 
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/src ./src 
COPY --from=builder /app/index.js ./

# Seguridad: No ejecutar como root
USER node
EXPOSE 3000
CMD ["node", "index.js"]
