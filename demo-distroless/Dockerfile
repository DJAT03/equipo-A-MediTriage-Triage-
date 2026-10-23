# ==========================
# BUILD STAGE
# ==========================

FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# ==========================
# RUNTIME STAGE
# ==========================

FROM gcr.io/distroless/nodejs20-debian12

WORKDIR /app

COPY --from=build /app .

USER nonroot

EXPOSE 3000

CMD ["app.js"]