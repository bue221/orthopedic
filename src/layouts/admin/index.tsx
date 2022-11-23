import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
import { supabase } from "@supabase/auth-ui-react/dist/esm/common/theming";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const supabase = useSupabaseClient();

  return (
    <div className="h-screen">
      <Layout className="h-screen">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            // selectedKeys={["1", "2", "3", "4"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: <div onClick={() => router.push("/admin/")}>Inicio</div>,
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: (
                  <div onClick={() => router.push("/admin/products")}>
                    Productos
                  </div>
                ),
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: (
                  <div onClick={() => router.push("/admin/branchs")}>
                    Sucursales
                  </div>
                ),
              },
              {
                key: "5",
                icon: <UploadOutlined />,
                label: (
                  <div onClick={() => router.push("/admin/deliver")}>
                    Recibir un producto
                  </div>
                ),
              },
              {
                key: "4",
                // type: "divider",
                label: (
                  <div onClick={async () => await supabase.auth.signOut()}>
                    Cerar sesión
                  </div>
                ),
                danger: true,
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
