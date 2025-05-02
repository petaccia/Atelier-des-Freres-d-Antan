import ErrorState from "../ui/error/ErrorState";
import Sidebar from "./Sidebar";

const PageError = ({ message }) => {
  return (
    <div className="min-h-screen bg-primary">
      <Sidebar />
      <div className="ml-64 p-8">
        <ErrorState message={message} />
      </div>
    </div>
  );
};

export default PageError;
