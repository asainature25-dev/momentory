import React, { useEffect, useMemo, useState } from "react";
import { Menu, X, ArrowDown, ChevronDown } from "lucide-react";
import MetallicLogo from "./components/MetallicLogo";
import Footer from "./components/Footer";
import FadeIn from "./components/FadeIn";

// --- Navigation ---
const Navigation: React.FC<{
  isOpen: boolean;
  toggle: () => void;
  isScrolled: boolean;
}> = ({ isOpen, toggle, isScrolled }) => (
  <nav
    className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled
        ? "bg-white/80 backdrop-blur-md border-b border-gray-100 py-4"
        : "bg-transparent py-6"
    }`}
  >
    <div className="container mx-auto px-6 flex justify-between items-center">
      <div
        className={`font-cinzel text-lg tracking-widest transition-opacity duration-300 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        MOMENTORY
      </div>

      <button
        onClick={toggle}
        className="group flex items-center gap-2 focus:outline-none"
      >
        <span className="font-lato text-xs tracking-[0.2em] uppercase text-gray-500 group-hover:text-black transition-colors hidden md:block">
          {isOpen ? "Close" : "Menu"}
        </span>
        <div className="relative p-2">
          {isOpen ? (
            <X className="w-6 h-6 text-gray-800" />
          ) : (
            <Menu className="w-6 h-6 text-gray-800" />
          )}
        </div>
      </button>
    </div>

    {/* Right Sidebar Menu */}
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-500 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* 背景 */}
      <div className="absolute inset-0 bg-white"></div>

      {/* 右サイドバー */}
      <div
        className={`absolute top-0 right-0 h-full w-[75%] sm:w-[60%] md:w-[40%] bg-white
        transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="h-full flex flex-col justify-center px-10 md:px-16">
          <ul className="space-y-6 text-right">
            {[
              { label: "会社情報", id: "company" },
              { label: "会社理念", id: "philosophy" },
              { label: "運営紹介", href: "/operator.html" },
              { label: "サービス案内", id: "services" },
              { label: "問い合わせ", id: "contact" },
            ].map((item) => (
              <li key={item.id ?? item.href}>
                <a
                  href={item.href ?? `#${item.id}`}
                  onClick={(e) => {
                    if (item.href) {
                      e.preventDefault();
                      window.location.assign(item.href);
                      return;
                    }
                    toggle();
                  }}
                  className="block text-xs md:text-sm font-noto-serif text-gray-900 hover:opacity-70"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </nav>
);

// --- Section Wrapper ---
const Section: React.FC<{
  id?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id, className = "", children }) => (
  <section
    id={id}
    className={`py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto ${className}`}
  >
    {children}
  </section>
);

// --- Types ---
type Service = {
  id: string;
  no: "01" | "02" | "03";
  title: React.ReactNode; // 画面表示（改行OK）
  titleText: string; // img alt 用（文字列）
  image: string;

  summary: string; // カード短文
  body: string; // アコーディオン長文

  bulletsTitle?: string;
  bullets?: React.ReactNode[];

  noteTitle?: string;
  note?: string;

  // ★追加：ご利用にあたってのご案内
  disclaimerTitle?: string;
  disclaimer?: string[];
};

