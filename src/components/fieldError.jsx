const FieldError = ({error})=> {
    return (
        <p className="text-red-400 text-sm p-1">
            {error}
        </p>
    )
}

export default FieldError;
