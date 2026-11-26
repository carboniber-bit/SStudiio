import { useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { LINKS, NOTA, TONS, foto, zap } from '../dados.js';
import { Botao, externo } from './ui.jsx';

const PALAVRAS = 'Seu cabelo do jeito que você imaginou'.split(' ');
const entra = (delay) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.7 } });

export default function Hero({ refCta }) {
  const [tom, setTom] = useState(TONS[0]);
  const reduzido = useReducedMotion();

  // a foto inclina de leve acompanhando o mouse
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 18 });
  const mover = (e) => {
    if (reduzido || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const { scrollY } = useScroll();
  const solY = useTransform(scrollY, [0, 700], [0, reduzido ? 0 : 160]);

  return (
    <section id="inicio" className="relative isolate pt-8 pb-16 lg:py-18">
      <div aria-hidden="true" className="pointer-events-none absolute top-0 right-0 -z-10 size-[42rem] max-w-full bg-[radial-gradient(circle,#d8c13024,transparent_65%)]" />
      <div className="wrap flex flex-col lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-x-20">
        <div className="contents lg:block">
          <h1 aria-label={PALAVRAS.join(' ')} className="order-1 text-[clamp(2.5rem,6vw,4.6rem)] leading-[1.06] font-extralight tracking-tight">
            {PALAVRAS.map((p, i) => (
              <span key={i} aria-hidden="true">
                <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                  <motion.span className="inline-block" initial={{ y: '115%' }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                    {p}
                  </motion.span>
                </span>{' '}
              </span>
            ))}
          </h1>
          <motion.p {...entra(0.75)} className="order-2 mt-6 mb-8 max-w-[44ch] text-lg font-light text-nevoa lg:mb-0">
            Cor, corte, tratamento e unhas no Km 18, em Osasco. Escolha um tom e veja um trabalho feito no studio.
          </motion.p>

          <motion.div {...entra(0.9)} role="group" aria-label="Ver resultado por tom" className="order-4 mt-4 grid grid-cols-5 gap-0.5 sm:flex sm:justify-center sm:gap-2 lg:mt-8 lg:justify-start">
            {TONS.map((t) => {
              const ativo = t.id === tom.id;
              return (
                <button key={t.id} type="button" aria-pressed={ativo} onClick={() => setTom(t)} className={`group flex min-w-0 flex-col items-center gap-2.5 p-1 font-cond text-sm leading-tight sm:min-w-19 ${ativo ? 'text-marfim' : 'text-nevoa'}`}>
                  <span className="relative grid size-12 place-items-center">
                    {ativo && <motion.span layoutId="anel" className="absolute -inset-1.5 rounded-full border-2 border-ouro" transition={{ type: 'spring', stiffness: 320, damping: 28 }} />}
                    <span aria-hidden="true" style={{ background: t.cor }} className="size-full rounded-full ring-1 ring-white/25 transition-transform group-hover:scale-110" />
                  </span>
                  {t.nome}
                </button>
              );
            })}
          </motion.div>

          <motion.div {...entra(1.05)} className="order-5 mt-7 flex flex-wrap items-center gap-x-7 gap-y-2">
            <span ref={refCta} className="contents">
              <Botao id="hero-cta" href={zap(`Olá! Vi no site o tom "${tom.nome}" e quero agendar uma avaliação no Sstudiio Loar.`)} className="max-sm:w-full">Agendar pelo WhatsApp</Botao>
            </span>
            <a href="#galeria" className="inline-flex min-h-11 items-center underline decoration-ouro underline-offset-6 transition-[text-underline-offset] hover:underline-offset-10">Ver todos os resultados</a>
          </motion.div>
          <motion.p {...entra(1.2)} className="order-6 mt-4 text-nevoa">
            <a href={LINKS.busca} {...externo} className="inline-block py-2.5">
              <span aria-hidden="true" className="mr-2 tracking-widest text-ouro">★★★★★</span>
              {NOTA.media.toFixed(1).replace('.', ',')} no Google em {NOTA.total} avaliações
            </a>
          </motion.p>
        </div>

        <motion.figure
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          onPointerMove={mover}
          onPointerLeave={() => { px.set(0); py.set(0); }}
          className="relative order-3 w-[86%] max-w-90 self-center perspective-[1000px] lg:w-full lg:max-w-110 lg:justify-self-center"
        >
          {/* o disco dourado repete o "O" da logo */}
          <motion.div aria-hidden="true" style={{ y: solY }} className="absolute -top-[6%] -right-[12%] w-[62%]">
            <div className="aspect-square animate-flutua rounded-full bg-ouro shadow-[0_0_90px_#d8c13066]" />
          </motion.div>
          <motion.div style={{ rotateX, rotateY }} className="relative aspect-[4/4.8] overflow-hidden rounded-t-full rounded-b-lg bg-folha lg:aspect-[4/5.4]">
            <AnimatePresence initial={false}>
              <motion.img
                key={tom.id}
                src={foto(tom.img).src}
                alt={tom.alt}
                fetchPriority="high"
                initial={{ clipPath: 'circle(0% at 90% 8%)', scale: 1.12 }}
                animate={{ clipPath: 'circle(150% at 90% 8%)', scale: 1, zIndex: 2 }}
                exit={{ opacity: 0.99, zIndex: 1 }}
                transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
                className="absolute inset-0 size-full object-cover object-[50%_20%]"
              />
            </AnimatePresence>
          </motion.div>
          <figcaption aria-live="polite" className="mt-3 text-center font-serifa text-lg font-light italic">{tom.nome}</figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
