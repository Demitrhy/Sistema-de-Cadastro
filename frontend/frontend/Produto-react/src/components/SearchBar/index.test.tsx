import React, { useState } from 'react';
import { Button, Tooltip, message } from 'antd';
import { InputSearchBar, BadgeSelectedFilter } from './styles'
import { CloseOutlined, FilterOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';

interface SearchBarProps {
  selectedFilter: number;
  changeFilter: React.Dispatch<React.SetStateAction<boolean>>; 
  clearFilter: React.Dispatch<React.SetStateAction<boolean>>;
  placeholder?: string; 
  tooltipSuffix?: string; 
  tooltipPreffix?: string;
  searchItems: (search: any) => void; 
}

const SearchBar: React.FC<SearchBarProps> = ({
  selectedFilter,changeFilter,clearFilter,placeholder,tooltipSuffix,tooltipPreffix, searchItems
}) => {

  const intl = useIntl();
  const [input, setInput] = useState(""); 

  const resetFilter = async () => {
    await setInput("");
    await clearFilter(true);
    await message.info(`${intl.formatMessage({ id: 'searchbar.message.clearFilter'})}`)

  }

  return (
    <>
      <InputSearchBar 
        data-testid="search-input"
        onPressEnter={(e: any) => searchItems(e.target.value)} 
        placeholder={`${placeholder || intl.formatMessage({ id: 'searchbar.placeholder'})}`}
        value={input}
        onChange={(e: any) => setInput(e.target.value)} 
        prefix={
            <Tooltip title={`${tooltipPreffix || intl.formatMessage({ id: 'searchbar.tooltip.preffix'})}`}>
              <BadgeSelectedFilter count={selectedFilter || 0}>
                <Button 
                data-testid="preffix-button" 
                type="primary" 
                onClick={() => changeFilter(true)} 
                icon={<FilterOutlined />} 
                size="large" 
                />
              </BadgeSelectedFilter>
            </Tooltip>
          }
        suffix={
            <Tooltip title={`${tooltipSuffix || intl.formatMessage({ id: 'searchbar.tooltip.suffix'})}`}>
              <Button 
              data-testid="suffix-button" 
              onClick={() => resetFilter()} 
              type="default" 
              icon={<CloseOutlined />} 
              size="large" 
              />
            </Tooltip>
          }
        />
    </>
  );
}

export default SearchBar;