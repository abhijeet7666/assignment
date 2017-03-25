$(function() {
		
	// initialize canvas, buttons,
	var C1 = this.__canvas = new fabric.Canvas('c1'),
		C2 = this.__canvas = new fabric.Canvas('c2');	
		
	var $add_circle_btn = $(document.getElementById("add_circle")),
		$add_rect_btn 	= $(document.getElementById("add_rect")),
		$obj_copy_btn	= $(document.getElementById("obj_copy"));
	
	// move objects from source canvas to target canvas
	function moveObjects(src, dst){
			
		var activeObj = src.getActiveObject() == null ? src.getActiveGroup() : src.getActiveObject();
	 
		if(activeObj != null){

		 if(activeObj.type == 'group'){
		 
			var objectsInGroup = activeObj.getObjects();
				src.discardActiveGroup();

			objectsInGroup.forEach(function(object) {
				object.clone(function(c) {
					dst.add(c.set({
						left: c.left,
						top: c.top
					}));
				});
				src.remove(object);
			});
					
		 }else{
		 
			activeObj.clone(function(c) {
				dst.add(c.set({ left: c.left, top: c.top }));
			});
			
			src.remove(activeObj);
		 
		 }
		}
		
	}
	
	// button event
	$add_circle_btn.on('click', function(){
		
		var circle = new fabric.Circle({
			radius: 40, left: 50, top: 50, fill: '#f00'
		});
	
		C1.add(circle);
		
	});
	
	// create rectangle
	$add_rect_btn.on('click', function(){
		
		var rect = new fabric.Rect({
			width: 200, height: 100, left: 200, top: 50, fill: '#00f'
		});
	
		C1.add(rect);
		
	});
	
	// copy selected objects from C1 to C2
	$obj_copy_btn.on('click', function(){
		 
		moveObjects(C1, C2);
		
	});
	
	
});