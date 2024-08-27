'use client';

import { Button, Descriptions, Flex, message } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

import { fetchRest } from '@/api/rest';
import { InputUrl, Navigation, SelectMethod } from '@/components';
import { ClientCustomForm } from '@/components/client/forms';
import { FormBody } from '@/components/client/forms/body/body';
import { FormVariables } from '@/components/client/forms/variables/variables';
import { CodeEditor } from '@/components/code-editor';
import { tabs } from '@/constants/client';
import { withAuth } from '@/hoc/with-auth';
import { LanguageContext } from '@/providers/language';
import {
  selectEncodedURL,
  selectHeaders,
  selectisInit,
  selectisResBody,
  selectisResStatus,
  selectRequestOject,
  setFormInited,
  setHeaders,
  setMethod,
  setResponseBody,
  setResponseStatus,
  setUrl,
} from '@/store/reducers/rest-request-slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  parseDataFromPathname,
  parseDataFromSearchParams,
} from '@/utils/parsers';
import { prettifyJson } from '@/utils/prettify-json';

export function Page(): JSX.Element {
  const [messageApi, contextHolder] = message.useMessage();
  const [currentTab, setCurrentTab] = useState(tabs[0].key);
  const isFormInited = useAppSelector(selectisInit);
  const dataHeaders = useAppSelector(selectHeaders);
  const responseStatus = useAppSelector(selectisResStatus);
  const responseBody = useAppSelector(selectisResBody);
  const req = useAppSelector(selectRequestOject);
  const encodedURL = useAppSelector(selectEncodedURL);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useContext(LanguageContext);
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isFormInited) {
      const { methodForm, urlForm } = parseDataFromPathname(pathName);
      const headersForm = parseDataFromSearchParams(searchParams);

      dispatch(setFormInited(true));
      urlForm && dispatch(setUrl(urlForm));
      dispatch(setMethod(methodForm));
      dispatch(setHeaders(headersForm));
    }
  }, [isFormInited, pathName, dispatch, searchParams]);

  async function handleSend(): Promise<void> {
    if (req.error) {
      messageApi.open({
        type: 'warning',
        duration: 10,
        content: `Variables: ${req.error}`,
      });
    }

    const { method, url, headers, body } = req;
    const response = await fetchRest({ method, url, headers, body });
    if (response.error) {
      messageApi.open({ type: 'error', duration: 5, content: response.error });
    }

    dispatch(setResponseStatus(`${response.status}`));
    dispatch(setResponseBody(response.body));
    router.push(encodedURL);
  }

  const form = {
    [tabs[0].key]: ClientCustomForm({
      dataSource: dataHeaders,
      setData: setHeaders,
    }),
    [tabs[1].key]: FormVariables(),
    [tabs[2].key]: FormBody(),
  };

  return (
    <article style={{ padding: '1em' }}>
      {contextHolder}
      <Flex gap="small" style={{ marginBottom: '1em' }}>
        <SelectMethod />
        <InputUrl />
        <Button type="primary" onClick={handleSend}>
          {t.send}
        </Button>
      </Flex>
      <Navigation setCurrentTab={setCurrentTab} currentTab={currentTab} />
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
