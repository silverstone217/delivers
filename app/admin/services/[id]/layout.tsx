import ServiceTabs from "@/components/admin/services/ServiceTabs";
import { ReactNode, Suspense } from "react";

export default async function Servicelayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="w-full">
      <ServiceTabs serviceId={id} />
      <Suspense fallback={<p>Chargement...</p>}>
        <main className="pt-4">{children}</main>
      </Suspense>
    </div>
  );
}
