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
  let newFragment = document.createDocumentFragment();
  allData.forEach((data, index) => {
    let newTr = document.createElement("tr")
    newTr.innerHTML = `
      <tr>
        <th id="currency1">${++index}</th>
        <td id="currency2">${data.Code}</td>
        <td id="currency3">${data.CcyNm_UZ}</td>
        <td id="currency4">${data.Ccy}</td>
        <td id="currency5">${data.Rate}</td>
        <td id="currency6">${data.Date}</td>
        <td id="currency7">
          <button class="btn btn-success">
            <img src="./images/bookmark-24px.png" alt="bookmark icon" class="bookmark-img">
          </button>
        </td>
      </tr>
    `
    newFragment.appendChild(newTr);
  });
  tbody.appendChild(newFragment)
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
    let filtered = allPrice.filter((price) => value >= price.Rate )
    renderTemplate(filtered)
  }
  filterPrice(currencyInfo)
})

// search

  // search.addEventListener("input", () =>{
  //   let searchValue = search.value.trim().toLowerCase();

  //   function renderSearching(allData){
  //     let searched = [];
  //     tbody.innerHTML = ""

  //     allData.forEach(element => {
  //       if(element.CcyNm_UZ.toLowerCase().includes(searchValue)){
  //         searched.push(element)
  //       }
  //     });
  //     renderTemplate(searched)
  //   }
  //   renderSearching(currencyInfo);
  // })