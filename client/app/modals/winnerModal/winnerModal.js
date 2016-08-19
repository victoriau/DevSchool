angular.module('pokExamApp').controller('winnerModalCtrl', ['$scope','$uibModalInstance', 'MusicFactory', function ($scope, $uibModalInstance, MusicFactory) {
	MusicFactory.playWinnerMusic();
	// MusicFactory.playBattleMusic();
	$scope.close = function () {
		$uibModalInstance.dismiss('cancel');
		window.location.reload(false);
	};
}]);
