interface ButtonProps{
    type: "button" | "submit" | "reset"
    className?: string,
    text: string,
    onClick?: ()=>void;
}

export default function Button({type, className, text, onClick}:ButtonProps){
    return(
        
        <button type={type} onClick={onClick}  className={className}> 
            {text}
        </button>
        
    );
}