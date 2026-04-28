import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#FAF6F1] text-[#3D2B1F] font-['Nunito'] antialiased">
        <header className="py-8 px-6 max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#C4654A] rounded-full flex items-center justify-center text-[#FAF6F1] font-bold text-xl">G</div>
            <span className="font-['DM_Serif_Display'] text-2xl tracking-tight">Grain & Gavel</span>
          </div>
          <nav className="hidden md:flex gap-8 font-semibold text-[#7D8B69]">
            <a href="#inventory" className="hover:text-[#C4654A] transition-colors">Catalog</a>
            <a href="#about" className="hover:text-[#C4654A] transition-colors">The Process</a>
            <a href="#partnership" className="hover:text-[#C4654A] transition-colors">Sourcing</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="bg-[#3D2B1F] text-[#FAF6F1] py-16 px-6 mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-['DM_Serif_Display'] text-2xl mb-4">Grain & Gavel</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Curated subscription boxes for artisanal woodworkers. Featuring ethically sourced rare lumber and specialized heirloom tools.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 uppercase tracking-widest text-xs text-[#7D8B69]">Partnership</h4>
              <p className="text-sm opacity-80 leading-relaxed">
                Milled and fulfilled by <strong>Bell Forest Products</strong> in Ishpeming, MI. Guaranteed moisture content (6-8%).
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 uppercase tracking-widest text-xs text-[#7D8B69]">Legal</h4>
              <p className="text-sm opacity-80 leading-relaxed">
                All species CITES and Lacey Act compliant. &copy; 2026 Grain & Gavel.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
