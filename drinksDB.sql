set foreign_key_checks = 0;
drop table if exists drinks, spirits, mixers, spirit_ingredients, 
mixer_ingredients, flavors, countries;


CREATE TABLE `drinks` (
    `drink_id` int(11) AUTO_INCREMENT NOT NULL,
    `drink_name` varchar(200) NOT NULL,
    `drink_flavor` int(11) DEFAULT NULL,
    `drink_directions` varchar(300) DEFAULT NULL,
    `inventor_name` varchar(50) DEFAULT NULL,
    `invention_country` int(11) DEFAULT NULL,
    PRIMARY KEY (`drink_id`),
    UNIQUE KEY (`drink_name`),
    FOREIGN KEY (`drink_flavor`) REFERENCES `flavors` (`flavor_id`),
    FOREIGN KEY (`invention_country`) REFERENCES `countries` (`country_id`)
) ENGINE=InnoDB;

CREATE TABLE `spirits` (
    `spirit_id` int(11) AUTO_INCREMENT NOT NULL, 
    `spirit_name` varchar(50) NOT NULL,
    `spirit_proof` int(3) DEFAULT NULL,
    `spirit_country` int(11) DEFAULT NULL,
    PRIMARY KEY (`spirit_id`),
    UNIQUE KEY (`spirit_name`),
    FOREIGN KEY (`spirit_country`) REFERENCES `countries` (`country_id`)
) ENGINE=InnoDB;


CREATE TABLE `mixers` (
    `mixer_id` int(11) AUTO_INCREMENT NOT NULL, 
    `mixer_name` varchar(50) NOT NULL,
    PRIMARY KEY (`mixer_id`), 
    UNIQUE KEY (`mixer_name`)
) ENGINE=InnoDB;

CREATE TABLE `spirit_ingredients` (
    `spirit_drink_id` int(11) NOT NULL,
    `spirit_ingredient` int(11) NOT NULL,
    `spirit_quantity` varchar(11) DEFAULT NULL,
    `spirit_measure` varchar(11) DEFAULT NULL,
    PRIMARY KEY (`spirit_drink_id`, `spirit_ingredient`),
    FOREIGN KEY (`spirit_drink_id`) REFERENCES `drinks` (`drink_id`) ON DELETE CASCADE,
    FOREIGN KEY (`spirit_ingredient`) REFERENCES `spirits` (`spirit_id`)
) ENGINE=InnoDB;

CREATE TABLE `mixer_ingredients` (
    `mixer_drink_id` int(11) NOT NULL,
    `mixer_ingredient` int(11) NOT NULL,
    `mixer_quantity` varchar(11) DEFAULT NULL,
    `mixer_measure` varchar(11) DEFAULT NULL,
    PRIMARY KEY (`mixer_drink_id`, `mixer_ingredient`),
    FOREIGN KEY (`mixer_drink_id`) REFERENCES `drinks` (`drink_id`) ON DELETE CASCADE,
    FOREIGN KEY (`mixer_ingredient`) REFERENCES `mixers` (`mixer_id`)
) ENGINE=InnoDB;

CREATE TABLE `flavors` (
    `flavor_id` int(11) AUTO_INCREMENT NOT NULL, 
    `flavor_name` varchar(50) NOT NULL,
    PRIMARY KEY (`flavor_id`), 
    UNIQUE KEY (`flavor_name`)
) ENGINE=InnoDB;


CREATE TABLE `countries` (
    `country_id` int(11) AUTO_INCREMENT NOT NULL,
    `country_name` varchar(50) NOT NULL,
    PRIMARY KEY (`country_id`), 
    UNIQUE KEY (`country_name`) 
) ENGINE=InnoDB;



INSERT INTO flavors (flavor_name) VALUES
('sweet'), ('sour'), ('fruity'), ('spicy'), ('herbal'),
('savory'), ('creamy'), ('nutty'), ('minty'), ('earthy');


