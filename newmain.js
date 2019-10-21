var lastUpdate = Date.now()
var widthh = 0

function get(id) {
    return document.getElementById(id);
}
var canprestige1 = false
document.getElementById("gen3").classList.add("invisible")
document.getElementById("gen4").classList.add("invisible")
document.getElementById("gen5").classList.add("invisible")
document.getElementById("gen6").classList.add("invisible")
var player = {
    pr2mult: 1,
    pr2cost: 100,
    pretiege1cost: 5,
    alientscost: 1,
    tickspeed: new Decimal(1),
    tickspeedcost: new Decimal(5e3),
    money: new Decimal(10),
    generators: getGens(),
    tickspeedunlocked: false,
    tsprestige: 10,
    unlocked: [1, 0, 0, 0, 0, 0],
    treeUpgrades: [],
    alienpoints: new Decimal(0),
    unlocked_auto: false,
    unlocked_fuel: false,
    unlocked_autofuel: false,
    unlocked_upgrades: false,
    s21: false,
    alienied: 0,
    aliengenboost: 1,
    gendecrease: 1,
    s31: false,
    s32: false,
    s41: false,
    s42: false,
    alienfuelgen: alienfuelgens(),
    alienfuel: new Decimal(10),
    autobuyer: getautobuyer(),
}
var fuelconstant = [1, 25, 1000, 1e6, 1e9, 1e12, 1e18, 1e24]

function hidegentab() {
    document.getElementById("gentab").style.display = "none";
    document.getElementById("settab").style.display = "block";
    document.getElementById("altab").style.display = "none";
}

function showgentab() {
    document.getElementById("gentab").style.display = "block";
    document.getElementById("settab").style.display = "none";
    document.getElementById("altab").style.display = "none";
}

function showalientab() {
    document.getElementById("gentab").style.display = "none";
    document.getElementById("settab").style.display = "none";
    document.getElementById("altab").style.display = "block";
}

function showstudy() {
    document.getElementById("ats").style.display = "block";
    document.getElementById("alf").style.display = "none";
    document.getElementById("auto").style.display = "none";
    document.getElementById("aup").style.display = "none";
    drawTree()
}

function showfuel() {
    document.getElementById("ats").style.display = "none";
    document.getElementById("alf").style.display = "block";
    document.getElementById("auto").style.display = "none";
    document.getElementById("aup").style.display = "none";
}

function showautobuyer() {
    document.getElementById("ats").style.display = "none";
    document.getElementById("alf").style.display = "none";
    document.getElementById("auto").style.display = "block";
    document.getElementById("aup").style.display = "none";
}

function showupgrades() {
    document.getElementById("ats").style.display = "none";
    document.getElementById("alf").style.display = "none";
    document.getElementById("auto").style.display = "none";
    document.getElementById("aup").style.display = "block";
}

function autobuyer1() {
    if (document.getElementById("1ison").checked)
        if (canBuyGenerator(0))
            buyGenerator(0)
}

function autobuyer2() {
    if (document.getElementById("2ison").checked)
        if (canBuyGenerator(1))
            buyGenerator(1)
}

function autobuyer3() {
    if (document.getElementById("3ison").checked)
        if (canBuyGenerator(2))
            buyGenerator(2)
}

function autobuyer4() {
    if (document.getElementById("4ison").checked)
        if (canBuyGenerator(3))
            buyGenerator(3)
}

function autobuyer5() {
    if (document.getElementById("5ison").checked)
        if (canBuyGenerator(4))
            buyGenerator(4)
}

function autobuyer6() {
    if (document.getElementById("6ison").checked)
        if (canBuyGenerator(5))
            buyGenerator(5)
}

function autobuyer7() {
    if (document.getElementById("7ison").checked)
        if (canprestige1)
            pretiege1();
}

function autobuyer8() {
    if (document.getElementById("8ison").checked)
        if (canprestige2())
            prestige2();
}

function autobuyer9() {
    if (document.getElementById("9ison").checked)
        buytickspeed();
}

function autobuyer10() {
    if (document.getElementById("10ison").checked) {
        buyspeedalienfuel1()
        buyspeedalienfuel2()
        buyspeedalienfuel3()
        buyspeedalienfuel4()
        buyspeedalienfuel5()
        buyspeedalienfuel6()
        buyspeedalienfuel7()
        buyspeedalienfuel8()
        for (let i = 0; i <= 7; i++)
            buymultfuel(i)
    }

}

function calc_procent(n, p) {
    return (n - (n * (p / 100)))
}

