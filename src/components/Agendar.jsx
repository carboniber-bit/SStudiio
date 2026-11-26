import { SERVICOS, zap } from '../dados.js';
import { Botao, Surge, Titulo } from './ui.jsx';

const campo = 'min-h-13 w-full rounded-lg border border-white/35 bg-[#101210] px-4 py-2.5 transition-[border-color,box-shadow] placeholder:text-[#9aa192] focus:border-ouro focus:shadow-[0_0_0_4px_#d8c13026]';

export default function Agendar() {
  const enviar = (e) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const nome = d.get('nome').trim();
    const quando = d.get('quando').trim();
    const msg = `Olá! Meu nome é ${nome}. Quero agendar no Sstudiio Loar.\nServiço: ${d.get('servico')}${quando ? `\nPreferência: ${quando}` : ''}`;
    window.open(zap(msg), '_blank', 'noopener');
  };
  return (
    <section id="agendar" className="py-20 md:py-28">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Titulo>Monte sua mensagem</Titulo>
          <p className="mt-6 max-w-[48ch] text-nevoa">Escolha o que você quer fazer. O WhatsApp abre com o texto pronto e o horário é confirmado na conversa.</p>
        </div>
        <Surge de={{ x: 60 }}>
          <form id="form-agenda" onSubmit={enviar} className="flex flex-col">
            <label htmlFor="f-nome" className="mb-1.5 font-medium">Seu nome</label>
            <input id="f-nome" name="nome" autoComplete="given-name" required className={campo} />
            <label htmlFor="f-servico" className="mt-5 mb-1.5 font-medium">Serviço</label>
            <select id="f-servico" name="servico" className={campo}>
              {SERVICOS.map((s) => <option key={s.nome}>{s.nome}</option>)}
              <option>Ainda não sei</option>
            </select>
            <label htmlFor="f-quando" className="mt-5 mb-1.5 font-medium">Melhor dia e período <span className="font-normal text-nevoa">(opcional)</span></label>
            <input id="f-quando" name="quando" placeholder="Ex.: sábado de manhã" className={campo} />
            <Botao type="submit" className="mt-7">Continuar no WhatsApp</Botao>
          </form>
        </Surge>
      </div>
    </section>
  );
}
