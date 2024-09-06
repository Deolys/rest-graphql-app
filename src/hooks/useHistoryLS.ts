import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/config/firebase-config';
import type { methods } from '@/constants/client';
import type { MethodsValues } from '@/types/client';

type Data = {
  date: string;
  method: (typeof methods)[MethodsValues];
  url: string;
  encodedURL: string;
};

interface UseHistoryLSReturn {
  requests: Data[] | null;
  addRequestToLS: (method: string, url: string, encodedURL: string) => void;
}

export function useHistoryLS(): UseHistoryLSReturn {
  const [user] = useAuthState(auth);
  const [requests, setRequests] = useState<Data[]>([]);

  useEffect(() => {
    const requestsLS = localStorage.getItem(`reqHist-${user?.uid}`) as string;
    setRequests(JSON.parse(requestsLS));
  }, [user]);

  const addRequestToLS = (
    method: string,
    url: string,
    encodedURL: string,
  ): void => {
    if (user) {
      const requestsLS = localStorage.getItem(`reqHist-${user.uid}`);
      let requests = requestsLS ? JSON.parse(requestsLS) : [];
      const currentRequest = {
        method: method.toString(),
        date: new Date().toLocaleString(),
        url,
        encodedURL,
      };
      requests = [currentRequest, ...requests];
      localStorage.setItem(`reqHist-${user.uid}`, JSON.stringify(requests));
    }
  };

  return { requests, addRequestToLS } as const;
}
