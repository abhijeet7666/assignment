$(function() {
		
	// initialize canvas, buttons,
	var C1 = this.__canvas = new fabric.Canvas('c1'),
		C2 = this.__canvas = new fabric.Canvas('c2');	
		
	C1.isMouseover = false;		// mouse hover status on canvas
	C2.isMouseover = false;
  
	var $C1_container 	= $(document.getElementById("c1")),
		$C2_container 	= $(document.getElementById("c2")),
		$add_circle_btn = $(document.getElementById("add_circle")),
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
						top: 0
					}));
				});
				src.remove(object);
			});
					
		 }else{
		 
			activeObj.clone(function(c) {
				dst.add(c.set({ left: c.left, top: 0 }));
			});
			
			src.remove(activeObj);
		 
		 }
		}
		
	}
	
	// set mouse hover status
	$C1_container.parent().on('mouseover',function(){ 
		C1.isMouseover = true;
	}).on('mouseout',function(){ 
		C1.isMouseover = false;
	});
	
	$C2_container.parent().on('mouseover',function(){ 
		C2.isMouseover = true;
	}).on('mouseout',function(){ 
		C2.isMouseover = false;
	});
	
	
	// canvas events
	C1.on('mouse:up', function(e) {
		if((e.target != null)&&( C2.isMouseover == true)){
			moveObjects(C1, C2);
		}
	});
	
	C2.on('mouse:up', function(e) {
		if((e.target != null)&&( C1.isMouseover == true)){
			moveObjects(C2, C1);
		}
	});
	
	// document mouse event
	$(document).mousemove(function(e) { 
		console.log(C1.isMouseover+','+C2.isMouseover);
	}); 
	
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