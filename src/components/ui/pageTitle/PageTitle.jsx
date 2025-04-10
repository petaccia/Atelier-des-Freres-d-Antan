export default function PageTitle({ 
  title, 
  className = "", 
  titleClassName = "text-white rounded-lg",
}) {
  return (
    <div className={`text-center mt-20 md:my-8 ${className}`}>
      <h1 className={titleClassName}>
        {title}
      </h1>
    </div>
  );
}
