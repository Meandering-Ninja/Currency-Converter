
const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns){
for (currcode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value=currcode;
    select.append(newOption);
}
select.addEventListener("change",(evt)=>{
    updateflag(evt.target);
})
}

const updateflag =(element)=>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src =newSrc;
};

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval == '' || amtval<1){
        amtval = 1;
        amount.value =1
    }
    // console.log(fromCurr.value,toCurr.value);
    // console.log(fromCurr.value.toLowerCase(),toCurr.value.toLowerCase());
    // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    // let response = await fetch(URL);
    // let data = await response.json();
    // console.log(response);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

let response = await fetch(URL);
let data = await response.json();


// Access the specific conversion rate from the data
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log('Conversion Rate:', rate);
    let final_amount =amtval*rate;
    msg.innerText =`${amtval} ${fromCurr.value} = ${final_amount} ${toCurr.value}`;


});