import LoadingState from "../ui/loading/LoadingState";
import Sidebar from "./Sidebar";

const PageLoading = ({ text }) => {
  return (
    <div className="min-h-screen bg-primary">
      <Sidebar />
      <div className="ml-64 p-8">
        <LoadingState text={text} />
      </div>
    </div>
  );
};

export default PageLoading;
