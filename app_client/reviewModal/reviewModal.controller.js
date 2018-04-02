(function () {
    angular
        .module('dreezrApp')
        .controller('reviewModalCtrl', reviewModalCtrl);
    reviewModalCtrl.$inject = ['$uibModalInstance', 'dreezrData', 'locationData'];
    function reviewModalCtrl($uibModalInstance, dreezrData, locationData) {
        var vm = this;
        vm.locationData = locationData;
        // vm.formData = {};

        vm.onSubmit = function () {
            vm.formError = "";
            // if (!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
            if (!vm.formData.rating || !vm.formData.reviewText) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doAddReview(vm.locationData.locationid, vm.formData);
            }
        };
        vm.doAddReview = function (locationid, formData) {
            dreezrData.addReviewById(locationid, {
                // author: formData.name,
                rating: formData.rating,
                reviewText: formData.reviewText
            })
                .success(function (data) {
                    vm.modal.close(data);
                })
                .error(function (data) {
                    vm.formError = "Your review has not been saved, please try again";
                });
            return false;
        };
        vm.modal = {
            close: function (result) {
                $uibModalInstance.close(result);
            },
            cancel: function () {
                $uibModalInstance.dismiss('cancel');
            }
        };
    }
})();