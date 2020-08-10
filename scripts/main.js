// I. Variables
const currencyOne = document.querySelector('#currency-one');
const currencyTwo = document.querySelector('#currency-two');
const amountOne = document.querySelector('.amount-one');
const amountTwo = document.querySelector('.amount-two');
const swapBtn = document.querySelector('.swap');
const rateInfo = document.querySelector('.rate-info');

// II. Functions
const calculate = () => {
    // Get the api data
    fetch(`https://api.ratesapi.io/api/latest?base=${currencyOne.value}&symbols=${currencyTwo.value}`)
        .then(res => res.json())
        .then(data => {
            const currency1 = currencyOne.value;
            const currency2 = currencyTwo.value;

            const rate = data.rates[currency2];
            rateInfo.textContent = `1 ${currency1} = ${rate.toFixed(4)} ${currency2}`;
            rateInfo.style.visibility = 'visible';
            const quantity = (amountOne.value) * rate.toFixed(2);
            amountTwo.value = quantity;
        });
};

const swapCurrency = () => {
    const currencySwapOne = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = currencySwapOne;
    calculate();
};



// III. Event Listeners
currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
swapBtn.addEventListener('click', swapCurrency);
window.addEventListener('load', calculate);