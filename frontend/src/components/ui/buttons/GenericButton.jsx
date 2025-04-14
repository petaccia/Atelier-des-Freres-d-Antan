export default function GenericButton({ children, className, icon }) {
  return (
    <button className={className}>
      {children} {icon}
    </button>
  );
}
