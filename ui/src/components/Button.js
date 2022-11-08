

function Button(props) {

   return <button
      style={{
         borderRadius: '50%',
         border: '1px solid',
         fontSize: 30,
         aspectRatio: 1,
         height: 40,
         color: 'white',
         background: 'green',
         ...(props.style || {})
      }}
      onClick={props.onClick}
   >
      {props.children}
   </button>
}

export default Button;