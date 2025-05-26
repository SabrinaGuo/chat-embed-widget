(function () {
  const style = document.createElement("style");
  style.textContent = `
    .iframe-wrapper {
      position: fixed;
      bottom: 20px;
      right: 28px;
      z-index: 1000;
      text-align: right;
    }
    .iframe-btn {
      position: relative;
      z-index: 0;
      display: inline-block;
      width: 54px;
      height: 54px;
      border-radius: 50%;
      cursor: pointer;
      background: linear-gradient(90deg, #BF51DC 0%, #5E55FA 100%);
    }
    .iframe-btn figure {
      position: absolute;
      top: 47%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 34px;
      height: 34px;
      margin: 0;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTUlEQVR4nO3VwUoDQRCA4V/NhRsgu7FwAjcAneAOcAFtQAeYgJxAH8eJSzXsuhpg9/VN7zAEXFkM1o7uZjGQ8wAjGQYwAjGUYAjGUYAjGQYwAjGUYAjGUYAjGQYwAjGUYAjGYYwbP9d7vOZT1xkKE1ZPKiQo9ogAOYAjGQYwAjGUYAjGQYwAjGUYAjGYYzPiPiYlYtLrfWOM7/bRtctGZlESdYCLPQlORvFCLPQlORvFCLPQlORvFCLPQlORvFCLPQlORvFCLPQlORvFCLPQlORvFCLOQYyDMZBjACMZBjACMZRgCMZBjACMZBjACMZBjACMZxqPrBO8/A/kAAAAASUVORK5CYII=') center no-repeat;
      background-size: contain;
    }
    .iframe-btn.open figure {
      top: 50%;
      width: 26px;
      height: 26px;
      background: url('data:image/svg+xml;utf8,<svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>') center no-repeat;
      background-size: contain;
    }

    .iframe-content {
      display: block;
      width: 360px;
      height: 540px;
      border-radius: 20px;
      margin-bottom: 10px;
      box-shadow: 4px 0px 20px 0px #00000026;
      background: white;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      font-family: sans-serif;
    }
    .iframe-content.show {
      opacity: 1;
      pointer-events: auto;
    }

    /* widget styles */
    .chat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(90deg, #BF51DC 0%, #5E55FA 100%);
      padding: 12px 20px;
    }
    .title-head {
      display: flex;
      align-items: center;
      margin: 0;
    }
    .title-head img {
      width: 40px;
      margin-right: 12px;
    }
    .title-head p {
      font-size: 16px;
      margin: 0;
      color: white;
    }
    .title-head span {
      font-size: 12px;
      color: white;
    }
    .green-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 4px;
      background-color: #43EE7D;
    }
    .close-btn {
      display: none;
    }
    .messages {
      flex: 1;
      overflow-y: auto;
      background: #fff;
      padding: 1.5rem 1rem;
    }
    .input-area {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      box-shadow: 0px -4px 16px 0px #00000014;
    }
    .input-area input {
      flex: 1;
      padding: 0.5rem;
      border: none;
      border-radius: 16px;
      background-color: #F4F4F4;
    }
    .send-btn {
      width: 24px;
      height: 24px;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAOCAYAAAD0f5bSAAAACXBIWXMAABYlAAAWJQFJUiTwAAAACXZwQWcAAAAMAAAADAB4tkUWAAAAkElEQVQoz2P8////fwYsgAnEDTgBkoXBDfwHEyOhS9AxRDQcgDMQRUATBQEiKH6PoPDB4A8RrsHqQw3DkSk3hHoASW4MEJ8A3ENRDEYiwPqfuOgNbgKxyAFnGTADqQDcQvwN8g4gmkPIf5gxEMkHBgUJmBgYHLQgJSQAAJUBo4lOwO2oAAAAASUVORK5CYII=') center no-repeat;
      background-size: contain;
      cursor: pointer;
    }
    .messages-box {
      display: flex;
      margin-bottom: 20px;
      align-items: flex-end;
    }
    .messages-box p {
      padding: 8px 12px;
      margin: 0;
      color: #444;
      max-width: 70%;
    }
    .messages-bot img {
      width: 24px;
      height: 24px;
      margin-right: 5px;
    }
    .messages-bot p {
      background-color: #F1F1F1;
      border-radius: 16px 16px 16px 0;
    }
    .messages-user {
      justify-content: end;
    }
    .messages-user p {
      background-color: rgba(150, 144, 249, 0.2);
      border-radius: 16px 16px 0 16px;
    }
  `;

  document.head.appendChild(style);

  const wrapper = document.createElement("div");
  wrapper.className = "iframe-wrapper";

  const widget = document.createElement("div");
  widget.className = "iframe-content";

  widget.innerHTML = `
    <div class="chat-header">
      <h2 class="title-head">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTUlEQVR4nO3VwUoDQRCA4V/NhRsgu7FwAjcAneAOcAFtQAeYgJxAH8eJSzXsuhpg9/VN7zAEXFkM1o7uZjGQ8wAjGQYwAjGUYAjGUYAjGQYwAjGUYAjGUYAjGQYwAjGUYAjGYYwbP9d7vOZT1xkKE1ZPKiQo9ogAOYAjGQYwAjGUYAjGQYwAjGUYAjGYYzPiPiYlYtLrfWOM7/bRtctGZlESdYCLPQlORvFCLPQlORvFCLPQlORvFCLPQlORvFCLPQlORvFCLPQlORvFCLPQlORvFCLOQYyDMZBjACMZBjACMZRgCMZBjACMZBjACMZBjACMZxqPrBO8/A/kAAAAASUVORK5CYII=" />
        <div class="title-wrap">
          <p>AICOM 平台智能幫手</p>
          <p><span class="green-dot"></span><span>在線上</span></p>
        </div>
      </h2>
    </div>
    <div class="messages" id="messages">
      <div class="messages-bot messages-box">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTUlEQVR4nO3VwUoDQRCA4V/NhRsgu7FwAjcAneAOcAFtQAeYgJxAH8eJSzXsuhpg9/VN7zAEXFkM1o7uZjGQ8wAjGQYwAjGUYAjGUYAjGQYwAjGUYAjGUYAjGQYwAjGUYAjGYYwbP9d7vOZT1xkKE1ZPKiQo9ogAOYAjGQYwAjGUYAjGQYwAjGUYAjGYYzPiPiYlYtLrfWOM7/bRtctGZlESdYCLPQlORvFCLPQlORvFCLPQlORvFCLPQlORvFCLPQlORvFCLPQlORvFCLPQlORvFCLOQYyDMZBjACMZBjACMZRgCMZBjACMZBjACMZBjACMZxqPrBO8/A/kAAAAASUVORK5CYII=" />
        <p>嗨，您好，我是 Poco，有什麼我可以幫上忙的地方嗎？</p>
      </div>
    </div>
    <div class="input-area">
      <input id="userInput" type="text" placeholder="輸入訊息..." />
      <div class="send-btn"></div>
    </div>
  `;

  const btn = document.createElement("div");
  btn.className = "iframe-btn";
  const figure = document.createElement("figure");
  btn.appendChild(figure);

  wrapper.appendChild(widget);
  wrapper.appendChild(btn);
  document.body.appendChild(wrapper);

  // 切換開關
  btn.addEventListener("click", () => {
    widget.classList.toggle("show");
    btn.classList.toggle("open");
  });

  // 傳送訊息
  const sendBtn = widget.querySelector(".send-btn");
  const userInput = widget.querySelector("#userInput");
  const messages = widget.querySelector("#messages");

  function sendMessage() {
    const msg = userInput.value.trim();
    if (!msg) return;

    const userBox = document.createElement("div");
    userBox.className = "messages-user messages-box";
    const userP = document.createElement("p");
    userP.innerHTML = msg;
    userBox.appendChild(userP);
    messages.appendChild(userBox);

    const botBox = document.createElement("div");
    botBox.className = "messages-bot messages-box";
    const botImgEl = document.createElement("img");
    botImgEl.src = figure.style.backgroundImage;
    const botP = document.createElement("p");
    botP.innerHTML = `<strong>Bot：</strong>這是自動回覆：「${msg}」`;
    botBox.appendChild(botImgEl);
    botBox.appendChild(botP);
    messages.appendChild(botBox);

    userInput.value = "";
    messages.scrollTop = messages.scrollHeight;
  }

  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
})();
