# Clínica Plena — Landing Page

Landing page estática (HTML5 + CSS3 + JavaScript vanilla, sem framework e sem build) para a Clínica Plena, centro de saúde e beleza em Salvador (BA), especializada em Harmonização Corporal e Facial.

## Como executar localmente

Não é necessário Node.js, npm nem qualquer instalação. É um projeto 100% estático.

**Opção 1 — abrir direto no navegador**
Dê duplo clique em `index.html`.

**Opção 2 — servidor local (recomendado, evita bloqueios de CORS ao carregar `assets/config.json`)**

Com Python:
```bash
python -m http.server 8000
```
Depois acesse `http://localhost:8000`.

Com a extensão "Live Server" do VS Code: clique com o botão direito em `index.html` → "Open with Live Server".

## Estrutura do projeto

```
clinica-plena-20260911-155750/
├── index.html          # página única com todas as seções
├── vercel.json          # config de deploy estático (sem build)
├── assets/
│   ├── style.css        # estilos (paleta, tipografia, animações, responsivo)
│   ├── script.js        # scroll reveal, menu mobile, contador, editor de conteúdo
│   ├── config.json       # dados editáveis da página (empresa, textos, cores)
│   └── imagens/          # 9 imagens reais fornecidas no briefing
```

## Seções da página

1. Header fixo com logo, menu e CTA de WhatsApp
2. Hero (`#hero`) com foto real da recepção, CTAs e selo de avaliações do Google
3. Faixa de credibilidade
4. Serviços (`#servicos`) — 7 cards com os tratamentos reais do briefing
5. Sobre a Clínica Plena — texto oficial do Google Meu Negócio + fotos da equipe
6. Diferenciais — 5 pontos com fotos dos ambientes de atendimento
7. Depoimentos (`#depoimentos`) — 3 avaliações reais do Google
8. Galeria de Antes & Depois — 3 transformações reais assinadas pela Dra. Rafaela Turrioni
9. CTA final de agendamento
10. Contato (`#contato`) — WhatsApp, telefone, horário de funcionamento e mapa do Google Maps
11. Footer + botão flutuante de WhatsApp

## Edição de conteúdo

A página inclui um botão "✏️ Editar Página" (canto inferior direito) que abre um modal para editar título, subtítulo, telefone, endereço e Instagram. Como o site é estático (sem backend), ao salvar o navegador faz o **download** de um novo arquivo `config-edicoes.json` — ele não sobrescreve o `assets/config.json` original no servidor. Isso é o comportamento esperado.

## Deploy

O arquivo `vercel.json` já está configurado para deploy estático (sem comando de build). O deploy em si (Vercel/GitHub) é feito em uma etapa posterior, fora deste processo.
