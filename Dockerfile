# Use Node.js 18 Alpine
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port (Railway will override this)
EXPOSE $PORT

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "const http = require('http'); const options = { host: '0.0.0.0', port: process.env.PORT || 4000, timeout: 2000 }; const request = http.request(options, (res) => { console.log('STATUS: ' + res.statusCode); process.exit(res.statusCode == 200 ? 0 : 1); }); request.on('error', function(err) { console.log('ERROR'); process.exit(1); }); request.end();"

# Start the application
CMD ["npm", "start"]
