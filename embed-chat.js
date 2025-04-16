(function () {
    const createChatWidget = () => {
      const wrapper = document.createElement("div");
      wrapper.style.position = "fixed";
      wrapper.style.bottom = "20px";
      wrapper.style.right = "20px";
      wrapper.style.zIndex = "1000";
      wrapper.style.textAlign = "right";
  
      const iframe = document.createElement("iframe");
      iframe.src = "https://neverssl.com";
      iframe.width = "400";
      iframe.height = "600";
      iframe.style.border = "1px solid #5e55fa";
      iframe.style.borderRadius = "16px";
      iframe.style.marginBottom = "1rem";
      iframe.style.display = "none";
  
      const button = document.createElement("button");
      button.innerText = "Open Chat";
      button.style.width = "60px";
      button.style.height = "60px";
      button.style.borderRadius = "50%";
      button.style.border = "1px solid #5e55fa";
      button.style.backgroundColor = "white";
      button.style.color = "#5e55fa";
      button.style.fontSize = "14px";
  
      button.addEventListener("click", () => {
        iframe.style.display = iframe.style.display === "none" ? "block" : "none";
      });
  
      wrapper.appendChild(iframe);
      wrapper.appendChild(button);
      document.body.appendChild(wrapper);
    };
  
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", createChatWidget);
    } else {
      createChatWidget();
    }
  })();
  