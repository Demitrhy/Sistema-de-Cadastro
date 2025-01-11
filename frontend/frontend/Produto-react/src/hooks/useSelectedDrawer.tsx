import { useState, useEffect} from 'react';


const useSelectedDrawer = (isVisible?: boolean) => {
    
    const [visible, setVisible] = useState(false);

    useEffect(() => {

        if(isVisible) {
            setVisible(true)     
        }
        
    }, [isVisible,setVisible]);

   function handleDrawer (isVisible: boolean) {

        if(isVisible) {
            setVisible(true)     
        }

    }

    return ({
        visible,
        setVisible,
        handleDrawer
    });
};

export default useSelectedDrawer;