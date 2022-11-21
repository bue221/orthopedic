import { useSession } from "@supabase/auth-helpers-react";
import { Typography } from "antd";
import React from "react";
import CustomTable from "src/components/CustomTable";
import AdminLayout from "src/layouts/admin";
import { NextPageWithLayout } from "src/types/app.interfaces";

const { Title } = Typography;

const AdminIndexPage: NextPageWithLayout = () => {
  const session = useSession();
  return (
    <AdminLayout>
      <>
        <Title>Hola {session?.user.user_metadata.names}!</Title>
        <CustomTable />
      </>
    </AdminLayout>
  );
};

AdminIndexPage.auth = true;

export default AdminIndexPage;
