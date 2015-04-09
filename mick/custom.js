var markers = {
    	locations: [],
    	guides: [],
    	users: []
    },
    map;

function initialize() {
		var mapOptions = {
    		zoom: 13,
    		center: new google.maps.LatLng(51.921019, 4.479429)
  		};
		
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		setMarkersLocation(map, geolocation);
		setMarkersGuides(map, geoguides);
		setMarkersUsers(map, geousers);
		// icon map property op 0 -> markers
}

// Tours
var geolocation = [
	['Maritiem Museum', 51.917387, 4.482665],
  	['Blijdorp', 51.929039, 4.464971],
  	['Euromast', 51.905444, 4.466637],
  	['Erasmusbrug', 51.909227, 4.486276],
];

// Guides
var geoguides = [
	['Rotterdam Centraal', 51.925093, 4.469424],
  	['Witte de With', 51.915444, 4.477043],
];

// Users
var geousers = [
	['Coolsingel', 51.922406, 4.478420],
  	['Kruisplein', 51.922026, 4.471068],
  	['Markthal', 51.920065, 4.486416],
];

function setMarkersLocation(map, locations) {
	var iconlocation = {
		url: '../img/icon_location.png',
		size: new google.maps.Size(32, 32),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(0, 32)
	};
	
	// Shapes define the clickable region of the icon.
	// The type defines an HTML &lt;area&gt; element 'poly' which
	// traces out a polygon as a series of X,Y points. The final
	// coordinate closes the poly by connecting to the first
	// coordinate.
	var shape = {
		coords: [1, 1, 1, 20, 18, 20, 18 , 1],
		type: 'poly'
	};

	// Locations
	for (var i = 0; i < geolocation.length; i++) {
		var location = geolocation[i];
		
		var myLatLng = new google.maps.LatLng(location[1], location[2]);
		var marker = new google.maps.Marker({
		    position: myLatLng,
		    map: map,
		    icon: iconlocation
		});
		markers.locations.push(marker);
		//marker.setMap(null);
		//marker.setVisible(false); 
	}
}



function setMarkersGuides(map, locations) {
	var iconguides = {
		url: '../img/icon_guide.png',
		size: new google.maps.Size(32, 32),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(0, 32)
	};
	
	// Shapes define the clickable region of the icon.
	// The type defines an HTML &lt;area&gt; element 'poly' which
	// traces out a polygon as a series of X,Y points. The final
	// coordinate closes the poly by connecting to the first
	// coordinate.
	var shape = {
		coords: [1, 1, 1, 20, 18, 20, 18 , 1],
		type: 'poly'
	};

	// Guides
	for (var i = 0; i < geoguides.length; i++) {
		var location = geoguides[i];
		var myLatLng = new google.maps.LatLng(location[1], location[2]);
		var marker = new google.maps.Marker({
		    position: myLatLng,
		    map: map,
		    icon: iconguides
		});
		markers.guides.push(marker);
		//marker.setMap(null);
	}
}

function setMarkersUsers(map, locations) {
	var iconusers = {
		url: '../img/icon_user.png',
		size: new google.maps.Size(32, 32),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(0, 32)
	};
	
	// Shapes define the clickable region of the icon.
	// The type defines an HTML &lt;area&gt; element 'poly' which
	// traces out a polygon as a series of X,Y points. The final
	// coordinate closes the poly by connecting to the first
	// coordinate.
	var shape = {
		coords: [1, 1, 1, 20, 18, 20, 18 , 1],
		type: 'poly'
	};

	// Users
	for (var i = 0; i < geousers.length; i++) {
		var location = geousers[i];
		var myLatLng = new google.maps.LatLng(location[1], location[2]);
		var marker = new google.maps.Marker({
		    position: myLatLng,
		    map: map,
		    icon: iconusers
		});
		markers.users.push(marker);
		//marker.setMap(null);
		//marker.setVisible(false); 
	}
}

function hide(type) {
	_.each(markers, function (objects, markerType) {
		if (type === undefined || markerType === type) {
			_.each(objects, function (marker) {
				marker.setMap(null);
			});
		}
	});
}

function show(type) {
	_.each(markers, function (objects, markerType) {
		if (type === undefined || markerType === type) {
			_.each(objects, function (marker) {
				marker.setMap(map);
			});
		}
	});
}

google.maps.event.addDomListener(window, 'load', initialize);


$("#locationToggle").click(function() {
    $(this).find('img').toggle();
});