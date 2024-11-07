# Usa la imagen oficial de Node.js
FROM node:18

# Configura el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Instala nodemon globalmente (opcional si no está en package.json)
RUN npm install -g nodemon

# Copia el resto del código fuente
COPY . .

# Expón el puerto en el contenedor
EXPOSE 3000

# Comando para ejecutar la app en modo de desarrollo con nodemon
CMD ["npm", "run", "dev"]
