export default function sortByField(field) {
  return (a, b) => (a[field] > b[field] ? 1 : -1);
}
