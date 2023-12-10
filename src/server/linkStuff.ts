import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

interface HuggingFaceModelData {
  inputs: string;
  parameters: {
    candidate_labels: string[] | undefined;
  };
}

interface HuggingFaceModelResponse {
  sequence: string;
  label: string[];
  score: number[];
}

async function fetchWebPage(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.text();

    return data;
  } catch (error) {
    console.error("Error fetching web page:", error);
    return null;
  }
}

function getPlainTextFromHTML(html: string) {
  const doc = new JSDOM(html).window.document;
  const reader = new Readability(doc);
  const article = reader.parse();
  return article?.textContent.trim() ?? "";
}

export async function classifyLink(
  url: string,
  categories: string[] | undefined,
): Promise<string> {
  const html = await fetchWebPage(url);
  const text = getPlainTextFromHTML(html!);

  const queryData: HuggingFaceModelData = {
    inputs: text,
    parameters: { candidate_labels: categories },
  };

  const result = await queryModel(queryData);

  console.log(result);
  // return the label with the highest score
  return result.label[0] ?? "";
}

async function queryModel(data: HuggingFaceModelData) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/MoritzLaurer/DeBERTa-v3-base-mnli-fever-anli",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    },
  );

  const result = (await response.json()) as HuggingFaceModelResponse;

  return result;
}
