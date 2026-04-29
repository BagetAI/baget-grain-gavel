import React from 'react';

/**
 * MASTER INVENTORY DB: ca64d0ab-aae2-47bf-96ef-f37a0a306e51
 * 23 items including June subscriptions and PNW marketplace off-cuts.
 */
async function getInventory() {
  const dbId = "ca64d0ab-aae2-47bf-96ef-f37a0a306e51";
  try {
    const res = await fetch(`https://stg-app.baget.ai/api/public/databases/${dbId}/rows`, {
      next: { revalidate: 300 }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.rows || [];
  } catch (err) {
    console.error("Fetch Inventory Error:", err);
    return [];
  }
}

const GoldBadge = ({ text }: { text: string }) => (
  <span className="bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
    {text}
  </span>
);

const SectionHeading = ({ subtitle, title, light = false }: { subtitle: string, title: string, light?: boolean }) => (
  <div className="mb-20">
    <span className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">{subtitle}</span>
    <h2 className={`text-4xl md:text-5xl font-serif ${light ? 'text-[#FAF6F1]' : 'text-[#121212]'}`}>
      {title}
    </h2>
  </div>
);

/**
 * Standardize image URLs to work with the Next.js public folder or external links.
 */
const formatImage = (url: string) => {
  if (!url) return "";
  if (url.startsWith('https://baget-grain-gavel.vercel.app')) {
    return url.replace('https://baget-grain-gavel.vercel.app', '');
  }
  if (!url.startsWith('http') && !url.startsWith('/')) {
    return `/${url}`;
  }
  return url;
};

export default async function HomePage() {
  const allRows = await getInventory();
  
  // Filter and Deduplicate
  // We prioritize rows that have rarity/dimensions/stripe_link
  const uniqueItems = allRows.filter((row: any) => {
    // Filter out verification rows
    if (row.data._baget_verify) return false;
    // Basic validation
    return row.data.species && row.data.price_cents;
  });

  // Extract Subscriptions (Master, Gavel, Grain tiers)
  // We take the "latest" versions of these (usually the ones with more detailed descriptions)
  const subscriptions = [
    uniqueItems.find((r: any) => r.data.tier === "Master" && r.data.species.includes("Master")),
    uniqueItems.find((r: any) => r.data.tier === "Gavel" && r.data.species.includes("Gavel")),
    uniqueItems.find((r: any) => r.data.tier === "Grain" && r.data.species.includes("Grain"))
  ].filter(Boolean);

  // Extract Marketplace Items
  const marketplace = uniqueItems.filter((r: any) => 
    r.data.tier === "Marketplace" || 
    (r.data.sawmill_id && !r.data.species.includes("Box") && !r.data.species.includes("Edition"))
  );

  return (
    <div className="bg-[#FAF6F1] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center bg-[#121212] overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
             <defs>
              <pattern id="grain-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 Q 5 0, 10 10 T 20 10" fill="none" stroke="#D4AF37" strokeWidth="0.05" />
                <path d="M0 15 Q 5 5, 10 15 T 20 15" fill="none" stroke="#D4AF37" strokeWidth="0.05" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grain-pattern)" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="mb-8 inline-block">
               <GoldBadge text="June 2026 Collection Live" />
            </div>
            <h1 className="text-6xl md:text-8xl mb-8 leading-[1.05] font-serif text-[#FAF6F1] tracking-tighter">
              Rare Species.<br />
              <span className="text-[#D4AF37]">Heirloom</span> Steel.
            </h1>
            <p className="text-xl max-w-xl mb-12 text-[#FAF6F1]/70 font-light leading-relaxed">
              Premium subscriptions for artisanal woodworkers. Pairing instrument-grade PNW timber with specialized tools from Lie-Nielsen.
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="#tiers" className="bg-[#D4AF37] text-[#121212] px-10 py-5 font-bold uppercase tracking-widest text-[10px] hover:bg-[#FAF6F1] transition-all">
                Select Subscription
              </a>
              <a href="#marketplace" className="px-10 py-5 border border-white/20 text-[#FAF6F1] font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all">
                The Marketplace
              </a>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="aspect-[4/5] bg-[#1A1A1A] p-2 border border-white/5">
              <img 
                src="/images/cinematic-hero-product-shot-for-grain-.png" 
                alt="Master Edition Hero" 
                className="w-full h-full object-cover grayscale-[30%]"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-[#D4AF37] p-10 text-[#121212] shadow-2xl">
              <div className="text-4xl font-serif mb-1">0.35 BF</div>
              <div className="text-[10px] uppercase font-bold tracking-widest opacity-80">Ziricote + Steel</div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Bar */}
      <section className="bg-[#121212] py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between gap-12">
          {[
            { label: '6.0-8.0% MC', sub: 'Moisture Audit' },
            { label: 'S2S 120 Grit', sub: 'Milling Standard' },
            { label: 'Lacey Compliant', sub: 'Ethical Sourcing' },
            { label: 'Ishpeming Hub', sub: 'Fulfillment Point' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-serif italic text-xs">
                {i + 1}
              </div>
              <div>
                <div className="text-[#FAF6F1] text-[10px] font-bold uppercase tracking-widest">{item.label}</div>
                <div className="text-[#FAF6F1]/40 text-[9px] uppercase tracking-widest">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscriptions */}
      <section id="tiers" className="max-w-7xl mx-auto py-32 px-6">
        <SectionHeading subtitle="Signature Tiers" title="Monthly Curations" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {subscriptions.map((item: any, i) => (
            <div key={i} className="bg-white border border-[#121212]/5 group">
              <div className="aspect-[3/4] overflow-hidden bg-[#F0EBE5]">
                <img 
                  src={formatImage(item.data.image_url)} 
                  alt={item.data.species} 
                  className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] mb-2">{item.data.tier} Edition</div>
                    <h3 className="text-3xl font-serif">{item.data.species.split(' Edition')[0]}</h3>
                  </div>
                  <div className="text-2xl font-serif">${item.data.price_cents / 100}</div>
                </div>
                
                <p className="text-sm text-[#121212]/60 font-light leading-relaxed mb-8">
                  {item.data.description}
                </p>

                <ul className="space-y-3 mb-10 text-[10px] uppercase font-bold tracking-widest text-[#121212]/80">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#D4AF37]"></div> {item.data.dimensions}</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#D4AF37]"></div> MC: {item.data.moisture_content}% Verified</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#D4AF37]"></div> S2S Milled Finish</li>
                </ul>

                <a 
                  href={item.data.stripe_link || '#'}
                  className="block w-full text-center py-5 bg-[#121212] text-[#FAF6F1] font-bold uppercase tracking-widest text-[10px] hover:bg-[#D4AF37] hover:text-[#121212] transition-all"
                >
                  Secure Subscription
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Marketplace */}
      <section id="marketplace" className="bg-[#121212] py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="The Marketplace" title="Sawmill Off-cuts" light />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {marketplace.map((item: any, i) => (
              <div key={i} className="group border border-white/5 hover:border-white/20 transition-all p-6 bg-white/5">
                <div className="aspect-square mb-8 overflow-hidden">
                  <img 
                    src={formatImage(item.data.image_url)} 
                    alt={item.data.species} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all group-hover:scale-105"
                  />
                </div>
                
                <div className="flex justify-between items-baseline mb-4">
                  <h3 className="text-2xl font-serif text-[#FAF6F1]">{item.data.species}</h3>
                  <span className="text-[#D4AF37] font-serif">${item.data.price_cents / 100}</span>
                </div>
                
                <p className="text-[#FAF6F1]/40 text-xs font-light mb-8 leading-relaxed line-clamp-2">
                  {item.data.description}
                </p>
                
                <div className="flex justify-between text-[9px] uppercase font-bold tracking-widest text-[#FAF6F1]/60 mb-8">
                  <span>{item.data.dimensions}</span>
                  <span>{item.data.moisture_content}% MC</span>
                </div>

                <a 
                  href={item.data.stripe_link || '#'}
                  className="block w-full text-center py-4 border border-[#D4AF37]/50 text-[#D4AF37] font-bold uppercase tracking-widest text-[9px] hover:bg-[#D4AF37] hover:text-[#121212] transition-all"
                >
                  Purchase Material
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Audit Process */}
      <section id="process" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <SectionHeading subtitle="Operational Standards" title="The Master Audit." />
            <p className="text-[#121212]/60 font-light leading-relaxed mb-12">
              Every board is tested for moisture content using Wagner digital pin meters. We reject anything outside the 6.0-8.0% range to ensure your heirloom builds stay flat for generations.
            </p>
            
            <div className="space-y-10">
              {[
                { title: "Boutique Sawmill Partners", text: "We skip industrial mills, sourcing directly from owner-operators who specialize in figured domestic and exotic species." },
                { title: "Precision Milling", text: "All stock is surfaced two sides (S2S) to a minimum of 120-grit. Rare slabettes receive 150-grit hand finishing." },
                { title: "Unboxing Engineering", text: "Tools are oriented handle-first in custom foam trays. We even include fresh cedar shavings for the aromatic reveal." }
              ].map((step, i) => (
                <div key={i} className="flex gap-8">
                  <div className="text-3xl font-serif text-[#D4AF37] opacity-40">0{i+1}</div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-widest mb-3">{step.title}</h4>
                    <p className="text-sm text-[#121212]/60 font-light leading-relaxed">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
             <img 
               src="/images/top-down-technical-unboxing-view-of-the-.png" 
               alt="Technical Unboxing" 
               className="w-full border border-[#121212]/5 shadow-2xl"
             />
             <div className="absolute -bottom-10 -right-10 bg-[#121212] p-10 text-[#FAF6F1]">
               <div className="text-3xl font-serif mb-2 text-[#D4AF37]">120 Grit</div>
               <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">Surface Certified</div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
