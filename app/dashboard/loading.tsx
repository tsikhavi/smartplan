export default function Loading(){
    return(
<div className="text-center w-screen h-screen flex flex-col items-center my-20">
  <div
    className="w-32 h-32 border-4 border-dashed border-spacing-2 rounded-full animate-spin border-malachite-500 mx-auto"
  ></div>
  <h2 className="text-malachite-900  mt-8 text-xl ">Идет загрузка ...</h2>
  
</div>

    )
}