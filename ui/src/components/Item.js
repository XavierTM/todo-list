
import Component from '@xavisoft/react-component';
import { css } from '@emotion/css';
import Button from './Button';
import { v4 as uuid } from 'uuid';
import actions from '../actions';
import { addToDo } from './utils';


const itemStyle = css({
   padding: '8px 0',
   paddingLeft: 20
})

class Item extends Component {

   state = {
      expanded: false,
      displayingActions: false,
   }

   id = uuid()

   onMouseEnter = (e) => {
      e.preventDefault();

      const event = new CustomEvent('item-focus', { detail: { id: this.id }});
      document.dispatchEvent(event);

      // make sure the event listener is added after the event is
      // emitted. This prevents the item from listening to its own event
      // and not to the once it is actually interested in (because its a once event)
      document.addEventListener('item-focus', this.onChildItemFocus, { once: true });

      this.updateState({ displayingActions: true });

   }

   onChildItemFocus = e => {

      const id = e.detail.id;

      if (id !== this.id) {
         this.focusedChild = id;
         this.updateState({ displayingActions: false });
      }

   }

   onMouseLeave = () => {

      this.focusedChild = '';
      document.removeEventListener('item-focus', this.onChildItemFocus);

      const event = new CustomEvent('item-blur', { detail: { id: this.id }});
      document.dispatchEvent(event);
      this.updateState({ displayingActions: false });
   }

   toggleExpanded = () => {
      const expanded = !this.state.expanded;
      return this.updateState({ expanded });
   }

   toggleCompleted = () => {
      const completed = !this.props.completed;
      actions.markCompleted(this.props.id, completed);
   }

   onChildItemBlur = e => {
      if (e.detail.id === this.focusedChild) {
         this.updateState({ displayingActions: true });
      }
   }

   deleteItem = () => {
      actions.deleteItem(this.props.id);
   }

   addItem = () => {
      addToDo(this.props.id);
   }

   componentDidMount() {
      document.addEventListener('item-blur', this.onChildItemBlur);
   }

   componentWillUnmount() {
      document.removeEventListener('item-blur', this.onChildItemBlur);
   }

   render() {

      let collapseJSX, itemsJSX;

      if (this.props.items && this.props.items.length) {
         if (this.state.expanded) {
            collapseJSX = <span style={{ display: 'inline-block', transform: 'rotate(90deg)'}}>
               {">"}
            </span>;

            itemsJSX = this.props.items.map(child => {

               const { items=[], title, completed, id } = child;

               return <Item 
                  items={items}
                  title={title} 
                  completed={completed}
                  key={id}
                  id={id}
               />
            });

         } else {
            collapseJSX = ">";
         }
      }


      let actionsJSX;

      if (this.state.displayingActions) {
         actionsJSX = <div className='vr-align'>
            <ItemButton
               style={{
                  color: 'red',
                  background: 'white',
                  transform: 'rotate(45deg)',
               }}
               onClick={this.deleteItem}
            >
               +
            </ItemButton>

            <ItemButton onClick={this.addItem}>
               +
            </ItemButton>
         </div>
      }

      return <div className={itemStyle} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>

         <div 
            style={{
               display: 'grid',
               gridTemplateColumns: '30px auto 30px'
            }}
         >

            <input type="checkbox" checked={this.props.completed} onChange={this.toggleCompleted} />

            <span 
               style={{
                  display: 'inline-block',
                  marginLeft: 10, fontSize: 18,
                  textDecoration: this.props.completed ? 'line-through' : 'none',
               }}
               className="truncate"
               title={this.props.title}
            >
               {this.props.title}
            </span>

            <span 
               style={{
                  fontSize: 22
               }}
               className='grey-text center-align'
               onClick={this.toggleExpanded}
            >
               {collapseJSX}
            </span>
         </div>

         {actionsJSX}

         {itemsJSX}

      </div>
   }
}

function ItemButton(props) {


   return <Button

      {...props}

      style={{
         height: 30,
         fontSize: 20,
         marginRight: 10,
         ...(props.style || {}),
      }}
   >
      {props.children}
   </Button>
}

export default Item;