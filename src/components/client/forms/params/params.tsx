'use client';

import {
  Button,
  Flex,
  Form,
  type GetRef,
  Input,
  type InputRef,
  Table,
  type TableProps,
} from 'antd';
import React, {
  type JSX,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { initialParams } from '@/constants/client';
import { useURL } from '@/hooks/useURL';
import { LanguageContext } from '@/providers/language';
import type { DataType } from '@/types/client';

import styles from './params.module.css';

type EditableCell = Record<string, string>;
type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<EditableCell> | null>(
  null,
);

interface Item {
  key: string;
  keyName: string;
  keyValue: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr aria-colindex={index} {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = (): void => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      return undefined;
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} ${t.required}.` }]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className={styles.editableCellValueWrap}
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type ColumnTypes = Exclude<TableProps['columns'], undefined>;

export default function FormParams(): JSX.Element {
  const { params, setUrl } = useURL();
  const [dataSource, setDataSource] = useState<DataType[]>(params);
  const [count, setCount] = useState(dataSource?.length || 0);
  const { t } = useContext(LanguageContext);

  const handleDelete = (key: React.Key): void => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    setUrl({ newParams: newData });
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: t.key,
      dataIndex: 'keyName',
      width: '30%',
      editable: true,
    },
    {
      title: t.value,
      dataIndex: 'keyValue',
      width: '30%',
      editable: true,
    },
    {
      title: '-',
      dataIndex: 'operation',
      align: 'center',
      width: '1%',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <>
            <Button
              shape="circle"
              onClick={() => handleDelete(record.key)}
              type="default"
              size="small"
              style={{ marginBottom: 16 }}
            >
              -
            </Button>
          </>
        ) : null,
    },
  ];

  const handleAdd = (): void => {
    const nextKey = Number(count) + 1;
    const newData: DataType = { ...initialParams, key: nextKey };
    setDataSource([...dataSource, newData]);
    setCount(nextKey);
  };

  const handleSave = (row: DataType): void => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setUrl({ newParams: newData });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <>
      <Flex vertical={true} style={{ maxWidth: '40em' }}>
        <Table
          size="small"
          components={components}
          rowClassName={styles.editableRow}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
          pagination={false}
        />
        <Button
          onClick={handleAdd}
          type="primary"
          size="small"
          style={{ marginBottom: 16 }}
        >
          {t.add}
        </Button>
      </Flex>
    </>
  );
}
