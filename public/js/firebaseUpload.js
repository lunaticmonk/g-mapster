
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
    messagingSenderId: ""
};

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
