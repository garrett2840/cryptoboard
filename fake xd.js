const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

setInterval(function() {
var request = new XMLHttpRequest(),
arrow;

document.querySelectorAll(".card").forEach(function(el){el.remove();});

request.open('GET', 'https://api.coinmarketcap.com/v1/ticker/?limit=12', true);
request.onload = function () {

  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    data.forEach(coin => {
    
    // Create a div with a card class
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    // Create an h1 and set the text content to the coin
    const h1 = document.createElement('h1');
    h1.textContent = coin.name;
    
    if (coin.percent_change_24h > 0){
        arrow = ' ↑';
    }else{
        arrow = ' ↓';
    }
    
    // Create a p and set the text content to the coin value
    const p = document.createElement('p');
    p.textContent = '$'+coin.price_usd+arrow;

    // Add the cards to the container element
    container.appendChild(card);

    // Each card will contain a currency and a value
    card.appendChild(h1);
    card.appendChild(p);
    });
  } else {
    console.log('error');
  }
}

request.send()},10000);