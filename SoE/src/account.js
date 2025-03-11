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

// Account Section Navigation
document.addEventListener('DOMContentLoaded', () => {
    const accountMenu = document.querySelector('.account-menu');
    const sections = document.querySelectorAll('.account-section');
    const menuLinks = document.querySelectorAll('.account-menu a');

    // Handle menu item clicks
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);

            // Update active states
            menuLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });
});

// Form Submissions
document.addEventListener('DOMContentLoaded', () => {
    // Profile Form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add profile update logic here
            showNotification('Profile updated successfully!');
        });
    }

    // Security Form
    const securityForm = document.getElementById('securityForm');
    if (securityForm) {
        securityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (newPassword !== confirmPassword) {
                showNotification('Passwords do not match!', 'error');
                return;
            }

            // Add password update logic here
            showNotification('Security settings updated successfully!');
            securityForm.reset();
        });
    }

    // Preferences Form
    const preferencesForm = document.getElementById('preferencesForm');
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add preferences update logic here
            showNotification('Preferences updated successfully!');
        });
    }

    // Notifications Form
    const notificationsForm = document.getElementById('notificationsForm');
    if (notificationsForm) {
        notificationsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add notifications update logic here
            showNotification('Notification settings updated successfully!');
        });
    }
});

// Address Management
document.addEventListener('DOMContentLoaded', () => {
    const addAddressButton = document.querySelector('.add-address-button');
    if (addAddressButton) {
        addAddressButton.addEventListener('click', () => {
            // Add new address logic here
            showNotification('New address form will be displayed');
        });
    }

    // Handle address card actions
    const addressCards = document.querySelectorAll('.address-card');
    addressCards.forEach(card => {
        const editButton = card.querySelector('.edit-button');
        const deleteButton = card.querySelector('.delete-button');

        if (editButton) {
            editButton.addEventListener('click', () => {
                // Add edit address logic here
                showNotification('Edit address form will be displayed');
            });
        }

        if (deleteButton) {
            deleteButton.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this address?')) {
                    // Add delete address logic here
                    card.remove();
                    showNotification('Address deleted successfully!');
                }
            });
        }
    });
});

// Payment Methods Management
document.addEventListener('DOMContentLoaded', () => {
    const addPaymentButton = document.querySelector('.add-payment-button');
    if (addPaymentButton) {
        addPaymentButton.addEventListener('click', () => {
            // Add new payment method logic here
            showNotification('New payment method form will be displayed');
        });
    }

    // Handle payment card actions
    const paymentCards = document.querySelectorAll('.payment-card');
    paymentCards.forEach(card => {
        const editButton = card.querySelector('.edit-button');
        const deleteButton = card.querySelector('.delete-button');

        if (editButton) {
            editButton.addEventListener('click', () => {
                // Add edit payment method logic here
                showNotification('Edit payment method form will be displayed');
            });
        }

        if (deleteButton) {
            deleteButton.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this payment method?')) {
                    // Add delete payment method logic here
                    card.remove();
                    showNotification('Payment method deleted successfully!');
                }
            });
        }
    });
});

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Add styles dynamically
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '5px';
    notification.style.color = 'white';
    notification.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
    notification.style.zIndex = '1000';
    notification.style.animation = 'slideIn 0.3s ease-out';

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style); 