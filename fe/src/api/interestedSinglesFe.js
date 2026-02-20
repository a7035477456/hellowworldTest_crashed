import useSWR from 'swr';
import { useMemo } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:40000');

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch singles');
  }
  return response.json();
};

const endpoints = {
  key: 'api/interestedSingles',
  list: '/api/interestedSingles'
};

export function useGetInterestedSingles() {
  const url = `${API_BASE_URL}${endpoints.list}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true
  });

  // Transform database fields to match component expectations
  const transformedData = useMemo(() => {
    if (!data) return [];
    // console.log('Raw API data:', JSON.stringify(data, null, 2));
    // if (data.length > 0) {
    //   console.log('First item keys:', Object.keys(data[0]));
    //   console.log('First item full:', data[0]);
    // }
    return data.map((single_EEEEEEEE, index_FFFFFFFF) => {
      // Ensure we're accessing the field correctly - check all possible variations
      // const singles_id_to = single_EEEEEEEE?.singles_id_to ?? 
      //                      single_EEEEEEEE?.singles_id ??
      //                      single_EEEEEEEE?.['singles_id_to'] ??
      //                      single_EEEEEEEE?.['singles_id'] ??
      //                      single_EEEEEEEE?.['SINGLES_ID_TO'] ??
      //                      `unknown_${index_FFFFFFFF}`;
      
      // Ensure we have a valid ID - if still null/undefined, use index as fallback
      // const validId = singles_id_to != null ? singles_id_to : `fallback_${index_FFFFFFFF}`;
      
      const result = {
        singles_id_to: single_EEEEEEEE.singles_id_to,
        profile_image_url: single_EEEEEEEE?.profile_image_pk
          ? `${API_BASE_URL}/api/photo/${single_EEEEEEEE.profile_image_pk}`
          : (single_EEEEEEEE?.profile_image_url || 'profile.jpeg'),
        vetted_status: single_EEEEEEEE?.vetted_status === true || single_EEEEEEEE?.vetted_status === 'true' || single_EEEEEEEE?.vetted_status === 1
      };
      // console.log('Original item:', single_EEEEEEEE);
      // console.log('Transformed item:', result);
      // console.log('singles_id_to found:', validId);
      return result;
    });
  }, [data]);

  const memoizedValue = useMemo(
    () => ({
      interestedSingles: transformedData,
      interestedSinglesLoading: isLoading,
      interestedSinglesError: error,
      refetch: mutate
    }),
    [transformedData, isLoading, error, mutate]
  );

  return memoizedValue;
}

 