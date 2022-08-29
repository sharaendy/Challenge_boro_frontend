export default function treeModernisation() {
  const treelineEl = document.querySelector('.treeline');
  for (const li of treelineEl.querySelectorAll('.handleLi')) {
    const span = document.createElement('span');
    span.classList.add('show');
    li.prepend(span);
    span.append(span.nextSibling);
  }

  treelineEl.addEventListener('click', (e) => {
    if (e.target.tagName !== 'SPAN') {
      return null;
    }
    const childrenContainer = e.target.parentNode.querySelector('ul');
    childrenContainer.hidden = !childrenContainer.hidden;
    if (childrenContainer.hidden) {
      e.target.classList.add('hide');
      e.target.classList.remove('show');
    } else {
      e.target.classList.add('show');
      e.target.classList.remove('hide');
    }
    return null;
  });
}
