vite-plugin-fancy  
让 Vite 调试信息优雅可读 — 完整项目文档  
================================================

目录  
1. 项目简介  
2. 特性总览  
3. 快速上手  
4. API 参考  
5. 进阶指南  
   5.1 主题定制  
   5.2 自定义日志源  
   5.3 CI / 生产环境策略  
6. 插件架构  
7. 最佳实践  
8. FAQ & 故障排查  
9. Roadmap  
10. 贡献指南  
11. License  

------------------------------------------------
1. 项目简介  
vite-plugin-fancy 是一款「开发阶段专用」的 Vite 插件，专注两件事：  
• 控制台美化：让浏览器 DevTools 与终端日志清晰、彩色、可折叠。  
• 错误增强：把堆栈、源码、网络、性能等异常信息转化为可交互卡片，一键定位、一键回滚、一键复现。  

零配置即可生效；所有功能在 `vite build` 时自动剔除，产物体积 0 KB。  

------------------------------------------------
2. 特性总览  
| 模块 | 子特性 | 默认 | 备注 |  
|---|---|---|---|  
| 控制台美化 | 日志分级着色 | ✅ | 4 级颜色 + Emoji 图标 |  
| | 时间戳/耗时 | ✅ | 相对/绝对可切换 |  
| | 重复折叠 | ✅ | 相同内容 3 次以上折叠 |  
| | 代码高亮 | ✅ | highlight.js 20 KB gzip |  
| | 交互过滤 | ✅ | 关键字、RegExp、级别开关 |  
| | 持久化设置 | ✅ | localStorage 保存 |  
| 错误增强 | Sourcemap 还原 | ✅ | 点击跳转 IDE |  
| | 无关栈帧折叠 | ✅ | node_modules 自动隐藏 |  
| | 错误聚合 | ✅ | 同一错误显示出现次数 |  
| | 代码片段预览 | ✅ | 错误行 ±3 行高亮 |  
| | 一键复现 | ✅ | Rollback / StackBlitz |  
| | 网络错误提示 | ✅ | 404/500/CORS 智能提示 |  
| | 性能错误提示 | ✅ | Long Task / Bundle Size |  

------------------------------------------------
3. 快速上手  
3.1 安装  
```bash
npm i -D vite-plugin-fancy
# or
pnpm add -D vite-plugin-fancy
```

3.2 配置  
```ts
// vite.config.ts
import { defineConfig } from 'vite'
import fancy from 'vite-plugin-fancy'

export default defineConfig({
  plugins: [
    fancy() // 零配置即可
  ]
})
```

3.3 启动  
```bash
npm run dev
```
• 终端：日志彩色可点击  
• 浏览器：页面右上角出现 🎩 图标，点击展开调试面板  

------------------------------------------------
4. 项目结构
```text
vite-plugin-fancy/
├─ src/
│  ├─ index.ts                 # 主插件入口（configureServer + transformIndexHtml）
│  ├─ server/
│  │  ├─ logger.ts             # 终端彩色 & 可点击
│  │  ├─ hmr.ts                # HMR 事件转发
│  │  └─ bus.ts                # fancyBus 事件总线
│  ├─ client/
│  │  ├─ client.mts            # 浏览器端脚本（TS 源码）
│  │  ├─ overlay/
│  │  │  ├─ index.ts           # Shadow DOM Overlay
│  │  │  └─ style.css          # CSS 变量主题
│  │  ├─ errorCapture.ts       # 全局 error / unhandledrejection 捕获
│  │  └─ types.ts              # 客户端类型
│  └─ shared/
│     └─ types.ts              # 插件与用户共用类型
├─ playground/
│  ├─ vanilla/
│  │  ├─ index.html
│  │  └─ main.ts
│  ├─ react/
│  └─ vue/
├─ scripts/
│  ├─ build.ts                 # esbuild 打包 client.mts → dist/client.mjs
│  └─ release.sh
├─ package.json
├─ tsconfig.json
├─ tsup.config.ts              # 打包插件本体 (index.ts)
└─ README.md
```