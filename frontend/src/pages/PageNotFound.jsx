import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/Auth";

function PageNotFound() {

  const [auth] = useAuth();
  return (
    <Layout title={'PageNotFound-Waste Management'}>
      <div className="container mx-auto px-4 py-16">
        <section className="text-center mb-20">
          <h1 className="font-bold mb-2 text-green-600 tracking-tight text-[100px]">
            404
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-3 font-bold">
           Oops! Page Not Found
          </p>

          <Link to={'/'} className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
            Go Back
          </Link>
          <div>
            <p>{auth?.user?._id}</p>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default PageNotFound;
