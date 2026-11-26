import { LINKS, zap } from '../dados.js';
import { Botao, Surge, Titulo, externo } from './ui.jsx';

export default function Local() {
  const contatos = [
    ['WhatsApp', '(11) 94786-1455', zap()],
    ['E-mail', LINKS.email, `mailto:${LINKS.email}`],
    ['Instagram', '@_sstudiio_', LINKS.instagram],
  ];
  return (
    <section id="localizacao" className="clara bg-marfim py-20 text-tinta md:py-28">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Titulo>Onde estamos</Titulo>
          <address className="mt-6 text-xl not-italic">R. Profª José Azevedo Minhoto, 197<br />Km 18, Osasco, SP</address>
          <dl className="mt-6 grid grid-cols-[auto_1fr] items-center gap-x-6">
            {contatos.map(([rotulo, texto, href]) => (
              <div key={rotulo} className="contents">
                <dt className="text-musgo">{rotulo}</dt>
                <dd className="min-w-0 break-words"><a href={href} {...(href.startsWith('http') ? externo : {})} className="inline-block py-2.5 underline underline-offset-4">{texto}</a></dd>
              </div>
            ))}
            <dt className="text-musgo">Horários</dt>
            <dd className="py-2.5">Consulte pelo WhatsApp</dd>
          </dl>
          <Botao href={LINKS.rota} cor="escuro" className="mt-6">Como chegar</Botao>
        </div>
        <Surge de={{ scale: 0.92 }}>
          <iframe title="Mapa com o endereço do Sstudiio Loar" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={LINKS.mapa} className="h-110 w-full rounded-lg bg-[#dde0d5]" />
        </Surge>
      </div>
    </section>
  );
}
