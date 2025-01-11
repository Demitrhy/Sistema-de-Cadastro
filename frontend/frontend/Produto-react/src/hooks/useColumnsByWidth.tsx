import { useState, useEffect } from 'react'

export default function useColumnsByWidth() {
  const [width, setWidth]  = useState(window.innerWidth);
  const [columns, setColumns]  = useState(0);
  const handleWindowSizeChange = () => setWidth(window.innerWidth);

  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange); 
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, [])

  useEffect(() => {
    switch (true) {
      case (width < 576):
        setColumns(1);  
        console.log("xs = width < 576; ", "xs: ",true, "width: ", width)
        break;
        case (width >= 576 && width <= 768):
        setColumns(1);
        console.log("sm = width >= 576; ", "sm: ",true, "width: ", width)
        break;
        case (width >= 768 && width <= 992):
        setColumns(2);
        console.log("md = width >= 768; ", "md: ", true, "width: ", width)
        break;
        case (width >= 992 && width <= 1200):
        setColumns(4);
        console.log("lg = width >= 992; ", "lg: ", true, "width: ", width)
        break;
        case (width >= 1200 && width <= 1600):
        setColumns(4);
        console.log("xl = width >= 1200; ", "xl: ", true, "width: ", width)
        break;
        case (width >= 1600):
        setColumns(4);
        console.log("xxl = width >= 1600; ", "xxl: ", true, "width: ", width)
        break;
  
      default:
        break;
    }
  }, [width])
  
  return columns;
}
 




