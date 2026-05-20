import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About - Zaby",
  description:
    "Zaby is an AI-native operational infrastructure platform built to help businesses deploy autonomous AI systems capable of execution, workflow automation, and persistent operational intelligence.",
};

export default function AboutPage() {
  return <AboutClient />;
}
