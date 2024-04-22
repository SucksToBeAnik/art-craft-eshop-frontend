const TextAreaInput = ({rows=4,name,placeholder, required=false})=> {
    return (
        <textarea name={name} rows={rows} required={required} id={name} placeholder={placeholder} className="rounded focus:outline-none border p-2"  />
    )
}

export default TextAreaInput;
