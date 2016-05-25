(function() {



    var x13 = angular.module('mainModule', ['ngResource', 'ui.ace']);


    x13.controller('MainController', ['$scope', function($scope){

        $scope.aceChanged= function(e) {
            //
        };

        $scope.products = gems;
        $scope.templates = [
            {name: 'Solr/Lucene', page:'settingsSolr.html'},
            {name: 'Terrier', page:'settingsTerrier.html'},
            {name: 'Lemur', page:'lemur.html'}
        ];

        $scope.selectedPage = $scope.templates[0].page;

        this.selectSearchEngine = function(page) {
            $scope.selectedPage = page;
        };

    }]);


    var gems = [
        { name: 'Azurite', price: 110.50 },
        { name: 'Bloodstone', price: 22.90 },
        { name: 'Zircon', price: 1100 }
    ];


    <!-- search controller for requesting solr  -->
    x13.controller('SearchController', ['$http', '$scope', function($http, $scope){


        $scope.aceModel = ';; Scheme code in here.';



//        this.products = gems;
        $scope.selectedSearchHandler = null;
        $scope.searchHandlerNames = [];
        $scope.searchHandlerName = [];
        $scope.searchComponents = [];
        $scope.defaultComponents = [];
        $scope.firstComponents = ["tvComponent"];
        $scope.lastComponents = ["spellcheck"];

        //todo read this 4 attributes from the retrieved updateHandler
//        $scope.updateHandlerName = "org.apache.solr.update.DirectUpdateHandler2";


        $scope.autoCommitMaxDocs = null;
        $scope.autoCommitMaxTime = null;
        $scope.autoSoftCommitMaxDocs = null;
        $scope.autoSoftCommitMaxTime = null;
        $scope.openSearcher = null;
        $scope.updateClassName = null;
        $scope.commitIntervalLowerBound = null;
        $scope.commitWithinSoftCommit = null;
        $scope.indexWriterCloseWaitsForMerges = null;
        $scope.editorContent = "type here your xml";


        this.printOut = function(data) {
          alert(data);
        };


        this.searchSubmit = function() {
            var store = this;
            $http({method: 'JSONP',
                   url: 'http://localhost:8984/solr/collection1/readSettings?callback=JSON_CALLBACK'
            }).success(function(data, status) {
                //alert($scope.editorContent);
                alert($scope.code);
                $scope.data = data;
                $scope.status = status;
                $scope.result = angular.fromJson(JSON.stringify($scope.data));
                var searchHandlersDTO = $scope.result.searchHandlersDTO;
                var updateHandlerDTO = $scope.result.updateHandlerDTO;

                for (var i = 0; i < searchHandlersDTO.length; i++) {
                    var searchHandlerDTO = searchHandlersDTO[i];
                    var searchHandlerName = searchHandlerDTO.searchHandlerName;
                    $scope.searchHandlerName = searchHandlerDTO.searchHandlerName;
                    $scope.searchComponents = searchHandlersDTO[0].searchComponents;
                    $scope.defaultComponents = searchHandlerDTO.defaultComponents;
//                    $scope.firstComponents = $scope.result[i].firstComponents;
//                    $scope.lastComponents = $scope.result[i].lastComponents;

                    if (jQuery.inArray(searchHandlerName,searchHandlerNames) == -1) {
                        searchHandlerNames[i] = searchHandlerName;
                    }

                }
                $scope.searchHandlerNames = searchHandlerNames;


                //update handler
                $scope.autoCommitMaxDocs = updateHandlerDTO.autoCommitMaxDocs;
                $scope.autoCommitMaxTime = updateHandlerDTO.autoCommitMaxTime;
                $scope.autoSoftCommitMaxDocs = updateHandlerDTO.autoSoftCommitMaxDocs;
                $scope.autoSoftCommitMaxTime = updateHandlerDTO.autoSoftCommitMaxTime;
                $scope.openSearcher = updateHandlerDTO.openSearcher;
                $scope.updateClassName = updateHandlerDTO.className;
                $scope.commitIntervalLowerBound = updateHandlerDTO.commitIntervalLowerBound;
                $scope.commitWithinSoftCommit = updateHandlerDTO.commitWithinSoftCommit;
                $scope.indexWriterCloseWaitsForMerges = updateHandlerDTO.indexWriterCloseWaitsForMerges;


            }).error(function(data, status) {
                $scope.data = data || 'request failed';
                $scope.status = status;
                $scope.products = JSON.stringify($scope.data);
                alert($scope.status);
            });
        };


//        this.searchSubmit = function() {
//            var store = this;
//            this.products = [];
////            alert('bla');
//            $http({method: 'JSONP',
//                   url: 'http://localhost:8984/solr/collection1/select?q=samsung&wt=json&indent=true',
//                   params:{
//                        'json.wrf': 'JSON_CALLBACK',
//                        'q': 'samsung',
//                        'fl': $scope.displayField
//                   }
//                }).success(function(data, status) {
//                    $scope.data = data;
//                    $scope.status = status;
//
//                    $scope.products = JSON.stringify($scope.data);
//
//                }).error(function(data, status) {
//                    $scope.data = data || 'request failed';
//                    $scope.status = status;
//                    alert($scope.data);
//            });
//        };

    }]);

    var searchHandlerNames = [];
})();