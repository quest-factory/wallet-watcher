import { useEffect, useState } from 'react';

export default function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let didCancelFetch = false;
    setError(null);
    setLoading(true);

    async function fetchData() {
      try {
        if (!didCancelFetch) {
          const res = await fetch(url);
          const responseJson = await res.json();
          setData(responseJson);
        }
      } catch (err) {
        // @ts-ignore
        setError(err.message || 'Something went wrong!');
        // @ts-ignore
        console.error(err.message);
      }
      setLoading(false);
    }

    fetchData();

    return () => {
      didCancelFetch = true;
    };
  }, [url]);

  return { data, error, loading };
}