function buyspeedautobuyer1() {
    if (Decimal.lte(player.autobuyer[0].cost, player.alienpoints)) {
        player.autobuyer[0].period = calc_procent(player.autobuyer[0].period, 25);
        player.autobuyer[0].cost = Decimal.mul(player.autobuyer[0].cost, 5)
        player.alienpoints = Decimal.minus(player.alienpoints, player.autobuyer[0].cost);

        clearInterval(autobuyer1interval)
        autobuyer1interval = setInterval(function() {
            autobuyer1()
        }, player.autobuyer[0].period);
    }

}

function buyspeedautobuyer2() {
    if (Decimal.lte(player.autobuyer[1].cost, player.alienpoints)) {
        player.autobuyer[1].period = calc_procent(player.autobuyer[1].period, 25);
        player.autobuyer[1].cost = Decimal.mul(player.autobuyer[1].cost, 5)
        player.alienpoints = Decimal.minus(player.alienpoints, player.autobuyer[1].cost);

        clearInterval(autobuyer2interval)
        autobuyer2interval = setInterval(function() {
            autobuyer2()
        }, player.autobuyer[1].period);
    }

}

function buyspeedautobuyer3() {
    if (Decimal.lte(player.autobuyer[2].cost, player.alienpoints)) {
        player.autobuyer[2].period = calc_procent(player.autobuyer[2].period, 25);
        player.autobuyer[2].cost = Decimal.mul(player.autobuyer[2].cost, 5)
        player.alienpoints = Decimal.minus(player.alienpoints, player.autobuyer[2].cost);

        clearInterval(autobuyer3interval)
        autobuyer3interval = setInterval(function() {
            autobuyer3()
        }, player.autobuyer[2].period);
    }

}

function buyspeedautobuyer4() {
    if (Decimal.lte(player.autobuyer[3].cost, player.alienpoints)) {
        player.autobuyer[3].period = calc_procent(player.autobuyer[3].period, 25);
        player.autobuyer[3].cost = Decimal.mul(player.autobuyer[3].cost, 5)
        player.alienpoints = Decimal.minus(player.alienpoints, player.autobuyer[3].cost);

        clearInterval(autobuyer4interval)
        autobuyer4interval = setInterval(function() {
            autobuyer4()
        }, player.autobuyer[3].period);
    }

}

function buyspeedautobuyer5() {
    if (Decimal.lte(player.autobuyer[4].cost, player.alienpoints)) {
        player.autobuyer[4].period = calc_procent(player.autobuyer[4].period, 25);
        player.autobuyer[4].cost = Decimal.mul(player.autobuyer[4].cost, 5)
        player.alienpoints = Decimal.minus(player.alienpoints, player.autobuyer[4].cost);

        clearInterval(autobuyer5interval)
        autobuyer5interval = setInterval(function() {
            autobuyer5()
        }, player.autobuyer[4].period);
    }

}

function buyspeedautobuyer6() {
    if (Decimal.lte(player.autobuyer[5].cost, player.alienpoints)) {
        player.autobuyer[5].period = calc_procent(player.autobuyer[5].period, 25);
        player.autobuyer[5].cost = Decimal.mul(player.autobuyer[5].cost, 5)
        player.alienpoints = Decimal.minus(player.alienpoints, player.autobuyer[5].cost);

        clearInterval(autobuyer6interval)
        autobuyer6interval = setInterval(function() {
            autobuyer6()
        }, player.autobuyer[5].period);
    }

}

function buyspeedautobuyer7() {
    if (Decimal.lte(player.autobuyer[6].cost, player.alienpoints)) {
        player.autobuyer[6].period = calc_procent(player.autobuyer[6].period, 25);
        player.autobuyer[6].cost = Decimal.mul(player.autobuyer[6].cost, 5)
        player.alienpoints = Decimal.minus(player.alienpoints, player.autobuyer[6].cost);

        clearInterval(autobuyer7interval)
        autobuyer7interval = setInterval(function() {
            autobuyer7()
        }, player.autobuyer[6].period);
    }

}

function buyspeedautobuyer8() {
    if (Decimal.lte(player.autobuyer[7].cost, player.alienpoints)) {
        player.autobuyer[7].period = calc_procent(player.autobuyer[7].period, 25);
        player.autobuyer[7].cost = Decimal.mul(player.autobuyer[7].cost, 5)
        player.alienpoints = Decimal.minus(player.alienpoints, player.autobuyer[7].cost);

        clearInterval(autobuyer8interval)
        autobuyer8interval = setInterval(function() {
            autobuyer8()
        }, player.autobuyer[7].period);
    }

}

