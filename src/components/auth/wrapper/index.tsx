import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const WrapperAuth: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [globalSession, setGlobalSession] = useState<any>(null);
  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setGlobalSession(session);
      if (!session) router?.push("/auth/login");
    })();
  }, [globalSession, router, supabase.auth]);

  return globalSession !== null ? children : <></>;
};

export default WrapperAuth;
