define(["require", "exports", "angular", "./logger/logger", "./core.consts"], function (require, exports, angular, logger_1, core_consts_1) {
    console.debug(">>> REGISTER ng-module '" + core_consts_1.consts.moduleName + "'");
    var globalModule = angular.module(core_consts_1.consts.moduleName, []);
    globalModule
        .service(logger_1.LoggerService.id, logger_1.LoggerService)
        .factory("loggerFactory", logger_1.loggerFactory);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = globalModule;
});

//# sourceMappingURL=core.module.js.map
