# Shadow Reading 英语学习网页 - 设计规范

## 1. 设计理念
**科技极简主义 (Tech Minimalism)** - 以内容为中心，减少视觉干扰，专注学习体验

## 2. 色彩系统

### 主色调
```css
--bg-primary: #0a0a0f;        /* 深空黑 - 主背景 */
--bg-secondary: #12121a;      /* 次级背景 */
--bg-card: #1a1a24;          /* 卡片背景 */
--bg-hover: #22222e;          /* 悬停状态 */
```

### 强调色
```css
--accent-primary: #00d4aa;    /* 科技青 - 主强调 */
--accent-secondary: #7c3aed;  /* 紫色 - 次强调 */
--accent-gradient: linear-gradient(135deg, #00d4aa 0%, #00a8cc 100%);
```

### 文字色
```css
--text-primary: #ffffff;      /* 主文字 */
--text-secondary: #a0a0b0;    /* 次级文字 */
--text-muted: #606070;       /* 弱化文字 */
```

### 功能色
```css
--success: #00d4aa;           /* 完成/成功 */
--warning: #f59e0b;          /* 警告 */
--error: #ef4444;            /* 错误 */
```

## 3. 字体系统

### 字体族
```css
--font-display: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
--font-body: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'SF Mono', 'Fira Code', monospace;
```

### 字号系统
```css
--text-xs: 11px;     /* 辅助信息 */
--text-sm: 13px;     /* 侧边栏 */
--text-base: 15px;   /* 正文 */
--text-lg: 18px;     /* 标题 */
--text-xl: 24px;     /* 大标题 */
--text-2xl: 32px;    /* 页面标题 */
```

## 4. 间距系统
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
```

## 5. 组件设计

### 按钮
- 圆角: 8px
- 内边距: 10px 16px
- 悬停: 背景变亮 + 轻微上移
- 过渡: 0.2s ease

### 卡片
- 圆角: 12px
- 背景: --bg-card
- 边框: 1px solid rgba(255,255,255,0.05)
- 阴影: 0 4px 20px rgba(0,0,0,0.3)

### 单词高亮
- 默认: 透明背景
- 悬停: --accent-primary 背景 20% 透明度
- 朗读中: --accent-primary 实色背景

### 进度条
- 高度: 3px
- 背景: --bg-secondary
- 填充: --accent-gradient
- 动画: 流动渐变效果

## 6. 布局规范

### 整体布局
- 左侧边栏: 260px (固定)
- 主内容区: 自适应
- 最大内容宽度: 900px
- 两侧留白: 40px

### 紧凑排版
- 段落间距: 16px
- 句子间距: 0
- 行高: 1.8
- 单词间距: 0

## 7. 交互规范

### 动画效果
- 页面切换: 淡入淡出 0.3s
- 按钮悬停: transform + color 0.2s
- 弹窗出现: scale + opacity 0.2s
- 朗读高亮: 背景色过渡 0.1s

### 快捷键
- 空格: 播放/暂停
- 左/右箭头: 切换文章
- ESC: 关闭弹窗

## 8. 音色选项

| 音色ID | 名称 | 特点 |
|--------|------|------|
| microsoft-zh | 微软中文 | 自然流畅 |
| google-zh | 谷歌中文 | 清晰标准 |
| baidu-zh | 百度中文 | 富有情感 |
| ali-zh | 阿里中文 | 稳重专业 |

英文音色:
| 音色ID | 名称 | 特点 |
|--------|------|------|
| en-US-Neural | 神经网络 | 最自然 |
| en-US-Standard | 标准美音 | 清晰稳定 |
| en-GB-Standard | 英式英语 | 标准优雅 |

## 9. 响应式断点
```css
--breakpoint-sm: 640px;   /* 手机竖屏 */
--breakpoint-md: 768px;  /* 手机横屏 */
--breakpoint-lg: 1024px; /* 平板 */
--breakpoint-xl: 1280px; /* 桌面 */
```

## 10. 验收标准
- [ ] 深色主题一致性
- [ ] 所有20篇文章可正常加载
- [ ] 朗读功能正常运作
- [ ] 单词点击显示释义
- [ ] 音色切换功能正常
- [ ] 紧凑排版舒适阅读
- [ ] 响应式适配正常
- [ ] 进度保存功能正常
