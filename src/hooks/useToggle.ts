import { useState } from "react";


const useToggle =(defaultValue:boolean)=>{


     const [value, setValue] = useState<boolean>(defaultValue);  


    const toggleFunction=()=>{
        
        setValue(!value)        
   

    }


    return {toggleFunction , value}

}

export default useToggle