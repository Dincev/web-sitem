"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import {
  Phone, Mail, MapPin, Send, Loader2,
  ArrowLeft, CheckCircle, ShoppingBag,
} from "lucide-react";
import Link from "next/link";

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const contactCards = [
  {
    Icon: Phone,
    WhatsApp: null,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    hoverBorder: "hover:border-blue-100",
    label: "Hemen Arayın",
    value: "+90 532 446 25 43",
    href: "tel:+905324462543",
  },
  {
    Icon: null,
    WhatsApp: WhatsAppIcon,
    iconColor: "text-green-500",
    iconBg: "bg-green-50",
    hoverBorder: "hover:border-green-100",
    label: "WhatsApp Destek",
    value: "Mesaj Gönderin",
    href: "https://wa.me/905324462543",
    external: true,
  },
  {
    Icon: Mail,
    WhatsApp: null,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    hoverBorder: "hover:border-violet-100",
    label: "E-Posta",
    value: "dincevsistem@gmail.com",
    href: "mailto:dincevsistem@gmail.com",
  },
  {
    Icon: MapPin,
    WhatsApp: null,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
    hoverBorder: "",
    label: "Merkez Ofis",
    value: "Kocaeli, İzmit / Türkiye",
    href: null,
  },
];

export default function DestekPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const SUPPORT_URL =
      "https://script.google.com/macros/s/AKfycbw7HfENO7ULFMNWf45i0MA9iA0udpm_gweRYnbFrBJQibHkpbVr84rYcQHo3HwF0xvpEw/exec";

    const payload = {
      name: `${formData.get("isim")} ${formData.get("soyisim")}`,
      email: formData.get("mail") as string,
      subject: "Destek Talebi",
      message: `Tel: ${formData.get("telefon")}\nMesaj: ${formData.get("aciklama")}`,
    };

    try {
      await fetch(SUPPORT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      formRef.current?.reset();
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 4500);
    } catch {
      setIsSubmitting(false);
      alert("Hata oluştu. İnternet bağlantınızı kontrol edip tekrar deneyin.");
    }
  };

  return (
    <div
      className="min-h-screen bg-[#f5f5f7] font-sans text-[#1d1d1f]"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}
    >
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/[0.06] h-[52px] flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer select-none group">
            <div className="w-7 h-7 rounded-[8px] flex items-center justify-center shadow-md overflow-hidden bg-white">
              <img src="/logo.png" alt="DinçEv" className="w-7 h-7 object-contain" />
            </div>
            <span className="text-[15px] font-bold uppercase tracking-wider text-[#1d1d1f]">
              DinçEv
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-[13px] text-[#6e6e73] font-medium">
            <Link href="/#ozellikler" className="hover:text-black transition-colors">
              Özellikler
            </Link>
            <Link href="/#ekosistem" className="hover:text-black transition-colors">
              Ekosistem
            </Link>
            <Link href="/#paketler" className="hover:text-black transition-colors">
              Paketler
            </Link>
            <Link href="/magaza" className="hover:text-black transition-colors flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" /> Mağaza
            </Link>
            <Link href="/destek" className="text-[#0071e3] font-bold">
              Destek
            </Link>
          </div>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-[13px] text-[#6e6e73] hover:text-black transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Geri Dön
          </Link>
        </div>
      </nav>

      <main className="pt-28 pb-20 px-6 max-w-6xl mx-auto content-visibility-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#0071e3] uppercase mb-4">
            Destek
          </p>
          <h1 className="text-[34px] md:text-[60px] font-extrabold tracking-[-0.03em] mb-5 text-[#1d1d1f] leading-tight">
            Size nasıl yardımcı
            <br className="hidden md:block" /> olabiliriz?
          </h1>
          <p className="text-[16px] md:text-[20px] text-[#6e6e73] max-w-xl mx-auto font-light leading-snug">
            Sorularınız, teknik destek ya da yeni projeleriniz için
            ekibimiz her zaman yanınızda.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4"
          >
            {contactCards.map((card, i) => {
              const content = (
                <div
                  className={`flex items-center gap-5 p-6 md:p-7 bg-white rounded-[2rem] shadow-sm border border-[#e8e8ed] ${
                    card.href
                      ? `hover:shadow-lg ${card.hoverBorder} hover:border-opacity-100 transition-all duration-300 cursor-pointer`
                      : ""
                  } group`}
                >
                  <div
                    className={`w-14 h-14 ${card.iconBg} ${card.iconColor} rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {card.WhatsApp ? <card.WhatsApp /> : card.Icon ? <card.Icon className="w-6 h-6" /> : null}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#aeaeb2] uppercase tracking-[0.15em] mb-1">
                      {card.label}
                    </p>
                    <p className="text-[16px] md:text-[18px] font-bold text-[#1d1d1f] break-all">
                      {card.value}
                    </p>
                  </div>
                </div>
              );

              return card.href ? (
                <a
                  key={i}
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                >
                  {content}
                </a>
              ) : (
                <div key={i}>{content}</div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-[#e8e8ed] relative overflow-hidden h-full">
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-50/80 rounded-full blur-3xl -z-10 pointer-events-none" />

              {isSuccess ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center min-h-[400px] text-center"
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
                    Ekibimiz en kısa sürede sizinle iletişime geçecek.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="text-[26px] md:text-[32px] font-extrabold text-[#1d1d1f] tracking-tight mb-2">
                      Sizi Arayalım
                    </h3>
                    <p className="text-[#6e6e73] text-[15px] font-light">
                      Bilgilerinizi bırakın, uzman ekibimiz size dönüş yapsın.
                    </p>
                  </div>

                  <form ref={formRef} className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-bold text-[#1d1d1f] ml-1 mb-1.5 block">
                          İsim
                        </label>
                        <input type="text" name="isim" required placeholder="Adınız" className="input-style" />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#1d1d1f] ml-1 mb-1.5 block">
                          Soyisim
                        </label>
                        <input type="text" name="soyisim" required placeholder="Soyadınız" className="input-style" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-bold text-[#1d1d1f] ml-1 mb-1.5 block">
                          Telefon
                        </label>
                        <input type="tel" name="telefon" required placeholder="0 (5__) ___ __ __" className="input-style" />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#1d1d1f] ml-1 mb-1.5 block">
                          E-Posta
                        </label>
                        <input type="email" name="mail" required placeholder="ornek@mail.com" className="input-style" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#1d1d1f] ml-1 mb-1.5 block">
                        Mesajınız
                      </label>
                      <textarea
                        name="aciklama"
                        required
                        rows={4}
                        placeholder="Bize iletmek istediğiniz konuyu kısaca özetleyin..."
                        className="input-style resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full bg-[#1d1d1f] hover:bg-[#0071e3] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-[16px] transition-colors duration-200 flex items-center justify-center gap-2.5 shadow-lg"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Gönderiliyor...</>
                      ) : (
                        <><Send className="w-5 h-5" /> Talebi Gönder</>
                      )}
                    </motion.button>

                    <p className="text-center text-[11px] text-[#aeaeb2]">
                      Bilgileriniz KVKK kapsamında korunur ve paylaşılmaz.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <style jsx>{`
        .input-style {
          width: 100%;
          padding: 0.8rem 1rem;
          background: #f5f5f7;
          border: 2px solid transparent;
          border-radius: 0.875rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: #1d1d1f;
          outline: none;
          transition: all 0.2s;
        }
        .input-style::placeholder { color: #aeaeb2; }
        .input-style:focus {
          background: white;
          border-color: #0071e3;
          box-shadow: 0 0 0 4px rgba(0,113,227,0.1);
        }
      `}</style>
    </div>
  );
}