import { Button, Typography, Form, Input } from "antd";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useNotify from "src/hooks/useNotify";
import Link from "next/link";

const { Title } = Typography;

const LoginPage = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { toast } = useNotify();

  const onFinish = async (values: any) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (user && !error) {
      router.push("/");
      toast("success", { message: `Bienvenido ${user.user_metadata.names}!` });
    }
    if (error) {
      toast("error", { message: error.message });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    toast("error", { message: errorInfo });
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col gap-8">
      <Title>Inicia sesión</Title>
      <Form
        layout="vertical"
        name="basic"
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
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
            Iniciar sesión
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Link href="/auth/register">No tienes cuenta? Registrate</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
