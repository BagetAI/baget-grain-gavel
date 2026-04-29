import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Grain & Gavel | Artisanal Woodworking Subscriptions',
  description: 'Rare lumber and heirloom tools curated for the master craftsman.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#FAF6F1] text-[#121212] font-['Nunito'] antialiased">
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF6F1]/80 backdrop-blur-md border-b border-[#121212]/5 py-4 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#121212] rounded-full flex items-center justify-center text-[#D4AF37] font-serif italic text-xl group-hover:bg-[#D4AF37] group-hover:text-[#121212] transition-all">
                G
              </div>
              <span className="font-serif text-2xl tracking-tight">Grain & Gavel</span>
            </Link>
            
            <nav className="hidden md:flex gap-10 font-bold uppercase tracking-widest text-[10px]">
              <a href="#tiers" className="hover:text-[#D4AF37] transition-colors">Subscriptions</a>
              <a href="#marketplace" className="hover:text-[#D4AF37] transition-colors">Marketplace</a>
              <a href="#process" className="hover:text-[#D4AF37] transition-colors">The Audit</a>
            </nav>

            <div className="hidden md:block">
              <a 
                href="#tiers" 
                className="bg-[#121212] text-[#FAF6F1] px-6 py-3 font-bold uppercase tracking-widest text-[9px] hover:bg-[#D4AF37] hover:text-[#121212] transition-all"
              >
                Join the Waitlist
              </a>
            </div>
          </div>
        </header>

        <main className="pt-20">{children}</main>

        <footer className="bg-[#121212] text-[#FAF6F1] py-24 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#121212] font-serif italic text-lg">G</div>
                <span className="font-serif text-3xl tracking-tight">Grain & Gavel</span>
              </div>
              <p className="text-sm opacity-60 leading-relaxed max-w-md mb-8">
                Curated for those who understand that the finest work begins with the finest materials. We source from boutique mills across the PNW to bring instrument-grade timber directly to your bench.
              </p>
              <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D4AF37]">
                Milled to 6-8% Moisture Content
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-[#D4AF37]">Operations</h4>
              <ul className="space-y-4 text-sm opacity-60">
                <li><a href="#process" className="hover:text-[#D4AF37]">Bell Forest Fulfillment</a></li>
                <li><a href="#process" className="hover:text-[#D4AF37]">Sourcing Standards</a></li>
                <li><a href="#process" className="hover:text-[#D4AF37]">Shipping Logistics</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-[#D4AF37]">Connect</h4>
              <ul className="space-y-4 text-sm opacity-60">
                <li><a href="#tiers" className="hover:text-[#D4AF37]">The June Waitlist</a></li>
                <li><a href="#marketplace" className="hover:text-[#D4AF37]">Sawmill Partnerships</a></li>
                <li><a href="#process" className="hover:text-[#D4AF37]">CITES Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between gap-6 opacity-40 text-[10px] uppercase font-bold tracking-widest">
            <div>&copy; 2026 Grain & Gavel. All Species Lacey Act Compliant.</div>
            <div className="flex gap-8">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Audit Logs</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
