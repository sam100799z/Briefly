import { Logo2 } from "../assets";
// import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <header className="w-full flex flex-col items-center mb-14 px-4 max-md:px-3">

      <nav className="flex justify-between items-center w-full mt-3 mb-10">
        <img
          src={Logo2}
          alt="sumz_logo"
          className="w-[250px] max-md:w-[150px]"
        />
        {/* <Link to="https://github.com/sam100799z/Briefly"> */}
          {/* <button className="bg-blue-950 text-white border-2 px-4 py-2 max-md:px-3 max-md:py-2 max-md:text-xs rounded-md hover:bg-slate-700">
            Git Hub
          </button> */}
        {/* </Link> */}
      </nav>

      <h1 className="text-6xl text-center w-full max-md:text-5xl max-sm:text-4xl font-black leading-[115%] font-montserrat text-blue-950 tracking-wide">
        Articles Summarized using
        <br className="hidden lg:block" />
        <span className="orange_gradient text-6xl max-md:text-5xl max-sm:text-4xl"> OpenAI GPT-4</span>
      </h1>

      <h2 className="text-center text-xl max-md:text-lg max-sm:text-sm text-blue-950 font-poppins w-full px-2 mt-5 tracking-tight">
        Briefly is an open-source article summarizer that transforms lengthy articles into clear and concise summaries.
      </h2>
    </header>

  );
};

export default Hero;
