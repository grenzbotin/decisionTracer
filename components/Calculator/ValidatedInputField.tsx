import React, { useContext, useEffect, useRef, useState } from "react";
import { FormControl, Input, InputAdornment, InputLabel } from "@material-ui/core";
import { GlobalDecisionContext } from "../../hooks/GlobalDecisionsContextProvider";

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
  itemKey: string;
  decisionKey: string;
  value: number;
}

const ValidatedInputField: React.FC<Props> = ({ itemKey, decisionKey, value }) => {
  const { setProbability } = useContext(GlobalDecisionContext);
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
      setProbability(parseFloat(probability), decisionKey, itemKey);
    }
  };

  return (
    <FormControl size="small">
      <InputLabel htmlFor="Probability">Probability</InputLabel>
      <Input
        id={`probability-${decisionKey}-${itemKey}`}
        error={error}
        value={localValue}
        onChange={handleProbabiltyChange}
        endAdornment={<InputAdornment position="end">%</InputAdornment>}
      />
    </FormControl>
  );
};

export default ValidatedInputField;
