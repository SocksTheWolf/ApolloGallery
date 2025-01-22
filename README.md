# Pineapple Gallery 🍍

## Description
Pineapple Gallery is a web application for managing and displaying galleries of images. 📸 It is built using **Hono** and leverages **Cloudflare Workers**, **D1**, and **R2** for backend services. 🚀

### Features
- **User-Friendly Interface**: Easy to navigate and manage galleries. 🌟
- **Cloudflare Integration**: Utilizes Cloudflare Workers, D1, and R2 for efficient and scalable backend operations. 🌐
- **Multi-Language Support**: Supports multiple languages for a global audience. 🌍
- **Admin Panel**: Comprehensive admin panel for managing galleries and images 🛠️

### Tech Stack
- **Frontend**: Hono (with server-side rendering), HTMX
- **Backend**: Hono, Cloudflare Workers
- **Database**: Cloudflare D1
- **Storage**: Cloudflare R2

### Server-Side Rendering (SSR)
- **Main Route**: The main route (`/`) is server-side rendered, generating HTML on the server for dynamic content.
- **Admin Routes**: The admin routes (`/admin/*`) are also server-side rendered, providing a dynamic and responsive admin panel.

## Table of Contents
- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Development](#development)
- [Deployment](#deployment)
- [License](#license)
- [Contributing](#contributing)

## Quick Start

Before you start, you need the following:
- Node.js and npm installed
- A Cloudflare account
- Wrangler installed

### Prerequisites
1. **Node.js and npm**: Ensure you have Node.js and npm installed. You can download them from [Node.js official website](https://nodejs.org/).
2. **Cloudflare Account**: Sign up for a Cloudflare account at [Cloudflare](https://www.cloudflare.com/).
3. **Wrangler**: Install Wrangler, the Cloudflare Workers CLI tool, by running:
   ```sh
   npm install -g @cloudflare/wrangler
   ```

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/Endriur24/PineappleGallery.git
   cd PineappleGallery
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a D1 database:
   ```sh
   wrangler d1 create "pineapplegallery-database"
   ```
   Paste the results, which look like this, into `wrangler.toml` (keep the binding name the same = "DB"):
   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "pineapplegallery-database"
   database_id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
   ```

4. Create an R2 bucket:
   ```sh
   wrangler r2 bucket create "pineapplegallery-bucket"
   ```
   Update `wrangler.toml` according to the response, but keep the binding name the same as below ("R2"):
   ```toml
   [[r2_buckets]]
   binding = "R2"
   bucket_name = "pineapplegallery-bucket"
   ```

5. Create KV namespace for cache functionality
   ```sh
   wrangler kv namespace create CACHE_KV
   ```
   Update `wrangler.toml` according to the response, but keep the binding name the same as below:

   ```toml
   [[kv_namespaces]]
   binding = "CACHE_KV"
   id = "42ee21cd50bf44adb285c6c3d02727cd"   #paste your own id
   ```


### Development
Start the development server:
```sh
npm run dev
```

### Deployment
Deploy the application:
```sh
npm run deploy
```
## Notes
Adjusting root path:
 - path in cachePurge.js need to be adjusted

## License
This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome!