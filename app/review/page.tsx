'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { sendReview } from '../util/review'; 
import { Josefin_Sans } from 'next/font/google'; 

const josefinSans = Josefin_Sans({
  weight: ['400', '700'],  
  subsets: ['latin'],     
});

const ReviewForm = () => {
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true); 
    setErrorMessage(''); 

    if (!title.trim() || !review.trim()) {
      setErrorMessage("Please fill in both the title and the review.");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await sendReview(review); // Make sure sendReview accepts an object if required

      if (result?.sentiment) {
          const sentiment = result.sentiment.toLowerCase();
          const confidence = (result.confidence * 100).toFixed(2); // Convert to percentage

          // Use a template string for the URL
          const pathname = sentiment === 'positive' ? '/thank-you-positive' : '/thank-you-negative';
          const query = `?confidence=${confidence}&sentiment=${sentiment}`;
          
          setTimeout(() => {
              router.push(pathname + query); // Concatenate the pathname and query
          }, 2000); 
      } else {
          setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setErrorMessage("An error occurred while submitting your review. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push('/landingPage');
  };

  return (
    <div className={`bg-black bg-opacity-60 h-screen flex items-center justify-center ${josefinSans.className}`}
      style={{ backgroundImage: "url('/images/background.png')", backgroundSize: 'cover' }}>
      
      <div
        onClick={handleBack}
        className="absolute top-4 left-4 w-10 h-10 bg-[#08D4F8] rounded-full flex items-center justify-center cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      
      {/* Adjusting the form container width and border radius */}
      <div className="backdrop-blur-lg bg-white bg-opacity-70 p-8 rounded-2xl max-w-md w-full relative"> {/* Changed to max-w-md */}
        <h2 className={`text-xl font-bold mb-4 text-center ${josefinSans.className}`}>
          Join the conversation! Share your review and let's explore it together.
        </h2>
        <p className={`mb-4 text-left ${josefinSans.className}`}>
          Please take a moment to evaluate and tell us what you think about the movie you watched.
        </p>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className={`w-full p-2 border border-gray-300 rounded-md ${josefinSans.className} placeholder-black placeholder-opacity-100`} // Changed rounded to rounded-md
            placeholder="Type movie title..." 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ backgroundColor: '#D9D9D9' }}
          />
          <textarea
            className={`w-full p-2 border border-gray-300 rounded-md ${josefinSans.className} placeholder-black placeholder-opacity-100`} // Changed rounded to rounded-md
            placeholder="Type your movie review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            style={{ backgroundColor: '#D9D9D9', height: '130px', resize: 'none' }}
          ></textarea>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#08D4F8] text-white px-6 py-2 rounded-lg hover:bg-[#07B0D4] transition-shadow duration-300 shadow-md shadow-black hover:shadow-lg text-lg"
              disabled={isSubmitting}      
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
