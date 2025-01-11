import React from 'react';
import { useState, useEffect } from 'react';
import { Collapse, AutoComplete, Row, Tag, Spin, Badge } from 'antd';
import useDebounce from '../../hooks/useDebounce';
import { CustomCollapse } from './styles';
import api from '../../services';
import { SelectValue } from 'antd/lib/select';


const { Panel } = Collapse;
const { Option } = AutoComplete;

interface InputSearchCollapsedType {
  tag: any;
  filter: any;
  handleClose: any;
  onSelect: ((value: SelectValue, option: Object) => any) | undefined;
  placeholder: string;
  header: string;
  clearFilter?: boolean;
  endpoint: string;

}

const InputSearchCollapsed: React.FC<InputSearchCollapsedType> = (props: InputSearchCollapsedType) => {
/*
  useEffect(
    () => {
      if (1 == 1) {
        console.log('props.tag');
        console.log(props.tag);
      }
    },
    [props.tag]
  );*/


  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(
    () => {
      if (debouncedSearch) {
        setIsSearching(true);
        searchCharacters(debouncedSearch, props.endpoint, props.header).then(results => {
          setIsSearching(false);
          setResults(results);
        });
      } else {
        setResults([]);
      }
    },
    [debouncedSearch, props.endpoint, props.header]
  );


  const searchCharacters = async (search: any, endpoint: string, tipo: string) => {
    const res = await api.get(
      `${endpoint}${search}`
    ).catch(error => {
      return {
        success: false,
        data: []
      }
    });

    if (tipo != 'SubClassificação') {
      const data = res.data.map((res: { codigo: number; nome: string; }) => ({
        text: `${res.codigo} - ${res.nome}`,
        value:
          res.codigo.toString().concat(" ## ", res.nome, " ## ", tipo),
      }));
      let _selecionarTodos = data.map((i: any) => i.value).join("||")
      data.length > 1 && data.unshift({ text: "SELECIONAR TODOS", value: _selecionarTodos })
      return data;
    } else {
      const data = res.data.map((res: { codigo: number; descricao: string; }) => ({
        text: `${res.codigo} - ${res.descricao}`,
        value:
          res.codigo.toString().concat(" ## ", res.descricao, " ## ", tipo),
      }));
      let _selecionarTodos = data.map((i: any) => i.value).join("||")
      data.length > 1 && data.unshift({ text: "SELECIONAR TODOS", value: _selecionarTodos })
      return data;
    }

  }


  const handleChange = () => {
    setIsSearching(false);
    setSearchValue('')
  };

  const children = results.map((d: { value: any; text: React.ReactNode; }) => (
    <Option key={d.value} value={d.value} >{d.text}</Option>
  ));

  const countFilter = () => (<Badge count={props.filter} />);

  return (
    <CustomCollapse>
      <Panel header={props.header} key="1" extra={countFilter()}>
        <Row>
          <div>

            <AutoComplete
              className="certain-category-search"
              dropdownClassName="certain-category-search-dropdown"
              filterOption={false}
              value={searchValue}
              dropdownStyle={{ width: 200 }}
              size="small"
              style={{ width: '285px', marginTop: '10px', marginBottom: '5px' }}
              onSearch={setSearchValue}
              notFoundContent={isSearching ? <Spin size="small" /> : null}
              onSelect={props.onSelect}
              onChange={handleChange}
              placeholder={props.placeholder}
            >
              {children}
            </AutoComplete>
            <div>
              {props.tag.map((i: { id: React.ReactNode; }, index: string | number | undefined) =>
                <Tag
                  key={index}
                  style={{ marginBottom: '5px' }}
                  color="#0054A5"
                  closable
                  onClose={(e: { preventDefault: () => void; }) => {
                    e.preventDefault();
                    props.handleClose(i.id);
                  }}
                >
                  {i.id}
                </Tag>)}
            </div>
          </div>
        </Row>
      </Panel>
    </CustomCollapse>
  );

}

export default InputSearchCollapsed;