// --- App ---
const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // アコーディオン：開いているサービス番号
  const [openService, setOpenService] = useState<Service["no"] | null>(null);

  // サービス定義
  const services: Service[] = useMemo(
    () => [
      {
        id: "service1",
        no: "01",

        titleText: "オンライン学習塾の運営（FX専門教育）",
        title: (
          <span className="block text-center leading-snug">
            オンライン学習塾の運営
            <br />
            <span className="text-sm opacity-80">（FX専門教育）</span>
          </span>
        ),

        image: "/services1.jpg",

        summary:
          "会員専用サイト内で、動画・テキストなどの学習コンテンツを一括で管理。",

        body: `学んで終わりではなく、一人一人の理解度に寄り添ったサポートを行い、ご自身で判断できる力を育てます。

初心者の方から、既にトレード経験のある方まで、段階的に学べるカリキュラム設計により、無理なくスキルを定着させていきます。`,

        bulletsTitle: "提供内容",
        bullets: [
          // ここは「スマホだけ改行」処理を後段の描画でやってるので文字列でOK
          "会員専用サイトでの学習コンテンツ配信（動画・テキスト）",
          "段階的に学べるカリキュラム設計",
          "投資判断に関する質問対応・サポート",
        ],

        noteTitle: "運営事業",
        note: "FX専門オンライン学習塾",

        disclaimerTitle: "ご利用にあたってのご案内",
        disclaimer: [
          "本サービスは、特定の利益や成果を保証するものではありません。",
          "相場分析・リスク管理・投資判断に必要な知識と考え方を、段階的に学ぶことを目的とした教育サービスです。",
          "投資助言や投資判断の代行を行うものではありません。",
        ],
      },

      {
  id: "service2",
  no: "02",

  titleText: "「なりたい」を、仕事に。",
  title: (
    <span className="block text-center leading-snug">
      「なりたい」を、仕事に。
    </span>
  ),

  image: "/services2.jpg",

  summary: `やりたいことはある。
でも、どう始めればいいか分からない。`,

  body: `Momentoryは、あなたの想いを整理し、仕事や収入に繋がる形へ整えていきます。

難しい理論や専門用語は使いません。
今のあなたに必要な「次の一歩」が分かる状態を、一緒につくっていきます。`,

  bulletsTitle: "支援内容",
  bullets: [
    "あなたの「やりたいこと」の言語化",
    "SNSや発信の方向性設計",
    "仕事・サービスの形づくり",
    "無理なく続けられる仕組みづくり",
  ],
},


      {
  id: "service3",
  no: "03",

  titleText: "自分の経験を、価値あるカタチへ",
  title: (
    <span className="block text-center leading-snug">
      自分の経験を、価値あるカタチへ
    </span>
  ),

  image: "/services3.jpg",

  summary: `あなたの経験は、
誰かの未来を変える力を持っています。`,

  body: `Momentoryでは、あなたの知識や経験を丁寧に整理し、必要としている人に届く形へ整えていきます。

文章・動画・音声など、あなたに合った方法で表現し、価値を届けるところまで伴走します。`,

  bulletsTitle: "提供内容",
  bullets: [
    "あなたの経験や学びを整理し、形にするサポート",
    "必要としている人に届く流れの設計",
    "継続的に価値を届けられる仕組みづくり",
  ],
},

    ],
    []
  );

  // Handle Loading Animation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      <Navigation
        isOpen={menuOpen}
        toggle={() => setMenuOpen(!menuOpen)}
        isScrolled={scrolled}
      />

      {/* Hero Section */}
      <header className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <FadeIn delay={200}>
          <MetallicLogo size="xl" />
        </FadeIn>

        <FadeIn
          delay={1000}
          className="absolute bottom-12 md:bottom-32 text-center px-4"
        >
          <h2 className="font-noto-serif leading-relaxed text-center">
            {/* スマホ */}
            <span className="md:hidden block space-y-5 text-sm">
              <span className="block font-medium text-gray-800">「変わりたい」</span>
              <span className="block text-gray-700">そう感じた、その瞬間から。</span>
              <span className="block font-medium text-gray-800">
                小さな決断を、<br />
                未来の自信に。
              </span>
              <span className="block text-gray-800 pt-1">
                私たちは、あなたと共に
                <br />
                <span className="font-medium">「なりたい」</span>を叶えます。
              </span>
            </span>

            {/* PC */}
            <span className="hidden md:inline text-base text-gray-600 tracking-[0.2em]">
              「変わりたい」そう感じた、その瞬間から。
              <br />
              小さな決断を、未来の自信に。
              <br />
              私たちは、あなたと共に「なりたい」を叶えます。
            </span>
          </h2>

          <p className="mt-4 font-cinzel text-xs text-gray-400 tracking-widest">
            From a single decision to your future.
          </p>
        </FadeIn>

        <div className="absolute bottom-8 animate-bounce opacity-30">
          <ArrowDown size={20} />
        </div>
      </header>

      {/* Philosophy / Concept Section */}
      <Section id="philosophy" className="relative">
        {/* 上の縦線 */}
        <div className="absolute left-1/2 top-0 h-[55%] w-px bg-gray-200 z-0 hidden md:block"></div>
        <div className="absolute left-1/2 bottom-0 h-[35%] w-px bg-gray-200 z-0 hidden md:block"></div>

        {/* 2カラム */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-12">
          {/* 左：01 Moment */}
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
                <span className="md:hidden">
                  あなたの人生が動き出す、
                  <br />
                  その瞬間。
                  <br />
                  「変わりたい」と心が動いた、あの一瞬。
                </span>
                <span className="hidden md:inline">
                  あなたの人生が動き出す、
                  <br />
                  その瞬間。
                  <br />
                  「変わりたい」と心が動いた、あの一瞬。
                </span>
              </p>
            </FadeIn>
          </div>

          {/* 右：02 Entry */}
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
                <span className="md:hidden">
                  その想いを、
                  <br />
                  行動に変える入口。
                  <br />
                  新しい自分へ踏み出すための、
                  <br />
                  最初の一歩。
                </span>
                <span className="hidden md:inline">
                  その想いを、
                  <br />
                  行動に変える入口。
                  <br />
                  新しい自分へ踏み出すための、
                  <br />
                  最初の一歩。
                </span>
              </p>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* ★中央CTAボタン */}
      <div className="mt-16 mb-24 flex justify-center relative z-10">
        <a
          href="/company02.html"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-block w-72 text-center py-6"
        >
          <span className="absolute top-0 left-0 w-full h-px bg-gray-300 group-hover:bg-gray-800 transition-colors duration-500" />
          <span className="absolute bottom-0 left-0 w-full h-px bg-gray-300 group-hover:bg-gray-800 transition-colors duration-500" />

          <span className="relative flex items-center justify-center gap-4 text-gray-700 tracking-[0.2em] text-sm md:text-base group-hover:text-black transition-colors duration-500">
            会社詳細を見る
            <span className="transform group-hover:translate-x-2 transition-transform duration-300">
              →
            </span>
          </span>
        </a>
      </div>

      {/* Catchphrase / Divider */}
      <section className="py-32 bg-gray-50/50 border-t border-b border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <FadeIn>
            <p className="font-cinzel text-3xl md:text-5xl text-metallic leading-tight mb-12">
              "Turning moments of decision <br /> into lasting market value."
            </p>

            <div className="space-y-6 text-gray-800">
              <p className="font-noto-serif text-lg md:text-2xl font-medium leading-relaxed">
                若者の「なりたい」という決断を、
                <br className="md:hidden" />
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
          <span className="font-cinzel text-gray-400 tracking-[0.3em] mb-2">
            OUR EXPERTISE
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-800">
            Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const isOpen = openService === service.no;

            return (
              <FadeIn
                key={service.id}
                delay={idx * 100}
                className="group border border-gray-100 hover:border-gray-300 transition-colors duration-500 bg-white/40 hover:bg-white/80 backdrop-blur-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenService(isOpen ? null : service.no)}
                  className="w-full text-left"
                  aria-expanded={isOpen}
                  aria-controls={`${service.id}-detail`}
                >
                  {/* image */}
                  <div className="relative h-44 md:h-48 w-full">
                    <img
                      src={service.image}
                      alt={service.titleText}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* text */}
                  <div className="p-8 text-center">
                    <div className="font-cinzel text-2xl md:text-3xl text-gray-300 mb-2">
                      {service.no}
                    </div>

                    <h3 className="text-lg md:text-xl font-serif font-medium mb-3 text-gray-900">
                      {service.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                      {service.summary}
                    </p>

                    <div className="mt-6 flex items-center justify-center gap-2 text-xs tracking-[0.25em] uppercase text-gray-400">
                      <span>{isOpen ? "Close" : "Details"}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* accordion body */}
                {isOpen && (
                  <div
                    id={`${service.id}-detail`}
                    className="px-8 pb-10 -mt-2 text-sm text-gray-700 leading-relaxed space-y-6"
                  >
                    <p className="whitespace-pre-line">{service.body}</p>

                    {/* bullets */}
                    {service.bulletsTitle && service.bullets?.length ? (
                      <div>
                        <div className="font-semibold text-gray-800 tracking-widest text-xs mb-3 text-center">
                          {service.bulletsTitle}
                        </div>

                        <ul className="list-disc pl-5 space-y-2 text-gray-700 text-left">
                          {service.bullets.map((item, bIdx) => (
                            <li key={bIdx}>
                              {/* service1の1個目だけスマホで改行表示したい場合 */}
                              {service.id === "service1" && bIdx === 0 ? (
                                <>
                                  <span className="hidden md:inline">{item}</span>
                                  <span className="md:hidden">
                                    会員専用サイトでの学習コンテンツ配信
                                    <br />
                                    （動画・テキスト）
                                  </span>
                                </>
                              ) : (
                                item
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {/* note */}
                    {service.noteTitle && service.note ? (
                      <div className="pt-4 border-t border-gray-200">
                        <div className="font-semibold text-gray-800 tracking-widest text-xs mb-2 text-center">
                          {service.noteTitle}
                        </div>
                        <p className="text-gray-600 text-center">{service.note}</p>
                      </div>
                    ) : null}

                    {/* ★disclaimer（ここが今回の追加） */}
                    {service.disclaimerTitle && service.disclaimer?.length ? (
                      <div className="pt-8 border-t border-gray-200">
                        <div className="font-semibold text-gray-800 tracking-widest text-xs mb-3 text-center">
                          {service.disclaimerTitle}
                        </div>

                        <ul className="list-disc pl-5 space-y-2 text-gray-700 text-left">
                          {service.disclaimer.map((text, dIdx) => (
                            <li key={dIdx}>{text}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className="pt-4">
                      <div className="mx-auto w-8 h-px bg-gray-300 group-hover:w-full transition-all duration-500"></div>
                    </div>
                  </div>
                )}
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="mb-20">
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white p-12 md:p-24 overflow-hidden rounded-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
              <h2 className="font-cinzel text-3xl md:text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">
                Start Your Moment
              </h2>
              <p className="text-gray-400 font-lato tracking-wide">未来の確かな舞台へ。</p>
            </div>

            <a
              href="https://lin.ee/Lvs2HPsE"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 border border-gray-600 hover:border-white transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 font-lato tracking-[0.2em] text-sm group-hover:text-black transition-colors duration-300">
                CONTACT US
              </span>
              <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
            </a>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default App;
