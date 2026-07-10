# Monolith: Vite SPA + Express API in one image.
# The Express server serves the API and the built static frontend from public/.
# Build from the repo root:  docker build -t ichat .

# --- Stage 1: build the SPA (Vite) -> static assets in frontend/dist ---
FROM node:22-bookworm-slim AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install --no-audit --no-fund --legacy-peer-deps
COPY frontend/ ./
# Empty = the browser calls the API on the same origin as the page.
ARG VITE_API_URL=
ENV VITE_API_URL=$VITE_API_URL
# Public Clerk key gets embedded in the client bundle at build time.
ARG VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
RUN npm run build

# --- Stage 2: build the API bundle (ESM: copies src/ + index.js to dist/) ---
FROM node:22-bookworm-slim AS backend-build
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm install --no-audit --no-fund
COPY backend/ ./
RUN npm run build

# --- Stage 3: runtime image (prod deps + built assets only) ---
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001

COPY backend/package.json backend/package-lock.json ./
RUN npm install --omit=dev --no-audit --no-fund && npm cache clean --force

# API bundle -> /app/dist ; SPA -> /app/public (served via process.cwd()/public)
COPY --from=backend-build /app/dist ./dist
COPY --from=frontend-build /app/frontend/dist ./public

EXPOSE 3001
USER node

# Hit the Express /health route; no curl in the slim image, so use node.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:'+(process.env.PORT||3001)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]

CMD ["node", "dist/index.js"]
