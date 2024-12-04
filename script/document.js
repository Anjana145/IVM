
        // Function to open the upload modal
        function openUploadModal() {
            document.getElementById('upload-modal').classList.remove('hidden');
        }

        // Function to close the upload modal
        function closeUploadModal() {
            document.getElementById('upload-modal').classList.add('hidden');
        }

        // Handle document upload
        document.getElementById('upload-form').addEventListener('submit', function(event) {
            event.preventDefault();

            const documentName = document.getElementById('document-name').value;
            const uploadedBy = document.getElementById('uploaded-by').value;
            const documentFile = document.getElementById('document-file').files[0];
            const dateUploaded = new Date().toLocaleString();

            // Create a new row in the document table
            const tableBody = document.getElementById('document-table-body');
            const newRow = tableBody.insertRow();
            newRow.insertCell(0).innerText = documentName;
            newRow.insertCell(1).innerText = uploadedBy;
            newRow.insertCell(2).innerText = dateUploaded;
            newRow.insertCell(3).innerHTML = `<button class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onclick="deleteDocument(this)">Delete</button>`;

            // Close the modal after uploading
            closeUploadModal();

            // Clear the form fields
            document.getElementById('upload-form').reset();
        });

        // Function to delete a document row
        function deleteDocument(button) {
            const row = button.closest('tr');
            row.remove();
        }
 
