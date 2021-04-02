import React, { useEffect, useRef, useState } from "react";
import { FormControl, Input, InputAdornment } from "@material-ui/core";

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
}

const ValidatedProbabilityField: React.FC<Props> = ({ onChange, value }) => {
  const prevValue = usePrevious(value);
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

  return (
    <FormControl size="small" style={{ maxWidth: "75px" }}>
      <Input
        error={error}
        value={localValue}
        onChange={handleProbabiltyChange}
        endAdornment={
          <InputAdornment disableTypography position="end" style={{ fontSize: "0.8rem" }}>
            %
          </InputAdornment>
        }
        inputProps={{
          style: {
            fontSize: ".8rem"
          }
        }}
      />
    </FormControl>
  );
};

export default ValidatedProbabilityField;
