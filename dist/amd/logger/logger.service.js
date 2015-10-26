// reference: https://github.com/stephenlautier/angular-typescript/blob/master/app/services/logger.svc.ts
define(["require", "exports"], function (require, exports) {
    var LoggerService = (function () {
        /*@ngInject*/
        function LoggerService($log) {
            this.$log = $log;
        }
        LoggerService.$inject = ["$log"];
        LoggerService.prototype.log = function (logType, message, data) {
            switch (logType) {
                case 0 /* Debug */:
                    this.$log.debug(message, data);
                    break;
                case 1 /* Info */:
                    this.$log.info(message, data);
                    break;
                case 3 /* Error */:
                    this.$log.error(message, data);
                    break;
                case 2 /* Warning */:
                    this.$log.warn(message, data);
                    break;
                default:
                    this.$log.log(message, data);
                    break;
            }
        };
        LoggerService.id = "loggerService";
        return LoggerService;
    })();
    exports.LoggerService = LoggerService;
    var Logger = (function () {
        function Logger(sourceId, loggerService) {
            this.sourceId = sourceId;
            this.loggerService = loggerService;
        }
        Logger.prototype.debug = function (source, message, data) {
            this._log(this.sourceId, source, 0 /* Debug */, message, data);
        };
        Logger.prototype.info = function (source, message, data) {
            this._log(this.sourceId, source, 1 /* Info */, message, data);
        };
        Logger.prototype.error = function (source, message, data) {
            this._log(this.sourceId, source, 3 /* Error */, message, data);
        };
        Logger.prototype.warn = function (source, message, data) {
            this._log(this.sourceId, source, 2 /* Warning */, message, data);
        };
        Logger.prototype._log = function (sourceId, source, logType, message, data) {
            var msg = "[" + sourceId + "::" + source + "] " + message;
            this.loggerService.log(logType, msg, data);
        };
        return Logger;
    })();
    exports.Logger = Logger;
    /*@ngInject*/
    function loggerFactory(loggerService) {
        return function (sourceId) {
            return new Logger(sourceId, loggerService);
        };
    }
    loggerFactory.$inject = ["loggerService"];
    exports.loggerFactory = loggerFactory;
});

//# sourceMappingURL=logger.service.js.map
