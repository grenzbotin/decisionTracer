import React from "react";
import Slider from "@material-ui/core/Slider";

const zip = (
  ...arrays: Array<Array<{ value: number; label?: string | number }>>
): Array<{ value: number; label?: string | number }[]> =>
  [...new Array(Math.max(...arrays.map((a) => a.length)))].map((_, i) => i).map((i) => arrays.map((a) => a[i]));

const createRange = ([fromMin, fromMax]: Array<number>, [toMin, toMax]: Array<number>): ((val: number) => number) => {
  const fromRange = fromMax - fromMin;
  const toRange = toMax - toMin;

  return (fromValue: number) => ((fromValue - fromMin) / fromRange) * toRange + toMin;
};

const createScale = (
  min: number,
  max: number,
  marks: Array<{ value: number; label?: string | number }>
): Array<(val: number) => number> => {
  const zippedMarks = zip([undefined].concat(marks), marks);
  const zone = (max - min) / (marks.length - 1);
  const zones = marks.map((_, i) => [i * zone + min, (i + 1) * zone + min]);

  const ranges: Array<Array<number[] | ((val: number) => number)>> = zippedMarks
    .filter(([a, b]) => a !== undefined && b !== undefined)
    .map(([a, b], i) => [
      createRange(zones[i], [a.value, b.value]),
      zones[i],
      createRange([a.value, b.value], zones[i]),
      [a.value, b.value]
    ]);

  const sliderValToScaled = (sliderVal: number): number => {
    const desiredRanges: Array<number[] | ((val: number) => number)> = ranges.find(
      ([, x]) => sliderVal >= x[0] && sliderVal <= x[1]
    );

    return typeof desiredRanges[0] === "function" && desiredRanges[0](sliderVal);
  };

  const scaledValToSlider = (scaledVal: number): number => {
    const desiredRanges: Array<number[] | ((val: number) => number)> = ranges.find(
      ([, , , x]) => scaledVal >= x[0] && scaledVal <= x[1]
    );

    return typeof desiredRanges[2] === "function" && desiredRanges[2](scaledVal);
  };

  return [sliderValToScaled, scaledValToSlider];
};

interface Props {
  marks: Array<{ value: number; label?: string | number }>;
  steps: number;
  onChange: (_value: number) => void;
  value: number;
  numFormatter: (val: number) => number;
  style: { color: string };
}

const NonLinearSlider: React.FC<Props> = ({
  marks = [{ value: 0 }, { value: 1 }],
  steps = 200,
  onChange = (x: number) => x,
  value = 0,
  numFormatter,
  style
}) => {
  const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number | number[]): void => {
    event.stopPropagation();
    if (typeof newValue === "number") {
      onChange(parseFloat(scale(newValue).toFixed(7)));
    }
  };

  const [scale, unscale] = React.useMemo(() => createScale(0, 1, marks), [marks]);

  const followersMarks = marks
    .filter((mark) => mark.label)
    .map((mark) => ({
      ...mark,
      value: unscale(mark.value)
    }));

  return (
    <Slider
      value={unscale(value)}
      min={0}
      step={1 / steps}
      max={1}
      valueLabelFormat={numFormatter}
      marks={followersMarks}
      scale={scale}
      style={style}
      onChange={handleChange}
      valueLabelDisplay="off"
      aria-labelledby="non-linear-slider"
    />
  );
};

export default NonLinearSlider;