INSERT INTO mixers (mixer_name) VALUES 
('soda'), ('orange juice'), ('cola'), ('lemon-lime soda'), 
('club soda'), ('tonic water'), ('ginger beer'), ('Perrier'),
('ginger ale'), ('bitter lemon'), ('lemon juice'), ('lemon twist'),
('cream'), ('tomato juice'), ('pineapple juice'), ('ice'), 
('regret'), ('celery salt'), ('pepper'),
('lime juice'), ('honey'), ('simple syrup'), ('grape soda'),
('grenadine'), ('coffee'), ('sugar'), ('mint leaves'), 
('fruit juice'), ('worchestershire sauce'), ('hot sauce'),
('sugar cube'), ('margarita salt'), ('liquid cane sugar');


INSERT INTO countries (country_name) VALUES
('Afghanistan'),
('Albania'),
('Algeria'),
('Andorra'),
('Angola'),
('Antigua and Barbuda'),
('Argentina'),
('Armenia'),
('Australia'),
('Austria'),
('Azerbaijan'),
('Bahamas, The'),
('Bahrain'),
('Bangladesh'),
('Barbados'),
('Belarus'),
('Belgium'),
('Belize'),
('Benin'),
('Bhutan'),
('Bolivia'),
('Bosnia and Herzegovina'),
('Botswana'),
('Brazil'),
('Brunei'),
('Bulgaria'),
('Burkina Faso'),
('Burma'),
('Burundi'),
('Cambodia'),
('Cameroon'),
('Canada'),
('Cape Verde'),
('Central African Republic'),
('Chad'),
('Chile'),
('China'),
('Colombia'),
('Comoros'),
('Congo, Democratic Republic of the'),
('Congo, Republic of the'),
('Costa Rica'),
('Crete'),
('Croatia'),
('Cuba'),
('Curacao'),
('Cyprus'),
('Czech Republic'),
('Denmark'),
('Djibouti'),
('Dominican Republic'),
('East Timor'),
('Ecuador'),
('Egypt'),
('El Salvador'),
('Equatorial Guinea'),
('Eritrea'),
('Estonia'),
('Ethiopia'),
('Fiji'),
('Finland'),
('France'),
('Gabon'),
('Gambia, The'),
('Georgia'),
('Germany'),
('Ghana'),
('Greece'),
('Grenada'),
('Guadeloupe'),
('Guatemala'),
('Guinea'),
('Guinea-Bissau'),
('Guyana'),
('Haiti'),
('Holy See'),
('Honduras'),
('Hong Kong'),
('Hungary'),
('Iceland'),
('India'),
('Indonesia'),
('Iran'),
('Iraq'),
('Ireland'),
('Israel'),
('Italy'),
('Ivory Coast'),
('Jamaica'),
('Japan'),
('Jordan'),
('Kazakhstan'),
('Kenya'),
('Kiribati'),
('Korea, North'),
('Korea, South'),
('Kosovo'),
('Kuwait'),
('Kyrgyzstan'),
('Laos'),
('Latvia'),
('Lebanon'),
('Lesotho'),
('Liberia'),
('Libya'),
('Liechtenstein'),
('Lithuania'),
('Luxembourg'),
('Macau'),
('Macedonia'),
('Madagascar'),
('Malawi'),
('Malaysia'),
('Maldives'),
('Mali'),
('Malta'),
('Marshall Islands'),
('Mauritania'),
('Mauritius'),
('Mexico'),
('Micronesia'),
('Moldova'),
('Monaco'),
('Mongolia'),
('Montenegro'),
('Morocco'),
('Mozambique'),
('Namibia'),
('Nauru'),
('Nepal'),
('Netherlands'),
('New Zealand'),
('Nicaragua'),
('Niger'),
('Nigeria'),
('North Korea'),
('Norway'),
('Oman'),
('Pakistan'),
('Palau'),
('Palestinian Territories'),
('Panama'),
('Papua New Guinea'),
('Paraguay'),
('Peru'),
('Philippines'),
('Poland'),
('Portugal'),
('Qatar'),
('Romania'),
('Russia'),
('Rwanda'),
('Saint Kitts and Nevis'),
('Saint Lucia'),
('Saint Vincent and the Grenadines'),
('Samoa'),
('San Marino'),
('Sao Tome and Principe'),
('Saudi Arabia'),
('Scotland'),
('Senegal'),
('Serbia'),
('Seychelles'),
('Sierra Leone'),
('Singapore'),
('Sint Maarten'),
('Slovakia'),
('Slovenia'),
('Solomon Islands'),
('Somalia'),
('South Africa'),
('South Korea'),
('South Sudan'),
('Spain'),
('Sri Lanka'),
('Sudan'),
('Suriname'),
('Swaziland'),
('Sweden'),
('Switzerland'),
('Syria'),
('Taiwan'),
('Tajikistan'),
('Tanzania'),
('Thailand'),
('Tibet'),
('Timor-Leste'),
('Togo'),
('Tonga'),
('Trinidad and Tobago'),
('Tunisia'),
('Turkey'),
('Turkmenistan'),
('Tuvalu'),
('Uganda'),
('Ukraine'),
('United Arab Emirates'),
('United Kingdom'),
('United States'),
('Uruguay'),
('Uzbekistan'),
('Vanuatu'),
('Venezuela'),
('Vietnam'),
('Yemen'),
('Zambia'),
('Zimbabwe');



