import Link from "next/link";

const BackofficeHeaderLocationPage = ( { parentLink, currentPage } ) => {
  return (
    <div className="flex items-center gap-2 text-white/60 mb-4">
      <Link href={parentLink.href} className="hover:text-accent">
        {parentLink.label}
      </Link>
      <span>/</span>
      <span className="text-accent">{currentPage}</span>
    </div>
  );
};

export default BackofficeHeaderLocationPage;