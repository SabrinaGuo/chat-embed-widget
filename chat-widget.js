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
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABLCAYAAADnAAD1AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATZSURBVHgB7ZzhdZswEMfPfvleb1AyQd0JSiZoMkHoBE0niDNBkgnsTOBkArsTtJ4AbWBngqvOEg0GCSQsYcD6vadHCgeUf07S6SQFIBAIBAKBQKCXjKCjIGLED5H85240Gv2FQDVctAkv97xssUwqr00gUIYLM5Ui1ZFK7wxkkCAar9OxDSLmQDPPK/IHAnvxkiqRZNFxDeeORqA0X0VRVPFUYbeCc0fjWbHCLlbYbeGckZ5VQmM7MbVtkzGclp3qJKpjvQgCZVAdvjwq7OYKu9ATcxGeUA0Jdo2il15pbGZw7qAYgTQhBNMZ5Elozx0EPkB9VVYxg0AZ8iqsHtZtg+fVgCI2XCrEo3OdS2WdOg4swROnjB/eFZc2/NoOOkbnBOwbQcAjCQIeydGTSrxhn/JDzMs3Xlw18lPFs5gsrnjj5VW2ue2DIr20wv6zQuEErYr3iMPjHhpgXYX5i+b8kMAwWfAq/cPmBqtOBEWaKYHhkth6orEHopjAWWouU4D7wktfVg9Qm/cd9EnaK+6Ja3AJ6seoM+gpqM8CuZ2sQvWETq/Fy0B9FsjduFvzkhQGAIrJKtW0QvOsj/Q4ClVWKKqu2xd0DI2DbOW3r6QWkcmDpmgeHCcwELB6dUSeZVHIce4hP/mBZrliCOigSCTlWt1mJ/YCooh9nuB8sc0zLjIRx9IlZ3DeNEnUUrs5ueA/qDqDNYhsBZOFhm/tDrhPD31/Vivp2ynblF8NRmFOQgJ+Kdx4WUzxcKU7l0p3DFOc2+ZGI3R8krU1H77F1AYeBIwny4/1AIU2n8gDvc90oYjqExDeHsnTNG5+O3bMWfHsZ0/OwHLviUpjXNUdmtgwAQOwfvH4HBsOmyj0wuq11UaZFVQvs5trbNOcTXpRuM7AIbLNoIF5lUAJiN/oFdg9O4H60IuSBVT1HmrsGrfxvieVyANMvCtG+5GNad5uhjXDMMv5Zpb7OSp1Iq7ItU2m3JoaolgCHIE5CXjCm4BgHzfa2Mdgh7cYtliFGZwOn9HAJ/CEzzaQgR1N2yET3sET3gSUMRizuOW3he0r2GFrb0xRQNfV6MXC1jgbJHvNtaE5s7C1ZedVQP6hMzD7zz80GJHQ/C0zsHtwPCLJa7QX0Hei4Ab0nkjv/iWFtkKKQsE3q3j2DbdbgFsOnOxCvmiiuugCWd0oZb4AEX58lpc2IFYCNP4FShEvUcxZxyB6W+owaCz8avpstFvtn9eIZQL+v0hBqvNJZdh/7Bo8tUX82dRJeOsoMqTQB05GVXhTsFvKAX6MYXt9lmigDT+0rKW4M2pTNWmesUV1xiOBgaDRQPfdeaKxrFpV4cYEWsgZdpC679737lkYcwf+YqU+YOsgL1nksBeQeiteKCSoy5sNFVMBs7AryU4cBNJS1UtenqE/S9VcENVcX4NwLppwMx4xZQtvKCW/UDSgg/l7BaiectjPwqGLSAT1a0di6DmtfBvql4Cl2OM9uyjCF+V3gWuwek/vHNveKtAQ6QzZ8j0dienzbNZIU1tA7V6dUNRTMTgcIjJon3wcNymUKtYyIjHCapsDfkxTRjBMGIgF5sz0BquMtEEKqc9Q2GYlHmGd0pcv+AoiVhwC1NRQjGctHnHUZkNZpSkXR3suVBsEuwqJtl+bA0fmJANH8g/kQs0FIHKAPQAAAABJRU5ErkJggg==') center no-repeat;
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
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOuSURBVHgB7VlNTttAFH75WbS7cAOzQJRdegOzB5Qb4JyA3qBk2VXDCQg3CH9Sd/gGsAQ2cU9AsitSfvq9al40mcTjsR07lcgnWfHYk/H3/t/YRFts8bFRcZ3YarX8yWTSrFQqjdls9lSr1cJ+vz+kDSNRABD3QPwSp75xK4IwvWq1egVBItoQrAIo8g849SzTNipIzXZzb2/vJ2maB8kefq5B2MNvQ13mXx9u1drf3x+9vr4+UYmItYDS/kDGIHh4d3cXyvj4+DiAIN9x3TP+GuHo3N7e9qgExApwdHTkg+CDGoYgdLhq3qYFqbpM4swTd48J3tzc7OK0jXmRdsvDcQkBBywkFQSbCzXgQm8yRtr8iiBN9O+yLRIbxM/Pz38QlD6pDDSdTt8RoL8oARzELy8vF/jvbwjSpMVg50AP1hns1jRqxMEQVthNW7yKtog1jUJLkWaFTzjeod2QUqBoi9SSJmBxtlJLDZt40A/KAE2QEQT5QmsSxKkXOjk5eYMLyAPbec3ONWY8HgcojKd5XSvRAgxU5M/Qmq+GDWjpinIACWKINcKDg4NrJIcRBPEoo0WcLMApFQ8aiBUQzIcI5pDWhDwWcW6n4UZdLH6mhrGVOQ9EEM5aK25HSnGRfjHNfqCJwvYoY5VSIyoAqg87x+mpcWtJCKdWgqGqcChjuFRABYEJwsIBKwlDPd5kbzKHswUYZmHD+QVlBLfmrhY0nsvW35GCmkoABjdnZN/guGIILe+4TkYMPiIGuRAuJBFnFxLYOtOU66RqSUB+5fw6pQCbUlKpap0z1wO1u3OCSiC+dimSk1QCgLSkUdYIp9JzKhCq/pyB/Dft8kLsOAugUpv0ROyHHSoIBvG5y7LVYbmF5zoLgMX04tIrogbEEVcIQb5tPtdJAKX9QMbQfq5eaMX6VuJw147+QkGHkwB6ALEZ19UH5SEucHWhufvwopQT6yAuSCxk6o3Cv/LN2ldvIDJBiIPgEnFem4mn3Wu4WCC39m0aF+JQTI8ywCoAFy7S2gZ+I00pUCRxgVUAPERvZ51TZxnEBXUbCSN1OrkPmq4z1cubxIe43rm/v+/SGhErAHZG/DFDhmGS9lWwL73/YeKwxgUU0IXWUzVwLnBKo7YOVIiT0WIXTXz+nLgbK96NLmzkk4jX6/VuGZ+grHUAJHkX5GuXejiYFDd13sJCJRMXWF0IWm+D1IPm14E5pyxXiUPmj3yb0rgJ5z2x2ljLZ1Z+vdH/Hz6zbrHFR8dfAviFGyDpYuAAAAAASUVORK5CYII=') center no-repeat;
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
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABLCAYAAADnAAD1AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATZSURBVHgB7ZzhdZswEMfPfvleb1AyQd0JSiZoMkHoBE0niDNBkgnsTOBkArsTtJ4AbWBngqvOEg0GCSQsYcD6vadHCgeUf07S6SQFIBAIBAKBQKCXjKCjIGLED5H85240Gv2FQDVctAkv97xssUwqr00gUIYLM5Ui1ZFK7wxkkCAar9OxDSLmQDPPK/IHAnvxkiqRZNFxDeeORqA0X0VRVPFUYbeCc0fjWbHCLlbYbeGckZ5VQmM7MbVtkzGclp3qJKpjvQgCZVAdvjwq7OYKu9ATcxGeUA0Jdo2il15pbGZw7qAYgTQhBNMZ5Elozx0EPkB9VVYxg0AZ8iqsHtZtg+fVgCI2XCrEo3OdS2WdOg4swROnjB/eFZc2/NoOOkbnBOwbQcAjCQIeydGTSrxhn/JDzMs3Xlw18lPFs5gsrnjj5VW2ue2DIr20wv6zQuEErYr3iMPjHhpgXYX5i+b8kMAwWfAq/cPmBqtOBEWaKYHhkth6orEHopjAWWouU4D7wktfVg9Qm/cd9EnaK+6Ja3AJ6seoM+gpqM8CuZ2sQvWETq/Fy0B9FsjduFvzkhQGAIrJKtW0QvOsj/Q4ClVWKKqu2xd0DI2DbOW3r6QWkcmDpmgeHCcwELB6dUSeZVHIce4hP/mBZrliCOigSCTlWt1mJ/YCooh9nuB8sc0zLjIRx9IlZ3DeNEnUUrs5ueA/qDqDNYhsBZOFhm/tDrhPD31/Vivp2ynblF8NRmFOQgJ+Kdx4WUzxcKU7l0p3DFOc2+ZGI3R8krU1H77F1AYeBIwny4/1AIU2n8gDvc90oYjqExDeHsnTNG5+O3bMWfHsZ0/OwHLviUpjXNUdmtgwAQOwfvH4HBsOmyj0wuq11UaZFVQvs5trbNOcTXpRuM7AIbLNoIF5lUAJiN/oFdg9O4H60IuSBVT1HmrsGrfxvieVyANMvCtG+5GNad5uhjXDMMv5Zpb7OSp1Iq7ItU2m3JoaolgCHIE5CXjCm4BgHzfa2Mdgh7cYtliFGZwOn9HAJ/CEzzaQgR1N2yET3sET3gSUMRizuOW3he0r2GFrb0xRQNfV6MXC1jgbJHvNtaE5s7C1ZedVQP6hMzD7zz80GJHQ/C0zsHtwPCLJa7QX0Hei4Ab0nkjv/iWFtkKKQsE3q3j2DbdbgFsOnOxCvmiiuugCWd0oZb4AEX58lpc2IFYCNP4FShEvUcxZxyB6W+owaCz8avpstFvtn9eIZQL+v0hBqvNJZdh/7Bo8tUX82dRJeOsoMqTQB05GVXhTsFvKAX6MYXt9lmigDT+0rKW4M2pTNWmesUV1xiOBgaDRQPfdeaKxrFpV4cYEWsgZdpC679737lkYcwf+YqU+YOsgL1nksBeQeiteKCSoy5sNFVMBs7AryU4cBNJS1UtenqE/S9VcENVcX4NwLppwMx4xZQtvKCW/UDSgg/l7BaiectjPwqGLSAT1a0di6DmtfBvql4Cl2OM9uyjCF+V3gWuwek/vHNveKtAQ6QzZ8j0dienzbNZIU1tA7V6dUNRTMTgcIjJon3wcNymUKtYyIjHCapsDfkxTRjBMGIgF5sz0BquMtEEKqc9Q2GYlHmGd0pcv+AoiVhwC1NRQjGctHnHUZkNZpSkXR3suVBsEuwqJtl+bA0fmJANH8g/kQs0FIHKAPQAAAABJRU5ErkJggg==" />
        <div class="title-wrap">
          <p>AICOM 平台智能幫手</p>
          <p><span class="green-dot"></span><span>在線上</span></p>
        </div>
      </h2>
    </div>
    <div class="messages" id="messages">
      <div class="messages-bot messages-box">
        <img src="data:image/png;base64,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" />
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
    botImgEl.src = 'data:image/png;base64,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';
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
