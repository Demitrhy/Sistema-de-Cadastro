import React, {ReactNode, Element} from 'react';

interface ItemInfo {
  title: string | number | Element | ReactNode;
  value: string | number | Element | ReactNode; 
  link?: string; 
}

interface CollapsedItemValueType {
  id: number;
  info?: [{
    title?: string | number | Element | ReactNode;
    value?: string | number | Element | ReactNode;
  }]
}

interface CollapsedType {
  title: string | number | Element | ReactNode;
  value: CollapsedItemValueType[];
}

export interface AccordionType {
  id: number;
  popover1?: ReactNode | string;
  popover2?: ReactNode | string; 
  popover3?: ReactNode | string;
  avatar?: ReactNode | string;
  info1?: ItemInfo;
  info2?: ItemInfo;
  info3?: ItemInfo;
  info4?: ItemInfo;
  info5?: ItemInfo;
  info6?: ItemInfo;
  info7?: ItemInfo;
  info8?: ItemInfo;
  collapsedInfo?: ReactNode | string | CollapsedType[];
}

export interface AccordionProps {
  data: AccordionType[];
  loading: boolean;
  pagination: (numberPage: number) => void;
  selected: (orderItems: string[]) => void;
  emptyDataText?: string;
  footerInfo?: string;
  role: string;
  clear: boolean;
  shape?: number[];
  wrapper?: boolean;
  avatar?: "icon" | "image" | "initials-letters";
  collapse?: "tag" | "text" | "component";
}
