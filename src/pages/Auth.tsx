import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/SiteHeader";

type Mode = "signin" | "signup";

export default function AuthPage({ mode: initialMode }: { mode: Mode }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>(initialMode);
  useEffect(() => setMode(initialMode), [initialMode]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error } =
      mode === "signup"
        ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/app` } })
        : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    if (data.session) navigate("/app");
    else setError("請到信箱確認帳號 / Check your email to confirm your account.");
  }

  const isUp = mode === "signup";
  return (
    <div className="flex min-h-screen flex-col">
      <title>{isUp ? "Sign up — Flight Price Notifier" : "Sign in — Flight Price Notifier"}</title>
      <meta name="description" content="Sign in or create your Flight Price Notifier account." />
      <meta property="og:title" content="Sign in — Flight Price Notifier" />
      <meta property="og:description" content="Sign in or create your Flight Price Notifier account." />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <SiteHeader />
      <main className="relative flex flex-1 items-center justify-center px-4 py-16">
        <div className="pointer-events-none absolute inset-0 bg-gradient-hero" />
        <form onSubmit={onSubmit} className="animate-fade-up relative w-full max-w-sm space-y-5 rounded-2xl border border-border bg-card p-8">
          <div>
            <h1 className="text-2xl font-semibold">{isUp ? "Sign up / 註冊" : "Sign in / 登入"}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {isUp ? "Create an account to start tracking fares." : "Welcome back."}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" variant="hero" className="w-full" disabled={loading}>
            {loading ? "…" : isUp ? "Create account" : "Sign in"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {isUp ? "Already have an account? " : "No account yet? "}
            <button type="button" className="text-primary-glow hover:underline" onClick={() => { setMode(isUp ? "signin" : "signup"); setError(null); }}>
              {isUp ? "Sign in" : "Sign up"}
            </button>
          </p>
          <p className="text-center text-xs"><Link to="/" className="text-muted-foreground hover:text-foreground">← Back home</Link></p>
        </form>
      </main>
    </div>
  );
}
