import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const PageNotFound = () => {
  const { local } = useSelector((state: RootState) => state.translation);
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-6">
      <div className="text-center max-w-xl">
        <div className="text-7xl font-bold text-primary drop-shadow-sm">
          404
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-gray-800">
          Page Not Found
        </h1>
        <p className="mt-2 text-gray-600 text-base">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6">
          <Link
            to={`/${local}/`}
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-md shadow hover:bg-primary/70 transition"
          >
            <FaArrowLeft className="text-sm" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
