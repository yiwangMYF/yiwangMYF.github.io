---
layout: page
title: 书籍
---

<div id="book-auth-container">
  <div id="book-login-form" class="book-auth-form">
    <h3>书籍访问验证</h3>
    <p>请输入访问密码：</p>
    <input type="password" id="book-password" placeholder="输入访问密码" class="book-password-input">
    <button id="book-login-btn" class="book-auth-btn">验证</button>
    <p id="book-login-error" class="book-error" style="display:none;color:red;">密码错误，请重试</p>
    <div class="book-auth-note">
      <p><small>默认访问密码: <code>yiwangMYF</code> (请勿外传)</small></p>
      <p><small>验证状态保存7天</small></p>
    </div>
  </div>

  <div id="book-content" style="display:none;">
    <h3>已授权访问的书籍</h3>
    <ul id="book-list">
      <li><a href="/books/redis-preview" id="book-redis-link">【高清电子版】Redis深度历险：核心原理和应用实践</a></li>
    </ul>
    <button id="book-logout-btn" class="book-auth-btn book-logout-btn">退出登录</button>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const BOOK_AUTH_KEY = 'book_auth_token';
  const BOOK_AUTH_PASSWORD = 'yiwangMYF'; // 默认密码
  const AUTH_EXPIRY_DAYS = 7;

  const loginForm = document.getElementById('book-login-form');
  const contentDiv = document.getElementById('book-content');
  const passwordInput = document.getElementById('book-password');
  const loginBtn = document.getElementById('book-login-btn');
  const logoutBtn = document.getElementById('book-logout-btn');
  const errorMsg = document.getElementById('book-login-error');

  // 检查URL中的访问令牌
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get('access');

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

  // URL令牌验证（默认本人权限）
  if (accessToken === 'yiwangMYF') {
    const expiry = Date.now() + (AUTH_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    localStorage.setItem(BOOK_AUTH_KEY, JSON.stringify({
      token: BOOK_AUTH_PASSWORD,
      expiry: expiry
    }));
    // 移除URL参数
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  // 初始显示
  if (checkAuth()) {
    loginForm.style.display = 'none';
    contentDiv.style.display = 'block';
  } else {
    loginForm.style.display = 'block';
    contentDiv.style.display = 'none';
  }

  // 登录按钮事件
  loginBtn.addEventListener('click', function() {
    const password = passwordInput.value.trim();
    if (password === BOOK_AUTH_PASSWORD) {
      const expiry = Date.now() + (AUTH_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
      localStorage.setItem(BOOK_AUTH_KEY, JSON.stringify({
        token: BOOK_AUTH_PASSWORD,
        expiry: expiry
      }));

      loginForm.style.display = 'none';
      contentDiv.style.display = 'block';
      errorMsg.style.display = 'none';
      passwordInput.value = '';
    } else {
      errorMsg.style.display = 'block';
      passwordInput.focus();
    }
  });

  // 回车键登录
  passwordInput.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
      loginBtn.click();
    }
  });

  // 退出登录
  logoutBtn.addEventListener('click', function() {
    localStorage.removeItem(BOOK_AUTH_KEY);
    contentDiv.style.display = 'none';
    loginForm.style.display = 'block';
    passwordInput.value = '';
    passwordInput.focus();
  });

  // 为书籍链接添加验证令牌（防止直接分享）
  const bookLink = document.getElementById('book-redis-link');
  if (bookLink && checkAuth()) {
    const originalHref = bookLink.getAttribute('href');
    bookLink.setAttribute('href', originalHref + '?auth=' + BOOK_AUTH_PASSWORD);
  }
});
</script>

<style>
.book-auth-form {
  max-width: 400px;
  margin: 40px auto;
  padding: 30px;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  background-color: #f6f8fa;
  text-align: center;
}

.book-password-input {
  width: 100%;
  padding: 12px 16px;
  margin: 15px 0;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
}

.book-password-input:focus {
  outline: none;
  border-color: #0366d6;
  box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.1);
}

.book-auth-btn {
  background-color: #0366d6;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  margin-top: 10px;
}

.book-auth-btn:hover {
  background-color: #005cc5;
}

.book-logout-btn {
  background-color: #6a737d;
  margin-top: 30px;
}

.book-logout-btn:hover {
  background-color: #586069;
}

.book-auth-note {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #e1e4e8;
  color: #6a737d;
  font-size: 14px;
}

.book-error {
  margin: 10px 0;
  padding: 10px;
  background-color: #ffebee;
  border-radius: 4px;
}

#book-list {
  list-style-type: none;
  padding-left: 0;
}

#book-list li {
  margin: 15px 0;
  padding: 15px;
  background: white;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
}

#book-list a {
  color: #0366d6;
  text-decoration: none;
  font-size: 16px;
}

#book-list a:hover {
  text-decoration: underline;
}
</style>
