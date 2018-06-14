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

var $gridItem;
var $expandImageButton;
var $imageModal = $('.expandedImageModal');
var $imageModalImg = $('.expandedImageModal').children('img');
var $imageModalCloseButton = $('.expandedImageModal').children('.close');
var gridItemOnClick = function() {
    window.open(responseData.hits[$(this).data('pos')].pageURL, '_blank');
};


var expandImageOnClick = function() {
    $imageModalImg.one('load', function() {
        $(this).show();
    }).attr('src', responseData.hits[$(this).parent().parent().data('pos')].largeImageURL);
    $imageModal.css('display', 'flex');
    event.stopPropagation();
};

$imageModalCloseButton.on('click', function() {
    $imageModal.hide();
    $imageModalImg.hide();
});

$imageModal.on('click', function() {
    $imageModal.hide();
    $imageModalImg.hide();
});

$imageModalImg.on('click', function() {
    event.stopPropagation();
});


function renderFetchedData() {
    console.log(responseData);
        for (var i = 0; i < responseData.hits.length; i++) {
            const gridItem = '<div class="container_gridItem" data-pos="' + i +'">'
                + '<div class="container_gridItem_userContainer">'
                +'<table>'
                +    '<tr>'
                +        '<td class="userImg" style="background-image: url(\''+ responseData.hits[i].userImageURL +'\')"></td>'
                +        '<td class="userName">' + responseData.hits[i].user + '</td>'
                +    '</tr>'
                + '</table>'
                +'</div><div class="imgContainer" style="background-image: url(\''+ responseData.hits[i].webformatURL
                + '\')">'
                +'<div class="imgContainerExpandImgButton">'       
                +'</div>'
                +    '</div><div class="container_gridItem_footer">'
                +'<table>'
                +    '<tr>'
                +        '<td>'
                +            '<div class="likes">'
                +                '<div class="likeImgContainer"></div>'
                +                '<span>' + responseData.hits[i].likes + '</span>'
                +            '</div>'
                +        '</td>'
                +        '<td>'
                +            '<div class="downloads">'
                +                '<div class="downloadImgContainer"></div>'
                +                '<span>'+ responseData.hits[i].downloads + '</span>'
                +            '</div>'
                +        '</td>'
                +    '</tr>'
                +'</table>'
                +'</div>'
                +'</div>';
            $container.append(gridItem);
        }
        $gridItem = $('.container_gridItem');
        $gridItem.on('click', gridItemOnClick);
        $expandImageButton = $('.imgContainerExpandImgButton');
        $expandImageButton.on('click', expandImageOnClick);
}
$searchButton.on('click', function() {
    $container.empty();    
    fetchData(function() {
        renderFetchedData();
    });
});

$searchInput.on('keypress', function() {
    if (event.which == 13) {
        $container.empty();
        fetchData(function() {
            renderFetchedData();
        });
        return false;
    }
});

// $('.container_gridItem').on('click', function() {
//     alert(responseData.hits[$(this).data('pos')].largeImageURL);
// });


// $(window).scroll(function() {
//     if($(window).scrollTop() + $(window).height() == $(document).height()) {
//         console.log($(window).scrollTop() + $(window).height());
//         console.log($(document).height());
//         alert("bottom!");
//     }
//  });
