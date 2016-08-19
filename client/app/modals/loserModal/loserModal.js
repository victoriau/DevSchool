angular.module('pokExamApp').controller('loserModalCtrl', ['$scope','$uibModalInstance',function ($scope, $uibModalInstance) {
	$scope.close = function () {
		$uibModalInstance.dismiss('cancel');
		window.location.reload(false); 
	};	
}]);