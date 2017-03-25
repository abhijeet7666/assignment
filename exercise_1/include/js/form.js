$(function() {
	
	// define variables
	var json_srcpath = "http://jsonplaceholder.typicode.com/posts";
	var inputJSON = {};
	
	// element selectors
	var $form_index 		= $(document.getElementById("index_id")),
		$form_user_id 		= $(document.getElementById("user_id")),
		$form_user_title 	= $(document.getElementById("user_title")),
		$form_user_body 	= $(document.getElementById("user_body"));
		
	// render form elements
	function loadFormElements(){
		
		for(var i=0, len = inputJSON.length; i<len ;i++){
			$form_index.append("<option value="+inputJSON[i]['id']+" >"+inputJSON[i]['id']+"</option>");
		}
		
		$form_user_id.val(inputJSON[0]['userId']);
		$form_user_title.val(inputJSON[0]['title']);
		$form_user_body.val(inputJSON[0]['body']);		
	}
	
	// update form elements
	function reloadFormElements(idx){
		 
		$form_user_id.val(inputJSON[idx]['userId']);
		$form_user_title.val(inputJSON[idx]['title']);
		$form_user_body.val(inputJSON[idx]['body']);
		
	}

	// get json data
	$.ajax({
	  method: "GET",
	  url: json_srcpath,
	  success: function(data){
		 inputJSON = data;
		 loadFormElements();
	  },
	  error: function(){
		  alert("unable to fetch data");
	  }
	});
	
	// attach events
	$form_index.on('change', function(){
		var id = $(this).val();
		reloadFormElements(id);
	});
		
	
});