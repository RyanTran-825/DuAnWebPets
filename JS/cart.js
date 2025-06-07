// GLOBAL HELPER FUNCTIONS (Accessible from other scripts like script.js)

// Hàm bay ảnh vào giỏ hàng (giữ nguyên theo phiên bản bạn cung cấp)
function flyToCart(productImage, cartIcon) {
  const imgClone = productImage.cloneNode(true);
  const rect = productImage.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  imgClone.style.position = "fixed";
  imgClone.style.zIndex = "1000";
  imgClone.style.top = rect.top + "px";
  imgClone.style.left = rect.left + "px";
  imgClone.style.width = productImage.offsetWidth + "px";
  imgClone.style.transition = "all 0.8s ease-in-out";

  document.body.appendChild(imgClone);

  setTimeout(() => {
    imgClone.style.top = cartRect.top + "px";
    imgClone.style.left = cartRect.left + "px";
    imgClone.style.width = "0px";
    imgClone.style.opacity = "0";
  }, 10);

  setTimeout(() => {
    document.body.removeChild(imgClone);
  }, 800);
}

// Hàm cập nhật số lượng sản phẩm trên icon giỏ hàng và mini-cart content
// (Được bổ sung từ phiên bản trước để hỗ trợ mini-cart trên index.html)
function updateCartCountAndMiniCart() {
  const cartCountElement = document.getElementById("cart-count");
  const miniCartItemsContainer = document.getElementById("mini-cart-items");
  const miniCartTotalPriceElement = document.getElementById(
    "mini-cart-total-price"
  );

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalItems = 0;
  let miniCartTotal = 0;

  // Cập nhật số lượng trên icon giỏ hàng và tổng tiền cho mini-cart (dựa trên TẤT CẢ sản phẩm)
  cart.forEach((item) => {
    totalItems += item.quantity;
    miniCartTotal += item.price * item.quantity; // Tính tổng cho mini-cart dựa trên TẤT CẢ sản phẩm
  });

  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
    if (totalItems > 0) {
      cartCountElement.classList.add("has-items"); // Tùy chọn: thêm class để đổi style icon
    } else {
      cartCountElement.classList.remove("has-items");
    }
  }

  // Cập nhật Mini-cart content (chỉ dữ liệu, không phải ẩn/hiện)
  if (miniCartItemsContainer && miniCartTotalPriceElement) {
    miniCartItemsContainer.innerHTML = ""; // Xóa các mục cũ

    if (cart.length === 0) {
      miniCartItemsContainer.innerHTML =
        '<p class="text-muted text-center">Giỏ hàng trống.</p>';
    } else {
      // Lấy 5 sản phẩm gần nhất (hoặc ít hơn nếu giỏ hàng nhỏ hơn)
      const recentItems = [...cart].reverse().slice(0, 5); // Lấy 5 sản phẩm mới nhất

      recentItems.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("mini-cart-item");
        itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <p class="item-name">${item.name}</p>
                        <p class="item-quantity-price">${
                          item.quantity
                        } x ${item.price.toLocaleString("vi-VN")}₫</p>
                    </div>
                `;
        miniCartItemsContainer.appendChild(itemElement);
      });
    }
    miniCartTotalPriceElement.textContent =
      miniCartTotal.toLocaleString("vi-VN") + "₫";
  }
}

// CÁC HÀM QUẢN LÝ GIỎ HÀNG (thao tác với localStorage)
// Hàm cập nhật số lượng sản phẩm (theo phiên bản bạn cung cấp, dùng index)
function updateQuantity(index, newQuantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (index > -1 && index < cart.length) {
    cart[index].quantity = newQuantity > 0 ? newQuantity : 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems(); // Render lại giỏ hàng (sẽ gọi updateDisplayedTotal)
    updateCartCountAndMiniCart(); // Cập nhật mini-cart và số lượng icon giỏ hàng
  }
}

// Hàm xóa sản phẩm khỏi giỏ hàng (theo phiên bản bạn cung cấp, dùng index)
function removeItemFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (index > -1 && index < cart.length) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems(); // Render lại giỏ hàng (sẽ gọi updateDisplayedTotal)
    updateCartCountAndMiniCart(); // Cập nhật mini-cart và số lượng icon giỏ hàng
  }
}

// Hàm tính và hiển thị tổng tiền dựa trên các sản phẩm được CHỌN (theo phiên bản bạn cung cấp)
function updateDisplayedTotal() {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartTotalElement = document.getElementById("totalPriceFooter");

  if (!cartItemsContainer || !cartTotalElement) {
    return; // Không tìm thấy phần tử, thoát
  }

  let currentTotal = 0;
  const itemCheckboxes = cartItemsContainer.querySelectorAll(
    ".item-select-checkbox"
  );
  let cart = JSON.parse(localStorage.getItem("cart")) || []; // Lấy giỏ hàng mới nhất

  itemCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const index = parseInt(checkbox.getAttribute("data-index"));
      // Đảm bảo index hợp lệ và sản phẩm tồn tại trong giỏ hàng
      if (!isNaN(index) && index >= 0 && index < cart.length) {
        currentTotal += cart[index].price * cart[index].quantity;
      }
    }
  });

  cartTotalElement.textContent = currentTotal.toLocaleString("vi-VN") + "₫";
}

// HÀM HIỂN THỊ CÁC SẢN PHẨM TRONG GIỎ HÀNG (Dành riêng cho cart.html) (theo phiên bản bạn cung cấp)
function displayCartItems() {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartTotalElement = document.getElementById("totalPriceFooter");
  const selectAllFooter = document.getElementById("selectAllFooter"); // Lấy checkbox "Chọn tất cả"

  if (!cartItemsContainer || !cartTotalElement) {
    return; // Thoát nếu không tìm thấy container hoặc tổng tiền
  }

  let currentCart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItemsContainer.innerHTML = ""; // Xóa các mục cũ trước khi render lại

  if (currentCart.length === 0) {
    cartItemsContainer.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-5 text-muted">
                    Giỏ hàng của bạn đang trống. <a href="index.html" class="text-decoration-none text-primary">Tiếp tục mua sắm ngay!</a>
                </td>
            </tr>
        `;
    cartTotalElement.textContent = "0₫"; // Hiển thị 0đ khi trống
    if (selectAllFooter) selectAllFooter.checked = false; // Bỏ chọn "Chọn tất cả"
    return;
  }

  currentCart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;

    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
                <input type="checkbox" class="item-select-checkbox" data-index="${index}" checked>
            </td>
            <td><img src="${item.image}" alt="${
      item.name
    }" class="cart-item-image"></td>
            <td>
                <span class="item-name">${item.name}</span>
                <p class="cart-item-description" style="color: #b0b0b0 !important; font-size: 0.9em; margin-top: 5px;">
                    ${item.description || ""}
                </p>
            </td>
            <td class="text-center">${item.price.toLocaleString("vi-VN")}₫</td>
            <td class="text-center">
                <input type="number" class="form-control quantity-input" value="${
                  item.quantity
                }" min="1" data-index="${index}">
            </td>
            <td class="text-center">${itemTotal.toLocaleString("vi-VN")}₫</td>
            <td class="text-center">
                <button class="btn btn-remove-item" data-index="${index}">
                    <i class='bx bx-trash'></i>
                </button>
            </td>
        `;
    cartItemsContainer.appendChild(row);
  });

  // GẮN CÁC EVENT LISTENER SAU KHI RENDER (quan trọng!)
  // Listener cho input số lượng
  cartItemsContainer.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", function () {
      const index = parseInt(this.getAttribute("data-index"));
      updateQuantity(index, parseInt(this.value));
    });
  });

  // Listener cho nút xóa
  cartItemsContainer.querySelectorAll(".btn-remove-item").forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      removeItemFromCart(index);
    });
  });

  // Listener cho từng checkbox sản phẩm (để cập nhật "Chọn tất cả" và tổng tiền)
  cartItemsContainer
    .querySelectorAll(".item-select-checkbox")
    .forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        const allChecked = Array.from(
          cartItemsContainer.querySelectorAll(".item-select-checkbox")
        ).every((cb) => cb.checked);
        if (selectAllFooter) {
          selectAllFooter.checked = allChecked;
        }
        updateDisplayedTotal(); // Cập nhật tổng tiền khi checkbox item thay đổi
      });
    });

  // Cập nhật tổng tiền hiển thị ban đầu (sẽ là 0 nếu không có gì được chọn)
  updateDisplayedTotal();

  // Đảm bảo trạng thái của "Chọn tất cả" được cập nhật đúng khi render lại
  const allItemsChecked = Array.from(
    cartItemsContainer.querySelectorAll(".item-select-checkbox")
  ).every((cb) => cb.checked);
  if (selectAllFooter) {
    selectAllFooter.checked = allItemsChecked && currentCart.length > 0; // Chỉ tích nếu có sản phẩm và tất cả được chọn
  }
}

// MAIN DOMContentLoaded LISTENER
document.addEventListener("DOMContentLoaded", function () {
  // --- LOGIC THÊM SẢN PHẨM VÀO GIỎ HÀNG (Chủ yếu cho index.html) ---
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  if (addToCartButtons.length > 0) {
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();

        const name = this.getAttribute("data-name");
        const price = parseInt(this.getAttribute("data-price"));
        const image = this.getAttribute("data-image");
        const description = this.getAttribute("data-description");

        const newItem = { name, price, image, description, quantity: 1 };
        let currentCart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItem = currentCart.find(
          (item) => item.name === newItem.name
        );
        if (existingItem) {
          existingItem.quantity++;
        } else {
          currentCart.push(newItem);
        }

        localStorage.setItem("cart", JSON.stringify(currentCart));

        const productImage = this.closest(".food-item").querySelector("img");
        const cartIcon = document.querySelector(".bx-cart");
        if (productImage && cartIcon) {
          flyToCart(productImage, cartIcon);
        }
        updateCartCountAndMiniCart(); // Gọi hàm cập nhật mini-cart sau khi thêm sản phẩm
      });
    });
  }

  // --- HIỂN THỊ GIỎ HÀNG BAN ĐẦU (Chủ yếu cho cart.html) ---
  const cartTableBody = document.getElementById("cart-items-container");
  if (cartTableBody) {
    displayCartItems(); // Gọi hàm hiển thị giỏ hàng nếu ở trang giỏ hàng
  }

  // --- LOGIC CHO CHECKBOX "CHỌN TẤT CẢ" ---
  const selectAllFooter = document.getElementById("selectAllFooter");
  if (selectAllFooter) {
    selectAllFooter.addEventListener("change", function () {
      const isChecked = this.checked;
      const itemCheckboxes = cartTableBody.querySelectorAll(
        ".item-select-checkbox"
      );

      itemCheckboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
      });
      updateDisplayedTotal(); // Cập nhật tổng tiền sau khi "Chọn tất cả" thay đổi
    });
  }

  // Cập nhật ban đầu cho số lượng icon giỏ hàng và mini-cart khi trang tải
  updateCartCountAndMiniCart();
});
