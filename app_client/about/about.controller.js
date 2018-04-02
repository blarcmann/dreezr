(function () {
    angular
        .module('dreezrApp')
        .controller('aboutCtrl', aboutCtrl);
    function aboutCtrl() {
        var vm = this;
        vm.pageHeader = {
            title: 'About dreezr',
        };
        vm.main = {
            content: 'dreezr was created to help people find places to eat, settle down and get a bit of work done.\n\nLorem ipsum dolor sit amet, consectetur   adipiscing elit.'
        };
    }
})();