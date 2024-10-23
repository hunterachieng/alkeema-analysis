"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";

const josefinSans = Josefin_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const ThankYouPositive = () => {
  const searchParams = useSearchParams();
  const confidence = searchParams.get("confidence");
  const sentiment = searchParams.get("sentiment");
  const router = useRouter();

  const isLoaded = confidence && sentiment;

  const handleBackClick = () => {
    router.push("/review");
  };

  return (
    <div
      className={`h-screen flex flex-col justify-center items-center bg-[#2f2e2e] ${josefinSans.className}  bg-opacity-20 `}
      style={{
        backgroundImage: "url('/images/bowl-popcorn.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="absolute right-[200px] top-[-4] h-[350px] w-1 bg-[#08D4F8]"></div>
<div>
  
</div>
      <div className="relative w-full flex items-center justify-center z-10">
        <div
          onClick={handleBackClick}
          className="absolute left-20  w-10 h-10 bg-[#08D4F8] rounded-full flex items-center justify-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
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
        </div>

      
      </div>
   <div className="z-10 flex-col justify-center items-center mx-auto bg-white bg-opacity-10 p-10 rounded-lg">
   <h1 className="text-4xl mb-4 font-bold text-center">
          Thank you for your feedback!
        </h1>
      <Image
        src="/images/thankyou.png"
        alt="Thank You for Your Feedback"
        width={400}
        height={500}
        className="mb-8  mx-auto"
      />
      {isLoaded ? (
        <p className="text-3xl text-left px-4 text-white z-10">
          Our analysis shows that your sentiment aligns with the <br />
          movie&apos;s magic, with a confidence score of{" "}
          <span className="text-[#08D4F8]">{confidence}%</span>
          . Your <br /> feedback helps fellow film lovers discover great cinema!
        </p>
      ) : (
        <p className="text-xl text-center">Loading your feedback...</p>
      )}
   </div>
    </div>
  );
};

export default ThankYouPositive;
