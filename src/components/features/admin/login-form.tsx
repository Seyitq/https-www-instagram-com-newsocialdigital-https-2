"use client";

import { useActionState } from "react";
import { LoaderCircle, LogIn } from "lucide-react";
import { loginAction, type LoginActionState } from "@/server/actions/auth.actions";

const initialState: LoginActionState = {};

export function LoginForm({ configured }: { configured: boolean }) {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <form action={action}>
      <label className="admin-form-field">
        E-posta
        <input name="email" type="email" autoComplete="username" required maxLength={254} />
      </label>
      <label className="admin-form-field">
        Şifre
        <input name="password" type="password" autoComplete="current-password" required maxLength={128} />
      </label>
      {state.error && <p className="admin-result" data-state="error" role="alert">{state.error}</p>}
      <button className="admin-button" type="submit" disabled={pending || !configured}>
        {pending ? <LoaderCircle className="spin" size={15} /> : <LogIn size={15} />}
        Yönetim paneline gir
      </button>
      {!configured && <p className="admin-login-note">Giriş için sunucu ortam değişkenlerini ayarla.</p>}
    </form>
  );
}
