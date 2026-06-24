fetch("/products")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("products");

    data.forEach((product) => {
      container.innerHTML += `

<div class="card">

<h3>${product.name}</h3>

<p>Price: Rs ${product.price}</p>

<p>${product.description}</p>

<button onclick="addToCart(${product.id})">
Add To Cart
</button>

<a href="/product/${product.id}">
View Details
</a>

</div>

`;
    });
  });

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(id);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added To Cart");
}