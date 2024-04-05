const Input = ({type,name,placeholder})=> {
    return (
        <input type={type} name={name} id={name} placeholder={placeholder} className="rounded focus:outline-none border p-2"  />
    )
}

export default Input;
