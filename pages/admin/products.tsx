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
  InputNumber,
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
  branch: any;
  price: number;
  avaliable: boolean;
  category: string;
  photo: string;
  description: string;
}

const AdminProductsPage: NextPageWithLayout = () => {
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
      title: "Descripcion",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Categoria",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
      render: (_, record) => {
        return (
          <>
            {record.price?.toLocaleString("co-ES", {
              style: "currency",
              currency: "COP",
            })}
          </>
        );
      },
    },
    {
      title: "Sucursal",
      key: "branch",
      dataIndex: "branch",
      render: (_, record) => <>{record.branch.name}</>,
    },
    {
      title: "Acciones",
      key: "action",
      render: (_, record) => {
        return (
          <Space>
            <>
              <Popconfirm
                title="Estas seguro de eliminar este producto?"
                onConfirm={async () => {
                  const { error } = await supabase
                    .from("products")
                    .delete()
                    .eq("id", record.id);
                  if (!error) {
                    toast("success", { message: "Producto eliminado" });
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
        const { status, error } = await supabase.from("product").insert({
          ...values,
        });
        if (status === 200 || status === 201)
          toast("success", { message: "Producto añadido" });
        else toast("error", { message: error?.message });
      } catch (error) {
        toast("error", { message: "Error al crear la Producto" });
      } finally {
        setOpen(false);
        setConfirmLoading(false);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  // get products
  const [products, setProducts] = useState<DataType[]>();
  const [branchs, setBranchs] = useState<any[]>();

  useEffect(() => {
    (async () => {
      const { data: branchRes } = await supabase.from("branch").select("*");
      setBranchs(branchRes as any);
      const { data } = await supabase
        .from("product")
        .select("*, branch!inner(*)");
      setProducts(data as any);
    })();
  }, [supabase, open]);

  return (
    <AdminLayout>
      <>
        <div className="flex items-center justify-between">
          <Title>Tabla Productos</Title>
          <>
            <Button type="primary" onClick={showModal}>
              Crear producto
            </Button>
            <Modal
              title="Crear producto"
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <Form form={form} layout="vertical" name="complex-form">
                <Form.Item label="Nombre del producto">
                  <Form.Item
                    name="name"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Nombre del producto requerido",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Form.Item>
                <Form.Item label="Descripcion del producto">
                  <Form.Item
                    name="description"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Descripcion del producto requerido",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Form.Item>
                <Form.Item label="Url de foto del producto">
                  <Form.Item
                    name="photo"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Url de foto del producto requerido",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Form.Item>
                <Form.Item label="Precio del producto">
                  <Form.Item
                    name="price"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Precio del producto requerido",
                      },
                    ]}
                  >
                    <InputNumber className="w-full" />
                  </Form.Item>
                </Form.Item>
                <Form.Item label="Sucursal">
                  <Form.Item
                    name={"branch"}
                    noStyle
                    rules={[
                      { required: true, message: "Sucursal es requerida" },
                    ]}
                  >
                    <Select>
                      {branchs?.map((i) => (
                        <Option value={i.id} key={i.id}>
                          {i.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Form.Item>
                <Form.Item label="Categoria">
                  <Form.Item
                    name={"category"}
                    noStyle
                    rules={[
                      { required: true, message: "Categoria es requerida" },
                    ]}
                  >
                    <Select>
                      {[
                        "Rodilleras",
                        "Tobillo",
                        "Muñequeras",
                        "Coderas",
                        "Hombro",
                        "Funcionales",
                        "Fajas",
                        "Cervicales y clavícula",
                        "Espaldillas",
                        "Posquirúrgico ortesis",
                      ]?.map((i, index) => (
                        <Option value={i} key={index}>
                          {i}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Form.Item>
              </Form>
            </Modal>
          </>
        </div>

        <CustomTable columns={columnsD} data={products || ([] as any)} />
      </>
    </AdminLayout>
  );
};

AdminProductsPage.auth = true;

export default AdminProductsPage;
