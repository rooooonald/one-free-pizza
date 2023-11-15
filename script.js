const API_URL =
  "https://9cxlt1wgo5.execute-api.us-east-1.amazonaws.com/api/orders";
const AUTH_KEY = "basic 9b4eef89-4fa9-4b46-9898-c9aacde84460";

/* 

  Pizza Customization Page

*/

//
// Button Event Handlers
//

const initializeFormBtns = () => {
  let selectStyleBtns = document.querySelectorAll(".style-option");
  let selectCrustBtns = document.querySelectorAll(".crust-option");
  let selectCheeseBtns = document.querySelectorAll(".cheese-option");

  for (const btn of selectStyleBtns) {
    btn.addEventListener("click", () => {
      selectStyleBtns.forEach((btn) => btn.classList.remove("selected"));
      btn.classList.add("selected");
      customizePizza.changeStyle(btn.value);
    });
  }

  for (const btn of selectCrustBtns) {
    btn.addEventListener("click", () => {
      selectCrustBtns.forEach((btn) => btn.classList.remove("selected"));
      btn.classList.add("selected");
      customizePizza.changeCrust(btn.value);
    });
  }

  for (const btn of selectCheeseBtns) {
    btn.addEventListener("click", () => {
      selectCheeseBtns.forEach((btn) => btn.classList.remove("selected"));
      btn.classList.add("selected");
      customizePizza.changeCheese(btn.value);
    });
  }
};

//
// Form Handlers
//

// Pizza Customization

const customizePizza = (() => {
  let style, crust, cheese;
  let selectStyleBtns = document.querySelectorAll(".style-option");
  let selectCrustBtns = document.querySelectorAll(".crust-option");
  let selectCheeseBtns = document.querySelectorAll(".cheese-option");

  return {
    changeStyle(selectedStyle) {
      for (const btn of selectStyleBtns) {
        btn.classList.remove("error");
      }
      document.getElementById("error-style").style.display = "none";
      style = selectedStyle;
    },
    currStyle() {
      return style;
    },
    changeCrust(selectedCrust) {
      for (const btn of selectCrustBtns) {
        btn.classList.remove("error");
      }
      document.getElementById("error-crust").style.display = "none";
      crust = selectedCrust;
    },
    currCrust() {
      return crust;
    },
    changeCheese(selectedCheese) {
      for (const btn of selectCheeseBtns) {
        btn.classList.remove("error");
      }
      document.getElementById("error-cheese").style.display = "none";
      cheese = selectedCheese;
    },
    currCheese() {
      return cheese;
    },
  };
})();

// Validate Form

const contactNameInput = document.getElementById("contact-name");
const contactPhoneInput = document.getElementById("contact-phone");
const contactAddressInput = document.getElementById("contact-address");
const contactCityInput = document.getElementById("contact-city");
const contactProvinceInput = document.getElementById("contact-province");
const contactPostalInput = document.getElementById("contact-postal");

const validateForm = () => {
  let error = false;
  let selectStyleBtns = document.querySelectorAll(".style-option");
  let selectCrustBtns = document.querySelectorAll(".crust-option");
  let selectCheeseBtns = document.querySelectorAll(".cheese-option");

  if (!customizePizza.currStyle()) {
    for (const btn of selectStyleBtns) {
      btn.classList.add("error");
    }
    document.getElementById("error-style").style.display = "block";
    error = true;
  }

  if (!customizePizza.currCrust()) {
    for (const btn of selectCrustBtns) {
      btn.classList.add("error");
    }
    document.getElementById("error-crust").style.display = "block";
    error = true;
  }

  if (!customizePizza.currCheese()) {
    for (const btn of selectCheeseBtns) {
      btn.classList.add("error");
    }
    document.getElementById("error-cheese").style.display = "block";
    error = true;
  }

  if (!contactNameInput.value || contactNameInput.value.trim().length === 0) {
    contactNameInput.classList.add("error");
    document.getElementById("error-delivery").style.display = "block";
    error = true;
  }

  if (!contactPhoneInput.value || contactPhoneInput.value.trim().length === 0) {
    contactPhoneInput.classList.add("error");
    document.getElementById("error-delivery").style.display = "block";
    error = true;
  }

  if (
    !contactAddressInput.value ||
    contactAddressInput.value.trim().length === 0
  ) {
    contactAddressInput.classList.add("error");
    document.getElementById("error-delivery").style.display = "block";
    error = true;
  }

  if (!contactCityInput.value || contactCityInput.value.trim().length === 0) {
    contactCityInput.classList.add("error");
    document.getElementById("error-delivery").style.display = "block";
    error = true;
  }

  if (!contactProvinceInput.value) {
    contactProvinceInput.classList.add("error");
    document.getElementById("error-delivery").style.display = "block";
    error = true;
  }

  if (!contactPostalInput.value) {
    contactPostalInput.classList.add("error");
    document.getElementById("error-delivery").style.display = "block";
    error = true;
  }

  if (error) {
    document.getElementById("submit-order-btn").innerText = "ORDER UNCOMPLETED";
    document.getElementById("submit-order-btn").disabled = true;
    setTimeout(() => {
      document.getElementById("submit-order-btn").innerText = "ORDER";
      document.getElementById("submit-order-btn").disabled = false;
    }, 3000);
  }

  return error;
};

