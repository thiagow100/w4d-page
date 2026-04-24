'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

const formSchema = z.object({
  fullName: z.string().trim().refine(val => val.split(' ').length >= 2, {
    message: "Digite seu nome e sobrenome"
  }),
  phone: z.string().min(10, { message: "Digite um telefone com DDD válido" }),
  email: z.string().email({ message: "Digite um e-mail válido" }),
  company: z.string().min(1, { message: "Nome da empresa é obrigatório" }),
  segment: z.string().min(1, { message: "Selecione um segmento" }),
  lgpd: z.boolean().refine(val => val === true, {
    message: "Você precisa aceitar a Política de Privacidade"
  })
});

type FormData = z.infer<typeof formSchema>;

// Floating label input component
function FloatingInput({
  label,
  error,
  type = "text",
  ...props
}: {
  label: string;
  error?: any;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  const hasValue = Boolean(props.value && String(props.value).length > 0);
  const isFloating = focused || hasValue;

  return (
    <div className="relative">
      <input
        {...props}
        type={type}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
        placeholder=""
        className={`w-full text-base text-primary pt-6 pb-2 px-4 rounded-lg outline-none transition-all duration-300 ease-out bg-white/5 border ${
          error
            ? 'border-error focus:border-error focus:ring-1 focus:ring-error'
            : focused
            ? 'border-focus-ring focus:ring-1 focus:ring-focus-ring bg-white/[0.03]'
            : hasValue
            ? 'border-white/10'
            : 'border-transparent'
        }`}
      />
      <label
        className={`absolute left-4 transition-all duration-200 ease-out pointer-events-none ${
          isFloating
            ? 'top-2 text-xs font-mono tracking-[0.12em] uppercase'
            : 'top-1/2 -translate-y-1/2 text-base font-normal'
        } ${
          error ? 'text-error' : focused ? 'text-focus-ring' : 'text-white/30'
        }`}
      >
        {label}
      </label>
      {error && <span className="text-error text-xs mt-2 ml-1 block">{error.message}</span>}
    </div>
  );
}

// Floating label select — comportamento idêntico ao FloatingInput
function FloatingSelect({
  label,
  error,
  options,
  ...props
}: {
  label: string;
  error?: any;
  options: { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [focused, setFocused] = useState(false);
  const hasValue = Boolean(props.value && String(props.value).length > 0);
  const isFloating = focused || hasValue;

  return (
    <div className="relative">
      <select
        {...props}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
        style={{ colorScheme: 'dark' }}
        aria-label={label}
        className={`w-full text-base pt-6 pb-2 px-4 rounded-lg outline-none transition-all duration-300 ease-out bg-white/5 border appearance-none cursor-pointer ${
          hasValue ? 'text-primary' : 'text-transparent'
        } ${
          error
            ? 'border-error focus:border-error focus:ring-1 focus:ring-error'
            : focused
            ? 'border-focus-ring focus:ring-1 focus:ring-focus-ring bg-white/[0.03]'
            : hasValue
            ? 'border-white/10'
            : 'border-transparent'
        } bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23FFFFFF%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.2em_1.2em] bg-[right_1rem_center] bg-no-repeat`}
      >
        <option value="" disabled></option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-primary bg-secondary">
            {opt.label}
          </option>
        ))}
      </select>
      <label
        className={`absolute left-4 transition-all duration-200 ease-out pointer-events-none ${
          isFloating
            ? 'top-2 text-xs font-mono tracking-[0.12em] uppercase'
            : 'top-1/2 -translate-y-1/2 text-base font-normal'
        } ${
          error ? 'text-error' : focused ? 'text-focus-ring' : 'text-white/30'
        }`}
      >
        {label}
      </label>
      {error && <span className="text-error text-xs mt-2 ml-1 block">{error.message}</span>}
    </div>
  );
}

const segmentOptions = [
  { value: "Imobiliário", label: "Imobiliário · Real estate" },
  { value: "Construção", label: "Construção · Construction" },
  { value: "Clínicas", label: "Clínicas · Healthcare" },
  { value: "Serviços profissionais", label: "Serviços profissionais · Professional services" },
  { value: "Educação", label: "Educação · Education" },
  { value: "Outro", label: "Outro · Other" },
];

