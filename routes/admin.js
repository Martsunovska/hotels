var express = require('express');
var router = express.Router();
var Hotel = require('../models/hotel');

/* GET users listing. */
router.get('/', function(req, res, next) {
    //вивести меню з усіма можливими функціями
    res.render('admin', {
        layout: 'admin/layout',
        title: 'Admin Panel'
    });
});

router.get('/hotels', function(req, res, next) {
    Hotel.find({}, function(err, hotels) {
        if (err) {
            console.error('Error: ' + err);
            res.render('admin/hotels-res', {
                title: 'Error І',
                message: err
            });
        } else {
            res.render('admin/hotels', {
                layout: 'admin/layout',
                title: 'Додати готель',
                hotels: hotels
            });
        }
    });
});


router.get('/hotels-add', function(req, res, next) {
    res.render('admin/hotels-add', { layout: 'admin/layout', title: 'Додати готель' });
});

router.post('/hotels-add', function(req, res) { //виводимо повідомлення про вдале чи невдале введення
    Hotel.remove({ Name: req.body.hotelName }, function(err) {
        if (err) {
            console.error(err);
            res.render('admin/hotels-res', { layout: 'admin/layout', title: 'Error!', message: err });
        } else {
            Hotel.create({
                Name: req.body.hotelName,
                Desc: req.body.hotelDescription,
                Image: req.body.ImageUrl
            }, function(err, c) {
                if (err) {
                    console.error('Error:' + err);
                    res.render('admin/hotels-res', { layout: 'admin/layout', title: 'Error!', message: err });
                } else
                    res.render('admin/hotels-res', { layout: 'admin/layout', title: 'Super!', message: 'Hotel added to DB succesfully' });
            });
        };
    });
});


// редагування готелів
router.get('/hotels-red/:id', function(req, res, next) {
    Hotel.findById(req.params.id, function(err, hotels) {
        if (err) {
            console.error(err);
            res.render('admin/hotels-red', { title: 'Error', message: err });
        } else {
            res.render('admin/hotels-red', {
                layout: 'admin/layout',
                title: 'Редагування готелю',
                hotels: hotels
            });
        }
    });

});

router.post('/hotels-red/:id', function(req, res) { //виводимо повідомлення про вдале чи невдале введення
    Hotel.remove({ _id: req.params.id }, function(err) {
        if (err) {
            console.error(err);
            res.render('admin/hotels-res', { layout: 'admin/layout', title: 'Error!', message: err });
        } else {
            Hotel.create({
                Name: req.body.hotelName,
                Desc: req.body.hotelDescription,
                Image: req.body.ImageUrl
            }, function(err, Hotel) {
                if (err) {
                    console.error('Error:' + err);
                    res.render('admin/hotels-res', { layout: 'admin/layout', title: 'Error!', message: err });
                } else
                    res.render('admin/hotels-res', { layout: 'admin/layout', title: 'Super!', message: 'Готель відредаговано!' });
            });
        };
    });
});

// видалення готелів
router.get('/hotels-del/:id', function(req, res, next) {
    Hotel.findById({ _id: req.params.id }, function(err, hotels) {
        if (err) {
            console.error(err);
            res.render('admin/hotels-res', { title: 'Error', message: err });
        } else {
            res.render('admin/hotels-del', {
                layout: 'admin/layout',
                title: 'Видалення готелю',
                hotels: hotels
            });
        }
    });
});
router.post('/hotels-del/:id', function(req, res) { //Результат Видалення країни
    Hotels.remove({ _id: req.params.id }, function(err) {
        if (err) {
            console.error(err);
            res.render('admin/hotels-res', { title: 'Error', message: err });
        } else {
            res.render('admin/hotels-res', {
                title: 'Super: ',
                message: 'Hotel remove from DB succesfully'
            });
        };

    });
});


module.exports = router;