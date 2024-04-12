const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns =document.querySelectorAll(".dropdown select")
const btn=document.querySelector("form button")
const fromcurr=document.querySelector(".from select")
const tocurr=document.querySelector(".to select")
const msg = document.querySelector(".msg")

for (code in countryList){
    console.log(code);
}

for(let select of dropdowns){
    for(let currcode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        // select.append(newoption);
        if(select.name==="from" && currcode==="USD"){
            newoption.selected="selected";
        }
        else if(select.name==="to" && currcode==="INR"){
            newoption.selected="selected";
        }
        select.append(newoption);

    }
     select.addEventListener("change",(evt) => {
        updateimg(evt.target);

     }
    )
}


function updateimg(element){
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let image = element.parentNode.querySelector("img");
    image.src=newsrc;


 }

 btn.addEventListener("click", async function(e) {
    e.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    console.log(amtval);
    if(amtval===" " || amtval<1){
        amtval=1;
        amount.value=1;
    }
   // console.log(fromcurr, tocurr);

    const URL=`${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[tocurr.value.toLowerCase()]
    let finalamount=rate*amtval;
    msg.innerText =`${amtval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;

 })
