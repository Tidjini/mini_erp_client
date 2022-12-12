export function deleteCartItem(items, item) {
  const index = items.map((plat) => plat.id).indexOf(item.id);
  if (index != -1) {
    item = items[index];
    item.qte--;
    item.montant = item.prix * item.qte;
    if (item.qte === 0) {
      items.splice(index, 1);
    } else {
      items.splice(index, 1, item);
    }
    return [...items];
    // setItemsSelected([...items]);
  }
}

const days = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];
const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre",
];
export function getAppDate() {
  const today = new Date();
  return (
    days[today.getDay()] +
    ", " +
    today.getDate() +
    " " +
    months[today.getMonth()] +
    " " +
    today.getFullYear()
  );
}

export function editCartItem(items, item) {
  const index = items.map((plat) => plat.id).indexOf(item.id);
  if (index != -1) {
    if (item.qte === 0) {
      items.splice(index, 1);
    } else {
      items.splice(index, 1, item);
    }
    return [...items];
  }
}

export function addCartItem(items, item) {
  if (item === undefined) return items;
  const index = items.map((plat) => plat.id).indexOf(item.id);
  if (index != -1) {
    item = items[index];
    item.qte++;
    item.montant = item.prix * item.qte;
    const autres = items.filter((plat) => {
      return plat.id != item.id;
    });
    return [item, ...autres];
  } else {
    item.qte = 1;
    item.montant = item.prix * item.qte;
    return [item, ...items];
  }
}
