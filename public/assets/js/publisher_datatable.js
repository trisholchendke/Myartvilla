angular.module('showcase.withResponsive', ['datatables'])
.controller('WithResponsiveCtrl', WithResponsiveCtrl);

function WithResponsiveCtrl(DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.fromSource('')
        .withPaginationType('full_numbers')
        // Active Responsive plugin
        .withOption('responsive', true);
    vm.dtColumns = [
        DTColumnBuilder.newColumn('username').withTitle('Username'),
        DTColumnBuilder.newColumn('firstname').withTitle('Firstname'),
        DTColumnBuilder.newColumn('lastname').withTitle('Lastname'),
		// DTColumnBuilder.newColumn('event code').withTitle('Event Code'),
		// DTColumnBuilder.newColumn('payment status').withTitle('Payment Status'),
		// DTColumnBuilder.newColumn('organization name').withTitle('Organization Name'),
		// DTColumnBuilder.newColumn('person in charge').withTitle('Person In Charge'),
		// DTColumnBuilder.newColumn('contract type').withTitle('Contract Type'),
        // .notVisible() does not work in this case. Use .withClass('none') instead
        DTColumnBuilder.newColumn('actions').withTitle('Actoin').withClass('none')
    ];
}