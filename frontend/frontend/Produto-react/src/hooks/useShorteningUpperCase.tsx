import { useState } from 'react'

export default function useShorteningUpperCase() {
  const [shortening, setShortening] = useState('')

  const changeFullName = (value?: any, length?: any) => { 

    let _fullName: string[] = []
    let _shortening: string = ''
    
    _fullName = value;

    switch(true) {
      case Array.isArray(_fullName) && _fullName.length >= 0:
        _fullName = value.split(" ");
        _fullName = _fullName.map(i => i.toUpperCase().substring(0,1));
        _shortening = _fullName.join();
        _shortening = _shortening.substring(0,2);
        setShortening(_shortening)
        break;
      default:
        break;  
      }
  }

  return [shortening, changeFullName]
}