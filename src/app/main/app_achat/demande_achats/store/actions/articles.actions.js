export const ADD_ARTICLE = "[DEMANDE] ADD_ARTICLE";
export const DELETE_ARTICLE = "[DEMANDE] DELETE_ARTICLE";
export const EDIT_ARTICLE = "[DEMANDE] EDIT_ARTICLE";

export const ARTICLES = "[DEMANDE_ARTICLES] COLLECTION";

export function addNewArticle({ id, article, unite, qte }, form) {
  return {
    type: ADD_ARTICLE,
    payload: { id, article, unite, qte },
    demande: form,
  };
}

export function deleteArticle(form) {
  return {
    type: DELETE_ARTICLE,
    payload: form,
  };
}

export function editArticle(article, form) {
  return {
    type: EDIT_ARTICLE,
    payload: article,
    demande: form,
  };
}