INSERT INTO drinks (drink_name, drink_flavor, inventor_name, 
invention_country, drink_directions) VALUES 
('French Mojito', (SELECT flavor_id FROM flavors WHERE
flavor_name = 'minty'), 'Richard Shipley', 
(SELECT country_id FROM countries WHERE country_name = 'France'), 
'Muddle together the cane syrup, fresh-squeezed lime juice with pulp, mint leaves, and Perrier. Add the white rum and mix with a spoon. Add an ice cube and wait three minutes.'), 

('Margarita', (SELECT flavor_id FROM flavors WHERE
flavor_name = 'sour'), 'Carlos "Danny" Herrera', 
(SELECT country_id FROM countries WHERE country_name = 'Mexico'), 
'In a shaker, add ice, triple sec, lime juice, and tequila. Shake well and strain into a salt rimmed margarita glass.'), 

('Death in the Afternoon', (SELECT flavor_id FROM flavors WHERE
flavor_name = 'herbal'), 'Ernest Hemingway', 
(SELECT country_id FROM countries WHERE country_name = 'United States'), 
"Hemingway's original instructions, 1935: Pour one jigger absinthe into a Champagne glass. Add iced Champagne until it attains the proper opalescent milkiness. Drink three to five of these slowly."), 

('White Russian', (SELECT flavor_id FROM flavors WHERE
flavor_name = 'creamy'), 'The Dude', 
(SELECT country_id FROM countries WHERE country_name = 'United States'),  
"In a highball glass with ice, pour in the vodka and coffee liqueur. Then, add the cream. Stir if desired. I don't, but, you know, that’s just, like, my opinion, man."),

('Black Cuban', (SELECT flavor_id FROM flavors WHERE
flavor_name = 'creamy'), 'Nathan Early', 
(SELECT country_id FROM countries WHERE country_name = 'United States'),  
'In a highball glass with ice, pour in the rum and coffee liqueur. Then, add the cream. Stir if desired.'), 

('Irish Car Bomb', (SELECT flavor_id FROM flavors WHERE
flavor_name = 'earthy'), NULL, 
(SELECT country_id FROM countries WHERE country_name = 'United States'),  
'Fill a pint glass half-way with stout beer. In a shot glass, combine whiskey and Irish cream liqueur. Drop the shot into the beer and attempt to drink the concoction as quickly as possible. Reflect on how horrible of a decision you have just made.'),

('Bloody Mary', (SELECT flavor_id FROM flavors WHERE
flavor_name = 'spicy'), 'Fernand Petiot', 
(SELECT country_id FROM countries WHERE country_name = 'United States'),  
'In a pint glass rimmed with celery salt, combine vodka, tomato juice, lemon juice, worcestershire sauce, and hot sauce. Salt and pepper to taste. Add ice and garnish with celery or other vegetables your mother begged you to eat as a child and now you only consume with ample amounts of alcohol.'),

('Damn the Weather', (SELECT flavor_id FROM flavors WHERE
flavor_name = 'sweet'), 'Harry Craddock', 
(SELECT country_id FROM countries WHERE country_name = 'United States'),  
'In a shaker, combine gin, vermouth, orange juice and triple sec. Add ice, shake well, and strain into a chilled cocktail glass.'),

