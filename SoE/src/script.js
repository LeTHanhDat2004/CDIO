// Toggle mobile menu
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Carousel functionality
function createCarousel(slideSelector) {
  const slides = document.querySelectorAll(slideSelector);
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  // Initialize the first slide
  showSlide(currentSlide);

  // Auto-slide every 5 seconds
  setInterval(nextSlide, 5000);

  // Return functions if needed elsewhere
  return { showSlide, nextSlide, prevSlide };
}

// Initialize both carousels
createCarousel(".slide");
createCarousel(".review-card");

// Set the countdown timer (e.g., 24 hours from now)
const countdownDate = new Date();
countdownDate.setHours(countdownDate.getHours() + 24);

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the countdown
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0"
  );
  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0"
  );

  // If the countdown is over, display a message
  if (distance < 0) {
    clearInterval(countdownInterval);
    document.querySelector(".countdown-timer").innerHTML =
      "<span>Sale Ended!</span>";
  }
}

// Update the countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);

// Initialize the countdown
updateCountdown();

// FAQ Accordion Functionality
const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const accordionItem = header.parentElement;
    const accordionContent = header.nextElementSibling;

    // Toggle active class
    accordionItem.classList.toggle("active");

    // Toggle content visibility
    if (accordionItem.classList.contains("active")) {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    } else {
      accordionContent.style.maxHeight = 0;
    }

    // Close other accordion items
    accordionHeaders.forEach((otherHeader) => {
      if (otherHeader !== header) {
        const otherItem = otherHeader.parentElement;
        const otherContent = otherHeader.nextElementSibling;
        otherItem.classList.remove("active");
        otherContent.style.maxHeight = 0;
      }
    });
  });
});

// Authentication Functions
document.addEventListener("DOMContentLoaded", function () {
 // Login
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Ngăn chặn load lại trang
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Kiểm tra định dạng email
    const passwordRegex = /^.{6,}$/; // Mật khẩu ít nhất 6 ký tự
    const formData = new FormData(this);
    fetch("/auth", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("loginMessage").textContent = data;
        if (data.includes("successfully")) {
          window.location.href = "/dashboard"; // Điều hướng nếu đăng nhập thành công
        }
      })
      .catch((error) => console.error("Error:", error));
  });ror) => console.error("Error:", error));
  });
  // chức năng đăng xuất
  function logout() {
    fetch("/logout", {
      // gửi yêu cầu đăng xuất
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        window.location.href = "/login";
      });
  }
  // Register Form Handler
  document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", async function (event) {
      event.preventDefault(); // Ngăn chặn reload trang

      // Lấy dữ liệu từ form
      const formData = new FormData(registerForm);
      const data = {
        fullname: formData.get("fullname"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
      };

      // Kiểm tra xác nhận mật khẩu
      if (data.password !== data.confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
      }

      try {
        const response = await fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        alert(result.message); // Hiển thị thông báo từ server

        if (result.success) {
          window.location.href = "login.html"; // Chuyển hướng nếu đăng ký thành công
        }
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại!");
      }
    });
  });

  // Google Sign-in Handler
  const googleButtons = document.querySelectorAll(".google-login");
  googleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Here you would typically implement Google OAuth
      console.log("Google sign-in clicked");
      alert("Google sign-in functionality will be implemented here");
    });
  });
});

