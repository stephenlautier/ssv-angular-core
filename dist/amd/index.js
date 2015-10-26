define(["require", "exports", "./logger/logger", "./core.module", "./core.consts"], function (require, exports, logger_1, core_module_1, core_consts_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(logger_1);
    exports.coreModule = core_module_1.default;
    exports.coreConsts = core_consts_1.consts;
});

//# sourceMappingURL=index.js.map
