import { QueryFunctionContext } from "@tanstack/react-query";
import * as cheerio from "cheerio";

export const amazonCrawl = async ({ queryKey }: QueryFunctionContext) => {
  const BASE_URL = "https://www.amazon.com";
  const response = await fetch(`${BASE_URL}/s?k=${queryKey[1]}&s=review-rank`);
  const text = await response.text();
  const root = cheerio.load(text);
  const item_html = root(".s-result-item.s-asin:not(AdHolder)").first().html();
  if (!item_html) {
    return { market: "amazon.com" };
  }
  const item = cheerio.load(item_html);
  const title = item("h2").text().trim()!;
  const link = BASE_URL + item(".s-product-image-container a").attr("href")!;
  const img_src = item(".s-product-image-container img").attr("src")!;
  const price = item(".a-price .a-offscreen").first().text()!;
  return { market: "amazon.com", title, link, img_src, price };
};
