import React from "react";
import { Spin, Select as SelectAntd } from "antd";
import { SelectSearchableProps } from "./index.d";
import useSelectComponent from "./useSelectComponent";

const Select: React.FC<SelectSearchableProps> = ({
  endpoint,
  placeholder,
  onSelected,
  disabled,
  mode,
  autoFocus,
}) => {
  const handle = useSelectComponent(endpoint, onSelected, mode);
  return (
    <>
      <SelectAntd
        mode="multiple"
        allowClear={handle.multiSelected}
        labelInValue
        value={handle.tag}
        placeholder={placeholder}
        disabled={disabled}
        notFoundContent={handle.isSearching ? <Spin size="small" /> : null}
        filterOption={false}
        autoFocus={autoFocus}
        onSearch={handle.setSearchValue}
        onSelect={(e) => handle.handleChange(e, "onSelect")}
        onChange={(e) => handle.handleChange(e, "onChange")}
        style={{ width: "100%" }}
        autoClearSearchValue
      >
        {handle.results.map((d: { value: any; text: React.ReactNode }) => (
          <SelectAntd.Option key={d.value} value={d.value}>
            {d.text}
          </SelectAntd.Option>
        ))}
      </SelectAntd>
    </>
  );
};

export default Select;
