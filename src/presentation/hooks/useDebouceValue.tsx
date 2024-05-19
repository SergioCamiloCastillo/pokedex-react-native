import React, {useEffect, useState} from 'react';
interface Props {
  input: string;
  time?: number;
}
export const useDebouceValue = ({input, time = 500}: Props) => {
  const [debounceValue, setDebounceValue] = useState(input);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceValue(input);
    }, time);
    return () => {
      clearTimeout(timeOut);
    };
  }, [input]);

  return debounceValue;
};
