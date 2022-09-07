FROM --platform=linux/amd64 node:16.17.0-alpine3.16 AS builder

ARG REACT_APP_APIURL
WORKDIR /app/builder
COPY . .
RUN npm run docker-build

FROM nginx:1.23.1-alpine

WORKDIR /usr/share/nginx/html
COPY --from=builder /app/builder/build .
COPY --from=builder /app/builder/nginx.conf /etc/nginx/nginx.conf
