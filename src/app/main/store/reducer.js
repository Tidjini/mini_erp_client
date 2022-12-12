import * as Actions from "./actions";
import { deleteCartItem, addCartItem, editCartItem } from "./helpers";

const initialState = {
  cartItems: [],
  totalCart: 0,
  remiseCart: 0,
  selectedCartItem: null,
  openEditionItem: false,
  openPaiment: false,
  paiment: 0,

  count: 0,
  next: null,
  previous: null,
  results: [],
  typeTransports: [],
  client: null,
  currentPage: 1,
  loading: true,
  searchText: "",
  selectedItem: null,
  dialog: {
    type: "new",
    props: {
      open: false,
    },
    data: null,
  },
  dialogOffre: {
    type: "new",
    props: {
      open: false,
    },
    data: null,
  },
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.ADD_CART_ITEM: {
      let item = action.item;
      const cartItemsTemp = addCartItem(state.cartItems, item);
      let t = 0;
      cartItemsTemp.map((i) => (t += i.montant));
      let r = 0;
      cartItemsTemp.map((i) => (r += i.montant * i.remise));
      return {
        ...state,
        cartItems: cartItemsTemp,
        totalCart: t,
        remiseCart: r,
      };
    }
    case Actions.DELETE_CART_ITEM: {
      let item = action.item;
      const cartItemsTemp = deleteCartItem(state.cartItems, item);
      let t = 0;
      cartItemsTemp.map((i) => (t += i.montant));
      let r = 0;
      cartItemsTemp.map((i) => (r += i.montant * i.remise));
      return {
        ...state,
        cartItems: cartItemsTemp,
        totalCart: t,
        remiseCart: r,
      };
    }
    case Actions.EDIT_CART_ITEM: {
      let item = action.item;
      const cartItemsTemp = editCartItem(state.cartItems, item);
      let t = 0;
      cartItemsTemp.map((i) => (t += i.montant));
      let r = 0;
      cartItemsTemp.map((i) => (r += i.montant * i.remise));
      return {
        ...state,
        cartItems: cartItemsTemp,
        totalCart: t,
        remiseCart: r,
        openEditionItem: false,
      };
    }
    case Actions.SELECT_CART_ITEM: {
      return {
        ...state,
        selectedCartItem: action.item,
        openEditionItem: true,
      };
    }
    case Actions.CONFIRME_CART: {
      return {
        ...state,
        cartItems: [],
        totalCart: 0,
        remiseCart: 0,
        openEditionItem: false,
        openPaiment: false,
      };
    }
    case Actions.OPEN_PAIEMENT: {
      return {
        ...state,
        openPaiment: action.open,
        paiment: action.paiment,
      };
    }

    default: {
      return state;
    }
  }
};
export default reducer;
