'use strict';

/* global describe, inject, module, beforeEach, it, expect */

describe('datepicker directive', function () {
    var $rootScope, $compile, element;
    beforeEach(module('ui.bootstrap.tpls'));
    beforeEach(module('ui.bootstrap.datepicker'));
    beforeEach(module('angularMoment'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = new Date('September 30, 2010 15:30:00');
    }));


    describe('', function () {
        beforeEach(function () {
            element = angular.element('<input ng-model="date" datepicker-popup="dd.MM.yyyy" datepicker-inline-validate>');
            element = $compile(element)($rootScope);
            $rootScope.$digest();

        });

        function setInput(val, trigger){
            element.val(val).trigger(trigger || 'input');
        }

        function assertValid(){
            expect(element).toHaveClass('ng-valid');
            expect(element).not.toHaveClass('ng-invalid-inline-date');
        }

        function assertInvalid(){
            expect(element).not.toHaveClass('ng-valid');
            expect(element).toHaveClass('ng-invalid-inline-date');
        }

        it('should set existing valid date as valid', function () {
            assertValid();
        });

        it('should mark invalid illegal character', function () {
            assertValid();
            setInput(29);
            assertInvalid();
        });

        it('should allow empty input', function () {
            assertValid();
            setInput('');
            assertValid();
        });

        it('should update validity on keyup', function () {
            assertValid();
            setInput('2','keyup');
            assertInvalid();
        });

        describe('template date format', function () {
            beforeEach(function(){
                $rootScope.format='dd.MM.yyyy';
                element=angular.element('<input ng-model="date" datepicker-popup="{{format}}" datepicker-inline-validate>');
                element = $compile(element)($rootScope);
                $rootScope.$digest();
            });

            it('should set valid properly', function () {
                setInput('29.09.2012');
                assertValid();
            });

            it('should set invalid properly use templates as date format', function () {
                setInput('09.29.2012');
                assertInvalid();
            });

            it('should update validity state when non-valid input turns valid on changing date format', function () {
                setInput('29.09.2012');
                assertValid();
                $rootScope.format='MM.dd.yyyy';
                $rootScope.$digest();
                assertInvalid();
            });

            it('should update validity state when valid input turns non-valid on changing date format', function () {
                setInput('09.29.2012');
                assertInvalid();
                $rootScope.format='MM.dd.yyyy';
                $rootScope.$digest();
                assertValid();
            });
        });
    });
});