var config = {
    apiKey: "AIzaSyDqcidTNKiWrY_n2rl-J8xpoLBetUY0IiM",
    authDomain: "g-mapster-1482049698790.firebaseapp.com",
    databaseURL: "https://g-mapster-1482049698790.firebaseio.com",
    storageBucket: "g-mapster-1482049698790.appspot.com",
    messagingSenderId: "392450380738"
};
// console.log(firebase);
// console.log('this file is being used');

firebase.initializeApp(config);

//Get the upload button
const filebutton = document.querySelector('#pushbtn');
filebutton.addEventListener('change', function(e){
	//Get the file
		var file = e.target.files[0];
	//Create storage refernce for it
		var storageRef = firebase.storage().ref('g-mapster/' + file.name );
	//Upload
		storageRef.put(file);
});