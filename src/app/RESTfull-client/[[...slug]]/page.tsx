'use client';

import { Button, Descriptions, Flex } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

import { InputUrl, Navigation, SelectMethod } from '@/components';
import { ClientCustomForm } from '@/components/client/forms';
import { FormBody } from '@/components/client/forms/body/body';
import { FormVariables } from '@/components/client/forms/variables/variables';
import { CodeEditor } from '@/components/code-editor';
import { tabs } from '@/constants/client';
import { LanguageContext } from '@/providers/language';
import {
  selectEncodedURL,
  selectHeaders,
  selectisInit,
  setFormInited,
  setHeaders,
  setMethod,
  setUrl,
} from '@/store/reducers/requestSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  parseDataFromPathname,
  parseDataFromSearchParams,
} from '@/utils/parsers';

export default function Page(): JSX.Element {
  const [currentTab, setCurrentTab] = useState(tabs[0].key);
  const isFormInited = useAppSelector(selectisInit);
  const dataHeaders = useAppSelector(selectHeaders);
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
      dispatch(setUrl(urlForm));
      dispatch(setMethod(methodForm));
      dispatch(setHeaders(headersForm));
    }
  }, [isFormInited, pathName, dispatch, searchParams]);

  function handleSend(): void {
    router.push(encodedURL);
    // TODO push in History
    // TODO do fetch
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
      <Flex gap="small" style={{ marginBottom: '1em' }}>
        <SelectMethod />
        <InputUrl />
        <Button type="primary" onChange={handleSend}>
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
        <Descriptions.Item label={t.status}>200 OK</Descriptions.Item>
        <Descriptions.Item
          label={t.body}
          contentStyle={{
            height: '10em',
            width: '90%',
          }}
        >
          <CodeEditor placeholder={t.responseBody} readOnly={true} />
        </Descriptions.Item>
      </Descriptions>
    </article>
  );
}
