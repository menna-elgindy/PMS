import { Link } from "react-router-dom";


interface tableHeader {
  btnTitle?:string,
  title : string,
  url: string
}


const TableHeader:React.FC<tableHeader>= ({title,btnTitle,url}) => {
return <>

<div className="tableHeaderContainer bg-white d-flex justify-content-between">
    <h3>
       {title}
    </h3>
    <Link to={url} className="tableHeaderBtn text-decoration-none">
      <span className="mx-2"><i className="fa-solid fa-plus"></i></span> { btnTitle}
    </Link>
</div>


</>
}

export default TableHeader