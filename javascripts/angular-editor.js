/*global window,location*/
(function (window) {
  'use strict';

  var Simditor = window.Simditor;
  var directives = angular.module('simditor',[]);

  directives.directive('simditor', function () {
    return {
      require: "?^ngModel",
      link: function (scope, element, attrs, ngModel) {
        element.append("<div style='height:300px;'></div>");

        scope.simditor = new Simditor({
          textarea: element.children()[0],
          pasteImage: true,
          toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent'],
          defaultImage: 'assets/images/image.png',
          upload: location.search === '?upload' ? {
            url: '/upload'
          } : false
        });

        function readViewText() {
          var html = element.find('.simditor-body').html();
          if (attrs.stripBr && html === '<br>') {
            html = '';
          }

          ngModel.$setViewValue(html);
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