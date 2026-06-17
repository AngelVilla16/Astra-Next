interface InputProps{
    type:string,
    placeholder?:string,
    className?: string,
    onChange?:(e: React.ChangeEvent<HTMLInputElement>) => void,
    id?: string,
    checked?: boolean,
}

export default function Input({type, placeholder, className, onChange, id, checked}:InputProps){
    return(
        <input onChange={onChange} type={type} placeholder={placeholder} className={className} id={id} checked={checked}  />
    );
}