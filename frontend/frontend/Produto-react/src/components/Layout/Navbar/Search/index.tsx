import React, { useState, useEffect } from 'react';
import { AutoComplete, Spin, Tooltip, Input } from 'antd';
import useDebounce from '../../../../hooks/useDebounce';
import paths from '../../../../router/paths';
import { useHistory } from "react-router-dom";
import { SelectProps } from 'antd/es/select';

const onSearch = (search: string) => {
  let data: { value: any; label: any; }[] = []
  paths.filter((i: any) => 
    i.searchable 
    && i.title.toUpperCase().includes(search.toUpperCase()) && data.push({ 
    value: i.path, 
    label: `${i.title}`,
    
  }));

  return data;
};

const InputSearch: React.FC = () => {
  const history = useHistory();

  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<SelectProps<object>['options']>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearch = useDebounce(searchValue, 400);

  useEffect(
    () => {
      if (debouncedSearch) {
        setIsSearching(true);
        setResults(debouncedSearch ? onSearch(debouncedSearch) : []);
        setIsSearching(false);    
      }
    },
    [debouncedSearch]
  );


const onSelect = (value: any) => {
  setSearchValue('');
  setResults([]);
  history.push(value)
}

  return (
    <>
      <Tooltip placement="right" title="Pesquisar Funcionalidade">
        <AutoComplete 
          className="certain-category-search"
          dropdownClassName="certain-category-search-dropdown"
          filterOption={false}
          dropdownStyle={{ width: 100 }}
          size="small"
          style={{ width: '100%', marginTop: '10px', marginBottom: '5px' }}
          onSearch={setSearchValue}
          onSelect={onSelect}
          options={results}
          value={searchValue}
          notFoundContent={isSearching ? <Spin size="small" /> : null}
        >          
        <Input.Search size="small" placeholder="Pesquisar Funcionalidade" enterButton />               
        </AutoComplete>
      </Tooltip>
    </>
  );
}

export default InputSearch;


