/**
 * Created by tedshaffer on 11/12/16.
 */
export default class DiagnosticCodes {

    constructor() {
        
        this.EVENT_STARTUP                               = "1000";
        this.EVENT_SYNCSPEC_RECEIVED                     = "1001";
        this.EVENT_DOWNLOAD_START                        = "1002";
        this.EVENT_FILE_DOWNLOAD_START                   = "1003";
        this.EVENT_FILE_DOWNLOAD_COMPLETE                = "1004";
        this.EVENT_DOWNLOAD_COMPLETE                     = "1005";
        this.EVENT_READ_SYNCSPEC_FAILURE                 = "1006";
        this.EVENT_RETRIEVE_SYNCSPEC_FAILURE             = "1007";
        this.EVENT_NO_SYNCSPEC_AVAILABLE                 = "1008";
        this.EVENT_SYNCSPEC_DOWNLOAD_IMMEDIATE_FAILURE   = "1009";
        this.EVENT_FILE_DOWNLOAD_FAILURE                 = "1010";
        this.EVENT_SYNCSPEC_DOWNLOAD_FAILURE             = "1011";
        this.EVENT_ASSETPOOL_PROTECT_FAILURE              = "1012";
        this.EVENT_LOGFILE_UPLOAD_FAILURE                = "1013";
        this.EVENT_SYNC_ALREADY_ACTIVE                   = "1014";
        this.EVENT_CHECK_CONTENT                         = "1015";
        this.EVENT_FILE_DOWNLOAD_PROGRESS                = "1016";
        this.EVENT_FIRMWARE_DOWNLOAD                     = "1017";
        this.EVENT_SCRIPT_DOWNLOAD                       = "1018";
        this.EVENT_USER_VARIABLE_NOT_FOUND				= "1021";
        this.EVENT_MEDIA_COUNTER_VARIABLE_NOT_FOUND		= "1022";
        this.EVENT_START_PRESENTATION					= "1023";
        this.EVENT_GPS_LOCATION							= "1024";
        this.EVENT_GPS_NOT_LOCKED						= "1025";
        this.EVENT_RETRIEVE_USER_VARIABLE_FEED           = "1026";
        this.EVENT_RETRIEVE_LIVE_TEXT_FEED				= "1027";
        this.EVENT_USER_VARIABLE_FEED_DOWNLOAD_FAILURE   = "1028";
        this.EVENT_LIVE_TEXT_FEED_DOWNLOAD_FAILURE		= "1029";
        this.EVENT_UNASSIGNED_LOCAL_PLAYLIST				= "1030";
        this.EVENT_UNASSIGNED_LOCAL_PLAYLIST_NO_NAVIGATION = "1031";
        this.EVENT_REALIZE_FAILURE						= "1032";
        this.EVENT_LIVE_TEXT_PLUGIN_FAILURE				= "1033";
        this.EVENT_INVALID_DATE_TIME_SPEC				= "1034";
        this.EVENT_HTML5_LOAD_ERROR						= "1035";
        this.EVENT_USB_UPDATE_SECURITY_ERROR				= "1036";
        this.EVENT_TUNE_FAILURE							= "1037";
        this.EVENT_SCAN_START							= "1038";
        this.EVENT_CHANNEL_FOUND							= "1039";
        this.EVENT_SCAN_COMPLETE							= "1040";
        this.EVENT_SCRIPT_PLUGIN_FAILURE					= "1041";
        this.EVENT_DISK_ERROR							= "1042";
        this.EVENT_LIVE_MRSS_PLUGIN_FAILURE				= "1043";
        this.EVENT_EMPTY_MEDIA_PLAYLIST					= "1044";
        this.EVENT_CUSTOM_USER_AGENT_FAILURE				= "1045";
        this.EVENT_BLC400_STATUS							= "1100";
        this.EVENT_CONTINUE_LIVE_DATA_FEED_CONTENT_DOWNLOAD		= "1200";
        this.EVENT_RESTART_LIVE_DATA_FEED_CONTENT_DOWNLOAD		= "1201";
        this.EVENT_START_LIVE_DATA_FEED_CONTENT_DOWNLOAD			= "1202";
        this.EVENT_ASSETPOOL_UNPROTECT_FAILURE					= "1203";
        this.EVENT_PLAYBACK_FAILURE								= "1204";
        this.EVENT_START_MRSS_FEED_CONTENT_DOWNLOAD				= "1205";
        this.EVENT_UNABLE_TO_CREATE_ASSET_POOL					= "1206";
        this.EVENT_DELETE_USER_VARIABLES_DB				= "1207";
        this.EVENT_SCREENSHOT_ERROR						= "1208";
        this.EVENT_SCREENSHOT_UPLOAD_ERROR				= "1209";
        this.EVENT_SCREENSHOT_UPLOADED_AND_QUEUED		= "1210";
        this.EVENT_SCREENSHOT_QUEUE_ERROR				= "1211";
        this.EVENT_SET_BSN_OVERRIDE						= "1212";
        this.EVENT_CANCEL_BSN_OVERRIDE					= "1213";
        this.EVENT_BSN_OVERRIDE_EXPIRED					= "1214";
        this.EVENT_SET_SNAPSHOT_CONFIGURATION			= "1215";
        this.EVENT_STREAM_END							= "1216";
        this.EVENT_SET_VIDEO_MODE						= "1217";
        this.EVENT_SNAPSHOT_PUT_TO_SERVER_ERROR			= "1218";
        this.EVENT_CHECK_LIVE_TEXT_FEED_HEAD				= "1219";
        this.EVENT_BEACON_START							= "1300";
        this.EVENT_BEACON_START_FAILED					= "1301";
        this.EVENT_BEACON_START_LIMIT_EXCEEDED			= "1302";
    }
}
