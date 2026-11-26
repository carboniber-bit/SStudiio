import { SERVICOS } from '../dados.js';

/** Faixa em movimento com os serviços. Para quando o mouse está em cima. */
export default function Faixa() {
  const grupo = (copia) => (
    <ul aria-hidden={copia || undefined} className="flex shrink-0 items-center">
      {[...SERVICOS, ...SERVICOS].map((s, i) => (
        <li key={i} aria-hidden={i >= SERVICOS.length || undefined} className="flex items-center gap-8 pr-8 font-titulo text-xl font-medium whitespace-nowrap">
          {s.nome}
          <span aria-hidden="true" className="size-3 rounded-full bg-noite" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden bg-ouro py-4 text-noite">
      <div className="flex w-max animate-faixa hover:[animation-play-state:paused]">
        {grupo(false)}
        {grupo(true)}
      </div>
    </div>
  );
}
