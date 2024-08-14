# Utiliser l'image de base officielle Node.js
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Compiler l'application Vue.js
RUN npm run build

# Exposer le port de l'application
EXPOSE 8080

# Commande pour démarrer l'application
CMD ["npm", "run", "serve"]
