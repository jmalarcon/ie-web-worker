A simple script that emulates web worker threads in IE

The code will still be slow (single threaded) but you can keep you code consistent

Usage
```
<script src="worker.js"></script>
<script type="text/javascript">
<!--
	var worker = new Worker("your_script.js");  
	worker.onmessage = function(event) {  
		alert("Got: " + event.data);  
	};  
	worker.onerror = function(error) {  
		alert("Worker error: " + error.message);  
	};  
	worker.postMessage("Hello World"); 
// -->
</script>
```

for more info on worker threads see
https://developer.mozilla.org/En/Using_web_workers