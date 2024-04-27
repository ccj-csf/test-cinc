import { defineConfig, loadEnv } from "vite";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import react from "@vitejs/plugin-react";
import viteImagemin from "vite-plugin-imagemin";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log("mode :>> ", mode);
  // 判断是否是生产环境
  const isProduction = mode === "prod";

  return {
    plugins: [
      react(),
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7, // GIF 图片的优化级别，范围从 1（最少压缩）到 3（最多压缩）
          interlaced: false, // 是否应用隔行扫描。隔行扫描的 GIF 在加载过程中逐渐清晰
        },
        optipng: {
          optimizationLevel: 7, // PNG 图片的优化级别，范围从 0（无优化）到 7（最高压缩）
        },
        mozjpeg: {
          quality: 80, // 设置 JPEG 图片的质量，范围从 0（最差质量，最小文件）到 100（最佳质量，最大文件）
        },
        svgo: {
          plugins: [
            { removeViewBox: true }, // 删除 SVG 的 viewBox 属性。如果为 true，当图标被缩放时可能会失去维度
            { removeEmptyAttrs: false }, // 是否删除 SVG 文件中的空属性
          ],
        },
        // 其他类型图片的配置
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
      preprocessorOptions: {
        less: {
          // 这里可以定义全局变量等
          modifyVars: {
            "primary-color": "#ff4757",
          },
          javascriptEnabled: true,
        },
      },
    },
    server: {
      host: "0.0.0.0",
      warmup: {
        clientFiles: [],
      },
      // proxy: {
      //   "/v1": {
      //     // eslint-disable-next-line no-undef
      //     target: loadEnv(mode, process.cwd()).VITE_API_URL, // 目标接口的域名
      //     changeOrigin: true, // 必须设置为true，才能正确代理跨域请求
      //     rewrite: (path) => path.replace(/^\/v1/, ""), // 将/api重写为空，如果后端接口没有/api前缀，需要这样处理
      //   },
      // },
    },
    build: {
      outDir: "dist",
      minify: "terser", // 指定使用 terser 插件进行压缩
      terserOptions: {
        compress: {
          // 仅在生产环境中删除 console 和 debugger
          drop_console: isProduction,
          drop_debugger: isProduction,
        },
      },
      rollupOptions: {
        output: {
          // 分割代码块的配置
          manualChunks(id) {
            if (id.includes("node_modules")) {
              // 获取 node_modules 内部的模块路径，例如 node_modules/react/index.js
              const modules = id.toString().split("node_modules/")[1];
              // 获取模块的包名，例如取得 react
              const packageName = modules.split("/")[0];
              // 为每个包创建一个分块，例如 node_modules/react 和 node_modules/react-dom 将分别打包成 react 和 react-dom 的代码块
              return packageName;
            }
          },
        },
      },
    },
  };
});
