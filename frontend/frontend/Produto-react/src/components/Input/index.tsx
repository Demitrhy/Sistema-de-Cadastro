import React, { useState, useEffect, ReactNode } from "react";
import { Input as InputAntd } from "antd";
import useDebounce from "../../hooks/useDebounce";
import { InputProps as InputPropsAntd } from "antd/lib/input";

interface InputProps extends InputPropsAntd{
  placeholder?: string;
  before?: ReactNode | string | Element;
  after?: ReactNode | string | Element;
  prefix?: ReactNode | string | Element;
  suffix?: ReactNode | string | Element;
  defaultValue?: string | number;
  type?: "text" | "integer" | "decimal";
  min?: number;
  max?: number;
  maxLength?: number;
  onChange: (value: any) => void;
  clear?: boolean;
  value?: any;
  disabled?: boolean;
  name?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  before,
  after,
  prefix,
  suffix,
  defaultValue,
  type,
  min,
  max,
  maxLength,
  onChange,
  clear,
  value,
  disabled,
  name,
  allowClear,
}) => {
  const paramsDefault = {
    min: (min && min) || 0,
    max: (max && max) || 999999999999,
    type: (type && type !== "text" && "number") || "text",
    maxLength: (maxLength && maxLength) || 20,
    clear: (clear && clear) || false,
    defaultValue: (defaultValue && defaultValue) || "",
  };

  const [input, setInput] = useState(paramsDefault.defaultValue);
  const debouncedInput = useDebounce(input, 500);

  useEffect(() => {
    switch (type || paramsDefault.type) {
      case "text":
        onChange(input.toString());
        break;
      case "decimal":
        input ? onChange(parseFloat(input.toString())) : onChange(0);
        break;
      case "integer":
        input ? onChange(parseInt(input.toString())) : onChange(0);
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput]);

  useEffect(() => {
    clear && setInput(paramsDefault.defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clear]);

  useEffect(() => {
    value && setInput(value);
    return () => setInput(paramsDefault.defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const InputChange = (e: any) => {
    if (e.target.value !== "" || input.toString().length === 1) {
      let _value;
      switch (true) {
        case type === "integer":
          _value = e.target.value
            ? e.target.value
                .toString()
                .substring(0, paramsDefault.max.toString().length) >=
              paramsDefault.max
              ? paramsDefault.max
              : e.target.value
                  .toString()
                  .substring(0, paramsDefault.max.toString().length) <=
                paramsDefault.min
              ? paramsDefault.min
              : e.target.value
                  .toString()
                  .substring(0, paramsDefault.max.toString().length)
            : "";
          _value =
            BigInt(_value).toString() === "0" ? "" : BigInt(_value).toString();
          setInput(_value);
          break;
        case type === "decimal":
          _value = e.target.value
            ? e.target.value
                .toString()
                .substring(0, paramsDefault.maxLength + 2) >= paramsDefault.max
              ? paramsDefault.max.toString()
              : e.target.value
                  .toString()
                  .substring(0, paramsDefault.maxLength + 2) <=
                paramsDefault.min
              ? paramsDefault.min.toString()
              : e.target.value
                  .toString()
                  .substring(0, paramsDefault.maxLength + 2)
            : "";
          _value = _value.toString().includes(".")
            ? setInput(_value.toString().substring(0, _value.indexOf(".") + 3))
            : setInput(_value);
          break;
        case paramsDefault.type === "text":
          _value = e.target.value.toString();
          setInput(_value);
          break;
        default:
          break;
      }
    } else {
      setInput(paramsDefault.defaultValue);
    }
  };

  const handleOnKeyDown = (e: any) => {
    switch (true) {
      case type === "integer":
        (e.keyCode === 69 || e.key === "-" || e.key === "." || e.key === "+") &&
          e.preventDefault();
        break;
      case type === "decimal":
        (e.keyCode === 69 || e.key === "-" || e.key === "+") &&
          e.preventDefault();
        break;
      default:
        break;
    }
  };

  const handleOnBlur = (e: any) => {
    switch (true) {
      case type === "integer":
        e.target.value === 0 ? setInput("") : setInput(e.target.value);
        break;
      case type === "decimal":
        e.target.value === 0 ? setInput("") : setInput(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <InputAntd
        placeholder={placeholder}
        addonBefore={before}
        addonAfter={after}
        defaultValue={paramsDefault.defaultValue}
        type={paramsDefault.type}
        onChange={InputChange}
        min={paramsDefault.min}
        max={paramsDefault.max}
        maxLength={paramsDefault.maxLength}
        value={input}
        onKeyDown={(e) => handleOnKeyDown(e)}
        onBlur={(e) => handleOnBlur(e)}
        prefix={prefix && prefix}
        suffix={suffix && suffix}
        allowClear={allowClear}
        disabled={disabled}
        name={name && name}
      />
    </>
  );
};
export default Input;
