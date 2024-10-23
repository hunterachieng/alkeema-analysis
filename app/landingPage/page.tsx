'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { Josefin_Sans } from 'next/font/google'; 
import { getReview } from "../util/review";

const josefinSans = Josefin_Sans({
  weight: ['400', '700'],  
  subsets: ['latin'],     
});

const reviews = [
  {
    text: "An absolute masterpiece! The storyline was captivating, and the characters were well developed. I found myself completely immersed from beginning to end. Definitely a movie I would watch again!",
    movie: "Inception (2010)",
    score: "91.56%",
    sentiment: "Positive",
  },
  {
    text: "I was so disappointed with this movie. I struggled to stay awake during most of it. The characters were one-dimensional, and the acting was lackluster at best. A complete waste of time.",
    movie: "The Last Airbender (2010)",
    score: "90.14%",
    sentiment: "Negative",
  },
];

const HeroSection = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const router = useRouter(); 

  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const currentReview = reviews[currentReviewIndex];
  const nextReviewCard = reviews[(currentReviewIndex + 1) % reviews.length];

  const handleGetStarted = () => {
    router.push("/review"); 
  };

  useEffect(() => {
    (async()=>{
      const result = await getReview();
     console.log({result});
     

    })()
  }, [])

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
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white ">
        <div className="mt-20">
          <h4 className={`text-5xl md:text-5xl font-bold mb-4 leading-tight ${josefinSans.className}`}>
            Curious what your review is really <br /> saying? Drop it and Let’s unveil <br /> the sentiment magic!
          </h4>
          <button
            className="bg-[#08D4F8] hover:bg-[#07B0D4] transition-colors duration-300 px-6 py-2 text-lg font-semibold rounded-md"
            onClick={handleGetStarted} 
          >
            Get Started
          </button>
        </div>

        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            className="flex justify-center items-center rounded-full border-2 border-[#08D4F8] p-2 transition-all duration-300 active:scale-110"
            onClick={prevReview}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#08D4F8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex space-x-6 p-4 ">
            <div
              className="backdrop-blur-lg p-4 rounded-lg shadow-lg text-black text-left max-w-sm max-h-60"
              style={{ backgroundColor: "rgba(217, 217, 217, 0.5)" }}
            >              
              <blockquote className={`italic mb-4 ${josefinSans.className}`}>{`"${nextReviewCard.text}"`}</blockquote>
              <p className={`font-bold ${josefinSans.className}`}>{nextReviewCard.movie}</p>
              <p className={`font-bold ${josefinSans.className}`}>Confidence Score: {nextReviewCard.score}</p>
              <p className={`font-bold ${josefinSans.className}`}>Sentiment: {nextReviewCard.sentiment}</p>
            </div>

            <div
              className="backdrop-blur-lg p-4 rounded-lg shadow-lg text-black text-left max-w-sm"
              style={{ backgroundColor: "rgba(217, 217, 217, 0.5)" }}
            >              
              <blockquote className={`italic mb-4 ${josefinSans.className}`}>{`"${currentReview.text}"`}</blockquote>
              <p className={`font-bold ${josefinSans.className}`}>{currentReview.movie}</p>
              <p className={`font-bold ${josefinSans.className}`}>Confidence Score: {currentReview.score}</p>
              <p className={`font-bold ${josefinSans.className}`}>Sentiment: {currentReview.sentiment}</p>
            </div>
          </div>
          
          <button
            className="flex justify-center items-center rounded-full border-2 border-[#08D4F8] p-2 transition-all duration-300  active:scale-110"
            onClick={nextReview}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#08D4F8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
