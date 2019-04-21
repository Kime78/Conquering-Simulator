x = new Decimal(5) 
var lastUpdate = Date.now()
var widthh = 0
var pretiege1cost = 5
var canprestige1 = false 
document.getElementById("gen3").classList.add("invisible")
document.getElementById("gen4").classList.add("invisible")
document.getElementById("gen5").classList.add("invisible")
document.getElementById("gen6").classList.add("invisible")
var player = {
  money : 10,
 generators : getGens(),
}
function saveGame() {
  localStorage.setItem('save', btoa(JSON.stringify(player)));
}
function loadGame(save) {
  if (save === undefined) {
    save = localStorage.getItem('save');
    if (!save) {
      save = localStorage.getItem('save');
    }
  }
  if (save) {
    proposedPlayer = JSON.parse(atob(save));
    if (proposedPlayer !== undefined) {
      player = proposedPlayer;
    
    }
  }
}
function getGens()
{
  let generators= []
  for (let i = 0; i < 6; i++)
 {
  let generator = {
    cost: Math.pow(Math.pow(10, i), i) * 10,
    bought: 0,
    amount: 0,
    mult: 1,
    pr1mult: 1,
    canpr1: false
  }
 generators.push(generator)
}

return generators;
}
function canBuyGenerator(i) {
  return player.generators[i].cost<=(player.money);
}
function maxall()
{
  for(i = 0;i < 6;i++)
 {

 while(canBuyGenerator(i))
 buyGenerator(i);
 }
}
document.onkeyup = function(e) {
  if (e.which == 77) {
    maxall()
  }}
function hidegentab()
{
  document.getElementById("pc1").classList.add("hidden")
}
function format(amount) {
  let power = Math.floor(Math.log10(amount))
  let mantissa = amount / Math.pow(10, power)
  if (power < 3) return amount.toFixed(2)
  return mantissa.toFixed(2) + "e" + power
}
function uninv(i)
{
  let g = player.generators[i]
  if (i == 6)
  return
  document.getElementById("gen" + (i + 1)).classList.remove("invisible")
}

function buyGenerator(i) {
  uninv(i+1);
  let g = player.generators[i - 1]
  if (g.cost > player.money) return
  player.money -= g.cost
  
  g.amount += 1
  g.bought += 1
  g.mult *= 1.05
  g.cost *= 1.5
}
function move() {
  var elem = document.getElementById("myBar"); 
  var width = 1;
  
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++; 
      elem.style.width = width + '%'; 
    }
  }
}
function reset()
{ 
  for(let i = 0;i < 6; i++)
  {
     let g = player.generators[i] 
     g.pr1mult = 1
  g.amount = 0
   g.bought = 0
   g.cost = Math.pow(Math.pow(10, i), i) * 10
   g.mult = 1
   player.money = 10
  }
  pretiege1cost = 5
}
function pretiege1()
{
 pretiege1cost = Math.floor(Math.log10(player.money)) * 1.75;
 for(let i = 0;i < 6; i++)
 { 
  let g = player.generators[i] 
  if(g.amount !=0)
  {
 
   g.pr1mult *= Math.floor(Math.log10(player.money))
   g.amount = 0
   g.bought = 0
   g.cost = Math.pow(Math.pow(10, i), i) * 10
   g.mult = 1
  
  }
   
  
  
   
 }
  canprestige1 = false 
  player.money = 10
}
function calculateprogress()
{
  let power = Math.floor(Math.log10(player.money))
  widthh = (power/82)
  widthh = widthh.toFixed(2) * 100 
  if(widthh <= 100)
  return widthh
  else
  return 100;
}
function updateGUI() {
  let power = Math.floor(Math.log10(player.money))
  if(pretiege1cost <= power)
  canprestige1 = true
  else
  canprestige1 = false

if(canprestige1)
{
  document.getElementById("pc1").classList.remove("hidden")
  document.getElementById("prestigeb1").innerHTML = "Loose all progress <br> but get a boost based on gold: " +  Math.floor(Math.log10(player.money)) 
}
else
{
  document.getElementById("pc1").classList.add("hidden")

}
  var elem = document.getElementById("myBar"); 
  elem.textContent = calculateprogress() + '%'
  
  elem.style.width = calculateprogress() + '%';
  document.getElementById("currency").textContent = "You have " + format(player.money) + " Gold"
  for (let i = 0; i < 6; i++) {
    let g = player.generators[i]
    document.getElementById("gen" + (i + 1)).innerHTML = "Amount: " + format(g.amount) + "<br>Bought: " + g.bought + "<br>Mult: " + format(g.mult) + "x<br>Cost: " + format(g.cost)
    if (g.cost > player.money) document.getElementById("gen" + (i + 1)).classList.add("locked")
    else document.getElementById("gen" + (i + 1)).classList.remove("locked")
  }
}

function productionLoop(diff) {
  player.money += player.generators[0].amount * player.generators[0].mult * player.generators[0].pr1mult * diff
  for (let i = 1; i < 6; i++) {
    player.generators[i - 1].amount += player.generators[i].amount * player.generators[i].mult * player.generators[i].pr1mult * diff / 5
  }
}

function mainLoop() {
  var diff = (Date.now() - lastUpdate) / 1000
  
  productionLoop(diff)
  updateGUI()

  lastUpdate = Date.now()
}
loadGame()
setInterval(mainLoop, 50)
setInterval(saveGame,1000)

updateGUI()