/*
	Create a fake worker thread of IE and other browsers
	Remember: Only pass in primitives, and there is none of the native
			security happening
*/

if(!Worker)
{
	var Worker = function ( scriptFile )
	{
		var self = this ;
		var __timer = null ;
		var __text = null ;
		var __fileContent = null ;
	
		self.onerror = null ;
		self.onmessage = null ;

		// child has run itself and called for it's parent to be notified
		var postMessage = function( text )
		{
			if ( "function" == typeof self.onmessage )
			{
				return self.onmessage( { "data" : text } ) ;
			}
			return false ;
		} ;
		//var resultReceiver;
		//var errorReceiver;
		var onmessage ;

		// Method that starts the threading
		self.postMessage = function( text )
		{
			__text = text ;
			__iterate() ;
			return true ;
		} ;
		var __iterate = function()
		{
			// Create an Iframe and execute code in that scope?
			__timer = setTimeout(__onIterate,1);
			return true ;
		} ;
		var __onIterate = function()
		{
			try
			{
				if ( "function" == typeof onmessage )
				{
					onmessage({ "data": __text });
				}
				return true ;
			}
			catch( ex )
			{
				if ( "function" == typeof self.onerror )
				{
					return self.onerror( { "data": ex.message } ) ;
				}
			}
			return false ;
		} ;


		self.terminate = function ()
		{
			clearTimeout( __timer ) ;
			return true ;
		} ;


		/* HTTP Request*/
		var getHTTPObject = function () 
		{
			var xmlhttp;
			try 
			{
				xmlhttp = new XMLHttpRequest();
			}
			catch (e) 
			{
				try 
				{
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch (e) 
				{
					xmlhttp = false;
				}
			}
			return xmlhttp;
		}

		var http		= getHTTPObject()
		http.open("GET", scriptFile, false)
		http.send(null);

		if (http.readyState == 4) 
		{
			var strResponse = http.responseText;
			//var strResponse = http.responseXML;
			switch (http.status) 
			{
				case 404: // Page-not-found error
					alert('Error: Not Found. The requested function could not be found.');
					break;
				case 500: // Display results in a full window for server-side errors
					alert(strResponse);
					break;
				default:
					__fileContent = strResponse ;
					// this should be in the scope of the instance of the outer class
					// IE functions will become delagates of the instance of Worker
					eval( __fileContent ) ;
					/*
					at this point we now have:
					a variable "results = []"
					a delagate "resultReceiver(event)"
					a delagate "errorReceiver(event)"
					and
					a delagate "onmessage(event)"

					BUT none are executed as of yet and all are only in the scope of this function call __onIterate
					so once we exit they will no longer exist.  
					*/
					break;
			}
		}

		self.importScripts = function(src)
		{
			// hack time
			var script = document.createElement("SCRIPT") ;
			script.src = src ;
			script.setAttribute( "type", "text/javascript" ) ;
			document.getElementsByTagName("HEAD")[0].appendChild(script)
			return true ;
		} ;

		return true ;
	} ;
}