import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Typography,
  Space,
  Popconfirm,
} from "antd";
import { ColumnsType } from "antd/es/table";

const { Option } = Select;
import React, { useState } from "react";
import { useEffect } from "react";
import CustomTable from "src/components/CustomTable";
import useNotify from "src/hooks/useNotify";
import AdminLayout from "src/layouts/admin";
import { NextPageWithLayout } from "src/types/app.interfaces";

const { Title } = Typography;

interface DataType {
  id: number;
  name: string;
  city: string;
  address: string;
  responsable: string;
}

const AdminBranchPage: NextPageWithLayout = () => {
  //supabase
  const supabase = useSupabaseClient();
  //
  const columnsD: ColumnsType<DataType> = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ciudad",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Direccion",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Responsable",
      key: "responsable",
      dataIndex: "responsable",
    },
    {
      title: "Acciones",
      key: "action",
      render: (_, record) => {
        return (
          <Space>
            <>
              <Popconfirm
                title="Estas seguro de eliminar esta sucursal?"
                onConfirm={async () => {
                  const { error } = await supabase
                    .from("branch")
                    .delete()
                    .eq("id", record.id);
                  if (!error) {
                    toast("success", { message: "Sucursal eliminada" });
                  } else {
                    toast("error", { message: error?.message });
                  }
                }}
                okText="SI"
                cancelText="NO"
              >
                <Button danger>Eliminar</Button>
              </Popconfirm>
            </>
          </Space>
        );
      },
    },
  ];
  //form
  const [form] = Form.useForm();
  // toast
  const { toast } = useNotify();
  //modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const handleOk = async () => {
    try {
      // form
      await form.validateFields();
      const values = form.getFieldsValue();
      form.resetFields();
      // loading
      setConfirmLoading(true);
      // service consume
      try {
        const { status, error } = await supabase.from("branch").insert({
          city: values.address.city,
          address: values.address.street,
          name: values.name,
          responsable: values.namePerson,
        });
        if (status === 200 || status === 201)
          toast("success", { message: "Sucursal añadida" });
        else toast("error", { message: error?.message });
      } catch (error) {
        toast("error", { message: "Error al crear la sucursal" });
      } finally {
        setOpen(false);
        setConfirmLoading(false);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  // get branchs
  const [branchs, setBranchs] = useState<DataType>();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("branch").select("*");
      setBranchs(data as any);
    })();
  }, [supabase]);

  return (
    <AdminLayout>
      <>
        <div className="flex items-center justify-between">
          <Title>Tabla Sucursales</Title>
          <>
            <Button type="primary" onClick={showModal}>
              Crear sucursal
            </Button>
            <Modal
              title="Crear sucursal"
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <Form form={form} layout="vertical" name="complex-form">
                <Form.Item label="Nombre de la sucursal">
                  <Form.Item
                    name="name"
                    noStyle
                    rules={[
                      { required: true, message: "Nombre sucursal requerido" },
                    ]}
                  >
                    <Input placeholder="Ingresa el nombre de la sucursal" />
                  </Form.Item>
                </Form.Item>
                <Form.Item label="Direccion">
                  <Input.Group compact>
                    <Form.Item
                      name={["address", "city"]}
                      noStyle
                      rules={[
                        { required: true, message: "Ciudad es requerida" },
                      ]}
                    >
                      <Select
                        placeholder="Ej: medellin"
                        style={{ width: "50%" }}
                      >
                        <Option value="Cali">Cali</Option>
                        <Option value="Medellin">Medellin</Option>
                        <Option value="Bogota">Bogotá</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name={["address", "street"]}
                      noStyle
                      rules={[
                        { required: true, message: "direccion es requerida" },
                      ]}
                    >
                      <Input
                        style={{ width: "50%" }}
                        placeholder="Input street"
                      />
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
                <Form.Item label="Nombre del responsable">
                  <Form.Item
                    name="namePerson"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Nombre del responsable requerido",
                      },
                    ]}
                  >
                    <Input placeholder="Ingresa el nombre del responsable" />
                  </Form.Item>
                </Form.Item>
              </Form>
            </Modal>
          </>
        </div>

        <CustomTable columns={columnsD} data={branchs || ([] as any)} />
      </>
    </AdminLayout>
  );
};

AdminBranchPage.auth = true;

export default AdminBranchPage;
