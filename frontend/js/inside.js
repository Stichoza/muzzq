var yt = new YouTube();
yt.initYouTube("youtube-ninja");

/**
 * TT artist
 */
$('#artist').typeahead({
	name: 'artists',
	remote: {
		cache: true,
		url: LastFm.api.url
			+ "?method=artist.search&format=json&api_key="
			+ LastFm.api.key
			+ "&artist=%QUERY&limit=5",
		filter: function(parsedResponse) {
			var result = [];
			$.each(parsedResponse.results.artistmatches.artist, function(i, val) {
				result.push({
					name: val["name"],
					listeners: val["listeners"],
					mbid: val["mbid"],
					thumb: (!!val["image"] && val["image"][1]["#text"] != "")
						? val["image"][1]["#text"]
						: "//placehold.it/42x42",
					image: (!!val["image"] && val["image"][3]["#text"] != "")
						? val["image"][3]["#text"]
						: "none"
				});
			});
			return result;
		}
	},
	template: [
		'<div class="pull-left clearfix thumbnail tt-artist-img" ',
		'style="background-image:url({{thumb}})"></div>',
		'<span class="tt-artist-name">{{name}}</span>'
	].join(''),
	valueKey: 'name',
	engine: Hogan
});

/**
 * TT events
 */
$('#artist').on('typeahead:selected', function (object, datum) {
	console.log(datum);
	if (datum.image != "none") {
		$(this).addClass("tt-selected").css({
			'background-image': 'url(' + datum.image + ')'
		});
	}
	$("#track").focus();
}).on('click focus mousedown', function () {
	$(this).removeClass("tt-selected").css({
		'background-image': 'none'
	});
});
/**
 * TT tracks
 */
$('#track').typeahead({
	name: 'tracks',
	remote: {
		cache: true,
		url: LastFm.api.url
			+ "?method=track.search&format=json&api_key="
			+ LastFm.api.key
			+ "&track=%QUERY&artist=%ARTIST&limit=5"
			+ $("#artist").val(),
		filter: function(parsedResponse) {
			var result = [];
			$.each(parsedResponse.results.trackmatches.track, function(i, val) {
				result.push({
					name: val["name"],
					artist: val["artist"],
					mbid: val["mbid"],
					listeners: val["listeners"],
					thumb: (!!val["image"] && val["image"][1]["#text"] != "")
						? val["image"][1]["#text"]
						: "//placehold.it/42x42",
					image: (!!val["image"] && val["image"][3]["#text"] != "")
						? val["image"][3]["#text"]
						: "none"
				});
			});
			return result;
		},
		replace: function (url, uriEncodedQuery) {
			url = url.replace("%ARTIST", $("#artist").val());
			return url.replace("%QUERY", uriEncodedQuery);
		}
	},
	template: [
		'<div class="pull-left clearfix thumbnail tt-track-img" ',
		'style="background-image:url({{thumb}})"></div>',
		'<span class="tt-track-name">{{name}}</span>',
		'<span class="tt-track-by-name">by <b>{{artist}}</b></span>'
	].join(''),
	valueKey: 'name',
	engine: Hogan
});

/**
 * TT events
 */
$('#track').on('typeahead:selected', function (object, datum) {
	console.log(datum);
	if (datum.image != "none") {
		$(this).addClass("tt-selected").css({
			'background-image': 'url(' + datum.image + ')'
		});
	}
	$("#listen button").focus();
}).on('click focus mousedown', function () {
	$(this).removeClass("tt-selected").css({
		'background-image': 'none'
	});
});



$("#listen").submit(function(e) {
	e.preventDefault();
	yt.playSearched($("#artist").val() + " " + $("#track").val());
});