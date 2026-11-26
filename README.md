# Sstudiio Loar

Landing page do Sstudiio Loar, salão de beleza no Km 18, em Osasco/SP.
React 19, Tailwind CSS 4, Motion (animações) e Vite.
Fontes: Montserrat nos títulos; Roboto, Roboto Condensed e Roboto Serif no restante.

## Ver no computador

    npm install
    npm run dev

## Onde editar

- `src/dados.js`: telefone, e-mail, serviços, tons, fotos e avaliações
- `src/components/`: uma seção por arquivo
- `src/index.css`: cores, fontes e animações
- `public/assets/img/`: fotos (ao trocar uma, atualize `src/medidas.json`)

## Publicar na Vercel

Importe o repositório em https://vercel.com/new, com Root Directory na raiz. O `vercel.json` já define Vite, o comando de build e a pasta `dist`.

Depois do primeiro deploy, troque `og:image` em `index.html` pela URL completa (`https://SEU-DOMINIO/assets/img/og.jpg`), para a prévia do link funcionar no WhatsApp.

## Pendências para confirmar com o salão

- [ ] (11) 94786-1455 atende no WhatsApp
- [ ] Grafia do e-mail `SStuddios_@gmail.com`
- [ ] Lista de serviços e textos do site (serviços montados a partir das fotos e avaliações)
- [ ] Horários de funcionamento
- [ ] CEP (o da ficha do Google, 02675-031, parece não ser de Osasco; por isso não está no site)
- [ ] Autorização das clientes para uso das fotos
- [ ] Nota e quantidade de avaliações (5,0 e 69, fixas no HTML)
