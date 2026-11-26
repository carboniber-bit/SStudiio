import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { foto, zap } from '../dados.js';
import { Botao, Surge, Titulo } from './ui.jsx';

export default function Studio() {
  const ref = useRef(null);
  const reduzido = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduzido ? ['0%', '0%'] : ['-2%', '2%']);
  return (
    <section ref={ref} id="studio" className="overflow-hidden bg-folha py-20 md:py-28">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Surge de={{ x: -60 }} className="mx-auto aspect-[683/821] w-full max-w-130 overflow-hidden rounded-t-full rounded-b-lg">
          <motion.img {...foto('studio')} style={{ y, scale: 1.05 }} loading="lazy" alt="Mulher sorrindo, de cabelo loiro ondulado e camisa azul e branca" className="size-full object-cover" />
        </Surge>
        <div>
          <Titulo>Cuidado com você e com os seus fios</Titulo>
          <Surge atraso={0.15}>
            <p className="mt-6 max-w-[52ch] text-nevoa">Antes de agendar, conte o que você quer e a história do seu cabelo: química, último corte, rotina e o resultado que você espera.</p>
            <p className="mt-4 max-w-[52ch] text-nevoa">Quem avalia o studio no Google fala do ambiente acolhedor, do carinho no atendimento e do cuidado com a saúde dos fios.</p>
            <Botao href={zap()} className="mt-8">Conversar com o studio</Botao>
          </Surge>
        </div>
      </div>
    </section>
  );
}
