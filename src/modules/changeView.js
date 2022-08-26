export default function treeGenerator() {
  const ul = document.querySelectorAll('.treeline > li:not(:only-child) ul, .treeline ul ul');
  for (let i = 0; i < ul.length; i++) {
    const div = document.createElement('div');
    div.className = 'drop';
    div.innerHTML = '+';
    ul[i].parentNode.insertBefore(div, ul[i].previousSibling);
    div.onclick = function () {
      this.innerHTML = this.innerHTML === '+' ? '−' : '+';
      this.className = this.className === 'drop' ? 'drop dropM' : 'drop';
    };
  }
}

treeGenerator();
