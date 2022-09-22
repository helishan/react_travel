# 拉取 node 镜像来打包 react 项目
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY public public/
COPY src src/
RUN npm run build

# 创建并运行 Nginx 服务器，并且把打包好的文件复制粘贴到服务器文件夹中
FROM nginx:alpine
COPY --from=build /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ['nginx','-g','daemon off;']