function buyspeedautobuyer9() {
    if (Decimal.lte(player.autobuyer[8].cost, player.alienpoints)) {
        player.autobuyer[8].period = calc_procent(player.autobuyer[8].period, 25);
        player.autobuyer[8].cost = Decimal.mul(player.autobuyer[8].cost, 5)
        player.alienpoints = Decimal.minus(player.alienpoints, player.autobuyer[8].cost);

        clearInterval(autobuyer9interval)
        autobuyer9interval = setInterval(function() {
            autobuyer9()
        }, player.autobuyer[8].period);
    }

}

function buyspeedautobuyer10() {
    if (Decimal.lte(player.autobuyer[9].cost, player.alienpoints)) {
        player.autobuyer[9].period = calc_procent(player.autobuyer[9].period, 25);
        player.autobuyer[9].cost = Decimal.mul(player.autobuyer[9].cost, 5)
        player.alienpoints = Decimal.minus(player.alienpoints, player.autobuyer[9].cost);

        clearInterval(autobuyer10interval)
        autobuyer10interval = setInterval(function() {
            autobuyer10()
        }, player.autobuyer[9].period);
    }

}

function buytreeupgrade(n) {
    if (n == 0) {
        if (canbuytree(0)) {
            player.treeUpgrades.push("study0")
            unlocked_upgrades = true;
            document.getElementById("studyy0").classList.add("bought")
            drawTree()
            player.alientscost = 0.75;
        }

    }
    if (n == 1) {
        if (canbuytree(1)) {
            player.treeUpgrades.push("study1")
            document.getElementById("studyy1").classList.add("bought")
            drawTree()
            player.unlocked_upgrades = true;
        }

    }
    if (n == 21) {
        if (canbuytree(21)) {
            player.treeUpgrades.push("study21")
            document.getElementById("studyy21").classList.add("bought")
            drawTree()
            player.s21 = true;
        }

    }
    if (n == 22) {
        if (canbuytree(22)) {
            player.treeUpgrades.push("study22")
            document.getElementById("studyy22").classList.add("bought")
            drawTree()
            player.gendecrease = 0.95;
        }


    }
    if (n == 31) {
        if (canbuytree(31)) {
            player.treeUpgrades.push("study31")
            document.getElementById("studyy31").classList.add("bought")
            drawTree()
            player.s31 = true;
        }


    }
    if (n == 32) {
        if (canbuytree(32)) {
            player.treeUpgrades.push("study32")
            document.getElementById("studyy32").classList.add("bought")
            drawTree()
            player.s32 = true;
        }

    }
    if (n == 41) {
        if (canbuytree(41)) {
            player.treeUpgrades.push("study41")
            document.getElementById("studyy41").classList.add("bought")
            drawTree()
            player.s41 = true;
        }

    }
    if (n == 42) {
        if (canbuytree(42)) {
            player.treeUpgrades.push("study42")
            document.getElementById("studyy42").classList.add("bought")
            drawTree()
            player.s42 = true;
        }

    }
    if (n == 5) {
        if (canbuytree(5)) {
            player.treeUpgrades.push("study5")
            document.getElementById("studyy5").classList.add("bought")
            drawTree()
            player.unlocked_fuel = true;
        }

    }
    if (n == 6) {
        if (canbuytree(6)) {
            player.treeUpgrades.push("study6")
            document.getElementById("studyy6").classList.add("bought")
            drawTree()
            player.unlocked_auto = true;
        }

    }
    if (n == 7) {
        if (canbuytree(7)) {
            player.treeUpgrades.push("study7")
            document.getElementById("studyy7").classList.add("bought")
            drawTree()
            player.unlocked_autofuel = true;
        }

    }
    if (n == 8) {
        if (canbuytree(8)) {
            player.treeUpgrades.push("study8")
            document.getElementById("studyy8").classList.add("bought")
            drawTree()
        }

    }
}

