import NotFoundPage from "@/components/404NotFound";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Zaby",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return <NotFoundPage />;
}
