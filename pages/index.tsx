import { Badge, Carousel, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import CardProduct from "src/components/cardProduct";
import useNotify from "src/hooks/useNotify";
import CommonLayout from "src/layouts/common";
import { NextPageWithLayout } from "src/types/app.interfaces";

const { Text } = Typography;

const Home: NextPageWithLayout = () => {
  const { toast } = useNotify();

  const contentStyle: React.CSSProperties = {
    height: "400px",
    color: "#fff",
    lineHeight: "400px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <div className="relative">
      <CommonLayout>
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
            <CardProduct key={i} />
          ))}
        </div>
        <div className="fixed top-56 right-0 p-4 bg-white shadow-xl rounded-l-full flex gap-2 cursor-pointer hover:shadow-2xl">
          <ShoppingCartOutlined />
          <Badge count={5}>
            <Text strong>Carrito de compras</Text>
          </Badge>
        </div>
      </CommonLayout>
    </div>
  );
};

Home.auth = true;

export default Home;
