---
layout: page
title: 搜索
permalink: /search/
---

<div class="search-container">
  <input type="text" id="search-input" placeholder="搜索文章..." class="search-box">
  <div id="search-results" class="search-results"></div>
</div>

<script>
// 简单搜索功能占位符
// 需要实现文章索引和搜索逻辑
document.getElementById('search-input').addEventListener('input', function(e) {
  const query = e.target.value.toLowerCase();
  const resultsDiv = document.getElementById('search-results');
  if (query.length < 2) {
    resultsDiv.innerHTML = '';
    return;
  }
  resultsDiv.innerHTML = '<p>搜索功能正在开发中...</p>';
});
</script>

<style>
.search-box {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
}
.search-results {
  min-height: 200px;
}
</style>