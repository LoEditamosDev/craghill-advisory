"use client";

import Image from "next/image";
import { FormEvent, ReactNode, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CalendarCheck,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  FileText,
  Headphones,
  Landmark,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Camera,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Precios", href: "#planes" },
  { label: "Sobre nosotros", href: "#proceso" },
  { label: "Recursos", href: "#faqs" },
  { label: "Contacto", href: "#contacto" },
];

const heroBadges = [
  "100% Remoto",
  "Sin SSN ni ITIN",
  "Soporte en español",
  "Cumplimiento continuo",
];

const audienceColumns = [
  {
    title: "¿Para quién es este servicio?",
    body: "Nuestra solución está dirigida a emprendedores latinoamericanos y no residentes que desean abrir y operar una LLC en Estados Unidos de forma 100% remota, sin visa ni SSN.",
  },
  {
    title: "Ideal para:",
    items: [
      "E-commerce y tiendas online",
      "Dropshipping y Shopify stores",
      "Venta de libros y productos digitales",
      "Cursos online y membresías",
      "Freelancers y profesionales independientes",
    ],
  },
  {
    title: "También para:",
    items: [
      "Agencias digitales y consultores",
      "Creadores de contenido e influencers",
      "Marcas de suplementos, estética y wellness",
      "Empresas de servicios internacionales",
      "Emprendedores que desean cobrar en dólares y acceder a plataformas financieras globales",
    ],
  },
];

const processSteps = [
  {
    title: "Formas tu LLC",
    body: "Preparamos y presentamos los documentos para tu LLC en el estado ideal para ti.",
    icon: FileText,
  },
  {
    title: "Obtenemos tu EIN",
    body: "Solicitamos tu Employer Identification Number ante el IRS.",
    icon: BadgeCheck,
  },
  {
    title: "Reporte BOI",
    body: "Presentamos tu reporte de Beneficial Ownership Information.",
    icon: ShieldCheck,
  },
  {
    title: "Cuenta bancaria",
    body: "Te ayudamos a abrir tu cuenta en Mercury para operar tu negocio globalmente.",
    icon: Landmark,
  },
  {
    title: "Cumplimiento anual",
    body: "Nos encargamos de tus reportes anuales para que tu empresa siempre esté en regla.",
    icon: BarChart3,
  },
];

const plans = [
  {
    name: "PLAN LAUNCH",
    price: "$499",
    frequency: "Pago único",
    cta: "Formar mi LLC",
    icons: [Building2, FileCheck2, CircleDollarSign],
    features: [
      "Constitución de tu LLC en Estados Unidos",
      "Obtención de EIN (Tax ID)",
      "Registro BOI (FinCEN)",
      "Registered Agent por 1 año",
      "Operating Agreement personalizado",
      "Acompañamiento paso a paso",
      "Soporte en español",
    ],
  },
  {
    name: "SUSCRIPCIÓN COMPLIANCE",
    price: "$99",
    frequency: "/mes",
    cta: "Suscribirme",
    icons: [ShieldCheck, CalendarCheck, Headphones],
    features: [
      "Presentación de Form 5472 + 1120 si aplica",
      "Seguimiento de obligaciones ante el IRS",
      "Gestión de BOI/FinCEN y actualizaciones",
      "Alertas de cumplimiento y fechas clave",
      "Renovación de Registered Agent",
      "Soporte continuo en español",
      "Acompañamiento ante requerimientos",
    ],
  },
];

const planBenefits = [
  {
    title: "Protección y tranquilidad",
    body: "Mantenemos tu empresa activa y en cumplimiento.",
    icon: ShieldCheck,
  },
  {
    title: "Soporte en español",
    body: "Hablamos tu idioma y entendemos tus necesidades.",
    icon: Headphones,
  },
  {
    title: "Ahorra tiempo",
    body: "Nosotros hacemos el trabajo para que tú te enfoques en crecer.",
    icon: Clock3,
  },
];

const testimonials = [
  {
    quote:
      "Craghill hizo todo el proceso súper fácil. En menos de 2 semanas ya tenía mi LLC, mi EIN y mi cuenta en Mercury. Excelente acompañamiento.",
    name: "Andrés M.",
    country: "Colombia",
    initials: "AM",
  },
  {
    quote:
      "El soporte en español es lo que más valoro. Siempre responden rápido y me mantienen al día con todo lo que necesito.",
    name: "María P.",
    country: "México",
    initials: "MP",
  },
  {
    quote:
      "Profesionales, transparentes y 100% confiables. Me olvidé de preocupaciones y me enfoqué en crecer mi negocio.",
    name: "Diego R.",
    country: "Chile",
    initials: "DR",
  },
];

