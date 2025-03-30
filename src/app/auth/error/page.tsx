"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AuthErrorComponent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return <div>Error: {error}</div>;
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorComponent />
    </Suspense>
  );
}
