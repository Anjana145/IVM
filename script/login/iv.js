    let editingRow = null; // Store the row currently being edited

    // Function to open the edit modal and populate it with the row's data
    function editItem(button) {
        // Get the row that the button belongs to
        editingRow = button.closest('tr');
        
        // Get the current item details from the row
        const itemName = editingRow.cells[0].innerText;
        const itemQuantity = editingRow.cells[1].innerText;
        const itemPrice = editingRow.cells[2].innerText.replace('$', ''); // Remove $ for input

        // Set the values in the edit form
        document.getElementById('item-name').value = itemName;
        document.getElementById('item-quantity').value = itemQuantity;
        document.getElementById('item-price').value = itemPrice;

        // Show the modal
        document.getElementById('edit-modal').classList.remove('hidden');
    }

    // Function to close the modal
    function closeModal() {
        document.getElementById('edit-modal').classList.add('hidden');
    }

    // Handle the form submission (Save edited values)
    document.getElementById('edit-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get the updated values from the form
        const newItemName = document.getElementById('item-name').value;
        const newItemQuantity = document.getElementById('item-quantity').value;
        const newItemPrice = document.getElementById('item-price').value;

        // Update the row with the new values
        editingRow.cells[0].innerText = newItemName;
        editingRow.cells[1].innerText = newItemQuantity;
        editingRow.cells[2].innerText = `$${newItemPrice}`;
        editingRow.cells[3].innerText = `$${(newItemQuantity * newItemPrice).toFixed(2)}`;

        // Close the modal
        closeModal();
    });
