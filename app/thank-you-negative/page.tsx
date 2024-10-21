import Image from 'next/image';
import { Josefin_Sans } from 'next/font/google'; 

const josefinSans = Josefin_Sans({
  weight: ['400', '700'],  
  subsets: ['latin'],      
});

const ThankYouNegative = () => {
  return (
    <div className={`h-screen flex flex-col justify-center items-center bg-white ${josefinSans.className}`}> {/* Apply the font class here */}
      <h1 className="text-2xl font-bold mb-4">Thank you for your feedback!</h1>
      <Image
        src="/images/sadreview.png"
        alt="Thank You for Your Feedback"
        width={500}
        height={500}
        className="mb-8"
      />
      <p className="text-lg text-center">
      Our analysis shows a strong sentiment against the <br />
      film, with a confidence score of 92.13%. Your insights <br />
      helps others make informed movie choices!
      </p>
    </div>
  );
};

export default ThankYouNegative;
