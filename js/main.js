let currencyInfo = [];
if(localStorage.getItem("currency_info")){
  currencyInfo = JSON.parse(localStorage.getItem("currency_info"))
}

async function getData (url){
  try {
    loading.classList.add("loading--on")
    let rawData = await fetch(url);
    let data = await rawData.json();
    loading.classList.remove("loading--on")
    let storage = window.localStorage.setItem("currency_info", JSON.stringify(data.data));

  } catch (error) {
    console.log("Ma'lumot uzatishda xatolik bor!");
  }
}

getData("https://pressa-exem.herokuapp.com/api-49");

function renderTemplate (allData){
  let resultTemplate = "";
  allData.forEach((data, index) => {
    resultTemplate = template.content.cloneNode(true);

    let currency1 = template.content.querySelector("#currency1");
    let currency2 = template.content.querySelector("#currency2");
    let currency3 = template.content.querySelector("#currency3");
    let currency4 = template.content.querySelector("#currency4");
    let currency5 = template.content.querySelector("#currency5");
    let currency6 = template.content.querySelector("#currency6");
    let currency7 = template.content.querySelector("#currency7");

    currency1.textContent = `${++index}`;
    currency2.textContent = `${data.Code}`;
    currency3.textContent = `${data.CcyNm_UZ}`;
    currency4.textContent = `${data.Ccy}`;
    currency5.textContent = `${data.Rate}`;
    currency6.textContent = `${data.Date}`;
    // currency7.textContent = `${++index}`;
    tbody.appendChild(resultTemplate)
  });
}
renderTemplate(currencyInfo)

// sort

let elSort = document.querySelector(".form-select");
elSort.addEventListener("change", (event) =>{
  function sortPrice (allPrice){
    if(event.target.value === "growth"){
      tbody.innerHTML = "";
      let sortedPrice = allPrice.sort((growth, decrease) => growth.Rate - decrease.Rate);
      renderTemplate(sortedPrice)
    }
    else if(event.target.value === "decrease"){
      tbody.innerHTML = "";
      let sortedPrice = allPrice.sort((growth, decrease) => decrease.Rate - growth.Rate);
      renderTemplate(sortedPrice)
    }
    else{
      tbody.innerHTML = "";
      renderTemplate(allPrice)

    }

  }

  sortPrice(currencyInfo);
})

// filter


input.addEventListener("input", () =>{
  let value = input.value.trim().toLowerCase();
  function filterPrice(allPrice){
    tbody.innerHTML = "";
    let filtered = allPrice.filter((price) => value <= price.Rate )
    renderTemplate(filtered)
  }
  filterPrice(currencyInfo)
})