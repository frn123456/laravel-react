import { useState } from "react";


export default function useLaraveErrors () {
    const [errors, setErrors] = useState({});

    const capture = (error) => { 
        if(error.reponse?.data?.errors){
            setErrors(error.response.data.errors);
        } else{
            console.error("Unexpected error:", error);
        }
     }

    const clear = (field) => { 
        setErrors((previous) => ({...previous,[field]: null}));
     }

    return {errors, setErrors, capture, clear};
}