const BAKESY_API_URL = "https://api.bakesy.app/graphql";
const BAKERY_SLUG = "baileys-bakery";

interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

export async function fetchBakesy<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const response = await fetch(BAKESY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-app-version": "3.2.11",
      "x-platform": "Web",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`Bakesy API error: ${response.status}`);
  }

  const result: GraphQLResponse<T> = await response.json();

  if (result.errors?.length) {
    throw new Error(result.errors[0].message);
  }

  return result.data;
}

export { BAKERY_SLUG };
