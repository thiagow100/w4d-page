'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, useInView } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import MagneticButton from '@/components/MagneticButton';

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

export default function FormularioLead() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const formSectionRef = useRef<HTMLElement>(null);
  const isFormInView = useInView(formSectionRef, { amount: 0.1 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const getInputClass = (hasValue: boolean, error: any) => {
    const base = "w-full text-base text-primary p-4 rounded-lg outline-none transition-all duration-300 ease-out placeholder:text-white/25 placeholder:font-light";
    let stateClasses = "bg-white/5 border border-transparent focus:bg-white/[0.03] focus:border-cta focus:ring-1 focus:ring-cta";
    
    if (error) {
      stateClasses = "bg-white/5 border border-cta focus:bg-white/[0.03] focus:ring-1 focus:ring-cta";
    } else if (hasValue) {
      stateClasses = "bg-white/5 border border-white/10 focus:bg-white/[0.03] focus:border-cta focus:ring-1 focus:ring-cta";
    }
    
    return `${base} ${stateClasses}`;
  };

  return (
    <section ref={formSectionRef} id="formulario" className="relative w-full py-section px-6 sm:px-12 lg:px-24 bg-secondary">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#565656] text-[13px] font-semibold tracking-[3px] uppercase mb-4 block"
          >
            O próximo passo
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-1px] text-primary leading-[1.1] mb-8"
          >
            Se a W4Digital faz sentido para o seu negócio, vamos conversar.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.2 }}
            className="flex flex-col gap-5 max-w-lg mx-auto lg:mx-0"
          >
            <p className="text-lg md:text-xl text-body font-light leading-[1.7]">
              Nosso time lê o que você enviou antes de entrar em contato. A primeira conversa é uma análise da sua situação atual: o que está funcionando, o que não está e onde está a maior oportunidade de melhoria.
            </p>
            <p className="text-lg md:text-xl text-body font-light leading-[1.7]">
              Se avançarmos juntos: resultado abaixo do esperado, você sabe na mesma semana. Os números ficam abertos. Você decide onde investir. Nós executamos.
            </p>
            <p className="text-lg md:text-xl text-body font-light leading-[1.7]">
              Sem proposta, sem compromisso. Se houver fit, apresentamos como podemos trabalhar juntos.
            </p>
            <p className="text-lg md:text-xl text-body font-light leading-[1.7]">
              Não atendemos qualquer empresa. Se a sua situação não for para nós, dizemos isso na primeira conversa.
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
          <div className="bg-secondary p-8 md:p-10 rounded-2xl border border-white/5 shadow-2xl shadow-cta/5 relative overflow-hidden">
            {isSuccess ? (
              <div className="py-20 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-cta/10 border border-cta rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-cta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold tracking-[-2px] text-primary mb-2">Solicitação recebida.</h3>
                <p className="text-body font-light leading-[1.7]">Nosso time vai ler o que você enviou antes de entrar em contato. Você deve receber um retorno em até 1 dia útil, por WhatsApp ou ligação.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                <div>
                  <input 
                    {...register("fullName")}
                    placeholder="Nome completo *"
                    className={getInputClass(!!fullName && fullName.length > 0, errors.fullName)}
                  />
                  {errors.fullName && <span className="text-cta text-xs mt-2 ml-1 block">{errors.fullName.message}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input 
                      {...register("phone")}
                      placeholder="WhatsApp / Telefone *"
                      className={getInputClass(!!phone && phone.length > 0, errors.phone)}
                    />
                    {errors.phone && <span className="text-cta text-xs mt-2 ml-1 block">{errors.phone.message}</span>}
                  </div>
                  <div>
                    <input 
                      {...register("email")}
                      type="email"
                      placeholder="E-mail profissional *"
                      className={getInputClass(!!email && email.length > 0, errors.email)}
                    />
                    {errors.email && <span className="text-cta text-xs mt-2 ml-1 block">{errors.email.message}</span>}
                  </div>
                </div>

                <div>
                  <input 
                    {...register("company")}
                    placeholder="Nome da Empresa *"
                    className={getInputClass(!!company && company.length > 0, errors.company)}
                  />
                  {errors.company && <span className="text-cta text-xs mt-2 ml-1 block">{errors.company.message}</span>}
                </div>

                <div>
                  <select 
                    {...register("segment")}
                    defaultValue=""
                    className={`${getInputClass(!!segment && segment.length > 0, errors.segment)} appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23FFFFFF%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.2em_1.2em] bg-[right_1rem_center] bg-no-repeat`}
                  >
                    <option value="" disabled hidden className="text-white/25">Selecione o segmento da empresa *</option>
                    <option value="Imobiliário (incorporadora, imobiliária, corretor)" className="text-primary bg-secondary">Imobiliário (incorporadora, imobiliária, corretor)</option>
                    <option value="Educação e infoprodutos" className="text-primary bg-secondary">Educação e infoprodutos</option>
                    <option value="Serviços profissionais (advocacia, contabilidade, consultoria)" className="text-primary bg-secondary">Serviços profissionais (advocacia, contabilidade, consultoria)</option>
                    <option value="Saúde (clínicas, consultórios, healthtech)" className="text-primary bg-secondary">Saúde (clínicas, consultórios, healthtech)</option>
                    <option value="E-commerce e varejo" className="text-primary bg-secondary">E-commerce e varejo</option>
                    <option value="Outro" className="text-primary bg-secondary">Outro</option>
                  </select>
                  {errors.segment && <span className="text-cta text-xs mt-2 ml-1 block">{errors.segment.message}</span>}
                </div>

                <div className="flex items-start gap-4">
                  <input 
                    type="checkbox" 
                    id="lgpd"
                    {...register("lgpd")}
                    className="mt-1 w-5 h-5 min-w-5 shrink-0 rounded border border-white/20 outline-none text-cta focus:ring-1 focus:ring-cta-hover bg-white/5 cursor-pointer accent-cta transition-colors duration-300 ease-out"
                  />
                  <label htmlFor="lgpd" className="text-sm text-secondary cursor-pointer leading-[1.7] font-light">
                    Li e concordo com a <a href="#" className="text-primary hover:text-cta transition-colors underline decoration-white/30">Política de Privacidade</a>
                  </label>
                </div>
                {errors.lgpd && <span className="text-cta text-xs block -mt-3 ml-1">{errors.lgpd.message}</span>}

                {submitError && (
                  <div className="bg-cta/10 border border-cta text-cta p-3 rounded-lg text-sm text-center">
                    {submitError}
                  </div>
                )}

                {/* Wrapper Sticky Mobile & Magnetic Desktop */}
                <div className={isMobile && isFormInView ? 'fixed bottom-0 left-0 right-0 z-50 bg-primary/90 backdrop-blur-xl border-t border-white/10 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] flex justify-center' : 'w-full'}>
                  <MagneticButton className={isMobile && isFormInView ? 'w-full max-w-lg' : 'w-full'}>
                    <button 
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      className="w-full group relative flex items-center justify-center px-8 py-4 mt-2 text-lg font-bold text-white transition-all duration-300 ease-out bg-cta rounded-xl disabled:bg-white/5 disabled:text-white/30 disabled:cursor-not-allowed hover:bg-cta-hover hover:-translate-y-1 shadow-xl shadow-cta/10"
                    >
                      {isSubmitting ? "Enviando..." : (
                        <>
                          Solicitar diagnóstico <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </div>
                
                <p className="text-xs text-secondary text-center font-light">
                  Sem compromisso. Sem insistência.
                </p>

                {/* Spacer para não empurrar as coisas do form caso vire fixed */}
                {isMobile && isFormInView && <div className="h-20 w-full" />}

              </form>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
