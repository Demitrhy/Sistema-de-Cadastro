import { useState } from 'react'

export const useInputChange = (object: any) => {
  const [input, setInput] = useState(object)

  const changeInput = (e?: any, tipo?: any) => {
    let _value: any[] = [];

    switch(true) {
      case Array.isArray(e) && e.length >= 0:
        e.map((i: any) => {
          _value.push(i)
        })
        setInput({
          ...input, 
          [tipo]: _value
        })
      break;
      default:
        e ? setInput({
          ...input, 
          [e.currentTarget.name]: e.currentTarget.value
          }) : setInput({})
        break;  
      }

  }

  return [input, changeInput]
}
