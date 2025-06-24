const USER_COLOR = 'linear-gradient(90deg, #bf51dc 0%, #5e55fa 100%)'
const satisfactionHTML = document.querySelector('#t_satisfaction').innerHTML;
const enterQuestionnaireHTML = document.querySelector('#t_enterQuestionnaire').innerHTML;

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

init();

function init() {
	createBotMsg("Hi there! I'm Poco. How can I assist you today?");

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
				e.preventDefault();
				createBotMsg(
					"Thanks again for your valuable feedback! I'll keep improving to deliver a better experience in the future."
				);
			}
		}
	});

	sendBtn.addEventListener("click", sendMessage);

	// 判斷是否正在輸入中文（選字階段）
	userInput.addEventListener("compositionstart", () => { isComposing = true });
	userInput.addEventListener("compositionend", () => { isComposing = false });

	userInput.addEventListener("keydown", handleInput);
	document.querySelector(".close-btn").addEventListener("click", closeBot);
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
	botImg.src = "./img/icon-bot.svg";

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

	// 如為使用者訊息包含預設文字，show 回饋訊息
	if (defaultCallSatisfactionStr.includes(msg)) {
		handleSending(loadingEl, false)
		createBotMsg(satisfactionHTML);
		return;
	}

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
		createBotMsg(replyText);
	} catch (error) {
		createBotMsg(error.messages);
	} finally {
		handleSending(loadingEl, false)
	}
}

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
