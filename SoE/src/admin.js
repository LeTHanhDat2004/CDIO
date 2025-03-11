document.addEventListener('DOMContentLoaded', function() {
    // Handle Delete Button
    const deleteBtn = document.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        const selectedAccounts = document.querySelectorAll('.account-item.selected');
        if (selectedAccounts.length === 0) {
            alert('Please select at least one account to delete');
            return;
        }
        
        if (confirm('Are you sure you want to delete the selected accounts?')) {
            selectedAccounts.forEach(account => {
                account.remove();
            });
        }
    });

    // Handle Add Button
    const addBtn = document.querySelector('.add-btn');
    addBtn.addEventListener('click', function() {
        // Show add account form (you can implement a modal or redirect to a new page)
        alert('Add new account functionality will be implemented here');
    });

    // Make account items selectable
    const accountItems = document.querySelectorAll('.account-item');
    accountItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('selected');
            updateSelectedState();
        });
    });

    // Update selected state
    function updateSelectedState() {
        const selectedAccounts = document.querySelectorAll('.account-item.selected');
        const deleteBtn = document.querySelector('.delete-btn');
        
        if (selectedAccounts.length > 0) {
            deleteBtn.classList.add('active');
        } else {
            deleteBtn.classList.remove('active');
        }
    }

    // Handle pagination
    const paginationLinks = document.querySelectorAll('.pagination a');
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            paginationLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Here you would typically fetch and display the corresponding page of accounts
            // For now, we'll just show an alert
            if (this.textContent !== '...') {
                alert('Loading page ' + this.textContent);
            }
        });
    });
}); 