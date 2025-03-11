document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("registerForm")
        .addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const password = formData.get("password");
            const confirmPassword = formData.get("confirmPassword");

            if (password !== confirmPassword) {
                alert("Mật khẩu không khớp!");
                return;
            }

            const data = {
                username: formData.get("username"),
                password: password
            };

            try {
                const response = await fetch("http://localhost:3001/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                console.log("Server response:", result);

                if (result.success) {
                    alert("Đăng ký thành công!");
                    window.location.href = "/login.html";
                } else {
                    alert(result.message || "Đăng ký thất bại!");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Lỗi kết nối đến server!");
            }
        });
}); 