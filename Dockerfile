FROM node:16

WORKDIR /team_pandas

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npx prisma generate

CMD [ "npm", "start" ]