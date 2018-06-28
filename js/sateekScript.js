var $searchInput = $('.mainContainer .header input[type=text]');
var $searchButton = $('.mainContainer .header button');
var $container = $('.container');
var responseData;
var pageNumber = 1;
var searchQuery = "";

$(document).ready(function () {
    var fetchData = function (isNewSearch, callback) {
        if (isNewSearch) {
            searchQuery = $searchInput.val();
        }
        $.ajax({
            type: "GET",
            url: "https://pixabay.com/api/",
            data: {
                key: '9176852-528521b115002c31dd0c1b967',
                q: searchQuery,
                page: pageNumber,
                per_page: 40
            },
            dataType: "json",
            success: function (response) {
                if (isNewSearch) {
                    responseData = response;
                } else {
                    responseData.hits.push.apply(responseData.hits, response.hits);
                }

                callback();
            },
            error: function (request, errorType, errorMsg) {

            }
        });
    };

    var $gridItem;
    var $expandImageButton;
    var $imageModal = $('.expandedImageModal');
    var $imageModalImg = $('.expandedImageModal').children('img');
    var $imageModalCloseButton = $('.expandedImageModal').children('.close');
    var $imageModalLoader = $('.expandedImageModal').children('.expandedImageModalImageLoader');
    var gridItemOnClick = function () {
        window.open(responseData.hits[$(this).data('pos')].pageURL, '_blank');
    };


    var expandImageOnClick = function () {
        $imageModalImg.one('load', function () {
            $(this).show();
            $imageModalLoader.hide();
        }).attr('src', responseData.hits[$(this).parent().parent().data('pos')].largeImageURL);
        $imageModal.css('display', 'flex');
        $imageModalLoader.show();
        event.stopPropagation();
    };

    $imageModalCloseButton.on('click', function () {
        $imageModal.hide();
        $imageModalImg.hide();
    });

    $imageModal.on('click', function () {
        $imageModal.hide();
        $imageModalImg.hide();
    });

    $imageModalImg.on('click', function () {
        event.stopPropagation();
    });


    function renderFetchedData(startIndex) {
        console.log(responseData);
        for (var i = startIndex; i < responseData.hits.length; i++) {
            const $containerGridItem = $('<div>', {
                class: 'container_gridItem'
            });
            const $containerGridItemUserContainer = $('<div>', {
                class: 'container_gridItem_userContainer'
            });
            const $imgContainer = $('<div>', {
                class: 'imgContainer'
            });
            const $containerGridItemFooter = $('<div>', {
                class: 'container_gridItem_footer'
            });

            $containerGridItem.attr('data-pos', i);
            $containerGridItemUserContainer.appendTo($containerGridItem);
            $imgContainer.appendTo($containerGridItem);
            $containerGridItemFooter.appendTo($containerGridItem);

            // User container
            $containerGridItemUserContainer.append(
                '<table>' +
                '<tr>' +
                '<td class="userImg" style="background-image: url(\'' + responseData.hits[i].userImageURL + '\')"></td>' +
                '<td class="userName">' + responseData.hits[i].user + '</td>' +
                '</tr>' +
                '</table>'
            );

            // Image container
            $imgContainer.append('<div class="itemImageLoader"></div>');
            $('<img/>').attr('src', responseData.hits[i].webformatURL).on('load', function () {
                $(this).remove(); // prevent memory leaks as @benweet suggested
                $imgContainer.children('.itemImageLoader').hide();
                $imgContainer.css('background-image', 'url(\'' + $(this).attr('src') + '\')');
            });

            $imgContainer.append('<div class="imgContainerExpandImgButton"></div>');

            //Footer container
            $containerGridItemFooter.append(
                '<table>' +
                '<tr>' +
                '<td>' +
                '<div class="likes">' +
                '<div class="likeImgContainer"></div>' +
                '<span>' + responseData.hits[i].likes + '</span>' +
                '</div>' +
                '</td>' +
                '<td>' +
                '<div class="downloads">' +
                '<div class="downloadImgContainer"></div>' +
                '<span>' + responseData.hits[i].downloads + '</span>' +
                '</div>' +
                '</td>' +
                '</tr>' +
                '</table>'
            );

            $container.append($containerGridItem);
        }
        $gridItem = $('.container_gridItem');
        $gridItem.on('click', gridItemOnClick);
        $expandImageButton = $('.imgContainerExpandImgButton');
        $expandImageButton.on('click', expandImageOnClick);
    }
    $searchButton.on('click', function () {
        $container.empty();
        pageNumber = 1;
        fetchData(true, function () {
            renderFetchedData(0);
        });
    });

    $searchInput.on('keypress', function () {
        if (event.which == 13) {
            $container.empty();
            pageNumber = 1;
            fetchData(true, function () {
                renderFetchedData(0);
            });
            return false;
        }
    });

    // $('.container_gridItem').on('click', function() {
    //     alert(responseData.hits[$(this).data('pos')].largeImageURL);
    // });
    
    var didLoadNextPage = false;
    $(window).scroll(function () {
        // console.log()
        // console.log($(window).scrollTop() + $(window).height());
        // console.log($(document).height());
        
        
        if (($(window).scrollTop() + $(window).height()) >= $(document).height() - 3 && ($(window).scrollTop() + $(window).height()) <= $(document).height() + 3) {
        
            if (!didLoadNextPage) {
                pageNumber = pageNumber + 1;
                fetchData(false, function () {
                    console.log('Next page loaded');
                    var index = responseData.hits.length - 40;
                    renderFetchedData(index);
                });
                didLoadNextPage = true;
            }
            
        }
        
        setTimeout(function() {
            didLoadNextPage = false;
        }, 2000);
    });

});

