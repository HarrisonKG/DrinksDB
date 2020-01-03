var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultLayout:'template'});

var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cookieParser('flashCookie'));
app.use(session({ cookie: { maxAge: 60000}}));
app.use(flash());

app.use(express.static('public'));
app.set('port', 3000);






function getFlavorsWithDrinks(res, mysql, context, complete){
    var sql = 'SELECT DISTINCT flavor_name FROM flavors JOIN drinks ON drinks.drink_flavor = flavors.flavor_id';
    mysql.pool.query(sql, function(error, rows, fields){
        if(error){
            console.log(error);
        }
	    context.flavors = rows; 
        complete();
    });
}


function getCountriesWithDrinks(res, mysql, context, complete){
    var sql = 'SELECT DISTINCT country_name FROM countries JOIN drinks ON drinks.invention_country = countries.country_id';
    mysql.pool.query(sql, function(error, rows, fields){
        if(error){
            console.log(error);
        }
	    context.countries = rows; 
        complete();
    });
}


function getSpiritsWithDrinks(res, mysql, context, complete){
    var sql = 'SELECT DISTINCT spirit_name FROM spirits JOIN spirit_ingredients ON spirit_id = spirit_ingredient';
    mysql.pool.query(sql, function(error, rows, fields){
        if(error){
            console.log(error);
        }
	    context.spirits = rows; 
        complete();
    });
}



function getDrinksByFlavor(req, res, mysql, context, complete){
	var sql = 'SELECT drink_name, drink_id FROM flavors RIGHT JOIN drinks ON drinks.drink_flavor = flavors.flavor_id';
	if (req.body.flavor_list != "all"){
		sql += ' WHERE flavor_name =?';
	}
	// get drinks associated with the flavor requested
  	mysql.pool.query(sql, [req.body.flavor_list], function(err, result){
	    if(err){
	      console.log(err);
	    }
	    context.results = result;
	    complete();
	});
}


function getDrinksByCountry(req, res, mysql, context, complete){
	mysql.pool.query('SELECT drink_name, drink_id FROM drinks JOIN countries ON drinks.invention_country = countries.country_id WHERE country_name =?', 
	[req.body.country_list], function(err, rows, fields){
	    if(err){
    		console.log(err);
	    }
	    context.country_drinks = rows; 
	    complete();
	});
}


function getDrinksBySpiritID(res, mysql, context, complete){
	mysql.pool.query('SELECT drink_name, drink_id FROM drinks JOIN spirit_ingredients ON drinks.drink_id = spirit_ingredients.spirit_drink_id WHERE spirit_ingredient=?', 
	[context.spiritID], function(err, rows, fields){
	    if(err){
	    	console.log(err);
	    }
	    context.spirit_drinks = rows; 
	    complete();
	});
}


function getSpiritsByCountry(req, res, mysql, context, complete){
	mysql.pool.query('SELECT spirit_name, spirit_id FROM spirits JOIN countries ON spirits.spirit_country = countries.country_id WHERE country_name =?', 
	[req.body.country_list], function(err, result){
	    if(err){
	    	console.log(err);
	    }
	    context.country_spirits = result;
	    complete();
	});
}



function getAllCountries(res, mysql, context, complete){
    var sql = 'SELECT country_name FROM countries';
    mysql.pool.query(sql, function(error, rows, fields){
        if(error){
            console.log(error);
        }
	    context.countries = rows;
        complete();
    });
}


function getAllSpirits(res, mysql, context, complete){
    var sql = 'SELECT spirit_name, spirit_id FROM spirits';
    mysql.pool.query(sql, function(error, rows, fields){
        if(error){
            console.log(error);
        }
	    context.spirits = rows; 
        complete();
    });
}


function getAllMixers(res, mysql, context, complete){
    var sql = 'SELECT mixer_name FROM mixers';
    mysql.pool.query(sql, function(error, rows, fields){
        if(error){
            console.log(error);
        }
	    context.mixers = rows; 
        complete();
    });
}


function getAllFlavors(res, mysql, context, complete){
    var sql = 'SELECT flavor_name FROM flavors';
    mysql.pool.query(sql, function(error, rows, fields){
        if(error){
            console.log(error);
        }
	    context.flavors = rows; 
        complete();
    });
}


