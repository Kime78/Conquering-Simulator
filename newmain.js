var lastUpdate = Date.now()
 x = new Decimal("1e30000000")
var widthh = 0

var canprestige1 = false 
document.getElementById("gen3").classList.add("invisible")
document.getElementById("gen4").classList.add("invisible")
document.getElementById("gen5").classList.add("invisible")
document.getElementById("gen6").classList.add("invisible")
var player = {
    pr2mult : 1,
    pr2cost : 100,
    pretiege1cost : 5,
    tickspeed : new Decimal(1),
    tickspeedcost : new Decimal(5e3),
    money : new Decimal(10),
    generators : getGens(),
    tickspeedunlocked: false,
    tsprestige: 10,
    unlocked: [1,0,0,0,0,0],
  
}
function hidegentab()
{
  document.getElementById("gentab").style.display = "none";
  document.getElementById("settab").style.display = "block";
}
function showgentab()
{
  document.getElementById("gentab").style.display = "block";
  document.getElementById("settab").style.display = "none";
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
  function exportGame() {
    let output = document.getElementById('exportOutput');
    let parent = output.parentElement;
    parent.style.display = "";
    output.value = btoa(JSON.stringify(player));
    output.onblur = function() {
      parent.style.display = "none";
    }
    output.focus();
    output.select();
  
    try {
      document.execCommand('copy');
   
      output.blur();
    } catch(ex) {}
    
  }
  function uninv(i)
{
  let g = player.generators[i]
  if (i == 6)
  return
  document.getElementById("gen" + (i + 1)).classList.remove("invisible")
  player.unlocked[i] = 1;
}
function loadinv()
{
  for(let i = 0; i<=6;i++)
  {
    if(player.unlocked[i]==1)
     document.getElementById("gen" + (i + 1)).classList.remove("invisible")
  }
}
  function getGens()
{
  let generators= []
  for (let i = 0; i < 6; i++)
 {
  let generator = {
    cost: Decimal.pow(10, Math.pow(i, 2) + 1),
    bought: new Decimal(0),
    amount: new Decimal(0),
    mult: new Decimal(1),
    pr1mult: new Decimal(1),
    canpr1: false
  }
 generators.push(generator)
}

return generators;
}


  function format(amount) {
    if (!(amount instanceof Decimal)) {
      amount = new Decimal(amount);
    }
   /* if (amount.eq(Infinity)) {
      return 'Infinity'; 
    }*/
    let power = Math.floor(Decimal.log10(amount));
    let mantissa = Decimal.div(amount, Decimal.pow(10, power));
    if (Decimal.eq(0, amount) || (power >= 0 && power < 3)) {
      return amount.toFixed(1)
    } else {
      return mantissa.toFixed(1) + 'e' + power;
    }
  }

  function maxall()
{
 for(i = 0;i <= 5;i++)
 {
 let g = player.generators[i]
 while(Decimal.lte(g.cost,player.money))
 buyGenerator(i);

 }
}

  function canBuyGenerator(i) {
    return Decimal.lte(player.generators[i].cost,player.money);
  }
  
  function buyGenerator(i) {
    if (!canBuyGenerator(i)) return;
    let g = player.generators[i];
    player.money = Decimal.sub(player.money,g.cost)
    uninv(i+1)
    g.amount = Decimal.plus(g.amount,1);
    g.bought = Decimal.plus(g.bought,1);
    g.mult = Decimal.times(g.mult,1.05);
    g.cost = Decimal.times(g.cost,1.5);
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
  if (confirm("You Will Lose Everything! Press OK To Confirm!")) {
   
  for(let i = 0;i < 6; i++)
  {
     let g = player.generators[i] 
     g.pr1mult = 1
  g.amount = 0;
   g.bought = 0;
   if(i==0)
   g.cost = 10;
   g.cost = Decimal.pow(10, Math.pow(i, 2) + 1)
   g.mult = 1
   player.money = 10
   player.pr2mult = 1;
   player.tickspeed = new Decimal(1)
   player.pr2cost = 100;
   player.tickspeedcost =new Decimal(5e3)
   player.unlocked= [1,0,0,0,0,0];
  }
  player.pretiege1cost = 5
}
}

function pretiege1()
{
    player.pretiege1cost = Decimal.floor(player.money.log10())
 player.pretiege1cost = Math.floor(Math.log10(player.money)) * 1.75;
 for(let i = 0;i < 6; i++)
 { 
  let g = player.generators[i] 

   if(g.bought != 0)
   {
       g.pr1mult = Decimal.add(( Decimal.floor(player.money.log10()) /1.5) * player.pr2mult,g.pr1mult);
   }
   g.amount = 0
   g.bought = 0
   g.cost = Decimal.pow(10, Math.pow(i, 2) + 1)
   g.mult = 1

 }
  canprestige1 = false 
  player.money = 10
  
}
function canprestige2()
{
  let power = Decimal.floor(Decimal.log10(player.money))
  if(power >= player.pr2cost)
  return true;
  return false;
}
function prestige2()
{
  for(let i = 0;i < 6; i++)
 { 
  let g = player.generators[i] 

 
   g.pr1mult = 1;
   g.amount = 0
   g.bought = 0
   g.cost = Decimal.pow(10, Math.pow(i, 2) + 1)
   g.mult = 1
  
  
 } 
  player.money = 10
  player.pr2mult += 10;
  player.pretiege1cost = 5;
  player.pr2cost +=50;
  player.unlocked = [1,0,0,0,0,0]
}
function buytickspeed()
{
  if(Decimal.lte(player.tickspeedcost,player.money))
  {
    player.money= player.money.minus(player.tickspeedcost);
    player.tickspeed =  Decimal.times(player.tickspeed,.9)
    player.tickspeedcost = Decimal.times(player.tickspeedcost,10)
    
  }
 
}

function calculateprogress()
{
 
  let power = Decimal.floor(Decimal.log10(player.money))
  widthh = (power/82)
  if(widthh.toFixed(2)==0.07)
    widthh = 7;
  else
    widthh = widthh.toFixed(2) * 100 
  if(widthh <= 100)
    return widthh
  else
    return 100;
}
function updateGUI() {
    let power = Decimal.floor(Decimal.log10(player.money))
    if(player.pretiege1cost <= power)
    canprestige1 = true
    else
    canprestige1 = false
    if(canprestige2())
    {
       document.getElementById("pc2").classList.remove("hidden")
       document.getElementById("prestigeb2").innerHTML = "Loose all progress <br> but get a boost on prestieging  ";
    }
   
    else
    document.getElementById("pc2").classList.add("hidden")
    document.getElementById("tickspeedb").innerHTML = "Tickspeed Boost Cost: " + format(player.tickspeedcost);
  if(canprestige1)
  {
    document.getElementById("pc1").classList.remove("hidden")
    document.getElementById("prestigeb1").innerHTML = "Loose all progress <br> but get a boost based on gold ";}
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
     
      if (!canBuyGenerator(i))
      {
        document.getElementById("gen" + (i + 1)).classList.add("locked")
      }
       
      if(canBuyGenerator(i))
      {
        document.getElementById("gen" + (i + 1)).classList.remove("locked")
        
      }
       
    }
  }
  function getGeneratorProduction(i) {
    return player.generators[i].amount.times(getGeneratorMult(i))
  }
  
  function productionLoop(diff) {
      player.money = Decimal.add(player.money,Decimal.mul(player.generators[0].amount,Decimal.mul(player.generators[0].mult,Decimal.mul(player.generators[0].pr1mult,diff))).div(player.tickspeed))
   
    for (let i = 1; i < 6; i++) {
      player.generators[i-1 ].amount =  Decimal.add(player.generators[i-1].amount,Decimal.mul(player.generators[i].amount,Decimal.mul(player.generators[i].mult,Decimal.mul(player.generators[i].pr1mult,diff/5))))
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
  loadinv()
  window.addEventListener('keydown', function(event) {
    if (event.keyCode === 77) {
      maxall();
    }
  });
  