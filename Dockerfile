# Etapa 1: Build da aplicação
FROM node:20-alpine AS builder

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos necessários
COPY package.json package-lock.json ./
RUN npm ci

# Copia o restante do código
COPY . .

# Build da aplicação
RUN npm run build

# Etapa 2: Imagem para produção
FROM node:20-alpine AS runner

# Diretório de trabalho
WORKDIR /app

# Instala apenas dependências de produção
COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm ci --only=production

# Copia os arquivos necessários para rodar a aplicação
COPY --from=builder /app ./

# Expondo a porta 80
EXPOSE 80

# Sobrescrevendo a porta padrão com a variável de ambiente PORT
ENV PORT=80

# Variáveis de ambiente serão passadas na hora de rodar o container

# Comando de inicialização
CMD ["npm", "start"]