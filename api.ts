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

export const targetCrawl = async ({ queryKey }: QueryFunctionContext) => {
  const BASE_URL =
    "https://redsky.target.com/redsky_aggregations/v1/web/plp_search_v2?key=9f36aeafbe60771e321a7cc95a78140772ab3e96&channel=WEB&count=24&default_purchasability_filter=true&page=0&pricing_store_id=2790&visitor_id=018504CC7C670201BC055C8F0F4E0420";
  const response = await fetch(`${BASE_URL}&keyword=${queryKey[1]}`);
  const json = await response.json();
  const products = json.data.search.products;
  if (products.length === 0) {
    return { market: "target" };
  }
  const product = products[0];
  console.log(product.price);
  return {
    market: "target",
    title: product.item.product_description.title,
    link: product.item.enrichment.buy_url,
    img_src: product.item.enrichment.images.primary_image_url,
    price: product.price.formatted_current_price,
  };
};
