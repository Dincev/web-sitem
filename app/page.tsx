"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Shield,
  Tablet,
  ArrowRight,
  Zap,
  Lightbulb,
  Video,
  Mic,
  Bell,
  Thermometer,
  Move,
  Power,
  Droplets,
  Volume2,
  Sun,
  Plus,
  RefreshCw,
  Infinity as InfinityIcon,
  X,
  Send,
  Loader2,
  CheckCircle,
  ShoppingBag,
  Menu,
  Wifi,
} from "lucide-react";

/* ─────────────────────────────────────────────────────
   YARDIMCI SABİTLER
───────────────────────────────────────────────────── */
const EASE_CURVE = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────────────
   YARDIMCI BİLEŞENLER
───────────────────────────────────────────────────── */

function SplitText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <span ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-block mr-[0.22em] last:mr-0"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(28px)",
            filter: isInView ? "blur(0px)" : "blur(6px)",
            transition: `opacity 0.75s ${delay + i * 0.05}s, transform 0.75s ${delay + i * 0.05}s, filter 0.75s ${delay + i * 0.05}s`,
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

const FadeIn = ({
  children,
  className = "",
  delay = 0,
  y = 36,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  id?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      id={id}
      ref={ref}
      className={`content-visibility-auto ${className}`}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.95, delay, ease: EASE_CURVE }}
    >
      {children}
    </motion.div>
  );
};

function StaggerGrid({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {children}
    </motion.div>
  );
}

const staggerChild = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_CURVE },
  },
};

