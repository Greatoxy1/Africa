import AmazonProduct from "../components/AmazonProduct";

function Article() {
  const products = [
    { title: "4 in 1 Car Charger", link: "https://amzn.to/4uyohzO" },
    { title: "Bluetooth Headphones", link: "https://amzn.to/4rwJur4" },
    { title: "XIAOMI REDMI A5", link: "https://amzn.to/4ry1ktN" },
  ];

  return (
    <div>
      <h1>Top Tech Gadgets Released</h1>
      <p>Check out the latest gadgets that are trending this month.</p>

      {/* All products in one line */}
      <AmazonProduct products={products} />

      <p>These gadgets are recommended by experts for tech enthusiasts.</p>
    </div>
  );
}

export default Article;