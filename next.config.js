/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGODB_URI: "mongodb+srv://getcontext:glaZWH70VvvDJcVt@cluster0.a35d0.mongodb.net/metacrud?retryWrites=true&w=majority",
    JWT_SECRET: 'secret',
  }
}

module.exports = nextConfig