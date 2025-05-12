'use client';
import Image from "next/image";
import bag from "../../../../public/img/bourrellerie/carousel/bag-repair.jpg";

export default function BeforeAfterCard({
  title,
  beforeLabel = "AVANT",
  afterLabel = "APRÈS",
  className
}) {
  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      {/* Container card */}
      <div className="bg-white rounded-xl border border-accent/10 relative overflow-hidden">
        {/* Images container */}
        <div className="relative flex flex-col md:flex-row items-center justify-between">
          {/* Before Image */}
          <div className="relative z-0 w-full md:w-1/2 h-[400px]">
            <Image
              src={bag}
              alt="Before"
              width={400}
              height={400}
              className="object-cover w-full h-full min-h-[450px]"
            />
            <div className="absolute top-4 left-4 bg-primary px-4 py-1 rounded-lg text-white">
              {beforeLabel}
            </div>
          </div>

          {/* Separator */}
          <div className="hidden md:block w-[1px] h-[400px] bg-primary self-center" />

          {/* After Image */}
          <div className="relative z-0 w-full md:w-1/2 h-[400px]">
            <Image
              src={bag}
              alt="After"
              width={400}
              height={400}
              className="object-cover w-full h-full min-h-[450px]"
            />
            <div className="absolute top-4 right-4 bg-primary px-4 py-1 rounded-lg text-white">
              {afterLabel}
            </div>
          </div>
        </div>

        {/* Titre en bas avec SVG - maintenant ABSOLU pour passer par-dessus */}
        {title && (
          <div className="absolute bottom-0 left-0 w-full z-20">
            <svg width="100%" height="60" viewBox="0 0 100 10" preserveAspectRatio="none">
              <polygon
                points="0,5 100,0 100,10 0,10"
                fill="var(--color-primary)"
              />
              <text
                x="50%"
                y="7"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="white"
                fontFamily="var(--font-josefin-sans)"
                fontSize="3"
                fontWeight="var(--font-weight-light)"
                letterSpacing="1"
                textDecoration={"uppercase"}
              >
                {title.toUpperCase()}
              </text>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}