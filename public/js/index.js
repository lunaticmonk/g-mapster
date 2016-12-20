$('#submitbtn').on('click', function(){
	console.log($('#inputname').val());
	var newUser = new User({
		name : $('#inputname').val()
	});
	newUser.save(function(err){
		if (err)
			throw err
		else
			console.log('User saved successfully!');
	});
});