('Cuba Libre', (SELECT flavor_id FROM flavors WHERE
flavor_name = 'sweet'), NULL, 
(SELECT country_id FROM countries WHERE country_name = 'Cuba'),  
'In a tall glass, pour cola halfway to the top. Add rum and then lime juice. Fill the remainder of the glass with ice. En un vaso alto, vierte la cola hasta la mitad de la parte superior. Agregue ron y luego jugo de lima. Llene el resto del vaso con hielo.'),

('Chu-Hai', (SELECT flavor_id FROM flavors WHERE
flavor_name = 'fruity'), NULL, 
(SELECT country_id FROM countries WHERE country_name = 'Japan'), 
'In a tall glass with ice, mix shochu and fruit juice. Fill the remainder of the glass with club soda and garnish with the lemon twist or fruit of your choice.');


INSERT INTO spirits (spirit_name, spirit_proof, 
    spirit_country) VALUES 
('vodka', 80, (SELECT country_id FROM countries WHERE
country_name = 'Russia')), 
('rum', 100, (SELECT country_id FROM countries WHERE
country_name = 'Barbados')),
('scotch whisky', 120, (SELECT country_id FROM countries WHERE
country_name = 'Scotland')), 
('tequila', 76, (SELECT country_id FROM countries WHERE
country_name = 'Mexico')), 
('absinthe', 120, (SELECT country_id FROM countries WHERE
country_name = 'Switzerland')), 
('limoncello', 56, (SELECT country_id FROM countries WHERE
country_name = 'Italy')), 
('shochu', 50, (SELECT country_id FROM countries WHERE
country_name = 'Japan')), 
('champagne', 24, (SELECT country_id FROM countries WHERE
country_name = 'France')),
('coffee liqueur', 40, (SELECT country_id FROM countries WHERE
country_name = 'Mexico')), 
('rhum blanc agricole', 100, (SELECT country_id FROM countries WHERE
country_name = 'Martinique')),
('dark rum', 100, (SELECT country_id FROM countries WHERE
country_name = 'Jamaica')), 
('whiskey', 120, (SELECT country_id FROM countries WHERE
country_name = 'Ireland')), 
('Irish cream', 35, (SELECT country_id FROM countries WHERE
country_name = 'Ireland')),
('stout', 15, (SELECT country_id FROM countries WHERE
country_name = 'Ireland')), 
('sweet vermouth', 34, (SELECT country_id FROM countries WHERE
country_name = 'Italy')), 
('gin', 80, (SELECT country_id FROM countries WHERE
country_name = 'Netherlands')), 
('triple sec', 50, (SELECT country_id FROM countries WHERE
country_name = 'France'));



INSERT INTO spirit_ingredients (spirit_drink_id, 
spirit_ingredient, spirit_quantity, spirit_measure) VALUES
((SELECT drink_id FROM drinks WHERE drink_name = 'French Mojito'), 
(SELECT spirit_id FROM spirits WHERE spirit_name = 'rhum blanc agricole'), 
1, 'shot'); 

INSERT INTO mixer_ingredients (mixer_drink_id, 
mixer_ingredient, mixer_quantity, mixer_measure) VALUES 
((SELECT drink_id FROM drinks WHERE drink_name = 'French Mojito'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'liquid cane sugar'), 
1, 'shot'),

((SELECT drink_id FROM drinks WHERE drink_name = 'French Mojito'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'lime juice'), 
1, 'shot'),

((SELECT drink_id FROM drinks WHERE drink_name = 'French Mojito'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'mint leaves'), 
7, NULL), 

((SELECT drink_id FROM drinks WHERE drink_name = 'French Mojito'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'Perrier'), 
1, 'shot');  




INSERT INTO spirit_ingredients (spirit_drink_id, 
spirit_ingredient, spirit_quantity, spirit_measure) VALUES
((SELECT drink_id FROM drinks WHERE drink_name = 'Death in the afternoon'), 
(SELECT spirit_id FROM spirits WHERE spirit_name = 'absinthe'), 
1, 'jigger'),

