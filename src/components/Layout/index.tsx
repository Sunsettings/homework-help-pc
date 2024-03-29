import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import { Link, useNavigate, useOutlet } from 'react-router-dom';
import { AUTH_TOKEN } from '@/utils/constants';
import { useUserContext } from '@/hooks/userHooks';
import { ROUTE_KEY, routes } from '@/routes/menus';
import { useGoTo, useIsOrgRoute } from '@/hooks';
import { LogoutOutlined, ShopOutlined } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import OrgSelect from '@/components/OrgSelect/index';
import style from './index.module.less';

const menuItemRender = (
  item: MenuDataItem,
  dom: React.ReactNode,
) => <Link to={item.path || '/'}>{dom}</Link>;

/**
* 外层框架
*/

const Layout = () => {
  const outlet = useOutlet();
  const { store } = useUserContext();
  const isOrg = useIsOrgRoute();
  const nav = useNavigate();
  const { go } = useGoTo();

  const logoutHandler = () => {
    sessionStorage.setItem(AUTH_TOKEN, '');
    localStorage.setItem(AUTH_TOKEN, '');
    nav('/login');
  };

  const goToOrg = () => {
    go(ROUTE_KEY.ORG);
  };
  return (
    <ProLayout
      layout="mix"
      siderWidth={150}
      avatarProps={{
        src: store.avatar || null,
        title: store.name,
        size: 'small',
        onClick: () => go(ROUTE_KEY.MY),
      }}
      links={[
        <Space size={20} onClick={logoutHandler}>
          <LogoutOutlined />
          退出
        </Space>,
      ]}
      title={false}
      logo={<img src="http://homework-drop-assets.oss-cn-beijing.aliyuncs.com/images/logo.png" alt="logo" />}
      className={style.container}
      onMenuHeaderClick={() => nav('/')}
      route={{
        path: '/',
        routes,
      }}
      actionsRender={() => [
        !isOrg && <OrgSelect />,
        <Tooltip title="门店管理">
          <ShopOutlined onClick={goToOrg} />
        </Tooltip>,
      ]}
      menuItemRender={menuItemRender}
    >
      <div key={store.currentOrg}>
        {outlet}
      </div>
    </ProLayout>
  );
};

export default Layout;
