# Этап сборки
FROM node:22-alpine AS build

# Define build arguments for environment variables
ARG VITE_API_URL
ARG VITE_DEMO_MODE=false
ARG VITE_BASE_PATH=/

# Set environment variables during the build process
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_DEMO_MODE=$VITE_DEMO_MODE
ENV VITE_BASE_PATH=$VITE_BASE_PATH

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Этап production
FROM nginx:alpine

# Копируем собранные файлы из этапа сборки
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 9001

CMD ["nginx", "-g", "daemon off;"] 
