# Usa una imagen de Node.js 16.20.2 como base
FROM node:16.20.2 AS build

# Establece el directorio de trabajo en la carpeta de la aplicación
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias de la aplicación
RUN npm install

# Instala el paquete Bootstrap
RUN npm install bootstrap

# Compila la aplicación en modo de producción
RUN npm run build --prod

# Etapa 2: Preparar Nginx y copiar los archivos construidos
FROM nginx:latest

# Elimina la página de bienvenida predeterminada de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia los archivos construidos de la etapa 1 al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia el archivo de configuración personalizado de Nginx
COPY nginx-config/my-nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80 para que la aplicación esté disponible
EXPOSE 81

# Comando para iniciar Nginx en segundo plano
CMD ["nginx", "-g", "daemon off;"]