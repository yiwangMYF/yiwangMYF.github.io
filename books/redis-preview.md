---
layout: none
categories: [书籍]
---

<div id="book-auth-check">
  <div id="book-auth-required" style="display:none;">
    <div class="book-auth-message">
      <h2>需要验证访问权限</h2>
      <p>此书籍内容受版权保护，请先验证访问权限。</p>
      <p><a href="/book/">返回书籍页面验证</a></p>
      <p>或输入访问密码：</p>
      <input type="password" id="direct-password" placeholder="输入访问密码">
      <button id="direct-login-btn">验证</button>
      <p id="direct-error" style="display:none;color:red;margin-top:10px;">密码错误</p>
    </div>
  </div>

  <div id="book-content-authorized" style="display:none;">
    <iframe id="pdf-viewer"
        width="100%" height="800px">
    </iframe>
    <div style="text-align:center;margin-top:20px;">
      <a href="/book/">返回书籍列表</a>
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const BOOK_AUTH_KEY = 'book_auth_token';
  const BOOK_AUTH_PASSWORD = 'yiwangMYF';
  const AUTH_EXPIRY_DAYS = 7;

  const authRequired = document.getElementById('book-auth-required');
  const contentAuthorized = document.getElementById('book-content-authorized');
  const directPassword = document.getElementById('direct-password');
  const directLoginBtn = document.getElementById('direct-login-btn');
  const directError = document.getElementById('direct-error');

  // 检查URL中的访问令牌
  const urlParams = new URLSearchParams(window.location.search);
  const urlAuth = urlParams.get('auth');
  const urlAccess = urlParams.get('access');

  // 检查现有验证状态
  function checkAuth() {
    const authData = localStorage.getItem(BOOK_AUTH_KEY);
    if (!authData) return false;

    try {
      const { token, expiry } = JSON.parse(authData);
      if (expiry && Date.now() > expiry) {
        localStorage.removeItem(BOOK_AUTH_KEY);
        return false;
      }
      return token === BOOK_AUTH_PASSWORD;
    } catch (e) {
      return false;
    }
  }

  // URL令牌验证（从书籍页面跳转或默认本人权限）
  if (urlAuth === BOOK_AUTH_PASSWORD || urlAccess === 'yiwangMYF') {
    const expiry = Date.now() + (AUTH_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    localStorage.setItem(BOOK_AUTH_KEY, JSON.stringify({
      token: BOOK_AUTH_PASSWORD,
      expiry: expiry
    }));
    // 移除URL参数
    const newUrl = window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);
  }

  // 加载PDF查看器
  function loadPDFViewer() {
    const pdfViewer = document.getElementById('pdf-viewer');
    if (pdfViewer) {
      // 使用重命名的PDF文件路径
      pdfViewer.src = '/plugins/pdfjs/web/viewer.html?file=/asserts/books/redis_book_secure.pdf';
    }
  }

  // 显示相应内容
  if (checkAuth()) {
    contentAuthorized.style.display = 'block';
    authRequired.style.display = 'none';
    loadPDFViewer();
  } else {
    contentAuthorized.style.display = 'none';
    authRequired.style.display = 'block';
  }

  // 直接密码验证
  directLoginBtn.addEventListener('click', function() {
    const password = directPassword.value.trim();
    if (password === BOOK_AUTH_PASSWORD) {
      const expiry = Date.now() + (AUTH_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
      localStorage.setItem(BOOK_AUTH_KEY, JSON.stringify({
        token: BOOK_AUTH_PASSWORD,
        expiry: expiry
      }));

      contentAuthorized.style.display = 'block';
      authRequired.style.display = 'none';
      directError.style.display = 'none';
      loadPDFViewer();
    } else {
      directError.style.display = 'block';
      directPassword.focus();
    }
  });

  directPassword.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
      directLoginBtn.click();
    }
  });
});
</script>

<style>
.book-auth-message {
  max-width: 500px;
  margin: 60px auto;
  padding: 40px;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  background-color: #f6f8fa;
  text-align: center;
}

.book-auth-message h2 {
  margin-top: 0;
  color: #24292e;
}

.book-auth-message p {
  margin: 15px 0;
  color: #586069;
}

.book-auth-message input {
  width: 100%;
  padding: 12px 16px;
  margin: 15px 0;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
}

.book-auth-message input:focus {
  outline: none;
  border-color: #0366d6;
  box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.1);
}

.book-auth-message button {
  background-color: #0366d6;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
}

.book-auth-message button:hover {
  background-color: #005cc5;
}

.book-auth-message a {
  color: #0366d6;
  text-decoration: none;
}

.book-auth-message a:hover {
  text-decoration: underline;
}
</style>
