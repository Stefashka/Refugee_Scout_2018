$('#story-search').on('input', function() {
  var search = $(this).serialize();
  if(search === "search=") {
    search = "all"
  }
  $.get('/stories?' + search, function(data) {
    $('#story-grid').html('');
    data.forEach(function(story) {
      $('#story-grid').append(`
        <div class="col-md-3 col-sm-6">
          <div class="thumbnail">
            <img src="${ story.image }">
            <div class="caption">
              <h4>${ story.name }</h4>
            </div>
            <p>
              <a href="/stories/${ story._id }" class="btn btn-primary">More Info</a>
            </p>
          </div>
        </div>
      `);
    });
  });
});

$('#story-search').submit(function(event) {
  event.preventDefault();
});