const faqs = [
  {
    question: "¿Puedo formar una LLC si no vivo en Estados Unidos?",
    answer:
      "Sí. El proceso está pensado para no residentes y puede completarse de forma remota.",
  },
  {
    question: "¿Qué es Mercury y por qué lo recomiendan?",
    answer:
      "Mercury es una plataforma bancaria digital usada por muchas empresas en Estados Unidos. Te guiamos para preparar la solicitud.",
  },
  {
    question: "¿Cuánto tiempo tarda el proceso?",
    answer:
      "El tiempo depende del estado y de la emisión del EIN, pero trabajamos para que el avance sea claro en cada etapa.",
  },
  {
    question: "¿Qué es el reporte BOI?",
    answer:
      "Es un reporte de información de beneficiarios finales requerido por FinCEN para ciertas compañías en Estados Unidos.",
  },
  {
    question: "¿Necesito ir a Estados Unidos para abrir mi empresa?",
    answer:
      "No. La formación de la LLC y el acompañamiento se manejan de manera remota.",
  },
  {
    question: "¿Qué pasa si no presento los reportes anuales?",
    answer:
      "Puedes exponerte a penalidades o problemas de cumplimiento. Por eso ofrecemos seguimiento y alertas.",
  },
];

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  companyStage: string;
  serviceInterest: string;
  message: string;
};

const initialFormState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  companyStage: "",
  serviceInterest: "",
  message: "",
};

function SectionReveal({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

function LogoMark({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#inicio" className="flex items-center gap-3" aria-label="Craghill Advisory">
      <span
        className={cn(
          "grid size-11 place-items-center rounded-lg border",
          dark
            ? "border-white/15 bg-white/5"
            : "border-primary/30 bg-primary/10"
        )}
      >
        <span className="block size-5 rotate-45 rounded-[3px] border-b-4 border-l-4 border-primary" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-lg font-bold tracking-[0.12em]",
            dark ? "text-white" : "text-foreground"
          )}
        >
          CRAGHILL
        </span>
        <span className="text-sm font-semibold tracking-[0.18em] text-primary">
          ADVISORY
        </span>
      </span>
    </a>
  );
}

function CtaLink({
  children,
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "light";
  className?: string;
}) {
  const styles = {
    primary:
      "bg-primary text-primary-foreground hover:bg-[var(--brand-strong)]",
    outline:
      "border-border bg-background text-foreground hover:border-primary hover:bg-accent",
    light:
      "bg-white text-foreground hover:bg-white/90",
  };

  return (
    <a
      href="#lead-form"
      className={cn(
        buttonVariants({ variant: variant === "outline" ? "outline" : "default", size: "lg" }),
        "h-11 min-w-40 gap-2 rounded-md px-5 shadow-sm",
        styles[variant],
        className
      )}
    >
      {children}
      <ArrowRight className="size-4" aria-hidden="true" />
    </a>
  );
}

