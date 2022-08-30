const convertSize = (sizeInBites) => (sizeInBites / 1024).toFixed(2);

const convertDate = (time) => {
  const date = new Date(time);
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    // hour: 'numeric',
    // minute: 'numeric',
  };
  return date.toLocaleString('ru', options);
};

export default function treeInfoGenerator(filesize, timestamp) {
  const ulEl = document.createElement('ul');
  const liSizeEl = document.createElement('li');
  const liDateEl = document.createElement('li');

  liSizeEl.innerHTML = `<b>filesize:</b> ${convertSize(filesize)} KB`;
  liDateEl.innerHTML = `<b>created:</b> ${convertDate(timestamp)}`;

  ulEl.append(liSizeEl);
  ulEl.append(liDateEl);
  return ulEl;
}
