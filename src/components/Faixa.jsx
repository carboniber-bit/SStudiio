import { useState } from 'react';
import { SERVICOS } from '../dados.js';

/** Faixa em movimento com os serviços. Pode ser pausada. */
export default function Faixa() {
  const [pausada, setPausada] = useState(false);
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
    <div className="relative flex items-center bg-ouro text-noite">
      <div className="min-w-0 flex-1 overflow-hidden py-4">
        <div className="flex w-max animate-faixa" style={{ animationPlayState: pausada ? 'paused' : 'running' }}>
          {grupo(false)}
          {grupo(true)}
        </div>
      </div>
      <button type="button" onClick={() => setPausada(!pausada)} className="min-h-11 shrink-0 self-stretch bg-noite px-4 font-cond text-sm text-marfim motion-reduce:hidden">
        {pausada ? 'Continuar' : 'Pausar'}
      </button>
    </div>
  );
}
