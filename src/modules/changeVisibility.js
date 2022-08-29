export default function changeVisibility(eventId, states) {
  states.forEach((item) => {
    const uiItem = item;
    if (eventId === item.id) {
      uiItem.isVisible = false;
    }
  });
}
