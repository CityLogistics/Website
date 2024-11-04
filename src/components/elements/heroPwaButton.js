import { useState, useEffect } from "react";

export default function HeroInstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isIosDevice = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    setIsIos(isIosDevice);

    if (!isIosDevice) {
      // Listen for the 'beforeinstallprompt' event on non-iOS devices
      const handleBeforeInstallPrompt = (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setShowInstallButton(true);
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

      return () => {
        window.removeEventListener(
          "beforeinstallprompt",
          handleBeforeInstallPrompt
        );
      };
    }
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        setDeferredPrompt(null);
        setShowInstallButton(false);
      });
    }
  };

  if (isIos) {
    return (
      <div className="mt-[2vh] px-[5%] w-full">
        <div className="w-full text-white bg-primary rounded-[15px] p-3 text-[17px] md:text-sm text-center font-medium mb-4">
          Install App
        </div>
        <div className="font-serif text-center text-[13px] md:text-sm">
          To install this app, click on the <strong>Share</strong> button, and
          then <strong>Add to Home Screen</strong>.
        </div>
      </div>
    );
  }

  if (!showInstallButton) {
    return null;
  }

  return (
    <div className="mt-[2vh] px-[5%] w-full">
      <button
        onClick={handleInstallClick}
        type="button"
        className="w-full text-white bg-primary rounded-[15px] p-3 text-[17px] md:text-sm text-center font-medium"
      >
        Add App to Home Screen
      </button>
    </div>
  );
}
