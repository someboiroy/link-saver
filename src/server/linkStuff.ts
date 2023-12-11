import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

interface HuggingFaceModelData {
  inputs: string | string[];
  parameters: {
    candidate_labels: string[]; // array of strings, max length 10
    multi_label?: boolean; // Default: false
    options?: {
      use_cache?: boolean; // Default: true
      wait_for_model?: boolean; // Default: false
    };
  };
}

export interface HuggingFaceModelResponse {
  sequence: string;
  labels: string[];
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

  console.log(article);

  return {
    title: article?.title ?? "",
    content: article?.textContent.trim() ?? "",
  };
}

export async function classifyAndTitleLink(
  url: string,
  categories: string[],
): Promise<{ label: string; title: string }> {
  const html = await fetchWebPage(url);
  const text = getPlainTextFromHTML(html!);

  const queryData: HuggingFaceModelData = {
    inputs: text.content,
    parameters: {
      candidate_labels: categories,
      multi_label: true,
      options: { wait_for_model: true },
    },
  };

  const result = await queryModel(queryData);

  console.log(result);
  // return the label with the highest score
  return {
    label: result.labels[0] ?? "",
    title: text.title,
  };
}

async function queryModel(data: HuggingFaceModelData) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/MoritzLaurer/DeBERTa-v3-base-mnli-fever-anli",
    {
      headers: {
        Authorization: "Bearer " + process.env.HUGGINGFACE_BEARER_TOKEN,
      },
      method: "POST",
      body: JSON.stringify(data),
    },
  );

  const result = (await response.json()) as HuggingFaceModelResponse;

  return result;
}
