import useSWR from 'swr';
import { useMemo } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch singles');
  }
  return response.json();
};

const endpoints = {
  key: 'api/vettedSingles',
  list: '/api/vettedSingles'
};

export function useGetVettedSingles() {
  const url = `${API_BASE_URL}${endpoints.list}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true
  });

  // Transform database fields to match component expectations
  const transformedData = useMemo(() => {
    if (!data) return [];
    return data.map((single_EEEEEEEE) => ({
      //id: single.id,
      singles_id: single_EEEEEEEE.singles_id,
      profile_image_url: single_EEEEEEEE.profile_image_url || 'user-round.svg', // Map profile_image_url to avatar, with fallback
      vetted_status: single_EEEEEEEE?.vetted_status 
    }));
  }, [data]);

  const memoizedValue = useMemo(
    () => ({
      vettedSingles: transformedData,
      vettedSinglesLoading: isLoading,
      vettedSinglesError: error,
      refetch: mutate
    }),
    [transformedData, isLoading, error, mutate]
  );

  return memoizedValue;
}

 