import React from 'react';

async function getInventory() {
  const dbId = "2935fa57-8b71-45f7-84bb-fdb46d872b06";
  // Added cache: 'no-store' to ensure we see updates during testing
  const res = await fetch(`https://stg-app.baget.ai/api/public/databases/${dbId}/rows`, {
    cache: 'no-store'
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.rows || [];
}

export default async function HomePage() {
  const inventory = await getInventory();

  return (
    <div className="px-6">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto py-20 text-center">
        <h1 className="font-['DM_Serif_Display'] text-5xl md:text-7xl mb-6 max-w-4xl mx-auto leading-tight">
          Heirloom tools meet the world&apos;s <span className="text-[#C4654A]">rarest lumber</span>.
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-10 text-[#3D2B1F]/80">
          The only subscription box engineered for the master craftsman. Shop-ready species milled by Bell Forest, paired with precision instruments.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#inventory" className="bg-[#C4654A] text-[#FAF6F1] px-8 py-4 rounded-[24px] font-bold text-lg hover:shadow-[0_12px_32px_rgba(196,101,74,0.2)] transition-all">
            Browse Catalog
          </a>
          <a href="#about" className="bg-[#7D8B69]/10 text-[#7D8B69] px-8 py-4 rounded-[24px] font-bold text-lg hover:bg-[#7D8B69]/20 transition-all">
            Our Sourcing
          </a>
        </div>
      </section>

      {/* Inventory Catalog */}
      <section id="inventory" className="max-w-7xl mx-auto py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="font-['DM_Serif_Display'] text-4xl mb-4 text-[#3D2B1F]">The 2026 Collection</h2>
            <p className="text-[#3D2B1F]/70">Initial inventory of curated bundles featuring Bocote, Ziricote, and Curly Maple.</p>
          </div>
          <div className="flex gap-4">
            <span className="bg-[#7D8B69]/20 text-[#7D8B69] px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">6-8% Moisture</span>
            <span className="bg-[#C4654A]/20 text-[#C4654A] px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">S2S Milled</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {inventory.map((row: any) => (
            <div key={row.id} className="bg-white rounded-[24px] overflow-hidden shadow-[0_12px_32px_rgba(61,43,31,0.05)] border border-[#3D2B1F]/5 group transition-transform hover:-translate-y-2">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={row.data.image_url} 
                  alt={row.data.species} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-[#FAF6F1]/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#3D2B1F]">
                  {row.data.tier} Tier
                </div>
                {row.data.rarity && (
                  <div className="absolute bottom-4 left-4 bg-[#3D2B1F]/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-[#FAF6F1] uppercase tracking-tighter">
                    {row.data.rarity}
                  </div>
                )}
              </div>
              <div className="p-8">
                <h3 className="font-['DM_Serif_Display'] text-2xl mb-2">{row.data.species}</h3>
                <p className="text-sm text-[#3D2B1F]/70 mb-6 leading-relaxed line-clamp-2">
                  {row.data.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-[#3D2B1F]/5">
                  <div className="text-[10px] text-[#7D8B69] uppercase font-bold tracking-widest">
                    Dimensions
                    <span className="block text-[#3D2B1F] text-sm mt-1 normal-case font-semibold">{row.data.dimensions}</span>
                  </div>
                  <div className="text-[10px] text-[#7D8B69] uppercase font-bold tracking-widest text-right">
                    Board Footage
                    <span className="block text-[#3D2B1F] text-sm mt-1 normal-case font-semibold">{row.data.board_footage || '0.25'} BF</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                   <div className="text-[10px] text-[#7D8B69] uppercase font-bold tracking-widest">
                    Moisture
                    <span className="block text-[#3D2B1F] text-sm mt-1 normal-case font-semibold">{row.data.moisture_content}% MC</span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-['DM_Serif_Display'] text-[#C4654A]">${row.data.price_cents / 100}</span>
                  </div>
                </div>
                
                <a 
                  href={row.data.stripe_link}
                  className="block w-full text-center bg-[#3D2B1F] text-[#FAF6F1] py-4 rounded-[16px] font-bold hover:bg-[#C4654A] transition-colors"
                >
                  Secure Subscription
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sourcing/Process Section */}
      <section id="about" className="max-w-7xl mx-auto py-20 border-t border-[#3D2B1F]/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="bg-[#C4654A]/5 p-12 rounded-[24px]">
            <h2 className="font-['DM_Serif_Display'] text-4xl mb-6">Milled to Perfection</h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-[#C4654A] text-[#FAF6F1] flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-bold text-[#3D2B1F]">Ethical Sourcing</h4>
                  <p className="text-sm opacity-70">Direct partnerships with importers like West Penn and Cook Woods ensure Lacey Act compliance.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-[#C4654A] text-[#FAF6F1] flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-bold text-[#3D2B1F]">Precision Drying</h4>
                  <p className="text-sm opacity-70">Kiln-dried to 6-8% moisture content to prevent seasonal movement and checking.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-[#C4654A] text-[#FAF6F1] flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-bold text-[#3D2B1F]">Integrated Fulfillment</h4>
                  <p className="text-sm opacity-70">Processed at the Bell Forest facility in Michigan. S2S surfaced and sanded to 120-grit.</p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <span className="text-[#C4654A] font-bold uppercase tracking-widest text-sm mb-4 block">The Experience</span>
            <h2 className="font-['DM_Serif_Display'] text-5xl mb-6">Handle-First Engineering</h2>
            <p className="text-lg text-[#3D2B1F]/80 mb-8 leading-relaxed">
              Every box is more than materials; it&apos;s a curated project narrative. Our custom packaging ensures your high-density lumber and precision steel never touch in transit, arriving ready for the bench.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="block text-3xl font-['DM_Serif_Display'] text-[#7D8B69]">40%</span>
                <p className="text-xs uppercase font-bold text-[#3D2B1F]/50 tracking-tighter">Savings vs Retail</p>
              </div>
              <div>
                <span className="block text-3xl font-['DM_Serif_Display'] text-[#7D8B69]">100%</span>
                <p className="text-xs uppercase font-bold text-[#3D2B1F]/50 tracking-tighter">Recyclable EPE</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
