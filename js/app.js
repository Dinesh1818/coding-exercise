var app = angular.module('companyApp', []);
app.controller('companyController', function($scope, $http) {
    $scope.companyData = ''; $scope.errorMessage = ''; $scope.search = "";$scope.loadData = false;
    $scope.searchCompany = function(form){
     if(form.$invalid){
         return;
     }
     $scope.loadData = true;
	 $scope.search = $scope.search ? $scope.search.toUpperCase() : "";
    $http.get("https://financialmodelingprep.com/api/v3/profile/"+$scope.search+"?apikey=923fa9a478b9c6ea0b8790be7bb070b2")
    .then(function(response) {
        $scope.loadData = false;
        if(response["data"] && response["data"]["Error Message"]){
            $scope.errorMessage = "No data found for "+$scope.search;
            $scope.companyData = '';
        }else if(response["data"] && response["data"].length){
            $scope.companyData = response.data[0];
            $scope.errorMessage = '';
            $scope.search = '';
        }
        else{
            $scope.errorMessage = "No data found";
        }      
    });
  }

});