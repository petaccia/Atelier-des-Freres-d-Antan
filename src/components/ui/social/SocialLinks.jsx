"use client";
import { socialLinks } from "@/data/socialLinksData";

export default function SocialLinks({ 
  className = "", 
  iconSize = 20, 
  showColors = false,
  containerClassName = "",
  title = "Suivez-nous",
  showTitle = true,
  iconContainerClassName = "w-12 h-12 bg-accent/10 hover:bg-accent/20 rounded-full flex items-center justify-center text-accent-light transition-colors duration-300"
}) {
  return (
    <div className={`${containerClassName}`}>
      {showTitle && (
        <h4 className="text-lg font-semibold text-whiteAmber mb-4 text-center">
          {title}
        </h4>
      )}
      
      <div className="flex justify-center gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={showColors ? `${link.color} ${link.hoverColor} transition-colors` : iconContainerClassName}
            aria-label={link.name}
          >
            <link.icon size={iconSize} />
          </a>
        ))}
      </div>
    </div>
  );
}
