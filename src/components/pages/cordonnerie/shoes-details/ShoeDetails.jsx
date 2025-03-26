"use client";
import Image from "next/image";
import shoeDetails from "../../../../../public/img/cordonnerie/shoe-details.jpg";

export default function ShoeDetails() {
    return (
        <div className="relative w-screen h-screen">
            {/* overlay sur l'image */}
            <div className="absolute w-full h-full bg-black opacity-50"></div>
            <Image 
                src={shoeDetails}
                alt="Shoe details"
                fill
                className="object-contain shadow-2xl rounded-lg" 
            />
        </div>
    );
}
