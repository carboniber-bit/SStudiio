# Sstudiio Loar

Landing page do Sstudiio Loar, salão de beleza no Km 18, em Osasco/SP.
HTML, CSS e JavaScript puros, sem build.

## Ver no computador

    python -m http.server 4173 --directory web

## Publicar na Vercel

Importe o repositório em https://vercel.com/new, com Framework Preset `Other`, Root Directory na raiz e sem Build Command. O `vercel.json` já aponta para `web/`.

Depois do primeiro deploy, troque `og:image` em `web/index.html` pela URL completa (`https://SEU-DOMINIO/assets/img/og.jpg`), para a prévia do link funcionar no WhatsApp.

## Pendências para confirmar com o salão

- [ ] (11) 94786-1455 atende no WhatsApp
- [ ] Grafia do e-mail `SStuddios_@gmail.com`
- [ ] Lista de serviços e textos do site (serviços montados a partir das fotos e avaliações)
- [ ] Horários de funcionamento
- [ ] CEP (o da ficha do Google, 02675-031, parece não ser de Osasco; por isso não está no site)
- [ ] Autorização das clientes para uso das fotos
- [ ] Nota e quantidade de avaliações (5,0 e 69, fixas no HTML)
