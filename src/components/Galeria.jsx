import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FILTROS, FOTOS, foto } from '../dados.js';
import { Titulo } from './ui.jsx';

const colunasAtuais = () => (window.innerWidth >= 1024 ? 4 : window.innerWidth >= 700 ? 3 : 2);

export default function Galeria() {
  const [filtro, setFiltro] = useState('todos');
  const [zoom, setZoom] = useState(null);
  const [colunas, setColunas] = useState(colunasAtuais);
  const dialogo = useRef(null);
  const lista = FOTOS.filter((f) => filtro === 'todos' || f.cat === filtro);
  const atual = zoom === null ? null : lista[zoom];

  useEffect(() => {
    const ajustar = () => setColunas(colunasAtuais());
    window.addEventListener('resize', ajustar);
    return () => window.removeEventListener('resize', ajustar);
  }, []);

  useEffect(() => {
    if (zoom !== null && !dialogo.current.open) dialogo.current.showModal();
  }, [zoom]);

  const passo = (d) => setZoom((z) => (z + d + lista.length) % lista.length);

  // mosaico: cada foto vai para a coluna mais baixa
  const pilhas = Array.from({ length: Math.min(colunas, lista.length) }, () => ({ altura: 0, itens: [] }));
  lista.forEach((f, i) => {
    const menor = pilhas.reduce((a, b) => (b.altura < a.altura ? b : a));
    const { width, height } = foto(f.img);
    menor.altura += height / width;
    menor.itens.push({ ...f, i });
  });

  return (
    <section id="galeria" className="py-20 md:py-28">
      <div className="wrap">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <Titulo>Resultados reais</Titulo>
          <p className="text-nevoa">Toque em uma foto para ampliar.</p>
        </div>
        <div role="group" aria-label="Filtrar fotos" className="mb-8 flex flex-wrap gap-2.5 font-cond">
          {FILTROS.map(([id, texto]) => (
            <button key={id} type="button" data-filtro={id} aria-pressed={filtro === id} onClick={() => setFiltro(id)} className={`relative min-h-11 rounded-full border px-5 transition-colors ${filtro === id ? 'border-ouro font-semibold text-noite' : 'border-white/25 hover:border-ouro'}`}>
              {filtro === id && <motion.span layoutId="pilula" className="absolute inset-0 rounded-full bg-ouro" transition={{ type: 'spring', stiffness: 350, damping: 32 }} />}
              <span className="relative">{texto}</span>
            </button>
          ))}
        </div>

        <div key={`${filtro}-${colunas}`} className="flex items-start justify-center gap-2 sm:gap-3.5">
          {pilhas.map((p, c) => (
            <ul key={c} className={`flex min-w-0 flex-1 flex-col gap-2 sm:gap-3.5 ${lista.length < colunas ? 'max-w-80' : ''}`}>
              {p.itens.map((f) => (
                <motion.li key={f.img} initial={{ opacity: 0, y: 40, scale: 0.94 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, delay: c * 0.09 }}>
                  <button type="button" onClick={() => setZoom(f.i)} className="foto group relative block w-full overflow-hidden rounded-lg bg-folha text-left">
                    <img {...foto(f.img)} alt={f.alt} loading="lazy" className="h-auto w-full transition-transform duration-700 group-hover:scale-108" />
                    <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 to-transparent px-2 pt-9 pb-2 font-cond text-xs text-white sm:px-3.5 sm:pb-3 sm:text-base">{f.legenda}</span>
                    <span aria-hidden="true" className="pointer-events-none absolute inset-2 rounded-md border border-ouro opacity-0 transition-all duration-300 group-hover:inset-3 group-hover:opacity-100" />
                  </button>
                </motion.li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogo}
        aria-label="Foto ampliada"
        onClose={() => setZoom(null)}
        onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
        onKeyDown={(e) => { if (e.key === 'ArrowRight') passo(1); if (e.key === 'ArrowLeft') passo(-1); }}
        className="m-auto w-[min(94vw,640px)] rounded-xl border border-white/15 bg-noite p-3.5 text-center text-marfim backdrop:bg-black/90"
      >
        {atual && (
          <>
            <button type="button" onClick={() => dialogo.current.close()} className="ml-auto block min-h-11 rounded-full border border-white/30 px-4">Fechar</button>
            <div className="my-3 grid h-[62vh] place-items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img key={atual.img} src={foto(atual.img).src} alt={atual.alt} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }} className="max-h-[62vh] max-w-full object-contain" />
              </AnimatePresence>
            </div>
            <div className="flex items-center justify-between gap-2 text-sm">
              <button type="button" onClick={() => passo(-1)} className="min-h-11 rounded-full border border-white/30 px-4">Anterior</button>
              <p id="legenda-zoom" aria-live="polite" className="font-serifa italic">{atual.legenda}</p>
              <button type="button" onClick={() => passo(1)} className="min-h-11 rounded-full border border-white/30 px-4">Próxima</button>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
