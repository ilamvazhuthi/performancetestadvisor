
# Use the official Nginx image as a base
FROM nginx:alpine

# Copy the static content to the Nginx web directory
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY scripts.js /usr/share/nginx/html/

# Expose port 80 (default HTTP port)
EXPOSE 80

# Command to start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