((SELECT drink_id FROM drinks WHERE drink_name = 'Death in the afternoon'), 
(SELECT spirit_id FROM spirits WHERE spirit_name = 'champagne'), 
NULL, NULL);  




INSERT INTO spirit_ingredients (spirit_drink_id, 
spirit_ingredient, spirit_quantity, spirit_measure) VALUES
((SELECT drink_id FROM drinks WHERE drink_name = 'White Russian'), 
(SELECT spirit_id FROM spirits WHERE spirit_name = 'vodka'), 
2.5, 'oz'), 

((SELECT drink_id FROM drinks WHERE drink_name = 'White Russian'), 
(SELECT spirit_id FROM spirits WHERE spirit_name = 'coffee liqueur'), 
1, 'oz'); 

INSERT INTO mixer_ingredients (mixer_drink_id, 
mixer_ingredient, mixer_quantity, mixer_measure) VALUES 
((SELECT drink_id FROM drinks WHERE drink_name = 'White Russian'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'cream'),
1.5, 'oz'),

((SELECT drink_id FROM drinks WHERE drink_name = 'White Russian'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'ice'), 
NULL, NULL);  




INSERT INTO spirit_ingredients (spirit_drink_id, 
spirit_ingredient, spirit_quantity, spirit_measure) VALUES
((SELECT drink_id FROM drinks WHERE drink_name = 'Margarita'), 
(SELECT spirit_id FROM spirits WHERE spirit_name = 'tequila'), 
3.5, 'oz'), 

((SELECT drink_id FROM drinks WHERE drink_name = 'Margarita'), 
(SELECT spirit_id FROM spirits WHERE spirit_name = 'triple sec'), 
2, 'oz'); 

INSERT INTO mixer_ingredients (mixer_drink_id, 
mixer_ingredient, mixer_quantity, mixer_measure) VALUES 
((SELECT drink_id FROM drinks WHERE drink_name = 'Margarita'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'lime juice'),
1.5, 'oz'),

((SELECT drink_id FROM drinks WHERE drink_name = 'Margarita'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'ice'), 
NULL, NULL), 

((SELECT drink_id FROM drinks WHERE drink_name = 'Margarita'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'margarita salt'), 
NULL, NULL); 




INSERT INTO spirit_ingredients (spirit_drink_id, 
spirit_ingredient, spirit_quantity, spirit_measure) VALUES
((SELECT drink_id FROM drinks WHERE drink_name = 'Chu-Hai'), 
(SELECT spirit_id FROM spirits WHERE spirit_name = 'shochu'), 
2, 'oz'); 

INSERT INTO mixer_ingredients (mixer_drink_id, 
mixer_ingredient, mixer_quantity, mixer_measure) VALUES 
((SELECT drink_id FROM drinks WHERE drink_name = 'Chu-Hai'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'fruit juice'),
2, 'oz'),

((SELECT drink_id FROM drinks WHERE drink_name = 'Chu-Hai'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'club soda'), 
6, 'oz'), 

((SELECT drink_id FROM drinks WHERE drink_name = 'Chu-Hai'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'lemon twist'), 
NULL, NULL); 




INSERT INTO spirit_ingredients (spirit_drink_id, 
spirit_ingredient, spirit_quantity, spirit_measure) VALUES
((SELECT drink_id FROM drinks WHERE drink_name = 'Black Cuban'), 
(SELECT spirit_id FROM spirits WHERE spirit_name = 'dark rum'), 
2.5, 'oz'), 

((SELECT drink_id FROM drinks WHERE drink_name = 'Black Cuban'), 
(SELECT spirit_id FROM spirits WHERE spirit_name = 'coffee liqueur'), 
1.5, 'oz'); 

INSERT INTO mixer_ingredients (mixer_drink_id, 
mixer_ingredient, mixer_quantity, mixer_measure) VALUES 
((SELECT drink_id FROM drinks WHERE drink_name = 'Black Cuban'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'cream'), 
1.5, 'oz'), 

((SELECT drink_id FROM drinks WHERE drink_name = 'Black Cuban'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'ice'), 
NULL, NULL); 




