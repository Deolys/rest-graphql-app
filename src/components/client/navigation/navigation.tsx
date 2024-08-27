import { Menu, type MenuProps } from 'antd';
import {
  type Dispatch,
  type JSX,
  type SetStateAction,
  useContext,
} from 'react';

import { LanguageContext } from '@/providers/language';
import type { ClientTab } from '@/types/client';

type MenuItem = Required<MenuProps>['items'][number];
type Props = {
  tabs: ClientTab[];
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
};

export function Navigation({
  tabs,
  setCurrentTab,
  currentTab,
}: Props): JSX.Element {
  const { t } = useContext(LanguageContext);

  const items: MenuItem[] = tabs.map((item) => ({
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
