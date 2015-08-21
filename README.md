# ie-web-worker

Polyfill for the Web Worker API that works in Internet Explorer and other old browsers that don't support this API.

It's a simple script that emulates web worker threads in IE 

The code will still be slow (single threaded) but you can keep you code consistent.

Usage 
```HTML
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

Originally exported from Google Code (https://code.google.com/p/ie-web-worker/).
