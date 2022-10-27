FROM node:16.18-alpine AS builder

WORKDIR ./

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
RUN npm install
RUN npm run build

COPY . .

FROM node:16.18-alpine

RUN ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
	date

WORKDIR ./
COPY --from=builder ./ ./

EXPOSE 3000

ENV NODE_ENV=release


ENTRYPOINT ["npm", "run", "start"]