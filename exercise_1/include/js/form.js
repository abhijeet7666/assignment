var inputJSON = [
  {
    "userId": 1,
    "id": 1,
    "title": "title 1",
    "body": "body 1"
  },
  {
    "userId": 2,
    "id": 2,
    "title": "title 2",
    "body": "body 2"
  }
];

$(function() {
	
	// element selectors
	$form_index 		= $(document.getElementById("index_id"));
	$form_user_id 		= $(document.getElementById("user_id"));
	$form_user_title 	= $(document.getElementById("user_title"));
	$form_user_body 	= $(document.getElementById("user_body"));
	
	// render form elements
	for(var i=0, len = inputJSON.length; i<len ;i++){
		$form_index.append("<option value="+inputJSON[i]['id']+" >"+inputJSON[i]['id']+"</option>");
	}
	
	$form_user_id.val(inputJSON[0]['userId']);
	$form_user_title.val(inputJSON[0]['title']);
	$form_user_body.val(inputJSON[0]['body']);	
	
});