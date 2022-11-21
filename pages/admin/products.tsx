import { useSession } from "@supabase/auth-helpers-react";
import { Button, Modal, Typography } from "antd";
import React, { useState } from "react";
import CustomTable from "src/components/CustomTable";
import AdminLayout from "src/layouts/admin";
import { NextPageWithLayout } from "src/types/app.interfaces";

const { Title } = Typography;

const AdminProductsPage: NextPageWithLayout = () => {
  const session = useSession();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <AdminLayout>
      <>
        <Title>Tabla Productos</Title>
        <>
          <Button type="primary" onClick={showModal}>
            Open Modal with async logic
          </Button>
          <Modal
            title="Title"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <p>{modalText}</p>
          </Modal>
        </>
        <CustomTable />
      </>
    </AdminLayout>
  );
};

AdminProductsPage.auth = true;

export default AdminProductsPage;
