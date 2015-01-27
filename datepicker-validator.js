'use strict';

angular.module('ui.bootstrap.datepicker')
    .directive('datepickerInlineValidate',
    ['moment', 'datepickerPopupConfig', '$timeout',
        function (moment, datepickerPopupConfig, $timeout) {

            return {
                restrict: 'A',
                require: '^ngModel',
                link: function ($scope, element, attrs, ngModel) {
                    var dateFormat;
                    var validate = function () {
                        var textValue = element.val();
                        var parsedDate = moment(textValue, dateFormat, true);

                        if (textValue && textValue.length > 0) {
                            ngModel.$setValidity('inline-date', parsedDate.isValid());
                        } else {
                            ngModel.$setValidity('inline-date', true);
                        }
                    };
                    ngModel.$viewChangeListeners.push(function () {
                        $timeout(validate, 0);
                    });
                    attrs.$observe('datepickerPopup', function (value) {
                        dateFormat = value || datepickerPopupConfig.datepickerPopup;
                        dateFormat = dateFormat.replace(/yy/g, 'YY');
                        dateFormat = dateFormat.replace(/dd/g, 'DD');
                        validate();
                    });

                    element.bind('input change keyup', validate);
                }
            };

        }]);