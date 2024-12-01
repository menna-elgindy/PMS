

interface tableHeader {
  btnTitle?:string,
  title : string
}


const TableHeader:React.FC<tableHeader>= ({title,btnTitle}) => {
return <>

<div className="tableHeaderContainer bg-white d-flex justify-content-between">
    <h3>
       {title}
    </h3>
    <button className="tableHeaderBtn">
      <span className="mx-2"><i className="fa-solid fa-plus"></i></span> { btnTitle}
    </button>
</div>


</>
}

export default TableHeader
