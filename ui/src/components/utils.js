import actions from "../actions";


function addToDo(parentId) {
   
   const title = window.prompt('Task:', 'Undefined task');

   if (!title)
      return;

   actions.addItem(title, parentId);

}

export {
   addToDo
}