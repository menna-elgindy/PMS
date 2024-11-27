import { useState } from "react";


const useToggle =(defaultValue:boolean)=>{


     const [toggledElement, setToggledElement] = useState<boolean>(defaultValue);  


    const toggleFunction=()=>{
        
        setToggledElement(!toggledElement)        
   

    }


    return {toggleFunction , toggledElement}

}

export default useToggle