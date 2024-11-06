"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
type Props = {
  children: React.ReactNode;
};

const ReactQueryProvider = (props: Props) => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>{props.children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
