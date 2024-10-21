import Image from 'next/image';
import { Josefin_Sans } from 'next/font/google'; // Import the font

// Configure the font
const josefinSans = Josefin_Sans({
  weight: ['400', '700'],  // Specify font weights
  subsets: ['latin'],      // Specify the subset
});

const ThankYouPositive = () => {
  return (
    <div className={`h-screen flex flex-col justify-center items-center bg-white ${josefinSans.className}`}> {/* Apply the font class here */}
      <h1 className="text-2xl font-bold mb-4">Thank you for your feedback!</h1>
      <Image
        src="/images/thankyou.png"
        alt="Thank You for Your Feedback"
        width={500}
        height={500}
        className="mb-8"
      />
      <p className="text-lg text-center">
        Our analysis shows that your sentiment aligns with the <br/> movie's magic, with a confidence score of 90.89%. 
        Your <br/> feedback helps fellow film lovers discover great cinema!
      </p>
    </div>
  );
};

export default ThankYouPositive;
