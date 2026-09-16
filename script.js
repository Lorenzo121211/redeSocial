// Função genérica para aplicar e remover animações CSS
function triggerAnimation(element, animationClass) {
  element.classList.add(animationClass);
  element.addEventListener('animationend', () => {
    element.classList.remove(animationClass);
  }, { once: true });
}

// 1. Curtir (Toggle de estado + incremento/decremento)
const likeBtn = document.getElementById('likeBtn');
let isLiked = false;

likeBtn.addEventListener('click', () => {
  const countSpan = likeBtn.querySelector('.count');
  let currentCount = parseInt(countSpan.textContent);

  isLiked = !isLiked;
  likeBtn.classList.toggle('liked', isLiked);
  countSpan.textContent = isLiked ? currentCount + 1 : currentCount - 1;

  triggerAnimation(likeBtn, 'animate-pop');
});

// 2. Repost (Toggle de estado + rotação)
const repostBtn = document.getElementById('repostBtn');
let isReposted = false;

repostBtn.addEventListener('click', () => {
  const countSpan = repostBtn.querySelector('.count');
  let currentCount = parseInt(countSpan.textContent);

  isReposted = !isReposted;
  repostBtn.classList.toggle('reposted', isReposted);
  countSpan.textContent = isReposted ? currentCount + 1 : currentCount - 1;

  triggerAnimation(repostBtn, 'animate-spin');
});

// 3. Salvar (Toggle de estado + animação)
const saveBtn = document.getElementById('saveBtn');
let isSaved = false;

saveBtn.addEventListener('click', () => {
  isSaved = !isSaved;
  saveBtn.classList.toggle('saved', isSaved);

  triggerAnimation(saveBtn, 'animate-pop');
});

// 4. Compartilhar (API de compartilhamento nativa ou Fallback para Copiar Link)
const shareBtn = document.getElementById('shareBtn');

shareBtn.addEventListener('click', async () => {
  triggerAnimation(shareBtn, 'animate-bounce');

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Confira este post!',
        url: window.location.href
      });
    } catch (err) {
      console.log('Compartilhamento cancelado');
    }
  } else {
    // Fallback: Copia o link para a área de transferência
    navigator.clipboard.writeText(window.location.href);
    alert('Link copiado para a área de transferência!');
  }
});