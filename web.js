//++++++++++++++++++++++++++++++++++++++++++++++++++++++++< Classi >+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
class Treug {
	constructor(x, y, z, r) {
		this.mass=[12];
		this.r=r;	
		
		this.mass[0]=0;
		this.mass[1]=-this.r/2;
		this.mass[2]=0;
			
		this.mass[3]=0;
		this.mass[4]=.5*this.r/2;
		this.mass[5]=-this.r/2;
		
		this.mass[6]=-.8660254*this.r/2;
		this.mass[7]=.5*this.r/2;
		this.mass[8]=.5*this.r/2;
			
		this.mass[9]=.8660254*this.r/2;
		this.mass[10]=.5*this.r/2;
		this.mass[11]=.5*this.r/2;
			
		this.x=x;
		this.y=y;
		this.z=z;
	}

	gener() {
		this.treugi=[];
		for (var i=0; i<4; i++) {
			//var newR=this.r/2;
			var t=new Treug(this.x+this.mass[i*3], this.y+this.mass[i*3+1], this.z+this.mass[i*3+2], this.r/2);
			this.treugi.push(t);
		}
		return this.treugi;
	}
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++< this Zona Peremenih >+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var myCanvas;
var veko=-1.1;
var naprav_dvijeniya=false;
var Mashtab=30;
var VisotaDispla=600;
var ShirinaDispla=(window.innerWidth>600)?window.innerWidth:600;
var PoziciyaX=-ShirinaDispla/2+35;
var PoziciyaY=-VisotaDispla/2+120;
var Serp=[];
var angl=0.0;
var click=0;
var pomoi
var buf
var prozrachPiromidi;
var popodalka=0;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function setup() {
	myCanvas=createCanvas(ShirinaDispla, VisotaDispla, WEBGL);//
	myCanvas.parent('Ukozatel_na_holst');
	noStroke();

	var maax=(ShirinaDispla<VisotaDispla)?ShirinaDispla:VisotaDispla;
	var t=new Treug(0, 0, 0, maax/3);
	Serp.push(t);	
}

function draw() {
	if(naprav_dvijeniya){
		veko+=.06;
		if(veko>=.7){veko=.7;}
	} else{
		veko-=.06;
		if(veko<=-1.1){veko=-1.1;}
	}
	prozrachPiromidi=map(veko, -1.1, .7, 0, 255)
	Golova(PoziciyaX, PoziciyaY, Mashtab, veko);
	
	push();

	translate(ShirinaDispla/2-300, 0, 0);
	rotateY(angl);
	rotateZ(angl*.08);
	rotateX(angl*.04);
	angl+=.02;

	for (var i=0; i<Serp.length; i++) {
		show(Serp[i].x, Serp[i].y, Serp[i].z, Serp[i].r, prozrachPiromidi);
	}

	pop();

	if(!naprav_dvijeniya && popodalka && prozrachPiromidi==0){
		popodalka=0;
		//console.log("pizada tebe");
		pomoi=[];
		for (var i=0; i<Serp.length; i++) {
			buf=Serp[i].gener();
			for(var j=0; j<buf.length; j++){
				pomoi.push(buf[j]);
			}
		}
		click++;
		Serp=pomoi;
		if (click>=3) {
			click=0; 
			setup();
		}
	}
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++< Storonie Funkcii >+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function mouseMoved() {
	if((PoziciyaX<(mouseX-ShirinaDispla/2) && (mouseX-ShirinaDispla/2)<PoziciyaX+Mashtab*5) && (PoziciyaY-Mashtab*2<(mouseY-VisotaDispla/2) && (mouseY-VisotaDispla/2)<PoziciyaY+Mashtab*4)){//  
		cursor(HAND);
	} else {
		cursor(ARROW);
	}
}
function mousePressed() {
	if((PoziciyaX<(mouseX-ShirinaDispla/2) && (mouseX-ShirinaDispla/2)<PoziciyaX+Mashtab*5) && (PoziciyaY-Mashtab*2<(mouseY-VisotaDispla/2) && (mouseY-VisotaDispla/2)<PoziciyaY+Mashtab*4)){//  
		//console.log("pikabu", naprav_dvijeniya);
		naprav_dvijeniya=~naprav_dvijeniya;
		popodalka=1;
	}
}
function Golova(x, y, r, h){
	push();

	noStroke();
	//*************************************** Glaz_Praviy
	fill(200);
	beginShape();
	for(var i=-100; i<=100; i++){
		vertex(x+4*r+r*(abs(i)/100-.5)*2, y-r*(.5*sin(PI*i/100)), 0);
	}
	endShape(CLOSE);
	//***************************************
	//*************************************** Veko_Pravoe
	fill(50);
	beginShape();
	for(var i=0; i<=100; i++){
		vertex(x+4*r+r*(abs(i)/100-.5)*2, y-r*(.5*sin(PI*i/100)), 0);
	}
	endShape(CLOSE);
	var cvetik=(h>0)?200:50;
	fill(cvetik);
	beginShape();
	for(var i=-100; i<=0; i++){
		vertex(x+4*r+r*(abs(i)/100-.5)*2, y-r*(.5*sin(PI*i/100))*(-h), 0);
	}
	endShape(CLOSE);
	//***************************************
	//*************************************** Golova
	fill(100);
	rect(x, y, 3*r, 4*r);
	beginShape();
	var mash=2
	for(var i=0; i<=100; i++){
		vertex(x-r*(mash*cos(PI*i/100)-2), y-r*(mash*sin(PI*i/100)), 0);
	}
	endShape(CLOSE);
	fill(100);	
	rect(x+3*r, y, 1*r, 1.5*r);
	fill(50);	
	rect(x+3*r, y+.5*r, .05*r, 1*r);
	//***************************************
	//*************************************** Glaz_Leviy
	fill(200);
	beginShape();
	for(var i=-100; i<=100; i++){
		vertex(x+2.2*r+r*(abs(i)/100-.5)*2, y-r*(.5*sin(PI*i/100)), 0);
	}
	endShape(CLOSE);
	//***************************************
	//*************************************** Veko_Levoe
	fill(50);
	beginShape();
	for(var i=0; i<=100; i++){
		vertex(x+2.2*r+r*(abs(i)/100-.5)*2, y-r*(.5*sin(PI*i/100)), 0);
	}
	endShape(CLOSE);
	var cvetik=(h>0)?200:50;
	fill(cvetik);
	beginShape();
	for(var i=-100; i<=0; i++){
		vertex(x+2.2*r+r*(abs(i)/100-.5)*2, y-r*(.5*sin(PI*i/100))*(-h), 0);
	}
	endShape(CLOSE);
	//***************************************
	pop();
}
function show(x, y, z, r, alpha) {	
	push();

	translate(x, y, z);
	
	fill(136, 166, 27, alpha);	
	beginShape();
	vertex(0, -r, 0);
	vertex(0, .5*r, -r);
	vertex(-.8660254*r, .5*r, .5*r);
	endShape(CLOSE);
	
	fill(242, 159, 5, alpha);
	beginShape();
	vertex(0, -r, 0);
	vertex(-.8660254*r, .5*r, .5*r);
	vertex(.8660254*r, .5*r, .5*r);
	endShape(CLOSE);
	
	fill(242, 92, 5, alpha);
	beginShape();
	vertex(0, -r, 0);
	vertex(.8660254*r, .5*r, .5*r);
	vertex(0, .5*r, -r);
	endShape(CLOSE);
	
	fill(217, 37, 37, alpha);
	beginShape();
	vertex(-.8660254*r, .5*r, .5*r);
	vertex(.8660254*r, .5*r, .5*r);
	vertex(0, .5*r, -r);
	endShape(CLOSE);

	pop();
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++