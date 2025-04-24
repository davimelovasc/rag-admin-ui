import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    UPLOAD_DOCUMENT_WEBHOOK: process.env.UPLOAD_DOCUMENT_WEBHOOK,
    LIST_DOCUMENT_WEBHOOK: process.env.LIST_DOCUMENT_WEBHOOK,
    DELETE_DOCUMENT_BASE_WEBHOOK: process.env.DELETE_DOCUMENT_BASE_WEBHOOK,
  },
};

export default nextConfig;
