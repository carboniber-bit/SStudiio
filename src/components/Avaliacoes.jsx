import { AVALIACOES, LINKS, NOTA } from '../dados.js';
import { Contador, Surge, Titulo, externo } from './ui.jsx';

export default function Avaliacoes() {
  return (
    <section id="avaliacoes" className="clara bg-marfim py-20 text-tinta md:py-28">
      <div className="wrap">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <Titulo>O que dizem as clientes</Titulo>
          <p className="text-musgo">
            <b className="mr-2 font-titulo text-5xl font-extralight text-tinta"><Contador valor={NOTA.media} casas={1} /></b>
            de média no Google, com <Contador valor={NOTA.total} /> avaliações.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {AVALIACOES.map((a, i) => (
            <Surge como="figure" key={a.autora} atraso={i * 0.14} className="flex flex-col justify-between gap-5 rounded-lg border-t-4 border-ouro bg-white p-6 transition-shadow duration-300 hover:shadow-xl">
              <blockquote className="font-serifa text-lg leading-relaxed font-light">“{a.texto}”</blockquote>
              <figcaption className="font-cond text-musgo"><b>{a.autora}</b> no Google</figcaption>
            </Surge>
          ))}
        </div>
        <a href={LINKS.busca} {...externo} className="mt-8 inline-flex min-h-11 items-center underline decoration-ouro decoration-2 underline-offset-6">Ler as avaliações no Google</a>
      </div>
    </section>
  );
}
