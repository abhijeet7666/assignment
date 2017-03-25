$(function() {
	
	// define variables
	var json_srcpath = "http://jsonplaceholder.typicode.com/posts";
	var inputJSON = {};
	
	// element selectors
	var $form_user_id 		= $(document.getElementById("user_id")),
		$form_index 		= $(document.getElementById("index_id")),
		$form_user_title 	= $(document.getElementById("user_title")),
		$form_user_body 	= $(document.getElementById("user_body"));
		
	// render form elements
	function loadFormElements(){
		
		var userId = new Array();
		$form_user_id.append("<option value='-1' >Select an id</option>");
		
		for(var i=0, len = inputJSON.length; i<len ;i++){
			if(userId.indexOf(inputJSON[i]['userId']) == -1){
				userId.push(inputJSON[i]['userId']);
				$form_user_id.append("<option value="+inputJSON[i]['userId']+" >"+inputJSON[i]['userId']+"</option>");
			}
		}	
			
	}
	
	// update form elements
	function reloadFormElements(idx, type){
		
		if(type == "even"){
			
			$form_index.empty();
			$form_user_title.empty();
			
			var executeonce = true;
			for(var i=0, len = inputJSON.length; i<len ;i++){
				if(inputJSON[i]['userId'] == idx){
					
					if(executeonce){
						$form_user_body.val(inputJSON[i]['body']);
						executeonce = false;
					}
					
					$form_index.append("<option value="+inputJSON[i]['id']+" >"+inputJSON[i]['id']+"</option>");
					$form_user_title.append("<option value="+inputJSON[i]['id']+" >"+inputJSON[i]['title']+"</option>");
				}
			}
			
			$form_index.closest("div.form_section").show();
			$form_user_title.closest("div.form_section").show();
			$form_user_body.closest("div.form_section").show();
			
			
			
		}else if(type == "odd"){
			
			$form_index.closest("div.form_section").hide();
			$form_user_body.closest("div.form_section").hide();
			$form_user_title.empty();
			
			for(var i=0, len = inputJSON.length; i<len ;i++){
				if(inputJSON[i]['userId'] == idx){
				 	$form_user_title.append("<option value="+inputJSON[i]['id']+" >"+inputJSON[i]['title']+"</option>");
				}
			} 
			
		}	
		
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
	$form_user_id.on('change', function(){
		var id = $(this).val();
		
		if(id == -1) return;
		
		if((id % 2)== 0){
			reloadFormElements(id, 'even');
		}else{
			reloadFormElements(id, 'odd');
		}
	});
	
	$form_index.on('change', function(){
		var id = $(this).val();
		for(var i=0, len = inputJSON.length; i<len ;i++){
			if(inputJSON[i]['id'] == id){
				$form_user_body.val(inputJSON[i]['body']);
				break;
			}
		}
		
		$form_user_title.val(id);
		
	});
	
	$form_user_title.on('change', function(){
		var id = $(this).val();
		for(var i=0, len = inputJSON.length; i<len ;i++){
			if(inputJSON[i]['id'] == id){
				$form_user_body.val(inputJSON[i]['body']);
				break;
			}
		}

		$form_index.val(id);
	});
		
	
});