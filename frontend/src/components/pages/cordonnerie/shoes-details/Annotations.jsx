export default function Annotations() {
  return (
    <>
      {/* Annotations pour le talon */}
      <div className="absolute top-[71%] left-[22%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center gap-4">
          <span className="text-white rounded-full"> 1 </span>
          <span className="text-white"> - </span>
          <span className="text-white"> Talon </span>
          <div className=" bg-white border-white border-1 w-10"></div>
        </div>
      </div>
      {/* Annotations pour la semelle */}
      <div className="absolute top-[90%] left-[40%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center gap-4">
          <span className="text-white rounded-full"> 2 </span>
          <span className="text-white"> - </span>
          <span className="text-white"> Semelle </span>
          <div className="absolute bottom-[200%] left-[100%] bg-white border-white border-1 w-20 transform rotate-135"></div>
        </div>
      </div>

      {/* Annotations pour la trépointe */}
      <div className="absolute top-[80%] left-[30%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center gap-4 mr-4">
          <span className="text-white rounded-full"> 3 </span>
          <span className="text-white"> - </span>
          <span className="text-white"> Trépointe </span>
          <div className="absolute bottom-[230%] left-[90%] bg-white border-white border-1 w-30 transform rotate-140"></div>
        </div>
      </div>

      {/* Annotations pour le glissoir */}
      <div className="absolute top-[20%] left-[21%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center gap-4">
          <span className="text-white rounded-full"> 4 </span>
          <span className="text-white"> - </span>
          <span className="text-white"> Glissoir </span>
          <div className="absolute top-[200%] left-[100%] bg-white border-white border-1 w-20 transform rotate-45"></div>
        </div>
      </div>

      {/* Annotations pour des redresses */}
      <div className="absolute bottom-[20%] left-[22%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center gap-4">
          <span className="text-white rounded-full"> 5 </span>
          <span className="text-white"> - </span>
          <span className="text-white"> Des redresses </span>
          <div className="absolute bottom-[200%] left-[100%] bg-white border-white border-1 w-25 transform rotate-135"></div>
        </div>
      </div>

      {/* Annotations pour des lacets */}
      <div className="absolute top-[30%] left-[63%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center gap-4">
          <span className="text-white"> Des lacets </span>
          <span className="text-white"> - </span>
          <span className="text-white rounded-full"> 6 </span>
          <div className="absolute top-[200%] right-[100%] bg-white border-white border-1 w-20 transform rotate-135"></div>
        </div>
      </div>
    </>
  );
}
