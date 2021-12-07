import {EFFECT} from "https://mrmirka.github.io/FutureBanner/js/effect.js";
function b1Init(bannerContainer, params, app, textures){
	let count = 0; //Global counter

	//Длинна импровезированной веревки которая тенятся вдоль текстуры
	const ropeLength1 = 27.6;
	const ropeLength2 = 26;
	const ropeLength3 = 16.1;
	const ropeLength4 = 50.3;
	const ropeLength5 = 46;
	const ropeLength6 = 80;
	const ropeLength7 = 61;
	const ropeLength8 = 43.4;

	//Массивы точке котоыре будет распологатс явдоль длинны импровизированной веревки
	const hair1Points = [];
	const hair2Points = [];
	const hair3Points = [];
	const jaket1Points = [];
	const jaket2Points = [];
	const palm1Points = [];
	const palm2Points = [];
	const floorPoint = [];

	
	//CAR LIGTH
	let carLigth = PIXI.Sprite.from(getTextures('car_ligth'));
	carLigth.position.set(1238,153);
	carLigth.blendMode = PIXI.BLEND_MODES.SCREEN;
	bannerContainer.scale.set(params.scaleFactor, params.scaleFactor); //Маштабирует изображения при изменении исходного размера контейнере
	bannerContainer.addChild(carLigth);


	//Задаем веревкам точки
	for (let i = 0; i <8; i++){
		palm1Points.push(new PIXI.Point(i * ropeLength7,0));
		palm2Points.push(new PIXI.Point(i * ropeLength8,0));
		jaket1Points.push(new PIXI.Point(i * ropeLength4,0));
		jaket2Points.push(new PIXI.Point(i * ropeLength5,0));
		hair1Points.push(new PIXI.Point(i * ropeLength1,0));
		hair2Points.push(new PIXI.Point(i * ropeLength2,0));
		hair3Points.push(new PIXI.Point(i * ropeLength3,0));
	}

	for (let i=0; i < 21; i++){
		floorPoint.push(new PIXI.Point(i * ropeLength6,0));
	}


	let background = PIXI.Sprite.from(getTextures('background'));
	bannerContainer.addChild(background);

	//Car effects
	let maskCar = PIXI.Sprite.from(getTextures('mask_car'));
	maskCar.position.set(1007,188);
	const carBlur = new PIXI.filters.BlurFilter();
	const carFlark = new PIXI.Graphics();
	carFlark.beginFill(0x9DECFE);
	carFlark.drawCircle(1070,350,300);
	carFlark.endFill();
	carFlark.filters = [carBlur];
	carBlur.blur = 1;
	carFlark.alpha = 8;
	carFlark.blendMode = PIXI.BLEND_MODES.SCREEN;
	carFlark.mask = maskCar;
	bannerContainer.addChild(maskCar, carFlark);

	const ropeHair1 = new PIXI.SimpleRope(getTextures('hair'), hair1Points);
	putToStage(ropeHair1, 1270, 13,  Math.PI*0.5);

	const ropeHair2 = new PIXI.SimpleRope(getTextures('hair2'), hair2Points);
	putToStage(ropeHair2, 1270, 12,  2.8);

	const ropeHair3 = new PIXI.SimpleRope(getTextures('hair3'), hair3Points);
	putToStage(ropeHair3, 1134, 55,  Math.PI*0.5);

	const ropeJaket1 = new PIXI.SimpleRope(getTextures('jaket1'), jaket1Points);
	putToStage(ropeJaket1, 1310, 193,  Math.PI*0.5);

	const ropeJaket2 = new PIXI.SimpleRope(getTextures('jaket2'), jaket2Points);
	putToStage(ropeJaket2, 1082, 167,  Math.PI*0.5);

	const ropePalm1 = new PIXI.SimpleRope(getTextures('palm1'), palm1Points);
	putToStage(ropePalm1, 450, 421,  Math.PI*-0.47);

	const ropePalm2 = new PIXI.SimpleRope(getTextures('palm2'), palm2Points);
	putToStage(ropePalm2, 550, 385,  Math.PI*-0.47);


	let woman = PIXI.Sprite.from(getTextures('woman'));
	woman.x = 909;
	bannerContainer.addChild(woman);


	//Woman blick
	let blickGlass = PIXI.Sprite.from(getTextures('blick_glasses'));
	blickGlass.position.set(1136, 48);
	blickGlass.blendMode = PIXI.BLEND_MODES.SCREEN;
	bannerContainer.addChild(blickGlass);

	let blickEarring = PIXI.Sprite.from(getTextures('blick_earring'));
	blickEarring.position.set(1206, 110);
	blickEarring.blendMode = PIXI.BLEND_MODES.SCREEN;
	bannerContainer.addChild(blickEarring);

	let blickHair1 = PIXI.Sprite.from(getTextures('blick_hair1'));
	blickHair1.position.set(1205, 5);
	blickHair1.blendMode = PIXI.BLEND_MODES.SCREEN;
	bannerContainer.addChild(blickHair1);


	//Jacket blick
	let blickJacket1 = PIXI.Sprite.from(getTextures('blick_jacket'));
	let blickJacket2 = PIXI.Sprite.from(getTextures('blick_jacket2'));
	blickJacket2.position.set(1222, 207);
	blickJacket2.blendMode = PIXI.BLEND_MODES.SCREEN;
	bannerContainer.addChild(blickJacket2);
	blickJacket1.position.set(900, 98);
	blickJacket1.blendMode = PIXI.BLEND_MODES.SCREEN;
	bannerContainer.addChild(blickJacket1);


	//FONTS letter glass
	let openO = PIXI.Sprite.from(getTextures('open_O'));
	openO.position.set(1510, 46);
	openO.blendMode = PIXI.BLEND_MODES.MULTIPLY;
	bannerContainer.addChild(openO);

	let summer = PIXI.Sprite.from(getTextures('blick_summer'));
	summer.position.set(569, 109);
	summer.blendMode = PIXI.BLEND_MODES.ADD;
	bannerContainer.addChild(summer);


	//MASK
	let mask = PIXI.Sprite.from(getTextures('mask_floor'));
	mask.position.set(267,350);
	bannerContainer.addChild(mask);


	//Caustic shader
	const floor = new PIXI.SimpleRope(getTextures('background'), floorPoint);
	let containerWater = new PIXI.Container();
	let containerFloor = new PIXI.Container();
	let causticShader = new EFFECT('caustic', params).getShader();
	causticShader.blendMode = PIXI.BLEND_MODES.SCREEN;
	var water = new PIXI.Sprite();
	water.width = params.canvasSize.width * devicePixelRatio;
	water.height = params.canvasSize.height * devicePixelRatio;
	water.filters = [causticShader];
	water.mask = mask;
	containerWater.mask = mask;
	containerFloor.mask = mask;
	floor.y = 275;
	containerFloor.addChild(mask, floor);
	containerWater.addChild(mask, water);
	bannerContainer.addChild(containerWater);
	bannerContainer.addChild(containerFloor);
	containerWater.alpha = 0.17;


	//SMOKE shader
	let container = new PIXI.Container();
	let smokeShader = new EFFECT('smoke', params).getShader();
	smokeShader.blendMode = PIXI.BLEND_MODES.ADD;
	var bg = new PIXI.Sprite();
	bg.width = params.canvasSize.width  * devicePixelRatio;
	bg.height = params.canvasSize.height * devicePixelRatio;
	bg.filters = [smokeShader];
	bannerContainer.addChild(container);
	container.addChild(bg);


	let blickDelta = 1;
	let deltaTime = 0;
	let shift = 0.05;

	app.ticker.add((delta) => {
		count += 0.1;
		deltaTime += shift;

		//params.filter.uniforms.shift = Math.abs(Math.sin(deltaTime));

		smokeShader.uniforms.time += 0.01;
		causticShader.uniforms.time += 0.011;
		

		// make the snake
		for (let i = 3; i < hair1Points.length; i++) {
			hair1Points[i].y = Math.sin((i * 0.5) + count) * 3.5;
			hair1Points[i].x = i * ropeLength1 + Math.cos((i * 0.3) + count) * 2.2 ;
		}

		for (let i = 3; i < hair2Points.length; i++) {
			hair2Points[i].y = Math.sin((i * 0.5) + count) * 3.5;
			hair2Points[i].x = i * ropeLength2 + Math.cos((i * 0.3) + count) * 2.2 ;
		}

		for (let i = 3; i < hair3Points.length; i++) {
			hair3Points[i].y = Math.sin((i * 0.5) + count) * 2.5;
			hair3Points[i].x = i * ropeLength3 + Math.cos((i * 0.3) + count) * 1.1 ;
		}

		for (let i = 5; i < jaket1Points.length; i++) {
			jaket1Points[i].y = Math.sin((i * 0.5) + count) * 1.5;
			jaket1Points[i].x = i * ropeLength4 + Math.cos((i * 0.3) + count) * .3 ;
		}
		for (let i = 5; i < jaket2Points.length; i++) {
			jaket2Points[i].y = Math.sin((i * 0.5) + count) * 2.2;
			jaket2Points[i].x = i * ropeLength5 + Math.cos((i * 0.3) + count) * .3 ;
		}

		//PALM
		for (let i = 2; i < palm1Points.length; i++) {
			palm1Points[i].y = Math.sin((i * .6) + count) * 0.9;
			palm1Points[i].x = i * ropeLength7 + Math.cos((i * 1.3) + count/20) * 0.01;
		}

		for (let i = 2; i < palm2Points.length; i++) {
			palm2Points[i].y = Math.sin((i * 3.5) + count) * 0.7;
			palm2Points[i].x = i * ropeLength8 + Math.cos((i * .8) + count) * 0.1;
		}

		
		
		for (let i = 1; i < floorPoint.length; i++) {
			floorPoint[i].y = Math.sin((i * 6.5) + count) * 2.7;
			floorPoint[i].x = i * ropeLength6 + Math.cos((i * 13.8) + count) * 6.1;
		}
		
		//BLICKS
		blickGlass.alpha = Math.sin(count*0.7)*0.7;
		blickJacket1.alpha = Math.sin(count*0.7)*0.5;
		blickJacket2.alpha = Math.sin(count*0.7)*0.6;
		blickHair1.alpha = Math.sin(count*0.3)*0.4;
		blickEarring.alpha = Math.sin(count*0.3)*0.4;
		carLigth.alpha = Math.abs(Math.cos(count*0.3)*0.5)*1.2;
		

		carFlark.alpha = -Math.sin(count*0.3)*0.2;
		carFlark.x = -Math.sin(count * 0.3)*750;
		carFlark.y = Math.sin(count * 0.6)*210;


		//FONTS
		blickDelta = Math.random()*deltaTime;
		if (getBlick()){
			openO.alpha = Math.sin(count*blickDelta);
			summer.alpha = Math.sin(count*blickDelta* 0.02);
		} else {
			openO.alpha = 0;
			summer.alpha = 0.6;
		}
		
	});

//Return time delay
function getBlick (){
	return Math.sin(deltaTime) > Math.random();
}

//Put object to stage
//o - object
//x - position by x
//y - position by y
//r -rotation in radians
function putToStage(o,x,y,a){
	o.x = x;
	o.y = y;
	if(a != undefined)
		o.rotation = a;
		bannerContainer.addChild(o);
};


//Забираем текстуры из общего массива
function getTextures(name){
	let value;
	textures.forEach(item => {
		if(item.textureCacheIds[0] === name){
			value = item;
		} 
	});
	return value;
};
}
export {b1Init}



