(function () {

    function clockpicker(parse, timeout) {
        function link(scope, elm, attrs, ngModel) {
            var inputElm = $("input", elm);
            var modelGetter = parse(attrs["ngModel"]);
            var modelSetter = modelGetter.assign;
            function afterUpdate() {
                return timeout(function () {
                    var value = modelGetter(scope);
                    if (value) {
                        value = moment(value, "HH:mm");                        
                    }
                    var inputVal = moment(inputElm.val(), "HH:mm");
                    if (inputVal.isValid()) {
                        if (!value) {
                            modelSetter(scope, inputVal.toDate());
                        } else {
                            value.hour(inputVal.hour());
                            value.minute(inputVal.minute());
                            var finalTime = moment(value).format("HH:mm");

                            modelSetter(scope, finalTime);
                            scope.$digest();
                        }
                    }
                });
            }
            elm.clockpicker({
                donetext: "Done",
                autoclose: true,
                afterDone: afterUpdate
            });
            inputElm.blur(afterUpdate);
            ngModel.$formatters.push(function (value) {
                if (value) {
                    var time = moment(value, "HH:mm");
                    inputElm.val(moment(time).format("HH:mm"));
                    inputElm.val();
                }
                return value;
            });
        }

        return {
            restrict: "C",
            require: "ngModel",
            link: link
        };
    }

    angular
        .module("clockpicker", [])
        .directive("clockpicker", ["$parse", "$timeout", clockpicker]);
})();
