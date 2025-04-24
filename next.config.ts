import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_UPLOAD_DOCUMENT_WEBHOOK: process.env.UPLOAD_DOCUMENT_WEBHOOK,
    NEXT_PUBLIC_LIST_DOCUMENT_WEBHOOK: process.env.LIST_DOCUMENT_WEBHOOK,
    NEXT_PUBLIC_DELETE_DOCUMENT_BASE_WEBHOOK: process.env.DELETE_DOCUMENT_BASE_WEBHOOK,
  },
};

export default nextConfig;
