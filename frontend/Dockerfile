# Etapa 1: instalar dependências e build
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Para rodar com vite preview ---
FROM node:20 AS preview
WORKDIR /app
COPY --from=build /app .
EXPOSE 5173
CMD ["npm", "run", "preview", "--", "--host"]

# --- Ou, se preferir produção com nginx ---
# FROM nginx:alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
