# yiwangMYF 博客系统

基于 Jekyll 构建的静态博客系统，专为 GitHub Pages 部署优化。

**当前环境适配**：已针对 Ruby 4.0.0+ 环境优化，兼容 Windows/macOS/Linux。

## 功能特性

- 使用 Jekyll 4.4.1 + Minima 主题
- 响应式设计，支持暗色模式
- 文章分类、标签、归档
- 分页显示
- 评论系统（utterances，基于 GitHub Issues）
- 搜索功能（完整客户端搜索，支持标题、内容、分类、标签）
- SEO 优化（自动生成 sitemap、meta 标签）
- 谷歌分析集成
- 自定义导航菜单
- PDF 查看支持（集成 PDF.js）

## 项目结构

```
.
├── _config.yml           # 站点配置
├── _layouts/             # 布局文件
│   ├── default.html
│   ├── home.html
│   ├── post.html        # 文章布局（含评论）
│   └── archive.html     # 归档布局
├── _includes/           # 包含文件
│   ├── header.html      # 自定义导航
│   ├── analytics.html   # 分析脚本
│   └── custom-head.html
├── _posts/              # 博客文章
│   ├── java/
│   ├── mysql/
│   └── 解决方案/
├── assets/              # 静态资源
│   ├── css/
│   │   └── style.scss   # 自定义样式
│   ├── js/
│   └── images/
├── plugins/             # 插件（PDF.js）
├── books/               # 书籍页面
├── asserts/             # 静态文件（PDF 等）
├── index.markdown       # 首页
├── about.markdown       # 关于页面
├── archive.md           # 归档页面
├── categories.md        # 分类页面
├── tags.md              # 标签页面
├── search.md            # 搜索页面
├── book.md              # 书籍页面
├── robots.txt           # 搜索引擎规则
```

### 环境配置说明 (Gemfile)

为适配 Ruby 4.0.0+ 环境，`Gemfile` 已进行以下关键配置：

1. **Jekyll 版本**：`gem "jekyll", "~> 4.4.1"`（原 4.5.0 不可用）
2. **缺失标准库**：添加 `gem "logger"` 和 `gem "bigdecimal"`（Ruby 4.0.0 移出标准库）
3. **平台配置**：`:mingw` 改为 `:windows`，消除弃用警告
4. **Bundler 版本**：锁定 `BUNDLED WITH 2.2.33`，但推荐使用 Bundler 4.0.3 运行

完整配置见 `Gemfile` 文件。

## 快速开始

### 本地开发环境

