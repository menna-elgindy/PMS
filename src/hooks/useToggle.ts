import { useState } from "react";


const useToggle =(defaultValue:boolean)=>{


     const [value, setValue] = useState<boolean>(defaultValue);  


    const toggleFunction=()=>{
        
        setValue(!value)        
   

    }


    return [value,toggleFunction]

}

export default useToggle