function getAllDrinks(res, mysql, context, complete){
    var sql = 'SELECT drink_name, drink_id FROM drinks';
    mysql.pool.query(sql, function(error, rows, fields){
        if(error){
            console.log(error);
        }
	    context.drinks = rows; 
        complete();
    });
}



function getSpiritInfo(res, mysql, context, complete){
	mysql.pool.query('SELECT spirit_name, spirit_proof, country_name FROM spirits LEFT JOIN countries ON spirits.spirit_country = countries.country_id WHERE spirit_id=?', 
	[context.spiritID], function(err, rows, fields){
	    if(err){
	    	console.log(err);
	    } else {	
		    context.spiritName = rows[0].spirit_name;    
		    context.country = rows[0].country_name; 
		    context.proof = rows[0].spirit_proof;
		}
	    complete();
	});
}


function getSpiritIDByName(req, res, mysql, context, complete){
	mysql.pool.query('SELECT spirit_id FROM spirits WHERE spirit_name=?', 
	[req.body.spirit_list], function(err, rows, fields){
	    if(err){
	    	console.log(err);
	    	context.errorMessage = "Error looking up spirit";
	    	res.render("spirits", context);
	    } else {
		context.spiritID = rows[0].spirit_id; 
		complete();
	    }
	});
}



function getDrinkByDrinkID(req, res, mysql, context, complete){
    var sql = 'SELECT drink_name, drink_directions, inventor_name, country_name, flavor_name from drinks LEFT JOIN countries ON drinks.invention_country = countries.country_id LEFT JOIN flavors on drinks.drink_flavor = flavors.flavor_id WHERE drinks.drink_id =?';

    mysql.pool.query(sql, [req.params.id], function(error, rows, fields){
        if(error){
            console.log(error);
        }
        else {
		    context.drink = rows[0].drink_name; 
		    context.directions = rows[0].drink_directions;
		    context.country = rows[0].country_name;
		    context.inventor = rows[0].inventor_name;
		    context.flavor = rows[0].flavor_name;
		    context.drinkID = req.params.id;
		}
        complete();
    });
}


function getSpiritsByDrinkID(req, res, mysql, context, complete){
    var sql = 'SELECT spirit_id, spirit_name, spirit_quantity, spirit_measure FROM drinks JOIN spirit_ingredients ON drinks.drink_id = spirit_ingredients.spirit_drink_id JOIN spirits ON spirit_ingredients.spirit_ingredient = spirits.spirit_id WHERE drink_id =?';

    mysql.pool.query(sql, [req.params.id], function(error, rows, fields){
        if(error){
            res.write(JSON.stringify(error));
            console.log(error);
        }
		context.spirits = rows;
        complete();
    });
}
 

function getMixersByDrinkID(req, res, mysql, context, complete){
    var sql = 'SELECT mixer_id, mixer_name, mixer_quantity, mixer_measure FROM drinks JOIN mixer_ingredients ON drinks.drink_id = mixer_ingredients.mixer_drink_id JOIN mixers ON mixer_ingredients.mixer_ingredient = mixers.mixer_id WHERE drink_id =?';

    mysql.pool.query(sql, [req.params.id], function(error, rows, fields){
        if(error){
            console.log(error);
        }
		context.mixers = rows;
        complete();
    });
}



function insertSpiritsArray(req, res, mysql, context, complete){
    var sql = 'INSERT INTO spirit_ingredients (spirit_drink_id, spirit_ingredient, spirit_quantity, spirit_measure) VALUES (?, (SELECT spirit_id FROM spirits WHERE spirit_name = ?), ?, ?)';

    req.body.spirits.forEach(function(spirit, index){    	
    	mysql.pool.query(sql, [context.drinkID, spirit, req.body.spiritAmounts[index], req.body.spiritMeasures[index]], function(err, rows, fields){
    		if(err){
		    	console.log(err);
		    }
		    complete();
		}); 
	});
}


function insertOneSpirit(req, res, mysql, context, complete){
    var sql = 'INSERT INTO spirit_ingredients (spirit_drink_id, spirit_ingredient, spirit_quantity, spirit_measure) VALUES (?, (SELECT spirit_id FROM spirits WHERE spirit_name = ?), ?, ?)';

    mysql.pool.query(sql, [context.drinkID, req.body.spirits, req.body.spiritAmounts, req.body.spiritMeasures], function(err, rows, fields){
		if(err){
	    	console.log(err);
	    }
	    complete();
	}); 
}


