import { Link } from "react-router-dom";
const Home = () => {
    return ( 
    <div className="bg-white flex flex-col h-100 py-24">

        <h1 className=" mx-auto text-3xl my-6">HOME!</h1>
        <Link className="mx-auto bg-green-500 py-2 px-4 text-white mb-4 rounded" to={"/"}>Back to home</Link>

    </div> );
}
 
export default Home;