import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <Skeleton className="h-40 w-full rounded-2xl" />
        <div className="responsive-card-grid">
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
        </div>
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    </main>
  );
}
