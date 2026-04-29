import React from 'react';

async function getInventory() {
  const dbId = "2935fa57-8b71-45f7-84bb-fdb46d872b06";
  const res = await fetch(`https://stg-app.baget.ai/api/public/databases/${dbId}/rows`, {
    cache: 'no-store'
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.rows || [];
}

const GoldBadge = ({ text }: { text: string }) => (
  <span className="bg-gold/10 text-gold border border-gold/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
    {text}
  </span>
);

export default async function HomePage() {
  const inventory = await getInventory();

  return (
    <div className="bg-workshop-cream min-h-screen font-sans text-midnight">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center bg-midnight overflow-hidden">
        {/* Decorative background with SVG patterns instead of images to avoid deploy issues */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
             <defs>
              <pattern id="grain" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 Q 5 0, 10 10 T 20 10" fill="none" stroke="#D4AF37" strokeWidth="0.1" opacity="0.3" />
                <path d="M0 15 Q 5 5, 10 15 T 20 15" fill="none" stroke="#D4AF37" strokeWidth="0.1" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grain)" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-workshop-cream">
          <GoldBadge text="June 2026 Collection" />
          <h1 className="text-6xl md:text-8xl mb-8 leading-[1.1] max-w-5xl mx-auto font-serif mt-6">
            Instrument-Grade <span className="text-gold">Ziricote</span> & Precision Steel.
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-12 opacity-80 font-light text-balance">
            The June Master Edition pairs rare landscape-grain Ziricote with the 15 TPI Lie-Nielsen Dovetail Saw. Strictly limited to 50 boxes.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#inventory" className="btn-gold">Explore the Collection</a>
            <a href="#process" className="px-8 py-4 border border-workshop-cream/30 rounded-[12px] font-bold hover:bg-workshop-cream/10 transition-all">Sourcing Process</a>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-midnight py-8 border-y border-gold/20">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8">
          {[
            { id: 'MC', text: '6-8% Moisture Certified' },
            { id: 'S2S', text: 'Sanded 120-Grit Finish' },
            { id: 'LA', text: 'Lacey Act Compliant' },
            { id: 'BF', text: 'Bell Forest Partner' }
          ].map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold text-[10px] font-bold shrink-0">
                {item.id}
              </div>
              <span className="text-workshop-cream text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap opacity-70">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Inventory Catalog */}
      <section id="inventory" className="max-w-7xl mx-auto py-32 px-6">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="max-w-xl">
            <h2 className="text-5xl mb-6 font-serif">June Storefront</h2>
            <p className="text-midnight/60 text-lg">
              Curated bundles and individual "Master Grade" off-cuts sourced from boutique PNW mills.
            </p>
          </div>
          <div className="flex gap-4">
             <GoldBadge text="In Stock" />
             <GoldBadge text="Kiln Dried" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {inventory.map((row: any) => (
            <div key={row.id} className="group flex flex-col">
              <div className="aspect-[4/5] overflow-hidden rounded-[4px] relative mb-10 bg-midnight/5 shadow-2xl transition-all group-hover:shadow-gold/10">
                <img 
                  src={row.data.image_url} 
                  alt={row.data.species} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-8 left-8 flex flex-col gap-3">
                  <span className="bg-midnight text-workshop-cream px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest shadow-lg">
                    {row.data.tier} Tier
                  </span>
                  {row.data.rarity && (
                    <span className="bg-gold text-midnight px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest shadow-lg">
                      {row.data.rarity}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex-1 flex flex-col px-2">
                <div className="flex justify-between items-baseline mb-4">
                  <h3 className="text-3xl font-serif">{row.data.species}</h3>
                  <span className="text-2xl font-serif text-gold">${row.data.price_cents / 100}</span>
                </div>
                <p className="text-midnight/60 text-sm mb-10 leading-relaxed line-clamp-2 font-light italic">
                  &ldquo;{row.data.description}&rdquo;
                </p>
                
                <div className="mt-auto pt-8 border-t border-midnight/10 flex justify-between items-center mb-10">
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                    Sizing
                    <span className="block text-midnight text-sm mt-1 opacity-100 normal-case">{row.data.dimensions}</span>
                  </div>
                  <div className="text-right text-[10px] font-bold uppercase tracking-widest opacity-40">
                    Condition
                    <span className="block text-midnight text-sm mt-1 opacity-100 normal-case">{row.data.moisture_content}% MC • S2S</span>
                  </div>
                </div>

                <a 
                  href={row.data.stripe_link}
                  className="w-full text-center py-5 bg-midnight text-workshop-cream font-bold uppercase tracking-widest text-[10px] hover:bg-gold hover:text-midnight transition-all rounded-[2px]"
                >
                  Purchase Entry
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Detail Section */}
      <section id="process" className="bg-midnight py-40 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
           <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 0 L100 50 L0 100 Z" fill="#D4AF37" />
           </svg>
         </div>
         
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div>
            <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-8 block">Material Standards</span>
            <h2 className="text-5xl md:text-7xl mb-12 leading-tight text-workshop-cream font-serif">The <span className="italic text-gold">Master</span> Grade.</h2>
            <div className="space-y-12">
              {[
                { title: 'Boutique Milling', desc: 'Every board is resawn and surfaced to order at Bell Forest Products, ensuring grain continuity.' },
                { title: 'Digital MC Audit', desc: 'Verification using Wagner and Lignomat meters. We reject anything above 8.5%.' },
                { title: 'Heirloom Tooling', desc: 'Precision steel from Lie-Nielsen and Veritas. Tools designed to last generations.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-8">
                  <div className="text-gold font-serif text-3xl opacity-40">0{idx + 1}</div>
                  <div>
                    <h4 className="text-xl font-bold text-workshop-cream mb-2">{item.title}</h4>
                    <p className="text-workshop-cream/60 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/5 p-16 border border-white/10 rounded-[4px] backdrop-blur-sm">
             <h3 className="text-3xl font-serif text-gold mb-8">June Narrative</h3>
             <p className="text-workshop-cream/80 text-lg mb-12 font-light leading-relaxed italic">
               &ldquo;Ziricote is nature&apos;s map. This month, we focus on joinery that respects the landscape—pairing the densest Mexican Ziricote with the high-carbon bite of a Lie-Nielsen saw.&rdquo;
             </p>
             <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/10">
               <div>
                 <span className="text-gold text-4xl font-serif block mb-2">50</span>
                 <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-workshop-cream opacity-50">Master Units</span>
               </div>
               <div>
                 <span className="text-gold text-4xl font-serif block mb-2">0.35</span>
                 <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-workshop-cream opacity-50">Avg. BF Per Box</span>
               </div>
             </div>
          </div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="bg-workshop-cream py-32 text-center border-t border-midnight/5">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl mb-8 font-serif italic">Build with the best.</h2>
          <p className="text-midnight/60 mb-12">
            Join 1,200+ master craftsmen who trust Grain & Gavel for their material and tool procurement.
          </p>
          <a href="#inventory" className="btn-midnight">Join the June Cohort</a>
        </div>
      </section>
    </div>
  );
}
