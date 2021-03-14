import React, { useContext, useEffect, useState } from "react";
import { Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { GlobalDecisionContext } from "../../hooks/GlobalDecisionsContextProvider";

interface Props {
  itemKey: number;
  decisionKey: number;
  value: number;
  style: { color: string };
}

const CustomSlider = withStyles({
  rail: {
    opacity: 0.7,
    backgroundImage:
      "linear-gradient(90deg, rgba(208,0,0,1) 0%, rgba(191,199,0,1) 50%, rgba(128,255,53,1) 100%)",
  },
  track: {
    color: "transparent",
    backgroundImage: "transparent",
  },
})(Slider);

const DESIRED_MIN_DIFFERENCE = 2000;
const GROW_LEVEL = 100;

const GrowingSlider: React.FC<Props> = ({
  itemKey,
  decisionKey,
  value,
  style,
}) => {
  const { setValueChange } = useContext(GlobalDecisionContext);
  const [minMax, setMinMax] = useState<{ min: number; max: number }>({
    min: -1000,
    max: 1000,
  });

  useEffect(() => {
    if (value <= minMax.min + -0.1 * minMax.min) {
      setMinMax({ ...minMax, min: minMax.min - GROW_LEVEL });
    }
    if (value >= minMax.max + -0.1 * minMax.max) {
      setMinMax({ ...minMax, max: minMax.max + GROW_LEVEL });
    }

    if (
      value > minMax.min + -0.5 * minMax.min &&
      minMax.max - minMax.min + GROW_LEVEL > DESIRED_MIN_DIFFERENCE &&
      minMax.min + GROW_LEVEL <= 0
    ) {
      setMinMax({ ...minMax, min: minMax.min + GROW_LEVEL });
    }

    if (
      value < minMax.max + -0.5 * minMax.max &&
      minMax.max - GROW_LEVEL - minMax.min > DESIRED_MIN_DIFFERENCE &&
      minMax.max - GROW_LEVEL >= 0
    ) {
      setMinMax({ ...minMax, max: minMax.max - GROW_LEVEL });
    }
  }, [value, minMax]);

  return (
    <CustomSlider
      id={`value-${decisionKey}-${itemKey}`}
      value={value}
      aria-labelledby="value"
      min={minMax.min}
      max={minMax.max}
      step={10}
      style={style}
      valueLabelDisplay="auto"
      onChange={(_e, value) => setValueChange(decisionKey, itemKey, value)}
    />
  );
};

export default GrowingSlider;
