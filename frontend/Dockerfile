# syntax=docker/dockerfile:1

FROM node:20-alpine AS build
WORKDIR /app

ARG REACT_APP_API_URL=https://portfolio-1-dfm8.onrender.com/contact/send-email
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

COPY package.json package-lock.json ./
RUN npm ci

COPY public public
COPY src src
RUN npm run build

FROM nginx:1.27-alpine AS runtime
WORKDIR /usr/share/nginx/html

COPY --from=build /app/build ./
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
