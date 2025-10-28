import React from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
  return <div>{children}</div>;
}

export default AdminLayout;
