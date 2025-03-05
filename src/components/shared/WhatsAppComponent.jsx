import { useEffect } from "react";

const WhatsAppButton = () => {
  useEffect(() => {
    const button = document.createElement("a");
    button.href = "https://wa.me/#";
    button.target = "_blank";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.width = "60px";
    button.style.height = "60px";
    button.style.backgroundColor = "#314549";
    button.style.borderRadius = "50%";
    button.style.display = "flex";
    button.style.justifyContent = "center";
    button.style.alignItems = "center";
    button.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    button.style.zIndex = "1000";
    button.innerHTML = `
      <svg width="40" height="40" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.002 3C9.372 3 4 8.374 4 15.002c0 2.414.658 4.772 1.912 6.85L4 29l7.418-1.866a12.951 12.951 0 0 0 4.584.867c6.63 0 12.002-5.373 12.002-12.002C28 8.374 22.628 3 16.002 3zm0 2c5.521 0 10.002 4.482 10.002 10.002 0 5.521-4.481 10.002-10.002 10.002a10.95 10.95 0 0 1-4.416-.889l-.316-.132-4.312 1.088 1.154-4.23-.184-.308A9.947 9.947 0 0 1 6 15.002C6 9.482 10.482 5 16.002 5zm-2.525 5a1.032 1.032 0 0 0-.875.515c-.233.361-.508 1.008-.592 1.356-.155.635-.272.909.313 1.671.584.762 1.72 2.274 3.714 3.143 1.836.797 2.212.744 2.896.58.447-.111 1.03-.473 1.175-.929.145-.456.145-.85.102-.929-.044-.08-.164-.125-.342-.219-.178-.094-1.03-.508-1.19-.567-.159-.058-.274-.087-.388.087-.114.173-.447.567-.546.685-.098.118-.21.133-.388.04-.179-.093-.757-.28-1.44-.89a5.417 5.417 0 0 1-1.073-1.26c-.112-.186-.012-.285.082-.381.084-.086.186-.2.278-.301.093-.102.155-.173.23-.287.076-.114.034-.222-.006-.308-.04-.086-.388-1.012-.53-1.388-.14-.375-.287-.36-.398-.366z"/>
      </svg>
    `;
    document.body.appendChild(button);

    return () => {
      document.body.removeChild(button);
    };
  }, []);

  return null;
};

export default WhatsAppButton;
