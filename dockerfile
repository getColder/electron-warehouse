FROM node:14
COPY ./ /APP
WORKDIR /APP
RUN npm install && npm run biuld

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf