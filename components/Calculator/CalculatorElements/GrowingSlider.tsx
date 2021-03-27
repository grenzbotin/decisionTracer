import React, { useEffect, useRef, useState } from "react";
import { Box, Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import SentimentDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentDissatisfiedOutlined";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";

import { SECONDARY, PRIMARY } from "../../theme";

function usePrevious(value: number): number {
  const ref = useRef<number>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

interface Props {
  onChange: (_value: number) => void;
  value: number;
}

const CustomSlider = withStyles({
  rail: {
    opacity: 0.7,
    backgroundImage: `linear-gradient(90deg, ${SECONDARY} 0%, rgba(191,199,0,1) 50%, ${PRIMARY} 100%)`
  },
  track: {
    color: "transparent",
    backgroundImage: "transparent"
  }
})(Slider);

const GROW_LEVEL = 100;
const MULTIPLIER = 0.05;
const THRESHOLD = 0.3;

const GrowingSlider: React.FC<Props> = ({ value, onChange }) => {
  const prevValue = usePrevious(value);
  const [minMax, setMinMax] = useState<{ min: number; max: number }>({
    min: -1000,
    max: 1000
  });
  const [localValue, setLocalValue] = useState(value);

  // Local handling of max/min
  const handleChange = (value: number | number[]): void => {
    if (typeof value === "number") {
      setLocalValue(value);
      if (value <= (minMax.min < 0 ? minMax.min + -THRESHOLD * minMax.min : minMax.min + THRESHOLD * minMax.min)) {
        setMinMax({
          max: minMax.max < 0 ? minMax.max + -MULTIPLIER * GROW_LEVEL : minMax.max - MULTIPLIER * GROW_LEVEL,
          min: minMax.min - MULTIPLIER * GROW_LEVEL
        });
      }
      if (value >= (minMax.max > 0 ? minMax.max + -THRESHOLD * minMax.max : minMax.max + THRESHOLD * minMax.max)) {
        setMinMax({
          max: minMax.max + MULTIPLIER * GROW_LEVEL,
          min: minMax.min + MULTIPLIER * GROW_LEVEL
        });
      }
    }
  };

  // Take over new value from global state
  useEffect(() => {
    if (prevValue !== value) {
      if (value <= minMax.min) {
        setMinMax({ max: value + 2000, min: value });
      }
      if (value >= minMax.max) {
        setMinMax({ max: value, min: value - 2000 });
      }
      setLocalValue(value);
    }
  }, [value, prevValue, minMax.max, minMax.min]);

  // Push to global state on commit
  const handleChangeCommit = (value: number | number[]): void => {
    if (typeof value === "number") {
      setLocalValue(value);
      onChange(value);
    }
  };

  return (
    <Box style={{ display: "flex", alignItems: "center" }}>
      <SentimentDissatisfiedOutlinedIcon style={{ color: SECONDARY, marginRight: ".2rem" }} />
      <CustomSlider
        value={localValue}
        aria-labelledby="value"
        min={minMax.min}
        max={minMax.max}
        step={10}
        style={{ color: "rgb(94, 94, 94)" }}
        valueLabelDisplay="auto"
        onChange={(_e, value) => handleChange(value)}
        onChangeCommitted={(_e, value) => handleChangeCommit(value)}
      />
      <SentimentSatisfiedOutlinedIcon style={{ color: PRIMARY, marginLeft: ".2rem" }} />
    </Box>
  );
};

export default GrowingSlider;
