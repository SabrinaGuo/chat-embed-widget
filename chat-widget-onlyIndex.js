// chat-widget.js
(function() {
  const style = document.createElement('style');
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
      background: url('./img-bot.png') center no-repeat;
      background-size: contain;
    }
    .iframe-btn.open figure {
      top: 50%;
      width: 26px;
      height: 26px;
      background: url('./img-arrow.png') center no-repeat;
      background-size: contain;
    }
    .iframe-content {
      display: block;
      width: 360px;
      height: 540px;
      border-radius: 20px;
      margin-bottom: 10px;
      box-shadow: 4px 0px 20px 0px #00000026;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    .iframe-content.show {
      opacity: 1;
      pointer-events: auto;
    }
  `;

  document.head.appendChild(style);

  const wrapper = document.createElement('div');
  wrapper.className = 'iframe-wrapper';

  const iframe = document.createElement('iframe');
  iframe.src = 'https://sabrinaguo.github.io/chat-embed-widget/widget.html';
  iframe.frameBorder = '0';
  iframe.className = 'iframe-content';
  iframe.id = 'chatIframe';

  const btn = document.createElement('div');
  btn.className = 'iframe-btn';
  const figure = document.createElement('figure');
  btn.appendChild(figure);

  wrapper.appendChild(iframe);
  wrapper.appendChild(btn);
  document.body.appendChild(wrapper);

  const toggleIframe = () => {
    iframe.classList.toggle('show');
    btn.classList.toggle('open');
  };

  btn.addEventListener('click', toggleIframe);

  window.addEventListener('message', (event) => {
    if (event.data === 'closeChatIframe') {
      iframe.classList.remove('show');
      btn.classList.remove('open');
    }
  });
})();
