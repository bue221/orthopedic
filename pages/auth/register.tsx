import { Button, Typography, Form, Input, Select, InputNumber } from "antd";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useNotify from "src/hooks/useNotify";
import Link from "next/link";

const { Title } = Typography;
const { Option } = Select;

const Register = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { toast } = useNotify();

  const onFinish = async (values: any) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      phone: values.phone ?? "",
      options: {
        data: {
          role: 2,
          document: values.document,
          typeDocument: values.typeDocument,
          workActiviy: values.work,
          names: values.names,
        },
      },
    });

    if (user && !error) {
      router.push("/");
      toast("success", { message: "Registro exitoso" });
    }
    if (error) {
      toast("error", { message: "Error durante el registro!" });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    toast("error", { message: errorInfo });
    // console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col gap-8 mt-4">
      <Title>Registrate</Title>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nombres"
          name="names"
          rules={[
            { required: true, message: "Por favor ingresa tus nombres!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Trabajo"
          name="work"
          rules={[
            {
              required: true,
              message: "Por favor ingresa su actividad laboral!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Telefono"
          name="phone"
          rules={[
            {
              required: true,
              message: "Por favor ingresa su telefono!",
            },
            {
              type: "integer",
              warningOnly: true,
            },
          ]}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          name="typeDocument"
          label="Tipo "
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Selecciona tu tipo de documento"
            // onChange={onGenderChange}
            allowClear
          >
            <Option value="CC">Cedula de ciudadania</Option>
            <Option value="NIT">NIT</Option>
          </Select>
        </Form.Item>
        <Form.Item
          className="w-full"
          label="documento"
          name="document"
          rules={[
            { required: true, message: "Por favor ingresa tu documento!" },
            { type: "number", warningOnly: true },
          ]}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Correo"
          name="email"
          rules={[
            { required: true, message: "Por favor ingresa un email!" },
            {
              type: "email",
              warningOnly: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" className="w-full">
            Registrarse
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Link href="/auth/login">Ya tienes cuenta? Inicia sesión</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
