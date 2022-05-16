import error from '../../images/undraw_page_not_found_re_e9o6.svg'
export default function Error () {
  return (
      <div className="z-50 w-full h-full ">
        <img src={error} alt="Error..." className="absolute inset-0 m-auto"/>
      </div>
  )
}