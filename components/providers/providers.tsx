"use client";

import { makeStore } from "@/store/store";
import { Provider } from "react-redux";
import { useState } from "react";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  const [store] = useState(() => makeStore());
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
}
