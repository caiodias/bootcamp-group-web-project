var $searchInput = $('.mainContainer .header input[type=text]');
var $searchButton = $('.mainContainer .header button');
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
        }
    });    
};

$searchButton.on('click', function() {
    
    fetchData(function() {
        console.log(responseData);
    });
});