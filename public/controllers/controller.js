/**
 * Created by arif on 12/5/16.
 */

function myCtrl($scope,$http){
    console.log('hello world from controller')

   var refresh = function() {
       $http.get('/driverlist').success(function(res) {
           console.log('i recieved data what i reqiusted');
           console.log('i recieved data what i reqiusted' + JSON.stringify(res));
           $scope.driverlist = res;
       });
   }
    refresh();
    $scope.AddDetails = function(){
        console.log('data' +JSON.stringify($scope.driver));
        $http.post('/driverlist',$scope.driver).success(function(result){
            console.log('result' +JSON.stringify(result));
            $scope.driver = ''
            refresh();
        })
    }

    $scope.remove = function(driver){
        console.log('driver' +JSON.stringify(driver._id));
        $http.delete('/driverlist/' + driver._id).success(function(data){
            console.log('data removed' +JSON.stringify(data));
            refresh();
        })
    }

    $scope.Edit = function(id){
        console.log(' edit id========' +JSON.stringify(id))
        $http.get('/driverlist/' + id).success(function(data1){
            console.log('edit data' +JSON.stringify(data1));
            $scope.driver = data1;
        })
    }

    $scope.update = function(){
        console.log('$scope.driver._id' +JSON.stringify($scope.driver._id,$scope.driver))
        $http.put('/driverlist/' +$scope.driver._id,$scope.driver).success(function(tttt){
            refresh();
        })
    }

    $scope.clear = function(){
        $scope.driver = ''
    }


}
