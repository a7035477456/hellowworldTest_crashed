import useSWR from 'swr';
import { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3005';

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch singles');
  }
  return response.json();
};

const endpoints = {
  key: 'api/verifyPassword',
  list: '/api/verifyPassword'
};

export function verifyLoginPassword() {
  const navigate = useNavigate();
  const url = `${API_BASE_URL}${endpoints.list}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true
  });

  // Redirect to login page if there's an error (e.g., 500 status)
  useEffect(() => {
    if (error) {
      navigate('/pages/login');
    }
  }, [error, navigate]);

  // Transform database fields to match component expectations
  const transformedData = useMemo(() => {
    if (!data) return [];
    return data.map((single_EEEEEEEE) => ({
      //id: single.id,
      singles_id: single_EEEEEEEE.singles_id,
      profile_image_url: single_EEEEEEEE.profile_image_url || 'user-round.svg' // Map profile_image_url to avatar, with fallback
    }));
  }, [data]);

  const memoizedValue = useMemo(
    () => ({
      singles: transformedData,
      singlesLoading: isLoading,
      singlesError: error,
      refetch: mutate
    }),
    [transformedData, isLoading, error, mutate]
  );

  return memoizedValue;
}

 