import { SERVICOS, foto, zap } from '../dados.js';
import { Surge, Titulo, externo } from './ui.jsx';

export default function Servicos() {
  // luz dourada que segue o cursor dentro do cartão
  const luz = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
  };
  return (
    <section id="servicos" className="clara bg-marfim py-20 text-tinta md:py-28">
      <div className="wrap">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <Titulo>O que fazemos</Titulo>
          <p className="max-w-[44ch] text-musgo">Valores e tempo de atendimento dependem do seu cabelo. Mande uma mensagem e tire suas dúvidas antes de marcar.</p>
        </div>
        <ul className="grid gap-x-10 lg:grid-cols-2">
          {SERVICOS.map((s, i) => (
            <Surge como="li" key={s.nome} atraso={(i % 2) * 0.12} onPointerMove={luz} className="group relative grid grid-cols-[80px_1fr] items-start gap-4 border-t border-tinta/15 px-1 py-7 sm:grid-cols-[112px_1fr] sm:items-center sm:gap-6 sm:px-3">
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(260px_circle_at_var(--x,50%)_var(--y,50%),#d8c13040,transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative block aspect-square overflow-hidden rounded-full ring-ouro ring-offset-4 ring-offset-marfim transition-shadow duration-300 group-hover:ring-2">
                <img {...foto(s.img)} alt="" loading="lazy" className="size-full object-cover object-[50%_25%] transition-transform duration-700 group-hover:scale-115" />
              </span>
              <div className="relative">
                <h3 className="text-xl font-medium sm:text-2xl">{s.nome}</h3>
                <p className="mt-1.5 text-musgo">{s.texto}</p>
                <a href={zap(`Olá! Vim pelo site e quero saber sobre ${s.assunto} no Sstudiio Loar.`)} {...externo} className="inline-block pt-3 pb-1 font-cond font-semibold underline decoration-[#a8931c] decoration-2 underline-offset-5">
                  Perguntar sobre {s.assunto}
                </a>
              </div>
            </Surge>
          ))}
        </ul>
      </div>
    </section>
  );
}
