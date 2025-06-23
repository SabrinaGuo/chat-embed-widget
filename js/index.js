const botBaseImg =
    "data:image/png;base64,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";

    const satisfactionHTML = `
<div class="bot-feedback-block">
    <div class="text-style">Was this answer helpful to you?</div>
    <div class="feedback-buttons">
    <button onclick="showText('Yes')">Yes</button>
    <button onclick="showText('No')">No</button>
    </div>
    <textarea placeholder="more..." rows="4" id="feedback-input"></textarea>
</div>
`;

    const enterQuestionnaireHTML = `
<div class="bot-feedback-block">
    <div class="text-style">Sorry we couldn’t assist you this time. Please leave your information via our  
    <a class="link-style" href="https://aicom.nextlink.cloud/en/contact-us/" target="_blank" rel="noopener noreferrer">Contact Us</a> 
    form, and we’ll arrange for a specialist to get in touch with you as soon as possible.
    </div>
</div>
`;

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

    let connecting = false;
    let isComposing = false;
    let isFeedbackInputComposing = false;

    const userInput = document.getElementById("userInput");
    const sendBtn = document.querySelector(".send-btn");

    function init() {
    // messages.innerHTML = '';
    createBotMsg("Hi there! I'm Poco. How can I assist you today?");
    }
    init();

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

    function createUserMsg(str) {
    const userBox = document.createElement("div");
    userBox.className = "messages-user messages-box";
    const userTime = document.createElement("span");
    userTime.textContent = formatTime();
    const userBoxContent = document.createElement("div");
    userBoxContent.className = "messages-content";
    const userP = document.createElement("div");
    userP.className = "text-style";
    userP.innerHTML = str;

    userBox.appendChild(userTime);
    userBox.appendChild(userBoxContent);
    userBoxContent.appendChild(userP);
    messages.appendChild(userBox);
    messages.scrollTop = messages.scrollHeight;
    }

    function createBotMsg(str) {
    const botBox = document.createElement("div");
    botBox.className = "messages-bot messages-box";

    const botBoxContent = document.createElement("div");
    botBoxContent.className = "messages-content";

    const botImg = document.createElement("img");
    botImg.src = botBaseImg;

    const botTime = document.createElement("span");
    botTime.textContent = formatTime();
    if (defaultCallSatisfactionStr.includes(str)) {
        botBoxContent.innerHTML = satisfactionHTML;
    } else if (enterQuestionnaireStr.includes(str)) {
        botBoxContent.innerHTML = enterQuestionnaireHTML;
    } else {
        const botP = document.createElement("div");
        botP.className = "text-style";
        botP.innerHTML = linkify(str);
        botBoxContent.appendChild(botP);
    }

    botBox.appendChild(botImg);
    botBox.appendChild(botBoxContent);
    botBox.appendChild(botTime);
    messages.appendChild(botBox);

    messages.scrollTop = messages.scrollHeight;
    }

    function getMessageAndSend() {
    const msg = userInput.value.trim();
    if (!msg) return;

    userInput.value = ""; // 同步清空
    sendMessage(msg); // 把訊息傳進去
    }

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
            "https://billing-ai-temp-505738238648.asia-east1.run.app/api/v1/demo/stream_ask_question",
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question_str: msg,
                account_restrictions: [],
            }),
            }
        );
        const replyText = await response.text();
        loadingEl.remove();
        createBotMsg(replyText);
        connecting = false;
        sendBtn.classList.remove("disabled");
        } catch (error) {
        if (loadingEl) loadingEl.remove();
        createBotMsg(error.messages);
        connecting = false;
        sendBtn.classList.remove("disabled");
        }
    }
    }

    function showText(str) {
    createUserMsg(str);
    setTimeout(() => {
        if (str === "Yes") {
        createBotMsg(
            "Thank you for your feedback! I'm glad I could help. If you have any other questions, feel free to chat with me anythime!"
        );
        return;
        }
        createBotMsg("That didn’t help");
    }, 600);
    }

    sendBtn.addEventListener("click", () => {
    getMessageAndSend();
    });
    // 判斷是否正在輸入中文（選字階段）
    userInput.addEventListener("compositionstart", () => {
    isComposing = true;
    });

    document.addEventListener("keydown", (e) => {
    const target = e.target;
    if (
        target.matches("#feedback-input") &&
        e.key === "Enter" &&
        !e.shiftKey &&
        !isFeedbackInputComposing
    ) {
        const message = target.value?.trim();
        if (message) {
        // createUserMsg(message);
        e.preventDefault();
        createBotMsg(
            "Thanks again for your valuable feedback! I'll keep improving to deliver a better experience in the future."
        );
        // target.value = "";
        }
    }
    });

    userInput.addEventListener("compositionend", () => {
    isComposing = false;
    });

    document.getElementById("userInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !isComposing) {
        e.preventDefault(); // 阻止換行
        getMessageAndSend();
    }
    });

    document.querySelector(".close-btn").addEventListener("click", () => {
    // 通知父視窗隱藏 iframe
    window.parent.postMessage("closeChatIframe", "*");
    });