"use client";

import Image from "next/image";
import { FormEvent, ReactNode, useState } from "react";
import { allCountries } from "country-telephone-data";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BellRing,
  Building2,
  CalendarCheck,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  CreditCard,
  FileCheck2,
  FileText,
  Files,
  Headphones,
  Landmark,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Plus,
  Camera,
  Send,
  ShieldCheck,
  Sparkles,
  WalletCards,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Planes", href: "#planes" },
  { label: "Contacto", href: "#lead-form" },
];

const heroBadges = [
  "100% Remoto",
  "Sin SSN ni ITIN",
  "Soporte en español",
  "Cumplimiento continuo",
];

const preferredPhoneCountryIds = [
  "pa",
  "us",
  "co",
  "mx",
  "cl",
  "pe",
  "ar",
  "ec",
  "do",
  "es",
];

const countryNameOverrides: Record<string, string> = {
  ar: "Argentina",
  cl: "Chile",
  co: "Colombia",
  do: "República Dominicana",
  ec: "Ecuador",
  es: "España",
  mx: "México",
  pa: "Panamá",
  pe: "Perú",
  us: "Estados Unidos",
};

const phoneCountries = allCountries
  .map((country) => ({
    id: country.iso2,
    label:
      countryNameOverrides[country.iso2] ??
      country.name.replace(/\s*\(.+?\)\s*/g, "").trim(),
    code: `+${country.dialCode}`,
    iso: country.iso2,
  }))
  .sort((a, b) => {
    const aIndex = preferredPhoneCountryIds.indexOf(a.id);
    const bIndex = preferredPhoneCountryIds.indexOf(b.id);

    if (aIndex !== -1 || bIndex !== -1) {
      return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    }

    return a.label.localeCompare(b.label, "es");
  });

const residenceCountries = [...phoneCountries.map((country) => country.label), "Otro"];

const consultationTypeOptions = [
  "Formar una LLC",
  "EIN / Tax ID",
  "Compliance mensual",
  "Monitoring",
  "Presentación Fiscal Anual",
  "Renovación de Agente Registrado",
  "Gestión para Cuenta Bancaria Empresarial",
  "Gestión para Procesador de Pagos",
  "Banking + Payments",
  "BOI Report",
  "Cuenta bancaria empresarial",
  "Pasarelas de pago",
  "Registered Agent",
  "Formularios 5472 y 1120",
  "Revisión de correspondencia oficial",
  "Quiero orientación general",
  "Otro",
];

const businessStageOptions = [
  "Idea inicial",
  "Estoy evaluando abrir una LLC",
  "Ya vendo online",
  "Tengo una empresa activa fuera de EE. UU.",
  "Ya tengo LLC en Estados Unidos",
  "Necesito poner mi LLC en regla",
  "Quiero cobrar internacionalmente",
  "Otro",
];

const serviceItems = [
  {
    title: "Constitución de LLC",
    body: "Creamos tu LLC en Estados Unidos de forma 100% remota, sin visa, SSN o ITIN, preparando y presentando la documentación inicial.",
    icon: Building2,
  },
  {
    title: "Obtención de EIN / Tax ID",
    body: "Solicitamos tu EIN ante el IRS para operar, facturar, abrir cuentas comerciales y acceder a plataformas financieras.",
    icon: BadgeCheck,
  },
  {
    title: "BOI Report ante FinCEN",
    body: "Presentamos el reporte de Beneficial Ownership Information para cumplir con obligaciones federales.",
    icon: FileCheck2,
  },
  {
    title: "Registered Agent",
    body: "Incluimos representación legal en Estados Unidos para recibir notificaciones oficiales de tu LLC.",
    icon: ShieldCheck,
  },
  {
    title: "Operating Agreement",
    body: "Preparamos el acuerdo operativo que define la estructura, funcionamiento y administración interna de tu empresa.",
    icon: FileText,
  },
  {
    title: "Cuenta bancaria empresarial",
    body: "Te orientamos en la apertura de cuenta en Estados Unidos, incluyendo opciones como Mercury.",
    icon: Landmark,
  },
  {
    title: "Cumplimiento anual",
    body: "Damos seguimiento a obligaciones, fechas clave, renovaciones y requerimientos para mantener tu LLC en regla.",
    icon: CalendarCheck,
  },
  {
    title: "Formularios 5472 y 1120",
    body: "Preparamos formularios fiscales cuando aplican para evitar errores, multas y sanciones ante el IRS.",
    icon: FileText,
  },
  {
    title: "Soporte continuo en español",
    body: "Te acompañamos con atención clara, directa y sin tecnicismos innecesarios durante todo el proceso.",
    icon: Headphones,
  },
  {
    title: "Correspondencia oficial",
    body: "Revisamos comunicaciones importantes y te explicamos qué significan y qué acciones debes tomar.",
    icon: Mail,
  },
  {
    title: "Pasarelas de pago",
    body: "Te orientamos sobre Stripe y otras soluciones para cobrar internacionalmente y operar en dólares.",
    icon: CircleDollarSign,
  },
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
    tagline: "Todo lo necesario para crear tu LLC.",
    cta: "Formar mi LLC",
    serviceInterest: "Formar una LLC",
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
    tagline: "Cumplimiento y mantenimiento continuo.",
    cta: "Suscribirme",
    serviceInterest: "Compliance mensual",
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
  {
    name: "MONITORING",
    price: "$29",
    frequency: "/mes",
    tagline: "Vigilancia y alertas para actuar a tiempo.",
    cta: "Activar Monitoring",
    serviceInterest: "Monitoring",
    icons: [BellRing, CalendarCheck, FileText],
    features: [
      "Alertas de cumplimiento y fechas importantes",
      "Preparación organizada para el período fiscal",
      "Aviso de renovación del Agente Registrado",
      "Análisis de correspondencia oficial",
      "Actualizaciones regulatorias relevantes",
      "Todo explicado claramente en español",
    ],
    disclaimer:
      "Incluye monitoreo, alertas, información y orientación. No incluye presentación de formularios fiscales, renovación del Agente Registrado, tasas gubernamentales ni trámites profesionales adicionales.",
  },
];

