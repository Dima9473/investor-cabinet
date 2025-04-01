# Этап сборки
FROM node:18-alpine as build

# Define build arguments for environment variables
ARG VITE_API_URL

# Set environment variables during the build process
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

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
