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

	const botIcon = document.createElement("div");
	botIcon.className = "messages-bot-icon";
	botIcon.style.background = "linear-gradient(90deg, #bf51dc 0%, #5e55fa 100%)";

	const botImg = document.createElement("img");
	botImg.src = "./img/icon-bot.svg";

	const loading = document.createElement("div");
	loading.className = "spinner";
	loading.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `;

	botIcon.appendChild(botImg);
	botBox.appendChild(botIcon);
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

	const botIcon = document.createElement("div");
	botIcon.className = "messages-bot-icon";
	botIcon.style.background = "linear-gradient(90deg, #bf51dc 0%, #5e55fa 100%)";

	const botImg = document.createElement("img");
	botImg.src = "./img/icon-bot.svg";

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

	botIcon.appendChild(botImg);
	botBox.appendChild(botIcon);
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

	if (defaultCallSatisfactionStr.includes(msg)) {
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
