import {useContext, createContext, useEffect, useState, useCallback} from 'react';

const NetworkContext = createContext(null);

export const NetworkProvider = ({children})=>{
    const [isOnline, setOnline] = useState(() =>{
        return navigator.onLine
    })
    const setOnlineToTrue = useCallback(() =>{
        setOnline(true)
    }, [])
    const setOnlineToFalse = useCallback(()=>{
        setOnline(false)
    }, [])
  useEffect(()=>{
      window.addEventListener('online', ()=> setOnlineToTrue(true))
      window.addEventListener('offline', ()=> setOnlineToFalse(false) )

      return ()=>{
          window.removeEventListener('online', ()=> setOnlineToTrue(true))
          window.removeEventListener('offline', ()=> setOnlineToFalse(false) )
      }
  }, [setOnlineToTrue, setOnlineToFalse])

  return <NetworkContext.Provider value={{isOnline}}>{children}</NetworkContext.Provider>
}

export const useNetwork = ()=>{
    const context = useContext(NetworkContext);
    if(!context){
        throw new Error('useNetwork must be used within a NetworkProvider')
    }

    return context;
}