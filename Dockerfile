
# Use the official Nginx image as a base
FROM nginx:alpine

# Copy the static content to the Nginx web directory
COPY *.html /usr/share/nginx/html/
COPY css /usr/share/nginx/html/css
COPY scripts /usr/share/nginx/html/scripts
COPY resources /usr/share/nginx/html/resources

# Expose port 80 (default HTTP port)
EXPOSE 80

# Command to start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
