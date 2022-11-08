import { ACTIONS } from "./constants";


function getTarget(index, root) {
   return index.reduce((prev, current) => {
      return prev[current];
   }, root);
}


function addItemReducer(state, payload) {
   const { index, item } = payload;
   let { items } = state;

   let target = getTarget(index, items);

   if (!Array.isArray(target))
      target = target.items;
   
   target.push(item);
   items = [ ...items ];

   state = { ...state, items };

   console.log(state);

   return state;
}


function setItemsReducer(state, items) {
   return { ...state, items };
}


function deleteItemReducer(state, payload) {
   const { index, id } = payload;
   let { items } = state;
   const parentIndex = removeLastElement(index);
   const target = getTarget(parentIndex, items);

   const filtered = target.filter(item => {
      return item.id !== id;
   });

   if (target === items) {
      items = filtered;
   } else {
      const parentOfParentIndex = removeLastElement(parentIndex);
      const target = getTarget(parentOfParentIndex, items);
      const index = getLastElement(parentIndex);
      target[index] = filtered;
      items = [ ...items ];
   }

   return { ...state, items };

   
}

function getLastElement(arr) {
   return arr[arr.length - 1];
}

function removeLastElement(arr) {
   const len = arr.length;
   return arr.slice(0, len - 1);

}


function reducer(state, action) {

   const { type, payload } = action;

   switch (type) {
      case ACTIONS.ADD_ITEM: 
         return addItemReducer(state, payload);

      case ACTIONS.SET_ITEMS:
         return setItemsReducer(state, payload);

      case ACTIONS.DELETE_ITEM:
            return deleteItemReducer(state, payload);

      default:
         return state;
   }
}


export default reducer;