function insertMixersArray(req, res, mysql, context, complete){
    var sql = 'INSERT INTO mixer_ingredients (mixer_drink_id, mixer_ingredient, mixer_quantity, mixer_measure) VALUES (?, (SELECT mixer_id FROM mixers WHERE mixer_name = ?), ?, ?)';

    req.body.mixers.forEach(function(mixer, index){    	
    	mysql.pool.query(sql, [context.drinkID, mixer, req.body.mixerAmounts[index], req.body.mixerMeasures[index]], function(err, rows, fields){
    		if(err){
		    	console.log(err);
		    }
		    complete();
		}); 
	});
}


function insertOneMixer(req, res, mysql, context, complete){
    var sql = 'INSERT INTO mixer_ingredients (mixer_drink_id, mixer_ingredient, mixer_quantity, mixer_measure) VALUES (?, (SELECT mixer_id FROM mixers WHERE mixer_name = ?), ?, ?)';

    mysql.pool.query(sql, [context.drinkID, req.body.mixers, req.body.mixerAmounts, req.body.mixerMeasures], function(err, rows, fields){
		if(err){
	    	console.log(err);
	    }
	    complete();
	}); 
}



function updateDrink(req, res, mysql, context, complete){
    var sql = 'UPDATE drinks SET drink_name=?, drink_directions=?, inventor_name=?, invention_country=(SELECT country_id from countries WHERE country_name =?), drink_flavor=(SELECT flavor_id from flavors WHERE flavor_name =?) WHERE drink_id=?';
    mysql.pool.query(sql, [req.body.drinkName, req.body.drinkDirections, req.body.drinkInventor, req.body.country_list, req.body.flavor_list, req.body.drinkID], function(error, rows, fields){
        if(error){
            console.log(error);
        }
	   	complete();
    });
}


function deleteDrink(req, res, mysql, context, complete){
	mysql.pool.query('DELETE FROM drinks WHERE drink_id =?', 
  	[req.params.id], function(err, rows, fields){
	    if(err){
	    	console.log(err);
	    }
	    complete();
	});
}


function deleteSpiritIngredient(req, res, mysql, context, complete){
    var sql = 'DELETE FROM spirit_ingredients WHERE spirit_drink_id =? AND spirit_ingredient =?';

    mysql.pool.query(sql, [req.body.drink_id, req.body.spirit_id], function(err, rows, fields){
		if(err){
	    	console.log(err);
	    } else {
	    	context.success = true;
	    }
	    complete();
	}); 
}


function deleteMixerIngredient(req, res, mysql, context, complete){
    var sql = 'DELETE FROM mixer_ingredients WHERE mixer_drink_id =? AND mixer_ingredient =?';

    mysql.pool.query(sql, [req.body.drink_id, req.body.mixer_id], function(err, rows, fields){
		if(err){
	    	console.log(err);
	    } else {
	    	context.success = true;
	    }
	    complete();
	}); 
}



function insertCountry(req, res, mysql, context, complete){
	var sql = 'INSERT INTO countries (country_name) VALUES (?)';
    mysql.pool.query(sql, [req.body.newCountry], function(err, rows, fields){
		if(err){
	    	console.log(err);
			req.flash('update', 'Something went wrong with that request. That name may already be in the list.');
	    } else {
	    	req.flash('update', 'New country appended to list');
	    }
	    complete();
	}); 
}


function insertSpirit(req, res, mysql, context, complete){
var sql = 'INSERT INTO spirits (spirit_name) VALUES (?)';
    mysql.pool.query(sql, [req.body.newSpirit], function(err, rows, fields){
		if(err){
	    	console.log(err);
			req.flash('update', 'Something went wrong with that request. That name may already be in the list.');
	    } else {
	    	req.flash('update', 'New spirit appended to list');
	    }
	    complete();
	});
}


function insertMixer(req, res, mysql, context, complete){
	var sql = 'INSERT INTO mixers (mixer_name) VALUES (?)';
    mysql.pool.query(sql, [req.body.newMixer], function(err, rows, fields){
		if(err){
	    	console.log(err);
			req.flash('update', 'Something went wrong with that request. That name may already be in the list.');
	    } else {
	    	req.flash('update', 'New mixer appended to list');
	    }
	    complete();
	}); 
}


