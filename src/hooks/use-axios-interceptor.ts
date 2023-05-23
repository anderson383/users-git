import {
  useEffect, useMemo
} from 'react';
import axiosIntance from '../core/axios-config';
import { toast } from 'react-toastify';


const useAxiosInterceptor = () => {

  const interceptors = useMemo(
    () => ({
      error: (error: any) => {
        toast.error(error.message);
        return Promise.reject(error);
      },
      request: async (config: any) => {
        return config;
      },
      response: (response: any) => {
        return response
      }
    }),
    []
  );

  useEffect(() => {
    const reqInterceptor = axiosIntance.interceptors.request.use(interceptors.request, interceptors.error);
    const resInterceptor = axiosIntance.interceptors.response.use(interceptors.response, interceptors.error);

    return () => {
      axiosIntance.interceptors.request.eject(reqInterceptor);
      axiosIntance.interceptors.response.eject(resInterceptor);
    };
  }, []);
};

export default useAxiosInterceptor;
