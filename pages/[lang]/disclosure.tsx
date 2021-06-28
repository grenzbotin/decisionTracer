import React from "react";
import i18next from "i18next";
import dynamic from "next/dynamic";
import Obfuscate from "react-obfuscate";
import { makeStyles, Typography } from "@material-ui/core";

import { getAllLanguageSlugs, getLanguage } from "../../lib/lang";
import { PRIMARY } from "@/../components/theme";
const HtmlHeader = dynamic(() => import("../../components/HtmlHeader"));

const useStyles = makeStyles({
  link: {
    "& > a": {
      color: "inherit",
      textDecoration: "none",
      padding: "0.5rem",
      "&:hover": {
        color: PRIMARY
      }
    }
  }
});

export default function Disclosure(): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <HtmlHeader
        noRobots
        title={i18next.t("disclosure.meta.title")}
        description={i18next.t("disclosure.meta.description")}
      />
      <Typography variant="h4" gutterBottom>
        {i18next.t("disclosure.title")}
      </Typography>
      <Typography gutterBottom variant="subtitle2">
        {i18next.t("disclosure.provider")}
      </Typography>
      <Typography variant="body2">{process.env.NEXT_PUBLIC_DISCLOSURE_PROVIDER_NAME.replace("_", " ")}</Typography>
      <Typography variant="body2">{process.env.NEXT_PUBLIC_DISCLOSURE_PROVIDER_ADDRESS_1.replace("_", " ")}</Typography>
      <Typography variant="body2">{process.env.NEXT_PUBLIC_DISCLOSURE_PROVIDER_ADDRESS_2.replace("_", " ")}</Typography>

      <Typography gutterBottom variant="subtitle2" style={{ marginTop: "1rem" }}>
        {i18next.t("disclosure.contact")}:
      </Typography>
      <Typography variant="body2" className={classes.link}>
        {i18next.t("disclosure.provider_phone")}:
        <Obfuscate tel={`${process.env.NEXT_PUBLIC_DISCLOSURE_PROVIDER_PHONE.replace("_", " ")}`} />
      </Typography>
      <Typography variant="body2" className={classes.link}>
        {i18next.t("disclosure.provider_email")}:
        <Obfuscate email={`${process.env.NEXT_PUBLIC_DISCLOSURE_PROVIDER_EMAIL.replace("_", " ")}`} />
      </Typography>
    </>
  );
}

interface StaticPathProps {
  paths: Array<{
    params: {
      lang: string;
    };
  }>;
  fallback: boolean;
}

export async function getStaticPaths(): Promise<StaticPathProps> {
  const paths = getAllLanguageSlugs();
  return {
    paths,
    fallback: false
  };
}

interface StaticProps {
  props: {
    language: string;
  };
}

interface Params {
  params: {
    lang: string;
  };
}

export async function getStaticProps({ params }: Params): Promise<StaticProps> {
  const language = getLanguage(params.lang);
  return {
    props: {
      language
    }
  };
}
