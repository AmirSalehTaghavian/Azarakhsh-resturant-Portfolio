AOS.init({
  duration: 850,
  once:false, 
})

//////////////////////////////////////////////

let $ = document;

let menu = $.getElementById("menu");
let menuAct = $.getElementById("menu-active");
let closeMenu = $.getElementById("close-menu");

menu.addEventListener("click", () => {
  menuAct.style.display = "block";
});
closeMenu.addEventListener("click", () => {
  menuAct.style.display = "none";
});

////////////// Search Box \\\\\\\\\\\\\\

let serachInput = $.getElementById("search-input");

serachInput.addEventListener("input", () => {
  let searchValue = serachInput.value.trim();

  let foodscard = $.querySelectorAll(".s-food");

  foodscard.forEach((card) => {
    let title = card.querySelector(".s-food-name").textContent.trim();

    if (title.includes(searchValue)) {
      card.style.display = "block";
    }else {
      card.style.display = "none";
    }
  })
});


///////////////////////////////////////////////////////////////////////////


let comments = [
  {Name: "زهرا محمدی", desc:"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز"},
  {Name: "محسن رضایی", desc:"لورم ایپسوم متن ساختگی با تولید سادگی  از صنعت  و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز"},
  {Name: "رضا شاهی", desc:"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان ط فعلی تکنولوژی مورد نیاز"},
]

let nameCommentElem = $.querySelector(".comment-name")
let descCommentElem = $.querySelector(".comment-desc")
let nextCommentBtn = $.querySelector(".fa-forward")
let prevCommentBtn = $.querySelector(".fa-backward")

let commentIndex = 0

function prevComment() {
  commentIndex --


  if(commentIndex < 0) {
    commentIndex = 2
  }
  descCommentElem.innerHTML = comments[commentIndex].desc
  nameCommentElem.innerHTML = comments[commentIndex].Name
}
function nextComment() {
  commentIndex ++


  if(commentIndex > 2) {
    commentIndex = 0
  }
  descCommentElem.innerHTML = comments[commentIndex].desc
  nameCommentElem.innerHTML = comments[commentIndex].Name
}

setInterval(nextComment, 8000)

nextCommentBtn.addEventListener("click", nextComment)
prevCommentBtn.addEventListener("click", prevComment)


///////////////////////////////////////////////


document.querySelector(".menu-nav-scrool").addEventListener("click", function () {
  const targetSection = document.querySelector(".food-menu");
  const targetPosition = targetSection.offsetTop;
  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });
});

document.querySelector(".about-us").addEventListener("click", function () {
  const targetSection = document.querySelector("footer");
  const targetPosition = targetSection.offsetTop;
  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });
});
document.querySelector(".s-food-nav").addEventListener("click", function () {
  const targetSection = document.querySelector(".special-food");
  const targetPosition = targetSection.offsetTop;
  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });
});
document.querySelector(".order-btn").addEventListener("click", function () {
  const targetSection = document.querySelector(".special-food");
  const targetPosition = targetSection.offsetTop;
  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });
});


///////////////////////////////////////////////////////////////////////////


const cartIcon = document.querySelector(".cart");
const cartCount = document.querySelector(".cart");
const cartPanel = document.getElementById("cart-panel");
const cartItemsContainer = document.getElementById("cart-items");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ذخیره در localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// تعداد روی آیکون
function updateCartCount() {
  cartCount.textContent = cart.length;
}

