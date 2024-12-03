let currentSaleItem = {}; // Store the item currently being sold

        // Function to open the sale modal and populate it with item data
        function sellItem(button) {
            // Get the row that the button belongs to
            const row = button.closest('tr');

            // Get the current item details from the row
            const itemName = row.cells[0].innerText;
            const itemQuantity = row.cells[1].innerText;
            const itemPrice = row.cells[2].innerText.replace('$', ''); // Remove $ for calculation

            // Set the current item data
            currentSaleItem = {
                name: itemName,
                available: itemQuantity,
                price: parseFloat(itemPrice)
            };

            // Set the modal fields
            document.getElementById('sale-quantity').value = 1; // Default to selling 1 item
            document.getElementById('total-sale-cost').value = `$${currentSaleItem.price}`;

            // Show the modal
            document.getElementById('sale-modal').classList.remove('hidden');
        }

        // Function to close the sale modal
        function closeSaleModal() {
            document.getElementById('sale-modal').classList.add('hidden');
        }

        // Handle the sale form submission
        document.getElementById('sale-form').addEventListener('submit', function(event) {
            event.preventDefault();

            // Get the sold quantity from the form
            const soldQuantity = parseInt(document.getElementById('sale-quantity').value);

            // Check if the requested quantity is available for sale
            if (soldQuantity > currentSaleItem.available) {
                alert('Not enough stock available to sell!');
                return;
            }

            // Calculate the total sale amount
            const totalSaleAmount = currentSaleItem.price * soldQuantity;

            // Update the inventory table (Reduce available quantity)
            const rows = document.querySelectorAll('#sales-table tbody tr');
            rows.forEach(row => {
                const itemName = row.cells[0].innerText;
                if (itemName === currentSaleItem.name) {
                    const availableCell = row.cells[1];
                    const newAvailableQuantity = currentSaleItem.available - soldQuantity;
                    availableCell.innerText = newAvailableQuantity;
                }
            });

            // Append the sold item to the Sales Record table
            const salesRecordTable = document.getElementById('sold-items-table').getElementsByTagName('tbody')[0];
            const newRow = salesRecordTable.insertRow();
            newRow.insertCell(0).innerText = currentSaleItem.name;
            newRow.insertCell(1).innerText = soldQuantity;
            newRow.insertCell(2).innerText = `$${totalSaleAmount.toFixed(2)}`;
            newRow.insertCell(3).innerText = new Date().toLocaleString();

            // Show a success message and close the modal
            alert(`Sale recorded: Sold ${soldQuantity} ${currentSaleItem.name}(s) for $${totalSaleAmount.toFixed(2)}`);
            closeSaleModal();
        });

        // Update the total sale amount dynamically based on the quantity input
        document.getElementById('sale-quantity').addEventListener('input', function() {
            const soldQuantity = parseInt(this.value);
            const totalSaleAmount = currentSaleItem.price * soldQuantity;
            document.getElementById('total-sale-cost').value = `$${totalSaleAmount.toFixed(2)}`;
        });