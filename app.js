// Listen for submit
document
  .getElementById("loan-form")
  .addEventListener("submit", calculateResults);

// Calculate Results
function calculateResults(e) {
  console.log("Calculating...");

  // UI Vars
  const UIamount = document.getElementById("amount");
  const UIinterest = document.getElementById("interest");
  const UIyears = document.getElementById("years");
  const UImonthlyPayment = document.getElementById("monthly-payment");
  const UItotalPayment = document.getElementById("total-payment");
  const UItotalInterest = document.getElementById("total-interest");

  const principal = parseFloat(UIamount.value);
  const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
  const calculatedPayments = parseFloat(UIyears.value) * 12;

  // Compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    UImonthlyPayment.value = monthly.toFixed(2);
    UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
    UItotalInterest.value = (monthly * calculatedPayments - principal).toFixed(
      2
    );
  } else {
    showError("Please check you numbers");
  }

  e.preventDefault();
}

// Show Error
function showError(error) {
  // Create a div
  const errorDiv = document.createElement("div");

  // Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class
  errorDiv.className = "alert alert-danger";

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear Error
function clearError() {
  document.querySelector(".alert").remove();
}
