FROM node:15.6.0-alpine

RUN apk add --no-cache tzdata
ENV TZ Asia/Ho_Chi_Minh

WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
COPY . /app
RUN npm run build-ts
EXPOSE 3000
CMD ["npm", "start"]