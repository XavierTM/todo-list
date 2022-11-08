import { v4 as uuid } from "uuid";
import { ACTIONS } from "./constants";
import store from "./store";
import { retrieveList, storeList } from "./utils";




function addItem(title, parentId) {

   const id = uuid();

   const item = {
      id,
      title,
      items: []
   }

   const index = getIndex(parentId)

   const payload = {
      item,
      index,
   }


   store.dispatch({
      payload,
      type: ACTIONS.ADD_ITEM
   });

}

function getIndex(parentId) {
   return indices.get(parentId) || [];
}


function initTodoList() {

   const payload = retrieveList();

   intializeIndices(payload);

   store.dispatch({
      type: ACTIONS.SET_ITEMS,
      payload 
   })
}

function deleteItem(id) {
   const index = getIndex(id);

   store.dispatch({
      payload: { index, id },
      type: ACTIONS.DELETE_ITEM
   });
}

function intializeIndices(list=[], base=[]) {
   
   list.forEach((item, index ) => {
      const { id, items } = item;
      indices.set(id, [ ...base, index ]);

      intializeIndices(items, [ ...base, index, 'items' ]);

   });
}



const indices = new Map();
let prevItems;

store.subscribe(() => {
   const { items } = store.getState();
   
   if (items === prevItems)
      return;

   prevItems = items;

   storeList(items);
   intializeIndices(items);
   
})



const actions = {
   addItem,
   deleteItem,
   initTodoList,
}





export default actions;