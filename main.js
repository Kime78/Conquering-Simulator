var money = 10
var generators = []
var lastUpdate = Date.now()
var widthh = 0
document.getElementById("gen3").classList.add("invisible")
document.getElementById("gen4").classList.add("invisible")
document.getElementById("gen5").classList.add("invisible")
document.getElementById("gen6").classList.add("invisible")

for (let i = 0; i < 6; i++) {
  let generator = {
    cost: Math.pow(Math.pow(10, i), i) * 10,
    bought: 0,
    amount: 0,
    mult: 1
  }
  generators.push(generator)
}

function format(amount) {
  let power = Math.floor(Math.log10(amount))
  let mantissa = amount / Math.pow(10, power)
  if (power < 3) return amount.toFixed(2)
  return mantissa.toFixed(2) + "e" + power
}
function uninv(i)
{
  let g = generators[i]
  if (i == 6)
  return
  document.getElementById("gen" + (i + 1)).classList.remove("invisible")
}

function buyGenerator(i) {
  let g = generators[i - 1]
  if (g.cost > money) return
  money -= g.cost
  uninv(i);
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
function calculateprogress()
{
  widthh = money / 1e14
  widthh = widthh.toFixed(2) * 100 
  return widthh
}
function updateGUI() {
  var elem = document.getElementById("myBar"); 
  
  
  elem.style.width = calculateprogress() + '%';
  document.getElementById("currency").textContent = "You have " + format(money) + " Gold"
  for (let i = 0; i < 6; i++) {
    let g = generators[i]
    document.getElementById("gen" + (i + 1)).innerHTML = "Amount: " + format(g.amount) + "<br>Bought: " + g.bought + "<br>Mult: " + format(g.mult) + "x<br>Cost: " + format(g.cost)
    if (g.cost > money) document.getElementById("gen" + (i + 1)).classList.add("locked")
    else document.getElementById("gen" + (i + 1)).classList.remove("locked")
  }
}

function productionLoop(diff) {
  money += generators[0].amount * generators[0].mult * diff
  for (let i = 1; i < 6; i++) {
    generators[i - 1].amount += generators[i].amount * generators[i].mult * diff / 5
  }
}

function mainLoop() {
  var diff = (Date.now() - lastUpdate) / 1000
  
  productionLoop(diff)
  updateGUI()

  lastUpdate = Date.now()
}

setInterval(mainLoop, 50)

updateGUI()