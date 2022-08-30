const convertSize = (sizeInBites) => (sizeInBites / 1024).toFixed(2);

const convertDate = (time) => {
  const date = new Date(time);
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return date.toLocaleString('ru', options);
};

export default function contentGenerator(image, category, filesize, timestamp) {
  const ulEl = document.createElement('ul');
  const liCatEl = document.createElement('li');
  const liSizeEl = document.createElement('li');
  const liDateEl = document.createElement('li');

  liCatEl.innerHTML = `<b>category:</b> ${category}`;
  liSizeEl.innerHTML = `<b>filesize:</b> ${convertSize(filesize)} KB`;
  liDateEl.innerHTML = `<b>created:</b> ${convertDate(timestamp)}`;

  ulEl.append(liCatEl);
  ulEl.append(liSizeEl);
  ulEl.append(liDateEl);
  return ulEl;
}
