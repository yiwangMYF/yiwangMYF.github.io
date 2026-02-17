// Jekyll博客搜索功能
class JekyllSearch {
  constructor(options = {}) {
    this.searchInput = document.getElementById(options.searchInputId || 'search-input');
    this.resultsContainer = document.getElementById(options.resultsContainerId || 'search-results');
    this.searchIndex = [];
    this.minQueryLength = options.minQueryLength || 2;
    this.maxResults = options.maxResults || 20;

    this.init();
  }

  async init() {
    try {
      const response = await fetch('/search.json');
      if (!response.ok) {
        throw new Error(`Failed to load search index: ${response.status}`);
      }
      this.searchIndex = await response.json();
      console.log(`Loaded ${this.searchIndex.length} posts for search`);
      this.setupEventListeners();
    } catch (error) {
      console.error('Error loading search index:', error);
      this.resultsContainer.innerHTML = '<p class="search-error">搜索索引加载失败，请刷新页面重试。</p>';
    }
  }

  setupEventListeners() {
    // 防抖函数
    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };

    // 创建防抖搜索函数（300ms延迟）
    const debouncedSearch = debounce((value) => {
      this.search(value);
    }, 300);

    // 输入时搜索（使用防抖）
    this.searchInput.addEventListener('input', (e) => {
      debouncedSearch(e.target.value);
    });

    // 支持回车键（立即搜索）
    this.searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        this.search(e.target.value);
      }
    });

    // 清除按钮（可选）
    this.searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        this.searchInput.value = '';
        this.clearResults();
        this.searchInput.focus();
      }
    });
  }

  search(query) {
    const trimmedQuery = query.trim().toLowerCase();

    if (trimmedQuery.length < this.minQueryLength) {
      this.clearResults();
      return;
    }

    const results = this.performSearch(trimmedQuery);
    this.displayResults(results, trimmedQuery);
  }

  performSearch(query) {
    const results = [];

    for (const post of this.searchIndex) {
      let score = 0;
      const matches = [];

      // 搜索标题（权重最高）
      if (post.title && this.containsText(post.title, query)) {
        score += 10;
        matches.push('标题');
      }

      // 搜索内容
      if (post.content && this.containsText(post.content, query)) {
        score += 5;
        matches.push('内容');
      }

      // 搜索分类
      if (post.categories && Array.isArray(post.categories)) {
        for (const category of post.categories) {
          if (this.containsText(category, query)) {
            score += 7;
            if (!matches.includes('分类')) matches.push('分类');
            break;
          }
        }
      }

      // 搜索标签
      if (post.tags && Array.isArray(post.tags)) {
        for (const tag of post.tags) {
          if (this.containsText(tag, query)) {
            score += 7;
            if (!matches.includes('标签')) matches.push('标签');
            break;
          }
        }
      }

      if (score > 0) {
        results.push({
          ...post,
          score,
          matches
        });
      }
    }

    // 按分数排序
    return results.sort((a, b) => b.score - a.score).slice(0, this.maxResults);
  }

  containsText(text, query) {
    if (typeof text !== 'string') return false;
    return text.toLowerCase().includes(query);
  }

  highlightText(text, query) {
    if (!text || !query) return text;

    const regex = new RegExp(`(${this.escapeRegExp(query)})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  displayResults(results, query) {
    if (results.length === 0) {
      this.resultsContainer.innerHTML = `
        <div class="search-no-results">
          <p>未找到匹配 "${query}" 的文章</p>
          <p>尝试使用其他关键词或检查拼写</p>
        </div>
      `;
      return;
    }

    let html = `
      <div class="search-stats">
        <p>找到 ${results.length} 个匹配 "${query}" 的结果</p>
      </div>
    `;

    html += '<div class="search-results-list">';

    for (const result of results) {
      const highlightedTitle = this.highlightText(result.title, query);
      const highlightedExcerpt = result.excerpt ? this.highlightText(result.excerpt, query) : '';
      const matchesText = result.matches.length > 0 ? ` (匹配: ${result.matches.join(', ')})` : '';

      html += `
        <article class="search-result-item">
          <h3 class="search-result-title">
            <a href="${result.url}">${highlightedTitle}</a>
          </h3>
          <div class="search-result-meta">
            <span class="search-result-date">${result.date}</span>
            ${result.categories && result.categories.length > 0 ?
              `<span class="search-result-categories">分类: ${result.categories.join(', ')}</span>` : ''}
            ${result.tags && result.tags.length > 0 ?
              `<span class="search-result-tags">标签: ${result.tags.join(', ')}</span>` : ''}
          </div>
          ${highlightedExcerpt ? `<p class="search-result-excerpt">${highlightedExcerpt}</p>` : ''}
        </article>
      `;
    }

    html += '</div>';
    this.resultsContainer.innerHTML = html;
  }

  clearResults() {
    this.resultsContainer.innerHTML = '';
  }
}

// 页面加载完成后初始化搜索
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('search-input') && document.getElementById('search-results')) {
    window.jekyllSearch = new JekyllSearch({
      searchInputId: 'search-input',
      resultsContainerId: 'search-results',
      minQueryLength: 2,
      maxResults: 20
    });
  }
});