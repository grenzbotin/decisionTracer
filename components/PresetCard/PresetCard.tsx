import React from "react";
import Image from "next/image";
import Link from "next/link";
import i18next from "i18next";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { Preset } from "@/../lib/presets";
import { Avatar, Card, CardContent, CardHeader, IconButton, makeStyles, Typography } from "@material-ui/core";
import CustomIcon from "@/../assets/CustomIcon";
import { PRIMARY } from "../theme";

const useStyles = makeStyles({
  root: {
    cursor: "pointer"
  },
  avatar: {
    backgroundColor: PRIMARY
  },
  imageContainer: {
    width: "100%",
    maxHeight: "200px",
    "& > div": {
      position: "unset !important"
    }
  },
  image: {
    objectFit: "contain",
    width: "100% !important",
    // @ts-expect-error: position
    position: "relative !important",
    height: "unset !important"
  },
  content: {
    "&.MuiCardContent-root:last-child": {
      padding: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }
});

export default function PresetCard({ preset }: { preset: Preset }): JSX.Element {
  const classes = useStyles();

  return (
    <Link
      href={{
        pathname: `/[lang]/${preset.url}`,
        query: { lang: i18next.language }
      }}
    >
      <Card className={classes.root} variant="outlined">
        <CardHeader
          avatar={
            <Avatar aria-label={i18next.t(preset.title)} className={classes.avatar}>
              <CustomIcon name={preset.icon} />
            </Avatar>
          }
          title={i18next.t(preset.title)}
        />

        <div className={classes.imageContainer}>
          <Image src="/assets/images/virus.jpg" layout="fill" className={classes.image} />
        </div>
        <CardContent className={classes.content}>
          <div>
            <Typography variant="body2" component="p">
              {i18next.t(preset.question)}
            </Typography>
            <Typography variant="caption" color="textSecondary" component="p">
              {i18next.t(preset.description)}
            </Typography>
          </div>
          <IconButton color="primary" aria-label="go to preset">
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </CardContent>
      </Card>
    </Link>
  );
}
