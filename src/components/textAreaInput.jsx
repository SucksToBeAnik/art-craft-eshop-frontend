const TextAreaInput = ({rows=4,name,placeholder,defaultValue='', required=false})=> {
    return (
        <textarea name={name} rows={rows} defaultValue={defaultValue} required={required} id={name} placeholder={placeholder} className="rounded focus:outline-none border p-2"  />
    )
}

export default TextAreaInput;
