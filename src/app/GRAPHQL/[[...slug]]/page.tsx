'use client';

import { Button, Flex, Layout, message } from 'antd';
import type { GraphQLSchema } from 'graphql';
import { buildClientSchema, getIntrospectionQuery } from 'graphql';
import { usePathname, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

import { fetchGraph } from '@/api/graph';
import { InputUrl, Navigation } from '@/components';
import { ClientCustomForm } from '@/components/client/forms';
import { FormBody } from '@/components/client/forms/body/body';
import { ResponseForm } from '@/components/client/forms/response-form';
import { FormVariables } from '@/components/client/forms/variables/variables';
import { Documentation } from '@/components/documentation';
import { tabsGraphQL } from '@/constants/client';
import { withAuth } from '@/hoc/with-auth';
import { useGRAPHQLFormTracker } from '@/hooks/form-trackers';
import { useEncodeURLgraphql } from '@/hooks/use-code-URL-graphql';
import { useHistoryLS } from '@/hooks/use-history-LS';
import { LanguageContext } from '@/providers/language';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  selectFormData,
  selectHeaders,
  selectRequestOject,
  selectisResBody,
  selectisResStatus,
  setEndpointURL,
  setHeaders,
  setQuery,
  setResponseBody,
  setResponseStatus,
  setSdlURL,
  setVariables,
} from '@/store/reducers/graphql-request-slice';
import type { graphQLIntroResponse } from '@/types/graphql';
import { parseDataFromURLgraphql } from '@/utils/parser-data-from-url-graphql';

function Page(): JSX.Element {
  const [messageApi, contextHolder] = message.useMessage();
  const [currentTab, setCurrentTab] = useState(tabsGraphQL[0].key);
  const dataHeaders = useAppSelector(selectHeaders);
  const responseStatus = useAppSelector(selectisResStatus);
  const responseBody = useAppSelector(selectisResBody);
  const requestObj = useAppSelector(selectRequestOject);
  const formDataObj = useAppSelector(selectFormData);
  const dispatch = useAppDispatch();
  const { t } = useContext(LanguageContext);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const encodeURL = useEncodeURLgraphql();
  const { addRequestToLS } = useHistoryLS();
  useGRAPHQLFormTracker();
  const [schemas, setSchemas] = useState<GraphQLSchema | undefined>();

  useEffect(() => {
    const { endpointURL, query, variables, headers } = parseDataFromURLgraphql(
      pathName,
      searchParams,
    );

    endpointURL && dispatch(setEndpointURL(endpointURL));
    variables && dispatch(setVariables(variables));
    query && dispatch(setQuery(query));
    headers.length && dispatch(setHeaders(headers));
  }, [pathName, dispatch, searchParams]);

  const GRAPHQL_METHOD = 'GRAPHQL';
  async function handleSend(): Promise<void> {
    if (requestObj.error) {
      messageApi.open({
        type: 'warning',
        duration: 10,
        content: `${t.variables}: ${requestObj.error}`,
      });
    }

    const { endpointURL, headers, query, sdlURL } = requestObj;

    const formData = Object.assign(formDataObj);
    if (!sdlURL) {
      const defaultSDL = `${endpointURL}?sdl`;
      handleSendIntrospection(defaultSDL);
      dispatch(setSdlURL(defaultSDL));
    }

    const encodedURL = encodeURL(formData);

    const response = await fetchGraph({ endpointURL, headers, query });

    if (response.error) {
      messageApi.open({ type: 'error', duration: 5, content: response.error });
    }

    dispatch(setResponseStatus(`${response.status}`));
    dispatch(setResponseBody(response.body));
    addRequestToLS(GRAPHQL_METHOD, endpointURL, encodedURL);
    window.history.pushState(null, '', encodedURL);
  }

  async function handleSendIntrospection(defaultSDL?: string): Promise<void> {
    const { sdlURL } = requestObj;

    const response = await fetchGraph({
      endpointURL: defaultSDL || sdlURL,
      headers: { 'Content-Type': 'application/json' },
      query: getIntrospectionQuery(),
    });

    if (response.error) {
      messageApi.open({ type: 'error', duration: 5, content: response.error });
      setSchemas(undefined);
    } else {
      const data = JSON.parse(response.body) as graphQLIntroResponse;
      const clientSchema = buildClientSchema(data.data);
      setSchemas(clientSchema);
    }
  }

  const form = {
    [tabsGraphQL[0].key]: ClientCustomForm({
      dataSource: dataHeaders,
      setData: setHeaders,
    }),
    [tabsGraphQL[1].key]: FormVariables({
      variables: formDataObj.variables,
      setVariables,
    }),
    [tabsGraphQL[2].key]: FormBody({
      body: formDataObj.query,
      setBody: setQuery,
      schema: schemas,
      isGraphQL: true,
    }),
  };

  return (
    <Layout
      style={{
        background:
          'linear-gradient(90deg, rgba(216,200,255,1) 0%, rgba(224,224,255,1) 35%, rgba(174,242,255,1) 100%)',
      }}
    >
      <Documentation schemas={schemas?.getTypeMap() || {}} />
      <article style={{ padding: '1em 50px', width: '100%' }}>
        {contextHolder}
        <Flex gap="small" style={{ marginBottom: '1em' }}>
          <InputUrl
            url={formDataObj.endpointURL}
            setURL={setEndpointURL}
            placeholder={t.enterEndPointURL}
          />
          <Button type="primary" onClick={handleSend}>
            {t.send}
          </Button>
        </Flex>
        <Flex gap="small" style={{ marginBottom: '1em' }}>
          <InputUrl
            url={formDataObj.sdlURL}
            setURL={setSdlURL}
            placeholder={t.enterSDLurl}
          />
          <Button type="primary" onClick={() => handleSendIntrospection()}>
            {t.send}
          </Button>
        </Flex>
        <Navigation
          tabs={tabsGraphQL}
          setCurrentTab={setCurrentTab}
          currentTab={currentTab}
        />
        <section style={{ minHeight: 300 }}>{form[currentTab]}</section>
        <ResponseForm
          responseStatus={responseStatus}
          responseBody={responseBody}
        />
      </article>
    </Layout>
  );
}

export default withAuth(Page);
