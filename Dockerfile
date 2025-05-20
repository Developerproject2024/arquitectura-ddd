# Etapa 1: Construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependencias e instalarlas
COPY package*.json ./
RUN npm install

# Copiar el código fuente
COPY . .

# Compilar el proyecto
RUN npm run build

# Etapa 2: Imagen liviana para producción
FROM node:20-alpine

WORKDIR /app

# Copiar solo lo necesario
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Puerto de NestJS
EXPOSE 3000

# Comando para iniciar la app
CMD ["node", "dist/main"]
