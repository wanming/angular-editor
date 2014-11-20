/*global window,location*/
(function (window) {
  'use strict';

  var Simditor = window.Simditor;
  var directives = angular.module('simditor',[]);

  directives.directive('simditor', function () {
    
    var TOOLBAR_DEFAULT = ['title', 'bold', 'italic', 'underline', 'strikethrough', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent'];
    
    return {
      require: "?^ngModel",
      link: function (scope, element, attrs, ngModel) {
        element.append("<div style='height:300px;'></div>");

        var toolbar = scope.$eval(attrs.toolbar) || TOOLBAR_DEFAULT;
        scope.simditor = new Simditor({
            textarea: element.children()[0],
            pasteImage: true,
            toolbar: toolbar,
            defaultImage: 'assets/images/image.png',
            upload: location.search === '?upload' ? {
                url: '/upload'
            } : false
        });

        function readViewText() {
            var html = element.find('.simditor-body').html();
            var text = element.find('.simditor-body').text();

            ngModel.$setViewValue(html);

            if (attrs.ngRequired != undefined && attrs.ngRequired != "false") {

                if(text.trim() === "") {
                    ngModel.$setValidity("required", false);
                } else {
                    ngModel.$setValidity("required", true);
                }
            }
        }

        var $target = element.find('.simditor-body');

        ngModel.$render = function () {
          scope.simditor.focus();
          $target.prepend(ngModel.$viewValue);
        };

        element.on('blur keyup change', function () {
          scope.$apply(readViewText);
        });
      }
    };
  });
}(window));
