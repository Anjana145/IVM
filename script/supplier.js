let suppliers = [];  // Array to hold supplier data

// Function to open the Add Supplier form
function openAddSupplierForm() {
    document.getElementById('add-supplier-form-container').classList.remove('hidden');
}

// Function to close the Add Supplier form
function closeAddSupplierForm() {
    document.getElementById('add-supplier-form-container').classList.add('hidden');
}

// Handle Add Supplier form submission
document.getElementById('add-supplier-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the supplier data from the form
    const supplierName = document.getElementById('supplier-name').value;
    const supplierContact = document.getElementById('supplier-contact').value;
    const supplierEmail = document.getElementById('supplier-email').value;

    // Basic validation
    if (!supplierName || !supplierContact || !supplierEmail) {
        alert("Please fill all fields.");
        return;
    }

    // Add supplier to the suppliers array
    const newSupplier = {
        id: Date.now(),
        name: supplierName,
        contact: supplierContact,
        email: supplierEmail
    };
    suppliers.push(newSupplier);

    // Update the supplier table
    renderSupplierTable();

    // Close the form and reset the form fields
    closeAddSupplierForm();
    document.getElementById('add-supplier-form').reset();
});

// Function to render the supplier table
function renderSupplierTable() {
    const tableBody = document.getElementById('supplier-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';  // Clear existing rows

    suppliers.forEach(supplier => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td class="py-2 px-4">${supplier.name}</td>
            <td class="py-2 px-4">${supplier.contact}</td>
            <td class="py-2 px-4">${supplier.email}</td>
            <td class="py-2 px-4 text-center">
                <button class="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600" onclick="editSupplier(${supplier.id})">Edit</button>
                <button class="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onclick="deleteSupplier(${supplier.id})">Delete</button>
            </td>
        `;
    });
}

// Function to edit a supplier
function editSupplier(id) {
    const supplier = suppliers.find(s => s.id === id);
    if (supplier) {
        document.getElementById('supplier-name').value = supplier.name;
        document.getElementById('supplier-contact').value = supplier.contact;
        document.getElementById('supplier-email').value = supplier.email;

        // Remove the supplier from the array (to be updated)
        suppliers = suppliers.filter(s => s.id !== id);

        renderSupplierTable();
        openAddSupplierForm();
    }
}

// Function to delete a supplier
function deleteSupplier(id) {
    suppliers = suppliers.filter(s => s.id !== id);
    renderSupplierTable();
}
