import Dropdown from 'react-bootstrap/Dropdown';

interface paginationInfo {
    totalNumberOfPages:number|string,
    currentPage : number|string,
    numberOfPages : number|string
  }
  

const Pagination:React.FC<paginationInfo> = ({totalNumberOfPages,currentPage,numberOfPages}) => {
 return <>
    <div className="bg-white">
         
 <nav aria-label="Page navigation example">
  <ul className="pagination  align-items-center gap-3 justify-content-end">

    <span className=''>
        showing
    </span>
    <Dropdown>
      <Dropdown.Toggle variant='transparent' className='paginationDropDownStyle'  id="dropdown-basic">
       {currentPage} <i className="fa-solid fa-chevron-down"></i>
     

      </Dropdown.Toggle>

      <Dropdown.Menu>
     
      <Dropdown.Item  > 

{
    numberOfPages
}
        
        </Dropdown.Item>
  
 

      </Dropdown.Menu>
    </Dropdown>

    <span> of {totalNumberOfPages} Results</span>

        <div>
            <span>Page {currentPage}</span>
            of {totalNumberOfPages}
        </div>

    <li className="page-item">
      <a className="page-link pagniationLink"  aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    
    <li className="page-item">
      <a className="page-link pagniationLink"  aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
 
    </div>
 
 </>
}

export default Pagination
