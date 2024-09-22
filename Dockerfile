FROM node:20 AS node-builder

# Set working directory inside the container for building front-end
WORKDIR /app

# Copy only the necessary files (package.json, package-lock.json) for dependency installation
COPY package*.json ./

# Install JavaScript dependencies
RUN npm install

# Copy the rest of the application (we assume the front-end files are present)
COPY . .

# Build front-end assets (if using Vite or Laravel Mix)
RUN npm run build

FROM php:8.3-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libicu-dev \
    zip \
    unzip

# Install PHP extensions
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql \
   && docker-php-ext-configure intl \
    && docker-php-ext-install intl zip

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install dependencies
RUN composer install

# Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache

# Expose port 9000
EXPOSE 9000

CMD ["php-fpm"]

