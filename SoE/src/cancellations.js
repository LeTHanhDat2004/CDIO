// Menu interaction enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Highlight current page in menu
    const currentPage = window.location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('.user-menu a');
    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });

    // Smooth hover transition for menu
    const userProfile = document.querySelector('.user-profile');
    const userMenu = document.querySelector('.user-menu');
    let timeoutId;

    userProfile.addEventListener('mouseenter', () => {
        clearTimeout(timeoutId);
        userMenu.style.display = 'block';
        setTimeout(() => {
            userMenu.style.opacity = '1';
            userMenu.style.visibility = 'visible';
            userMenu.style.transform = 'translateY(0)';
        }, 50);
    });

    userProfile.addEventListener('mouseleave', () => {
        timeoutId = setTimeout(() => {
            userMenu.style.opacity = '0';
            userMenu.style.visibility = 'hidden';
            userMenu.style.transform = 'translateY(10px)';
            setTimeout(() => {
                if (userMenu.style.visibility === 'hidden') {
                    userMenu.style.display = 'none';
                }
            }, 300);
        }, 200);
    });
});

// Logout handler
function handleLogout() {
    // Add logout logic here
    alert('Logging out...');
    window.location.href = 'login.html';
}

// Sample data for cancelled orders (in a real application, this would come from a backend)
let cancellations = [
    {
        orderNumber: "ORD123456",
        date: "2024-03-05",
        reason: "Changed my mind",
        status: "approved",
        comments: "Order cancelled before processing"
    },
    {
        orderNumber: "ORD123457",
        date: "2024-03-04",
        reason: "Wrong item",
        status: "pending",
        comments: "Ordered incorrect size"
    }
];

// Function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Function to display cancellation history
function displayCancellations() {
    const cancellationList = document.querySelector('.cancellation-list');
    cancellationList.innerHTML = '';

    if (cancellations.length === 0) {
        cancellationList.innerHTML = '<p class="no-cancellations">No cancellation history found.</p>';
        return;
    }

    cancellations.forEach(cancellation => {
        const cancellationItem = document.createElement('div');
        cancellationItem.className = 'cancellation-item';
        cancellationItem.innerHTML = `
            <div class="order-info">
                <span class="order-number">#${cancellation.orderNumber}</span>
                <span class="order-date">${formatDate(cancellation.date)}</span>
            </div>
            <div class="reason">
                <strong>Reason:</strong> ${cancellation.reason}
                ${cancellation.comments ? `<br><small>${cancellation.comments}</small>` : ''}
            </div>
            <div class="cancellation-status">
                <span class="status-badge status-${cancellation.status}">
                    ${cancellation.status.charAt(0).toUpperCase() + cancellation.status.slice(1)}
                </span>
            </div>
        `;
        cancellationList.appendChild(cancellationItem);
    });
}

// Function to handle form submission
function handleCancellationSubmit(event) {
    event.preventDefault();

    // Get form values
    const orderNumber = document.getElementById('orderNumber').value;
    const reason = document.getElementById('cancellationReason').value;
    const comments = document.getElementById('additionalComments').value;

    // Create new cancellation object
    const newCancellation = {
        orderNumber: orderNumber,
        date: new Date().toISOString().split('T')[0],
        reason: document.getElementById('cancellationReason').options[document.getElementById('cancellationReason').selectedIndex].text,
        status: 'pending',
        comments: comments
    };

    // Add to cancellations array (in a real application, this would be sent to a backend)
    cancellations.unshift(newCancellation);

    // Update display
    displayCancellations();

    // Reset form
    event.target.reset();

    // Show success message
    alert('Cancellation request submitted successfully!');
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Display existing cancellations
    displayCancellations();

    // Add form submit handler
    const cancellationForm = document.getElementById('cancellationForm');
    if (cancellationForm) {
        cancellationForm.addEventListener('submit', handleCancellationSubmit);
    }
}); 