function LeadForm() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const result = (await response.json()) as { message?: string; error?: string };

    if (!response.ok) {
      setStatus("error");
      setMessage(result.error ?? "No pudimos enviar el formulario.");
      return;
    }

    setStatus("success");
    setMessage(
      result.message ??
        "Gracias. Recibimos tu información y te contactaremos pronto."
    );
    setForm(initialFormState);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-white p-6 shadow-[0_18px_60px_rgba(23,50,69,0.08)]">
      <FieldGroup>
        <div className="grid gap-5 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="fullName">Nombre completo</FieldLabel>
            <Input
              id="fullName"
              required
              value={form.fullName}
              onChange={(event) =>
                setForm((current) => ({ ...current, fullName: event.target.value }))
              }
              placeholder="Tu nombre"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              required
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              placeholder="correo@empresa.com"
            />
          </Field>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="phone">WhatsApp o teléfono</FieldLabel>
            <Input
              id="phone"
              value={form.phone}
              onChange={(event) =>
                setForm((current) => ({ ...current, phone: event.target.value }))
              }
              placeholder="+507 123-4567"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="serviceInterest">Servicio de interés</FieldLabel>
            <Input
              id="serviceInterest"
              value={form.serviceInterest}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  serviceInterest: event.target.value,
                }))
              }
              placeholder="LLC, EIN, Compliance..."
            />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="companyStage">Etapa de tu negocio</FieldLabel>
          <Input
            id="companyStage"
            value={form.companyStage}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                companyStage: event.target.value,
              }))
            }
            placeholder="Idea, ya vendo online, empresa activa..."
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="message">Mensaje</FieldLabel>
          <Textarea
            id="message"
            rows={5}
            value={form.message}
            onChange={(event) =>
              setForm((current) => ({ ...current, message: event.target.value }))
            }
            placeholder="Cuéntanos qué necesitas resolver."
          />
          <FieldDescription>
            Este formulario quedará conectado a Supabase cuando agregues las variables de entorno.
          </FieldDescription>
        </Field>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            type="submit"
            disabled={status === "loading"}
            className="h-11 rounded-md bg-primary px-6 text-primary-foreground hover:bg-[var(--brand-strong)]"
          >
            {status === "loading" ? "Enviando..." : "Agendar consulta gratuita"}
            <ArrowRight data-icon="inline-end" />
          </Button>
          {message ? (
            <p
              className={cn(
                "text-sm",
                status === "error" ? "text-destructive" : "text-muted-foreground"
              )}
            >
              {message}
            </p>
          ) : null}
        </div>
      </FieldGroup>
    </form>
  );
}

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main id="inicio" className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-white/92 backdrop-blur">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 lg:px-8">
          <LogoMark />
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative text-sm font-semibold text-foreground/80 transition hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden lg:block">
            <CtaLink className="min-w-0" variant="primary">
              Agendar consulta
            </CtaLink>
          </div>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md border border-border lg:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {menuOpen ? (
          <div className="border-t border-border bg-white px-5 py-4 lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-2 py-2 text-sm font-semibold text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <CtaLink className="mt-2 w-full" variant="primary">
                Agendar consulta
              </CtaLink>
            </nav>
          </div>
        ) : null}
      </header>

      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10 flex flex-col gap-8"
          >
            <div className="max-w-xl">
              <h1 className="text-balance text-5xl font-bold leading-[1.08] tracking-normal text-foreground md:text-6xl">
                Tu empresa en Estados Unidos,{" "}
                <span className="text-primary">sin visa y sin complicaciones</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
                Constituimos tu LLC en Estados Unidos y te acompañamos en cada etapa
                para que puedas operar legalmente, cobrar internacionalmente y hacer
                crecer tu negocio.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {heroBadges.map((badge) => (
                <span key={badge} className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/80">
                  <CheckCircle2 className="size-4 text-primary" />
                  {badge}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <CtaLink variant="primary">Formar mi LLC</CtaLink>
              <CtaLink variant="outline">Agendar consulta</CtaLink>
            </div>
            <p className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <CheckCircle2 className="size-4 text-primary" />
              Para no residentes en Estados Unidos
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            className="relative min-h-[420px] overflow-hidden rounded-none lg:min-h-[560px]"
          >
            <Image
              src="/hero-placeholder.png"
              alt="Asesor trabajando remotamente en una oficina luminosa"
              fill
              priority
              className="object-cover object-center"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
          </motion.div>
        </div>
      </section>

      <SectionReveal id="servicios" className="bg-secondary py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-3 lg:px-8">
          {audienceColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-5">
              <h2 className="text-3xl font-bold leading-tight text-foreground">
                {column.title.includes("servicio") ? (
                  <>
                    ¿Para quién es <span className="text-primary">este servicio?</span>
                  </>
                ) : (
                  column.title
                )}
              </h2>
              {column.body ? (
                <p className="text-sm font-medium leading-7 text-foreground/75">
                  {column.body}
                </p>
              ) : null}
              {column.items ? (
                <ul className="flex flex-col gap-3">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm font-medium leading-6 text-foreground/75">
                      <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal id="proceso" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-foreground">
            Un proceso claro, simple y <span className="text-primary">100% remoto</span>
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-5">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative flex flex-col items-center text-center">
                  <div className="mb-4 flex items-center gap-4">
                    <span className="text-4xl font-bold text-primary">{index + 1}</span>
                    <span className="grid size-20 place-items-center rounded-full border border-border bg-white shadow-sm">
                      <Icon className="size-8 text-foreground/70" />
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{step.title}</h3>
                  <p className="mt-3 text-xs font-medium leading-6 text-muted-foreground">
                    {step.body}
                  </p>
                  {index < processSteps.length - 1 ? (
                    <ArrowRight className="absolute right-[-18px] top-8 hidden size-5 text-muted-foreground md:block" />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal id="planes" className="bg-white pb-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-foreground">
            Planes simples y transparentes
          </h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {plans.map((plan) => (
              <Card key={plan.name} className="rounded-lg border-primary/45 bg-white shadow-sm">
                <CardHeader className="items-center text-center">
                  <CardTitle className="text-sm font-bold tracking-wide">{plan.name}</CardTitle>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-5xl font-bold text-primary">{plan.price}</span>
                    {plan.frequency.startsWith("/") ? (
                      <span className="pb-2 text-sm font-semibold text-foreground">
                        {plan.frequency}
                      </span>
                    ) : null}
                  </div>
                  {!plan.frequency.startsWith("/") ? (
                    <p className="text-sm font-semibold text-foreground">{plan.frequency}</p>
                  ) : (
                    <p className="text-sm font-semibold text-foreground">
                      Cumplimiento y mantenimiento
                    </p>
                  )}
                  <div className="flex justify-center gap-3 pt-2">
                    {plan.icons.map((Icon, iconIndex) => (
                      <span key={`${plan.name}-${iconIndex}`} className="grid size-10 place-items-center rounded-full bg-accent text-primary">
                        <Icon className="size-5" />
                      </span>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm font-medium leading-6 text-foreground/78">
                        <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="border-0 bg-transparent px-6 pb-6">
                  <Button type="button" className="h-10 w-full rounded-md bg-primary text-primary-foreground hover:bg-[var(--brand-strong)]">
                    {plan.cta}
                    <ArrowRight data-icon="inline-end" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {planBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="flex items-center gap-4 rounded-lg border border-primary/25 bg-white p-5 shadow-sm"
                >
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-accent text-foreground">
                    <Icon className="size-7" />
                  </span>
                  <div>
                    <h3 className="font-bold text-foreground">{benefit.title}</h3>
                    <p className="mt-1 text-sm font-medium leading-6 text-muted-foreground">
                      {benefit.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-white pb-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-foreground">
            Lo que dicen nuestros clientes
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="rounded-lg border-border bg-white shadow-sm">
                <CardContent className="pt-6">
                  <Sparkles className="size-7 text-primary" />
                  <p className="mt-4 text-sm font-medium leading-7 text-foreground/80">
                    {testimonial.quote}
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-full bg-secondary text-sm font-bold text-foreground">
                      {testimonial.initials}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-foreground">
                        {testimonial.name}
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {testimonial.country}
                      </span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {[0, 1, 2, 3].map((dot) => (
              <span
                key={dot}
                className={cn(
                  "size-2 rounded-full",
                  dot === 0 ? "bg-primary" : "bg-border"
                )}
              />
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal id="lead-form" className="scroll-mt-24 bg-secondary py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div className="flex flex-col justify-center gap-5">
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <MessageCircle className="size-7" />
            </span>
            <h2 className="text-4xl font-bold leading-tight text-foreground">
              Agenda una consulta y descubre cómo podemos ayudarte.
            </h2>
            <p className="text-base font-medium leading-7 text-muted-foreground">
              Los botones principales de la página llegan aquí. Más adelante este
              formulario guardará cada lead en Supabase y podrá alimentar un dashboard
              privado.
            </p>
          </div>
          <LeadForm />
        </div>
      </SectionReveal>

      <SectionReveal id="faqs" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-foreground">
            Preguntas frecuentes
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <Accordion key={faq.question} className="rounded-lg border border-border bg-white px-4">
                <AccordionItem value={`faq-${index}`} className="border-0">
                  <AccordionTrigger className="py-3 text-sm font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-6 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </SectionReveal>

      <section className="bg-primary py-7">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-4 text-primary-foreground">
            <span className="grid size-14 place-items-center rounded-full border border-white/40 bg-white/15">
              <CalendarCheck className="size-7" />
            </span>
            <div>
              <h2 className="text-xl font-bold">¿Listo para formar tu empresa en Estados Unidos?</h2>
              <p className="text-sm font-medium text-white/85">
                Agenda una consulta gratuita y descubre cómo podemos ayudarte.
              </p>
            </div>
          </div>
          <CtaLink variant="light">Agendar consulta gratuita</CtaLink>
        </div>
      </section>

      <footer id="contacto" className="bg-[var(--footer)] py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1.2fr_0.9fr_0.9fr] lg:px-8">
          <div className="flex flex-col gap-5">
            <LogoMark dark />
            <p className="max-w-sm text-sm leading-7 text-white/70">
              Ayudamos a emprendedores latinoamericanos a construir negocios globales en Estados Unidos.
            </p>
            <div className="flex gap-3">
              {[Send, Camera, MessageCircle].map((Icon, index) => (
                <a
                  key={index}
                  href="#contacto"
                  aria-label="Red social"
                  className="grid size-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold">Contactos</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/75">
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-primary" />
                hola@craghilladvisory.com
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-primary" />
                +507 123-4567
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-4 text-primary" />
                Panamá, Rep. de Panamá
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Políticas</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/75">
              <li>
                <a href="#contacto" className="transition hover:text-primary">
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a href="#contacto" className="transition hover:text-primary">
                  Política de privacidad
                </a>
              </li>
              <li>
                <a href="#contacto" className="transition hover:text-primary">
                  Aviso legal
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="mx-auto mt-10 max-w-7xl bg-white/10" />
        <p className="mx-auto mt-6 max-w-7xl px-5 text-center text-sm text-white/60 lg:px-8">
          © 2024 Craghill Advisory. Todos los derechos reservados.
        </p>
      </footer>
    </main>
  );
}
