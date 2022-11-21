import { useSession } from "@supabase/auth-helpers-react";
import { Button, Col, Row, Statistic, Typography, Card } from "antd";
import React from "react";
import AdminLayout from "src/layouts/admin";
import { NextPageWithLayout } from "src/types/app.interfaces";
import {
  LikeOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const AdminIndexPage: NextPageWithLayout = () => {
  const session = useSession();
  return (
    <AdminLayout>
      <>
        <Title>Hola {session?.user.user_metadata.names}!</Title>
        <Title className="text-center" level={4}>
          Estas son las metricas de El buen samaritano
        </Title>
        <div className="mt-8">
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Active"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Idle"
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: "#cf1322" }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="Active Users" value={112893} />
            </Col>
            <Col span={12}>
              <Statistic
                title="Account Balance (CNY)"
                value={112893}
                precision={2}
              />
              <Button style={{ marginTop: 16 }} type="primary">
                Recharge
              </Button>
            </Col>
            <Col span={12}>
              <Statistic title="Active Users" value={112893} />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Statistic
                title="Feedback"
                value={1128}
                prefix={<LikeOutlined />}
              />
            </Col>
            <Col span={12}>
              <Statistic title="Unmerged" value={93} suffix="/ 100" />
            </Col>
          </Row>
        </div>
      </>
    </AdminLayout>
  );
};

AdminIndexPage.auth = true;

export default AdminIndexPage;
