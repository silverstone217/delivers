import React from "react";

interface UsersLayoutProps {
  children: React.ReactNode;
}

async function UsersLayout({ children }: UsersLayoutProps) {
  return <div>{children}</div>;
}

export default UsersLayout;