1. **安装 Ruby 和 Bundler**
   - **Windows**：使用 [RubyInstaller](https://rubyinstaller.org/) 安装 Ruby 4.0.0+
   - **macOS**：使用 Homebrew `brew install ruby`
   - **Linux**：使用发行版包管理器

2. **克隆项目并安装依赖**
   ```bash
   git clone https://github.com/yiwangMYF/yiwangMYF.github.io.git
   cd yiwangMYF.github.io
   ```

   **重要**：Ruby 4.0.0+ 需要特定版本的 Bundler：
   ```bash
   # 如果已安装 bundler 2.2.33 且有兼容性问题，使用以下命令
   bundle _4.0.3_ install
   ```
   或者更新全局 Bundler：
   ```bash
   gem install bundler:4.0.3
   bundle install
   ```

3. **启动本地服务器**
   ```bash
   # 使用适配的 Bundler 版本
   bundle _4.0.3_ exec jekyll serve
   ```
   访问 http://localhost:4000

   **端口冲突处理**：如果 4000 端口被占用，可指定其他端口：
   ```bash
   bundle _4.0.3_ exec jekyll serve --port 4001 --host=127.0.0.1
   ```

### 写作新文章

在 `_posts` 目录下创建 Markdown 文件，文件名格式：`YYYY-MM-DD-标题.md`

文件头部需包含 Front Matter：

```yaml
---
layout: post
title: "文章标题"
date: 2025-06-04 09:31:26 +0800
categories: [分类1, 分类2]
tags: [标签1, 标签2]
---
```

文章内容使用 Markdown 语法。

### 文章分类

文章可以按分类组织到子目录中，例如：
- `_posts/java/` - Java 相关文章
- `_posts/mysql/` - MySQL 相关文章
- `_posts/解决方案/` - 解决方案文章

分类会在导航中自动生成。

## 配置说明

### 基本配置 (`_config.yml`)

主要配置项：

- `title`: 站点标题
- `description`: 站点描述
- `url`: 站点 URL
- `github_username`: GitHub 用户名
- `navigation`: 导航菜单
- `social_links`: 社交链接
- `paginate`: 每页显示文章数
- `plugins`: 启用的插件

### 评论系统 (utterances)

基于 GitHub Issues 的评论系统，配置项：

```yaml
utterances:
  repo: yiwangMYF/yiwangMYF.github.io  # 改为你的仓库
  issue-term: pathname
  theme: github-light
```

需要确保仓库已启用 Issues 功能。

### 谷歌分析

取消注释 `_config.yml` 中的 `ga_tracking_id` 并填入你的 GA4 测量 ID。

### 自定义样式

编辑 `assets/css/style.scss` 文件，支持暗色模式自适应。

### 自定义布局

- `_layouts/post.html`: 文章页面布局（含评论）
- `_layouts/archive.html`: 归档页面布局
- `_includes/header.html`: 导航菜单
- `_includes/analytics.html`: 分析脚本

## 部署到 GitHub Pages

### 自动部署 (推荐)

1. 将代码推送到 GitHub 仓库 `yiwangMYF.github.io`
2. 在仓库 Settings → Pages 中，选择 Source 为 "GitHub Actions"

GitHub 会自动使用 `.github/workflows/jekyll.yml`（如果存在）构建并部署。

### 手动部署

1. 本地构建静态文件
   ```bash
   bundle exec jekyll build
   ```
2. 将 `_site` 目录内容推送到 `gh-pages` 分支

## 插件说明

已安装的 Jekyll 插件：

- `jekyll-feed`: 生成 RSS 订阅
- `jekyll-sitemap`: 生成站点地图
- `jekyll-seo-tag`: SEO 优化标签
- `jekyll-archives`: 分类和标签归档
- `jekyll-paginate`: 文章分页

## 自定义功能

### PDF 查看

集成 PDF.js 查看器，示例见 `books/redis-preview.md`：

```html
<iframe src="/plugins/pdfjs/web/viewer.html?file=/asserts/books/文件名.pdf"
    width="100%" height="800px">
</iframe>
```

### 搜索功能

访问 `/search/` 页面进行文章搜索。搜索功能已完整实现，包含以下特性：

- **多字段搜索**：支持文章标题、内容、分类和标签的全文搜索
- **智能排序**：根据匹配程度（标题匹配权重最高）自动排序
- **实时搜索**：输入时实时显示结果（带防抖优化）
- **高亮显示**：搜索结果中匹配的关键词会高亮显示
- **响应式设计**：适配桌面和移动设备
- **暗色模式支持**：自动适应系统主题
- **错误处理**：搜索索引加载失败时显示友好错误信息

**技术实现**：
- 构建时生成 `search.json` 索引文件（包含所有文章数据）
- 客户端使用 JavaScript 加载索引并执行搜索
- 搜索结果通过权重算法排序（标题:10分，分类/标签:7分，内容:5分）
- 支持中文关键词搜索

**搜索页面**：`/search/` 或通过导航菜单的"搜索"链接访问

## 常见问题

### 1. Ruby 4.0.0+ 环境问题
**症状**：运行 `bundle` 或 `jekyll serve` 时出现 `DidYouMean::SPELL_CHECKERS` 或 `cannot load such file -- logger` 错误。
**解决**：项目已适配 Ruby 4.0.0+，请使用：
```bash
bundle _4.0.3_ install
bundle _4.0.3_ exec jekyll serve
```

### 2. 本地运行提示 "bundle: command not found"
需要安装 Ruby 和 Bundler，见 "本地开发环境" 部分。

### 3. Bundler 版本兼容性问题
**症状**：`bundle install` 失败或运行时错误。
**解决**：安装 Bundler 4.0.3：
```bash
gem install bundler:4.0.3
# 或使用指定版本
bundle _4.0.3_ install
```

### 4. 标准库缺失错误
**症状**：`cannot load such file -- logger` 或 `cannot load such file -- bigdecimal`
**解决**：这些库在 Ruby 4.0.0 中已移出标准库，但已在 `Gemfile` 中自动添加，运行 `bundle install` 即可。

### 5. 评论不显示
确保仓库已启用 Issues，且 `utterances.repo` 配置正确。

### 6. 分类/标签页面为空
检查 `_config.yml` 中 `jekyll-archives` 配置，确保 `enabled` 包含 `categories` 和 `tags`。

### 7. 分页不工作
确保 `_config.yml` 中设置了 `paginate: 5`，且首页使用 `layout: home`。注意：可能需要 index.html 作为分页模板。

### 8. 样式未生效
检查 `assets/css/style.scss` 文件格式，确保文件开头包含 `---` 空 Front Matter。

### 9. 端口 4000 被占用
**症状**：无法启动服务器或访问失败。
**解决**：使用其他端口：
```bash
bundle _4.0.3_ exec jekyll serve --port 4001 --host=127.0.0.1
```

## 更新维护

### 更新依赖
```bash
# 使用适配的 Bundler 版本
bundle _4.0.3_ update
```

### 升级 Jekyll
修改 `Gemfile` 中的 `jekyll` 版本号，然后运行：
```bash
bundle _4.0.3_ update jekyll
```

### Ruby 4.0.0+ 环境适配说明
本项目已适配 Ruby 4.0.0+ 环境，主要变更包括：
1. **添加缺失的标准库**：`logger`、`bigdecimal` 已添加到 `Gemfile`
2. **平台配置更新**：`:mingw` 平台改为 `:windows`
3. **Bundler 版本**：推荐使用 Bundler 4.0.3
4. **Jekyll 版本**：使用兼容的 4.4.1 版本（原 4.5.0 在 RubyGems 中不可用）

### 新增功能验证
本地运行验证命令：
```bash
# 生成静态站点
bundle _4.0.3_ exec jekyll build

# 启动测试服务器（Python）
cd _site && python -m http.server 4002
# 访问 http://localhost:4002 验证
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request 改进本博客系统。