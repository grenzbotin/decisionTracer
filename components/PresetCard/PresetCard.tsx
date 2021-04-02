import React from "react";
import Link from "next/link";
import i18next from "i18next";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { Preset } from "@/../lib/presets";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  makeStyles,
  Typography
} from "@material-ui/core";
import CustomIcon from "@/../assets/CustomIcon";
import { PRIMARY } from "../theme";

const useStyles = makeStyles({
  root: {
    cursor: "pointer"
  },
  avatar: {
    backgroundColor: PRIMARY
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
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
        <CardMedia className={classes.media} image={`./images/${preset.image}.jpg`} title={i18next.t(preset.title)} />
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
