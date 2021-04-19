import React, { useEffect, useRef, useState } from "react";
import { FormControl, OutlinedInput, FormHelperText } from "@material-ui/core";

import { toLocale } from "../../lib/helpers";

function regex(value: string): boolean {
  return /^[+]?\d+(\d+)?$/.test(value);
}

function regexNegative(value: string): boolean {
  return /^[-]\d+(\d+)?$/.test(value);
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
  label?: string;
  onlyNegative?: boolean;
  disabled?: boolean;
}

const ValidatedInputField: React.FC<Props> = ({ onChange, value, label, disabled = false, onlyNegative = false }) => {
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

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    const validate = onlyNegative ? regexNegative : regex;

    // set error if value is empty, float number regex not matching
    // if valid, set probability in global state
    if (newValue === "" || !validate(newValue)) {
      setError(true);
    } else {
      setError(false);
      onChange(parseFloat(newValue.replace(",", ".")));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter" && ((ref || {}).current || {}).firstChild) {
      ref.current.firstChild.blur();
    }
  };

  return (
    <FormControl disabled={disabled} variant="outlined" size="small" style={{ maxWidth: "100px" }}>
      <OutlinedInput
        ref={ref}
        error={error}
        value={isFocus ? localValue : toLocale(localValue)}
        onChange={handleValueChange}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        inputProps={{
          inputMode: "numeric",
          style: {
            fontSize: ".8rem"
          }
        }}
      />
      {label && <FormHelperText id={`text-label-${label}`}>{label}</FormHelperText>}
    </FormControl>
  );
};

export default ValidatedInputField;
