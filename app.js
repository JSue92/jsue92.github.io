


// initlize our page and bind a click event to the submit button. 
$(init);
function init() {
	// bind the function submit to the submit button
	$("#submit").click(submit);

	//binds an event listener to detect value changes in the object, and executes the callback function loadExistingSnippets
	objectsInFirebase.on('value',loadExistingSnippets);
};


/* 
	function: submit 

	abstract:  function sumbit creates an oject which is populated from the
	input form elemnts on the webpage page. Upon the sumbit action, the form
	is cleared out and then the oject is then pushed to the firebase database.

	parameters: no parameters 

	global variable: 
		objectInFirebase - firebase database reference object. 

	local variable: 
		codeSnippet - an object that contains the elements from the form inputs. 
			title - title of the code snippet being stored; we will sort by this value. 
			code - code snippet that is being stored within the object. 
			tagIt - allows the user to categorize their code. 
			comments -  allows the user to add context to their conde snippet. 

	mutations: 
		this function will clear the form inputs. 
		codeSnippet will be pushed into the firebase repository 
	
	return value: no retun value. 
*/ 
function submit(){
	var codeSnippet = {

		title:$("#title").val(),
		code:$("#code").val(),
		tagIt:$("#tagIt").val(),
		comments: $("#comments").val()


	}; 

	// this line clears out the form 
 	$('#title, #code, #tagIt , #comments').val('');

 	// add to firebase repository 
	objectsInFirebase.push(codeSnippet);


};


/*

	function: loadFolder [depricated]

	parameter: 
		fldName - (string) - name of the folder that will contain a collection of snippets. 

	global variables: 
		objectsInFirebase - firebase database reference object. 

	local variables:  no local vairables 

	mutations:
		firebaseDB will be referring to the new folder name

	return value: no return value

*/
/*
function loadFolder( fldName)
{
 
  objectsInFirebase = firebaseDB.ref(fldName);
  
  
}
*/


/*

	function: toggleCode 

	abstract:  This function calls a dynamic id for each object submitted. The
	anchor tag  functions as the indicator of what action will be performed
	when clicked ( expand  (+) or contract (-)). Lastly, Jquery is used toggle
	the code portion.

	parameter: 
		id - (string) - dynamically generated index associated to the code snippet. 

	global variables: no global variables 

	local variables: 
		link - ( document.object) - the anchor that toggles the Div containing the code snippet. 

	mutations: 
		changes the inner html  of the anchor stored in the link variable from + to - or vice versa 
		changes the visibility of the Div containing the code snippet from none to "" or vice versa 

	return value: no return value

*/
function toggleCode( id ) {
	var link = $("#lnk_" + id); // #lnk_8 - creates a dynamic id 
	if(link.html()=="+")
		link.html("-");
	else{
		link.html(" + ");
	}
	//  toggles the code portion
	$("#"+ id).toggle(); 
	
}

/*

	function: loadExistingSnippets

	abstract:  Retrieves objects from the database in order to load the
	snippets to the page. After items are retrieved , items are converted into
	the arrary in order to sort the entires. Entries are then sorted by the
	complex objects propery - title - in alpahbetical.  Now that the
	collections has been sorted, it will be listed on the site. For each
	entery, a containing div is given a unique ID to the database reference.
	An anchor is dynamically generated based on the index to be later
	referenced in the toggleCode function. Similarly , each div containing the
	code is given a unique id to the index of the collection.
		
	parameters: 
	results -  (object) - firebase object collection, containing code snippets from the requested database location for example firebaseDB.ref("snippet")

	global variables: no global variables 

	local variables: 
		snippets -  (object) the resulting value from the firebaseDB arranged as a complex object assessible by key value pairs. 
		collection - (array) - converted snippet objects into an array for sorting.

	mutations: 
		changes the div with ID storedSnippets to contain a formatted print out of the collection. 

	return value: no return value




*/

function loadExistingSnippets(results) {
	//data = results.val();
	var snippets = results.val();
	
	// snippets["fadsuipofadsuio"]={
	// 	folder: "My Snippets",
	// 	UID: 
	// };
	
	
	var collection = [];
	for(var key in snippets) {
		snippets[key].key=key;
		collection.push(snippets[key]);
		
	}
	
	collection.sort(
		function (a, b){
			// var isAfld = false;
			// var isBfld = false;
			// if( typeof a.folder != "undefined" )
			// 	isAfld = true;
			// if( typeof b.folder != "undefined" )
			// 	isBfld = true;
			
			// if( isAfld && !isBfld )
			// 	return -1;
			// else if( !isAfld && isBfld)
			// 	return 1;
			// else if( isAfld && isBfld )
			// {
			// 	if( a.folder.toLowerCase() < b.folder.toLowerCase() )
			// 		return -1;
			// 	else if( a.folder.toLowerCase() > b.folder.toLowerCase() )
			// 		return 1;
			// 	return 0;
			// }
			// else
			// {			
				if( a.title.toLowerCase() < b.title.toLowerCase() )
					return -1;
				else if( a.title.toLowerCase() > b.title.toLowerCase() )
					return 1;
				return 0;
			// }
		}
	);
	
	$("#storedSnippets").innerHTML="";
	for(var index in collection) {
		var snippet = collection[index] // using to get things out of object 
		if( snippet.folder )
		{
			// var theFolder = snippet.folder
			// // at this location we have a link folder .. no snippets
			// var snippetA = $('<a href="#" onclick="loadFolder(\''+snippet.UID+'\')">'+theFolder+'</a><br>');
			
			// $(snippetA).attr('id', snippet.UID);
			// $("#storedSnippets").append(snippetA)
			
		}
		else
		{
			
			var title = snippet.title 
			var code = snippet.code
			var UID = snippet.key
			// var snippetDiv = $("<div><a href=\"javascript:toggleCode('"+ index + "')\"  id = \"lnk_" + index + "\">+</a>" + title + "<div style = \"display: none\" id = \""+ index  + "\" >" + code + " </div></div>")	
			var html=""+
				"<div id = \"" + UID + "\">"+
				//  function call within the href 
					"<a href=\"javascript:toggleCode('"+ index + "')\"  id = \"lnk_" + index + "\"> + </a>" +
						title + 
					"<div style = \"display: none\" id = \""+ index  + "\" >" + 
						code + 
					"</div>"+
				"</div>";

			 var snippetDiv= $(html);
			
			// $(snippetDiv).attr('id', snippet.UID);
			$("#storedSnippets").append(snippetDiv)
		}
		
	}
	
	// 1. Set up click event listeners on all titles
	// 2. get the 'id' attribute value of item clicked
	// 3. find that item in the 'data' variable => data[something]
	// 4. do something with the new object
};






