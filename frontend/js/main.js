var yt = new YouTube();
yt.initYouTube("youtube-ninja");

var lf = new LastFm();

/*$('#artist').typeahead({

    source: function (query, process) {
        return $.getJSON(
            'path/to/lookup',
            { query: query },
            function (data) {
                return process(data);
            });
    }

});*/

$("#listen").submit(function(e) {
	e.preventDefault();
	yt.playSearched($("#artist").val() + " " + $("#track").val());
});