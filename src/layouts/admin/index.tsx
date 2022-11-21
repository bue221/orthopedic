import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen">
      <Layout className="h-screen">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "nav 1",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "nav 2",
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "nav 3",
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div className="trigger" onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              overflow: "auto",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
      <style jsx>{`
        .anticon {
          color: white !important;
        }
        .trigger {
          padding: 0 24px;
          font-size: 18px;
          line-height: 64px;
          cursor: pointer;
          transition: color 0.3s;
          color: white !important;
        }

        .trigger:hover {
          color: #1890ff;
        }

        .logo {
          height: 32px;
          margin: 16px;
          background: rgba(255, 255, 255, 0.3);
        }

        .site-layout .site-layout-background {
          background: #fff;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
