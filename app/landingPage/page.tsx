"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Josefin_Sans } from "next/font/google";
import { getReview } from "../util/review";

const josefinSans = Josefin_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});


interface Reviews {
  id: number;
  review: string;
  confidence: number;
  title: string;
  sentiment: string;
}
const HeroSection = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const router = useRouter();
  const [reviewsList, setReviewsList] = useState<Reviews[]>([]);


  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === reviewsList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? reviewsList.length - 1 : prevIndex - 1
    );
  };


  const handleGetStarted = () => {
    router.push("/review");
  };

  useEffect(() => {
    (async () => {
      const result = await getReview();
      setReviewsList(result);
    })();
  }, []);


const truncateText = (text:string, maxLength:number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

  return (
    <section
      className={`w-full h-screen ${josefinSans.className}`}
      style={{
        backgroundImage: "url('/images/film.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0  bg-black bg-opacity-20 flex flex-col justify-center items-center text-center text-white ">
        <div className="mt-20">
          <h4
            className={`text-5xl md:text-5xl font-bold mb-4 leading-tight ${josefinSans.className}`}
          >
            Curious what your review is really <br /> saying? Drop it and Let’s
            unveil <br /> the sentiment magic!
          </h4>
          <button
            className="bg-[#08D4F8] hover:bg-[#07B0D4] transition-colors duration-300 px-6 py-2 text-lg font-semibold rounded-md"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>

        <div className="flex justify-center items-center space-x-4 mt-8 mx-10">
          <button
            className="flex justify-center items-center rounded-full border-2 border-[#08D4F8] p-2 transition-all duration-300 active:scale-110 cursor-pointer"
            onClick={prevReview}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#08D4F8] cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex space-x-6 p-4 justify-center items-center">
            {reviewsList&&
              reviewsList.slice(currentReviewIndex, currentReviewIndex + 2).map((item) => (
                <div
                key={item.id}
                  className="backdrop-blur-lg p-4 rounded-lg shadow-lg text-black text-left w-96 h-72"
                  style={{ backgroundColor: "rgba(217, 217, 217, 0.5)" }}
                >
                  <blockquote
                    className={`italic mb-4 ${josefinSans.className}`}
                  >{`"${truncateText(item.review, 250)}"`}</blockquote>
                  <p className={`font-bold ${josefinSans.className}`}>
                    {item.title}
                  </p>
                  <p className={`font-bold ${josefinSans.className}`}>
                    Confidence Score: {(item.confidence * 100).toFixed(2)}
                  </p>
                  <p className={`font-bold ${josefinSans.className}`}>
                    Sentiment: {item.sentiment}
                  </p>
                </div>
              ))}
          </div>

          <button
            className="flex justify-center items-center rounded-full border-2 border-[#08D4F8] p-2 transition-all duration-300  active:scale-110 cursor-pointer"
            onClick={nextReview}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#08D4F8] cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
