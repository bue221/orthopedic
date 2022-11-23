import React, { useState } from "react";
import {
  Typography,
  Button,
  Card,
  DatePicker,
  Form,
  Modal,
  Select,
} from "antd";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useNotify from "src/hooks/useNotify";

const { Meta } = Card;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title } = Typography;

const rangeConfig = {
  rules: [
    { type: "array" as const, required: true, message: "Please select time!" },
  ],
};

const CardProduct: React.FC<any> = ({
  photo,
  name,
  id,
  description,
  price,
  branchs,
}) => {
  // form
  const [form] = Form.useForm();
  //
  const supabase = useSupabaseClient();
  //
  const { toast } = useNotify();
  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      // form
      await form.validateFields();
      const values: any = form.getFieldsValue();
      form.resetFields();
      // loading
      setConfirmLoading(true);
      // service consume
      try {
        const rangeValue = values["range-picker"];

        const { status, error } = await supabase.from("rent").insert({
          branchDeliver: values.branchDeliver,
          branchPick: values.branchPick,
          start_date: rangeValue[0].format("YYYY-MM-DD"),
          end_date: rangeValue[1].format("YYYY-MM-DD"),
          product: id,
          price:
            Math.abs(
              new Date(rangeValue[0].format("YYYY-MM-DD")).getDay() -
                new Date(rangeValue[1].format("YYYY-MM-DD")).getDay()
            ) * price,
        });
        if (status === 200 || status === 201) {
          toast("success", {
            message: "Renta añadido",
            description:
              "Sera dirigido al metodo de pago en unos segundos si no cancela la renta se cancelara en 24 horas",
          });
          await supabase
            .from("product")
            .update({
              avaliable: false,
            })
            .eq("id", id);
          setTimeout(
            () =>
              window.open(
                "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app/v4?k=8cd281ee23da3001676eaead61702526#/co/payment",
                "_blank"
              ),
            1000
          );
        } else toast("error", { message: error?.message });
      } catch (error) {
        toast("error", { message: "Error al rentar el Producto" });
      } finally {
        setIsModalOpen(false);
        setConfirmLoading(false);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleCancel = () => setIsModalOpen(false);

  //
  const rangeValue = Form.useWatch("range-picker", form);

  return (
    <>
      <Card
        style={{ width: 300 }}
        cover={
          // eslint-disable-next-line @next/next/no-img-element
          <img alt={name} src={photo} />
        }
        actions={[
          <Button key="1" type="dashed" className="mx-2" onClick={showModal}>
            Rentar producto
          </Button>,
        ]}
      >
        <Meta title={name} description={description} />
        <p className="mt-3">
          {price?.toLocaleString("co-ES", {
            style: "currency",
            currency: "COP",
          })}
        </p>
      </Card>
      <Modal
        title="Reservar producto"
        open={isModalOpen}
        confirmLoading={confirmLoading}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} name="time_related_controls">
          <Form.Item
            name="range-picker"
            label="Seleccione el tiempo de uso"
            {...rangeConfig}
          >
            <RangePicker />
          </Form.Item>
          <Form.Item label="Sucursal de recogida">
            <Form.Item
              name={"branchPick"}
              noStyle
              rules={[{ required: true, message: "Sucursal es requerida" }]}
            >
              <Select>
                {branchs?.map((i: any) => (
                  <Option value={i.id} key={i.id}>
                    {i.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form.Item>
          <Form.Item label="Sucursal de entrega">
            <Form.Item
              name={"branchDeliver"}
              noStyle
              rules={[{ required: true, message: "Sucursal es requerida" }]}
            >
              <Select>
                {branchs?.map((i: any) => (
                  <Option value={i.id} key={i.id}>
                    {i.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form.Item>
        </Form>
        <Title color="danger">
          {rangeValue &&
            (
              Math.abs(rangeValue[0].$D - rangeValue[1].$D) * price
            )?.toLocaleString("co-ES", {
              style: "currency",
              currency: "COP",
            })}
        </Title>
        {/* <form
          method="post"
          action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/"
        >
          <input name="merchantId" type="hidden" value="508029" />
          <input name="accountId" type="hidden" value="512321" />
          <input name="description" type="hidden" value="Test PAYU" />
          <input name="referenceCode" type="hidden" value="TestPayU" />
          <input name="amount" type="hidden" value="20000" />
          <input name="tax" type="hidden" value="3193" />
          <input name="taxReturnBase" type="hidden" value="16806" />
          <input name="currency" type="hidden" value="COP" />
          <input
            name="signature"
            type="hidden"
            value="7ee7cf808ce6a39b17481c54f2c57acc"
          />
          <input name="test" type="hidden" value="0" />
          <input name="buyerEmail" type="hidden" value="test@test.com" />
          <input
            name="responseUrl"
            type="hidden"
            value="http://www.test.com/response"
          />
          <input
            name="confirmationUrl"
            type="hidden"
            value="http://www.test.com/confirmation"
          />
          <input name="Submit" type="submit" value="Send" />
        </form> */}
      </Modal>
    </>
  );
};

export default CardProduct;
