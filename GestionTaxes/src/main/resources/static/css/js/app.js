var app = angular.module("MyApp", []);
app.controller("MyController", function ($scope, $http) {
    $scope.pageEntreprises = [];
    $http.get("http://localhost:2021/entrepriseList?page=1&size=3")
        .success(function (data) {
            $scope.pageEntreprises = data;
        })
        .error(function (err) {
            console.log(err)
        })
});
