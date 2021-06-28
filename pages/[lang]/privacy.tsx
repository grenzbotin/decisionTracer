import React from "react";
import i18next from "i18next";
import dynamic from "next/dynamic";
import { makeStyles, Typography } from "@material-ui/core";
import Obfuscate from "react-obfuscate";

import { getAllLanguageSlugs, getLanguage } from "../../lib/lang";
import { PRIMARY } from "@/../components/theme";
const HtmlHeader = dynamic(() => import("../../components/HtmlHeader"));

const useStyles = makeStyles({
  link: {
    "& > a": {
      color: "inherit",
      textDecoration: "none",
      paddingLeft: "0.2rem",
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
        title={i18next.t("privacy.meta.title")}
        description={i18next.t("privacy.meta.description")}
      />
      <Typography variant="h4" gutterBottom>
        {i18next.t("privacy.title")}
      </Typography>
      <Typography gutterBottom variant="subtitle2" style={{ marginTop: "1rem" }}>
        {i18next.t("privacy.basic_title")}
      </Typography>
      <Typography gutterBottom variant="body2">
        {i18next.t("privacy.basic_text")}
      </Typography>
      <Typography gutterBottom variant="subtitle2" style={{ marginTop: "1rem" }}>
        {i18next.t("privacy.hosting_title")}
      </Typography>
      <Typography gutterBottom variant="body2" className={classes.link}>
        {i18next.t("privacy.hosting_text")}
        <a
          href="https://help.github.com/en/github/site-policy/global-privacy-practices"
          target="_blank"
          rel="noreferrer"
        >
          https://help.github.com/en/github/site-policy/global-privacy-practices
        </a>
      </Typography>
      <Typography gutterBottom variant="subtitle2" style={{ marginTop: "1rem" }}>
        {i18next.t("privacy.access_title")}
      </Typography>
      <Typography gutterBottom variant="body2" className={classes.link}>
        {i18next.t("privacy.access_text")}
        <a href="https://getinsights.io/what-data-we-collect" target="_blank" rel="noreferrer">
          https://getinsights.io/what-data-we-collect
        </a>
      </Typography>
      <Typography gutterBottom variant="subtitle2" style={{ marginTop: "1rem" }}>
        {i18next.t("privacy.contact_data_title")}
      </Typography>
      <Typography gutterBottom variant="body2">
        {i18next.t("privacy.contact_data_text")}
      </Typography>
      <Typography gutterBottom variant="subtitle2" style={{ marginTop: "1rem" }}>
        {i18next.t("privacy.user_rights_title")}
      </Typography>
      <Typography gutterBottom variant="body2">
        {i18next.t("privacy.user_rights_text")}
      </Typography>
      <Typography gutterBottom variant="subtitle2" style={{ marginTop: "1rem" }}>
        {i18next.t("privacy.user_data_delete_title")}
      </Typography>
      <Typography gutterBottom variant="body2">
        {i18next.t("privacy.user_data_delete_text")}
      </Typography>
      <Typography gutterBottom variant="subtitle2" style={{ marginTop: "1rem" }}>
        {i18next.t("privacy.user_objection_right_title")}
      </Typography>
      <Typography gutterBottom variant="body2" className={classes.link}>
        {i18next.t("privacy.user_objection_right_text")}
        <Obfuscate email={`${process.env.NEXT_PUBLIC_DISCLOSURE_PROVIDER_EMAIL.replace("_", " ")}`} />
      </Typography>
      <Typography gutterBottom variant="subtitle2" style={{ marginTop: "1rem" }}>
        {i18next.t("privacy.3rd_party_title")}
      </Typography>
      <Typography gutterBottom variant="body2" className={classes.link}>
        {i18next.t("privacy.3rd_party_text_youtube")}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
          https://policies.google.com/privacy
        </a>
      </Typography>
      <Typography gutterBottom variant="body2" className={classes.link}>
        {i18next.t("privacy.3rd_party_text_fonts")}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
          https://policies.google.com/privacy
        </a>
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
