let currentItem = {}; // Store the item currently being purchased

// Function to open the purchase modal and populate it with the item data
function purchaseItem(button) {
    // Get the row that the button belongs to
    const row = button.closest('tr');

    // Get the current item details from the row
    const itemName = row.cells[0].innerText;
    const itemQuantity = row.cells[1].innerText;
    const itemPrice = row.cells[2].innerText.replace('$', ''); // Remove $ for input

    // Set the current item data
    currentItem = {
        name: itemName,
        available: itemQuantity,
        price: parseFloat(itemPrice)
    };

    // Set the modal fields
    document.getElementById('purchase-quantity').value = 1; // Default to purchasing 1 item
    document.getElementById('total-cost').value = `$${currentItem.price}`;

    // Show the modal
    document.getElementById('purchase-modal').classList.remove('hidden');
}

// Function to close the purchase modal
function closeModal() {
    document.getElementById('purchase-modal').classList.add('hidden');
}

// Handle the purchase form submission
document.getElementById('purchase-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the purchased quantity from the form
    const purchasedQuantity = parseInt(document.getElementById('purchase-quantity').value);

    // Check if the requested quantity is available
    if (purchasedQuantity > currentItem.available) {
        alert('Not enough stock available!');
        return;
    }

    // Calculate the total cost
    const totalCost = currentItem.price * purchasedQuantity;

    // Update the inventory table (Reduce the available quantity)
    const rows = document.querySelectorAll('#inventory-table tbody tr');
    rows.forEach(row => {
        const itemName = row.cells[0].innerText;
        if (itemName === currentItem.name) {
            const availableCell = row.cells[1];
            const newAvailableQuantity = currentItem.available - purchasedQuantity;
            availableCell.innerText = newAvailableQuantity;
        }
    });

    // Show a success message and close the modal
    alert(`Successfully purchased ${purchasedQuantity} ${currentItem.name}(s) for $${totalCost.toFixed(2)}!`);
    closeModal();
});

// Update the total cost dynamically based on the quantity input
document.getElementById('purchase-quantity').addEventListener('input', function() {
    const purchasedQuantity = parseInt(this.value);
    const totalCost = currentItem.price * purchasedQuantity;
    document.getElementById('total-cost').value = `$${totalCost.toFixed(2)}`;
});
