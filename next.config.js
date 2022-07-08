module.exports = {
  reactStrictMode: true,
  async rewrites() {
    // if (process.env.NODE_ENV === "production") {
    //   // Don't proxy in prod since that will be handled by a reverse proxy
    //   return [];
    // }
    return [{ source: "/:path*", destination: "http://localhost:3000/api/:path*" }];
  },
};
