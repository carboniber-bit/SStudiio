import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { NAV, zap } from '../dados.js';
import { Botao } from './ui.jsx';

export default function Topo() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const botao = useRef(null);
  const { scrollY, scrollYProgress } = useScroll();
  const progresso = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });
  useMotionValueEvent(scrollY, 'change', (y) => setRolou(y > 20));

  useEffect(() => {
    if (!aberto) return;
    const tecla = (e) => {
      if (e.key !== 'Escape') return;
      setAberto(false);
      botao.current.focus();
    };
    document.addEventListener('keydown', tecla);
    return () => document.removeEventListener('keydown', tecla);
  }, [aberto]);

  return (
    <header className={`sticky top-0 z-30 border-b backdrop-blur-md transition-colors ${rolou ? 'border-white/10 bg-noite/85' : 'border-transparent bg-noite'}`}>
      <div className={`wrap flex items-center gap-5 transition-[height] duration-300 ${rolou ? 'h-16' : 'h-19'}`}>
        <a href="#inicio" aria-label="Sstudiio Loar, voltar ao início" className="flex min-h-11 items-end gap-2.5 py-2.5">
          <img src="/assets/img/logo.png" alt="" className="w-20" />
          <span className="font-titulo text-sm leading-3 font-light text-nevoa">Sstudiio</span>
        </a>
        <nav aria-label="Principal" className="ml-auto hidden gap-7 font-cond text-[1.05rem] lg:flex">
          {NAV.map((l) => (
            <a key={l.href} href={l.href} className="relative py-2.5 transition-colors after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-ouro after:transition-transform hover:text-ouro hover:after:scale-x-100">
              {l.texto}
            </a>
          ))}
        </nav>
        <Botao href={zap()} className="ml-auto min-h-11! px-5! py-2! text-sm max-sm:hidden! lg:ml-0">Agendar horário</Botao>
        <button ref={botao} type="button" aria-expanded={aberto} aria-controls="menu-movel" onClick={() => setAberto(!aberto)} className="min-h-11 rounded-full border border-white/25 px-4 max-sm:ml-auto lg:hidden">
          {aberto ? 'Fechar' : 'Menu'}
        </button>
      </div>

      <AnimatePresence>
        {aberto && (
          <motion.nav
            id="menu-movel"
            aria-label="Menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute inset-x-0 top-full overflow-hidden border-b border-white/15 bg-noite lg:hidden"
          >
            <div className="wrap flex flex-col py-3">
              {NAV.map((l, i) => (
                <motion.a key={l.href} href={l.href} onClick={() => setAberto(false)} initial={{ x: -24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.06 * i }} className="py-3 font-titulo text-xl font-light">
                  {l.texto}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <motion.div aria-hidden="true" style={{ scaleX: progresso }} className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-ouro" />
    </header>
  );
}