INSERT INTO spirit_ingredients (spirit_drink_id, 
spirit_ingredient, spirit_quantity, spirit_measure) VALUES
((SELECT drink_id FROM drinks WHERE drink_name = 'Irish Car Bomb'), 
(SELECT spirit_id FROM spirits WHERE spirit_name = 'whiskey'), 
.5, 'oz'), 

((SELECT drink_id FROM drinks WHERE drink_name = 'Irish Car Bomb'), 
(SELECT spirit_id FROM spirits WHERE spirit_name = 'Irish cream'), 
.5, 'oz'), 

((SELECT drink_id FROM drinks WHERE drink_name = 'Irish Car Bomb'), 
(SELECT spirit_id FROM spirits WHERE spirit_name = 'stout'), 
.5, 'pint'); 

INSERT INTO mixer_ingredients (mixer_drink_id, 
mixer_ingredient, mixer_quantity, mixer_measure) VALUES 
((SELECT drink_id FROM drinks WHERE drink_name = 'Irish Car Bomb'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'regret'), 
.5, 'pint'); 




INSERT INTO spirit_ingredients (spirit_drink_id, 
spirit_ingredient, spirit_quantity, spirit_measure) VALUES
((SELECT drink_id FROM drinks WHERE drink_name = 'Bloody Mary'), 
(SELECT spirit_id FROM spirits WHERE spirit_name = 'vodka'), 
1.5, 'oz'); 

INSERT INTO mixer_ingredients (mixer_drink_id, 
mixer_ingredient, mixer_quantity, mixer_measure) VALUES 
((SELECT drink_id FROM drinks WHERE drink_name = 'Bloody Mary'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'tomato juice'), 
3, 'oz'), 

((SELECT drink_id FROM drinks WHERE drink_name = 'Bloody Mary'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'lemon juice'), 
1, 'oz'), 

((SELECT drink_id FROM drinks WHERE drink_name = 'Bloody Mary'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'worchestershire sauce'), 
2, 'dashes'), 

((SELECT drink_id FROM drinks WHERE drink_name = 'Bloody Mary'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'hot sauce'), 
1, 'tsp'),

((SELECT drink_id FROM drinks WHERE drink_name = 'Bloody Mary'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'celery salt'), 
NULL, NULL), 

((SELECT drink_id FROM drinks WHERE drink_name = 'Bloody Mary'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'pepper'), 
NULL, NULL); 




INSERT INTO spirit_ingredients (spirit_drink_id, 
spirit_ingredient, spirit_quantity, spirit_measure) VALUES
((SELECT drink_id FROM drinks WHERE drink_name = 'Damn the Weather'), 
(SELECT spirit_id FROM spirits WHERE spirit_name = 'gin'), 
1.5, 'oz'),

((SELECT drink_id FROM drinks WHERE drink_name = 'Damn the Weather'), 
(SELECT spirit_id FROM spirits WHERE spirit_name = 'sweet vermouth'), 
1, 'oz'), 

((SELECT drink_id FROM drinks WHERE drink_name = 'Damn the Weather'), 
(SELECT spirit_id FROM spirits WHERE spirit_name = 'triple sec'), 
.5, 'oz'); 

INSERT INTO mixer_ingredients (mixer_drink_id, 
mixer_ingredient, mixer_quantity, mixer_measure) VALUES 
((SELECT drink_id FROM drinks WHERE drink_name = 'Bloody Mary'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'orange juice'), 
1, 'oz'); 





INSERT INTO spirit_ingredients (spirit_drink_id, 
spirit_ingredient, spirit_quantity, spirit_measure) VALUES
((SELECT drink_id FROM drinks WHERE drink_name = 'Cuba Libre'), 
(SELECT spirit_id FROM spirits WHERE spirit_name = 'rum'), 
2.5, 'oz'); 

INSERT INTO mixer_ingredients (mixer_drink_id, 
mixer_ingredient, mixer_quantity, mixer_measure) VALUES 
((SELECT drink_id FROM drinks WHERE drink_name = 'Cuba Libre'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'lime juice'), 
.5, 'oz'), 

((SELECT drink_id FROM drinks WHERE drink_name = 'Cuba Libre'), 
(SELECT mixer_id FROM mixers WHERE mixer_name = 'cola'), 
6, 'oz'); 