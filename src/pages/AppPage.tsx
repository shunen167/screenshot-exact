import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { useAuthUser } from "@/components/RequireAuth";

export default function AppPage() {
  const user = useAuthUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate("/sign-in", { replace: true });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <title>Dashboard — Flight Price Notifier</title>
      <meta name="description" content="Your flight route tracking dashboard." />
      <meta property="og:title" content="Dashboard — Flight Price Notifier" />
      <meta property="og:description" content="Your flight route tracking dashboard." />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <SiteHeader right={<Button variant="outline" size="sm" onClick={signOut}>Sign out / 登出</Button>} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-20">
        <div className="animate-fade-up rounded-2xl border border-border bg-card p-8 sm:p-12">
          <h1 className="text-3xl font-bold break-all">Hi {user.email}</h1>
          <p className="mt-4 text-lg">你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。</p>
          <p className="mt-2 text-muted-foreground">Your dashboard is coming soon. Route-subscription will be added in the next milestone.</p>
        </div>
      </main>
    </div>
  );
}
