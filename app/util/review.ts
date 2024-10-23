export const sendReview = async ({title, review}:{title:string,review: string}) => {
  try {
    const response = await fetch(
      "http://ec2-3-89-157-46.compute-1.amazonaws.com:7070/predict", 
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({title, review }),
      }
    );

    const data = await response.json();
    return data; 
  } catch (error) {
    return { error: (error as Error).message };
  }
};


export const getReview = async () => {
  try {
    const response = await fetch(
      "http://ec2-3-89-157-46.compute-1.amazonaws.com:7070/predict", 
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data; 
  } catch (error) {
    return { error: (error as Error).message };
  }
};
