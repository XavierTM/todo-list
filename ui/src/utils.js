import { TODO_LIST_LOCALSTORAGE_KEY } from "./constants";


function storeList(list) {
   window.localStorage.setItem(TODO_LIST_LOCALSTORAGE_KEY, JSON.stringify(list));
}

function retrieveList() {
   
   const json = window.localStorage.getItem(TODO_LIST_LOCALSTORAGE_KEY);

   if (!json)
      return [];

   return JSON.parse(json) || [];
}


export {
   storeList,
   retrieveList
}