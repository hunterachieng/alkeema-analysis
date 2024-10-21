'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Josefin_Sans } from 'next/font/google'; 

const josefinSans = Josefin_Sans({
  weight: ['400', '700'],  
  subsets: ['latin'],     
});

const ReviewForm = () => {
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    router.push('/thank-you-positive');  
  };

  return (
    <div 
      className="bg-black bg-opacity-60 h-screen flex items-center justify-center" 
      style={{ backgroundImage: "url('/images/background.png')", backgroundSize: 'cover' }} 
    >
      <div className={`backdrop-blur-lg p-8 rounded-lg shadow-lg text-white max-w-sm w-full ${josefinSans.className}`} 
        style={{ backgroundColor: "rgba(217, 217, 217, 0.5)" }} 
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Join the conversation! Share your review and let's explore it together.
        </h2>
        <p className="mb-4  text-left">
          Please take a moment to evaluate and <br/> tell us what you think about the movie <br /> you watched.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded text-black" 
            placeholder="Type movie title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="w-full p-2 border border-gray-300 rounded text-black" 
            placeholder="Type your movie review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