/* ─────────────────────────────────────────────────────
   ANA COMPONENT
───────────────────────────────────────────────────── */
export default function DincEvSmartHome() {
  const [mounted, setMounted] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [propertyType, setPropertyType] = useState("Ev");
  const [constructionStatus, setConstructionStatus] = useState("İnşaat Edilmiş");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  const heroSectionRef = useRef<HTMLElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow =
      isContactOpen || mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isContactOpen, mobileMenuOpen]);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setNavScrolled(v > 24));

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.93]);

  const bgColor = useTransform(
    scrollY,
    [0, 400, 900],
    ["#ffffff", "#fafafa", "#f5f5f7"]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const CONTACT_URL =
      "https://script.google.com/macros/s/AKfycbyE_nVt88-Cz5IGJN66s4KnpsY6H_YXBTZ_kRaCoS71Ka2BtnPqzPEcw3b2LJtotNeuqQ/exec";

    const payload = {
      name: `${formData.get("isim")} ${formData.get("soyisim")}`,
      email: formData.get("mail"),
      subject: "Yeni İletişim / Bilgi Alma Talebi",
      message: `Telefon: ${formData.get("telefon")}\nİl: ${formData.get(
        "il"
      )}\nAlan: ${formData.get("alan")}\nProje Türü: ${propertyType}\nİnşaat Durumu: ${constructionStatus}`,
    };

    try {
      await fetch(CONTACT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      form.reset();
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsContactOpen(false);
        setTimeout(() => setIsSuccess(false), 500);
      }, 3500);
    } catch {
      setIsSubmitting(false);
      alert("Hata oluştu. İnternet bağlantınızı kontrol edip tekrar deneyin.");
    }
  };

  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <motion.div
      style={{ backgroundColor: bgColor }}
      className="font-sans text-[#1d1d1f] relative"
    >
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          navScrolled
            ? "bg-white/85 backdrop-blur-2xl border-b border-black/[0.07] shadow-[0_1px_0_rgba(0,0,0,0.05)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6 h-12 md:h-14 flex items-center justify-between text-sm">
          <Link
            href="#hero"
            className="flex items-center gap-2 font-semibold tracking-tight select-none"
          >
            <div className="w-7 h-7 rounded-[8px] flex items-center justify-center shadow-md overflow-hidden bg-white">
              <Image
                src="/logo.png"
                alt="DinçEv"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <span className="hidden sm:inline text-[15px] font-bold uppercase tracking-wider text-[#1d1d1f]">
              DinçEv
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-[#6e6e73] font-medium text-[13px]">
            <Link href="#ozellikler" className="hover:text-black transition-colors">
              Özellikler
            </Link>
            <Link href="#ekosistem" className="hover:text-black transition-colors">
              Ekosistem
            </Link>
            <Link href="#paketler" className="hover:text-black transition-colors">
              Paketler
            </Link>
            <Link
              href="/magaza"
              className="hover:text-black transition-colors flex items-center gap-1.5 text-[#1d1d1f]"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Mağaza
            </Link>
            <Link
              href="/destek"
              className="text-[#0071e3] font-semibold hover:text-blue-700 transition-colors"
            >
              Destek
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsContactOpen(true)}
              className="hidden sm:block bg-[#1d1d1f] hover:bg-[#0071e3] text-white px-4 py-[7px] rounded-full text-[12px] font-semibold transition-colors duration-200 shadow-sm"
            >
              İletişim
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-slate-700 hover:text-black transition-colors"
              aria-label="Menü"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobil menü */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: EASE_CURVE }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col px-6 py-6 space-y-5 text-[15px] font-medium text-[#1d1d1f]">
                {[
                  { href: "#ozellikler", label: "Özellikler" },
                  { href: "#ekosistem", label: "Ekosistem" },
                  { href: "#paketler", label: "Paketler" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#6e6e73] hover:text-black transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/magaza"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-[#6e6e73] hover:text-black transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" /> Mağaza
                </Link>
                <Link
                  href="/destek"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#0071e3] font-bold"
                >
                  Destek
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsContactOpen(true);
                  }}
                  className="w-full bg-[#1d1d1f] text-white py-3 rounded-full text-sm font-semibold hover:bg-[#0071e3] transition-colors"
                >
                  İletişim
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section
        ref={heroSectionRef}
        id="hero"
        className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center bg-white px-5 md:px-6 overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[900px] h-[320px] md:h-[900px] bg-gradient-to-tr from-blue-50/90 to-indigo-50/50 rounded-full blur-[80px] md:blur-[130px] -z-10" />
        <div className="absolute top-[20%] right-[5%] w-64 h-64 bg-cyan-50/60 rounded-full blur-[80px] -z-10 hidden md:block" />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="z-10 flex flex-col items-center max-w-5xl pt-20 md:pt-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE_CURVE }}
            className="mb-7 md:mb-8 px-4 py-1.5 rounded-full bg-white/90 border border-slate-200/70 flex items-center gap-2 shadow-sm backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.18em] text-[#1d1d1f] uppercase">
              DinçEv · Akıllı Yaşam Platformu
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE_CURVE }}
            className="text-[46px] sm:text-[72px] md:text-[110px] lg:text-[148px] font-extrabold tracking-tighter leading-[0.88] mb-7 md:mb-8 text-[#1d1d1f]"
          >
            Eviniz.
            <br />
            <span
              className="animate-gradient-x"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #0071e3, #34aadc, #5ac8fa, #0071e3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "300% auto",
              }}
            >
              Sizi anlasın.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.38, ease: EASE_CURVE }}
            className="text-[16px] md:text-[22px] lg:text-[26px] text-[#6e6e73] max-w-[320px] md:max-w-3xl mx-auto font-medium leading-snug"
          >
            Tuya ve Zigbee altyapısıyla sınırları aşın.{" "}
            <span className="text-[#1d1d1f]">
              Hayalinizdeki senaryoları şimdi gerçeğe dönüştürün.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.52, ease: EASE_CURVE }}
            className="mt-9 flex flex-col sm:flex-row items-center gap-3"
          >
            <button
              onClick={() => setIsContactOpen(true)}
              className="bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 text-white text-[15px] md:text-[17px] font-semibold px-8 py-3.5 rounded-full transition-all duration-200 shadow-xl shadow-blue-500/25 flex items-center gap-2"
            >
              Ücretsiz Keşif <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#ozellikler"
              className="text-[15px] md:text-[17px] font-semibold text-[#0071e3] hover:underline underline-offset-2 transition-colors"
            >
              Özellikleri keşfedin
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ÖZELLIKLER */}
      <FadeIn
        id="ozellikler"
        className="py-14 md:py-24 px-4 md:px-6 max-w-[1400px] mx-auto"
      >
        <div className="bg-[#1d1d1f] text-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-14 lg:p-20 relative overflow-hidden flex flex-col xl:flex-row items-center justify-between shadow-2xl group">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/20 rounded-full blur-[70px] group-hover:bg-blue-500/30 transition-colors duration-700 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/15 rounded-full blur-[70px] pointer-events-none" />

          <div className="max-w-2xl text-center xl:text-left relative z-10 mb-12 xl:mb-0">
            <div className="flex items-center justify-center xl:justify-start gap-2.5 mb-5">
              <InfinityIcon className="text-[#0071e3] w-6 h-6" />
              <span className="text-[#0071e3] font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">
                Sonsuz Esneklik
              </span>
            </div>
            <h2 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold mb-5 tracking-tight leading-[1.04] text-white">
              Her zaman
              <br className="hidden md:block" /> en yenisi.
            </h2>
            <p className="text-[#86868b] text-base md:text-xl leading-relaxed font-light">
              Kapalı ve eskimeye mahkûm sistemlere bağlı kalmazsınız. DinçEv
              altyapısı, piyasaya sürülen{" "}
              <strong className="text-white font-medium">
                en yeni akıllı cihazları anında ağınıza entegre eder.
              </strong>{" "}
              Teknolojiniz asla eskimiyor; eviniz sürekli evrim geçiriyor.
            </p>
          </div>

          <div className="relative w-56 h-56 md:w-80 md:h-80 xl:w-96 xl:h-96 flex items-center justify-center z-10 shrink-0">
            <div className="absolute inset-0 border border-white/[0.08] rounded-full animate-spin-slow" />
            <div
              className="absolute inset-5 border border-white/[0.05] rounded-full"
              style={{ animation: "spin-slow 18s linear infinite reverse" }}
            />
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#0071e3] to-[#34aadc] rounded-2xl md:rounded-3xl flex items-center justify-center shadow-[0_0_60px_rgba(0,113,227,0.55)] z-20">
              <RefreshCw className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute top-6 left-6 md:top-10 md:left-10 w-10 h-10 md:w-12 md:h-12 bg-[#2c2c2e] border border-white/10 rounded-xl flex items-center justify-center shadow-lg"
            >
              <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
            </motion.div>
            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 4.5, repeat: Infinity }}
              className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-10 h-10 md:w-12 md:h-12 bg-[#2c2c2e] border border-white/10 rounded-xl flex items-center justify-center shadow-lg"
            >
              <Thermometer className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2.8, repeat: Infinity }}
              className="absolute top-1/2 -right-2 md:-right-4 w-8 h-8 md:w-10 md:h-10 bg-[#0071e3] rounded-full flex items-center justify-center shadow-lg"
            >
              <Plus className="w-4 h-4 text-white" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 0.9, 1] }}
              transition={{ duration: 3.2, repeat: Infinity }}
              className="absolute top-1/2 -left-2 md:-left-4 w-8 h-8 md:w-10 md:h-10 bg-[#2c2c2e] border border-white/10 rounded-full flex items-center justify-center"
            >
              <Wifi className="w-3.5 h-3.5 text-[#0071e3]" />
            </motion.div>
          </div>
        </div>
      </FadeIn>

      {/* SENARYOLAR */}
      <FadeIn className="py-14 md:py-24 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#0071e3] uppercase mb-4">
              Akıllı Yaşam
            </p>
            <h2 className="text-[28px] md:text-[44px] font-bold tracking-tight mb-8 leading-[1.1] text-[#1d1d1f]">
              <SplitText text="Teknolojiyle harmanlanmış tam konfor." />
            </h2>
            <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  Icon: Thermometer,
                  color: "text-orange-500",
                  bg: "bg-orange-50",
                  title: "İklim Kontrolü",
                  desc: "Sıcaklık ve nem sensörleri ideal havayı sabit tutar.",
                },
                {
                  Icon: Shield,
                  color: "text-blue-600",
                  bg: "bg-blue-50",
                  title: "Akıllı Alarm",
                  desc: "Kapı ve pencereler 7/24 denetim altında.",
                },
                {
                  Icon: Droplets,
                  color: "text-cyan-500",
                  bg: "bg-cyan-50",
                  title: "Su Baskını",
                  desc: "Kaçak algılandığında ana vanayı anında kapatır.",
                },
                {
                  Icon: Move,
                  color: "text-violet-500",
                  bg: "bg-violet-50",
                  title: "Varlık Algılama",
                  desc: "Odaya girdiğinizde senaryolar başlar.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={staggerChild}
                  whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
                  className="bg-white p-5 rounded-3xl border border-[#e8e8ed] shadow-sm cursor-default transition-shadow duration-300"
                >
                  <div
                    className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center mb-3`}
                  >
                    <item.Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <h4 className="font-bold text-[14px] text-[#1d1d1f] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[13px] text-[#6e6e73] leading-snug">{item.desc}</p>
                </motion.div>
              ))}
            </StaggerGrid>
          </div>

          <div className="bg-[#f5f5f7] rounded-[3rem] p-6 md:p-8 shadow-inner aspect-square flex items-center justify-center relative overflow-hidden border border-white/80">
            <div className="w-full h-full bg-white rounded-[2.5rem] shadow-2xl p-5 md:p-7 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-700">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
                  Otomasyon Devrede
                </span>
                <Sun className="w-5 h-5 text-orange-400 animate-spin-slow" />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { label: "Ev İçi Isı", value: "22.5°C", col: "text-[#1d1d1f]" },
                  { label: "Nem Oranı", value: "%45", col: "text-[#0071e3]" },
                  { label: "Hava Kalitesi", value: "Mükemmel", col: "text-green-600" },
                  { label: "Aktif Cihaz", value: "32 Adet", col: "text-amber-500" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-3 bg-[#f5f5f7] rounded-2xl border border-[#e8e8ed]/60"
                  >
                    <div className="text-[9px] text-[#aeaeb2] font-bold uppercase mb-1">
                      {item.label}
                    </div>
                    <div className={`text-base md:text-lg font-bold ${item.col}`}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-[#aeaeb2] font-medium mb-1.5">
                  <span>Enerji Kullanımı</span>
                  <span className="text-[#0071e3] font-bold">%85</span>
                </div>
                <div className="h-1.5 w-full bg-[#f5f5f7] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: EASE_CURVE }}
                    className="h-full bg-gradient-to-r from-[#0071e3] to-[#34aadc] rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* EKOSİSTEM */}
      <FadeIn
        id="ekosistem"
        className="py-14 md:py-24 px-4 md:px-6 max-w-[1400px] mx-auto"
      >
        <div className="relative overflow-hidden bg-white rounded-[3rem] md:rounded-[4rem] p-8 md:p-14 lg:p-16 flex flex-col xl:flex-row items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-[#e8e8ed] group">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-orange-50/30 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-1000 pointer-events-none" />
          <div className="max-w-xl text-center xl:text-left mb-10 xl:mb-0 relative z-10">
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#0071e3] uppercase mb-4">
              Uyumluluk
            </p>
            <h2 className="text-[26px] md:text-[42px] font-bold mb-4 tracking-tight leading-[1.06] text-[#1d1d1f]">
              <SplitText text="Alıştığınız ekosistemle tam uyumlu." />
            </h2>
            <p className="text-[#6e6e73] text-base md:text-lg font-light leading-relaxed">
              Dünyanın en güçlü akıllı ev platformlarıyla kusursuz iletişim.
              Seçim sizin, kontrol sizin.
            </p>
          </div>
          <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-2 gap-4 relative z-10 w-full xl:w-auto">
            {[
              { src: "/apple.svg", alt: "Apple HomeKit" },
              { src: "/google.svg", alt: "Google Home" },
              { src: "/tuya.svg", alt: "Tuya" },
              { src: "/zigbee.svg", alt: "Zigbee" },
            ].map((logo, i) => (
              <motion.div
                key={i}
                variants={staggerChild}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-[#f5f5f7] hover:bg-white w-full h-24 rounded-2xl flex items-center justify-center border border-transparent hover:border-[#e8e8ed] hover:shadow-xl transition-all duration-300 cursor-default"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </motion.div>
            ))}
          </StaggerGrid>
        </div>
      </FadeIn>

      {/* BENTO GRID */}
      <div className="py-4 px-4 md:px-6 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
        {/* Kontrol Paneli */}
        <FadeIn className="md:col-span-8">
          <div className="bg-[#1d1d1f] text-white rounded-[3rem] p-8 md:p-12 flex flex-col justify-between min-h-[520px] overflow-hidden group shadow-2xl relative">
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-[#0071e3]/10 rounded-full blur-[50px] pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <Tablet className="text-[#0071e3] w-5 h-5" />
                <span className="text-[#0071e3] font-bold uppercase text-[10px] md:text-xs tracking-[0.18em]">
                  Kontrol Paneliniz
                </span>
              </div>
              <h3 className="text-[26px] md:text-[40px] font-bold mb-3 tracking-tight leading-tight">
                Evin Komuta Merkezi
              </h3>
              <p className="text-[#86868b] text-sm md:text-base font-light leading-relaxed max-w-sm">
                Tüm odalar, aydınlatma şiddeti ve enerji akışı tek bir ekranda.
              </p>
            </div>
            <div className="mt-8 bg-white/[0.04] backdrop-blur-sm rounded-[2.5rem] p-5 md:p-7 border border-white/[0.07] translate-y-0 group-hover:-translate-y-3 transition-transform duration-700">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { Icon: Lightbulb, label: "Salon", status: "Açık", col: "text-yellow-400" },
                  { Icon: Lightbulb, label: "Mutfak", status: "Kapalı", col: "text-[#636366]" },
                  { Icon: Power, label: "TV Ünitesi", status: "Açık", col: "text-[#0071e3]" },
                  { Icon: Thermometer, label: "Salon Isı", status: "22°C", col: "text-emerald-400" },
                  { Icon: Droplets, label: "Banyo Nem", status: "%60", col: "text-cyan-400" },
                  { Icon: Move, label: "Antre", status: "Hareket Yok", col: "text-[#636366]" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.08)" }}
                    className="p-3.5 bg-white/[0.04] rounded-2xl border border-white/[0.06] cursor-pointer transition-colors duration-200"
                  >
                    <item.Icon className={`${item.col} w-4 h-4 mb-1.5`} />
                    <div className="text-[9px] text-[#636366] font-bold uppercase tracking-wide">
                      {item.label}
                    </div>
                    <div className="text-[12px] font-bold text-white">{item.status}</div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span className="text-[10px] text-[#636366] font-medium shrink-0">
                  Enerji
                </span>
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "72%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: EASE_CURVE, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-[#0071e3] to-[#34aadc] rounded-full"
                  />
                </div>
                <span className="text-[10px] text-[#0071e3] font-bold shrink-0">72%</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Sesli Kontrol */}
        <FadeIn className="md:col-span-4" delay={0.08}>
          <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-[#e8e8ed] shadow-sm min-h-[520px] flex flex-col justify-between overflow-hidden relative group">
            <div>
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors duration-300">
                <Mic className="w-5 h-5 text-[#0071e3]" />
              </div>
              <h3 className="text-[22px] font-bold tracking-tight text-[#1d1d1f] mb-2">
                Sesli Kontrol
              </h3>
              <p className="text-[13px] text-[#6e6e73] leading-relaxed font-light mb-7">
                Siri, Google ve Alexa tam entegrasyon. Eviniz her an sizinle konuşuyor.
              </p>
              <div className="space-y-3">
                {[
                  { text: '"Hey Siri, sinema modunu aç."', border: "border-[#0071e3]", bg: "bg-blue-50" },
                  { text: '"Google, bahçe ışıklarını yak."', border: "border-[#1d1d1f]", bg: "bg-[#f5f5f7]" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 4 }}
                    className={`${item.bg} p-3.5 rounded-2xl border-l-4 ${item.border} flex items-center gap-3 cursor-default`}
                  >
                    <Mic className="w-3.5 h-3.5 text-[#6e6e73] shrink-0" />
                    <p className="text-[12px] md:text-[13px] font-semibold text-[#1d1d1f]">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
                <motion.div
                  whileHover={{ x: 4 }}
                  className="bg-red-50 p-3.5 rounded-2xl border-l-4 border-red-500 flex items-start gap-3 cursor-default"
                >
                  <Bell className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] font-bold text-red-400 uppercase tracking-widest mb-0.5">
                      Uyarı
                    </p>
                    <p className="text-[12px] font-bold text-red-900 leading-snug">
                      Arka bahçede hareket algılandı!
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700">
              <Volume2 size={220} />
            </div>
          </div>
        </FadeIn>

        {/* Akıllı Sigorta */}
        <FadeIn className="md:col-span-5" delay={0.05}>
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-[3rem] p-8 md:p-12 shadow-xl min-h-[460px] flex flex-col justify-between overflow-hidden group relative">
            <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
              <Zap size={220} />
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-5">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-[26px] md:text-[34px] font-bold mb-4 tracking-tight leading-tight">
                Akıllı Sigorta
                <br />
                Yönetimi
              </h3>
              <p className="text-emerald-50/90 text-[14px] md:text-[16px] font-light leading-relaxed mb-7">
                Anlık enerji tüketimini izleyin. Aşırı yüklenmelerde sistem kendini
                otomatik olarak korumaya alır.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Günlük Tüketim", value: "8.4 kWh" },
                  { label: "Tasarruf", value: "%32" },
                  { label: "Aktif Devre", value: "12 / 14" },
                  { label: "Durum", value: "Güvenli ✓" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm border border-white/10"
                  >
                    <div className="text-[9px] text-emerald-100/70 font-bold uppercase tracking-wider mb-1">
                      {s.label}
                    </div>
                    <div className="text-[15px] font-bold">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Güvenlik Kameralar */}
        <FadeIn className="md:col-span-7" delay={0.1}>
          <div className="bg-[#f5f5f7] rounded-[3rem] p-6 md:p-8 border border-white shadow-sm min-h-[460px] flex flex-col group">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-3">
                <Video className="text-red-600 w-5 h-5 animate-pulse" />
                <h3 className="text-[18px] md:text-[22px] font-bold tracking-tight text-[#1d1d1f]">
                  Güvenlik Duvarı
                </h3>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full shadow-sm border border-[#e8e8ed]">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#1d1d1f]">
                  4 Kanal Canlı
                </span>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-2 rounded-[2rem] overflow-hidden bg-black border-4 border-white/80 shadow-2xl">
              {[
                { label: "KAPI", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400" },
                { label: "BAHÇE", img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=400" },
                { label: "GARAJ", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400" },
                { label: "SALON", img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=400" },
              ].map((cam, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.35 }}
                  className="relative overflow-hidden h-36 md:h-48 cursor-pointer group/cam"
                >
                  <Image
                    src={cam.img}
                    alt={cam.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover opacity-60 grayscale group-hover/cam:grayscale-0 group-hover/cam:opacity-100 transition-all duration-600"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-sm group-hover/cam:bg-[#0071e3]/80 transition-colors duration-300">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse group-hover/cam:bg-white" />
                    <span className="text-[8px] font-mono text-white font-bold tracking-wider">
                      {cam.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* PAKETLER */}
      <FadeIn
        id="paketler"
        className="py-14 md:py-28 px-4 md:px-6 max-w-7xl mx-auto text-center"
      >
        <p className="text-[11px] font-bold tracking-[0.2em] text-[#0071e3] uppercase mb-4">
          Fiyatlandırma
        </p>
        <h2 className="text-[28px] md:text-[52px] font-bold tracking-tight mb-4 text-[#1d1d1f] leading-tight">
          <SplitText text="Sizin için doğru olanı seçin." />
        </h2>
        <p className="text-[#6e6e73] text-base md:text-xl mb-14 max-w-2xl mx-auto font-light">
          Her ev ve bütçe için profesyonel olarak tasarlanmış akıllı ev paketleri.
        </p>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
          {[
            {
              title: "Başlangıç",
              desc: "Temel konfor ve güvenlik arayanlar için mükemmel başlangıç noktası.",
              features: ["Akıllı Aydınlatma", "İklim Kontrolü", "Temel Güvenlik"],
              dark: false,
              btnLabel: "Bilgi Al",
            },
            {
              title: "Premium",
              desc: "Evinizin tüm potansiyelini ortaya çıkaran eksiksiz deneyim.",
              features: ["Gelişmiş Senaryolar", "Güvenlik & Kamera", "Sesli Asistan"],
              dark: true,
              btnLabel: "Bilgi Al",
            },
            {
              title: "Kurumsal",
              desc: "Dükkan, ofis ve çoklu daire projeleri için özel çözümler.",
              features: ["Merkezi Kontrol Paneli", "Enerji Takibi", "CCTV & Alarm"],
              dark: false,
              btnLabel: "Proje İste",
            },
          ].map((pkg, i) => (
            <motion.div
              key={i}
              variants={staggerChild}
              whileHover={!pkg.dark ? { y: -6 } : {}}
              className={`rounded-[3rem] p-8 md:p-10 border flex flex-col transition-shadow duration-300 ${
                pkg.dark
                  ? "bg-[#1d1d1f] text-white border-[#1d1d1f] shadow-2xl md:-translate-y-3"
                  : "bg-white border-[#e8e8ed] shadow-sm hover:shadow-xl"
              }`}
            >
              {pkg.dark && (
                <div className="h-[2px] w-full bg-gradient-to-r from-[#0071e3] to-[#34aadc] rounded-full mb-7 -mt-2" />
              )}
              {pkg.dark && (
                <span className="text-[10px] font-bold bg-[#0071e3]/20 text-[#0071e3] px-3 py-1 rounded-full w-max mb-4 tracking-widest uppercase">
                  En Çok Tercih Edilen
                </span>
              )}
              <h3
                className={`text-[20px] font-bold mb-2 ${
                  pkg.dark ? "text-white" : "text-[#1d1d1f]"
                }`}
              >
                {pkg.title}
              </h3>
              <p
                className={`text-[13px] leading-relaxed mb-7 ${
                  pkg.dark ? "text-[#86868b]" : "text-[#6e6e73]"
                }`}
              >
                {pkg.desc}
              </p>
              <ul className="flex-1 space-y-3 mb-8">
                {pkg.features.map((feat, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-3 text-[14px] font-medium"
                  >
                    <CheckCircle
                      className={`w-5 h-5 shrink-0 ${
                        pkg.dark ? "text-[#0071e3]" : "text-[#0071e3]"
                      }`}
                    />
                    <span className={pkg.dark ? "text-[#f5f5f7]" : "text-[#1d1d1f]"}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setIsContactOpen(true)}
                className={`w-full py-3.5 rounded-full font-bold text-[14px] transition-colors duration-200 ${
                  pkg.dark
                    ? "bg-[#0071e3] hover:bg-[#0077ed] text-white"
                    : "border-2 border-[#1d1d1f] text-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white"
                }`}
              >
                {pkg.btnLabel}
              </button>
            </motion.div>
          ))}
        </StaggerGrid>
      </FadeIn>

      {/* CTA */}
      <FadeIn className="py-24 md:py-40 px-6 text-center bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-50/80 to-indigo-50/40 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10">
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#0071e3] uppercase mb-6">
            Başlayın
          </p>
          <h2 className="text-[38px] md:text-[72px] lg:text-[96px] font-extrabold tracking-[-0.03em] leading-[0.92] text-[#1d1d1f] mb-10">
            <SplitText text="Geleceği yaşamaya şimdi başlayın." />
          </h2>
          <motion.button
            onClick={() => setIsContactOpen(true)}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#0071e3] hover:bg-[#0077ed] text-white text-[17px] md:text-[20px] font-semibold px-10 md:px-14 py-4 md:py-5 rounded-full transition-colors duration-200 shadow-2xl shadow-blue-500/30 flex items-center gap-3 mx-auto"
          >
            Ücretsiz Keşif Talebi <ArrowRight className="w-5 h-5" />
          </motion.button>
          <p className="mt-5 text-[13px] text-[#aeaeb2]">
            24 saat içinde yanıt · Taahhütsüz
          </p>
          <div className="mt-16 flex flex-col items-center gap-2">
            <p className="font-bold text-[22px] md:text-[28px] uppercase tracking-[0.3em] text-[#1d1d1f]">
              DinçEv
            </p>
            <p className="text-[#aeaeb2] font-medium text-[15px]">
              Güven · Konfor · Teknoloji
            </p>
          </div>
        </div>
      </FadeIn>

      {/* FOOTER */}
      <footer className="border-t border-[#d2d2d7] bg-[#f5f5f7]">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="text-center md:text-left">
              <h4 className="font-bold text-[16px] uppercase tracking-widest text-[#1d1d1f] mb-1.5">
                DinçEv
              </h4>
              <p className="text-[13px] text-[#6e6e73]">Kocaeli, İzmit / Türkiye</p>
              <a
                href="mailto:dincevsistem@gmail.com"
                className="text-[13px] text-[#6e6e73] hover:text-[#0071e3] transition-colors"
              >
                dincevsistem@gmail.com
              </a>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex flex-wrap justify-center gap-6 text-[13px] font-medium text-[#6e6e73]">
                {[
                  { href: "#ozellikler", label: "Özellikler" },
                  { href: "#ekosistem", label: "Ekosistem" },
                  { href: "/magaza", label: "Mağaza" },
                  { href: "/destek", label: "Destek" },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="hover:text-[#1d1d1f] transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href="/kvkk"
                  className="text-[#0071e3] font-bold hover:text-blue-700 transition-colors"
                >
                  KVKK
                </Link>
              </div>
              <div className="flex items-center gap-5">
                {["/apple.svg", "/google.svg", "/tuya.svg", "/zigbee.svg"].map(
                  (src, i) => (
                    <Image
                      key={i}
                      src={src}
                      alt=""
                      width={20}
                      height={20}
                      className="h-5 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-400"
                    />
                  )
                )}
              </div>
            </div>
          </div>
          <div className="border-t border-[#d2d2d7] pt-7 text-center text-[11px] text-[#aeaeb2]">
            <p>© 2026 DinçEv Akıllı Ev Sistemleri. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>

      {/* İLETİŞİM MODALI */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xl cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="bg-white/95 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-7 md:p-10 relative border border-white/50 custom-scrollbar"
            >
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-5 right-5 p-2 bg-[#f5f5f7] hover:bg-[#e8e8ed] rounded-full text-[#6e6e73] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {isSuccess ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: EASE_CURVE }}
                  className="text-center py-20"
                >
                  <div className="relative w-28 h-28 mx-auto mb-7">
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-tr from-[#0071e3] to-[#34aadc] rounded-full blur-2xl"
                    />
                    <div className="relative bg-white border border-[#e8e8ed] w-full h-full rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-14 h-14 text-[#0071e3]" />
                    </div>
                  </div>
                  <h3 className="text-[30px] font-extrabold text-[#1d1d1f] mb-3 tracking-tight">
                    Talebiniz Alındı.
                  </h3>
                  <p className="text-[15px] text-[#6e6e73] font-light max-w-xs mx-auto leading-relaxed">
                    24 saat içinde sizinle iletişime geçeceğiz.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                      <Home className="w-7 h-7 text-[#0071e3]" />
                    </div>
                    <h3 className="text-[24px] md:text-[28px] font-bold text-[#1d1d1f] tracking-tight mb-1.5">
                      Hayalinizdeki Eve İlk Adım
                    </h3>
                    <p className="text-[14px] text-[#6e6e73] font-light">
                      Detayları bırakın, sisteminizi birlikte tasarlayalım.
                    </p>
                  </div>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-3">
                      <input name="isim" placeholder="İsim" required className="input-style" />
                      <input name="soyisim" placeholder="Soyisim" required className="input-style" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="tel" name="telefon" placeholder="Telefon" required className="input-style" />
                      <input type="email" name="mail" placeholder="E-posta" required className="input-style" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input name="il" placeholder="İl" required className="input-style" />
                      <input name="alan" placeholder="Oda / Alan" required className="input-style" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[#1d1d1f] mb-2 ml-1">Proje Türü</p>
                      <div className="flex gap-2.5">
                        {["Ev", "Dükkan", "Çoklu Daire"].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setPropertyType(t)}
                            className={`flex-1 py-2.5 rounded-xl font-bold text-[12px] border-2 transition-colors duration-200 ${
                              propertyType === t
                                ? "bg-[#0071e3] text-white border-[#0071e3]"
                                : "bg-[#f5f5f7] text-[#6e6e73] border-transparent hover:bg-[#e8e8ed]"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[#1d1d1f] mb-2 ml-1">İnşaat Durumu</p>
                      <div className="flex gap-2.5">
                        {["İnşaat Edilmiş", "İnşaat Aşamasında"].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setConstructionStatus(s)}
                            className={`flex-1 py-2.5 rounded-xl font-bold text-[12px] border-2 transition-colors duration-200 ${
                              constructionStatus === s
                                ? "bg-[#1d1d1f] text-white border-[#1d1d1f]"
                                : "bg-[#f5f5f7] text-[#6e6e73] border-transparent hover:bg-[#e8e8ed]"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#0071e3] hover:bg-[#0077ed] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-[16px] transition-colors flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/20 mt-2"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Gönderiliyor...</>
                      ) : (
                        <><Send className="w-5 h-5" /> Talebi Gönder</>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-[#aeaeb2] pt-1">
                      Bilgileriniz KVKK kapsamında işlenir ve paylaşılmaz.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .input-style {
          width: 100%;
          padding: 0.75rem 1rem;
          background: #f5f5f7;
          border: 2px solid transparent;
          border-radius: 0.875rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: #1d1d1f;
          outline: none;
          transition: all 0.2s;
        }
        .input-style::placeholder {
          color: #aeaeb2;
        }
        .input-style:focus {
          background: white;
          border-color: #0071e3;
          box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.1);
        }
      `}</style>
    </motion.div>
  );
}