const additionalServices = [
  {
    title: "Presentación Fiscal Anual",
    price: "Desde $299",
    body: "Preparación y presentación de Form 5472 + Form 1120 ante el IRS, cuando correspondan.",
    note: "El precio base aplica a operaciones simples con información completa y organizada.",
    icon: FileCheck2,
  },
  {
    title: "Renovación de Agente Registrado",
    price: "$199/año",
    body: "Renovación anual para mantener vigente la representación requerida por el estado de constitución.",
    icon: ShieldCheck,
  },
  {
    title: "Gestión para Cuenta Bancaria Empresarial",
    price: "$149",
    body: "Orientación y acompañamiento durante la solicitud de una cuenta bancaria para tu LLC.",
    icon: Landmark,
  },
  {
    title: "Gestión para Procesador de Pagos",
    price: "$149",
    body: "Acompañamiento para solicitar una solución de procesamiento de pagos adecuada para tu negocio.",
    icon: CreditCard,
  },
  {
    title: "Banking + Payments",
    price: "$249",
    originalPrice: "$298",
    body: "Contrata ambas gestiones juntas y recibe acompañamiento durante los dos procesos de solicitud.",
    note: "Ahorras $49",
    icon: WalletCards,
    featured: true,
    bundleItems: [
      { title: "Cuenta bancaria", price: "$149", icon: Landmark },
      { title: "Procesador de pagos", price: "$149", icon: CreditCard },
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

const priceComparisons = [
  {
    title: "Constitución de LLC",
    marketPrice: "Otros servicios: desde $800",
    ourPrice: "Craghill: $499 pago único",
    body: "Incluye formación, documentos clave, EIN, BOI, Registered Agent y acompañamiento en español.",
    icon: Building2,
  },
  {
    title: "Cumplimiento mensual",
    marketPrice: "Otros proveedores: hasta $2,500/año",
    ourPrice: "Craghill: $99/mes",
    body: "Seguimiento de obligaciones, alertas, formularios, BOI/FinCEN y soporte continuo sin complicarte.",
    icon: ShieldCheck,
  },
];

const launchIncludes = [
  {
    title: "Constitución de tu LLC",
    body: "Creamos tu empresa en Estados Unidos correctamente desde el inicio.",
    icon: Building2,
  },
  {
    title: "EIN (Tax ID)",
    body: "Solicitamos tu número de identificación fiscal para operar, facturar y abrir cuentas.",
    icon: BadgeCheck,
  },
  {
    title: "BOI Report (FinCEN)",
    body: "Registro obligatorio para cumplir con regulaciones federales.",
    icon: FileCheck2,
  },
  {
    title: "Registered Agent",
    body: "Representante legal en Estados Unidos para recibir notificaciones oficiales.",
    icon: ShieldCheck,
  },
  {
    title: "Operating Agreement",
    body: "Documento interno que define la estructura y funcionamiento de tu empresa.",
    icon: FileText,
  },
  {
    title: "Acompañamiento paso a paso",
    body: "Te guiamos en todo el proceso, sin tecnicismos ni complicaciones.",
    icon: Headphones,
  },
  {
    title: "Soporte en español",
    body: "Atención clara y directa para resolver cualquier duda.",
    icon: MessageCircle,
  },
];

const complianceIncludes = [
  {
    title: "Evita multas de hasta $25,000 del IRS",
    body: "Preparamos y presentamos correctamente los formularios fiscales 5472 y 1120, evitando errores y sanciones.",
    icon: ShieldCheck,
  },
  {
    title: "Cumplimiento federal IRS + FinCEN sin riesgo",
    body: "Gestionamos y actualizamos tu Beneficial Ownership Information Report.",
    icon: FileCheck2,
  },
  {
    title: "Tu empresa siempre activa y en cumplimiento",
    body: "Recordatorios de obligaciones para mantener tu LLC al día ante entidades estadounidenses.",
    icon: CalendarCheck,
  },
  {
    title: "Nunca pierdas una fecha importante",
    body: "Alertas claras y seguimiento organizado para que cumplas antes de cada vencimiento.",
    icon: Clock3,
  },
  {
    title: "Renovación anual de Registered Agent incluida",
    body: "Tu representante legal se mantiene activo para recibir notificaciones oficiales.",
    icon: BadgeCheck,
  },
  {
    title: "Acompañamiento ante requerimientos oficiales",
    body: "Te guiamos paso a paso si recibes comunicaciones del IRS u otras entidades.",
    icon: Headphones,
  },
  {
    title: "Revisión inteligente de correspondencia",
    body: "Analizamos documentos importantes y te explicamos cualquier acción necesaria.",
    icon: Mail,
  },
  {
    title: "Soporte continuo en español",
    body: "Atención clara, directa y en tu idioma, sin tecnicismos innecesarios.",
    icon: MessageCircle,
  },
  {
    title: "Asesoría para apertura de cuentas bancarias en EE. UU.",
    body: "Te orientamos para que puedas operar tu empresa sin fricciones.",
    icon: Landmark,
  },
  {
    title: "Integración de pasarelas de pago internacionales",
    body: "Te orientamos sobre herramientas como Stripe para operar globalmente.",
    icon: CircleDollarSign,
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
  countryCode: string;
  phone: string;
  companyStage: string;
  serviceInterest: string;
  message: string;
};

const initialFormState: FormState = {
  fullName: "",
  email: "",
  countryCode: "pa",
  phone: "",
  companyStage: businessStageOptions[0],
  serviceInterest: consultationTypeOptions[0],
  message: "",
};

type ScheduleFormState = {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  residenceCountry: string;
  companyStage: string;
  serviceInterest: string;
  message: string;
};

const initialScheduleForm: ScheduleFormState = {
  fullName: "",
  email: "",
  countryCode: "pa",
  phone: "",
  residenceCountry: "Panamá",
  companyStage: businessStageOptions[0],
  serviceInterest: consultationTypeOptions[0],
  message: "",
};

const wideContainerClass =
  "mx-auto w-full max-w-[1500px] px-5 sm:px-6 lg:px-10 2xl:px-12";

const mediumContainerClass =
  "mx-auto w-full max-w-[1180px] px-5 sm:px-6 lg:px-10 2xl:px-12";

const contactEmail = "soporte@craghilladvisory.com";
const contactPhoneDisplay = "+1 505 207 2705";
const contactPhoneHref = "tel:+15052072705";
const contactLocation = "Albuquerque, New Mexico, USA";

function SectionReveal({
  children,
  className,
  id,
  viewportAmount = 0.18,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  viewportAmount?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: viewportAmount }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

function LogoMark({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#inicio" className="block" aria-label="Craghill Advisory">
      <Image
        src="/logo-web-craghill.svg"
        alt="Craghill Advisory"
        width={210}
        height={72}
        className={cn("h-12 w-auto", dark ? "brightness-0 invert" : "")}
        priority
      />
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

function ScheduleButton({
  children,
  variant = "primary",
  className,
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "light";
  className?: string;
  onClick: () => void;
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
    <Button
      type="button"
      variant={variant === "outline" ? "outline" : "default"}
      size="lg"
      onClick={onClick}
      className={cn(
        "h-11 min-w-40 gap-2 rounded-md px-5 shadow-sm",
        styles[variant],
        className
      )}
    >
      {children}
      <ArrowRight data-icon="inline-end" />
    </Button>
  );
}

function FlagSwatch({ iso }: { iso: string }) {
  return (
    <span className="relative block aspect-[3/2] w-8 overflow-hidden rounded-[2px] border border-foreground/10 bg-white shadow-sm">
      <Image
        src={`/flags/${iso}.svg`}
        alt=""
        fill
        sizes="32px"
        className="object-contain"
        unoptimized
        aria-hidden="true"
      />
    </span>
  );
}

function ScheduleDialog({
  open,
  onOpenChange,
  initialService,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialService: string;
}) {
  const [form, setForm] = useState<ScheduleFormState>(() => ({
    ...initialScheduleForm,
    serviceInterest: initialService,
  }));
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const selectedPhoneCountry =
    phoneCountries.find((country) => country.id === form.countryCode) ??
    phoneCountries[0];
  const selectClassName =
    "h-11 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitStatus("loading");
    setSubmitMessage("");

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: form.fullName,
        email: form.email,
        phone: `${selectedPhoneCountry.code} ${form.phone}`.trim(),
        companyStage: form.companyStage,
        serviceInterest: form.serviceInterest,
        message: `País de residencia: ${form.residenceCountry}\n\n${form.message || "Sin mensaje adicional"}`,
        source: "schedule-popup",
      }),
    });
    const result = (await response.json()) as {
      message?: string;
      error?: string;
    };

    if (!response.ok) {
      setSubmitStatus("error");
      setSubmitMessage(result.error ?? "No pudimos enviar el correo.");
      return;
    }

    setSubmitStatus("success");
    setSubmitMessage(
      result.message ?? "Gracias. Recibimos tu información y te contactaremos pronto."
    );
    setForm(initialScheduleForm);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-white p-6 shadow-[0_24px_80px_rgba(23,50,69,0.22)] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Agenda tu consulta
          </DialogTitle>
          <DialogDescription className="leading-6">
            Déjanos tus datos y te contactaremos por correo electrónico.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="schedule-full-name">
                Nombre y apellido
              </FieldLabel>
              <Input
                id="schedule-full-name"
                required
                value={form.fullName}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    fullName: event.target.value,
                  }))
                }
                placeholder="Tu nombre completo"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="schedule-email">Correo</FieldLabel>
              <Input
                id="schedule-email"
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

          <div className="grid gap-4 sm:grid-cols-[0.92fr_1.08fr]">
            <Field>
              <FieldLabel htmlFor="schedule-code">Código del país</FieldLabel>
              <div className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-2">
                <span className="grid h-11 place-items-center rounded-md border border-input bg-white">
                  <FlagSwatch iso={selectedPhoneCountry.iso} />
                </span>
                <select
                  id="schedule-code"
                  className={selectClassName}
                  value={form.countryCode}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      countryCode: event.target.value,
                    }))
                  }
                >
                  {phoneCountries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.code} {country.label}
                    </option>
                  ))}
                </select>
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="schedule-phone">Celular</FieldLabel>
              <Input
                id="schedule-phone"
                required
                inputMode="tel"
                value={form.phone}
                onChange={(event) =>
                  setForm((current) => ({ ...current, phone: event.target.value }))
                }
                placeholder="123 4567"
              />
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="schedule-residence">
              País de residencia
            </FieldLabel>
            <select
              id="schedule-residence"
              className={selectClassName}
              value={form.residenceCountry}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  residenceCountry: event.target.value,
                }))
              }
            >
              {residenceCountries.map((country, index) => (
                <option key={`${country}-${index}`} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="schedule-service-interest">
                Tipo de consulta
              </FieldLabel>
              <select
                id="schedule-service-interest"
                className={selectClassName}
                value={form.serviceInterest}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    serviceInterest: event.target.value,
                  }))
                }
              >
                {consultationTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Field>
              <FieldLabel htmlFor="schedule-company-stage">
                Etapa del negocio
              </FieldLabel>
              <select
                id="schedule-company-stage"
                className={selectClassName}
                value={form.companyStage}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    companyStage: event.target.value,
                  }))
                }
              >
                {businessStageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="schedule-message">Mensaje</FieldLabel>
            <Textarea
              id="schedule-message"
              rows={4}
              value={form.message}
              onChange={(event) =>
                setForm((current) => ({ ...current, message: event.target.value }))
              }
              placeholder="Cuéntanos qué necesitas resolver."
            />
          </Field>

          {submitMessage ? (
            <div
              className={cn(
                "rounded-md border px-4 py-3 text-sm font-medium",
                submitStatus === "error"
                  ? "border-destructive/30 bg-destructive/10 text-destructive"
                  : "border-primary/25 bg-primary/10 text-foreground"
              )}
            >
              {submitMessage}
            </div>
          ) : null}

          <div>
            <Button
              type="submit"
              disabled={submitStatus === "loading"}
              className="h-11 w-full rounded-md bg-primary text-primary-foreground hover:bg-[var(--brand-strong)]"
            >
              <Mail data-icon="inline-start" />
              {submitStatus === "loading" ? "Enviando..." : "Enviar por correo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function LeadForm() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const selectedPhoneCountry =
    phoneCountries.find((country) => country.id === form.countryCode) ??
    phoneCountries[0];
  const selectClassName =
    "h-11 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        phone: form.phone
          ? `${selectedPhoneCountry.code} ${form.phone}`.trim()
          : "",
      }),
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
        <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
          <Field>
            <FieldLabel htmlFor="lead-country-code">Código del país</FieldLabel>
            <div className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-2">
              <span className="grid h-11 place-items-center rounded-md border border-input bg-white">
                <FlagSwatch iso={selectedPhoneCountry.iso} />
              </span>
              <select
                id="lead-country-code"
                className={selectClassName}
                value={form.countryCode}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    countryCode: event.target.value,
                  }))
                }
              >
                {phoneCountries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.code} {country.label}
                  </option>
                ))}
              </select>
            </div>
          </Field>
          <Field>
            <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
            <Input
              id="phone"
              inputMode="tel"
              value={form.phone}
              onChange={(event) =>
                setForm((current) => ({ ...current, phone: event.target.value }))
              }
              placeholder="123 4567"
            />
          </Field>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="serviceInterest">Servicio de interés</FieldLabel>
            <select
              id="serviceInterest"
              className={selectClassName}
              value={form.serviceInterest}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  serviceInterest: event.target.value,
                }))
              }
            >
              {consultationTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
          <Field>
            <FieldLabel htmlFor="companyStage">Etapa de tu negocio</FieldLabel>
            <select
              id="companyStage"
              className={selectClassName}
              value={form.companyStage}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  companyStage: event.target.value,
                }))
              }
            >
              {businessStageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        </div>
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
            Este formulario se enviará al correo de soporte cuando configures Resend en Vercel.
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
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(
    "Quiero orientación general"
  );

  function openSchedule(service = "Quiero orientación general") {
    setSelectedService(service);
    setScheduleOpen(true);
  }

  return (
    <main id="inicio" className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-white/92 backdrop-blur">
        <div className={cn(wideContainerClass, "flex h-20 items-center justify-between gap-5")}>
          <LogoMark />
          <nav className="hidden items-center gap-5 xl:gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative whitespace-nowrap text-sm font-semibold text-foreground/80 transition hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden lg:block">
            <ScheduleButton
              className="min-w-0"
              variant="primary"
              onClick={() => openSchedule()}
            >
              Agendar consulta
            </ScheduleButton>
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
          <div className="border-t border-border bg-white py-4 lg:hidden">
            <nav className={cn(wideContainerClass, "flex flex-col gap-3")}>
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
              <ScheduleButton
                className="mt-2 w-full"
                variant="primary"
                onClick={() => {
                  setMenuOpen(false);
                  openSchedule();
                }}
              >
                Agendar consulta
              </ScheduleButton>
            </nav>
          </div>
        ) : null}
      </header>

      <section className="relative overflow-hidden bg-white">
        <div className="grid min-h-[700px] w-full items-center gap-10 px-5 py-16 sm:px-6 lg:min-h-[740px] lg:grid-cols-[minmax(2.5rem,calc((100vw-1500px)/2+2.5rem))_minmax(440px,650px)_minmax(0,1fr)] lg:gap-0 lg:px-0 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10 flex flex-col gap-8 lg:col-start-2 lg:pr-12"
          >
            <div className="max-w-2xl">
              <h1 className="text-balance text-[2.45rem] font-extrabold leading-[1.08] tracking-normal text-foreground sm:text-5xl md:text-6xl">
                Tu empresa en Estados Unidos,{" "}
                <span className="text-primary">sin visa y sin complicaciones</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
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
              <ScheduleButton
                variant="outline"
                onClick={() => openSchedule()}
              >
                Agendar consulta
              </ScheduleButton>
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
            className="relative min-h-[460px] overflow-hidden rounded-none lg:col-start-3 lg:min-h-[620px]"
          >
            <Image
              src="/hero-placeholder.png"
              alt="Asesor trabajando remotamente en una oficina luminosa"
              fill
              priority
              className="object-cover object-center"
              sizes="(min-width: 1024px) 62vw, 100vw"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
          </motion.div>
        </div>
      </section>

      <SectionReveal id="servicios" className="scroll-mt-24 bg-secondary py-16">
        <div className={wideContainerClass}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
              Servicios para crear y mantener tu{" "}
              <span className="text-primary">LLC en regla</span>
            </h2>
            <p className="mt-4 text-sm font-medium leading-7 text-muted-foreground">
              Centralizamos la formación, documentación, cumplimiento y operación inicial
              de tu empresa en Estados Unidos.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {serviceItems.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="flex gap-4 rounded-lg border border-primary/20 bg-white p-5 shadow-sm"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs font-medium leading-6 text-muted-foreground">
                      {service.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-secondary pb-16">
        <div className={cn(wideContainerClass, "grid gap-10 lg:grid-cols-3")}>
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

      <SectionReveal id="proceso" className="scroll-mt-24 bg-white py-16">
        <div className={wideContainerClass}>
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

      <SectionReveal
        id="planes"
        viewportAmount={0.04}
        className="scroll-mt-24 bg-white pb-16"
      >
        <div className={wideContainerClass}>
          <h2 className="text-center text-3xl font-bold text-foreground">
            Planes simples y transparentes
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm font-medium leading-7 text-muted-foreground">
            Elige el nivel de acompañamiento que necesita tu empresa hoy.
          </p>
          <div className="mt-8 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "h-full rounded-lg border-primary/35 bg-white shadow-sm",
                  plan.name === "MONITORING" && "border-primary bg-secondary/55"
                )}
              >
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
                  ) : null}
                  <p className="min-h-10 max-w-xs text-sm font-medium leading-5 text-muted-foreground">
                    {plan.tagline}
                  </p>
                  <div className="flex justify-center gap-3 pt-2">
                    {plan.icons.map((Icon, iconIndex) => (
                      <span key={`${plan.name}-${iconIndex}`} className="grid size-10 place-items-center rounded-full bg-accent text-primary">
                        <Icon className="size-5" />
                      </span>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="flex flex-col gap-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm font-medium leading-6 text-foreground/78">
                        <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {plan.disclaimer ? (
                    <details className="mt-5 rounded-md border border-primary/20 bg-white/80 px-4 py-3 text-xs text-muted-foreground">
                      <summary className="cursor-pointer font-bold text-foreground">
                        Qué incluye Monitoring
                      </summary>
                      <p className="mt-2 leading-5">{plan.disclaimer}</p>
                    </details>
                  ) : null}
                </CardContent>
                <CardFooter className="border-0 bg-transparent px-6 pb-6">
                  <Button
                    type="button"
                    onClick={() => openSchedule(plan.serviceInterest)}
                    className="h-10 w-full rounded-md bg-primary text-primary-foreground hover:bg-[var(--brand-strong)]"
                  >
                    {plan.cta}
                    <ArrowRight data-icon="inline-end" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-8 rounded-lg border border-primary/25 bg-secondary p-5 shadow-sm">
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="text-2xl font-bold text-foreground">
                Precios pensados para emprendedores,{" "}
                <span className="text-primary">no para inflar costos</span>
              </h3>
              <p className="mt-3 text-sm font-medium leading-7 text-muted-foreground">
                Una alternativa clara frente a servicios tradicionales que suelen
                cobrar mucho más por procesos similares.
              </p>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {priceComparisons.map((comparison) => {
                const Icon = comparison.icon;
                return (
                  <div
                    key={comparison.title}
                    className="rounded-lg border border-primary/25 bg-white p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-primary">
                        <Icon className="size-5" />
                      </span>
                      <h4 className="font-bold text-foreground">
                        {comparison.title}
                      </h4>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-md border border-border bg-muted p-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                          Mercado tradicional
                        </p>
                        <p className="mt-2 text-lg font-bold text-foreground/75">
                          {comparison.marketPrice}
                        </p>
                      </div>
                      <div className="rounded-md border border-primary/35 bg-primary/10 p-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-primary">
                          Nuestra propuesta
                        </p>
                        <p className="mt-2 text-lg font-bold text-foreground">
                          {comparison.ourPrice}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm font-medium leading-7 text-muted-foreground">
                      {comparison.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-14">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-sm font-bold uppercase tracking-wide text-primary">
                Servicios adicionales
              </span>
              <h3 className="mt-2 text-3xl font-bold text-foreground">
                Apoyo puntual para cada etapa de tu LLC
              </h3>
              <p className="mt-3 text-sm font-medium leading-7 text-muted-foreground">
                Soluciones específicas para operar y mantener tu empresa sin contratar un plan completo.
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {additionalServices.map((service) => {
                const Icon = service.icon;
                return (
                  <article
                    key={service.title}
                    className={cn(
                      "flex h-full flex-col rounded-lg border border-border bg-white p-5 shadow-sm",
                      service.featured &&
                        "border-primary bg-[#4d5669] shadow-[0_14px_35px_rgba(77,86,105,0.2)] xl:col-span-2"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={cn(
                          "grid size-11 shrink-0 place-items-center rounded-full bg-accent text-primary",
                          service.featured && "bg-primary text-[#4d5669]"
                        )}
                      >
                        <Icon className="size-5" />
                      </span>
                      {service.featured ? (
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                          Bundle · 2 servicios
                        </span>
                      ) : null}
                    </div>
                    <h4
                      className={cn(
                        "mt-5 text-lg font-bold leading-6 text-foreground",
                        service.featured && "text-white"
                      )}
                    >
                      {service.title}
                    </h4>
                    {service.bundleItems ? (
                      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                        {service.bundleItems.map((item, index) => {
                          const BundleIcon = item.icon;
                          return (
                            <div key={item.title} className="contents">
                              {index > 0 ? (
                                <span className="mx-auto grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
                                  <Plus className="size-4" />
                                </span>
                              ) : null}
                              <div
                                className={cn(
                                  "flex items-center gap-3 rounded-md border border-primary/25 p-4",
                                  index % 2 === 0 ? "bg-white" : "bg-[#e8fbfc]"
                                )}
                              >
                                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                                  <BundleIcon className="size-5" />
                                </span>
                                <div>
                                  <p className="text-sm font-bold text-foreground">{item.title}</p>
                                  <p className="text-lg font-bold text-primary">{item.price}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                    <div
                      className={cn(
                        "mt-2",
                        service.featured && "flex flex-wrap items-end gap-3"
                      )}
                    >
                      {service.originalPrice ? (
                        <span
                          className={cn(
                            "pb-1 text-sm font-semibold text-muted-foreground line-through",
                            service.featured && "text-white/65"
                          )}
                        >
                          {service.originalPrice}
                        </span>
                      ) : null}
                      <p className="text-2xl font-bold text-primary">{service.price}</p>
                      {service.featured ? (
                        <span className="pb-1 text-xs font-bold uppercase tracking-wide text-primary">
                          precio conjunto
                        </span>
                      ) : null}
                    </div>
                    <p
                      className={cn(
                        "mt-3 flex-1 text-sm font-medium leading-6 text-muted-foreground",
                        service.featured && "text-white/85"
                      )}
                    >
                      {service.body}
                    </p>
                    {service.note ? (
                      <p className={cn(
                        "mt-3 text-xs font-semibold leading-5 text-muted-foreground",
                        service.featured && "text-primary"
                      )}>
                        {service.note}
                      </p>
                    ) : null}
                    <Button
                      type="button"
                      variant="outline"
                      aria-label={
                        service.featured
                          ? "Solicitar servicios Banking + Payments"
                          : `Solicitar ${service.title}`
                      }
                      onClick={() => openSchedule(service.title)}
                      className={cn(
                        "mt-5 h-10 w-full rounded-md border-primary/35 bg-white hover:bg-accent",
                        service.featured &&
                          "border-primary bg-primary font-bold text-[#4d5669] hover:bg-white"
                      )}
                    >
                      {service.featured ? "Solicitar servicios" : "Solicitar"}
                      <ArrowRight data-icon="inline-end" />
                    </Button>
                  </article>
                );
              })}
            </div>
            <div className="mt-5 grid gap-5 rounded-lg border border-primary/25 bg-secondary p-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-primary">
                    <Files className="size-5" />
                  </span>
                  <h4 className="text-xl font-bold text-foreground">¿Necesitas otra gestión?</h4>
                </div>
                <p className="mt-3 max-w-4xl text-sm font-medium leading-6 text-muted-foreground">
                  Podemos ayudarte con modificaciones de tu LLC, cambios en el Operating Agreement, certificados y otras gestiones. Evaluamos tu necesidad y confirmamos el costo antes de comenzar.
                </p>
              </div>
              <Button
                type="button"
                onClick={() => openSchedule("Otro")}
                className="h-11 rounded-md bg-primary px-5 text-primary-foreground hover:bg-[var(--brand-strong)]"
              >
                Consultar otra gestión
                <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
            <p className="mx-auto mt-5 max-w-5xl text-center text-xs font-medium leading-5 text-muted-foreground">
              La apertura de cuentas bancarias y la aprobación de procesadores de pago dependen de los requisitos, verificaciones y decisión final de cada institución o proveedor.
            </p>
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

      <SectionReveal id="clientes" className="scroll-mt-24 bg-white pb-16">
        <div className={wideContainerClass}>
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

      <SectionReveal id="launch" className="scroll-mt-24 bg-white py-16">
        <div className={mediumContainerClass}>
          <div className="flex justify-center">
            <Image
              src="/badge_llc_badge.png"
              alt="Craghill Advisory LLC Formation Certified"
              width={712}
              height={821}
              className="h-52 w-auto object-contain md:h-56"
            />
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-3xl font-bold text-foreground">
              ¿Qué incluye el <span className="text-primary">plan launch?</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-7 text-muted-foreground">
              Todo lo que necesitas para crear y operar tu LLC en Estados Unidos de forma clara, segura y 100% remota.
            </p>
          </div>
          <div className="mt-8 grid gap-4 rounded-lg border border-primary/30 bg-white p-4 shadow-sm md:grid-cols-2">
            {launchIncludes.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4 rounded-md border border-primary/15 bg-background p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-xs font-medium leading-6 text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal id="compliance" className="scroll-mt-24 bg-white py-16">
        <div className={mediumContainerClass}>
          <div className="flex justify-center">
            <Image
              src="/bad_compilance_badge.png"
              alt="Craghill Advisory Compliance Verified"
              width={854}
              height={915}
              className="h-60 w-auto object-contain md:h-64"
            />
          </div>
          <div className="mt-8 rounded-lg border border-primary/25 bg-white p-8 text-center shadow-sm">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-accent text-primary">
              <ShieldCheck className="size-6" />
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground">
              Protege tu empresa. Mantente en regla.{" "}
              <span className="text-primary">Crece sin preocupaciones.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm font-medium leading-7 text-muted-foreground">
              Nos encargamos del cumplimiento legal y operativo en Estados Unidos, para que tú te enfoques en hacer crecer tu negocio.
            </p>
          </div>
          <div className="mt-5 rounded-lg border border-primary/30 bg-white p-4 shadow-sm">
            <h3 className="py-3 text-center text-sm font-bold text-foreground">
              Todo lo que incluye tu <span className="text-primary">suscripción</span>
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {complianceIncludes.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4 rounded-md border border-primary/15 bg-background p-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-primary">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                      <p className="mt-1 text-xs font-medium leading-6 text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 rounded-md border border-primary/30 bg-primary/5 p-4 text-center">
              <h4 className="text-sm font-bold text-foreground">
                Tu tranquilidad no es opcional. Es parte del servicio.
              </h4>
              <p className="mt-1 text-xs font-medium leading-6 text-muted-foreground">
                Nos encargamos del cumplimiento para que tu LLC esté siempre al día.
              </p>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal id="lead-form" className="scroll-mt-24 bg-secondary py-16">
        <div className={cn(wideContainerClass, "grid gap-10 lg:grid-cols-[0.8fr_1.2fr]")}>
          <div className="flex flex-col justify-center gap-5">
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <MessageCircle className="size-7" />
            </span>
            <h2 className="text-4xl font-bold leading-tight text-foreground">
              Agenda una consulta y descubre cómo podemos ayudarte.
            </h2>
            <p className="text-base font-medium leading-7 text-muted-foreground">
              Los botones principales de la página llegan aquí. Recibiremos tu
              solicitud en el correo de soporte para orientarte con el siguiente
              paso de tu empresa.
            </p>
          </div>
          <LeadForm />
        </div>
      </SectionReveal>

      <SectionReveal id="faqs" className="scroll-mt-24 bg-white py-16">
        <div className={wideContainerClass}>
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
        <div className={cn(wideContainerClass, "flex flex-col gap-5 md:flex-row md:items-center md:justify-between")}>
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
          <ScheduleButton
            variant="light"
            onClick={() => openSchedule()}
          >
            Agendar consulta gratuita
          </ScheduleButton>
        </div>
      </section>

      <footer id="contacto" className="bg-[var(--footer)] py-12 text-white">
        <div className={cn(wideContainerClass, "grid gap-10 md:grid-cols-[1.2fr_0.9fr_0.9fr]")}>
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
                <a href={`mailto:${contactEmail}`} className="transition hover:text-primary">
                  {contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-primary" />
                <a
                  href={contactPhoneHref}
                  className="transition hover:text-primary"
                >
                  {contactPhoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-4 text-primary" />
                {contactLocation}
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
        <Separator className="mx-auto mt-10 max-w-[1500px] bg-white/10" />
        <p className={cn(wideContainerClass, "mt-6 text-center text-sm text-white/60")}>
          © 2024 Craghill Advisory. Todos los derechos reservados.
        </p>
      </footer>

      <ScheduleDialog
        key={selectedService}
        open={scheduleOpen}
        onOpenChange={setScheduleOpen}
        initialService={selectedService}
      />
    </main>
  );
}
