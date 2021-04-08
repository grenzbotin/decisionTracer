import React, { useEffect, useRef, useState } from "react";
import { FormControl, Input, InputAdornment } from "@material-ui/core";

import { toLocale } from "@/../lib/helpers";

function regex(value: string): boolean {
  return /^[+]?\d+([.,]\d+)?$/.test(value);
}

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
  disabled?: boolean;
}

const ValidatedProbabilityField: React.FC<Props> = ({ onChange, value, disabled = false }) => {
  const prevValue = usePrevious(value);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const ref = useRef(null);
  const [localValue, setLocalValue] = useState<number | string>(value);
  const [error, setError] = useState(false);

  // Take over new value from global state
  useEffect(() => {
    if (prevValue !== value) {
      setLocalValue(value);
      setError(false);
    }
  }, [value, prevValue]);

  const handleProbabiltyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const probability = e.target.value;
    setLocalValue(probability);

    // set error if value is empty, float number regex not matching or value bigger than 100
    // if valid, set probability in global state
    if (probability === "" || !regex(probability) || parseFloat(probability.replace(",", ".")) > 100) {
      setError(true);
    } else {
      setError(false);
      onChange(parseFloat(probability.replace(",", ".")));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter" && ((ref || {}).current || {}).firstChild) {
      ref.current.firstChild.blur();
    }
  };

  return (
    <FormControl disabled={disabled} size="small" style={{ maxWidth: "75px" }}>
      <Input
        ref={ref}
        error={error}
        value={isFocus ? localValue : toLocale(localValue)}
        onChange={handleProbabiltyChange}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        endAdornment={
          <InputAdornment disableTypography position="end" style={{ fontSize: "0.8rem" }}>
            %
          </InputAdornment>
        }
        inputProps={{
          inputMode: "decimal",
          style: {
            fontSize: ".8rem"
          }
        }}
      />
    </FormControl>
  );
};

export default ValidatedProbabilityField;
