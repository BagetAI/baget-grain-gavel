"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { recordSuccessfulSaleAction } from '@/app/actions/checkout';
import Link from 'next/link';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const species = searchParams.get('species');
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');

  useEffect(() => {
    if (species) {
      recordSuccessfulSaleAction(species)
        .then((res) => {
          if (res.success) setStatus('success');
          else setStatus('error');
        })
        .catch(() => setStatus('error'));
    } else {
      setStatus('success'); // Fallback if no species param
    }
  }, [species]);

  return (
    <div className="min-h-screen bg-[#FAF6F1] flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full bg-white border border-[#121212]/5 p-12 text-center shadow-sm">
        {status === 'processing' && (
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full mx-auto mb-8 flex items-center justify-center">
              <Package className="text-[#D4AF37] w-8 h-8" />
            </div>
            <h1 className="text-3xl font-serif mb-4">Finalizing Order...</h1>
            <p className="text-[#121212]/60">Updating our workshop inventory and preparing your shipment.</p>
          </div>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-50 rounded-full mx-auto mb-8 flex items-center justify-center">
              <CheckCircle2 className="text-green-600 w-8 h-8" />
            </div>
            <h1 className="text-3xl font-serif mb-4">Securely Confirmed</h1>
            <p className="text-[#121212]/60 mb-8 leading-relaxed">
              Your selection of <span className="text-[#121212] font-semibold">{species || "Master Grade Inventory"}</span> has been secured. Our team in Ishpeming will begin milling and kitting shortly.
            </p>
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                className="bg-[#121212] text-white py-4 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-[#121212] transition-all"
              >
                Back to Catalog <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-50 rounded-full mx-auto mb-8 flex items-center justify-center text-red-600 font-bold text-2xl">!</div>
            <h1 className="text-3xl font-serif mb-4">Update Notice</h1>
            <p className="text-[#121212]/60 mb-8">
              We received your payment, but our automated inventory system hit a snag. Rest assured, your order is safe.
            </p>
            <Link href="/" className="text-[#121212] font-bold uppercase tracking-widest text-[10px] underline underline-offset-8">Return Home</Link>
          </>
        )}
      </div>
    </div>
  );
}
