

import React from "react";
import Item from './Item';
import { css } from "@emotion/css";
import Button from "./Button";
import { connect } from "react-redux";
import { addToDo } from "./utils";
import actions from "../actions";
import { VIEW_PORT } from "../constants";



const viewportStyle = css({
   height: 'var(--current-viewport-height)',
   width: 'var(--current-viewport-width)',
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


   clearList() {
      actions.clearList();
   }

   setCurrentViewport = () => {

      let currentViewportHeight, currentViewportWidth;

      if (window.innerHeight < VIEW_PORT.HEIGHT || window.innerWidth < VIEW_PORT.WIDTH) {
         currentViewportHeight = '100%';
         currentViewportWidth = '100%';
      } else {
         currentViewportHeight = VIEW_PORT.HEIGHT + 'px';
         currentViewportWidth = VIEW_PORT.WIDTH + 'px';
      }

      document.documentElement.style.setProperty('--current-viewport-height', currentViewportHeight);
      document.documentElement.style.setProperty('--current-viewport-width', currentViewportWidth);

   }

   componentDidMount() {
      window.addEventListener('resize', this.setCurrentViewport);
      this.setCurrentViewport();
   }


   componentWillUnmount() {
      window.removeEventListener('resize', this.setCurrentViewport);
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
            className={viewportStyle}
         >

            <div 
               style={{ 
                  height: 'var(--header-height)', 
                  borderBottom: '1px solid',
               }} 
               className="vh-align">
               <h1>TODO LIST</h1>
            </div>

            <div
               style={{
                  height: 'calc(var(--current-viewport-height) - var(--header-height) - var(--footer-height))',
                  '--padding': '20px',
                  padding: 'var(--padding)',
                  width: 'var(--current-viewport-width)',
                  boxSizing: 'border-box',
                  overflowY: 'auto'
               }}
            >
               {itemsJSX}
            </div>

            <div 
               style={{ 
                  height: 'var(--footer-height)', 
                  paddingRight: 30, 
                  borderTop: '1px solid',
                  // background: 'red'`
               }} 
               className='vr-align'
            >
                  
               <Button
                  style={{
                     color: 'red',
                     background: 'white',
                     marginRight: 7,
                     transform: 'rotate(45deg)'
                  }}
                  onClick={this.clearList}
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