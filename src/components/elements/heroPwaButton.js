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
      <div className="mt-[75px]">
        <div className="font-bold mb-4">Install App on iOS</div>
        <div className="text-white text-[13px] md:text-sm">
          To install this app on your iPhone/iPad, tap <strong>Share</strong>{" "}
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