// Reset Error

const inputFields = document.querySelectorAll("input");
for (const input of inputFields) {
  input.addEventListener("focus", () => {
    input.classList.remove("error");
    document.getElementById("error-delivery").style.display = "none";
  });
}

// Confirm Order

const confirmOrderHandler = () => {
  if (validateForm()) {
    return;
  }

  document.getElementById("backdrop").style.display = "flex";

  const modal = document.getElementById("modal");
  modal.innerHTML = "";
  const heading = document.createElement("h1");
  heading.innerText = "CONFIRM ORDER";
  const customerName = document.createElement("div");
  customerName.id = "modal-name";
  customerName.innerHTML = `<strong>${contactNameInput.value}</strong> (${contactPhoneInput.value})`;
  const customerAddress = document.createElement("div");
  customerAddress.id = "modal-address";
  customerAddress.innerHTML = `${contactAddressInput.value}, ${contactCityInput.value}, ${contactProvinceInput.value}  ${contactPostalInput.value}`;
  const pizzaInfo = document.createElement("div");
  pizzaInfo.id = "modal-pizza-info";
  const pizzaStyle = document.createElement("div");
  pizzaStyle.id = "modal-pizza-style";
  pizzaStyle.innerHTML = `<h2>${customizePizza.currStyle()}</h2>`;
  const pizzaCrust = document.createElement("div");
  pizzaCrust.id = "modal-pizza-crust";
  pizzaCrust.innerHTML = `<h3>CRUST</h3>${
    customizePizza.currCrust() === "ORIGINAL"
      ? "<i class='fa-solid fa-pizza-slice'></i> ORIGINAL"
      : ""
  }${
    customizePizza.currCrust() === "THIN"
      ? "<i class='fa-solid fa-down-left-and-up-right-to-center'></i> THIN"
      : ""
  }${
    customizePizza.currCrust() === "GLUTEN-FREE"
      ? "<i class='fa-solid fa-wheat-awn-circle-exclamation'></i> GLUTEN-FREE"
      : ""
  }`;
  const pizzaCheese = document.createElement("div");
  pizzaCheese.id = "modal-pizza-cheese";
  pizzaCheese.innerHTML = `<h3>CHEESE</h3>${
    customizePizza.currCheese() === "EXTRA"
      ? "<i class='fa-solid fa-cheese'></i><i class='fa-solid fa-cheese'></i><i class='fa-solid fa-cheese'></i> EXTRA"
      : "<i class='fa-solid fa-cheese'></i> ORIGINAL"
  }`;
  pizzaInfo.append(pizzaStyle, pizzaCrust, pizzaCheese);

  const submitBtn = document.createElement("button");
  submitBtn.addEventListener("click", submitOrderHandler);
  submitBtn.innerText = "ORDER";
  modal.append(heading, customerName, customerAddress, pizzaInfo, submitBtn);
};

// Confirm Order: Modal Control

const startModal = () => {
  document.getElementById("backdrop").addEventListener("click", () => {
    document.getElementById("backdrop").style.display = "none";
  });

  document.getElementById("modal").addEventListener("click", (e) => {
    e.stopPropagation();
  });
};

// Submit Order

const submitOrderHandler = () => {
  const orderBody = {
    id: Date.now(),
    style: customizePizza.currStyle(),
    crust: customizePizza.currCrust(),
    cheese: customizePizza.currCheese() === "EXTRA",
    name: contactNameInput.value,
    address: `${contactAddressInput.value}, ${contactCityInput.value}, ${contactProvinceInput.value}  ${contactPostalInput.value}`,
  };

  let modal = document.getElementById("modal");
  const loader = document.createElement("div");
  loader.classList = "loader";
  modal.innerHTML = "";
  modal.append(loader);

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(orderBody),
    headers: {
      Authorization: AUTH_KEY,
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      modal.innerHTML = "";
      const headingSuccess = document.createElement("h1");
      headingSuccess.innerHTML = "ORDER SUBMITTED";
      const anotherOrderBtn = document.createElement("button");
      anotherOrderBtn.classList = "order-submitted-btn";
      anotherOrderBtn.innerHTML = "MAKE ANOTHER ORDER";
      anotherOrderBtn.addEventListener("click", () => {
        location.href = "./get-your-pizza.html";
      });
      const checkOrderBtn = document.createElement("button");
      checkOrderBtn.classList = "order-submitted-btn";
      checkOrderBtn.innerHTML = "CHECK YOUR ORDER";
      checkOrderBtn.addEventListener("click", () => {
        location.href = "./orders.html";
      });
      modal.append(headingSuccess, anotherOrderBtn, checkOrderBtn);
    })
    .catch((err) => {
      console.log(err);
    });
};

