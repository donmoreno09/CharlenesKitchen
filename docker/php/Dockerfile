# ── Base image ────────────────────────────────────────────────────────────────
# We use PHP 8.3 with FPM (FastCGI Process Manager).
# FPM handles PHP execution; Nginx will sit in front of it.
FROM php:8.3-fpm

# ── System dependencies ───────────────────────────────────────────────────────
# These are OS-level packages that Laravel and PHP extensions require.
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ── PHP Extensions ────────────────────────────────────────────────────────────
# pdo_mysql  → Laravel talks to MySQL
# mbstring   → Multi-byte string handling (required by Laravel)
# exif       → Image metadata (useful for food photo uploads later)
# pcntl      → Process control (used by Laravel queues)
# bcmath     → Arbitrary precision math
# gd         → Image processing
# zip        → Archive handling
RUN docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip

# ── Composer ──────────────────────────────────────────────────────────────────
# Copy the Composer binary from the official Composer image.
# This is cleaner than downloading it via curl at build time.
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# ── Working directory ─────────────────────────────────────────────────────────
# All subsequent commands run from /var/www inside the container.
WORKDIR /var/www

# ── Permissions ───────────────────────────────────────────────────────────────
# www-data is the user Nginx and PHP-FPM run as.
# Setting ownership here prevents file permission conflicts between
# the host machine and the container.
RUN chown -R www-data:www-data /var/www

EXPOSE 9000
CMD ["php-fpm"]