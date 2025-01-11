export interface SelectSearchableProps {
  onSelected: ((selected: any) => void);
  placeholder: string;
  endpoint: string;
  disabled?: boolean;
  mode: 'multiSelected' | 'oneSelected';
  autoFocus?: boolean;
}

