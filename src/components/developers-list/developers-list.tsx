import { CrownOutlined, Html5Outlined, SmileOutlined } from '@ant-design/icons';
import { Avatar, List } from 'antd';
import { useContext } from 'react';
import { type JSX } from 'react';

import { developersList } from '@/constants/coders';
import { LanguageContext } from '@/providers/language';

const Icons = [
  <Html5Outlined key="Html5Outlined" />,
  <SmileOutlined key="SmileOutlined" />,
  <CrownOutlined key="CrownOutlined" />,
];

export function DevelopersList(): JSX.Element {
  const { t } = useContext(LanguageContext);

  return (
    <List
      itemLayout="horizontal"
      dataSource={developersList}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index + 3}`}
                alt={t[item.name]}
                size={80}
              />
            }
            title={
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {t[item.name]} {Icons[index]}
              </a>
            }
            description={
              <p
                style={{
                  color: '#373737',
                }}
              >
                {t[item.description]}
              </p>
            }
          />
        </List.Item>
      )}
    />
  );
}
