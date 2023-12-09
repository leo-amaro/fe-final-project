// Function to get URL parameters
const getUrlParameter = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

// Get the order data and total from the URL
const orderDataString = getUrlParameter("orderData");
const total = getUrlParameter("total");

// Parse the order data string to an array
const orderData = JSON.parse(orderDataString);

// Display the order data
orderData.forEach((item) => {
  const img = document.createElement("img");
  img.src = `images/${item.itemId}.jpg`;
  img.alt = item.itemDetails;
  document.body.appendChild(img);
  document.write(`<p>Order Number: ${item.orderNumber}</p>`);
  document.write(`<p>Item: ${item.itemDetails}</p>`);
});
document.write(`<p>Total Amount: $${total}</p>`);
