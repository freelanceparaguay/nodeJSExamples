/*
 * Varios ejemplos sobre el uso de funciones callbacks
 * http://otroblogdetecnologias.blogspot.com 
 * 
 */

/*
 * Funcion que retorna un valor, sin utilizar funciones callback
 * para envio
 * Es el estilo de funcion conocido en otros lenguajes
 * 
 */
function retornador(param){
	console.log("retornador(%s) Devuelve return true -->",param);
	setTimeout(function(){console.log("retornador() perdiendo tiempo en el TIME OUT");},200);	
	return true;
}

/*
 * recibe un valor, utiliza callback para retornar valor
 * 
 */
function primera(valor,fn){
	console.log("primera() -> Ejecutando funcion primera(%s)",valor);
	console.log("primera() -> Enviando al exterior valor=%s",valor);
	console.log("setTimeout(function(){},10000);");
	setTimeout(function(){console.log("primera() perdiendo tiempo en el TIME OUT");},10000);
	//llamado al callback
	fn(valor);
}

/*
 * recibe dos parametros, podrian ser mas, es cuestion de definir
 * en la cabecera.
 * simula una operacion, devuelve dos valores status y result
 * 
 */
function operacion(valorEntradaOperacion,fn){
	//simulan ser valores producidos
	var status="TERMINADO";
	var result=2;
	console.log("operacion() -> Ejecutando operacion(%s)",valorEntradaOperacion);
	console.log("operacion() -> TRABAJANDO... Dentro de la funcion, se producen resultados y un estado");
	console.log("setTimeout(function(){},10000);");
	setTimeout(function(){console.log("operacion() perdiendo tiempo en el TIME OUT");},10000);	
	console.log("operacion() -> Enviando al exterior status=%s result=%s",status,result);
	//llamando al callback para pasar valores
	fn(status,result);
}

/*
 * Es una funcion asincrona que pierde tiempo 
 */
function asyncFunction(callback){
	setTimeout(callback,10000);
	console.log('Ejecutando asynFunction esperando 10000 milisegundos');
}

/*
 * Esta funcion realiza la devolucion de un parametro
 * 
 * */
function check(req,hash, fn){  
	console.log("Ejecutando check(%s,%s, fn)",req,hash);
	//lamada a una funcion asincrona que hacer perder tiempo
	asyncFunction(function (){
		console.log("Terminando llamada  asyncFunction()....");
	})	
	
	var parametro=3;//variable de prueba
	
	console.log("check() -> Llamando a funcion primera(%s)",parametro);
	primera(parametro,function(objeto){
		console.log("check() -> Recibiendo desde primera() objeto=%s",objeto);
	});
	
	console.log("check() -> Llamando a funcion operacion(%s)",parametro);
	//llamada a funcion operacion y funcion callback con proceso de 
	//resultados 
	operacion(1,function(parUno,parDos){
		console.log("check() -> Recibiendo desde operacion() status=%s result=%s",parUno,parDos);
		console.log("check() -> uso como global EL PARAMETRO recibido req=%s dentro de check()",req);		
	});

	console.log("check() -> Llamando a funcion retornador(%s)\n",parametro);	
	//llamada a una funcion simple que devuelve siempre true
	retornador(parametro);
	//llamada al callback
	fn(true);
};

//--------------INICIO PRINCIPAL--------------------
console.log("Definiendo una variable externa");
var unaVariableExterna="azul";
console.log("unaVariableExterna=%s",unaVariableExterna);

//declaracion de una funcion sin nombre
(function (unaVariableRec){
	console.log("main() -> unaVariableRec=%s",unaVariableRec);
	console.log("main() -> Llamando a check()");
	check(1,2,function(resultadoCheck){
		console.log("A la vuelta de check(). En el principal resultadoCheck=%s",resultadoCheck);
	});	
})(unaVariableExterna);
//--------------FIN PRINCIPAL--------------------	
