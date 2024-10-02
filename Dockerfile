FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g pnpm


RUN pnpm install

COPY . .


RUN pnpm build

EXPOSE 8112
ENV PORT=8112
CMD ["pnpm", "run", "start"]


