$(main)




function main() {
	$("#submit").click(submit)
};
function submit(){
	var codeSnippet = {

		title:$("#title").val(),
		code:$("#code").val(),
		tagIt:$("#tagIt").val(),


	};
	$('#title, #code,#tagIt').val('');

	objectsInFirebase.push(codeSnippet);


};

objectsInFirebase.on('value',loadExistingSnippets);
 
	

function loadExistingSnippets(results){
	var snippets = results.val();
	for(var key in snippets){
		var snippet = snippets[key] // using to get things out of object 
		var title = snippet.title 
		var snippetDiv = $("<div> " + title + "</div>")	
		$("#storedSnippets").append(snippetDiv)
	}
};






