import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { LINKS, NAV, zap } from './dados.js';
import Topo from './components/Topo.jsx';
import Hero from './components/Hero.jsx';
import Faixa from './components/Faixa.jsx';
import Servicos from './components/Servicos.jsx';
import Galeria from './components/Galeria.jsx';
import Studio from './components/Studio.jsx';
import Avaliacoes from './components/Avaliacoes.jsx';
import Agendar from './components/Agendar.jsx';
import Local from './components/Local.jsx';
import { Surge, externo } from './components/ui.jsx';

export default function App() {
  // o botão flutuante só aparece depois que o botão do topo sai da tela
  const refCta = useRef(null);
  const [flutuante, setFlutuante] = useState(false);
  useEffect(() => {
    const ver = () => {
      const botao = refCta.current?.firstElementChild;
      if (botao) setFlutuante(botao.getBoundingClientRect().bottom < 0);
    };
    ver();
    window.addEventListener('scroll', ver, { passive: true });
    return () => window.removeEventListener('scroll', ver);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#conteudo" className="fixed -top-20 left-4 z-50 bg-ouro px-4 py-3 text-noite focus:top-3">Pular para o conteúdo</a>
      <Topo />
      <main id="conteudo">
        <Hero refCta={refCta} />
        <Faixa />
        <Servicos />
        <Galeria />
        <Studio />
        <Avaliacoes />
        <Agendar />
        <Local />
      </main>
      <footer className="pt-16 pb-28 text-center text-nevoa">
        <Surge de={{ scale: 0.85 }} className="wrap">
          <img src="/assets/img/logo.png" alt="Loar" loading="lazy" className="mx-auto w-44" />
          <p className="mt-5">Sstudiio Loar, salão de beleza em Osasco</p>
          <nav aria-label="Rodapé" className="my-5 flex flex-wrap justify-center gap-x-6 font-cond">
            {NAV.map((l) => <a key={l.href} href={l.href} className="py-2.5 hover:text-ouro">{l.texto}</a>)}
            <a href={LINKS.instagram} {...externo} className="py-2.5 hover:text-ouro">Instagram</a>
          </nav>
          <p className="font-cond text-sm">© 2026 Sstudiio Loar</p>
        </Surge>
      </footer>
      <AnimatePresence>
        {flutuante && (
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40">
            <a href={zap()} {...externo} aria-label="Agendar pelo WhatsApp" className="zap flex min-h-13 animate-pulso items-center gap-2 rounded-full bg-zap px-5 font-semibold text-white">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" className="size-5.5"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2-5.2A8.5 8.5 0 1 1 21 11.5Z" /></svg>
              Agendar
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
