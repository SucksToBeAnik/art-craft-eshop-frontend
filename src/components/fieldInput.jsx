const FieldInput = ({type,name,placeholder, required=false})=> {
    return (
        <input type={type} name={name} required={required} id={name} placeholder={placeholder} className="rounded focus:outline-none border p-2 w-full"  />
    )
}

export default FieldInput;
