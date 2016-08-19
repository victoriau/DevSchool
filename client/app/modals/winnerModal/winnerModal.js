angular.module('pokExamApp').controller('winnerModalCtrl', ['$scope','$uibModalInstance',function ($scope, $uibModalInstance) {
	$scope.close = function () {
		$uibModalInstance.dismiss('cancel');
		window.location.reload(false);
	};	
}]);
