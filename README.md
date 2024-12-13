# Nginx Load Balancer and HTTPS Proxy Project

This project demonstrates how to configure Nginx as a reverse proxy, load balancer, and HTTPS server for a Node.js-based static web application. By combining Docker containers, self-signed SSL certificates, and Nginx configuration best practices, this project serves as an excellent introduction to modern web server management.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Project Features](#project-features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Prerequisites](#prerequisites)
6. [Setup Instructions](#setup-instructions)
   - [Generate Self-Signed SSL Certificates](#generate-self-signed-ssl-certificates)
   - [Build and Run Docker Containers](#build-and-run-docker-containers)
   - [Configure and Start Nginx](#configure-and-start-nginx)
7. [Nginx Configuration Details](#nginx-configuration-details)
8. [Testing the Setup](#testing-the-setup)
9. [Troubleshooting](#troubleshooting)
10. [Commands Cheat Sheet](#commands-cheat-sheet)
11. [Resources](#resources)
12. [License](#license)

---

## 🌟 Overview

In this project, Nginx is configured to:

- Distribute requests across three Dockerized instances of a Node.js application, enabling load balancing.
- Serve the application securely over HTTPS using self-signed SSL certificates.
- Redirect HTTP traffic to HTTPS to ensure secure communication.

This setup is ideal for understanding production-grade deployment practices and can be extended to real-world use cases.

---

## ✨ Project Features

- **Load Balancing:** Nginx evenly distributes traffic to three backend servers (app1, app2, app3) running in Docker containers.
- **HTTPS with Self-Signed Certificates:** Ensures encrypted communication by leveraging OpenSSL-generated certificates.
- **HTTP-to-HTTPS Redirection:** Automatically redirects HTTP traffic to HTTPS for security compliance.
- **Scalability:** Easily add or remove backend servers by modifying the upstream block in the Nginx configuration.
- **Containerized Deployment:** Docker containers isolate each app instance for easier management.

---

## 🛠️ Technology Stack

- **Nginx:** Acts as a reverse proxy, load balancer, and HTTPS server.
- **Node.js:** Hosts the static web application.
- **Docker & Docker Compose:** Provides containerization for the app instances.
- **OpenSSL:** Generates self-signed SSL certificates for HTTPS.

---

## 🗂️ Project Structure

```plaintext
.
├── about.html                # Static HTML file  
├── assets/                   # Folder containing static assets (CSS, images, etc.)
│   └── [CSS and image files]
├── courses.html              # Another static HTML file  
├── docker-compose.yaml       # Defines the multi-container Docker setup  
├── Dockerfile                # Dockerfile to containerize the Node.js application  
├── index.html                # Main static HTML file  
├── nginx.conf                # Nginx configuration file  
├── package.json              # Node.js dependencies and scripts  
├── pnpm-lock.yaml            # Package lock file for pnpm  
├── README.md                 # Project documentation (this file)  
└── server.js                 # Node.js server to serve static files
```

---

## ✅ Prerequisites

Ensure the following software is installed:

-   [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
-   [OpenSSL](https://www.openssl.org/)
-   [Nginx](https://nginx.org/en/docs/) (for local testing)

---

## 🚀 Setup Instructions

### 🔐 Generate Self-Signed SSL Certificates

1.  Create a directory to store the certificates:
    ```bash
    mkdir ~/nginx-certs
    cd ~/nginx-certs
    ```
2.  Generate the SSL certificate and private key:
    ```bash
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
      -keyout nginx-selfsigned.key -out nginx-selfsigned.crt
    ```
3.  Move the generated certificates to the location specified in `nginx.conf` (e.g., `/home/[USER]/nginx-certs`).

### 🐳 Build and Run Docker Containers

1.  Build the Docker image:
    ```bash
    docker-compose build
    ```
2.  Start the containers:
    ```bash
    docker-compose up -d
    ```
    This will start three instances of the Node.js application, running on ports 3001, 3002, and 3003.

### ⚙️ Configure and Start Nginx

1. Verify the `nginx.conf` file includes the following key configurations:
    - Upstream servers (`app1`, `app2`, `app3`).
    - SSL certificate paths.
    - HTTP-to-HTTPS redirection.
2.  Start Nginx:
    ```bash
    nginx
    ```
3.  Reload Nginx to apply configuration changes:
    ```bash
    nginx -s reload
    ```

---

## 🔧 Nginx Configuration Details

The `nginx.conf` file includes the following key blocks:

1.  **Upstream Block:** Defines backend servers for load balancing.
    ```nginx
    upstream nodejs_cluster {
        server app1:3001;
        server app2:3002;
        server app3:3003;
    }
    ```
2.  **HTTPS Server Block:** Configures HTTPS with self-signed certificates.
    ```nginx
    server {
        listen 443 ssl;
        ssl_certificate /home/[USER]/nginx-certs/nginx-selfsigned.crt;
        ssl_certificate_key /home/[USER]/nginx-certs/nginx-selfsigned.key;
        location / {
            proxy_pass http://nodejs_cluster;
        }
    }
    ```
3.  **HTTP Redirection Block:** Redirects HTTP traffic to HTTPS.
    ```nginx
    server {
        listen 80;
        return 301 https://$host$request_uri;
    }
    ```

---

## 🧪 Testing the Setup

1.  Open your browser and navigate to `https://localhost`.
2.  Verify that:
    -   The site uses HTTPS.
    -   The traffic is distributed across all three app instances (use `APP_NAME` in responses to identify).
3.  Use tools like `curl` or browser developer tools to inspect headers and responses.

---

## 🛠️ Troubleshooting

-   **SSL Certificate Issues:** Ensure the certificate paths in `nginx.conf` are correct and permissions allow Nginx to access them.
-   **Containers Not Running:** Check container logs with:
    ```bash
    docker-compose logs
    ```
-   **Nginx Errors:** Inspect the Nginx error logs:
    ```bash
    tail -f /var/log/nginx/error.log
    ```

---

## 📜 Commands Cheat Sheet

Here's a list of useful commands for managing the project:

-   Start Nginx:
    ```bash
    nginx
    ```
-   Reload Nginx:
    ```bash
    nginx -s reload
    ```
-   Stop Nginx:
    ```bash
    nginx -s stop
    ```
-   View Access Logs:
    ```bash
    tail -f /var/log/nginx/access.log
    ```
-   Generate SSL Certificates:
    ```bash
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
      -keyout nginx-selfsigned.key -out nginx-selfsigned.crt
    ```

---

## 📚 Resources

-   [Nginx Documentation](https://nginx.org/en/docs/)
-   [Docker Documentation](https://docs.docker.com/)
-   [OpenSSL Documentation](https://www.openssl.org/docs/)

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
