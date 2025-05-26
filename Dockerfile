# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR ./

# Copy package.json and package-lock.json, then install dependencies
COPY package.json ./
RUN yarn

# Copy the rest of the application files
COPY . .

# Build the Vite app
RUN yarn run build

# Use nginx as the production server
FROM nginx:alpine

# Copy the built files to the nginx directory
COPY --from=0 ./dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
