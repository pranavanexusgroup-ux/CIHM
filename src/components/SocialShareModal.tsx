import React, { useState } from 'react';
import {
  X,
  Share2,
  Check,
  Copy,
  Download,
  Award,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  badge: string;
  image?: string;
  quote?: string;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  image,
  quote,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://cihm.in';
  const shareText = `Proud to share my achievement at Central Institute of Healthcare & Management (CIHM Kolkata)! 🎓 ${title} - ${subtitle} #CIHM #Paramedical #HealthcareCareer`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${shareText}\n${currentUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareToWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${shareText}\n${currentUrl}`
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm font-['Outfit']">Share Your Progress &amp; Achievement</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shareable Card Graphic Preview */}
        <div className="p-6 space-y-5">
          <div
            id="shareable-achievement-card"
            className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 p-5 rounded-2xl border-2 border-amber-400/80 text-white shadow-xl relative overflow-hidden"
          >
            {/* Top Crest */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/cihm-logo.svg"
                  alt="CIHM"
                  className="w-9 h-9 rounded-full border border-amber-400 shadow"
                />
                <div>
                  <h4 className="font-extrabold text-xs tracking-wider font-['Outfit']">CIHM KOLKATA</h4>
                  <p className="text-[9px] text-slate-400">Central Institute of Healthcare &amp; Management</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase">
                {badge || 'Achievement'}
              </span>
            </div>

            {/* Student or Course Detail */}
            <div className="py-4 flex items-center gap-4">
              {image && (
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400 shrink-0 bg-slate-800 shadow">
                  <img src={image} alt="Achiever" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="min-w-0">
                <h3 className="font-black text-lg text-white font-['Outfit'] truncate">
                  {title}
                </h3>
                <p className="text-xs font-semibold text-cyan-300 mt-0.5 truncate">
                  {subtitle}
                </p>
                {quote && (
                  <p className="text-[11px] text-slate-300 italic mt-1 line-clamp-2">
                    "{quote}"
                  </p>
                )}
              </div>
            </div>

            {/* Card Footer Verification */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
              <span>Verified CIHM Student Portal</span>
              <span className="text-amber-400 font-bold">100% Placement Verified</span>
            </div>
          </div>

          {/* Social Platforms Row */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Share Directly to Social Platforms
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {/* WhatsApp */}
              <button
                onClick={shareToWhatsApp}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 transition-colors"
              >
                <span className="text-base font-bold">💬</span>
                <span className="text-[11px] font-bold mt-1">WhatsApp</span>
              </button>

              {/* Facebook */}
              <button
                onClick={shareToFacebook}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 transition-colors"
              >
                <span className="text-base font-bold">📘</span>
                <span className="text-[11px] font-bold mt-1">Facebook</span>
              </button>

              {/* LinkedIn */}
              <button
                onClick={shareToLinkedIn}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 text-cyan-800 transition-colors"
              >
                <span className="text-base font-bold">💼</span>
                <span className="text-[11px] font-bold mt-1">LinkedIn</span>
              </button>

              {/* Twitter / X */}
              <button
                onClick={shareToTwitter}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 transition-colors"
              >
                <span className="text-base font-bold">𝕏</span>
                <span className="text-[11px] font-bold mt-1">Twitter/X</span>
              </button>
            </div>
          </div>

          {/* Copy Link button */}
          <div className="pt-2">
            <button
              onClick={handleCopyLink}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Achievement Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copy Formatted Achievement Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
