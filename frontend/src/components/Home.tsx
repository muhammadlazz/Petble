import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import petbleImage from "./petble2.jpg";
import petbleImage2 from "./petble3.jpg";

export default function Home() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsImageLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-full mx-auto font-sans text-gray-800">
      <section className="flex flex-col py-16 px-8" style={{ backgroundColor: "#ABD#ff1C6" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-teal-800 mb-6">
            Hi, Peepals!
          </h1>
          <p className="text-lg leading-relaxed mb-8 max-w-xl mx-auto text-teal-800">
            Discover the joy of bonding with your beloved pets! Join our
            community to share stories, tips, and experiences about the world of
            animals.
          </p>
          <div className="flex gap-4 justify-center mb-12">
            <Link
              to="/signin"
              className="px-6 py-3 text-lg font-semibold text-white bg-teal-800 rounded-lg transition-transform transform hover:scale-105"
            >
              Join Now
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 text-lg font-semibold text-teal-800 border-2 border-teal-800 rounded-lg transition-transform transform hover:bg-teal-100 hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className={`opacity-0 transition-opacity duration-500 ${isImageLoaded ? "opacity-100" : ""}`}>
          {isImageLoaded ? (
            <img src={petbleImage} alt="Pet image" className="w-full max-w-[450px] mx-auto rounded-lg shadow-lg" />
          ) : (
            <div className="text-center">Loading...</div>
          )}
        </div>
      </section>

      <PetbleFriendMatch />
    </div>
  );
}

// PetbleFriendMatch Component
const PetbleFriendMatch = () => {
  return (
    <section className="bg-teal-800 text-white py-16 px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col gap-8 items-center text-center sm:flex-row sm:text-left sm:gap-12 sm:items-center">
          {/* Left Image */}
          <div className="flex justify-center sm:flex-1 sm:max-w-[50%]">
            <img
              src={petbleImage2}
              alt="Friend Match Illustration"
              className="w-full max-w-[400px] rounded-lg shadow-lg"
            />
          </div>

          {/* Right Text */}
          <div className="sm:flex-1 sm:max-w-[50%]">
            <h2 className="text-3xl font-extrabold mb-6">Find Your Peepals Match</h2>
            <p className="text-lg leading-relaxed mb-8">
              Petble is the perfect place to grow your circle of friends. Connect with fellow animal lovers, send
              messages, and build meaningful friendships.
            </p>

            <h3 className="text-2xl font-semibold mb-4">PetConnect+:</h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center">
                <span className="font-semibold">Discover People:</span> Browse profiles and meet like-minded animal lovers.
              </li>
              <li className="flex items-center">
                <span className="font-semibold">Start a Conversation:</span> Send messages to connect and share your pet stories.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};