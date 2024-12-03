import Dropdown from 'react-bootstrap/Dropdown';

interface paginationInfo {
    totalNumberOfPages:number[],
    currentPage : number|string,
    numberOfPages : number|string,
    paginatedListFunction: (UsersFilterOptions:{pageNumber:number,pageSize:number})=>void ,
    pageNumber:number,
    numOfRecords:number,
    from:string

  }
  



const Pagination:React.FC<paginationInfo> = ({totalNumberOfPages,paginatedListFunction,pageNumber,numOfRecords,from}) => {


const nextBtn =(pageSize:number,pageNumber:number)=>{

  if(pageNumber <= totalNumberOfPages.length) {
    paginatedListFunction({pageNumber:pageNumber,pageSize:pageSize})

    
  }


}
const prevBtn =(pageSize:number,pageNumber:number)=>{

  console.log(pageNumber);
  if(pageNumber >=1){
    paginatedListFunction({pageNumber:pageNumber,pageSize:pageSize})

  }
 
}


 return <>
    <div className="bg-white py-3">
         
 <nav aria-label="Page navigation example">
  <ul className="pagination  align-items-center gap-3 justify-content-end">

    <span className=''>
        showing
    </span>
    <Dropdown>
      <Dropdown.Toggle variant='transparent' className='paginationDropDownStyle'  id="dropdown-basic">
       {pageNumber} <i className="fa-solid fa-chevron-down"></i>
        

      </Dropdown.Toggle>

      <Dropdown.Menu className='dropDownMenuStyle'>

        {
          totalNumberOfPages?.map((page)=>       <Dropdown.Item key={page}  onClick={()=>paginatedListFunction({pageNumber:page,pageSize:from=='users' ? 20 :5})} > 

          {page}
              
              </Dropdown.Item>
        )
        }
 

      </Dropdown.Menu>
    </Dropdown>

    <span> of {numOfRecords} Results</span>

        <div>
            <span>Page {pageNumber}</span>
            <span className='mx-2'>of {totalNumberOfPages?.length}</span>
        </div>

    <li className="page-item">
      <a className={pageNumber == 1 ? "page-link pagniationLink disabledArrow" : "page-link pagniationLink "} onClick={()=>prevBtn(from=="user" ? 20 : 5,pageNumber-1)}   aria-label="Previous">
      <i className="fa-solid fa-chevron-left"></i>
      </a>
    </li>
    
    <li className="page-item">
      <a className={pageNumber == totalNumberOfPages.length ? "page-link pagniationLink disabledArrow" : "page-link pagniationLink "}  onClick={()=>nextBtn (from=="user" ? 20 : 5,pageNumber+1)
      } aria-label="Next">
       
       
      <i className="fa-solid fa-chevron-right " ></i>
      </a>
    </li>
  </ul>
</nav>
    </div>
 
 </>
}

export default Pagination
