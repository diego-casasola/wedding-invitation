# Usar una imagen base de Node.js
FROM node:20.10.0-alpine3.19

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json (si están disponibles)
COPY package.json /app/
COPY package-lock.json /app/

# Instalar dependencias (con npm ci para instalación limpia)
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . /app

# Construir el proyecto de Next.js
RUN npm run build

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Ejecutar la aplicación utilizando el binario local de Next.js
CMD ["npm", "start"]