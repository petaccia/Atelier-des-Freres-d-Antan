import Image from "next/image";

export default function PagesJaunesIcon({ size = 20 }) {
  return (
   <Image
      src="/icons/social/pj.svg"
      alt="Pages Jaunes Icon"
      width={size}
      height={size}
    />
  );
}
