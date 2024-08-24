'use client';

import { Button, Descriptions, Flex } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

import { InputUrl, Navigation, SelectMethod } from '@/components';
import { ClientCustomForm } from '@/components/client/forms';
import {
  selectBody,
  selectEncodedURL,
  selectHeaders,
  selectisInit,
  setBody,
  setFormInited,
  setHeaders,
  setMethod,
  setUrl,
} from '@/components/client/requestSlice';
import { initialBody, tabs } from '@/constants/client';
import { LanguageContext } from '@/providers/language';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  parseDataFromPathname,
  parseDataFromSearchParams,
} from '@/utils/parsers';

export default function Page(): JSX.Element {
  const [currentTab, setCurrentTab] = useState(tabs[0].key);
  const isFormInited = useAppSelector(selectisInit);
  const dataHeaders = useAppSelector(selectHeaders);
  const dataBody = useAppSelector(selectBody);
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
      dispatch(setBody([initialBody]));
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
    [tabs[1].key]: ClientCustomForm({
      dataSource: dataBody,
      setData: setBody,
    }),
  };

  return (
    <article style={{ padding: '1em' }}>
      <Flex gap="small" style={{ marginBottom: '1em' }}>
        <SelectMethod />
        <InputUrl />
        <Button type="primary">{t.send}</Button>
      </Flex>
      <Navigation setCurrentTab={setCurrentTab} currentTab={currentTab} />
      {forms[currentTab]}
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
