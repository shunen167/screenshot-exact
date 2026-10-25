import { useEffect } from "react";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { RequireAuth } from "@/components/RequireAuth";
import Index from "@/pages/Index";
import AuthPage from "@/pages/Auth";
import AppPage from "@/pages/AppPage";
import NotFound from "@/pages/NotFound";

// Old Lovable links used /auth?mode=signup; send them to the new routes.
function LegacyAuthRedirect() {
  const [params] = useSearchParams();
  return <Navigate to={params.get("mode") === "signup" ? "/sign-up" : "/sign-in"} replace />;
}

export default function App() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "USER_UPDATED") queryClient.invalidateQueries();
    });
    return () => data.subscription.unsubscribe();
  }, [queryClient]);

  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/sign-in" element={<AuthPage mode="signin" />} />
      <Route path="/sign-up" element={<AuthPage mode="signup" />} />
      <Route path="/auth" element={<LegacyAuthRedirect />} />
      <Route element={<RequireAuth />}>
        <Route path="/app" element={<AppPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
