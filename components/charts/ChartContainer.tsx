import type { ReactNode } from "react";
import { Card, CardHeader } from "@/components/ui/Card";

export function ChartContainer({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Card>
      <CardHeader title={title} description={description} />
      <div className="h-80 w-full">{children}</div>
    </Card>
  );
}
