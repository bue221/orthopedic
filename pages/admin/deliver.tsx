import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button, Form, Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import AdminLayout from "src/layouts/admin";
import { NextPageWithLayout } from "src/types/app.interfaces";

const { Title } = Typography;
const { Option } = Select;

const AdminIndexPage: NextPageWithLayout = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  //supabase
  const supabase = useSupabaseClient();
  // get products
  const [products, setProducts] = useState<any[]>();
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("product")
        .select("*, branch!inner(*)")
        .eq("avaliable", false);
      setProducts(data as any);
    })();
  }, [supabase]);

  return (
    <AdminLayout>
      <>
        <Title className="text-center">Entrega de productos</Title>
        <Form layout="vertical" name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="product"
            label="Seleccionar producto"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              placeholder="Select a option and change input text above"
              allowClear
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={products?.map((i) => ({
                value: i.id,
                label: `${i.name}-${i.branch.name}-${i.id}`,
              }))}
            />
          </Form.Item>

          <Form.Item>
            <Button htmlType="button">Devolucion del producto</Button>
            <Button danger htmlType="button">
              Cancelar reserva
            </Button>
          </Form.Item>
        </Form>
      </>
    </AdminLayout>
  );
};

AdminIndexPage.auth = true;

export default AdminIndexPage;