function canbuytree(n) {
    if (n == 0) {
        if (player.alienpoints >= 1)
            return true
        return false
    }
    if (n == 1) {
        if (player.alienpoints >= 10)
            return true
        return false
    }
    if (n == 21) {
        if (player.alienpoints >= 50)
            return true
        return false
    }
    if (n == 22) {
        if (player.alienpoints >= 50)
            return true
        return false

    }
    if (n == 31) {
        if (player.alienpoints >= 100)
            return true
        return false

    }
    if (n == 32) {
        if (player.alienpoints >= 100)
            return true
        return false
    }
    if (n == 41) {
        if (player.alienpoints >= 250)
            return true
        return false
    }
    if (n == 42) {
        if (player.alienpoints >= 250)
            return true
        return false
    }
    if (n == 5) {
        if (player.alienpoints >= 1000)
            return true
        return false
    }
    if (n == 6) {
        if (player.alienpoints >= 1e12)
            return true
        return false
    }
    if (n == 7) {
        if (player.alienpoints >= 1e25)
            return true
        return false
    }
    if (n == 8) {
        if (player.alienpoints >= 1e50)
            return true
        return false
    }
}

function updatealienbutt() {
    if (player.unlocked_fuel) {
        document.getElementById("fuelbutt").style.display = "block"
    } else {
        document.getElementById("fuelbutt").style.display = "none"
    }
    if (player.unlocked_auto) {
        document.getElementById("autobutt").style.display = "block"
    } else {
        document.getElementById("autobutt").style.display = "none"
    }
    if (player.unlocked_autofuel) {
        document.getElementById("afbutt").style.display = "block"
    } else {
        document.getElementById("afbutt").style.display = "none"
    }
    if (player.unlocked_upgrades) {
        document.getElementById("upbutt").style.display = "block"
    } else {
        document.getElementById("upbutt").style.display = "none"
    }
}
Math.log = (function() {
    var log = Math.log;
    return function(n, base) {
        return log(n) / (base ? log(base) : 1);
    };
})();

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

function logt(n, b) {
    return Math.log(n) / Math.log(b)
}

function get_alienpoints() {
    return Math.floor(Decimal.log10(player.money) / 75)
}

function can_alien() {
    return get_alienpoints() != 0;
}

function alien() {
    if (can_alien()) {
        player.alienpoints = get_alienpoints();
        for (let i = 0; i < 6; i++) {
            let g = player.generators[i]


            g.pr1mult = 1;
            g.amount = 0
            g.bought = 0
            g.cost = Decimal.pow(10, Math.pow(i, 2) + 1)
            g.mult = 1


        }
        player.money = 10
        player.pr2mult = 1;
        player.pretiege1cost = 5;
        player.unlocked = [1, 0, 0, 0, 0, 0]
        player.pr2cost = 60;
        player.alienied++;
        if (player.s21)
            player.aliengenboost *= 3;
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
    } catch (ex) {}

}

function uninv(i) {
    let g = player.generators[i]
    if (i == 6)
        return
    document.getElementById("gen" + (i + 1)).classList.remove("invisible")
    player.unlocked[i] = 1;
}

function loadinv() {
    for (let i = 0; i <= 6; i++) {
        if (player.unlocked[i] == 1)
            document.getElementById("gen" + (i + 1)).classList.remove("invisible")
    }
}