function insertFlavor(req, res, mysql, context, complete){
	var sql = 'INSERT INTO flavors (flavor_name) VALUES (?)';
    mysql.pool.query(sql, [req.body.newFlavor], function(err, rows, fields){
		if(err){
	    	console.log(err);
			req.flash('update', 'Something went wrong with that request. That name may already be in the list.');
	    } else {
	    	req.flash('update', 'New spirit appended to list');
	    }
	    complete();
	}); 
}



function updateSpiritCountry(req, res, mysql, context, complete){
	var sql = 'UPDATE spirits SET spirit_country=(SELECT country_id FROM countries WHERE country_name=?) WHERE spirit_id=?';
	mysql.pool.query(sql, [req.body.country_list, req.body.spiritID], function(err, rows, fields){
	    if(err){
	    	console.log(err);
	    }
	    complete();
	});
}





app.get('/',function(req,res,next){
	var callbackCount = 0;
	var context = {};

	getCountriesWithDrinks(res, mysql, context, complete);
    getFlavorsWithDrinks(res, mysql, context, complete);
    getSpiritsWithDrinks(res, mysql, context, complete);

 	function complete(){
	    callbackCount++;
	    if(callbackCount >= 3){
	        res.render('home', context);
	    }
    }
});


app.post('/flavor',function(req,res,next){
	var callbackCount = 0;
	var context = {};
	context.reqFlavor = req.body.flavor_list;

	getDrinksByFlavor(req, res, mysql, context, complete);
	getFlavorsWithDrinks(res, mysql, context, complete);
	getCountriesWithDrinks(res, mysql, context, complete);
    getSpiritsWithDrinks(res, mysql, context, complete);

 	function complete(){
	    callbackCount++;
	    if(callbackCount >= 4){
	        res.render('home', context);
	    }
    }
});



app.get('/getAllSpirits', function(req,res,next){
	var callbackCount = 0;
	var context = {};
  	getAllSpirits(res, mysql, context, complete);

	function complete(){
	    callbackCount++;
	    if(callbackCount >= 1){
	    	res.send(JSON.stringify(context));
	    }
    }
});


app.get('/getAllMixers', function(req,res,next){
	var callbackCount = 0;
	var context = {};
  	getAllMixers(res, mysql, context, complete);

	function complete(){
	    callbackCount++;
	    if(callbackCount >= 1){
	    	res.send(JSON.stringify(context));
	    }
    }
});



app.get('/drink/:id',function(req,res,next){
	var callbackCount = 0;
	var context = {};
  	
  	getDrinkByDrinkID(req, res, mysql, context, complete);
	getSpiritsByDrinkID(req, res, mysql, context, complete);
	getMixersByDrinkID(req, res, mysql, context, complete);

	function complete(){
	    callbackCount++;
	    if(callbackCount >= 3){
	        res.render('drink', context);
	    }
    }
});



app.get('/editDrink/:id', function(req,res,next){
	var callbackCount = 0;
	var context = {};

	getDrinkByDrinkID(req, res, mysql, context, complete);
	getSpiritsByDrinkID(req, res, mysql, context, complete);
	getMixersByDrinkID(req, res, mysql, context, complete);
	getAllCountries(res, mysql, context, complete);
	getAllFlavors(res, mysql, context, complete);

	function complete(){
	    callbackCount++;
	    if(callbackCount >= 5){
	        res.render('editDrink', context);
	    }
    }
});



app.post('/editDrink', function(req,res,next){
	var callbackCount = 0;
	var context = {};
	context.drinkID = req.body.drinkID;
	var numSpirits, numMixers; 

	updateDrink(req, res, mysql, context, complete);

	if (!req.body.spirits){
		numSpirits = 0;
	} else if (typeof req.body.spirits == "string"){
		numSpirits = 1;
		insertOneSpirit(req, res, mysql, context, complete);
	} else if (typeof req.body.spirits == "object"){
		numSpirits = req.body.spirits.length;
		insertSpiritsArray(req, res, mysql, context, complete); 	
	}

	if (!req.body.mixers){
		numMixers = 0;
	} else if (typeof req.body.mixers == "string"){
		numMixers = 1;
	    insertOneMixer(req, res, mysql, context, complete);
	} else if (typeof req.body.mixers == "object"){
		numMixers = req.body.mixers.length;
		insertMixersArray(req, res, mysql, context, complete); 	
	}

	// 1 drink insertion plus spirits and mixers insertions
	var numRows = numSpirits + numMixers + 1;
	
	function complete(){
	    callbackCount++;
	    if(callbackCount >= numRows){
	        res.redirect('drink/' + req.body.drinkID);
	    }
    }
});