export default function FormularioLead() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");


  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange"
  });

  const { fullName, phone, email, company, segment } = watch();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const { error } = await supabase.from('leads').insert([
        {
          full_name: data.fullName,
          phone: data.phone,
          email: data.email,
          company: data.company,
          segment: data.segment
        }
      ]);

      if (error) throw error;

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setSubmitError("Não foi possível enviar o formulário. Tente novamente em instantes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="formulario" className="relative w-full py-12 md:py-section px-6 sm:px-12 lg:px-24 bg-secondary noise-overlay">
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

        <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
          {/* Eyebrow com index 05 + call to action. Badge visível só no mobile/desktop igual */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 mb-5 self-center lg:self-start px-4 py-2 rounded-full border border-cta-accent/40 bg-cta-accent/[0.08]"
          >
            <span className="font-mono text-xs text-cta/80 tracking-[0.18em] uppercase">05</span>
            <span className="text-cta/50" aria-hidden>/</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cta animate-pulse" />
            <span className="font-mono text-xs text-cta tracking-[0.18em] uppercase">
              O próximo passo
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.1 }}
            className="h2-section font-semibold tracking-[-0.05em] text-white/95 leading-[1.08] mb-10 text-balance"
          >
            Se o modelo da W4D faz sentido para a sua empresa, vamos conversar.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.2 }}
            className="flex flex-col gap-6 max-w-lg mx-auto lg:mx-0"
          >
            <p className="text-lg md:text-xl text-body font-normal leading-[1.7]">
              Preencha o formulário. Nossa equipe fará uma pesquisa inicial sobre o seu negócio antes de agendar a primeira ligação.
            </p>

            <p className="text-base md:text-lg text-body font-normal leading-[1.75] border-l-2 border-white/15 pl-5">
              <strong className="text-primary font-medium">A primeira conversa:</strong> Faremos uma reunião rápida de alinhamento. Se entendermos que podemos gerar resultados reais para o seu modelo de negócio, desenhamos uma proposta comercial sob medida para a sua operação.
            </p>

            <p className="text-base text-body font-normal leading-[1.7]">
              Não fechamos contratos a qualquer custo. Se a sua empresa ainda não estiver no momento ideal para aplicar o nosso método, nós te diremos isso logo de cara.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="w-full lg:w-1/2"
        >
          <div className="border-gradient bg-secondary p-8 md:p-10 rounded-2xl shadow-2xl shadow-cta-accent/10 relative overflow-hidden">
            {isSuccess ? (
              <div className="py-20 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-cta-accent/15 border border-cta rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-cta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-primary mb-2">Solicitação recebida.</h3>
                <p className="text-body font-normal leading-[1.7]">Nosso time vai ler o que você enviou antes de entrar em contato. Você deve receber um retorno em até 1 dia útil, por WhatsApp ou ligação.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <FloatingInput
                  label="Nome completo *"
                  autoComplete="name"
                  error={errors.fullName}
                  {...register("fullName")}
                  value={fullName || ""}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FloatingInput
                    label="WhatsApp / Telefone *"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    error={errors.phone}
                    {...register("phone")}
                    value={phone || ""}
                  />
                  <FloatingInput
                    label="E-mail profissional *"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    error={errors.email}
                    {...register("email")}
                    value={email || ""}
                  />
                </div>

                <FloatingInput
                  label="Nome da empresa *"
                  autoComplete="organization"
                  error={errors.company}
                  {...register("company")}
                  value={company || ""}
                />

                <FloatingSelect
                  label="Segmento da empresa *"
                  error={errors.segment}
                  options={segmentOptions}
                  {...register("segment")}
                  value={segment || ""}
                />

                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    id="lgpd"
                    {...register("lgpd")}
                    className="mt-1 w-5 h-5 min-w-5 shrink-0 rounded border border-white/20 outline-none text-cta focus:ring-1 focus:ring-focus-ring bg-white/5 cursor-pointer accent-cta transition-colors duration-300 ease-out"
                  />
                  <label htmlFor="lgpd" className="text-sm text-secondary cursor-pointer leading-[1.7] font-normal">
                    Li e concordo com a <a href="/privacidade" className="text-primary hover:text-cta transition-colors underline decoration-white/30">Política de Privacidade</a>
                  </label>
                </div>
                {errors.lgpd && <span className="text-error text-xs block -mt-3 ml-1">{errors.lgpd.message}</span>}

                {submitError && (
                  <div className="bg-error/10 border border-error text-error p-3 rounded-lg text-sm text-center">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="w-full group relative flex items-center justify-center px-8 py-4 mt-2 text-base md:text-lg font-semibold text-white transition-all duration-300 ease-out bg-cta rounded-full disabled:bg-white/5 disabled:text-white/30 disabled:cursor-not-allowed hover:bg-cta-hover active:scale-[0.98] glow-cta"
                >
                  {isSubmitting ? "Enviando..." : (
                    <>
                      Enviar para análise <span className="ml-2 transition-transform group-hover:translate-x-1">&#8594;</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-secondary text-center font-normal">
                  Atendimento rápido. Quem te responde é quem vai operar a conta.
                </p>

              </form>
            )}
          </div>
        </motion.div>

      </div>

    </section>
  );
}