function getGens() {
    let generators = []
    for (let i = 0; i < 6; i++) {
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

function alienfuelgens() {
    let generators = []
    for (let i = 1; i <= 8; i++) {
        let generator = {
            cost_mul: Decimal.pow(10, Math.pow(i, 2)),
            cost_speed: Decimal.pow(10, Math.pow(i, 2) + 1),
            bought_mul: 0,
            bought_speed: 0,
            mult: new Decimal(1),
            period: 100 + 20 * i,
        }
        generators.push(generator)
    }

    return generators;
}

function getautobuyer() {
    let generators = []
    for (let i = 1; i <= 10; i++) {
        let generator = {
            cost: new Decimal.pow(10, Math.pow(i, 2)),
            period: 20000 + 15000 * i, //20000 = 20 seconds
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

function maxall() {
    for (i = 0; i <= 5; i++) {
        let g = player.generators[i]
        while (Decimal.lte(g.cost, player.money))
            buyGenerator(i);

    }
}

function canBuyGenerator(i) {
    return Decimal.lte(player.generators[i].cost, player.money);
}

function buyGenerator(i) {
    if (!canBuyGenerator(i)) return;
    let g = player.generators[i];
    player.money = Decimal.sub(player.money, g.cost)
    uninv(i + 1)
    g.amount = Decimal.plus(g.amount, 1);
    g.bought = Decimal.plus(g.bought, 1);
    g.mult = Decimal.times(g.mult, 1.05);
    g.cost = Decimal.mul(Decimal.times(g.cost, 1.5), player.gendecrease);
}

function move() {
    var elem = document.getElementById("myBar");
    var width = 1;

    var id = setInterval(frame, 10);

    function frame() {
        if (width >= 100) {
            clearIntervalInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}

function reset() {
    if (confirm("You Will Lose Everything! Press OK To Confirm!")) {

        for (let i = 0; i < 6; i++) {
            let g = player.generators[i]
            g.pr1mult = 1
            g.amount = 0;
            g.bought = 0;
            if (i == 0)
                g.cost = 10;
            g.cost = Decimal.pow(10, Math.pow(i, 2) + 1)
            g.mult = 1
            player.money = 10
            player.pr2mult = 1;
            player.tickspeed = new Decimal(1)
            player.pr2cost = 100;
            player.tickspeedcost = new Decimal(5e3)
            player.unlocked = [1, 0, 0, 0, 0, 0];
        }
        player.pretiege1cost = 5
    }
}

function pretiege1() {
    player.pretiege1cost = Decimal.floor(player.money.log10())
    player.pretiege1cost = Math.floor(Math.log10(player.money)) * 1.75;
    if (player.s31)
        player.pretiege1cost = Math.floor(player.pretiege1cost * 0.65)
    for (let i = 0; i < 6; i++) {
        let g = player.generators[i]

        if (g.bought != 0) {
            g.pr1mult = Decimal.add((Decimal.floor(player.money.log10()) / 1.5) * player.pr2mult, g.pr1mult);
            if (player.s41)
                g.pr1mult = Decimal.div(g.pr1mult, 0.75)
        }
        g.amount = 0
        g.bought = 0
        g.cost = Decimal.pow(10, Math.pow(i, 2) + 1)
        g.mult = 1

    }
    canprestige1 = false
    player.money = 10

}

function canprestige2() {
    let power = Decimal.floor(Decimal.log10(player.money))
    if (power >= player.pr2cost)
        return true;
    return false;
}

function prestige2() {
    for (let i = 0; i < 6; i++) {
        let g = player.generators[i]
        g.pr1mult = 1;
        g.amount = 0
        g.bought = 0
        g.cost = Decimal.pow(10, Math.pow(i, 2) + 1)
        g.mult = 1
    }
    player.money = 10
    player.pr2mult += 10;
    if (player.s42)
        player.pr2mult += 4;
    player.pretiege1cost = 5;
    player.pr2cost += 10;

    if (player.s32)
        player.pr2cost -= 4;

    player.unlocked = [1, 0, 0, 0, 0, 0]
}

function buytickspeed() {
    if (Decimal.lte(player.tickspeedcost, player.money)) {
        player.money = player.money.minus(player.tickspeedcost);
        player.tickspeed = Decimal.times(player.tickspeed, .9)
        player.tickspeedcost = Decimal.times(Decimal.times(player.tickspeedcost, 10), player.alientscost)

    }

}

function buyspeedalienfuel1() {
    if (Decimal.lte(player.alienfuelgen[0].cost_speed, player.alienfuel)) {
        player.alienfuelgen[0].period -= 10;
        player.alienfuelgen[0].bought_speed += 1;
        player.alienfuel = Decimal.minus(player.alienfuel, player.alienfuelgen[0].cost_speed);
        player.alienfuelgen[0].cost_speed = Decimal.mul(player.alienfuelgen[0].cost_speed, 10)
        clearInterval(fuel1interval)
        fuel1interval = setInterval(function() {
            fuelproduction(0)
        }, player.alienfuelgen[0].period);
    }
}

function buyspeedalienfuel2() {
    if (Decimal.lte(player.alienfuelgen[1].cost_speed, player.alienfuel)) {
        player.alienfuelgen[1].period -= 10;
        player.alienfuelgen[1].bought_speed += 1;
        player.alienfuel = Decimal.minus(player.alienfuel, player.alienfuelgen[1].cost_speed);
        player.alienfuelgen[1].cost_speed = Decimal.mul(player.alienfuelgen[1].cost_speed, 10)
        clearInterval(fuel2interval)
        fuel2interval = setInterval(function() {
            fuelproduction(1)
        }, player.alienfuelgen[1].period);
    }
}

function buyspeedalienfuel3() {
    if (Decimal.lte(player.alienfuelgen[2].cost_speed, player.alienfuel)) {
        player.alienfuelgen[2].period -= 10;
        player.alienfuelgen[2].bought_speed += 1;
        player.alienfuel = Decimal.minus(player.alienfuel, player.alienfuelgen[2].cost_speed);
        player.alienfuelgen[2].cost_speed = Decimal.mul(player.alienfuelgen[2].cost_speed, 10)
        clearInterval(fuel3interval)
        fuel3interval = setInterval(function() {
            fuelproduction(2)
        }, player.alienfuelgen[2].period);
    }
}

function buyspeedalienfuel4() {
    if (Decimal.lte(player.alienfuelgen[3].cost_speed, player.alienfuel)) {
        player.alienfuelgen[3].period -= 10;
        player.alienfuelgen[3].bought_speed += 1;
        player.alienfuel = Decimal.minus(player.alienfuel, player.alienfuelgen[3].cost_speed);
        player.alienfuelgen[3].cost_speed = Decimal.mul(player.alienfuelgen[3].cost_speed, 10)
        clearInterval(fuel4interval)
        fuel4interval = setInterval(function() {
            fuelproduction(3)
        }, player.alienfuelgen[3].period);
    }
}

function buyspeedalienfuel5() {
    if (Decimal.lte(player.alienfuelgen[4].cost_speed, player.alienfuel)) {
        player.alienfuelgen[4].period -= 10;
        player.alienfuelgen[4].bought_speed += 1;
        player.alienfuel = Decimal.minus(player.alienfuel, player.alienfuelgen[4].cost_speed);
        player.alienfuelgen[4].cost_speed = Decimal.mul(player.alienfuelgen[4].cost_speed, 10)
        clearInterval(fuel5interval)
        fuel5interval = setInterval(function() {
            fuelproduction(4)
        }, player.alienfuelgen[4].period);
    }
}

function buyspeedalienfuel6() {
    if (Decimal.lte(player.alienfuelgen[5].cost_speed, player.alienfuel)) {
        player.alienfuelgen[5].period -= 10;
        player.alienfuelgen[5].bought_speed += 1;
        player.alienfuel = Decimal.minus(player.alienfuel, player.alienfuelgen[5].cost_speed);
        player.alienfuelgen[5].cost_speed = Decimal.mul(player.alienfuelgen[5].cost_speed, 10)
        clearInterval(fuel6interval)
        fuel6interval = setInterval(function() {
            fuelproduction(5)
        }, player.alienfuelgen[5].period);
    }
}

function buyspeedalienfuel7() {
    if (Decimal.lte(player.alienfuelgen[6].cost_speed, player.alienfuel)) {
        player.alienfuelgen[6].period -= 10;
        player.alienfuelgen[6].bought_speed += 1;
        player.alienfuel = Decimal.minus(player.alienfuel, player.alienfuelgen[6].cost_speed);
        player.alienfuelgen[6].cost_speed = Decimal.mul(player.alienfuelgen[6].cost_speed, 10)
        clearInterval(fuel7interval)
        fuel7interval = setInterval(function() {
            fuelproduction(6)
        }, player.alienfuelgen[6].period);
    }
}

function buyspeedalienfuel8() {
    if (Decimal.lte(player.alienfuelgen[7].cost_speed, player.alienfuel)) {
        player.alienfuelgen[7].period -= 10;
        player.alienfuelgen[7].bought_speed++;
        player.alienfuel = Decimal.minus(player.alienfuel, player.alienfuelgen[7].cost_speed);
        player.alienfuelgen[7].cost_speed = Decimal.mul(player.alienfuelgen[7].cost_speed, 10)
        clearInterval(fuel8interval)
        fuel8interval = setInterval(function() {
            fuelproduction(7)
        }, player.alienfuelgen[7].period);
    }
}

function buymultfuel(n) {

    if (Decimal.lte(player.alienfuelgen[n].cost_mul, player.alienfuel)) {
        player.alienfuelgen[n].mult = Decimal.add(player.alienfuelgen[n].mult, 0.25);
        player.alienfuel = Decimal.minus(player.alienfuel, player.alienfuelgen[n].cost_mul);
        player.alienfuelgen[n].cost_mul = Decimal.mul(player.alienfuelgen[n].cost_mul, 1.3)
        player.alienfuelgen[n].bought_mul += 1;
    }

}

function fuelproduction(n) {
    var diff = (Date.now() - lastUpdate) / 1000
    if (player.alienfuelgen[n].bought_mul >= 1)
        player.alienfuel = Decimal.add(player.alienfuel, Decimal.mul(Decimal.mul(fuelconstant[n], diff), player.alienfuelgen[n].mult))
}

function calculateprogress() {

    let power = Decimal.floor(Decimal.log10(player.money))
    widthh = (power / 82)
    if (widthh.toFixed(2) == 0.07)
        widthh = 7;
    else
        widthh = widthh.toFixed(2) * 100
    widthh.toFixed(0)
    if (widthh <= 100)
        return widthh
    else
        return 100;
}

function to_sec(n) {
    return n / 1000;
}

function updateGUI() {
    let power = Decimal.floor(Decimal.log10(player.money))

    if (player.pretiege1cost <= power)
        canprestige1 = true
    else
        canprestige1 = false
    if (canprestige2()) {
        document.getElementById("pc2").classList.remove("hidden")
        document.getElementById("prestigeb2").innerHTML = "Loose all progress <br> but get a boost on prestieging  ";
    } else
        document.getElementById("pc2").classList.add("hidden")
    document.getElementById("tickspeedb").innerHTML = "Tickspeed Boost Cost: " + format(player.tickspeedcost);
    if (Decimal.gte(player.tickspeedcost, player.money))
        document.getElementById("tsc").classList.add("red")
    else
        document.getElementById("tsc").classList.remove("red")

    if (canprestige1) {
        document.getElementById("pc1").classList.remove("hidden")
        document.getElementById("prestigeb1").innerHTML = "Loose all progress <br> but get a boost based on gold ";
    } else {
        document.getElementById("pc1").classList.add("hidden")

    }
    var elem = document.getElementById("myBar");
    elem.textContent = calculateprogress() + '%'

    elem.style.width = calculateprogress() + '%';
    document.getElementById("currency").textContent = "You have " + format(player.money) + " Gold"
    for (let i = 0; i < 6; i++) {
        let g = player.generators[i]
        document.getElementById("gen" + (i + 1)).innerHTML = "Amount: " + format(g.amount) + "<br>Bought: " + g.bought + "<br>Mult: " + format(g.mult) + "x<br>Cost: " + format(g.cost)

        if (!canBuyGenerator(i)) {
            document.getElementById("gen" + (i + 1)).classList.add("locked")
        }

        if (canBuyGenerator(i)) {
            document.getElementById("gen" + (i + 1)).classList.remove("locked")

        }
        for (let i = 0; i <= 7; i++) {
            document.getElementById("fm" + (i + 1)).innerHTML = "Buy a excavator<br>Cost: " + format(player.alienfuelgen[i].cost_mul) + "<br>Amount: " + player.alienfuelgen[i].bought_mul;
            document.getElementById("fs" + (i + 1)).innerHTML = "Upgrade Speed<br>Cost: " + format(player.alienfuelgen[i].cost_speed) + "<br>Amount: " + player.alienfuelgen[i].bought_speed;
        }
        document.getElementById("fuelcurrency").innerHTML = "You have " + format(player.alienfuel) + " Alien Fuel"
    }
    if (player.treeUpgrades.includes("study0")) {
        document.getElementById("studyy0").classList.add("bought")
    }
    if (player.treeUpgrades.includes("study1")) {
        document.getElementById("studyy1").classList.add("bought")
    }
    if (player.treeUpgrades.includes("study21")) {
        document.getElementById("studyy21").classList.add("bought")
    }
    if (player.treeUpgrades.includes("study22")) {
        document.getElementById("studyy22").classList.add("bought")
    }
    if (player.treeUpgrades.includes("study31")) {
        document.getElementById("studyy31").classList.add("bought")
    }
    if (player.treeUpgrades.includes("study32")) {
        document.getElementById("studyy32").classList.add("bought")
    }
    if (player.treeUpgrades.includes("study41")) {
        document.getElementById("studyy41").classList.add("bought")
    }
    if (player.treeUpgrades.includes("study42")) {
        document.getElementById("studyy42").classList.add("bought")
    }
    if (player.treeUpgrades.includes("study5")) {
        document.getElementById("studyy5").classList.add("bought")
    }
    if (player.treeUpgrades.includes("study6")) {
        document.getElementById("studyy6").classList.add("bought")
    }
    if (player.treeUpgrades.includes("study7")) {
        document.getElementById("studyy7").classList.add("bought")
    }
    if (player.treeUpgrades.includes("study8")) {
        document.getElementById("studyy8").classList.add("bought")
    }
    updatealienbutt();
    for (let i = 1; i <= 10; i++) {
        document.getElementById("autospeed" + i).innerHTML = "Upgrade Speed<br> Cost : " + format(player.autobuyer[i - 1].cost);
    }
    let tmp = 0;
    tmp = get_alienpoints()
    document.getElementById("alien-currency").innerHTML = "You have " + format(player.alienpoints) + " Alien Points";
    if(can_alien())
        document.getElementById("alienbox").innerHTML = "Gain " + tmp + " Alien Points";
    else
        document.getElementById("alienbox").innerHTML = "Get to 1e75 money to begin generation of Alien Points";
    for (let i = 1; i <= 10; i++)
        document.getElementById("ai" + i).innerHTML = "Current interval: " + format(to_sec(player.autobuyer[i - 1].period)) + " seconds"
    if (player.alienied == 0) {
            document.getElementById("atc").style.display = "none"
        } 
    else {
            document.getElementById("atc").style.display = "block"
        }

}

function getGeneratorProduction(i) {
    return player.generators[i].amount.times(getGeneratorMult(i))
}

function productionLoop(diff) {
    player.money = Decimal.add(player.money, Decimal.mul(Decimal.mul(player.generators[0].amount, Decimal.mul(player.generators[0].mult, Decimal.mul(player.generators[0].pr1mult, diff))).div(player.tickspeed), player.aliengenboost))

    for (let i = 1; i < 6; i++) {
        player.generators[i - 1].amount = Decimal.add(player.generators[i - 1].amount, Decimal.mul(Decimal.mul(player.generators[i].amount, Decimal.mul(player.generators[i].mult, Decimal.mul(player.generators[i].pr1mult, diff / 5)))), player.aliengenboost)
    }
}
var fuel1interval = setInterval(function() {
    fuelproduction(0)
}, player.alienfuelgen[0].period);
var fuel2interval = setInterval(function() {
    fuelproduction(1)
}, player.alienfuelgen[1].period);
var fuel3interval = setInterval(function() {
    fuelproduction(2)
}, player.alienfuelgen[2].period);
var fuel4interval = setInterval(function() {
    fuelproduction(3)
}, player.alienfuelgen[3].period);
var fuel5interval = setInterval(function() {
    fuelproduction(4)
}, player.alienfuelgen[4].period);
var fuel6interval = setInterval(function() {
    fuelproduction(5)
}, player.alienfuelgen[5].period);
var fuel7interval = setInterval(function() {
    fuelproduction(6)
}, player.alienfuelgen[6].period);
var fuel8interval = setInterval(function() {
    fuelproduction(7)
}, player.alienfuelgen[7].period);

var autobuyer1interval = setInterval(function() {
    autobuyer1()
}, player.autobuyer[0].period);
var autobuyer2interval = setInterval(function() {
    autobuyer2()
}, player.autobuyer[1].period);
var autobuyer3interval = setInterval(function() {
    autobuyer3()
}, player.autobuyer[2].period);
var autobuyer4interval = setInterval(function() {
    autobuyer4()
}, player.autobuyer[3].period);
var autobuyer5interval = setInterval(function() {
    autobuyer5()
}, player.autobuyer[4].period);
var autobuyer6interval = setInterval(function() {
    autobuyer6()
}, player.autobuyer[5].period);
var autobuyer7interval = setInterval(function() {
    autobuyer7()
}, player.autobuyer[6].period);
var autobuyer8interval = setInterval(function() {
    autobuyer8()
}, player.autobuyer[7].period);
var autobuyer9interval = setInterval(function() {
    autobuyer9()
}, player.autobuyer[8].period);
var autobuyer10interval = setInterval(function() {
    autobuyer10()
}, player.autobuyer[9].period);

function mainLoop() {
    var diff = (Date.now() - lastUpdate) / 1000

    productionLoop(diff)
    updateGUI()

    lastUpdate = Date.now()
}
loadGame()
setInterval(mainLoop, 50)
setInterval(saveGame, 1000)
updateGUI()
loadinv()
window.addEventListener('keydown', function(event) {
    if (event.keyCode === 77) {
        maxall();
    }
})

function resizeCanvas() {
    canvas.width = 0;
    canvas.height = 0;
    canvas.width = document.body.scrollWidth;
    canvas.height = document.body.scrollHeight;
    drawTree();
}
window.addEventListener("resize", resizeCanvas);

function fixsave() {
    var player = {
        pr2mult: 1,
        pr2cost: 100,
        pretiege1cost: 5,
        tickspeed: new Decimal(1),
        tickspeedcost: new Decimal(5e3),
        money: new Decimal(10),
        generators: getGens(),
        tickspeedunlocked: false,
        tsprestige: 10,
        unlocked: [1, 0, 0, 0, 0, 0],
        treeUpgrades: [],

    }
}