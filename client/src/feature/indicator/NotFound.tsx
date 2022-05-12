import notFound from "../../images/undraw_traveling_re_weve.svg";
export default function NotFound () {
  return (
      <div className="z-50 w-full h-full ">
        <img src={notFound} alt="NotFound..." className="absolute inset-0 m-auto"/>
      </div>
  )
}