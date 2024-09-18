import { useState, useEffect } from "react";

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    // Listen for the 'beforeinstallprompt' event
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Store the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install button
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        // Reset the deferred prompt variable
        setDeferredPrompt(null);
        // Hide the install button
        setShowInstallButton(false);
      });
    }
  };

  if (!showInstallButton) {
    return null;
  }

  return (
    <div className="flex flex-col items-end mt-[75px]">
      <p className="font-bold mb-4">Install App</p>
      <button
        onClick={handleInstallClick}
        type="button"
        className="text-white text-[12px] md:text-sm text-center font-semibold"
      >
        Click here to Add App to Home Screen
      </button>
    </div>
  );
}
