import { linkIcon, loader, copy, tick } from "../assets";
import { useEffect, useState } from "react";


// importing our custom API hook
import { useLazyGetSummaryQuery } from "../services/article.js";

const Summary = () => {

  // article state
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  // history of articles' url - array
  const [allArticles, setAllArticles] = useState([]);



  // our custom hook - Lazy version
  // it will have a function which we made in the slice of the store
  // we have error, isFetching to tell us the state of the request
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();


  const handleChange = (e) => {
    setArticle(
      // we are going to have an object inside set function instead of a simple expression as we are dealing with an object
      {
        ...article,
        [e.target.name]: e.target.value,
      }
    );
  };

  // extracting the data from local storage to display it
  useEffect(() => {
    // call out for the stored data in the database and then storing it in the state
    const articleFromStorage = localStorage.getItem("articles");
    if (articleFromStorage) {
      // convert the strings back to articles
      setAllArticles(JSON.parse(articleFromStorage));
    }
  }, []);



  // handle submit function - most important
  const handleSubmit = async (e) => {

    // to not reload the page we are using
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    // console.log(data);

    // if data exists
    if (data?.summary) {

      const newArticle = { ...article, summary: data.summary };

      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);

      // so as soon as we refresh the page it will be gone
      setAllArticles(updatedAllArticles);

      // local storage only contains string so we need to convert it to JSON
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };


  const [copyText, setCopyText] = useState(""); // State to track copied URL
  const [alertVisible, setAlertVisible] = useState(false); // State to control alert visibility

  const copyToClipboard = (url) => {
    // Set the copied URL in state
    setCopyText(url);

    // Copy the URL to the clipboard
    navigator.clipboard.writeText(url);

    // Show the alert/banner
    setAlertVisible(true);

    // Hide the alert/banner after 2 seconds
    setTimeout(() => setAlertVisible(false), 2000);
  };




  return (
    <>
      <section className="w-full max-w-xl px-4 max-sm:px-3 relative">

        {/* Alert Banner */}
        {alertVisible && (
          <div className="absolute top-[100px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-green-500 text-white text-center py-2 rounded shadow-lg transition-opacity duration-300">
            URL copied to clipboard!
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex relative justify-center items-center gap-2 max-sm:gap-1"
        >
          <img
            src={linkIcon}
            alt="link-icon"
            className="absolute left-3 w-5 max-sm:w-4"
          />
          <input
            onChange={handleChange}
            value={article.url}
            placeholder="Enter a URL"
            className="url_input peer flex-1 text-sm max-sm:text-xs"
            type="url"
            name="url"
            required
          />
          <button
            className="absolute right-0 my-2 mr-4 submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 max-sm:text-xs"
            type="submit"
          >
            <p>↵</p>
          </button>
        </form>

        {/* Links History */}
        <div className="flex flex-col gap-2 overflow-y-auto my-4">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              className="link_card"
              onClick={() => setArticle(item)}
            >
              <div
                className="copy_btn"
                onClick={() => copyToClipboard(item.url)}
              >
                <img
                  src={copyText === item.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain max-sm:w-[30%] max-sm:h-[30%]"
                />
              </div>
              <p className="flex-1 text-blue-500 font-medium text-sm truncate max-sm:text-xs">
                {item.url}
              </p>
            </div>
          ))}
        </div>

        {/* Summary Content */}
        <div className="my-10 flex justify-center items-center">
          {isFetching ? (
            <img src={loader} alt="loader" className="w-20 h-20 object-contain max-sm:w-16 max-sm:h-16" />
          ) : error ? (
            <p className="text-center text-red-500 max-sm:text-sm">
              Something went wrong. Please try again.
            </p>
          ) : (
            article.summary && (
              <div>
                <h2 className="font-montserrat font-black text-2xl mb-2 orange_gradient max-sm:text-xl">
                  Summary
                </h2>
                <p className="text-blue-950 font-semibold text-sm tracking-wide font-poppins leading-6 max-sm:text-xs">
                  {article.summary}
                </p>
              </div>
            )
          )}
        </div>
      </section>

    </>
  );
};

export default Summary;
