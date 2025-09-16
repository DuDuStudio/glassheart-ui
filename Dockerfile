# 使用 Nginx 作為靜態文件服務器
FROM nginx:alpine

# 複製靜態文件到 Nginx 目錄
COPY storybook-static/ /usr/share/nginx/html/

# 創建自定義 Nginx 配置
RUN echo 'server { \
    listen 8080; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # 設置正確的 MIME 類型 \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # 啟用 gzip 壓縮 \
    gzip on; \
    gzip_vary on; \
    gzip_min_length 1024; \
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json; \
}' > /etc/nginx/conf.d/default.conf

# 暴露端口 8080 (Cloud Run 要求)
EXPOSE 8080

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]
