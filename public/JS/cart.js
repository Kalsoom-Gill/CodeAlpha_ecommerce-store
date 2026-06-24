fetch("/products")
  .then((res) => res.json())
  .then((products) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let html = "";

    let total = 0;

    cart.forEach((id) => {
      let product = products.find((p) => p.id == id);

      if (product) {
        html += `
<div class="card">
<h3>${product.name}</h3>
<p>Rs ${product.price}</p>
</div>
`;

        total += Number(product.price);
      }
    });

    document.getElementById("cart-items").innerHTML = html;

    document.getElementById("total").innerHTML = "Total: Rs " + total;
  });
