import React from "react";
import { makeStyles, Container, Divider } from "@material-ui/core";
import Link from "next/link";
import i18next from "i18next";
import { PRIMARY } from "./theme";

const useStyles = makeStyles({
  footer: {
    padding: "1rem 0",
    marginTop: "30px",
    marginBottom: "40px",
    bottom: 0,
    "& > div > a": {
      color: "inherit",
      textDecoration: "none",
      padding: "0.5rem",
      "&:hover": {
        color: PRIMARY
      }
    }
  }
});

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container disableGutters maxWidth="xl">
        <Divider style={{ marginBottom: "1rem" }} />
        <Link
          href={{
            pathname: `/[lang]/disclosure`,
            query: { lang: i18next.language }
          }}
        >
          {i18next.t("common.footer.disclosure")}
        </Link>
        <Link
          href={{
            pathname: `/[lang]/privacy`,
            query: { lang: i18next.language }
          }}
        >
          {i18next.t("common.footer.privacy")}
        </Link>
      </Container>
    </footer>
  );
};

export default Footer;
