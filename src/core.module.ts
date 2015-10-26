import * as angular from "angular";
import {LoggerService, loggerFactory } from "./logger/logger";
import {consts} from "./core.consts";


console.debug(`>>> REGISTER ng-module '${consts.moduleName}'`);
let globalModule = angular.module(consts.moduleName, [

]);

globalModule
	.service(LoggerService.id, LoggerService)
	.factory("loggerFactory", loggerFactory);

export default globalModule;