const fs = require('fs');
const path = require('path');

const xml2js = require('xml2js');

import DiagnosticCodes from './diagnosticCodes';

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
        enableDebuggingPromise.then((debugParamsFromSyncSpec) => {
            const debugParams = debugParamsFromSyncSpec;

            let sysFlags = {};
            sysFlags.debugOn = debugParams.serialDebugOn;
            sysFlags.systemLogDebugOn = debugParams.systemLogDebugOn;
            console.log("sysFlags");
            console.log(sysFlags);
        });

        let sysInfo = this.getSysInfo();
        console.log("sysInfo");
        console.log(sysInfo);

        // videoMode = CreateObject("roVideoMode")
        // edid = videoMode.GetEdidIdentity(true)
        // UpdateEdidValues(edid, sysInfo)
        // edid = invalid
        // videoMode = invalid

        // determine if the storage device is writable
        // du = CreateObject("roStorageInfo", "./")
        // if du.IsReadOnly() then
        //     sysInfo.storageIsWriteProtected = true
        // else
        //     sysInfo.storageIsWriteProtected = false
        // endif

        this.initRemoteSnapshots(sysInfo);

        // check to see whether or not the current firmware meets the minimum compatibility requirements
        const versionNumber = sysInfo.deviceFWVersionNumber;
        let minVersionNumber;
        let minVersion;

        if (sysInfo.deviceFamily === "pantera") {
            minVersionNumber = 393761;
            minVersion = "6.2.33";
        }
        else if (sysInfo.deviceFamily === "impala") {
            minVersionNumber = 393761;
            minVersion = "6.2.33";
        }
        else if (sysInfo.deviceFamily === "panther") {
            minVersionNumber = 327952;
            minVersion = "5.1.16";
        }
        else if (sysInfo.deviceFamily === "cheetah") {
            minVersionNumber = 327952;
            minVersion = "5.1.16";
        }
        else if (sysInfo.deviceFamily === "tiger") {
            minVersionNumber = 327952;
            minVersion = "5.1.16";
        }
        else if (sysInfo.deviceFamily === "puma") {
            minVersionNumber = 327952;
            minVersion = "5.1.16";
        }
        else if (sysInfo.deviceFamily === "bobcat") {
            minVersionNumber = 327952;
            minVersion = "5.1.16";
        }
        else if (sysInfo.deviceFamily === "lynx") {
            minVersionNumber = 327952;
            minVersion = "5.1.16";
        }
        else {   // no supported devices should hit this else
            minVersionNumber = 199435;
            minVersion = "3.11.11";
        }

        if (versionNumber < minVersionNumber) {
            // videoMode = CreateObject("roVideoMode")
            // resX = videoMode.GetResX()
            // resY = videoMode.GetResY()
            // videoMode = invalid
            // r=CreateObject("roRectangle",0,resY/2-resY/64,resX,resY/32)
            // twParams = CreateObject("roAssociativeArray")
            // twParams.LineCount = 1
            // twParams.TextMode = 2
            // twParams.Rotation = 0
            // twParams.Alignment = 1
            // tw=CreateObject("roTextWidget",r,1,2,twParams)
            // tw.PushString("Firmware needs to be upgraded to " + minVersion$ + " or greater")
            // tw.Show()
            //
            // globalAA = GetGlobalAA()
            // if globalAA.enableRemoteSnapshot then
            // sleep(1000)	' sleep here ensures that graphics makes it to the screen before the snapshot is taken
            // TakeSnapshot(systemTime, "")
            // endif
            //
            // sleep(120000)
            // RebootSystem()
        }

        const diagnosticCodes = new DiagnosticCodes();
        console.log(diagnosticCodes);

// wait for enableDebuggingPromise
//         RunBsp(sysFlags, sysInfo, diagnosticCodes, systemTime)

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

        const networkConfiguration = this.getNetworkConfiguration();
        sysInfo.ipAddressWired = networkConfiguration.ipAddressWired;
        sysInfo.modelSupportsWifi = networkConfiguration.modelSupportsWifi;
        sysInfo.ipAddressWireless = networkConfiguration.ipAddressWireless;

        return sysInfo;
    }


    getDeviceInfo() {

        let deviceInfo = {};

        if (this.isBrightSign) {
            deviceInfo = new BSDeviceInfo();
            // doesn't support versionNumber currently
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

    getNetworkConfiguration() {

        let networkConfiguration = {};

        // if (this.isBrightSign) {
        //
        // }
        // else {
        //
        // }

        networkConfiguration.ipAddressWired = "192.168.0.110";
        networkConfiguration.modelSupportsWifi = false;
        networkConfiguration.ipAddressWireless = "";

        return networkConfiguration;
    }

    initRemoteSnapshots(sysInfo) {
    //
    //     let basePath;
    //
    //     if (this.isBrightSign) {
    //         basePath = '/storage/sd';
    //     }
    //     else {
    //         basePath = '/Users/tedshaffer/Documents/Projects/autorunJS';
    //     }
    //
    //     const dirPath = path.join(basePath, 'snapshots');
    //     fs.mkdirSync(dirPath);  // fails if storage is write protected or formatted as ntfs, but ignore return value at this point
    //
    //     // ' setup snapshot capability as early as possible
    //     // registrySection = CreateObject("roRegistrySection", "networking")
    //     // if type(registrySection)<>"roRegistrySection" then print "Error: Unable to create roRegistrySection":stop
    //
    //     this.enableRemoteSnapshot = false
    //     if lcase(registrySection.Read("enableRemoteSnapshot")) = "yes" then
    //     if sysInfo.storageIsWriteProtected then DisplayStorageDeviceLockedMessage()
    //     globalAA.enableRemoteSnapshot = true
    //     globalAA.remoteSnapshotInterval = int(val(registrySection.Read("remoteSnapshotInterval")))
    //     globalAA.remoteSnapshotMaxImages = int(val(registrySection.Read("remoteSnapshotMaxImages")))
    //     globalAA.remoteSnapshotJpegQualityLevel = int(val(registrySection.Read("remoteSnapshotJpegQualityLevel")))
    //     globalAA.remoteSnapshotDisplayPortrait = GetBoolFromString("remoteSnapshotDisplayPortrait", false)
    //     endif
    //
    //     registrySection = invalid
    //
    //     ' generate list of snapshots currently on card
    //     globalAA.listOfSnapshotFiles = MatchFiles("/snapshots/", "*.jpg")
    //     BubbleSortFileNames(globalAA.listOfSnapshotFiles)
    }
}