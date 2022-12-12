export const onSelectWagon = (numero, liste, setList, ctrl) => {
  const index = liste.findIndex((a) => a.numero === numero);
  liste[index].selected = true;

  if (ctrl) {
    const firstOne = liste.findIndex((a) => a.selected === true);
    for (let i = firstOne; i < index; i++) {
      liste[i].selected = true;
    }
  }

  setList([...liste]);
};

export const onSelectAll = (liste, setList) => {
  liste.forEach((element) => {
    element.selected = true;
  });
  setList([...liste]);
};

export const onUnselectAll = (liste, setList) => {
  liste.forEach((element) => {
    element.selected = false;
  });
  setList([...liste]);
};

export const onUnselectWagon = (numero, liste, setList) => {
  const index = liste.findIndex((a) => a.numero === numero);
  liste[index].selected = false;
  setList([...liste]);
};
