import noDATA from '../../../../assets/images/no-data.svg'
const NoData = () => {
  return (
    <div className='text-center mt-5'>
      <img src={noDATA} />
      <h3>No Data !</h3>
    </div>
  )
}

export default NoData