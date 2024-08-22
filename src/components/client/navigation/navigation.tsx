import { Menu, MenuProps } from 'antd';
import { clientMenu } from '@/constants/client';
import { Dispatch, SetStateAction, useContext } from 'react';
import { LanguageContext } from '@/providers/language';

type MenuItem = Required<MenuProps>['items'][number];
type Props = {
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
};

export function Navigation({ setCurrentTab, currentTab }: Props): JSX.Element {
  const { t } = useContext(LanguageContext);

  const items: MenuItem[] = clientMenu.map((item) => ({
    ...item,
    label: t[item.key],
  }));

  const onClick: MenuProps['onClick'] = (e) => setCurrentTab(e.key);

  return (
    <Menu
      mode="horizontal"
      items={items}
      selectedKeys={[currentTab]}
      onClick={onClick}
    />
  );
}
