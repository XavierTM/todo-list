

import React from "react";
import Item from './Item';
import { css } from "@emotion/css";
import Button from "./Button";
import { connect } from "react-redux";
import { addToDo } from "./utils";



const windowStyle = css({
   height: 667,
   width: 375,
   border: '1px solid black',
   position: 'relative',
   padding: 0,

   '& > *': {
      margin: 0
   }
});



class UnconnectedToDoList extends React.Component {

   addItem() {
      addToDo();
   }

   render() {

      let itemsJSX;

      if (this.props.items && this.props.items.length) {
         itemsJSX = this.props.items.map(item => {

            const { items=[], title, completed, id } = item;

            return <Item 
               id={id}
               key={id}
               items={items}
               title={title} 
               completed={completed}
            />
         });
      } else {
         itemsJSX = <div style={{ fontSize: 20, color: 'grey', padding: 20 }} className="fill-parent vh-align">
            Nothing on the list, add some
         </div>
      }

      return <div className="vh-align full-screen">
         <div
            className={windowStyle}
         >

            <div style={{ height: 70, borderBottom: '1px solid' }} className="vh-align">
               <h1>TODO LIST</h1>
            </div>

            <div
               style={{
                  height: 532,
                  overflowY: 'auto',
               }}
            >
               {itemsJSX}
            </div>

            <div style={{ height: 60, paddingRight: 30, borderTop: '1px solid' }} className='vr-align'>
                  
               <Button
                  style={{
                     color: 'red',
                     background: 'white',
                     marginRight: 7,
                     transform: 'rotate(45deg)'
                  }}
               >
                  +
               </Button>

               <Button onClick={this.addItem}>
                  +
               </Button>
            </div>

            

         </div>

      </div>

   }
}

function mapStateToProps(state) {
   const { items } = state;
   return { items };
}

const ToDoList = connect(mapStateToProps)(UnconnectedToDoList)
export default ToDoList;