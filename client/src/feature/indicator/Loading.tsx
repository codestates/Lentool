import loading from '../../images/409-tool-flat.gif'
export default function Loading () {
  return (
    <div className="z-50 w-full h-screen absolute bg-black opacity-40">
      <img src={loading} alt="Loading..." className="fixed inset-0 m-auto"/>
    </div>
  )
}