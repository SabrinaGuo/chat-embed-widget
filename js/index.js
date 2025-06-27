(async function (w) {
  const API_URL = 'https://dev-lemma-chatbot-102754923040.asia-east1.run.app/chat/v1/ask'

  const USER_COLOR = 'linear-gradient(90deg, #bf51dc 0%, #5e55fa 100%)'
  const satisfactionHTML = document.querySelector('#t_satisfaction').innerHTML;
  const enterQuestionnaireHTML = document.querySelector('#t_enterQuestionnaire').innerHTML;
  const userInput = document.getElementById("userInput");
  const sendBtn = document.querySelector(".send-btn");
  const lang = w.navigator.language.includes('zh') ? 'zh' : 'en'
  const t = w[`lm_${lang}`]

  w.LM = {}

  let connecting = false;
  let isComposing = false;
  let isFeedbackInputComposing = false;
  let loader = undefined;
  let ES, timer, errorEL;

  const defaultCallSatisfactionStr = [
    "謝謝你",
    "太感謝了！",
    "了解了",
    "沒問題了",
    "我知道該怎麼做了",
    "Thanks, Thank you",
    "Much appreciated!",
    "Got it, I see",
    "That's all, No more questions",
    "I know what to do now",
  ];

  const enterQuestionnaireStr = [
    "你沒幫上忙",
    "這不是我要的答案",
    "我想跟真人聊",
    "That didn’t help",
    "That’s not what I asked",
    "I want to talk to a human",
  ];

  init();

  function init() {
    setI18n()
    createBotMsg("Hi there! I'm Poco. How can I assist you today?");
    // startEventSource()

    sendBtn.addEventListener("click", sendMessage);

    // 判斷是否正在輸入中文（選字階段）
    userInput.addEventListener("compositionstart", () => { isComposing = true });
    userInput.addEventListener("compositionend", () => { isComposing = false });

    userInput.addEventListener("keydown", handleInput);
    document.querySelector(".close-btn").addEventListener("click", closeBot);

    // 判斷是否正在輸入中文（選字階段）
    document.addEventListener('compositionstart', (e) => {
      if (e.target.matches('.feedback-input')) {
        isFeedbackInputComposing = true
      }
    })
    document.addEventListener('compositionend', (e) => {
      if (e.target.matches('.feedback-input')) {
        isFeedbackInputComposing = false
      }
    })

    document.addEventListener("keydown", handleFeedbackInput);
  }

  //////////////////////////////////////////////////////////////////////

  function setI18n() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (t[key]) el.textContent = t[key];
    });
    document.querySelectorAll("[data-i18n-input]").forEach(el => {
      const key = el.dataset.i18nInput;
      if (t[key]) el.placeholder = t[key];
    });
  }

  function closeBot() {
    window.parent.postMessage("closeChatIframe", "*");
  }

  function handleInput(e) {
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault(); // 阻止換行
      sendMessage();
    }
  }

  function handleFeedbackInput(e) {
    const target = e.target;
    if (
      target.matches(".feedback-input") &&
      e.key === "Enter" &&
      !e.shiftKey &&
      !isFeedbackInputComposing &&
      !target.disabled
    ) {
      const message = target.value?.trim();
      if (message) {
        e.preventDefault();
        target.disabled = true
        createBotMsg(
          "Thanks again for your valuable feedback! I'll keep improving to deliver a better experience in the future."
        );
      }
    }
  }

  function linkify(text) {
    const urlRegex =
      /(https?:\/\/[^\s\u3002\uff0c\u3001\uFF1F\uFF01\uFF1B\uFF1A\u300C\u300D\u300E\u300F\u201C\u201D\u300A\u300B\u3010\u3011\uFF08\uFF09]+)/g;
    return text.replace(urlRegex, (url) => {
      return `<a class="link-style" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
  }

  function formatTime() {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, "0");
    const m = now.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
  }

  // loading 訊息
  function createBotLoading() {
    const { botBox, botBoxContent, botImg, botIcon } = createBotEL('loading')
    const loading = createEL('div', 'spinner')
    loading.innerHTML = document.querySelector('#t_loading').innerHTML

    botIcon.appendChild(botImg);
    botBox.appendChild(botIcon);
    botBox.appendChild(botBoxContent);
    botBoxContent.appendChild(loading);

    messages.appendChild(botBox);
    scrollToBottom()
    return botBox;
  }

  // user 回覆訊息
  function createUserMsg(str) {
    const { botBox, botBoxContent } = createBotEL('user')
    const userTime = createTimeEL(formatTime())
    const userP = createTextEL(str)

    botBox.appendChild(userTime);
    botBox.appendChild(botBoxContent);
    botBoxContent.appendChild(userP);

    messages.appendChild(botBox);
    scrollToBottom()
    return botBox
  }

  // 機器人回覆訊息
  function createBotMsg(str) {
    const { botBox, botBoxContent, botImg, botIcon } = createBotEL('bot')
    const botTime = createTimeEL(formatTime())

    if (defaultCallSatisfactionStr.includes(str)) {
      botBoxContent.innerHTML = satisfactionHTML;
    } else if (enterQuestionnaireStr.includes(str)) {
      botBoxContent.innerHTML = enterQuestionnaireHTML;
    } else {
      const botP = createTextEL(linkify(str))
      botBoxContent.appendChild(botP);
    }

    botIcon.appendChild(botImg);
    botBox.appendChild(botIcon);
    botBox.appendChild(botBoxContent);
    botBox.appendChild(botTime);

    messages.appendChild(botBox);
    scrollToBottom()
    return botBox
  }

  function createErrorMsg(str) {
    const error = createEL('div', 'error-message')
    const span = createEL('span')
    span.textContent = str
    error.appendChild(span)
    messages.appendChild(error)
    scrollToBottom()
    return error
  }

  function scrollToBottom() {
    setTimeout(() => {
      messages.scrollTop = messages.scrollHeight;
    }, 0)
  }

  function createEL(tagName, className) {
    const el = document.createElement(tagName);
    if (className) el.className = className
    return el
  }

  // 訊息結構
  function createBotEL(type) {
    const botBox = createEL('div', 'messages-box')
    const botBoxContent = createEL('div', 'messages-content')

    switch (type) {
      case 'bot':
        botBox.className += ' messages-bot'
        break
      case 'user':
        botBox.className += ' messages-user'
        break
      case 'loading':
        botBox.className += ' messages-bot loading-box'
        break
      default: break
    }

    const botIcon = createEL('div', 'messages-bot-icon')
    botIcon.style.background = USER_COLOR;

    const botImg = createEL('img')
    botImg.src = './img/icon-bot.svg';

    return { botBox, botBoxContent, botIcon, botImg }
  }

  // 訊息內容
  function createTextEL(str) {
    const text = createEL('div', 'text-style')
    text.innerHTML = str
    return text
  }

  // 時間內容
  function createTimeEL(time) {
    const t = createEL('span')
    t.textContent = time;
    return t
  }

  async function sendMessage() {
    const msg = userInput.value.trim();
    if (!msg || connecting) return;

    userInput.value = ""; // 同步清空
    createUserMsg(msg);

    const loadingEl = createBotLoading();
    handleSending(loadingEl, true)

    // 有錯誤訊息的話清掉錯誤訊息
    if (errorEL) {
      errorEL.remove()
      errorEL = undefined
    }

    // 如為使用者訊息包含預設文字，show 回饋訊息
    if (defaultCallSatisfactionStr.includes(msg)) {
      handleSending(loadingEl, false)
      createBotMsg(satisfactionHTML);
      return;
    }

    const controller = new AbortController();
    try {
      loader = loadingEl
      // setTimer(() => controller.abort()) // 設定五秒計時，超過時間顯示超時提示

      const res = await fetch(API_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: '12345',
            user_input: msg,
            is_new_topic: 1,
            topic_id: 10
          }),
          signal: controller.signal,
        }
      );
      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');

      let textArr = []
      let botMsg, botContent;

      if (!textArr.length) {
        // 清除剛開始 fetch 設定 5 秒計時器
        clearTimer()
        handleSending(loader, false)
        // 建立訊息畫面
        botMsg = createBotMsg('');
        botContent = botMsg.querySelector('.text-style')
      }

      while (true) {
        const { value, done } = await reader.read();
        // 新的訊息開始時清除計時
        clearTimer()

        if (done) {
          handleSending(undefined, false)
          break;
        }
        // 等待訊息不能超過 5 秒，如果超過取消 fetch
        setTimer(() => controller.abort())
        handleSending(undefined, true)
        const chunk = decoder.decode(value, { stream: true });

        // SSE 格式，逐行處理
        chunk.split('\n').forEach((line) => {
          if (line.startsWith('data: ')) {
            const data = line.replace('data: ', '').trim();
            if (data === '[DONE]') return;
            try {
              const json = JSON.parse(data);
              const content = json.content;
              if (content) {
                textArr.push(json)
                botContent.textContent += content
                scrollToBottom()
              }
            } catch (e) {
              console.error('JSON 解析失敗:', e);
            }
          }
        });
      }
    } catch (error) {
      createErrorMsg(error.messages)
    } finally {
      handleSending(loadingEl, false)
      clearTimer()
    }
  }

  // function startEventSource() {
  //   let textArr = []
  //   let botMsg, botContent;

  //   // const ES = new EventSource(API_URL)
  //   ES = new EventSource('http://localhost:3010/api/events')
  //   clearTimer() // 重設並清除計時

  //   ES.onopen = (event) => {
  //     console.log('es open');
  //   }

  //   ES.onmessage = (event) => {
  //     if (errorEL) {
  //       // 訊息開始時，有錯誤提示的話移除提示
  //       errorEL.remove()
  //       errorEL = undefined
  //     }
  //     handleSending(loader, false) // 移除畫面上的loading訊息
  //     handleSending(undefined, true) // 進行訊息輸入防呆

  //     if (timer) {
  //       // 新的訊息進來時，清除五秒計時
  //       console.log('有新訊息清除計時');
  //       clearTimer()
  //     }

  //     // 開始計時五秒
  //     setTimer(resetBotCreator)

  //     const data = JSON.parse(event.data);
  //     if (!textArr.length) {
  //       botMsg = createBotMsg('');
  //       botContent = botMsg.querySelector('.text-style')
  //     }
  //     textArr.push(data)
  //     botContent.textContent = textArr.map(itm => itm.content).join('')
  //     scrollToBottom()
  //   };

  //   ES.onerror = (error) => {
  //     console.log(error);

  //     console.error('SSE 連線錯誤');
  //     // errorEL = createErrorMsg(t.errorTimeOut)
  //     handleSending(undefined, false)
  //   };

  //   ES.addEventListener('done', (event) => {
  //     // const data = JSON.parse(event.data)
  //     console.log('訊息結束囉', event);
  //     clearTimer()
  //     handleSending(undefined, false)
  //     resetBotCreator()
  //   });

  //   function resetBotCreator() {
  //     textArr = []
  //     botMsg = undefined;
  //     botContent = undefined
  //   }
  // }

  function setTimer(callback) {
    timer = setTimeout(() => {
      console.log('等待訊息超過時間囉');
      errorEL = createErrorMsg(t.errorTimeOut)
      handleSending(loader, false)
      if (callback) callback()
      return
    }, 5000)
  }

  function clearTimer() {
    clearTimeout(timer);
    timer = undefined
  }

  // function restartES() {
  //   ES.close()
  //   ES.removeEventListener('done', () => { })
  //   handleSending(undefined, false)
  //   startEventSource()
  // }

  function handleSending(loader, isSending) {
    if (isSending) {
      connecting = true
      sendBtn.classList.add("disabled");
    } else {
      connecting = false
      sendBtn.classList.remove("disabled");
      if (loader) loader.remove();
    }
  }

  w.LM.showText = (str) => {
    createUserMsg(str);
    setTimeout(() => {
      if (str === "Yes") {
        createBotMsg(
          "Thank you for your feedback! I'm glad I could help. If you have any other questions, feel free to chat with me anytime!"
        );
        scrollToBottom()
        return;
      }
      createBotMsg("That didn’t help");
      scrollToBottom()
    }, 600);
  }
})(window)

