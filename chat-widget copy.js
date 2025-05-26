(function () {
    const createChatWidget = () => {
      const wrapper = document.createElement("div");
      wrapper.style.position = "fixed";
      wrapper.style.bottom = "20px";
      wrapper.style.right = "20px";
      wrapper.style.zIndex = "1000";
      wrapper.style.textAlign = "right";
  
      const iframe = document.createElement("iframe");
      // iframe.src = "./widget.html";
      iframe.src = "https://sabrinaguo.github.io/chat-embed-widget/widget.html";
      iframe.width = "400";
      iframe.height = "600";
      iframe.style.border = "1px solid #5e55fa";
      iframe.style.borderRadius = "16px";
      iframe.style.marginBottom = "1rem";
      iframe.style.padding = "1rem";
      iframe.style.display = "none";
  
      const button = document.createElement("button");
      button.innerText = "Open Chat";
      button.style.width = "54px";
      button.style.height = "54px";
      button.style.borderRadius = "50%";
      button.style.border = "1px solid #5e55fa";
      button.style.backgroundColor = "white";
      button.style.color = "#5e55fa";
      button.style.fontSize = "14px";
  
      button.addEventListener("click", () => {
        toggleIframe()
      });

      const closeBtn = document.querySelector('.close-btn');
      closeBtn.addEventListener("click",closeIframe())
  
      wrapper.appendChild(iframe);
      wrapper.appendChild(button);
      document.body.appendChild(wrapper);
    };
    const toggleIframe = () =>{
      iframe.style.display = iframe.style.display === "none" ? "block" : "none";
    }
    const closeIframe = () =>{
      iframe.style.display = "none";
    }
  
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", createChatWidget);
    } else {
      createChatWidget();
    }
  })();
  