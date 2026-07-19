import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "核酸女孩｜生日快乐检测",
  description: "收集快乐样本，生成一份烦恼阴性的生日检测报告。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
