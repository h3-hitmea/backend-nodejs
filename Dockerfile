FROM node:19-alpine

EXPOSE 3001

WORKDIR /app

COPY . .

RUN npm install -g pnpm

RUN pnpm install

# RUN npx prisma generate

CMD ["yarn", "start"]

