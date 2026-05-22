import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

const trocarNomeVisual = () => {
  const trocas = [
    ['VacinaEdu Aracaju', 'ImunizAju'],
    ['VacinaEdu', 'ImunizAju'],
    ['vacinaedu', 'imunizaju'],
  ];

  const aplicarTrocas = (valor) => {
    if (typeof valor !== 'string') return valor;
    return trocas.reduce((texto, [antigo, novo]) => texto.split(antigo).join(novo), valor);
  };

  document.title = aplicarTrocas(document.title);

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null
  );

  const textos = [];
  while (walker.nextNode()) textos.push(walker.currentNode);

  textos.forEach((node) => {
    const novoTexto = aplicarTrocas(node.nodeValue);
    if (novoTexto !== node.nodeValue) node.nodeValue = novoTexto;
  });

  document.querySelectorAll('*').forEach((el) => {
    ['title', 'aria-label', 'placeholder', 'alt'].forEach((attr) => {
      if (el.hasAttribute(attr)) {
        const valorAtual = el.getAttribute(attr);
        const novoValor = aplicarTrocas(valorAtual);
        if (novoValor !== valorAtual) el.setAttribute(attr, novoValor);
      }
    });
  });
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

setTimeout(trocarNomeVisual, 0);

new MutationObserver(() => trocarNomeVisual()).observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true,
  attributes: true,
});
