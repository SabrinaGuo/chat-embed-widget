(function() {
    const BOT_SRC = 'https://sabrinaguo.github.io/chat-embed-widget/'
    const BOT_IMG = 'https://sabrinaguo.github.io/chat-embed-widget/img-head.png'

    let isOpenBot = false

    const WRAPPER = document.createElement('div')
    WRAPPER.style.position = 'fixed'
    WRAPPER.style.right = '20px'
    WRAPPER.style.bottom = '20px'
    WRAPPER.style.width = '48px'
    WRAPPER.style.height = '48px'
    WRAPPER.style.cursor = 'pointer'
    WRAPPER.style.zIndex = '9999'
    WRAPPER.style.overflow = 'hidden'

    const BOT_BTN = document.createElement('div')
    BOT_BTN.id = 'LM-chatbot-btn'
    BOT_BTN.style.width = '48px'
    BOT_BTN.style.height = '48px'
    BOT_BTN.style.border = 'none'
    BOT_BTN.style.borderRadius = '50%'
    BOT_BTN.style.backgroundImage = `url(${BOT_IMG})`
    BOT_BTN.style.backgroundRepeat = 'no-repeat'
    BOT_BTN.style.backgroundSize = '100% 100%'
    BOT_BTN.style.position = 'absolute'
    BOT_BTN.style.right = '0'
    BOT_BTN.style.bottom = '0'

    const IFRAME = document.createElement('iframe')
    IFRAME.style.width = '100%'
    IFRAME.style.height = '540px'
    IFRAME.style.border = 'none'
    IFRAME.src = BOT_SRC
    IFRAME.style.display = 'none'
    IFRAME.style.userSelect = 'none'

    WRAPPER.appendChild(IFRAME)
    WRAPPER.appendChild(BOT_BTN)
    document.body.appendChild(WRAPPER)

    BOT_BTN.addEventListener('click', handleOpenBot)

    window.addEventListener('message', (event) => {
        // 可以檢查來源安全性（建議）
        // if (event.origin !== 'https://xxx.com') return;
        if (event.data === 'closeChatIframe') {
            isOpenBot = false
            setCloseStyle()
        }
    });

    function handleOpenBot () {
        isOpenBot = !isOpenBot
        if (!isOpenBot) {
            setCloseStyle()
        } else {
            setOpenStyle()
        }
    }

    function setCloseStyle () {
        WRAPPER.style.width = '48px'
        WRAPPER.style.height = '48px'
        IFRAME.style.display = 'none'
    }

    function setOpenStyle () {
        WRAPPER.style.width = '360px'
        WRAPPER.style.height = '603px'
        IFRAME.style.display = 'block'
    }
})()