// Search functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchField = document.getElementById("search-field");
  const searchDropdown = document.getElementById("search-dropdown");
  const searchBtn = document.getElementById("search-btn");

  // Product data (you can replace this with your actual product data)
  const products = [
    {
      name: "Men's Casual Shirt",
      price: "$29.99",
      category: "clothing",
      description:
        "A comfortable and stylish casual shirt perfect for any occasion. Made with high-quality materials for lasting comfort.",
    },
    {
      name: "Women's Sneakers",
      price: "$49.99",
      category: "shoes",
      description:
        "Trendy and comfortable sneakers designed for the modern woman. Perfect blend of style and comfort.",
    },
    {
      name: "Luxury Perfume",
      price: "$79.99",
      category: "accessories",
      description:
        "An exquisite fragrance that captures elegance and sophistication. Long-lasting scent for any occasion.",
    },
    {
      name: "Leather Wallet",
      price: "$39.99",
      category: "accessories",
      description:
        "Premium leather wallet with multiple compartments. Sleek design meets practical functionality.",
    },
    {
      name: "Smart Watch",
      price: "$99.99",
      category: "electronics",
      description:
        "Feature-rich smartwatch with modern technology. Track your fitness and stay connected in style.",
    },
    {
      name: "Wireless Headphones",
      price: "$59.99",
      category: "electronics",
      description:
        "High-quality wireless headphones with superior sound. Perfect for music lovers and professionals.",
    },
  ];

  // Show dropdown when focusing on search field
  searchField.addEventListener("focus", () => {
    searchDropdown.classList.add("active");
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchField.contains(e.target) && !searchDropdown.contains(e.target)) {
      searchDropdown.classList.remove("active");
    }
  });

  // Filter products based on search input
  searchField.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );

    // Update dropdown with filtered results
    const dropdownList = searchDropdown.querySelector("ul");
    dropdownList.innerHTML = "";

    if (searchTerm === "") {
      // Show all products if search field is empty
      products.forEach((product) => {
        const li = document.createElement("li");
        li.innerHTML = `
                    <div class="product-search-item">
                        <div class="product-name">${product.name}</div>
                        <div class="product-description">${product.description}</div>
                        <div class="product-price">${product.price}</div>
                    </div>
                `;
        li.addEventListener("click", () => selectProduct(product));
        dropdownList.appendChild(li);
      });
    } else if (filteredProducts.length > 0) {
      // Show filtered products
      filteredProducts.forEach((product) => {
        const li = document.createElement("li");
        li.innerHTML = `
                    <div class="product-search-item">
                        <div class="product-name">${product.name}</div>
                        <div class="product-description">${product.description}</div>
                        <div class="product-price">${product.price}</div>
                    </div>
                `;
        li.addEventListener("click", () => selectProduct(product));
        dropdownList.appendChild(li);
      });
    } else {
      // Show no results message
      const li = document.createElement("li");
      li.textContent = "No products found";
      li.style.color = "#666";
      li.style.fontStyle = "italic";
      dropdownList.appendChild(li);
    }

    // Show dropdown if there are results
    if (searchTerm === "" || filteredProducts.length > 0) {
      searchDropdown.classList.add("active");
    }
  });

  // Handle product selection
  function selectProduct(product) {
    searchField.value = product.name;
    // Open the product modal with the selected product details
    openProductModal({
      querySelector: () => ({
        src: `images/product${products.indexOf(product) + 1}.jpg`,
      }),
      getAttribute: (attr) => {
        if (attr === "data-name") return product.name;
        if (attr === "data-description") return product.description;
      },
      querySelector: (selector) => {
        if (selector === ".product-price")
          return { textContent: product.price };
        return null;
      },
    });
    searchDropdown.classList.remove("active");
  }

  // Handle search button click
  searchBtn.addEventListener("click", () => {
    const searchTerm = searchField.value.toLowerCase();
    if (searchTerm) {
      // You can implement the search results page navigation here
      console.log("Searching for:", searchTerm);
    }
  });
});

// User Menu Functionality
document.addEventListener("DOMContentLoaded", () => {
  // Highlight current page in menu
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const menuItems = document.querySelectorAll(".user-menu a");
  menuItems.forEach((item) => {
    if (item.getAttribute("href") === currentPage) {
      item.classList.add("active");
    }
  });

  // Smooth hover transition for menu
  const userProfile = document.querySelector(".user-profile");
  const userMenu = document.querySelector(".user-menu");
  let timeoutId;

  userProfile.addEventListener("mouseenter", () => {
    clearTimeout(timeoutId);
    userMenu.style.display = "block";
    setTimeout(() => {
      userMenu.style.opacity = "1";
      userMenu.style.visibility = "visible";
      userMenu.style.transform = "translateY(0)";
    }, 50);
  });

  userProfile.addEventListener("mouseleave", () => {
    timeoutId = setTimeout(() => {
      userMenu.style.opacity = "0";
      userMenu.style.visibility = "hidden";
      userMenu.style.transform = "translateY(10px)";
      setTimeout(() => {
        if (userMenu.style.visibility === "hidden") {
          userMenu.style.display = "none";
        }
      }, 300);
    }, 200);
  });

  // Handle mobile menu
  if (window.innerWidth <= 768) {
    const profileIcon = document.querySelector(".profile-icon");
    profileIcon.addEventListener("click", (e) => {
      e.preventDefault();
      userMenu.style.display =
        userMenu.style.display === "block" ? "none" : "block";
      setTimeout(() => {
        if (userMenu.style.display === "block") {
          userMenu.style.opacity = "1";
          userMenu.style.visibility = "visible";
          userMenu.style.transform = "translateY(0)";
        }
      }, 50);
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!userProfile.contains(e.target)) {
        userMenu.style.opacity = "0";
        userMenu.style.visibility = "hidden";
        userMenu.style.transform = "translateY(10px)";
        setTimeout(() => {
          userMenu.style.display = "none";
        }, 300);
      }
    });
  }
});

// Logout handler
function handleLogout() {
  // Add your logout logic here
  alert("Logging out...");
  window.location.href = "login.html";
}
