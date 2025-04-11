import Image from "next/image";

export default function GensDeConfianceIcon({ size = 20 }) {
  return (
   <Image
      src="/icons/social/gens-de-confiance.svg"
      alt="Gens de Confiance"
      width={size}
      height={size}
      className="fill-current"
    />
  );
}
