# === STAGE 1 : BUILD ===
FROM node:20-alpine AS builder
WORKDIR /app

# copie des fichiers de dépendances
COPY package*.json ./
RUN npm install

# copie du reste du code source
COPY . .

# compilation TypeScript -> dist/
RUN npm run build


# === STAGE 2 : RUN ===
FROM node:20-alpine AS runner
WORKDIR /app

# copier uniquement les fichiers nécessaires depuis le builder
COPY --from=builder /app/package*.json ./
RUN npm install --production

COPY --from=builder /app/dist ./dist

# exécution (sans npm run watch)
CMD ["node", "dist/index.js"]
