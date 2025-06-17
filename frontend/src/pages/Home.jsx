import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Home = () => {

  const {currentUser} = useContext(UserContext);


  return (
    <div className="bg-gray-100 flex items-center justify-center p-8">
      <div className="w-full flex items-center">
        <div className="w-1/2 gtext-center">
          <h1 className="text-8xl font-bold text-gray-800">
            Welcome {currentUser} to 
          </h1>
          <h3 className='text-4xl font-semibold'>
            StackOverflow Clone
          </h3>
          <p className="mt-4 text-2xl text-gray-800">
            Here you can ask questions and get answers from the community.
          </p>
        </div>

        <div className="w-1/2">
          <img src="./images/landing.png" alt="StackOverflow Clone Illustration" className="w-full h-auto" />
        </div>
      </div>

    </div>
  );
};

export default Home;
