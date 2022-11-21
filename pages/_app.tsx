import { useState } from "react";
// tailwindcss
import "styles/globals.css";
// antd
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import esES from "antd/locale/es_ES";
// supabase
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
//
import { MyAppProps } from "src/types/app.interfaces";
import WrapperAuth from "src/components/auth/wrapper";
//

export default function App({ Component, pageProps }: MyAppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  // layouts
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <ConfigProvider
        locale={esES}
        theme={{
          token: {
            colorPrimary: "#00b96b",
          },
        }}
      >
        {getLayout(
          Component.auth ? (
            <WrapperAuth>
              <Component {...pageProps} />
            </WrapperAuth>
          ) : (
            <Component {...pageProps} />
          )
        )}
      </ConfigProvider>
    </SessionContextProvider>
  );
}
