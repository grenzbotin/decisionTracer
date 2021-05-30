import { useEffect } from "react";
import { useRouter } from "next/router";
import { init, trackPages } from "insights-js";
import i18next from "i18next";

export default function Home(): void {
  const router = useRouter();

  useEffect(() => {
    const { pathname } = router;
    if (pathname == "/") {
      router.push("/" + i18next.language.substring(0, 2));
    }

    // only track page events if on production
    if (process.env.NEXT_PUBLIC_ENV === "production") {
      init("jrhvGLx1oC_dtZEN");
      trackPages();
    }
  });

  return null;
}
