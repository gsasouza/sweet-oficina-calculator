const PRICE_CUPCAKE = {
	'cupcakeCommon' : 4,
	'cupcakeDecorated' : 5,
	'discountCommon' : 3.75,
	'discountDecorated' : 4.25,
	'unitsRequiredToDiscount' : 10
};
const PRICE_CAKE = {
	'10' : 40,
	'15' : 60,
	'20' : 80,
	'25' : 110,
	'30' : 130
};

const PRICE_FAKECAKE = {
	'10' : 20,
	'15' : 30,
	'20' : 35,
	'25' : 40,
	'30' : 50
};
const PRICE_CUSTOM = {
	'chocoAppleG' : 4.50, // MAÇÃ DE CHOCOLATE GRANDE
	'chocoAppleP' : 2.50, // MAÇÃO DE CHOCOLATE PEQUENA
	'lollypop' : 2.75,
	'brigadeiro' : 1, // BRIGADEIRO NO COPO
	'brownieCommon' : 2,
	'brownieRecheado' : 2.50,
	'brownieCustom' : 3,
	'pictureFrameG' : 4,
	'pictureFrameP' : 3.50,
	'chocoSpoon1' : 1, // COLHER DE CHOCOLATE SEM BRIGADEIRO
	'chocoSpoon2' : 1.50, // COLHER DE CHOCOLATE COM BRIGADEIRO
	'truffleMiniCake1' : 1, // TRUFA MINI BOLO SEM DECORAÇÃO
	'truffleMiniCake2' : 1.25, // TRUFA MINI BOLO COM DECORAÇÃO
	'potCake' : 3.75, // BOLO NO POTE
};

const PRICE_TRUFFLE = {
	'mCommon' : 1,
	'mDecorated2d' : 1.25,
	'mDecorated3d' : 1.50,
	'gCommon' : 1.25,
	'gDecorated2d' : 1.50,
	'gDecorated3d' : 1.75,
};

const quant = { 
	andar1: '30',
	andar2: '25',
	andar3: '20',
	andar3fake: 'on',
	andar4: '15',
	andar5: '10',
	andar5fake: 'on',
	cupcakeCommon: '1',
	cupcakeDecorated: '1',
	truffleMCommon: '1',
	truffleM2d: '1',
	truffleM3d: '1',
	truffleGCommon: '1',
	truffleG2d: '1',
	truffleG3d: '1',
	chocoAppleM: '1',
	chocoAppleG: '1',
	lollypop: '1',
	brigadeiro: '1',
	brownieCommon: '1',
	brownieRecheado: '1',
	brownieCustom: '1',
	pictureFrameP: '1',
	pictureFrameG: '1',
	chocoSpoon1: '1',
	chocoSpoon2: '1',
	truffleMiniCake1: '1',
	truffleMiniCake2: '1',
	potCake: '1' 
};

class Calculator {
	constructor(quant){
		const self = this;
		calcCakePrice(quant, (cake, cakePrice) => {
			self.cakePrice = cakePrice;
			self.cake = cake;
			calcCupcakePrice(quant, (cupcakes, cupcakePrice) => {
				self.cupcakes = cupcakes;
				self.cupcakePrice = cupcakePrice;
				calcTrufflePrice(quant, (truffles, trufflePrice) => {
					self.truffles = truffles;
					self.trufflePrice = trufflePrice;
					calcCustomPrice(quant, (customs, customPrice) => {
						self.customs = customs;
						self.customPrice = customPrice;
					});
				});
			});
		});
	};
	calcCustomPrice(quant, cb) {
		let keys = Object.keys(PRICE_CUSTOM);
		let customPrice;
		let customs = [];
		for(let i in keys){
			if(quant[keys[i]]) {
				customPrice += quant[keys[i]] * PRICE_CUSTOM[keys[i]];
				customs.push({
					'type' : keys[i], 
					'quant' : quant[keys[i]]
				});
			}
		}
		return cb(customs, customPrice);
	};

	calcCakePrice(quant, cb){
		let cakePrice;
		let cake = []
		for(let i = 1; i < 6; i++){
			let prop = ('andar').concat(i.toString());
			if(quant[prop]) {
				if(quant[prop.concat('fake')]) {
					price = PRICE_FAKECAKE[quant[prop]];
					cakePrice += price;
					cake.push({
						'type' : quant[prop],
						'fake' : true,
						'price' : price
					});
				}
				else {
					price = PRICE_CAKE[quant[prop]];
					cakePrice += price;
					cake.push({
						'type' : quant[prop],
						'fake' : false,
						'price' : price
					});
				}								
			}
		}		
		return cb(cake, cakePrice);
	};

	calcTrufflePrice(quant, cb){
		const types = [Common, Decorated3d, Decorated2d];
		let trufflePrice;
		let truffles = []
		let price;

		for(let i = 0; i < 3; i++){
			if(quant[('truffleM').concat(types[i])]){
				price = PRICE_TRUFFLE[('m').concat(types[i])] * quant[('truffleM').concat(types[i])];
				trufflePrice += price
				truffles.push({
					'type' : ('m').concat(types[i]),
					'quant': quant[('truffleM').concat(types[i])],
					'price' : price
				});
			}
			if(quant[('truffleG').concat(types[i])]){
				prince =  PRICE_TRUFFLE[('g').concat(types[i])] * quant[('truffleG').concat(types[i])];
				trufflePrice += price;
				truffles.push({
					'type' : ('g').concat(types[i]),
					'quant': quant[('truffleG').concat(types[i])], 
					'price' : price
				});
		}
		return cb(truffles, trufflePrice);
	};

}