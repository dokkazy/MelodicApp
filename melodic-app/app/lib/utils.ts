export const formatPrice = (price: number) => {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const checkIsImg = (url: string) => {
  // return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  return url.includes("/")
}