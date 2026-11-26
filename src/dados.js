// Todo o conteúdo editável do site está neste arquivo.
import medidas from './medidas.json';

const TELEFONE = '5511947861455';
export const zap = (msg = 'Olá! Vim pelo site do Sstudiio Loar e gostaria de agendar um horário.') =>
  `https://wa.me/${TELEFONE}?text=${encodeURIComponent(msg)}`;

const destino = encodeURIComponent('Sstudiio Loar, R. Profª José Azevedo Minhoto, 197, Osasco - SP');
export const LINKS = {
  rota: `https://www.google.com/maps/dir/?api=1&destination=${destino}`,
  busca: `https://www.google.com/maps/search/?api=1&query=${destino}`,
  mapa: `https://www.google.com/maps?q=${destino}&output=embed`,
  instagram: 'https://www.instagram.com/_sstudiio_/',
  email: 'SStuddios_@gmail.com',
};
export const NOTA = { media: 5, total: 69 };

export const foto = (nome) => {
  const [width, height] = medidas[nome];
  return { src: `/assets/img/${nome}.webp`, width, height };
};

export const TONS = [
  { id: "perola", nome: "Loiro pérola", img: "loiro-perola", cor: "#d9cbb0", alt: "Cabelo loiro pérola liso, na altura dos ombros" },
  { id: "mel", nome: "Mel", img: "mel-ondas", cor: "#b8863f", alt: "Cabelo longo com mechas cor de mel e ondas" },
  { id: "ruivo", nome: "Ruivo", img: "ruivo-camadas", cor: "#a44f1e", alt: "Cabelo ruivo longo, liso e em camadas" },
  { id: "castanho", nome: "Castanho", img: "castanho-cachos", cor: "#5b3a24", alt: "Cabelo castanho longo com ondas nas pontas" },
  { id: "escuro", nome: "Escuro", img: "ondas-escuras", cor: "#241a17", alt: "Cabelo escuro longo com ondas" },
];

export const NAV = [
  { href: "#servicos", texto: "Serviços" },
  { href: "#galeria", texto: "Resultados" },
  { href: "#studio", texto: "O studio" },
  { href: "#avaliacoes", texto: "Avaliações" },
  { href: "#localizacao", texto: "Onde estamos" },
];

export const FOTOS = [
  { img: "morena-iluminada-cachos", cat: "morenas", legenda: "Morena iluminada com cachos", alt: "Cliente sorrindo, de cabelo escuro iluminado e cacheado" },
  { img: "loiro-ondas", cat: "loiros", legenda: "Loiro em camadas com ondas", alt: "Loiro longo ondulado visto de costas" },
  { img: "ruivo-camadas", cat: "ruivos", legenda: "Ruivo em camadas", alt: "Cabelo ruivo longo em camadas" },
  { img: "loiro-liso", cat: "loiros", legenda: "Loiro liso com mechas na frente", alt: "Cliente com cabelo loiro longo e liso" },
  { img: "morena-iluminada-ondas", cat: "morenas", legenda: "Morena iluminada", alt: "Cliente sorrindo com cabelo castanho iluminado e ondulado" },
  { img: "unhas-vermelhas", cat: "unhas", legenda: "Vermelho com brilho", alt: "Unhas amendoadas em vermelho cintilante" },
  { img: "loiro-mel-curto", cat: "loiros", legenda: "Loiro mel na altura dos ombros", alt: "Corte médio loiro mel ondulado" },
  { img: "corte-franja", cat: "morenas", legenda: "Corte médio com franja", alt: "Cliente com cabelo castanho avermelhado, corte médio e franja" },
  { img: "mel-ondas", cat: "loiros", legenda: "Mechas mel com ondas", alt: "Cabelo longo com mechas mel visto de costas" },
  { img: "ondas-escuras", cat: "morenas", legenda: "Ondas no cabelo escuro", alt: "Cliente sorrindo com cabelo escuro ondulado" },
  { img: "loiro-perola", cat: "loiros", legenda: "Loiro pérola liso", alt: "Cabelo loiro pérola liso" },
  { img: "castanho-claro-ondas", cat: "morenas", legenda: "Castanho claro modelado", alt: "Cliente com cabelo castanho claro e ondas modeladas" },
  { img: "unhas-nude-brilho", cat: "unhas", legenda: "Nude rosado com brilho", alt: "Mãos com unhas amendoadas em nude rosado cintilante" },
  { img: "castanho-cachos", cat: "morenas", legenda: "Castanho com pontas iluminadas", alt: "Cliente com cabelo castanho e pontas iluminadas" },
  { img: "loiro-ondas-curto", cat: "loiros", legenda: "Loiro acinzentado ondulado", alt: "Cliente com cabelo médio loiro acinzentado e ondulado" },
];

export const FILTROS = [['todos', 'Todos'], ['loiros', 'Loiros'], ['morenas', 'Castanhos e morenas'], ['ruivos', 'Ruivos'], ['unhas', 'Unhas']];

export const SERVICOS = [
  { nome: "Mechas e loiros", texto: "Do loiro pérola ao mel. Leve uma foto de referência para conversarmos sobre o tom.", img: "loiro-ondas", assunto: "mechas e loiros" },
  { nome: "Coloração", texto: "Ruivos, castanhos e morenas iluminadas, com a cor pensada para você.", img: "ruivo-camadas", assunto: "coloração" },
  { nome: "Corte", texto: "Camadas, franja ou um corte médio: o formato é combinado antes da tesoura.", img: "corte-franja", assunto: "corte de cabelo" },
  { nome: "Escova e modelagem", texto: "Liso alinhado ou ondas, para o dia a dia ou uma ocasião especial.", img: "castanho-claro-ondas", assunto: "escova e modelagem" },
  { nome: "Tratamento capilar", texto: "Cuidado para fios finos, frágeis ou que passaram por química.", img: "castanho-cachos", assunto: "tratamento capilar" },
  { nome: "Unhas", texto: "Esmaltação e acabamentos com brilho para completar o visual.", img: "unhas-vermelhas", assunto: "unhas" },
];

export const AVALIACOES = [
  { autora: "Karina Pavan", texto: "Aqui somos bem tratadas do começo ao fim! Salão super agradável e aconchegante e o serviço excepcional! Sou cliente há quase 9 anos e não tem profissional melhor!!" },
  { autora: "Julianna Silva", texto: "Atendimento VIP, serviço nota 1.000. Profissionais excelentes, te tratam com muito carinho e dedicação!!!" },
  { autora: "Damaris Felino", texto: "A Silvia eh uma excelente profissional! Cheguei com receio, pq tinha ja um profissional que havia se mudado. Meu cabelo eh fino, frágil. Porém fui tratando com a silvia e meu cabelo foi recuperando." },
];
