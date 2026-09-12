/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? "/embedded-lab" : "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
