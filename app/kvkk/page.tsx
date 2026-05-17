"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, EyeOff, UserCheck } from "lucide-react";

export default function KvkkPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] font-sans text-[#1d1d1f] selection:bg-blue-200">
      
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-lg border-b border-gray-100/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between text-xs md:text-sm font-medium text-slate-800">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-widest cursor-pointer group uppercase">
            <div className="w-7 h-7 rounded-[8px] flex items-center justify-center shadow-md overflow-hidden bg-white">
              <img src="/logo.png" alt="DinçEv" className="w-7 h-7 object-contain" />
            </div>
            <span className="hidden sm:block">DinçEv</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto content-visibility-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-blue-600 mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-slate-900">
            Gizlilik ve KVKK
          </h1>
          <p className="text-lg text-slate-500 font-medium">Verileriniz, eviniz kadar güvende.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-[3rem] p-8 md:p-16 shadow-sm border border-gray-100"
        >
          <div className="space-y-12 text-[#1d1d1f] leading-relaxed font-light text-lg">
            
            <section className="flex flex-col md:flex-row gap-6">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                <UserCheck className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-900">1. Veri Sorumlusu</h2>
                <p className="text-slate-600">
                  6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla <strong>DinçEv Akıllı Ev Sistemleri</strong> tarafından aşağıda açıklanan kapsamda işlenebilecektir.
                </p>
              </div>
            </section>

            <section className="flex flex-col md:flex-row gap-6">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                <EyeOff className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-900">2. İşlenme Amaçları</h2>
                <p className="text-slate-600 mb-4">
                  Web sitemizdeki formlar aracılığıyla paylaştığınız bilgiler;
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="bg-[#f5f5f7] p-4 rounded-2xl text-sm font-medium text-slate-700">• Size özel teklif hazırlama</li>
                  <li className="bg-[#f5f5f7] p-4 rounded-2xl text-sm font-medium text-slate-700">• Teknik destek sağlama</li>
                  <li className="bg-[#f5f5f7] p-4 rounded-2xl text-sm font-medium text-slate-700">• Proje planlama süreçleri</li>
                  <li className="bg-[#f5f5f7] p-4 rounded-2xl text-sm font-medium text-slate-700">• Satış sonrası hizmetler</li>
                </ul>
              </div>
            </section>

            <section className="flex flex-col md:flex-row gap-6">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-900">3. Veri Güvenliği ve Aktarım</h2>
                <p className="text-slate-600">
                  Toplanan verileriniz, DinçEv bünyesinde en yüksek güvenlik standartlarıyla korunur. Verileriniz, yasal zorunluluklar haricinde <strong>asla üçüncü şahıslarla veya reklam şirketleriyle paylaşılmaz.</strong> Projenizin gizliliği bizim için esastır.
                </p>
              </div>
            </section>

            <div className="h-px w-full bg-slate-100 my-8" />

            <section className="text-center">
              <h2 className="text-xl font-bold mb-4">Haklarınız ve İletişim</h2>
              <p className="text-slate-500 mb-6 text-base">
                Verilerinizin güncellenmesi, silinmesi veya işlenmesi hakkında bilgi almak için her zaman bize ulaşabilirsiniz.
              </p>
              <a 
                href="mailto:dincevsistem@gmail.com" 
                className="inline-block bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-600 transition-colors"
              >
                dincevsistem@gmail.com
              </a>
            </section>

          </div>
        </motion.div>
      </main>

      <footer className="py-12 px-6 text-center text-slate-400 text-sm border-t border-gray-200/50 bg-white">
        <p>© 2026 DinçEv Akıllı Ev Sistemleri. Kocaeli, İzmit / Türkiye.</p>
        <p className="mt-2">Son Güncelleme: 10 Mayıs 2026</p>
      </footer>

    </div>
  );
}