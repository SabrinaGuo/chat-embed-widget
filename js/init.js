(function() {
    const BOT_DOMAIN = 'https://sabrinaguo.github.io'
    const BOT_SRC = `${BOT_DOMAIN}/chat-embed-widget`
    const BOT_IMG = `${BOT_SRC}/img/icon-bot.svg`
    const BOT_ARROW = `${BOT_SRC}/img/icon-arrow.svg`

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
    BOT_BTN.style.background = "linear-gradient(90deg, #BF51DC 0%, #5E55FA 100%)"
    BOT_BTN.style.position = 'absolute'
    BOT_BTN.style.right = '0'
    BOT_BTN.style.bottom = '0'
    BOT_BTN.style.display = 'flex'
    BOT_BTN.style.justifyContent = 'center'
    BOT_BTN.style.alignItems = 'center'

    const BTN_ICON = document.createElement('div')
    BTN_ICON.style.backgroundRepeat = 'no-repeat'
    BTN_ICON.style.backgroundSize = '100% 100%'
    BTN_ICON.style.marginBottom = '5px'
    BTN_ICON.style.userSelect = 'none'

    const IFRAME = document.createElement('iframe')
    IFRAME.style.width = '100%'
    IFRAME.style.height = '540px'
    IFRAME.style.border = 'none'
    IFRAME.src = BOT_SRC
    IFRAME.style.userSelect = 'none'

    setCloseStyle()

    WRAPPER.appendChild(IFRAME)
    WRAPPER.appendChild(BOT_BTN)
    BOT_BTN.appendChild(BTN_ICON)
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

        BTN_ICON.style.width = '34px'
        BTN_ICON.style.height = '32px'
        BTN_ICON.style.backgroundImage = `url(${BOT_IMG})`
        BTN_ICON.style.marginBottom = '5px'
    }

    function setOpenStyle () {
        WRAPPER.style.width = '360px'
        WRAPPER.style.height = '603px'

        IFRAME.style.display = 'block'

        BTN_ICON.style.width = '26px'
        BTN_ICON.style.height = '26px'
        BTN_ICON.style.marginBottom = '0px'
        BTN_ICON.style.backgroundImage = `url(${BOT_ARROW})`
    }
})()