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
          placeholder: 'write something here...',
          pasteImage: true,
          toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent'],
          defaultImage: 'assets/images/image.png',
          upload: location.search === '?upload' ? {
            url: '/upload'
          } : false
        });

        function readViewText() {
          var html = element.find('.simditor-body').html();
          // When we clear the content editable the browser leaves a <br> behind
          // If strip-br attribute is provided then we strip this out
          if (attrs.stripBr && html === '<br>') {
            html = '';
          }

          ngModel.$setViewValue(html);
        }

        element.on('blur keyup change', function () {
          scope.$apply(readViewText);
        });
      }
    };
  });
}(window));