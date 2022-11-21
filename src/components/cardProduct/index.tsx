import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";

const { Meta } = Card;

const CardProduct: React.FC<any> = ({ photo, name, description, price }) => (
  <Card
    style={{ width: 300 }}
    cover={
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={name} src={photo} />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
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
);

export default CardProduct;