//
// Page Animation
//

// Scroll-triggered Rotating Pizza

const rotatePizza = () => {
  document.getElementById("rotate-style-img").style.transform = `rotate(${
    window.scrollY / 5
  }deg)`;

  document.getElementById(
    "rotate-crust-img1"
  ).style.transform = `rotate(${window.scrollY}deg)`;

  document.getElementById("rotate-crust-img2").style.transform = `rotate(${
    window.scrollY / 15
  }deg)`;

  document.getElementById("rotate-cheese-img1").style.transform = `rotate(${
    window.scrollY / 10
  }deg)`;

  document.getElementById("rotate-cheese-img2").style.transform = `rotate(${
    window.scrollY / 5
  }deg)`;

  document.getElementById(
    "rotate-cheese-img3"
  ).style.transform = `rotate(${window.scrollY}deg)`;
};

// Scroll to show Cheese section and Contact form

const fadeInContactForm = () => {
  const heroBanner = document.getElementById("hero-banner");
  const styleSection = document.getElementById("pizza-style");
  const crustSection = document.getElementById("pizza-crust");
  const cheeseSection = document.getElementById("pizza-cheese");

  document.getElementById("pizza-crust").style.opacity =
    (window.scrollY +
      window.innerHeight -
      (heroBanner.offsetHeight + styleSection.offsetHeight)) /
    350;

  document.getElementById("pizza-cheese").style.opacity =
    (window.scrollY +
      window.innerHeight -
      (heroBanner.offsetHeight +
        styleSection.offsetHeight +
        crustSection.offsetHeight)) /
    350;

  document.getElementById("delivery").style.opacity =
    (window.scrollY +
      window.innerHeight -
      (heroBanner.offsetHeight +
        styleSection.offsetHeight +
        crustSection.offsetHeight +
        cheeseSection.offsetHeight)) /
    350;
};

/* 

  Orders Page

*/

//
// Order List Handlers
//

// Fetching Order Data

const fetchOrdersHandler = () => {
  const loaderDiv = document.createElement("div");
  loaderDiv.classList = "loader";
  document.getElementById("orders-loading").append(loaderDiv);

  fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: AUTH_KEY,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch order list.");
      }
      return res.json();
    })
    .then((data) => {
      const sortedData = data.sort((a, b) => {
        return b.id - a.id;
      });
      propagateData(sortedData);
    })
    .catch((err) => console.log(err.message));
};

// Removing Orders

const removeOrderHandler = (orderId, card) => {
  card.style.opacity = 0.25;

  fetch(`${API_URL}/${orderId}`, {
    method: "DELETE",
    headers: {
      Authorization: AUTH_KEY,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete orders.");
      }
      card.remove();
    })
    .catch((err) => console.log(err.message));
};

// Scrolling Order List

const scrollOrderList = (() => {
  var orderList = document.getElementById("order-list");
  let i = 0;
  return {
    toRight: () => {
      i =
        orderList.scrollWidth <= orderList.offsetWidth
          ? 0
          : Math.floor(orderList.scrollLeft / 220) + 1;

      orderList.scrollTo({
        top: 0,
        left: 220 * i,
        behavior: "smooth",
      });
      rotatePizzaOrder(i);
    },
    toLeft: () => {
      i =
        orderList.scrollLeft % 220 === 0 && orderList.scrollLeft !== 0
          ? Math.floor(orderList.scrollLeft / 220) - 1
          : Math.floor(orderList.scrollLeft / 220);

      orderList.scrollTo({
        top: 0,
        left: 220 * i,
        behavior: "smooth",
      });
      rotatePizzaOrder(i);
    },
  };
})();

