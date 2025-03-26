export default function Annotations() {
  return (
          <>
          {/* Annotations pour le talon */}
          <div className="absolute top-[70%] left-[20%] transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-4">
                  <span className="text-white rounded-full"> 1 </span>
                  <span className="text-white"> - </span>
                  <span className="text-white"> Talon </span>
                  <div className=" bg-white border-white border-1 w-10"></div>
              </div>
          </div>
          </>
  )
}