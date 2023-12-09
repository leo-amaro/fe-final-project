const menuItems = [
  { id: "espresso", name: "Espresso", price: 1.95 },
  { id: "latte", name: "Latte", price: 2.95 },
  { id: "cappuccino", name: "Cappuccino", price: 3.45 },
  { id: "coffee", name: "Drip Coffe", price: 1.75 },
  { id: "biscotti", name: "Biscotti", price: 1.95 },
  { id: "scone", name: "Scone", price: 2.95 },
  // Add more items as needed
];

// Function to preload images
const preloadImages = () => {
  menuItems.forEach((item) => {
    const img = new Image();
    img.src = `${item.id}.jpg`;
  });
};

// Function to create menu items dynamically
const createMenuItems = () => {
  const menuSection = document.getElementById("menu");
  menuItems.forEach((item) => {
    const img = document.createElement("img");
    img.src = `images/${item.id}.jpg`;
    img.alt = item.name;
    img.addEventListener("click", () => handleImageClick(item));

    // Add mouseover and mouseout event listeners
    img.addEventListener("mouseover", () => handleMouseOver(img, item));
    img.addEventListener("mouseout", () => handleMouseOut(img, item));
    menuSection.appendChild(img);
  });
};

// Function to handle mouseover event
const handleMouseOver = (img, item) => {
  img.src = `images/${item.id}_info.jpg`;
};

// Function to handle mouseout event
const handleMouseOut = (img, item) => {
  img.src = `images/${item.id}.jpg`;
};

// Example: Handle image click
const handleImageClick = (item) => {
  // Update order list and total
  const orderList = document.getElementById("order-list");
  const orderTotal = document.getElementById("order-total");

  // Check if the item is already in the order list
  const existingItem = Array.from(orderList.children).find(
    (li) => li.dataset.itemId === item.id
  );

  if (existingItem) {
    // Increment quantity if the item is already in the order
    const quantityElement = existingItem.querySelector(".quantity");
    const quantity = parseInt(quantityElement.textContent) + 1;
    quantityElement.textContent = quantity;
  } else {
    // Create a new list item for the order
    const li = document.createElement("li");
    li.dataset.itemId = item.id;
    li.innerHTML = `<span>${
      item.name
    }</span> <span class="quantity">1</span> x $${item.price.toFixed(2)}`;
    orderList.appendChild(li);
  }

  // Update the total
  const currentTotal = parseFloat(orderTotal.textContent);
  orderTotal.textContent = (currentTotal + item.price).toFixed(2);
};
document.getElementById("about-link").addEventListener("click", () => {
  // Toggle the visibility of the "About Us" section
  const aboutSection = document.getElementById("about");
  aboutSection.style.display =
    aboutSection.style.display === "none" ? "block" : "none";
});

// Example: Handle Clear Order button click
document.getElementById("clear-order").addEventListener("click", () => {
  // Clear order list and total
  const orderList = document.getElementById("order-list");
  const orderTotal = document.getElementById("order-total");
  orderList.innerHTML = "";
  orderTotal.textContent = "0.00";
});

// Function to handle Place Order button click
const handlePlaceOrderClick = () => {
  // Get the order list and total
  const orderList = Array.from(document.getElementById("order-list").children);
  const orderTotal = document.getElementById("order-total").textContent;

  // Create an array to hold the order data
  const orderData = [];

  // Add the order details to the orderData array
  orderList.forEach((item, index) => {
    const orderItem = {
      orderNumber: index + 1,
      itemId: item.dataset.itemId,
      itemDetails: item.innerHTML,
    };
    orderData.push(orderItem);
  });

  // Convert the orderData array to a JSON string
  const orderDataString = JSON.stringify(orderData);

  // Encode the orderDataString
  const orderDataEncoded = encodeURIComponent(orderDataString);

  // Redirect to the checkout page with the order data in the URL
  window.location.href = `checkout.html?orderData=${orderDataEncoded}&total=${orderTotal}`;
};

// Add event listener to Place Order button
document
  .getElementById("place-order")
  .addEventListener("click", handlePlaceOrderClick);

// Preload images and create menu items when the page loads
window.onload = () => {
  preloadImages();
  createMenuItems();
};
