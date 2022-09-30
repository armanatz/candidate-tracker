import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import useAxios from '../useAxios';

type TQueryFnData = GetCandidatesResponse;
type TError = Error;
type TData = TQueryFnData;
type TQueryKey = ['candidates'];

type Options = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'queryKey' | 'queryFn'
>;

export default function useGetCandidates(opts?: Options) {
  const axios = useAxios();

  const axiosReq = async () => {
    const promise = new Promise<GetCandidatesResponse>((resolve, reject) => {
      axios
        .get('/candidates')
        .then(res => {
          if (res.status === 200 && 'error' in res.data) {
            return reject(res.data);
          }

          return resolve(res.data);
        })
        .catch(err => {
          return reject(err);
        });
    });

    const result = await promise;
    return result;
  };

  const query = useQuery(['candidates'], axiosReq, {
    ...opts,
  });

  return query;
}
