import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import i18next from "i18next";
import { IconButton } from "@material-ui/core";
import CustomIcon from "../assets/CustomIcon";

const LanguageToggle: React.FC = () => {
  const { pathname } = useRouter();
  const isGerman = i18next.language === "de";
  const switchTo = isGerman ? "en" : "de";

  return (
    <Link
      href={{
        pathname: pathname,
        query: { lang: isGerman ? "en" : "de" }
      }}
      locale={switchTo}
      key={switchTo}
    >
      <IconButton>
        <CustomIcon fontSize="small" name={isGerman ? "de" : "en"} />
      </IconButton>
    </Link>
  );
};

export default LanguageToggle;
