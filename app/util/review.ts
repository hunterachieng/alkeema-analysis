export const sendReview = async (review: string) => {
  try {
    const response = await fetch(
      "http://ec2-35-172-140-120.compute-1.amazonaws.com:7070/predict", 
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ review }),
      }
    );

    const data = await response.json();
    return data; 
  } catch (error) {
    return { error: (error as Error).message };
  }
};
