import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "入口.exe｜观众资格大冒险",
  description: "真正的黑客松，是找到入口。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
