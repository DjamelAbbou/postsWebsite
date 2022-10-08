export default function Container({children, className}) {
    return <div className={`container mx-auto ${className ? className : ""}`}>
        {children}
    </div>
}