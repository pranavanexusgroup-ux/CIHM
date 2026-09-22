import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Send,
  CheckCircle2,
  Share2,
  Star,
  Award,
  ShieldCheck,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [emailSub, setEmailSub] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSub.trim()) return;
    setSubSuccess(true);
    setEmailSub('');
    setTimeout(() => setSubSuccess(false), 4000);
  };

  const socialMediaFeeds = [
    {
      platform: 'Facebook',
      handle: 'CIHM Kolkata Official',
      tag: 'Placement Update',
      icon: '📘',
      title: 'Congratulations to our 14 students joining Apollo Hospitals Kolkata',
      link: 'https://www.facebook.com',
    },
    {
      platform: 'Instagram',
      handle: '@cihmkolkata',
      tag: 'Campus Life',
      icon: '📸',
      title: 'Practical Biochemistry & Automated Analyzer lab rotations at DumDum Campus',
      link: 'https://www.instagram.com',
    },
    {
      platform: 'YouTube',
      handle: 'CIHM Healthcare Official',
      tag: 'Clinical Workshop',
      icon: '▶️',
      title: '12-Lead ECG & Arrhythmia interpretation masterclass with Dr. S. Chatterjee',
      link: 'https://www.youtube.com',
    },
    {
      platform: 'Google Reviews',
      handle: '4.9 ★★★★★ (284+ Reviews)',
      tag: 'Verified Feedback',
      icon: '⭐',
      title: 'Rated East India’s premier paramedical & healthcare training institute',
      link: 'https://maps.google.com/?q=CIHM+Kolkata',
    },
  ];

  return (
    <footer className="bg-[#0f1f4b] text-white border-t border-blue-800/80">
      {/* Interactive Social Media Highlights Ribbon (FB, Insta, YouTube) */}
      <div className="border-b border-blue-800/60 bg-[#14245c] py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
                <span>OFFICIAL SOCIAL MEDIA CHANNELS &amp; VERIFIED REVIEWS</span>
              </div>
              <h3 className="text-xl font-extrabold text-white font-['Outfit']">
                Connect With CIHM on Facebook, Instagram, YouTube &amp; Google
              </h3>
            </div>
            <p className="text-xs text-blue-100 max-w-sm">
              Watch authentic student lab demonstrations, live placement ceremony broadcasts, and daily
              clinical updates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {socialMediaFeeds.map((feed, idx) => (
              <a
                key={idx}
                href={feed.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#1b3280] rounded-2xl p-4 border border-blue-400/40 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold flex items-center gap-1.5">
                      <span>{feed.icon}</span>
                      <span className="text-white text-xs">{feed.platform}</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#14245c] text-amber-300 border border-blue-400/50 font-semibold">
                      {feed.tag}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-blue-100 group-hover:text-amber-200 transition-colors line-clamp-2">
                    {feed.title}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-blue-700/60 text-[11px] text-blue-200">
                  <span className="truncate">{feed.handle}</span>
                  <span className="text-amber-300 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    View <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Body - CIHM Palette */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/cihm-logo.svg"
                alt="CIHM Kolkata"
                className="w-12 h-12 rounded-full border-2 border-amber-400 shadow-md"
              />
              <div>
                <span className="font-extrabold text-xl tracking-wider text-white font-['Outfit'] block">
                  CIHM KOLKATA
                </span>
                <span className="text-xs text-blue-200 font-medium">
                  Central Institute of Healthcare &amp; Management
                </span>
              </div>
            </div>

            <p className="text-xs text-blue-100 leading-relaxed max-w-sm">
              East India’s leading healthcare institution providing NABL-aligned laboratory exposure,
              AERB-compliant radiology training, 1-Year UK Medical Fellowships, and direct placement tie-ups
              with Apollo, Fortis, and Medica.
            </p>

            {/* Social Icons row */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1b3280] border border-blue-400/50 hover:bg-amber-500 hover:text-[#14245c] text-blue-100 flex items-center justify-center text-xs font-bold transition-all shadow-xs"
                title="Facebook"
              >
                FB
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1b3280] border border-blue-400/50 hover:bg-amber-500 hover:text-[#14245c] text-blue-100 flex items-center justify-center text-xs font-bold transition-all shadow-xs"
                title="Instagram"
              >
                IG
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1b3280] border border-blue-400/50 hover:bg-amber-500 hover:text-[#14245c] text-blue-100 flex items-center justify-center text-xs font-bold transition-all shadow-xs"
                title="YouTube"
              >
                YT
              </a>
              <a
                href="https://maps.google.com/?q=CIHM+Kolkata"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1b3280] border border-blue-400/50 hover:bg-amber-500 hover:text-[#14245c] text-blue-100 flex items-center justify-center text-xs font-bold transition-all shadow-xs"
                title="Google Reviews"
              >
                G★
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-['Outfit']">
              Campus Pages
            </h4>
            <ul className="space-y-2 text-xs text-blue-100">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Header Carousel
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-amber-300 transition-colors"
                >
                  All Accredited Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('roadmap')}
                  className="hover:text-amber-300 transition-colors font-bold text-amber-300"
                >
                  ★ Career Roadmap
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fellowships')}
                  className="hover:text-amber-300 transition-colors font-bold text-amber-200"
                >
                  ★ 16 UK Fellowships
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-amber-300 transition-colors font-bold text-blue-200"
                >
                  Placement Trends Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('placements')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Hospital Recruiters
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Google Reviews (4.9★)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-amber-300 transition-colors font-bold text-blue-200"
                >
                  Admin Control Panel
                </button>
              </li>
            </ul>
          </div>

          {/* Key Courses for SEO */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-['Outfit']">
              Clinical Specializations
            </h4>
            <ul className="space-y-1.5 text-xs text-teal-100">
              <li
                className="hover:text-amber-300 cursor-pointer"
                onClick={() => onNavigate('courses')}
              >
                • Medical Laboratory Technology (DMLT)
              </li>
              <li
                className="hover:text-amber-300 cursor-pointer"
                onClick={() => onNavigate('courses')}
              >
                • Radiography &amp; Digital Imaging (X-Ray &amp; CT)
              </li>
              <li
                className="hover:text-amber-300 cursor-pointer"
                onClick={() => onNavigate('courses')}
              >
                • Hospital Management (DHM - NABH Audits)
              </li>
              <li
                className="hover:text-amber-300 cursor-pointer"
                onClick={() => onNavigate('courses')}
              >
                • Critical Care &amp; Dialysis Technology
              </li>
              <li
                className="hover:text-amber-300 cursor-pointer"
                onClick={() => onNavigate('courses')}
              >
                • Operation Theatre Technology (DOTT)
              </li>
              <li
                className="hover:text-amber-300 cursor-pointer"
                onClick={() => onNavigate('courses')}
              >
                • ECG &amp; Non-Invasive Cardiology
              </li>
            </ul>
          </div>

          {/* Contact & Campus Info */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-['Outfit']">
              Campus &amp; Helplines
            </h4>
            <div className="space-y-2 text-teal-100">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  105/59, DumDum Road, P.S: DumDum, Motijheel, Kolkata-700074, West Bengal
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:9073737888" className="hover:underline font-bold">
                  9073737888 / 9073737444
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">info.cihm.kolkata@gmail.com</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-teal-200 block mb-1">
                Receive Admission &amp; Placement Alerts
              </span>
              {subSuccess ? (
                <div className="text-emerald-400 text-xs flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-1.5">
                  <input
                    required
                    type="email"
                    placeholder="Enter email..."
                    value={emailSub}
                    onChange={(e) => setEmailSub(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-[#073947] border border-teal-600 rounded-xl text-white placeholder-teal-300 text-xs focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-[#073947] rounded-xl text-xs font-black transition-all shadow-xs"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-10 pt-6 border-t border-teal-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-teal-300 gap-3">
          <p>© {new Date().getFullYear()} CIHM - Central Institute of Healthcare &amp; Management. East India Authorised Center.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Admission</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">NABL &amp; AERB Norms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
