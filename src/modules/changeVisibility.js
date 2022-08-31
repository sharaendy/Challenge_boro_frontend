export default function changeVisibility(eventId, states) {
  const newState = states.map((item) => {
    const uiItem = item;
    if (eventId === item.id) {
      uiItem.isVisible = false;
    }
    return uiItem;
  });
  return newState;
}
