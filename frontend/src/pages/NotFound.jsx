import PageTitle from "../components/common/PageTitle";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
     <PageTitle title="NotFound | Ai-driven software solutions
Quality" />
    <section className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-7xl font-bold">404</h1>

      <p className="mt-3 text-lg text-gray-600">
        Page not found
      </p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black"
      >
        Back to Home
      </Link>
    </section>
    </>
  );
};

export default NotFound;