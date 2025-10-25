# Build stage - using Chainguard node (minimal CVEs)
FROM cgr.dev/chainguard/node:latest-dev AS builder
WORKDIR /app
ENV CI=true

COPY package*.json ./
RUN npm ci --prefer-offline --no-audit --legacy-peer-deps

COPY . .
RUN npm run build -- --configuration=production

# Debug: Verify build output
RUN find /app/dist -name "index.html"

# Production stage - Chainguard nginx (zero CVEs)
FROM cgr.dev/chainguard/nginx:latest
COPY --chown=nginx:nginx nginx.conf /etc/nginx/nginx.conf

# Copy all files (use dot-slash for all contents)
COPY --chown=nginx:nginx --from=builder /app/dist/freshly-frontend/. /usr/share/nginx/html/

EXPOSE 8080
USER nginx
HEALTHCHECK --interval=30s --timeout=3s CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:8080/ || exit 1
