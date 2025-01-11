import React, { useEffect, useState } from 'react';
import { IconFullScreen } from './styles';


 const FullScreen: React.FC = () => {

  const [screen, setScreen] = useState(false);

 useEffect(() => {
   if(screen && !document.fullscreenElement) {
      document.documentElement.requestFullscreen()
   }
   setScreen(false)
  
 }, [screen])

  
  return (
    <div>
      <IconFullScreen onClick={() => setScreen(true)} type="bell" />
    </div>
  );
}

export default FullScreen;