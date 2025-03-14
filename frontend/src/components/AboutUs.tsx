import petbleImage from "./petble1.jpg";

const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-6 max-w-5xl mx-auto"style={{ backgroundColor: "#ABD1C6" }}>
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl font-bold text-teal-700 mb-4" style={{ color : "#0f3433"}}>About Us</h1>
        <p className="text-lg mb-4"style={{ color : "#004643"}}>
          Petble was created by pet lovers for pet lovers. Our journey began with a simple idea:
          to build a community where people can share their love for animals, exchange knowledge,
          and support each other in providing the best care for their pets.
        </p>
        <p className="text-lg mb-4"style={{ color : "#004643"}}>
          Our mission is to connect pet owners worldwide, provide useful resources, and promote
          responsible pet ownership. Whether you have dogs, cats, birds, fish, or any other furry,
          feathery, or scaly friend, you'll find a welcoming home here at Petble.
        </p>
        <p className="text-lg text-gray-700"style={{ color : "#004643"}}>
          Join us in celebrating the wonderful bond between humans and animals, and let's make the
          world a better place for our beloved companions.
        </p>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <img src={petbleImage} alt="About us" className="rounded-lg shadow-lg w-full max-w-md" />
      </div>
    </div>
  );
};

export default AboutUs;