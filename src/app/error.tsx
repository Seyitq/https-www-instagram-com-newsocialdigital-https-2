"use client";

import { RefreshCw } from "lucide-react";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="error-screen">
      <p className="eyebrow"><span className="eyebrow__line" /> BK Media House</p>
      <h1>Sayfa şu anda açılamıyor.</h1>
      <p>Biraz sonra tekrar dene.</p>
      <button className="button button--primary" type="button" onClick={() => reset()}>
        Yeniden dene <RefreshCw size={15} />
      </button>
    </main>
  );
}