function propagateData(orderData) {
  document.getElementById("orders-loading").style.display = "none";
  document.getElementById("orders-panel").style.display = "flex";
  const list = document.getElementById("order-list");

  if (orderData.length === 0) {
    document.getElementById("orders-panel").innerHTML =
      "<h2>There are currently no orders.</h2>";
    return;
  }

  for (const order of orderData) {
    const date = new Date(order.id);

    const card = document.createElement("div");
    card.classList = "card-order";

    const orderNumDiv = document.createElement("div");
    orderNumDiv.classList = "order-number";
    const orderNum = document.createElement("p");
    orderNum.innerHTML = `<strong>Order #${order.id}</strong>`;
    const orderTime = document.createElement("p");
    orderTime.innerHTML = `${date.toLocaleString("en-CA", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}</strong>`;

    orderNumDiv.append(orderNum, orderTime);

    const customerInfoDiv = document.createElement("div");
    customerInfoDiv.classList = "customer-info";
    const customerName = document.createElement("h2");
    customerName.innerText = `${order.name}`;

    const customerAddress = document.createElement("p");
    customerAddress.innerText = `${order.address}`;

    customerInfoDiv.append(customerName, customerAddress);

    const pizzaInfoDiv = document.createElement("div");
    pizzaInfoDiv.classList = "pizza-info";

    const styleName = document.createElement("h2");
    styleName.innerHTML = `${order.style}`;

    const crustDiv = document.createElement("div");
    crustDiv.classList = "pizza-options";
    crustDiv.innerHTML = `${
      order.crust === "ORIGINAL"
        ? "<i class='fa-solid fa-pizza-slice'></i> ORIGINAL"
        : ""
    }${
      order.crust === "THIN"
        ? "<i class='fa-solid fa-down-left-and-up-right-to-center'></i> THIN"
        : ""
    }${
      order.crust === "GLUTEN-FREE"
        ? "<i class='fa-solid fa-wheat-awn-circle-exclamation'></i> GLUTEN-FREE"
        : ""
    }`;

    const cheeseDiv = document.createElement("div");
    cheeseDiv.classList = "pizza-options";
    cheeseDiv.innerHTML = `${
      order.cheese
        ? "<i class='fa-solid fa-cheese'></i><i class='fa-solid fa-cheese'></i><i class='fa-solid fa-cheese'></i> EXTRA"
        : "<i class='fa-solid fa-cheese'></i> ORIGINAL"
    }`;

    pizzaInfoDiv.append(styleName, crustDiv, cheeseDiv);

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "REMOVE";

    removeBtn.addEventListener("click", () => {
      removeOrderHandler(order.id, card);
    });

    card.append(orderNumDiv, customerInfoDiv, pizzaInfoDiv, removeBtn);

    list.append(card);
  }
}

//
// Page Animation
//

// Rotating Pizza

const rotatePizzaOrder = (i) => {
  document.getElementById("rotate-order-img1").style.transform = `rotate(${
    i * 45
  }deg)`;

  document.getElementById("rotate-order-img2").style.transform = `rotate(${
    i * 45
  }deg)`;
};

/* 

  Initialization

*/

const initializeCustomizePizza = () => {
  initializeNavbar();
  initializeFormBtns();
  startModal();
  window.addEventListener("scroll", rotatePizza);
  window.addEventListener("scroll", fadeInContactForm);
};

const initializeOrders = () => {
  initializeNavbar();
  fetchOrdersHandler();
};

const initializeNavbar = () => {
  const logo = document.getElementById("logo");
  const navCustomize = document.getElementById("nav-customize");
  const navOrders = document.getElementById("nav-orders");
  const navDesc = document.getElementById("nav-desc");

  logo.addEventListener("click", () => {
    location.href = "./index.html";
  });

  navCustomize.addEventListener("click", () => {
    location.href = "./get-your-pizza.html";
  });

  navCustomize.addEventListener("mouseover", () => {
    navDesc.innerText = "CUSTOMIZE YOUR PIZZA";
    navDesc.style.display = "block";
  });

  navCustomize.addEventListener("mouseout", () => {
    document.getElementById("nav-desc").style.display = "none";
  });

  navOrders.addEventListener("click", () => {
    location.href = "./orders.html";
  });

  navOrders.addEventListener("mouseover", () => {
    navDesc.innerText = "ORDERS";
    navDesc.style.display = "inline";
  });

  navOrders.addEventListener("mouseout", () => {
    navDesc.style.display = "none";
  });
};

const initializeHome = () => {
  const customizeBtn = document.getElementById("home-btn-customize");
  const ordersBtn = document.getElementById("home-btn-orders");
  const pizzaImg1 = document.getElementById("home-pizza-image1");
  const pizzaImg2 = document.getElementById("home-pizza-image2");

  customizeBtn.addEventListener("click", () => {
    location.href = "./get-your-pizza.html";
  });

  customizeBtn.addEventListener("mouseover", () => {
    pizzaImg1.style.right = "-300px";
    pizzaImg2.style.opacity = 0.35;
  });

  customizeBtn.addEventListener("mouseout", () => {
    pizzaImg1.style.right = "-425px";
    pizzaImg2.style.opacity = 0;
  });

  ordersBtn.addEventListener("click", () => {
    location.href = "./orders.html";
  });

  ordersBtn.addEventListener("mouseover", () => {
    pizzaImg1.style.right = "-300px";
    pizzaImg2.style.opacity = 0.35;
  });

  ordersBtn.addEventListener("mouseout", () => {
    pizzaImg1.style.right = "-425px";
    pizzaImg2.style.opacity = 0;
  });
};