app.post('/deleteSpiritIngredient', function(req,res,next){
	var callbackCount = 0;
	var context = {};
	deleteSpiritIngredient(req, res, mysql, context, complete);

	function complete(){
	    callbackCount++;
	    if(callbackCount >= 1){
	        res.send(JSON.stringify(context));
	    }
    }
});


app.post('/deleteMixerIngredient', function(req,res,next){
	var callbackCount = 0;
	var context = {};
	deleteMixerIngredient(req, res, mysql, context, complete);

	function complete(){
	    callbackCount++;
	    if(callbackCount >= 1){
	        res.send(JSON.stringify(context));
	    }
    }
});



app.post('/deleteDrink/:id', function(req,res,next){
	var callbackCount = 0;
	var context = {};
  	deleteDrink(req, res, mysql, context, complete);

 	function complete(){
	    callbackCount++;
	    if(callbackCount >= 1){
	        res.redirect('/');
	    }
    }
});



app.get('/addDrink', function(req,res,next){
	var callbackCount = 0;
	var context = {};

    getAllDrinks(res, mysql, context, complete);
	getAllFlavors(res, mysql, context, complete);
	getAllCountries(res, mysql, context, complete);

	function complete(){
	    callbackCount++;
	    if(callbackCount >= 3){
	        res.render('addDrink', context);
	    }
    }
});



app.post('/addDrink', function(req,res,next){
	var callbackCount = 0;
	var context = {};
	var numSpirits, numMixers; 

	if (!req.body.spirits){
		numSpirits = 0;
	} else if (typeof req.body.spirits == "string"){
		numSpirits = 1;
	} else if (typeof req.body.spirits == "object"){
		numSpirits = req.body.spirits.length;
	}

	if (!req.body.mixers){
		numMixers = 0;
	} else if (typeof req.body.mixers == "string"){
		numMixers = 1;
	} else if (typeof req.body.mixers == "object"){
		numMixers = req.body.mixers.length;
	}

	// 1 drink insertion, 1 drink_id selection, plus spirits and mixers
	var numRows = numSpirits + numMixers + 2;

	// insert into drinks first
  	mysql.pool.query('INSERT INTO drinks (drink_name, drink_directions, inventor_name, drink_flavor, invention_country) VALUES (?, ?, ?, (SELECT flavor_id FROM flavors WHERE flavor_name = ?), (SELECT country_id FROM countries WHERE country_name = ?))',
  	[req.body.drinkName, req.body.drinkDirections, req.body.drinkInventor, req.body.flavor_list, req.body.country_list], function(err, rows, fields){
	    if(err){
	    	console.log(err);
			context.errorMessage = "Something went wrong with that request. The drink may already exist or you may need to input a name.";
			res.render('addDrink', context);
	    } else {
	    	complete();

		    // get drink ID 
			mysql.pool.query('SELECT drink_id FROM drinks WHERE drink_name =?',
	  		[req.body.drinkName], function(err, rows, fields){
			    if(err){
			    	console.log(err);
			    } else {
				    context.drinkID = rows[0].drink_id;
				}
			    complete();

			    // after drink inserted and ID retrieved, insert spirits and mixers 
			    if (numSpirits == 1){
				    insertOneSpirit(req, res, mysql, context, complete);
			    } else if (numSpirits > 1){
					insertSpiritsArray(req, res, mysql, context, complete); 	
				}

				if (numMixers == 1){
				    insertOneMixer(req, res, mysql, context, complete);
			    } else if (numMixers > 1){
					insertMixersArray(req, res, mysql, context, complete); 	
				}
			});
		}
	});

	function complete(){
	    callbackCount++;
	    if(callbackCount >= numRows){
	    	res.redirect('/drink/' + context.drinkID);
	    }
    } 
});



app.get('/addCountry', function(req,res,next){
	var callbackCount = 0;
	var context = {};
	context.message = req.flash('update');
  	getAllCountries(res, mysql, context, complete);

 	function complete(){
	    callbackCount++;
	    if(callbackCount >= 1){
	        res.render('addCountry', context);
	    }
    }  
});



app.post('/addCountry', function(req,res,next){
	var callbackCount = 0;
	var context = {};
  	insertCountry(req, res, mysql, context, complete);

 	function complete(){
	    callbackCount++;
	    if(callbackCount >= 1){
	        res.redirect('/addCountry');
	    }
    }   
});



