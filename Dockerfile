# Use PHP 8.3 FPM base image
FROM php:8.3-fpm

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libzip-dev \
    unzip \
    libpq-dev \  # Required for PostgreSQL
    nodejs \
    npm \
    && docker-php-ext-install intl zip pdo pdo_pgsql \  # Use pdo_pgsql for PostgreSQL
    && docker-php-ext-enable intl zip pdo_pgsql

# Install Composer globally
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy existing application files
COPY . .

# Install PHP dependencies using Composer
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Install Node.js dependencies using npm
RUN npm install

# Build assets (you can change this to your actual build command)
RUN npm run build

# Run database migrations
RUN php artisan migrate --force

# Expose the port that your web server is running on
EXPOSE 9000

# Start the PHP-FPM server
CMD ["php-fpm"]
