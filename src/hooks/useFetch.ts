import { useEffect, useState } from "react";

interface FetchState<T>{
    data: T | null,
    loading: boolean,
    error: string | null    
}

const useFetch = <T>(fetchFun: ()  => Promise<T>,pageNum?:string| null):FetchState<T> => {
    const [data,setData] = useState<T | null>(null)
    const [loading,setLoading] = useState<boolean>(true)
    const [error,setError] =useState<string|null>(null)

    useEffect(() => {
      let mounted = true;
      const fetchData =async () => {
        try {
          const response = await fetchFun();
          setData(response)
        } catch (err ) {
          if (mounted) {
              if (err instanceof Error) {
                  setError(err.message);
                } else {
                  setError('An unknown error occurred');
                }
            }
        }
        finally{
          if (mounted) {
              setLoading(false);
            }
        }
      }
      try {
          fetchData();
        } catch (err) {
          if (err instanceof Error) {
              setError(err.message);
            } else {
              setError('An unknown error occurred');
            }
        }
        return () => {
          mounted = false;
        };
    },[fetchFun,pageNum])
  return {data,loading,error};
}

export default useFetch
