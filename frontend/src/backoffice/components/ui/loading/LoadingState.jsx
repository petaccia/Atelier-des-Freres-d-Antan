export default function LoadingState({ text }) {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
      <span className="ml-3 text-white">{text}</span>
    </div>
  );
}
