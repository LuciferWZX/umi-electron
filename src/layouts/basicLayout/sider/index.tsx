import React, { FC, memo } from 'react';
import { StyledSider } from '@/layouts/basicLayout/sider/style';
import { Menu } from 'antd';
import { history } from 'umi';
import { useDispatch, useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import MyIcon from '@/components';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import { Pathname } from '@/types/common.enum';
import UserInfoBox from '@/layouts/basicLayout/sider/UserInfoBox';
const LeftSider: FC = () => {
  const { leftSiderScroll, currentPath } = useSelector(
    (state: ConnectState) => state.layout,
    (left, right) => {
      return (
        left.leftSiderScroll === right.leftSiderScroll &&
        left.currentPath === right.currentPath
      );
    },
  );

  /**
   * todo
   * 处理点击菜单事件
   * @param e
   */
  const handleMenu: MenuClickEventHandler = (e): void => {
    const { key } = e;
    if (currentPath !== key) {
      history.push(key as string);
    }
  };
  const handleRenderDefaultOpenKeys = (): Pathname[] => {
    if (
      [Pathname.projectUnderway, Pathname.projectCompleted].includes(
        currentPath,
      )
    ) {
      return [Pathname.project];
    }
    return [];
  };
  return (
    <StyledSider
      trigger={null}
      collapsible
      collapsedWidth={0}
      collapsed={leftSiderScroll}
    >
      <UserInfoBox />
      <Menu
        className={'left-menu'}
        onClick={handleMenu}
        selectedKeys={[currentPath]}
        theme="light"
        mode="inline"
        defaultOpenKeys={handleRenderDefaultOpenKeys()}
      >
        <Menu.Item key={Pathname.home} icon={<MyIcon type={'icon-ai-home'} />}>
          首页
        </Menu.Item>
        <Menu.Item
          key={Pathname.information}
          icon={<MyIcon type={'icon-xinxi'} />}
        >
          信息管理
        </Menu.Item>
        <Menu.SubMenu
          key={Pathname.project}
          icon={<MyIcon type={'icon-xiangmu1'} />}
          title="项目管理"
        >
          <Menu.Item
            key={Pathname.projectUnderway}
            icon={<MyIcon type={'icon-ingcaoche'} />}
          >
            在建项目
          </Menu.Item>
          <Menu.Item
            key={Pathname.projectCompleted}
            icon={<MyIcon type={'icon-wanchenggongzuo'} />}
          >
            以建项目
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </StyledSider>
  );
};
export default memo(LeftSider);
