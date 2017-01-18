angular.module('controllers', [])

    .controller('WelcomeCtrl', ['$route', function ($route) {
        this.h1 = 'Survival guide';
    }])

    .controller('ListCtrl', ['$route', 'bookFactory', function ($route, bookFactory) {
        this.h1 = 'List of books - the master view';
        this.books = bookFactory.books;
    }])

    .controller('DetailCtrl', ['$route', 'bookFactory', 'singleBookFilter', '$location', function ($route, bookFactory, singleBookFilter, $location) {
        this.h1 = 'Book detail';
        this.book = singleBookFilter(bookFactory.books, $route.current.pathParams['id']);
        this.routeInfo = $route.current;
        this.locationAbsUrl = $location.absUrl();
        this.locationHash = $location.hash();
        this.locationPath = $location.path();
        this.locationUrl = $location.url();
        this.locationSearch = $location.search();
    }])

    .controller('PipeCtrl', ['findKeyFilter', '$filter', function (findKeyFilter, $filter) {
        this.companies = [
            {
                key: 'HF',
                value: 'Hafslund'
            },
            {
                key: 'FO',
                value: 'Fortum'
            },
            {
                key: 'VTF',
                value: 'Vattenfall'
            }
        ];
        this.company = findKeyFilter(this.companies, 'FO', 'controller 1');
        this.sameCompany = $filter('findKey')(this.companies, 'FO', 'controller 2');
        this.textModel = '';
    }])

    .controller('DirectiveCtrl', function () {})

    .controller('ThisCtrl', ['$http', function ($http) {
        var self = this;

        $http.get('data/books.json')
            .then(function (res) {
                self.books = res.data.books; // todo: use "this" instead of "self"
            })
    }])