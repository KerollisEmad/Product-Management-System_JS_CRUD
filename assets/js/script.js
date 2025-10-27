// ^ Html Elements
var inputName = document.querySelector("#inputName");
var inputCatagory = document.querySelector("#inputCatagory");
var inputPrice = document.querySelector("#inputPrice");
var inputDescription = document.querySelector("#inputDescription");
var inputImage = document.querySelector("#inputImage");
var allCardContainer = document.querySelector(".allcard");
var addbtn = document.querySelector(".addbtn");
var inputSearch = document.querySelector("#inputSearch");

// ^ variables

var productList = JSON.parse(localStorage.getItem("products")) || [];
displayAllProduct();

var nameRegex = /^[A-Z][a-z]{3,}$/;
var catagoryRegex = /^[A-Z][a-z]{3,}$/;
var priceRegex = /^([1-9]|[1-9][0-9]|100)$/;
var descriptioneRegex = /^[a-z]{25,}$/;

// ^ Function

function addProduct() {
  if (
    validateName(nameRegex, inputName) &&
    validateName(catagoryRegex, inputCatagory) &&
    validateName(priceRegex, inputPrice) &&
    validateName(descriptioneRegex, inputDescription)
  ) {
    var product = {
      name: inputName.value,
      catagory: inputCatagory.value,
      price: inputPrice.value,
      description: inputDescription.value,
      image: "./assets/images/" + inputImage.files[0].name,
    };

    productList.push(product);
    localStorage.setItem("products", JSON.stringify(productList));
    displayProduct(productList.length - 1);

    clearProduct();
  } else {
    alert("enter valid value");
  }
}

function displayProduct(index) {
  var htmlcard = ` <div class=" col-lg-3 col-sm-6 col-md-4">
                        <div class="card ">
                            <div class="image">
                                <img src=${productList[index].image} class="img-fluid">
                            </div>
                            <div class="content p-3">
                                <div class="name d-flex justify-content-between align-items-center mt-2">
                                    <h2 class="h5 d-inline">${productList[index].name} </h2>
                                    <span class="h5 fw-bold">${productList[index].price}$</span>
                                </div>
                                <div class="gap-2 d-flex align-items-center mt-2">
                                    <i class="fa-solid fa-tag"></i>
                                    <h3 class="h6">${productList[index].catagory}</h3>
                                </div>
                                <p>${productList[index].description}</p>

                                <button class="btn btn-outline-warning" onclick="updateInput(${index})" >Update</button>
                                <button class="btn btn-outline-danger"onclick="deleteProduct(${index})">Delete</button>
                            </div>
                        </div>
                    </div>
                    `;

  allCardContainer.innerHTML += htmlcard;
}

function displayAllProduct() {
  for (var i = 0; i < productList.length; i++) {
    displayProduct(i);
  }
}

function clearProduct() {
  inputName.value = "";
  inputCatagory.value = "";
  inputPrice.value = "";
  inputDescription.value = "";
  inputImage.value = null;
}

function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(productList));
  allCardContainer.innerHTML = "";
  displayAllProduct();
}

function searchInput() {
  var keyword = inputSearch.value;

  allCardContainer.innerHTML = "";

  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(keyword.toLowerCase())) {
      displayProduct(i);
    }
  }
}
document.nextElementSibling;

function validateName(regex, element) {
  if (regex.test(element.value) === true) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    element.nextElementSibling.classList.add("d-none");
    return true;
  }

  element.classList.remove("is-valid");
  element.classList.add("is-invalid");
  element.nextElementSibling.classList.remove("d-none");

  return false;
}

// function updateInput(index) {

//   inputName.value = productList[index].name;
//   inputCatagory.value = productList[index].catagory;
//   inputPrice.value = productList[index].price;
//   inputDescription.value = productList[index].description;
//   inputImage.value = productList[index].image;
// }

// ^ Events

addbtn.addEventListener("click", addProduct);
inputSearch.addEventListener("input", searchInput);
inputName.addEventListener("input", function () {
  validateName(nameRegex, inputName);
});
inputCatagory.addEventListener("input", function () {
  validateName(catagoryRegex, inputCatagory);
});
inputPrice.addEventListener("input", function () {
  validateName(priceRegex, inputPrice);
});
inputDescription.addEventListener("input", function () {
  validateName(descriptioneRegex, inputDescription);
});
