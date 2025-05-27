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
      padding: 9px 20px;
    }
    .title-head {
      display: flex;
      align-items: center;
      margin: 0;
    }
    .title-wrap{
      text-align: left;
    }
    .title-head img {
      width: 40px;
      margin-right: 12px;
    }
    .title-head p {
      font-size: 14px;
      margin: 0;
      font-weight: 700;
      color: white;
    }
    .title-head span {
      font-size: 12px;
      font-weight: 400;
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
    .close-btn{
      display: inline-block;
      width: 24px;
      height: 24px;
    }
    .close-btn img{
      width: 100%;
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
    .send-btn.disabled {
      pointer-events: none;
      opacity: 0.6;
      cursor: not-allowed;
    }
    .messages-box {
      display: flex;
      align-items: flex-end;
      margin-bottom: 20px;
    }
    .messages-content{
      padding: 8px 12px;
      max-width: 70%;
    }
    .messages-box p {
      margin: 0;
      text-align: left;
      font-size: 13px;
      font-weight: 400;
      color: #444;
    }
    .messages-box span{
      padding: 0 5px;
      color: #888888;
      font-size: 10px;
    }
    .messages-box button{
      width: 100%;
      margin-top: 10px;
      padding: 4px;
      border:none;
      border-radius: 4px;
      background-color: #fff;
      cursor: pointer;
    }
    .messages-box textarea{
      display: block;
      width: 100%;
      font-size: 13px;
      margin-top: 10px;
      padding: 4px;
      border:none;
      border-radius: 4px;
      background-color: #fff;
      box-sizing: border-box;
    }
    .messages-bot img {
      width: 24px;
      height: 24px;
      margin-right: 5px;
    }
    .messages-bot .messages-content {
      background-color: #F1F1F1;
      border-radius: 16px 16px 16px 0;
    }
    .messages-user {
      justify-content: end;
    }
    .messages-user .messages-content {
      background-color: rgba(150, 144, 249, 0.2);
      border-radius: 16px 16px 0 16px;
    }
    .spinner {
      text-align: center;
      height: 18px;
    }

    .spinner > div {
      width: 8px;
      height: 8px;
      background-color: #444;

      border-radius: 100%;
      display: inline-block;
      -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
      animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }

    .spinner .bounce1 {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }

    .spinner .bounce2 {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }

    @-webkit-keyframes sk-bouncedelay {
      0%, 80%, 100% { -webkit-transform: scale(0) }
      40% { -webkit-transform: scale(1.0) }
    }

    @keyframes sk-bouncedelay {
      0%, 80%, 100% { 
        -webkit-transform: scale(0);
        transform: scale(0);
      } 40% { 
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
      }
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
      <a href="javascript:;" class="close-btn">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALQSURBVHgB7VrrcdswDIZ7/V9tEI7gETRCR1AnqDcQPUG8gbuBu4GygbOBNUIyAUpWdE3RoAi+Ivcu3x3POhmPDxT4JsAn1sUGCgIRG/UjVNmq0pii8abKaH5fN5vNGzwKFGmhSq/KgHxo2Z3WhbWgnLeRpJeCaSER0Slkau2oSusRGVV5UeUdppTR0Kn0BLf0oqB1fqj0GqEWFPmfC7XY4dQGQjYaI3vy2OqhNIxTyuGBQ3rBrm4/vwi7pxy7FPkzUeMCCsEEcnF8nLOD8JA/QCUo27JoEHifNjuoDCKIE6QAp77dhoQPAk5jRHrFmZxchbzF4eBwEDHKg6V4gZXg8Bi4Sm1y5IVBZELLUbKjPsLKcFJpCAmLlNrHqbtlyV79RMg2bE44b/2/gQm8DULBaQDeejetw+rjnayQXMEOGCC+Wg9h8uHanOt1GEoj4lOxR0C8H3x6BnkZYT/MDee9zxkisRQEFhgUcT5X2lIC3y0Bdv6HgsBCIzrOZ63d9f1XS0ZYzyMkQC1GdAD68Vr70hHZaxlIg72O/pdCX6iXjnAUDME98VcOeY1gACWBzHfZsAMgI4yFabyS+Eti3nKRzBBfAN8gAQT5PczTKSeIJ+t5BML51mrl0TPQpd4GGeMEw769MmwpgZyBrPeRLxEEmxuWmUrIBVk3CMFwwZtKEA5YCwhTO5cQecIHO01xvjbfLQkK1qfy6MbIIn8mGjfFd9LoGVaG4nCMygr835eURnGIiroScD4D5fMgIv/wVMLExY9tIG9zKQNYalMN77cWy2993/t0t/DTthaNMWpzt1oQOlUdX9V2qC9Yfnt9KE7ecuA74DjmBGLsPhN2yx1wOA4l0tAOO4w7Yho8tqI6ixqHfK8wzdd1eTfv9PqiMTrCo/cCtQ/5bOCDHLOWCEQ3wB3GH3RLLNAR1LhqcL1mIGB+1eDvNQNVxoe6avCJTPwBMKZuCjePmfsAAAAASUVORK5CYII=" alt="">
      </a>
    </div>
    <div class="messages" id="messages"></div>
    <div class="input-area">
      <input id="userInput" type="text" placeholder="輸入訊息..." />
      <div class="send-btn"></div>
    </div>
  `;

  const satisfactionHTML=`<p>請問這次的對話是否有解決您的問題呢？</p>
          <button onclick="showText('是')">是</button>
          <button onclick="showText('否')">否</button>
          <textarea type="text" placeholder="更多意見回饋" rows="4"></textarea>`

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
    if( widget.classList.contains('show')){
      init()
    }
  });

  // 傳送訊息
  let connecting = false;
  let isComposing = false;
  const sendBtn = widget.querySelector(".send-btn");
  const userInput = widget.querySelector("#userInput");
  const messages = widget.querySelector("#messages");

  const defaultCallSatisfactionStr = '暫時沒問題';

  const botBaseImg = "data:image/png;base64,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"

  function init(){
    messages.innerHTML = '';
    createBotMsg('嗨，您好，我是 Poco，有什麼我可以幫上忙的地方嗎？')
  }

  function linkify(text) {
    const urlRegex =
      /(https?:\/\/[^\s\u3002\uff0c\u3001\uFF1F\uFF01\uFF1B\uFF1A\u300C\u300D\u300E\u300F\u201C\u201D\u300A\u300B\u3010\u3011\uFF08\uFF09]+)/g;
    return text.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
  }

  function formatTime() {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  function switchToObject(str){
    const cleanedStr = str.trim();
    const [key, ...rest] = cleanedStr.split(":");
    const value = rest.join(":").trim();
    const result = { [key.trim()]: value };
    return result;
  };

  function createBotLoading() {
    const botBox = document.createElement("div");
    botBox.className = "messages-bot messages-box loading-box";

    const botBoxContent = document.createElement("div");
    botBoxContent.className = "messages-content";
    const botImg = document.createElement("img");
    botImg.src = "./img-head.png";

    const loading = document.createElement("div");
    loading.className = "spinner";
    loading.innerHTML = `
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    `;

    botBox.appendChild(botImg);
    botBox.appendChild(botBoxContent);
    botBoxContent.appendChild(loading);
    messages.appendChild(botBox);

    return botBox;
  }

  function createUserMsg(str){
    const userBox = document.createElement("div");
    userBox.className = "messages-user messages-box";
    const userTime = document.createElement("span");
    userTime.textContent = formatTime();
    const userBoxContent = document.createElement("div");
    userBoxContent.className = "messages-content";
    const userP = document.createElement("p");
    userP.innerHTML = str;

    userBox.appendChild(userTime);
    userBox.appendChild(userBoxContent);
    userBoxContent.appendChild(userP);
    messages.appendChild(userBox);
  }

  function createBotMsg(str) {
    const botBox = document.createElement("div");
    botBox.className = "messages-bot messages-box";
    const botBoxContent = document.createElement("div");
    botBoxContent.className = "messages-content";
    const botImg = document.createElement("img");
    botImg.src = botBaseImg;

    const botP = document.createElement("p");
    if (str === defaultCallSatisfactionStr) {
      botBoxContent.innerHTML = satisfactionHTML;
    } else {
      botP.innerHTML = linkify(str);
    }

    const botTime = document.createElement("span");
    botTime.textContent = formatTime();

    botBox.appendChild(botImg);
    botBox.appendChild(botBoxContent);
    botBoxContent.appendChild(botP);
    botBox.appendChild(botTime);
    messages.appendChild(botBox);
  }

  function getMessageAndSend(){
    const msg = userInput.value.trim();
    if (!msg) return;

    userInput.value = ""; // 同步清空
    sendMessage(msg); // 把訊息傳進去
  };

  const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ4MzQwMzc1LCJpYXQiOjE3NDgzMTE1NzUsImp0aSI6IjFiNTcwMWZmNDZkZDQyOTc5MDVhNTVhM2I2ZWYwM2U1IiwidXNlcl9pZCI6M30.2uaTeDGIz_mn71IondBAursvTdULbbSogpDtrqzggPs";

  async function sendMessage(msg) {
    const messages = document.getElementById("messages");
    if (!msg) return;
    createUserMsg(msg);
    const loadingEl = createBotLoading();

    if (msg === defaultCallSatisfactionStr) {
      loadingEl.remove();
      createBotMsg(satisfactionHTML);
      return;
    }

    if (!connecting) {
      connecting = true;
      sendBtn.classList.add("disabled");
      try {
        const response = await fetch(
          "https://dev-backend.aicom.cloud/api/chatbot/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.replace(/^"|"$/g, "")}`,
            },
            body: JSON.stringify({ question: msg }),
          }
        );
        const raw = await response.text();
        const replyText = switchToObject(raw);
        console.log(replyText);
        if (loadingEl) loadingEl.remove();
        createBotMsg(replyText.data);
        connecting = false;
        sendBtn.classList.remove("disabled");
      } catch (error) {
        if (loadingEl) loadingEl.remove();
        createBotMsg(error.messages);
        connecting = false;
        sendBtn.classList.remove("disabled");
      }
    }
    messages.scrollTop = messages.scrollHeight;
  }

  window.showText = function(str){
    createUserMsg(str)
    setTimeout(() => {
      if (str === "是") {
        createBotMsg(
          "沒問題，很高興能幫上忙，如果有疑問，歡迎隨時在這輸入關鍵字與我聯繫！"
        );
        return;
      }
      createBotMsg("好的，感謝您的回饋。");
    }, 600);
  }

  sendBtn.addEventListener("click", () => {
    getMessageAndSend();
  });
  // 判斷是否正在輸入中文（選字階段）
  userInput.addEventListener("compositionstart", () => {
    isComposing = true;
  });

  userInput.addEventListener("compositionend", () => {
    isComposing = false;
  });

  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !isComposing) {
        e.preventDefault(); 
        getMessageAndSend();
    }
  });

  document.querySelector('.close-btn').addEventListener('click', () => {
    widget.classList.remove("show");
    btn.classList.remove("open");
  });

})();
