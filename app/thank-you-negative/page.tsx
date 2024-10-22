'use client'
import Image from 'next/image';
import { Josefin_Sans } from 'next/font/google'; 
import { useRouter, useSearchParams } from 'next/navigation';  

const josefinSans = Josefin_Sans({
  weight: ['400', '700'],  
  subsets: ['latin'],      
});

const ThankYouNegative = () => {
  const searchParams = useSearchParams(); 
  const confidence = searchParams.get('confidence'); 
  const sentiment = searchParams.get('sentiment'); 

  const isLoaded = confidence && sentiment;
  const router = useRouter(); 

  const handleBackClick = () => {
    router.push('/review'); 
  };

  return (
    <div className={`h-screen flex flex-col justify-center items-center bg-[#D9D9D9] ${josefinSans.className}`}>
      <div className="absolute right-[200px] top-[-4]  h-[350px] w-1 bg-[#F80808]"></div>
       <div className="relative w-full flex items-center justify-center">
  <div
    onClick={handleBackClick}
    className="absolute left-10 w-10 h-10 bg-[#08D4F8] rounded-full flex items-center justify-center cursor-pointer"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  </div>
  <h1 className="text-4xl mb-4 font-bold">Thank you for your feedback!</h1> 
</div>
      <Image
        src="/images/sadreview.png"
        alt="Thank You for Your Feedback"
        width={400}
        height={500}
        className="mb-8"
      />
      <p className="text-3xl text-left">
        Our analysis shows a strong sentiment against the <br />
        film, with a confidence score of <span className="text-[#F80808]">{confidence}%</span>. Your insights <br />
        help others make informed movie choices!
      </p>
    </div>
  );
};

export default ThankYouNegative;
