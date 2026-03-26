# Use a specific, stable version of Nginx
FROM nginx:1.25.3-alpine

# Copy your custom configuration or static files
# COPY ./html /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
