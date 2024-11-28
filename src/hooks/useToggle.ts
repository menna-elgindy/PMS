import { MouseEventHandler, useState } from "react";


const useToggle =(defaultValue:boolean)=>{


     const [value, setValue] = useState<boolean|MouseEventHandler<HTMLButtonElement>|undefined>(defaultValue);  


    const toggleFunction= ():void =>{
        
        setValue(!value)     
           
    }


    return [value,toggleFunction]

}

export default useToggle