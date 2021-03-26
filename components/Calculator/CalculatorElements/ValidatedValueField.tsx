import React, { useEffect, useRef, useState } from "react";
import { FormControl, Input } from "@material-ui/core";

function regex(value: string): boolean {
  return /^[+-]?\d+(\d+)?$/.test(value);
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

const ValidatedValueField: React.FC<Props> = ({ onChange, value }) => {
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

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    // set error if value is empty, float number regex not matching
    // if valid, set probability in global state
    if (newValue === "" || !regex(newValue)) {
      setError(true);
    } else {
      setError(false);
      onChange(parseFloat(newValue));
    }
  };

  return (
    <FormControl size="small" style={{ maxWidth: "75px" }}>
      <Input
        error={error}
        value={localValue}
        onChange={handleValueChange}
        inputProps={{
          style: {
            fontSize: ".8rem"
          }
        }}
      />
    </FormControl>
  );
};

export default ValidatedValueField;