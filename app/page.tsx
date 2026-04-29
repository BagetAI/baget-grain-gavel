import React from 'react';
import Link from 'next/link';

async function getInventory() {
  const dbId = "2935fa57-8b71-45f7-84bb-fdb46d872b06";
  const res = await fetch(`https://stg-app.baget.ai/api/public/databases/${dbId}/rows`, {
    next: { revalidate: 300 }
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.rows || [];
}

const GoldBadge = ({ text }: { text: string }) => (
  <span className="bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
    {text}
  </span>
);

export default async function HomePage() {
  const inventoryData = await getInventory();
  
  // Separate Tiers from Marketplace
  const subscriptions = inventoryData.filter((r: any) => ["Master", "Gavel", "Grain"].includes(r.data.tier));
  const marketplace = inventoryData.filter((r: any) => r.data.tier === "Marketplace");

  return (
    <div className="bg-[#FAF6F1] min-h-screen font-sans text-[#121212]">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center bg-[#121212] overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
             <defs>
              <pattern id="grain-pattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                <path d="M0 10 Q 6 0, 12 10 T 25 10" fill="none" stroke="#D4AF37" strokeWidth="0.1" />
                <path d="M0 18 Q 6 8, 12 18 T 25 18" fill="none" stroke="#D4AF37" strokeWidth="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grain-pattern)" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-[#FAF6F1]">
          <div className="mb-8 inline-block">
             <GoldBadge text="June 2026 Cohort Now Open" />
          </div>
          <h1 className="text-6xl md:text-8xl mb-8 leading-[1.05] max-w-5xl mx-auto font-serif tracking-tight">
            Rare Species. <span className="text-[#D4AF37]">Heirloom</span> Steel.
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-12 opacity-80 font-light leading-relaxed">
            Curated subscriptions for the precision woodworker. Featuring instrument-grade Ziricote and professional tooling from Lie-Nielsen.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#tiers" className="bg-[#D4AF37] text-[#121212] px-10 py-5 rounded-[2px] font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#E5C467] transition-all shadow-xl shadow-[#D4AF37]/10">
              Select Subscription
            </a>
            <a href="#marketplace" className="px-10 py-5 border border-[#FAF6F1]/30 text-[#FAF6F1] rounded-[2px] font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#FAF6F1]/10 transition-all">
              Marketplace Off-cuts
            </a>
          </div>
        </div>
      </section>

      {/* Trust & Certification Bar */}
      <section className="bg-[#121212] py-10 border-y border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { id: 'MC', label: '6-8%', sub: 'Moisture Verified' },
            { id: 'S2S', label: '120 Grit', sub: 'Milled & Surfaced' },
            { id: 'CITES', label: 'Lacey Act', sub: 'Sustainably Sourced' },
            { id: 'BF', label: 'Michigan', sub: 'Hub Fulfillment' }
          ].map((item) => (
            <div key={item.id} className="text-center md:text-left flex flex-col md:flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-xs font-serif italic">
                {item.id}
              </div>
              <div>
                <div className="text-[#FAF6F1] text-xs font-bold uppercase tracking-widest">{item.label}</div>
                <div className="text-[#FAF6F1]/40 text-[10px] uppercase tracking-widest mt-1">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription Tiers */}
      <section id="tiers" className="max-w-7xl mx-auto py-32 px-6">
        <div className="mb-20 text-center">
          <span className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">Monthly Curations</span>
          <h2 className="text-5xl font-serif">The Signature Series</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {subscriptions.map((row: any) => (
            <div key={row.id} className="relative group flex flex-col bg-white border border-[#121212]/5 p-2 transition-all hover:border-[#D4AF37]/30">
              <div className="aspect-[3/4] overflow-hidden relative mb-8">
                <img 
                  src={row.data.image_url} 
                  alt={row.data.species} 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/60 to-transparent opacity-60"></div>
                <div className="absolute bottom-6 left-6 text-[#FAF6F1]">
                   <div className="text-[10px] uppercase font-bold tracking-widest opacity-80 mb-1">{row.data.tier} Tier</div>
                   <div className="text-2xl font-serif">{row.data.species}</div>
                </div>
              </div>
              
              <div className="px-6 pb-8 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                   <span className="text-3xl font-serif text-[#121212]">${row.data.price_cents / 100}</span>
                   <span className="text-[10px] font-bold text-[#121212]/40 uppercase tracking-widest">/ month</span>
                </div>
                
                <p className="text-[#121212]/60 text-sm mb-8 leading-relaxed font-light">
                  {row.data.description}
                </p>

                <ul className="space-y-3 mb-10 text-[11px] uppercase tracking-widest font-semibold text-[#121212]/80">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div> {row.data.dimensions}</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div> 6-8% Moisture Certified</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div> Limited to {row.data.stock_count} units</li>
                </ul>

                <a 
                  href={`${row.data.stripe_link}?success_url=https://baget-grain-gavel.vercel.app/checkout/success?species=${encodeURIComponent(row.data.species)}`}
                  className="w-full text-center py-5 bg-[#121212] text-[#FAF6F1] font-bold uppercase tracking-widest text-[10px] hover:bg-[#D4AF37] hover:text-[#121212] transition-all"
                >
                  Secure Subscription
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Marketplace Catalog */}
      <section id="marketplace" className="bg-[#121212] py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-12">
            <div>
              <span className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">Marketplace</span>
              <h2 className="text-5xl font-serif text-[#FAF6F1]">Boutique <span className="text-[#D4AF37] italic">Off-cuts</span></h2>
            </div>
            <div className="flex gap-4">
               <GoldBadge text="Surfaced 120 Grit" />
               <GoldBadge text="Live Stock" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {marketplace.map((row: any) => (
              <div key={row.id} className="group flex flex-col border border-white/5 p-4 hover:bg-white/5 transition-all">
                <div className="aspect-[4/3] overflow-hidden relative mb-8">
                  <img 
                    src={row.data.image_url} 
                    alt={row.data.species} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#FAF6F1] text-[#121212] px-3 py-1 text-[9px] font-bold uppercase tracking-widest">
                      {row.data.rarity}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col px-2">
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-2xl font-serif text-[#FAF6F1]">{row.data.species}</h3>
                    <span className="text-xl font-serif text-[#D4AF37]">${row.data.price_cents / 100}</span>
                  </div>
                  <p className="text-[#FAF6F1]/50 text-xs mb-8 font-light italic leading-relaxed">
                    &ldquo;{row.data.description}&rdquo;
                  </p>
                  
                  <div className="mt-auto flex justify-between items-center mb-8 text-[10px] uppercase tracking-widest font-bold">
                    <span className="text-[#FAF6F1]/40">Dim: <span className="text-[#FAF6F1]">{row.data.dimensions}</span></span>
                    <span className="text-[#FAF6F1]/40">MC: <span className="text-[#FAF6F1]">{row.data.moisture_content}%</span></span>
                  </div>

                  <a 
                    href={`${row.data.stripe_link}?success_url=https://baget-grain-gavel.vercel.app/checkout/success?species=${encodeURIComponent(row.data.species)}`}
                    className="w-full text-center py-4 border border-[#D4AF37]/50 text-[#D4AF37] font-bold uppercase tracking-widest text-[9px] hover:bg-[#D4AF37] hover:text-[#121212] transition-all"
                  >
                    Purchase Entry
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Detail */}
      <section className="bg-[#FAF6F1] py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <div className="relative">
             <div className="aspect-square bg-[#121212] flex items-center justify-center p-12">
               <img 
                  src="https://baget-grain-gavel.vercel.app/images/top-down-technical-unboxing-view-of-the-.png" 
                  alt="Unboxing Sequence" 
                  className="w-full h-full object-cover opacity-80"
               />
             </div>
             <div className="absolute -bottom-8 -right-8 bg-[#D4AF37] p-8 text-[#121212] hidden md:block">
               <div className="text-4xl font-serif mb-2">6-8%</div>
               <div className="text-[10px] uppercase font-bold tracking-widest">Moisture Guaranteed</div>
             </div>
           </div>
           
           <div>
             <h2 className="text-5xl font-serif mb-12">The <span className="text-[#D4AF37]">Master</span> Audit.</h2>
             <div className="space-y-12">
               {[
                 { title: "Precise Sourcing", text: "We partner only with boutique mills using digital kiln control. Every piece is sampled for stress and moisture." },
                 { title: "Handle-First Fulfillment", text: "Our kitting process prioritizes the user reveal. Tools are oriented for an immediate, tactile connection." },
                 { title: "Project Narrative", text: "Each shipment includes historical data and architectural sketches to inspire your next build." }
               ].map((item, idx) => (
                 <div key={idx} className="flex gap-6">
                   <div className="text-4xl font-serif text-[#D4AF37] opacity-30">0{idx+1}</div>
                   <div>
                     <h4 className="text-lg font-bold mb-2 uppercase tracking-wide">{item.title}</h4>
                     <p className="text-[#121212]/60 font-light leading-relaxed">{item.text}</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}
