# Build stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
# Install curl for healthcheck
RUN apk add --no-cache curl
COPY --from=build /app/build /usr/share/nginx/html
# Add custom nginx config for React Router fallback
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html index.htm; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
