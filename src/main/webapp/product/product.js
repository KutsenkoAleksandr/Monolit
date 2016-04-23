angular.module('monolitApp.product', ['ui.router', 'ngResource'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('productId', {
                url: '/catalog/products/product/:productId',
                views: {
                    'content': {
                        templateUrl: 'product/product.html',
                        controller: 'productCtrl'
                    }
                },
                data: {
                    pageTitle: 'Товар'
                }
            });

    })

    .factory('productByIdFactory', function ($resource) {
        return $resource('/product/product_id/:id', {id: '@id'},{'query': { method: 'GET' }});
    })

    .factory('productCacheFactory', function ($cacheFactory) {
        return $cacheFactory('productCache', {});
    })

    .controller('productCtrl', function($scope,
                                        $rootScope,
                                        productByIdFactory,
                                        $stateParams,
                                        categoryNameByIdFactory,
                                        productCacheFactory,
                                        breadcrumbsCacheFactory,
                                        productListCacheFactory) {
        var getBreadcrumbsByProductId = function(id){
            //product
            $scope.product = productCacheFactory.get(id);
            if(!$scope.product){
                $scope.product = productByIdFactory.query({id:id});
                productCacheFactory.put(id, $scope.product);
            }
            //breadcrumbs
            $scope.product.$promise.then(function(data){
                $scope.productList = data.productByProductId.categoryId;
                var title = data.productByProductId.title;
                $scope.productListByCatId = productListCacheFactory.get('product'+$scope.productList);
                if(!$scope.productListByCatId){
                    $scope.productListByCatId = categoryNameByIdFactory.query({id:$scope.productList});
                    productListCacheFactory.put('product'+$scope.productList, $scope.productListByCatId);
                }
                $scope.productListByCatId.$promise.then(function(data){
                    $scope.productListName = data.name;
                    $scope.productParentId= data.parentId;
                    if(data.parentId !== 0){
                        $scope.productCategoryByParentId = breadcrumbsCacheFactory.get('categoriesBreadcrumbs'+data.parentId);
                        if(!$scope.productCategoryByParentId){
                            $scope.productCategoryByParentId = categoryNameByIdFactory.query({id:data.parentId});
                            breadcrumbsCacheFactory.put('categoriesBreadcrumbs'+data.parentId, $scope.productCategoryByParentId);
                        }
                        $scope.productCategoryByParentId.$promise.then(function(data){
                            $scope.categoryName = data.name;
                            $rootScope.$broadcast('page', {
                                name: title,
                                nesting: 5,
                                category: $scope.productParentId,
                                categoryName: $scope.categoryName,
                                productList: $scope.productList,
                                productListName: $scope.productListName
                            });
                        })
                    }
                });
            });
        };
        getBreadcrumbsByProductId($stateParams.productId);
    });