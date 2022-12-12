export function containsObject(obj, list, key) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (
      obj["id"] !== undefined &&
      obj["id"] !== "" &&
      obj["id"] !== null &&
      obj["id"] === list[i]["id"]
    ) {
      return [true, i];
    }
  }

  for (i = 0; i < list.length; i++) {
    if (list[i][key] === obj[key]) {
      return [true, i];
    }
  }

  return [false, -1];
}

export function onAddOrModifyArticle(state, action) {
  let articles = state.demande.articles;
  const containes = containsObject(action.payload, articles, "article");

  if (containes[0] == true) {
    articles[containes[1]] = action.payload;
  } else {
    articles = [action.payload, ...state.demande.articles];
  }

  let total = 0.0;
  let total_tva = 0.0;
  let total_ttc = 0.0;

  articles.forEach((article) => {
    total += article.total;
    total_tva += article.total_tva;
  });
  total_ttc = total + total_tva;

  return articles;
}
