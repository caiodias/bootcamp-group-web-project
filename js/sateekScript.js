var $searchInput = $('.mainContainer .header input[type=text]');
var $searchButton = $('.mainContainer .header button');
var $container = $('.container');
var responseData;

var fetchData = function(callback) {
    $.ajax({
        type: "GET",
        url: "https://pixabay.com/api/",
        data: {
            key: '9176852-528521b115002c31dd0c1b967',
            q: $searchInput.val(),
            per_page: 40
        },
        dataType: "json",
        success: function (response) {
            responseData = response;
            callback();
        },
        error: function(request, errorType, errorMsg) {

        }
    });    
};

$searchButton.on('click', function() {
    $container.empty();    
    fetchData(function() {
        console.log(responseData);
        for (var i = 0; i < responseData.hits.length; i++) {
            const gridItem = '<div class="container_gridItem">'
                + '<div class="container_gridItem_userContainer">'
                + '</div><div class="imgContainer" style="background-image: url(\''+ responseData.hits[i].webformatURL
                + '\')"></div></div>';
            $container.append(gridItem);
        }
        
    });
});