// نمایش محصولات سبد
function renderCart() {
  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>سبد خرید خالی است 🛍️</p>";
    return;
  }

  let totalPrice = 0;

  cart.forEach(item => {
    const price = item.price ? item.price : 0;
    const itemTotal = price * item.quantity;
    totalPrice += itemTotal;
        
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name} - ${item.price.toLocaleString()} تومان</span>
      <div>
        <button class="decrease">-</button>
        <span>${item.quantity}</span>
        <button class="increase">+</button>
        <button class="remove">❌</button>
      </div>
      <p class="item-total">${itemTotal.toLocaleString()} تومان</p>
    `;

    div.querySelector(".increase").addEventListener("click", () => {
      item.quantity++;
      saveCart();
      renderCart();
    });

    div.querySelector(".decrease").addEventListener("click", () => {
      item.quantity--;
      if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== item.id);
      }
      saveCart();
      renderCart();
    });

    div.querySelector(".remove").addEventListener("click", () => {
      cart = cart.filter(p => p.id !== item.id);
      saveCart();
      renderCart();
    });

    cartItemsContainer.appendChild(div);
  });
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("cart-total");
  totalDiv.innerHTML = `<p>💰 جمع کل: ${totalPrice} تومان</p>`;
  cartItemsContainer.appendChild(totalDiv);

}

// افزودن محصول
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", e => {
    const product = e.target.closest(".s-food");
    const id = product.dataset.id;
    const name = product.dataset.name;
    const price = parseInt(product.dataset.price);

    const existing = cart.find(p => p.id === id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }

    saveCart();
    renderCart();
  });
});

// کلیک روی آیکون
cartIcon.addEventListener("click", () => {
  cartPanel.classList.toggle("hidden");
});

// بارگذاری اولیه
renderCart();
updateCartCount();

const cartIconAct = document.querySelector(".cart-act");
const cartCountAct = document.querySelector(".cart-act");
const cartPanelAct = document.getElementById("cart-panel");
const cartItemsContainerAct = document.getElementById("cart-items");

let cartAct = JSON.parse(localStorage.getItem("cart")) || [];

// ذخیره در localStorage
function saveCartAct() {
  localStorage.setItem("cart", JSON.stringify(cartAct));
  updateCartCountAct();
}

// تعداد روی آیکون
function updateCartCountAct() {
  cartCountAct.textContent = cartAct.length;
}

// نمایش محصولات سبد
function renderCartAct() {
  cartItemsContainerAct.innerHTML = "";
  if (cartAct.length === 0) {
    cartItemsContainerAct.innerHTML = "<p>سبد خرید خالی است 🛍️</p>";
    return;
  }
  let totalPrice = 0; 
  cartAct.forEach(item => {
    const price = item.price ? item.price : 0;
    const itemTotal = price * item.quantity;
    totalPrice += itemTotal;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name} - ${item.price.toLocaleString()} تومان</span>
      <div>
        <button class="decrease">-</button>
        <span>${item.quantity}</span>
        <button class="increase">+</button>
        <button class="remove">❌</button>
      </div>
    `;

    div.querySelector(".increase").addEventListener("click", () => {
      item.quantity++;
      saveCartAct();
      renderCartAct();
    });

    div.querySelector(".decrease").addEventListener("click", () => {
      item.quantity--;
      if (item.quantity <= 0) {
        cartAct = cartAct.filter(p => p.id !== item.id);
      }
      saveCartAct();
      renderCartAct();
    });

    div.querySelector(".remove").addEventListener("click", () => {
      cartAct = cartAct.filter(p => p.id !== item.id);
      saveCartAct();
      renderCartAct();
    });

    cartItemsContainerAct.appendChild(div);
  });
  const totalDivAct = document.createElement("div");
  totalDivAct.classList.add("cart-total");
  totalDivAct.innerHTML = `<strong>💰 جمع کل: ${totalPrice.toLocaleString()} تومان</strong>`;
  cartItemsContainerAct.appendChild(totalDivAct);
}

// افزودن محصول
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", e => {
    const product = e.target.closest(".s-food");
    const id = product.dataset.id;
    const name = product.dataset.name;
    const price = parseInt(product.dataset.price);

    const existing = cartAct.find(p => p.id === id);
    if (existing) {
      existing.quantity++;
    } else {
      cartAct.push({ id, name, price, quantity: 1 });
    }

    saveCartAct();
    renderCartAct();
  });
});

// کلیک روی آیکون
cartIconAct.addEventListener("click", () => {
  cartPanelAct.classList.toggle("hidden");
});

// بارگذاری اولیه
renderCartAct();
updateCartCountAct();

///////////////////////////////////////////////////////////////////////////

let closeCartBtn = $.querySelector(".close-cart-btn")

closeCartBtn.addEventListener("click", () => {
  cartPanel.classList.toggle("hidden")
})