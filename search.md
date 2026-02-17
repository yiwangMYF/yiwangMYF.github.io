---
layout: page
title: 搜索
permalink: /search/
---

<div class="search-container">
  <input type="text" id="search-input" placeholder="搜索文章标题、内容、分类或标签..." class="search-box" autocomplete="off">
  <div id="search-results" class="search-results"></div>
</div>

<script src="/assets/js/search.js" defer></script>

<style>
.search-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.search-box {
  width: 100%;
  padding: 15px 20px;
  font-size: 18px;
  border: 2px solid #ddd;
  border-radius: 8px;
  margin-bottom: 30px;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-sizing: border-box;
}

.search-box:focus {
  outline: none;
  border-color: #0366d6;
  box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.1);
}

.search-results {
  min-height: 200px;
}

.search-stats {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  color: #666;
  font-size: 14px;
}

.search-stats p {
  margin: 0;
}

.search-no-results {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.search-no-results p {
  margin: 10px 0;
}

.search-results-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.search-result-item {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: white;
  transition: box-shadow 0.3s, transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.search-result-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.search-result-title {
  margin: 0 0 10px 0;
  font-size: 20px;
}

.search-result-title a {
  color: #0366d6;
  text-decoration: none;
  transition: color 0.2s;
}

.search-result-title a:hover {
  color: #005cc5;
  text-decoration: underline;
}

.search-result-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 12px;
  font-size: 13px;
  color: #666;
}

.search-result-date,
.search-result-categories,
.search-result-tags {
  display: inline-flex;
  align-items: center;
}

.search-result-date::before {
  content: "📅";
  margin-right: 4px;
}

.search-result-categories::before {
  content: "📁";
  margin-right: 4px;
}

.search-result-tags::before {
  content: "🏷️";
  margin-right: 4px;
}

.search-result-excerpt {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #444;
  border-left: 3px solid #eee;
  padding-left: 15px;
}

.search-error {
  padding: 20px;
  background: #fff3cd;
  border: 1px solid #ffecb5;
  border-radius: 6px;
  color: #856404;
  text-align: center;
}

/* 高亮样式 */
mark {
  background-color: #ffeb3b;
  padding: 1px 3px;
  border-radius: 2px;
  font-weight: bold;
}

/* 暗色模式支持 */
@media (prefers-color-scheme: dark) {
  .search-box {
    background-color: #2d2d2d;
    color: #e0e0e0;
    border-color: #444;
  }

  .search-box:focus {
    border-color: #58a6ff;
    box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.1);
  }

  .search-result-item {
    background: #2d2d2d;
    border-color: #444;
  }

  .search-stats,
  .search-no-results,
  .search-result-meta,
  .search-result-excerpt {
    color: #aaa;
  }

  .search-result-title a {
    color: #58a6ff;
  }

  .search-result-title a:hover {
    color: #79c0ff;
  }

  .search-result-excerpt {
    border-left-color: #444;
  }

  .search-error {
    background: #332701;
    border-color: #665c00;
    color: #ffd54f;
  }

  mark {
    background-color: #ffd54f;
    color: #000;
  }
}
</style>