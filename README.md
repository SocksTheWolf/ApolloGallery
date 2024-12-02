# Pineapple Gallery

## Description
Pineapple Gallery is a web application for managing and displaying galleries of images. It is built using React and leverages Cloudflare Workers and D1 for backend services.

## Table of Contents
- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Development](#development)
- [Deployment](#deployment)
- [License](#license)
- [Contributing](#contributing)
- [Support](#support)

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
   git clone https://github.com/yourusername/pineappleGallery.git
   cd pineappleGallery
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

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Support

If you encounter any issues or have questions, please open an issue on the [GitHub Issues](https://github.com/yourusername/pineappleGallery/issues) page.
