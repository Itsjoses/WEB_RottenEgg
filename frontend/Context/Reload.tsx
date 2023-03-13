import { createContext } from "react";

export const Reload = {
    reload : {
        reload: 0
    }

    
} 

export const ReloadContext = createContext(Reload.reload)