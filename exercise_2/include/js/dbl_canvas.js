$(function() {
		
	// initialize canvas, buttons,
	var C1 = this.__canvas = new fabric.Canvas('c1'),
		C2 = this.__canvas = new fabric.Canvas('c2');	
		
	C1.isMouseover = false;		// mouse hover status on canvas
	C2.isMouseover = false;
	C1.isDrag = false;			// object in dragging state
	C2.isDrag = false;
	
	var Mouse = { 				// get mouse cordinate onhover canvas
		posX : 0,
		posY : 0
	};
  
	var $C1_container 	= $(document.getElementById("c1")),
		$C2_container 	= $(document.getElementById("c2")),
		$drag_box 		= $(document.getElementById("drag_box")),
		$add_circle_btn = $(document.getElementById("add_circle")),
		$add_rect_btn 	= $(document.getElementById("add_rect")),
		$obj_copy_btn	= $(document.getElementById("obj_copy"));

	// random color
	function getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
	
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
						left: Mouse.posX + (c.left - activeObj.left),
						top: Mouse.posY + (c.top - activeObj.top)
					}));
				});
				src.remove(object);
			});
					
		 }else{
		 
			activeObj.clone(function(c) {
				dst.add(c.set({ left: Mouse.posX, top: Mouse.posY }));
			});
			
			src.remove(activeObj);
		 
		 }
		}
		
	}
	
	// set mouse hover status
	$C1_container.parent().on('mouseover',function(){ 
	
		C1.isMouseover = true; 
		
		if(C2.drag){
			$(this).addClass("droppable");		// show canvas object droppable
			$drag_box.show();
		}
		
	}).on('mouseout',function(){ 
	
		C1.isMouseover = false;
		
		$(this).removeClass("droppable");
	});
	
	$C2_container.parent().on('mouseover',function(){ 
		C2.isMouseover = true;
		
		if(C1.drag){
			$(this).addClass("droppable");		// show canvas object droppable
			$drag_box.show();
		}
		
	}).on('mouseout',function(){ 
		C2.isMouseover = false;
		
		$(this).removeClass("droppable");
	});
	
	// canvas events
	C1.on('mouse:up', function(e) {
		if((e.target != null)&&( C2.isMouseover == true)){
			moveObjects(C1, C2); 
		}		
	}).on('mouse:move', function(options) {
		Mouse.posX = options.e.layerX;
		Mouse.posY = options.e.layerY;
	}).on("object:moving", function(e){
		C1.drag = true;
	}).on("object:modified", function(e){
		C1.drag = false;
	}).on("object:selected", function(e){
		$drag_box.css({width: e.target.width, height: e.target.height});
	});
	
	C2.on('mouse:up', function(e) {
		if((e.target != null)&&( C1.isMouseover == true)){
			moveObjects(C2, C1);
		}
	}).on('mouse:move', function(options) {
		Mouse.posX = options.e.layerX;
		Mouse.posY = options.e.layerY;
	}).on("object:moving", function(e){
		C2.drag = true;
	}).on("object:modified", function(e){
		C2.drag = false;
	}).on("object:selected", function(e){
		$drag_box.css({width: e.target.width, height: e.target.height});
	});
	
	// document event
	$(document).on('mousemove',function(e) {
	  $drag_box.css({top:e.pageY+1, left:e.pageX+1});
	}).on('mouseup',function(e) {
	  $drag_box.hide();
	});
		
	// button event
	$add_circle_btn.on('click', function(){
		
		var randomPosition = (Math.floor(Math.random() * 10) + 1)*10;
		var circle = new fabric.Circle({
			radius: 40, left: randomPosition * 3, top: randomPosition, fill: getRandomColor()
		});
	
		C1.add(circle);
		
	});
	
	// create rectangle
	$add_rect_btn.on('click', function(){
		
		var randomPosition = (Math.floor(Math.random() * 10) + 1)*10;
		var rect = new fabric.Rect({
			width: 200, height: 50, left: randomPosition * 3, top: randomPosition, fill: getRandomColor()
		});
	
		C1.add(rect);
		
	});	
	
});