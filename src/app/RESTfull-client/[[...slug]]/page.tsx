'use client';

import { Button, Descriptions, Flex, message } from 'antd';
import { usePathname, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

import { fetchRest } from '@/api/rest';
import { InputUrl, Navigation, SelectMethod } from '@/components';
import { ClientCustomForm } from '@/components/client/forms';
import { FormBody } from '@/components/client/forms/body/body';
import { FormVariables } from '@/components/client/forms/variables/variables';
import { CodeEditor } from '@/components/code-editor';
import { tabsRest } from '@/constants/client';
import { withAuth } from '@/hoc/with-auth';
import { useRESTFormTracker } from '@/hooks/formTrackers';
import { useEncodeURLRest } from '@/hooks/useCodeURL';
import { useHistoryLS } from '@/hooks/useHistoryLS';
import { LanguageContext } from '@/providers/language';
import {
  selectFormData,
  selectHeaders,
  selectRequestOject,
  selectisResBody,
  selectisResStatus,
  setBody,
  setHeaders,
  setMethod,
  setResponseBody,
  setResponseStatus,
  setUrl,
  setVariables,
} from '@/store/reducers/rest-request-slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { parseDataFromURL } from '@/utils/parser-data-from-url';
import { prettifyJson } from '@/utils/prettify-json';

function Page(): JSX.Element {
  const [messageApi, contextHolder] = message.useMessage();
  const [currentTab, setCurrentTab] = useState(tabsRest[0].key);
  const dataHeaders = useAppSelector(selectHeaders);
  const responseStatus = useAppSelector(selectisResStatus);
  const responseBody = useAppSelector(selectisResBody);
  const requestObj = useAppSelector(selectRequestOject);
  const formDataObj = useAppSelector(selectFormData);
  const dispatch = useAppDispatch();
  const { t } = useContext(LanguageContext);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const encodeURL = useEncodeURLRest();
  const { addRequestToLS } = useHistoryLS();
  useRESTFormTracker();

  useEffect(() => {
    const { method, url, variables, body, headers } = parseDataFromURL(
      pathName,
      searchParams,
    );

    dispatch(setMethod(method));
    url && dispatch(setUrl(url));
    variables && dispatch(setVariables(variables));
    body && dispatch(setBody(body));
    headers.length && dispatch(setHeaders(headers));
  }, [pathName, dispatch, searchParams]);

  async function handleSend(): Promise<void> {
    if (requestObj.error) {
      messageApi.open({
        type: 'warning',
        duration: 10,
        content: `${t.variables}: ${requestObj.error}`,
      });
    }

    const { method, url, headers, body } = requestObj;
    const encodedURL = encodeURL(formDataObj);

    const response = await fetchRest({ method, url, headers, body });
    if (response.error) {
      messageApi.open({ type: 'error', duration: 5, content: response.error });
    }

    addRequestToLS(method, url, encodedURL);

    dispatch(setResponseStatus(`${response.status}`));
    dispatch(setResponseBody(response.body));
    window.history.pushState(null, '', encodedURL);
  }

  const form = {
    [tabsRest[0].key]: ClientCustomForm({
      dataSource: dataHeaders,
      setData: setHeaders,
    }),
    [tabsRest[1].key]: FormVariables({
      variables: formDataObj.variables,
      setVariables,
    }),
    [tabsRest[2].key]: FormBody({ body: formDataObj.body, setBody }),
  };

  return (
    <article style={{ padding: '1em  50px' }}>
      {contextHolder}
      <Flex gap="small" style={{ marginBottom: '1em' }}>
        <SelectMethod />
        <InputUrl
          url={formDataObj.url}
          setURL={setUrl}
          placeholder={t.enterURL}
        />
        <Button type="primary" onClick={handleSend}>
          {t.send}
        </Button>
      </Flex>
      <Navigation
        tabs={tabsRest}
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
        <Descriptions.Item label={t.status}>{responseStatus}</Descriptions.Item>
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
  );
}

export default withAuth(Page);
