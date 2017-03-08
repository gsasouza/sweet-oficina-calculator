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

const TAX = {
	'floor' : 10,
	'base' : 10,
	'taxi' : 10
}

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
	truffleMDecorated2d: '1',
	truffleMDecorated3d: '1',
	truffleGCommon: '1',
	truffleGDecorated2d: '1',
	truffleGDecorated3d: '1',
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
}

class Calculator {	

	calcCustomPrice(quant, cb) {
		let keys = Object.keys(PRICE_CUSTOM);
		let customPrice = 0;
		let customs = [];
		let price;
		for(let i in keys){
			if(quant[keys[i]]) {
				price = quant[keys[i]] * PRICE_CUSTOM[keys[i]]
				customPrice += price;
				customs.push({
					'type' : keys[i], 
					'quant' : quant[keys[i]],
					'price' : price
				});
			}
		}
		return cb(customs, customPrice);
	};

	calcTaxPrice(quant, cb){
		let tax = [];
		let price;
		let taxPrice = 0;
		if(this.cake.length > 0) {
			price = (this.cake.length - 1) * TAX.floor;
			taxPrice += price;
			tax.push({'tipo' : 'Banquinho', 'preço' : price});				
		}
		if(quant.baseTax) {
			taxPrice += TAX.base;
			tax.push({'type' : 'Base', 'price' : TAX.taxi});
		}
		if(quant.taxiTax) {
			taxPrice += TAX.taxi;
			tax.push({'type' : 'Transporte', 'price' : TAX.taxi});
		}
		return cb(tax, taxPrice);
	}
	calcCakePrice(quant, cb){
		let cakePrice = 0;
		let cake = [];
		let price;
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
		const types = ['Common', 'Decorated3d', 'Decorated2d'];
		let trufflePrice = 0;
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
				price =  PRICE_TRUFFLE[('g').concat(types[i])] * quant[('truffleG').concat(types[i])];
				trufflePrice += price;
				truffles.push({
					'type' : ('g').concat(types[i]),
					'quant': quant[('truffleG').concat(types[i])], 
					'price' : price
				});
			}
		}
		return cb(truffles, trufflePrice);
	};

	calcCupcakePrice(quant, cb){
		let cupcakePrice = 0;
		let cupcakes = [];
		let price;
		if(quant['cupcakeCommon']){
			if(quant['cupcakeCommon'] > PRICE_CUPCAKE.unitsRequiredToDiscount){
				price = quant['cupcakeCommon'] * PRICE_CUPCAKE.discountCommon;
				cupcakePrice += price		
			}
			else{
				price = quant['cupcakeCommon'] * PRICE_CUPCAKE.cupcakeCommon;
				cupcakePrice += price
			}
			cupcakes.push({'type': 'common', 'quant' : quant['cupcakeCommon'], 'price' : price});
		}
		if(quant['cupcakeDecorated']){
			if(quant['cupcakeDecorated'] > PRICE_CUPCAKE.unitsRequiredToDiscount){
				price = quant['cupcakeDecorated'] * PRICE_CUPCAKE.discountDecorated;
				cupcakePrice += price;
			}
			else{
				price = quant['cupcakeDecorated'] * PRICE_CUPCAKE.cupcakeDecorated;
				cupcakePrice += price;
			}
			cupcakes.push({'type': 'decorated3d', 'quant' : quant['cupcakeDecorated'], 'price' : price});
		}
		return cb(cupcakes, cupcakePrice);			
	};
	getTotalPrice () {
		return this.cakePrice + this.trufflePrice + this.cupcakePrice + this.customPrice + this.taxPrice;
	};

	getPriceInfo () {
		const translateCupcake = {
			'common' : 'Comum',
			'decorated3d' : 'Com decoração 3D'
		}
		const translateTruffle = {
			'mCommon' : 'Comum (M)',
			'mDecorated3d' :'Com decoração 3D (M)',
			'mDecorated2d' : 'Com decoração 2D (M)',
			'gCommon' : 'Comum (G)',
			'gDecorated3d' :'Com decoração 3D (G)',
			'gDecorated2d' : 'Com decoração 2D (G)'
		};
		const translateCustoms = {
			'chocoAppleG' : 'Maça de Chocolate (P)', // MAÇÃ DE CHOCOLATE GRANDE
			'chocoAppleP' : 'Maça de Chocolate (G)', // MAÇÃO DE CHOCOLATE PEQUENA
			'lollypop' : 'Pirulito de Chocolate',
			'brigadeiro' : 'Brigadeiro no Copo', // BRIGADEIRO NO COPO
			'brownieCommon' : 'Brownie sem Recheio',
			'brownieRecheado' : 'Brownie com Recheio Simples',
			'brownieCustom' : 'Brownie com Recheio Personalizado',
			'pictureFrameG' : 'Porta-retrato de Chocolate (G)',
			'pictureFrameP' : 'Porta-retrato de Chocolate (P)',
			'chocoSpoon1' : 'Colher de Chocolate sem Brigadeiro', // COLHER DE CHOCOLATE SEM BRIGADEIRO
			'chocoSpoon2' : 'Colher de Chocolate com Brigadeiro', // COLHER DE CHOCOLATE COM BRIGADEIRO
			'truffleMiniCake1' : 'Trufa Mini Bolo sem Decoração', // TRUFA MINI BOLO SEM DECORAÇÃO
			'truffleMiniCake2' : 'Trufa Mini Bolo com Decoração' , // TRUFA MINI BOLO COM DECORAÇÃO
			'potCake' : 'Bolo no Pote', // BOLO NO POTE
		};
		const priceInfo = {
			'cupcakes' : [],
			'trufas' : [],
			'personalizados' : [],
			'bolo' : [],
			'taxas' : [],
			'precoTotal' : ''
		}
		let keys = Object.keys(translateCupcake);
		let cupcakes = this.cupcakes;
		for(let i in cupcakes){
			if(keys.indexOf(cupcakes[i].type) !== -1) {
				priceInfo.cupcakes.push({
					'tipo' : translateCupcake[cupcakes[i].type], 
					'quantidade' : cupcakes[i].quant,
					'preço' : cupcakes[i].price
				});
			}
		};
		keys = Object.keys(translateTruffle);
		let truffles = this.truffles;
		for(let i in truffles){
			if(keys.indexOf(truffles[i].type) !== -1) {
				priceInfo.trufas.push({
					'tipo' : translateTruffle[truffles[i].type], 
					'quantidade' : truffles[i].quant,
					'preço' : truffles[i].price
				});
			}
		};
		keys = Object.keys(translateCustoms);
		let customs = this.customs;
		for(let i in customs){
			if(keys.indexOf(customs[i].type) !== -1) {
				priceInfo.personalizados.push({
					'tipo' : translateCustoms[customs[i].type], 
					'quantidade' : customs[i].quant,
					'preço' : customs[i].price
				});
			}
		};
		if(this.tax) priceInfo.taxas = this.tax;

		let cake = this.cake;
		function mycomparator(a,b) {
 			return parseInt(a.size, 10) - parseInt(b.size, 10);
		}
		cake.sort(mycomparator);
		for(let i in cake){			
			let size = cake[i].type.toString().concat(' cm');
			if(cake[i].fake) size = size.concat(' (Falso)');
			let bolo = {};
			bolo['tipo'] = size;
			bolo['preço'] = cake[i].price;
			priceInfo.bolo.push(bolo);
		}
		priceInfo.precoTotal = this.getTotalPrice();
		return priceInfo;
	}

	constructor(quant){
		const self = this;
		this.calcCakePrice(quant, (cake, cakePrice) => {
			self.cakePrice = cakePrice;
			self.cake = cake;
			this.calcCupcakePrice(quant, (cupcakes, cupcakePrice) => {
				self.cupcakes = cupcakes;
				self.cupcakePrice = cupcakePrice;
				this.calcTrufflePrice(quant, (truffles, trufflePrice) => {
					self.truffles = truffles;
					self.trufflePrice = trufflePrice;
					this.calcCustomPrice(quant, (customs, customPrice) => {
						self.customs = customs;
						self.customPrice = customPrice;
						this.calcTaxPrice(quant, (tax, taxPrice) => {
							self.tax = tax;
							self.taxPrice = taxPrice;
						})
					});
				});
			});
		});
	};
}

module.exports = Calculator;