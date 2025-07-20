// product.js

// Sample product data (replace with AJAX/fetch in prod)
const products = [
  { id: 1,  name: "T‑Shirt",        price: 19.99,  category: "clothing",    rating: 4, image: "/img/tshirt.jpg" },
  { id: 2,  name: "Sneakers",       price: 59.99,  category: "shoes",       rating: 5, image: "/img/sneakers.jpg" },
  { id: 3,  name: "Jeans",          price: 49.99,  category: "clothing",    rating: 3, image: "/img/jeans.jpg" },
  { id: 4,  name: "Jacket",         price: 89.99,  category: "clothing",    rating: 5, image: "/img/jacket.jpg" },
  { id: 5,  name: "Dress",          price: 69.99,  category: "clothing",    rating: 4, image: "/img/dress.jpg" },
  { id: 6,  name: "Hoodie",         price: 39.99,  category: "clothing",    rating: 2, image: "/img/hoodie.jpg" },
  { id: 7,  name: "Socks",          price: 9.99,   category: "clothing",    rating: 5, image: "/img/socks.jpg" },
  { id: 8,  name: "Sweater",        price: 59.99,  category: "clothing",    rating: 4, image: "/img/sweater.jpg" },
  { id: 9,  name: "Skirt",          price: 39.99,  category: "clothing",    rating: 3, image: "/img/skirt.jpg" },
  { id: 10, name: "Belt",           price: 29.99,  category: "accessories", rating: 3, image: "/img/belt.jpg" },
  { id: 11, name: "Watch",          price: 199.99, category: "accessories", rating: 5, image: "/img/watch.jpg" },
  { id: 12, name: "Sunglasses",     price: 79.99,  category: "accessories", rating: 4, image: "/img/sunglasses.jpg" },
  { id: 13, name: "Scarf",          price: 24.99,  category: "accessories", rating: 3, image: "/img/scarf.jpg" },
  { id: 14, name: "Wallet",         price: 49.99,  category: "accessories", rating: 4, image: "/img/wallet.jpg" },
  { id: 15, name: "Backpack",       price: 89.99,  category: "accessories", rating: 5, image: "/img/backpack.jpg" },
  { id: 16, name: "Necklace",       price: 129.99, category: "accessories", rating: 4, image: "/img/necklace.jpg" },
  { id: 17, name: "Sandals",        price: 29.99,  category: "shoes",       rating: 3, image: "/img/sandals.jpg" },
  { id: 18, name: "Boots",          price: 99.99,  category: "shoes",       rating: 5, image: "/img/boots.jpg" },
  { id: 19, name: "Loafers",        price: 69.99,  category: "shoes",       rating: 4, image: "/img/loafers.jpg" },
  { id: 20, name: "Heels",          price: 89.99,  category: "shoes",       rating: 4, image: "/img/heels.jpg" },
  { id: 21, name: "Flip‑Flops",     price: 19.99,  category: "shoes",       rating: 3, image: "/img/flipflops.jpg" },
  { id: 22, name: "Running Shoes",  price: 79.99,  category: "shoes",       rating: 5, image: "/img/runningshoes.jpg" }
];


let filtered = [...products];
const perPage = 15;
let currentPage = 1;

// DOM elems
const grid = document.getElementById("productGrid");
const shownCount = document.getElementById("shownCount");
const pagination = document.getElementById("pagination");
const sortSelect = document.getElementById("sortSelect");

// Render funksioni
function render() {
  // Sort
  const sortVal = sortSelect.value;
  if (sortVal === "price-asc") filtered.sort((a,b)=>a.price-b.price);
  else if (sortVal === "price-desc") filtered.sort((a,b)=>b.price-a.price);
  else if (sortVal === "rating") filtered.sort((a,b)=>b.rating-a.rating);

  // Pagination slice
  const start = (currentPage-1)*perPage;
  const pageItems = filtered.slice(start, start+perPage);

  // Update count
  shownCount.textContent = `${start+1}–${start+pageItems.length} of ${filtered.length}`;

  // Dump HTML
  grid.innerHTML = pageItems.map(p=>`
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}">
      <h4>${p.name}</h4>
      <div class="price">€${p.price.toFixed(2)}</div>
      <div class="rating">${"★".repeat(p.rating)}${"☆".repeat(5-p.rating)}</div>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");

  // Build pagination buttons
  const pageCount = Math.ceil(filtered.length / perPage);
  pagination.innerHTML = "";
  for(let i=1;i<=pageCount;i++){
    const btn = document.createElement("button");
    btn.textContent = i;
    if(i===currentPage) btn.classList.add("active");
    btn.onclick = ()=>{ currentPage=i; render(); };
    pagination.appendChild(btn);
  }
}

// Kërkim, filtrim, sortim
sortSelect.addEventListener("change", ()=>{ currentPage=1; render(); });

window.addEventListener("DOMContentLoaded", ()=>{ render(); });

// Placeholder for cart
function addToCart(id) {
  alert("Added product "+id+" to cart.");
}
