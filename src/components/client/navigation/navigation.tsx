import type { JSX } from 'react';
import { Menu } from 'antd';
import { MenuProps } from 'antd';
import { clientMenu } from '@/constants/client';
import { Dispatch, SetStateAction } from 'react';

type MenuItem = Required<MenuProps>['items'][number];
type Props = {
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
};

export function Navigation({ setCurrentTab, currentTab }: Props): JSX.Element {
  const items: MenuItem[] = clientMenu;
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
