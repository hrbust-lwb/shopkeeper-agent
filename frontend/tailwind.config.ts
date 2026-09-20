/**
 * Tailwind CSS 主题配置
 * 定义前端项目的字体、颜色和阴影扩展
 */
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Noto Sans SC"',
          '"Source Han Sans SC"',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          "system-ui",
          "sans-serif",
        ],
        mono: ['"JetBrains Mono"', '"SFMono-Regular"', "Consolas", "monospace"],
      },
      colors: {
        canvas: "#f3f6f5",
        surface: "#ffffff",
        ink: "#13211f",
        muted: "#63736f",
        line: "#d8e1df",
        brand: "#0f766e",
        brandDark: "#0b4f4a",
        brandLight: "#e6f4f1",
        mint: "#9ae6d9",
        amber: "#d97706",
        coral: "#e25c4d",
        sky: "#0e8ea8",
      },
      boxShadow: {
        line: "0 1px 2px rgba(19, 33, 31, 0.06)",
        soft: "0 8px 28px rgba(19, 33, 31, 0.07)",
        panel: "0 18px 48px rgba(19, 33, 31, 0.12)",
      },
    },
  },
  plugins: [],
} satisfies Config;
