$(document).ready(function(){
	console.log("hello");

	var dt = new Date();
	var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

	$('.currentTime').append(time);
	

});