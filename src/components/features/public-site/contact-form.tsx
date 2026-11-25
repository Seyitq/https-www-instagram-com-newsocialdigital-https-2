"use client";

import { useActionState, useState } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import type { z } from "zod";
import type { InquiryActionStateSchema } from "@/lib/validations/inquiry.schema";
import { createInquiryAction } from "@/app/actions";

const initialState: z.infer<typeof InquiryActionStateSchema> = { status: "idle" };

export function ContactForm({ services }: { services: string[] }) {
  const [version, setVersion] = useState(0);
  return <InquiryForm key={version} services={services} onNewMessage={() => setVersion((value) => value + 1)} />;
}

function InquiryForm({ services, onNewMessage }: { services: string[]; onNewMessage: () => void }) {
  const [state, action, pending] = useActionState(createInquiryAction, initialState);
  const [values, setValues] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [consent, setConsent] = useState(false);

  function updateValue(field: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function errorFor(field: string) {
    return state.fieldErrors?.[field]?.[0];
  }

  if (state.status === "success") {
    return (
      <div className="contact-success" role="status">
        <span className="contact-success__mark"><Check size={23} /></span>
        <h3>İlk adımı attık.</h3>
        <p>{state.message}</p>
        <button type="button" onClick={onNewMessage}>Yeni bir mesaj gönder</button>
      </div>
    );
  }

  return (
    <form className="contact-form" action={action} onReset={(event) => event.preventDefault()} aria-label="Proje iletişim formu" aria-busy={pending}>
      <div className="contact-form__row">
        <label htmlFor="contact-name">
          <span>Ad soyad *</span>
          <input id="contact-name" name="name" autoComplete="name" placeholder="Seni tanıyalım" required minLength={2} maxLength={80} value={values.name} onChange={(event) => updateValue("name", event.target.value)} aria-invalid={Boolean(errorFor("name"))} aria-describedby={errorFor("name") ? "contact-name-error" : undefined} />
          {errorFor("name") && <span className="field-error" id="contact-name-error">{errorFor("name")}</span>}
        </label>
        <label htmlFor="contact-email">
          <span>E-posta *</span>
          <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="sana@ulasalim.com" required maxLength={254} value={values.email} onChange={(event) => updateValue("email", event.target.value)} aria-invalid={Boolean(errorFor("email"))} aria-describedby={errorFor("email") ? "contact-email-error" : undefined} />
          {errorFor("email") && <span className="field-error" id="contact-email-error">{errorFor("email")}</span>}
        </label>
      </div>
      <div className="contact-form__row">
        <label htmlFor="contact-company">
          <span>Marka / şirket</span>
          <input id="contact-company" name="company" autoComplete="organization" placeholder="Markanın adı" maxLength={120} value={values.company} onChange={(event) => updateValue("company", event.target.value)} aria-invalid={Boolean(errorFor("company"))} aria-describedby={errorFor("company") ? "contact-company-error" : undefined} />
          {errorFor("company") && <span className="field-error" id="contact-company-error">{errorFor("company")}</span>}
        </label>
        <label htmlFor="contact-service">
          <span>İlgilendiğin hizmet</span>
          <select id="contact-service" name="service" value={values.service} onChange={(event) => updateValue("service", event.target.value)}>
            <option value="">Birlikte karar verebiliriz</option>
            {services.map((service) => <option key={service} value={service}>{service}</option>)}
          </select>
        </label>
      </div>
      <label htmlFor="contact-message">
        <span>Projeni anlat *</span>
        <textarea id="contact-message" name="message" placeholder="Aklında ne var?" required minLength={12} maxLength={2000} rows={4} value={values.message} onChange={(event) => updateValue("message", event.target.value)} aria-invalid={Boolean(errorFor("message"))} aria-describedby={errorFor("message") ? "contact-message-error" : undefined} />
        {errorFor("message") && <span className="field-error" id="contact-message-error">{errorFor("message")}</span>}
      </label>
      <label className="consent-field" htmlFor="contact-consent">
        <input id="contact-consent" name="privacyAccepted" type="checkbox" required checked={consent} onChange={(event) => setConsent(event.target.checked)} aria-invalid={Boolean(errorFor("privacyAccepted"))} aria-describedby={errorFor("privacyAccepted") ? "contact-consent-error" : undefined} />
        <span>İletişim talebime yanıt verilmesi için bilgilerimin kullanılmasını kabul ediyorum. *</span>
      </label>
      {errorFor("privacyAccepted") && <span className="field-error" id="contact-consent-error">{errorFor("privacyAccepted")}</span>}
      <input className="contact-form__trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="contact-form__footer">
        <button className="contact-submit" type="submit" disabled={pending}>
          {pending ? <>Gönderiliyor <LoaderCircle className="spin" size={19} /></> : <>Hikâyemizi başlatalım <ArrowUpRight size={22} /></>}
        </button>
        <p className="form-feedback" aria-live="polite" aria-atomic="true" data-state={state.status}>
          {state.message}
        </p>
      </div>
    </form>
  );
}
