let canvas = get("treeCanvas");
let ctx = canvas.getContext("2d");
function resizeCanvas() {
	canvas.width = 0;
	canvas.height = 0;
	canvas.width = document.body.scrollWidth;
	canvas.height = document.body.scrollHeight;
	drawTree();
}
function drawTreeBranch(name1, name2) {
	//if (get("upgradeTree").style.display === "none") return
	
	let start = get("study"+name1).getBoundingClientRect();
	let end = get("study"+name2).getBoundingClientRect();
	let x1 = start.left + (start.width / 2) + (document.documentElement.scrollLeft || document.body.scrollLeft);
	let y1 = start.top + (start.height / 2) + (document.documentElement.scrollTop || document.body.scrollTop);
	let x2 = end.left + (end.width / 2) + (document.documentElement.scrollLeft || document.body.scrollLeft);
	let y2 = end.top + (end.height / 2) + (document.documentElement.scrollTop || document.body.scrollTop);
	ctx.lineWidth=15;
	ctx.beginPath();

	if(player.treeUpgrades.includes("study"+name1) && player.treeUpgrades.includes("study"+name2)) {
		ctx.strokeStyle = "#1efc38";
	}
	else
	  if (canbuytree(parseInt(name1))||canbuytree(parseInt(name2)))
	{
		ctx.strokeStyle = "#ff00ff";
	} else {
		ctx.strokeStyle = "#424242";
	}
	
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}
function drawTree() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawTreeBranch("0","1");
	drawTreeBranch("1", "21");
	drawTreeBranch("1", "22");
	drawTreeBranch("21", "31");
	drawTreeBranch("22", "32");
    drawTreeBranch("31", "41");
    drawTreeBranch("32", "42");
    drawTreeBranch("41", "5");
    drawTreeBranch("42", "5");
    drawTreeBranch("5", "6");
	drawTreeBranch("6", "7");
	drawTreeBranch("7","8");
	
}
