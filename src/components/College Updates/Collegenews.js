import "./Collegenews.css"

export default function Collegenews(props)
{
    const{id,img,title,para}=props
    return(
        <>
    <div className="MainContent">
        <img src={img} className="image"></img>
 
        <p className="para"><h3 className="NewsHead">{title}</h3>{para}</p>
    </div>
    </>
    )
}