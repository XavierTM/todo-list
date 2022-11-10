

function Button(props) {

   return <span
      style={{
         borderRadius: '50%',
         border: '1px solid',
         fontSize: 30,
         fontWeight: 'bold',
         '--dimension': '40px',
         width: 'var(--dimension)',
         height: 'var(--dimension)',
         color: 'white',
         background: '#007fff',
         ...(props.style || {})
      }}
      onClick={props.onClick}
      className="vh-align"
   >
      {props.children}
   </span>
}

export default Button;