app.get('/addSpirit', function(req,res,next){
	var callbackCount = 0;
	var context = {};
	context.message = req.flash('update');
  	getAllSpirits(res, mysql, context, complete);

 	function complete(){
	    callbackCount++;
	    if(callbackCount >= 1){
	        res.render('addSpirit', context);
	    }
    } 
});



app.post('/addSpirit', function(req,res,next){
	var callbackCount = 0;
	var context = {};
  	insertSpirit(req, res, mysql, context, complete);
  	
 	function complete(){
	    callbackCount++;
	    if(callbackCount >= 1){
	        res.redirect('/addSpirit');
	    }
   	}  
});



app.get('/addMixer', function(req,res,next){
	var callbackCount = 0;
	var context = {};
	context.message = req.flash('update');
  	getAllMixers(res, mysql, context, complete);

 	function complete(){
	    callbackCount++;
	    if(callbackCount >= 1){
	        res.render('addMixer', context);
	    }
    }  
});



app.post('/addMixer', function(req,res,next){
	var callbackCount = 0;
	var context = {};
  	insertMixer(req, res, mysql, context, complete);
	
 	function complete(){
	    callbackCount++;
	    if(callbackCount >= 1){
	        res.redirect('addMixer');
	    }
    } 
});



app.get('/addFlavor', function(req,res,next){
	var callbackCount = 0;
	var context = {};
	context.message = req.flash('update');
  	getAllFlavors(res, mysql, context, complete);

 	function complete(){
	    callbackCount++;
	    if(callbackCount >= 1){
	        res.render('addFlavor', context);
	    }
    }   
});



app.post('/addFlavor', function(req,res,next){
	var callbackCount = 0;
	var context = {};
	insertFlavor(req, res, mysql, context, complete);

 	function complete(){
	    callbackCount++;
	    if(callbackCount >= 1){
	        res.redirect('addFlavor');
	    }
    }
});



app.get('/countries',function(req,res,next){
	var callbackCount = 0;
	var context = {};
    getCountriesWithDrinks(res, mysql, context, complete);

 	function complete(){
	    callbackCount++;
	    if(callbackCount >= 1){
	        res.render('countries', context);
	    }
    }
});



app.post('/countries',function(req,res,next){
	var callbackCount = 0;
	var context = {};
	context.reqCountry = req.body.country_list;

	getSpiritsByCountry(req, res, mysql, context, complete);
  	getDrinksByCountry(req, res, mysql, context, complete);
	getCountriesWithDrinks(res, mysql, context, complete);

 	function complete(){
	    callbackCount++;
	    if(callbackCount >= 3){
	        res.render('countries', context);
	    }
    }
});



app.get('/spirits',function(req,res,next){
	var callbackCount = 0;
	var context = {};
    getSpiritsWithDrinks(res, mysql, context, complete);

 	function complete(){
	    callbackCount++;
	    if(callbackCount >= 1){
	        res.render('spirits', context);
	    }
    }
});



app.post('/spirits',function(req,res,next){
	var callbackCount = 0;
	var context = {};

	if (req.body.spirit_list){
		getSpiritIDByName(req, res, mysql, context, complete);
	} else {
		res.redirect('/spirits');
	}

 	function complete(){
	    callbackCount++;
	    if(callbackCount >= 1){
	        res.redirect('/spirit/' + context.spiritID);
	    }
    }
});



app.get('/spirit/:id',function(req,res,next){
	var callbackCount = 0;
	var context = {};
	context.spiritID = req.params.id;

  	getDrinksBySpiritID(res, mysql, context, complete);
  	getSpiritInfo(res, mysql, context, complete);
	getSpiritsWithDrinks(res, mysql, context, complete);
	getAllCountries(res, mysql, context, complete);

 	function complete(){
	    callbackCount++;
	    if(callbackCount >= 4){
	        res.render('spirits', context);
	    }
    }
});



app.post('/setNewSpiritCountry',function(req,res,next){
	var callbackCount = 0;
	var context = {};
	updateSpiritCountry(req, res, mysql, context, complete);	

 	function complete(){
	    callbackCount++;
	    if(callbackCount >= 1){
	        res.redirect('/spirit/' + req.body.spiritID);
	    }
    }
});




app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});





