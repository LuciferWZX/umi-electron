import React, { FC, memo } from 'react';
import { StyledBasicLayout, StyledContent } from '@/layouts/basicLayout/style';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import TopHeader from '@/layouts/basicLayout/header';
import LeftSider from '@/layouts/basicLayout/sider';
import { withRouter } from 'umi';
import { RouteComponentProps } from 'react-router';
const ANIMATION_MAP: any = {
  PUSH: 'forward',
  POP: 'back',
};
interface IProps extends RouteComponentProps {}
const BasicLayout: FC<IProps> = ({ children, location, history }) => {
  return (
    <StyledBasicLayout style={{ height: '100vh' }}>
      <TopHeader />
      <StyledBasicLayout>
        <LeftSider />
        <StyledContent>
          <TransitionGroup
            style={{ height: '100%' }}
            childFactory={(child: any) =>
              React.cloneElement(child, {
                classNames: ANIMATION_MAP[history.action],
              })
            }
          >
            <CSSTransition key={location.pathname} timeout={300}>
              {children}
            </CSSTransition>
          </TransitionGroup>
        </StyledContent>
      </StyledBasicLayout>
    </StyledBasicLayout>
  );
};
export default memo(withRouter(BasicLayout));
