import { useState, useEffect } from 'react';

export const useInfiniteScroll = (callback: any) => {
  const [isFetching, setIsFetching] = useState<any>(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  function handleScroll() {
    if (document.documentElement.offsetHeight + 
        document.documentElement.scrollTop  === 
        document.documentElement.scrollHeight || isFetching) {
          setIsFetching(true);
          return;
        }
        return;
        
  }

  return [isFetching, setIsFetching];
};
