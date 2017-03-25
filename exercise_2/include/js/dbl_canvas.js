$(function() {
		
	// initialize canvas, buttons,
	var C1 = this.__canvas = new fabric.Canvas('c1'),
		C2 = this.__canvas = new fabric.Canvas('c2');
		
	var $add_circle_btn = $(document.getElementById("add_circle")),
		$add_rect_btn 	= $(document.getElementById("add_rect"));	
	
	
	// button event
	$add_circle_btn.on('click', function(){
		
		var circle = new fabric.Circle({
			radius: 40, left: 50, top: 50, fill: '#f00'
		});
	
		C1.add(circle);
		
	});
	
	$add_rect_btn.on('click', function(){
		
		var rect = new fabric.Rect({
			width: 200, height: 100, left: 200, top: 50, fill: '#00f'
		});
	
		C1.add(rect);
		
	});
	
	
	
	
	
});