import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowDown } from 'lucide-react';
import MetallicLogo from './components/MetallicLogo';
import FadeIn from './components/FadeIn';

// --- Components defined within App to share context if needed, or keeping file count low per instructions ---

const Navigation: React.FC<{ isOpen: boolean; toggle: () => void; isScrolled: boolean }> = ({ isOpen, toggle, isScrolled }) => (
  <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-4' : 'bg-transparent py-6'}`}>
    <div className="container mx-auto px-6 flex justify-between items-center">
      <div className={`font-cinzel text-lg tracking-widest transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
        MOMENTORY
      </div>
      
      <button onClick={toggle} className="group flex items-center gap-2 focus:outline-none">
        <span className="font-lato text-xs tracking-[0.2em] uppercase text-gray-500 group-hover:text-black transition-colors hidden md:block">
          {isOpen ? 'Close' : 'Menu'}
        </span>
        <div className="relative p-2">
           {isOpen ? <X className="w-6 h-6 text-gray-800" /> : <Menu className="w-6 h-6 text-gray-800" />}
        </div>
      </button>
    </div>

    {/* Full Screen Menu */}
    <div className={`fixed inset-0 bg-[#FAFAFA] z-40 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
      <div className="h-full flex flex-col justify-center items-center">
        <ul className="space-y-8 text-center">
          {['Philosophy', 'Services', 'Company', 'Contact'].map((item, index) => (
            <li key={item} className="overflow-hidden">
               <a href={`#${item.toLowerCase()}`} onClick={toggle} className="block font-cinzel text-4xl md:text-6xl text-gray-300 hover:text-black hover:text-metallic transition-all duration-300 transform hover:scale-105">
                 {item}
               </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </nav>
);

const Section: React.FC<{ id?: string; className?: string; children: React.ReactNode }> = ({ id, className = '', children }) => (
  <section id={id} className={`py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Loading Animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading Screen
  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] bg-marble flex flex-col items-center justify-center transition-opacity duration-700">
        <div className="scale-100 opacity-0 animate-[fadeInScale_0.8s_ease-out_forwards]">
          <MetallicLogo size="md" animated={true} />
        </div>
        
        <div className="mt-12 h-px w-32 md:w-48 bg-gray-200 overflow-hidden relative">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent w-1/2 -translate-x-full animate-[loadingBar_1.5s_infinite]" />
        </div>

        <style>{`
          @keyframes loadingBar {
            0% { transform: translateX(-200%); }
            100% { transform: translateX(400%); }
          }
          @keyframes fadeInScale {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <Navigation isOpen={menuOpen} toggle={() => setMenuOpen(!menuOpen)} isScrolled={scrolled} />

      {/* Hero Section */}
      <header className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <FadeIn delay={200}>
           <MetallicLogo size="xl" />
        </FadeIn>
        
        <FadeIn delay={1000} className="absolute bottom-24 md:bottom-32 text-center px-4">
          <h2 className="font-noto-serif text-sm md:text-base tracking-[0.2em] leading-loose text-gray-600">
            決断という一瞬の輝きを、<br className="md:hidden" />永続的な市場価値と、<br className="md:hidden" />未来の確かな舞台に変える。
          </h2>
          <p className="mt-4 font-cinzel text-xs text-gray-400 tracking-widest">
            Transforming the momentary brilliance of decision into lasting market value.
          </p>
        </FadeIn>

        <div className="absolute bottom-8 animate-bounce opacity-30">
          <ArrowDown size={20} />
        </div>
      </header>

      {/* Philosophy / Concept Section */}
      <Section id="philosophy" className="relative">
        {/* Background decorative vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -z-10 hidden md:block"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-12">
          {/* Moment */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-6">
            <FadeIn>
              <h3 className="font-cinzel text-5xl md:text-7xl text-gray-100 relative inline-block">
                01
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl md:text-3xl text-gray-800 font-medium tracking-widest text-metallic">
                  Moment
                </span>
              </h3>
            </FadeIn>
            <FadeIn delay={200}>
              <h4 className="text-lg font-bold mb-4 tracking-widest">決断の一瞬</h4>
              <p className="text-gray-600 leading-8 text-sm md:text-base max-w-md">
                <span className="font-bold block mb-2">Moment of Truth</span>
                顧客が「良い・悪い」を判断する決定的瞬間。<br/>
                Micro-moments：欲求が生まれ、行動する小さな瞬間。<br/>
                私たちは、顧客の心が動く決定の瞬間をデザインします。
              </p>
            </FadeIn>
          </div>

          {/* Entry */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 mt-12 md:mt-32">
             <FadeIn>
              <h3 className="font-cinzel text-5xl md:text-7xl text-gray-100 relative inline-block">
                02
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl md:text-3xl text-gray-800 font-medium tracking-widest text-metallic">
                  Entry
                </span>
              </h3>
            </FadeIn>
            <FadeIn delay={200}>
              <h4 className="text-lg font-bold mb-4 tracking-widest">未来への入口</h4>
              <p className="text-gray-600 leading-8 text-sm md:text-base max-w-md">
                <span className="font-bold block mb-2">Entry Point</span>
                新しい市場への参入。<br/>
                顧客との接点・チャンスの入り口。<br/>
                挑戦者を次のステージへ運ぶ「確かな入口」をつくります。
              </p>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Catchphrase / Divider */}
      <section className="py-32 bg-gray-50/50 border-t border-b border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <FadeIn>
            <p className="font-cinzel text-3xl md:text-5xl text-metallic leading-tight mb-12">
              "Turning moments of decision <br /> into lasting market value."
            </p>
            
            <div className="space-y-6 text-gray-800">
              <p className="font-noto-serif text-lg md:text-2xl font-medium leading-relaxed">
                若者の「なりたい」という決断を、<br className="md:hidden" />
                社会に価値を生むマーケティング力へ。
              </p>
              <p className="font-noto-serif text-sm md:text-base text-gray-600 tracking-wider">
                夢を持つ人を、憧れを与える側へ導く。
              </p>
            </div>

            <div className="mt-12 w-16 h-px bg-gray-400 mx-auto"></div>
            <p className="mt-8 font-lato text-sm text-gray-500 tracking-[0.2em] uppercase">
              An emotional turning point for our customers.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services Section */}
      <Section id="services">
        <div className="flex flex-col items-center mb-16">
           <span className="font-cinzel text-gray-400 tracking-[0.3em] mb-2">OUR EXPERTISE</span>
           <h2 className="font-serif text-3xl md:text-4xl text-gray-800">Services</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "Branding", desc: "瞬間の価値を永続的なブランドへ。" },
             { title: "Digital Experience", desc: "感情を動かすデジタル接点の構築。" },
             { title: "Market Entry", desc: "新規事業・市場参入の戦略設計。" }
           ].map((service, idx) => (
             <FadeIn key={idx} delay={idx * 100} className="group p-8 border border-gray-100 hover:border-gray-300 transition-colors duration-500 bg-white/40 hover:bg-white/80 backdrop-blur-sm">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <span className="font-cinzel text-4xl text-gray-200 group-hover:text-gray-400 transition-colors">0{idx + 1}</span>
                    <h3 className="mt-6 text-xl font-serif font-medium mb-4">{service.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                  </div>
                  <div className="mt-8 w-8 h-px bg-gray-300 group-hover:w-full transition-all duration-500"></div>
                </div>
             </FadeIn>
           ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="mb-20">
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white p-12 md:p-24 overflow-hidden rounded-sm">
           {/* Abstract Decoration */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           
           <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
             <div className="text-center md:text-left">
               <h2 className="font-cinzel text-3xl md:text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">
                 Start Your Moment
               </h2>
               <p className="text-gray-400 font-lato tracking-wide">
                 未来の確かな舞台へ。
               </p>
             </div>
             
             <a href="mailto:contact@momentory.com" className="group relative px-8 py-4 border border-gray-600 hover:border-white transition-all duration-300 overflow-hidden">
                <span className="relative z-10 font-lato tracking-[0.2em] text-sm group-hover:text-black transition-colors duration-300">
                  CONTACT US
                </span>
                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
             </a>
           </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="font-cinzel text-lg font-bold tracking-widest text-gray-800">
             MOMENTORY
           </div>
           <div className="text-xs text-gray-400 font-lato tracking-widest">
             &copy; {new Date().getFullYear()} Momentory Inc. All Rights Reserved.
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;