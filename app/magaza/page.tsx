"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Bell, ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MagazaPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);

    const STORE_URL = "https://script.google.com/macros/s/AKfycbz7IvOJmoE7DmFUe1gY2GfvSmoZ4dkUofeRRu1kVH2Y9vgEgKtyfGOLk2CCIpUGl8Q3/exec";
    const rawBody = `email=${encodeURIComponent(email)}`;

    try {
      await fetch(STORE_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: rawBody,
      });
      setSent(true);
    } catch (error) {
      alert("Hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between text-sm font-medium">
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="w-7 h-7 rounded-[8px] flex items-center justify-center shadow-md overflow-hidden bg-white">
              <img src="/logo.png" alt="DinçEv" className="w-7 h-7 object-contain" />
            </div>
            <span className="text-[15px] font-semibold text-[#1d1d1f]">DinçEv</span>
          </Link>
          <div className="hidden md:flex gap-8 text-[#6e6e73]">
            <Link href="/#ozellikler" className="hover:text-black transition-colors">Özellikler</Link>
            <Link href="/#ekosistem" className="hover:text-black transition-colors">Ekosistem</Link>
            <Link href="/magaza" className="text-black font-bold flex items-center gap-1"><ShoppingBag className="w-4 h-4 text-blue-600" /> Mağaza</Link>
            <Link href="/destek" className="text-blue-600 font-semibold">Destek</Link>
          </div>
          <Link href="/" className="flex items-center gap-1.5 text-[#0071e3] font-medium hover:underline"><ArrowLeft className="w-4 h-4" /> Ana Sayfa</Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-20 text-center relative overflow-hidden content-visibility-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-gradient-to-tr from-blue-50/80 to-indigo-50/40 rounded-full blur-[120px] pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 flex flex-col items-center max-w-2xl">
          <div className="relative mb-10">
            <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-0 bg-blue-400/20 rounded-[2.5rem] blur-2xl" />
            <div className="relative w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-[#0071e3] to-[#34aadc] rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-500/30"><ShoppingBag className="w-12 h-12 md:w-14 md:h-14 text-white" strokeWidth={1.5} /></div>
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-3 -right-3 w-9 h-9 bg-amber-400 rounded-full flex items-center justify-center shadow-lg"><Sparkles className="w-4 h-4 text-white" /></motion.div>
          </div>
          <h1 className="text-[40px] md:text-[64px] font-extrabold tracking-[-0.04em] leading-[0.92] text-[#1d1d1f] mb-6">Mağaza <br /><span style={{ backgroundImage: "linear-gradient(135deg, #0071e3 0%, #34aadc 60%, #0071e3 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>geliyor.</span></h1>
          <p className="text-[16px] md:text-[20px] text-[#6e6e73] font-light max-w-lg mb-10">Akıllı ev ürünlerimiz ve aksesuar paketlerimiz çok yakında sizlerle buluşuyor.</p>
          <div className="w-full max-w-md">
            {sent ? (
              <div className="bg-green-50 border border-green-100 rounded-2xl px-6 py-4 flex items-center justify-center gap-3"><p className="text-[15px] font-semibold text-green-800">Harika! Sizi haberdar edeceğiz.</p></div>
            ) : (
              <form onSubmit={handleNotify} className="flex gap-3">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="E-posta adresiniz" className="flex-1 bg-[#f5f5f7] border-2 border-transparent rounded-xl px-4 py-3 text-[15px] focus:bg-white focus:border-[#0071e3] outline-none transition-all" />
                <button type="submit" disabled={isSubmitting} className="bg-[#0071e3] text-white px-5 py-3 rounded-xl shadow-lg disabled:opacity-70 hover:bg-blue-600 transition-colors">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bell className="w-4 h-4" />}
                </button>
              </form>
            )}
          </div>
        </motion.div>
        <div className="relative z-10 mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full opacity-30 select-none">
          {[1,2,3,4].map((i) => (
            <div key={i} className="bg-slate-50 rounded-2xl p-5 border border-white aspect-square flex flex-col justify-end shadow-sm">
              <div className="h-2 w-3/4 bg-black/10 rounded-full mb-2" />
              <div className="h-2 w-1/2 bg-black/10 rounded-full" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}