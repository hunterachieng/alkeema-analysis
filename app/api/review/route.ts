export async function POST(request: Request) {
  const body = await request.json();

  try {
    const response = await fetch(
      "http://ec2-3-89-157-46.compute-1.amazonaws.com:7070/predict",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 201,
    });
  } catch (error) {
    return new Response((error as Error).message, {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const response = await fetch(
      "http://ec2-3-89-157-46.compute-1.amazonaws.com:7070/predict"
    );

    const data = await response.json();



    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    return new Response((error as Error).message, {
      status: 500,
    });
  }
}
