import "test-setup";
import { consts } from "../core.consts";

import { LoggerService } from "./logger.service";
import { LogType } from "./logger.model";

beforeEach(JasminePromiseMatchers.install);
afterEach(JasminePromiseMatchers.uninstall);


describe("LoggerServiceSpecs", () => {

	let SUT: LoggerService;
	let $log: ng.ILogService;

	beforeEach(angular.mock.module(consts.moduleName));

	beforeEach(inject((
		_loggerService_: LoggerService,
		_$log_: ng.ILogService
	) => {

		SUT = _loggerService_;
		$log = _$log_;

	}));

	describe("given a simple task", () => {

		it("should fail", () => {
			expect(1 + 1).toBe(3);
		});

		it("should be sucessful", () => {
			expect(1 + 1).toBe(2);
		});
	});

	describe("given logType warn", () => {

		it("should invoke warn method", () => {
			spyOn($log, "warn");

			SUT.log(LogType.Warning, "yo querro");

			expect($log.warn).toHaveBeenCalled();
		});
	});

	describe("given logType error", () => {

		it("should invoke error method", () => {
			spyOn($log, "error");

			SUT.log(LogType.Error, "yo querro");

			expect($log.error).toHaveBeenCalled();
		});
	});

});