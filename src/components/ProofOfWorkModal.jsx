import React from 'react';
import { X, Printer, Download, ExternalLink, FileCheck } from 'lucide-react';

export default function ProofOfWorkModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2200] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#0B132B] border border-cyan-500/50 rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-[#1C2541] border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-700">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Proof of Work / Solution Evidence Document
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs">
                  PDF &lt; 10 MB Compliant
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Official Evidence Document for NESFIC-D-22 (Wireframes, Architecture, Benchmarks, ₹40L Budget)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="/proof_of_work_document.html"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-bold flex items-center gap-1.5 shadow transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Embedded iframe of the clean print document */}
        <div className="flex-1 bg-slate-900 overflow-hidden">
          <iframe
            src="/proof_of_work_document.html"
            title="Proof of Work Evidence Document"
            className="w-full h-full border-none"
          />
        </div>
      </div>
    </div>
  );
}
