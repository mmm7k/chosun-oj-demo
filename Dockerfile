FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g pnpm


RUN pnpm install

COPY . .


RUN pnpm build

EXPOSE 7112
ENV PORT=7112
CMD ["pnpm", "run", "start"]


