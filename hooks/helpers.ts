import { useEffect, useRef } from "react";
import Router from "next/router";

export const useFirstRender = (): boolean => {
  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return firstRender.current;
};

export const useRouteLeavingCheck = (confirmText: string): void => {
  useEffect(() => {
    const handleWindowClose = (e: BeforeUnloadEvent): string => {
      e.preventDefault();
      return (e.returnValue = confirmText);
    };
    const handleBrowseAway = (): void => {
      if (window.confirm(confirmText)) return;
      Router.events.emit("routeChangeError");
      throw "Route change aborted.";
    };
    window.addEventListener("beforeunload", handleWindowClose);
    Router.events.on("routeChangeStart", handleBrowseAway);
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      Router.events.off("routeChangeStart", handleBrowseAway);
    };
  }, []);
};
