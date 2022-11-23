import React from "react";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const { Header, Content, Footer } = Layout;

const CommonLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const supabase = useSupabaseClient();

  return (
    <>
      <Layout className="layout">
        <Header title="logo">
          <div className="logo"></div>
          <Menu
            theme="dark"
            mode="horizontal"
            className="flex justify-end"
            items={[
              { key: "1", label: "Inicio", onClick: () => router.push("/") },
              {
                key: "2",

                label: "Calendario",
                onClick: () => router.push("/calendar"),
              },
              {
                key: "3",
                label: "Contactanos",
                onClick: () => router.push("/"),
              },
              {
                key: "4",
                label: (
                  <div onClick={async () => await supabase.auth.signOut()}>
                    Cerar sesión
                  </div>
                ),
                danger: true,
              },
            ]}
          />
        </Header>
        <Content className="p-4 lg:p-8">
          <div
            className="site-layout-content p-24 sm:p-0"
            style={{ minHeight: "100vh" }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ortopedicos ©2022</Footer>
      </Layout>
      <style jsx>{`
      .site-layout-content {
        margin-top: 10px;
        min-height: 280px;
        padding: 24px;
        background: #fff;
      }
      .logo {
        float: left;
        width: 120px;
        height: 31px;
        margin: 16px 24px 16px 0;
        background: rgba(255, 255, 255, 0.3);
      }
      .ant-row-rtl .logo {
        float: right;
        margin: 16px 0 16px 24px;

    `}</style>
    </>
  );
};

export default CommonLayout;
