# Estágio 1: Builder - Instala dependências e compila o projeto
FROM node:18-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de gerenciamento de pacotes
COPY package.json package-lock.json ./

# Instala todas as dependências, incluindo as de desenvolvimento
RUN npm install

# Copia o restante do código-fonte
COPY . .

# Gera o cliente Prisma (essencial para o build)
RUN npx prisma generate

# Compila o código TypeScript para JavaScript
RUN npm run build

# ---

# Estágio 2: Production - Cria a imagem final, enxuta e otimizada
FROM node:18-alpine

WORKDIR /app

# Copia os arquivos de pacotes do estágio de build
COPY --from=builder /app/package.json /app/package-lock.json ./

# Instala SOMENTE as dependências de produção
RUN npm install --omit=dev

# Copia a pasta 'dist' (código compilado) do estágio de build
COPY --from=builder /app/dist ./dist

# Copia o schema do Prisma e o cliente gerado para a imagem final
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Expõe a porta que a aplicação vai rodar
EXPOSE 3333

# Comando para iniciar o servidor quando o container for executado
CMD ["node", "dist/server.js"]