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
import { PRIMARY } from "../../theme";

const useStyles = makeStyles({
  root: {
    cursor: "pointer"
  },
  avatar: {
    backgroundColor: PRIMARY
  },
  media: {
    height: "200px"
    // width: "100%"
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
  const lang = i18next.language === "de" ? "de" : "en";
  // eslint-disable-next-line max-len
  const multipleSizes = require(`../../../assets/images/${preset.image}.jpg?resize&sizes[]=400&sizes[]=500&sizes[]=600`);

  return (
    <article itemScope itemType="https://schema.org/CreativeWork">
      <meta itemProp="url" content={`/${lang}/${preset.url}`} />
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
            title={
              <Typography itemProp="headline" variant="body2" component="h3">
                {i18next.t(preset.title)}
              </Typography>
            }
          />
          <CardMedia
            component="img"
            itemProp="thumbnailUrl"
            srcSet={multipleSizes.srcSet}
            src={multipleSizes.src}
            className={classes.media}
            title={i18next.t(preset.title)}
          />
          <CardContent className={classes.content}>
            <div>
              <Typography itemProp="alternativeHeadline" variant="body2" component="h4">
                {i18next.t(preset.question)}
              </Typography>
              <Typography itemProp="abstract" variant="caption" color="textSecondary" component="p">
                {i18next.t(preset.description)}
              </Typography>
            </div>
            <IconButton color="primary" aria-label="go to preset">
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </CardContent>
        </Card>
      </Link>
    </article>
  );
}
