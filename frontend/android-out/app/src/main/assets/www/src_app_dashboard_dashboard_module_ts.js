"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_dashboard_dashboard_module_ts"],{

/***/ 3225:
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./src/app/dashboard/dashboard.page.html ***!
  \*********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>dashboard</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-item class=\"container-fluid\">\n    <ion-input class=\"mt-4 mx-auto border rounded\" placeholder=\"Temperature\"></ion-input>\n  </ion-item>\n\n  <div class=\"container-fluid\">\n      <ion-card>\n      <ion-card-content>\n        Do you have any COVID symptoms <br>\n        if Yes, please see Covid compliance <br>\n        Officer immediately*\n\n        <ion-list>\n          <ion-item class=\"d-flex\">\n            <ion-checkbox></ion-checkbox>\n            <ion-label>Yes</ion-label>\n          </ion-item>\n\n          <ion-item class=\"d-flex\">\n            <ion-checkbox ></ion-checkbox>\n            <ion-label>No</ion-label>\n          </ion-item>\n        </ion-list>\n      \n      </ion-card-content>\n    </ion-card>\n  </div>\n\n  <div class=\"container-fluid\">\n    <ion-card>\n      <ion-card-header>\n        <ion-card-title>Attendence History</ion-card-title>\n      </ion-card-header>\n    \n      <ion-card-content>\n        \n        <ion-infinite-scroll>\n          <ion-infinite-scroll-content\n            loadingSpinner=\"bubbles\"\n            loadingText=\"Loading more data…\">\n            \n              <p>  Keep close to Nature's heart... and break clear away, once in awhile,\n                          and climb a mountain or spend a week in the woods. Wash your spirit clean.\n              </p>\n\n              <p>  Keep close to Nature's heart... and break clear away, once in awhile,\n                      and climb a mountain or spend a week in the woods. Wash your spirit clean.\n              </p>\n              \n              <p>  Keep close to Nature's heart... and break clear away, once in awhile,\n                and climb a mountain or spend a week in the woods. Wash your spirit clean.\n              </p>\n          </ion-infinite-scroll-content>\n        </ion-infinite-scroll>\n        \n        \n      </ion-card-content>\n    </ion-card>\n  </div>\n  \n  <div class=\"scan \">\n    <ion-button class=\"btn p-0 ms-4\" color=\"light\" (click)=\"scan()\" expand=\"block\" >Scan</ion-button>\n  </div>\n\n  <br>\n\n  <ion-card>\n    <div *ngIf=\"scannedData\">\n        <ion-item>\n            Scanned code output: <strong>{{ scannedData[\"format\"] }}</strong>\n        </ion-item>\n    </div>\n</ion-card>\n\n</ion-content>\n");

/***/ }),

/***/ 5531:
/*!*******************************************************!*\
  !*** ./src/app/dashboard/dashboard-routing.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DashboardPageRoutingModule": () => (/* binding */ DashboardPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 1838);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 789);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9538);
/* harmony import */ var _dashboard_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard.page */ 5021);




const routes = [
    {
        path: '',
        component: _dashboard_page__WEBPACK_IMPORTED_MODULE_0__.DashboardPage
    }
];
let DashboardPageRoutingModule = class DashboardPageRoutingModule {
};
DashboardPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], DashboardPageRoutingModule);



/***/ }),

/***/ 7799:
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DashboardPageModule": () => (/* binding */ DashboardPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 1838);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 789);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 2006);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3459);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 585);
/* harmony import */ var _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard-routing.module */ 5531);
/* harmony import */ var _dashboard_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard.page */ 5021);







let DashboardPageModule = class DashboardPageModule {
};
DashboardPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__.DashboardPageRoutingModule
        ],
        declarations: [_dashboard_page__WEBPACK_IMPORTED_MODULE_1__.DashboardPage]
    })
], DashboardPageModule);



/***/ }),

/***/ 5021:
/*!*********************************************!*\
  !*** ./src/app/dashboard/dashboard.page.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DashboardPage": () => (/* binding */ DashboardPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 1838);
/* harmony import */ var _Users_academy_learners_Documents_group_f_frontend_node_modules_angular_devkit_build_angular_node_modules_ngtools_webpack_src_loaders_direct_resource_js_dashboard_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@angular-devkit/build-angular/node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./dashboard.page.html */ 3225);
/* harmony import */ var _dashboard_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard.page.scss */ 1824);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 789);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 585);
/* harmony import */ var _ionic_native_barcode_scanner_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/barcode-scanner/ngx */ 223);
/* harmony import */ var _ionic_native_qr_scanner_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/qr-scanner/ngx */ 4081);
/* harmony import */ var _awesome_cordova_plugins_dialogs_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @awesome-cordova-plugins/dialogs/ngx */ 7082);








let DashboardPage = class DashboardPage {
    constructor(barcodeScanner, qr, dialog, platform) {
        this.barcodeScanner = barcodeScanner;
        this.qr = qr;
        this.dialog = dialog;
        this.platform = platform;
        //Now Disable scanning when back button is pressed
        this.platform.backButton.subscribeWithPriority(0, () => {
            document.getElementsByTagName("body")[0].style.opacity = "1";
            this.qrScan.unsubscribe();
        });
    }
    ngOnInit() {
    }
    scan() {
        this.qr.prepare().then((status) => {
            if (status.authorized) {
                this.qr.show();
                document.getElementsByTagName("body")[0].style.opacity = "0";
                this.qrScan = this.qr.scan()
                    .subscribe((textFound) => {
                    document.getElementsByTagName("body")[0].style.opacity = "1";
                    this.qr.enableLight();
                    this.qr.useBackCamera();
                    console.log("Found " + textFound);
                    this.dialog.alert(JSON.stringify(textFound));
                }, (err) => {
                    console.log("Error " + err);
                    this.dialog.alert(JSON.stringify(err));
                });
            }
            else if (status.denied) {
            }
            else {
            }
        });
    }
};
DashboardPage.ctorParameters = () => [
    { type: _ionic_native_barcode_scanner_ngx__WEBPACK_IMPORTED_MODULE_2__.BarcodeScanner },
    { type: _ionic_native_qr_scanner_ngx__WEBPACK_IMPORTED_MODULE_3__.QRScanner },
    { type: _awesome_cordova_plugins_dialogs_ngx__WEBPACK_IMPORTED_MODULE_4__.Dialogs },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.Platform }
];
DashboardPage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-dashboard',
        template: _Users_academy_learners_Documents_group_f_frontend_node_modules_angular_devkit_build_angular_node_modules_ngtools_webpack_src_loaders_direct_resource_js_dashboard_page_html__WEBPACK_IMPORTED_MODULE_0__["default"],
        styles: [_dashboard_page_scss__WEBPACK_IMPORTED_MODULE_1__]
    })
], DashboardPage);



/***/ }),

/***/ 1824:
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.page.scss ***!
  \***********************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkYXNoYm9hcmQucGFnZS5zY3NzIn0= */";

/***/ })

}]);
//# sourceMappingURL=src_app_dashboard_dashboard_module_ts.js.map