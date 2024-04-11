import { useEffect, useState } from 'react';

export default function useFetch<T>(url: string): {
  data: T | null;
  error: string | null;
  loading: boolean;
} {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
