


function deleteSpiritIngredient(drink_id, spirit_id){
	context = {};
	context.drink_id = drink_id;
	context.spirit_id = spirit_id;

	// send to node api
	var req = new XMLHttpRequest();
    var url = '/deleteSpiritIngredient';

    req.open('POST', url, true);  
    req.setRequestHeader('Content-Type', 'application/json');      
    
    req.addEventListener('load', function(){
        if (req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);

            // if successful, reload
            if (response.success){
                window.location.reload(true);              
            }
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(JSON.stringify(context));
}



function deleteMixerIngredient(drink_id, mixer_id){
	context = {};
	context.drink_id = drink_id;
	context.mixer_id = mixer_id;
	console.log(context);

	// send to node api
	var req = new XMLHttpRequest();
    var url = '/deleteMixerIngredient';

    req.open('POST', url, true);  
    req.setRequestHeader('Content-Type', 'application/json');      
    
    req.addEventListener('load', function(){
        if (req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);

            // if successful, run select query to rebuild table
            if (response.success){
                window.location.reload(true);              
            }
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(JSON.stringify(context));
}



