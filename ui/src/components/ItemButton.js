import Button from "./Button";

function ItemButton(props) {


   return <Button

      {...props}

      style={{
         '--dimension': '30px',
         fontSize: 20,
         marginRight: 10,
         ...(props.style || {}),
      }}
   >
      {props.children}
   </Button>
}


export default ItemButton;