$(document).ready(function(){
	console.log("hello");

	var dt = new Date();
	var time = dt.getHours() + ":" + dt.getMinutes();

	$('.currentTime').append(time);
	
	var consumerArr = ['John Smith', 'Mark Thompson', 'David Ortiz', 'Jerry Mathers', 'Wilson Pickett'];
	var consumerList = '<ul>';

	for(i=0;i<consumerArr.length; i++){
		
		consumerList += '<li>' + consumerArr[i] + '<li>';

	}
	consumerList += '<ul>';

	// $('#consumerDiv').append(consumerList);
	$('#addNote').on('click', function(){
		var newNote = '<li><strong> ' + time + ' </strong>- ' + $('#insertNote').val() + '</li><br>';
		$('#notesList').prepend(newNote);
	});

});