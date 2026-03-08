# 🍽️ CharlenesKitchen

A modern food ordering platform built with **Laravel 11**, **React**, **TailwindCSS**, and **Docker** — developed as a learning project focused on clean architecture, best practices, and production-ready patterns.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 11 (PHP 8.3) |
| Frontend | React + Vite |
| Styling | TailwindCSS |
| Database | MySQL 8.0 |
| Containerization | Docker + Docker Compose |
| Image Storage | Cloudinary |
| Email | SendGrid |

---

## ✨ Features

- Browse a menu of food items with images
- Place orders as a **guest** (no account required)
- Place orders as an **authenticated user**
- View order history (authenticated users)
- Order confirmation emails via SendGrid
- Food images served via Cloudinary CDN

---

## 🚀 Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [Git](https://git-scm.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/CharlenesKitchen.git
cd CharlenesKitchen

# 2. Build and start all containers
docker compose up -d --build

# 3. Install Laravel dependencies
docker compose exec --user root app composer install

# 4. Set up environment file
cp src/.env.example src/.env
docker compose exec app php artisan key:generate

# 5. Run database migrations
docker compose exec app php artisan migrate

# 6. (Optional) Seed the database with sample data
docker compose exec app php artisan db:seed
```

### Access the App

| Service | URL |
|---|---|
| Laravel App | http://localhost:8080 |
| phpMyAdmin | http://localhost:8081 |

phpMyAdmin credentials: `charlenes` / `secret`

---

## 🗂️ Project Structure

```
CharlenesKitchen/
├── docker/
│   ├── php/
│   │   ├── Dockerfile        ← Custom PHP 8.3-FPM image
│   │   └── local.ini         ← PHP runtime settings
│   └── nginx/
│       └── default.conf      ← Nginx web server config
├── src/                      ← Laravel 11 application
├── docker-compose.yml
└── README.md
```

---

## 🐳 Docker Services

| Container | Role | Port |
|---|---|---|
| `charlenes_app` | PHP 8.3-FPM + Laravel | — |
| `charlenes_nginx` | Web server / reverse proxy | `8080` |
| `charlenes_mysql` | MySQL 8.0 database | `3307` |
| `charlenes_phpmyadmin` | Database GUI | `8081` |

---

## 📦 Useful Commands

```bash
# Start all containers
docker compose up -d

# Stop all containers
docker compose down

# Run artisan commands
docker compose exec app php artisan <command>

# View container logs
docker compose logs -f app

# Access MySQL via CLI
docker compose exec mysql mysql -u charlenes -p
```

---

## 🗺️ Project Roadmap

- [x] Phase 1 — Docker setup + Laravel installation
- [ ] Phase 2 — Laravel backend architecture (Services, Repositories, Auth)
- [ ] Phase 3 — API layer (endpoints, Cloudinary, SendGrid)
- [ ] Phase 4 — React frontend setup
- [ ] Phase 5 — Core UI features
- [ ] Phase 6 — Production readiness

---

## 📄 License

This project is open-sourced for learning purposes.