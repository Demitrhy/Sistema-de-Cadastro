import { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import api from "../../services";
import { useIntl } from "react-intl";

export default function useSelectComponent(
  endpoint: any,
  onSelected: any,
  mode: any
) {
  const multiSelected = mode === "multiSelected" ? true : false;
  const multiSelectedDebounce = mode === "multiSelected" ? 0 : 800;
  const intl = useIntl();
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [tag, setTag] = useState<any>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearch = useDebounce(searchValue, 500);
  const debouncedSelected = useDebounce(tag, multiSelectedDebounce);

  useEffect(() => {
    onSelected(tag);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSelected]);
  useEffect(() => {
    if (debouncedSearch) {
      setIsSearching(true);
      searchCharacters(debouncedSearch, endpoint).then((results) => {
        setIsSearching(false);
        setResults(results);
      });
    } else {
      setResults([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const searchCharacters = async (search: any, endpoint: string) => {
    const res = await api.get(`${endpoint}${search}`).catch((error) => {
      return {
        success: false,
        data: [],
      };
    });

    const data = res.data.map((res: any) => ({
      text: `${res.id || res.codigo} - ${res.nome || res.descricao}`,
      value: res.codigo,
    }));
    let _selecionarTodos = data.map((i: any) => i.value);
    data.length > 1 &&
      mode === "multiSelected" &&
      data.unshift({ text: `${intl.formatMessage({ id: 'select.selectAll'})}`, value: _selecionarTodos });
    return data;
  };

  const handleOneSelected = (value: any) => { 
    setTag([]);
    setSearchValue("");
    setIsSearching(false);
    setTimeout(() => {
      setTag(value);
    }, 600);
  };

  const handleMultiSelected = (value: any) => {
    setIsSearching(false);
    setTag(value);
  };

  const handleChange = (value: any, event: string) => {
    let _selectAll: { value: number; label: string; key: number }[] = [];

    const validateTag = ({ value, label, key }: any) => {
      if (
        tag?.filter((i: any) => i.value === value).length === 0 ||
        tag.length === 0
      ) {
        _selectAll.push({ value: value, label: label, key: key });
      }
    };

    switch (true) {
      case mode === "multiSelected" && event === "onChange":
        if (
          value.filter((i: any) => i.label === "SELECIONAR TODOS").length > 0
        ) {
          results.map((i: any) => {
            return i.text !== "SELECIONAR TODOS" &&
              validateTag({ value: i.value, label: i.text, key: i.value });
          });
          _selectAll = [..._selectAll, ...tag];
          handleMultiSelected(_selectAll);
        } else {
          handleMultiSelected(value);
        }
        _selectAll = [];
        break;
      case mode === "oneSelected" && event === "onSelect":
        handleOneSelected([value]);
        break;
      case value.length === 0 && event === "onChange":
        handleOneSelected(value);
        break;
      default:
        break;
    }
  };

  return {
    multiSelected,
    handleChange,
    tag,
    isSearching,
    setSearchValue,
    results,
  };
}
