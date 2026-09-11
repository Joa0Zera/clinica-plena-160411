// Clínica Plena — interações da landing page

let configData = {};

fetch('./assets/config.json')
  .then((res) => res.json())
  .then((data) => { configData = data; })
  .catch((err) => console.log('Config não carregado:', err));

// ---------- Menu mobile ----------
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu-principal');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('aberto');
    menu.classList.toggle('aberto');
  });
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('aberto');
      menu.classList.remove('aberto');
    });
  });
}

// ---------- Scroll reveal ----------
const elementosReveal = document.querySelectorAll('.reveal, .reveal-esq, .reveal-dir');
const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('ativo');
        observador.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.15 }
);
elementosReveal.forEach((el) => observador.observe(el));

// ---------- Contador animado (números reais do briefing) ----------
function animarContador(elemento) {
  const alvo = parseFloat(elemento.dataset.contador);
  const sufixo = elemento.dataset.sufixo || '';
  const casasDecimais = elemento.dataset.contador.includes('.') ? 1 : 0;
  let atual = 0;
  const incremento = alvo / 60;

  function passo() {
    atual += incremento;
    if (atual >= alvo) {
      elemento.textContent = alvo.toLocaleString('pt-BR', { minimumFractionDigits: casasDecimais, maximumFractionDigits: casasDecimais }) + sufixo;
      return;
    }
    elemento.textContent = atual.toLocaleString('pt-BR', { minimumFractionDigits: casasDecimais, maximumFractionDigits: casasDecimais }) + sufixo;
    requestAnimationFrame(passo);
  }
  passo();
}

const contadores = document.querySelectorAll('[data-contador]');
const observadorContador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        animarContador(entrada.target);
        observadorContador.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.5 }
);
contadores.forEach((el) => observadorContador.observe(el));

// ---------- Header com sombra ao rolar ----------
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) header.classList.add('rolado');
  else header.classList.remove('rolado');
});

// ---------- Parallax leve no Hero ----------
const heroBg = document.querySelector('.hero-bg img');
window.addEventListener('scroll', () => {
  if (!heroBg) return;
  const deslocamento = window.scrollY * 0.25;
  heroBg.style.transform = `translateY(${deslocamento}px) scale(1.08)`;
});

// ---------- Ripple ao clicar nos botões ----------
document.querySelectorAll('.btn').forEach((botao) => {
  botao.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const tamanho = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      width:${tamanho}px; height:${tamanho}px;
      left:${e.clientX - rect.left - tamanho / 2}px; top:${e.clientY - rect.top - tamanho / 2}px;
      background:rgba(255,255,255,0.5); transform:scale(0); opacity:1;
      animation: efeitoRipple 0.6s ease-out;`;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

const estiloRipple = document.createElement('style');
estiloRipple.textContent = `@keyframes efeitoRipple { to { transform: scale(2.4); opacity: 0; } }`;
document.head.appendChild(estiloRipple);

// ---------- Editor de conteúdo (config.json) ----------
function abrirEditorModal() {
  document.getElementById('editor-modal').style.display = 'flex';
  document.getElementById('edit-titulo').value = configData.pagina?.titulo || '';
  document.getElementById('edit-subtitulo').value = configData.pagina?.subtitulo || '';
  document.getElementById('edit-telefone').value = configData.empresa?.telefone || '';
  document.getElementById('edit-endereco').value = configData.empresa?.endereco || '';
  document.getElementById('edit-instagram').value = configData.empresa?.instagram || '';
}

function fecharEditorModal() {
  document.getElementById('editor-modal').style.display = 'none';
}

function salvarEdicoes() {
  configData.pagina.titulo = document.getElementById('edit-titulo').value;
  configData.pagina.subtitulo = document.getElementById('edit-subtitulo').value;
  configData.empresa.telefone = document.getElementById('edit-telefone').value;
  configData.empresa.endereco = document.getElementById('edit-endereco').value;
  configData.empresa.instagram = document.getElementById('edit-instagram').value;

  atualizarPagina();
  salvarJSON();
  fecharEditorModal();
  alert('Alterações salvas! Download do arquivo JSON iniciado.');
}

function valorAninhado(obj, caminho) {
  return caminho.split('.').reduce((acc, chave) => (acc && acc[chave] !== undefined ? acc[chave] : undefined), obj);
}

function atualizarPagina() {
  document.querySelectorAll('[data-edit]').forEach((el) => {
    const valor = valorAninhado(configData, el.dataset.edit);
    if (valor !== undefined) el.textContent = valor;
  });
}

function salvarJSON() {
  const dataStr = JSON.stringify(configData, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'config-edicoes.json';
  link.click();
}

// ---------- Ano no footer ----------
const anoEl = document.getElementById('ano-atual');
if (anoEl) anoEl.textContent = new Date().getFullYear();
