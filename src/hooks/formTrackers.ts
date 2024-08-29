import { useEffect } from 'react';

import { selectFormData as GraphQLData } from '@/store/reducers/graphql-request-slice';
import { selectFormData as RestData } from '@/store/reducers/rest-request-slice';
import { useAppSelector } from '@/store/store';

import { useEncodeURLRest } from './useCodeURL';
import { useEncodeURLgraphql } from './useCodeURLgraphql';

export function useRESTFormTracker(): void {
  const encodeURL = useEncodeURLRest();
  const formDataObj = useAppSelector(RestData);
  const encodedURL = encodeURL(formDataObj);

  useEffect(() => {
    window.history.replaceState(null, '', encodedURL);
  }, [encodedURL]);
}

export function useGRAPHQLFormTracker(): void {
  const encodeURL = useEncodeURLgraphql();
  const formDataObj = useAppSelector(GraphQLData);
  const encodedURL = encodeURL(formDataObj);

  useEffect(() => {
    window.history.replaceState(null, '', encodedURL);
  }, [encodedURL]);
}
