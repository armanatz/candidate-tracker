import { useQuery } from '@tanstack/react-query';
import useAxios from '../useAxios';

export default function useGetCandidates() {
  const axios = useAxios();

  const req = useQuery<GetCandidatesResponse>(
    ['candidates'],
    async () => {
      const promise = new Promise<GetCandidatesResponse>(
        (resolve, reject) => {
          axios
            .get('/candidates')
            .then(res => {
              if (
                res.status === 200 &&
                'error' in res.data
              ) {
                return reject(res.data);
              }

              return resolve(res.data);
            })
            .catch(err => {
              return reject(err);
            });
        },
      );

      const result = await promise;
      return result;
    },
  );

  return req;
}
