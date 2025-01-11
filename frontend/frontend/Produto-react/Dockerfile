FROM node:16-alpine3.16 as builder
ARG ambiente

RUN apk update && apk add --no-cache make git
 
WORKDIR /app
COPY package-lock.json   /app/
COPY package.json  /app/
ENV GENERATE_SOURCEMAP=false
RUN npm install create-react-app -g
RUN cd /app && npm install
COPY .  /app

RUN cd /app 

RUN if [[ "$ambiente" = "master" ]] ; \
  then npm run build:prod ; \
  elif [[ "$ambiente" = "dev" ]] ; \
  then npm run build:dev ; \
  else npm run build:stg ; fi

FROM nginx:alpine
ENV TZ=America/Fortaleza
RUN rm -rf /usr/share/nginx/html/*
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]