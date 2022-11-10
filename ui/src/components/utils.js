import actions from "../actions";


function addToDo(parentId) {
   
   const title = window.prompt('Task:');

   if (!title)
      return;

   actions.addItem(title, parentId);

}

export {
   addToDo
}