/* eslint-disable @next/next/no-img-element */
import { Badge, Carousel, Skeleton, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import CardProduct from "src/components/cardProduct";
import useNotify from "src/hooks/useNotify";
import CommonLayout from "src/layouts/common";
import { NextPageWithLayout } from "src/types/app.interfaces";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

const { Image } = Skeleton;

const { Text } = Typography;

const Home: NextPageWithLayout = () => {
  const { toast } = useNotify();

  //supabase
  const supabase = useSupabaseClient();
  // get products
  const [products, setProducts] = useState<any[]>();
  const [branchs, setBranchs] = useState<any[]>();
  useEffect(() => {
    (async () => {
      const { data: branchRes } = await supabase.from("branch").select("*");
      setBranchs(branchRes as any);
      const { data } = await supabase
        .from("product")
        .select("*, branch!inner(*)")
        .eq("avaliable", true);
      setProducts(data as any);
    })();
  }, [supabase]);

  return (
    <div className="relative">
      <CommonLayout>
        <Carousel autoplay>
          {products ? (
            products.slice().map((i) => (
              <div key={i.id}>
                <img
                  src={i.photo}
                  className="rounded-xl object-center"
                  height={400}
                  width="100%"
                  alt={i.name}
                />
              </div>
            ))
          ) : (
            <Image style={{ height: "400px", width: "100%" }} />
          )}
        </Carousel>
        <div className="flex flex-wrap items-center justify-center gap-8 mt-4">
          {products?.map((i) => (
            <CardProduct key={i.id} branchs={branchs} {...i} />
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
