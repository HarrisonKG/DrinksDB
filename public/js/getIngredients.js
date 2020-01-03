document.addEventListener('DOMContentLoaded', newSpiritRow);
document.addEventListener('DOMContentLoaded', newMixerRow);


function newSpiritRow() {
	document.getElementById('addSpirit').addEventListener('click', function (event) {
	    var req = new XMLHttpRequest();
	    var url = '/getAllSpirits';
	    var currentForm = this.form.id;
	    console.log(currentForm);

	    req.open('GET', url, true);  
	    
	    req.addEventListener('load', function(){
	        if (req.status >= 200 && req.status < 400){
	            var response = JSON.parse(req.responseText);
	            
	            amount = document.createElement('input');
	            amount.type = "text";
	            amount.placeholder = "0.0";
	            amount.name = "spiritAmounts";
	            amount.form = currentForm;
	            document.getElementById('insertPoint').appendChild(amount);

	            measure = document.createElement('input');
	            measure.type = "text";
	            measure.placeholder = "units";
	            measure.name = "spiritMeasures";
	            measure.form = currentForm;
	            document.getElementById('insertPoint').appendChild(measure);

	            spiritsMenu = document.createElement("select");
	            spiritsMenu.name = "spirits";
	            spiritsMenu.form = currentForm;

	            response.spirits.forEach(function(spirit, index){
	            	option = document.createElement("option");
	            	option.text = response.spirits[index].spirit_name;
	            	spiritsMenu.appendChild(option);
	            });

	            document.getElementById('insertPoint').appendChild(spiritsMenu);
	            document.getElementById('insertPoint').appendChild(document.createElement('br'));
	        } else {
	            console.log("Error in network request: " + req.statusText);
	        }
	    });
	    req.send(null);
	});
}


function newMixerRow() {
	document.getElementById('addMixer').addEventListener('click', function (event) {
	    var req = new XMLHttpRequest();
	    var url = '/getAllMixers';
	    var currentForm = this.form.id;
	    console.log(currentForm);

	    req.open('GET', url, true);  
	    
	    req.addEventListener('load', function(){
	        if (req.status >= 200 && req.status < 400){
	            var response = JSON.parse(req.responseText);

	            amount = document.createElement('input');
	            amount.type = "text";
	            amount.placeholder = "0.0";
	            amount.name = "mixerAmounts";
	            amount.form = currentForm;
	            document.getElementById('insertPoint').appendChild(amount);

	            measure = document.createElement('input');
	            measure.type = "text";
	            measure.placeholder = "units";
	            measure.name = "mixerMeasures";
	            measure.form = currentForm;
	            document.getElementById('insertPoint').appendChild(measure);

	            mixersMenu = document.createElement("select");
	            mixersMenu.name = "mixers";
	            mixersMenu.form = currentForm;

	            response.mixers.forEach(function(mixer, index){
	            	option = document.createElement("option");
	            	option.text = response.mixers[index].mixer_name;
	            	mixersMenu.appendChild(option);
	            });

	            addButton = document.createElement("button");


	            document.getElementById('insertPoint').appendChild(mixersMenu);
	            document.getElementById('insertPoint').appendChild(document.createElement('br'))


	        } else {
	            console.log("Error in network request: " + req.statusText);
	        }
	    });
	    req.send(null);
	});
}
