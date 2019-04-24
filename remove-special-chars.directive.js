function removeSpecialChars() {
  return {
    restrict: 'A',
    link: function (scope, __elem, attrs) {
      scope.$watch(attrs['ngModel'], function (input) {
        if (input) {
          scope.value = input.replace(/[^A-Za-z0-9\s\á\é\í\ó\ú\ñ\.\,\;]+/gi, "");
        }
      });
    }
  };
}

angular.module("directives")
  .directive("removeSpecialChars", removeSpecialChars);
