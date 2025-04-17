import Header from "@/components/general/Header";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Header />
      {children}
    </div>
  );
}
