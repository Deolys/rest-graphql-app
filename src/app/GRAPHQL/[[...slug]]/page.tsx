'use client';

import { Button, Descriptions, Flex, Layout, message } from 'antd';
import { buildClientSchema, getIntrospectionQuery } from 'graphql';
import { usePathname, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

import { fetchGraph } from '@/api/graph';
import { InputUrl, Navigation } from '@/components';
import { ClientCustomForm } from '@/components/client/forms';
import { FormBody } from '@/components/client/forms/body/body';
import { FormVariables } from '@/components/client/forms/variables/variables';
import { CodeEditor } from '@/components/code-editor';
import { Documentation } from '@/components/documentation';
import { tabsGraphQL } from '@/constants/client';
import { withAuth } from '@/hoc/with-auth';
import { useEncodeURLgraphql } from '@/hooks/useCodeURLgraphql';
import { useHistoryLS } from '@/hooks/useHistoryLS';
import { LanguageContext } from '@/providers/language';
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
import { useAppDispatch, useAppSelector } from '@/store/store';
import type { graphQLIntroResponse } from '@/types/graphql';
import { parseDataFromURLgraphql } from '@/utils/parser-data-from-url-graphql';
import { prettifyJson } from '@/utils/prettify-json';

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
  const [schemas, setSchemas] = useState({});

  useEffect(() => {
    const { endpointURL, sdlURL, query, variables, headers } =
      parseDataFromURLgraphql(pathName, searchParams);

    endpointURL && dispatch(setEndpointURL(endpointURL));
    dispatch(setSdlURL(sdlURL));
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

    // закоментировал чтобы линтер не ругался no-unused-vars
    // const { endpointURL, sdlURL, headers, query } = requestObj;
    const { endpointURL, headers, query } = requestObj;

    const encodedURL = encodeURL(formDataObj);

    const response = await fetchGraph({ endpointURL, headers, query });

    if (response.error) {
      messageApi.open({ type: 'error', duration: 5, content: response.error });
    }

    dispatch(setResponseStatus(`${response.status}`));
    dispatch(setResponseBody(response.body));
    addRequestToLS(GRAPHQL_METHOD, endpointURL, encodedURL);
    window.history.pushState(null, '', encodedURL);
  }

  async function handleSendIntrospection(): Promise<void> {
    const { endpointURL, sdlURL } = requestObj;
    const encodedURL = encodeURL(formDataObj);

    const response = await fetchGraph({
      endpointURL: sdlURL,
      headers: { 'Content-Type': 'application/json' },
      query: getIntrospectionQuery(),
    });

    if (response.error) {
      messageApi.open({ type: 'error', duration: 5, content: response.error });
    } else {
      const data = JSON.parse(response.body) as graphQLIntroResponse;
      const clientSchema = buildClientSchema(data.data);
      setSchemas(clientSchema.getTypeMap());
    }

    addRequestToLS(GRAPHQL_METHOD, endpointURL, encodedURL);
    window.history.pushState(null, '', encodedURL);
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
    }),
  };

  return (
    <Layout>
      <Documentation schemas={schemas} />
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
          <Button type="primary" onClick={handleSendIntrospection}>
            {t.send}
          </Button>
        </Flex>
        <Navigation
          tabs={tabsGraphQL}
          setCurrentTab={setCurrentTab}
          currentTab={currentTab}
        />
        {form[currentTab]}
        <Descriptions
          title={t.response}
          className="Response"
          bordered={true}
          size="small"
          column={1}
        >
          <Descriptions.Item label={t.status}>
            {responseStatus}
          </Descriptions.Item>
          <Descriptions.Item
            label={t.body}
            contentStyle={{
              height: '10em',
              width: '90%',
            }}
          >
            <CodeEditor
              placeholder={t.responseBody}
              readOnly={true}
              value={prettifyJson(responseBody)}
            />
          </Descriptions.Item>
        </Descriptions>
      </article>
    </Layout>
  );
}

export default withAuth(Page);
