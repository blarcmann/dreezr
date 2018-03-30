var request = require('request');
var apiOptions = {
    server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://dreezr.herokuapp.com";
}


module.exports.homelist = function (req, res) {
    renderHomepage(req, res);
};

// module.exports.homelist = function (req, res) {
//     var requestOptions, path;
//     path = '/api/locations';
//     requestOptions = {
//         url: apiOptions.server + path,
//         method: "GET",
//         json: {},
//         qs: {
//             lng: 7.912795,
//             lat: 5.037740,
//             maxDistance: 200000
//         }
//     };
//     request(
//         requestOptions,
//         function (err, response, body) {
//             var i, data;
//             data = body;
//             if (response.statusCode === 200 && data.length) {
//                 for (i = 0; i < data.length; i++) {
//                     data[i].distance = _formatDistance(data[i].distance);
//                 }
//             }
//             renderHomepage(req, res, data);
//         }
//     );
// };


module.exports.locationInfo = function (req, res) {
    getLocationInfo(req, res, function (req, res, responseData) {
        renderDetailPage(req, res, responseData);
    });
};


module.exports.addReview = function (req, res) {
    getLocationInfo(req, res, function (req, res, responseData) {
        renderReviewForm(req, res, responseData);
    });
};


module.exports.doAddReview = function (req, res) {
    var requestOptions, path, locationid, postdata;
    locationid = req.params.locationid;
    path = "/api/locations/" + locationid + '/reviews';
    postdata = {
        author: req.body.name,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.review
    };
    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: postdata
    };
    if (!postdata.author || !postdata.rating || !postdata.reviewText) {
        res.redirect('/location/' + locationid + '/reviews/new?err=val');
    } else {
        request(requestOptions, function (err, response, body) {
            if (response.statusCode === 201) {
                res.redirect('/location/' + locationid);
            } else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
                res.redirect('/location/' + locationid + '/reviews/new?err=val');
            } else {
                console.log(body);
                _showError(req, res, response.statusCode);
            }
        }
        );
    }
};


var getLocationInfo = function (req, res, callback) {
    var requestOptions, path;
    path = "/api/locations/" + req.params.locationid;
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(requestOptions, function (err, response, body) {
        var data = body;
        if (response.statusCode === 200) {
            data.coords = {
                lng: body.coords[0],
                lat: body.coords[1]
            };
            callback(req, res, data);
        } else {
            _showError(req, res, response.statusCode);
        }
    }
    );
};


var renderHomepage = function (req, res) {
    res.render('locations-list', {
        title: 'dreezr - Find a place to chao, work with wifi around ya!',
        pageHeader: {
            title: 'dreezr',
            strapline: 'Find places to chao, work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? dreezr helps you find places eat, work when out and about. Perhaps with coffee, cake or a pint ? Let dreezr  help you find the place you're looking for."
    })
}

// var renderHomepage = function (req, res, responseBody) {
//     var message;
//     if (!(responseBody instanceof Array)) {
//         message = "API lookup error";
//         responseBody = [];
//     } else {
//         if (!responseBody.length) {
//             message = "No places found nearby";
//         }
//     }
//     res.render('locations-list', {
//         title: 'dreezr - find a place to chao, work with wifi',
//         pageHeader: {
//             title: 'dreezr',
//             strapline: 'Find places to chao with wifi near you!'
//         },
//         sidebar: "Looking for wifi and a seat? dreezr helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let dreezr help you find the place you're looking for.",
//         locations: responseBody,
//         message: message
//     });
// };


var renderDetailPage = function (req, res, locDetail) {
    res.render('location-info', {
        title: locDetail.name,
        pageHeader: { title: locDetail.name },
        sidebar: {
            context: 'is on dreezr because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: locDetail
    });
};


var renderReviewForm = function (req, res, locDetail) {
    res.render('location-review-form', {
        title: 'Review ' + locDetail.name + ' on dreezr',
        pageHeader: { title: 'Review ' + locDetail.name },
        error: req.query.err,
        url: req.originalUrl
    });
};


// const _isNumeric = function (n) {
//     return !isNaN(parseFloat(n)) && isFinite(n);
// };


// var _formatDistance = function (distance) {
//     if (distance && _isNumeric(distance)) {
//         var thisDistance = 0, unit = 'm';
//         if (distance > 1000) {
//             thisDistance = parseFloat(distance / 1000).toFixed(1);
//             unit = 'km';
//         } else {
//             thisDistance = Math.floor(distance);
//         }
//         return thisDistance + unit;
//     } else {
//         return '?';
//     }
// };


var _showError = function (req, res, status) {
    var title, content;
    if (status === 404) {
        title = "404, page not found";
        content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else {
        title = status + ", something's gone wrong";
        content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status);
    res.render('generic-text', {
        title: title,
        content: content
    });
};