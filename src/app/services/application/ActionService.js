import service from "./ApiService";

export function list(context, link, page = 1, filters = {}, load = false) {
  service.init(link);

  return async (dispatch) => {
    load && this.loading(context, dispatch, true);

    try {
      var data = await service.getCollection(page, filters);
      dispatch({
        type: `[${context.toUpperCase()}] COLLECTION`,
        payload: data,
      });
    } catch (exception) {
      dispatch({
        type: `[${context.toUpperCase()}] COLLECTION ERROR`,
        payload: exception,
      });
    }
    load && this.loading(context, dispatch, false);
  };
}

export function retrieve(context, link, id, defaultItem = {}, load = false) {
  service.init(link);

  return async (dispatch) => {
    load && loading(context, dispatch, true);

    try {
      if (id === "nouveau") {
        dispatch({
          type: `[${context.toUpperCase()}] RETRIEVE`,
          payload: defaultItem,
        });
        return;
      }
      var data = await service.getItem(id);

      dispatch({
        type: `[${context.toUpperCase()}] RETRIEVE`,
        payload: data,
      });
    } catch (exception) {
      dispatch({
        type: `[${context.toUpperCase()}] RETRIEVE ERROR`,
        payload: exception,
      });
    }
    load && loading(context, dispatch, false);
  };
}

export function save(context, link, item, pk = "id", load = false) {
  service.init(link, pk);
  return async (dispatch) => {
    load && loading(context, dispatch, true);

    try {
      var data = await service.saveItem(item);

      dispatch({
        type: `[${context.toUpperCase()}] SAVE`,
        payload: data,
      });
      return data;
    } catch (exception) {
      dispatch({
        type: `[${context.toUpperCase()}] SAVE ERROR`,
        payload: exception,
      });
    }
    load && loading(context, dispatch, false);
  };
}

export function destroy(context, link, item, pk = "id", load = false) {
  service.init(link, pk);

  return async (dispatch) => {
    load && loading(context, dispatch, true);
    try {
      var data = await service.deleteItem(item);
      dispatch({
        type: `[${context.toUpperCase()}] DELETE`,
        payload: data,
      });
    } catch (exception) {
      dispatch({
        type: `[${context.toUpperCase()}] DELETE ERROR`,
        payload: exception,
      });
    }
    load && loading(context, dispatch, false);
  };
}

export function loading(context, dispatch, loading = true) {
  dispatch({
    type: `[${context.toUpperCase()}] LOADING`,
    payload: loading,
  });
}

export function saveList(context, link, items, load = false) {
  service.init(link);

  return async (dispatch) => {
    load && loading(context, dispatch, true);

    try {
      var data = await service.saveList(items);

      dispatch({
        type: `[${context.toUpperCase()}] SAVE LIST`,
        payload: data,
      });
    } catch (exception) {
      dispatch({
        type: `[${context.toUpperCase()}] SAVE LIST ERROR`,
        payload: exception,
      });
    }
    load && loading(context, dispatch, false);
  };
}
