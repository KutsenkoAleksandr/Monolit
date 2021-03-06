angular.module('monolitApp.admin.goods.code', [])
    
    .controller('goodsTxtInputCtrl', function($scope, $rootScope){

        $scope.$on("goodsTxtInputBroadcast", function (event, args) {
            $scope.addGoodsCode = args.goodsCode;
            $scope.addGoodsCode2 = args.goodsCode2;
            $scope.addGoodsCode3 = args.goodsCode3;
            $scope.addGoodsCode4 = args.goodsCode4;
            $scope.name_product = args.nameProduct;
            $scope.description = args.descriptionProduct;
            $scope.priceUah = args.priceUahProduct;
            $scope.priceCent = args.priceCentProduct;
            $scope.addGoodsExist = args.existProduct;
        });

        $scope.$watch('addGoodsCode', function () {
            $rootScope.$broadcast('codeBroadcast', {
                goodsCode: $scope.addGoodsCode
            })
        });

        $scope.$watch('addGoodsCode2', function () {
            $rootScope.$broadcast('codeBroadcast2', {
                goodsCode2: $scope.addGoodsCode2
            })
        });

        $scope.$watch('addGoodsCode3', function () {
            $rootScope.$broadcast('codeBroadcast3', {
                goodsCode3: $scope.addGoodsCode3
            })
        });

        $scope.$watch('addGoodsCode4', function () {
            $rootScope.$broadcast('codeBroadcast4', {
                goodsCode4: $scope.addGoodsCode4
            })
        });

        $scope.$watch('name_product', function () {
            $rootScope.$broadcast('titleBroadcast', {
                titleBroadcast: $scope.name_product
            })
        });

        $scope.$watch('description', function () {
            $rootScope.$broadcast('descriptionBroadcast', {
                descriptionBroadcast: $scope.description
            })
        });

        $scope.$watch('priceUah', function () {
            $rootScope.$broadcast('priceUahBroadcast', {
                priceUahBroadcast: $scope.priceUah
            })
        });

        $scope.$watch('priceCent', function () {
            $rootScope.$broadcast('priceCentBroadcast', {
                priceCentBroadcast: $scope.priceCent
            })
        });

        $scope.$watch('addGoodsExist', function () {
            $rootScope.$broadcast('productExistBroadcast', {
                productExistBroadcast: $scope.addGoodsExist
            })
        });

    });
