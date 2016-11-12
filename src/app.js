const fs = require('fs');
const path = require('path');

const xml2js = require('xml2js');

export default class App {

    constructor() {

        this.isBrightSign = false;

        console.log("instantiate app");
        console.log("attach debugger now");

        this.autorunVersion= "8.0.0"; // BA 5.0.0
        this.customAutorunVersion = "8.0.0";
        setTimeout( () => {
            this.run();
        }, 1000);
    }

    run() {

        console.log("run app");

        let enableDebuggingPromise = this.enableDebugging();
        enableDebuggingPromise.then( (debugParamsFromSyncSpec) => {
            const debugParams = debugParamsFromSyncSpec;
            console.log("DebugParams", debugParams);
        });

        let sysInfo = this.getSysInfo();
        console.log("sysInfo");
        console.log(sysInfo);

        // start video playback
        // const v = document.getElementsByTagName("video")[0];
        // console.log("v");
        // console.log(v);
        // v.play();
    }

    enableDebugging() {

        let debugParams = {};

        debugParams.serialDebugOn = false;
        debugParams.systemLogDebugOn = false;

        return new Promise( (resolve, reject) => {
            this.readCurrentSync().then( (syncSpecContainer) => {
                console.log("return from openCurrentSync");
                console.log(syncSpecContainer);

                // currentSync.sync.meta[0].client[0].enableSerialDebugging
                const syncSpec = syncSpecContainer.sync;
                const meta = syncSpec.meta[0];
                const clientData = meta.client[0];

                let enableSerialDebugging = false;
                const enableSerialDebuggingAsArray = clientData.enableSerialDebugging;
                if (enableSerialDebuggingAsArray instanceof Array && enableSerialDebuggingAsArray.length === 1 && enableSerialDebuggingAsArray[0] === 'True') {
                    enableSerialDebugging = true;
                }

                let enableSystemLogDebugging = false;
                const enableSystemLogDebuggingAsArray = clientData.enableSystemLogDebugging;
                if (enableSystemLogDebuggingAsArray instanceof Array && enableSystemLogDebuggingAsArray.length === 1 && enableSystemLogDebuggingAsArray[0] === 'True') {
                    enableSystemLogDebugging = true;
                }

                debugParams.serialDebugOn = enableSerialDebugging;
                debugParams.systemLogDebugOn = enableSystemLogDebugging;

                resolve(debugParams);
            });
        });
    }

    readCurrentSync() {
        return new Promise( (resolve, reject) => {
            this.readAppFile("current-sync.xml").then( (xmlData) => {
                this.convertXmlToJson(xmlData).then( (syncSpecContainer) => {
                    resolve(syncSpecContainer);
                })
                .catch(
                    (reason) => {
                        console.log("failed to convertXmlToJson");
                        console.log(reason);
                    }
                );
            })
            .catch(
                (reason) => {
                    console.log("failed to readAppFile");
                    console.log(reason);
                }
            );
        });
    }

    readAppFile(filePath) {

        let appPath = "";
        if (this.isBrightSign) {
            appPath = path.join(__dirname, "storage", "sd");
        }
        else {
            appPath = "/Users/tedshaffer/Documents/Projects/autorunJS";
        }

        const fullPath = path.join(appPath, filePath);

        return new Promise( (resolve, reject) => {
            fs.readFile(fullPath, (err, data) => {

                if (err) {
                    console.log("error reading file in readAppFile");
                    console.log(err);
                    reject(err);
                }

                resolve(data);
            });
        });
    }

    convertXmlToJson(xml) {

        return new Promise( (resolve, reject) => {

            var parser = new xml2js.Parser();
            parser.parseString(xml, function (err, jsonResult) {

                if (err) {
                    console.log("parse error in convertXmlToJson");
                    console.log(err);
                    reject(err);
                }
                resolve(jsonResult);
            });
        });
    }

    getSysInfo() {

        const deviceInfo = this.getDeviceInfo();

        let sysInfo = {};

        sysInfo.autorunVersion = this.autorunVersion;
        sysInfo.customAutorunVersion = this.customAutorunVersion;
        sysInfo.deviceUniqueId = deviceInfo.deviceUniqueId;
        sysInfo.deviceFWVersion = deviceInfo.version;
        sysInfo.deviceFWVersionNumber = deviceInfo.versionNumber;

        sysInfo.deviceModel = deviceInfo.model;
        sysInfo.deviceFamily = deviceInfo.family;
        sysInfo.enableLogDeletion = true;

        return sysInfo;
    }


    getDeviceInfo() {

        let deviceInfo = {};

        if (this.isBrightSign) {
            deviceInfo = new BSDeviceInfo();
        }
        else {
            deviceInfo.model = "XT1143";
            deviceInfo.family = "impala";
            deviceInfo.deviceUniqueId = "L8C67L000084";
            deviceInfo.version = "6.2.60-chronode-2016-10-26";
            deviceInfo.versionNumber = 393788;
        }

        return deviceInfo;
    }
}