/*************************************************************************************************************************/
/**                            *******************************************************************************************/
/**   UI FRAMEWORK             *******************************************************************************************/
/**                            *******************************************************************************************/
/*************************************************************************************************************************/
/**                                                                                                                     **/
/**   This script belongs to no package and is intended to be included in all docs.                                     **/
/**                                                                                                                     **/
/**   common.js: Common inline scripts and functions used in all cases and docs.                                        **/
/**   Includes overrides, prototypes and extended behaviours.                                                            **/
/**   The following code assumes MooTools Core 1.6.0 has been included.                                                 **/
/**   The following code assumes MooTools More 1.6.0 has been included.                                                 **/
/**                                                                                                                     **/
/*************************************************************************************************************************/

if (!('Affinity' in window)) { window.Affinity = {}; }
Affinity.started = (new Date()).getTime();
Affinity.views = {};
Affinity.Components = {};
Affinity.Components.Commons = {};
Affinity.Components.Commons.Version = '6.0.11.1';
Affinity.Components.Commons.Notes = 'WebWorker support (disabled)';
Affinity.Components.Commons.Name = 'UI Framewrok Commons';
Affinity.Components.Commons.File = 'commons.6.0.0.js';
Affinity.Components.Commons.Notes = 'API Structure change';
Affinity.Components.Commons.Jira = '';

/**   MOO COMPONENTS             *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

Affinity.Components.MooTools = {};
Affinity.Components.MooTools.Version = '1.6.0';
Affinity.Components.MooTools.Name = 'MooTools Core';
Affinity.Components.MooTools.File = 'MooTools-Core-1.6.0.js';
Affinity.Components.MooTools.Jira = '';

Affinity.Components.MoreTools = {};
Affinity.Components.MoreTools.Version = '1.6.0';
Affinity.Components.MoreTools.Name = 'MooTools More';
Affinity.Components.MoreTools.File = 'MooTools-More-1.6.0.js';
Affinity.Components.MoreTools.Jira = '';

/**   OVERRIDE MISSING CONSOLE   *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

if (typeof console === "undefined") { console = { log: function () { } }; }

/**   CHECK FOR MOOTOOLS         *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

if (typeof MooTools === "undefined") {
    throw new ReferenceError('This site requires MooTools 1.6.0 and MooTools.More 1.6.0');
}

/**   SET USER AGENT             *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

var doc = document.documentElement;
doc.setAttribute('data-useragent', navigator.userAgent);

/*************************************************************************************************************************/
/**                            *******************************************************************************************/
/**   MOUSE / TOUCH EVENTS     *******************************************************************************************/
/**                            *******************************************************************************************/
/*************************************************************************************************************************/
/**                                                                                                                     **/
/**   These values get overridden by values in the touch.js script which should be included in the cassette bundles     **/
/**   when a mobile (touch) device is detected. See _Layout.cshtm. See docs on page setup.                              **/
/**                                                                                                                     **/
/*************************************************************************************************************************/

if (!('events' in Affinity)) { Affinity.events = {}; }
Affinity.mobile = false;
Affinity.events = {
    over: 'mouseover',
    out: 'mouseout',
    overAll: 'mouseenter',
    outAll: 'mouseleave',
    start: 'mousedown',
    move: 'mousemove',
    end: 'mouseup',
    click: 'click'
};

/*************************************************************************************************************************/
/**                            *******************************************************************************************/
/**   ICONS FROM ICON FONT     *******************************************************************************************/
/**                            *******************************************************************************************/
/*************************************************************************************************************************/

Affinity.icons = {
    AddToList: '&#xe096;',
    Air: '&#xe047;',
    Alarm: '&#xe855;',
    AlarmAdd: '&#xe856;',
    Archive: '&#xe0a2;',
    ArrowDown: '&#xe0c0;',
    ArrowDownCircle: '&#xe0c8;',
    ArrowDownSmall: '&#xe0c4;',
    ArrowLeft: '&#xe0bf;',
    ArrowLeftCircle: '&#xe0c7;',
    ArrowLeftSmall: '&#xe0c3;',
    ArrowLineBigDown: '&#xe0d8;',
    ArrowLineBigLeft: '&#xe0d7;',
    ArrowLineBigRight: '&#xe0da;',
    ArrowLineBigUp: '&#xe0d9;',
    ArrowLineDown: '&#xe0d0;',
    ArrowLineLeft: '&#xe0cf;',
    ArrowLineRight: '&#xe0d2;',
    ArrowLineSmallDown: '&#xe0d4;',
    ArrowLineSmallLeft: '&#xe0d3;',
    ArrowLineSmallRight: '&#xe0d6;',
    ArrowLineSmallUp: '&#xe0d5;',
    ArrowLineUp: '&#xe0d1;',
    ArrowLongDown: '&#xe0dc;',
    ArrowLongLeft: '&#xe0db;',
    ArrowLongRight: '&#xe0de;',
    ArrowLongUp: '&#xe0dd;',
    ArrowRight: '&#xe0c2;',
    ArrowRightCircle: '&#xe0ca;',
    ArrowRightSmall: '&#xe0c6;',
    ArrowUp: '&#xe0c1;',
    ArrowUpCircle: '&#xe0c9;',
    ArrowUpSmall: '&#xe0c5;',
    ArrowheadDown: '&#xe0cc;',
    ArrowheadLeft: '&#xe0cb;',
    ArrowheadRight: '&#xe0ce;',
    ArrowheadUp: '&#xe0cd;',
    ArrowheadUpDown: '&#xe0df;',
    Back: '&#xe093;',
    Bag: '&#xe03b;',
    Barcode: '&#xe0fc;',
    Battery: '&#xe04d;',
    Bell: '&#xe029;',
    Blocked: '&#xe084;',
    Book: '&#xe039;',
    Book2: '&#xe0ac;',
    Bookmark: '&#xe0aa;',
    Bookmarks: '&#xe0ab;',
    Box: '&#xe06a;',
    Braces: '&#xe104;',
    Briefcase: '&#xe046;',
    Brightness: '&#xe060;',
    BrogressThird: '&#xe05c;',
    Browser: '&#xe058;',
    Brush: '&#xe053;',
    Bucket: '&#xe04e;',
    BulletList: '&#xe095;',
    Calendar: '&#xe041;',
    Camera: '&#xe030;',
    Cancel: '&#xe083;',
    Car: '&#xe909;',
    Cart: '&#xe069;',
    Cc: '&#xe0e3;',
    CcBy: '&#xe0e4;',
    CcNc: '&#xe0e5;',
    CcNcEu: '&#xe0e6;',
    CcNcJp: '&#xe0e7;',
    CcNd: '&#xe0e9;',
    CcPd: '&#xe0ea;',
    CcSa: '&#xe0e8;',
    CcShare: '&#xe0ec;',
    CcShare3: '&#xe0ed;',
    CcZero: '&#xe0eb;',
    Ccw: '&#xe08c;',
    Cd: '&#xe045;',
    Chat: '&#xe021;',
    Clipboard: '&#xe068;',
    Clock: '&#xe03f;',
    Cloud: '&#xe0a8;',
    Code: '&#xe061;',
    CodeA: '&#xe0ee;',
    CodeD: '&#xe0f0;',
    CodeH: '&#xe0ef;',
    CodeM: '&#xe10e;',
    CodeP: '&#xe10f;',
    CodeR: '&#xe0f1;',
    CodeS: '&#xe0f2;',
    Cog: '&#xe02c;',
    Comment: '&#xe022;',
    Compare: '&#xe103;',
    Compass: '&#xe016;',
    Cone: '&#xe055;',
    CreditCard: '&#xe065;',
    Cross: '&#xe07a;',
    CrossRound: '&#xe080;',
    CrossSquare: '&#xe07d;',
    Csharp: '&#xe0ff;',
    Cup: '&#xe051;',
    Cw: '&#xe08b;',
    Cycle: '&#xe08a;',
    Database: '&#xe066;',
    Directions: '&#xe005;',
    Docs: '&#xe09c;',
    DollarRound: '&#xe0fe;',
    Dot: '&#xe0e2;',
    Dots: '&#xe0e1;',
    DotsVert: '&#xe000;',
    Download: '&#xe0a5;',
    Drive: '&#xe050;',
    Droplet: '&#xe044;',
    Droplets: '&#xe06f;',
    Earth: '&#xe056;',
    Education: '&#xe038;',
    Eightball: '&#xe901;',
    Ellipsis: '&#xe0e0;',
    EmptyInbox: '&#xe00b;',
    Export: '&#xe013;',
    Extension: '&#xe87b;',
    Eye: '&#xe03e;',
    Feather: '&#xe009;',
    FieldEdit: '&#xe001;',
    FileExcel: '&#xe908;',
    FilePdf: '&#xe902;',
    FileWord: '&#xe907;',
    First: '&#xe0b3;',
    Flag: '&#xe02b;',
    Flashlight: '&#xe027;',
    FlowBranch: '&#xe0bb;',
    FlowCascade: '&#xe0ba;',
    FlowLine: '&#xe0bd;',
    FlowParallel: '&#xe0be;',
    FlowTree: '&#xe0bc;',
    Folder: '&#xe0a1;',
    Forward: '&#xe00e;',
    Gauge: '&#xe049;',
    Ghost: '&#xe0fa;',
    Gift: '&#xe105;',
    GraphBars: '&#xe073;',
    GraphLinefill: '&#xe074;',
    GraphPie: '&#xe072;',
    GraphStatistics: '&#xe071;',
    Grid: '&#xe070;',
    HeartEmpty: '&#xe01c;',
    HeartFull: '&#xe01b;',
    HelpRound: '&#xe088;',
    History: '&#xe092;',
    Hourglass: '&#xe048;',
    House: '&#xe024;',
    Incident: '&#xe548;',
    Infinity: '&#xe063;',
    Info: '&#xe085;',
    InfoRound: '&#xe086;',
    Install: '&#xe0a7;',
    Key: '&#xe04c;',
    Keyboard: '&#xe057;',
    Kiwi: '&#xe102;',
    Lab: '&#xe903;',
    Landscape: '&#xe09d;',
    Language: '&#xe04a;',
    Last: '&#xe0b4;',
    Layout: '&#xe097;',
    Leaf: '&#xe034;',
    LifeRing: '&#xe03d;',
    LightBulb: '&#xe064;',
    Lightning: '&#xe042;',
    Link: '&#xe02a;',
    List: '&#xe098;',
    Location: '&#xe014;',
    LocationArrow: '&#xe017;',
    Lock: '&#xe075;',
    LockApproved: '&#xe90c;',
    LockDeclined: '&#xe90d;',
    LockOpen: '&#xe90a;',
    LockPaid: '&#xe90e;',
    LockSubmitted: '&#xe90b;',
    Login: '&#xe078;',
    Logout: '&#xe077;',
    Loop: '&#xe091;',
    Magnet: '&#xe04f;',
    Mail: '&#xe006;',
    Map: '&#xe015;',
    Megaphone: '&#xe031;',
    Microphone: '&#xe040;',
    Minus: '&#xe081;',
    MinusRound: '&#xe07e;',
    MinusSquare: '&#xe07b;',
    Mobile: '&#xe003;',
    Moneybag: '&#xe0fd;',
    Moon: '&#xe032;',
    MoreLeft: '&#xe10a;',
    MoreRight: '&#xe10d;',
    Mouse: '&#xe004;',
    Music: '&#xe036;',
    MusicSemi: '&#xe035;',
    MusicSquare: '&#xe0a0;',
    Mute: '&#xe0b9;',
    Network: '&#xe04b;',
    New: '&#xe037;',
    Newspaper: '&#xe03a;',
    Next: '&#xe0b1;',
    Page: '&#xe099;',
    PageEmpty: '&#xe09b;',
    PageFull: '&#xe09a;',
    Palette: '&#xe033;',
    Paperclip: '&#xe00a;',
    Paperplane: '&#xe007;',
    Pause: '&#xe0ae;',
    Pencil: '&#xe008;',
    Phone: '&#xe002;',
    Pictures: '&#xe09e;',
    Pin: '&#xe904;',
    Plane: '&#xe03c;',
    Play: '&#xe0ad;',
    Plugin: '&#xe905;',
    Plus: '&#xe082;',
    PlusRound: '&#xe07f;',
    PlusSquare: '&#xe07c;',
    Poop: '&#xe101;',
    Popup: '&#xe025;',
    Previous: '&#xe0b2;',
    Printer: '&#xe028;',
    ProgressEmpty: '&#xe05d;',
    ProgressFull: '&#xe05a;',
    ProgressHalf: '&#xe05b;',
    Prompt: '&#xe109;',
    PromptAlert: '&#xe10c;',
    PromptInfo: '&#xe10b;',
    Publish: '&#xe059;',
    Qrcode: '&#xe0fb;',
    Question: '&#xe087;',
    Quote: '&#xe023;',
    Record: '&#xe0af;',
    Repeat: '&#xe090;',
    Reply: '&#xe00c;',
    ReplyAll: '&#xe00d;',
    ResizeEnlarge: '&#xe0b5;',
    ResizeShrink: '&#xe0b6;',
    Return: '&#xe08f;',
    ReturnBack: '&#xe08e;',
    Rocket: '&#xe052;',
    Rss: '&#xe06c;',
    Save: '&#xe0a6;',
    Scaledown: '&#xe107;',
    Scaleup: '&#xe108;',
    Schedule: '&#xe900;',
    Screen: '&#xe062;',
    Search: '&#xe026;',
    Sharable: '&#xe01a;',
    Share: '&#xe019;',
    Shield: '&#xe906;',
    Shuffle: '&#xe08d;',
    Sound: '&#xe0b8;',
    StarEmpty: '&#xe01e;',
    StarFull: '&#xe01d;',
    Stop: '&#xe0b0;',
    Suitcase: '&#xe054;',
    Sun: '&#xe05f;',
    SunSmall: '&#xe05e;',
    Switch: '&#xe094;',
    Sync: '&#xe100;',
    Tag: '&#xe02f;',
    Target: '&#xe018;',
    Thermometer: '&#xe06e;',
    ThumbsDown: '&#xe020;',
    ThumbsUp: '&#xe01f;',
    Thunder: '&#xe043;',
    Tick: '&#xe079;',
    Ticket: '&#xe06b;',
    Tools: '&#xe02d;',
    Traffic: '&#xe565;',
    Trash: '&#xe0a3;',
    Trophy: '&#xe02e;',
    Upload: '&#xe0a4;',
    Upload2: '&#xe0a9;',
    User: '&#xe0f3;',
    UserAdd: '&#xe0f5;',
    UserAddOld: '&#xe011;',
    UserBlock: '&#xe0f7;',
    UserBoss: '&#xe0f8;',
    UserCheck: '&#xe18a;',
    UserCheckOutline: '&#xe18b;',
    UserDel: '&#xe0f6;',
    UserOld: '&#xe00f;',
    Users: '&#xe0f4;',
    UsersOld: '&#xe010;',
    Vcard: '&#xe012;',
    Video: '&#xe09f;',
    Voicemail: '&#xe067;',
    Volume: '&#xe0b7;',
    Warning: '&#xe089;',
    Wireless: '&#xe06d;',
    Wrench: '&#xe0f9;',
    Zzz: '&#xe106;'
};

/*************************************************************************************************************************/
/**                            *******************************************************************************************/
/**   AFFINITY COLORS          *******************************************************************************************/
/**                            *******************************************************************************************/
/*************************************************************************************************************************/

Affinity.colors = {
    green: '#7abd2d',
    blue: '#44b5ec',
    lightblue: '#e3eef3',
    orange: '#ff6600',
    yellow: '#ffbd00',
    red: '#ff0000',
    grey: '#888888'
};

/**   GET ICON                   *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

Affinity.icons.getIcon = function (str, defaultStr) {
    if (str && str in Affinity.icons) {
        return Affinity.icons[str];
    }
    if (str) {
        str = str.replace('icon', '').trim().camelCase();
        if (str in Affinity.icons) {
            return Affinity.icons[str];
        }
    }
    if (defaultStr && defaultStr in Affinity.icons) {
        return Affinity.icons[defaultStr];
    }
    return '';
};

/*************************************************************************************************************************/
/**                            *******************************************************************************************/
/**   GLOABL CONFIG SETTINGS   *******************************************************************************************/
/**                            *******************************************************************************************/
/*************************************************************************************************************************/

Affinity.appname = 'none';
Affinity.apiversion = 2;
Affinity.urlroot = '';
Affinity.authroot = '';
Affinity.zelosroot = '';
Affinity.lookupapi = '';

Affinity.uisession = String.uniqueID();
Affinity.uiready = false;
Affinity.login = null;
Affinity.datalist = false;
Affinity.loaders = {};
Affinity.loaders.blueico = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIGZvY3VzYWJsZT0iZmFsc2UiIGNsYXNzPSJibHVlLWljby1sb2FkZXIiIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0iIzQ0YjVlYyIgYXJpYS1oaWRkZW49InRydWUiIGRhdGEtdi00NmJlZGQ3Yz0iIj48cGF0aCBkPSJNNTEyIDEwMjRjLTY5LjEgMC0xMzYuMi0xMy41LTE5OS4zLTQwLjJDMjUxLjcgOTU4IDE5NyA5MjEgMTUwIDg3NGMtNDctNDctODQtMTAxLjctMTA5LjgtMTYyLjdDMTMuNSA2NDguMiAwIDU4MS4xIDAgNTEyYzAtMTkuOSAxNi4xLTM2IDM2LTM2czM2IDE2LjEgMzYgMzZjMCA1OS40IDExLjYgMTE3IDM0LjYgMTcxLjMgMjIuMiA1Mi40IDUzLjkgOTkuNSA5NC4zIDEzOS45IDQwLjQgNDAuNCA4Ny41IDcyLjIgMTM5LjkgOTQuM0MzOTUgOTQwLjQgNDUyLjYgOTUyIDUxMiA5NTJjNTkuNCAwIDExNy0xMS42IDE3MS4zLTM0LjYgNTIuNC0yMi4yIDk5LjUtNTMuOSAxMzkuOS05NC4zIDQwLjQtNDAuNCA3Mi4yLTg3LjUgOTQuMy0xMzkuOUM5NDAuNCA2MjkgOTUyIDU3MS40IDk1MiA1MTJjMC01OS40LTExLjYtMTE3LTM0LjYtMTcxLjNhNDQwLjQ1IDQ0MC40NSAwIDAwLTk0LjMtMTM5LjkgNDM3LjcxIDQzNy43MSAwIDAwLTEzOS45LTk0LjNDNjI5IDgzLjYgNTcxLjQgNzIgNTEyIDcyYy0xOS45IDAtMzYtMTYuMS0zNi0zNnMxNi4xLTM2IDM2LTM2YzY5LjEgMCAxMzYuMiAxMy41IDE5OS4zIDQwLjJDNzcyLjMgNjYgODI3IDEwMyA4NzQgMTUwYzQ3IDQ3IDgzLjkgMTAxLjggMTA5LjcgMTYyLjcgMjYuNyA2My4xIDQwLjIgMTMwLjIgNDAuMiAxOTkuM3MtMTMuNSAxMzYuMi00MC4yIDE5OS4zQzk1OCA3NzIuMyA5MjEgODI3IDg3NCA4NzRjLTQ3IDQ3LTEwMS44IDgzLjktMTYyLjcgMTA5LjctNjMuMSAyNi44LTEzMC4yIDQwLjMtMTk5LjMgNDAuM3oiLz48L3N2Zz4=";
Affinity.loaders.dark = 'data:image/gif;base64,R0lGODlhEAAQAPQAADMzM8zMzDs7O3h4eERERKGhoYKCgszMzJaWlra2tmNjY1lZWb+/v21tbcjIyKqqqoyMjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFdyAgAgIJIeWoAkRCCMdBkKtIHIngyMKsErPBYbADpkSCwhDmQCBethRB6Vj4kFCkQPG4IlWDgrNRIwnO4UKBXDufzQvDMaoSDBgFb886MiQadgNABAokfCwzBA8LCg0Egl8jAggGAA1kBIA1BAYzlyILczULC2UhACH5BAkKAAAALAAAAAAQABAAAAV2ICACAmlAZTmOREEIyUEQjLKKxPHADhEvqxlgcGgkGI1DYSVAIAWMx+lwSKkICJ0QsHi9RgKBwnVTiRQQgwF4I4UFDQQEwi6/3YSGWRRmjhEETAJfIgMFCnAKM0KDV4EEEAQLiF18TAYNXDaSe3x6mjidN1s3IQAh+QQJCgAAACwAAAAAEAAQAAAFeCAgAgLZDGU5jgRECEUiCI+yioSDwDJyLKsXoHFQxBSHAoAAFBhqtMJg8DgQBgfrEsJAEAg4YhZIEiwgKtHiMBgtpg3wbUZXGO7kOb1MUKRFMysCChAoggJCIg0GC2aNe4gqQldfL4l/Ag1AXySJgn5LcoE3QXI3IQAh+QQJCgAAACwAAAAAEAAQAAAFdiAgAgLZNGU5joQhCEjxIssqEo8bC9BRjy9Ag7GILQ4QEoE0gBAEBcOpcBA0DoxSK/e8LRIHn+i1cK0IyKdg0VAoljYIg+GgnRrwVS/8IAkICyosBIQpBAMoKy9dImxPhS+GKkFrkX+TigtLlIyKXUF+NjagNiEAIfkECQoAAAAsAAAAABAAEAAABWwgIAICaRhlOY4EIgjH8R7LKhKHGwsMvb4AAy3WODBIBBKCsYA9TjuhDNDKEVSERezQEL0WrhXucRUQGuik7bFlngzqVW9LMl9XWvLdjFaJtDFqZ1cEZUB0dUgvL3dgP4WJZn4jkomWNpSTIyEAIfkECQoAAAAsAAAAABAAEAAABX4gIAICuSxlOY6CIgiD8RrEKgqGOwxwUrMlAoSwIzAGpJpgoSDAGifDY5kopBYDlEpAQBwevxfBtRIUGi8xwWkDNBCIwmC9Vq0aiQQDQuK+VgQPDXV9hCJjBwcFYU5pLwwHXQcMKSmNLQcIAExlbH8JBwttaX0ABAcNbWVbKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICSRBlOY7CIghN8zbEKsKoIjdFzZaEgUBHKChMJtRwcWpAWoWnifm6ESAMhO8lQK0EEAV3rFopIBCEcGwDKAqPh4HUrY4ICHH1dSoTFgcHUiZjBhAJB2AHDykpKAwHAwdzf19KkASIPl9cDgcnDkdtNwiMJCshACH5BAkKAAAALAAAAAAQABAAAAV3ICACAkkQZTmOAiosiyAoxCq+KPxCNVsSMRgBsiClWrLTSWFoIQZHl6pleBh6suxKMIhlvzbAwkBWfFWrBQTxNLq2RG2yhSUkDs2b63AYDAoJXAcFRwADeAkJDX0AQCsEfAQMDAIPBz0rCgcxky0JRWE1AmwpKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICKZzkqJ4nQZxLqZKv4NqNLKK2/Q4Ek4lFXChsg5ypJjs1II3gEDUSRInEGYAw6B6zM4JhrDAtEosVkLUtHA7RHaHAGJQEjsODcEg0FBAFVgkQJQ1pAwcDDw8KcFtSInwJAowCCA6RIwqZAgkPNgVpWndjdyohACH5BAkKAAAALAAAAAAQABAAAAV5ICACAimc5KieLEuUKvm2xAKLqDCfC2GaO9eL0LABWTiBYmA06W6kHgvCqEJiAIJiu3gcvgUsscHUERm+kaCxyxa+zRPk0SgJEgfIvbAdIAQLCAYlCj4DBw0IBQsMCjIqBAcPAooCBg9pKgsJLwUFOhCZKyQDA3YqIQAh+QQJCgAAACwAAAAAEAAQAAAFdSAgAgIpnOSonmxbqiThCrJKEHFbo8JxDDOZYFFb+A41E4H4OhkOipXwBElYITDAckFEOBgMQ3arkMkUBdxIUGZpEb7kaQBRlASPg0FQQHAbEEMGDSVEAA1QBhAED1E0NgwFAooCDWljaQIQCE5qMHcNhCkjIQAh+QQJCgAAACwAAAAAEAAQAAAFeSAgAgIpnOSoLgxxvqgKLEcCC65KEAByKK8cSpA4DAiHQ/DkKhGKh4ZCtCyZGo6F6iYYPAqFgYy02xkSaLEMV34tELyRYNEsCQyHlvWkGCzsPgMCEAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA==';
Affinity.loaders.light = 'data:image/gif;base64,R0lGODlhEAAQAPQAAP///zMzM/Ly8qGhoebm5mpqapSUlDMzM3l5eU9PT7y8vMrKykJCQq+vrzY2Nl5eXoaGhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFdyAgAgIJIeWoAkRCCMdBkKtIHIngyMKsErPBYbADpkSCwhDmQCBethRB6Vj4kFCkQPG4IlWDgrNRIwnO4UKBXDufzQvDMaoSDBgFb886MiQadgNABAokfCwzBA8LCg0Egl8jAggGAA1kBIA1BAYzlyILczULC2UhACH5BAkKAAAALAAAAAAQABAAAAV2ICACAmlAZTmOREEIyUEQjLKKxPHADhEvqxlgcGgkGI1DYSVAIAWMx+lwSKkICJ0QsHi9RgKBwnVTiRQQgwF4I4UFDQQEwi6/3YSGWRRmjhEETAJfIgMFCnAKM0KDV4EEEAQLiF18TAYNXDaSe3x6mjidN1s3IQAh+QQJCgAAACwAAAAAEAAQAAAFeCAgAgLZDGU5jgRECEUiCI+yioSDwDJyLKsXoHFQxBSHAoAAFBhqtMJg8DgQBgfrEsJAEAg4YhZIEiwgKtHiMBgtpg3wbUZXGO7kOb1MUKRFMysCChAoggJCIg0GC2aNe4gqQldfL4l/Ag1AXySJgn5LcoE3QXI3IQAh+QQJCgAAACwAAAAAEAAQAAAFdiAgAgLZNGU5joQhCEjxIssqEo8bC9BRjy9Ag7GILQ4QEoE0gBAEBcOpcBA0DoxSK/e8LRIHn+i1cK0IyKdg0VAoljYIg+GgnRrwVS/8IAkICyosBIQpBAMoKy9dImxPhS+GKkFrkX+TigtLlIyKXUF+NjagNiEAIfkECQoAAAAsAAAAABAAEAAABWwgIAICaRhlOY4EIgjH8R7LKhKHGwsMvb4AAy3WODBIBBKCsYA9TjuhDNDKEVSERezQEL0WrhXucRUQGuik7bFlngzqVW9LMl9XWvLdjFaJtDFqZ1cEZUB0dUgvL3dgP4WJZn4jkomWNpSTIyEAIfkECQoAAAAsAAAAABAAEAAABX4gIAICuSxlOY6CIgiD8RrEKgqGOwxwUrMlAoSwIzAGpJpgoSDAGifDY5kopBYDlEpAQBwevxfBtRIUGi8xwWkDNBCIwmC9Vq0aiQQDQuK+VgQPDXV9hCJjBwcFYU5pLwwHXQcMKSmNLQcIAExlbH8JBwttaX0ABAcNbWVbKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICSRBlOY7CIghN8zbEKsKoIjdFzZaEgUBHKChMJtRwcWpAWoWnifm6ESAMhO8lQK0EEAV3rFopIBCEcGwDKAqPh4HUrY4ICHH1dSoTFgcHUiZjBhAJB2AHDykpKAwHAwdzf19KkASIPl9cDgcnDkdtNwiMJCshACH5BAkKAAAALAAAAAAQABAAAAV3ICACAkkQZTmOAiosiyAoxCq+KPxCNVsSMRgBsiClWrLTSWFoIQZHl6pleBh6suxKMIhlvzbAwkBWfFWrBQTxNLq2RG2yhSUkDs2b63AYDAoJXAcFRwADeAkJDX0AQCsEfAQMDAIPBz0rCgcxky0JRWE1AmwpKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICKZzkqJ4nQZxLqZKv4NqNLKK2/Q4Ek4lFXChsg5ypJjs1II3gEDUSRInEGYAw6B6zM4JhrDAtEosVkLUtHA7RHaHAGJQEjsODcEg0FBAFVgkQJQ1pAwcDDw8KcFtSInwJAowCCA6RIwqZAgkPNgVpWndjdyohACH5BAkKAAAALAAAAAAQABAAAAV5ICACAimc5KieLEuUKvm2xAKLqDCfC2GaO9eL0LABWTiBYmA06W6kHgvCqEJiAIJiu3gcvgUsscHUERm+kaCxyxa+zRPk0SgJEgfIvbAdIAQLCAYlCj4DBw0IBQsMCjIqBAcPAooCBg9pKgsJLwUFOhCZKyQDA3YqIQAh+QQJCgAAACwAAAAAEAAQAAAFdSAgAgIpnOSonmxbqiThCrJKEHFbo8JxDDOZYFFb+A41E4H4OhkOipXwBElYITDAckFEOBgMQ3arkMkUBdxIUGZpEb7kaQBRlASPg0FQQHAbEEMGDSVEAA1QBhAED1E0NgwFAooCDWljaQIQCE5qMHcNhCkjIQAh+QQJCgAAACwAAAAAEAAQAAAFeSAgAgIpnOSoLgxxvqgKLEcCC65KEAByKK8cSpA4DAiHQ/DkKhGKh4ZCtCyZGo6F6iYYPAqFgYy02xkSaLEMV34tELyRYNEsCQyHlvWkGCzsPgMCEAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA==';
Affinity.loaders.blue = 'data:image/gif;base64,R0lGODlhEAAQAPQAAJrS7v///5/U7sfm9aXX7+Lx+c3o9v///9vu+O/3+7rg87Pd8vb6/MDi9Pz9/ej0+tXr9wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFdyAgAgIJIeWoAkRCCMdBkKtIHIngyMKsErPBYbADpkSCwhDmQCBethRB6Vj4kFCkQPG4IlWDgrNRIwnO4UKBXDufzQvDMaoSDBgFb886MiQadgNABAokfCwzBA8LCg0Egl8jAggGAA1kBIA1BAYzlyILczULC2UhACH5BAkKAAAALAAAAAAQABAAAAV2ICACAmlAZTmOREEIyUEQjLKKxPHADhEvqxlgcGgkGI1DYSVAIAWMx+lwSKkICJ0QsHi9RgKBwnVTiRQQgwF4I4UFDQQEwi6/3YSGWRRmjhEETAJfIgMFCnAKM0KDV4EEEAQLiF18TAYNXDaSe3x6mjidN1s3IQAh+QQJCgAAACwAAAAAEAAQAAAFeCAgAgLZDGU5jgRECEUiCI+yioSDwDJyLKsXoHFQxBSHAoAAFBhqtMJg8DgQBgfrEsJAEAg4YhZIEiwgKtHiMBgtpg3wbUZXGO7kOb1MUKRFMysCChAoggJCIg0GC2aNe4gqQldfL4l/Ag1AXySJgn5LcoE3QXI3IQAh+QQJCgAAACwAAAAAEAAQAAAFdiAgAgLZNGU5joQhCEjxIssqEo8bC9BRjy9Ag7GILQ4QEoE0gBAEBcOpcBA0DoxSK/e8LRIHn+i1cK0IyKdg0VAoljYIg+GgnRrwVS/8IAkICyosBIQpBAMoKy9dImxPhS+GKkFrkX+TigtLlIyKXUF+NjagNiEAIfkECQoAAAAsAAAAABAAEAAABWwgIAICaRhlOY4EIgjH8R7LKhKHGwsMvb4AAy3WODBIBBKCsYA9TjuhDNDKEVSERezQEL0WrhXucRUQGuik7bFlngzqVW9LMl9XWvLdjFaJtDFqZ1cEZUB0dUgvL3dgP4WJZn4jkomWNpSTIyEAIfkECQoAAAAsAAAAABAAEAAABX4gIAICuSxlOY6CIgiD8RrEKgqGOwxwUrMlAoSwIzAGpJpgoSDAGifDY5kopBYDlEpAQBwevxfBtRIUGi8xwWkDNBCIwmC9Vq0aiQQDQuK+VgQPDXV9hCJjBwcFYU5pLwwHXQcMKSmNLQcIAExlbH8JBwttaX0ABAcNbWVbKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICSRBlOY7CIghN8zbEKsKoIjdFzZaEgUBHKChMJtRwcWpAWoWnifm6ESAMhO8lQK0EEAV3rFopIBCEcGwDKAqPh4HUrY4ICHH1dSoTFgcHUiZjBhAJB2AHDykpKAwHAwdzf19KkASIPl9cDgcnDkdtNwiMJCshACH5BAkKAAAALAAAAAAQABAAAAV3ICACAkkQZTmOAiosiyAoxCq+KPxCNVsSMRgBsiClWrLTSWFoIQZHl6pleBh6suxKMIhlvzbAwkBWfFWrBQTxNLq2RG2yhSUkDs2b63AYDAoJXAcFRwADeAkJDX0AQCsEfAQMDAIPBz0rCgcxky0JRWE1AmwpKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICKZzkqJ4nQZxLqZKv4NqNLKK2/Q4Ek4lFXChsg5ypJjs1II3gEDUSRInEGYAw6B6zM4JhrDAtEosVkLUtHA7RHaHAGJQEjsODcEg0FBAFVgkQJQ1pAwcDDw8KcFtSInwJAowCCA6RIwqZAgkPNgVpWndjdyohACH5BAkKAAAALAAAAAAQABAAAAV5ICACAimc5KieLEuUKvm2xAKLqDCfC2GaO9eL0LABWTiBYmA06W6kHgvCqEJiAIJiu3gcvgUsscHUERm+kaCxyxa+zRPk0SgJEgfIvbAdIAQLCAYlCj4DBw0IBQsMCjIqBAcPAooCBg9pKgsJLwUFOhCZKyQDA3YqIQAh+QQJCgAAACwAAAAAEAAQAAAFdSAgAgIpnOSonmxbqiThCrJKEHFbo8JxDDOZYFFb+A41E4H4OhkOipXwBElYITDAckFEOBgMQ3arkMkUBdxIUGZpEb7kaQBRlASPg0FQQHAbEEMGDSVEAA1QBhAED1E0NgwFAooCDWljaQIQCE5qMHcNhCkjIQAh+QQJCgAAACwAAAAAEAAQAAAFeSAgAgIpnOSoLgxxvqgKLEcCC65KEAByKK8cSpA4DAiHQ/DkKhGKh4ZCtCyZGo6F6iYYPAqFgYy02xkSaLEMV34tELyRYNEsCQyHlvWkGCzsPgMCEAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA==';
Affinity.loaders.large = {};
Affinity.loaders.large.light = 'data:image/gif;base64,R0lGODlhIAAgAPMAAO/v7wAAALq6unx8fKurq5CQkDIyMlBQUMvLy9bW1rCwsBwcHAMDAwAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAIAAgAAAE5xDISWlhperN52JLhSSdRgwVo1ICQZRUsiwHpTJT4iowNS8vyW2icCF6k8HMMBkCEDskxTBDAZwuAkkqIfxIQyhBQBFvAQSDITM5VDW6XNE4KagNh6Bgwe60smQUB3d4Rz1ZBApnFASDd0hihh12BkE9kjAJVlycXIg7CQIFA6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YJvpJivxNaGmLHT0VnOgSYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ/V/nmOM82XiHRLYKhKP1oZmADdEAAAh+QQJCgAAACwAAAAAIAAgAAAE6hDISWlZpOrNp1lGNRSdRpDUolIGw5RUYhhHukqFu8DsrEyqnWThGvAmhVlteBvojpTDDBUEIFwMFBRAmBkSgOrBFZogCASwBDEY/CZSg7GSE0gSCjQBMVG023xWBhklAnoEdhQEfyNqMIcKjhRsjEdnezB+A4k8gTwJhFuiW4dokXiloUepBAp5qaKpp6+Ho7aWW54wl7obvEe0kRuoplCGepwSx2jJvqHEmGt6whJpGpfJCHmOoNHKaHx61WiSR92E4lbFoq+B6QDtuetcaBPnW6+O7wDHpIiK9SaVK5GgV543tzjgGcghAgAh+QQJCgAAACwAAAAAIAAgAAAE7hDISSkxpOrN5zFHNWRdhSiVoVLHspRUMoyUakyEe8PTPCATW9A14E0UvuAKMNAZKYUZCiBMuBakSQKG8G2FzUWox2AUtAQFcBKlVQoLgQReZhQlCIJesQXI5B0CBnUMOxMCenoCfTCEWBsJColTMANldx15BGs8B5wlCZ9Po6OJkwmRpnqkqnuSrayqfKmqpLajoiW5HJq7FL1Gr2mMMcKUMIiJgIemy7xZtJsTmsM4xHiKv5KMCXqfyUCJEonXPN2rAOIAmsfB3uPoAK++G+w48edZPK+M6hLJpQg484enXIdQFSS1u6UhksENEQAAIfkECQoAAAAsAAAAACAAIAAABOcQyEmpGKLqzWcZRVUQnZYg1aBSh2GUVEIQ2aQOE+G+cD4ntpWkZQj1JIiZIogDFFyHI0UxQwFugMSOFIPJftfVAEoZLBbcLEFhlQiqGp1Vd140AUklUN3eCA51C1EWMzMCezCBBmkxVIVHBWd3HHl9JQOIJSdSnJ0TDKChCwUJjoWMPaGqDKannasMo6WnM562R5YluZRwur0wpgqZE7NKUm+FNRPIhjBJxKZteWuIBMN4zRMIVIhffcgojwCF117i4nlLnY5ztRLsnOk+aV+oJY7V7m76PdkS4trKcdg0Zc0tTcKkRAAAIfkECQoAAAAsAAAAACAAIAAABO4QyEkpKqjqzScpRaVkXZWQEximw1BSCUEIlDohrft6cpKCk5xid5MNJTaAIkekKGQkWyKHkvhKsR7ARmitkAYDYRIbUQRQjWBwJRzChi9CRlBcY1UN4g0/VNB0AlcvcAYHRyZPdEQFYV8ccwR5HWxEJ02YmRMLnJ1xCYp0Y5idpQuhopmmC2KgojKasUQDk5BNAwwMOh2RtRq5uQuPZKGIJQIGwAwGf6I0JXMpC8C7kXWDBINFMxS4DKMAWVWAGYsAdNqW5uaRxkSKJOZKaU3tPOBZ4DuK2LATgJhkPJMgTwKCdFjyPHEnKxFCDhEAACH5BAkKAAAALAAAAAAgACAAAATzEMhJaVKp6s2nIkolIJ2WkBShpkVRWqqQrhLSEu9MZJKK9y1ZrqYK9WiClmvoUaF8gIQSNeF1Er4MNFn4SRSDARWroAIETg1iVwuHjYB1kYc1mwruwXKC9gmsJXliGxc+XiUCby9ydh1sOSdMkpMTBpaXBzsfhoc5l58Gm5yToAaZhaOUqjkDgCWNHAULCwOLaTmzswadEqggQwgHuQsHIoZCHQMMQgQGubVEcxOPFAcMDAYUA85eWARmfSRQCdcMe0zeP1AAygwLlJtPNAAL19DARdPzBOWSm1brJBi45soRAWQAAkrQIykShQ9wVhHCwCQCACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiRMDjI0Fd30/iI2UA5GSS5UDj2l6NoqgOgN4gksEBgYFf0FDqKgHnyZ9OX8HrgYHdHpcHQULXAS2qKpENRg7eAMLC7kTBaixUYFkKAzWAAnLC7FLVxLWDBLKCwaKTULgEwbLA4hJtOkSBNqITT3xEgfLpBtzE/jiuL04RGEBgwWhShRgQExHBAAh+QQJCgAAACwAAAAAIAAgAAAE7xDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfZiCqGk5dTESJeaOAlClzsJsqwiJwiqnFrb2nS9kmIcgEsjQydLiIlHehhpejaIjzh9eomSjZR+ipslWIRLAgMDOR2DOqKogTB9pCUJBagDBXR6XB0EBkIIsaRsGGMMAxoDBgYHTKJiUYEGDAzHC9EACcUGkIgFzgwZ0QsSBcXHiQvOwgDdEwfFs0sDzt4S6BK4xYjkDOzn0unFeBzOBijIm1Dgmg5YFQwsCMjp1oJ8LyIAACH5BAkKAAAALAAAAAAgACAAAATwEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GGl6NoiPOH16iZKNlH6KmyWFOggHhEEvAwwMA0N9GBsEC6amhnVcEwavDAazGwIDaH1ipaYLBUTCGgQDA8NdHz0FpqgTBwsLqAbWAAnIA4FWKdMLGdYGEgraigbT0OITBcg5QwPT4xLrROZL6AuQAPUS7bxLpoWidY0JtxLHKhwwMJBTHgPKdEQAACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GAULDJCRiXo1CpGXDJOUjY+Yip9DhToJA4RBLwMLCwVDfRgbBAaqqoZ1XBMHswsHtxtFaH1iqaoGNgAIxRpbFAgfPQSqpbgGBqUD1wBXeCYp1AYZ19JJOYgH1KwA4UBvQwXUBxPqVD9L3sbp2BNk2xvvFPJd+MFCN6HAAIKgNggY0KtEBAAh+QQJCgAAACwAAAAAIAAgAAAE6BDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfYIDMaAFdTESJeaEDAIMxYFqrOUaNW4E4ObYcCXaiBVEgULe0NJaxxtYksjh2NLkZISgDgJhHthkpU4mW6blRiYmZOlh4JWkDqILwUGBnE6TYEbCgevr0N1gH4At7gHiRpFaLNrrq8HNgAJA70AWxQIH1+vsYMDAzZQPC9VCNkDWUhGkuE5PxJNwiUK4UfLzOlD4WvzAHaoG9nxPi5d+jYUqfAhhykOFwJWiAAAIfkECQoAAAAsAAAAACAAIAAABPAQyElpUqnqzaciSoVkXVUMFaFSwlpOCcMYlErAavhOMnNLNo8KsZsMZItJEIDIFSkLGQoQTNhIsFehRww2CQLKF0tYGKYSg+ygsZIuNqJksKgbfgIGepNo2cIUB3V1B3IvNiBYNQaDSTtfhhx0CwVPI0UJe0+bm4g5VgcGoqOcnjmjqDSdnhgEoamcsZuXO1aWQy8KAwOAuTYYGwi7w5h+Kr0SJ8MFihpNbx+4Erq7BYBuzsdiH1jCAzoSfl0rVirNbRXlBBlLX+BP0XJLAPGzTkAuAOqb0WT5AH7OcdCm5B8TgRwSRKIHQtaLCwg1RAAAOwAAAAAAAAAAAA==';
Affinity.loaders.large.dark = 'data:image/gif;base64,R0lGODlhIAAgAPMAADMzM////19fX5SUlGxsbIKCgtLS0rm5uVFRUUdHR2dnZ+bm5vr6+gAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAIAAgAAAE5xDISWlhperN52JLhSSdRgwVo1ICQZRUsiwHpTJT4iowNS8vyW2icCF6k8HMMBkCEDskxTBDAZwuAkkqIfxIQyhBQBFvAQSDITM5VDW6XNE4KagNh6Bgwe60smQUB3d4Rz1ZBApnFASDd0hihh12BkE9kjAJVlycXIg7CQIFA6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YJvpJivxNaGmLHT0VnOgSYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ/V/nmOM82XiHRLYKhKP1oZmADdEAAAh+QQJCgAAACwAAAAAIAAgAAAE6hDISWlZpOrNp1lGNRSdRpDUolIGw5RUYhhHukqFu8DsrEyqnWThGvAmhVlteBvojpTDDBUEIFwMFBRAmBkSgOrBFZogCASwBDEY/CZSg7GSE0gSCjQBMVG023xWBhklAnoEdhQEfyNqMIcKjhRsjEdnezB+A4k8gTwJhFuiW4dokXiloUepBAp5qaKpp6+Ho7aWW54wl7obvEe0kRuoplCGepwSx2jJvqHEmGt6whJpGpfJCHmOoNHKaHx61WiSR92E4lbFoq+B6QDtuetcaBPnW6+O7wDHpIiK9SaVK5GgV543tzjgGcghAgAh+QQJCgAAACwAAAAAIAAgAAAE7hDISSkxpOrN5zFHNWRdhSiVoVLHspRUMoyUakyEe8PTPCATW9A14E0UvuAKMNAZKYUZCiBMuBakSQKG8G2FzUWox2AUtAQFcBKlVQoLgQReZhQlCIJesQXI5B0CBnUMOxMCenoCfTCEWBsJColTMANldx15BGs8B5wlCZ9Po6OJkwmRpnqkqnuSrayqfKmqpLajoiW5HJq7FL1Gr2mMMcKUMIiJgIemy7xZtJsTmsM4xHiKv5KMCXqfyUCJEonXPN2rAOIAmsfB3uPoAK++G+w48edZPK+M6hLJpQg484enXIdQFSS1u6UhksENEQAAIfkECQoAAAAsAAAAACAAIAAABOcQyEmpGKLqzWcZRVUQnZYg1aBSh2GUVEIQ2aQOE+G+cD4ntpWkZQj1JIiZIogDFFyHI0UxQwFugMSOFIPJftfVAEoZLBbcLEFhlQiqGp1Vd140AUklUN3eCA51C1EWMzMCezCBBmkxVIVHBWd3HHl9JQOIJSdSnJ0TDKChCwUJjoWMPaGqDKannasMo6WnM562R5YluZRwur0wpgqZE7NKUm+FNRPIhjBJxKZteWuIBMN4zRMIVIhffcgojwCF117i4nlLnY5ztRLsnOk+aV+oJY7V7m76PdkS4trKcdg0Zc0tTcKkRAAAIfkECQoAAAAsAAAAACAAIAAABO4QyEkpKqjqzScpRaVkXZWQEximw1BSCUEIlDohrft6cpKCk5xid5MNJTaAIkekKGQkWyKHkvhKsR7ARmitkAYDYRIbUQRQjWBwJRzChi9CRlBcY1UN4g0/VNB0AlcvcAYHRyZPdEQFYV8ccwR5HWxEJ02YmRMLnJ1xCYp0Y5idpQuhopmmC2KgojKasUQDk5BNAwwMOh2RtRq5uQuPZKGIJQIGwAwGf6I0JXMpC8C7kXWDBINFMxS4DKMAWVWAGYsAdNqW5uaRxkSKJOZKaU3tPOBZ4DuK2LATgJhkPJMgTwKCdFjyPHEnKxFCDhEAACH5BAkKAAAALAAAAAAgACAAAATzEMhJaVKp6s2nIkolIJ2WkBShpkVRWqqQrhLSEu9MZJKK9y1ZrqYK9WiClmvoUaF8gIQSNeF1Er4MNFn4SRSDARWroAIETg1iVwuHjYB1kYc1mwruwXKC9gmsJXliGxc+XiUCby9ydh1sOSdMkpMTBpaXBzsfhoc5l58Gm5yToAaZhaOUqjkDgCWNHAULCwOLaTmzswadEqggQwgHuQsHIoZCHQMMQgQGubVEcxOPFAcMDAYUA85eWARmfSRQCdcMe0zeP1AAygwLlJtPNAAL19DARdPzBOWSm1brJBi45soRAWQAAkrQIykShQ9wVhHCwCQCACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiRMDjI0Fd30/iI2UA5GSS5UDj2l6NoqgOgN4gksEBgYFf0FDqKgHnyZ9OX8HrgYHdHpcHQULXAS2qKpENRg7eAMLC7kTBaixUYFkKAzWAAnLC7FLVxLWDBLKCwaKTULgEwbLA4hJtOkSBNqITT3xEgfLpBtzE/jiuL04RGEBgwWhShRgQExHBAAh+QQJCgAAACwAAAAAIAAgAAAE7xDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfZiCqGk5dTESJeaOAlClzsJsqwiJwiqnFrb2nS9kmIcgEsjQydLiIlHehhpejaIjzh9eomSjZR+ipslWIRLAgMDOR2DOqKogTB9pCUJBagDBXR6XB0EBkIIsaRsGGMMAxoDBgYHTKJiUYEGDAzHC9EACcUGkIgFzgwZ0QsSBcXHiQvOwgDdEwfFs0sDzt4S6BK4xYjkDOzn0unFeBzOBijIm1Dgmg5YFQwsCMjp1oJ8LyIAACH5BAkKAAAALAAAAAAgACAAAATwEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GGl6NoiPOH16iZKNlH6KmyWFOggHhEEvAwwMA0N9GBsEC6amhnVcEwavDAazGwIDaH1ipaYLBUTCGgQDA8NdHz0FpqgTBwsLqAbWAAnIA4FWKdMLGdYGEgraigbT0OITBcg5QwPT4xLrROZL6AuQAPUS7bxLpoWidY0JtxLHKhwwMJBTHgPKdEQAACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GAULDJCRiXo1CpGXDJOUjY+Yip9DhToJA4RBLwMLCwVDfRgbBAaqqoZ1XBMHswsHtxtFaH1iqaoGNgAIxRpbFAgfPQSqpbgGBqUD1wBXeCYp1AYZ19JJOYgH1KwA4UBvQwXUBxPqVD9L3sbp2BNk2xvvFPJd+MFCN6HAAIKgNggY0KtEBAAh+QQJCgAAACwAAAAAIAAgAAAE6BDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfYIDMaAFdTESJeaEDAIMxYFqrOUaNW4E4ObYcCXaiBVEgULe0NJaxxtYksjh2NLkZISgDgJhHthkpU4mW6blRiYmZOlh4JWkDqILwUGBnE6TYEbCgevr0N1gH4At7gHiRpFaLNrrq8HNgAJA70AWxQIH1+vsYMDAzZQPC9VCNkDWUhGkuE5PxJNwiUK4UfLzOlD4WvzAHaoG9nxPi5d+jYUqfAhhykOFwJWiAAAIfkECQoAAAAsAAAAACAAIAAABPAQyElpUqnqzaciSoVkXVUMFaFSwlpOCcMYlErAavhOMnNLNo8KsZsMZItJEIDIFSkLGQoQTNhIsFehRww2CQLKF0tYGKYSg+ygsZIuNqJksKgbfgIGepNo2cIUB3V1B3IvNiBYNQaDSTtfhhx0CwVPI0UJe0+bm4g5VgcGoqOcnjmjqDSdnhgEoamcsZuXO1aWQy8KAwOAuTYYGwi7w5h+Kr0SJ8MFihpNbx+4Erq7BYBuzsdiH1jCAzoSfl0rVirNbRXlBBlLX+BP0XJLAPGzTkAuAOqb0WT5AH7OcdCm5B8TgRwSRKIHQtaLCwg1RAAAOwAAAAAAAAAAAA==';
Affinity.agent = window.navigator.userAgent;
Affinity.oldess = false;
Affinity.oldessLaunched = false;
Affinity.oldessFrame = false;
Affinity.oldessWindow = false;

Affinity.getScrollBarWidth = function () {
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";
    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);
    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;
    document.body.removeChild(outer);
    return (w1 - w2);
};
Affinity.scrollBarSize = 0;
window.addEvent('domready', function () { Affinity.scrollBarSize = Affinity.getScrollBarWidth(); });

Affinity.UI = {};

Affinity.UI.debug = {};

Affinity.UI.lookups = {};
Affinity.UI.lookupLoaders = [];

Affinity.UI.displaylookups = {};
Affinity.UI.displaylookupLoaders = [];

Affinity.UI.dependancies = {};
Affinity.UI.dependancyLoaders = [];


Affinity.UI.autocomplete = {};

Affinity.UI.lastAutoKill = {};
Affinity.UI.delayAutoKill = function (uuid, killid) {
    if (document.getElement('.' + killid)) {
        document.getElement('.' + killid).removeEvents();
        document.getElement('.' + killid).destroy();
    }
    window.Affinity.UI.lastAutoKill[uuid] = null;
    delete window.Affinity.UI.lastAutoKill[uuid];
}

/**   IS DATALIST                *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

var datalistTest = document.createElement('datalist');
if ('options' in datalistTest) {
    Affinity.datalist = true;
}
datalistTest = null;
delete datalistTest;

/**   BARAN ESS CHECK            *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

Affinity.essmessage = '';
(function () {
    window.Affinity.oldess = false;
    var uirObj = new URI(window.location.href);
    var queryObj = typeOf(uriObj.parsed.query) === 'null' ? {} : uriObj.parsed.query.parseQueryString();
    if ('sessionKey' in queryObj || 'isEss' in queryObj) {
        window.Affinity.oldess = true;
        if ('iframe' in queryObj) {
            window.Affinity.oldessLaunched = false;
            window.Affinity.oldessFrame = true;
            window.Affinity.oldessWindow = window.parent;
        }
        if ('external' in queryObj) {
            window.Affinity.oldessLaunched = true;
            window.Affinity.oldessFrame = false;
            window.Affinity.oldessWindow = window.opener;
        }
        if (window.Affinity.oldess && !'external' in queryObj && !'iframe' in queryObj) {
            window.addEvent('UiReady', function () {
                if (window.Affinity.appname === 'cleverforms') {
                    window.Affinity.oldessLaunched = false;
                    window.Affinity.oldessFrame = true;
                    window.Affinity.oldessWindow = window.parent;
                } else {
                    window.Affinity.oldessLaunched = true;
                    window.Affinity.oldessFrame = false;
                    window.Affinity.oldessWindow = window.opener;
                }
            });
        }
    }
});


/**   AUTOSCROLL ON DRAG TO BOTTOM  **************************************************************************************/
/**   ----------------------------  **************************************************************************************/

Affinity.UI.scrolling = false;

Affinity.UI.autoscroll = function (delta) {
    var win = window;
    if (Affinity.oldessFrame) { // if in OLD ESS iframe
        try {
            win = window.parent.window;
        } catch (e) { }
    }
    try {
        var doc = win.document.documentElement, body = win.document.body;
        var scroll = (doc && doc.scrollTop || body && body.scrollTop || 0);
        if (delta > 0) { win.scrollTo(0, scroll + 10); }
        if (delta < 0) { win.scrollTo(0, scroll - 10); }
    } catch (e) { }
};

document.addEvent(Affinity.events.move, function (e) {
    if (Affinity.UI.drageventFired) {
        var mousey = e.client.y;
        var winheight = window.innerHeight || window.document.documentElement.clientHeight;
        var topCheck = 50;
        var bottomCheck = winheight - 50;
        if (Affinity.oldessFrame) { // if in OLD ESS iframe
            try {
                var win = window.parent;
                winheight = win.innerHeight || win.document.documentElement.clientHeight;
                var doc = win.document.documentElement, body = win.document.body;
                var parentScroll = (doc && doc.scrollTop || body && body.scrollTop || 0);
                var framePosition = 0;
                if (document.documentMode && document.documentMode < 9) {
                    framePosition = Affinity.oldessFrame.querySelectorAll(".ContentBody")[0].offsetTop;
                } else {
                    framePosition = Affinity.oldessFrame.getElementsByClassName("ContentBody")[0].offsetTop;
                }
                var relativeTop = parentScroll - framePosition;
                var topCheck = 50 + relativeTop;
                var bottomCheck = (relativeTop + winheight) - 50;
            } catch (e) { }
        }
        if (mousey > bottomCheck) {
            if (!Affinity.UI.scrolling) {
                if (document.getElement('.dragger')) { document.getElement('.dragger').setStyle('display', 'none'); }
                Affinity.UI.scrolling = true;
                Affinity.UI.scroller = Affinity.UI.autoscroll.periodical(25, window, [1]);
            }
        } else if (mousey < topCheck) {
            if (!Affinity.UI.scrolling) {
                if (document.getElement('.dragger')) { document.getElement('.dragger').setStyle('display', 'none'); }
                Affinity.UI.scrolling = true;
                Affinity.UI.scroller = Affinity.UI.autoscroll.periodical(25, window, [-1]);
            }
        } else {
            if (Affinity.UI.scrolling) {
                if (document.getElement('.dragger')) { document.getElement('.dragger').setStyle('display', 'block'); }
                Affinity.UI.scrolling = false;
                clearInterval(Affinity.UI.scroller);
            }
        }
    }
});
document.addEvent(Affinity.events.end, function () {
    Affinity.UI.drageventFired = false;
    if (Affinity.UI.scrolling) {
        if (document.getElement('.dragger')) { document.getElement('.dragger').setStyle('display', 'block'); }
        Affinity.UI.scrolling = false;
        clearInterval(Affinity.UI.scroller);
    }
});

/*************************************************************************************************************************/
/**                            *******************************************************************************************/
/**   KANOMI CODE              *******************************************************************************************/
/**                            *******************************************************************************************/
/*************************************************************************************************************************/
/**                                                                                                                     **/
/**   Creates silent listener for passive key entry of the Konami code                                                  **/
/**   Code: up, up, down, down, left, right, left, right, A, B                                                          **/
/**   As used by Error page Stack Trace reveal.                                                                         **/
/**                                                                                                                     **/
/*************************************************************************************************************************/

Affinity.Konami = new Class({
    Implements: [Options],
    options: { onSuccess: function () { } },
    input: "",
    pattern: "38384040373937396665",
    initialize: function (options) {
        this.setOptions(options);
        document.addEvent('keydown', function (e) {
            this.input += e.code;
            if (this.input.length > this.pattern.length) { this.input = this.input.substr((this.input.length - this.pattern.length)); }
            if (this.input == this.pattern) { this.options.onSuccess(); }
        }.bind(this));
    }
});

/*************************************************************************************************************************/
/**                            *******************************************************************************************/
/**   RICK ROLL EASTER EGG     *******************************************************************************************/
/**                            *******************************************************************************************/
/*************************************************************************************************************************/
/**                                                                                                                     **/
/**   Creates silent listener for passive key entry of the Rick Astley                                                  **/
/**   Code: R, I, C, K, R, O, L, L                                                                                      **/
/**                                                                                                                     **/
/*************************************************************************************************************************/

Affinity.RickRoll = new Class({
    Implements: [Options],
    Binds: ['inject', 'destroy'],
    options: {},
    input: "",
    ytBox: false,
    pattern: "8273677582797676",
    initialize: function (options) {
        this.setOptions(options);
        document.addEvent('keydown', function (e) {
            this.input += e.code;
            if (this.input.length > this.pattern.length) { this.input = this.input.substr((this.input.length - this.pattern.length)); }
            if (this.input == this.pattern) { this.inject(); }
        }.bind(this));
    },
    inject: function () {
        this.destroy();
        this.ytBox = new Element('div').setStyles({ 'position': 'fixed', 'top': 0, 'left': 0, 'width': '100%', 'height': '100%', 'background': 'rgba(255,255,255,0.8)', 'text-align': 'center', 'z-index': 99999999999 })
        .inject(document.body, 'bottom')
        .set('html', '<iframe width="420" height="315" style="position:fixed;top:50%;left:50%;margin:-157px 0 0 -210px;" src="https:/' + '/www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&amp;autoplay=1&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>')
        .addEvent('click', this.destroy);
    },
    destroy: function () {
        if (this.ytBox) { this.ytBox.removeEvents(); this.ytBox.destroy(); }
    }
});

new Affinity.RickRoll();

/*************************************************************************************************************************/
/**                            *******************************************************************************************/
/**   COOKIE MONSTER           *******************************************************************************************/
/**                            *******************************************************************************************/
/*************************************************************************************************************************/
/**                                                                                                                     **/
/**   Cookie wrapper for handling stupid IE cookie bugs :(                                                              **/
/**                                                                                                                     **/
/**   CookieMonster.Read({string:cookie_name});                                                                         **/
/**   CookieMonster.Write({string:cookie_name}, {mixed:value}, {float:expires in minutes - optional});                  **/
/**   CookieMonster.Delete({string:cookie_name});                                                                       **/
/**                                                                                                                     **/
/*************************************************************************************************************************/

Affinity.CookieMonster = new (new Class({
    Read: function (cookiename) {
        var raw;
        if (Affinity.isie) {
            var offset = document.cookie.indexOf(cookiename + '=');
            if (offset != -1) { // if cookie exists
                offset += cookiename.length + 1;
                var end = document.cookie.indexOf(";", offset);
                if (end == -1) { end = document.cookie.length; }
                // IE hates some chars in cookies, so we unescape the escaped data
                return unescape(document.cookie.substring(offset, end));
            }
        } else {
            return Cookie.read(cookiename);
        }
    },
    Write: function (cookiename, data, expires) {
        // IE hates some chars in cookies, so we escape the data. IE also requires a full date rather than a day value for 'expires'
        var domain = new URI(window.location.href).parsed.host;
        var dateNow = new Date();
        if (typeOf(expires) !== 'null' && !isNaN(expires) && parseFloat(expires) > 0) {
            var dateExpires = new Date(dateNow.getTime() + (expires * 60000));
            var dateNowStr = dateNow.toUTCString();
            var dateExpiresStr = dateExpires.toUTCString();
            log('&#169; Cookie Write Expires - name: ' + cookiename + ', value: ' + data);
            log('  expires: ' + dateExpiresStr + ', now: ' + dateNowStr + ', expires value: ' + expires + ', in days: ' + (parseFloat(expires) / 1440) + ', domain: ' + domain);
            if (Affinity.isie) {
                try {
                    document.cookie = cookiename + '=' + escape(data) + '; expires=' + dateExpiresStr + '; domain:' + domain;
                    return data;
                } catch (er) {
                    return false;
                }
            } else {
                try {
                    Cookie.write(cookiename, data, { duration: parseFloat(expires) / 1440 }); // expires is in mins - convert to days
                    return data;
                } catch (er) {
                    return false;
                }
            }
        } else {
            log('&#169; Cookie Write - name: ' + cookiename + ', value: ' + data);
            if (Affinity.isie) {
                try {
                    document.cookie = cookiename + '=' + escape(data) + ';';
                    return data;
                } catch (er) {
                    return false;
                }
            } else {
                try {
                    Cookie.write(cookiename, data);
                    return data;
                } catch (er) {
                    return false;
                }
            }
        }
    },
    Delete: function (cookiename) {
        log('&#169; Cookie Delete - name: ' + cookiename);
        if (Affinity.isie) {
            document.cookie = cookiename + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
            try {
                Cookie.dispose(cookiename);
                return true;
            } catch (er) {
                return false;
            }
        } else {
            try {
                Cookie.dispose(cookiename);
                return true;
            } catch (er) {
                return false;
            }
        }
    }
}));

/*************************************************************************************************************************/
/**                            *******************************************************************************************/
/**   CONSOLE FREE LOGGER      *******************************************************************************************/
/**                            *******************************************************************************************/
/*************************************************************************************************************************/
/**                                                                                                                     **/
/**   A DOM based logger injector                                                                                       **/
/**   Required for logging and debugging as IE console changes IE cache and DOM behavior.                               **/
/**   Adds hidden button top left corner of any app.                                                                    **/
/**                                                                                                                     **/
/**   logger.enable(); Creates and enables logger                                                                       **/
/**   logger.disable(); Destroys and disables logger                                                                    **/
/**   logger.log({mixed}); Logs objects, array, strings, etc                                                            **/
/**   log({mixed}); global of above (set as blank method if disabled)                                                   **/
/**                                                                                                                     **/
/*************************************************************************************************************************/

Affinity.logger = new (new Class({
    /* Useful THML symbols reference:
    Black Sun With Rays	                    &#9728;
    Cloud	                                &#9729;
    Umbrella	                            &#9730;
    Snowman	                                &#9731;
    Comet	                                &#9732;
    Black Star	                            &#9733;
    White Star	                            &#9734;
    Lightning	                            &#9735;
    Thunderstorm	                        &#9736;
    Sun	                                    &#9737;
    Ascending Node	                        &#9738;
    Descending Node	                        &#9739;
    Conjunction	                            &#9740;
    Opposition	                            &#9741;
    Black Telephone	                        &#9742;
    White Telephone	                        &#9743;
    Ballot Box	                            &#9744;
    Ballot Box With Check	                &#9745;
    Ballot Box With X	                    &#9746;
    Large X	                                &#9747;
    Umbrella With Rain Drops	            &#9748;
    Hot Beverage	                        &#9749;
    White Shogi Piece	                    &#9750;
    Black Shogi Piece	                    &#9751;
    Shamrock	                            &#9752;
    Reversed Rotated Floral Heart Bullet	&#9753;
    Black Left Pointing Finger	            &#9754;
    Black Right Pointing Finger         	&#9755;
    White Left Pointing Finger	            &#9756;
    White Up Pointing Finger	            &#9757;
    White Right Pointing Finger	            &#9758;
    White Down Pointing Finger	            &#9759;
    Skull And Crossbones	                &#9760;
    Caution Sign	                        &#9761;
    Radioactive Sign	                    &#9762;
    Biohazard Sign	                        &#9763;
    Caduceus	                            &#9764;
    Ankh	                                &#9765;
    Orthodox Cross	                        &#9766;
    Chi Rho	                                &#9767;
    Cross Of Lorraine	                    &#9768;
    Cross Of Jerusalem	                    &#9769;
    Star And Crescent	                    &#9770;
    Farsi Symbol	                        &#9771;
    Adi Shakti	                            &#9772;
    Hammer And Sickle	                    &#9773;
    Peace Symbol	                        &#9774;
    Yin Yang	                            &#9775;
    Trigram For Heaven	                    &#9776;
    Trigram For Lake	                    &#9777;
    Trigram For Fire	                    &#9778;
    Trigram For Thunder	                    &#9779;
    Trigram For Wind	                    &#9780;
    Trigram For Water	                    &#9781;
    Trigram For Mountain	                &#9782;
    Trigram For Earth	                    &#9783;
    Wheel Of Dharma	                        &#9784;
    White Frowning Face	                    &#9785;
    White Smiling Face	                    &#9786;
    Black Smiling Face	                    &#9787;
    White Sun With Rays	                    &#9788;
    First Quarter Moon	                    &#9789;
    Last Quarter Moon	                    &#9790;
    Mercury	                                &#9791;
    Female Sign	                            &#9792;
    Earth	                                &#9793;
    Male Sign	                            &#9794;
    Jupiter	                                &#9795;
    Saturn	                                &#9796;
    Uranus	                                &#9797;
    Neptune	                                &#9798;
    Pluto	                                &#9799;
    Aries	                                &#9800;
    Taurus	                                &#9801;
    Gemini	                                &#9802;
    Cancer	                                &#9803;
    Leo	                                    &#9804;
    Virgo	                                &#9805;
    Libra	                                &#9806;
    Scorpius	                            &#9807;
    Sagittarius	                            &#9808;
    Capricorn	                            &#9809;
    Aquarius	                            &#9810;
    Pisces	                                &#9811;
    White Chess King	                    &#9812;
    White Chess Queen	                    &#9813;
    White Chess Rook	                    &#9814;
    White Chess Bishop	                    &#9815;
    White Chess Knight	                    &#9816;
    White Chess Pawn	                    &#9817;
    Black Chess King	                    &#9818;
    Black Chess Queen	                    &#9819;
    Black Chess Rook	                    &#9820;
    Black Chess Bishop	                    &#9821;
    Black Chess Knight	                    &#9822;
    Black Chess Pawn	                    &#9823;
    Black Spade Suit	                    &#9824;
    White Heart Suit	                    &#9825;
    White Diamond Suit	                    &#9826;
    Black Club Suit	                        &#9827;
    White Spade Suit	                    &#9828;
    Black Heart Suit	                    &#9829;
    Black Diamond Suit	                    &#9830;
    White Club Suit	                        &#9831;
    Hot Springs	                            &#9832;
    Quarter Note	                        &#9833;
    Eighth Note	                            &#9834;
    Beamed Eighth Notes	                    &#9835;
    Beamed Sixteenth Notes	                &#9836;
    Music Flat Sign	                        &#9837;
    Music Natural Sign	                    &#9838;
    Music Sharp Sign	                    &#9839;
    West Syriac Cross	                    &#9840;
    East Syriac Cross	                    &#9841;
    Universal Recycling Symbol	            &#9842;
    Recycling Symbol For Type-1 Plastics	&#9843;
    Recycling Symbol For Type-2 Plastics	&#9844;
    Recycling Symbol For Type-3 Plastics	&#9845;
    Recycling Symbol For Type-4 Plastics	&#9846;
    Recycling Symbol For Type-5 Plastics	&#9847;
    Recycling Symbol For Type-6 Plastics	&#9848;
    Recycling Symbol For Type-7 Plastics	&#9849;
    Recycling Symbol For Generic Materials	&#9850;
    Black Universal Recycling Symbol	    &#9851;
    Recycled Paper Symbol	                &#9852;
    Partially-Recycled Paper Symbol	        &#9853;
    Permanent Paper Sign	                &#9854;
    Wheelchair Symbol	                    &#9855;
    Die Face-1	                            &#9856;
    Die Face-2	                            &#9857;
    Die Face-3	                            &#9858;
    Die Face-4	                            &#9859;
    Die Face-5	                            &#9860;
    Die Face-6	                            &#9861;
    White Circle With Dot Right	            &#9862;
    White Circle With Two Dots	            &#9863;
    Black Circle With White Dot Right	    &#9864;
    Black Circle With Two White Dots	    &#9865;
    Monogram For Yang	                    &#9866;
    Monogram For Yin	                    &#9867;
    Digram For Greater Yang	                &#9868;
    Digram For Lesser Yin	                &#9869;
    Digram For Lesser Yang	                &#9870;
    Digram For Greater Yin	                &#9871;
    White Flag	                            &#9872;
    Black Flag	                            &#9873;
    Hammer And Pick	                        &#9874;
    Anchor	                                &#9875;
    Crossed Swords	                        &#9876;
    Staff Of Aesculapius	                &#9877;
    Scales	                                &#9878;
    Alembic	                                &#9879;
    Flower	                                &#9880;
    Gear	                                &#9881;
    Staff Of Hermes	                        &#9882;
    Atom Symbol	                            &#9883;
    Fleur-De-Lis	                        &#9884;
    Outlined White Star	                    &#9885;
    Warning Sign	                        &#9888;
    High Voltage Sign	                    &#9889;
    Doubled Female Sign	                    &#9890;
    Doubled Male Sign	                    &#9891;
    Interlocked Female And Male Sign	    &#9892;
    Male And Female Sign	                &#9893;
    Male With Stroke Sign	                &#9894;
    Male With Stroke & Male & Female Sign	&#9895;
    Vertical Male With Stroke Sign	        &#9896;
    Horizontal Male With Stroke Sign	    &#9897;
    Medium White Circle	                    &#9898;
    Medium Black Circle	                    &#9899;
    Medium Small White Circle	            &#9900;
    Marriage Symbol	                        &#9901;
    Divorce Symbol	                        &#9902;
    Unmarried Partnership Symbol	        &#9903;
    Ceres	                                &#9907;
    Pallas	                                &#9908;
    Juno	                                &#9909;
    Vesta	                                &#9910;
    Chiron	                                &#9911;
    Black Moon Lilith	                    &#9912;
    Sextile	                                &#9913;
    Semisextile	                            &#9914;
    Quincunx	                            &#9915;
    Sesquiquadrate	                        &#9916;
    Soccer Ball	                            &#9917;
    Baseball	                            &#9918;
    Snowman Without Snow	                &#9924;
    Sun Behind Cloud	                    &#9925;
    Ophiuchus	                            &#9934;
    No Entry	                            &#9940;
    Church	                                &#9962;
    Fountain	                            &#9970;
    Flag In Hole	                        &#9971;
    Sailboat	                            &#9973;
    Tent	                                &#9978;
    Fuel Pump	                            &#9981;
    */
    Binds: ['build', 'enable', 'disable', 'enableLog', 'disableLog', 'log', 'clear', 'open', 'close'],
    enabled: false,
    __prelog: [],
    initialize: function () {
        window.log = this.log;
        window.logClear = this.clear;
        window.logEnable = this.enableLog;
        window.logDisable = this.disableLog;
    },
    build: function () {
        if (!Affinity.uiready) {
            window.removeEvent('UiReady', this.build);
            window.addEvent('UiReady', this.build);
            return;
        }
        window.removeEvent('UiReady', this.build);
        if (document.id('_log')) { document.id('_log').destroy(); }
        if (document.id('_logbutton')) { document.id('_logbutton').destroy(); }
        this.enabled = true;
        this.logBox = new Element('div', { 'id': '_log' }).inject(document.body, 'bottom');
        this.logsBox = new Element('div', { 'html': '', 'class': 'logs' }).inject(this.logBox, 'top');
        this.closeButton = new Element('div', { 'html': 'close', 'class': 'close' }).inject(this.logBox, 'top');
        this.clearButton = new Element('div', { 'html': 'clear', 'class': 'clear' }).inject(this.logBox, 'top');
        this.hiddenButton = new Element('div', { 'id': '_logbutton' }).inject(this.logBox, 'after');
        this.hiddenButton.setStyles({ 'position': 'absolute', 'top': 5, 'left': 5, 'width': 30, 'height': 30, 'z-index': 9999999998 });
        this.logBox.setStyles({ 'position': 'absolute', 'top': 40, 'left': 5, 'width': '80%', 'height': '80%', 'border': '1px solid black', 'background-color': '#fff', 'color': '000', 'z-index': 9999999999, '-webkit-transform': 'translateX(0)', 'transform': 'translateX(0)', 'display': 'none' });
        this.logsBox.setStyles({ 'width': '100%', 'height': '100%', 'padding': 10, 'overflow': 'scroll', '-webkit-box-sizing': 'border-box', '-moz-box-sizing': 'border-box', 'box-sizing': 'border-box' });
        this.clearButton.setStyles({ 'position': 'absolute', 'top': 10, 'right': 80, 'padding': 5, 'background-color': '#fff', 'cursor': 'pointer' });
        this.closeButton.setStyles({ 'position': 'absolute', 'top': 10, 'right': 30, 'padding': 5, 'background-color': '#fff', 'cursor': 'pointer' });
        this.closeButton.addEvent(Affinity.events.click, this.close);
        this.clearButton.addEvent(Affinity.events.click, this.clear);
        this.hiddenButton.addEvent(Affinity.events.click, this.open);
        this.log('/' + '/ log started ' + new Date());
        if (this.__prelog.length > 0) {
            Array.each(this.__prelog, function (__prelog) { this.log(__prelog[0], __prelog[1]); }.bind(this));
        }
        this.enabled = false;
        window.fireEvent('LogReady');
    },
    enable: function () {
        this.destroy();
        this.build();
        this.open();
    },
    disable: function () {
        this.destroy();
    },
    enableLog: function () {
        this.enabled = true;
        this.log('/' + '/ log enabled ' + new Date());
        return 'Log Enabled. Enter "disableLog()" to stop.';
    },
    disableLog: function () {
        this.log('/' + '/ log disabled ' + new Date());
        this.enabled = false;
        return 'Log disabled. Enter "enableLog()" to start.';
    },
    log: function (mixed, style) {
        if (this.enabled) {
            if (typeOf(mixed) === 'string' && (mixed === 'show' || mixed === 'open')) {
                this.open();
                return;
            }
            var outStr = typeOf(mixed) === 'object' || typeOf(mixed) === 'array' ? JSON.stringify(mixed, null, 2) : typeOf(mixed) === 'element' ? 'element type: ' + mixed.get('tag') + '\r\n' + JSON.stringify(mixed.getProperties('id', 'class', 'style', 'src', 'title', 'alt'), null, 2) : mixed;
            //this.logsBox.adopt(new Element('<pre>', { 'html': outStr }));
            if (typeOf(style) === 'object') {
                new Element('<pre>', { 'html': outStr }).inject(this.logsBox, 'top').setStyles(style);
            } else if (typeOf(style) === 'string') {
                new Element('<pre>', { 'html': outStr }).inject(this.logsBox, 'top').set('style', style);
            } else {
                new Element('<pre>', { 'html': outStr }).inject(this.logsBox, 'top');
            }
        } else {
            this.__prelog.push([mixed, style]);
        }
    },
    clear: function () {
        if (this.enabled) {
            this.logsBox.empty();
            this.log('/' + '/ log cleared ' + new Date());
        }
    },
    open: function () {
        if (this.enabled) {
            if (this.logBox.getStyle('display') === 'none') {
                this.logBox.setStyle('display', 'block');
            } else {
                this.logBox.setStyle('display', 'none');
            }
        }
    },
    close: function () {
        if (this.enabled) {
            if (this.logBox.getStyle('display') === 'block') {
                this.logBox.setStyle('display', 'none');
            } else {
                this.logBox.setStyle('display', 'block');
            }
        }
    },
    destroy: function () {
        window.removeEvent('UiReady', this.build);
        this.enabled = false;
        if (this.closeButton) { this.closeButton.remveEvents(); }
        if (this.clearButton) { this.clearButton.remveEvents(); }
        if (this.hiddenButton) { this.hiddenButton.remveEvents(); }
        if (this.logBox) { this.logBox.destroy(); }
        //window.log = function () { };
    }
}));

/*************************************************************************************************************************/
/**                            *******************************************************************************************/
/**   SMART CLOSE              *******************************************************************************************/
/**                            *******************************************************************************************/
/*************************************************************************************************************************/
/**                                                                                                                     **/
/**   A Class that helps auto close of 'popped' elements such as calendar and autocomplete.                             **/
/**   Ensures 'click outside' auto closes.                                                                              **/
/**   Ensures IE click on scroll bar or buttons does snot auto close                                                    **/
/**                                                                                                                     **/
/*************************************************************************************************************************/

Affinity.SmartClose = new Class({
    Binds: ['isActive', 'checkActive', 'isOver', 'setClose', 'overAll', 'outAll', 'windowClick'],
    over: false,
    isOverCheckTimer: false,
    initialize: function (element, options) {
        if (Affinity.mobile) {
            return 'is mobile';
        }
        this.class = 'smart-close-' + String.uniqueID();
        this.element = element;
        this.element.addClass(this.class);
        this.element.isOver = this.isOver;
        this.element.addEvent(Affinity.events.overAll, this.overAll);
        this.element.addEvent(Affinity.events.outAll, this.outAll);
        this.element.addEvent('focus', this.setClose);
    },
    isActive: function () {
        if (!document.activeElement) {
            return false;
        } else {
            if (document.activeElement === this.element || document.activeElement.getParent('.' + this.class) === this.element) {
                return true;
            }
        }
        return true;
    },
    checkActive: function () {
        if (!this.isActive()) {
            this.over = false;
            this.windowClick();
        }
    },
    isOver: function () {
        if (!this.isActive()) {
            this.over = false;
        }
        return this.over;
    },
    setClose: function () {
        window.removeEvent(Affinity.events.click, this.windowClick);
        window.addEvent(Affinity.events.click, this.windowClick);
    },
    overAll: function () {
        clearTimeout(this.isOverCheckTimer);
        this.setClose();
        this.over = true;
        this.isOverCheckTimer = this.checkActive.delay(1000, this);
    },
    outAll: function () {
        clearTimeout(this.isOverCheckTimer);
        this.over = false;
    },
    windowClick: function () {
        if (!this.over) {
            this.element.fireEvent('SmartClose');
            window.removeEvent(Affinity.events.click, this.windowClick);
        }
    }
});

/**   TRIGGER RESIZE ON PINCH    *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

Affinity.UI.mobileZooming = false;
if (Affinity.mobile) {
    window.addEvents({
        'touchmove': function (e) {
            if (e.touches.length === 2) {
                Affinity.UI.mobileZooming = true;
            }
        },
        'touchend': function (e) {
            if (Affinity.UI.mobileZooming) {
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent('resize', true, false);
                window.dispatchEvent(evt);
            }
            Affinity.UI.mobileZooming = false;
        }
    });
}

/**   CACHE DEFEATIING PATH      *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

Affinity.GetCacheSafePath = function (path) {
    if (!Affinity.isie || typeOf(path) !== 'string') { return path; }
    var uri = path + (path.contains('?') ? '&ran=' : '?ran=') + String.uniqueID() + '-' + Date.parse(new Date()).format('%s');
    return uri;
};


/**   PROCESS URL                *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

Affinity.ProcessUrl = function (api) {
    var url, preUrl = '/_Api/Zelos',
        mainUrl = api.replace('%3F', '?'),
        mainUrl = Affinity.isTeampayoffice && new RegExp('timesheets' + preUrl, 'i').test(mainUrl) ? mainUrl.replace(new RegExp('timesheets' + preUrl, 'i'), preUrl) : mainUrl,
        mainUrl = Affinity.isTeampayofficeBranch && new RegExp('tb' + preUrl, 'i').test(mainUrl) ? mainUrl.replace(new RegExp('tb' + preUrl, 'i'), preUrl) : mainUrl,
        mainUrl = mainUrl.replace(preUrl + '?', ''),
        useUrl = (mainUrl.indexOf('&') > -1 && mainUrl.indexOf('?') === -1) ? mainUrl.replace('&', '?') : mainUrl,
        uriObj = new URI(useUrl),
        query = {};
    if (typeOf(uriObj.parsed.query) !== 'null') {
        queryObj = uriObj.parsed.query.parseQueryString();
        Object.each(queryObj, function (val, key) {
            if (typeOf(val) === 'array') {
                queryObj[key] = val[val.length - 1];
            }
        });
        query = Object.toQueryString(queryObj);
    }
    uriObj.parsed.query = '';
    url = uriObj.toString();
    url = typeOf(uriObj.parsed.scheme) !== 'null' ? url.replace(uriObj.parsed.scheme + ':/' + '/', '') : url;
    url = typeOf(uriObj.parsed.host) !== 'null' ? url.replace(uriObj.parsed.host, '') : url;
    url = typeOf(uriObj.parsed.port) !== 'null' ? url.replace(':' + uriObj.parsed.port, '') : url;
    url = url.indexOf(preUrl) === -1 ? preUrl + '?' + url : url;
    url = (url.charAt(0) === '/' ? url.substring(1) : url) + '?' + decodeURIComponent(Object.toQueryString(query));
    url = Affinity.isTeampayoffice && !Affinity.isTeampayofficeBranch && url.indexOf('timesheets') === -1 ? '/timesheets/' + url : url;
    url = Affinity.isTeampayofficeBranch && url.indexOf('tb') === -1 ? '/tb/' + url : url;
    url = url.replace(new RegExp('\/\/', 'g'), '/'),
    url = url.replace('??', '?');
    url = url.replace('?/', '?');
    return url;
};

Affinity.ProcessUrlObj = function (uriObj, query) {
    var url, queryObj, preUrl = '/_Api/Zelos';
    query = typeOf(query) !== 'null' ? query : {};
    queryObj = query.parseQueryString();
    Object.each(queryObj, function (val, key) {
        if (typeOf(val) === 'array') {
            queryObj[key] = val[val.length - 1];
        }
    });
    query = Object.toQueryString(queryObj);
    uriObj.parsed.query = '';
    uriObj.parsed.directory = Affinity.isTeampayoffice && new RegExp('timesheets/', 'i').test(uriObj.parsed.directory) ? uriObj.parsed.directory.replace(new RegExp('timesheets/', 'i'), '') : uriObj.parsed.directory;
    uriObj.parsed.directory = Affinity.isTeampayofficeBranch && new RegExp('tb/', 'i').test(uriObj.parsed.directory) ? uriObj.parsed.directory.replace(new RegExp('tb/', 'i'), '') : uriObj.parsed.directory;
    uriObj.parsed.directory = uriObj.parsed.directory.replace(new RegExp('\/\/', 'g'), '/');
    url = uriObj.toString();
    url = typeOf(uriObj.parsed.scheme) !== 'null' ? url.replace(uriObj.parsed.scheme + ':/' + '/', '') : url;
    url = typeOf(uriObj.parsed.host) !== 'null' ? url.replace(uriObj.parsed.host, '') : url;
    url = typeOf(uriObj.parsed.port) !== 'null' ? url.replace(':' + uriObj.parsed.port, '') : url;
    url = url.indexOf(preUrl) === -1 ? preUrl + '?' + url : url;
    url = (url.charAt(0) === '/' ? url.substring(1) : url) + '?' + decodeURIComponent(Object.toQueryString(query));
    url = Affinity.isTeampayoffice && !Affinity.isTeampayofficeBranch && url.indexOf('timesheets') === -1 ? '/timesheets/' + url : url;
    url = Affinity.isTeampayofficeBranch && url.indexOf('tb') === -1 ? '/tb/' + url : url;
    url = url.replace(new RegExp('\/\/', 'g'), '/'),
    url = url.replace('??', '?');
    url = url.replace('?/', '?');
    return url;
};


/*************************************************************************************************************************/
/**                              *****************************************************************************************/
/**   MOOTOOLS MORE EXTENTIONS   *****************************************************************************************/
/**                              *****************************************************************************************/
/*************************************************************************************************************************/

/**   FORCE NZ TIME              *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

Locale.define('en-NZ', 'Date', {
    dateOrder: ['date', 'month', 'year', '/'],
    shortDate: '%D/%M/%Y',
    shortTime: '%I:%M%p',
    AM: "am",
    PM: "pm"
}).inherit('en-US', 'Date');

Locale.define('en-AU').inherit('en-NZ', 'Date');

Locale.use('en-NZ');

/**   DATES                      *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/


Date.implement({

    /* convert date object to zelos date string */
    toZelos: function () {
        // force date based on user local time, and convert to ISO string *WITH NO OFFSET*
        return Date.parse(this.format('%d/%m/%Y %H:%M:%S')).format('%Y-%m-%dT%H:%M:%S');
    },

    /* convert date object to readable 24 hour time string */
    toTime: function () {
        try {
            return this.format('%k:%M:%S');
        } catch (e) { return "Invalid Date"; }
    },

    /* convert date object to readable 24 hour time string */
    toTime24: function () {
        this.toTime();
    },

    /* convert date object to readable 12 hour time string with am/pm */
    toTime12: function () {
        try {
            return this.format('%l:%M:%S %p').toLowerCase();
        } catch (e) { return "Invalid Date"; }
    },

    /* convert date object to readable string: 01.02.2020 */
    toSimple: function () {
        try {
            return this.format('%d-%m-%Y');
        } catch (e) { return "Invalid Date"; }
    },

    /* convert date object to readable string: 01.02.2020 00:00:00 */
    toSimpleDateTime: function () {
        try {
            return this.format('%d-%m-%Y %k:%M:%S');
        } catch (e) { return "Invalid Date"; }
    },

    /* convert date object to server / database safe string: 01.01.2020 00:00:00 +1300 */
    toServer: function () {
        try {
            return this.format('%d.%m.%Y %k:%M:%S %z');
        } catch (e) { return "Invalid Date"; }
    },

    /* convert date object to friendly readable string: Monday 1st January 2020 */
    toFriendly: function () {
        try {
            return this.format('%A %B %e%o %Y').replace(/  /gi, ' ');
        } catch (e) { return "Invalid Date"; }
    },

    /* convert date object to friendly readable string: Mon 1st Jan 2020 */
    toFriendlyShort: function () {
        try {
            return this.format('%a %b %e%o %Y').replace(/  /gi, ' ');
        } catch (e) { return "Invalid Date"; }
    },

    /* convert date object to friendly string: about 2 minutes ago */
    toWords: function () {
        try {
            return this.timeDiffInWords();
        } catch (e) { return "Invalid Date"; }
    },

    /* convert date object to friendly string: 2 mins ago */
    toWordsShort: function () {
        try {
            return this.timeDiffInWords().replace(/year/g, 'yr').replace(/month/g, 'mnth').replace(/hour/g, 'hr').replace(/minute/g, 'min').replace(/second/g, 'sec').replace(/about/g, '');
        } catch (e) { return "Invalid Date"; }
    },

    /* checks if two dates match */
    matches: function (compare, excludeSeconds, excludeMilliseconds) {
        if (typeOf(compare) !== 'null') {
            var d1 = Date.parse(this);
            var d2 = Date.parse(compare);
            if (d1 && d2 && typeOf(d1) == 'date' && typeOf(d2) === 'date' && d1.isValid() && d2.isValid()) {
                if (typeOf(excludeSeconds) === 'boolean' && excludeSeconds) {
                    d1 = d1.setSeconds(0);
                    d2 = d2.setSeconds(0);
                }
                if (typeOf(excludeMilliseconds) === 'boolean' && excludeMilliseconds) {
                    d1 = d1.setMilliseconds(0);
                    d2 = d2.setMilliseconds(0);
                }
                d1 = d1.getTime();
                d2 = d2.getTime();
                if (d1 === d2) {
                    return true;
                }
            }
        }
        return false;
    },

    elapsed: function () {
        return ((new Date()).getTime() - this.getTime()) / 1000;
    },

    /* checks if two dates are on the same day */
    sameDay: function (compare) {
        if (typeOf(compare) !== 'null') {
            var d1 = Date.parse(this);
            var d2 = Date.parse(compare);
            if (d1 && d2 && typeOf(d1) == 'date' && typeOf(d2) === 'date' && d1.isValid() && d2.isValid()) {
                d1 = d1.clearTime().getTime();
                d2 = d2.clearTime().getTime();
                if (d1 === d2) {
                    return true;
                }
            }
        }
        return false;
    },

    /* comparisons */

    lessThan: function (compare) {
        if (typeOf(compare) !== 'null') {
            var d1 = Date.parse(this);
            var d2 = Date.parse(compare);
            if (d1 && d2 && typeOf(d1) == 'date' && typeOf(d2) === 'date' && d1.isValid() && d2.isValid()) {
                d1 = d1.clearTime().getTime();
                d2 = d2.clearTime().getTime();
                if (d1 < d2) {
                    return true;
                }
            }
        }
        return false;
    },

    lessThanOrEqualTo: function (compare) {
        if (typeOf(compare) !== 'null') {
            if (this.sameDay(compare)) {
                return true;
            }
            if (this.lessThan(compare)) {
                return true;
            }
        }
        return false;
    },

    greaterThan: function (compare) {
        if (typeOf(compare) !== 'null') {
            var d1 = Date.parse(this);
            var d2 = Date.parse(compare);
            if (d1 && d2 && typeOf(d1) == 'date' && typeOf(d2) === 'date' && d1.isValid() && d2.isValid()) {
                d1 = d1.clearTime().getTime();
                d2 = d2.clearTime().getTime();
                if (d1 > d2) {
                    return true;
                }
            }
        }
        return false;
    },

    greaterThanOrEqualTo: function (compare) {
        if (typeOf(compare) !== 'null') {
            if (this.sameDay(compare)) {
                return true;
            }
            if (this.greaterThan(compare)) {
                return true;
            }
        }
        return false;
    }

});

Date.defineFormat('zelos', function (date) {
    // force date based on user local time, and convert to ISO string *WITH NO OFFSET*
    return date.toZelos();
});

Date.CurentYear = new Date().get('year');

Date.FormatStrings = [
    ['christmas', '12.25.' + (Date.CurentYear + 1)],
    ['xmas', '12.25.' + (Date.CurentYear + 1)],
    ['newyear', '1.1.' + (Date.CurentYear + 1)],
    ['new year', '1.1.' + (Date.CurentYear + 1)]
];

Date.TimeTravel = [
    ['second', /(\+|\-)\s*[0-9]+( )*(seconds|second|sec|s)/],
    ['minute', /(\+|\-)\s*[0-9]+( )*(minutes|minute|min|m)/],
    ['hour', /(\+|\-)\s*[0-9]+( )*(hours|hour|h)/],
    ['day', /(\+|\-)\s*[0-9]+( )*(days|day|d)/],
    ['week', /(\+|\-)\s*[0-9]+( )*(weeks|week|w)/],
    ['month', /(\+|\-)\s*[0-9]+( )*(months|month)/],
    ['year', /(\+|\-)\s*[0-9]+( )*(years|year|y)/]
];

/**   STRING TO DATE             *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

String.implement({

    toDate: function () {
        Locale.use("en-GB");
        var i, m, v, d;
        s = this.toLowerCase().trim();
        if (s === 'now') {
            return new Date();
        }
        if (s.contains('now ')) {
            s = s.replace(/(now |today )/, new Date().format('%k:%H:%S '));
        }
        if (/^\d+$/.test(s) && s.length >= 6) {
            s = s.length > 8 ? (parseInt(s, 10) * 1000) + '' : s.substr(0, 2) + '.' + s.substr(2, 2) + '.' + s.substr(4);
        }
        for (i = 0; i < Date.FormatStrings.length; i++) {
            if (s.contains(Date.FormatStrings[i][0])) {
                s = s.replace(Date.FormatStrings[i][0], Date.FormatStrings[i][1]);
                break;
            }
        }
        for (i = 0; i < Date.TimeTravel.length; i++) {
            if (s.test(Date.TimeTravel[i][1])) {
                m = s.match(Date.TimeTravel[i][1])[0];
                v = m.match(/[0-9]+/)[0];
                if (m.indexOf('+')) { d = Date.parse(s.replace(m, '').trim()).decrement(Date.TimeTravel[i][0], parseFloat(v)); }
                if (m.indexOf('-')) { d = Date.parse(s.replace(m, '').trim()).increment(Date.TimeTravel[i][0], parseFloat(v)); }
            }
        }
        d = d == null ? Date.parse(s) : d;
        try {
            if (d.format('%s') == 0) {
                return "Invalid Date";
            } else { return d; }
        } catch (e) { return "Invalid Date"; }
    }

});


/**   OBJECT VALUE FROM KEY      *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

Object.valueFromKeyString = function (o, s) {
    try {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in o) {
                o = o[k];
            } else {
                return false;
            }
        }
        return o;
    } catch (e) {
        return null;
    }
}

/** ARRAY OF OBJECTS TO MAP      *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/


Array.implement({

    mapFromKey: function (key) {

        if (this.length > 0 && key in this[0]) {
            return this.reduce(function (object, value, index) {
                object[value[key]] = value;
                return object;
            }, {});
        }

    }


});

/**   JSON HAS 401 UNAUTHORISED  *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

JSON.Unauthorized = function (json, reference) {
    var unauthorized = false;
    var type = typeOf(json);
    var check = '';
    if (type === 'object' || type === 'array') {
        json = JSON.encode(json);
        type = 'string';
    }
    if (
        type === 'string' &&
        (
            json.test('unauthorized', 'gi') ||
            json.test('unauthorised', 'gi') ||
            json.test('/(401/)', 'gi') ||
            json.test('/(403/)', 'gi')
        )
    ) {

        log('&#x270B; json response is unauthorized' + (typeOf(reference) !== null ? ' (' + unescape(reference) + ')' : '') + ' &#x270B;');
        log(JSON.stringify(json, null, 2));
        log('&#x270B; END json response is unauthorized log &#x270B;');

        if (window.prompts) { Affinity.prompts.hide(); }
        window.fireEvent('unauthorized');
        unauthorized = true;
    }
    json = null;
    return unauthorized;
};

/**   ELEMENT WIDGET             *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

Element.implement({

    hasWidget: function (name) {
        if (this.retrieve(name)) {
            return true;
        }
        return false;
    },

    getWidget: function (name) {
        if (this.retrieve(name)) {
            return this.retrieve(name);
        }
        if (this.retrieve('widget')) {
            return this.retrieve('widget');
        }
        return false;
    },

    destroyWidget: function (name) {
        var widget = this.getWidget(name);
        if (widget && 'destroy' in widget) {
            widget.destroy();
        }
        delete widget;
        return null;
    },

    exists: function () {
        try {
            if (document.contains(this)) {
                return this;
            }
        } catch (e) { }
        return false;
    }

});

/**   EVENT - GET TRUE TARGET    *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

DOMEvent.implement({

    /* gets a specific target from an event.
	   Consider a element with a span as a child. If a click event is
	   added tio the element, event.target may be button or label.
	   This allows the user to specify a class or id of the
	   parent to return
	*/
    getTarget: function (mixed) {
        return this.target.hasClass(mixed) ? this.target : this.target.get('id') === mixed ? this.target : this.target.getParent('.' + mixed) ? this.target.getParent('.' + mixed) : this.target.getParent('#' + mixed) ? this.target.getParent('#' + mixed) : this.target;
    }

});


/**   ELEMENT HAS EVENT          *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

/**
* element.hasEvent
*
* Extends MooTools Element to include hasEvent.
* Used to check if an event.
*
* @type function implements
* @param {String event name, function}.
* @use myElement.hasEvent('click',myclickFunction);
* @ Returns true, false
*
*/

Element.implement({

    hasEvent: function (eventType, fn) {
        //get the element's events
        var myEvents = this.retrieve('events');
        //can we shoot this down?
        switch (myEvents && myEvents[eventType] && (fn == undefined || myEvents[eventType].keys.contains(fn))) {
            case null:
            case false:
            case undefined:
            case 0:
                return false;
            default:
                return true;
        }
    }

});

/**   MAKE FORM ELEMENT          *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

/**
* element.makeFormElement
*
* Extends MooTools Element to include makeFormElement.
* If element is type input, select or textarea, extend with FormElement class to include change events.
*
*/

Affinity.FormElement = new Class({
    Implements: [Options, Events],
    Binds: ['clearEvents', 'setEvents', 'sanatiseValue', 'cloneValue', 'setValue', 'getValue', 'getDisplayValue', 'checkChanged', 'lookup', 'lookupComplete', 'destroy'],
    options: {
    },
    element: false,
    dynamicContents: false,
    dynamicFirstLoad: true,
    defaultValue: '',
    valueEmpty: false,
    changed: false,
    initialize: function (element, options) {
        this.setOptions(options);
        this.element = element;
        if (!element.retrieve('defaultValue')) {
            this.element = element;
            this.setEvents();
            this.defaultValue = this.sanatiseValue(element.value);
            this.element.store('defaultValue', this.defaultValue);
        }
        this.element.store('widget', this);
        this.element.store('elementWidget', this);
        this.element.addClass('widget');
        this.element.value = this.sanatiseValue(this.element.value);
        this.lastValue = this.element.value;
    },
    reset: function () {
        this.changed = true;
        this.defaultValue = this.sanatiseValue(this.element.value);
        this.lastValue = this.element.value;
        this.element.store('defaultValue', this.defaultValue);
        this.element.fireEvent('changed', { target: this.element, defaultValue: this.defaultValue, value: this.element.value, type: 'changed', originalEvent: null });
        this.element.addClass('changed').removeClass('restored');
    },
    clearEvents: function () {
        this.element.removeEvent('input', this.checkChanged);
        this.element.removeEvent('lookup', this.lookup);
        this.element.removeEvent('lookupComplete', this.lookupComplete);
        this.element.removeEvent('change', this.checkChanged);
        this.element.removeEvent('blur', this.checkChanged);
    },
    setEvents: function () {
        this.clearEvents();
        if (this.element.get('list')) {
            this.element.addEvent('input', this.checkChanged);
        } else {
            this.element.addEvent('lookup', this.lookup);
            this.element.addEvent('lookupComplete', this.lookupComplete);
            this.element.addEvent('change', this.checkChanged);
            this.element.addEvent('blur', this.checkChanged);
        }
    },
    sanatiseValue: function (value) {
        try {
            return value === null || value === undefined || value.trim() === '' ? '' : value;
        } catch (er) {
            return value;
        }
    },
    cloneValue: function (value) {
        return (value + '').trim();
    },
    getValue: function () {
        return this.element.value;
    },
    setValue: function (value) {
        this.element.value = this.sanatiseValue(value);
        this.defaultValue = this.element.value;
        this.lastValue = this.element.value;
        this.element.store('defaultValue', this.defaultValue);
        this.element.removeClass('changed').removeClass('restored');
        this.changed = false;
    },
    getDisplayValue: function () {
        return this.element.value;
    },
    checkChanged: function (e) {
        var val;
        if (typeOf(e) !== 'null' && typeOf(e.target) !== 'null') {
            val = e.target.value;
        } else {
            val = this.sanatiseValue(this.element.value);
        }
        if (this.cloneValue(val) !== this.cloneValue(this.defaultValue)) {
            this.changed = true;
            if (this.lastValue === this.element.value) {
                this.element.fireEvent('changed', { target: this.element, defaultValue: this.defaultValue, value: this.element.value, type: 'changed', originalEvent: e });
                this.element.addClass('changed').removeClass('restored');
            }
            this.lastValue = this.element.value;
        } else {
            this.changed = false;
            this.element.fireEvent('restored', { target: this.element, defaultValue: this.defaultValue, value: this.element.value, type: 'restored', originalEvent: e });
            this.lastValue = this.element.value;
            this.element.addClass('restored').removeClass('changed');
        }
        return this.changed;
    },
    lookup: function () {
        this.dynamicContents = true;
    },
    lookupComplete: function (lookupEvent) {
        if (this.dynamicFirstLoad) {
            this.defaultValue = lookupEvent.defaultValue;
            this.element.store('defaultValue', this.defaultValue);
            this.dynamicFirstLoad = false;
        }
        this.checkChanged({ target: this.element });
    },
    destroy: function () {
        this.clearEvents();
        this.element.eliminate('defaultValue');
        this.element.eliminate('elementWidget');
    }
});

Element.implement({
    makeFormElement: function () {
        if (this.get('tag').test('select|input|textarea|datalist', 'gi')) {
            new Affinity.FormElement(this);
        }
        return this;
    }
});

/***/

Affinity.ElementValueTracker = new Class({
    Implements: [Options, Events],
    Binds: ['__removeEvents', '__addEvents', '__elementChanged', '__elementBlured', '__doChangeCheck', '__doChangeCheckThrottled', '__lookupComplete', 'addElement', 'removeElement', 'setValue', 'hasChanged', 'hasRestored', 'getValue', 'getDefault', 'getLast', 'changeStatus'],
    options: {},
    elements: [],
    values: [],
    valuesDefault: [],
    valuesLast: [],
    id: false,
    initialize: function (element) {
        this.id = String.uniqueID();
        if (element && !element.hasClass('has-change-tracker')) {
            this.addElement(element);
        }
    },
    /** PRIVATES **/
    __removeEvents: function (element) {
        element.removeEvent('change', this.__elementChanged);
        element.removeEvent('blur', this.__elementBlured);
    },
    __addEvents: function (element) {
        element.addEvent('change', this.__elementChanged);
        element.addEvent('blur', this.__elementBlured);
    },
    __cloneValue: function (val) {
        var isnum = typeOf(val) === 'number' ? true : false;
        var clone = (val + '').trim();
        return isnum ? parseFloat(clone) : clone;
    },
    __sanatiseValue: function (val) {
        try {
            return val === null || val === undefined || val.trim() === '' ? '' : val;
        } catch (er) {
            return val;
        }
    },
    __isSame: function (val1, val2) {
        return (val1 + '').trim().toLowerCase() === (val2 + '').trim().toLowerCase();
    },
    __doChangeCheck: function (ev) {
        clearTimeout(this.__doChangeCheckThrottle);
        this.__doChangeCheckThrottle = this.__doChangeCheckThrottled.delay(100, this, [ev]);
    },
    __doChangeCheckThrottle: false,
    __doChangeCheckThrottled: function (ev) {
        if (ev && ['object', 'event', 'domevent'].contains(typeOf(ev)) && 'target' in ev && this.elements.indexOf(ev.target) > -1) {
            var changed, restored;
            Array.each(this.elements, function (element, index) {
                changed = restored = false;
                this.values[index] = this.__sanatiseValue(element.value);
                if (!this.__isSame(this.values[index], this.valuesDefault[index])) {
                    changed = true;
                } else {
                    restored = true;
                }
                element.removeClass('cant-select-default');
                if (changed) {
                    element.removeClass('value-restored').addClass('value-changed');
                    element.fireEvent('ElementChanged', { value: this.values[index], last: this.valuesLast[index], default: this.valuesDefault[index] });
                    this.fireEvent('ElementChanged', { value: this.values[index], last: this.valuesLast[index], default: this.valuesDefault[index] });
                    window.fireEvent('AnElementChanged', { target: this.elements[index], value: this.values[index], last: this.valuesLast[index], default: this.valuesDefault[index] });
                    if (this.values[index] !== this.valuesDefault[index]) {
                        if (element.get('class').test(new RegExp('dependencies', 'gi')) || element.get('class').test(new RegExp('lookup', 'gi'))) {
                            element.addClass('cant-select-default');
                        }
                    }
                }
                if (restored) {
                    element.removeClass('value-changed').addClass('value-restored');
                    element.fireEvent('ElementRestored', { value: this.values[index], last: this.valuesLast[index], default: this.valuesDefault[index] });
                    this.fireEvent('ElementRestored', { value: this.values[index], last: this.valuesLast[index], default: this.valuesDefault[index] });
                    window.fireEvent('AnElementRestored', { target: this.elements[index], value: this.values[index], last: this.valuesLast[index], default: this.valuesDefault[index] });
                }
                this.valuesLast[index] = this.values[index];
            }.bind(this));
        }
    },
    __elementChanged: function (ev) {
        this.__doChangeCheck(ev);
    },
    __elementBlured: function (ev) {
        this.__doChangeCheck(ev);
    },
    __lookupComplete: function (ev) {
        //var done = this.__doChangeCheck(ev);
        //var status = this.changeStatus();
        //console.log(status);
        this.__doChangeCheck.delay(500, this, [ev]);
    },
    /** PUBLICS **/
    addElement: function (element) {
        if (!element.retrieve('changetracker')) {
            var val = 'value' in element ? element.value : '',
                def = element.get('data-default-value') ? element.get('data-default-value') : val;
            if (this.elements.indexOf(element) === -1) {
                this.elements.push(element);
                this.values.push(val);
                this.valuesDefault.push(def);
                this.valuesLast.push(val);
                this.__removeEvents(element);
                this.__addEvents(element);
                element.addEvent('lookupComplete', this.__lookupComplete);
                element.addClass('has-change-tracker');
                element.store('changetracker', this);
            } else {
                this.setValue(element, val);
            }
        }
    },
    removeElement: function (element) {
        if (this.elements.indexOf(element) !== -1) {
            var index = this.elements.indexOf(element);
            this.elements.splice(index, 1);
            this.values.splice(index, 1);
            this.valuesLast.splice(index, 1);
            this.valuesDefault.splice(index, 1);
            this.__removeEvents(element);
            element.removeClass('value-restored').removeClass('value-changed').removeClass('has-change-tracker');
            element.eliminate('changetracker');
        }
    },
    setValue: function (element, val) {
        if (this.elements.indexOf(element) !== -1) {
            var index = this.elements.indexOf(element);
            element.value = val;
            element.removeClass('value-restored').removeClass('value-changed');
            this.values[index] = val;
            this.valuesDefault[index] = val;
            this.valuesLast[index] = val;
            this.__removeEvents(element);
            this.__addEvents(element);
        } else {
            this.addElement(element);
        }
    },
    hasChanged: function () {
        var changed = false;
        Array.each(this.elements, function (element, index) {
            if (element.hasClass('value-changed')) {
                changed = true;
            }
            /* manual detection for non-change elements - do I need this? */
            if (!this.__isSame(this.values[index], this.valuesDefault[index])) {
                changed = true;
            }
        }.bind(this));
        return changed;
    },
    hasRestored: function () {
        var restored = false;
        Array.each(this.elements, function (element) {
            if (element.hasClass('value-restored')) {
                restored = true;
            }
        }.bind(this));
        return restored;
    },
    getValue: function (element) {
        var el = element || this.elements[0];
        var index = this.elements.indexOf(el);
        if (index !== -1) {
            return this.values[index];
        } else {
            throw new Error("Target element not tracked");
        }
    },
    getDefault: function (element) {
        var el = element || this.elements[0];
        var index = this.elements.indexOf(el);
        if (index !== -1) {
            return this.valuesDefault[index];
        } else {
            throw new Error("Target element not tracked");
        }
    },
    getLast: function (element) {
        var el = element || this.elements[0];
        var index = this.elements.indexOf(el);
        if (index !== -1) {
            return this.valuesLast[index];
        } else {
            throw new Error("Target element not tracked");
        }
    },
    changeStatus: function () {
        return { changed: this.hasChanged(), restored: this.hasRestored(), values: this.values, last: this.valuesLast, defaults: this.valuesDefault };
    },
    destroy: function () {
        Array.each(this.elements, function (element) {
            this.__removeEvents(element);
            element.removeClass('value-restored').removeClass('value-changed').removeClass('has-change-tracker');
            element.eliminate('changetracker');
        }.bind(this));
    }
});

Element.implement({
    addChangeTracker: function () {
        if (this.get('tag').test('select|input|textarea|datalist', 'gi')) {
            new Affinity.ElementValueTracker(this);
        }
        return this;
    },
    hasChanged: function () {
        if (this.retrieve('changetracker')) {
            return this.retrieve('changetracker').hasChanged();
        } else {
            //throw new Error("No Change Tracker on target element");
        }
    },
    getTrackedValue: function () {
        if (this.retrieve('changetracker')) {
            return this.retrieve('changetracker').getValue(this);
        } else {
            //throw new Error("No Change Tracker on target element");
        }
    },
    getTrackedDefault: function () {
        if (this.retrieve('changetracker')) {
            return this.retrieve('changetracker').getDefault(this);
        } else {
            //throw new Error("No Change Tracker on target element");
        }
    },
    getTrackedLast: function () {
        if (this.retrieve('changetracker')) {
            return this.retrieve('changetracker').getLast(this);
        } else {
            //throw new Error("No Change Tracker on target element");
        }
    },
    fireTrackedChange: function () {
        if (this.retrieve('changetracker')) {
            this.retrieve('changetracker').__elementChanged({ target: this });
            return this.retrieve('changetracker').getValue(this);
        } else {
            //throw new Error("No Change Tracker on target element");
        }
    }
});

/***/

/**   Element Exists + Events    *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

Element.implement({

    exists: function () {
        try {
            if (document.body.contains(this) || (this.ownerDocument && this.ownerDocument.body.contains(this))) {
                return this;
            }
        } catch (e) {
            return false;
        }
        return false;
    }

});

Element.Events.added = {
    onAdd: function () {
        if (this.exists()) {
            this.fireEvent('exists', this);
        } else {
            this.store('_exists_method', function () {
                if (this.exists()) {
                    clearInterval(this.retrieve('_exists_timer'));
                    this.eliminate('_exists_timer');
                    this.eliminate('_exists_method');
                    this.fireEvent('exists', this);
                }
            });
            this.store('_exists_timer', this.retrieve('_exists_method').periodical(100, this));
        }
    },
    onRemove: function () {
        clearInterval(this.retrieve('_exists_timer'));
        this.eliminate('_exists_timer');
        this.eliminate('_exists_method');
    }
};

Element.Events.removed = {
    onAdd: function () {
        if (!this.exists()) {
            this.fireEvent('notexists', true);
        } else {
            this.store('_not_exists_method', function () {
                if (!this.exists()) {
                    clearInterval(this.retrieve('_not_exists_timer'));
                    this.eliminate('_not_exists_timer');
                    this.eliminate('_not_exists_method');
                    this.fireEvent('notexists', true);
                }
            });
            this.store('_not_exists_timer', this.retrieve('_not_exists_method').periodical(1000, this));
        }
    },
    onRemove: function () {
        clearInterval(this.retrieve('_not_exists_timer'));
        this.eliminate('_not_exists_method');
        this.eliminate('_not_exists_method');
    }
};


/*************************************************************************************************************************/
/**                        ***********************************************************************************************/
/**   STRING SOUNDEX       ***********************************************************************************************/
/**                        ***********************************************************************************************/
/*************************************************************************************************************************/

String.prototype.soundex = function (LengthOption, CensusOption) {
    var WordString = this;
    var SoundExLen = 5;
    var TmpStr;
    var WordStr = "";
    var CurChar;
    var LastChar;
    var WSLen;
    var FirstLetter;
    WordString = WordString.toUpperCase();
    WordStr = WordString;
    WordStr = WordStr.replace(/[^A-Z]/gi, " ");
    WordStr = WordStr.replace(/^\s*/g, "");
    WordStr = WordStr.replace(/\s*$/g, "");
    WordStr = WordStr.replace(/^GH/g, "G");
    WordStr = WordStr.replace(/DG/g, "G");
    WordStr = WordStr.replace(/GH/g, "H");
    WordStr = WordStr.replace(/GN/g, "N");
    WordStr = WordStr.replace(/KN/g, "N");
    WordStr = WordStr.replace(/PH/g, "F");
    WordStr = WordStr.replace(/MP([STZ])/g, "M$1");
    WordStr = WordStr.replace(/^PS/g, "S");
    WordStr = WordStr.replace(/^PF/g, "F");
    WordStr = WordStr.replace(/MB/g, "M");
    WordStr = WordStr.replace(/TCH/g, "CH");
    FirstLetter = WordStr.substr(0, 1);
    if (FirstLetter == "H" || FirstLetter == "W") {
        WordStr = "-" + WordStr.substr(1);
    }
    WordStr = WordStr.replace(/[AEIOUYHW]/g, "0");
    WordStr = WordStr.replace(/[BPFV]/g, "1");
    WordStr = WordStr.replace(/[CSGJKQXZ]/g, "2");
    WordStr = WordStr.replace(/[DT]/g, "3");
    WordStr = WordStr.replace(/[L]/g, "4");
    WordStr = WordStr.replace(/[MN]/g, "5");
    WordStr = WordStr.replace(/[R]/g, "6");
    WSLen = WordStr.length;
    LastChar = "";
    TmpStr = "";
    for (i = 0; i < WSLen; i++) {
        CurChar = WordStr.charAt(i);
        if (CurChar == LastChar) {
            TmpStr += " ";
        } else {
            TmpStr += CurChar;
            LastChar = CurChar;
        }
    }
    WordStr = TmpStr;
    WordStr = WordStr.substr(1);
    WordStr = WordStr.replace(/\s/g, "");
    WordStr = WordStr.replace(/0/g, "");
    WordStr += "0000000000";
    WordStr = FirstLetter + WordStr;
    WordStr = WordStr.substr(0, SoundExLen);

    return (WordStr);

};

/*************************************************************************************************************************/
/**                                 **************************************************************************************/
/**   STRING LEVENSHTEIN DISTANCE   **************************************************************************************/
/**                                 **************************************************************************************/
/*************************************************************************************************************************/

String.prototype.distance = function (compare) {
    var a = this.toLowerCase();
    var b = compare.toLowerCase();
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    var matrix = [];
    var i;
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    var j;
    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                Math.min(matrix[i][j - 1] + 1, // insertion
                matrix[i - 1][j] + 1)); // deletion
            }
        }
    }

    return matrix[b.length][a.length];
};



/*************************************************************************************************************************/
/**                        ***********************************************************************************************/
/**   GLOBALS AND CONFIG   ***********************************************************************************************/
/**                        ***********************************************************************************************/
/*************************************************************************************************************************/


/**   Anti Forgery interceptor   *************************************************************************************/
/**   ------------------------   *************************************************************************************/
/*    Injects Anti Forgery Token headers into all ajax POST calls                                                    */

(function()
{
    var appName = "Commons";
    // CRITICAL: Capture original functions ONCE at module load, not in setupInterceptors
    var originalFetch = window.fetch;
    var originalXHR = window.XMLHttpRequest;
    // Helper function to check if URL should get anti-forgery token
    var shouldAddToken = function(url) {
      if (!url) return true; // Default to true for relative URLs
      if (url.indexOf('://') === -1) return true; // Relative URL
      if (url.indexOf('/') === 0) return true; // Absolute path
      // Extract hostname from URL
      var hostname;
      try
      {
        var urlObj = new URL(url, window.location.origin);
        hostname = urlObj.hostname.toLowerCase();
      }
      catch (e)
      {
        // Fallback for older browsers
        var match = url.match(/^https?:\/\/([^\/]+)/);
        hostname = match ? match[1].toLowerCase() : '';
      }
      if (!hostname) return true; // If we can't parse, assume it's safe
      // Allow localhost for development
      if (hostname === 'localhost' || hostname.indexOf('localhost:') === 0) return true;
      // Allow affinitylogon.com and all subdomains
      if (hostname === 'affinitylogon.com' || hostname.endsWith('.affinitylogon.com')) return true;
      // Allow testaffinitylogon.com and all subdomains  
      if (hostname === 'testaffinitylogon.com' || hostname.endsWith('.testaffinitylogon.com')) return true;
      // Allow current domain and subdomains (for cases like internal APIs)
      var currentHost = window.location.hostname.toLowerCase();
      if (hostname === currentHost) return true;
      // Deny all other external domains
      return false;
    };
    var setupInterceptors = function ()
    {
        // Add XMLHttpRequest interceptor that adds antiforgery token for non-GET requests
        if (window.XMLHttpRequest && !window.XMLHttpRequest._antiForgeryPatched)
        {
          window.XMLHttpRequest._antiForgeryPatched = true;
          // originalXHR already captured at module load time
          window.XMLHttpRequest = function()
          {
            var xhr = new originalXHR();
            var originalOpen = xhr.open;
            var originalSend = xhr.send;
            var method = '';
            var url = '';
            xhr.open = function(httpMethod, httpUrl, async, user, password)
            {
              method = httpMethod ? httpMethod.toUpperCase() : 'GET';
              url = httpUrl || '';
              return originalOpen.call(this, httpMethod, httpUrl, async, user, password);
            };
            xhr.send = function(data)
            {
              var antiForgeryToken = window.AntiForgeryToken || "";
              if (antiForgeryToken && method !== 'GET' && shouldAddToken(url))
              {
                xhr.setRequestHeader('__RequestVerificationToken', antiForgeryToken);
                //console.log(appName + ": Added antiforgery token to XMLHttpRequest", method, url);
              }
              else if (method !== 'GET' && !shouldAddToken(url))
              {
                //console.log(appName + ": Skipping antiforgery token for external XMLHttpRequest", method, url);
              }
              else if (method !== 'GET')
              {
                //console.log(appName + ": No antiforgery token available for XMLHttpRequest", method, url);
              }
              return originalSend.call(this, data);
            };
            return xhr;
          };
          for (var prop in originalXHR)
          {
            if (Object.prototype.hasOwnProperty.call(originalXHR, prop))
            {
              window.XMLHttpRequest[prop] = originalXHR[prop];
            }
          }
          window.XMLHttpRequest.prototype = originalXHR.prototype;
          //console.log("%c" + appName + ": XMLHttpRequest injected anti-forgery token interceptor", "color: green");
        }
        else if (window.XMLHttpRequest && window.XMLHttpRequest._antiForgeryPatched)
        {
        //console.log("%c" + appName + ": XMLHttpRequest already injected anti-forgery token interceptor", "color: yellow");
        }
        // Add Fetch interceptor that adds antiforgery token for non-GET requests
        if (window.fetch && !window.fetch._antiForgeryPatched)
        {
            window.fetch._antiForgeryPatched = true;
            // originalFetch already captured at module load time
            window.fetch = function(url, options)
            {
                options = options || {};
                options.headers = options.headers || {};
                options.headers['X-Requested-With'] = 'XMLHttpRequest';
                options.credentials = options.credentials || 'include';
                var method = (options.method || 'GET').toUpperCase();
                var antiForgeryToken = window.AntiForgeryToken || "";
                if (antiForgeryToken && method !== 'GET' && shouldAddToken(url))
                {
                    delete options.headers['__RequestVerificationToken'];
                    options.headers['__RequestVerificationToken'] = antiForgeryToken;
                    //console.log(appName + ": Added antiforgery token to fetch", method, url);
                }
                else if (method !== 'GET' && !shouldAddToken(url))
                {
                    //console.log(appName + ": Skipping antiforgery token for external fetch", method, url);
                }
                else if (method !== 'GET')
                {
                    //console.log(appName + ": No antiforgery token available for fetch", method, url);
                }
                return originalFetch.call(this, url, options).then(function(response)
                {
                    // Add any 401 response handlers here
                    return response;
                }).catch(function(error)
                {
                    // Add any 401 response handlers here
                    throw error;
                });
            };
            //console.log("%c" + appName + ": Fetch injected anti-forgery token interceptor", "color: green");
        }
        else if (window.fetch && window.fetch._antiForgeryPatched)
        {
            //console.log("%c" + appName + ": Fetch already injected anti-forgery token interceptor", "color: yellow");
        }
    };
    // Refresh antiforgery token
    var refreshAntiForgeryToken = function (callbackMethod)
    {
        var callback = typeof callbackMethod === 'function' ? callbackMethod : function () {};
        var xhr = new XMLHttpRequest();
        return new Promise(function (resolve, reject)
        {
            xhr.open('GET', '/Api/RefreshAntiForgeryToken', true);
            xhr.onreadystatechange = function ()
            {
                if (xhr.readyState === 4)
                {
                    if (xhr.status === 200)
                    {
                        try
                        {
                            var data = JSON.parse(xhr.responseText);
                            if (data && data.token)
                            {
                                window.AntiForgeryToken = data.token;
                                //console.log(appName + " Antiforgery token refreshed successfully");
                                setupInterceptors();
                                // Token obtained successfully
                                resolve(data.token);
                                callback(null, data.token);
                            }
                            else
                            {
                                var error = new Error(appName + ": Invalid antiforgery token refresh response");
                                reject(error);
                                callback(error);
                            }
                        }
                        catch (e)
                        {
                            reject(e);
                            callback(e);
                        }
                    }
                    else
                    {
                        var error = new Error(appName + ": Failed to refresh antiforgery token, status: " + xhr.status);
                        reject(error);
                        callback(error);
                    }
                }
            };
            xhr.send();
        });
    }
    // Token refresh no longer depends on login events - using daily seed approach
    if (window.AntiForgeryToken)
    {
        //console.log(appName + ": Initial antiforgery token set.");
        setupInterceptors();
        clearInterval(window._antiTokenRefreshTimer);
        window._antiTokenRefreshTimer = setInterval(function ()
        {
            refreshAntiForgeryToken();
        }, 2 * 60 * 60 * 1000);
    }
    else
    {
        //console.log(appName + ": Initial antiforgery token is not set. Attempt to get one..");
        refreshAntiForgeryToken()
            .then(function (token)
            {
                clearInterval(window._antiTokenRefreshTimer);
                window._antiTokenRefreshTimer = setInterval(function ()
                {
                    refreshAntiForgeryToken();
                }, 2 * 60 * 60 * 1000);
            })
            .catch(function (error)
            {
                //console.error(appName + ": Failed to get initial antiforgery token:", error);
                clearInterval(window._antiTokenRefreshTimer);
                window._antiTokenRefreshTimer = setInterval(function ()
                {
                    refreshAntiForgeryToken();
                }, 2 * 60 * 60 * 1000);
        });
    }
                // Logout handling no longer needed - tokens are session-independent
})();


/**   Mootools Request.File fix  *************************************************************************************/
/**   ------------------------   *************************************************************************************/
/*    Extends Mootools File request object                                                                           */


if (typeOf(File) == 'null') { var File = {}; } // IE is a dick
if (typeOf(Request) == 'null') { var File = {}; } // IE is a dick

File.Upload = new Class({

    Implements: [Options, Events],

    options: {
        onComplete: function () { }
    },

    initialize: function (options) {
        var self = this;
        this.setOptions(options);
        this.uploadReq = new Request.File({
            onComplete: function () {
                self.fireEvent('complete', arguments);
                this.reset();
            }
        });
        if (this.options.data) this.data(this.options.data);
        if (this.options.images) this.addMultiple(this.options.images);
    },

    data: function (data) {
        var self = this;
        if (this.options.url.indexOf('?') < 0) this.options.url += '?';
        Object.each(data, function (value, key) {
            if (self.options.url.charAt(self.options.url.length - 1) != '?') self.options.url += '&';
            self.options.url += encodeURIComponent(key) + '=' + encodeURIComponent(value);
        });
    },

    addMultiple: function (inputs) {
        var self = this;
        inputs.each(function (input) {
            self.add(input);
        });
    },

    add: function (input) {
        var test = input;
        if (typeOf(input) !== 'null') {
            var input = document.id(input),
			    name = input.get('name'),
			    file = input.files[0];
            this.uploadReq.append('fileData', file);
        }
    },

    addPostData: function (object) {
        this.uploadReq.addPostData(object);
    },

    send: function (input) {
        if (input) this.add(input);
        this.uploadReq.send({
            url: this.options.url
        });
    }

});

Request.File = new Class({

    Extends: Request,

    options: {
        emulation: false,
        urlEncoded: false
    },

    initialize: function (options) {
        this.xhr = new Browser.Request();
        this.formData = new FormData();
        this.setOptions(options);
        this.headers = this.options.headers;
    },

    append: function (key, value) {
        this.formData.append(key, value);
        return this.formData;
    },

    addPostData: function (object) {
        var self = this;
        Object.each(object, function (value, key) {
            self.formData.append(key, value);
        });
    },

    reset: function () {
        this.formData = new FormData();
    },

    send: function (options) {
        var url = options.url || this.options.url;

        this.options.isSuccess = this.options.isSuccess || this.isSuccess;
        this.running = true;

        var xhr = this.xhr;
        xhr.open('POST', url, true);
        xhr.onreadystatechange = this.onStateChange.bind(this);

        Object.each(this.headers, function (value, key) {
            try {
                xhr.setRequestHeader(key, value);
            } catch (e) {
                this.fireEvent('exception', [key, value]);
            }
        }, this);

        this.fireEvent('request');
        xhr.send(this.formData);

        if (!this.options.async) this.onStateChange();
        if (this.options.timeout) this.timer = this.timeout.delay(this.options.timeout, this);
        return this;
    }

});

/**
* Element Shaker
*/

Affinity.Shake = new Class({
    Implements: Options,
    options: {
        distance: 4,
        duration: 50,
        transition: Fx.Transitions.Sine.easeInOut,
        loops: 2
    },
    initialize: function (element, options) {
        this.setOptions(options);
        this.element = element;
        //if(this.element.getStyle('position')!='absolute') this.element.setStyle('position','relative');
        this.tween = new Fx.Tween(this.element, {
            link: 'chain',
            duration: this.options.duration,
            transition: this.options.transition,
            property: 'margin-left'
        });
    },
    shake: function () {
        var d = this.options.distance;
        for (this.loops = 0; this.loops < this.options.loops; this.loops++) {
            this.tween.start('left', d).start('left', -d);
            this.tween.start('left', d).start('left', 0)
        };
        delete d;
    },
    stop: function () {
        this.loops = this.options.loops;
        this.tween.cancel();
        this.element.setStyle('margin-left', 0);
    }
});

/*************************************************************************************************************************/
/**                            *******************************************************************************************/
/**   ESTABLISH UI FRAMEWORK   *******************************************************************************************/
/**                            *******************************************************************************************/
/*************************************************************************************************************************/
/**                                                                                                                     **/
/**   UiReady fired by JS UIFramework when initialized (ui.init.js). JS UIFramework initialized on event PageReady      **/
/**   (fired by the app using this framework)                                                                           **/
/**                                                                                                                     **/
/*************************************************************************************************************************/

window.addEvent('UiReady', function () {

    /**   REDRAW ESS IFRAME WIN8     *****************************************************************************************/
    /**   ------------------------   *****************************************************************************************/
    /**   Check if nested in ESS, browser is Chrome and OS is Win 8                                                         **/

    if (Affinity.oldess && Affinity.oldessFrame && Affinity.agent.contains('Chrome') && Affinity.agent.contains('Windows NT 6.2')) {
        /* old ess nested iframe redraw issue for chrome on win 8 */
        window.addEvent('click', function () {
            if (document.getElement('body').className.contains('redraw')) {
                document.getElement('body').setStyle('width', '100%');
                document.getElement('body').className = 'newui';
            } else {
                document.getElement('body').setStyle('width', '99.9%');
                document.getElement('body').className = 'newui redraw';
            }
        });
    }

    /**   OLD IE MASTER MESSAGE    *******************************************************************************************/
    /**   ------------------------   *****************************************************************************************/
    /**   Creates a master message that loads over top of any app warning of OLD IE.                                        **/

    if (typeof window.masterMessage !== 'undefined' && Affinity.isie && Affinity.ieversion < 9) {
        masterMessage({
            message: '<strong class="color red large">Warning!</strong><br /><br />We do not support Internet Explorer 8 and less.<br />Some functionality may not work.<br /><br />We recommend <a href="https:/' + '/www.google.com/chrome/browser/desktop/" target="_blank" class="color green">Chrome</a> or updating to at least IE9.<br /><br />Continue at your own risk.',
            okText: 'Accept and Continue'
        });
    }


});


/*************************************************************************************************************************/
/**                        ***********************************************************************************************/
/**   ON PAGE READY        ***********************************************************************************************/
/**                        ***********************************************************************************************/
/*************************************************************************************************************************/

Affinity.PageReady = function () {

    window.removeEvent('PageReady', Affinity.PageReady);

    if (Affinity.apiversion > 1) {
        Affinity.zelosroot = Affinity.zelosroot;
        Affinity.lookupapi = Affinity.zelosroot + '?api=Lookup/Get';
    } else {
        Affinity.lookupapi = Affinity.zelosroot + '?api=Lookup/Get';
    }

    if (document.documentMode && document.documentMode == 8) {
        document.getElement('body').addClass('ie8');
    }

    if (Affinity.mobile) {
        //document.config.selectToAutoNum = 999999; // no autocompletes - rely on mobile select mechanism
    }

    /**   TYPE DETECTION     *********************************************************************************************/
    /**   ------------------------   *************************************************************************************/
    /*    collect information from body class                                                                            */

    var classes = document.body.classList;
    Affinity.ismac = classes.contains('mac') ? true : false;
    Affinity.isie = classes.contains('ie') ? true : false;
    if (Affinity.isie) Affinity.ieversion = Browser.version;
    if (Affinity.isie) Affinity.iedocmode = document.documentMode ? document.documentMode : false;
    Affinity.ismobile = classes.contains('mobile') ? true : false;
    if (Affinity.mobile) Affinity.ismobile = true; // override from included touch.js libs - see above.

    // iOS/Apple mobile detection - feature-based for Safari/Chrome/Firefox iOS
    // This catches cases where C# user-agent detection missed (e.g., privacy mode, modified UA)
    // Uses pointer/hover media features rather than touch APIs - navigator.maxTouchPoints
    // is no longer a reliable signal since some Safari/trackpad combos report it > 0 on desktop Macs.
    var isAppleVendor = navigator.vendor && navigator.vendor.indexOf('Apple') > -1;
    var isCoarsePrimaryPointer = window.matchMedia && window.matchMedia('(pointer: coarse) and (hover: none)').matches;
    var isIOSUserAgent = /iPad|iPhone|iPod/.test(navigator.userAgent);

    Affinity.isAppleMobile = (
        (isAppleVendor && isCoarsePrimaryPointer) ||
        isIOSUserAgent
    );

    // If JS detects iOS but C# missed it, set mobile flags and body class
    if (Affinity.isAppleMobile && !Affinity.ismobile) {
        Affinity.ismobile = true;
        Affinity.mobile = true;
        document.body.classList.add('mobile');
    }

    Affinity.isTeampayoffice = window.location.href.toLowerCase().indexOf('teampayoffice') !== -1 ? true : false;
    Affinity.isTeampayofficeBranch = Affinity.isTeampayoffice ? window.location.href.toLowerCase().indexOf('/tb') !== -1 ? true : false : false;

    /**   REFRESH PROTECTION     ****************************************************************************************/
    /**   ------------------------   ************************************************************************************/
    /**   Stop aggressive refreshing!                                                                                  **/

    Affinity.refreshControll = {};
    Affinity.refreshControll.initialLoad = true;
    Affinity.refreshControll.lastRefresh = new Date().getTime();
    window.addEvent('keydown', function (e) {
        if (
            e.key === 'f5' || e.key === 'F5' ||
            (e.control && (e.key === 'r' || e.key === 'R'))
        ) {
            var time = new Date().getTime();
            var timeout = Affinity.refreshControll.initialLoad ? 7000 : 5000;
            if (time - Affinity.refreshControll.lastRefresh < timeout) {
                // refresh was pressed less than 5 or 10 seconds ago - stop event propagation
                e.stop();
                uialert({ 'message': 'Refreshing this often can slow things down.<br />If you believe the page is not responding,<br />please contact Affinity Help desk.', showButtons: true })
            }
            Affinity.refreshControll.lastRefresh = new Date().getTime();
            Affinity.refreshControll.initialLoad = false;
        }
    });

    /**   IE FIXES     **************************************************************************************************/
    /**   ------------------------   ************************************************************************************/
    /**   Prevent backspace performing history back in IE8 when select is focused                                      **/

    if (Affinity && Affinity.isie && Affinity.ieversion < 9) {
        document.addEvent('keydown', function (e) {
            if (e.key == 8 || e.key === 'backspace') {
                if (e.target.get('tag').test('select', 'gi') || e.target.disabled || e.target.readOnly) {
                    e.preventDefault();
                }
            }
        });
    }

    /**   SET GLOBAL DISPLAY NAME    ************************************************************************************/
    /**   ------------------------   ************************************************************************************/
    /**   If login is implemented, populate global 'employee name' DOM elements                                        **/

    window.addEvent('userComplete', function (user) {
        document.getElements('.displayname').set('html', user.commonName ? user.commonName : user.displayName ? user.displayName : '');
    });

    /**   BARAN ESS FRAME RESIZE     ************************************************************************************/
    /**   ------------------------   ************************************************************************************/
    /**   Fire frame resize events (used when nested in Baran ESS iFrame)                                              **/

    try {
        if (parent && 'parentFrameResize' in parent) {
            window.addEvent('ResizeFrame', function () {
                if (document.getElement('.content')) {
                    var content = document.getElement('.content');
                    var contentSize = content.getScrollSize();
                    if (parent && ('parentFrameResize' in parent)) {
                        if (window.parent.window !== window) {
                            var parentWidth = window.parent.window.innerWidth ? window.parent.window.innerWidth - 70 : window.parent.window.document.body.offsetWidth - 70;
                            contentSize.x = parentWidth && parentWidth > 0 ? parentWidth : 1000;
                            parent.parentFrameResize({
                                x: contentSize.x,
                                y: contentSize.y + 100
                            });
                        }
                    }
                }
            });
            window.fireEvent('ResizeFrame');
            (function () {
                window.fireEvent('ResizeFrame');
            }).delay(500); // allow for section hide / show animations
        }
    } catch (e) { }

};

window.addEvent('PageReady', Affinity.PageReady);

/**   AUTOFIRE PAGEREADY         *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

window.addEvent('load', function () {
    (function () {
        if (!Affinity.disableAutoPageReady && !Affinity.uiready) {
            // If on load, we still have not fired 'PageReady' (developer forgot?) Fire it manually
            window.fireEvent('PageReady');
        }
    }).delay(1000, this);
});

/* NO!!! Use Dmitris thinger instead, yo!
window.addEvent('load', function () {
    (function () {
        if (!Affinity.uiready) {
            // If on load, we still have not fired 'PageReady' (developer forgot?) Fire it manually
            window.fireEvent('PageReady');
        }
    }).delay(1000, this);
});
*/

/*************************************************************************************************************************/
/*************************************************************************************************************************/

/**
* Config
*
* A generic global object to hold global information and vars.
*
* @type object
*
*/

Affinity.log = true;
Affinity.user = null;
Affinity.prettyuploads = true;
Affinity.selectToAutoNum = 0;
Affinity.selectmax = 2000;
Affinity.enableSelectLimit = true;
Affinity.useWebWorkers = false;
Affinity.enableFavourites = false;
Affinity.disableAutoPageReady = false;

// TODO: Remove this! When we are done 'testing in production' (grrrr), use console to enable logger
//Affinity.logger.enable();

// TODO: Remove this when all legacy UI has replaced document with window
window.config = document.config = Affinity;



var UIAutoComplete = new Class({

    Version: '1.0.9.2',
    File: 'ui.autocomplete.js',
    Notes: 'Position including scroll',

    Implements: [Options],

    Binds: [
        'processNew',
        'doAutoComplete',
        'hideAll'
    ],

    options: {

    },

    widgets: {},

    initialize: function (options)
    {
        if (window.hasOwnProperty('autocompletes')) return;
        Affinity.events.click = "click"; // Override if mobile property is true
        this.setOptions(options);
        if (!Affinity.UI.autocomplete) { Affinity.UI.autocomplete = {}; }
        Affinity.UI.lastAutoKill = {};
        if (typeOf(Affinity.UI.ghostFocus) === 'null') {
            Affinity.UI.ghostFocus = new Element('input', { 'type': 'text' });
            new Element('div', { 'class': 'subhidden' }).adopt(Affinity.UI.ghostFocus).inject(document.body, 'bottom');
        }
        window.autocompletes = this;
        this.processNew();
    },

    processNew: function () {
        Array.each(document.getElements('.ui-autocomplete'), function (el) {
            /*
            IF this is an autocomplete, but is a lookup, we can only build the autocomplete ui when we have option values.
            So, break out if we are not sure. lookup will re-fire ui-autocomplete builds when they are complete.
            */
            if (!el.hasClass('has-lookup') && !el.hasClass('lookup-loading')) {
                el.removeClass('ui-autocomplete');
                if (Affinity.mobile && 'UIAutoCompleteMobileWidget' in window) {
                    ac = new UIAutoCompleteMobileWidget({
                        selectElement: el
                    });
                } else {
                    ac = new UIAutoCompleteWidget({
                        selectElement: el
                    });
                }
                if (!this.widgets[ac.uuid]) {
                    this.widgets[ac.uuid] = ac;
                }
            }
        }.bind(this));
    },

    doAutoComplete: function (el) {
        var ac = new UIAutoCompleteWidget({
            selectElement: el
        });
        if (!this.widgets[ac.uuid]) {
            this.widgets[ac.uuid] = ac;
        }
    },

    hideAll: function (except) {
        Object.each(this.widgets, function (widget) {
            if (typeOf(except) !== 'null' && except.uuid) {
                if (widget.uuid !== except.uuid) {
                    widget.hide('master hide all');
                }
            } else {
                widget.hide('master hide all');
            }
        }.bind(this));
    }

});

var UIAutoCompleteWidget = new Class({

    debug: false,

    Implements: [Options, Events],

    Binds: [
        'fuzzyWorkerComplete',
        'cleanDisplay',
        'processOptions',
        'updateOptions',
        'stopEvent',
        'getValue', 'setValue', 'getDisplayValue',
        'scrollToDisplayNode',
        'position',
        'windowClickStart', 'windowClickEnd',
        'listOver', 'listOut', 'elementOver', 'elementOut',
        'doFocus', 'doClick', 'doKeyUp', 'doKeyDown',
        'fuzzySearch', 'continueWithFuzzySearch',
        'itemClicked', 'itemTouchStart',
        'escapeRegExp',
        'obscure', 'reveal',
        'unsetWindowClose', 'setWindowClose', 
        'hide', 'show',
        'clearList',
        'revert',
        'destroy',
        'searchMode_fireChangeEvents', 'searchMode_valueToOption', 'searchMode_iconClicked', 'searchMode_displayBlur',
    ],

    options: {
        stopInitialChange: false,
        selectElement: null
    },

    webworkerpath: './scripts/common/ui.autocomplete.web.worker.js',

    list: [],

    selectElement: null,
    listElement: null,
    displayElement: null,

    changed: false,
    defaultChangeValue: null,

    center: false,
    autowidth: false,

    uuid: '',
    killid: '',

    type: 'autocomplete',

    // iOS touch tracking: distinguish tap from scroll
    _touchStartX: 0,
    _touchStartY: 0,
    _touchMoveThreshold: 10, // pixels - if moved more than this, it's a scroll

    initialize: function (options) {

        if (Affinity.mobile && 'UIAutoCompleteMobileWidget' in window) {
            return new UIAutoCompleteMobileWidget(options);
        }

        this.setOptions(options);

        // iOS: Use touchstart+touchend for reliable touch handling; Others: Use configured click event
        this.eventType = Affinity.isAppleMobile ? 'touchend' : Affinity.events.click;
        this.touchStartType = Affinity.isAppleMobile ? 'touchstart' : null;

        this.useWebWorkers = Affinity.useWebWorkers ? typeof (Worker) !== "undefined" ? true : false : false;
        if (this.useWebWorkers) {
            this.fuzzyWorker = new Worker(this.webworkerpath);
            this.fuzzyWorker.onmessage = this.fuzzyWorkerComplete;
        }
        
        this.searchMode = false;
        if (Affinity && Affinity.mobile) {
            this.searchMode = true;
        }

        this.icons = {};
        this.icons.search = Affinity.icons.Search;

        this.selectElement = this.options.selectElement;

        if (this.selectElement.hasClass('ui-autocomplete-center')) {
            this.center = true;
        }
        if (this.selectElement.hasClass('ui-autocomplete-autowidth')) {
            this.autowidth = true;
        }

        this.bestguess = null;

        this.selectElement.set('tabindex', 5000);

        this.hiddenWrapper = new Element('div', { 'class': 'subhidden' }).inject(this.selectElement, 'after');

        this.selectElement.inject(this.hiddenWrapper);

        this.uuid = this.selectElement.get('id') == null ? String.uniqueID() : this.selectElement.get('id');
        this.killid = 'ac-destroy-' + String.uniqueID();
        
        if (!window.autocompletes.widgets[this.uuid]) {
            window.autocompletes.widgets[this.uuid] = this;
        }

        this.selectElement.set('id', this.uuid);

        this.processOptions.delay(100, this);

        this.selectElement.store('widget', this);

        /** universal change manager - see commons.x.x.x.js */

        if (this.selectElement.retrieve('changetracker')) {
            this.valuetracker = this.selectElement.retrieve('changetracker');
        } else {
            this.valuetracker = new Affinity.ElementValueTracker();
        }

        this.valuetracker.addElement(this.selectElement);

        /**/

        if (!Affinity.mobile)
        {
            document.addEvent('scroll', this.position);
            document.addEvent('resize', this.position);
        }

    },

    fuzzyWorkerComplete: function (returnedData) {

        var workerData = returnedData.data;
            
        switch (workerData.job) {

            case 'getOptions':

                if (this.searchMode) {

                    this.massiveSelect.innerHTML = workerData.html;

                    Affinity.prompts.adopt(this.massiveSelect);
                    this.massiveSelect.removeClass('hidden');

                    new UIAutoCompleteWidget({
                        selectElement: this.massiveSelect,
                        onComplete: function (w) {
                            this.massiveLoader.destroy();
                            Affinity.prompts.center();
                            Affinity.prompts.showButtons();
                            Affinity.prompts.show();
                            w.position();
                        }.bind(this)
                    });

                } else {



                }

                break;

            case 'getList':

                var defaultSelected = null;

                if (this.listElement.getElements('li')) {
                    this.listElement.getElements('li').removeEvent(this.eventType, this.itemClicked);
                    if (this.touchStartType) this.listElement.getElements('li').removeEvent(this.touchStartType, this.itemTouchStart);
                }

                this.listElement.innerHTML = workerData.html;
                this.fuzzySearchItemsTotal = workerData.data.total;
                this.fuzzySearchItems = workerData.data.items;
                this.items = this.listElement.getElements('li');
                this.items.addEvent(this.eventType, this.itemClicked);
                if (this.touchStartType) this.items.addEvent(this.touchStartType, this.itemTouchStart);

                if (workerData.data.defaultID) {
                    defaultSelected = this.listElement.getElement('#' + returnedData.data.data.defaultID);
                    this.defaultValue = defaultSelected;
                    this.lastSelected = defaultSelected;
                    this.defaultChangeValue = defaultSelected.get('data-value');
                }

                this.continueProcessOptsions(defaultSelected);

                break;

            case 'resetList':

                this.listElement.innerHTML = workerData.html;

                if (this.iconElement) {
                    this.iconElement.removeClass('working');
                }

                if (workerData.select) {
                    this.lastSelected = document.id(workerData.select);
                    this.defaultValue = document.id(workerData.select);
                    this.bestguess = document.id(workerData.select);
                    this.selectElement.value = '';
                }

                this.selectElement.selectedIndex = 0;
                this.listElement.scrollTo(0, 0);
                this.defaultChangeValue = this.defaultValue.value;

                if (this.listElement.getElements('li')) {
                    this.listElement.getElements('li').removeEvent(this.eventType, this.itemClicked);
                    if (this.touchStartType) this.listElement.getElements('li').removeEvent(this.touchStartType, this.itemTouchStart);
                }
                this.fuzzySearchItemsTotal = workerData.data.total;
                this.fuzzySearchItems = workerData.data.items;
                this.items = this.listElement.getElements('li');
                this.items.addEvent(this.eventType, this.itemClicked);
                if (this.touchStartType) this.items.addEvent(this.touchStartType, this.itemTouchStart);

                window.fireEvent('elementChanged', { element: this.selectElement });

                break;

            case 'doSearch':

                var returnData = [];

                if (this.listElement.getElements('li')) {
                    this.listElement.getElements('li').removeEvent(this.eventType, this.itemClicked);
                    if (this.touchStartType) this.listElement.getElements('li').removeEvent(this.touchStartType, this.itemTouchStart);
                }

                this.listElement.innerHTML = workerData.html;

                if (workerData.bestguess) {
                    this.bestguess = document.id(workerData.bestguess);
                }

                if (this.iconElement) {
                    this.iconElement.removeClass('working');
                }

                this.items = this.listElement.getElements('li');
                this.items.addEvent(this.eventType, this.itemClicked);
                if (this.touchStartType) this.items.addEvent(this.touchStartType, this.itemTouchStart);

                break;

        }
    },

    cleanDisplay: function (str) {
        if (typeOf(str) === 'string' && str.trim() !== '') {
            var result = str.split(',').filter(function (val) { return val !== ''; }).join(', ');
            return result.trim().replace(/&amp;/gi, '&');
        }
        return str;
    },

    getValue: function () {
        return this.selectElement.value;
    },

    setValue: function (value, fireEvents) {
        fireEvents = fireEvents || true;
        value = this.cleanDisplay(value);
        if (typeOf(this.listElement) !== 'null') {
            if (this.searchMode) {
                if (this.datalistElement.getElement('option[value=' + value + ']')) {
                    this.displayElement.value = value;
                    this.mobileChange();
                }
            } else {
                if (!value || value === '' || typeOf(this.fuzzySearchItems) === 'null' || this.fuzzySearchItems === false) {
                    this.itemClicked({ target: this.listElement.getElement('li'), fireEvents: fireEvents });
                    return;
                }
                var element = false;

                // TODO: Web Worker here

                for (var i = 0; i < this.fuzzySearchItems.length; i++) {
                    if (this.fuzzySearchItems[i].value + '' === value + '') {
                        element = document.id(this.fuzzySearchItems[i].id);
                        break;
                    }
                }
                if (element) {
                    this.itemClicked({ target: element, fireEvents: fireEvents });
                } else {
                    this.itemClicked({ target: this.listElement.getElement('li'), fireEvents: fireEvents });
                }
            }
        }
    },

    getDisplayValue: function () {
        return this.cleanDisplay(this.displayElement.value);
    },

    /* NOTE: Now uses 'Auto Close Handlers'
    mouseIsOver: false,
    dontClose: false,
    */
    status: 'closed',

    /** SEARCH MODE **/

    searchMode_firstPass: true,
    searchMode_lastKnownValue: '',
    searchMode_fireChangeEvents: function (force) {
        this.changed = typeOf(force) === 'boolean' && force === true ? true : false;
        if (this.defaultChangeValue !== this.selectElement.value) {
            this.defaultChangeValue = this.selectElement.value;
            this.changed = true;
        }
        if (!this.searchMode_firstPass && this.changed && this.searchMode_lastKnownValue === this.selectElement.value) {
            this.changed = false;
        }
        if (this.changed) {
            this.defaultChangeValue = this.selectElement.value;
            if (this.selectElement.get('onChange') || this.selectElement.get('onchange')) {
                this.selectElement.onChange();
            } else {
                this.selectElement.fireEvent('change', { target: this.selectElement });
            }
            window.fireEvent('elementChanged', { element: this.selectElement, callee: 'autocomplete search mode' });
        }
        this.searchMode_firstPass = false;
    },

    searchMode_valueToOption: function (value, label, forceEvent) {
        forceEvent = forceEvent || false;
        if (this.selectElement.retrieve('data-store') && this.selectElement.retrieve('data-key')) { // is a lookup or dependency, so empty select as this will re load later, otherwise leave the list that existed at render time
            this.selectElement.empty();
            new Element('option', { value: value, html: label }).inject(this.selectElement);
            this.selectElement.value = value;
            this.selectElement.selectedIndex = 0;
        } else {
            this.selectElement.value = value;
            var options = this.selectElement.getElements('options');
            for (var i = 0; i < options.length; i++) {
                if (options[i].value === value) {
                    this.selectElement.selectedIndex = i;
                    break;
                }
            }
        }
        this.displayElement.value = value;
        this.displayElement.store('data-search-value', value);
        this.searchMode_fireChangeEvents(forceEvent);
    },

    searchMode_iconClicked: function () {

        var searchFor = this.cleanDisplay(this.displayElement.value);

        if (
            (!Affinity.mobile && searchFor.trim() !== '' && searchFor.length > 1) ||
            Affinity.mobile
        ) {

            var select = new Element('select', { 'class': 'override ui-autocomplete-center hidden' });
            var loader = new Element('span', { 'html': 'Loading list <img src="' + Affinity.loaders.dark + '" />' });

            uialert({
                message: 'Set Value<br /><br />',
                showButtons: true,
                showCancel: true,
                canClose: !Affinity.mobile,
                position: {
                    position: 'fixed',
                    top: 10
                },
                onOk: function () {

                    var select = document.id('UIPromtBox').getElement('select'),
                        selectedIndex = select.selectedIndex || 0,
                        options = select.getElements('option'),
                        option = options[selectedIndex],
                        value = option.get('value');

                    this.searchMode_valueToOption(option.get('value'), option.get('html'), true);

                    if (select.getWidget()) {
                        select.getWidget().destroy();
                    }
                    select.destroy();
                }.bind(this),
                onCancel: function () {
                    if (select.getWidget()) {
                        select.getWidget().destroy();
                    }
                    select.destroy();
                },
                onClose: function () {
                    if (select.getWidget()) {
                        select.getWidget().destroy();
                    }
                    select.destroy();
                }
            });

            Affinity.prompts.adopt(loader);
            Affinity.prompts.hideButtons();

            (function () {

                if (this.selectElement.retrieve('data-store') && this.selectElement.retrieve('data-key')) { // we need to go fetch or use the data store from lookups or dependencies store

                    var option;
                    var apiStore = this.selectElement.retrieve('data-store');
                    var apiKey = this.selectElement.retrieve('data-key');
                    var api = Affinity.UI[apiStore][apiKey].api;
                    api = api.contains('limit') ? api.substr(0, api.indexOf('limit') - 1) : api

                    if (Affinity.UI[apiStore][apiKey].data.length === 0) {

                        new Request.JSONP({
                            callbackKey: 'jsoncallback',
                            url: api,
                            method: 'get',
                            timeout: 30000,
                            onComplete: function (jsonData) {
                                if (!JSON.Unauthorized(jsonData, Affinity.UI[apiStore][apiKey].id + ', lookup massive loader')) {
                                    if ('error' in jsonData) {
                                        loader.set('html', 'Failed loading list. Please refresh and try again.');
                                    } else {

                                        if (typeOf(jsonData) === 'array' && jsonData.length > 0) {

                                            Affinity.UI[apiStore][apiKey].data = jsonData;
                                            Affinity.UI[apiStore][apiKey].loaded = true;

                                            if (this.useWebWorkers) {

                                                this.massiveSelect = select;
                                                this.massiveLoader = loader;
                                                this.fuzzyWorker.postMessage({ job: 'getOptions', data: Affinity.UI[apiStore][apiKey].data, searchFor: searchFor, ismobile: Affinity.mobile });

                                            } else {

                                                Array.each(Affinity.UI[apiStore][apiKey].data, function (dataPair) {
                                                    if (dataPair.Value.toLowerCase().indexOf(searchFor.toLowerCase()) > -1 || Affinity.mobile) {
                                                        option = new Element('option', {
                                                            'value': dataPair.Key,
                                                            'html': this.cleanDisplay(dataPair.Value)
                                                        }).inject(select);
                                                        if (dataPair.Value === searchFor) {
                                                            option.set('selected', 'selected');
                                                        }
                                                    }
                                                }.bind(this));
    
                                                Affinity.prompts.adopt(select);
                                                select.removeClass('hidden');
    
                                                new UIAutoCompleteWidget({
                                                    selectElement: select,
                                                    onComplete: function (w) {
                                                        loader.destroy();
                                                        Affinity.prompts.center();
                                                        Affinity.prompts.showButtons();
                                                        Affinity.prompts.show();
                                                        w.position();
                                                        if (Affinity.oldess)
                                                            Affinity.oldessWindow.scrollTo(0, 0);
                                                    }
                                                });

                                            }

                                        }

                                    }
                                }
                            }.bind(this),
                            onError: function (error) {
                                loader.set('html', 'Failed loading list. Please refresh and try again.');
                                Affinity.prompts.showButtons();
                            }.bind(this),
                            onFailure: function (xhr) {
                                loader.set('html', 'Failed loading list. Please refresh and try again.');
                                Affinity.prompts.showButtons();
                            }.bind(this),
                            onTimeout: function () {
                                loader.set('html', 'List loader timed out. Please refresh and try again.');
                                Affinity.prompts.showButtons();
                            }.bind(this)
                        }).send();

                    } else {

                        if (this.useWebWorkers) {

                            this.massiveSelect = select;
                            this.massiveLoader = loader;
                            this.fuzzyWorker.postMessage({ job: 'getOptions', data: Affinity.UI[apiStore][apiKey].data, searchFor: searchFor, ismobile: Affinity.mobile });

                        } else {

                            Array.each(Affinity.UI[apiStore][apiKey].data, function (dataPair) {
                                if (dataPair.Value.toLowerCase().indexOf(searchFor.toLowerCase()) > -1 || Affinity.mobile) {
                                    option = new Element('option', {
                                        'value': dataPair.Key,
                                        'html': this.cleanDisplay(dataPair.Value)
                                    }).inject(select);
                                    if (dataPair.Value === searchFor) {
                                        option.set('selected', 'selected');
                                    }
                                }
                            }.bind(this));
    
                            Affinity.prompts.adopt(select);
                            select.removeClass('hidden');
    
                            new UIAutoCompleteWidget({
                                selectElement: select,
                                onComplete: function (w) {
                                    loader.destroy();
                                    Affinity.prompts.center();
                                    Affinity.prompts.showButtons();
                                    Affinity.prompts.show();
                                    w.position();
                                    if (Affinity.oldess)
                                        Affinity.oldessWindow.scrollTo(0, 0);
                                }
                            });

                        }

                    }

                } else { // even though we are in massive mode, we are not a lookup. Select options are provided on page at render, so just grab what we need from the original select.

                    if (this.useWebWorkers) {

                        this.massiveSelect = select;
                        this.massiveLoader = loader;
                        this.fuzzyWorker.postMessage({ job: 'getOptions', data: Affinity.UI[apiStore][apiKey].data, searchFor: searchFor, ismobile: Affinity.mobile });

                    } else {

                        var val;
                        Array.each(this.selectElement.getElements('option'), function (option) {
                            if (option.get('html').stripTags().toLowerCase().indexOf(searchFor.toLowerCase()) > -1 || Affinity.mobile) {
                                option = new Element('option', {
                                    'value': option.get('value') ? option.get('value') : option.get('html').stripTags(),
                                    'html': this.cleanDisplay(option.get('html'))
                                }).inject(select);
                                if (option.get('html') === searchFor) {
                                    option.set('selected', 'selected');
                                }
                            }
                        }.bind(this));

                        Affinity.prompts.adopt(select);
                        select.removeClass('hidden');

                        new UIAutoCompleteWidget({
                            selectElement: select,
                            onComplete: function (w) {
                                loader.destroy();
                                Affinity.prompts.center();
                                Affinity.prompts.showButtons();
                                Affinity.prompts.show();
                                w.position();
                                if (Affinity.oldess)
                                    Affinity.oldessWindow.scrollTo(0, 0);
                            }
                        });

                    }

                }

            }).delay(300, this);

        } else if (searchFor.trim() !== '' && searchFor.length === 1) {
            uialert({
                message: 'You must enter more than 1 character',
                showButtons: true
            });
        } else {
            uialert({
                message: 'You must enter a search term',
                showButtons: true
            });
        }

    },

    searchMode_displayBlur: function () {
        var searchFor = this.cleanDisplay(this.displayElement.value);
        var value = this.displayElement.retrieve('data-search-value');
        if (value === '' || searchFor !== value) {
            value = searchFor;
        }
        if (this.selectElement.retrieve('data-store') && this.selectElement.retrieve('data-key')) { // is a lookup or dependency, so empty select as this will re load later, otherwise leave the list that existed at render time
            this.selectElement.empty();
            this.searchMode_valueToOption(value, searchFor);
        }
    },

    /****/

    updateOptions: function () {
        this.clearList();
        this.processOptions();
    },

    processCount: 0,
    processOptions: function () {

        if (typeOf(this.selectElement) === 'null' || !this.selectElement || !('getElements' in this.selectElement)) {
            // console.log('There is no select element', this);
            return;
        }

        //this.processCount++;
        //console.log(this.uuid, this.processCount);

        var options = this.selectElement.getElements('option');

        if (options.length > Affinity.selectmax || this.selectElement.hasClass('massive')) {
            this.searchMode = true;
        }

        if (this.searchMode && this.selectElement.hasClass('override')) {
            this.searchMode = false;
        }

        var buildNewDisplay = true;
        var buildNewIcon = true;

        var __uuidCheck;

        if (this.searchMode) {

            /** SEARCH MODE **/

            /* display element */

            __uuidCheck = this.uuid;
            if (Affinity.UI.lastAutoKill[__uuidCheck]) {
                if (document.getElement('.' + Affinity.UI.lastAutoKill[__uuidCheck].killid)) {
                    clearTimeout(Affinity.UI.lastAutoKill[__uuidCheck].destroy);
                    this.displayElement = document.getElement('.' + Affinity.UI.lastAutoKill[__uuidCheck].killid).removeClass(Affinity.UI.lastAutoKill[__uuidCheck].killid).set('id', __uuidCheck + '-Display').inject(this.hiddenWrapper, 'before');
                    this.displayElement.destroyWidget('elementWidget');
                    this.displayElement.removeEvents();
                    buildNewDisplay = false;
                }
                Affinity.UI.lastAutoKill[__uuidCheck] = null;
                delete Affinity.UI.lastAutoKill[__uuidCheck];
            }
            if (buildNewDisplay) {
                this.displayElement = new Element('input', { 'type': 'text', 'class': 'ui-autocomplete-display', 'id': __uuidCheck + '-Display' }).inject(this.hiddenWrapper, 'before');
            }
            this.displayElement.addClass(this.killid);

            /* icon / loader element */

            __uuidCheck = this.uuid + '_icon';
            if (Affinity.UI.lastAutoKill[__uuidCheck]) {
                if (document.getElement('.' + Affinity.UI.lastAutoKill[__uuidCheck].killid)) {
                    clearTimeout(Affinity.UI.lastAutoKill[__uuidCheck].destroy);
                    this.iconElement = document.getElement('.' + Affinity.UI.lastAutoKill[__uuidCheck].killid).removeClass(Affinity.UI.lastAutoKill[__uuidCheck].killid).set('id', __uuidCheck + '-Display-Icon').inject(this.hiddenWrapper, 'before');
                    this.iconElement.removeEvents();
                    buildNewIcon = false;
                }
                Affinity.UI.lastAutoKill[__uuidCheck] = null;
                delete Affinity.UI.lastAutoKill[__uuidCheck];
            }
            if (buildNewIcon) {
                this.iconElement = new Element('span', { 'class': 'ui-autocomplete-display-icon searchmode', 'id': __uuidCheck + '-Display-Icon', 'html': Affinity.icons.Search }).inject(this.displayElement, 'after');
            }
            this.iconElement.addClass(this.killid + '_icon');
            this.iconElement.removeClass('loading');

            if (this.selectElement.hasClass('massive') && this.selectElement.retrieve('data-store') && this.selectElement.retrieve('data-key')) {
                this.displayElement.addEvent('blur', this.searchMode_displayBlur);
                this.iconElement.addEvent(this.eventType, this.searchMode_iconClicked);
                this.searchMode_valueToOption(this.selectElement.retrieve('data-value'), this.selectElement.retrieve('data-label'));
            }

            /* SUPPORT CLEVER FORMS AND OTHER STANDALONE IMPLEMENTATIONS */

            if (!this.selectElement.hasClass('massive')) {
                this.selectElement.addClass('massive');
                this.displayElement.addEvent('blur', this.searchMode_displayBlur);
                this.iconElement.addEvent(this.eventType, this.searchMode_iconClicked);
                if (this.selectElement.retrieve('data-store') && this.selectElement.retrieve('data-key')) {
                    this.searchMode_valueToOption(this.selectElement.retrieve('data-value'), this.selectElement.retrieve('data-label'));
                } else {
                    if (options.length > 0) {
                        var sindex = this.selectElement.selectedIndex && this.selectElement.selectedIndex > 0 ? this.selectElement.selectedIndex : 0;
                        this.searchMode_valueToOption(options[sindex].get('value') || '', options[sindex].get('html'));
                    }
                }
            }

            this.selectElement.set('data-display-id', this.uuid + '-Display');

            /**/

            this.fireEvent('complete', this);

        } else {

            if (!this.displayElement) {

                /* display element */

                __uuidCheck = this.uuid;
                if (Affinity.UI.lastAutoKill[__uuidCheck]) {
                    if (document.getElement('.' + Affinity.UI.lastAutoKill[__uuidCheck].killid)) {
                        clearTimeout(Affinity.UI.lastAutoKill[__uuidCheck].destroy);
                        this.displayElement = document.getElement('.' + Affinity.UI.lastAutoKill[__uuidCheck].killid);
                        this.displayElement.removeClass(Affinity.UI.lastAutoKill[__uuidCheck].killid).set('id', __uuidCheck + '-Display').cloneEvents(this.selectElement);
                        this.displayElement.destroyWidget('elementWidget');
                        this.displayElement.removeEvents();
                        buildNewDisplay = false;
                    }
                    Affinity.UI.lastAutoKill[__uuidCheck] = null;
                    delete Affinity.UI.lastAutoKill[__uuidCheck];
                }
                if (buildNewDisplay) {
                    this.displayElement = new Element('input', { 'type': 'text', 'class': 'ui-autocomplete-display', 'id': this.uuid + '-Display' }).cloneEvents(this.selectElement).inject(this.hiddenWrapper, 'before');
                }
                this.displayElement.addClass(this.selectElement.get('class'));
                this.displayElement.addClass(this.killid);

                /* icon / loader element */

                __uuidCheck = this.uuid + '_icon';
                if (Affinity.UI.lastAutoKill[__uuidCheck]) {
                    if (document.getElement('.' + Affinity.UI.lastAutoKill[__uuidCheck].killid)) {
                        clearTimeout(Affinity.UI.lastAutoKill[__uuidCheck].destroy);
                        this.iconElement = document.getElement('.' + Affinity.UI.lastAutoKill[__uuidCheck].killid).removeClass(Affinity.UI.lastAutoKill[__uuidCheck].killid).set('id', __uuidCheck + '-Display-Icon').inject(this.hiddenWrapper, 'before');
                        this.iconElement.removeEvents();
                        buildNewIcon = false;
                    }
                    Affinity.UI.lastAutoKill[__uuidCheck] = null;
                    delete Affinity.UI.lastAutoKill[__uuidCheck];
                }
                if (buildNewIcon) {
                    this.iconElement = new Element('span', { 'class': 'ui-autocomplete-display-icon', 'id': __uuidCheck + '-Display-Icon', 'html': this.icons.search }).inject(this.displayElement, 'after');
                }
                this.iconElement.addClass(this.killid + '_icon');
                this.iconElement.removeClass('loading');

                /**/

                this.displayElement.makeFormElement();
                this.displayElement.addClass('widget');
                this.displayElement.store('widget', this);

                if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                    this.displayElement.set('autocomplete', 'off');
                }

                if (this.selectElement.hasClass('has-message-icon')) {
                    this.displayElement.addClass('has-message-icon');
                }

                this.selectElement.set('data-display-id', this.uuid + '-Display');

                this.listElement = new Element('ul', { 'class': 'ui-autocomplete-list', 'id': this.domid }).inject(document.body, 'bottom');

                if (this.autowidth) {
                    this.listElement.addClass('auto-width');
                }

                /* SMART CLOSE */

                if (Affinity.mobile) {

                    window.addEvent('mobileback', function () {
                        this.hide();
                    }.bind(this));

                } else {

                    new Affinity.SmartClose(this.displayElement);
                    new Affinity.SmartClose(this.listElement);

                    this.displayElement.addEvent('SmartClose', function () {
                        if (!this.listElement.isOver()) {
                            this.hide();
                        }
                    }.bind(this));

                    this.listElement.addEvent('SmartClose', function () {
                        if (!this.displayElement.isOver()) {
                            this.hide();
                        }
                    }.bind(this));

                }

                /**/

                if (this.displayElement.hasClass('width-auto') || this.displayElement.hasClass('width-full')) {
                    this.listElement.setStyle('width', this.displayElement.getSize().x);
                }

                this.listElement.set('tween', { duration: 100 });
                this.listElement.fade('hide');

                this.displayElement.addEvent('focus', this.doFocus);

                this.listElement.set('tween', {
                    duration: 100,
                    onComplete: function (el) {
                        if (el.getStyle('opacity') === 0) {
                            el.addClass('hidden');
                        } else {
                            el.removeClass('hidden');
                        }
                    }
                });
                this.listElement.fade('hide');

            } else {

                this.listElement.empty();

            }

            /**/

            var html, li;

            this.items = [];
            this.fuzzySearchItems = [];

            var defaultSelected = null;
            this.defaultValue = null;

            if (this.useWebWorkers) {

                if (this.iconElement) {
                    this.iconElement.addClass('working');
                }

                this.fuzzyWorker.postMessage({
                    job: 'getList',
                    html: this.selectElement.innerHTML,
                    defaultValue: this.selectElement.get('data-default-value') || false,
                    uuid: this.uuid
                });

            } else {

                Array.each(this.selectElement.getElements('option'), function (option, index) {
                    html = this.cleanDisplay(option.get('html'));
                    value = option.get('value');
                    li = new Element('li', { 'html': html, 'data-value': value, 'class': 'visible', 'id': this.uuid + '-li-' + index, 'role': 'option' });
                    li.set('data-index', index);
                    li.set('data-value', value);
                    li.addEvent(this.eventType, this.itemClicked);
                    if (this.touchStartType) li.addEvent(this.touchStartType, this.itemTouchStart);
                    li.inject(this.listElement);
                    if (option.selected) {
                        defaultSelected = li;
                        this.defaultValue = li;
                        li.addClass('selected');
                        this.lastSelected = li;
                        this.defaultChangeValue = option.value;
                    }
                    this.items.push(li);
                    this.fuzzySearchItems.push({
                        //element: li,
                        id: this.uuid + '-li-' + index,
                        html: html,
                        klass: 'visible',
                        searchstr: html,
                        value: option.value
                    });
                }.bind(this));

                this.continueProcessOptsions(defaultSelected);
            }

        }
     },

    continueProcessOptsions: function (defaultSelected) {

        if (!this.searchMode) {

            if (!this.useWebWorkers) {
                this.fuzzySearchItemsTotal = this.fuzzySearchItems.length;
            }
            if (this.iconElement) {
                this.iconElement.removeClass('working');
            }
            this.fuzzySearchLargeDataDelay = false;
            //if (this.fuzzySearchItemsTotal >= 1000 && this.fuzzySearchItemsTotal < 2000) {
            if (true) {
                this.fuzzySearchLargeDataDelay = 100;
            }
            if (this.fuzzySearchItemsTotal >= 2000 && this.fuzzySearchItemsTotal < 3000) {
                this.fuzzySearchLargeDataDelay = 250;
            }
            if (this.fuzzySearchItemsTotal >= 3000 && this.fuzzySearchItemsTotal < 5000) {
                this.fuzzySearchLargeDataDelay = 500;
            }
            if (this.fuzzySearchItemsTotal >= 5000) {
                this.fuzzySearchLargeDataDelay = 1000;
            }
            if (Affinity.isie && Affinity.ieversion === 11) {
                this.fuzzySearchLargeDataDelay = 1001;
            }

            if (this.defaultValue === null) {
                this.defaultValue = this.listElement.getElement('li');
            }

            /**/

            this.keyHeldCheck = false;
            this.keyHeld = false;
            this.keyHeldDelay = null;

            this.displayElement.addEventListener('keyup', this.doKeyUp);
            this.displayElement.addEventListener('keydown', this.doKeyDown);

            /**/

            if (defaultSelected !== null) {
                this.defaultSelected({ target: defaultSelected });
            }

            /**/

            this.fireEvent('complete', this);

            /**/

            /* this should only call 'change' IF it has changed, otherwise, don't but  */
            /* because I do not know the impact this will have, just change anyway     */
            /*
            if (this.selectElement.value !== this.defaultChangeValue) {
                this.defaultChangeValue = this.selectElement.value;
                this.changed = true;
                this.selectElement.fireEvent('change');
            } else {
                this.changed = false;
            }
            */
            if (this.selectElement.value !== this.defaultChangeValue) {
                this.defaultChangeValue = this.selectElement.value;
                this.changed = true;
            } else {
                this.changed = false;
            }
            if (this.options.stopInitialChange) {
                this.selectElement.fireEvent('change', { target: this.selectElement });
            }

            /**/

            this.checkExistsPeriodical = this.checkExists.periodical(1000, this);

        }

        if (this.displayElement) {
            this.valuetracker.addElement(this.displayElement);
        }

    },

    stopEvent: function (e) {
        if (e.hasOwnProperty('stop')) {
          e.stop();
        } else {
          e.preventDefault();
          e.stopPropagation();
        }
    },

    /**/

    reset: function () {
        if (!this.searchMode) {
            var select = false;
            if (typeOf(this.defaultValue) !== 'null' && this.defaultValue && this.defaultValue.get('tag') === 'li') {
                select = this.defaultValue;
            }
            if (typeOf(this.lastSelected) !== 'null' && this.lastSelected && this.lastSelected.get('tag') === 'li') {
                select = this.lastSelected;
            }
            Array.each(this.items, function (li, index) {
                li.inject(this.listElement);
                li.removeClass('selected');
                li.removeClass('hidden');
                li.addClass('visible');
                if (!this.fuzzySearchLargeDataDelay) {
                    li.set('html', this.cleanDisplay(li.get('html').stripTags()));
                }
                if (select && li === select) {
                    li.addClass('selected');
                    this.listElement.scrollTo(0, li.getPosition(this.listElement).y - 5);
                    this.displayElement.value = this.cleanDisplay(select.get('html').stripTags());
                }
            }.bind(this));
        }
    },

    checkExists: function () {
        if (!document.contains(this.selectElement)) {
            clearInterval(this.checkExistsPeriodical);
            this.destroy();
        }
    },

    /** EVENT FUNCTIONS **/

    doFocusDelay: false,
    doFocus: function () {
        clearTimeout(this.doFocusDelay);
        this.doFocusDelay = (function () {
            // console.log('displayElement focus : autocomplate ' + this.uuid + ' : ' + (this.mouseIsOver ? 'is over' : 'is NOT over'));
            if (this.status == 'closed') {
                this.show('displayElement focus');
            }
        }.delay(100, this));

        if (Affinity.mobile) {
            if (
              this.displayElement.value.trim().toLowerCase() === 'select.' ||
              this.displayElement.value.trim().toLowerCase() === 'select..' ||
              this.displayElement.value.trim().toLowerCase() === 'select...'
            ) {
              this.displayElement.value = '';
              this.displayElement.focus();
            }
            //this.displayElement.selectionStart = 0;
            //this.displayElement.selectionEnd = 999999;
        }

    },

    doClick: function (e) {
        this.stopEvent(e);
        this.displayElement.select();
    },

    doKeyUp: function (e) {
        if (e.key == 'tab' || e.key == 'Tab' || e.shift) {
            return;
        }
        if (e.key == 'tab' || e.key == 'Tab') {
            this.hide('on key up tab');
        }
        clearTimeout(this.keyHeldDelay);
        if (!this.keyHeld) {
            this.elementKeyUp(e);
        }
        this.keyHeld = false;
        this.keyHeldCheck = false;
    },

    doKeyDown: function (e) {
        if (e.key == 'tab' || e.key == 'Tab' || e.shift) {
            return;
        }
        if (e.key == 'tab' || e.key == 'Tab') {
            this.hide('on key down tab');
        }
        if (e.key == 'enter' || e.key == 'Enter') {
            this.stopEvent(e);
            return;
        }
        if (e.key == 'down' || e.key == 'up' || e.key == 'ArrowDown' || e.key == 'ArrowUp') {
            if (this.keyHeldCheck || this.keyHeld) {
                this.stopEvent(e);
                return;
            }
            if (!this.keyHeldCheck && !this.keyHeld) {
                this.keyHeldCheck = true;
                this.keyHeldDelay = this.elementKeySetHeld.delay(500, this, [e]);
            }
        }
    },

    /**/

    elementKeySetHeld: function (e) {

        this.keyHeld = true;
        this.elementKeyUp(e);

    },

    getTopVisibleElement: function () {

        var items = this.listElement.getElements('li.visible');
        var i, li, pos;

        for (i = 0; i < items.length; i++) {

            li = items[i];

            pos = li.getPosition(this.listElement);

            if (pos.y > 0) {

                return li;

            }

        }

    },

    getBottomVisibleElement: function () {

        var height = this.listElement.getSize().y;
        var items = this.listElement.getElements('li.visible');
        var i, li, pos;

        for (i = items.length - 1; i > 0; i--) {

            li = items[i];

            pos = li.getPosition(this.listElement);

            if (pos.y < height) {

                return li;

            }

        }

    },

    scrollToTop: function (li) {

        var scroll = this.listElement.getScroll().y;
        var pos = li.getPosition(this.listElement).y;
        var size = li.getSize().y;

        if (pos < 0) {

            this.listElement.scrollTo(0, (scroll + pos) - size + 10);

        }

    },

    scrollToBottom: function (li) {

        var scroll = this.listElement.getScroll().y;
        var height = this.listElement.getSize().y;
        var pos = li.getPosition(this.listElement).y;
        var size = li.getSize().y;

        if (pos > (height - size)) {

            this.listElement.scrollTo(0, scroll + (pos - height) + size + 5);

        }

    },

    escapeRegExp: function (str) {

        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

    },
    
    //fuzzyWorker: false,
    fuzzyRunning: false,
    fuzzySearch: function (searchData, searchKey, searchFor, target) {
        if (this.fuzzyRunning) {
            return;
        }

        this.fuzzyRunning = true;

        var returnData = [],
            workerData, element;

        if (this.useWebWorkers) {

            this.fuzzyDoSearchData = {
                searchData: searchData,
                target: target
            };

            if (this.iconElement) {
                this.iconElement.addClass('working');
            }

            this.fuzzyWorker.postMessage({
                job: 'doSearch',
                data: searchData,
                searchKey: searchKey,
                searchFor: searchFor,
                perfDelay: this.fuzzySearchLargeDataDelay
            });

        } else {

            var results = [];
            var data, element;
            var score, wordScore, wordScores, searchIn, isMatch, hasMatch, totalWordsToSearch, totalWordMatch;
            var searchForWords, searchInWords, soundexFor, soundexIn, soundexScore;
            var html;

            if (!isNaN(searchFor)) {

                Array.each(searchData, function (data, index) {
                    element = document.id(data.id);
                    if (data[searchKey].contains(searchFor)) {
                        wordScore = data[searchKey].split(searchFor).length - 1 || 0;
                        searchInWords = data[searchKey].split(' ');
                        results.push({
                            originalIndex: index,
                            score: wordScore,
                            wordScore: wordScore / searchInWords
                        });
                        element.removeClass('hidden').addClass('visible');
                    } else {
                        element.addClass('hidden').removeClass('visible');
                    }
                });

            } else {

                var longestSearchStr = searchData.reduce(function(max, obj) {
                    return obj.searchstr.length > max.length ? obj.searchstr : max;
                }, "").length;

                Array.each(searchData, function (dataItem, index) {
                    element = document.id(dataItem.id);
                    score = 0;
                    wordScores = [];
                    searchFor = searchFor.toLowerCase();
                    searchIn = dataItem[searchKey].toLowerCase().trim();
                    isMatch = searchFor === searchIn;
                    hasMatch = searchIn.indexOf(searchFor) > -1 ? true : false;

                    searchForWords = searchFor.split(' ');
                    totalWordsToSearch = searchForWords.length;

                    if (isMatch) {

                        totalWordMatch = totalWordsToSearch;
                        wordScore = 99999;
                        score = 99999;
                        
                        if (this.fuzzySearchLargeDataDelay && this.fuzzySearchLargeDataDelay > 100) {
                            element.removeClass('hidden').addClass('visible');
                        } else {
                            html = '<strong>' + this.cleanDisplay(element.get('html').stripTags()) + '</strong>';
                            element.set('html', html).removeClass('hidden').addClass('visible');
                        }

                    } else if (!isMatch && hasMatch) {

                        totalWordMatch = searchIn.split(searchFor).length - 1 || 0;

                        wordScore = totalWordMatch;
                        score = wordScore + 100;
                        score += searchFor.length;
                        score += longestSearchStr - searchIn.length;

                        if (this.fuzzySearchLargeDataDelay && this.fuzzySearchLargeDataDelay > 100) {
                            element.removeClass('hidden').addClass('visible');
                        } else {
                            html = this.cleanDisplay(element.get('html').stripTags()).replace(new RegExp('(' + this.escapeRegExp(searchFor) + ')', 'gi'), "<strong>$1</strong>");
                            element.set('html', html).removeClass('hidden').addClass('visible');
                        }

                    } else {

                        if (this.fuzzySearchLargeDataDelay < 1001) {

                            searchInWords = searchIn.split(' ');
                            totalWordMatch = 0;
                            Array.each(searchForWords, function (searchForWord) {
                                Array.each(searchInWords, function (searchInWord) {
                                    if (searchForWord != ' ' && searchForWord != '') {
                                        soundexFor = searchForWord.soundex();
                                        soundexIn = searchInWord.soundex();
                                        soundexScore = soundexFor.distance(soundexIn);
                                        if (soundexScore == 0) {
                                            totalWordMatch += 1;
                                        }
                                    }
                                });
                            });
                            score = totalWordMatch;
                            wordScore = Number.round(totalWordMatch / totalWordsToSearch, 2) || 0;

                            if (score >= 0) {

                                if (this.fuzzySearchLargeDataDelay) {
                                    element.removeClass('hidden').addClass('visible');
                                } else {
                                    html = this.cleanDisplay(element.get('html').stripTags());
                                    element.set('html', html).removeClass('hidden').addClass('visible');
                                }

                            }

                        }

                    }
                    data = {
                        originalIndex: index,
                        score: score,
                        wordScore: wordScore
                    };
                    results.push(data);

                }.bind(this));

            }

            results.sort(function (a, b) {
                if (parseFloat(a.score) === parseFloat(b.score)) {
                    return parseFloat(a.wordScore) < parseFloat(b.wordScore) ? 1 : -1;
                }
                return parseFloat(a.score) < parseFloat(b.score) ? 1 : -1;
            });

            var gotone = false;
            Array.each(results, function (result) {
                data = searchData[result.originalIndex];
                data.score = result.score;
                data.wordScore = result.wordScore;
                returnData.push(data);
                element = document.id(data.id);
                if (result.score > 0) {
                    element.inject(target);
                    gotone = true;
                } else {
                    element.addClass('hidden').removeClass('visible');
                }
            });

            if (!gotone && results.length > 0 && results[0].originalIndex && searchData[results[0].originalIndex] && searchData[results[0].originalIndex].id) {
                this.bestguess = document.id(searchData[results[0].originalIndex].id);
            }
        }

        this.fuzzyRunning = false;

        return returnData;

    },

    elementKeyUp: function (e) {

        var compstr = this.cleanDisplay(this.displayElement.value.toLowerCase());
        var selected = this.listElement.getElement('li.visible.selected') || false;

        if ((e.key == 'enter' || e.key == 'Enter') && selected) {
            this.stopEvent(e);
            this.itemClicked({ target: selected });
            return;
        }

        if (e.key == 'down' || e.key == 'up' || e.key == 'ArrowDown' || e.key == 'ArrowUp') {

            if (this.status == 'closed') {
                this.show();
            }

            e.preventDefault();

            if (e.key == 'down' || e.key == 'ArrowDown') {
                this.elementDown(e);
            }

            if (e.key == 'up' || e.key == 'ArrowUp') {
                this.elementUp(e);
            }

            if (this.keyHeld) {
                this.elementKeyUp.delay(50, this, [e]);
            }

            return;

        }

        if (Affinity.mobile)
        {
          if (this.status !== 'open') {
              this.show();
          }
        }
        else
        {
            if (
                (e.keyCode === 8) || // backspace
                (e.keyCode === 16) || // shift
                (e.keyCode === 32) || // delete
                (e.keyCode === 46) || // space
                (e.keyCode >= 48 && e.keyCode <= 57) || // a-z upper
                (e.keyCode >= 65 && e.keyCode <= 90) || // a-z lower
                (e.keyCode >= 96 && e.keyCode <= 105) // num pad
            ) {
                if (this.status == 'closed') {
                    this.show();
                }
                /* search when key pressed is space, backspace, delete, a-z, 0-9 or num pad 0-9 */
            } else {
                return;
            } 
        }

        if (compstr === '') {

            if (this.useWebWorkers) {

                this.fuzzyWorker.postMessage({ job: 'resetList' });

            } else {

                Array.each(this.items, function (li, index) {
                    li.inject(this.listElement);
                    li.set('html', this.cleanDisplay(li.get('html').stripTags()));
                    li.removeClass('selected').removeClass('hidden').addClass('visible');
                    if (li.get('html').trim() === '') {
                        li.addClass('selected');
                        if (selected !== li) {
                            this.changed = true;
                        }
                        this.lastSelected = li;
                        this.defaultValue = li;
                        this.selectElement.value = '';
                        this.selectElement.selectedIndex = 0;
                        this.listElement.scrollTo(0, 0);
                        this.defaultChangeValue = this.selectElement.getElements('option')[0].value;
                    }
                }.bind(this));

                this.bestguess = this.defaultValue;

                window.fireEvent('elementChanged', { element: this.selectElement });

            }

            return;

        }

        /* filter search */

        this.listElement.getElements('li').removeClass('selected');

        this.listElement.scrollTo(0, 0);

        /* FUZZY SEARCH */

        if (selected) {
            this.lastSelected = selected;
        }

        if (this.fuzzySearchLargeDataDelay) {
            clearTimeout(this.fuzzySearchDelay);
            this.fuzzySearchDelay = this.continueWithFuzzySearch.delay(this.fuzzySearchLargeDataDelay, this);
        } else {
            this.continueWithFuzzySearch();
        }

        /**/

        this.position();

    },

    continueWithFuzzySearch: function () {
        var result = this.fuzzySearch(this.fuzzySearchItems, 'searchstr', this.cleanDisplay(this.displayElement.value.toLowerCase()), this.listElement);
        this.position();
    },

    elementUp: function () { /* keypress - up arrow */

        if (this.listElement.getElements('li.visible').length === 0) {
            this.hide('elementUp with empty list');
            return;
        }

        var selected = this.listElement.getElement('li.visible.selected');
        var topElement = this.getTopVisibleElement();
        var bottomElement = this.getBottomVisibleElement();
        var index = -1;
        var items = this.listElement.getElements('li.visible');

        if (selected) { /* previous item has been selected */
            index = items.indexOf(selected);
            selected.removeClass('selected');
        }

        if (index > items.indexOf(bottomElement)) {
            if (bottomElement && 'addClass' in bottomElement) {
                bottomElement.addClass('selected');
            }
        } else {
            if (index > 0) {
                if (items[index - 1] && 'addClass' in items[index - 1]) {
                    items[index - 1].addClass('selected');
                    this.scrollToTop(items[index - 1]);
                }
            } else {
                if (this.listElement.scrollHeight == this.listElement.clientHeight) {
                    if (bottomElement && 'addClass' in bottomElement) {
                        bottomElement.addClass('selected');
                    }
                } else {
                    if (topElement && 'addClass' in topElement) {
                        topElement.addClass('selected');
                    }
                }
            }
        }

        window.fireEvent('elementChanged', { element: this.selectElement });

    },

    elementDown: function () { /* keypress - down arrow */

        if (this.listElement.getElements('li.visible').length === 0) {
            this.hide('elementDown with empty list');
            return;
        }

        var selected = this.listElement.getElement('li.visible.selected');
        var topElement = this.getTopVisibleElement();
        var bottomElement = this.getBottomVisibleElement();
        var index = -1;
        var items = this.listElement.getElements('li.visible');

        if (selected && 'addClass' in selected) { /* previous item has been selected */
            index = items.indexOf(selected);
            selected.removeClass('selected');
        }

        if (index < items.indexOf(topElement)) {
            if (topElement && 'addClass' in topElement) {
                topElement.addClass('selected');
            }
        } else {
            if (index < items.length - 1) {
                if (items[index + 1] && 'addClass' in items[index + 1]) {
                    items[index + 1].addClass('selected');
                    this.scrollToBottom(items[index + 1]);
                }
            } else {
                if (this.listElement.scrollHeight == this.listElement.clientHeight) {
                    if (topElement && 'addClass' in topElement) {
                        topElement.addClass('selected');
                    }
                } else {
                    if (bottomElement && 'addClass' in bottomElement) {
                        bottomElement.addClass('selected');
                    }
                }
            }
        }

    },

    defaultSelected: function (e) {
        var html = this.cleanDisplay(e.target.get('html').stripTags());
        this.listElement.getElements('li').removeClass('selected');
        e.target.addClass('selected');
        this.displayElement.value = html;
        this.selectElement.selectedIndex = e.target.get('data-index');
        this.selectElement.value = e.target.get('data-value');
    },

    // iOS: Record touch start position to distinguish tap from scroll
    itemTouchStart: function (e) {
        if (e && e.event && e.event.touches && e.event.touches.length > 0) {
            this._touchStartX = e.event.touches[0].clientX;
            this._touchStartY = e.event.touches[0].clientY;
        }
    },

    itemClicked: function (e) {
        // iOS: Check if this was a scroll gesture (finger moved significantly)
        if (Affinity.isAppleMobile && e && e.type === 'touchend') {
            if (e.event && e.event.changedTouches && e.event.changedTouches.length > 0) {
                var touch = e.event.changedTouches[0];
                var deltaX = Math.abs(touch.clientX - this._touchStartX);
                var deltaY = Math.abs(touch.clientY - this._touchStartY);
                // If finger moved more than threshold, it was a scroll - ignore
                if (deltaX > this._touchMoveThreshold || deltaY > this._touchMoveThreshold) {
                    return false;
                }
            }
            // It was a tap - prevent synthetic click
            e.preventDefault();
        }
        this.hide('item clicked');
        var target = e.target.get('tag') == 'li' ? e.target : e.target.getParent('li');
        var fireEvents = e.hasOwnProperty('fireEvents') && e.fireEvents === false ? false : true;
        this.listElement.getElements('li').removeClass('selected');
        target.addClass('selected');
        this.lastSelected = target;
        this.displayElement.value = this.cleanDisplay(target.get('html').stripTags());
        this.selectElement.selectedIndex = target.get('data-index');
        this.selectElement.value = target.get('data-value');
        /* this should only call 'change' IF it has changed, otherwise, don't but  */
        /* because I do not know the impact this will have, just change anyway     */
        /*
        if (this.selectElement.value !== this.defaultChangeValue) {
            this.defaultChangeValue = this.selectElement.value;
            this.changed = true;
            if (this.selectElement.get('onChange') || this.selectElement.get('onchange')) {
                this.selectElement.onChange();
            } else {
                this.selectElement.fireEvent("change");
            }
            window.fireEvent('elementChanged', { element: this.selectElement, callee: 'autocomplete itemClicked' });
        } else {
            this.changed = false;
        }
        */
        if (this.selectElement.value !== this.defaultChangeValue) {
            this.defaultChangeValue = this.selectElement.value;
            this.changed = true;
        } else {
            this.changed = false;
        }
        if (fireEvents) {
            if (this.selectElement.get('onChange') || this.selectElement.get('onchange')) {
                this.selectElement.onChange();
            } else {
                this.selectElement.fireEvent('change', { target: this.selectElement });
            }
            window.fireEvent('elementChanged', { element: this.selectElement, callee: 'autocomplete itemClicked' });
            this.fireEvent('elementChanged', this.selectElement.value);
        }
    },

    getElementPosition: function (node)
    {
      var rect = node.getBoundingClientRect();
      var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    },

    scrollToDisplayNode: function (delayedBy)
    {
      delayedBy = delayedBy === undefined ? 0 : delayedBy;
      if (Affinity.mobile && !document.body.classList.contains('uimodal-open'))
      {
        var pos = this.getElementPosition(this.displayElement);
        var offset = document.querySelector('.ss-dashboard-wrap-main-header') ? document.querySelector('.ss-dashboard-wrap-main-header').getBoundingClientRect().height : 0;
        var scroll = pos.top - offset - 10;
        window.scrollTo(window.scrollX, scroll);
        if (delayedBy === 0)
        {
          setTimeout(this.scrollToDisplayNode, 300, 300);
          setTimeout(this.scrollToDisplayNode, 500, 500);
        }
      }
    },

    position: function () {
        if (this.status !== 'open') return;
        if (this.displayElement && this.listElement) {

            try {

                var padding = 20;
                var viewHeight = Affinity.mobile ? window.visualViewport.height : window.getSize().height;
                var headerHeight = document.querySelector('.ss-dashboard-wrap-main-header') ? document.querySelector('.ss-dashboard-wrap-main-header').getBoundingClientRect().height : 0;
                
                var displayRect = this.displayElement.getBoundingClientRect();
                var displayPos = this.getElementPosition(this.displayElement);
                var displayHeight = displayRect.height;
                var listWidth = displayRect.width;
                var listHeight = viewHeight - headerHeight - displayHeight - padding;

                var displayTop = displayPos.top;
                var displayLeft = displayPos.left;

                var listTop = displayTop + displayHeight;
                var listLeft = displayLeft;

                this.listElement.setStyles({
                    'position': 'absolute',
                    'width': listWidth,
                    'max-height': listHeight,
                    'top': listTop,
                    'left': listLeft
                });

                this.scrollToDisplayNode();

            } catch (e) { }
        }
    },

    obscure: function () {
        this.hide();
        if (this.iconElement) {
            this.iconElement.addClass('hidden');
        }
        if (this.displayElement) {
            this.displayElement.addClass('hidden');
        }
    },

    reveal: function () {
        if (this.iconElement) {
            this.iconElement.removeClass('hidden');
        }
        this.displayElement.removeClass('hidden');
    },

    unsetWindowClose: function ()
    {
      this.displayElement.removeEventListener('click', this.stopEvent);
      this.listElement.removeEventListener('click', this.stopEvent);
      window.removeEventListener('click', this.hide);
    },

    setWindowClose: function ()
    {
      this.unsetWindowClose();
      this.displayElement.addEventListener('click', this.stopEvent);
      this.listElement.addEventListener('click', this.stopEvent);
      window.addEventListener('click', this.hide);
    },

    hide: function (calledFrom) {
        if (this.status !== 'closed') {
            //console.log('hide called from : ' + calledFrom);
            clearTimeout(this.doFocusDelay);
            clearTimeout(this.fuzzySearchDelay);
            this.unsetWindowClose();
            var listbox = this.listElement;
            listbox.fade('out');
            this.status = 'closed';
            (function () {
                listbox.addClass('hidden');
                if (this.listElement && 'getElement' in this.listElement && !this.listElement.getElement('li.visible.selected')) {
                    this.lastSelected = this.listElement.getElement('li.visible.selected');
                }
                this.reset();
            }).delay(250, this);
        }
    },

    show: function (calledFrom) {
        if (this.status !== 'open' && this.listElement && 'getElements' in this.listElement && this.listElement.getElements('li.visible').length > 0) {
            //console.log('show called from : ' + calledFrom);
            window.autocompletes.hideAll(this);
            clearTimeout(this.doFocusDelay);
            var listbox = this.listElement;
            listbox.removeClass('hidden');
            listbox.fade('in');
            this.status = 'open';
            this.position();
            this.position.delay(250, this);
            if (this.listElement && 'getElement' in this.listElement && this.listElement.getElement('li.visible.selected')) {
                var li = this.listElement.getElement('li.visible.selected');
                this.listElement.scrollTo(0, li.getPosition(this.listElement).y - 5);
            }
            setTimeout(this.setWindowClose, 50);
        }
    },

    clearList: function () {
        if (this.listElement) {
            Array.each(this.listElement.getElements('li'), function (li) {
                li.removeEvents();
            }.bind(this));
            this.listElement.empty();
        }
    },

    revert: function (destroy) {

        var killSelect = typeOf(destroy) === 'null' ? false : destroy;

        if (this.useWebWorkers && this.fuzzyWorker && 'terminate' in this.fuzzyWorker) {
            this.fuzzyWorker.terminate();
            this.fuzzyWorker = false;
        }

        /*
        var method = 'native remove';
        var method = 'native remove children';
        var method = 'moo remove';
        var method = 'moo remove children';
        */

        var method = 'moo remove children';

        clearTimeout(this.doFocusDelay);
        clearTimeout(this.fuzzySearchDelay);
        clearInterval(this.checkExistsPeriodical);

        this.doFocusDelay = null;
        this.fuzzySearchDelay = null;
        this.checkExistsPeriodical = null;

        if (this.displayElement) {
            //this.displayElement.destroyWidget('elementWidget');
            //this.displayElement.removeEvents();
            Affinity.UI.lastAutoKill[this.uuid] = {};
            Affinity.UI.lastAutoKill[this.uuid].id = this.uuid + '';
            Affinity.UI.lastAutoKill[this.uuid].killid = this.killid + '';
            Affinity.UI.lastAutoKill[this.uuid].destroy = Affinity.UI.delayAutoKill.delay(2000, window, [this.uuid + '', this.killid + '']);

            if (this.iconElement) {
                //this.iconElement.removeEvents();
                this.iconElement.addClass('loading');
                Affinity.UI.lastAutoKill[this.uuid + '_icon'] = {};
                Affinity.UI.lastAutoKill[this.uuid + '_icon'].id = this.uuid + '_icon';
                Affinity.UI.lastAutoKill[this.uuid + '_icon'].killid = this.killid + '_icon';
                Affinity.UI.lastAutoKill[this.uuid + '_icon'].destroy = Affinity.UI.delayAutoKill.delay(2000, window, [this.uuid + '_icon', this.killid + '_icon']);
            }

        }

        if (!Affinity.mobile) {
            document.removeEvent('scroll', this.position);
            document.removeEvent('resize', this.position);
        }

        if (this.listElement) {

            this.listElement.set('tween', null);
            this.listElement.removeEvents();

            if (method === 'native remove') {
                try {
                    this.listElement.parentNode.removeChild(this.listElement);
                } catch (e) { };
            }

            if (method === 'native remove children') {
                while (this.listElement.lastChild) {
                    this.listElement.lastChild.removeEventListener(this.eventType, this.itemClicked);
                    this.listElement.removeChild(this.listElement.lastChild);
                }
                try {
                    this.listElement.parentNode.removeChild(this.listElement);
                } catch (e) { };
            }

            if (method === 'moo remove') {
                this.listElement.destroy();
            }

            if (method === 'moo remove children') {
                this.clearList();
                this.listElement.destroy();
            }

        }

        if (this.displayElement) {
            this.displayElement.removeEvents();
            if (this.displayElement.getWidget('elementWidget')) {
                this.displayElement.getWidget('elementWidget').destroy();
            }
            if (this.searchMode) {
                this.displayElement.eliminate('value');
            }
        }

        if (this.selectElement) {
            this.selectElement.inject(this.hiddenWrapper, 'before');
            this.selectElement.eliminate('widget');
            if (killSelect) {
                if (this.selectElement.retrieve('changetracker')) {
                    this.selectElement.retrieve('changetracker').destroy();
                }
                this.selectElement.destroy();
            }
        }
        if (this.hiddenWrapper) {
            this.hiddenWrapper.destroy();
        }

        if (window.autocompletes.widgets[this.uuid]) {
            window.autocompletes.widgets[this.uuid] = null;
            delete window.autocompletes.widgets[this.uuid];
        }

        Object.each(this, function (val, key) {
            this[key] = null;
            delete this[key];
        }.bind(this));

        return true;

    },

    destroy: function () {
        if (this.useWebWorkers && this.fuzzyWorker) {
            this.fuzzyWorker.terminate();
            this.fuzzyWorker = false;
        }
        this.revert(true);
    }

});



var UIDateCalendar = new Class({

    Version: '1.0.0.0',
    File: 'ui.date.calendar.js',

	Implements: [Options, Events],

	Binds: [
		'processNew',
		'processDateInput',
		'hideAll'
	],

	options: {
		outputFormat: '%d.%m.%Y',
		displayFormat: '%a the %e%o of %b %Y'
	},

	widgets: {},

	initialize: function (options) {

		this.setOptions(options);

		if (!Affinity.UI) { Affinity.UI = {}; }

		Affinity.UI.calendars = this;

		this.processNew();

	},

	processNew: function () {
		Array.each(document.getElements('input.uidate-calendar'), this.processDateInput);
	},

	processDateInput: function (el) {

		if (el.hasClass('uidone')) {
			return;
		}

		el.addClass('uidone');

		var calendarOptions = {
			target: el,
			postName: el.get('name') || '',
			postId: el.get('id') || '',
			startDate: el.get('data-start-date') || new Date(),
			validationMethods: el.get('data-validate-method') || '',
			validationErrorStr: el.get('data-validate-error-str') || '',
			showInline: el.hasClass('show-inline') ? true : false,
			nullable: false
		};

		switch (el.get('data-calendar-type')) {
			case 'date':
				calendarOptions.showCalendar = true;
				calendarOptions.showTime = false;
				break;
			case 'time':
				calendarOptions.showCalendar = false;
				calendarOptions.showTime = true;
				break;
			case 'datetime':
				calendarOptions.showCalendar = true;
				calendarOptions.showTime = true;
				break;
            case 'hoursmins':
                calendarOptions.showCalendar = true;
                calendarOptions.showTime = true;
                calendarOptions.hoursmins = true;
                break;
			default:
				calendarOptions.showCalendar = true;
				calendarOptions.showTime = false;
				break;
		}

		if (el.get('data-calendar-display-format')) {
			calendarOptions.displayFormat = el.get('data-calendar-display-format');
		}

		if (el.get('data-calendar-return-format')) {
			calendarOptions.outputFormat = el.get('data-calendar-return-format');
		}

		if (el.get('data-calendar-nullable')) {
			calendarOptions.nullable = el.get('data-calendar-nullable').trim().toLowerCase() === 'true' ? true : false;
		}

		if (el.get('data-calendar-hoursmins')) {
		    calendarOptions.hoursmins = el.get('data-calendar-hoursmins').trim().toLowerCase() === 'true' ? true : false;
		}

		if (el.hasClass('preserve-original-input')) {
		    calendarOptions.preserveOriginalInput = true;
		}

		if (calendarOptions.hoursmins && !el.get('data-start-date')) {
		    calendarOptions.startDate.setMinutes(0);
		    calendarOptions.startDate.setHours(0);
		    calendarOptions.startDate.setSeconds(0);
		    calendarOptions.startDate.setMilliseconds(0);
		}

		var ca = new UIDateTimeWidget(calendarOptions);

		if (!this.widgets[ca.uuid]) {
			this.widgets[ca.uuid] = ca;
		}

		delete ca;
		delete calendarOptions;

	},

	hideAll: function (except) {
		Object.each(this.widgets, function (widget) {
			if (typeOf(except) !== 'null' && except.uuid) {
				if (widget.uuid !== except.uuid) {
					widget.hide();
				}
			} else {
				widget.hide();
			}
		}.bind(this));
	}

});


var UIDateTimeWidget = new Class({

	Implements: [Options, Events],

	options: {
	    target: null,
	    preserveOriginalInput: false,
		outputFormat: '%d.%m.%Y',
		displayFormat: '%a %e %b %Y',
		showCalendar: true,
		showTime: false,
		startDate: null,
		labelName: '',
		postId: '',
		postName: '',
		validationMethods: '',
		validationErrorStr: '',
		cssPosition: 'absolute',
		watchOutput: false,
		nullable: false,
		hoursmins: false,
        showInline: false
	},

	Binds: [
		'getDate', 'getDateObject',
		'getValue', 'getDisplayValue',
		'documentClick', 'calendarClick', 'calendarEnter', 'calendarLeave', 'monthElementClicked', 'yearElementClicked', 'monthSelectorClicked', 'yearSelectorClicked',
		'lastMonth', 'nextMonth', 'resetCalendar',
		'nextMonthDown', 'lastMonthDown',
		'dayClicked', 'timeChanged',
		'setCalendarDate',
		'changeMonth', 'changeYear',
		'attemptParse',
		'setToday', 'setNone',
		'externalShow',
		'watchOutputChanges',
		'obscure', 'reveal',
		'show', 'hide',
		'destroy'
	],

	row: null,

	date: null,

	__uiDate: null,
	__selectedDate: null,

	getValue: function () {
		return this.date.format(this.options.displayFormat);
	},

	getDisplayValue: function () {
		return this.date.format(this.options.outputFormat);
	},

	initialize: function (options) {

	    this.setOptions(options);

	    this.showDefault = this.options.startDate == 'none' ? false : true;

	    var now = new Date();

	    this.__uiDate = now.clone();
	    this.__selectedDate = this.date = false;

	    if (this.options.startDate == 'none') {
	        if (this.options.target && 'value' in this.options.target && this.options.target.value.trim() !== '') {
	            if (Date.parse(this.options.target.value).isValid()) {
	                //this.date = Date.parse(this.options.target.value);
	                //this.selectedDate = this.date.clone();

	                this.__uiDate = Date.parse(this.options.target.value);
	                this.__selectedDate = this.__uiDate.clone();
	                this.date = this.__uiDate.clone();

	                this.showDefault = true;

	            } else {
	                this.showDefault = false;
	            }
	        } else {
	            //this.date = false;
	            //this.selectedDate = false;
	            this.showDefault = false;
	        }
	    } else if (this.options.startDate == 'today') {
	        //this.date = new Date();
	        //this.selectedDate = this.date.clone();

	        this.__uiDate = now.clone();
	        this.__selectedDate = this.__uiDate.clone();
	        this.date = this.__uiDate.clone();

	    } else {
	        if (this.options.startDate && this.options.startDate !== null && Date.parse(this.options.startDate).isValid()) {
	            //this.date = Date.parse(this.options.startDate);

	            this.__uiDate = Date.parse(this.options.startDate);
	            this.__selectedDate = this.__uiDate.clone();
	            this.date = this.__uiDate.clone();

	        }
	    }

	    if (this.options.hoursmins && now.getTime() === this.__uiDate.getTime()) {
	        this.__uiDate.setMinutes(0);
	        this.__uiDate.setHours(0);
	        this.__uiDate.setSeconds(0);
	        this.__uiDate.setMilliseconds(0);
	        this.__selectedDate = this.__uiDate.clone();
	        this.date = this.__uiDate.clone();
	    }

	    if (this.options.nullable) {
	        this.showDefault = false;
	    }

	    this.id = this.options.target != null ? this.options.target.get('id') ? this.options.target.get('id') : String.uniqueID() : String.uniqueID();
	    this.uuid = this.id;

	    if (!Affinity.UI.calendars.widgets[this.uuid]) {
	        Affinity.UI.calendars.widgets[this.uuid] = this;
	    }

        this.display = new Element('input', { 'type': 'text', 'class': 'ui-calendar-display data-hj-whitelist widget', 'id': this.id + '-Display' }).store('widget', this);
	    this.output = new Element('input', { 'type': 'hidden', 'name': this.options.postName, 'id': this.options.postId, 'data-display-id': this.id + '-Display' });

	    if(Affinity.mobile){
	        this.display.set('readonly', 'true');
	    }

	    if (this.options.validationMethods != '') {
	        this.output.addClass('validate');
	        this.output.set('data-validate-method', this.options.validationMethods);
	        if (this.options.validationErrorStr) {
	            this.output.set('data-validate-error-str', this.options.validationErrorStr);
	        }
	    }

	    /* should I watch the master input for changes? */
	    this.watch = this.options.watchOutput || false;
	    if (typeOf(this.options.target) !== 'null' && this.options.target.hasClass('uidate-watch')) {
	        this.watch = true;
	    }
	    if (this.watch) {
	        this.watchTimer = this.watchOutputChanges.periodical(500, this);

	    }

	    /* choose to replace original input or reuse ... */
	    this.reuse = this.options.preserveOriginalInput || false;

	    if (typeOf(this.options.target) !== 'null' && this.options.target.hasClass('uidate-preserve')) {
	        this.reuse = true;
	    }

	    if (this.reuse) {

	        if (typeOf(this.options.target) === 'null') {

	            this.row = new Element('div');

	            this.label = new Element('label', { 'html': this.options.labelName }).inject(this.row);

	            this.target = new Element('div', { 'class': 'hidden' }).inject(this.label, 'after');

	        } else {

	            this.row = this.options.target.getParent('.form-row') || false;

	            this.target = this.options.target;
	            this.output = this.target;
	            //this.output.addClass('hidden');

	            var wrapper = new Element('div', { 'class': 'subhidden' });

	            //this.display.cloneEvents(this.options.target);
	            this.target.store('widget', this);//.addClass('hidden');

	            if (this.row) {
	                wrapper.inject(this.row, 'top');
	                this.display.inject(this.row, 'bottom');
	            } else {
	                wrapper.inject(this.output, 'before');
	                this.display.inject(this.output, 'after');
	            }
	            this.output.inject(wrapper);

	        }

	    }else{

	        if (this.options.target == null) {

	            this.row = new Element('div');

	            this.label = new Element('label', { 'html': this.options.labelName }).inject(this.row);

	            this.target = new Element('div', { 'class': 'hidden' }).inject(this.label, 'after');

	        } else {

	            this.target = new Element('div', { 'class': 'hidden' }).inject(this.options.target, 'after');

	            var attempt;
	            if (this.options.target.value) {
	                attempt = Date.parse(this.options.target.value);
	                if (attempt.isValid()) {
	                    this.options.startDate = attempt;
	                }
	            }

	            this.row = this.options.target.getParent('.form-row');

	            this.options.postId = this.options.target.get('id');

	            if (this.options.postName == '') {
	                this.options.postName = this.options.target.get('name');
	                this.output.set('name', this.options.postName);
	            }

	            this.display.cloneEvents(this.options.target);

	            /** Jordan's Leave can ONLY work if the original input is left intact.
				//this.options.target.destroy();

				/** Avoid ID conflicts for ID specific calls (Eg: timesheet dependencies) **/
	            this.options.target.set('id', '__' + this.options.target.get('id'));
	            /** Remove name from original so it is not posted twice **/
	            this.options.target.set('name', null);
	            /** remove events from original to avoid multiples **/
	            this.options.target.removeEvents();
	            /** store widget against original for Jordan's Leave **/
	            this.options.target.store('widget', this).addClass('hidden');

	        }

	        /**/

	        if (this.row !== null) {
	            this.row.set('class', 'form-row ui-calendar-row ' + this.id);
	        }
	        this.display.inject(this.target, 'after');
	        this.output.inject(this.target, 'after');

	        this.target.destroy();

	    }

	    /**/

	    this.icons = {};
	    this.icons.Open = Affinity.icons.Popup || '&#xe012;';
	    this.icons.Today = Affinity.icons.Calendar || '&#xe02e;';
	    this.icons.Clear = Affinity.icons.Cross || '&#xe067;';
	    this.icons.Tick = Affinity.icons.Tick;

	    this.dontClose = false; // used to stop auto closing on some internal events
	    this.calendarOver = false; // used to determine if the mouse is within the calendar widget

	    this.buttons = new Element('span', { 'class': 'ui-calendar-buttons' }).inject(this.display, 'after');

	    this.showbutton = new Element('span', { 'class': 'ui-calendar-button button w-icon-only blue ui-has-tooltip', 'html': '<span>' + this.icons.Open + '</span>', 'data-calendar': this.id, 'data-tooltip': 'Open', 'data-tooltip-dir': 'top' }).inject(this.buttons);
	    this.todaybutton = new Element('span', { 'class': 'ui-calendar-button button w-icon-only green ui-has-tooltip', 'html': '<span>' + this.icons.Today + '</span>', 'data-calendar': this.id, 'data-tooltip': 'Set date to today', 'data-tooltip-dir': 'top' }).inject(this.buttons);
	    this.clearbutton = new Element('span', { 'class': 'ui-calendar-button button w-icon-only orange ui-has-tooltip', 'html': '<span>' + this.icons.Clear + '</span>', 'data-calendar': this.id, 'data-tooltip': 'Clear the date', 'data-tooltip-dir': 'top' }).inject(this.buttons);

	    this.calendarBox = new Element('div', { 'class': 'ui-calendar', 'id': this.domid }).inject(document.body);
	    this.calendarBox.set('reveal', { duration: 250 });

	    /** BUILD EVENTS **/

	    if (!this.options.showInline) {
	        this.calendarBox.addEvent(Affinity.events.click, this.calendarClick);
	    }

	    if (!Affinity.mobile || !this.options.showInline) {
	        this.calendarBox.addEvent(Affinity.events.overAll, this.calendarEnter);
	        this.calendarBox.addEvent(Affinity.events.outAll, this.calendarLeave);
	    }

	    if (!this.options.showInline) {
	        this.display.addEvent(Affinity.events.click, this.externalShow);
	        this.showbutton.addEvent(Affinity.events.click, this.externalShow);
	        this.display.addEvent('blur', this.attemptParse);
	        document.addEvent(Affinity.events.click, this.documentClick);
	        this.todaybutton.addEvent(Affinity.events.click, this.setToday);
	        this.clearbutton.addEvent(Affinity.events.click, this.setNone);
	    }

		if (this.output && this.date && typeOf(this.output) === 'element' && typeOf(this.date) === 'date' && this.options.outputFormat) {
			this.output.store('defaultValue', this.date.format(this.options.outputFormat));
		}

	    /* check for print only field */

		this.printField = false;
		if (this.display.getParent('.ui-calendar-row') && this.display.getParent('.ui-calendar-row').getElement('.print-field')) {
		    this.printField = this.display.getParent('.ui-calendar-row').getElement('.print-field');
		}

        /**/

		this.buildCalendar();

		window.addEvent('resize', function () {
		    if (this.status = 'open') {
		        this.position();
		    }
		}.bind(this));
		if (Affinity.mobile) {
		    window.addEvent('mobileback', this.documentClick);
		    if ('onorientationchange' in window) {
		        window.addEvent('orientationchange', function () {
		            if (this.status = 'open') {
		                this.position();
		            }
		        }.bind(this));
		    }
		}


	    /**/

		this.valuetracker = new Affinity.ElementValueTracker();
		if (this.display) this.valuetracker.addElement(this.display);
		if (this.output) this.valuetracker.addElement(this.output);

        /**/

		this.checkExistsPeriodical = this.checkExists.periodical(1000, this);

	    /** INLINE **/

		if (this.options.showInline) {
		    this.buttons.addClass('hidden');
		    this.display.addClass('hidden');
		    this.calendarBox.addClass('inline');
		    this.calendarBox.inject(this.display.getParent(), 'bottom');
		    this.show();
		}

	},

	checkExists: function () {
		if (!document.contains(this.output)) {
			clearInterval(this.checkExistsPeriodical);
			this.destroy();
		}
	},

	/** EVENT METHODS **/

	documentClick: function (e) {
		if (this.status == 'open') {
			this.hide(null, 'doc ' + this.id);
		}
	},

	calendarClick: function (e) {
		e.stopPropagation();
		e.preventDefault();
	},

	calendarEnter: function (e) {
		this.calendarOver = true;
	},

	calendarLeave: function (e) {
		this.calendarOver = false;
	},

	monthElementClicked: function (e) {
		this.calendarContainer.reveal();
		this.monthbox.dissolve();
		this.changeMonth(e.target.get('data-value'));
		this.monthbox.getElements('.active').removeClass('active');
		e.target.addClass('active');
		if (this.options.showTime && this.timeWidget) {
			this.timeWidget.showDisplay();
		}
	},

	yearElementClicked: function (e) {
		this.calendarContainer.reveal();
		this.yearbox.dissolve();
		this.changeYear(e.target.get('data-value'));
		this.yearbox.getElements('.active').removeClass('active');
		e.target.addClass('active');
		if (this.options.showTime && this.timeWidget) {
			this.timeWidget.showDisplay();
		}
	},

	monthSelectorClicked: function (e) {
		this.monthbox.reveal();
		if (this.options.showTime && this.timeWidget) {
			this.timeWidget.hide();
			this.timeWidget.hideDisplay();
		}
		this.calendarContainer.dissolve();
	},

	yearSelectorClicked: function (e) {
		this.yearbox.reveal();
		if (this.options.showTime && this.timeWidget) {
			this.timeWidget.hide();
			this.timeWidget.hideDisplay();
		}
		this.calendarContainer.dissolve();
		(function () {
			var active_y = this.yearbox.getElement('.active').getPosition(this.yearbox).y;
			this.yearbox.scrollTo(0, active_y - 5);
		}).delay(500, this);
	},

	nextMonthDown: function (e) {
		e.preventDefault();
		e.stopPropagation();
	},

	lastMonthDown: function (e) {
		e.preventDefault();
		e.stopPropagation();
	},

	/* END EVENT METHODS */

	getHumanHour: function (n) {
		return n == 0 ? 'Midnight' : n < 12 ? n + ' am' : n > 12 ? (n - 12) + ' pm' : 'Midday';
	},

	buildCalendar: function () {

		var setupdate = new Date();

		var i, dayel;

		if (this.options.showCalendar) {

			this.calendarContainer = new Element('div').inject(this.calendarBox);

			this.lastButton = new Element('span', { 'html': '&#9668;', 'class': 'ui-calendar-nextlast' }).inject(this.calendarContainer);
			var monthyear = new Element('span', { 'html': '', 'class': 'ui-calendar-monthyear' }).inject(this.calendarContainer);
			this.nextButton = new Element('span', { 'html': '&#9658;', 'class': 'ui-calendar-nextlast' }).inject(this.calendarContainer);

			this.monthButton = new Element('span', { 'class': 'ui-calendar-month' }).inject(monthyear);
			this.yearButton = new Element('span', { 'class': 'ui-calendar-year' }).inject(monthyear);

			this.monthbox = new Element('div', { 'class': 'ui-calendar-monthbox' }).inject(this.calendarBox);
			this.monthbox.set('reveal', { duration: 250 });
			this.monthbox.toggle();

			this.yearbox = new Element('div', { 'class': 'ui-calendar-yearbox' }).inject(this.calendarBox);
			this.yearbox.set('reveal', { duration: 250 });
			this.yearbox.toggle();

			for (i = 0; i < 12; i++) {
				this.monthbox.adopt(
					new Element('span', { 'class': 'm' + i + (i === setupdate.getMonth() ? ' today' : ''), 'html': setupdate.clone().set('month', i).format('%b'), 'data-value': i }).addEvent(Affinity.events.click, this.monthElementClicked)
				);
			}
			var selectdate = setupdate.clone();
			for (i = selectdate.getFullYear() - 100; i < selectdate.getFullYear() + 50; i++) {
				new Element('span', { 'class': 'y' + i + (i === setupdate.getFullYear() ? ' today' : ''), 'html': i, 'data-value': i }).addEvent(Affinity.events.click, this.yearElementClicked).inject(this.yearbox, 'top');
			}

			for (i = 0; i < 7; i++) {
				setupdate.set('day', i);
				new Element('span', { 'html': setupdate.format('%a'), 'class': 'ui-calendar-daylabel' }).inject(this.calendarContainer);
			}

			for (i = 0; i < 6 * 7; i++) {
				dayel = new Element('span', { 'class': 'ui-calendar-day' }).adopt(new Element('span')).inject(this.calendarContainer);
				this.setupClickable(dayel);
			}

			this.nextButton.addEvent(Affinity.events.click, this.nextMonth);
			this.lastButton.addEvent(Affinity.events.click, this.lastMonth);
			this.monthButton.addEvent(Affinity.events.click, this.monthSelectorClicked);
			this.yearButton.addEvent(Affinity.events.click, this.yearSelectorClicked);

			if (!Affinity.mobile) {
				this.nextButton.addEvent('mousedown', this.nextMonthDown);
				this.lastButton.addEvent('mousedown', this.lastMonthDown);
			}

		}

		if (this.options.showTime) {

			var width = 150;
			if (this.options.showCalendar) {
				/*
				this.date = new Date();
				this.date.setHours(0);
				this.date.setMinutes(0);
				this.date.setSeconds(0);
				this.date.setMilliseconds(0);
				*/
				this.calendarContainer.set('reveal', { duration: 250 });
				width = this.calendarContainer.measure(function () { return this.getSize(); }).x - 20;
			}

			var timeWidgetDate = this.__selectedDate ? this.__selectedDate.clone() : false;

			this.timeWidget = new UITimePickerWidget({
			    target: this.calendarBox,
			    displayInput: this.display,
				timeonly: this.options.showCalendar ? false : true,
				date: timeWidgetDate,
				hoursmins: this.options.hoursmins,
                dateWidget: this,
                onTimeSet: function (date) {
					if (typeOf(date) === 'date' && date.isValid()) {
						if (this.__selectedDate) {
							if (date.getTime() !== this.__selectedDate.getTime()) {
								this.date.setHours(date.getHours());
								this.date.setMinutes(date.getMinutes());
								this.__selectedDate = this.date.clone();
								this.__uiDate = this.date.clone();
								this.setCalendarDate();
							}
						} else if(this.date) {
							if (date.getTime() !== this.date.getTime()) {
								this.date.setHours(date.getHours());
								this.date.setMinutes(date.getMinutes());
								this.__uiDate = this.date.clone();
								this.__selectedDate = this.date.clone();
								this.setCalendarDate();
							}
						} else {
							if(!this.options.nullable){
								this.date = date;
								this.date.setHours(date.getHours());
								this.date.setMinutes(date.getMinutes());
								this.__uiDate = this.date.clone();
								this.__selectedDate = this.date.clone();
								this.setCalendarDate();
							} else {
								if (!this.options.showCalendar) {
									this.date = date;
									this.date.setHours(date.getHours());
									this.date.setMinutes(date.getMinutes());
									this.__uiDate = this.date.clone();
									this.__selectedDate = this.date.clone();
									this.setCalendarDate();
								}
							}
						}
					}
				}.bind(this),
				onOpen: function () {
					if (this.options.showCalendar) {
						this.calendarContainer.dissolve();
					}
				}.bind(this),
				onDone: function (e) {
					if (this.options.showCalendar) {
						this.calendarContainer.reveal();
					} else {
						this.hide(e, 'timeWidget');
					}
					this.output.fireEvent('change', { target: this.output });
				}.bind(this),
				width: width
			});
		}

		this.setupCalendar(this.options.startDate == null ? false : true);

	},

	setupCalendar: function (userEvent) {

		var doSetCalendarDate = typeOf(userEvent) !== 'null' ? userEvent : false;

		var today = new Date();

		if (this.options.showCalendar) {

			var day = 1;
			var month = this.__uiDate.get('month');
			var year = this.__uiDate.get('year');
			var lastday = this.__uiDate.get('lastdayofmonth');
			var firstday = this.__uiDate.clone().set('date', 1).get('day');
			var klass;

			this.calendarBox.getElement('.ui-calendar-month').set('html', this.__uiDate.format('%B'));
			this.calendarBox.getElement('.ui-calendar-year').set('html', this.__uiDate.getFullYear());

			this.calendarBox.getElements('.ui-calendar-day').removeClass('today').removeClass('selected').removeClass('active');

			Array.each(this.calendarBox.getElements('.ui-calendar-day'), function (dayel, index) {

				dayel.set('class', 'ui-calendar-day');
				dayel.getElement('span').set('html', '&nbsp;');

				if (index >= firstday && index < firstday + lastday && day == today.get('date') && month == today.get('month') && year == today.get('year')) {
					dayel.addClass('today');
				}

				if (index >= firstday && index < firstday + lastday && day == this.__uiDate.get('date') && month == this.__uiDate.get('month') && year == this.__uiDate.get('year')) {
					dayel.addClass('selected');
				}

				if (index >= firstday && index < firstday + lastday) {
					klass = this.__uiDate.clone().set('date', day).format('%b%d%Y');
					dayel.getElement('span').set('html', day);
					dayel.addClass(klass);
					dayel.addClass('active');
					dayel.store('date', this.__uiDate.clone().set('date', day));
					day++;
				}

			}.bind(this));

			this.monthbox.getElements('.active').removeClass('active');
			this.monthbox.getElement('.m' + this.__uiDate.getMonth()).addClass('active');

			this.yearbox.getElements('.active').removeClass('active');
			this.yearbox.getElement('.y' + this.__uiDate.getFullYear()).addClass('active');

		}

		if (this.options.showTime) {
			this.timeWidget.setTime(this.__uiDate);
		}

		if (doSetCalendarDate) {
			this.setCalendarDate();
		}

	},

	setupClickable: function (dayel) {
		dayel.addEvent(Affinity.events.click, this.dayClicked);
	},

	dayClicked: function (e) {

		var date;
		var dayel = e.target.hasClass('ui-calendar-day') ? e.target : e.target.getParent('.ui-calendar-day');

		if (dayel.hasClass('active')) {

			this.calendarBox.getElements('.ui-calendar-day.selected').removeClass('selected');

			date = dayel.retrieve('date');

			this.date = date.clone();
			this.__uiDate = date.clone();
			this.__selectedDate = date.clone();

			dayel.addClass('selected');

			var setSuccess = this.setCalendarDate(); // defeat race conditions

			this.fireEvent('dateClicked', this.date);

			if (!this.options.showTime) {
				this.hide();
			}

		}

	},

	nextMonth: function (e) {
		var currentValue = this.__uiDate.get('month');
		var value = currentValue;
		value = value + 1 > 11 ? 0 : value + 1;
		this.changeMonth(value);
		if (value === 0) {
			this.changeYear(this.__uiDate.get('year') + 1);
		}
	},

	lastMonth: function (e) {
		var currentValue = this.__uiDate.get('month');
		var value = currentValue;
		value = value - 1 < 0 ? 11 : value - 1;
		this.changeMonth(value);
		if (value === 11) {
			this.changeYear(this.__uiDate.get('year') - 1);
		}
	},

	changeMonth: function (value) {
		this.doEvent = false;
		var temp = this.__uiDate.clone().set('date', 1).set('month', value);
		var lastday = temp.get('lastdayofmonth');
		var currentday = this.__uiDate.get('date');
		currentday = currentday > lastday ? lastday : currentday;
		this.__uiDate.set('date', 1).set('month', value).set('date', currentday);
		this.setupCalendar();
		this.setCalendarDate();
	},

	changeYear: function (value) {
		this.doEvent = false;
		var temp = this.__uiDate.clone().set('date', 1).set('month', value);
		var lastday = temp.get('lastdayofmonth');
		var currentday = this.__uiDate.get('date');
		currentday = currentday > lastday ? lastday : currentday;
		this.__uiDate.set('date', 1).set('year', value).set('date', currentday);
		this.setupCalendar();
		this.setCalendarDate();
	},

	/** process date values **/
	doEvent: true,
	setCalendarDate: function () {
		var fireGlobalChangeEvent = false;
		if (this.__selectedDate) {
			if (this.__selectedDate.format(this.options.outputFormat) !== this.output.value) {
				fireGlobalChangeEvent = true;
			}
			this.display.value = this.__selectedDate.format(this.options.displayFormat);
			this.output.value = this.__selectedDate.format(this.options.outputFormat);
			if (this.printField) {
			    this.printField.set('html', this.display.value);
			}
		}
		if (this.doEvent) {
			if (fireGlobalChangeEvent) {
				window.fireEvent('formElementChanged', { element: this.output });
			}
			this.fireEvent('dateChanged', this.date);
			window.fireEvent('elementChanged', { element: this.output });
			this.output.fireEvent('change', { target: this.output });
		}
		this.doEvent = true;
		return true;
	},

	getDate: function () {
		var date = this.getDateObject();
		if(date){
			return date.format(this.options.outputFormat);
		}
		return false;
	},

	getDateObject: function () {
		if (this.__selectedDate) {
			return this.__selectedDate;
		}
		if (!this.options.nullable) {
			if (this.date) {
				return this.date;
			}
			if (this.__uiDate) {
				return this.__uiDate;
			}
		}
		return false;
	},

	getRawDate: function () {
		if (!this.__selectedDate) {
			return false;
		}
		if (this.output.value === '') {
			return false;
		}
		var check = Date.parse(this.output.value);
		if (check !== null && typeOf(check) && check.isValid()) {
			return check;
		}
		return false;
	},

	setDate: function (passedDate, doEvent) {

		if (passedDate && typeOf(passedDate) !== 'date') {
			try {
				passedDate = Date.parse(passedDate);
			} catch (e) {
				return;
			}
		}

		if (passedDate && typeOf(passedDate) === 'date' && passedDate.isValid()) {

			/* If we have passed a date to set, use that */

			if (typeOf(doEvent) === 'boolean' && doEvent === false) {
				this.doEvent = false;
			}
			this.date = passedDate;
			this.__uiDate = passedDate.clone();
			this.__selectedDate = passedDate.clone();

			this.setupCalendar();
			this.setCalendarDate();
			this.doEvent = true;

		} else {

			if (this.options.nullable) {

				/* If we have NOT passed a date to set, and we are nullable, re-set to init settings */

				if (typeOf(doEvent) === 'boolean' && doEvent === false) {
					this.doEvent = false;
				}

				this.__uiDate = new Date();
				this.date = this.__selectedDate = false;

				this.setupCalendar();

        this.output.value = '';
				this.display.value = '';
				this.doEvent = true;

			} else {

				/* If we have NOT passed a date to set, and we are NOT nullable, re-set to today */

				this.date = new Date();
				this.__uiDate = this.date.clone();
				this.__selectedDate = this.date.clone();

				this.setupCalendar();
				this.setCalendarDate();
				this.doEvent = true;

			}
		}
	},

	setToday: function (e) {
		this.date = new Date();
		this.__uiDate = this.date.clone();
		this.__selectedDate = this.date.clone();
		this.dontClose = false;
		this.setupCalendar(true);
	},

	setNone: function (e) {
	    this.date = this.__uiDate = new Date();
		this.__selectedDate = false;
		this.output.value = '';
		this.display.value = '';
		this.showDefault = false;
		this.dontClose = false;
		this.output.fireEvent('change', { target: this.output });
	},

	attemptParse: function (e) {

	    if (typeOf(e) !== 'null' && e.type && e.type === 'blur') {
	        if (this.status === 'open' && this.calendarOver) {
	            return;
	        }
	    }

	    if (!this.options.showCalendar && this.options.showTime && this.timeWidget) {
	        //this.timeWidget.addEvent('timeSet', function () { this.attemptParseCont(e); });
	        /* This is now handled by TimePiccker (as it should!) */
	    } else {

	        var attemptStr = this.display.value;
	        var attemptedDate = false;

	        try {
	            attemptedDate = Date.parse(attemptStr);
	        } catch (e) {
	            console.log(e);
	        }

	        if (attemptedDate && typeOf(attemptedDate) == 'date') {
	            if (!attemptedDate.isValid()) {
	                this.__selectedDate = false;
	                this.display.value = 'Invalid Date. No date set.';
	                this.output.value = '';
	                this.output.fireEvent('change', { target: this.output });
	            } else {

	                var tempdate = this.__selectedDate ? this.__selectedDate.clone() : false;

	                this.date = attemptedDate;
	                this.__uiDate = attemptedDate.clone();
	                this.__selectedDate = attemptedDate.clone();

	                if (typeOf(e) !== 'null') {
	                    this.setupCalendar(true);
	                } else {
	                    this.setupCalendar();
	                }

	                if (!tempdate || attemptedDate.setMilliseconds(0) !== this.date.setMilliseconds(0)) {
	                    this.setCalendarDate();
	                    this.output.fireEvent('change', { target: this.output });
	                }
	            }
	        } else {
	            if (this.options.nullable) {
	                this.output.value = '';
	                this.__uiDate = new Date();
	                this.date = this.__selectedDate = false;
	                this.output.fireEvent('change', { target: this.output });
	            } else {
	                if (this.__selectedDate) {
	                    this.display.value = this.__selectedDate.format(this.options.displayFormat);
	                } else {
	                    this.display.value = this.__uiDate.format(this.options.displayFormat);
	                }
	                if (this.printField) {
	                    this.printField.set('html', this.display.value);
	                }
	            }
	        }

	        this.hide(null, 'attemptParse ' + this.id);

	    }
	},

	/* process UI components */

	positionOverride: false,
	position: function () {
		var position = this.positionOverride ? this.positionOverride.getPosition() : this.display.getPosition();
		var size = this.positionOverride ? this.positionOverride.getSize() : this.display.getSize();
		//var parent = /*this.display.getParent('#uimodal') ? this.display.getParent('#uimodal') : */window;
		var windwSize = window.getSize();
		var top = position.y + size.y + 5;
		var left = position.x;
		var scale, styles;
		var cssPosition = this.options.cssPosition;

		var calendarSize = this.calendarBox.measure(function () {
			return this.getSize();
		});

		if (Affinity.mobile) {

			if (!this.calendarBox.hasClass('scaled')) {

				left = 0;

				size = calendarSize;
				var windwSize = parent.getSize();
				windwSize.x -= 40;
				windwSize.y -= 40;

				if (size.x > size.y) {
					scale = Number(windwSize.x / size.x).round(2);
				} else {
					scale = Number(windwSize.y / size.y).round(2);
				}

				if ((size.y * scale) > windwSize.y) {
					scale = Number(windwSize.y / size.y).round(2);
				}

				if ((size.x * scale) > windwSize.x) {
					scale = Number(windwSize.x / size.x).round(2);
				}

				if ((windwSize.x + 40) > (size.x * scale)) {
					left = ((windwSize.x + 40) - (size.x * scale)) / 2;
				}

				styles = {
					'position': 'fixed',
					'top': left,
					'left': left,
					'-webkit-transform': 'scale(' + scale + ')',
					'-webkit-transform-origin': '0 0',
					'transform': 'scale(' + scale + ')',
					'transform-origin': '0 0'
				};

				this.calendarBox.setStyles(styles);
				this.calendarBox.addClass('scaled');

			}

			return;

		} else {
		    if (windwSize.y - (position.y - window.getScroll().y) < calendarSize.y) {
				top = position.y - calendarSize.y - 5;
			}
		    if ((position.x - window.getScroll().x) + calendarSize.x > windwSize.x) {
				left = windwSize.x - calendarSize.x - 5;
			}
			if (cssPosition === 'fixed') {
			    top -= window.getScroll().y;
			}
			styles = {
				'position': cssPosition,
				'top': top,
				'left': left
			};
		}

		this.calendarBox.setStyles(styles);

		if (this.delayedRePosition) {
		    clearTimeout(this.delayedRePosition);
		}

		this.delayedRePosition = setTimeout(function () {
		    this.calendarBox.setStyles(styles);
		}.bind(this), 500);

	},

	/**/

	watchOutputChanges: function(){
		var value = this.output.value;
		var attempt = Date.parse(value);
		if (attempt && attempt.hasOwnProperty('isValid') && attempt.isValid() && attempt!==this.date) {
			this.setDate(attempt, false);
		}
	},

	/**/

	externalShow: function (e) {
		e.stopPropagation();
		Affinity.UI.calendars.hideAll(this);
		if (Affinity.mobile) {
			this.display.blur();
		}
		this.show();
	},

	obscure: function () {
		this.hide();
		if (this.showbutton) { this.showbutton.addClass('hidden'); }
		if (this.todaybutton) { this.todaybutton.addClass('hidden'); }
		if (this.clearbutton) { this.clearbutton.addClass('hidden'); }
		if (this.display) { this.display.addClass('hidden'); }
	},

	reveal: function () {
		if (this.showbutton) { this.showbutton.removeClass('hidden'); }
		if (this.todaybutton) { this.todaybutton.removeClass('hidden'); }
		if (this.clearbutton) { this.clearbutton.removeClass('hidden'); }
		if (this.display) { this.display.removeClass('hidden'); }
	},

	show: function (e) {
        if (!this.options.showInline) {
            Affinity.UI.calendars.hideAll(this);
            this.position();
        }
		this.calendarBox.reveal();
		this.status = 'open';
	},

	hide: function (e, who) {
	    if (this.options.showInline) {
	        return;
	    }
		if (!this.dontClose) {
			if (this.monthbox) {
				this.monthbox.dissolve();
			}
			if (this.yearbox) {
				this.yearbox.dissolve();
			}
			if (this.calendarContainer) {
				this.calendarContainer.reveal();
			}
			if (this.calendarBox) {
				this.calendarBox.dissolve();
			}
			this.status = 'closed';
		}
	},

	destroy: function () {
		clearInterval(this.checkExistsPeriodical);
		if (this.showbutton) { this.showbutton.removeEvents(); }
		if (this.todaybutton) { this.todaybutton.removeEvents(); }
		if (this.clearbutton) { this.clearbutton.removeEvents(); }
		if (this.display) { this.display.removeEvents(); }
		document.removeEvent(Affinity.events.click, this.documentClick);
		if (this.options.showCalendar) {
			if (this.calendarContainer) {
				Array.each(this.calendarContainer.getElements('.ui-calendar-day'), function (el) {
					el.removeEvents();
					el.destroy();
				}.bind(this));
				this.calendarContainer.set('reveal', null);
				this.calendarContainer.set('tween', null);
				this.calendarContainer.removeEvents();
			}
			if (this.monthbox) {
				Array.each(this.monthbox.getElements('span'), function (el) {
					el.removeEvents();
					el.destroy();
				}.bind(this));
				this.monthbox.set('reveal', null);
				this.monthbox.set('tween', null);
				this.monthbox.removeEvents();
			}
			if (this.yearbox) {
				Array.each(this.yearbox.getElements('span'), function (el) {
					el.removeEvents();
					el.destroy();
				}.bind(this));
				this.yearbox.set('reveal', null);
				this.yearbox.set('tween', null);
				this.yearbox.removeEvents();
			}
			if (this.nextButton) { this.nextButton.removeEvents(); }
			if (this.lastButton) { this.lastButton.removeEvents(); }
			if (this.yearButton) { this.yearButton.removeEvents(); }
			if (this.monthButton) { this.monthButton.removeEvents(); }
		}
		if (this.options.showTime) {
			this.timeWidget.destroy();
		}
		if (Affinity.UI.calendars.widgets[this.uuid]) {
			Affinity.UI.calendars.widgets[this.uuid] = null;
			delete Affinity.UI.calendars.widgets[this.uuid];
		}
		if (this.buttons) {
			this.buttons.empty();
			this.buttons.destroy();
		}
		if (this.display) { this.display.destroy(); }
		if (this.output) { this.output.destroy(); }
		if (this.calendarBox) {
			this.calendarBox.set('reveal', null);
			this.calendarBox.set('tween', null);
			this.calendarBox.removeEvents();
			this.calendarBox.empty();
			this.calendarBox.destroy();
		}
		if(this.options.target){
			try{
				this.options.target.eliminate('widget');
				this.options.target.destroy();
			}catch(e){}
		}
		Object.each(this, function (val, key) {
			this[key] = null;
			delete this[key];
		}.bind(this));
	}

});

var UIGrid = new Class({

    Version: '1.0.0.0',
    File: 'ui.grid.js',

    Implements: [Options],

    Binds: [
        'processTables','setupTable','zebra'
    ],

    options: {

    },

    tables: {},

    initialize: function (options) {
        this.setOptions(options);
        this.processTables();
        Affinity.UI.Grids = {};
        Affinity.UI.Grids.Zebra = this.zebra;
    },

    processTables: function (table, zebraOnClass) {
        var id;
        if (table == null) {
            Array.each(document.getElements('table.ui-grid'), function (table) {
                id = table.get('id') == '' ? String.uniqueID() : table.get('id');
                if (typeOf(this.tables[id]) == 'null') {
                    this.tables[id] = table;
                    this.setupTable(table, zebraOnClass);
                } else {
                    this.zebra(table, zebraOnClass);
                }
            }.bind(this));
        } else {
			if(table.hasClass('ui-grid')){
				id = table.get('id') == '' ? String.uniqueID() : table.get('id');
				if (typeOf(this.tables[id]) == 'null') {
					this.tables[id] = table;
					this.setupTable(table, zebraOnClass);
				} else {
				    this.zebra(table, zebraOnClass);
				}
			}
        }
        delete id;
    },

    setupTable: function (table, zebraOnClass) {
        /*
        if (table.getElement('thead')) {
            table.getElement('thead').setStyles({
                'position': 'absolute',
                'width': table.getSize().x
            });
        }
        */
        this.zebra(table, zebraOnClass);
    },

    zebra: function (table, zebraOnClass) {
        var zebraOn = 'tr';
        if (typeof zebraOnClass !== 'undefined' && typeof zebraOnClass === 'string') {
            zebraOn = 'tr.' + zebraOnClass;
        }
		var tables = (table==null)?document.getElements('table.ui-grid'):[table];
		var oddind = 0;
		Array.each(tables, function (table) {
		    oddind = 0;
		    if ('getElements' in table) {
		        table.getElements(zebraOn).removeClass('odd');
		        Array.each(table.getElements('tbody ' + zebraOn), function (row, index) {
		            if (!row.hasClass('hidden')) {
		                row.addClass((oddind % 2 == 0) ? '' : 'odd');
		                oddind++;
		            }
		        }.bind(this));	
		    }
		}.bind(this));
        delete oddind;
    }

});

var UIHelpBubble = new Class({

    Version: '1.0.0.0',
    File: 'ui.help.bubble.js',

    Implements: [Options],

    Binds: [
		'populate','alignTo','position',
		'hide','show'
    ],

    options: {
        fadeTime: 100
    },

    initialize: function (options) {
        this.setOptions(options);
        if(!document.getElement('.helpBubble.float')){
            this.helpBubble = new Element('div',{
                //'class': 'helpBubble right float shadow'
                'class': 'helpBubble right float'
            }).inject(document.body, 'bottom');
            this.helpBubble.set('tween', { duration: this.options.fadeTime });
            this.helpBubble.fade('hide');
			//this.helpBubble.addEvent(Affinity.events.outAll, function(e){ this.hide(); }.bind(this));
            //this.helpBubble.addEvent(Affinity.events.overAll, function(e){ this.show(); }.bind(this));
		}
	},
	
    populate: function (content) {
        if (this.helpBubble) {
            this.helpBubble.empty();
            if (typeOf(content) == 'element') {
                this.helpBubble.adopt(content);
            }
            if (typeOf(content) == 'string') {
                this.helpBubble.set('html', content);
            }
            this.addClass('right');
            this.setDirection('left');
        }
	},
	
	alignTo: function(el){
		var pos = el.getPosition();
		var size = el.getSize();
		this.position({x:pos.x+size.x+5,y:pos.y+(size.y/2)-15});
	},

	setDirection: function (direction) {
	    if (this.helpBubble) {
	        direction = direction.toLowerCase().trim() || 'left';
	        var directions = ['top', 'left', 'right', 'bottom', 'bottom-right', 'top-right'];
	        if (directions.contains(direction)) {
	            Array.each(directions, function (dir) {
	                this.helpBubble.removeClass(dir);
	            }.bind(this));
	            this.addClass(direction);
	        }
	    }
	},

    addClass: function (klass) {
        if (this.helpBubble) {
            this.helpBubble.addClass(klass);
        }
	},
	
	position: function(xyObj){
	    if (this.helpBubble) {
	        this.helpBubble.setStyles({
	            top: xyObj.y,
	            left: xyObj.x
	        });
	    }
	},
	
	show: function (selectable) {
	    if (this.helpBubble) {
	        if (selectable && selectable === true) {
	            this.helpBubble.addEvent(Affinity.events.outAll, this.hide);
	            this.helpBubble.addEvent(Affinity.events.overAll, this.show);
	        }
	        this.helpBubble.fade('in');
	    }
	},
	
	hide: function () {
	    if (this.helpBubble) {
	        this.helpBubble.removeEvents();
	        this.helpBubble.fade('out');
	        /*(function () { this.helpBubble.removeClass('showclose');  }).delay(500, this);*/
	    }
	},

	getSize: function () {
	    if (this.helpBubble) {
	        return this.helpBubble.measure(function () {
	            return this.getSize();
	        });
	    }
	}
	
});

Locale.define('en-NZ', 'Date', {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dateOrder: ['date', 'month', 'year', '/'],
    ordinal: function (dayOfMonth) {
        return (dayOfMonth > 3 && dayOfMonth < 21) ? 'th' : ['th', 'st', 'nd', 'rd', 'th'][Math.min(dayOfMonth % 10, 4)];
    },
    AM: "am",
    PM: "pm"
});

Locale.use('en-NZ');

window.components = [
    ['UIHelpBubble','helpbubble'],
    ['UIGrid'],
    ['UISortableGrid'],
    ['UIDynamicGrid'],
    ['UIScrollableGrid'],
    ['UITabs'],
    ['UIInbox'],
    ['UIHidables'],
    ['UIFormHideables', 'formhideables'],
    ['UISectionHideables', 'sectionHidables'],
    ['UIHideToggle', 'hidetoggle'],
    ['UIUplaoders'],
    ['UIUplaodersMulti', 'uploaders'],
    ['UIReplaceArrows', 'arrows'],
    ['UIValidation'],
    ['UISanitise'],
    ['UIDateDropDowns'],
    ['UISelectLookup', 'lookups'],
    ['UIDisplayLookup', 'displaylookups'],
    ['UIDateCalendar'],
    ['UIListBuilder'],
    ['UIDateCleverInput'],
	['UIAutoComplete'],
	['UIQuickSearch'],
    ['UIModal','modal'],
	['UIDrawPanels'],
    ['UITooltips', 'tooltips'],
    ['UIHelpIcon', 'helpicon'],
    ['UIPompts', 'prompts'],
    ['UIFormatDate'],
	['UIBankNumber', 'banknumber'],
    ['UITaxNumber', 'taxnumber'],
    ['UIMasterMessage', 'masterMessage'],
    ['UIAddress', 'address'],
    ['UIPager'],
    ['UITextareaAutoSize', 'textAutoSize']
];

var mybasepath = window.basepath || '';

window.addEvent('PageReady', function () {
    if (!("Affinity" in window)) {
        window.Affinity = {};
    }
    if (!Affinity.uiready) {
        var namelist;
        for (var i = 0; i < window.components.length; i++) {
            namelist = window.components[i];
            if (typeof (window[namelist[0]]) !== 'undefined' && typeOf(window[namelist[0]]) === 'class') {
                var shortname;
                var classname = namelist[0].replace('UI', 'ui');
                if (classname in Affinity) {
                    console.log('name collision in Affinity for "' + classname + '"');
                }else{
                    Affinity[classname] = new window[namelist[0]]();
                    Affinity.Components[classname] = {};
                    Affinity.Components[classname].Version = Affinity[classname].Version || '';
                    Affinity.Components[classname].Name = Affinity[classname].Name || namelist[0].replace(new RegExp('UI', 'gi'), '').split(/(?=[A-Z])/).join(" ");
                    Affinity.Components[classname].File = Affinity[classname].File || '';
                    Affinity.Components[classname].Jira = Affinity[classname].Jira || '';
                    if (namelist.length > 1) {
                        for (var j = 1; j < namelist.length; j++) {
                            shortname = namelist[j];
                            if (shortname in Affinity) {
                                console.log('name collision in Affinity for "' + shortname + '"');
                            } else {
                                Affinity[shortname] = Affinity[classname];
                            }
                        }
                    }
                }
            }
        }
        classname = null;
        shortname = null;
        namelist = null;
        Affinity.useWebWorkers = Affinity.isie && Affinity.ieversion <= 11 ? false : Affinity.useWebWorkers;
        Affinity.uiready = true;
        window.fireEvent('UiReady');
    }
});

var UILogin = new Class({

    Version: '1.0.1.2',
    Notes: 'Feature branch for Timesheets Mileage',
    File: 'ui.login.js',
    Notes: 'API structure change',

    Implements: [Options, Events],

    Binds: [
        'cont',
        'show', 'hide',
        'getAdminDates',
        'getUser',
        'check', 'login', 'logout', 'logged',
        'setSession', 'clearSession',
        'htmlTemplateLoadError', 'htmlTemplateLoadSuccess',
        'requestSessionFailed', 'requestSessionFailedException', 'requestSessionFailedTimeout',
        'getUserInformation'
    ],

    options: {
        title: false,
        auto: true,
        showCancel: false,
        target: null,
        targetbg: null,
        logoutButton: null,
        htmlTemplateUrl: null,
        underlay: false
    },

    publicHolidays: [],
    user: {},
    access: {},
    keepSession: false,
    rememberMe: false,

    logstatus: 'loggedout',

    profile_stub: {
        employeeNumber: null,
        firstName: null,
        lastName: null,
        commonName: null,
        currentPayPeriodBegins: null,
        currentPaydate: null,
        previousPaydate: null,
        nextPaydate: null,
        newestTimesheetDate: null,
        oldestTimesheetDate: null,
        showTimesheetFrom: null,
        startDayOfTheWeek: null,
        publicHolidays: [],
        admin: false
    },

    area_stub: {
        IsManager: false,
        IsEmployee: false,
        DefaultView: false,
        WeeklyDays: false
    },

    area_timesheets_stub: {
        IsManager: false,
        IsEmployee: false,
        ShowPeriodView: false,
        ShowWeeklyView: false,
        ShowDetailView: false,
        ShowOverviewView: false,
        ShowDualDetailView: false,
        ShowBulkView: false,
        ShowMileageView: false,
        ReadonlyWeeklyView: false,
        ReadonlyDetailView: false,
        ReadonlyDualdetailView: false,
        DefaultView: false,
        WeeklyDays: false,
        AddUnit: false,
        EnableFavourite: false
    },

    hoiday_stub: {
        DateTime: null,
        Description: ''
    },

    screenFilter_stub: {
        FieldName: '',
        ModelName: '',
        Label: '',
    },

    initialize: function (options) {

        this.setOptions(options);

        if (!'Affinity' in window) { window.Affinity = {}; }
        //Affinity.login = this;

        Affinity.login = {};
        Affinity.login.companyNumber = false;
        Affinity.login.profile = {};
        Affinity.login.userProfiles = {};
        Affinity.login.areas = {};
        Affinity.login.controller = this;

        window.addEvent('unauthorized', function () {
            this.logout({
                redirectToGateway: true
            });
        }.bind(this));

        window.addEvent('logoutViaTab', function () {
            this.logout();
        }.bind(this));

        window.addEvent('logout', function () {
            if (this.getDomainName(window.location.host).indexOf("localhost") > -1) {
                //old logout for devs
                this.logout();
            } else {
                this.logout({
                    redirectToGateway: true
                });
            }
        }.bind(this));

        if (this.options.htmlTemplateUrl !== null) {
            new Request.HTML({
                url: mybasepath + this.options.htmlTemplateUrl,
                evalScripts: false,
                onFailure: this.htmlTemplateLoadError,
                onError: this.htmlTemplateLoadError,
                onSuccess: this.htmlTemplateLoadSuccess
            }).get();

        } else {
            this.setup();
        }

    },

    htmlTemplateLoadSuccess: function (elements) {
        Array.each(elements, function (el) {
            el.inject(document.body, 'bottom');
        });
        if (this.options.title) {
            document.getElement('.login-underlay-header .heading').set('html', this.options.title);
        }
        this.options.target = document.id('login-box');
        this.options.targetbg = document.id('login-box-bg');
        if (this.options.underlay) {
            this.options.targetbg = document.id('login-underlay');
            if (document.id('login-box-bg')) {
                document.id('login-box-bg').destroy();
            }
        } else {
            this.options.targetbg = document.id('login-box-bg');
            if (document.id('login-underlay')) {
                document.id('login-underlay').destroy();
            }
        }
        if (!Affinity.mobile) {
            this.options.target.removeClass('invisible');
        }
        this.options.target.getElement('.font-icons').set('html', Affinity.icons.Key);
        this.setup();
    },

    htmlTemplateLoadError: function () {
        Affinity.prompts.hide();
        this.fireEvent('error', '"' + mybasepath + this.options.htmlTemplateUrl + '" must exist in your project.');
    },

    setup: function () {

        this.user.firstName = '';
        this.user.lastname = '';
        this.user.displayname = '';
        this.user.employeeNumber = '';
        this.user.companyNumber = '';

        if (!this.options.underlay) {
            this.options.targetbg.set('tween', { duration: 250 });
            this.options.targetbg.fade('hide');
        } else {
            this.options.targetbg.addClass('hidden');
        }
        this.options.target.set('tween', { duration: 250 });
        this.options.target.fade('hide');

        if (this.options.showCancel) {
            this.options.target.getElement('.button.grey').removeClass('hidden');
            this.options.target.getElement('.button.grey').addEvent(Affinity.events.click, this.cancel.bind(this));
        }

        this.userInput = this.options.target.getElement('input#username');
        this.passInput = this.options.target.getElement('input#password');
        this.rememberMeInput = this.options.target.getElement('input#rememberme');
        this.keepSeesionInput = this.options.target.getElement('input#keeplogged');

        this.errormesg = this.options.target.getElement('.errormsg');

        this.username = '';

        this.button = this.options.target.getElement('.button.green');
        this.loader = new Element('img', { src: Affinity.loaders.light }).inject(this.button, 'after');
        this.loader.addClass('hidden');

        this.button.addEvent(Affinity.events.click, this.processlogin.bind(this));

        if (this.options.logoutButton != null) {
            this.options.logoutButton.addEvent(Affinity.events.click, this.logout.bind(this));
        }

        window.addEvent('keyup', function (e) {
            if (e.key == 'enter' && this.status == 'open') {
                this.processlogin();
            }
        }.bind(this));

        /** BUILD MAIN LOGIN REQUST OBJECT **/

        var loginapi = '';
        if (Affinity.apiversion > 1) {
            /** NEW METHOD **/
            loginapi = Affinity.GetCacheSafePath(Affinity.authroot);
        } else {
            /** OLD METHOD **/
            loginapi = Affinity.GetCacheSafePath(Affinity.zelosroot + '?api=Authentication/Get');
        }

        this.requestSession = new Request.JSON({
            url: loginapi,
            method: 'get',
            timeout: 1000 * 60 * 1, // 1 minute
            onSuccess: this.setSession,
            onError: this.requestSessionFailed,
            onFailure: this.requestSessionFailed,
            onException: this.requestSessionFailedException,
            onTimeout: this.requestSessionFailedTimeout
        });

        /**/

        if (Affinity.mobile) {
            if ('onorientationchange' in window) {
                window.addEvent('orientationchange', function () {
                    if (this.status = 'open') {
                        this.position();
                    }
                }.bind(this));
            } else {
                window.addEvent('resize', function () {
                    if (this.status = 'open') {
                        this.position();
                    }
                }.bind(this));
            }
        }

        this.fireEvent('ready');

        var uri = new URI(window.location.href);
        if (typeOf(uri.parsed.query) !== 'null') {
            var querries = uri.parsed.query.parseQueryString();
            if (typeOf(querries.sessionKey) !== 'null') {
                this.checkSessionKey(querries.sessionKey);
                delete uri;
                return;
            }
        }

        if (this.options.auto) {
            this.check();
        }

    },

    /** GET USER PROFILE **/

    getUserRequest: null,
    getUser: function (employeeNumber) {

        log('&#x2794; attempting getUser profile (' + employeeNumber + ') ...');

        /* if emp is base profile *
        if (parseInt(employeeNumber) === parseInt(Affinity.login.profile.employeeNumber)) {
            window.fireEvent('gotUser', Affinity.login.profile);
            log('&#x2714; attempted getUser profile (' + employeeNumber + ') succeeded - is logged in profile', { 'color': 'green' });
            return Affinity.login.profile;
        }

        /* if emp has already been fetched */
        if (Affinity.login.userProfiles.hasOwnProperty(employeeNumber)) {
            window.fireEvent('gotUser', Affinity.login.userProfiles[employeeNumber]);
            log('&#x2714; attempted getUser profile (' + employeeNumber + ') succeeded - already exists in local', { 'color': 'green' });
            return Affinity.login.userProfiles[employeeNumber];
        }

        /* if not base, or not yet fetched, but emp is not valid */
        if (typeOf(employeeNumber) !== 'string' || (typeOf(employeeNumber) === 'string' && employeeNumber.trim() === '')) {
            window.fireEvent('gotUser', false);
            return false;
        }

        /* else fetch profile fro emp */
        if (this.getUserRequest && 'isRunning' in this.getUserRequest && this.getUserRequest.isRunning()) {
            this.getUserRequest.cancel()
        }

        var api = Affinity.GetCacheSafePath(Affinity.authroot + '/GetEmployeeProfile?EmployeeNo=' + employeeNumber);
        this.getUserRequest = new Request.JSON({
            url: api,
            onRequest: function (jsonData) {
                log('&#x2794; attempting getUser profile request (' + employeeNumber + ') ...', { 'color': 'blue' });
            },
            onSuccess: function (jsonData) {

                if (JSON.Unauthorized(jsonData, 'login getUser profile (' + employeeNumber + ')')) {
                    log('&#x2714; attempted getUser profile (' + employeeNumber + ') failed - unauthorized', { 'color': 'red' });
                    window.fireEvent('gotUser', false);

                    return;
                } else {

                    if (jsonData.hasOwnProperty('error') && typeOf(jsonData.error) !== 'null') {
                        if (typeOf(jsonData.error) === 'object') {
                            log('&#x2714; attempted getUser profile (' + employeeNumber + ') failed with errors - ' + JSON.stringify(jsonData.error), { 'color': 'red' });
                            window.fireEvent('gotUser', false);
                            return;
                        } else {
                            log('&#x2714; attempted getUser profile (' + employeeNumber + ') failed with errors - ' + jsonData.error.split('\r\n').join(', '), { 'color': 'red' });
                            window.fireEvent('gotUser', false);
                            return;
                        }
                    }
                }

                log('&#x2714; attempted getUser profile (' + employeeNumber + ') succeeded from zelos', { 'color': 'green', 'font-weight': 'bold' });

                var profile = Object.clone(this.profile_stub);

                profile.firstName = jsonData.FirstName;
                profile.lastName = jsonData.LastName;
                profile.commonName = jsonData.CommonName;
                profile.employeeNumber = jsonData.EmployeeNumber;
                profile.companyNumber = Affinity.login.profile.companyNumber;

                profile.payPoints = typeOf(jsonData.PayPoints) !== 'null' ? jsonData.PayPoints : false;
                profile.employeeGroups = typeOf(jsonData.EmployeeGroups) !== 'null' ? jsonData.EmployeeGroups : [];
                profile.screenFilters = typeOf(jsonData.ScreenFilters) !== 'null' ? jsonData.ScreenFilters : [];
                profile.publicHolidays = typeOf(jsonData.PublicHolidays) !== 'null' ? jsonData.PublicHolidays : [];

                profile.currentPayPeriodBegins = typeOf(jsonData.CurrentPayPeriodBegins) !== 'null' ? Date.parse(jsonData.CurrentPayPeriodBegins) : false;
                profile.currentPaydate = typeOf(jsonData.CurrentPaydate) !== 'null' ? Date.parse(jsonData.CurrentPaydate) : false;
                profile.previousPaydate = typeOf(jsonData.PreviousPaydate) !== 'null' ? Date.parse(jsonData.PreviousPaydate) : false;
                profile.nextPaydate = typeOf(jsonData.NextPaydate) !== 'null' ? Date.parse(jsonData.NextPaydate) : false;
                profile.oldestTimesheetDate = typeOf(jsonData.OldestTimesheetDate) !== 'null' ? Date.parse(jsonData.OldestTimesheetDate) : false;
                profile.newestTimesheetDate = typeOf(jsonData.NewestTimesheetDate) !== 'null' ? Date.parse(jsonData.NewestTimesheetDate) : false;
                profile.startDayOfTheWeek = typeOf(jsonData.StartDayOfTheWeek) !== 'null' ? parseInt(jsonData.StartDayOfTheWeek) : 0;
                profile.rowsPerPage = typeOf(jsonData.RowsPerPage) !== 'null' ? parseInt(jsonData.RowsPerPage) : 20;

                if (jsonData.EmployeeNumber > 5000000) { // Admin - fake minimum data

                    profile = this.getAdminDates(profile);

                    /*
                    profile.admin = true;
                    if (typeOf(jsonData.ShowTimesheetFrom) === 'null') {
                        profile.showTimesheetFrom = Date.parse(new Date()).decrement('day', 14);
                    } else {
                        profile.showTimesheetFrom = Date.parse(jsonData.ShowTimesheetFrom);
                    }
                    if (typeOf(jsonData.NewestTimesheetDate) === 'null') {
                        if (typeOf(jsonData.ShowTimesheetFrom) !== 'null') {
                            if (typeOf(jsonData.ShowTimesheetFrom) === 'string') {
                                profile.newestTimesheetDate = Date.parse(jsonData.ShowTimesheetFrom).increment('month', 1);
                            } else if (typeOf(Affinity.login.profile.showTimesheetFrom) === 'date') {
                                profile.newestTimesheetDate = Affinity.login.profile.showTimesheetFrom.clone().increment('month', 1);
                            }
                        }
                    } else {
                        profile.newestTimesheetDate = Date.parse(jsonData.NewestTimesheetDate);
                    }
                    */

                }

                Affinity.login.userProfiles[profile.employeeNumber] = Object.clone(profile);

                window.fireEvent('gotUser', profile);
            },
            onError: function (err) {
                log('&#x2714; attempted getUser profile (' + employeeNumber + ') failed with errors - ' + err, { 'color': 'red' });
                window.fireEvent('gotUser', false);
            },
            onException: function (headerName, value) {
                log('&#x2714; attempted getUser profile (' + employeeNumber + ') failed with errors - ' + headerName + ': ' + value, { 'color': 'red' });
            }.bind(this),
            onFailure: function (xhr) {
                var error = '';
                switch (xhr.status) {
                    case 401:
                        error = 'unauthorized.';
                        break;
                    case 404:
                        error = 'path not found.';
                        break;
                    case 500:
                        var json;
                        try {
                            json = JSON.decode(xhr.responseText);
                        } catch (e) {
                            json = false;
                            error = xhr.responseText
                        }
                        if (json) {
                            if (json.error) {
                                error = json.error;
                            } else {
                                error = xhr.responseText;
                            }
                        }
                        delete json;
                        break;
                    default:
                        error = xhr.statusText;
                }
                if (error.contains(401) || error.toLowerCase().contains('unauthorized')) {
                    log('&#x2714; attempted getUser profile (' + employeeNumber + ') failed - unauthorized', { 'color': 'red' });
                } else {
                    log('&#x2714; attempted getUser profile (' + employeeNumber + ') failed with errors - ' + error, { 'color': 'red' });
                }
                window.fireEvent('gotUser', false);
            },
            onTimeout: function () {
                log('&#x2714; attempted getUser profile (' + employeeNumber + ') timeout', { 'color': 'red' });
                window.fireEvent('gotUser', false);
            },
        }).get();

    },

    /** CHECk EXISTING LOGIN SESSION **/

    checkRequest: false,
    check: function () {

        if (Affinity.apiversion > 1) {

            /** NEW METHOD **/

            var api = Affinity.GetCacheSafePath(Affinity.authroot + '/GetUser');
            this.checkRequest = new Request.JSON({
                url: api,
                onSuccess: function (jsondata) {
                    if (typeof jsondata === 'object' && 'success' in jsondata && !jsondata.success) {
                        var errorMessage = 'error' in jsondata && typeof error === 'string' ? jsondata.error : 'unknown error';
                        console.debug("GetUser Failed: ");
                        console.debug(jsondata);
                        log('** login check failed - ' + errorMessage + ' **');
                        this.logout();
                    } else {
                        log('** login check succeeded **');
                        console.debug("GetUser Succeeded");
                        this.setSession(jsondata);
                    }
                }.bind(this),
                onFailure: function (xhr) {
                    console.debug("GetUser Failed");
                    console.debug(xhr);
                }.bind(this),
                onException: function (headerName, value) {
                    console.debug("GetUser Exceptioned");
                    console.debug(headerName + value);
                }.bind(this),
                onTimeout: function () {
                    console.debug("GetUser Timmed out");
                }
            }).get();

        } else {

            /** OLD METHOD **/

            var cookieName = Affinity.appname + 'Session';

            var session = Affinity.CookieMonster.Read(cookieName);

            /* check session is valid **/

            Affinity.session = false;
            if (typeOf(session) === 'string' && typeOf(session) !== '' && typeOf(session) !== 'undefined') {
                Affinity.session = session;
            }

            /* logging */

            var cookieLog = cookieName + ': ' + Affinity.seesion;
            if (!Affinity.session) {
                if (typeOf(session) === 'boolean') {
                    cookieLog = 'no session key - cookie ' + cookieName + ' is false';
                }
                else if (typeOf(session) === 'string' && session === '') {
                    cookieLog = 'no session key - cookie ' + cookieName + ' is empty';
                }
                else if (typeOf(session) === 'string' && session === 'undefined') {
                    cookieLog = 'no session key - cookie ' + cookieName + ' is undefined';
                }
                else if (typeOf(session) === 'null') {
                    cookieLog = 'no session key - cookie ' + cookieName + ' is null or undefined';
                }
            }
            log('** check login status (' + cookieLog + ') **');

            /**/

            /** CHECK FOR MIN VALUES **/

            if (!Affinity.session) {
                log('** login check failed **');
                this.clearSession();
                this.logout({
                    //message: 'No valid session was returned'
                });
                this.login();
                return;
            }

            var error = '';
            this.user = false;
            if (Affinity.CookieMonster.Read(Affinity.appname + 'User')) {
                user = JSON.decode(Affinity.CookieMonster.Read(Affinity.appname + 'User'));
                if (
                    (typeOf(user.firstName) === 'null' && typeOf(user.lastname) === 'null') ||
                    (user.firstName === 'null' && user.lastname === 'null') ||
                    ((user.firstName + '').trim() + (user.lastname + '').trim() + (user.displayName + '').trim() == '') ||
                    (user.employeeNumber === '' || typeOf(user.employeeNumber) === 'null' || user.employeeNumber == 'null') ||
                    (user.companyNumber === '' || typeOf(user.companyNumber) === 'null' || user.companyNumber == 'null')
                ) {
                    // user name details are null or blank
                } else {
                    this.user = user;
                    window.fireEvent('userComplete', user);
                }
            }

            if (!this.user) {
                log('** login check failed - minimum data requirement not met **');
                this.clearSession();
                this.logout({
                    message: 'Minimum login details are not set.'
                });
                this.button.removeClass('hidden');
                this.loader.addClass('hidden');
                this.login();
                return;
            }

            log('** login check succeeded **');

            /****/

            this.companyNumber = Affinity.CookieMonster.Read(Affinity.appname + 'CompanyNumber');

            this.keepSession = Affinity.CookieMonster.Read(Affinity.appname + 'KeepSession') === 'false' ? false : true;
            this.rememberMe = Affinity.CookieMonster.Read(Affinity.appname + 'RememberMe') === 'false' ? false : Affinity.CookieMonster.Read(Affinity.appname + 'RememberMe');

            if (this.rememberMe !== null && this.rememberMe !== false) {
                this.username = this.rememberMe;
                this.rememberMe = true;
            } else {
                this.username = '';
                this.rememberMe = false;
            }

            if (this.keepSession !== null && this.keepSession !== false) {
                this.keepSession = true;
            } else {
                this.keepSession = false;
            }

            if (Affinity.session) {

                if (Affinity.CookieMonster.Read(Affinity.appname + 'Areas')) {
                    this.areas = JSON.decode(Affinity.CookieMonster.Read(Affinity.appname + 'Areas'));
                }

                if (Affinity.CookieMonster.Read(Affinity.appname + 'PayPoints')) {
                    this.payPoints = JSON.decode(Affinity.CookieMonster.Read(Affinity.appname + 'PayPoints'));
                }

                if (Affinity.CookieMonster.Read(Affinity.appname + 'EmployeeGroups')) {
                    this.employeeGroups = JSON.decode(Affinity.CookieMonster.Read(Affinity.appname + 'EmployeeGroups'));
                }

                if (Affinity.CookieMonster.Read(Affinity.appname + 'ScreenFilters')) {
                    this.screenFilters = JSON.decode(Affinity.CookieMonster.Read(Affinity.appname + 'ScreenFilters'));
                }

                if (Affinity.CookieMonster.Read(Affinity.appname + 'PublicHolidays')) {
                    this.publicHolidays = JSON.decode(Affinity.CookieMonster.Read(Affinity.appname + 'PublicHolidays'));
                }

                this.logged();

            } else {

                this.logout();

            }

        }

    },

    getAdminDates: function (profile) {

        /*
        Affinity.AdminPayPeriodBegins = '@ConfigurationManager.AppSettings["AdminPayPeriodBegins"]';
        Affinity.AdminPayPeriodEnds = '@ConfigurationManager.AppSettings["AdminPayPeriodEnds"]';
        Affinity.AdminOldestTimesheet = '@ConfigurationManager.AppSettings["AdminOldestTimesheet"]';
        Affinity.AdminNewestTimesheet = '@ConfigurationManager.AppSettings["AdminNewestTimesheet"]';
        */

        var __today = new Date().clearTime(),
            __adminPayPeriodBegins = '-7', // +/- days
            __adminPayPeriodEnds = '+7', // +/- days
            __adminOldestTimesheet = '-6', // +/- months
            __adminNewestTimesheet = '+1', // +/- months
            __offsetInt, __lastMonth, __thisMonth, __nextMonth;

        //console.log('Admin:');
        //console.log(__today);

        profile.admin = true;


        if ('Affinity' in window && typeOf(Affinity) === 'object' && 'AdminPayPeriodBegins' in Affinity && Affinity.AdminPayPeriodBegins) {
            __adminPayPeriodBegins = Affinity.AdminPayPeriodBegins;
            __adminPayPeriodEnds = Affinity.AdminPayPeriodEnds;
            __adminOldestTimesheet = Affinity.AdminOldestTimesheet;
            __adminNewestTimesheet = Affinity.AdminNewestTimesheet;
        }


        __offsetInt = parseInt(__adminPayPeriodBegins.replace('-', ''));
        if (__adminPayPeriodBegins.contains('+')) {
            profile.currentPayPeriodBegins = __today.clone().increment('day', __offsetInt);
            //console.log('Pay Period Begins:', profile.currentPayPeriodBegins, '(Today plus ' + __offsetInt + ' days)');
        } else if (__adminPayPeriodBegins.contains('-')) {
            profile.currentPayPeriodBegins = __today.clone().decrement('day', __offsetInt);
            //console.log('Pay Period Begins:', profile.currentPayPeriodBegins, '(Today  minus ' + __offsetInt + ' days)');
        }

        __offsetInt = parseInt(__adminPayPeriodEnds.replace('-', ''));
        if (__adminPayPeriodEnds.contains('+')) {
            profile.currentPayPeriodEnds = __today.clone().increment('day', __offsetInt);
            //console.log('Pay Period Ends:', profile.currentPayPeriodEnds, '(Today plus ' + __offsetInt + ' days)');
        } else if (__adminPayPeriodEnds.contains('-')) {
            profile.currentPayPeriodEnds = __today.clone().decrement('day', __offsetInt);
            //console.log('Pay Period Ends:', profile.currentPayPeriodEnds, '(Today minus ' + __offsetInt + ' days)');
        }

        /**/

        __offsetInt = parseInt(__adminOldestTimesheet.replace('-', ''));
        if (__adminOldestTimesheet.contains('+')) {
            profile.oldestTimesheetDate = __today.clone().increment('month', __offsetInt);
            //console.log('Oldest Timesheet:', profile.oldestTimesheetDate, '(Today plus ' + __offsetInt + ' months)');
        } else if (__adminOldestTimesheet.contains('-')) {
            profile.oldestTimesheetDate = __today.clone().decrement('month', __offsetInt);
            //console.log('Oldest Timesheet:', profile.oldestTimesheetDate, '(Today minus ' + __offsetInt + ' months)');
        }

        __offsetInt = parseInt(__adminNewestTimesheet.replace('-', ''));
        if (__adminNewestTimesheet.contains('+')) {
            profile.newestTimesheetDate = __today.clone().increment('month', __offsetInt);
            //console.log('Newest Timesheet:', profile.newestTimesheetDate, '(Today plus ' + __offsetInt + ' months)');
        } else if (__adminNewestTimesheet.contains('-')) {
            profile.newestTimesheetDate = __today.clone().decrement('month', __offsetInt);
            //console.log('Newest Timesheet:', profile.newestTimesheetDate, '(Today minus ' + __offsetInt + ' months)');
        }

        /**/

        __lastMonth = __today.clone().decrement('month', 1);
        __thisMonth = __today.clone();
        __nextMonth = __today.clone().increment('month', 1);

        profile.currentPaydate = __thisMonth.set('date', __thisMonth.get('lastdayofmonth'));
        profile.previousPaydate = __lastMonth.set('date', __lastMonth.get('lastdayofmonth'));
        profile.nextPaydate = __nextMonth.set('date', __nextMonth.get('lastdayofmonth'));

        //console.log('Current Pay Date:', profile.currentPaydate, '(Last day of this month)');
        //console.log('Previous Pay Date:', profile.previousPaydate, '(Last day of last month)');
        //console.log('Next Pay Date:', profile.nextPaydate, '(Last day of Next month)');

        /**/

        return profile;

    },

    /** SET SESSION IF CHECK OR LOGIN SUCCESS **/

    setSession: function (jsonData) {

        /** OLD AND NEW METHODS DO THIS: **/

        if (typeOf(jsonData) === 'object' && 'success' in jsonData && !jsonData.success) {
            this.clearSession();
            this.logout({
                message: 'Invalid username or password.' + ('error' in jsonData ? '<!--' + jsonData.error + '-->' : '')
            });
            return;
        }

        if ('isEss' in jsonData && typeOf(jsonData.isEss) === 'boolean' && jsonData.isEss === true) {
            Affinity.oldess = true;
            Affinity.oldessLaunched = true;
            Affinity.oldessFrame = false;
            Affinity.oldessWindow = window.opener;
        }

        /** CHECK FOR MIN VALUES **/

        /** create CommonName if missing or empty **/
        if (typeOf(jsonData.Commonname) === 'null' || jsonData.Commonname === '') {
            jsonData.Commonname = (jsonData.Firstname + ' ' + jsonData.Lastname).replace('  ', ' ').trim();
        }

        var fail = false;
        Affinity.session = false;
        if (Affinity.apiversion < 2) {
            Affinity.session = false;
            if (typeOf(jsonData.SessionKey) === 'string' && typeOf(jsonData.SessionKey) !== '' && typeOf(jsonData.SessionKey) !== 'undefined') {
                Affinity.session = jsonData.SessionKey;
            } else {
                fail = true;
            }
        }

        var error = '';

        if (fail) {
            error += 'No session key (required for old API method)\r\n';
        }
        if (typeOf(jsonData.Firstname) === 'null' || (typeOf(jsonData.Firstname) === 'string' && jsonData.Firstname.trim() === '')) {
            error += 'No first name\r\n';
        }
        if (typeOf(jsonData.Lastname) === 'null' || (typeOf(jsonData.Lastname) === 'string' && jsonData.Lastname.trim() === '')) {
            error += 'No last name\r\n';
        }
        if (typeOf(jsonData.EmployeeNumber) === 'null' || (typeOf(jsonData.EmployeeNumber) === 'string' && jsonData.EmployeeNumber.trim() === '')) {
            error += 'No employee number\r\n';
        }
        if (typeOf(jsonData.CompanyNumber) === 'null' || (typeOf(jsonData.CompanyNumber) === 'string' && jsonData.CompanyNumber.trim() === '')) {
            error += 'No company number\r\n';
        }

        if (error !== '') {

            log('&#x2718; attempted login succeeded with errors - Minimum login details are not set');

            this.clearSession();
            this.logout({
                message: 'Minimum login details are not set.<!--\r\n' + error + '\r\n-->'
            });
            return;
        }

        /** GOT MIN VALUES - CONT **/

        log('&#x2714; attempted login succeeded');

        this.button.removeClass('hidden');
        this.loader.addClass('hidden');

        this.employeeNumber = jsonData.EmployeeNumber;
        this.companyNumber = jsonData.CompanyNumber;

        this.values = {};
        Object.each(jsonData, function (value, key) {
            if (typeOf(value) === 'string' || typeOf(value) === 'number') {
                this.values[key] = value;
            }
            this[key] = value;
        }.bind(this));

        if (typeOf(this.values.ShowTimesheetFrom) === 'null') {
            this.values.ShowTimesheetFrom = Date.parse(new Date()).decrement('day', 14);
            this.ShowTimesheetFrom = this.values.ShowTimesheetFrom;
        }
        if (typeOf(this.values.NewestTimesheetDate) === 'null') {
            if (typeOf(this.values.ShowTimesheetFrom) !== 'null') {
                if (typeOf(this.values.ShowTimesheetFrom) === 'string') {
                    this.values.NewestTimesheetDate = Date.parse(this.values.ShowTimesheetFrom).increment('month', 1);
                } else if (typeOf(this.values.ShowTimesheetFrom) === 'date') {
                    this.values.NewestTimesheetDate = this.values.ShowTimesheetFrom.clone().increment('month', 1);
                }
                this.NewestTimesheetDate = this.values.NewestTimesheetDate;
            }
        }

        this.areas = this.Areas;

        this.payPoints = jsonData.PayPoints;

        this.employeeGroups = jsonData.EmployeeGroups;

        this.screenFilters = jsonData.ScreenFilters;

        if (jsonData.PublicHolidays) {
            this.publicHolidays = jsonData.PublicHolidays;
        }

        this.user = {};
        this.user.firstName = this.values.Firstname;
        this.user.lastname = this.values.Lastname;
        this.user.displayName = this.values.Commonname;
        this.user.employeeNumber = this.employeeNumber;
        this.user.companyNumber = this.companyNumber;

        /*************************************************************************/

        var profile = Object.clone(this.profile_stub);

        profile.firstName = jsonData.Firstname;
        profile.lastName = jsonData.Lastname;
        profile.commonName = jsonData.Commonname;
        profile.employeeNumber = jsonData.EmployeeNumber;
        profile.companyNumber = jsonData.CompanyNumber;

        profile.payPoints = typeOf(jsonData.PayPoints) !== 'null' ? jsonData.PayPoints : false;
        profile.employeeGroups = typeOf(jsonData.EmployeeGroups) !== 'null' ? jsonData.EmployeeGroups : [];
        profile.screenFilters = typeOf(jsonData.ScreenFilters) !== 'null' ? jsonData.ScreenFilters : [];
        profile.publicHolidays = typeOf(jsonData.PublicHolidays) !== 'null' ? jsonData.PublicHolidays : [];

        profile.currentPayPeriodBegins = typeOf(jsonData.CurrentPayPeriodBegins) !== 'null' ? Date.parse(jsonData.CurrentPayPeriodBegins) : false;
        profile.currentPaydate = typeOf(jsonData.CurrentPaydate) !== 'null' ? Date.parse(jsonData.CurrentPaydate) : false;
        profile.previousPaydate = typeOf(jsonData.PreviousPaydate) !== 'null' ? Date.parse(jsonData.PreviousPaydate) : false;
        profile.nextPaydate = typeOf(jsonData.NextPaydate) !== 'null' ? Date.parse(jsonData.NextPaydate) : false;
        profile.oldestTimesheetDate = typeOf(jsonData.OldestTimesheetDate) !== 'null' ? Date.parse(jsonData.OldestTimesheetDate) : false;
        profile.newestTimesheetDate = typeOf(jsonData.NewestTimesheetDate) !== 'null' ? Date.parse(jsonData.NewestTimesheetDate) : false;
        profile.startDayOfTheWeek = typeOf(jsonData.StartDayOfTheWeek) !== 'null' ? parseInt(jsonData.StartDayOfTheWeek) : 0;
        profile.rowsPerPage = typeOf(jsonData.RowsPerPage) !== 'null' ? parseInt(jsonData.RowsPerPage) : 20;

        if (jsonData.EmployeeNumber > 5000000) { // Admin - fake minimum data

            profile = this.getAdminDates(profile);

            /*
            profile.admin = true;
            if (typeOf(jsonData.ShowTimesheetFrom) === 'null') {
                profile.showTimesheetFrom = Date.parse(new Date()).decrement('day', 14);
            } else {
                profile.showTimesheetFrom = Date.parse(jsonData.ShowTimesheetFrom);
            }
            if (typeOf(jsonData.NewestTimesheetDate) === 'null') {
                if (typeOf(jsonData.ShowTimesheetFrom) !== 'null') {
                    if (typeOf(jsonData.ShowTimesheetFrom) === 'string') {
                        profile.newestTimesheetDate = Date.parse(jsonData.ShowTimesheetFrom).increment('month', 1);
                    } else if (typeOf(Affinity.login.profile.showTimesheetFrom) === 'date') {
                        profile.newestTimesheetDate = Affinity.login.profile.showTimesheetFrom.clone().increment('month', 1);
                    }
                }
            } else {
                profile.newestTimesheetDate = Date.parse(jsonData.NewestTimesheetDate);
            }

            // Minimum date values for PayPeriods
            if (
                typeOf(jsonData.CurrentPaydate) === 'null' ||
                typeOf(jsonData.PreviousPaydate) === 'null' ||
                typeOf(jsonData.NextPaydate) === 'null' ||
                typeOf(jsonData.NewestTimesheetDate) === 'null' ||
                typeOf(jsonData.OldestTimesheetDate) === 'null'
            ) {

                var today = new Date().clearTime();
                profile.currentPaydate = today.clone().set('date', 1).increment('month', 1).decrement('day', 1);
                profile.previousPaydate = profile.currentPaydate.clone().decrement('month', 1);
                profile.nextPaydate = profile.currentPaydate.clone().increment('month', 1);
                profile.newestTimesheetDate = today.clone().increment('month', 1);
                profile.oldestTimesheetDate = today.clone().decrement('month', 2);
            }
            */

        }

        Affinity.login.profile = Object.clone(profile);
        if (!Affinity.login.hasOwnProperty('userProfiles')) {
            Affinity.login.userProfiles = {};
        }

        Affinity.login.userProfiles[profile.employeeNumber] = Object.clone(profile);

        /*

        Affinity.login.companyNumber = jsonData.CompanyNumber;

        Affinity.login.profile = Object.clone(this.profile_stub);

        Affinity.login.profile.firstName = jsonData.Firstname;
        Affinity.login.profile.lastName = jsonData.Lastname;
        Affinity.login.profile.commonName = jsonData.Commonname;
        Affinity.login.profile.employeeNumber = jsonData.EmployeeNumber;

        Affinity.login.profile.payPoints = typeOf(jsonData.PayPoints) !== 'null' ? jsonData.PayPoints : false;
        Affinity.login.profile.employeeGroups = typeOf(jsonData.EmployeeGroups) !== 'null' ? jsonData.EmployeeGroups : [];
        Affinity.login.profile.screenFilters = typeOf(jsonData.ScreenFilters) !== 'null' ? jsonData.ScreenFilters : [];
        Affinity.login.profile.publicHolidays = typeOf(jsonData.PublicHolidays) !== 'null' ? jsonData.PublicHolidays : [];

        Affinity.login.profile.currentPayPeriodBegins = typeOf(jsonData.CurrentPayPeriodBegins) !== 'null' ? Date.parse(jsonData.CurrentPayPeriodBegins) : false;
        Affinity.login.profile.currentPaydate = typeOf(jsonData.CurrentPaydate) !== 'null' ? Date.parse(jsonData.CurrentPaydate) : false;
        Affinity.login.profile.previousPaydate = typeOf(jsonData.PreviousPaydate) !== 'null' ? Date.parse(jsonData.PreviousPaydate) : false;
        Affinity.login.profile.nextPaydate = typeOf(jsonData.NextPaydate) !== 'null' ? Date.parse(jsonData.NextPaydate) : false;
        Affinity.login.profile.oldestTimesheetDate = typeOf(jsonData.OldestTimesheetDate) !== 'null' ? Date.parse(jsonData.OldestTimesheetDate) : false;
        Affinity.login.profile.newestTimesheetDate = typeOf(jsonData.NewestTimesheetDate) !== 'null' ? Date.parse(jsonData.NewestTimesheetDate) : false;
        Affinity.login.profile.startDayOfTheWeek = typeOf(jsonData.StartDayOfTheWeek) !== 'null' ? parseInt(jsonData.StartDayOfTheWeek) : 0;
        Affinity.login.profile.rowsPerPage = typeOf(jsonData.RowsPerPage) !== 'null' ? parseInt(jsonData.RowsPerPage) : 20;

        if (typeOf(jsonData.ShowTimesheetFrom) === 'null') {
            Affinity.login.profile.showTimesheetFrom = Date.parse(new Date()).decrement('day', 14);
        } else {
            Affinity.login.profile.showTimesheetFrom = Date.parse(jsonData.ShowTimesheetFrom);
        }

        if (typeOf(jsonData.NewestTimesheetDate) === 'null') {
            if (typeOf(jsonData.ShowTimesheetFrom) !== 'null') {
                if (typeOf(jsonData.ShowTimesheetFrom) === 'string') {
                    Affinity.login.profile.newestTimesheetDate = Date.parse(jsonData.ShowTimesheetFrom).increment('month', 1);
                } else if (typeOf(Affinity.login.profile.showTimesheetFrom) === 'date') {
                    Affinity.login.profile.newestTimesheetDate = Affinity.login.profile.showTimesheetFrom.clone().increment('month', 1);
                }
            }
        } else {
            Affinity.login.profile.newestTimesheetDate = Date.parse(jsonData.NewestTimesheetDate);
        }
        */

        /*************************************************************************/

        Affinity.login.areas = {};

        var area_stub;
        if ('Areas' in jsonData && typeOf(jsonData.Areas) === 'object') {
            Object.each(jsonData.Areas, function (area, key) {
                Affinity.login.areas[key] = {};
                area_stub = {};
                if (key === 'Timesheet') {
                    area_stub = Object.clone(this.area_timesheets_stub);
                } else {
                    area_stub = Object.clone(this.area_stub);
                }
                Object.each(area_stub, function (value, stubkey) {
                    if (stubkey in area) {
                        Affinity.login.areas[key][stubkey] = area[stubkey];
                    }
                }.bind(this));
            }.bind(this));
        }

        /*************************************************************************/

        /** GOT EMPLOYEE DETAILS **/

        this.companyNumber = this.CompanyNumber;
        this.employeeNumber = this.EmployeeNumber;

        this.errormesg.addClass('hidden');
        if (this.keepSeesionInput.checked) {
            Affinity.CookieMonster.Write(Affinity.appname + 'KeepSession', true);
            this.keepSession = true;
        } else {
            Affinity.CookieMonster.Write(Affinity.appname + 'KeepSession', false);
            this.keepSession = false;
        }
        if (this.rememberMeInput.checked) {
            Affinity.CookieMonster.Write(Affinity.appname + 'RememberMe', this.userInput.value);
            this.rememberMe = true;
            this.username = this.userInput.value;
        } else {
            Affinity.CookieMonster.Write(Affinity.appname + 'RememberMe', false);
            this.rememberMe = false;
            this.username = '';
        }

        if (Affinity.apiversion > 1) {

            /** NEW METHOD **/

        } else {

            /** OLD METHOD **/

            /** SET COOKEIS **/

            Affinity.CookieMonster.Write(Affinity.appname + 'Values', JSON.stringify(this.values));
            Affinity.CookieMonster.Write(Affinity.appname + 'Values', JSON.stringify(this.values));
            Affinity.CookieMonster.Write(Affinity.appname + 'Areas', JSON.stringify(this.areas));
            Affinity.CookieMonster.Write(Affinity.appname + 'PayPoints', JSON.stringify(this.payPoints));
            Affinity.CookieMonster.Write(Affinity.appname + 'EmployeeGroups', JSON.stringify(this.employeeGroups));
            Affinity.CookieMonster.Write(Affinity.appname + 'ScreenFilters', JSON.stringify(this.screenFilters));
            if (jsonData.PublicHolidays) {
                Affinity.CookieMonster.Write(Affinity.appname + 'PublicHolidays', JSON.stringify(this.publicHolidays));
            }
            Affinity.CookieMonster.Write(Affinity.appname + 'User', JSON.stringify(this.user));
            Affinity.CookieMonster.Write(Affinity.appname + 'CompanyNumber', this.companyNumber, 1440 / 2); // half day in mins
            Affinity.CookieMonster.Write(Affinity.appname + 'EmployeeNumber', this.employeeNumber, 1440 / 2); // half day in mins

            if (this.keepSession) {
                Affinity.CookieMonster.Write(Affinity.appname + 'Session', Affinity.session);
            } else {
                Affinity.CookieMonster.Write(Affinity.appname + 'Session', Affinity.session, 1440 / 2); // half day in mins
            }

            /** CHECK SESISON KEY STUFF? **/

            if (
                (typeOf(jsonData.success) !== 'null' && !jsonData.success) ||
                typeOf(jsonData.Error) !== 'null' ||
                typeOf(jsonData.error) !== 'null'
            ) {

                var errmsg = false;
                this.errormesg.set('html', 'We could not log you in');
                this.errormesg.addClass('hidden');
                if (typeOf(jsonData.error) !== 'null' && jsonData.error !== '') {
                    errmsg = this.sanatiseError(jsonData.error);
                } else if (typeOf(jsonData.Error) !== 'null' && jsonData.Error !== '') {
                    errmsg = this.sanatiseError(jsonData.error);
                }
                if (errmsg) {
                    this.errormesg.set('html', errmsg);
                    this.errormesg.removeClass('hidden');
                }

                log('&#x2718; attempted login succeeded with errors - ' + errmsg);

                this.button.removeClass('hidden');
                this.loader.addClass('hidden');
                this.clearSession();
                this.show();

                this.requestSessionFailed();
                return;

            }

        }

        /** all done with no returns **/

        if (this.logstatus === 'loggedout') {
            this.logstatus = 'loggedin';
            //window.fireEvent('userComplete', this.user);
            window.fireEvent('userComplete', Affinity.login.profile);
            this.logged();
        }

    },

    /** CLEAR EXISTING SESSION **/

    clearSession: function (e) {

        if (Affinity.apiversion > 1) {

            /** NEW METHOD **/

        } else {

            /** OLD METHOD **/

            Affinity.CookieMonster.Delete(Affinity.appname + 'User');
            Affinity.CookieMonster.Delete(Affinity.appname + 'Areas');
            Affinity.CookieMonster.Delete(Affinity.appname + 'PayPoints');
            Affinity.CookieMonster.Delete(Affinity.appname + 'PublicHolidays');
            Affinity.CookieMonster.Delete(Affinity.appname + 'EmployeeGroups');
            Affinity.CookieMonster.Delete(Affinity.appname + 'ScreenFilters');
            Affinity.CookieMonster.Delete(Affinity.appname + 'Values');
            Affinity.CookieMonster.Delete(Affinity.appname + 'CompanyNumber');
            Affinity.CookieMonster.Delete(Affinity.appname + 'EmployeeNumber');
            Affinity.CookieMonster.Delete(Affinity.appname + 'Session');
            Affinity.session = false;

        }

        /** OLD AND NEW METHODS DO THIS: **/

        if (typeOf(this.values) === 'object') {
            Object.each(this.values, function (value, key) { this[key] = null; delete this[key]; }.bind(this));
        }
        this.values = {};
        this.user.firstName = '';
        this.user.lastname = '';
        this.user.displayname = '';
        this.user.employeeNumber = '';
        this.user.companyNumber = '';
        this.user = {};
        this.areas = { Timesheet: {}, Employee: {} };
        this.payPoints = [];
        this.employeeGroups = [];
        this.screenFilters = [];
        this.companyNumber = null;
        this.employeeNumber = null;
        this.publicHolidays = [];
        if (typeOf(e) !== 'null') {
            if (typeOf(e.redirectToGateway) !== undefined && e.redirectToGateway) {
                var host = this.getDomainName(window.location.host);
                var redirect = "https://www." + host + "/#/Login?redirectUrl=https://dashboard." + host + "/Leave";
                var dashboardWrapper = document.querySelector(".dashboard#app");
                if (dashboardWrapper == null) {
                    redirect = "https://www." + host + "/#/";
                }
                window.location.href = redirect;
                return;
            } 
        }
        this.show();
        this.logstatus = 'loggedout';
        window.scrollTo(0, 0);
        window.fireEvent('loggedout');
    },

    /** REQUEST RESPONSES **/

    requestSessionFailed: function (e) {
        if (typeOf(e) !== 'null') {
            if (e.statusText) {
                log('&#x2718; attempted login failed - ' + e.statustext);
            } else {
                log('&#x2718; attempted login failed with errors - ' + JSON.stringify(e));
            }
        }
        this.errormesg.removeClass('hidden');
        this.button.removeClass('hidden');
        this.loader.addClass('hidden');
    },

    requestSessionFailedException: function (e) {
        log('&#x2718; attempted login failed with exception(s)');
        this.errormesg.set('html', 'There was an exception. Please try again.');
        this.errormesg.removeClass('hidden');
        this.requestSessionFailed();
    },

    requestSessionFailedTimeout: function (e) {
        log('&#x2718; attempted login timed out');
        this.errormesg.set('html', 'Attempt timed out. Please check your connection and try again.');
        this.errormesg.removeClass('hidden');
        this.requestSessionFailed();
    },

    /** CHECK EXISTING SESSION KEY **/

    checkSessionKeyRequest: false,
    checkSessionKey: function (sessionkey) {

        var api;

        if (Affinity.apiversion > 1) {
            api = Affinity.GetCacheSafePath(Affinity.authroot + '/CheckSession');
            this.checkSessionKeyRequest = new Request.JSON({
                url: api,
                onSuccess: this.setSession,
                onError: this.show,
                onFailure: this.show
            });

            this.checkSessionKeyRequest.setHeader('sessionkey', sessionkey);
            this.checkSessionKeyRequest.get();

        } else {

            api = Affinity.GetCacheSafePath(Affinity.zelosroot + '?api=Authentication/Get');

            log('&#x2794; attempting login ...');

            var checkRequest = new Request.JSON({
                url: api,
                method: 'get',
                onSuccess: this.setSession,
                onError: this.show,
                onFailure: this.show
            });
            checkRequest.setHeader('sessionkey', sessionkey);
            checkRequest.get();
            delete url;

        }
    },

    /** BASE LOGIN / LOGOUT METHODS **/

    logged: function () {

        if (Affinity.apiversion > 1) {

            /** NEW METHOD **/

            window.fireEvent('loggedin', true);

        } else {

            /** OLD METHOD **/

            window.fireEvent('loggedin', Affinity.session);

        }

        this.hide();
    },

    login: function () {
        this.show();
    },

    processlogin: function () {

        this.button.addClass('hidden');
        this.loader.removeClass('hidden');

        /*
        if (Affinity && Affinity.isie) {
            this.requestSession.url = this.requestSession.options.url = this.authApi + '?ran=' + String.uniqueID() + Date.parse(new Date()).format('%s');
        }
        */

        log('&#x2794; attempting login ...');

        var loginapi = '';
        if (Affinity.apiversion > 1) {
            /** NEW METHOD **/
            loginapi = Affinity.GetCacheSafePath(Affinity.authroot);
        } else {
            /** OLD METHOD **/
            loginapi = Affinity.GetCacheSafePath(Affinity.zelosroot + '?api=Authentication/Get');
        }

        this.requestSession.url = this.requestSession.options.url = loginapi;
        this.requestSession.setHeader('username', this.userInput.value);
        this.requestSession.setHeader('password', this.passInput.value);
        this.requestSession.get();

    },

    logout: function (e) {

        log('** log out **');

        clearTimeout(this.hiddenTimer);

        this.clearSession(e);

        this.button.removeClass('hidden');
        this.loader.addClass('hidden');

        this.logstatus = 'loggingout...';

        if (typeOf(e) !== 'null') {
            /* check event object for other instructions */
            /* check for 'close window' command */
            if (typeOf(e.closewindow) !== 'null' && e.closewindow) {
                window.close();
                return;
            }
            if (typeOf(e.message) === 'string') {
                log('** log out message: \r\n' + e.message.replace('<!--', '').replace('-->', '') + '\r\n');
                this.errormesg.set('html', e.message);
                this.errormesg.removeClass('hidden');
            }
        }

        /**/

        var logoutRequest, api;

        if (Affinity.apiversion > 1) {

            /** NEW METHOD **/
            api = Affinity.GetCacheSafePath(Affinity.authroot + '/Logout');
            logoutRequest = new Request.JSON({
                url: api,
                method: 'get',
                onRequest: function () {
                    log('&#x2794; attempting logout ...', { 'color': 'blue' });
                },
                onSuccess: function (jsonData) {
                    log('&#x2714; attempted logout succeeded from zelos', { 'color': 'green' });
                },
                onError: function (err) {
                    log('&#x2714; attempted logout failed with errors - ' + err, { 'color': 'red' });
                },
                onException: function (headerName, value) {
                    log('&#x2714; attempted logout failed with errors - ' + headerName + ': ' + value, { 'color': 'red' });
                }.bind(this),
                onFailure: function (xhr) {
                    var error = '';
                    switch (xhr.status) {
                        case 401:
                            error = 'unauthorized.';
                            break;
                        case 404:
                            error = 'path not found.';
                            break;
                        case 500:
                            var json;
                            try {
                                json = JSON.decode(xhr.responseText);
                            } catch (e) {
                                json = false;
                                error = xhr.responseText
                            }
                            if (json) {
                                if (json.error) {
                                    error = json.error;
                                } else {
                                    error = xhr.responseText;
                                }
                            }
                            delete json;
                            break;
                        default:
                            error = xhr.statusText;
                    }
                    if (error.contains(401) || error.toLowerCase().contains('unauthorized')) {
                        log('&#x2714; attempted logout failed - unauthorized', { 'color': 'red' });
                    } else {
                        log('&#x2714; attempted logout failed with errors - ' + error, { 'color': 'red' });
                    }
                },
                onTimeout: function () {
                    log('&#x2714; attempted logout timeout', { 'color': 'red' });
                }
            }).get();
            api = null;
        } else {

            /** OLD METHOD **/
            var sessionkey = Affinity.session + '';
            if (sessionkey && sessionkey !== '') {
                api = Affinity.GetCacheSafePath(Affinity.zelosroot + '?api=Authentication/Logout');
            }
            if (typeOf(api) !== 'null') {
                logoutRequest = new Request.JSON({
                    url: api,
                    method: 'get'
                });
                logoutRequest.setHeader('sessionkey', sessionkey);
                logoutRequest.get();
                api = sessionkey = null;
            }
        }

        if (e == null || typeOf(e.redirectToGateway) == "undefined" || !e.redirectToGateway) {
            this.show();
        }

        (function () {
            this.clearSession(e);
        }).delay(250, this);

    },

    /** HELPER METHODS **/

    sanatiseError: function (str) {
        if (typeOf(str) !== 'null' && str.toLowerCase().contains('failed to authenticate')) {
            return 'Your Username or Password were incorrect';
        }
        if (typeOf(str) === 'null') {
            return 'We could not log you in';
        }
        if (str.contains(' - ')) {
            return str.substring(str.indexOf(' - ') + 3);
        }
        return str;
    },

    getDomainName: function(hostName)
    {
        return hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
    },

    /** LAYOUT METHODS **/
    position: function () {

        var size = this.options.target.measure(function () {
            return this.getSize();
        });

        if (Affinity.mobile) {

            if (!this.options.target.hasClass('scaled')) {

                var scale, styles;

                var left = 0;

                var size = this.options.target.measure(function () { return this.getSize(); });
                var windwSize = window.getSize();
                windwSize.x -= 40;
                windwSize.y -= 40;

                if (size.x > size.y) {
                    scale = Number(windwSize.x / size.x).round(2);
                } else {
                    scale = Number(windwSize.y / size.y).round(2);
                }

                if ((size.y * scale) > windwSize.y) {
                    scale = Number(windwSize.y / size.y).round(2);
                }

                if (windwSize.x + 40 > (size.x * scale)) {
                    left = ((windwSize.x + 40) - (size.x * scale)) / 2;
                }

                styles = {
                    'left': left,
                    '-webkit-transform': 'scale(' + scale + ')',
                    '-webkit-transform-origin': '0 0',
                    'transform': 'scale(' + scale + ')',
                    'transform-origin': '0 0'
                };

                this.options.target.setStyles(styles);

                this.options.target.removeClass('invisible');
                this.options.target.addClass('scaled');

            }

        } else {

            this.options.target.setStyles({
                'margin-top': 0 - ((size.y / 2) + 40)
            });

        }

        delete size;

    },

    hiddenTimer: null,

    setAsHidden: function () {
        this.options.target.addClass('hidden');
        this.options.targetbg.addClass('hidden');
    },

    set: function (data) {
        if (data.username) {
            this.userInput.value = data.username;
        }
        if (data.password) {
            this.passInput.value = data.password;
        }
        if (data.zelosServer || data.zelosroot) {
            if (data.zelosServer) {
                Affinity.zelosroot = data.zelosServer;
            }
            if (data.zelosroot) {
                Affinity.zelosroot = data.zelosroot;
            }
            if (data.apiroot) {
                Affinity.zelosroot = data.apiroot;
            }
            var loginapi = '';
            if (Affinity.apiversion > 1) {
                /** NEW METHOD **/
                loginapi = Affinity.GetCacheSafePath(Affinity.zelosroot);
            } else {
                /** OLD METHOD **/
                loginapi = Affinity.GetCacheSafePath(Affinity.zelosroot + '?api=Authentication/Get');
            }
            this.requestSession.options.url = this.requestSession.url = loginapi;
        }
    },

    show: function () {
        this.status = 'open';
        this.userInput.value = '';
        this.passInput.value = '';
        this.rememberMeInput.checked = false;
        this.keepSeesionInput.checked = false;
        if (this.rememberMe) {
            this.rememberMeInput.checked = 'checked';
            this.userInput.value = this.username;
        }
        if (this.keepSession) {
            this.keepSeesionInput.checked = 'checked';
        }
        clearTimeout(this.hiddenTimer);
        this.options.target.removeClass('hidden');
        this.options.targetbg.removeClass('hidden');
        this.options.target.fade('in');
        if (!this.options.underlay) {
            this.options.targetbg.fade('in');
        }
        this.position();
    },

    hide: function () {
        this.status = 'closed';
        clearTimeout(this.hiddenTimer);
        if (!this.options.underlay) {
            this.options.targetbg.fade('out');
        } else {
            this.options.targetbg.addClass('hidden');
        }
        this.options.target.fade('out');
        this.hiddenTimer = this.setAsHidden.delay(260, this);
    },

    cancel: function () {
        if (this.requestSession && this.requestSession.isRunning()) {
            this.requestSession.cancel();
        }
        this.hide();
    }

});
/*                                                                                  *
 * This script belongs to the ui (user interface) package.                          *
 *                                                                                  *
 * The following code assumes MooTools Core 1.4.5 has been included.                *
 *                                                                                  */


/**
 * @class UIModal
 *
 * Modal (light box) handler
 *
 */
var UIModal = new Class({

    Version: '1.0.0.0',
    File: 'ui.modal.js',

    Implements: [Options],

    Binds: [
		'setElement', 'setString',
        'adopt',
		'position',
        'clear',
        'closeButtonCloser', 'backgroundCloser',
        'show', 'hide'
    ],

    Options: {
		
    },
    
    backgroundCloses: true,

    initialize: function (options) {
        this.setOptions(options);

        this.icons = {};
        this.icons.del = Affinity.icons.CrossRound;
		
		if(!document.id('uimodalbg')){
			this.modalbg = new Element('div', {
				id:'uimodalbg',
				'class':'white hidden'
			}).inject(document.body, 'bottom');
		}
		
		if(!document.id('uimodal')){
			this.modal = new Element('div', {
				id:'uimodal',
				'class': 'shadow hidden'
			}).inject(document.body, 'bottom');
			this.modalclose = new Element('div', {
			    'class': 'uimodalclose'
			}).inject(this.modal);
			new Element('span', { 'class': 'icon-cross' }).inject(this.modalclose);
			this.modalbody = new Element('div', {
				'class':'uimodalbody'
			}).inject(this.modal);
		}
		
		this.modalbg = document.id('uimodalbg');
		this.modal = document.id('uimodal');

		this.modalbg.set('tween', { duration: 250 });
		this.modal.set('tween', { duration: 250 });
		
		this.modalclose = this.modal.getElement('.uimodalclose');
		this.modalbody = this.modal.getElement('.uimodalbody');

		this.modalbg.addEvent('click', this.backgroundCloser);
        
		this.modalclose.addEvent('click', this.closeButtonCloser);

		this.modalbg.removeClass('hidden').fade('hide');
		this.modal.removeClass('hidden').fade('hide');
		
		window.addEvent('resize',function(e){this.position();}.bind(this));
		this.position();

        /**/

		this.scroll = {};
		this.scroll.enable = function () {
		    this.modal.addClass('scroll');
		}.bind(this);
		this.scroll.disable = function () {
		    this.modal.removeClass('scroll');
        }.bind(this);

        /**/

		this.close = {};
		this.close.enable = function () {
		    this.modalclose.removeClass('hidden');
		}.bind(this);
		this.close.disable = function () {
		    this.modalclose.addClass('hidden');
		}.bind(this);

        /**/

		
    },

    getCalculatedTop: function () {
        if (Affinity.oldess && Affinity.oldessFrame) { // nested frames make life difficult
            var win = window.parent.window;
            var doc = win.document.documentElement, body = win.document.body;
            var parentScroll = (doc && doc.scrollTop || body && body.scrollTop || 0);
            //var framePosition = window.frameElement.offsetTop; // ????????
            var framePosition = 0;
            var frame = window.parent.document.getElementById("ctl00_MainPanel");
            if (frame) {
                if (document.documentMode && document.documentMode < 9) {
                    framePosition = frame.querySelectorAll(".ContentBody")[0].offsetTop;
                } else {
                    framePosition = frame.getElementsByClassName("ContentBody")[0].offsetTop;
                }
            }
            var top = parentScroll - framePosition;
            if (top < 10) {
                top = 10;
            }
            return top + 10;
        }
        return 10;
    },
	
	position: function(){
	    var size = window.getSize();
        
		this.modalbg.setStyles({
			width: size.x,
			height: size.y
		});
        
		this.modal.setStyles({
		    left: (size.x / 2) - (this.modal.getDimensions().width / 2),
		    top: this.getCalculatedTop()
		});

		this.modalbody.setStyles({
		    'max-height': size.y - 60
		});

		delete size;
	},
	
	setElement: function(el){
		this.modalbody.empty();
		el.inject(this.modalbody);
		this.position();
		this.close.enable();
		this.scroll.enable();
	},

	adopt: function (el) {
	    this.setElement(el);
	},
	
	setString: function (str) {
		this.modalbody.empty();
		this.modalbody.set('html',str);
		this.position();
		this.close.enable();
		this.scroll.enable();
	},
    
    backgroundCloser: function (e) {
        this.closeButtonCloser(e);
    },

    closeButtonCloser: function (e) {
        window.fireEvent("leaveEditDetailCloses");
        if (this.backgroundCloses) {
            this.hide();
        }
    },
	
    hide: function () {
        if ('beforeClose' in this && typeOf(this.beforeClose) === 'function') {
            this.beforeClose();
            this.beforeClose = null;
            delete this.beforeClose;
        }
		document.body.removeClass('uimodal-open');
		this.modalbg.fade('out');
		this.modal.fade('out');
	    this.clear.delay(500, this);
	},
	
	show: function (backgroundCloses) {

	    if (backgroundCloses == null) {
	        backgroundCloses = true;
	        this.modalclose.fade('show');
	    }else {
	        this.modalclose.fade('hide');
	    }
		document.body.addClass('uimodal-open');
	    this.backgroundCloses = backgroundCloses;

	    this.modalbg.fade('in');
		this.modal.fade('in');
	},
    
    clear: function () {
        this.modalbody.empty();
    }
	
});

var UIPromptPositionObject = {
    position: 'absolute',
    top: false,
    left: false
};

var UILoaderObject = {
    message: 'Loading',
    onClose: function () { },
    timeout: null,
    position: {},
    showButtons: false,
    showLoader: true,
    noClose: true,
    cssSelector: ''
};

var UIMessageObject = {
    message: 'Message!',
    onClose: function () { },
    timeout: null,
    position: {},
    cssSelector: ''
};

var UIAlertObject = {
    message: 'Alert!',
    messageAlign: 'center',
    okText: 'Ok',
    okIcon: '',
    okColor: 'green',
    cancelText: 'Cancel',
    cancelIcon: '',
    cancelColor: 'grey',
    onOk: function () { },
    onCancel: function () { },
    onClose: function () { },
    showButtons: true,
    showCancel: false,
    noClose: false,
    showLoader: false,
    append: false,
    position: {},
    cssSelector: '',
    showHiddenInfo: false,
    hiddenInfoMessage: '',
    hiddenInfoButtonText: '',
};

var UIConfirmObject = {
    message: 'Yes or No?',
    messageAlign: 'center',
    okText: 'Yes',
    okIcon: '',
    okColor: 'green',
    cancelText: 'No',
    cancelIcon: '',
    cancelColor: 'grey',
    onOk: function () { },
    onCancel: function () { },
    onClose: function () { },
    noClose: true,
    position: {},
    cssSelector: ''
};

var UIPromptObject = {
    message: 'Enter text',
    messageAlign: 'center',
    lines: 1,
    okText: 'Ok',
    okIcon: '',
    okColor: 'green',
    cancelText: 'Cancel',
    cancelIcon: '',
    cancelColor: 'grey',
    value: '',
    onOk: function () { },
    onCancel: function () { },
    onClose: function () { },
    noClose: true,
    position: {},
    cssSelector: ''
};

var UIPompts = new Class({

    Version: '1.0.4.0',
    Sequence: 1050,
    Name: 'Prompts',
    File: 'ui.prompts.js',
    Jira: '',
    Notes: 'Added value for TS Favs edit',

    Implements: [Options],

    Binds: [
    'returnOptionsObject',
    'message', 'alert', 'prompt', 'confirm', 'loader',
    'center', 'show',
    'escape', 'hide',
    'hideDelay', 'clearHideDelay',
    'okKeyUp'
    ],

    options: {

    },

    status: 'closed',
    message: '',

    currentObj: false,
    container: false,

    currentType: '',

    initialize: function (options) {

        this.setOptions(options);

        if (document.id('UIPromtBoxBG')) {
            this.promptBoxBG = document.id('UIPromtBoxBG');
        }
        else {
            this.promptBoxBG = new Element('div', { 'id': 'UIPromtBoxBG', 'class': 'UIPromtBoxBG' }).inject(document.body, 'bottom');
        }
        this.promptBoxBG.set('tween', { duration: 250 });
        this.promptBoxBG.fade('hide');

        if (document.id('UIPromtBox')) {
            this.promptBox = document.id('UIPromtBox');
        }
        else {
            var mobileWrap = new Element('div', { 'class': 'mobile-wrap' }).inject(document.body, 'bottom');
            this.promptBox = new Element('div', { 'id': 'UIPromtBox', 'class': 'UIPromtBox' }).inject(mobileWrap);
        }
        this.promptBox.set('tween', { duration: 250 });
        this.promptBox.fade('hide');

        this.container = this.promptBox;

        this.trueButton = new Element('span', { 'class': 'button true-button w-icon', 'tabindex': 9999998 }).adopt(
        new Element('span', { 'html': Affinity.icons.Tick || '&#xe066;' }),
        new Element('span', { 'class': 'label', 'html': '' })
        );

        this.falseButton = new Element('span', { 'class': 'button false-button w-icon', 'tabindex': 9999999 }).adopt(
        new Element('span', { 'html': Affinity.icons.Cancel || '&#xe070;' }),
        new Element('span', { 'class': 'label', 'html': '' })
        );

        /**/

        this.promptBoxBG.removeEvents();
        this.promptBoxBG.addEvent('keyup', function (e) {
            e.stop();
            if (!this.obj.noClose && e.key == 'esc') {
                this.hide();
                return;
            }
            if (e.key == 'enter') {
                this.obj.onOk();
            }
        }.bind(this));

        /**/

        if (Affinity.mobile) {
            window.removeEvent('mobileback', this.escape);
            window.addEvent('mobileback', this.escape);
        }

        /**/

        window.prompts = this;
        window.uimessage = this.message;
        window.uialert = this.alert;
        window.uiconfirm = this.confirm;
        window.uiprompt = this.prompt;
        window.uiloader = this.loader;

    },

    returnOptionsObject: function (object) {
        var obj = {};
        var clone = Object.clone(object);
        var newObj = Object.merge(obj, clone);
        return newObj;
    },

    message: function (options) {

        var obj = this.returnOptionsObject(UIMessageObject);
        obj.message = options.message ? options.message : obj.message;
        obj.messageAlign = options.messageAlign ? options.messageAlign : obj.messageAlign;
        obj.timeout = options.timeout ? options.timeout : obj.timeout;
        obj.cssSelector = options.cssSelector ? options.cssSelector : obj.cssSelector;
        window.onPromptClose = options.onClose ? options.onClose : obj.onClose;

        obj.position = this.returnOptionsObject(UIPromptPositionObject);
        if (options.position) {
            obj.position.position = options.position.position ? options.position.position : obj.position.position;
            obj.position.top = options.position.top ? options.position.top : obj.position.top;
            obj.position.left = options.position.left ? options.position.left : obj.position.left;
        }

        this.currentObj = obj;

        if (obj.cssSelector !== '') this.promptBox.className = 'UIPromtBox ' + obj.cssSelector;
        else this.promptBox.className = 'UIPromtBox';

        this.promptBox.empty();
        this.promptBox.adopt(
        new Element('span', { 'html': obj.message, 'class': 'content align' + obj.messageAlign })
        );

        this.center();

        this.show();

        if (obj.timeout !== null) {
            this.hide.delay(obj.timeout, this);
        }

    },

    addLargeMessage: function (message) {
        var largeMessage = new Element('div', {
            'html': message,
            'styles': {
                'width': '100%',
                'max-height': 150,
                'overflow': 'auto',
                'text-align': 'left',
                'margin': '10px 0'
            }
        });
        if (this.promptBox.getElement('.promptButtons')) {
            largeMessage.inject(this.promptBox.getElement('.promptButtons'), 'before');
        }
        else {
            largeMessage.inject(this.promptBox);
        }
        this.center();
        largeMessage = null;
    },

    adopt: function () {
        var content = this.promptBox.getElement('.content');
        for (var i = 0; i < arguments.length; i++) {
            content.adopt(arguments[i]);
        }
        i = content = null;
        this.center();
    },

    alert: function (options) {

        this.currentType = options.type || '';

        var obj = this.returnOptionsObject(UIAlertObject);
        obj.message = options.message ? options.message : obj.message;
        obj.messageAlign = options.messageAlign ? options.messageAlign : obj.messageAlign;
        obj.okText = options.okText ? options.okText : obj.okText;
        obj.okIcon = options.okIcon ? options.okIcon : Affinity.icons.Tick;
        obj.okColor = options.okColor ? options.okColor : obj.okColor;
        obj.cancelText = options.cancelText ? options.cancelText : obj.cancelText;
        obj.cancelIcon = options.cancelIcon ? options.cancelIcon : Affinity.icons.Cancel;
        obj.cancelColor = options.cancelColor ? options.cancelColor : obj.cancelColor;
        obj.onOk = options.onOk ? options.onOk : obj.onOk;
        obj.onCancel = options.onCancel ? options.onCancel : obj.onCancel;
        obj.showButtons = typeOf(options.showButtons) === 'boolean' ? options.showButtons : obj.showButtons;
        obj.showCancel = typeOf(options.showCancel) === 'boolean' ? options.showCancel : obj.showCancel;
        obj.noClose = typeOf(options.noClose) === 'boolean' ? options.noClose : obj.noClose;
        obj.showLoader = typeOf(options.showLoader) === 'boolean' ? options.showLoader : obj.showLoader;
        obj.append = options.append ? options.append : obj.append;
        obj.cssSelector = options.cssSelector ? options.cssSelector : obj.cssSelector;
        window.onPromptClose = options.onClose ? options.onClose : obj.onClose;
        obj.showHiddenInfo = typeOf(options.showHiddenInfo) === 'boolean' ? options.showHiddenInfo : obj.showHiddenInfo;
        obj.hiddenInfoMessage = options.hiddenInfoMessage ? options.hiddenInfoMessage : obj.hiddenInfoMessage;
        obj.hiddenInfoButtonText = options.hiddenInfoButtonText ? options.hiddenInfoButtonText : obj.hiddenInfoButtonText;

        if (options.isCloseOnClick !== undefined) {
            obj.isCloseOnClick = options.isCloseOnClick;
        }

        obj.position = this.returnOptionsObject(UIPromptPositionObject);
        if (options.position) {
            obj.position.position = options.position.position ? options.position.position : obj.position.position;
            obj.position.top = options.position.top ? options.position.top : obj.position.top;
            obj.position.left = options.position.left ? options.position.left : obj.position.left;
        }

        this.currentObj = obj;

        if (obj.cssSelector !== '') this.promptBox.className = 'UIPromtBox ' + obj.cssSelector;
        else this.promptBox.className = 'UIPromtBox';

        this.onEnterMethod = function () {
            obj.onOk();
            this.hide();
        }.bind(this);

        this.onCancelMethod = function () {
            obj.onCancel();
            this.hide();
        }.bind(this);

        

        var cancelButton = this.falseButton.clone().removeEvents().addClass(obj.cancelColor).addClass('hidden').addEvent('click', this.onCancelMethod);
        cancelButton.getElement('span').set('html', obj.cancelIcon);
        cancelButton.getElement('.label').set('html', obj.cancelText);

        var spacer = new Element('span', { 'html': '&nbsp;', 'class': 'hidden' });

        this.message = obj.append ? this.message + (this.message !== '' ? '<br />' : '') + obj.message : obj.message;

        this.promptBox.empty();
        this.promptBox.adopt(
        new Element('span', { 'html': this.message, 'class': 'content align' + obj.messageAlign })
        );

        if (obj.showHiddenInfo) {
            
            var hiddenInfoContainer = new Element('div', { 'class': 'hiddenInfoContainer', 'style': 'display: none;', 'html': '<br />' + obj.hiddenInfoMessage }).inject(this.promptBox);


                var hiddenInfoButton = new Element('div', {
                    'class': 'tooltip-view ui-has-tooltip more-button tile-more-button', 'style': 'text-align: center;', 'html': '<br /><span class="button more w-icon more-info-button"><span class="icon-info"></span><span class="btn-tag tile-more">' + obj.hiddenInfoButtonText + '</span></span>'
                }).inject(this.promptBox);

            var closehiddenInfoButton = new Element('div', {
                    'style': 'text-align: center;',
                'class': 'tooltip-view ui-has-tooltip more-button tile-more-button',
                'html': '<span class="button more w-icon more-info-button"><span></span><span class="btn-tag tile-more">Hide</span></span>'
                }).inject(hiddenInfoContainer);

            hiddenInfoButton.addEvent(Affinity.events.click, function (e) {
                    hiddenInfoContainer.style.display = "block";
                hiddenInfoButton.style.display = "none";
                }.bind(this));

            closehiddenInfoButton.addEvent(Affinity.events.click, function (e) {
                    hiddenInfoContainer.style.display = "none";
                hiddenInfoButton.style.display = "block";
                }.bind(this));
        }

        if (obj.showLoader) {
            this.promptBox.adopt(
                new Element('img', { 'src': Affinity.loaders.blueico, class: 'blue-ico-loader' })
            );
            this.promptBox.addClass('loader');
        }
        else {
            this.promptBox.removeClass('loader');
        }
        if (obj.noClose) {
            if (this.promptBox.getElement('promptButtons')) {
                this.promptBox.getElement('promptButtons').destroy();
            }
        }
        else {
            if (obj.showButtons) {
                this.promptBox.adopt(
                new Element('div', { 'class': 'promptButtons' }).adopt(
                this.trueButton.clone().removeEvents().addClass(obj.okColor).addEvent('click', this.onEnterMethod),
                spacer,
                cancelButton
                )
                );
                this.promptBox.getElement('.true-button span').set('html', obj.okIcon);
                this.promptBox.getElement('.true-button .label').set('html', obj.okText);
            }
        }

        this.promptBoxBG.removeEvent(Affinity.events.click, this.hide);
        if (!obj.showButtons && !obj.noClose) {
            this.promptBoxBG.addEvent(Affinity.events.click, this.hide);
        }
        else {
            if (obj.showCancel) {
                spacer.removeClass('hidden');
                cancelButton.removeClass('hidden');
            }
        }

        window.removeEvent('keyup', this.okKeyUp);
        window.addEvent('keyup', this.okKeyUp);

        this.center();

        this.show();

        return this;

    },

    prompt: function (options) {

        this.currentType = options.type || '';

        var obj = this.returnOptionsObject(UIPromptObject);
        obj.message = options.message ? options.message : obj.message;
        obj.messageAlign = options.messageAlign ? options.messageAlign : obj.messageAlign;
        obj.value = options.value ? options.value : obj.value;
        obj.lines = options.lines ? options.lines : obj.lines;
        obj.okText = options.okText ? options.okText : obj.okText;
        obj.okIcon = options.okIcon ? options.okIcon : Affinity.icons.Tick;
        obj.okColor = options.okColor ? options.okColor : obj.okColor;
        obj.onOk = options.onOk ? options.onOk : obj.onOk;
        obj.cancelText = options.cancelText ? options.cancelText : obj.cancelText;
        obj.cancelIcon = options.cancelIcon ? options.cancelIcon : Affinity.icons.Cancel;
        obj.cancelColor = options.cancelColor ? options.cancelColor : obj.cancelColor;
        obj.onCancel = options.onCancel ? options.onCancel : obj.onCancel;
        obj.noClose = typeOf(options.noClose) === 'boolean' ? options.noClose : obj.noClose;
        obj.cssSelector = options.cssSelector ? options.cssSelector : obj.cssSelector;
        window.onPromptClose = options.onClose ? options.onClose : obj.onClose;

        obj.position = this.returnOptionsObject(UIPromptPositionObject);
        if (options.position) {
            obj.position.position = options.position.position ? options.position.position : obj.position.position;
            obj.position.top = options.position.top ? options.position.top : obj.position.top;
            obj.position.left = options.position.left ? options.position.left : obj.position.left;
        }

        this.currentObj = obj;

        if (obj.cssSelector !== '') this.promptBox.className = 'UIPromtBox ' + obj.cssSelector;
        else this.promptBox.className = 'UIPromtBox';

        this.onEnterMethod = function () {
            var value = document.id('UIPromtBox').getElement('.promptinput').value;
            this.hide();
            obj.onOk(value);
        }.bind(this);

        this.onCancelMethod = function () {
            var value = document.id('UIPromtBox').getElement('.promptinput').value;
            this.hide();
            obj.onCancel(value);
        }.bind(this);

        var input;
        if (obj.lines < 2) {
            input = new Element('input', { 'type': 'text', 'class': 'promptinput data-hj-whitelist', 'tabindex': 9999997 });
        } else {
            input = new Element('textarea', { 'rows': obj.lines, 'class': 'promptinput data-hj-whitelist', 'tabindex': 9999997 });
        }
        input.value = obj.value;

        this.promptBox.empty();
        this.promptBox.adopt(
        new Element('span', { 'html': obj.message, 'class': 'content align' + obj.messageAlign }),
        new Element('div', { 'class': 'promptButtons' }).adopt(
        input
        ),
        new Element('div', { 'class': 'promptButtons' }).adopt(
        this.trueButton.clone().removeEvents().addClass(obj.okColor).addEvent('click', this.onEnterMethod),
        new Element('span', { 'html': '&nbsp;' }),
        this.falseButton.clone().removeEvents().addClass(obj.cancelColor).addEvent('click', this.onCancelMethod)
        )
        );

        this.promptBoxBG.removeEvent(Affinity.events.click, this.hide);
        if (!obj.noClose) {
            this.promptBoxBG.addEvent(Affinity.events.click, this.hide);
        }

        window.removeEvent('keyup', this.okKeyUp);
        window.addEvent('keyup', this.okKeyUp);

        this.promptBox.getElement('.true-button span').set('html', obj.okIcon);
        this.promptBox.getElement('.true-button .label').set('html', obj.okText);
        this.promptBox.getElement('.false-button span').set('html', obj.cancelIcon);
        this.promptBox.getElement('.false-button .label').set('html', obj.cancelText);

        this.center();

        this.show();

        this.promptBox.getElement('.promptinput').focus();

        return this;

    },

    confirm: function (options) {

        this.currentType = options.type || '';

        var obj = this.returnOptionsObject(UIConfirmObject);
        obj.message = options.message ? options.message : obj.message;
        obj.messageAlign = options.messageAlign ? options.messageAlign : obj.messageAlign;
        obj.okText = options.okText ? options.okText : obj.okText;
        obj.okIcon = options.okIcon ? options.okIcon : Affinity.icons.Tick;
        obj.okColor = options.okColor ? options.okColor : obj.okColor;
        obj.onOk = options.onOk ? options.onOk : obj.onOk;
        obj.cancelText = options.cancelText ? options.cancelText : obj.cancelText;
        obj.cancelIcon = options.cancelIcon ? options.cancelIcon : Affinity.icons.Cancel;
        obj.cancelColor = options.cancelColor ? options.cancelColor : obj.cancelColor;
        obj.onCancel = options.onCancel ? options.onCancel : obj.onCancel;
        obj.noClose = typeOf(options.noClose) === 'boolean' ? options.noClose : obj.noClose;
        obj.cssSelector = options.cssSelector ? options.cssSelector : obj.cssSelector;
        window.onPromptClose = options.onClose ? options.onClose : obj.onClose;

        obj.position = this.returnOptionsObject(UIPromptPositionObject);
        if (options.position) {
            obj.position.position = options.position.position ? options.position.position : obj.position.position;
            obj.position.top = options.position.top ? options.position.top : obj.position.top;
            obj.position.left = options.position.left ? options.position.left : obj.position.left;
        }

        this.currentObj = obj;

        if (obj.cssSelector !== '') this.promptBox.className = 'UIPromtBox ' + obj.cssSelector;
        else this.promptBox.className = 'UIPromtBox';

        this.onEnterMethod = function () {
            this.hide();
            obj.onOk(true);
        }.bind(this);

        this.onCancelMethod = function () {
            this.hide();
            obj.onCancel(false);
        }.bind(this);

        this.promptBox.empty();
        this.promptBox.adopt(
        new Element('span', { 'html': obj.message, 'class': 'content align' + obj.messageAlign }),
        new Element('div', { 'class': 'promptButtons' }).adopt(
        this.trueButton.clone().removeEvents().addClass(obj.okColor).addEvent('click', this.onEnterMethod),
        new Element('span', { 'html': '&nbsp;' }),
        this.falseButton.clone().removeEvents().addClass(obj.cancelColor).addEvent('click', this.onCancelMethod)
        )
        );

        this.promptBoxBG.removeEvent(Affinity.events.click, this.hide);
        if (!obj.noClose) {
            this.promptBoxBG.addEvent(Affinity.events.click, this.hide);
        }

        this.currentObj = obj;

        window.removeEvent('keyup', this.okKeyUp);
        window.addEvent('keyup', this.okKeyUp);

        this.promptBox.getElement('.true-button span').set('html', obj.okIcon);
        this.promptBox.getElement('.true-button .label').set('html', obj.okText);
        this.promptBox.getElement('.false-button span').set('html', obj.cancelIcon);
        this.promptBox.getElement('.false-button .label').set('html', obj.cancelText);

        this.center();

        this.show();

        return this;

    },

    loader: function (options) {

        this.currentType = options.type || '';

        var obj = this.returnOptionsObject(UILoaderObject);
        obj.message = options.message ? options.message : obj.message;
        obj.messageAlign = options.messageAlign ? options.messageAlign : obj.messageAlign;
        obj.cssSelector = options.cssSelector ? options.cssSelector : obj.cssSelector;
        window.onPromptClose = options.onClose ? options.onClose : obj.onClose;

        obj.position = this.returnOptionsObject(UIPromptPositionObject);
        if (options.position) {
            obj.position.position = options.position.position ? options.position.position : obj.position.position;
            obj.position.top = options.position.top ? options.position.top : obj.position.top;
            obj.position.left = options.position.left ? options.position.left : obj.position.left;
        }

        this.currentObj = obj;

        if (obj.cssSelector !== '') this.promptBox.className = 'UIPromtBox ' + obj.cssSelector;
        else this.promptBox.className = 'UIPromtBox';

        this.message = obj.append ? this.message + (this.message !== '' ? '<br />' : '') + obj.message : obj.message;

        this.promptBox.empty();
        this.promptBox.adopt(
        new Element('span', { 'html': this.message, 'class': 'content align' + obj.messageAlign })
        );

        this.promptBox.adopt(
            new Element('img', { 'src': Affinity.loaders.blueico, class: 'blue-ico-loader' })
        );
        this.promptBox.addClass('loader');

        window.removeEvent('keyup', this.okKeyUp);
        this.promptBoxBG.removeEvent(Affinity.events.click, this.hide);

        this.center();

        this.show();

    },

    getCalculatedTop: function () {
        if (Affinity.oldess && Affinity.oldessFrame) {
            /* nested frames make life difficult */
            var size = this.promptBox.getSize();
            var boxMiddle = (size.y / 2);
            var win = window.parent.window;
            var doc = win.document.documentElement, body = win.document.body;
            var parentScroll = (doc && doc.scrollTop || body && body.scrollTop || 0);
            var parentHeight = win.innerHeight || win.document.documentElement.clientHeight;
            var framePosition = 0;
            var frame = window.parent.document.getElementById("ctl00_MainPanel");
            if (frame) {
                if (document.documentMode && document.documentMode < 9) {
                    framePosition = frame.querySelectorAll(".ContentBody")[0].offsetTop;
                } else {
                    framePosition = frame.getElementsByClassName("ContentBody")[0].offsetTop;
                }
            }
            if (this.promptBox.getStyle('position') === 'fixed') {
                return (parentHeight / 2) - framePosition;
            } else {
                var top = (parentScroll + (parentHeight / 2)) - framePosition;
                if (top < boxMiddle + 10) {
                    top = boxMiddle + 10;
                }
                return top + 10;
            }
        }
        var docsize = document.getSize();
        if (this.promptBox.getStyle('position') === 'fixed') {
            return (docsize.y / 2);
        } else {
            var scrollOffsets = document.getScroll();
            return (docsize.y / 2) + scrollOffsets.y;
        }
    },

    center: function () {
        if (Affinity.mobile) return;


        var size = this.promptBox.getSize();
        var top = this.getCalculatedTop();
        var left = '50%';
        var marginTop = (0 - (size.y / 2));
        var marginLeft = (0 - (size.x / 2));
        var cssposition = 'absolute';
        if (typeOf(this.currentObj) !== 'null' && typeOf(this.currentObj.position) !== 'null') {
            var position = this.currentObj.position;
            cssposition = position.position ? position.position : 'absolute';
            top = position.top ? position.top : top;
            left = position.left ? position.left : left;
            marginTop = position.top ? 0 : marginTop;
            marginLeft = position.left ? 0 : marginLeft;
        }
        this.promptBox.setStyles({
            'position': cssposition,
            'top': top,
            'left': left,
            'margin': marginTop + 'px 0 0 ' + marginLeft + 'px'
        });
    },

    okKeyUp: function (e) {
        if (e.key == 'enter' && this.status == 'open') {
            if (this.promptBox.getElement('.promptinput')) {
                if (this.promptBox.getElement('.promptinput') != document.activeElement) {
                    this.onEnterMethod();
                }
            } else {
                this.onEnterMethod();
            }
        }
    },

    showButtons: function () {
        if (this.promptBox.getElement('.promptButtons')) {
            this.promptBox.getElement('.promptButtons').removeClass('hidden');
            if (this.promptBoxBG) {
                this.promptBoxBG.removeEvent(Affinity.events.click, this.hide);
                this.promptBoxBG.addEvent(Affinity.events.click, this.hide);
            }
        }
    },

    hideButtons: function () {
        if (this.promptBox.getElement('.promptButtons')) {
            this.promptBox.getElement('.promptButtons').addClass('hidden');
            if (this.promptBoxBG) {
                this.promptBoxBG.removeEvent(Affinity.events.click, this.hide);
            }
        }
    },

    show: function () {
        document.body.addClass('uiprompt-open')
        this.promptBoxBG.fade('in');
        this.promptBox.fade('in');
        this.status = 'open';
    },

    escape: function () {
        if (this.currentOb && !this.currentOb.noClose) {
            this.hide();
        }
    },

    clearOnClose: function () {


        window.onPromptClose = function () { };
    },

    hide: function (type) {
        document.body.removeClass('uiprompt-open')
        if (typeof type === 'string' && type !== '' && type !== this.currentType) return;
        if ('onPromptClose' in window) window.onPromptClose();
        this.clearOnClose();
        this.promptBoxBG.fade('out');
        this.promptBox.fade('out');
        this.status = 'closed';
        this.message = '';
        window.removeEvent('keyup', this.okKeyUp);
        try {
            this.promptBoxBG.removeEvent(Affinity.events.click, this.hide);
        } catch (e) { }
        this.currentObj = false;
        this.currentType = '';
    },

    hideDelayTimer: false,

    hideDelay: function (delay) {
        this.clearHideDelay();
        this.hideDelayTimer = this.hide.delay(delay);
    },

    clearHideDelay: function () {
        clearTimeout(this.hideDelayTimer);
    }

});
var UITooltips = new Class({

    Version: '1.0.2.0',
    File: 'ui.tooltip.js',

    Implements: [Options],

    Binds: [
        'processNew',
        'init',
        'processTooltip', 'removeTooltip',
        'itemOver', 'itemOut'
    ],

    options: {
    },

    initialize: function (options) {
        this.setOptions(options);
        Affinity.UI.Tooltips = {};
        Affinity.UI.Tooltips.Process = this.processNew;
        Affinity.UI.Tooltips.Remove = this.removeTooltip;
        Affinity.UI.Tooltips.Hide = this.hideAll;
        this.init();
    },

    processNew: function () {
        this.init();
    },

    init: function () {
        if (Affinity.helpbubble) {
            Array.each(document.getElements('.ui-has-tooltip'), this.processTooltip.bind(this));
        } else {
            throw "UI Tooltips requires UI Help Bubble";
        }
    },

    processTooltip: function (el, show, addclose) {
        if (el.get('data-tooltip')) {
            if (!el.hasEvent(Affinity.events.overAll, this.itemOver)) {
                el.addEvent(Affinity.events.overAll, this.itemOver);
                el.addEvent(Affinity.events.outAll, this.itemOut);
                if(el.get('tag')==='input'){
                    el.addEvent('blur', this.itemOut);
                }
            }
            if(typeOf(show)==='boolean' && show){
                this.itemOver({ target: el });
            }
            /*
            if (typeOf(addclose) === 'boolean' && addclose) {
                Affinity.helpbubble.addClass('showclose');
            }
            */
        }
    },

    removeTooltip: function(element){
        element.removeClass('ui-has-tooltip');
        element.erase('data-tooltip');
        element.erase('data-tooltip-dir');
        element.removeEvent(Affinity.events.overAll, this.itemOver);
        element.removeEvent(Affinity.events.outAll, this.itemOut);
        if (element.get('tag') === 'input') {
            element.removeEvent('blur', this.itemOut);
        }
    },

    itemOver: function (e) {
        var button = e.target.hasClass('ui-has-tooltip') ? e.target : e.target.getParent('ui-has-tooltip');
        if (button){
            Affinity.helpbubble.populate(button.get('data-tooltip'));
            var tipsize = Affinity.helpbubble.getSize();
            if (typeOf(tipsize) === 'object' && 'y' in tipsize) {

                var direction = button.get('data-tooltip-dir') ? button.get('data-tooltip-dir').toLowerCase().trim() : 'right';

                var docsize = document.getScrollSize();
                var buttonpos = button.getPosition();
                var buttonsize = button.getSize();
                var scrollOffsets = document.getScroll();

                var arrowDirection;
                var position = { x: 0, y: 0 };

                switch (direction) {

                    case 'top':
                        arrowDirection = 'bottom';
                        position.x = buttonpos.x;
                        position.y = buttonpos.y - tipsize.y - 10;
                        break;

                    case 'bottom':
                        arrowDirection = 'top';
                        position.x = buttonpos.x;
                        position.y = buttonpos.y + tipsize.y - 5;
                        break;

                    case 'right':
                        arrowDirection = 'left';
                        position.x = buttonpos.x + buttonsize.x + 5;
                        position.y = buttonpos.y + (buttonsize.y / 2) - 20;
                        break;

                    case 'left':
                        arrowDirection = 'right';
                        position.x = buttonpos.x - tipsize.x - 5;
                        position.y = buttonpos.y + (buttonsize.y / 2) - 20;
                        break;

                    case 'top,left':
                        arrowDirection = 'bottom-right';
                        position.x = (buttonpos.x + buttonsize.x) - tipsize.x;
                        position.y = buttonpos.y - tipsize.y - 10;
                        break;

                    case 'top,right':
                        arrowDirection = 'bottom';
                        position.x = buttonpos.x;
                        position.y = buttonpos.y - tipsize.y - 10;
                        break;

                    case 'bottom,left':
                        arrowDirection = 'top-right';
                        position.x = (buttonpos.x + buttonsize.x) - tipsize.x;
                        position.y = buttonpos.y + tipsize.y;
                        break;

                    case 'bottom,right':
                        arrowDirection = 'top';
                        position.x = buttonpos.x;
                        position.y = buttonpos.y + tipsize.y;
                        break;

                    case 'top,center':
                        arrowDirection = 'bottom';
                        position.x = buttonpos.x;
                        position.y = buttonpos.y - tipsize.y - 10;
                        break;

                    case 'bottom,center':
                        arrowDirection = 'top';
                        position.x = buttonpos.x;
                        position.y = buttonpos.y + tipsize.y - 5;
                        break;

                }

                Affinity.helpbubble.setDirection(arrowDirection);

                if (position.x + tipsize.x > docsize.x) {
                    position.x = (docsize.x - tipsize.x) - 5;
                }

                if (position.y + tipsize.y > docsize.y) {
                    position.y = (docsize.y - tipsize.y) - 5;
                }

                Affinity.helpbubble.position(position);

                Affinity.helpbubble.show(button.hasClass('ui-tooltip-selectable') ? true : false);

            }

        }
        
    },

    itemOut: function () {
        Affinity.helpbubble.hide();
    },

    hideAll: function () {
        Affinity.helpbubble.hide();
    }

});

var UIUplaodersMulti = new Class({

    Version: '1.0.0.0',
    File: 'ui.upload.multi.js',

    Implements: [Options, Events],

    Binds: [
        'processNew',
		'processUploader',
        'addFile', 'addFileCont', 'addFileRow', 'deleteFile'
    ],

    options: {
        auto: true,
        maxsize: 20971520,
        samenames: true
    },

    uploaders: {

    },

    initialize: function (options) {

        this.setOptions(options);

        this.icons = {};
        this.icons.del = Affinity.icons.CrossRound || '&#xe06d;';

        if (!Affinity.prettyuploads) { return; }

        if(this.options.auto){
            Array.each(document.getElements('.uploadmulti'), this.processUploader);
        }

    },

    processNew: function () {
        Array.each(document.getElements('.uploadmulti'), this.processUploader);
    },

    processUploader: function (uploader) {

        if (!Affinity.prettyuploads) { return; }

        if (!uploader.hasClass('uidone')) {

            uploader.store('count', 1);

            /**/

            var table = new HtmlTable({
                properties: {
                    'class': 'ui-grid'
                },
                headers: ['File', ''],
                rows: []
            });

            new Element('div', { 'class': 'upload-table hidden' }).adopt(table.element).inject(uploader);

            uploader.addClass('uidone');

            /**/

            var isrequired = uploader.hasClass('isrequired') ? true : false;

            var lebel = new Element('label').inject(uploader);

            var inputId = uploader.get('data-question-name') + '_file0';

            uploader.getElement('input').set('name', inputId).set('id', inputId).addEvent('change', this.addFile).inject(lebel).fade('hide');

            //var button = new Element('span', {
            //    'class': 'button green',
            //    'html': 'Add File'
            //}).inject(lebel);

            var button = new Element('span', {
                'class': 'button blue',
            }).adopt(
                new Element('span', {
                    'class': 'icon-add-to-list',
                }),
                new Element('span', {
                    'html': 'Add&nbsp;File'
                })
            ).inject(lebel);

            new Element('span', {
                'html': '',
                'class': 'uploadlabel'
            }).inject(lebel);

            /**/

            var initialValuesObj = uploader.getElement('.initialValues');

            if (initialValuesObj) {

                var initialValues = initialValuesObj.value.trim();

                if (initialValues !== '') {

                    var fileIds = initialValues.split(',');

                    Array.each(fileIds, function (fileId) {
                        this.addFileRow(table.element, fileId, fileId);
                    }.bind(this));

                    window.fireEvent('multiFileDefaults', { initialValues: initialValues, table: table.element });

                }
            }

            delete table;
            delete lebel;
            delete inputId;
            delete button;
            delete initialValues;

            Affinity.uiGrid.processTables(table.element);
            //Affinity.uiUplaodersMulti.processNew();

            /**/

        }

    },

    addFile: function (e) {

        e.stop();

        var data = {};

        data.uploadInput = e.target;
        data.uploader = data.uploadInput.getParent('.uploadmulti');
        data.table = data.uploader.getElement('table');
        data.questionName = data.uploader.get('data-question-name');
        data.filePath = data.uploadInput.value;
        data.fileName = data.filePath;
        data.count = data.uploader.retrieve('count') + 1;
        data.inputId = data.questionName + '_file' + data.count;
        data.fileEventData = {
            fileElement: data.uploadInput,
            questionName: data.questionName,
            table: data.table
        };

        if (data.filePath === '' || typeOf(data.filePath) == 'null') { delete data; return; }

        if (data.uploadInput.files) {
            if (data.uploadInput.files[0].size > this.options.maxsize) {
                window.fireEvent('multiFileTooLarge', { fileElement: data.uploadInput, maxsize: this.options.maxsize, size: data.uploadInput.files[0].size, table: data.table });
                data.uploadInput.value = "";
                try { delete data.uploadInput.files; } catch (e) { }
                delete data;
                return;
            }
        }

        /* clean file name */

        if (data.fileName.contains('fakepath')) { data.fileName = data.fileName.substring(data.uploadInput.value.indexOf('fakepath') + 9); }
        if (data.fileName.contains('/')) { data.fileName = data.fileName.substring(data.uploadInput.value.lastIndexOf('/') + 1); }
        if (data.fileName.contains('\\')) { data.fileName = data.fileName.substring(data.uploadInput.value.lastIndexOf('\\') + 1); }

        /**/

        var hasname = false;
        Array.each(data.table.getElements('tr'), function (row) {
            if (row.retrieve('fileName') && row.retrieve('fileName').trim() === data.fileName.trim()) {
                hasname = true;
            }
        });

        if (hasname) {
            if (!this.options.samenames) {
                uialert({
                    message: 'Filenames must be different.<br />You already have a file with name \'' + data.fileName + '\'.'
                });
                data.uploadInput.value = "";
                try { delete data.uploadInput.files; } catch (e) { }
                delete data;
                return;
            } else {
                uiconfirm({
                    message: 'You already have a file named \'' + data.fileName + '\'.<br />Would you like to continue anyway?',
                    onOk: function () {
                        this.addFileCont(e, data);
                    }.bind(this),
                    onCancel: function () {
                        data.uploadInput.value = "";
                        try { delete data.uploadInput.files; } catch (e) { }
                        delete data;
                    }.bind(this)
                });
            }
        } else {
            this.addFileCont(e, data);
        }

    },

    addFileCont: function (e, data) {

        e.stop();

        this.addFileRow(data.table, data.fileName, null, data.inputId);

        var upload = data.table.getParent('.uploadmulti');

        /**/

        //data.uploadInput.set('class', '').addClass('subhidden').addClass('should-have-file-' + data.file).set('name', data.inputId).set('id', data.inputId);
        data.uploadInput.set('class', '').addClass('subhidden').set('name', data.inputId).set('id', data.inputId).removeEvents();
        (function () {
            data.uploadInput = data.uploadInput.clone().set('name', data.questionName + '_file0').set('id', data.questionName + '_file0').set('class', '').addClass('new-master').inject(data.uploadInput, 'before').fade('hide');
            data.uploadInput.removeEvents();
            data.uploadInput.addEvent('change', this.addFile);
            data.uploadInput.value = "";
            data.uploader.store('count', data.count);

            window.fireEvent('multiFileAdded', data.fileEventData);
            upload.fireEvent('multiFileAdded', data.fileEventData);

        }).delay(50, this);

        //

        delete data;

    },

    addFileRow: function (table, fileName, fileId, inputId, fileLink) {

        var button, row;

        if (fileId !== null) {
            button = '<span class="button orange delete w-icon-only"><span>' + this.icons.del + '</span></span>';
        } else {
            button = '<span class="button orange delete new w-icon-only"><span>' + this.icons.del + '</span></span>';
        }

        table.retrieve('HtmlTable').push([fileName, button]);

        row = table.getElements('tbody tr').getLast();

        row.store('fileName', fileName);

        if (fileId !== null) {
            row.store('fileId', fileId);
            row.addEvent('click', this.downloadFile.bind(this));
            row.addClass('saved');
        }

        if (fileLink) {
            row.removeEvents();
            row.getElement('td').empty();
            new Element('a', { 'href': fileLink, 'target': '_blank', 'html': fileName }).inject(row.getElement('td'));
        }

        if (inputId !== null) {
            row.store('inputId', inputId);
        }

        row.getElements('.delete').addEvent('click', this.deleteFile);

        Affinity.uiGrid.zebra(table);

        table.getParent().removeClass('hidden');

        delete button;
        delete row;

    },

    deleteFile: function (e) {

        e.stop();

        
        var preventDeletion = false;
        var button = e.target.hasClass('button') ? e.target : e.target.getParent('.button');
        var upload = e.target.getParent('.uploadmulti');
        var row = e.target.getParent('tr');
        var table = row.getParent('table');
        var questionName = upload.get('data-question-name');
        var deletedId = false;
        if (row.retrieve('fileId')) {
            deletedId = row.retrieve('fileId');
        }

       

        if (button.hasClass('new')) {

            var inputId = row.retrieve('inputId');
            if (upload.getElement('#' + inputId)) {
                upload.getElement('#' + inputId).destroy();
            }

        } else {

            window.fireEvent('validateMultiFileDelete', { row: row, table: table, deletionTarget: { deleteName: deleteName, deletedId: deletedId, questionName: questionName, table: table } });
            upload.fireEvent('validateMultiFileDelete', { row: row, table: table, deletionTarget: { deleteName: deleteName, deletedId: deletedId, questionName: questionName, table: table } });

            preventDeletion = row.hasClass("preventDeletion");
           
            /*
            var input = table.getParent('.uploadmulti').getElement('input[type=file]');
            var inputid = input.get('id');
            var newInput = input.clone().set('id', inputid).inject(input, 'after');
            newInput.addEvent('change', this.addFile);
            input.destroy();
            */
            if (!preventDeletion) {
                
                if (row.retrieve('fileId')) {
                    deletedId = row.retrieve('fileId');
                }
                var deleteName = row.getElement('td').get('html');

                window.fireEvent('multiFileDeleted', { deleteName: deleteName, deletedId: deletedId, questionName: questionName, table: table });
                upload.fireEvent('multiFileDeleted', { deleteName: deleteName, deletedId: deletedId, questionName: questionName, table: table });

                delete deletedId;
                delete deleteName;
            }
            

        }

        if (!preventDeletion) {
            row.destroy();
            Affinity.uiGrid.zebra(table);

            if (table.getElements('tbody tr').length == 0) {
                table.getParent().addClass('hidden');
            }

            delete button;
            delete upload;
            delete row;
            delete table;
            delete questionName;
        } else {
            row.removeClass("preventDeletion");
        }
        

    },

    downloadFile: function (e) {

        e.stop();

        var target = e.target.get('tag') == 'td' ? e.target : e.target.getParent('td');

        var documentId = target.getParent('tr').retrieve('fileId');
        var downloadUrl = target.getParent('tr').retrieve('dowloadUrl');

        if (documentId && downloadUrl) {
            window.open(downloadUrl + '?documentId=' + documentId, '_blank');
        }
    },
    setMaxSize: function (maxSize) {
        this.options.maxsize = maxSize;
    },
    reset: function (mixed) {

        var uploadBox = false;
        var uploadInput = false;

        /*
        if (typeOf(uploader) === 'element' && uploader.get('type') && (uploader.get('type') === 'input' || uploader.get('type') === 'file')) {
            uploadInput = uploader;
            uploader = uploadInput.getParent('.uploadmulti');
        }

        if (uploader.hasClass('uploadmulti')) {
            uploadInput = uploader.getElement('label input');
        }
        */

        if (typeOf(mixed) === 'element') {
            if (mixed.hasClass('uploadmulti')) {
                uploadBox = mixed;
            }
            if (typeOf(mixed) === 'element' && mixed.get('type') && (mixed.get('type') === 'input' || mixed.get('type') === 'file')) {
                uploadBox = mixed.getParent('.uploadmulti');
            }
        }

        if (uploadBox && uploadBox.getElement('label input')) {
            uploadInput = uploadBox.getElement('label input');
        }

        if (uploadBox) {
            var table = uploadBox.getElement('table');
            var questionName = uploadBox.get('data-question-name');
            Array.each(uploadBox.getElements('label input'), function (input) {
                if (input !== uploadInput) {
                    input.destroy();
                }
            });
            uploadBox.store('count', 1);
            if (uploadInput) {
                uploadInput.set('name', questionName + '_file0').set('id', questionName + '_file0').set('class', null).set('type', 'file').removeEvents().addEvent('change', this.addFile.bind(this)).fade('hide');
                uploadInput.value = '';
                if ('files' in uploadInput) {
                    try{
                        uploadInput.files = [];
                    }catch(e){}
                }
            }
            table.getElement('tbody').empty();
            table.getParent().addClass('hidden');
        }

    }

});

/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 2.2.2
 *
 * Copyright 2016 Nick Downie
 * Released under the MIT license
 * https://github.com/chartjs/Chart.js/blob/master/LICENSE.md
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Chart = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
/* MIT license */
var colorNames = require(6);

module.exports = {
   getRgba: getRgba,
   getHsla: getHsla,
   getRgb: getRgb,
   getHsl: getHsl,
   getHwb: getHwb,
   getAlpha: getAlpha,

   hexString: hexString,
   rgbString: rgbString,
   rgbaString: rgbaString,
   percentString: percentString,
   percentaString: percentaString,
   hslString: hslString,
   hslaString: hslaString,
   hwbString: hwbString,
   keyword: keyword
}

function getRgba(string) {
   if (!string) {
      return;
   }
   var abbr =  /^#([a-fA-F0-9]{3})$/,
       hex =  /^#([a-fA-F0-9]{6})$/,
       rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
       per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
       keyword = /(\w+)/;

   var rgb = [0, 0, 0],
       a = 1,
       match = string.match(abbr);
   if (match) {
      match = match[1];
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match[i] + match[i], 16);
      }
   }
   else if (match = string.match(hex)) {
      match = match[1];
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match.slice(i * 2, i * 2 + 2), 16);
      }
   }
   else if (match = string.match(rgba)) {
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match[i + 1]);
      }
      a = parseFloat(match[4]);
   }
   else if (match = string.match(per)) {
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
      }
      a = parseFloat(match[4]);
   }
   else if (match = string.match(keyword)) {
      if (match[1] == "transparent") {
         return [0, 0, 0, 0];
      }
      rgb = colorNames[match[1]];
      if (!rgb) {
         return;
      }
   }

   for (var i = 0; i < rgb.length; i++) {
      rgb[i] = scale(rgb[i], 0, 255);
   }
   if (!a && a != 0) {
      a = 1;
   }
   else {
      a = scale(a, 0, 1);
   }
   rgb[3] = a;
   return rgb;
}

function getHsla(string) {
   if (!string) {
      return;
   }
   var hsl = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
   var match = string.match(hsl);
   if (match) {
      var alpha = parseFloat(match[4]);
      var h = scale(parseInt(match[1]), 0, 360),
          s = scale(parseFloat(match[2]), 0, 100),
          l = scale(parseFloat(match[3]), 0, 100),
          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, s, l, a];
   }
}

function getHwb(string) {
   if (!string) {
      return;
   }
   var hwb = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
   var match = string.match(hwb);
   if (match) {
    var alpha = parseFloat(match[4]);
      var h = scale(parseInt(match[1]), 0, 360),
          w = scale(parseFloat(match[2]), 0, 100),
          b = scale(parseFloat(match[3]), 0, 100),
          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, w, b, a];
   }
}

function getRgb(string) {
   var rgba = getRgba(string);
   return rgba && rgba.slice(0, 3);
}

function getHsl(string) {
  var hsla = getHsla(string);
  return hsla && hsla.slice(0, 3);
}

function getAlpha(string) {
   var vals = getRgba(string);
   if (vals) {
      return vals[3];
   }
   else if (vals = getHsla(string)) {
      return vals[3];
   }
   else if (vals = getHwb(string)) {
      return vals[3];
   }
}

// generators
function hexString(rgb) {
   return "#" + hexDouble(rgb[0]) + hexDouble(rgb[1])
              + hexDouble(rgb[2]);
}

function rgbString(rgba, alpha) {
   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
      return rgbaString(rgba, alpha);
   }
   return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
}

function rgbaString(rgba, alpha) {
   if (alpha === undefined) {
      alpha = (rgba[3] !== undefined ? rgba[3] : 1);
   }
   return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2]
           + ", " + alpha + ")";
}

function percentString(rgba, alpha) {
   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
      return percentaString(rgba, alpha);
   }
   var r = Math.round(rgba[0]/255 * 100),
       g = Math.round(rgba[1]/255 * 100),
       b = Math.round(rgba[2]/255 * 100);

   return "rgb(" + r + "%, " + g + "%, " + b + "%)";
}

function percentaString(rgba, alpha) {
   var r = Math.round(rgba[0]/255 * 100),
       g = Math.round(rgba[1]/255 * 100),
       b = Math.round(rgba[2]/255 * 100);
   return "rgba(" + r + "%, " + g + "%, " + b + "%, " + (alpha || rgba[3] || 1) + ")";
}

function hslString(hsla, alpha) {
   if (alpha < 1 || (hsla[3] && hsla[3] < 1)) {
      return hslaString(hsla, alpha);
   }
   return "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)";
}

function hslaString(hsla, alpha) {
   if (alpha === undefined) {
      alpha = (hsla[3] !== undefined ? hsla[3] : 1);
   }
   return "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, "
           + alpha + ")";
}

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
function hwbString(hwb, alpha) {
   if (alpha === undefined) {
      alpha = (hwb[3] !== undefined ? hwb[3] : 1);
   }
   return "hwb(" + hwb[0] + ", " + hwb[1] + "%, " + hwb[2] + "%"
           + (alpha !== undefined && alpha !== 1 ? ", " + alpha : "") + ")";
}

function keyword(rgb) {
  return reverseNames[rgb.slice(0, 3)];
}

// helpers
function scale(num, min, max) {
   return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
  var str = num.toString(16).toUpperCase();
  return (str.length < 2) ? "0" + str : str;
}


//create a list of reverse color names
var reverseNames = {};
for (var name in colorNames) {
   reverseNames[colorNames[name]] = name;
}

},{"6":6}],3:[function(require,module,exports){
/* MIT license */
var convert = require(5);
var string = require(2);

var Color = function (obj) {
	if (obj instanceof Color) {
		return obj;
	}
	if (!(this instanceof Color)) {
		return new Color(obj);
	}

	this.values = {
		rgb: [0, 0, 0],
		hsl: [0, 0, 0],
		hsv: [0, 0, 0],
		hwb: [0, 0, 0],
		cmyk: [0, 0, 0, 0],
		alpha: 1
	};

	// parse Color() argument
	var vals;
	if (typeof obj === 'string') {
		vals = string.getRgba(obj);
		if (vals) {
			this.setValues('rgb', vals);
		} else if (vals = string.getHsla(obj)) {
			this.setValues('hsl', vals);
		} else if (vals = string.getHwb(obj)) {
			this.setValues('hwb', vals);
		} else {
			throw new Error('Unable to parse color from string "' + obj + '"');
		}
	} else if (typeof obj === 'object') {
		vals = obj;
		if (vals.r !== undefined || vals.red !== undefined) {
			this.setValues('rgb', vals);
		} else if (vals.l !== undefined || vals.lightness !== undefined) {
			this.setValues('hsl', vals);
		} else if (vals.v !== undefined || vals.value !== undefined) {
			this.setValues('hsv', vals);
		} else if (vals.w !== undefined || vals.whiteness !== undefined) {
			this.setValues('hwb', vals);
		} else if (vals.c !== undefined || vals.cyan !== undefined) {
			this.setValues('cmyk', vals);
		} else {
			throw new Error('Unable to parse color from object ' + JSON.stringify(obj));
		}
	}
};

Color.prototype = {
	rgb: function () {
		return this.setSpace('rgb', arguments);
	},
	hsl: function () {
		return this.setSpace('hsl', arguments);
	},
	hsv: function () {
		return this.setSpace('hsv', arguments);
	},
	hwb: function () {
		return this.setSpace('hwb', arguments);
	},
	cmyk: function () {
		return this.setSpace('cmyk', arguments);
	},

	rgbArray: function () {
		return this.values.rgb;
	},
	hslArray: function () {
		return this.values.hsl;
	},
	hsvArray: function () {
		return this.values.hsv;
	},
	hwbArray: function () {
		var values = this.values;
		if (values.alpha !== 1) {
			return values.hwb.concat([values.alpha]);
		}
		return values.hwb;
	},
	cmykArray: function () {
		return this.values.cmyk;
	},
	rgbaArray: function () {
		var values = this.values;
		return values.rgb.concat([values.alpha]);
	},
	hslaArray: function () {
		var values = this.values;
		return values.hsl.concat([values.alpha]);
	},
	alpha: function (val) {
		if (val === undefined) {
			return this.values.alpha;
		}
		this.setValues('alpha', val);
		return this;
	},

	red: function (val) {
		return this.setChannel('rgb', 0, val);
	},
	green: function (val) {
		return this.setChannel('rgb', 1, val);
	},
	blue: function (val) {
		return this.setChannel('rgb', 2, val);
	},
	hue: function (val) {
		if (val) {
			val %= 360;
			val = val < 0 ? 360 + val : val;
		}
		return this.setChannel('hsl', 0, val);
	},
	saturation: function (val) {
		return this.setChannel('hsl', 1, val);
	},
	lightness: function (val) {
		return this.setChannel('hsl', 2, val);
	},
	saturationv: function (val) {
		return this.setChannel('hsv', 1, val);
	},
	whiteness: function (val) {
		return this.setChannel('hwb', 1, val);
	},
	blackness: function (val) {
		return this.setChannel('hwb', 2, val);
	},
	value: function (val) {
		return this.setChannel('hsv', 2, val);
	},
	cyan: function (val) {
		return this.setChannel('cmyk', 0, val);
	},
	magenta: function (val) {
		return this.setChannel('cmyk', 1, val);
	},
	yellow: function (val) {
		return this.setChannel('cmyk', 2, val);
	},
	black: function (val) {
		return this.setChannel('cmyk', 3, val);
	},

	hexString: function () {
		return string.hexString(this.values.rgb);
	},
	rgbString: function () {
		return string.rgbString(this.values.rgb, this.values.alpha);
	},
	rgbaString: function () {
		return string.rgbaString(this.values.rgb, this.values.alpha);
	},
	percentString: function () {
		return string.percentString(this.values.rgb, this.values.alpha);
	},
	hslString: function () {
		return string.hslString(this.values.hsl, this.values.alpha);
	},
	hslaString: function () {
		return string.hslaString(this.values.hsl, this.values.alpha);
	},
	hwbString: function () {
		return string.hwbString(this.values.hwb, this.values.alpha);
	},
	keyword: function () {
		return string.keyword(this.values.rgb, this.values.alpha);
	},

	rgbNumber: function () {
		var rgb = this.values.rgb;
		return (rgb[0] << 16) | (rgb[1] << 8) | rgb[2];
	},

	luminosity: function () {
		// http://www.w3.org/TR/WCAG20/#relativeluminancedef
		var rgb = this.values.rgb;
		var lum = [];
		for (var i = 0; i < rgb.length; i++) {
			var chan = rgb[i] / 255;
			lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
		}
		return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
	},

	contrast: function (color2) {
		// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
		var lum1 = this.luminosity();
		var lum2 = color2.luminosity();
		if (lum1 > lum2) {
			return (lum1 + 0.05) / (lum2 + 0.05);
		}
		return (lum2 + 0.05) / (lum1 + 0.05);
	},

	level: function (color2) {
		var contrastRatio = this.contrast(color2);
		if (contrastRatio >= 7.1) {
			return 'AAA';
		}

		return (contrastRatio >= 4.5) ? 'AA' : '';
	},

	dark: function () {
		// YIQ equation from http://24ways.org/2010/calculating-color-contrast
		var rgb = this.values.rgb;
		var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
		return yiq < 128;
	},

	light: function () {
		return !this.dark();
	},

	negate: function () {
		var rgb = [];
		for (var i = 0; i < 3; i++) {
			rgb[i] = 255 - this.values.rgb[i];
		}
		this.setValues('rgb', rgb);
		return this;
	},

	lighten: function (ratio) {
		var hsl = this.values.hsl;
		hsl[2] += hsl[2] * ratio;
		this.setValues('hsl', hsl);
		return this;
	},

	darken: function (ratio) {
		var hsl = this.values.hsl;
		hsl[2] -= hsl[2] * ratio;
		this.setValues('hsl', hsl);
		return this;
	},

	saturate: function (ratio) {
		var hsl = this.values.hsl;
		hsl[1] += hsl[1] * ratio;
		this.setValues('hsl', hsl);
		return this;
	},

	desaturate: function (ratio) {
		var hsl = this.values.hsl;
		hsl[1] -= hsl[1] * ratio;
		this.setValues('hsl', hsl);
		return this;
	},

	whiten: function (ratio) {
		var hwb = this.values.hwb;
		hwb[1] += hwb[1] * ratio;
		this.setValues('hwb', hwb);
		return this;
	},

	blacken: function (ratio) {
		var hwb = this.values.hwb;
		hwb[2] += hwb[2] * ratio;
		this.setValues('hwb', hwb);
		return this;
	},

	greyscale: function () {
		var rgb = this.values.rgb;
		// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
		var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
		this.setValues('rgb', [val, val, val]);
		return this;
	},

	clearer: function (ratio) {
		var alpha = this.values.alpha;
		this.setValues('alpha', alpha - (alpha * ratio));
		return this;
	},

	opaquer: function (ratio) {
		var alpha = this.values.alpha;
		this.setValues('alpha', alpha + (alpha * ratio));
		return this;
	},

	rotate: function (degrees) {
		var hsl = this.values.hsl;
		var hue = (hsl[0] + degrees) % 360;
		hsl[0] = hue < 0 ? 360 + hue : hue;
		this.setValues('hsl', hsl);
		return this;
	},

	/**
	 * Ported from sass implementation in C
	 * https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
	 */
	mix: function (mixinColor, weight) {
		var color1 = this;
		var color2 = mixinColor;
		var p = weight === undefined ? 0.5 : weight;

		var w = 2 * p - 1;
		var a = color1.alpha() - color2.alpha();

		var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
		var w2 = 1 - w1;

		return this
			.rgb(
				w1 * color1.red() + w2 * color2.red(),
				w1 * color1.green() + w2 * color2.green(),
				w1 * color1.blue() + w2 * color2.blue()
			)
			.alpha(color1.alpha() * p + color2.alpha() * (1 - p));
	},

	toJSON: function () {
		return this.rgb();
	},

	clone: function () {
		// NOTE(SB): using node-clone creates a dependency to Buffer when using browserify,
		// making the final build way to big to embed in Chart.js. So let's do it manually,
		// assuming that values to clone are 1 dimension arrays containing only numbers,
		// except 'alpha' which is a number.
		var result = new Color();
		var source = this.values;
		var target = result.values;
		var value, type;

		for (var prop in source) {
			if (source.hasOwnProperty(prop)) {
				value = source[prop];
				type = ({}).toString.call(value);
				if (type === '[object Array]') {
					target[prop] = value.slice(0);
				} else if (type === '[object Number]') {
					target[prop] = value;
				} else {
					console.error('unexpected color value:', value);
				}
			}
		}

		return result;
	}
};

Color.prototype.spaces = {
	rgb: ['red', 'green', 'blue'],
	hsl: ['hue', 'saturation', 'lightness'],
	hsv: ['hue', 'saturation', 'value'],
	hwb: ['hue', 'whiteness', 'blackness'],
	cmyk: ['cyan', 'magenta', 'yellow', 'black']
};

Color.prototype.maxes = {
	rgb: [255, 255, 255],
	hsl: [360, 100, 100],
	hsv: [360, 100, 100],
	hwb: [360, 100, 100],
	cmyk: [100, 100, 100, 100]
};

Color.prototype.getValues = function (space) {
	var values = this.values;
	var vals = {};

	for (var i = 0; i < space.length; i++) {
		vals[space.charAt(i)] = values[space][i];
	}

	if (values.alpha !== 1) {
		vals.a = values.alpha;
	}

	// {r: 255, g: 255, b: 255, a: 0.4}
	return vals;
};

Color.prototype.setValues = function (space, vals) {
	var values = this.values;
	var spaces = this.spaces;
	var maxes = this.maxes;
	var alpha = 1;
	var i;

	if (space === 'alpha') {
		alpha = vals;
	} else if (vals.length) {
		// [10, 10, 10]
		values[space] = vals.slice(0, space.length);
		alpha = vals[space.length];
	} else if (vals[space.charAt(0)] !== undefined) {
		// {r: 10, g: 10, b: 10}
		for (i = 0; i < space.length; i++) {
			values[space][i] = vals[space.charAt(i)];
		}

		alpha = vals.a;
	} else if (vals[spaces[space][0]] !== undefined) {
		// {red: 10, green: 10, blue: 10}
		var chans = spaces[space];

		for (i = 0; i < space.length; i++) {
			values[space][i] = vals[chans[i]];
		}

		alpha = vals.alpha;
	}

	values.alpha = Math.max(0, Math.min(1, (alpha === undefined ? values.alpha : alpha)));

	if (space === 'alpha') {
		return false;
	}

	var capped;

	// cap values of the space prior converting all values
	for (i = 0; i < space.length; i++) {
		capped = Math.max(0, Math.min(maxes[space][i], values[space][i]));
		values[space][i] = Math.round(capped);
	}

	// convert to all the other color spaces
	for (var sname in spaces) {
		if (sname !== space) {
			values[sname] = convert[space][sname](values[space]);
		}
	}

	return true;
};

Color.prototype.setSpace = function (space, args) {
	var vals = args[0];

	if (vals === undefined) {
		// color.rgb()
		return this.getValues(space);
	}

	// color.rgb(10, 10, 10)
	if (typeof vals === 'number') {
		vals = Array.prototype.slice.call(args);
	}

	this.setValues(space, vals);
	return this;
};

Color.prototype.setChannel = function (space, index, val) {
	var svalues = this.values[space];
	if (val === undefined) {
		// color.red()
		return svalues[index];
	} else if (val === svalues[index]) {
		// color.red(color.red())
		return this;
	}

	// color.red(100)
	svalues[index] = val;
	this.setValues(space, svalues);

	return this;
};

if (typeof window !== 'undefined') {
	window.Color = Color;
}

module.exports = Color;

},{"2":2,"5":5}],4:[function(require,module,exports){
/* MIT license */

module.exports = {
  rgb2hsl: rgb2hsl,
  rgb2hsv: rgb2hsv,
  rgb2hwb: rgb2hwb,
  rgb2cmyk: rgb2cmyk,
  rgb2keyword: rgb2keyword,
  rgb2xyz: rgb2xyz,
  rgb2lab: rgb2lab,
  rgb2lch: rgb2lch,

  hsl2rgb: hsl2rgb,
  hsl2hsv: hsl2hsv,
  hsl2hwb: hsl2hwb,
  hsl2cmyk: hsl2cmyk,
  hsl2keyword: hsl2keyword,

  hsv2rgb: hsv2rgb,
  hsv2hsl: hsv2hsl,
  hsv2hwb: hsv2hwb,
  hsv2cmyk: hsv2cmyk,
  hsv2keyword: hsv2keyword,

  hwb2rgb: hwb2rgb,
  hwb2hsl: hwb2hsl,
  hwb2hsv: hwb2hsv,
  hwb2cmyk: hwb2cmyk,
  hwb2keyword: hwb2keyword,

  cmyk2rgb: cmyk2rgb,
  cmyk2hsl: cmyk2hsl,
  cmyk2hsv: cmyk2hsv,
  cmyk2hwb: cmyk2hwb,
  cmyk2keyword: cmyk2keyword,

  keyword2rgb: keyword2rgb,
  keyword2hsl: keyword2hsl,
  keyword2hsv: keyword2hsv,
  keyword2hwb: keyword2hwb,
  keyword2cmyk: keyword2cmyk,
  keyword2lab: keyword2lab,
  keyword2xyz: keyword2xyz,

  xyz2rgb: xyz2rgb,
  xyz2lab: xyz2lab,
  xyz2lch: xyz2lch,

  lab2xyz: lab2xyz,
  lab2rgb: lab2rgb,
  lab2lch: lab2lch,

  lch2lab: lch2lab,
  lch2xyz: lch2xyz,
  lch2rgb: lch2rgb
}


function rgb2hsl(rgb) {
  var r = rgb[0]/255,
      g = rgb[1]/255,
      b = rgb[2]/255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, l;

  if (max == min)
    h = 0;
  else if (r == max)
    h = (g - b) / delta;
  else if (g == max)
    h = 2 + (b - r) / delta;
  else if (b == max)
    h = 4 + (r - g)/ delta;

  h = Math.min(h * 60, 360);

  if (h < 0)
    h += 360;

  l = (min + max) / 2;

  if (max == min)
    s = 0;
  else if (l <= 0.5)
    s = delta / (max + min);
  else
    s = delta / (2 - max - min);

  return [h, s * 100, l * 100];
}

function rgb2hsv(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, v;

  if (max == 0)
    s = 0;
  else
    s = (delta/max * 1000)/10;

  if (max == min)
    h = 0;
  else if (r == max)
    h = (g - b) / delta;
  else if (g == max)
    h = 2 + (b - r) / delta;
  else if (b == max)
    h = 4 + (r - g) / delta;

  h = Math.min(h * 60, 360);

  if (h < 0)
    h += 360;

  v = ((max / 255) * 1000) / 10;

  return [h, s, v];
}

function rgb2hwb(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      h = rgb2hsl(rgb)[0],
      w = 1/255 * Math.min(r, Math.min(g, b)),
      b = 1 - 1/255 * Math.max(r, Math.max(g, b));

  return [h, w * 100, b * 100];
}

function rgb2cmyk(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      c, m, y, k;

  k = Math.min(1 - r, 1 - g, 1 - b);
  c = (1 - r - k) / (1 - k) || 0;
  m = (1 - g - k) / (1 - k) || 0;
  y = (1 - b - k) / (1 - k) || 0;
  return [c * 100, m * 100, y * 100, k * 100];
}

function rgb2keyword(rgb) {
  return reverseKeywords[JSON.stringify(rgb)];
}

function rgb2xyz(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255;

  // assume sRGB
  r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
  g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
  b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

  var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
  var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
  var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

  return [x * 100, y *100, z * 100];
}

function rgb2lab(rgb) {
  var xyz = rgb2xyz(rgb),
        x = xyz[0],
        y = xyz[1],
        z = xyz[2],
        l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return [l, a, b];
}

function rgb2lch(args) {
  return lab2lch(rgb2lab(args));
}

function hsl2rgb(hsl) {
  var h = hsl[0] / 360,
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      t1, t2, t3, rgb, val;

  if (s == 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5)
    t2 = l * (1 + s);
  else
    t2 = l + s - l * s;
  t1 = 2 * l - t2;

  rgb = [0, 0, 0];
  for (var i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * - (i - 1);
    t3 < 0 && t3++;
    t3 > 1 && t3--;

    if (6 * t3 < 1)
      val = t1 + (t2 - t1) * 6 * t3;
    else if (2 * t3 < 1)
      val = t2;
    else if (3 * t3 < 2)
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    else
      val = t1;

    rgb[i] = val * 255;
  }

  return rgb;
}

function hsl2hsv(hsl) {
  var h = hsl[0],
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      sv, v;

  if(l === 0) {
      // no need to do calc on black
      // also avoids divide by 0 error
      return [0, 0, 0];
  }

  l *= 2;
  s *= (l <= 1) ? l : 2 - l;
  v = (l + s) / 2;
  sv = (2 * s) / (l + s);
  return [h, sv * 100, v * 100];
}

function hsl2hwb(args) {
  return rgb2hwb(hsl2rgb(args));
}

function hsl2cmyk(args) {
  return rgb2cmyk(hsl2rgb(args));
}

function hsl2keyword(args) {
  return rgb2keyword(hsl2rgb(args));
}


function hsv2rgb(hsv) {
  var h = hsv[0] / 60,
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      hi = Math.floor(h) % 6;

  var f = h - Math.floor(h),
      p = 255 * v * (1 - s),
      q = 255 * v * (1 - (s * f)),
      t = 255 * v * (1 - (s * (1 - f))),
      v = 255 * v;

  switch(hi) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
  }
}

function hsv2hsl(hsv) {
  var h = hsv[0],
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      sl, l;

  l = (2 - s) * v;
  sl = s * v;
  sl /= (l <= 1) ? l : 2 - l;
  sl = sl || 0;
  l /= 2;
  return [h, sl * 100, l * 100];
}

function hsv2hwb(args) {
  return rgb2hwb(hsv2rgb(args))
}

function hsv2cmyk(args) {
  return rgb2cmyk(hsv2rgb(args));
}

function hsv2keyword(args) {
  return rgb2keyword(hsv2rgb(args));
}

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
function hwb2rgb(hwb) {
  var h = hwb[0] / 360,
      wh = hwb[1] / 100,
      bl = hwb[2] / 100,
      ratio = wh + bl,
      i, v, f, n;

  // wh + bl cant be > 1
  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }

  i = Math.floor(6 * h);
  v = 1 - bl;
  f = 6 * h - i;
  if ((i & 0x01) != 0) {
    f = 1 - f;
  }
  n = wh + f * (v - wh);  // linear interpolation

  switch (i) {
    default:
    case 6:
    case 0: r = v; g = n; b = wh; break;
    case 1: r = n; g = v; b = wh; break;
    case 2: r = wh; g = v; b = n; break;
    case 3: r = wh; g = n; b = v; break;
    case 4: r = n; g = wh; b = v; break;
    case 5: r = v; g = wh; b = n; break;
  }

  return [r * 255, g * 255, b * 255];
}

function hwb2hsl(args) {
  return rgb2hsl(hwb2rgb(args));
}

function hwb2hsv(args) {
  return rgb2hsv(hwb2rgb(args));
}

function hwb2cmyk(args) {
  return rgb2cmyk(hwb2rgb(args));
}

function hwb2keyword(args) {
  return rgb2keyword(hwb2rgb(args));
}

function cmyk2rgb(cmyk) {
  var c = cmyk[0] / 100,
      m = cmyk[1] / 100,
      y = cmyk[2] / 100,
      k = cmyk[3] / 100,
      r, g, b;

  r = 1 - Math.min(1, c * (1 - k) + k);
  g = 1 - Math.min(1, m * (1 - k) + k);
  b = 1 - Math.min(1, y * (1 - k) + k);
  return [r * 255, g * 255, b * 255];
}

function cmyk2hsl(args) {
  return rgb2hsl(cmyk2rgb(args));
}

function cmyk2hsv(args) {
  return rgb2hsv(cmyk2rgb(args));
}

function cmyk2hwb(args) {
  return rgb2hwb(cmyk2rgb(args));
}

function cmyk2keyword(args) {
  return rgb2keyword(cmyk2rgb(args));
}


function xyz2rgb(xyz) {
  var x = xyz[0] / 100,
      y = xyz[1] / 100,
      z = xyz[2] / 100,
      r, g, b;

  r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
  g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
  b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

  // assume sRGB
  r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
    : r = (r * 12.92);

  g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
    : g = (g * 12.92);

  b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
    : b = (b * 12.92);

  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);

  return [r * 255, g * 255, b * 255];
}

function xyz2lab(xyz) {
  var x = xyz[0],
      y = xyz[1],
      z = xyz[2],
      l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return [l, a, b];
}

function xyz2lch(args) {
  return lab2lch(xyz2lab(args));
}

function lab2xyz(lab) {
  var l = lab[0],
      a = lab[1],
      b = lab[2],
      x, y, z, y2;

  if (l <= 8) {
    y = (l * 100) / 903.3;
    y2 = (7.787 * (y / 100)) + (16 / 116);
  } else {
    y = 100 * Math.pow((l + 16) / 116, 3);
    y2 = Math.pow(y / 100, 1/3);
  }

  x = x / 95.047 <= 0.008856 ? x = (95.047 * ((a / 500) + y2 - (16 / 116))) / 7.787 : 95.047 * Math.pow((a / 500) + y2, 3);

  z = z / 108.883 <= 0.008859 ? z = (108.883 * (y2 - (b / 200) - (16 / 116))) / 7.787 : 108.883 * Math.pow(y2 - (b / 200), 3);

  return [x, y, z];
}

function lab2lch(lab) {
  var l = lab[0],
      a = lab[1],
      b = lab[2],
      hr, h, c;

  hr = Math.atan2(b, a);
  h = hr * 360 / 2 / Math.PI;
  if (h < 0) {
    h += 360;
  }
  c = Math.sqrt(a * a + b * b);
  return [l, c, h];
}

function lab2rgb(args) {
  return xyz2rgb(lab2xyz(args));
}

function lch2lab(lch) {
  var l = lch[0],
      c = lch[1],
      h = lch[2],
      a, b, hr;

  hr = h / 360 * 2 * Math.PI;
  a = c * Math.cos(hr);
  b = c * Math.sin(hr);
  return [l, a, b];
}

function lch2xyz(args) {
  return lab2xyz(lch2lab(args));
}

function lch2rgb(args) {
  return lab2rgb(lch2lab(args));
}

function keyword2rgb(keyword) {
  return cssKeywords[keyword];
}

function keyword2hsl(args) {
  return rgb2hsl(keyword2rgb(args));
}

function keyword2hsv(args) {
  return rgb2hsv(keyword2rgb(args));
}

function keyword2hwb(args) {
  return rgb2hwb(keyword2rgb(args));
}

function keyword2cmyk(args) {
  return rgb2cmyk(keyword2rgb(args));
}

function keyword2lab(args) {
  return rgb2lab(keyword2rgb(args));
}

function keyword2xyz(args) {
  return rgb2xyz(keyword2rgb(args));
}

var cssKeywords = {
  aliceblue:  [240,248,255],
  antiquewhite: [250,235,215],
  aqua: [0,255,255],
  aquamarine: [127,255,212],
  azure:  [240,255,255],
  beige:  [245,245,220],
  bisque: [255,228,196],
  black:  [0,0,0],
  blanchedalmond: [255,235,205],
  blue: [0,0,255],
  blueviolet: [138,43,226],
  brown:  [165,42,42],
  burlywood:  [222,184,135],
  cadetblue:  [95,158,160],
  chartreuse: [127,255,0],
  chocolate:  [210,105,30],
  coral:  [255,127,80],
  cornflowerblue: [100,149,237],
  cornsilk: [255,248,220],
  crimson:  [220,20,60],
  cyan: [0,255,255],
  darkblue: [0,0,139],
  darkcyan: [0,139,139],
  darkgoldenrod:  [184,134,11],
  darkgray: [169,169,169],
  darkgreen:  [0,100,0],
  darkgrey: [169,169,169],
  darkkhaki:  [189,183,107],
  darkmagenta:  [139,0,139],
  darkolivegreen: [85,107,47],
  darkorange: [255,140,0],
  darkorchid: [153,50,204],
  darkred:  [139,0,0],
  darksalmon: [233,150,122],
  darkseagreen: [143,188,143],
  darkslateblue:  [72,61,139],
  darkslategray:  [47,79,79],
  darkslategrey:  [47,79,79],
  darkturquoise:  [0,206,209],
  darkviolet: [148,0,211],
  deeppink: [255,20,147],
  deepskyblue:  [0,191,255],
  dimgray:  [105,105,105],
  dimgrey:  [105,105,105],
  dodgerblue: [30,144,255],
  firebrick:  [178,34,34],
  floralwhite:  [255,250,240],
  forestgreen:  [34,139,34],
  fuchsia:  [255,0,255],
  gainsboro:  [220,220,220],
  ghostwhite: [248,248,255],
  gold: [255,215,0],
  goldenrod:  [218,165,32],
  gray: [128,128,128],
  green:  [0,128,0],
  greenyellow:  [173,255,47],
  grey: [128,128,128],
  honeydew: [240,255,240],
  hotpink:  [255,105,180],
  indianred:  [205,92,92],
  indigo: [75,0,130],
  ivory:  [255,255,240],
  khaki:  [240,230,140],
  lavender: [230,230,250],
  lavenderblush:  [255,240,245],
  lawngreen:  [124,252,0],
  lemonchiffon: [255,250,205],
  lightblue:  [173,216,230],
  lightcoral: [240,128,128],
  lightcyan:  [224,255,255],
  lightgoldenrodyellow: [250,250,210],
  lightgray:  [211,211,211],
  lightgreen: [144,238,144],
  lightgrey:  [211,211,211],
  lightpink:  [255,182,193],
  lightsalmon:  [255,160,122],
  lightseagreen:  [32,178,170],
  lightskyblue: [135,206,250],
  lightslategray: [119,136,153],
  lightslategrey: [119,136,153],
  lightsteelblue: [176,196,222],
  lightyellow:  [255,255,224],
  lime: [0,255,0],
  limegreen:  [50,205,50],
  linen:  [250,240,230],
  magenta:  [255,0,255],
  maroon: [128,0,0],
  mediumaquamarine: [102,205,170],
  mediumblue: [0,0,205],
  mediumorchid: [186,85,211],
  mediumpurple: [147,112,219],
  mediumseagreen: [60,179,113],
  mediumslateblue:  [123,104,238],
  mediumspringgreen:  [0,250,154],
  mediumturquoise:  [72,209,204],
  mediumvioletred:  [199,21,133],
  midnightblue: [25,25,112],
  mintcream:  [245,255,250],
  mistyrose:  [255,228,225],
  moccasin: [255,228,181],
  navajowhite:  [255,222,173],
  navy: [0,0,128],
  oldlace:  [253,245,230],
  olive:  [128,128,0],
  olivedrab:  [107,142,35],
  orange: [255,165,0],
  orangered:  [255,69,0],
  orchid: [218,112,214],
  palegoldenrod:  [238,232,170],
  palegreen:  [152,251,152],
  paleturquoise:  [175,238,238],
  palevioletred:  [219,112,147],
  papayawhip: [255,239,213],
  peachpuff:  [255,218,185],
  peru: [205,133,63],
  pink: [255,192,203],
  plum: [221,160,221],
  powderblue: [176,224,230],
  purple: [128,0,128],
  rebeccapurple: [102, 51, 153],
  red:  [255,0,0],
  rosybrown:  [188,143,143],
  royalblue:  [65,105,225],
  saddlebrown:  [139,69,19],
  salmon: [250,128,114],
  sandybrown: [244,164,96],
  seagreen: [46,139,87],
  seashell: [255,245,238],
  sienna: [160,82,45],
  silver: [192,192,192],
  skyblue:  [135,206,235],
  slateblue:  [106,90,205],
  slategray:  [112,128,144],
  slategrey:  [112,128,144],
  snow: [255,250,250],
  springgreen:  [0,255,127],
  steelblue:  [70,130,180],
  tan:  [210,180,140],
  teal: [0,128,128],
  thistle:  [216,191,216],
  tomato: [255,99,71],
  turquoise:  [64,224,208],
  violet: [238,130,238],
  wheat:  [245,222,179],
  white:  [255,255,255],
  whitesmoke: [245,245,245],
  yellow: [255,255,0],
  yellowgreen:  [154,205,50]
};

var reverseKeywords = {};
for (var key in cssKeywords) {
  reverseKeywords[JSON.stringify(cssKeywords[key])] = key;
}

},{}],5:[function(require,module,exports){
var conversions = require(4);

var convert = function() {
   return new Converter();
}

for (var func in conversions) {
  // export Raw versions
  convert[func + "Raw"] =  (function(func) {
    // accept array or plain args
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      return conversions[func](arg);
    }
  })(func);

  var pair = /(\w+)2(\w+)/.exec(func),
      from = pair[1],
      to = pair[2];

  // export rgb2hsl and ["rgb"]["hsl"]
  convert[from] = convert[from] || {};

  convert[from][to] = convert[func] = (function(func) { 
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      
      var val = conversions[func](arg);
      if (typeof val == "string" || val === undefined)
        return val; // keyword

      for (var i = 0; i < val.length; i++)
        val[i] = Math.round(val[i]);
      return val;
    }
  })(func);
}


/* Converter does lazy conversion and caching */
var Converter = function() {
   this.convs = {};
};

/* Either get the values for a space or
  set the values for a space, depending on args */
Converter.prototype.routeSpace = function(space, args) {
   var values = args[0];
   if (values === undefined) {
      // color.rgb()
      return this.getValues(space);
   }
   // color.rgb(10, 10, 10)
   if (typeof values == "number") {
      values = Array.prototype.slice.call(args);        
   }

   return this.setValues(space, values);
};
  
/* Set the values for a space, invalidating cache */
Converter.prototype.setValues = function(space, values) {
   this.space = space;
   this.convs = {};
   this.convs[space] = values;
   return this;
};

/* Get the values for a space. If there's already
  a conversion for the space, fetch it, otherwise
  compute it */
Converter.prototype.getValues = function(space) {
   var vals = this.convs[space];
   if (!vals) {
      var fspace = this.space,
          from = this.convs[fspace];
      vals = convert[fspace][space](from);

      this.convs[space] = vals;
   }
  return vals;
};

["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(space) {
   Converter.prototype[space] = function(vals) {
      return this.routeSpace(space, arguments);
   }
});

module.exports = convert;
},{"4":4}],6:[function(require,module,exports){
module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};
},{}],7:[function(require,module,exports){
/**
 * @namespace Chart
 */
var Chart = require(27)();

require(26)(Chart);
require(22)(Chart);
require(25)(Chart);
require(21)(Chart);
require(23)(Chart);
require(24)(Chart);
require(28)(Chart);
require(32)(Chart);
require(30)(Chart);
require(31)(Chart);
require(33)(Chart);
require(29)(Chart);
require(34)(Chart);

require(35)(Chart);
require(36)(Chart);
require(37)(Chart);
require(38)(Chart);

require(41)(Chart);
require(39)(Chart);
require(40)(Chart);
require(42)(Chart);
require(43)(Chart);
require(44)(Chart);

// Controllers must be loaded after elements
// See Chart.core.datasetController.dataElementType
require(15)(Chart);
require(16)(Chart);
require(17)(Chart);
require(18)(Chart);
require(19)(Chart);
require(20)(Chart);

require(8)(Chart);
require(9)(Chart);
require(10)(Chart);
require(11)(Chart);
require(12)(Chart);
require(13)(Chart);
require(14)(Chart);

window.Chart = module.exports = Chart;

},{"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24,"25":25,"26":26,"27":27,"28":28,"29":29,"30":30,"31":31,"32":32,"33":33,"34":34,"35":35,"36":36,"37":37,"38":38,"39":39,"40":40,"41":41,"42":42,"43":43,"44":44,"8":8,"9":9}],8:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	Chart.Bar = function(context, config) {
		config.type = 'bar';

		return new Chart(context, config);
	};

};
},{}],9:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	Chart.Bubble = function(context, config) {
		config.type = 'bubble';
		return new Chart(context, config);
	};

};
},{}],10:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	Chart.Doughnut = function(context, config) {
		config.type = 'doughnut';

		return new Chart(context, config);
	};

};
},{}],11:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	Chart.Line = function(context, config) {
		config.type = 'line';

		return new Chart(context, config);
	};

};
},{}],12:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	Chart.PolarArea = function(context, config) {
		config.type = 'polarArea';

		return new Chart(context, config);
	};

};
},{}],13:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {
	
	Chart.Radar = function(context, config) {
		config.options = Chart.helpers.configMerge({ aspectRatio: 1 }, config.options);
		config.type = 'radar';

		return new Chart(context, config);
	};

};

},{}],14:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var defaultConfig = {
		hover: {
			mode: 'single'
		},

		scales: {
			xAxes: [{
				type: "linear", // scatter should not use a category axis
				position: "bottom",
				id: "x-axis-1" // need an ID so datasets can reference the scale
			}],
			yAxes: [{
				type: "linear",
				position: "left",
				id: "y-axis-1"
			}]
		},

		tooltips: {
			callbacks: {
				title: function() {
					// Title doesn't make sense for scatter since we format the data as a point
					return '';
				},
				label: function(tooltipItem) {
					return '(' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
				}
			}
		}
	};

	// Register the default config for this type
	Chart.defaults.scatter = defaultConfig;

	// Scatter charts use line controllers
	Chart.controllers.scatter = Chart.controllers.line;

	Chart.Scatter = function(context, config) {
		config.type = 'scatter';
		return new Chart(context, config);
	};

};
},{}],15:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.bar = {
		hover: {
			mode: "label"
		},

		scales: {
			xAxes: [{
				type: "category",

				// Specific to Bar Controller
				categoryPercentage: 0.8,
				barPercentage: 0.9,

				// grid line settings
				gridLines: {
					offsetGridLines: true
				}
			}],
			yAxes: [{
				type: "linear"
			}]
		}
	};

	Chart.controllers.bar = Chart.DatasetController.extend({

		dataElementType: Chart.elements.Rectangle,

		initialize: function(chart, datasetIndex) {
			Chart.DatasetController.prototype.initialize.call(this, chart, datasetIndex);

			// Use this to indicate that this is a bar dataset.
			this.getMeta().bar = true;
		},

		// Get the number of datasets that display bars. We use this to correctly calculate the bar width
		getBarCount: function() {
			var me = this;
			var barCount = 0;
			helpers.each(me.chart.data.datasets, function(dataset, datasetIndex) {
				var meta = me.chart.getDatasetMeta(datasetIndex);
				if (meta.bar && me.chart.isDatasetVisible(datasetIndex)) {
					++barCount;
				}
			}, me);
			return barCount;
		},

		update: function(reset) {
			var me = this;
			helpers.each(me.getMeta().data, function(rectangle, index) {
				me.updateElement(rectangle, index, reset);
			}, me);
		},

		updateElement: function(rectangle, index, reset) {
			var me = this;
			var meta = me.getMeta();
			var xScale = me.getScaleForId(meta.xAxisID);
			var yScale = me.getScaleForId(meta.yAxisID);
			var scaleBase = yScale.getBasePixel();
			var rectangleElementOptions = me.chart.options.elements.rectangle;
			var custom = rectangle.custom || {};
			var dataset = me.getDataset();

			helpers.extend(rectangle, {
				// Utility
				_xScale: xScale,
				_yScale: yScale,
				_datasetIndex: me.index,
				_index: index,

				// Desired view properties
				_model: {
					x: me.calculateBarX(index, me.index),
					y: reset ? scaleBase : me.calculateBarY(index, me.index),

					// Tooltip
					label: me.chart.data.labels[index],
					datasetLabel: dataset.label,

					// Appearance
					base: reset ? scaleBase : me.calculateBarBase(me.index, index),
					width: me.calculateBarWidth(index),
					backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor),
					borderSkipped: custom.borderSkipped ? custom.borderSkipped : rectangleElementOptions.borderSkipped,
					borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor),
					borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth)
				}
			});
			rectangle.pivot();
		},

		calculateBarBase: function(datasetIndex, index) {
			var me = this;
			var meta = me.getMeta();
			var yScale = me.getScaleForId(meta.yAxisID);
			var base = 0;

			if (yScale.options.stacked) {
				var chart = me.chart;
				var datasets = chart.data.datasets;
				var value = Number(datasets[datasetIndex].data[index]);

				for (var i = 0; i < datasetIndex; i++) {
					var currentDs = datasets[i];
					var currentDsMeta = chart.getDatasetMeta(i);
					if (currentDsMeta.bar && currentDsMeta.yAxisID === yScale.id && chart.isDatasetVisible(i)) {
						var currentVal = Number(currentDs.data[index]);
						base += value < 0 ? Math.min(currentVal, 0) : Math.max(currentVal, 0);
					}
				}

				return yScale.getPixelForValue(base);
			}

			return yScale.getBasePixel();
		},

		getRuler: function(index) {
			var me = this;
			var meta = me.getMeta();
			var xScale = me.getScaleForId(meta.xAxisID);
			var datasetCount = me.getBarCount();

			var tickWidth;

			if (xScale.options.type === 'category') {
				tickWidth = xScale.getPixelForTick(index + 1) - xScale.getPixelForTick(index);
			} else {
				// Average width
				tickWidth = xScale.width / xScale.ticks.length;
			}
			var categoryWidth = tickWidth * xScale.options.categoryPercentage;
			var categorySpacing = (tickWidth - (tickWidth * xScale.options.categoryPercentage)) / 2;
			var fullBarWidth = categoryWidth / datasetCount;

			if (xScale.ticks.length !== me.chart.data.labels.length) {
			    var perc = xScale.ticks.length / me.chart.data.labels.length;
			    fullBarWidth = fullBarWidth * perc;
			}

			var barWidth = fullBarWidth * xScale.options.barPercentage;
			var barSpacing = fullBarWidth - (fullBarWidth * xScale.options.barPercentage);

			return {
				datasetCount: datasetCount,
				tickWidth: tickWidth,
				categoryWidth: categoryWidth,
				categorySpacing: categorySpacing,
				fullBarWidth: fullBarWidth,
				barWidth: barWidth,
				barSpacing: barSpacing
			};
		},

		calculateBarWidth: function(index) {
			var xScale = this.getScaleForId(this.getMeta().xAxisID);
			if (xScale.options.barThickness) {
				return xScale.options.barThickness;
			}
			var ruler = this.getRuler(index);
			return xScale.options.stacked ? ruler.categoryWidth : ruler.barWidth;
		},

		// Get bar index from the given dataset index accounting for the fact that not all bars are visible
		getBarIndex: function(datasetIndex) {
			var barIndex = 0;
			var meta, j;

			for (j = 0; j < datasetIndex; ++j) {
				meta = this.chart.getDatasetMeta(j);
				if (meta.bar && this.chart.isDatasetVisible(j)) {
					++barIndex;
				}
			}

			return barIndex;
		},

		calculateBarX: function(index, datasetIndex) {
			var me = this;
			var meta = me.getMeta();
			var xScale = me.getScaleForId(meta.xAxisID);
			var barIndex = me.getBarIndex(datasetIndex);

			var ruler = me.getRuler(index);
			var leftTick = xScale.getPixelForValue(null, index, datasetIndex, me.chart.isCombo);
			leftTick -= me.chart.isCombo ? (ruler.tickWidth / 2) : 0;

			if (xScale.options.stacked) {
				return leftTick + (ruler.categoryWidth / 2) + ruler.categorySpacing;
			}

			return leftTick +
				(ruler.barWidth / 2) +
				ruler.categorySpacing +
				(ruler.barWidth * barIndex) +
				(ruler.barSpacing / 2) +
				(ruler.barSpacing * barIndex);
		},

		calculateBarY: function(index, datasetIndex) {
			var me = this;
			var meta = me.getMeta();
			var yScale = me.getScaleForId(meta.yAxisID);
			var value = Number(me.getDataset().data[index]);

			if (yScale.options.stacked) {

				var sumPos = 0,
					sumNeg = 0;

				for (var i = 0; i < datasetIndex; i++) {
					var ds = me.chart.data.datasets[i];
					var dsMeta = me.chart.getDatasetMeta(i);
					if (dsMeta.bar && dsMeta.yAxisID === yScale.id && me.chart.isDatasetVisible(i)) {
						var stackedVal = Number(ds.data[index]);
						if (stackedVal < 0) {
							sumNeg += stackedVal || 0;
						} else {
							sumPos += stackedVal || 0;
						}
					}
				}

				if (value < 0) {
					return yScale.getPixelForValue(sumNeg + value);
				} else {
					return yScale.getPixelForValue(sumPos + value);
				}
			}

			return yScale.getPixelForValue(value);
		},

		draw: function(ease) {
			var me = this;
			var easingDecimal = ease || 1;
			helpers.each(me.getMeta().data, function(rectangle, index) {
				var d = me.getDataset().data[index];
				if (d !== null && d !== undefined && !isNaN(d)) {
					rectangle.transition(easingDecimal).draw();
				}
			}, me);
		},

		setHoverStyle: function(rectangle) {
			var dataset = this.chart.data.datasets[rectangle._datasetIndex];
			var index = rectangle._index;

			var custom = rectangle.custom || {};
			var model = rectangle._model;
			model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.hoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
			model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.hoverBorderColor, index, helpers.getHoverColor(model.borderColor));
			model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
		},

		removeHoverStyle: function(rectangle) {
			var dataset = this.chart.data.datasets[rectangle._datasetIndex];
			var index = rectangle._index;
			var custom = rectangle.custom || {};
			var model = rectangle._model;
			var rectangleElementOptions = this.chart.options.elements.rectangle;

			model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor);
			model.borderColor = custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor);
			model.borderWidth = custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth);
		}

	});


	// including horizontalBar in the bar file, instead of a file of its own
	// it extends bar (like pie extends doughnut)
	Chart.defaults.horizontalBar = {
		hover: {
			mode: "label"
		},

		scales: {
			xAxes: [{
				type: "linear",
				position: "bottom"
			}],
			yAxes: [{
				position: "left",
				type: "category",

				// Specific to Horizontal Bar Controller
				categoryPercentage: 0.8,
				barPercentage: 0.9,

				// grid line settings
				gridLines: {
					offsetGridLines: true
				}
			}]
		},
		elements: {
			rectangle: {
				borderSkipped: 'left'
			}
		},
		tooltips: {
			callbacks: {
				title: function(tooltipItems, data) {
					// Pick first xLabel for now
					var title = '';

					if (tooltipItems.length > 0) {
						if (tooltipItems[0].yLabel) {
							title = tooltipItems[0].yLabel;
						} else if (data.labels.length > 0 && tooltipItems[0].index < data.labels.length) {
							title = data.labels[tooltipItems[0].index];
						}
					}

					return title;
				},
				label: function(tooltipItem, data) {
					var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
				return datasetLabel + ': ' + tooltipItem.xLabel;
				}
			}
		}
	};

	Chart.controllers.horizontalBar = Chart.controllers.bar.extend({
		updateElement: function(rectangle, index, reset) {
			var me = this;
			var meta = me.getMeta();
			var xScale = me.getScaleForId(meta.xAxisID);
			var yScale = me.getScaleForId(meta.yAxisID);
			var scaleBase = xScale.getBasePixel();
			var custom = rectangle.custom || {};
			var dataset = me.getDataset();
			var rectangleElementOptions = me.chart.options.elements.rectangle;

			helpers.extend(rectangle, {
				// Utility
				_xScale: xScale,
				_yScale: yScale,
				_datasetIndex: me.index,
				_index: index,

				// Desired view properties
				_model: {
					x: reset ? scaleBase : me.calculateBarX(index, me.index),
					y: me.calculateBarY(index, me.index),

					// Tooltip
					label: me.chart.data.labels[index],
					datasetLabel: dataset.label,

					// Appearance
					base: reset ? scaleBase : me.calculateBarBase(me.index, index),
					height: me.calculateBarHeight(index),
					backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor),
					borderSkipped: custom.borderSkipped ? custom.borderSkipped : rectangleElementOptions.borderSkipped,
					borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor),
					borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth)
				},

				draw: function () {
					var ctx = this._chart.ctx;
					var vm = this._view;

					var halfHeight = vm.height / 2,
						topY = vm.y - halfHeight,
						bottomY = vm.y + halfHeight,
						right = vm.base - (vm.base - vm.x),
						halfStroke = vm.borderWidth / 2;

					// Canvas doesn't allow us to stroke inside the width so we can
					// adjust the sizes to fit if we're setting a stroke on the line
					if (vm.borderWidth) {
						topY += halfStroke;
						bottomY -= halfStroke;
						right += halfStroke;
					}

					ctx.beginPath();

					ctx.fillStyle = vm.backgroundColor;
					ctx.strokeStyle = vm.borderColor;
					ctx.lineWidth = vm.borderWidth;

					// Corner points, from bottom-left to bottom-right clockwise
					// | 1 2 |
					// | 0 3 |
					var corners = [
						[vm.base, bottomY],
						[vm.base, topY],
						[right, topY],
						[right, bottomY]
					];

					// Find first (starting) corner with fallback to 'bottom'
					var borders = ['bottom', 'left', 'top', 'right'];
					var startCorner = borders.indexOf(vm.borderSkipped, 0);
					if (startCorner === -1)
						startCorner = 0;

					function cornerAt(index) {
						return corners[(startCorner + index) % 4];
					}

					// Draw rectangle from 'startCorner'
					ctx.moveTo.apply(ctx, cornerAt(0));
					for (var i = 1; i < 4; i++)
						ctx.lineTo.apply(ctx, cornerAt(i));

					ctx.fill();
					if (vm.borderWidth) {
						ctx.stroke();
					}
				},

				inRange: function (mouseX, mouseY) {
					var vm = this._view;
					var inRange = false;

					if (vm) {
						if (vm.x < vm.base) {
							inRange = (mouseY >= vm.y - vm.height / 2 && mouseY <= vm.y + vm.height / 2) && (mouseX >= vm.x && mouseX <= vm.base);
						} else {
							inRange = (mouseY >= vm.y - vm.height / 2 && mouseY <= vm.y + vm.height / 2) && (mouseX >= vm.base && mouseX <= vm.x);
						}
					}

					return inRange;
				}
			});

			rectangle.pivot();
		},

		calculateBarBase: function (datasetIndex, index) {
			var me = this;
			var meta = me.getMeta();
			var xScale = me.getScaleForId(meta.xAxisID);
			var base = 0;

			if (xScale.options.stacked) {
				var chart = me.chart;
				var datasets = chart.data.datasets;
				var value = Number(datasets[datasetIndex].data[index]);

				for (var i = 0; i < datasetIndex; i++) {
					var currentDs = datasets[i];
					var currentDsMeta = chart.getDatasetMeta(i);
					if (currentDsMeta.bar && currentDsMeta.xAxisID === xScale.id && chart.isDatasetVisible(i)) {
						var currentVal = Number(currentDs.data[index]);
						base += value < 0 ? Math.min(currentVal, 0) : Math.max(currentVal, 0);
					}
				}

				return xScale.getPixelForValue(base);
			}

			return xScale.getBasePixel();
		},

		getRuler: function (index) {
			var me = this;
			var meta = me.getMeta();
			var yScale = me.getScaleForId(meta.yAxisID);
			var datasetCount = me.getBarCount();

			var tickHeight;
			if (yScale.options.type === 'category') {
				tickHeight = yScale.getPixelForTick(index + 1) - yScale.getPixelForTick(index);
			} else {
				// Average width
				tickHeight = yScale.width / yScale.ticks.length;
			}
			var categoryHeight = tickHeight * yScale.options.categoryPercentage;
			var categorySpacing = (tickHeight - (tickHeight * yScale.options.categoryPercentage)) / 2;
			var fullBarHeight = categoryHeight / datasetCount;

			if (yScale.ticks.length !== me.chart.data.labels.length) {
				var perc = yScale.ticks.length / me.chart.data.labels.length;
				fullBarHeight = fullBarHeight * perc;
			}

			var barHeight = fullBarHeight * yScale.options.barPercentage;
			var barSpacing = fullBarHeight - (fullBarHeight * yScale.options.barPercentage);

			return {
				datasetCount: datasetCount,
				tickHeight: tickHeight,
				categoryHeight: categoryHeight,
				categorySpacing: categorySpacing,
				fullBarHeight: fullBarHeight,
				barHeight: barHeight,
				barSpacing: barSpacing
			};
		},

		calculateBarHeight: function (index) {
			var me = this;
			var yScale = me.getScaleForId(me.getMeta().yAxisID);
			if (yScale.options.barThickness) {
				return yScale.options.barThickness;
			}
			var ruler = me.getRuler(index);
			return yScale.options.stacked ? ruler.categoryHeight : ruler.barHeight;
		},

		calculateBarX: function (index, datasetIndex) {
			var me = this;
			var meta = me.getMeta();
			var xScale = me.getScaleForId(meta.xAxisID);
			var value = Number(me.getDataset().data[index]);

			if (xScale.options.stacked) {

				var sumPos = 0,
					sumNeg = 0;

				for (var i = 0; i < datasetIndex; i++) {
					var ds = me.chart.data.datasets[i];
					var dsMeta = me.chart.getDatasetMeta(i);
					if (dsMeta.bar && dsMeta.xAxisID === xScale.id && me.chart.isDatasetVisible(i)) {
						var stackedVal = Number(ds.data[index]);
						if (stackedVal < 0) {
							sumNeg += stackedVal || 0;
						} else {
							sumPos += stackedVal || 0;
						}
					}
				}

				if (value < 0) {
					return xScale.getPixelForValue(sumNeg + value);
				} else {
					return xScale.getPixelForValue(sumPos + value);
				}
			}

			return xScale.getPixelForValue(value);
		},

		calculateBarY: function (index, datasetIndex) {
			var me = this;
			var meta = me.getMeta();
			var yScale = me.getScaleForId(meta.yAxisID);
			var barIndex = me.getBarIndex(datasetIndex);

			var ruler = me.getRuler(index);
			var topTick = yScale.getPixelForValue(null, index, datasetIndex, me.chart.isCombo);
			topTick -= me.chart.isCombo ? (ruler.tickHeight / 2) : 0;

			if (yScale.options.stacked) {
				return topTick + (ruler.categoryHeight / 2) + ruler.categorySpacing;
			}

			return topTick +
				(ruler.barHeight / 2) +
				ruler.categorySpacing +
				(ruler.barHeight * barIndex) +
				(ruler.barSpacing / 2) +
				(ruler.barSpacing * barIndex);
		}
	});
};

},{}],16:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.bubble = {
		hover: {
			mode: "single"
		},

		scales: {
			xAxes: [{
				type: "linear", // bubble should probably use a linear scale by default
				position: "bottom",
				id: "x-axis-0" // need an ID so datasets can reference the scale
			}],
			yAxes: [{
				type: "linear",
				position: "left",
				id: "y-axis-0"
			}]
		},

		tooltips: {
			callbacks: {
				title: function() {
					// Title doesn't make sense for scatter since we format the data as a point
					return '';
				},
				label: function(tooltipItem, data) {
					var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
					var dataPoint = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
					return datasetLabel + ': (' + dataPoint.x + ', ' + dataPoint.y + ', ' + dataPoint.r + ')';
				}
			}
		}
	};

	Chart.controllers.bubble = Chart.DatasetController.extend({

		dataElementType: Chart.elements.Point,

		update: function(reset) {
			var me = this;
			var meta = me.getMeta();
			var points = meta.data;

			// Update Points
			helpers.each(points, function(point, index) {
				me.updateElement(point, index, reset);
			});
		},

		updateElement: function(point, index, reset) {
			var me = this;
			var meta = me.getMeta();
			var xScale = me.getScaleForId(meta.xAxisID);
			var yScale = me.getScaleForId(meta.yAxisID);

			var custom = point.custom || {};
			var dataset = me.getDataset();
			var data = dataset.data[index];
			var pointElementOptions = me.chart.options.elements.point;
			var dsIndex = me.index;

			helpers.extend(point, {
				// Utility
				_xScale: xScale,
				_yScale: yScale,
				_datasetIndex: dsIndex,
				_index: index,

				// Desired view properties
				_model: {
					x: reset ? xScale.getPixelForDecimal(0.5) : xScale.getPixelForValue(typeof data === 'object' ? data : NaN, index, dsIndex, me.chart.isCombo),
					y: reset ? yScale.getBasePixel() : yScale.getPixelForValue(data, index, dsIndex),
					// Appearance
					radius: reset ? 0 : custom.radius ? custom.radius : me.getRadius(data),

					// Tooltip
					hitRadius: custom.hitRadius ? custom.hitRadius : helpers.getValueAtIndexOrDefault(dataset.hitRadius, index, pointElementOptions.hitRadius)
				}
			});

			// Trick to reset the styles of the point
			Chart.DatasetController.prototype.removeHoverStyle.call(me, point, pointElementOptions);

			var model = point._model;
			model.skip = custom.skip ? custom.skip : (isNaN(model.x) || isNaN(model.y));

			point.pivot();
		},

		getRadius: function(value) {
			return value.r || this.chart.options.elements.point.radius;
		},

		setHoverStyle: function(point) {
			var me = this;
			Chart.DatasetController.prototype.setHoverStyle.call(me, point);

			// Radius
			var dataset = me.chart.data.datasets[point._datasetIndex];
			var index = point._index;
			var custom = point.custom || {};
			var model = point._model;
			model.radius = custom.hoverRadius ? custom.hoverRadius : (helpers.getValueAtIndexOrDefault(dataset.hoverRadius, index, me.chart.options.elements.point.hoverRadius)) + me.getRadius(dataset.data[index]);
		},

		removeHoverStyle: function(point) {
			var me = this;
			Chart.DatasetController.prototype.removeHoverStyle.call(me, point, me.chart.options.elements.point);

			var dataVal = me.chart.data.datasets[point._datasetIndex].data[point._index];
			var custom = point.custom || {};
			var model = point._model;

			model.radius = custom.radius ? custom.radius : me.getRadius(dataVal);
		}
	});
};

},{}],17:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers,
		defaults = Chart.defaults;

	defaults.doughnut = {
		animation: {
			//Boolean - Whether we animate the rotation of the Doughnut
			animateRotate: true,
			//Boolean - Whether we animate scaling the Doughnut from the centre
			animateScale: false
		},
		aspectRatio: 1,
		hover: {
			mode: 'single'
		},
		legendCallback: function(chart) {
			var text = [];
			text.push('<ul class="' + chart.id + '-legend">');

			var data = chart.data;
			var datasets = data.datasets;
			var labels = data.labels;

			if (datasets.length) {
				for (var i = 0; i < datasets[0].data.length; ++i) {
					text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '"></span>');
					if (labels[i]) {
						text.push(labels[i]);
					}
					text.push('</li>');
				}
			}

			text.push('</ul>');
			return text.join("");
		},
		legend: {
			labels: {
				generateLabels: function(chart) {
					var data = chart.data;
					if (data.labels.length && data.datasets.length) {
						return data.labels.map(function(label, i) {
							var meta = chart.getDatasetMeta(0);
							var ds = data.datasets[0];
							var arc = meta.data[i];
							var custom = arc && arc.custom || {};
							var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
							var arcOpts = chart.options.elements.arc;
							var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
							var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
							var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

							return {
								text: label,
								fillStyle: fill,
								strokeStyle: stroke,
								lineWidth: bw,
								hidden: isNaN(ds.data[i]) || meta.data[i].hidden,

								// Extra data used for toggling the correct item
								index: i
							};
						});
					} else {
						return [];
					}
				}
			},

			onClick: function(e, legendItem) {
				var index = legendItem.index;
				var chart = this.chart;
				var i, ilen, meta;

				for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
					meta = chart.getDatasetMeta(i);
					meta.data[index].hidden = !meta.data[index].hidden;
				}

				chart.update();
			}
		},

		//The percentage of the chart that we cut out of the middle.
		cutoutPercentage: 50,

		//The rotation of the chart, where the first data arc begins.
		rotation: Math.PI * -0.5,

		//The total circumference of the chart.
		circumference: Math.PI * 2.0,

		// Need to override these to give a nice default
		tooltips: {
			callbacks: {
				title: function() {
					return '';
				},
				label: function(tooltipItem, data) {
					return data.labels[tooltipItem.index] + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
				}
			}
		}
	};

	defaults.pie = helpers.clone(defaults.doughnut);
	helpers.extend(defaults.pie, {
		cutoutPercentage: 0
	});


	Chart.controllers.doughnut = Chart.controllers.pie = Chart.DatasetController.extend({

		dataElementType: Chart.elements.Arc,

		linkScales: helpers.noop,

		// Get index of the dataset in relation to the visible datasets. This allows determining the inner and outer radius correctly
		getRingIndex: function(datasetIndex) {
			var ringIndex = 0;

			for (var j = 0; j < datasetIndex; ++j) {
				if (this.chart.isDatasetVisible(j)) {
					++ringIndex;
				}
			}

			return ringIndex;
		},

		update: function(reset) {
			var me = this;
			var chart = me.chart,
				chartArea = chart.chartArea,
				opts = chart.options,
				arcOpts = opts.elements.arc,
				availableWidth = chartArea.right - chartArea.left - arcOpts.borderWidth,
				availableHeight = chartArea.bottom - chartArea.top - arcOpts.borderWidth,
				minSize = Math.min(availableWidth, availableHeight),
				offset = {
					x: 0,
					y: 0
				},
				meta = me.getMeta(),
				cutoutPercentage = opts.cutoutPercentage,
				circumference = opts.circumference;

			// If the chart's circumference isn't a full circle, calculate minSize as a ratio of the width/height of the arc
			if (circumference < Math.PI * 2.0) {
				var startAngle = opts.rotation % (Math.PI * 2.0);
				startAngle += Math.PI * 2.0 * (startAngle >= Math.PI ? -1 : startAngle < -Math.PI ? 1 : 0);
				var endAngle = startAngle + circumference;
				var start = {x: Math.cos(startAngle), y: Math.sin(startAngle)};
				var end = {x: Math.cos(endAngle), y: Math.sin(endAngle)};
				var contains0 = (startAngle <= 0 && 0 <= endAngle) || (startAngle <= Math.PI * 2.0 && Math.PI * 2.0 <= endAngle);
				var contains90 = (startAngle <= Math.PI * 0.5 && Math.PI * 0.5 <= endAngle) || (startAngle <= Math.PI * 2.5 && Math.PI * 2.5 <= endAngle);
				var contains180 = (startAngle <= -Math.PI && -Math.PI <= endAngle) || (startAngle <= Math.PI && Math.PI <= endAngle);
				var contains270 = (startAngle <= -Math.PI * 0.5 && -Math.PI * 0.5 <= endAngle) || (startAngle <= Math.PI * 1.5 && Math.PI * 1.5 <= endAngle);
				var cutout = cutoutPercentage / 100.0;
				var min = {x: contains180 ? -1 : Math.min(start.x * (start.x < 0 ? 1 : cutout), end.x * (end.x < 0 ? 1 : cutout)), y: contains270 ? -1 : Math.min(start.y * (start.y < 0 ? 1 : cutout), end.y * (end.y < 0 ? 1 : cutout))};
				var max = {x: contains0 ? 1 : Math.max(start.x * (start.x > 0 ? 1 : cutout), end.x * (end.x > 0 ? 1 : cutout)), y: contains90 ? 1 : Math.max(start.y * (start.y > 0 ? 1 : cutout), end.y * (end.y > 0 ? 1 : cutout))};
				var size = {width: (max.x - min.x) * 0.5, height: (max.y - min.y) * 0.5};
				minSize = Math.min(availableWidth / size.width, availableHeight / size.height);
				offset = {x: (max.x + min.x) * -0.5, y: (max.y + min.y) * -0.5};
			}
            chart.borderWidth = me.getMaxBorderWidth(meta.data);

			chart.outerRadius = Math.max((minSize - chart.borderWidth) / 2, 0);
			chart.innerRadius = Math.max(cutoutPercentage ? (chart.outerRadius / 100) * (cutoutPercentage) : 1, 0);
			chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();
			chart.offsetX = offset.x * chart.outerRadius;
			chart.offsetY = offset.y * chart.outerRadius;

			meta.total = me.calculateTotal();

			me.outerRadius = chart.outerRadius - (chart.radiusLength * me.getRingIndex(me.index));
			me.innerRadius = me.outerRadius - chart.radiusLength;

			helpers.each(meta.data, function(arc, index) {
				me.updateElement(arc, index, reset);
			});
		},

		updateElement: function(arc, index, reset) {
			var me = this;
			var chart = me.chart,
				chartArea = chart.chartArea,
				opts = chart.options,
				animationOpts = opts.animation,
				centerX = (chartArea.left + chartArea.right) / 2,
				centerY = (chartArea.top + chartArea.bottom) / 2,
				startAngle = opts.rotation, // non reset case handled later
				endAngle = opts.rotation, // non reset case handled later
				dataset = me.getDataset(),
				circumference = reset && animationOpts.animateRotate ? 0 : arc.hidden ? 0 : me.calculateCircumference(dataset.data[index]) * (opts.circumference / (2.0 * Math.PI)),
				innerRadius = reset && animationOpts.animateScale ? 0 : me.innerRadius,
				outerRadius = reset && animationOpts.animateScale ? 0 : me.outerRadius,
				valueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;

			helpers.extend(arc, {
				// Utility
				_datasetIndex: me.index,
				_index: index,

				// Desired view properties
				_model: {
					x: centerX + chart.offsetX,
					y: centerY + chart.offsetY,
					startAngle: startAngle,
					endAngle: endAngle,
					circumference: circumference,
					outerRadius: outerRadius,
					innerRadius: innerRadius,
					label: valueAtIndexOrDefault(dataset.label, index, chart.data.labels[index])
				}
			});

			var model = arc._model;
			// Resets the visual styles
			this.removeHoverStyle(arc);

			// Set correct angles if not resetting
			if (!reset || !animationOpts.animateRotate) {
				if (index === 0) {
					model.startAngle = opts.rotation;
				} else {
					model.startAngle = me.getMeta().data[index - 1]._model.endAngle;
				}

				model.endAngle = model.startAngle + model.circumference;
			}

			arc.pivot();
		},

		removeHoverStyle: function(arc) {
			Chart.DatasetController.prototype.removeHoverStyle.call(this, arc, this.chart.options.elements.arc);
		},

		calculateTotal: function() {
			var dataset = this.getDataset();
			var meta = this.getMeta();
			var total = 0;
			var value;

			helpers.each(meta.data, function(element, index) {
				value = dataset.data[index];
				if (!isNaN(value) && !element.hidden) {
					total += Math.abs(value);
				}
			});

			/*if (total === 0) {
				total = NaN;
			}*/

			return total;
		},

		calculateCircumference: function(value) {
			var total = this.getMeta().total;
			if (total > 0 && !isNaN(value)) {
				return (Math.PI * 2.0) * (value / total);
			} else {
				return 0;
			}
		},
		
		//gets the max border or hover width to properly scale pie charts
        getMaxBorderWidth: function (elements) {
            var max = 0,
				index = this.index,
				length = elements.length,
				borderWidth,
				hoverWidth;

            for (var i = 0; i < length; i++) {
               	borderWidth = elements[i]._model ? elements[i]._model.borderWidth : 0;
                hoverWidth = elements[i]._chart ? elements[i]._chart.config.data.datasets[index].hoverBorderWidth : 0;
				
                max = borderWidth > max ? borderWidth : max;
                max = hoverWidth > max ? hoverWidth : max;
            }
            return max;
        }
	});
};

},{}],18:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.line = {
		showLines: true,
		spanGaps: false,

		hover: {
			mode: "label"
		},

		scales: {
			xAxes: [{
				type: "category",
				id: 'x-axis-0'
			}],
			yAxes: [{
				type: "linear",
				id: 'y-axis-0'
			}]
		}
	};

	function lineEnabled(dataset, options) {
		return helpers.getValueOrDefault(dataset.showLine, options.showLines);
	}

	Chart.controllers.line = Chart.DatasetController.extend({

		datasetElementType: Chart.elements.Line,

		dataElementType: Chart.elements.Point,

		addElementAndReset: function(index) {
			var me = this;
			var options = me.chart.options;
			var meta = me.getMeta();

			Chart.DatasetController.prototype.addElementAndReset.call(me, index);

			// Make sure bezier control points are updated
			if (lineEnabled(me.getDataset(), options) && meta.dataset._model.tension !== 0) {
				me.updateBezierControlPoints();
			}
		},

		update: function(reset) {
			var me = this;
			var meta = me.getMeta();
			var line = meta.dataset;
			var points = meta.data || [];
			var options = me.chart.options;
			var lineElementOptions = options.elements.line;
			var scale = me.getScaleForId(meta.yAxisID);
			var i, ilen, custom;
			var dataset = me.getDataset();
			var showLine = lineEnabled(dataset, options);

			// Update Line
			if (showLine) {
				custom = line.custom || {};

				// Compatibility: If the properties are defined with only the old name, use those values
				if ((dataset.tension !== undefined) && (dataset.lineTension === undefined)) {
					dataset.lineTension = dataset.tension;
				}

				// Utility
				line._scale = scale;
				line._datasetIndex = me.index;
				// Data
				line._children = points;
				// Model
				line._model = {
					// Appearance
					// The default behavior of lines is to break at null values, according
					// to https://github.com/chartjs/Chart.js/issues/2435#issuecomment-216718158
					// This option gives linse the ability to span gaps
					spanGaps: dataset.spanGaps ? dataset.spanGaps : options.spanGaps,
					tension: custom.tension ? custom.tension : helpers.getValueOrDefault(dataset.lineTension, lineElementOptions.tension),
					backgroundColor: custom.backgroundColor ? custom.backgroundColor : (dataset.backgroundColor || lineElementOptions.backgroundColor),
					borderWidth: custom.borderWidth ? custom.borderWidth : (dataset.borderWidth || lineElementOptions.borderWidth),
					borderColor: custom.borderColor ? custom.borderColor : (dataset.borderColor || lineElementOptions.borderColor),
					borderCapStyle: custom.borderCapStyle ? custom.borderCapStyle : (dataset.borderCapStyle || lineElementOptions.borderCapStyle),
					borderDash: custom.borderDash ? custom.borderDash : (dataset.borderDash || lineElementOptions.borderDash),
					borderDashOffset: custom.borderDashOffset ? custom.borderDashOffset : (dataset.borderDashOffset || lineElementOptions.borderDashOffset),
					borderJoinStyle: custom.borderJoinStyle ? custom.borderJoinStyle : (dataset.borderJoinStyle || lineElementOptions.borderJoinStyle),
					fill: custom.fill ? custom.fill : (dataset.fill !== undefined ? dataset.fill : lineElementOptions.fill),
					steppedLine: custom.steppedLine ? custom.steppedLine : helpers.getValueOrDefault(dataset.steppedLine, lineElementOptions.stepped),
					cubicInterpolationMode: custom.cubicInterpolationMode ? custom.cubicInterpolationMode : helpers.getValueOrDefault(dataset.cubicInterpolationMode, lineElementOptions.cubicInterpolationMode),
					// Scale
					scaleTop: scale.top,
					scaleBottom: scale.bottom,
					scaleZero: scale.getBasePixel()
				};

				line.pivot();
			}

			// Update Points
			for (i=0, ilen=points.length; i<ilen; ++i) {
				me.updateElement(points[i], i, reset);
			}

			if (showLine && line._model.tension !== 0) {
				me.updateBezierControlPoints();
			}

			// Now pivot the point for animation
			for (i=0, ilen=points.length; i<ilen; ++i) {
				points[i].pivot();
			}
		},

		getPointBackgroundColor: function(point, index) {
			var backgroundColor = this.chart.options.elements.point.backgroundColor;
			var dataset = this.getDataset();
			var custom = point.custom || {};

			if (custom.backgroundColor) {
				backgroundColor = custom.backgroundColor;
			} else if (dataset.pointBackgroundColor) {
				backgroundColor = helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, backgroundColor);
			} else if (dataset.backgroundColor) {
				backgroundColor = dataset.backgroundColor;
			}

			return backgroundColor;
		},

		getPointBorderColor: function(point, index) {
			var borderColor = this.chart.options.elements.point.borderColor;
			var dataset = this.getDataset();
			var custom = point.custom || {};

			if (custom.borderColor) {
				borderColor = custom.borderColor;
			} else if (dataset.pointBorderColor) {
				borderColor = helpers.getValueAtIndexOrDefault(dataset.pointBorderColor, index, borderColor);
			} else if (dataset.borderColor) {
				borderColor = dataset.borderColor;
			}

			return borderColor;
		},

		getPointBorderWidth: function(point, index) {
			var borderWidth = this.chart.options.elements.point.borderWidth;
			var dataset = this.getDataset();
			var custom = point.custom || {};

			if (custom.borderWidth) {
				borderWidth = custom.borderWidth;
			} else if (dataset.pointBorderWidth) {
				borderWidth = helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, borderWidth);
			} else if (dataset.borderWidth) {
				borderWidth = dataset.borderWidth;
			}

			return borderWidth;
		},

		updateElement: function(point, index, reset) {
			var me = this;
			var meta = me.getMeta();
			var custom = point.custom || {};
			var dataset = me.getDataset();
			var datasetIndex = me.index;
			var value = dataset.data[index];
			var yScale = me.getScaleForId(meta.yAxisID);
			var xScale = me.getScaleForId(meta.xAxisID);
			var pointOptions = me.chart.options.elements.point;
			var x, y;
			var labels = me.chart.data.labels || [];
			var includeOffset = (labels.length === 1 || dataset.data.length === 1) || me.chart.isCombo;

			// Compatibility: If the properties are defined with only the old name, use those values
			if ((dataset.radius !== undefined) && (dataset.pointRadius === undefined)) {
				dataset.pointRadius = dataset.radius;
			}
			if ((dataset.hitRadius !== undefined) && (dataset.pointHitRadius === undefined)) {
				dataset.pointHitRadius = dataset.hitRadius;
			}

			x = xScale.getPixelForValue(typeof value === 'object' ? value : NaN, index, datasetIndex, includeOffset);
			y = reset ? yScale.getBasePixel() : me.calculatePointY(value, index, datasetIndex);

			// Utility
			point._xScale = xScale;
			point._yScale = yScale;
			point._datasetIndex = datasetIndex;
			point._index = index;

			// Desired view properties
			point._model = {
				x: x,
				y: y,
				skip: custom.skip || isNaN(x) || isNaN(y),
				// Appearance
				radius: custom.radius || helpers.getValueAtIndexOrDefault(dataset.pointRadius, index, pointOptions.radius),
				pointStyle: custom.pointStyle || helpers.getValueAtIndexOrDefault(dataset.pointStyle, index, pointOptions.pointStyle),
				backgroundColor: me.getPointBackgroundColor(point, index),
				borderColor: me.getPointBorderColor(point, index),
				borderWidth: me.getPointBorderWidth(point, index),
				tension: meta.dataset._model ? meta.dataset._model.tension : 0,
				steppedLine: meta.dataset._model ? meta.dataset._model.steppedLine : false,
				// Tooltip
				hitRadius: custom.hitRadius || helpers.getValueAtIndexOrDefault(dataset.pointHitRadius, index, pointOptions.hitRadius)
			};
		},

		calculatePointY: function(value, index, datasetIndex) {
			var me = this;
			var chart = me.chart;
			var meta = me.getMeta();
			var yScale = me.getScaleForId(meta.yAxisID);
			var sumPos = 0;
			var sumNeg = 0;
			var i, ds, dsMeta;

			if (yScale.options.stacked) {
				for (i = 0; i < datasetIndex; i++) {
					ds = chart.data.datasets[i];
					dsMeta = chart.getDatasetMeta(i);
					if (dsMeta.type === 'line' && dsMeta.yAxisID === yScale.id && chart.isDatasetVisible(i)) {
						var stackedRightValue = Number(yScale.getRightValue(ds.data[index]));
						if (stackedRightValue < 0) {
							sumNeg += stackedRightValue || 0;
						} else {
							sumPos += stackedRightValue || 0;
						}
					}
				}

				var rightValue = Number(yScale.getRightValue(value));
				if (rightValue < 0) {
					return yScale.getPixelForValue(sumNeg + rightValue);
				} else {
					return yScale.getPixelForValue(sumPos + rightValue);
				}
			}

			return yScale.getPixelForValue(value);
		},

		updateBezierControlPoints: function() {
			var me = this;
			var meta = me.getMeta();
			var area = me.chart.chartArea;

			// Only consider points that are drawn in case the spanGaps option is used
			var points = (meta.data || []);
			if (meta.dataset._model.spanGaps) points = points.filter(function(pt) { return !pt._model.skip; });
			var i, ilen, point, model, controlPoints;

			function capControlPoint(pt, min, max) {
				return Math.max(Math.min(pt, max), min);
			}

			if (meta.dataset._model.cubicInterpolationMode == 'monotone') {
				helpers.splineCurveMonotone(points);
			}
			else {
				for (i = 0, ilen = points.length; i < ilen; ++i) {
					point = points[i];
					model = point._model;
					controlPoints = helpers.splineCurve(
						helpers.previousItem(points, i)._model,
						model,
						helpers.nextItem(points, i)._model,
						meta.dataset._model.tension
					);
					model.controlPointPreviousX = controlPoints.previous.x;
					model.controlPointPreviousY = controlPoints.previous.y;
					model.controlPointNextX = controlPoints.next.x;
					model.controlPointNextY = controlPoints.next.y;
				}
			}

			if (me.chart.options.elements.line.capBezierPoints) {
				for (i = 0, ilen = points.length; i < ilen; ++i) {
					model = points[i]._model;
					model.controlPointPreviousX = capControlPoint(model.controlPointPreviousX, area.left, area.right);
					model.controlPointPreviousY = capControlPoint(model.controlPointPreviousY, area.top, area.bottom);
					model.controlPointNextX = capControlPoint(model.controlPointNextX, area.left, area.right);
					model.controlPointNextY = capControlPoint(model.controlPointNextY, area.top, area.bottom);
				}
			}

		},

		draw: function(ease) {
			var me = this;
			var meta = me.getMeta();
			var points = meta.data || [];
			var easingDecimal = ease || 1;
			var i, ilen;

			// Transition Point Locations
			for (i=0, ilen=points.length; i<ilen; ++i) {
				points[i].transition(easingDecimal);
			}

			// Transition and Draw the line
			if (lineEnabled(me.getDataset(), me.chart.options)) {
				meta.dataset.transition(easingDecimal).draw();
			}

			// Draw the points
			for (i=0, ilen=points.length; i<ilen; ++i) {
				points[i].draw();
			}
		},

		setHoverStyle: function(point) {
			// Point
			var dataset = this.chart.data.datasets[point._datasetIndex];
			var index = point._index;
			var custom = point.custom || {};
			var model = point._model;

			model.radius = custom.hoverRadius || helpers.getValueAtIndexOrDefault(dataset.pointHoverRadius, index, this.chart.options.elements.point.hoverRadius);
			model.backgroundColor = custom.hoverBackgroundColor || helpers.getValueAtIndexOrDefault(dataset.pointHoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
			model.borderColor = custom.hoverBorderColor || helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderColor, index, helpers.getHoverColor(model.borderColor));
			model.borderWidth = custom.hoverBorderWidth || helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderWidth, index, model.borderWidth);
		},

		removeHoverStyle: function(point) {
			var me = this;
			var dataset = me.chart.data.datasets[point._datasetIndex];
			var index = point._index;
			var custom = point.custom || {};
			var model = point._model;

			// Compatibility: If the properties are defined with only the old name, use those values
			if ((dataset.radius !== undefined) && (dataset.pointRadius === undefined)) {
				dataset.pointRadius = dataset.radius;
			}

			model.radius = custom.radius || helpers.getValueAtIndexOrDefault(dataset.pointRadius, index, me.chart.options.elements.point.radius);
			model.backgroundColor = me.getPointBackgroundColor(point, index);
			model.borderColor = me.getPointBorderColor(point, index);
			model.borderWidth = me.getPointBorderWidth(point, index);
		}
	});
};

},{}],19:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.polarArea = {

		scale: {
			type: "radialLinear",
			lineArc: true, // so that lines are circular
			ticks: {
				beginAtZero: true
			}
		},

		//Boolean - Whether to animate the rotation of the chart
		animation: {
			animateRotate: true,
			animateScale: true
		},

		startAngle: -0.5 * Math.PI,
		aspectRatio: 1,
		legendCallback: function(chart) {
			var text = [];
			text.push('<ul class="' + chart.id + '-legend">');

			var data = chart.data;
			var datasets = data.datasets;
			var labels = data.labels;

			if (datasets.length) {
				for (var i = 0; i < datasets[0].data.length; ++i) {
					text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '">');
					if (labels[i]) {
						text.push(labels[i]);
					}
					text.push('</span></li>');
				}
			}

			text.push('</ul>');
			return text.join("");
		},
		legend: {
			labels: {
				generateLabels: function(chart) {
					var data = chart.data;
					if (data.labels.length && data.datasets.length) {
						return data.labels.map(function(label, i) {
							var meta = chart.getDatasetMeta(0);
							var ds = data.datasets[0];
							var arc = meta.data[i];
							var custom = arc.custom || {};
							var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
							var arcOpts = chart.options.elements.arc;
							var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
							var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
							var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

							return {
								text: label,
								fillStyle: fill,
								strokeStyle: stroke,
								lineWidth: bw,
								hidden: isNaN(ds.data[i]) || meta.data[i].hidden,

								// Extra data used for toggling the correct item
								index: i
							};
						});
					} else {
						return [];
					}
				}
			},

			onClick: function(e, legendItem) {
				var index = legendItem.index;
				var chart = this.chart;
				var i, ilen, meta;

				for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
					meta = chart.getDatasetMeta(i);
					meta.data[index].hidden = !meta.data[index].hidden;
				}

				chart.update();
			}
		},

		// Need to override these to give a nice default
		tooltips: {
			callbacks: {
				title: function() {
					return '';
				},
				label: function(tooltipItem, data) {
					return data.labels[tooltipItem.index] + ': ' + tooltipItem.yLabel;
				}
			}
		}
	};

	Chart.controllers.polarArea = Chart.DatasetController.extend({

		dataElementType: Chart.elements.Arc,

		linkScales: helpers.noop,

		update: function(reset) {
			var me = this;
			var chart = me.chart;
			var chartArea = chart.chartArea;
			var meta = me.getMeta();
			var opts = chart.options;
			var arcOpts = opts.elements.arc;
			var minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
			chart.outerRadius = Math.max((minSize - arcOpts.borderWidth / 2) / 2, 0);
			chart.innerRadius = Math.max(opts.cutoutPercentage ? (chart.outerRadius / 100) * (opts.cutoutPercentage) : 1, 0);
			chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();

			me.outerRadius = chart.outerRadius - (chart.radiusLength * me.index);
			me.innerRadius = me.outerRadius - chart.radiusLength;

			meta.count = me.countVisibleElements();

			helpers.each(meta.data, function(arc, index) {
				me.updateElement(arc, index, reset);
			});
		},

		updateElement: function(arc, index, reset) {
			var me = this;
			var chart = me.chart;
			var dataset = me.getDataset();
			var opts = chart.options;
			var animationOpts = opts.animation;
			var scale = chart.scale;
			var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
			var labels = chart.data.labels;

			var circumference = me.calculateCircumference(dataset.data[index]);
			var centerX = scale.xCenter;
			var centerY = scale.yCenter;

			// If there is NaN data before us, we need to calculate the starting angle correctly.
			// We could be way more efficient here, but its unlikely that the polar area chart will have a lot of data
			var visibleCount = 0;
			var meta = me.getMeta();
			for (var i = 0; i < index; ++i) {
				if (!isNaN(dataset.data[i]) && !meta.data[i].hidden) {
					++visibleCount;
				}
			}

			//var negHalfPI = -0.5 * Math.PI;
			var datasetStartAngle = opts.startAngle;
			var distance = arc.hidden ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]);
			var startAngle = datasetStartAngle + (circumference * visibleCount);
			var endAngle = startAngle + (arc.hidden ? 0 : circumference);

			var resetRadius = animationOpts.animateScale ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]);

			helpers.extend(arc, {
				// Utility
				_datasetIndex: me.index,
				_index: index,
				_scale: scale,

				// Desired view properties
				_model: {
					x: centerX,
					y: centerY,
					innerRadius: 0,
					outerRadius: reset ? resetRadius : distance,
					startAngle: reset && animationOpts.animateRotate ? datasetStartAngle : startAngle,
					endAngle: reset && animationOpts.animateRotate ? datasetStartAngle : endAngle,
					label: getValueAtIndexOrDefault(labels, index, labels[index])
				}
			});

			// Apply border and fill style
			me.removeHoverStyle(arc);

			arc.pivot();
		},

		removeHoverStyle: function(arc) {
			Chart.DatasetController.prototype.removeHoverStyle.call(this, arc, this.chart.options.elements.arc);
		},

		countVisibleElements: function() {
			var dataset = this.getDataset();
			var meta = this.getMeta();
			var count = 0;

			helpers.each(meta.data, function(element, index) {
				if (!isNaN(dataset.data[index]) && !element.hidden) {
					count++;
				}
			});

			return count;
		},

		calculateCircumference: function(value) {
			var count = this.getMeta().count;
			if (count > 0 && !isNaN(value)) {
				return (2 * Math.PI) / count;
			} else {
				return 0;
			}
		}
	});
};

},{}],20:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.radar = {
		scale: {
			type: "radialLinear"
		},
		elements: {
			line: {
				tension: 0 // no bezier in radar
			}
		}
	};

	Chart.controllers.radar = Chart.DatasetController.extend({

		datasetElementType: Chart.elements.Line,

		dataElementType: Chart.elements.Point,

		linkScales: helpers.noop,

		addElementAndReset: function(index) {
			Chart.DatasetController.prototype.addElementAndReset.call(this, index);

			// Make sure bezier control points are updated
			this.updateBezierControlPoints();
		},

		update: function(reset) {
			var me = this;
			var meta = me.getMeta();
			var line = meta.dataset;
			var points = meta.data;
			var custom = line.custom || {};
			var dataset = me.getDataset();
			var lineElementOptions = me.chart.options.elements.line;
			var scale = me.chart.scale;

			// Compatibility: If the properties are defined with only the old name, use those values
			if ((dataset.tension !== undefined) && (dataset.lineTension === undefined)) {
				dataset.lineTension = dataset.tension;
			}

			helpers.extend(meta.dataset, {
				// Utility
				_datasetIndex: me.index,
				// Data
				_children: points,
				_loop: true,
				// Model
				_model: {
					// Appearance
					tension: custom.tension ? custom.tension : helpers.getValueOrDefault(dataset.lineTension, lineElementOptions.tension),
					backgroundColor: custom.backgroundColor ? custom.backgroundColor : (dataset.backgroundColor || lineElementOptions.backgroundColor),
					borderWidth: custom.borderWidth ? custom.borderWidth : (dataset.borderWidth || lineElementOptions.borderWidth),
					borderColor: custom.borderColor ? custom.borderColor : (dataset.borderColor || lineElementOptions.borderColor),
					fill: custom.fill ? custom.fill : (dataset.fill !== undefined ? dataset.fill : lineElementOptions.fill),
					borderCapStyle: custom.borderCapStyle ? custom.borderCapStyle : (dataset.borderCapStyle || lineElementOptions.borderCapStyle),
					borderDash: custom.borderDash ? custom.borderDash : (dataset.borderDash || lineElementOptions.borderDash),
					borderDashOffset: custom.borderDashOffset ? custom.borderDashOffset : (dataset.borderDashOffset || lineElementOptions.borderDashOffset),
					borderJoinStyle: custom.borderJoinStyle ? custom.borderJoinStyle : (dataset.borderJoinStyle || lineElementOptions.borderJoinStyle),

					// Scale
					scaleTop: scale.top,
					scaleBottom: scale.bottom,
					scaleZero: scale.getBasePosition()
				}
			});

			meta.dataset.pivot();

			// Update Points
			helpers.each(points, function(point, index) {
				me.updateElement(point, index, reset);
			}, me);


			// Update bezier control points
			me.updateBezierControlPoints();
		},
		updateElement: function(point, index, reset) {
			var me = this;
			var custom = point.custom || {};
			var dataset = me.getDataset();
			var scale = me.chart.scale;
			var pointElementOptions = me.chart.options.elements.point;
			var pointPosition = scale.getPointPositionForValue(index, dataset.data[index]);

			helpers.extend(point, {
				// Utility
				_datasetIndex: me.index,
				_index: index,
				_scale: scale,

				// Desired view properties
				_model: {
					x: reset ? scale.xCenter : pointPosition.x, // value not used in dataset scale, but we want a consistent API between scales
					y: reset ? scale.yCenter : pointPosition.y,

					// Appearance
					tension: custom.tension ? custom.tension : helpers.getValueOrDefault(dataset.tension, me.chart.options.elements.line.tension),
					radius: custom.radius ? custom.radius : helpers.getValueAtIndexOrDefault(dataset.pointRadius, index, pointElementOptions.radius),
					backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, pointElementOptions.backgroundColor),
					borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.pointBorderColor, index, pointElementOptions.borderColor),
					borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, pointElementOptions.borderWidth),
					pointStyle: custom.pointStyle ? custom.pointStyle : helpers.getValueAtIndexOrDefault(dataset.pointStyle, index, pointElementOptions.pointStyle),

					// Tooltip
					hitRadius: custom.hitRadius ? custom.hitRadius : helpers.getValueAtIndexOrDefault(dataset.hitRadius, index, pointElementOptions.hitRadius)
				}
			});

			point._model.skip = custom.skip ? custom.skip : (isNaN(point._model.x) || isNaN(point._model.y));
		},
		updateBezierControlPoints: function() {
			var chartArea = this.chart.chartArea;
			var meta = this.getMeta();

			helpers.each(meta.data, function(point, index) {
				var model = point._model;
				var controlPoints = helpers.splineCurve(
					helpers.previousItem(meta.data, index, true)._model,
					model,
					helpers.nextItem(meta.data, index, true)._model,
					model.tension
				);

				// Prevent the bezier going outside of the bounds of the graph
				model.controlPointPreviousX = Math.max(Math.min(controlPoints.previous.x, chartArea.right), chartArea.left);
				model.controlPointPreviousY = Math.max(Math.min(controlPoints.previous.y, chartArea.bottom), chartArea.top);

				model.controlPointNextX = Math.max(Math.min(controlPoints.next.x, chartArea.right), chartArea.left);
				model.controlPointNextY = Math.max(Math.min(controlPoints.next.y, chartArea.bottom), chartArea.top);

				// Now pivot the point for animation
				point.pivot();
			});
		},

		draw: function(ease) {
			var meta = this.getMeta();
			var easingDecimal = ease || 1;

			// Transition Point Locations
			helpers.each(meta.data, function(point) {
				point.transition(easingDecimal);
			});

			// Transition and Draw the line
			meta.dataset.transition(easingDecimal).draw();

			// Draw the points
			helpers.each(meta.data, function(point) {
				point.draw();
			});
		},

		setHoverStyle: function(point) {
			// Point
			var dataset = this.chart.data.datasets[point._datasetIndex];
			var custom = point.custom || {};
			var index = point._index;
			var model = point._model;

			model.radius = custom.hoverRadius ? custom.hoverRadius : helpers.getValueAtIndexOrDefault(dataset.pointHoverRadius, index, this.chart.options.elements.point.hoverRadius);
			model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointHoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
			model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderColor, index, helpers.getHoverColor(model.borderColor));
			model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderWidth, index, model.borderWidth);
		},

		removeHoverStyle: function(point) {
			var dataset = this.chart.data.datasets[point._datasetIndex];
			var custom = point.custom || {};
			var index = point._index;
			var model = point._model;
			var pointElementOptions = this.chart.options.elements.point;

			model.radius = custom.radius ? custom.radius : helpers.getValueAtIndexOrDefault(dataset.radius, index, pointElementOptions.radius);
			model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, pointElementOptions.backgroundColor);
			model.borderColor = custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.pointBorderColor, index, pointElementOptions.borderColor);
			model.borderWidth = custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, pointElementOptions.borderWidth);
		}
	});
};

},{}],21:[function(require,module,exports){
/*global window: false */
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.global.animation = {
		duration: 1000,
		easing: "easeOutQuart",
		onProgress: helpers.noop,
		onComplete: helpers.noop
	};

	Chart.Animation = Chart.Element.extend({
		currentStep: null, // the current animation step
		numSteps: 60, // default number of steps
		easing: "", // the easing to use for this animation
		render: null, // render function used by the animation service

		onAnimationProgress: null, // user specified callback to fire on each step of the animation
		onAnimationComplete: null // user specified callback to fire when the animation finishes
	});

	Chart.animationService = {
		frameDuration: 17,
		animations: [],
		dropFrames: 0,
		request: null,
		addAnimation: function(chartInstance, animationObject, duration, lazy) {
			var me = this;

			if (!lazy) {
				chartInstance.animating = true;
			}

			for (var index = 0; index < me.animations.length; ++index) {
				if (me.animations[index].chartInstance === chartInstance) {
					// replacing an in progress animation
					me.animations[index].animationObject = animationObject;
					return;
				}
			}

			me.animations.push({
				chartInstance: chartInstance,
				animationObject: animationObject
			});

			// If there are no animations queued, manually kickstart a digest, for lack of a better word
			if (me.animations.length === 1) {
				me.requestAnimationFrame();
			}
		},
		// Cancel the animation for a given chart instance
		cancelAnimation: function(chartInstance) {
			var index = helpers.findIndex(this.animations, function(animationWrapper) {
				return animationWrapper.chartInstance === chartInstance;
			});

			if (index !== -1) {
				this.animations.splice(index, 1);
				chartInstance.animating = false;
			}
		},
		requestAnimationFrame: function() {
			var me = this;
			if (me.request === null) {
				// Skip animation frame requests until the active one is executed.
				// This can happen when processing mouse events, e.g. 'mousemove'
				// and 'mouseout' events will trigger multiple renders.
				me.request = helpers.requestAnimFrame.call(window, function() {
					me.request = null;
					me.startDigest();
				});
			}
		},
		startDigest: function() {
			var me = this;

			var startTime = Date.now();
			var framesToDrop = 0;

			if (me.dropFrames > 1) {
				framesToDrop = Math.floor(me.dropFrames);
				me.dropFrames = me.dropFrames % 1;
			}

			var i = 0;
			while (i < me.animations.length) {
				if (me.animations[i].animationObject.currentStep === null) {
					me.animations[i].animationObject.currentStep = 0;
				}

				me.animations[i].animationObject.currentStep += 1 + framesToDrop;

				if (me.animations[i].animationObject.currentStep > me.animations[i].animationObject.numSteps) {
					me.animations[i].animationObject.currentStep = me.animations[i].animationObject.numSteps;
				}

				me.animations[i].animationObject.render(me.animations[i].chartInstance, me.animations[i].animationObject);
				if (me.animations[i].animationObject.onAnimationProgress && me.animations[i].animationObject.onAnimationProgress.call) {
					me.animations[i].animationObject.onAnimationProgress.call(me.animations[i].chartInstance, me.animations[i]);
				}

				if (me.animations[i].animationObject.currentStep === me.animations[i].animationObject.numSteps) {
					if (me.animations[i].animationObject.onAnimationComplete && me.animations[i].animationObject.onAnimationComplete.call) {
						me.animations[i].animationObject.onAnimationComplete.call(me.animations[i].chartInstance, me.animations[i]);
					}

					// executed the last frame. Remove the animation.
					me.animations[i].chartInstance.animating = false;

					me.animations.splice(i, 1);
				} else {
					++i;
				}
			}

			var endTime = Date.now();
			var dropFrames = (endTime - startTime) / me.frameDuration;

			me.dropFrames += dropFrames;

			// Do we have more stuff to animate?
			if (me.animations.length > 0) {
				me.requestAnimationFrame();
			}
		}
	};
};
},{}],22:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {
	// Global Chart canvas helpers object for drawing items to canvas
	var helpers = Chart.canvasHelpers = {};

	helpers.drawPoint = function(ctx, pointStyle, radius, x, y) {
		var type, edgeLength, xOffset, yOffset, height, size;

		if (typeof pointStyle === 'object') {
			type = pointStyle.toString();
			if (type === '[object HTMLImageElement]' || type === '[object HTMLCanvasElement]') {
				ctx.drawImage(pointStyle, x - pointStyle.width / 2, y - pointStyle.height / 2);
				return;
			}
		}

		if (isNaN(radius) || radius <= 0) {
			return;
		}

		switch (pointStyle) {
		// Default includes circle
		default:
			ctx.beginPath();
			ctx.arc(x, y, radius, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
			break;
		case 'triangle':
			ctx.beginPath();
			edgeLength = 3 * radius / Math.sqrt(3);
			height = edgeLength * Math.sqrt(3) / 2;
			ctx.moveTo(x - edgeLength / 2, y + height / 3);
			ctx.lineTo(x + edgeLength / 2, y + height / 3);
			ctx.lineTo(x, y - 2 * height / 3);
			ctx.closePath();
			ctx.fill();
			break;
		case 'rect':
			size = 1 / Math.SQRT2 * radius;
			ctx.beginPath();
			ctx.fillRect(x - size, y - size, 2 * size,  2 * size);
			ctx.strokeRect(x - size, y - size, 2 * size, 2 * size);
			break;
		case 'rectRot':
			size = 1 / Math.SQRT2 * radius;
			ctx.beginPath();
			ctx.moveTo(x - size, y);
			ctx.lineTo(x, y + size);
			ctx.lineTo(x + size, y);
			ctx.lineTo(x, y - size);
			ctx.closePath();
			ctx.fill();
			break;
		case 'cross':
			ctx.beginPath();
			ctx.moveTo(x, y + radius);
			ctx.lineTo(x, y - radius);
			ctx.moveTo(x - radius, y);
			ctx.lineTo(x + radius, y);
			ctx.closePath();
			break;
		case 'crossRot':
			ctx.beginPath();
			xOffset = Math.cos(Math.PI / 4) * radius;
			yOffset = Math.sin(Math.PI / 4) * radius;
			ctx.moveTo(x - xOffset, y - yOffset);
			ctx.lineTo(x + xOffset, y + yOffset);
			ctx.moveTo(x - xOffset, y + yOffset);
			ctx.lineTo(x + xOffset, y - yOffset);
			ctx.closePath();
			break;
		case 'star':
			ctx.beginPath();
			ctx.moveTo(x, y + radius);
			ctx.lineTo(x, y - radius);
			ctx.moveTo(x - radius, y);
			ctx.lineTo(x + radius, y);
			xOffset = Math.cos(Math.PI / 4) * radius;
			yOffset = Math.sin(Math.PI / 4) * radius;
			ctx.moveTo(x - xOffset, y - yOffset);
			ctx.lineTo(x + xOffset, y + yOffset);
			ctx.moveTo(x - xOffset, y + yOffset);
			ctx.lineTo(x + xOffset, y - yOffset);
			ctx.closePath();
			break;
		case 'line':
			ctx.beginPath();
			ctx.moveTo(x - radius, y);
			ctx.lineTo(x + radius, y);
			ctx.closePath();
			break;
		case 'dash':
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + radius, y);
			ctx.closePath();
			break;
		}

		ctx.stroke();
	};
};
},{}],23:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;
	//Create a dictionary of chart types, to allow for extension of existing types
	Chart.types = {};

	//Store a reference to each instance - allowing us to globally resize chart instances on window resize.
	//Destroy method on the chart will remove the instance of the chart from this reference.
	Chart.instances = {};

	// Controllers available for dataset visualization eg. bar, line, slice, etc.
	Chart.controllers = {};

	/**
	 * @class Chart.Controller
	 * The main controller of a chart.
	 */
	Chart.Controller = function(instance) {

		this.chart = instance;
		this.config = instance.config;
		this.options = this.config.options = helpers.configMerge(Chart.defaults.global, Chart.defaults[this.config.type], this.config.options || {});
		this.id = helpers.uid();

		Object.defineProperty(this, 'data', {
			get: function() {
				return this.config.data;
			}
		});

		//Add the chart instance to the global namespace
		Chart.instances[this.id] = this;

		if (this.options.responsive) {
			// Silent resize before chart draws
			this.resize(true);
		}

		this.initialize();

		return this;
	};

	helpers.extend(Chart.Controller.prototype, /** @lends Chart.Controller */ {

		initialize: function() {
			var me = this;
			// Before init plugin notification
			Chart.plugins.notify('beforeInit', [me]);

			me.bindEvents();

			// Make sure controllers are built first so that each dataset is bound to an axis before the scales
			// are built
			me.ensureScalesHaveIDs();
			me.buildOrUpdateControllers();
			me.buildScales();
			me.updateLayout();
			me.resetElements();
			me.initToolTip();
			me.update();

			// After init plugin notification
			Chart.plugins.notify('afterInit', [me]);

			return me;
		},

		clear: function() {
			helpers.clear(this.chart);
			return this;
		},

		stop: function() {
			// Stops any current animation loop occuring
			Chart.animationService.cancelAnimation(this);
			return this;
		},

		resize: function resize(silent) {
			var me = this;
			var chart = me.chart;
			var canvas = chart.canvas;
			var newWidth = helpers.getMaximumWidth(canvas);
			var aspectRatio = chart.aspectRatio;
			var newHeight = (me.options.maintainAspectRatio && isNaN(aspectRatio) === false && isFinite(aspectRatio) && aspectRatio !== 0) ? newWidth / aspectRatio : helpers.getMaximumHeight(canvas);

			var sizeChanged = chart.width !== newWidth || chart.height !== newHeight;

			if (!sizeChanged) {
				return me;
			}

			canvas.width = chart.width = newWidth;
			canvas.height = chart.height = newHeight;

			helpers.retinaScale(chart);

			// Notify any plugins about the resize
			var newSize = { width: newWidth, height: newHeight };
			Chart.plugins.notify('resize', [me, newSize]);

			// Notify of resize
			if (me.options.onResize) {
				me.options.onResize(me, newSize);
			}

			if (!silent) {
				me.stop();
				me.update(me.options.responsiveAnimationDuration);
			}

			return me;
		},

		ensureScalesHaveIDs: function() {
			var options = this.options;
			var scalesOptions = options.scales || {};
			var scaleOptions = options.scale;

			helpers.each(scalesOptions.xAxes, function(xAxisOptions, index) {
				xAxisOptions.id = xAxisOptions.id || ('x-axis-' + index);
			});

			helpers.each(scalesOptions.yAxes, function(yAxisOptions, index) {
				yAxisOptions.id = yAxisOptions.id || ('y-axis-' + index);
			});

			if (scaleOptions) {
				scaleOptions.id = scaleOptions.id || 'scale';
			}
		},

		/**
		 * Builds a map of scale ID to scale object for future lookup.
		 */
		buildScales: function() {
			var me = this;
			var options = me.options;
			var scales = me.scales = {};
			var items = [];

			if (options.scales) {
				items = items.concat(
					(options.scales.xAxes || []).map(function(xAxisOptions) {
						return { options: xAxisOptions, dtype: 'category' }; }),
					(options.scales.yAxes || []).map(function(yAxisOptions) {
						return { options: yAxisOptions, dtype: 'linear' }; }));
			}

			if (options.scale) {
				items.push({ options: options.scale, dtype: 'radialLinear', isDefault: true });
			}

			helpers.each(items, function(item) {
				var scaleOptions = item.options;
				var scaleType = helpers.getValueOrDefault(scaleOptions.type, item.dtype);
				var scaleClass = Chart.scaleService.getScaleConstructor(scaleType);
				if (!scaleClass) {
					return;
				}

				var scale = new scaleClass({
					id: scaleOptions.id,
					options: scaleOptions,
					ctx: me.chart.ctx,
					chart: me
				});

				scales[scale.id] = scale;

				// TODO(SB): I think we should be able to remove this custom case (options.scale)
				// and consider it as a regular scale part of the "scales"" map only! This would
				// make the logic easier and remove some useless? custom code.
				if (item.isDefault) {
					me.scale = scale;
				}
			});

			Chart.scaleService.addScalesToLayout(this);
		},

		updateLayout: function() {
			Chart.layoutService.update(this, this.chart.width, this.chart.height);
		},

		buildOrUpdateControllers: function() {
			var me = this;
			var types = [];
			var newControllers = [];

			helpers.each(me.data.datasets, function(dataset, datasetIndex) {
				var meta = me.getDatasetMeta(datasetIndex);
				if (!meta.type) {
					meta.type = dataset.type || me.config.type;
				}

				types.push(meta.type);

				if (meta.controller) {
					meta.controller.updateIndex(datasetIndex);
				} else {
					meta.controller = new Chart.controllers[meta.type](me, datasetIndex);
					newControllers.push(meta.controller);
				}
			}, me);

			if (types.length > 1) {
				for (var i = 1; i < types.length; i++) {
					if (types[i] !== types[i - 1]) {
						me.isCombo = true;
						break;
					}
				}
			}

			return newControllers;
		},

		resetElements: function() {
			var me = this;
			helpers.each(me.data.datasets, function(dataset, datasetIndex) {
				me.getDatasetMeta(datasetIndex).controller.reset();
			}, me);
		},

		update: function update(animationDuration, lazy) {
			var me = this;
			Chart.plugins.notify('beforeUpdate', [me]);

			// In case the entire data object changed
			me.tooltip._data = me.data;

			// Make sure dataset controllers are updated and new controllers are reset
			var newControllers = me.buildOrUpdateControllers();

			// Make sure all dataset controllers have correct meta data counts
			helpers.each(me.data.datasets, function(dataset, datasetIndex) {
				me.getDatasetMeta(datasetIndex).controller.buildOrUpdateElements();
			}, me);

			Chart.layoutService.update(me, me.chart.width, me.chart.height);

			// Apply changes to the dataets that require the scales to have been calculated i.e BorderColor chages
			Chart.plugins.notify('afterScaleUpdate', [me]);

			// Can only reset the new controllers after the scales have been updated
			helpers.each(newControllers, function(controller) {
				controller.reset();
			});

			me.updateDatasets();

			// Do this before render so that any plugins that need final scale updates can use it
			Chart.plugins.notify('afterUpdate', [me]);

			me.render(animationDuration, lazy);
		},

		/**
		 * @method beforeDatasetsUpdate
		 * @description Called before all datasets are updated. If a plugin returns false,
		 * the datasets update will be cancelled until another chart update is triggered.
		 * @param {Object} instance the chart instance being updated.
		 * @returns {Boolean} false to cancel the datasets update.
		 * @memberof Chart.PluginBase
		 * @since version 2.1.5
		 * @instance
		 */

		/**
		 * @method afterDatasetsUpdate
		 * @description Called after all datasets have been updated. Note that this
		 * extension will not be called if the datasets update has been cancelled.
		 * @param {Object} instance the chart instance being updated.
		 * @memberof Chart.PluginBase
		 * @since version 2.1.5
		 * @instance
		 */

		/**
		 * Updates all datasets unless a plugin returns false to the beforeDatasetsUpdate
		 * extension, in which case no datasets will be updated and the afterDatasetsUpdate
		 * notification will be skipped.
		 * @protected
		 * @instance
		 */
		updateDatasets: function() {
			var me = this;
			var i, ilen;

			if (Chart.plugins.notify('beforeDatasetsUpdate', [ me ])) {
				for (i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
					me.getDatasetMeta(i).controller.update();
				}

				Chart.plugins.notify('afterDatasetsUpdate', [ me ]);
			}
		},

		render: function render(duration, lazy) {
			var me = this;
			Chart.plugins.notify('beforeRender', [me]);

			var animationOptions = me.options.animation;
			if (animationOptions && ((typeof duration !== 'undefined' && duration !== 0) || (typeof duration === 'undefined' && animationOptions.duration !== 0))) {
				var animation = new Chart.Animation();
				animation.numSteps = (duration || animationOptions.duration) / 16.66; //60 fps
				animation.easing = animationOptions.easing;

				// render function
				animation.render = function(chartInstance, animationObject) {
					var easingFunction = helpers.easingEffects[animationObject.easing];
					var stepDecimal = animationObject.currentStep / animationObject.numSteps;
					var easeDecimal = easingFunction(stepDecimal);

					chartInstance.draw(easeDecimal, stepDecimal, animationObject.currentStep);
				};

				// user events
				animation.onAnimationProgress = animationOptions.onProgress;
				animation.onAnimationComplete = animationOptions.onComplete;

				Chart.animationService.addAnimation(me, animation, duration, lazy);
			} else {
				me.draw();
				if (animationOptions && animationOptions.onComplete && animationOptions.onComplete.call) {
					animationOptions.onComplete.call(me);
				}
			}
			return me;
		},

		draw: function(ease) {
			var me = this;
			var easingDecimal = ease || 1;
			me.clear();

			Chart.plugins.notify('beforeDraw', [me, easingDecimal]);

			// Draw all the scales
			helpers.each(me.boxes, function(box) {
				box.draw(me.chartArea);
			}, me);
			if (me.scale) {
				me.scale.draw();
			}

			Chart.plugins.notify('beforeDatasetsDraw', [me, easingDecimal]);

			// Draw each dataset via its respective controller (reversed to support proper line stacking)
			helpers.each(me.data.datasets, function(dataset, datasetIndex) {
				if (me.isDatasetVisible(datasetIndex)) {
					me.getDatasetMeta(datasetIndex).controller.draw(ease);
				}
			}, me, true);

			Chart.plugins.notify('afterDatasetsDraw', [me, easingDecimal]);

			// Finally draw the tooltip
			me.tooltip.transition(easingDecimal).draw();

			Chart.plugins.notify('afterDraw', [me, easingDecimal]);
		},

		// Get the single element that was clicked on
		// @return : An object containing the dataset index and element index of the matching element. Also contains the rectangle that was draw
		getElementAtEvent: function(e) {
			var me = this;
			var eventPosition = helpers.getRelativePosition(e, me.chart);
			var elementsArray = [];

			helpers.each(me.data.datasets, function(dataset, datasetIndex) {
				if (me.isDatasetVisible(datasetIndex)) {
					var meta = me.getDatasetMeta(datasetIndex);
					helpers.each(meta.data, function(element) {
						if (element.inRange(eventPosition.x, eventPosition.y)) {
							elementsArray.push(element);
							return elementsArray;
						}
					});
				}
			});

			return elementsArray.slice(0, 1);
		},

		getElementsAtEvent: function(e) {
			var me = this;
			var eventPosition = helpers.getRelativePosition(e, me.chart);
			var elementsArray = [];

			var found = (function() {
				if (me.data.datasets) {
					for (var i = 0; i < me.data.datasets.length; i++) {
						var meta = me.getDatasetMeta(i);
						if (me.isDatasetVisible(i)) {
							for (var j = 0; j < meta.data.length; j++) {
								if (meta.data[j].inRange(eventPosition.x, eventPosition.y)) {
									return meta.data[j];
								}
							}
						}
					}
				}
			}).call(me);

			if (!found) {
				return elementsArray;
			}

			helpers.each(me.data.datasets, function(dataset, datasetIndex) {
				if (me.isDatasetVisible(datasetIndex)) {
					var meta = me.getDatasetMeta(datasetIndex),
						element = meta.data[found._index];
					if(element && !element._view.skip){
						elementsArray.push(element);
					}
				}
			}, me);

			return elementsArray;
		},

		getElementsAtXAxis: function(e) {
			var me = this;
			var eventPosition = helpers.getRelativePosition(e, me.chart);
			var elementsArray = [];

			var found = (function() {
				if (me.data.datasets) {
					for (var i = 0; i < me.data.datasets.length; i++) {
						var meta = me.getDatasetMeta(i);
						if (me.isDatasetVisible(i)) {
							for (var j = 0; j < meta.data.length; j++) {
								if (meta.data[j].inLabelRange(eventPosition.x, eventPosition.y)) {
									return meta.data[j];
								}
							}
						}
					}
				}
			}).call(me);

			if (!found) {
				return elementsArray;
			}

			helpers.each(me.data.datasets, function(dataset, datasetIndex) {
				if (me.isDatasetVisible(datasetIndex)) {
					var meta = me.getDatasetMeta(datasetIndex);
					var index = helpers.findIndex(meta.data, function (it) {
						return found._model.x === it._model.x;
					});
					if(index !== -1 && !meta.data[index]._view.skip) {
						elementsArray.push(meta.data[index]);
					}
				}
			}, me);

			return elementsArray;
		},		

		getElementsAtEventForMode: function(e, mode) {
			var me = this;
			switch (mode) {
			case 'single':
				return me.getElementAtEvent(e);
			case 'label':
				return me.getElementsAtEvent(e);
			case 'dataset':
				return me.getDatasetAtEvent(e);
            case 'x-axis':
                return me.getElementsAtXAxis(e);
			default:
				return e;
			}
		},

		getDatasetAtEvent: function(e) {
			var elementsArray = this.getElementAtEvent(e);

			if (elementsArray.length > 0) {
				elementsArray = this.getDatasetMeta(elementsArray[0]._datasetIndex).data;
			}

			return elementsArray;
		},

		getDatasetMeta: function(datasetIndex) {
			var me = this;
			var dataset = me.data.datasets[datasetIndex];
			if (!dataset._meta) {
				dataset._meta = {};
			}

			var meta = dataset._meta[me.id];
			if (!meta) {
				meta = dataset._meta[me.id] = {
				type: null,
				data: [],
				dataset: null,
				controller: null,
				hidden: null,			// See isDatasetVisible() comment
				xAxisID: null,
				yAxisID: null
			};
			}

			return meta;
		},

		getVisibleDatasetCount: function() {
			var count = 0;
			for (var i = 0, ilen = this.data.datasets.length; i<ilen; ++i) {
				 if (this.isDatasetVisible(i)) {
					count++;
				}
			}
			return count;
		},

		isDatasetVisible: function(datasetIndex) {
			var meta = this.getDatasetMeta(datasetIndex);

			// meta.hidden is a per chart dataset hidden flag override with 3 states: if true or false,
			// the dataset.hidden value is ignored, else if null, the dataset hidden state is returned.
			return typeof meta.hidden === 'boolean'? !meta.hidden : !this.data.datasets[datasetIndex].hidden;
		},

		generateLegend: function() {
			return this.options.legendCallback(this);
		},

		destroy: function() {
			var me = this;
			me.stop();
			me.clear();
			helpers.unbindEvents(me, me.events);
			helpers.removeResizeListener(me.chart.canvas.parentNode);

			// Reset canvas height/width attributes
			var canvas = me.chart.canvas;
			canvas.width = me.chart.width;
			canvas.height = me.chart.height;

			// if we scaled the canvas in response to a devicePixelRatio !== 1, we need to undo that transform here
			if (me.chart.originalDevicePixelRatio !== undefined) {
				me.chart.ctx.scale(1 / me.chart.originalDevicePixelRatio, 1 / me.chart.originalDevicePixelRatio);
			}

			// Reset to the old style since it may have been changed by the device pixel ratio changes
			canvas.style.width = me.chart.originalCanvasStyleWidth;
			canvas.style.height = me.chart.originalCanvasStyleHeight;

			Chart.plugins.notify('destroy', [me]);

			delete Chart.instances[me.id];
		},

		toBase64Image: function() {
			return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments);
		},

		initToolTip: function() {
			var me = this;
			me.tooltip = new Chart.Tooltip({
				_chart: me.chart,
				_chartInstance: me,
				_data: me.data,
				_options: me.options.tooltips
			}, me);
		},

		bindEvents: function() {
			var me = this;
			helpers.bindEvents(me, me.options.events, function(evt) {
				me.eventHandler(evt);
			});
		},

		updateHoverStyle: function(elements, mode, enabled) {
			var method = enabled? 'setHoverStyle' : 'removeHoverStyle';
			var element, i, ilen;

			switch (mode) {
			case 'single':
				elements = [ elements[0] ];
				break;
			case 'label':
			case 'dataset':
            case 'x-axis':
				// elements = elements;
				break;
			default:
				// unsupported mode
				return;
			}

			for (i=0, ilen=elements.length; i<ilen; ++i) {
				element = elements[i];
				if (element) {
					this.getDatasetMeta(element._datasetIndex).controller[method](element);
				}
			}
		},

		eventHandler: function eventHandler(e) {
			var me = this;
			var tooltip = me.tooltip;
			var options = me.options || {};
			var hoverOptions = options.hover;
			var tooltipsOptions = options.tooltips;

			me.lastActive = me.lastActive || [];
			me.lastTooltipActive = me.lastTooltipActive || [];

			// Find Active Elements for hover and tooltips
			if (e.type === 'mouseout') {
				me.active = [];
				me.tooltipActive = [];
			} else {
				me.active = me.getElementsAtEventForMode(e, hoverOptions.mode);
				me.tooltipActive =  me.getElementsAtEventForMode(e, tooltipsOptions.mode);
			}

			// On Hover hook
			if (hoverOptions.onHover) {
				hoverOptions.onHover.call(me, me.active);
			}

			if (e.type === 'mouseup' || e.type === 'click') {
				if (options.onClick) {
					options.onClick.call(me, e, me.active);
				}
				if (me.legend && me.legend.handleEvent) {
					me.legend.handleEvent(e);
				}
			}

			// Remove styling for last active (even if it may still be active)
			if (me.lastActive.length) {
				me.updateHoverStyle(me.lastActive, hoverOptions.mode, false);
			}

			// Built in hover styling
			if (me.active.length && hoverOptions.mode) {
				me.updateHoverStyle(me.active, hoverOptions.mode, true);
			}

			// Built in Tooltips
			if (tooltipsOptions.enabled || tooltipsOptions.custom) {
				tooltip.initialize();
				tooltip._active = me.tooltipActive;
				tooltip.update(true);
			}

			// Hover animations
			tooltip.pivot();

			if (!me.animating) {
				// If entering, leaving, or changing elements, animate the change via pivot
				if (!helpers.arrayEquals(me.active, me.lastActive) ||
					!helpers.arrayEquals(me.tooltipActive, me.lastTooltipActive)) {

					me.stop();

					if (tooltipsOptions.enabled || tooltipsOptions.custom) {
						tooltip.update(true);
					}

					// We only need to render at this point. Updating will cause scales to be
					// recomputed generating flicker & using more memory than necessary.
					me.render(hoverOptions.animationDuration, true);
				}
			}

			// Remember Last Actives
			me.lastActive = me.active;
			me.lastTooltipActive = me.tooltipActive;
			return me;
		}
	});
};

},{}],24:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;
	var noop = helpers.noop;

	// Base class for all dataset controllers (line, bar, etc)
	Chart.DatasetController = function(chart, datasetIndex) {
		this.initialize.call(this, chart, datasetIndex);
	};

	helpers.extend(Chart.DatasetController.prototype, {

		/**
		 * Element type used to generate a meta dataset (e.g. Chart.element.Line).
		 * @type {Chart.core.element}
		 */
		datasetElementType: null,

		/**
		 * Element type used to generate a meta data (e.g. Chart.element.Point).
		 * @type {Chart.core.element}
		 */
		dataElementType: null,

		initialize: function(chart, datasetIndex) {
			var me = this;
			me.chart = chart;
			me.index = datasetIndex;
			me.linkScales();
			me.addElements();
		},

		updateIndex: function(datasetIndex) {
			this.index = datasetIndex;
		},

		linkScales: function() {
			var me = this;
			var meta = me.getMeta();
			var dataset = me.getDataset();

			if (meta.xAxisID === null) {
				meta.xAxisID = dataset.xAxisID || me.chart.options.scales.xAxes[0].id;
			}
			if (meta.yAxisID === null) {
				meta.yAxisID = dataset.yAxisID || me.chart.options.scales.yAxes[0].id;
			}
		},

		getDataset: function() {
			return this.chart.data.datasets[this.index];
		},

		getMeta: function() {
			return this.chart.getDatasetMeta(this.index);
		},

		getScaleForId: function(scaleID) {
			return this.chart.scales[scaleID];
		},

		reset: function() {
			this.update(true);
		},

		createMetaDataset: function() {
			var me = this;
			var type = me.datasetElementType;
			return type && new type({
				_chart: me.chart.chart,
				_datasetIndex: me.index
			});
		},

		createMetaData: function(index) {
			var me = this;
			var type = me.dataElementType;
			return type && new type({
				_chart: me.chart.chart,
				_datasetIndex: me.index,
				_index: index
			});
		},

		addElements: function() {
			var me = this;
			var meta = me.getMeta();
			var data = me.getDataset().data || [];
			var metaData = meta.data;
			var i, ilen;

			for (i=0, ilen=data.length; i<ilen; ++i) {
				metaData[i] = metaData[i] || me.createMetaData(meta, i);
			}

			meta.dataset = meta.dataset || me.createMetaDataset();
		},

		addElementAndReset: function(index) {
			var me = this;
			var element = me.createMetaData(index);
			me.getMeta().data.splice(index, 0, element);
			me.updateElement(element, index, true);
		},

		buildOrUpdateElements: function() {
			// Handle the number of data points changing
			var meta = this.getMeta(),
				md = meta.data,
				numData = this.getDataset().data.length,
				numMetaData = md.length;

			// Make sure that we handle number of datapoints changing
			if (numData < numMetaData) {
				// Remove excess bars for data points that have been removed
				md.splice(numData, numMetaData - numData);
			} else if (numData > numMetaData) {
				// Add new elements
				for (var index = numMetaData; index < numData; ++index) {
					this.addElementAndReset(index);
				}
			}
		},

		update: noop,

		draw: function(ease) {
			var easingDecimal = ease || 1;
			helpers.each(this.getMeta().data, function(element) {
				element.transition(easingDecimal).draw();
			});
		},

		removeHoverStyle: function(element, elementOpts) {
			var dataset = this.chart.data.datasets[element._datasetIndex],
				index = element._index,
				custom = element.custom || {},
				valueOrDefault = helpers.getValueAtIndexOrDefault,
				model = element._model;

			model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : valueOrDefault(dataset.backgroundColor, index, elementOpts.backgroundColor);
			model.borderColor = custom.borderColor ? custom.borderColor : valueOrDefault(dataset.borderColor, index, elementOpts.borderColor);
			model.borderWidth = custom.borderWidth ? custom.borderWidth : valueOrDefault(dataset.borderWidth, index, elementOpts.borderWidth);
		},

		setHoverStyle: function(element) {
			var dataset = this.chart.data.datasets[element._datasetIndex],
				index = element._index,
				custom = element.custom || {},
				valueOrDefault = helpers.getValueAtIndexOrDefault,
				getHoverColor = helpers.getHoverColor,
				model = element._model;

			model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : valueOrDefault(dataset.hoverBackgroundColor, index, getHoverColor(model.backgroundColor));
			model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : valueOrDefault(dataset.hoverBorderColor, index, getHoverColor(model.borderColor));
			model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : valueOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
		}
		
    });
	

	Chart.DatasetController.extend = helpers.inherits;
};
},{}],25:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

  var helpers = Chart.helpers;

  Chart.elements = {};

  Chart.Element = function(configuration) {
    helpers.extend(this, configuration);
    this.initialize.apply(this, arguments);
  };

  helpers.extend(Chart.Element.prototype, {

    initialize: function() {
      this.hidden = false;
    },

    pivot: function() {
      var me = this;
      if (!me._view) {
        me._view = helpers.clone(me._model);
      }
      me._start = helpers.clone(me._view);
      return me;
    },

    transition: function(ease) {
      var me = this;
      
      if (!me._view) {
        me._view = helpers.clone(me._model);
      }

      // No animation -> No Transition
      if (ease === 1) {
        me._view = me._model;
        me._start = null;
        return me;
      }

      if (!me._start) {
        me.pivot();
      }

      helpers.each(me._model, function(value, key) {

        if (key[0] === '_') {
          // Only non-underscored properties
        }

        // Init if doesn't exist
        else if (!me._view.hasOwnProperty(key)) {
          if (typeof value === 'number' && !isNaN(me._view[key])) {
            me._view[key] = value * ease;
          } else {
            me._view[key] = value;
          }
        }

        // No unnecessary computations
        else if (value === me._view[key]) {
          // It's the same! Woohoo!
        }

        // Color transitions if possible
        else if (typeof value === 'string') {
          try {
            var color = helpers.color(me._model[key]).mix(helpers.color(me._start[key]), ease);
            me._view[key] = color.rgbString();
          } catch (err) {
            me._view[key] = value;
          }
        }
        // Number transitions
        else if (typeof value === 'number') {
          var startVal = me._start[key] !== undefined && isNaN(me._start[key]) === false ? me._start[key] : 0;
          me._view[key] = ((me._model[key] - startVal) * ease) + startVal;
        }
        // Everything else
        else {
          me._view[key] = value;
        }
      }, me);

      return me;
    },

    tooltipPosition: function() {
      return {
        x: this._model.x,
        y: this._model.y
      };
    },

    hasValue: function() {
      return helpers.isNumber(this._model.x) && helpers.isNumber(this._model.y);
    }
  });

  Chart.Element.extend = helpers.inherits;

};

},{}],26:[function(require,module,exports){
/*global window: false */
/*global document: false */
"use strict";

var color = require(3);

module.exports = function(Chart) {
	//Global Chart helpers object for utility methods and classes
	var helpers = Chart.helpers = {};

	//-- Basic js utility methods
	helpers.each = function(loopable, callback, self, reverse) {
		// Check to see if null or undefined firstly.
		var i, len;
		if (helpers.isArray(loopable)) {
			len = loopable.length;
			if (reverse) {
				for (i = len - 1; i >= 0; i--) {
					callback.call(self, loopable[i], i);
				}
			} else {
				for (i = 0; i < len; i++) {
					callback.call(self, loopable[i], i);
				}
			}
		} else if (typeof loopable === 'object') {
			var keys = Object.keys(loopable);
			len = keys.length;
			for (i = 0; i < len; i++) {
				callback.call(self, loopable[keys[i]], keys[i]);
			}
		}
	};
	helpers.clone = function(obj) {
		var objClone = {};
		helpers.each(obj, function(value, key) {
			if (helpers.isArray(value)) {
				objClone[key] = value.slice(0);
			} else if (typeof value === 'object' && value !== null) {
				objClone[key] = helpers.clone(value);
			} else {
				objClone[key] = value;
			}
		});
		return objClone;
	};
	helpers.extend = function(base) {
		var setFn = function(value, key) { base[key] = value; };
		for (var i = 1, ilen = arguments.length; i < ilen; i++) {
			helpers.each(arguments[i], setFn);
		}
		return base;
	};
	// Need a special merge function to chart configs since they are now grouped
	helpers.configMerge = function(_base) {
		var base = helpers.clone(_base);
		helpers.each(Array.prototype.slice.call(arguments, 1), function(extension) {
			helpers.each(extension, function(value, key) {
				if (key === 'scales') {
					// Scale config merging is complex. Add out own function here for that
					base[key] = helpers.scaleMerge(base.hasOwnProperty(key) ? base[key] : {}, value);

				} else if (key === 'scale') {
					// Used in polar area & radar charts since there is only one scale
					base[key] = helpers.configMerge(base.hasOwnProperty(key) ? base[key] : {}, Chart.scaleService.getScaleDefaults(value.type), value);
				} else if (base.hasOwnProperty(key) && helpers.isArray(base[key]) && helpers.isArray(value)) {
					// In this case we have an array of objects replacing another array. Rather than doing a strict replace,
					// merge. This allows easy scale option merging
					var baseArray = base[key];

					helpers.each(value, function(valueObj, index) {

						if (index < baseArray.length) {
							if (typeof baseArray[index] === 'object' && baseArray[index] !== null && typeof valueObj === 'object' && valueObj !== null) {
								// Two objects are coming together. Do a merge of them.
								baseArray[index] = helpers.configMerge(baseArray[index], valueObj);
							} else {
								// Just overwrite in this case since there is nothing to merge
								baseArray[index] = valueObj;
							}
						} else {
							baseArray.push(valueObj); // nothing to merge
						}
					});

				} else if (base.hasOwnProperty(key) && typeof base[key] === "object" && base[key] !== null && typeof value === "object") {
					// If we are overwriting an object with an object, do a merge of the properties.
					base[key] = helpers.configMerge(base[key], value);

				} else {
					// can just overwrite the value in this case
					base[key] = value;
				}
			});
		});

		return base;
	};
	helpers.scaleMerge = function(_base, extension) {
		var base = helpers.clone(_base);

		helpers.each(extension, function(value, key) {
			if (key === 'xAxes' || key === 'yAxes') {
				// These properties are arrays of items
				if (base.hasOwnProperty(key)) {
					helpers.each(value, function(valueObj, index) {
						var axisType = helpers.getValueOrDefault(valueObj.type, key === 'xAxes' ? 'category' : 'linear');
						var axisDefaults = Chart.scaleService.getScaleDefaults(axisType);
						if (index >= base[key].length || !base[key][index].type) {
							base[key].push(helpers.configMerge(axisDefaults, valueObj));
						} else if (valueObj.type && valueObj.type !== base[key][index].type) {
							// Type changed. Bring in the new defaults before we bring in valueObj so that valueObj can override the correct scale defaults
							base[key][index] = helpers.configMerge(base[key][index], axisDefaults, valueObj);
						} else {
							// Type is the same
							base[key][index] = helpers.configMerge(base[key][index], valueObj);
						}
					});
				} else {
					base[key] = [];
					helpers.each(value, function(valueObj) {
						var axisType = helpers.getValueOrDefault(valueObj.type, key === 'xAxes' ? 'category' : 'linear');
						base[key].push(helpers.configMerge(Chart.scaleService.getScaleDefaults(axisType), valueObj));
					});
				}
			} else if (base.hasOwnProperty(key) && typeof base[key] === "object" && base[key] !== null && typeof value === "object") {
				// If we are overwriting an object with an object, do a merge of the properties.
				base[key] = helpers.configMerge(base[key], value);

			} else {
				// can just overwrite the value in this case
				base[key] = value;
			}
		});

		return base;
	};
	helpers.getValueAtIndexOrDefault = function(value, index, defaultValue) {
		if (value === undefined || value === null) {
			return defaultValue;
		}

		if (helpers.isArray(value)) {
			return index < value.length ? value[index] : defaultValue;
		}

		return value;
	};
	helpers.getValueOrDefault = function(value, defaultValue) {
		return value === undefined ? defaultValue : value;
	};
	helpers.indexOf = Array.prototype.indexOf?
		function(array, item) { return array.indexOf(item); } :
		function(array, item) {
			for (var i = 0, ilen = array.length; i < ilen; ++i) {
				if (array[i] === item) {
					return i;
				}
			}
			return -1;
		};
	helpers.where = function(collection, filterCallback) {
		if (helpers.isArray(collection) && Array.prototype.filter) {
			return collection.filter(filterCallback);
		} else {
			var filtered = [];

			helpers.each(collection, function(item) {
				if (filterCallback(item)) {
					filtered.push(item);
				}
			});

			return filtered;
		}
	};
	helpers.findIndex = Array.prototype.findIndex?
		function(array, callback, scope) { return array.findIndex(callback, scope); } :
		function(array, callback, scope) {
			scope = scope === undefined? array : scope;
			for (var i = 0, ilen = array.length; i < ilen; ++i) {
				if (callback.call(scope, array[i], i, array)) {
					return i;
				}
			}
			return -1;
		};
	helpers.findNextWhere = function(arrayToSearch, filterCallback, startIndex) {
		// Default to start of the array
		if (startIndex === undefined || startIndex === null) {
			startIndex = -1;
		}
		for (var i = startIndex + 1; i < arrayToSearch.length; i++) {
			var currentItem = arrayToSearch[i];
			if (filterCallback(currentItem)) {
				return currentItem;
			}
		}
	};
	helpers.findPreviousWhere = function(arrayToSearch, filterCallback, startIndex) {
		// Default to end of the array
		if (startIndex === undefined || startIndex === null) {
			startIndex = arrayToSearch.length;
		}
		for (var i = startIndex - 1; i >= 0; i--) {
			var currentItem = arrayToSearch[i];
			if (filterCallback(currentItem)) {
				return currentItem;
			}
		}
	};
	helpers.inherits = function(extensions) {
		//Basic javascript inheritance based on the model created in Backbone.js
		var parent = this;
		var ChartElement = (extensions && extensions.hasOwnProperty("constructor")) ? extensions.constructor : function() {
			return parent.apply(this, arguments);
		};

		var Surrogate = function() {
			this.constructor = ChartElement;
		};
		Surrogate.prototype = parent.prototype;
		ChartElement.prototype = new Surrogate();

		ChartElement.extend = helpers.inherits;

		if (extensions) {
			helpers.extend(ChartElement.prototype, extensions);
		}

		ChartElement.__super__ = parent.prototype;

		return ChartElement;
	};
	helpers.noop = function() {};
	helpers.uid = (function() {
		var id = 0;
		return function() {
			return id++;
		};
	})();
	//-- Math methods
	helpers.isNumber = function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	};
	helpers.almostEquals = function(x, y, epsilon) {
		return Math.abs(x - y) < epsilon;
	};
	helpers.max = function(array) {
		return array.reduce(function(max, value) {
			if (!isNaN(value)) {
				return Math.max(max, value);
			} else {
				return max;
			}
		}, Number.NEGATIVE_INFINITY);
	};
	helpers.min = function(array) {
		return array.reduce(function(min, value) {
			if (!isNaN(value)) {
				return Math.min(min, value);
			} else {
				return min;
			}
		}, Number.POSITIVE_INFINITY);
	};
	helpers.sign = Math.sign?
		function(x) { return Math.sign(x); } :
		function(x) {
			x = +x; // convert to a number
			if (x === 0 || isNaN(x)) {
				return x;
			}
			return x > 0 ? 1 : -1;
		};
	helpers.log10 = Math.log10?
		function(x) { return Math.log10(x); } :
		function(x) {
			return Math.log(x) / Math.LN10;
		};
	helpers.toRadians = function(degrees) {
		return degrees * (Math.PI / 180);
	};
	helpers.toDegrees = function(radians) {
		return radians * (180 / Math.PI);
	};
	// Gets the angle from vertical upright to the point about a centre.
	helpers.getAngleFromPoint = function(centrePoint, anglePoint) {
		var distanceFromXCenter = anglePoint.x - centrePoint.x,
			distanceFromYCenter = anglePoint.y - centrePoint.y,
			radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);

		var angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);

		if (angle < (-0.5 * Math.PI)) {
			angle += 2.0 * Math.PI; // make sure the returned angle is in the range of (-PI/2, 3PI/2]
		}

		return {
			angle: angle,
			distance: radialDistanceFromCenter
		};
	};
	helpers.aliasPixel = function(pixelWidth) {
		return (pixelWidth % 2 === 0) ? 0 : 0.5;
	};
	helpers.splineCurve = function(firstPoint, middlePoint, afterPoint, t) {
		//Props to Rob Spencer at scaled innovation for his post on splining between points
		//http://scaledinnovation.com/analytics/splines/aboutSplines.html

		// This function must also respect "skipped" points

		var previous = firstPoint.skip ? middlePoint : firstPoint,
			current = middlePoint,
			next = afterPoint.skip ? middlePoint : afterPoint;

		var d01 = Math.sqrt(Math.pow(current.x - previous.x, 2) + Math.pow(current.y - previous.y, 2));
		var d12 = Math.sqrt(Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2));

		var s01 = d01 / (d01 + d12);
		var s12 = d12 / (d01 + d12);

		// If all points are the same, s01 & s02 will be inf
		s01 = isNaN(s01) ? 0 : s01;
		s12 = isNaN(s12) ? 0 : s12;

		var fa = t * s01; // scaling factor for triangle Ta
		var fb = t * s12;

		return {
			previous: {
				x: current.x - fa * (next.x - previous.x),
				y: current.y - fa * (next.y - previous.y)
			},
			next: {
				x: current.x + fb * (next.x - previous.x),
				y: current.y + fb * (next.y - previous.y)
			}
		};
	};
	helpers.EPSILON = Number.EPSILON || 1e-14;
	helpers.splineCurveMonotone = function(points) {
		// This function calculates Bézier control points in a similar way than |splineCurve|,
		// but preserves monotonicity of the provided data and ensures no local extremums are added
		// between the dataset discrete points due to the interpolation.
		// See : https://en.wikipedia.org/wiki/Monotone_cubic_interpolation

		var pointsWithTangents = (points || []).map(function(point) {
			return {
				model: point._model,
				deltaK: 0,
				mK: 0
			};
		});

		// Calculate slopes (deltaK) and initialize tangents (mK)
		var pointsLen = pointsWithTangents.length;
		var i, pointBefore, pointCurrent, pointAfter;
		for (i = 0; i < pointsLen; ++i) {
			pointCurrent = pointsWithTangents[i];
			if (pointCurrent.model.skip) continue;
			pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
			pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;
			if (pointAfter && !pointAfter.model.skip) {
				pointCurrent.deltaK = (pointAfter.model.y - pointCurrent.model.y) / (pointAfter.model.x - pointCurrent.model.x);
			}
			if (!pointBefore || pointBefore.model.skip) pointCurrent.mK = pointCurrent.deltaK;
			else if (!pointAfter || pointAfter.model.skip) pointCurrent.mK = pointBefore.deltaK;
			else if (this.sign(pointBefore.deltaK) != this.sign(pointCurrent.deltaK)) pointCurrent.mK = 0;
			else pointCurrent.mK = (pointBefore.deltaK + pointCurrent.deltaK) / 2;
		}

		// Adjust tangents to ensure monotonic properties
		var alphaK, betaK, tauK, squaredMagnitude;
		for (i = 0; i < pointsLen - 1; ++i) {
			pointCurrent = pointsWithTangents[i];
			pointAfter = pointsWithTangents[i + 1];
			if (pointCurrent.model.skip || pointAfter.model.skip) continue;
			if (helpers.almostEquals(pointCurrent.deltaK, 0, this.EPSILON))
			{
				pointCurrent.mK = pointAfter.mK = 0;
				continue;
			}
			alphaK = pointCurrent.mK / pointCurrent.deltaK;
			betaK = pointAfter.mK / pointCurrent.deltaK;
			squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
			if (squaredMagnitude <= 9) continue;
			tauK = 3 / Math.sqrt(squaredMagnitude);
			pointCurrent.mK = alphaK * tauK * pointCurrent.deltaK;
			pointAfter.mK = betaK  * tauK * pointCurrent.deltaK;
		}

		// Compute control points
		var deltaX;
		for (i = 0; i < pointsLen; ++i) {
			pointCurrent = pointsWithTangents[i];
			if (pointCurrent.model.skip) continue;
			pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
			pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;
			if (pointBefore && !pointBefore.model.skip) {
				deltaX = (pointCurrent.model.x - pointBefore.model.x) / 3;
				pointCurrent.model.controlPointPreviousX = pointCurrent.model.x - deltaX;
				pointCurrent.model.controlPointPreviousY = pointCurrent.model.y - deltaX * pointCurrent.mK;
			}
			if (pointAfter && !pointAfter.model.skip) {
				deltaX = (pointAfter.model.x - pointCurrent.model.x) / 3;
				pointCurrent.model.controlPointNextX = pointCurrent.model.x + deltaX;
				pointCurrent.model.controlPointNextY = pointCurrent.model.y + deltaX * pointCurrent.mK;
			}
		}
	};
	helpers.nextItem = function(collection, index, loop) {
		if (loop) {
			return index >= collection.length - 1 ? collection[0] : collection[index + 1];
		}

		return index >= collection.length - 1 ? collection[collection.length - 1] : collection[index + 1];
	};
	helpers.previousItem = function(collection, index, loop) {
		if (loop) {
			return index <= 0 ? collection[collection.length - 1] : collection[index - 1];
		}
		return index <= 0 ? collection[0] : collection[index - 1];
	};
	// Implementation of the nice number algorithm used in determining where axis labels will go
	helpers.niceNum = function(range, round) {
		var exponent = Math.floor(helpers.log10(range));
		var fraction = range / Math.pow(10, exponent);
		var niceFraction;

		if (round) {
			if (fraction < 1.5) {
				niceFraction = 1;
			} else if (fraction < 3) {
				niceFraction = 2;
			} else if (fraction < 7) {
				niceFraction = 5;
			} else {
				niceFraction = 10;
			}
		} else {
			if (fraction <= 1.0) {
				niceFraction = 1;
			} else if (fraction <= 2) {
				niceFraction = 2;
			} else if (fraction <= 5) {
				niceFraction = 5;
			} else {
				niceFraction = 10;
			}
		}

		return niceFraction * Math.pow(10, exponent);
	};
	//Easing functions adapted from Robert Penner's easing equations
	//http://www.robertpenner.com/easing/
	var easingEffects = helpers.easingEffects = {
		linear: function(t) {
			return t;
		},
		easeInQuad: function(t) {
			return t * t;
		},
		easeOutQuad: function(t) {
			return -1 * t * (t - 2);
		},
		easeInOutQuad: function(t) {
			if ((t /= 1 / 2) < 1) {
				return 1 / 2 * t * t;
			}
			return -1 / 2 * ((--t) * (t - 2) - 1);
		},
		easeInCubic: function(t) {
			return t * t * t;
		},
		easeOutCubic: function(t) {
			return 1 * ((t = t / 1 - 1) * t * t + 1);
		},
		easeInOutCubic: function(t) {
			if ((t /= 1 / 2) < 1) {
				return 1 / 2 * t * t * t;
			}
			return 1 / 2 * ((t -= 2) * t * t + 2);
		},
		easeInQuart: function(t) {
			return t * t * t * t;
		},
		easeOutQuart: function(t) {
			return -1 * ((t = t / 1 - 1) * t * t * t - 1);
		},
		easeInOutQuart: function(t) {
			if ((t /= 1 / 2) < 1) {
				return 1 / 2 * t * t * t * t;
			}
			return -1 / 2 * ((t -= 2) * t * t * t - 2);
		},
		easeInQuint: function(t) {
			return 1 * (t /= 1) * t * t * t * t;
		},
		easeOutQuint: function(t) {
			return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
		},
		easeInOutQuint: function(t) {
			if ((t /= 1 / 2) < 1) {
				return 1 / 2 * t * t * t * t * t;
			}
			return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
		},
		easeInSine: function(t) {
			return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
		},
		easeOutSine: function(t) {
			return 1 * Math.sin(t / 1 * (Math.PI / 2));
		},
		easeInOutSine: function(t) {
			return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
		},
		easeInExpo: function(t) {
			return (t === 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
		},
		easeOutExpo: function(t) {
			return (t === 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
		},
		easeInOutExpo: function(t) {
			if (t === 0) {
				return 0;
			}
			if (t === 1) {
				return 1;
			}
			if ((t /= 1 / 2) < 1) {
				return 1 / 2 * Math.pow(2, 10 * (t - 1));
			}
			return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
		},
		easeInCirc: function(t) {
			if (t >= 1) {
				return t;
			}
			return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
		},
		easeOutCirc: function(t) {
			return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
		},
		easeInOutCirc: function(t) {
			if ((t /= 1 / 2) < 1) {
				return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
			}
			return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
		},
		easeInElastic: function(t) {
			var s = 1.70158;
			var p = 0;
			var a = 1;
			if (t === 0) {
				return 0;
			}
			if ((t /= 1) === 1) {
				return 1;
			}
			if (!p) {
				p = 1 * 0.3;
			}
			if (a < Math.abs(1)) {
				a = 1;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(1 / a);
			}
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
		},
		easeOutElastic: function(t) {
			var s = 1.70158;
			var p = 0;
			var a = 1;
			if (t === 0) {
				return 0;
			}
			if ((t /= 1) === 1) {
				return 1;
			}
			if (!p) {
				p = 1 * 0.3;
			}
			if (a < Math.abs(1)) {
				a = 1;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(1 / a);
			}
			return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
		},
		easeInOutElastic: function(t) {
			var s = 1.70158;
			var p = 0;
			var a = 1;
			if (t === 0) {
				return 0;
			}
			if ((t /= 1 / 2) === 2) {
				return 1;
			}
			if (!p) {
				p = 1 * (0.3 * 1.5);
			}
			if (a < Math.abs(1)) {
				a = 1;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(1 / a);
			}
			if (t < 1) {
				return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
			}
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * 0.5 + 1;
		},
		easeInBack: function(t) {
			var s = 1.70158;
			return 1 * (t /= 1) * t * ((s + 1) * t - s);
		},
		easeOutBack: function(t) {
			var s = 1.70158;
			return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
		},
		easeInOutBack: function(t) {
			var s = 1.70158;
			if ((t /= 1 / 2) < 1) {
				return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
			}
			return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
		},
		easeInBounce: function(t) {
			return 1 - easingEffects.easeOutBounce(1 - t);
		},
		easeOutBounce: function(t) {
			if ((t /= 1) < (1 / 2.75)) {
				return 1 * (7.5625 * t * t);
			} else if (t < (2 / 2.75)) {
				return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75);
			} else if (t < (2.5 / 2.75)) {
				return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375);
			} else {
				return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375);
			}
		},
		easeInOutBounce: function(t) {
			if (t < 1 / 2) {
				return easingEffects.easeInBounce(t * 2) * 0.5;
			}
			return easingEffects.easeOutBounce(t * 2 - 1) * 0.5 + 1 * 0.5;
		}
	};
	//Request animation polyfill - http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
	helpers.requestAnimFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback) {
				return window.setTimeout(callback, 1000 / 60);
			};
	})();
	helpers.cancelAnimFrame = (function() {
		return window.cancelAnimationFrame ||
			window.webkitCancelAnimationFrame ||
			window.mozCancelAnimationFrame ||
			window.oCancelAnimationFrame ||
			window.msCancelAnimationFrame ||
			function(callback) {
				return window.clearTimeout(callback, 1000 / 60);
			};
	})();
	//-- DOM methods
	helpers.getRelativePosition = function(evt, chart) {
		var mouseX, mouseY;
		var e = evt.originalEvent || evt,
			canvas = evt.currentTarget || evt.srcElement,
			boundingRect = canvas.getBoundingClientRect();

		var touches = e.touches;
		if (touches && touches.length > 0) {
			mouseX = touches[0].clientX;
			mouseY = touches[0].clientY;

		} else {
			mouseX = e.clientX;
			mouseY = e.clientY;
		}

		// Scale mouse coordinates into canvas coordinates
		// by following the pattern laid out by 'jerryj' in the comments of
		// http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
		var paddingLeft = parseFloat(helpers.getStyle(canvas, 'padding-left'));
		var paddingTop = parseFloat(helpers.getStyle(canvas, 'padding-top'));
		var paddingRight = parseFloat(helpers.getStyle(canvas, 'padding-right'));
		var paddingBottom = parseFloat(helpers.getStyle(canvas, 'padding-bottom'));
		var width = boundingRect.right - boundingRect.left - paddingLeft - paddingRight;
		var height = boundingRect.bottom - boundingRect.top - paddingTop - paddingBottom;

		// We divide by the current device pixel ratio, because the canvas is scaled up by that amount in each direction. However
		// the backend model is in unscaled coordinates. Since we are going to deal with our model coordinates, we go back here
		mouseX = Math.round((mouseX - boundingRect.left - paddingLeft) / (width) * canvas.width / chart.currentDevicePixelRatio);
		mouseY = Math.round((mouseY - boundingRect.top - paddingTop) / (height) * canvas.height / chart.currentDevicePixelRatio);

		return {
			x: mouseX,
			y: mouseY
		};

	};
	helpers.addEvent = function(node, eventType, method) {
		if (node.addEventListener) {
			node.addEventListener(eventType, method);
		} else if (node.attachEvent) {
			node.attachEvent("on" + eventType, method);
		} else {
			node["on" + eventType] = method;
		}
	};
	helpers.removeEvent = function(node, eventType, handler) {
		if (node.removeEventListener) {
			node.removeEventListener(eventType, handler, false);
		} else if (node.detachEvent) {
			node.detachEvent("on" + eventType, handler);
		} else {
			node["on" + eventType] = helpers.noop;
		}
	};
	helpers.bindEvents = function(chartInstance, arrayOfEvents, handler) {
		// Create the events object if it's not already present
		var events = chartInstance.events = chartInstance.events || {};

		helpers.each(arrayOfEvents, function(eventName) {
			events[eventName] = function() {
				handler.apply(chartInstance, arguments);
			};
			helpers.addEvent(chartInstance.chart.canvas, eventName, events[eventName]);
		});
	};
	helpers.unbindEvents = function(chartInstance, arrayOfEvents) {
		var canvas = chartInstance.chart.canvas;
		helpers.each(arrayOfEvents, function(handler, eventName) {
			helpers.removeEvent(canvas, eventName, handler);
		});
	};

	// Private helper function to convert max-width/max-height values that may be percentages into a number
	function parseMaxStyle(styleValue, node, parentProperty) {
		var valueInPixels;
		if (typeof(styleValue) === 'string') {
			valueInPixels = parseInt(styleValue, 10);

			if (styleValue.indexOf('%') != -1) {
				// percentage * size in dimension
				valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
			}
		} else {
			valueInPixels = styleValue;
		}

		return valueInPixels;
	}

	/**
	 * Returns if the given value contains an effective constraint.
	 * @private
	 */
	function isConstrainedValue(value) {
		return value !== undefined &&  value !== null && value !== 'none';
	}

	// Private helper to get a constraint dimension
	// @param domNode : the node to check the constraint on
	// @param maxStyle : the style that defines the maximum for the direction we are using (maxWidth / maxHeight)
	// @param percentageProperty : property of parent to use when calculating width as a percentage
	// @see http://www.nathanaeljones.com/blog/2013/reading-max-width-cross-browser
	function getConstraintDimension(domNode, maxStyle, percentageProperty) {
		var view = document.defaultView;
		var parentNode = domNode.parentNode;
		var constrainedNode = view.getComputedStyle(domNode)[maxStyle];
		var constrainedContainer = view.getComputedStyle(parentNode)[maxStyle];
		var hasCNode = isConstrainedValue(constrainedNode);
		var hasCContainer = isConstrainedValue(constrainedContainer);
		var infinity = Number.POSITIVE_INFINITY;

		if (hasCNode || hasCContainer) {
			return Math.min(
				hasCNode? parseMaxStyle(constrainedNode, domNode, percentageProperty) : infinity,
				hasCContainer? parseMaxStyle(constrainedContainer, parentNode, percentageProperty) : infinity);
		}

		return 'none';
	}
	// returns Number or undefined if no constraint
	helpers.getConstraintWidth = function(domNode) {
		return getConstraintDimension(domNode, 'max-width', 'clientWidth');
	};
	// returns Number or undefined if no constraint
	helpers.getConstraintHeight = function(domNode) {
		return getConstraintDimension(domNode, 'max-height', 'clientHeight');
	};
	helpers.getMaximumWidth = function(domNode) {
		var container = domNode.parentNode;
		var padding = parseInt(helpers.getStyle(container, 'padding-left')) + parseInt(helpers.getStyle(container, 'padding-right'));
		var w = container.clientWidth - padding;
		var cw = helpers.getConstraintWidth(domNode);
		return isNaN(cw)? w : Math.min(w, cw);
	};
	helpers.getMaximumHeight = function(domNode) {
		var container = domNode.parentNode;
		var padding = parseInt(helpers.getStyle(container, 'padding-top')) + parseInt(helpers.getStyle(container, 'padding-bottom'));
		var h = container.clientHeight - padding;
		var ch = helpers.getConstraintHeight(domNode);
		return isNaN(ch)? h : Math.min(h, ch);
	};
	helpers.getStyle = function(el, property) {
		return el.currentStyle ?
			el.currentStyle[property] :
			document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
	};
	helpers.retinaScale = function(chart) {
		var ctx = chart.ctx;
		var canvas = chart.canvas;
		var width = canvas.width;
		var height = canvas.height;
		var pixelRatio = chart.currentDevicePixelRatio = window.devicePixelRatio || 1;

		if (pixelRatio !== 1) {
			canvas.height = height * pixelRatio;
			canvas.width = width * pixelRatio;
			ctx.scale(pixelRatio, pixelRatio);

			// Store the device pixel ratio so that we can go backwards in `destroy`.
			// The devicePixelRatio changes with zoom, so there are no guarantees that it is the same
			// when destroy is called
			chart.originalDevicePixelRatio = chart.originalDevicePixelRatio || pixelRatio;
		}

		canvas.style.width = width + 'px';
		canvas.style.height = height + 'px';
	};
	//-- Canvas methods
	helpers.clear = function(chart) {
		chart.ctx.clearRect(0, 0, chart.width, chart.height);
	};
	helpers.fontString = function(pixelSize, fontStyle, fontFamily) {
		return fontStyle + " " + pixelSize + "px " + fontFamily;
	};
	helpers.longestText = function(ctx, font, arrayOfThings, cache) {
		cache = cache || {};
		var data = cache.data = cache.data || {};
		var gc = cache.garbageCollect = cache.garbageCollect || [];

		if (cache.font !== font) {
			data = cache.data = {};
			gc = cache.garbageCollect = [];
			cache.font = font;
		}

		ctx.font = font;
		var longest = 0;
		helpers.each(arrayOfThings, function(thing) {
			// Undefined strings and arrays should not be measured
			if (thing !== undefined && thing !== null && helpers.isArray(thing) !== true) {
				longest = helpers.measureText(ctx, data, gc, longest, thing);
			} else if (helpers.isArray(thing)) {
				// if it is an array lets measure each element
				// to do maybe simplify this function a bit so we can do this more recursively?
				helpers.each(thing, function(nestedThing) {
					// Undefined strings and arrays should not be measured
					if (nestedThing !== undefined && nestedThing !== null && !helpers.isArray(nestedThing)) {
						longest = helpers.measureText(ctx, data, gc, longest, nestedThing);
					}
				});
			}
		});

		var gcLen = gc.length / 2;
		if (gcLen > arrayOfThings.length) {
			for (var i = 0; i < gcLen; i++) {
				delete data[gc[i]];
			}
			gc.splice(0, gcLen);
		}
		return longest;
	};
	helpers.measureText = function (ctx, data, gc, longest, string) {
		var textWidth = data[string];
		if (!textWidth) {
			textWidth = data[string] = ctx.measureText(string).width;
			gc.push(string);
		}
		if (textWidth > longest) {
			longest = textWidth;
		}
		return longest;
	};
	helpers.numberOfLabelLines = function(arrayOfThings) {
		var numberOfLines = 1;
		helpers.each(arrayOfThings, function(thing) {
			if (helpers.isArray(thing)) {
				if (thing.length > numberOfLines) {
					numberOfLines = thing.length;
				}
			}
		});
		return numberOfLines;
	};
	helpers.drawRoundedRectangle = function(ctx, x, y, width, height, radius) {
		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
		ctx.closePath();
	};
	helpers.color = function(c) {
		if (!color) {
			console.log('Color.js not found!');
			return c;
		}

		/* global CanvasGradient */
		if (c instanceof CanvasGradient) {
			return color(Chart.defaults.global.defaultColor);
		}

		return color(c);
	};
	helpers.addResizeListener = function(node, callback) {
		// Hide an iframe before the node
		var hiddenIframe = document.createElement('iframe');
		var hiddenIframeClass = 'chartjs-hidden-iframe';

		if (hiddenIframe.classlist) {
			// can use classlist
			hiddenIframe.classlist.add(hiddenIframeClass);
		} else {
			hiddenIframe.setAttribute('class', hiddenIframeClass);
		}

		// Set the style
		hiddenIframe.tabIndex = -1;
		var style = hiddenIframe.style;
		style.width = '100%';
		style.display = 'block';
		style.border = 0;
		style.height = 0;
		style.margin = 0;
		style.position = 'absolute';
		style.left = 0;
		style.right = 0;
		style.top = 0;
		style.bottom = 0;

		// Insert the iframe so that contentWindow is available
		node.insertBefore(hiddenIframe, node.firstChild);

		(hiddenIframe.contentWindow || hiddenIframe).onresize = function() {
			if (callback) {
				callback();
			}
		};
	};
	helpers.removeResizeListener = function(node) {
		var hiddenIframe = node.querySelector('.chartjs-hidden-iframe');

		// Remove the resize detect iframe
		if (hiddenIframe) {
			hiddenIframe.parentNode.removeChild(hiddenIframe);
		}
	};
	helpers.isArray = Array.isArray?
		function(obj) { return Array.isArray(obj); } :
		function(obj) {
			return Object.prototype.toString.call(obj) === '[object Array]';
		};
	//! @see http://stackoverflow.com/a/14853974
	helpers.arrayEquals = function(a0, a1) {
		var i, ilen, v0, v1;

		if (!a0 || !a1 || a0.length != a1.length) {
			return false;
		}

		for (i = 0, ilen=a0.length; i < ilen; ++i) {
			v0 = a0[i];
			v1 = a1[i];

			if (v0 instanceof Array && v1 instanceof Array) {
				if (!helpers.arrayEquals(v0, v1)) {
					return false;
				}
			} else if (v0 != v1) {
				// NOTE: two different object instances will never be equal: {x:20} != {x:20}
				return false;
			}
		}

		return true;
	};
	helpers.callCallback = function(fn, args, _tArg) {
		if (fn && typeof fn.call === 'function') {
			fn.apply(_tArg, args);
		}
	};
	helpers.getHoverColor = function(color) {
		/* global CanvasPattern */
		return (color instanceof CanvasPattern) ?
			color :
			helpers.color(color).saturate(0.5).darken(0.1).rgbString();
	};
};

},{"3":3}],27:[function(require,module,exports){
"use strict";

module.exports = function() {

	//Occupy the global variable of Chart, and create a simple base class
	var Chart = function(context, config) {
		var me = this;
		var helpers = Chart.helpers;
		me.config = config || { 
			data: {
				datasets: []
			}
		};

		// Support a jQuery'd canvas element
		if (context.length && context[0].getContext) {
			context = context[0];
		}

		// Support a canvas domnode
		if (context.getContext) {
			context = context.getContext("2d");
		}

		me.ctx = context;
		me.canvas = context.canvas;

		context.canvas.style.display = context.canvas.style.display || 'block';

		// Figure out what the size of the chart will be.
		// If the canvas has a specified width and height, we use those else
		// we look to see if the canvas node has a CSS width and height.
		// If there is still no height, fill the parent container
		me.width = context.canvas.width || parseInt(helpers.getStyle(context.canvas, 'width'), 10) || helpers.getMaximumWidth(context.canvas);
		me.height = context.canvas.height || parseInt(helpers.getStyle(context.canvas, 'height'), 10) || helpers.getMaximumHeight(context.canvas);

		me.aspectRatio = me.width / me.height;

		if (isNaN(me.aspectRatio) || isFinite(me.aspectRatio) === false) {
			// If the canvas has no size, try and figure out what the aspect ratio will be.
			// Some charts prefer square canvases (pie, radar, etc). If that is specified, use that
			// else use the canvas default ratio of 2
			me.aspectRatio = config.aspectRatio !== undefined ? config.aspectRatio : 2;
		}

		// Store the original style of the element so we can set it back
		me.originalCanvasStyleWidth = context.canvas.style.width;
		me.originalCanvasStyleHeight = context.canvas.style.height;

		// High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
		helpers.retinaScale(me);
		me.controller = new Chart.Controller(me);

		// Always bind this so that if the responsive state changes we still work
		helpers.addResizeListener(context.canvas.parentNode, function() {
			if (me.controller && me.controller.config.options.responsive) {
				me.controller.resize();
			}
		});

		return me.controller ? me.controller : me;

	};

	//Globally expose the defaults to allow for user updating/changing
	Chart.defaults = {
		global: {
			responsive: true,
			responsiveAnimationDuration: 0,
			maintainAspectRatio: true,
			events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
			hover: {
				onHover: null,
				mode: 'single',
				animationDuration: 400
			},
			onClick: null,
			defaultColor: 'rgba(0,0,0,0.1)',
			defaultFontColor: '#666',
			defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
			defaultFontSize: 12,
			defaultFontStyle: 'normal',
			showLines: true,

			// Element defaults defined in element extensions
			elements: {},

			// Legend callback string
			legendCallback: function(chart) {
				var text = [];
				text.push('<ul class="' + chart.id + '-legend">');
				for (var i = 0; i < chart.data.datasets.length; i++) {
					text.push('<li><span style="background-color:' + chart.data.datasets[i].backgroundColor + '"></span>');
					if (chart.data.datasets[i].label) {
						text.push(chart.data.datasets[i].label);
					}
					text.push('</li>');
				}
				text.push('</ul>');

				return text.join("");
			}
		}
	};

	Chart.Chart = Chart;

	return Chart;

};

},{}],28:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	// The layout service is very self explanatory.  It's responsible for the layout within a chart.
	// Scales, Legends and Plugins all rely on the layout service and can easily register to be placed anywhere they need
	// It is this service's responsibility of carrying out that layout.
	Chart.layoutService = {
		defaults: {},

		// Register a box to a chartInstance. A box is simply a reference to an object that requires layout. eg. Scales, Legend, Plugins.
		addBox: function(chartInstance, box) {
			if (!chartInstance.boxes) {
				chartInstance.boxes = [];
			}
			chartInstance.boxes.push(box);
		},

		removeBox: function(chartInstance, box) {
			if (!chartInstance.boxes) {
				return;
			}
			chartInstance.boxes.splice(chartInstance.boxes.indexOf(box), 1);
		},

		// The most important function
		update: function(chartInstance, width, height) {

			if (!chartInstance) {
				return;
			}

			var xPadding = 0;
			var yPadding = 0;

			var leftBoxes = helpers.where(chartInstance.boxes, function(box) {
				return box.options.position === "left";
			});
			var rightBoxes = helpers.where(chartInstance.boxes, function(box) {
				return box.options.position === "right";
			});
			var topBoxes = helpers.where(chartInstance.boxes, function(box) {
				return box.options.position === "top";
			});
			var bottomBoxes = helpers.where(chartInstance.boxes, function(box) {
				return box.options.position === "bottom";
			});

			// Boxes that overlay the chartarea such as the radialLinear scale
			var chartAreaBoxes = helpers.where(chartInstance.boxes, function(box) {
				return box.options.position === "chartArea";
			});

			// Ensure that full width boxes are at the very top / bottom
			topBoxes.sort(function(a, b) {
				return (b.options.fullWidth ? 1 : 0) - (a.options.fullWidth ? 1 : 0);
			});
			bottomBoxes.sort(function(a, b) {
				return (a.options.fullWidth ? 1 : 0) - (b.options.fullWidth ? 1 : 0);
			});

			// Essentially we now have any number of boxes on each of the 4 sides.
			// Our canvas looks like the following.
			// The areas L1 and L2 are the left axes. R1 is the right axis, T1 is the top axis and
			// B1 is the bottom axis
			// There are also 4 quadrant-like locations (left to right instead of clockwise) reserved for chart overlays
			// These locations are single-box locations only, when trying to register a chartArea location that is already taken,
			// an error will be thrown.
			//
			// |----------------------------------------------------|
			// |                  T1 (Full Width)                   |
			// |----------------------------------------------------|
			// |    |    |                 T2                  |    |
			// |    |----|-------------------------------------|----|
			// |    |    | C1 |                           | C2 |    |
			// |    |    |----|                           |----|    |
			// |    |    |                                     |    |
			// | L1 | L2 |           ChartArea (C0)            | R1 |
			// |    |    |                                     |    |
			// |    |    |----|                           |----|    |
			// |    |    | C3 |                           | C4 |    |
			// |    |----|-------------------------------------|----|
			// |    |    |                 B1                  |    |
			// |----------------------------------------------------|
			// |                  B2 (Full Width)                   |
			// |----------------------------------------------------|
			//
			// What we do to find the best sizing, we do the following
			// 1. Determine the minimum size of the chart area.
			// 2. Split the remaining width equally between each vertical axis
			// 3. Split the remaining height equally between each horizontal axis
			// 4. Give each layout the maximum size it can be. The layout will return it's minimum size
			// 5. Adjust the sizes of each axis based on it's minimum reported size.
			// 6. Refit each axis
			// 7. Position each axis in the final location
			// 8. Tell the chart the final location of the chart area
			// 9. Tell any axes that overlay the chart area the positions of the chart area

			// Step 1
			var chartWidth = width - (2 * xPadding);
			var chartHeight = height - (2 * yPadding);
			var chartAreaWidth = chartWidth / 2; // min 50%
			var chartAreaHeight = chartHeight / 2; // min 50%

			// Step 2
			var verticalBoxWidth = (width - chartAreaWidth) / (leftBoxes.length + rightBoxes.length);

			// Step 3
			var horizontalBoxHeight = (height - chartAreaHeight) / (topBoxes.length + bottomBoxes.length);

			// Step 4
			var maxChartAreaWidth = chartWidth;
			var maxChartAreaHeight = chartHeight;
			var minBoxSizes = [];

			helpers.each(leftBoxes.concat(rightBoxes, topBoxes, bottomBoxes), getMinimumBoxSize);

			function getMinimumBoxSize(box) {
				var minSize;
				var isHorizontal = box.isHorizontal();

				if (isHorizontal) {
					minSize = box.update(box.options.fullWidth ? chartWidth : maxChartAreaWidth, horizontalBoxHeight);
					maxChartAreaHeight -= minSize.height;
				} else {
					minSize = box.update(verticalBoxWidth, chartAreaHeight);
					maxChartAreaWidth -= minSize.width;
				}

				minBoxSizes.push({
					horizontal: isHorizontal,
					minSize: minSize,
					box: box
				});
			}

			// At this point, maxChartAreaHeight and maxChartAreaWidth are the size the chart area could
			// be if the axes are drawn at their minimum sizes.

			// Steps 5 & 6
			var totalLeftBoxesWidth = xPadding;
			var totalRightBoxesWidth = xPadding;
			var totalTopBoxesHeight = yPadding;
			var totalBottomBoxesHeight = yPadding;

			// Update, and calculate the left and right margins for the horizontal boxes
			helpers.each(leftBoxes.concat(rightBoxes), fitBox);

			helpers.each(leftBoxes, function(box) {
				totalLeftBoxesWidth += box.width;
			});

			helpers.each(rightBoxes, function(box) {
				totalRightBoxesWidth += box.width;
			});

			// Set the Left and Right margins for the horizontal boxes
			helpers.each(topBoxes.concat(bottomBoxes), fitBox);

			// Function to fit a box
			function fitBox(box) {
				var minBoxSize = helpers.findNextWhere(minBoxSizes, function(minBoxSize) {
					return minBoxSize.box === box;
				});

				if (minBoxSize) {
					if (box.isHorizontal()) {
						var scaleMargin = {
							left: totalLeftBoxesWidth,
							right: totalRightBoxesWidth,
							top: 0,
							bottom: 0
						};

						// Don't use min size here because of label rotation. When the labels are rotated, their rotation highly depends
						// on the margin. Sometimes they need to increase in size slightly
						box.update(box.options.fullWidth ? chartWidth : maxChartAreaWidth, chartHeight / 2, scaleMargin);
					} else {
						box.update(minBoxSize.minSize.width, maxChartAreaHeight);
					}
				}
			}

			// Figure out how much margin is on the top and bottom of the vertical boxes
			helpers.each(topBoxes, function(box) {
				totalTopBoxesHeight += box.height;
			});

			helpers.each(bottomBoxes, function(box) {
				totalBottomBoxesHeight += box.height;
			});

			// Let the left layout know the final margin
			helpers.each(leftBoxes.concat(rightBoxes), finalFitVerticalBox);

			function finalFitVerticalBox(box) {
				var minBoxSize = helpers.findNextWhere(minBoxSizes, function(minBoxSize) {
					return minBoxSize.box === box;
				});

				var scaleMargin = {
					left: 0,
					right: 0,
					top: totalTopBoxesHeight,
					bottom: totalBottomBoxesHeight
				};

				if (minBoxSize) {
					box.update(minBoxSize.minSize.width, maxChartAreaHeight, scaleMargin);
				}
			}

			// Recalculate because the size of each layout might have changed slightly due to the margins (label rotation for instance)
			totalLeftBoxesWidth = xPadding;
			totalRightBoxesWidth = xPadding;
			totalTopBoxesHeight = yPadding;
			totalBottomBoxesHeight = yPadding;

			helpers.each(leftBoxes, function(box) {
				totalLeftBoxesWidth += box.width;
			});

			helpers.each(rightBoxes, function(box) {
				totalRightBoxesWidth += box.width;
			});

			helpers.each(topBoxes, function(box) {
				totalTopBoxesHeight += box.height;
			});
			helpers.each(bottomBoxes, function(box) {
				totalBottomBoxesHeight += box.height;
			});

			// Figure out if our chart area changed. This would occur if the dataset layout label rotation
			// changed due to the application of the margins in step 6. Since we can only get bigger, this is safe to do
			// without calling `fit` again
			var newMaxChartAreaHeight = height - totalTopBoxesHeight - totalBottomBoxesHeight;
			var newMaxChartAreaWidth = width - totalLeftBoxesWidth - totalRightBoxesWidth;

			if (newMaxChartAreaWidth !== maxChartAreaWidth || newMaxChartAreaHeight !== maxChartAreaHeight) {
				helpers.each(leftBoxes, function(box) {
					box.height = newMaxChartAreaHeight;
				});

				helpers.each(rightBoxes, function(box) {
					box.height = newMaxChartAreaHeight;
				});

				helpers.each(topBoxes, function(box) {
					if (!box.options.fullWidth) {
						box.width = newMaxChartAreaWidth;
					}
				});

				helpers.each(bottomBoxes, function(box) {
					if (!box.options.fullWidth) {
						box.width = newMaxChartAreaWidth;
					}
				});

				maxChartAreaHeight = newMaxChartAreaHeight;
				maxChartAreaWidth = newMaxChartAreaWidth;
			}

			// Step 7 - Position the boxes
			var left = xPadding;
			var top = yPadding;

			helpers.each(leftBoxes.concat(topBoxes), placeBox);

			// Account for chart width and height
			left += maxChartAreaWidth;
			top += maxChartAreaHeight;

			helpers.each(rightBoxes, placeBox);
			helpers.each(bottomBoxes, placeBox);

			function placeBox(box) {
				if (box.isHorizontal()) {
					box.left = box.options.fullWidth ? xPadding : totalLeftBoxesWidth;
					box.right = box.options.fullWidth ? width - xPadding : totalLeftBoxesWidth + maxChartAreaWidth;
					box.top = top;
					box.bottom = top + box.height;

					// Move to next point
					top = box.bottom;

				} else {

					box.left = left;
					box.right = left + box.width;
					box.top = totalTopBoxesHeight;
					box.bottom = totalTopBoxesHeight + maxChartAreaHeight;

					// Move to next point
					left = box.right;
				}
			}

			// Step 8
			chartInstance.chartArea = {
				left: totalLeftBoxesWidth,
				top: totalTopBoxesHeight,
				right: totalLeftBoxesWidth + maxChartAreaWidth,
				bottom: totalTopBoxesHeight + maxChartAreaHeight
			};

			// Step 9
			helpers.each(chartAreaBoxes, function(box) {
				box.left = chartInstance.chartArea.left;
				box.top = chartInstance.chartArea.top;
				box.right = chartInstance.chartArea.right;
				box.bottom = chartInstance.chartArea.bottom;

				box.update(maxChartAreaWidth, maxChartAreaHeight);
			});
		}
	};
};

},{}],29:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;
	var noop = helpers.noop;

	Chart.defaults.global.legend = {

		display: true,
		position: 'top',
		fullWidth: true, // marks that this box should take the full width of the canvas (pushing down other boxes)
		reverse: false,

		// a callback that will handle
		onClick: function(e, legendItem) {
			var index = legendItem.datasetIndex;
			var ci = this.chart;
			var meta = ci.getDatasetMeta(index);

			// See controller.isDatasetVisible comment
			meta.hidden = meta.hidden === null? !ci.data.datasets[index].hidden : null;

			// We hid a dataset ... rerender the chart
			ci.update();
		},

		labels: {
			boxWidth: 40,
			padding: 10,
			// Generates labels shown in the legend
			// Valid properties to return:
			// text : text to display
			// fillStyle : fill of coloured box
			// strokeStyle: stroke of coloured box
			// hidden : if this legend item refers to a hidden item
			// lineCap : cap style for line
			// lineDash
			// lineDashOffset :
			// lineJoin :
			// lineWidth :
			generateLabels: function(chart) {
				var data = chart.data;
				return helpers.isArray(data.datasets) ? data.datasets.map(function(dataset, i) {
					return {
						text: dataset.label,
						fillStyle: (!helpers.isArray(dataset.backgroundColor) ? dataset.backgroundColor : dataset.backgroundColor[0]),
						hidden: !chart.isDatasetVisible(i),
						lineCap: dataset.borderCapStyle,
						lineDash: dataset.borderDash,
						lineDashOffset: dataset.borderDashOffset,
						lineJoin: dataset.borderJoinStyle,
						lineWidth: dataset.borderWidth,
						strokeStyle: dataset.borderColor,
						pointStyle: dataset.pointStyle,

						// Below is extra data used for toggling the datasets
						datasetIndex: i
					};
				}, this) : [];
			}
		}
	};

	Chart.Legend = Chart.Element.extend({

		initialize: function(config) {
			helpers.extend(this, config);

			// Contains hit boxes for each dataset (in dataset order)
			this.legendHitBoxes = [];

			// Are we in doughnut mode which has a different data type
			this.doughnutMode = false;
		},

		// These methods are ordered by lifecyle. Utilities then follow.
		// Any function defined here is inherited by all legend types.
		// Any function can be extended by the legend type

		beforeUpdate: noop,
		update: function(maxWidth, maxHeight, margins) {
			var me = this;

			// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
			me.beforeUpdate();

			// Absorb the master measurements
			me.maxWidth = maxWidth;
			me.maxHeight = maxHeight;
			me.margins = margins;

			// Dimensions
			me.beforeSetDimensions();
			me.setDimensions();
			me.afterSetDimensions();
			// Labels
			me.beforeBuildLabels();
			me.buildLabels();
			me.afterBuildLabels();

			// Fit
			me.beforeFit();
			me.fit();
			me.afterFit();
			//
			me.afterUpdate();

			return me.minSize;
		},
		afterUpdate: noop,

		//

		beforeSetDimensions: noop,
		setDimensions: function() {
			var me = this;
			// Set the unconstrained dimension before label rotation
			if (me.isHorizontal()) {
				// Reset position before calculating rotation
				me.width = me.maxWidth;
				me.left = 0;
				me.right = me.width;
			} else {
				me.height = me.maxHeight;

				// Reset position before calculating rotation
				me.top = 0;
				me.bottom = me.height;
			}

			// Reset padding
			me.paddingLeft = 0;
			me.paddingTop = 0;
			me.paddingRight = 0;
			me.paddingBottom = 0;

			// Reset minSize
			me.minSize = {
				width: 0,
				height: 0
			};
		},
		afterSetDimensions: noop,

		//

		beforeBuildLabels: noop,
		buildLabels: function() {
			var me = this;
			me.legendItems = me.options.labels.generateLabels.call(me, me.chart);
			if(me.options.reverse){
				me.legendItems.reverse();
			}
		},
		afterBuildLabels: noop,

		//

		beforeFit: noop,
		fit: function() {
			var me = this;
			var opts = me.options;
			var labelOpts = opts.labels;
			var display = opts.display;

			var ctx = me.ctx;

			var globalDefault = Chart.defaults.global,
				itemOrDefault = helpers.getValueOrDefault,
				fontSize = itemOrDefault(labelOpts.fontSize, globalDefault.defaultFontSize),
				fontStyle = itemOrDefault(labelOpts.fontStyle, globalDefault.defaultFontStyle),
				fontFamily = itemOrDefault(labelOpts.fontFamily, globalDefault.defaultFontFamily),
				labelFont = helpers.fontString(fontSize, fontStyle, fontFamily);

			// Reset hit boxes
			var hitboxes = me.legendHitBoxes = [];

			var minSize = me.minSize;
			var isHorizontal = me.isHorizontal();

			if (isHorizontal) {
				minSize.width = me.maxWidth; // fill all the width
				minSize.height = display ? 10 : 0;
			} else {
				minSize.width = display ? 10 : 0;
				minSize.height = me.maxHeight; // fill all the height
			}

			// Increase sizes here
			if (display) {
				ctx.font = labelFont;

				if (isHorizontal) {
					// Labels

					// Width of each line of legend boxes. Labels wrap onto multiple lines when there are too many to fit on one
					var lineWidths = me.lineWidths = [0];
					var totalHeight = me.legendItems.length ? fontSize + (labelOpts.padding) : 0;

					ctx.textAlign = "left";
					ctx.textBaseline = 'top';

					helpers.each(me.legendItems, function(legendItem, i) {
						var boxWidth = labelOpts.usePointStyle ?
							fontSize * Math.sqrt(2) :
							labelOpts.boxWidth;

						var width = boxWidth + (fontSize / 2) + ctx.measureText(legendItem.text).width;
						if (lineWidths[lineWidths.length - 1] + width + labelOpts.padding >= me.width) {
							totalHeight += fontSize + (labelOpts.padding);
							lineWidths[lineWidths.length] = me.left;
						}

						// Store the hitbox width and height here. Final position will be updated in `draw`
						hitboxes[i] = {
							left: 0,
							top: 0,
							width: width,
							height: fontSize
						};

						lineWidths[lineWidths.length - 1] += width + labelOpts.padding;
					});

					minSize.height += totalHeight;

				} else {
					var vPadding = labelOpts.padding;
					var columnWidths = me.columnWidths = [];
					var totalWidth = labelOpts.padding;
					var currentColWidth = 0;
					var currentColHeight = 0;
					var itemHeight = fontSize + vPadding;

					helpers.each(me.legendItems, function(legendItem, i) {
						// If usePointStyle is set, multiple boxWidth by 2 since it represents
						// the radius and not truly the width
						var boxWidth = labelOpts.usePointStyle ? 2 * labelOpts.boxWidth : labelOpts.boxWidth;

						var itemWidth = boxWidth + (fontSize / 2) + ctx.measureText(legendItem.text).width;

						// If too tall, go to new column
						if (currentColHeight + itemHeight > minSize.height) {
							totalWidth += currentColWidth + labelOpts.padding;
							columnWidths.push(currentColWidth); // previous column width

							currentColWidth = 0;
							currentColHeight = 0;
						}

						// Get max width
						currentColWidth = Math.max(currentColWidth, itemWidth);
						currentColHeight += itemHeight;

						// Store the hitbox width and height here. Final position will be updated in `draw`
						hitboxes[i] = {
							left: 0,
							top: 0,
							width: itemWidth,
							height: fontSize
						};
					});

					totalWidth += currentColWidth;
					columnWidths.push(currentColWidth);
					minSize.width += totalWidth;
				}
			}

			me.width = minSize.width;
			me.height = minSize.height;
		},
		afterFit: noop,

		// Shared Methods
		isHorizontal: function() {
			return this.options.position === "top" || this.options.position === "bottom";
		},

		// Actualy draw the legend on the canvas
		draw: function() {
			var me = this;
			var opts = me.options;
			var labelOpts = opts.labels;
			var globalDefault = Chart.defaults.global,
				lineDefault = globalDefault.elements.line,
				legendWidth = me.width,
				lineWidths = me.lineWidths;

			if (opts.display) {
				var ctx = me.ctx,
					cursor,
					itemOrDefault = helpers.getValueOrDefault,
					fontColor = itemOrDefault(labelOpts.fontColor, globalDefault.defaultFontColor),
					fontSize = itemOrDefault(labelOpts.fontSize, globalDefault.defaultFontSize),
					fontStyle = itemOrDefault(labelOpts.fontStyle, globalDefault.defaultFontStyle),
					fontFamily = itemOrDefault(labelOpts.fontFamily, globalDefault.defaultFontFamily),
					labelFont = helpers.fontString(fontSize, fontStyle, fontFamily);

				// Canvas setup
				ctx.textAlign = "left";
				ctx.textBaseline = 'top';
				ctx.lineWidth = 0.5;
				ctx.strokeStyle = fontColor; // for strikethrough effect
				ctx.fillStyle = fontColor; // render in correct colour
				ctx.font = labelFont;

				var boxWidth = labelOpts.boxWidth,
					hitboxes = me.legendHitBoxes;

				// current position
				var drawLegendBox = function(x, y, legendItem) {
					if (isNaN(boxWidth) || boxWidth <= 0) {
						return;
					}

					// Set the ctx for the box
					ctx.save();

					ctx.fillStyle = itemOrDefault(legendItem.fillStyle, globalDefault.defaultColor);
					ctx.lineCap = itemOrDefault(legendItem.lineCap, lineDefault.borderCapStyle);
					ctx.lineDashOffset = itemOrDefault(legendItem.lineDashOffset, lineDefault.borderDashOffset);
					ctx.lineJoin = itemOrDefault(legendItem.lineJoin, lineDefault.borderJoinStyle);
					ctx.lineWidth = itemOrDefault(legendItem.lineWidth, lineDefault.borderWidth);
					ctx.strokeStyle = itemOrDefault(legendItem.strokeStyle, globalDefault.defaultColor);

					if (ctx.setLineDash) {
						// IE 9 and 10 do not support line dash
						ctx.setLineDash(itemOrDefault(legendItem.lineDash, lineDefault.borderDash));
					}

					if (opts.labels && opts.labels.usePointStyle) {
						// Recalulate x and y for drawPoint() because its expecting
						// x and y to be center of figure (instead of top left)
						var radius = fontSize * Math.SQRT2 / 2;
						var offSet = radius / Math.SQRT2;
						var centerX = x + offSet;
						var centerY = y + offSet;

						// Draw pointStyle as legend symbol
						Chart.canvasHelpers.drawPoint(ctx, legendItem.pointStyle, radius, centerX, centerY);
					}
					else {
						// Draw box as legend symbol
						ctx.strokeRect(x, y, boxWidth, fontSize);
						ctx.fillRect(x, y, boxWidth, fontSize);
					}

					ctx.restore();
				};
				var fillText = function(x, y, legendItem, textWidth) {
					ctx.fillText(legendItem.text, boxWidth + (fontSize / 2) + x, y);

					if (legendItem.hidden) {
						// Strikethrough the text if hidden
						ctx.beginPath();
						ctx.lineWidth = 2;
						ctx.moveTo(boxWidth + (fontSize / 2) + x, y + (fontSize / 2));
						ctx.lineTo(boxWidth + (fontSize / 2) + x + textWidth, y + (fontSize / 2));
						ctx.stroke();
					}
				};

				// Horizontal
				var isHorizontal = me.isHorizontal();
				if (isHorizontal) {
					cursor = {
						x: me.left + ((legendWidth - lineWidths[0]) / 2),
						y: me.top + labelOpts.padding,
						line: 0
					};
				} else {
					cursor = {
						x: me.left + labelOpts.padding,
						y: me.top + labelOpts.padding,
						line: 0
					};
				}

				var itemHeight = fontSize + labelOpts.padding;
				helpers.each(me.legendItems, function(legendItem, i) {
					var textWidth = ctx.measureText(legendItem.text).width,
						width = labelOpts.usePointStyle ?
							fontSize + (fontSize / 2) + textWidth :
							boxWidth + (fontSize / 2) + textWidth,
						x = cursor.x,
						y = cursor.y;

					if (isHorizontal) {
						if (x + width >= legendWidth) {
							y = cursor.y += itemHeight;
							cursor.line++;
							x = cursor.x = me.left + ((legendWidth - lineWidths[cursor.line]) / 2);
						}
					} else {
						if (y + itemHeight > me.bottom) {
							x = cursor.x = x + me.columnWidths[cursor.line] + labelOpts.padding;
							y = cursor.y = me.top;
							cursor.line++;
						}
					}

					drawLegendBox(x, y, legendItem);

					hitboxes[i].left = x;
					hitboxes[i].top = y;

					// Fill the actual label
					fillText(x, y, legendItem, textWidth);

					if (isHorizontal) {
						cursor.x += width + (labelOpts.padding);
					} else {
						cursor.y += itemHeight;
					}

				});
			}
		},

		// Handle an event
		handleEvent: function(e) {
			var me = this;
			var position = helpers.getRelativePosition(e, me.chart.chart),
				x = position.x,
				y = position.y,
				opts = me.options;

			if (x >= me.left && x <= me.right && y >= me.top && y <= me.bottom) {
				// See if we are touching one of the dataset boxes
				var lh = me.legendHitBoxes;
				for (var i = 0; i < lh.length; ++i) {
					var hitBox = lh[i];

					if (x >= hitBox.left && x <= hitBox.left + hitBox.width && y >= hitBox.top && y <= hitBox.top + hitBox.height) {
						// Touching an element
						if (opts.onClick) {
							opts.onClick.call(me, e, me.legendItems[i]);
						}
						break;
					}
				}
			}
		}
	});

	// Register the legend plugin
	Chart.plugins.register({
		beforeInit: function(chartInstance) {
			var opts = chartInstance.options;
			var legendOpts = opts.legend;

			if (legendOpts) {
				chartInstance.legend = new Chart.Legend({
					ctx: chartInstance.chart.ctx,
					options: legendOpts,
					chart: chartInstance
				});

				Chart.layoutService.addBox(chartInstance, chartInstance.legend);
			}
		}
	});
};

},{}],30:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var noop = Chart.helpers.noop;

	/**
	 * The plugin service singleton
	 * @namespace Chart.plugins
	 * @since 2.1.0
	 */
	Chart.plugins = {
		_plugins: [],

		/**
		 * Registers the given plugin(s) if not already registered.
		 * @param {Array|Object} plugins plugin instance(s).
		 */
		register: function(plugins) {
			var p = this._plugins;
			([]).concat(plugins).forEach(function(plugin) {
				if (p.indexOf(plugin) === -1) {
					p.push(plugin);
				}
			});
		},

		/**
		 * Unregisters the given plugin(s) only if registered.
		 * @param {Array|Object} plugins plugin instance(s).
		 */
		unregister: function(plugins) {
			var p = this._plugins;
			([]).concat(plugins).forEach(function(plugin) {
				var idx = p.indexOf(plugin);
				if (idx !== -1) {
					p.splice(idx, 1);
				}
			});
		},

		/**
		 * Remove all registered p^lugins.
		 * @since 2.1.5
		 */
		clear: function() {
			this._plugins = [];
		},

		/**
		 * Returns the number of registered plugins?
		 * @returns {Number}
		 * @since 2.1.5
		 */
		count: function() {
			return this._plugins.length;
		},

		/**
		 * Returns all registered plugin intances.
		 * @returns {Array} array of plugin objects.
		 * @since 2.1.5
		 */
		getAll: function() {
			return this._plugins;
		},

		/**
		 * Calls registered plugins on the specified extension, with the given args. This
		 * method immediately returns as soon as a plugin explicitly returns false. The
		 * returned value can be used, for instance, to interrupt the current action.
		 * @param {String} extension the name of the plugin method to call (e.g. 'beforeUpdate').
		 * @param {Array} [args] extra arguments to apply to the extension call.
		 * @returns {Boolean} false if any of the plugins return false, else returns true.
		 */
		notify: function(extension, args) {
			var plugins = this._plugins;
			var ilen = plugins.length;
			var i, plugin;

			for (i=0; i<ilen; ++i) {
				plugin = plugins[i];
				if (typeof plugin[extension] === 'function') {
					if (plugin[extension].apply(plugin, args || []) === false) {
						return false;
					}
				}
			}

			return true;
		}
	};

	/**
	 * Plugin extension methods.
	 * @interface Chart.PluginBase
	 * @since 2.1.0
	 */
	Chart.PluginBase = Chart.Element.extend({
		// Called at start of chart init
		beforeInit: noop,

		// Called at end of chart init
		afterInit: noop,

		// Called at start of update
		beforeUpdate: noop,

		// Called at end of update
		afterUpdate: noop,

		// Called at start of draw
		beforeDraw: noop,

		// Called at end of draw
		afterDraw: noop,

		// Called during destroy
		destroy: noop
	});

	/**
	 * Provided for backward compatibility, use Chart.plugins instead
	 * @namespace Chart.pluginService
	 * @deprecated since version 2.1.5
	 * @todo remove me at version 3
	 */
	Chart.pluginService = Chart.plugins;
};

},{}],31:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.scale = {
		display: true,
		position: "left",

		// grid line settings
		gridLines: {
			display: true,
			color: "rgba(0, 0, 0, 0.1)",
			lineWidth: 1,
			drawBorder: true,
			drawOnChartArea: true,
			drawTicks: true,
			tickMarkLength: 10,
			zeroLineWidth: 1,
			zeroLineColor: "rgba(0,0,0,0.25)",
			offsetGridLines: false,
			borderDash: [],
			borderDashOffset: 0.0
		},

		// scale label
		scaleLabel: {
			// actual label
			labelString: '',

			// display property
			display: false
		},

		// label settings
		ticks: {
			beginAtZero: false,
			minRotation: 0,
			maxRotation: 50,
			mirror: false,
			padding: 10,
			reverse: false,
			display: true,
			autoSkip: true,
			autoSkipPadding: 0,
			labelOffset: 0,
			// We pass through arrays to be rendered as multiline labels, we convert Others to strings here.
			callback: function(value) {
				return helpers.isArray(value) ? value : '' + value;
			}
		}
	};

	Chart.Scale = Chart.Element.extend({

		// These methods are ordered by lifecyle. Utilities then follow.
		// Any function defined here is inherited by all scale types.
		// Any function can be extended by the scale type

		beforeUpdate: function() {
			helpers.callCallback(this.options.beforeUpdate, [this]);
		},
		update: function(maxWidth, maxHeight, margins) {
			var me = this;

			// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
			me.beforeUpdate();

			// Absorb the master measurements
			me.maxWidth = maxWidth;
			me.maxHeight = maxHeight;
			me.margins = helpers.extend({
				left: 0,
				right: 0,
				top: 0,
				bottom: 0
			}, margins);

			// Dimensions
			me.beforeSetDimensions();
			me.setDimensions();
			me.afterSetDimensions();

			// Data min/max
			me.beforeDataLimits();
			me.determineDataLimits();
			me.afterDataLimits();

			// Ticks
			me.beforeBuildTicks();
			me.buildTicks();
			me.afterBuildTicks();

			me.beforeTickToLabelConversion();
			me.convertTicksToLabels();
			me.afterTickToLabelConversion();

			// Tick Rotation
			me.beforeCalculateTickRotation();
			me.calculateTickRotation();
			me.afterCalculateTickRotation();
			// Fit
			me.beforeFit();
			me.fit();
			me.afterFit();
			//
			me.afterUpdate();

			return me.minSize;

		},
		afterUpdate: function() {
			helpers.callCallback(this.options.afterUpdate, [this]);
		},

		//

		beforeSetDimensions: function() {
			helpers.callCallback(this.options.beforeSetDimensions, [this]);
		},
		setDimensions: function() {
			var me = this;
			// Set the unconstrained dimension before label rotation
			if (me.isHorizontal()) {
				// Reset position before calculating rotation
				me.width = me.maxWidth;
				me.left = 0;
				me.right = me.width;
			} else {
				me.height = me.maxHeight;

				// Reset position before calculating rotation
				me.top = 0;
				me.bottom = me.height;
			}

			// Reset padding
			me.paddingLeft = 0;
			me.paddingTop = 0;
			me.paddingRight = 0;
			me.paddingBottom = 0;
		},
		afterSetDimensions: function() {
			helpers.callCallback(this.options.afterSetDimensions, [this]);
		},

		// Data limits
		beforeDataLimits: function() {
			helpers.callCallback(this.options.beforeDataLimits, [this]);
		},
		determineDataLimits: helpers.noop,
		afterDataLimits: function() {
			helpers.callCallback(this.options.afterDataLimits, [this]);
		},

		//
		beforeBuildTicks: function() {
			helpers.callCallback(this.options.beforeBuildTicks, [this]);
		},
		buildTicks: helpers.noop,
		afterBuildTicks: function() {
			helpers.callCallback(this.options.afterBuildTicks, [this]);
		},

		beforeTickToLabelConversion: function() {
			helpers.callCallback(this.options.beforeTickToLabelConversion, [this]);
		},
		convertTicksToLabels: function() {
			var me = this;
			// Convert ticks to strings
			me.ticks = me.ticks.map(function(numericalTick, index, ticks) {
					if (me.options.ticks.userCallback) {
						return me.options.ticks.userCallback(numericalTick, index, ticks);
					}
					return me.options.ticks.callback(numericalTick, index, ticks);
				},
				me);
		},
		afterTickToLabelConversion: function() {
			helpers.callCallback(this.options.afterTickToLabelConversion, [this]);
		},

		//

		beforeCalculateTickRotation: function() {
			helpers.callCallback(this.options.beforeCalculateTickRotation, [this]);
		},
		calculateTickRotation: function() {
			var me = this;
			var context = me.ctx;
			var globalDefaults = Chart.defaults.global;
			var optionTicks = me.options.ticks;

			//Get the width of each grid by calculating the difference
			//between x offsets between 0 and 1.
			var tickFontSize = helpers.getValueOrDefault(optionTicks.fontSize, globalDefaults.defaultFontSize);
			var tickFontStyle = helpers.getValueOrDefault(optionTicks.fontStyle, globalDefaults.defaultFontStyle);
			var tickFontFamily = helpers.getValueOrDefault(optionTicks.fontFamily, globalDefaults.defaultFontFamily);
			var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
			context.font = tickLabelFont;

			var firstWidth = context.measureText(me.ticks[0]).width;
			var lastWidth = context.measureText(me.ticks[me.ticks.length - 1]).width;
			var firstRotated;

			me.labelRotation = optionTicks.minRotation || 0;
			me.paddingRight = 0;
			me.paddingLeft = 0;

			if (me.options.display) {
				if (me.isHorizontal()) {
					me.paddingRight = lastWidth / 2 + 3;
					me.paddingLeft = firstWidth / 2 + 3;

					if (!me.longestTextCache) {
						me.longestTextCache = {};
					}
					var originalLabelWidth = helpers.longestText(context, tickLabelFont, me.ticks, me.longestTextCache);
					var labelWidth = originalLabelWidth;
					var cosRotation;
					var sinRotation;

					// Allow 3 pixels x2 padding either side for label readability
					// only the index matters for a dataset scale, but we want a consistent interface between scales
					var tickWidth = me.getPixelForTick(1) - me.getPixelForTick(0) - 6;

					//Max label rotation can be set or default to 90 - also act as a loop counter
					while (labelWidth > tickWidth && me.labelRotation < optionTicks.maxRotation) {
						cosRotation = Math.cos(helpers.toRadians(me.labelRotation));
						sinRotation = Math.sin(helpers.toRadians(me.labelRotation));

						firstRotated = cosRotation * firstWidth;

						// We're right aligning the text now.
						if (firstRotated + tickFontSize / 2 > me.yLabelWidth) {
							me.paddingLeft = firstRotated + tickFontSize / 2;
						}

						me.paddingRight = tickFontSize / 2;

						if (sinRotation * originalLabelWidth > me.maxHeight) {
							// go back one step
							me.labelRotation--;
							break;
						}

						me.labelRotation++;
						labelWidth = cosRotation * originalLabelWidth;
					}
				}
			}

			if (me.margins) {
				me.paddingLeft = Math.max(me.paddingLeft - me.margins.left, 0);
				me.paddingRight = Math.max(me.paddingRight - me.margins.right, 0);
			}
		},
		afterCalculateTickRotation: function() {
			helpers.callCallback(this.options.afterCalculateTickRotation, [this]);
		},

		//

		beforeFit: function() {
			helpers.callCallback(this.options.beforeFit, [this]);
		},
		fit: function() {
			var me = this;
			// Reset
			var minSize = me.minSize = {
				width: 0,
				height: 0
			};

			var opts = me.options;
			var globalDefaults = Chart.defaults.global;
			var tickOpts = opts.ticks;
			var scaleLabelOpts = opts.scaleLabel;
			var gridLineOpts = opts.gridLines;
			var display = opts.display;
			var isHorizontal = me.isHorizontal();

			var tickFontSize = helpers.getValueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
			var tickFontStyle = helpers.getValueOrDefault(tickOpts.fontStyle, globalDefaults.defaultFontStyle);
			var tickFontFamily = helpers.getValueOrDefault(tickOpts.fontFamily, globalDefaults.defaultFontFamily);
			var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);

			var scaleLabelFontSize = helpers.getValueOrDefault(scaleLabelOpts.fontSize, globalDefaults.defaultFontSize);

			var tickMarkLength = opts.gridLines.tickMarkLength;

			// Width
			if (isHorizontal) {
				// subtract the margins to line up with the chartArea if we are a full width scale
				minSize.width = me.isFullWidth() ? me.maxWidth - me.margins.left - me.margins.right : me.maxWidth;
			} else {
				minSize.width = display && gridLineOpts.drawTicks ? tickMarkLength : 0;
			}

			// height
			if (isHorizontal) {
				minSize.height = display && gridLineOpts.drawTicks ? tickMarkLength : 0;
			} else {
				minSize.height = me.maxHeight; // fill all the height
			}

			// Are we showing a title for the scale?
			if (scaleLabelOpts.display && display) {
				if (isHorizontal) {
					minSize.height += (scaleLabelFontSize * 1.5);
				} else {
					minSize.width += (scaleLabelFontSize * 1.5);
				}
			}

			if (tickOpts.display && display) {
				// Don't bother fitting the ticks if we are not showing them
				if (!me.longestTextCache) {
					me.longestTextCache = {};
				}

				var largestTextWidth = helpers.longestText(me.ctx, tickLabelFont, me.ticks, me.longestTextCache);
				var tallestLabelHeightInLines = helpers.numberOfLabelLines(me.ticks);
				var lineSpace = tickFontSize * 0.5;

				if (isHorizontal) {
					// A horizontal axis is more constrained by the height.
					me.longestLabelWidth = largestTextWidth;

					// TODO - improve this calculation
					var labelHeight = (Math.sin(helpers.toRadians(me.labelRotation)) * me.longestLabelWidth) + (tickFontSize * tallestLabelHeightInLines) + (lineSpace * tallestLabelHeightInLines);

					minSize.height = Math.min(me.maxHeight, minSize.height + labelHeight);
					me.ctx.font = tickLabelFont;

					var firstLabelWidth = me.ctx.measureText(me.ticks[0]).width;
					var lastLabelWidth = me.ctx.measureText(me.ticks[me.ticks.length - 1]).width;

					// Ensure that our ticks are always inside the canvas. When rotated, ticks are right aligned which means that the right padding is dominated
					// by the font height
					var cosRotation = Math.cos(helpers.toRadians(me.labelRotation));
					var sinRotation = Math.sin(helpers.toRadians(me.labelRotation));
					me.paddingLeft = me.labelRotation !== 0 ? (cosRotation * firstLabelWidth) + 3 : firstLabelWidth / 2 + 3; // add 3 px to move away from canvas edges
					me.paddingRight = me.labelRotation !== 0 ? (sinRotation * (tickFontSize / 2)) + 3 : lastLabelWidth / 2 + 3; // when rotated
				} else {
					// A vertical axis is more constrained by the width. Labels are the dominant factor here, so get that length first
					var maxLabelWidth = me.maxWidth - minSize.width;

					// Account for padding
					var mirror = tickOpts.mirror;
					if (!mirror) {
						largestTextWidth += me.options.ticks.padding;
					} else {
						// If mirrored text is on the inside so don't expand
						largestTextWidth = 0;
					}

					if (largestTextWidth < maxLabelWidth) {
						// We don't need all the room
						minSize.width += largestTextWidth;
					} else {
						// Expand to max size
						minSize.width = me.maxWidth;
					}

					me.paddingTop = tickFontSize / 2;
					me.paddingBottom = tickFontSize / 2;
				}
			}

			if (me.margins) {
				me.paddingLeft = Math.max(me.paddingLeft - me.margins.left, 0);
				me.paddingTop = Math.max(me.paddingTop - me.margins.top, 0);
				me.paddingRight = Math.max(me.paddingRight - me.margins.right, 0);
				me.paddingBottom = Math.max(me.paddingBottom - me.margins.bottom, 0);
			}

			me.width = minSize.width;
			me.height = minSize.height;

		},
		afterFit: function() {
			helpers.callCallback(this.options.afterFit, [this]);
		},

		// Shared Methods
		isHorizontal: function() {
			return this.options.position === "top" || this.options.position === "bottom";
		},
		isFullWidth: function() {
			return (this.options.fullWidth);
		},

		// Get the correct value. NaN bad inputs, If the value type is object get the x or y based on whether we are horizontal or not
		getRightValue: function(rawValue) {
			// Null and undefined values first
			if (rawValue === null || typeof(rawValue) === 'undefined') {
				return NaN;
			}
			// isNaN(object) returns true, so make sure NaN is checking for a number
			if (typeof(rawValue) === 'number' && isNaN(rawValue)) {
				return NaN;
			}
			// If it is in fact an object, dive in one more level
			if (typeof(rawValue) === "object") {
				if ((rawValue instanceof Date) || (rawValue.isValid)) {
					return rawValue;
				} else {
					return this.getRightValue(this.isHorizontal() ? rawValue.x : rawValue.y);
				}
			}

			// Value is good, return it
			return rawValue;
		},

		// Used to get the value to display in the tooltip for the data at the given index
		// function getLabelForIndex(index, datasetIndex)
		getLabelForIndex: helpers.noop,

		// Used to get data value locations.  Value can either be an index or a numerical value
		getPixelForValue: helpers.noop,

		// Used to get the data value from a given pixel. This is the inverse of getPixelForValue
		getValueForPixel: helpers.noop,

		// Used for tick location, should
		getPixelForTick: function(index, includeOffset) {
			var me = this;
			if (me.isHorizontal()) {
				var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
				var tickWidth = innerWidth / Math.max((me.ticks.length - ((me.options.gridLines.offsetGridLines) ? 0 : 1)), 1);
				var pixel = (tickWidth * index) + me.paddingLeft;

				if (includeOffset) {
					pixel += tickWidth / 2;
				}

				var finalVal = me.left + Math.round(pixel);
				finalVal += me.isFullWidth() ? me.margins.left : 0;
				return finalVal;
			} else {
				var innerHeight = me.height - (me.paddingTop + me.paddingBottom);
				return me.top + (index * (innerHeight / (me.ticks.length - 1)));
			}
		},

		// Utility for getting the pixel location of a percentage of scale
		getPixelForDecimal: function(decimal /*, includeOffset*/ ) {
			var me = this;
			if (me.isHorizontal()) {
				var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
				var valueOffset = (innerWidth * decimal) + me.paddingLeft;

				var finalVal = me.left + Math.round(valueOffset);
				finalVal += me.isFullWidth() ? me.margins.left : 0;
				return finalVal;
			} else {
				return me.top + (decimal * me.height);
			}
		},

		getBasePixel: function() {
			var me = this;
			var min = me.min;
			var max = me.max;

			return me.getPixelForValue(
				me.beginAtZero? 0:
				min < 0 && max < 0? max :
				min > 0 && max > 0? min :
				0);
		},

		// Actualy draw the scale on the canvas
		// @param {rectangle} chartArea : the area of the chart to draw full grid lines on
		draw: function(chartArea) {
			var me = this;
			var options = me.options;
			if (!options.display) {
				return;
			}

			var context = me.ctx;
			var globalDefaults = Chart.defaults.global;
			var optionTicks = options.ticks;
			var gridLines = options.gridLines;
			var scaleLabel = options.scaleLabel;

			var isRotated = me.labelRotation !== 0;
			var skipRatio;
			var useAutoskipper = optionTicks.autoSkip;
			var isHorizontal = me.isHorizontal();

			// figure out the maximum number of gridlines to show
			var maxTicks;
			if (optionTicks.maxTicksLimit) {
				maxTicks = optionTicks.maxTicksLimit;
			}

			var tickFontColor = helpers.getValueOrDefault(optionTicks.fontColor, globalDefaults.defaultFontColor);
			var tickFontSize = helpers.getValueOrDefault(optionTicks.fontSize, globalDefaults.defaultFontSize);
			var tickFontStyle = helpers.getValueOrDefault(optionTicks.fontStyle, globalDefaults.defaultFontStyle);
			var tickFontFamily = helpers.getValueOrDefault(optionTicks.fontFamily, globalDefaults.defaultFontFamily);
			var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
			var tl = gridLines.tickMarkLength;
			var borderDash = helpers.getValueOrDefault(gridLines.borderDash, globalDefaults.borderDash);
			var borderDashOffset = helpers.getValueOrDefault(gridLines.borderDashOffset, globalDefaults.borderDashOffset);

			var scaleLabelFontColor = helpers.getValueOrDefault(scaleLabel.fontColor, globalDefaults.defaultFontColor);
			var scaleLabelFontSize = helpers.getValueOrDefault(scaleLabel.fontSize, globalDefaults.defaultFontSize);
			var scaleLabelFontStyle = helpers.getValueOrDefault(scaleLabel.fontStyle, globalDefaults.defaultFontStyle);
			var scaleLabelFontFamily = helpers.getValueOrDefault(scaleLabel.fontFamily, globalDefaults.defaultFontFamily);
			var scaleLabelFont = helpers.fontString(scaleLabelFontSize, scaleLabelFontStyle, scaleLabelFontFamily);

			var labelRotationRadians = helpers.toRadians(me.labelRotation);
			var cosRotation = Math.cos(labelRotationRadians);
			var longestRotatedLabel = me.longestLabelWidth * cosRotation;

			// Make sure we draw text in the correct color and font
			context.fillStyle = tickFontColor;

			var itemsToDraw = [];

			if (isHorizontal) {
				skipRatio = false;

				// Only calculate the skip ratio with the half width of longestRotateLabel if we got an actual rotation
				// See #2584
				if (isRotated) {
					longestRotatedLabel /= 2;
				}

				if ((longestRotatedLabel + optionTicks.autoSkipPadding) * me.ticks.length > (me.width - (me.paddingLeft + me.paddingRight))) {
					skipRatio = 1 + Math.floor(((longestRotatedLabel + optionTicks.autoSkipPadding) * me.ticks.length) / (me.width - (me.paddingLeft + me.paddingRight)));
				}

				// if they defined a max number of optionTicks,
				// increase skipRatio until that number is met
				if (maxTicks && me.ticks.length > maxTicks) {
					while (!skipRatio || me.ticks.length / (skipRatio || 1) > maxTicks) {
						if (!skipRatio) {
							skipRatio = 1;
						}
						skipRatio += 1;
					}
				}

				if (!useAutoskipper) {
					skipRatio = false;
				}
			}


			var xTickStart = options.position === "right" ? me.left : me.right - tl;
			var xTickEnd = options.position === "right" ? me.left + tl : me.right;
			var yTickStart = options.position === "bottom" ? me.top : me.bottom - tl;
			var yTickEnd = options.position === "bottom" ? me.top + tl : me.bottom;

			helpers.each(me.ticks, function (label, index) {

			    //Affinity:
			    //SG: Enhanced to skip ticks & gridlines along with labels when the ticks are ''
				// If the callback returned a null or undefined value, do not draw this line
				if (label === undefined || label === null || label === '') {
					return;
				}

				var isLastTick = me.ticks.length === index + 1;

				// Since we always show the last tick,we need may need to hide the last shown one before
				var shouldSkip = (skipRatio > 1 && index % skipRatio > 0) || (index % skipRatio === 0 && index + skipRatio >= me.ticks.length);
				if (shouldSkip && !isLastTick || (label === undefined || label === null)) {
					return;
				}

				var lineWidth, lineColor;
				if (index === (typeof me.zeroLineIndex !== 'undefined' ? me.zeroLineIndex : 0)) {
					// Draw the first index specially
					lineWidth = gridLines.zeroLineWidth;
					lineColor = gridLines.zeroLineColor;
				} else  {
					lineWidth = helpers.getValueAtIndexOrDefault(gridLines.lineWidth, index);
					lineColor = helpers.getValueAtIndexOrDefault(gridLines.color, index);
				}

				// Common properties
				var tx1, ty1, tx2, ty2, x1, y1, x2, y2, labelX, labelY;
				var textAlign, textBaseline = 'middle';

				if (isHorizontal) {
					if (!isRotated) {
						textBaseline = options.position === 'top' ? 'bottom' : 'top';
					}

					textAlign = isRotated ? 'right' : 'center';

					var xLineValue = me.getPixelForTick(index) + helpers.aliasPixel(lineWidth); // xvalues for grid lines
					labelX = me.getPixelForTick(index, gridLines.offsetGridLines) + optionTicks.labelOffset; // x values for optionTicks (need to consider offsetLabel option)
					labelY = (isRotated) ? me.top + 12 : options.position === 'top' ? me.bottom - tl : me.top + tl;

					tx1 = tx2 = x1 = x2 = xLineValue;
					ty1 = yTickStart;
					ty2 = yTickEnd;
					y1 = chartArea.top;
					y2 = chartArea.bottom;
				} else {
					if (options.position === 'left') {
						if (optionTicks.mirror) {
							labelX = me.right + optionTicks.padding;
							textAlign = 'left';
						} else {
							labelX = me.right - optionTicks.padding;
							textAlign = 'right';
						}
					} else {
						// right side
						if (optionTicks.mirror) {
							labelX = me.left - optionTicks.padding;
							textAlign = 'right';
						} else {
							labelX = me.left + optionTicks.padding;
							textAlign = 'left';
						}
					}

					var yLineValue = me.getPixelForTick(index); // xvalues for grid lines
					yLineValue += helpers.aliasPixel(lineWidth);
					labelY = me.getPixelForTick(index, gridLines.offsetGridLines);

					tx1 = xTickStart;
					tx2 = xTickEnd;
					x1 = chartArea.left;
					x2 = chartArea.right;
					ty1 = ty2 = y1 = y2 = yLineValue;
				}

				itemsToDraw.push({
					tx1: tx1,
					ty1: ty1,
					tx2: tx2,
					ty2: ty2,
					x1: x1,
					y1: y1,
					x2: x2,
					y2: y2,
					labelX: labelX,
					labelY: labelY,
					glWidth: lineWidth,
					glColor: lineColor,
					glBorderDash: borderDash,
					glBorderDashOffset: borderDashOffset,
					rotation: -1 * labelRotationRadians,
					label: label,
					textBaseline: textBaseline,
					textAlign: textAlign
				});
			});

			// Draw all of the tick labels, tick marks, and grid lines at the correct places
			helpers.each(itemsToDraw, function(itemToDraw) {
				if (gridLines.display) {
					context.save();
					context.lineWidth = itemToDraw.glWidth;
					context.strokeStyle = itemToDraw.glColor;
					if (context.setLineDash) {
						context.setLineDash(itemToDraw.glBorderDash);
						context.lineDashOffset = itemToDraw.glBorderDashOffset;
					}

					context.beginPath();

					if (gridLines.drawTicks) {
						context.moveTo(itemToDraw.tx1, itemToDraw.ty1);
						context.lineTo(itemToDraw.tx2, itemToDraw.ty2);
					}

					if (gridLines.drawOnChartArea) {
						context.moveTo(itemToDraw.x1, itemToDraw.y1);
						context.lineTo(itemToDraw.x2, itemToDraw.y2);
					}

					context.stroke();
					context.restore();
				}

				if (optionTicks.display) {
					context.save();
					context.translate(itemToDraw.labelX, itemToDraw.labelY);
					context.rotate(itemToDraw.rotation);
					context.font = tickLabelFont;
					context.textBaseline = itemToDraw.textBaseline;
					context.textAlign = itemToDraw.textAlign;

					var label = itemToDraw.label;
					if (helpers.isArray(label)) {
						for (var i = 0, y = 0; i < label.length; ++i) {
							// We just make sure the multiline element is a string here..
							context.fillText('' + label[i], 0, y);
							// apply same lineSpacing as calculated @ L#320
							y += (tickFontSize * 1.5);
						}
					} else {
						context.fillText(label, 0, 0);
					}
					context.restore();
				}
			});

			if (scaleLabel.display) {
				// Draw the scale label
				var scaleLabelX;
				var scaleLabelY;
				var rotation = 0;

				if (isHorizontal) {
					scaleLabelX = me.left + ((me.right - me.left) / 2); // midpoint of the width
					scaleLabelY = options.position === 'bottom' ? me.bottom - (scaleLabelFontSize / 2) : me.top + (scaleLabelFontSize / 2);
				} else {
					var isLeft = options.position === 'left';
					scaleLabelX = isLeft ? me.left + (scaleLabelFontSize / 2) : me.right - (scaleLabelFontSize / 2);
					scaleLabelY = me.top + ((me.bottom - me.top) / 2);
					rotation = isLeft ? -0.5 * Math.PI : 0.5 * Math.PI;
				}

				context.save();
				context.translate(scaleLabelX, scaleLabelY);
				context.rotate(rotation);
				context.textAlign = 'center';
				context.textBaseline = 'middle';
				context.fillStyle = scaleLabelFontColor; // render in correct colour
				context.font = scaleLabelFont;
				context.fillText(scaleLabel.labelString, 0, 0);
				context.restore();
			}

			if (gridLines.drawBorder) {
				// Draw the line at the edge of the axis
				context.lineWidth = helpers.getValueAtIndexOrDefault(gridLines.lineWidth, 0);
				context.strokeStyle = helpers.getValueAtIndexOrDefault(gridLines.color, 0);
				var x1 = me.left,
					x2 = me.right,
					y1 = me.top,
					y2 = me.bottom;

				var aliasPixel = helpers.aliasPixel(context.lineWidth);
				if (isHorizontal) {
					y1 = y2 = options.position === 'top' ? me.bottom : me.top;
					y1 += aliasPixel;
					y2 += aliasPixel;
				} else {
					x1 = x2 = options.position === 'left' ? me.right : me.left;
					x1 += aliasPixel;
					x2 += aliasPixel;
				}

				context.beginPath();
				context.moveTo(x1, y1);
				context.lineTo(x2, y2);
				context.stroke();
			}
		}
	});
};

},{}],32:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.scaleService = {
		// Scale registration object. Extensions can register new scale types (such as log or DB scales) and then
		// use the new chart options to grab the correct scale
		constructors: {},
		// Use a registration function so that we can move to an ES6 map when we no longer need to support
		// old browsers

		// Scale config defaults
		defaults: {},
		registerScaleType: function(type, scaleConstructor, defaults) {
			this.constructors[type] = scaleConstructor;
			this.defaults[type] = helpers.clone(defaults);
		},
		getScaleConstructor: function(type) {
			return this.constructors.hasOwnProperty(type) ? this.constructors[type] : undefined;
		},
		getScaleDefaults: function(type) {
			// Return the scale defaults merged with the global settings so that we always use the latest ones
			return this.defaults.hasOwnProperty(type) ? helpers.scaleMerge(Chart.defaults.scale, this.defaults[type]) : {};
		},
		updateScaleDefaults: function(type, additions) {
			var defaults = this.defaults;
			if (defaults.hasOwnProperty(type)) {
				defaults[type] = helpers.extend(defaults[type], additions);
			}
		},
		addScalesToLayout: function(chartInstance) {
			// Adds each scale to the chart.boxes array to be sized accordingly
			helpers.each(chartInstance.scales, function(scale) {
				Chart.layoutService.addBox(chartInstance, scale);
			});
		}
	};
};
},{}],33:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.global.title = {
		display: false,
		position: 'top',
		fullWidth: true, // marks that this box should take the full width of the canvas (pushing down other boxes)

		fontStyle: 'bold',
		padding: 10,

		// actual title
		text: ''
	};

	var noop = helpers.noop;
	Chart.Title = Chart.Element.extend({

		initialize: function(config) {
			var me = this;
			helpers.extend(me, config);
			me.options = helpers.configMerge(Chart.defaults.global.title, config.options);

			// Contains hit boxes for each dataset (in dataset order)
			me.legendHitBoxes = [];
		},

		// These methods are ordered by lifecyle. Utilities then follow.

		beforeUpdate: function () {
			var chartOpts = this.chart.options;
			if (chartOpts && chartOpts.title) {
				this.options = helpers.configMerge(Chart.defaults.global.title, chartOpts.title);
			}
		},
		update: function(maxWidth, maxHeight, margins) {
			var me = this;

			// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
			me.beforeUpdate();

			// Absorb the master measurements
			me.maxWidth = maxWidth;
			me.maxHeight = maxHeight;
			me.margins = margins;

			// Dimensions
			me.beforeSetDimensions();
			me.setDimensions();
			me.afterSetDimensions();
			// Labels
			me.beforeBuildLabels();
			me.buildLabels();
			me.afterBuildLabels();

			// Fit
			me.beforeFit();
			me.fit();
			me.afterFit();
			//
			me.afterUpdate();

			return me.minSize;

		},
		afterUpdate: noop,

		//

		beforeSetDimensions: noop,
		setDimensions: function() {
			var me = this;
			// Set the unconstrained dimension before label rotation
			if (me.isHorizontal()) {
				// Reset position before calculating rotation
				me.width = me.maxWidth;
				me.left = 0;
				me.right = me.width;
			} else {
				me.height = me.maxHeight;

				// Reset position before calculating rotation
				me.top = 0;
				me.bottom = me.height;
			}

			// Reset padding
			me.paddingLeft = 0;
			me.paddingTop = 0;
			me.paddingRight = 0;
			me.paddingBottom = 0;

			// Reset minSize
			me.minSize = {
				width: 0,
				height: 0
			};
		},
		afterSetDimensions: noop,

		//

		beforeBuildLabels: noop,
		buildLabels: noop,
		afterBuildLabels: noop,

		//

		beforeFit: noop,
		fit: function() {
			var me = this,
				valueOrDefault = helpers.getValueOrDefault,
				opts = me.options,
				globalDefaults = Chart.defaults.global,
				display = opts.display,
				fontSize = valueOrDefault(opts.fontSize, globalDefaults.defaultFontSize),
				minSize = me.minSize;

			if (me.isHorizontal()) {
				minSize.width = me.maxWidth; // fill all the width
				minSize.height = display ? fontSize + (opts.padding * 2) : 0;
			} else {
				minSize.width = display ? fontSize + (opts.padding * 2) : 0;
				minSize.height = me.maxHeight; // fill all the height
			}

			me.width = minSize.width;
			me.height = minSize.height;

		},
		afterFit: noop,

		// Shared Methods
		isHorizontal: function() {
			var pos = this.options.position;
			return pos === "top" || pos === "bottom";
		},

		// Actualy draw the title block on the canvas
		draw: function() {
			var me = this,
				ctx = me.ctx,
				valueOrDefault = helpers.getValueOrDefault,
				opts = me.options,
				globalDefaults = Chart.defaults.global;

			if (opts.display) {
				var fontSize = valueOrDefault(opts.fontSize, globalDefaults.defaultFontSize),
					fontStyle = valueOrDefault(opts.fontStyle, globalDefaults.defaultFontStyle),
					fontFamily = valueOrDefault(opts.fontFamily, globalDefaults.defaultFontFamily),
					titleFont = helpers.fontString(fontSize, fontStyle, fontFamily),
					rotation = 0,
					titleX,
					titleY,
					top = me.top,
					left = me.left,
					bottom = me.bottom,
					right = me.right;

				ctx.fillStyle = valueOrDefault(opts.fontColor, globalDefaults.defaultFontColor); // render in correct colour
				ctx.font = titleFont;

				// Horizontal
				if (me.isHorizontal()) {
					titleX = left + ((right - left) / 2); // midpoint of the width
					titleY = top + ((bottom - top) / 2); // midpoint of the height
				} else {
					titleX = opts.position === 'left' ? left + (fontSize / 2) : right - (fontSize / 2);
					titleY = top + ((bottom - top) / 2);
					rotation = Math.PI * (opts.position === 'left' ? -0.5 : 0.5);
				}

				ctx.save();
				ctx.translate(titleX, titleY);
				ctx.rotate(rotation);
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(opts.text, 0, 0);
				ctx.restore();
			}
		}
	});

	// Register the title plugin
	Chart.plugins.register({
		beforeInit: function(chartInstance) {
			var opts = chartInstance.options;
			var titleOpts = opts.title;

			if (titleOpts) {
				chartInstance.titleBlock = new Chart.Title({
					ctx: chartInstance.chart.ctx,
					options: titleOpts,
					chart: chartInstance
				});

				Chart.layoutService.addBox(chartInstance, chartInstance.titleBlock);
			}
		}
	});
};

},{}],34:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.global.tooltips = {
		enabled: true,
		custom: null,
		mode: 'single',
		backgroundColor: "rgba(0,0,0,0.8)",
		titleFontStyle: "bold",
		titleSpacing: 2,
		titleMarginBottom: 6,
		titleFontColor: "#fff",
		titleAlign: "left",
		bodySpacing: 2,
		bodyFontColor: "#fff",
		bodyAlign: "left",
		footerFontStyle: "bold",
		footerSpacing: 2,
		footerMarginTop: 6,
		footerFontColor: "#fff",
		footerAlign: "left",
		yPadding: 6,
		xPadding: 6,
		yAlign : 'center',
		xAlign : 'center',
		caretSize: 5,
		cornerRadius: 6,
		multiKeyBackground: '#fff',
		callbacks: {
			// Args are: (tooltipItems, data)
			beforeTitle: helpers.noop,
			title: function(tooltipItems, data) {
				// Pick first xLabel for now
				var title = '';
				var labels = data.labels;
				var labelCount = labels ? labels.length : 0;

				if (tooltipItems.length > 0) {
					var item = tooltipItems[0];

				    //Affinity:
				    //SG: always display those labels please.
					//if (item.xLabel) {
					//	title = item.xLabel;
					//} else if (labelCount > 0 && item.index < labelCount) {
						title = labels[item.index];
					//}
				}

				return title;
			},
			afterTitle: helpers.noop,

			// Args are: (tooltipItems, data)
			beforeBody: helpers.noop,

			// Args are: (tooltipItem, data)
			beforeLabel: helpers.noop,
			label: function(tooltipItem, data) {
				var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
				return datasetLabel + ': ' + tooltipItem.yLabel;
			},
			labelColor: function(tooltipItem, chartInstance) {
				var meta = chartInstance.getDatasetMeta(tooltipItem.datasetIndex);
				var activeElement = meta.data[tooltipItem.index];
				var view = activeElement._view;
				return {
					borderColor: view.borderColor,
					backgroundColor: view.backgroundColor
				};
			},
			afterLabel: helpers.noop,

			// Args are: (tooltipItems, data)
			afterBody: helpers.noop,

			// Args are: (tooltipItems, data)
			beforeFooter: helpers.noop,
			footer: helpers.noop,
			afterFooter: helpers.noop
		}
	};

	// Helper to push or concat based on if the 2nd parameter is an array or not
	function pushOrConcat(base, toPush) {
		if (toPush) {
			if (helpers.isArray(toPush)) {
				//base = base.concat(toPush);
				Array.prototype.push.apply(base, toPush);
			} else {
				base.push(toPush);
			}
		}

		return base;
	}

	function getAveragePosition(elements) {
		if (!elements.length) {
			return false;
		}

		var i, len;
		var xPositions = [];
		var yPositions = [];

		for (i = 0, len = elements.length; i < len; ++i) {
			var el = elements[i];
			if (el && el.hasValue()){
				var pos = el.tooltipPosition();
				xPositions.push(pos.x);
				yPositions.push(pos.y);
			}
		}

		var x = 0,
			y = 0;
		for (i = 0; i < xPositions.length; ++i) {
			if (xPositions[ i ]) {
				x += xPositions[i];
				y += yPositions[i];
			}
		}

		return {
			x: Math.round(x / xPositions.length),
			y: Math.round(y / xPositions.length)
		};
	}

	// Private helper to create a tooltip iteam model
	// @param element : the chart element (point, arc, bar) to create the tooltip item for
	// @return : new tooltip item
	function createTooltipItem(element) {
		var xScale = element._xScale;
		var yScale = element._yScale || element._scale; // handle radar || polarArea charts
		var index = element._index,
			datasetIndex = element._datasetIndex;

		return {
			xLabel: xScale ? xScale.getLabelForIndex(index, datasetIndex) : '',
			yLabel: yScale ? yScale.getLabelForIndex(index, datasetIndex) : '',
			index: index,
			datasetIndex: datasetIndex
		};
	}

	Chart.Tooltip = Chart.Element.extend({
		initialize: function() {
			var me = this;
			var globalDefaults = Chart.defaults.global;
			var tooltipOpts = me._options;
			var getValueOrDefault = helpers.getValueOrDefault;

			helpers.extend(me, {
				_model: {
					// Positioning
					xPadding: tooltipOpts.xPadding,
					yPadding: tooltipOpts.yPadding,
					xAlign : tooltipOpts.xAlign,
					yAlign : tooltipOpts.yAlign,

					// Body
					bodyFontColor: tooltipOpts.bodyFontColor,
					_bodyFontFamily: getValueOrDefault(tooltipOpts.bodyFontFamily, globalDefaults.defaultFontFamily),
					_bodyFontStyle: getValueOrDefault(tooltipOpts.bodyFontStyle, globalDefaults.defaultFontStyle),
					_bodyAlign: tooltipOpts.bodyAlign,
					bodyFontSize: getValueOrDefault(tooltipOpts.bodyFontSize, globalDefaults.defaultFontSize),
					bodySpacing: tooltipOpts.bodySpacing,

					// Title
					titleFontColor: tooltipOpts.titleFontColor,
					_titleFontFamily: getValueOrDefault(tooltipOpts.titleFontFamily, globalDefaults.defaultFontFamily),
					_titleFontStyle: getValueOrDefault(tooltipOpts.titleFontStyle, globalDefaults.defaultFontStyle),
					titleFontSize: getValueOrDefault(tooltipOpts.titleFontSize, globalDefaults.defaultFontSize),
					_titleAlign: tooltipOpts.titleAlign,
					titleSpacing: tooltipOpts.titleSpacing,
					titleMarginBottom: tooltipOpts.titleMarginBottom,

					// Footer
					footerFontColor: tooltipOpts.footerFontColor,
					_footerFontFamily: getValueOrDefault(tooltipOpts.footerFontFamily, globalDefaults.defaultFontFamily),
					_footerFontStyle: getValueOrDefault(tooltipOpts.footerFontStyle, globalDefaults.defaultFontStyle),
					footerFontSize: getValueOrDefault(tooltipOpts.footerFontSize, globalDefaults.defaultFontSize),
					_footerAlign: tooltipOpts.footerAlign,
					footerSpacing: tooltipOpts.footerSpacing,
					footerMarginTop: tooltipOpts.footerMarginTop,

					// Appearance
					caretSize: tooltipOpts.caretSize,
					cornerRadius: tooltipOpts.cornerRadius,
					backgroundColor: tooltipOpts.backgroundColor,
					opacity: 0,
					legendColorBackground: tooltipOpts.multiKeyBackground
				}
			});
		},

		// Get the title
		// Args are: (tooltipItem, data)
		getTitle: function() {
			var me = this;
			var opts = me._options;
			var callbacks = opts.callbacks;

			var beforeTitle = callbacks.beforeTitle.apply(me, arguments),
				title = callbacks.title.apply(me, arguments),
				afterTitle = callbacks.afterTitle.apply(me, arguments);

			var lines = [];
			lines = pushOrConcat(lines, beforeTitle);
			lines = pushOrConcat(lines, title);
			lines = pushOrConcat(lines, afterTitle);

			return lines;
		},

		// Args are: (tooltipItem, data)
		getBeforeBody: function() {
			var lines = this._options.callbacks.beforeBody.apply(this, arguments);
			return helpers.isArray(lines) ? lines : lines !== undefined ? [lines] : [];
		},

		// Args are: (tooltipItem, data)
		getBody: function(tooltipItems, data) {
			var me = this;
			var callbacks = me._options.callbacks;
			var bodyItems = [];

			helpers.each(tooltipItems, function(tooltipItem) {
				var bodyItem = {
					before: [],
					lines: [],
					after: []
				};
				pushOrConcat(bodyItem.before, callbacks.beforeLabel.call(me, tooltipItem, data));
				pushOrConcat(bodyItem.lines, callbacks.label.call(me, tooltipItem, data));
				pushOrConcat(bodyItem.after, callbacks.afterLabel.call(me, tooltipItem, data));

				bodyItems.push(bodyItem);
			});

			return bodyItems;
		},

		// Args are: (tooltipItem, data)
		getAfterBody: function() {
			var lines = this._options.callbacks.afterBody.apply(this, arguments);
			return helpers.isArray(lines) ? lines : lines !== undefined ? [lines] : [];
		},

		// Get the footer and beforeFooter and afterFooter lines
		// Args are: (tooltipItem, data)
		getFooter: function() {
			var me = this;
			var callbacks = me._options.callbacks;

			var beforeFooter = callbacks.beforeFooter.apply(me, arguments);
			var footer = callbacks.footer.apply(me, arguments);
			var afterFooter = callbacks.afterFooter.apply(me, arguments);

			var lines = [];
			lines = pushOrConcat(lines, beforeFooter);
			lines = pushOrConcat(lines, footer);
			lines = pushOrConcat(lines, afterFooter);

			return lines;
		},

		update: function(changed) {
			var me = this;
			var opts = me._options;
			var model = me._model;
			var active = me._active;

			var data = me._data;
			var chartInstance = me._chartInstance;

			var i, len;

			if (active.length) {
				model.opacity = 1;

				var labelColors = [],
					tooltipPosition = getAveragePosition(active);

				var tooltipItems = [];
				for (i = 0, len = active.length; i < len; ++i) {
					tooltipItems.push(createTooltipItem(active[i]));
				}

				// If the user provided a sorting function, use it to modify the tooltip items
				if (opts.itemSort) {
					tooltipItems = tooltipItems.sort(function(a,b) {
						return opts.itemSort(a,b, data);
					});
				}

				// If there is more than one item, show color items
				if (active.length > 1) {
					helpers.each(tooltipItems, function(tooltipItem) {
						labelColors.push(opts.callbacks.labelColor.call(me, tooltipItem, chartInstance));
					});
				}

				// Build the Text Lines
				helpers.extend(model, {
					title: me.getTitle(tooltipItems, data),
					beforeBody: me.getBeforeBody(tooltipItems, data),
					body: me.getBody(tooltipItems, data),
					afterBody: me.getAfterBody(tooltipItems, data),
					footer: me.getFooter(tooltipItems, data),
					x: Math.round(tooltipPosition.x),
					y: Math.round(tooltipPosition.y),
					caretPadding: helpers.getValueOrDefault(tooltipPosition.padding, 2),
					labelColors: labelColors
				});

				// We need to determine alignment of
				var tooltipSize = me.getTooltipSize(model);
				me.determineAlignment(tooltipSize); // Smart Tooltip placement to stay on the canvas

				helpers.extend(model, me.getBackgroundPoint(model, tooltipSize));
			} else {
				me._model.opacity = 0;
			}

			if (changed && opts.custom) {
				opts.custom.call(me, model);
			}

			return me;
		},
		getTooltipSize: function(vm) {
			var ctx = this._chart.ctx;

			var size = {
				height: vm.yPadding * 2, // Tooltip Padding
				width: 0
			};

			// Count of all lines in the body
			var body = vm.body;
			var combinedBodyLength = body.reduce(function(count, bodyItem) {
				return count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length;
			}, 0);
			combinedBodyLength += vm.beforeBody.length + vm.afterBody.length;

			var titleLineCount = vm.title.length;
			var footerLineCount = vm.footer.length;
			var titleFontSize = vm.titleFontSize,
				bodyFontSize = vm.bodyFontSize,
				footerFontSize = vm.footerFontSize;

			size.height += titleLineCount * titleFontSize; // Title Lines
			size.height += (titleLineCount - 1) * vm.titleSpacing; // Title Line Spacing
			size.height += titleLineCount ? vm.titleMarginBottom : 0; // Title's bottom Margin
			size.height += combinedBodyLength * bodyFontSize; // Body Lines
			size.height += combinedBodyLength ? (combinedBodyLength - 1) * vm.bodySpacing : 0; // Body Line Spacing
			size.height += footerLineCount ? vm.footerMarginTop : 0; // Footer Margin
			size.height += footerLineCount * (footerFontSize); // Footer Lines
			size.height += footerLineCount ? (footerLineCount - 1) * vm.footerSpacing : 0; // Footer Line Spacing

			// Title width
			var widthPadding = 0;
			var maxLineWidth = function(line) {
				size.width = Math.max(size.width, ctx.measureText(line).width + widthPadding);
			};

			ctx.font = helpers.fontString(titleFontSize, vm._titleFontStyle, vm._titleFontFamily);
			helpers.each(vm.title, maxLineWidth);

			// Body width
			ctx.font = helpers.fontString(bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);
			helpers.each(vm.beforeBody.concat(vm.afterBody), maxLineWidth);

			// Body lines may include some extra width due to the color box
			widthPadding = body.length > 1 ? (bodyFontSize + 2) : 0;
			helpers.each(body, function(bodyItem) {
				helpers.each(bodyItem.before, maxLineWidth);
				helpers.each(bodyItem.lines, maxLineWidth);
				helpers.each(bodyItem.after, maxLineWidth);
			});

			// Reset back to 0
			widthPadding = 0;

			// Footer width
			ctx.font = helpers.fontString(footerFontSize, vm._footerFontStyle, vm._footerFontFamily);
			helpers.each(vm.footer, maxLineWidth);

			// Add padding
			size.width += 2 * vm.xPadding;

			return size;
		},
		determineAlignment: function(size) {
			var me = this;
			var model = me._model;
			var chart = me._chart;
			var chartArea = me._chartInstance.chartArea;

			if (model.y < size.height) {
				model.yAlign = 'top';
			} else if (model.y > (chart.height - size.height)) {
				model.yAlign = 'bottom';
			}

			var lf, rf; // functions to determine left, right alignment
			var olf, orf; // functions to determine if left/right alignment causes tooltip to go outside chart
			var yf; // function to get the y alignment if the tooltip goes outside of the left or right edges
			var midX = (chartArea.left + chartArea.right) / 2;
			var midY = (chartArea.top + chartArea.bottom) / 2;

			if (model.yAlign === 'center') {
				lf = function(x) {
					return x <= midX;
				};
				rf = function(x) {
					return x > midX;
				};
			} else {
				lf = function(x) {
					return x <= (size.width / 2);
				};
				rf = function(x) {
					return x >= (chart.width - (size.width / 2));
				};
			}

			olf = function(x) {
				return x + size.width > chart.width;
			};
			orf = function(x) {
				return x - size.width < 0;
			};
			yf = function(y) {
				return y <= midY ? 'top' : 'bottom';
			};

			if (lf(model.x)) {
				model.xAlign = 'left';

				// Is tooltip too wide and goes over the right side of the chart.?
				if (olf(model.x)) {
					model.xAlign = 'center';
					model.yAlign = yf(model.y);
				}
			} else if (rf(model.x)) {
				model.xAlign = 'right';

				// Is tooltip too wide and goes outside left edge of canvas?
				if (orf(model.x)) {
					model.xAlign = 'center';
					model.yAlign = yf(model.y);
				}
			}
		},
		getBackgroundPoint: function(vm, size) {
			// Background Position
			var pt = {
				x: vm.x,
				y: vm.y
			};

			var caretSize = vm.caretSize,
				caretPadding = vm.caretPadding,
				cornerRadius = vm.cornerRadius,
				xAlign = vm.xAlign,
				yAlign = vm.yAlign,
				paddingAndSize = caretSize + caretPadding,
				radiusAndPadding = cornerRadius + caretPadding;

			if (xAlign === 'right') {
				pt.x -= size.width;
			} else if (xAlign === 'center') {
				pt.x -= (size.width / 2);
			}

			if (yAlign === 'top') {
				pt.y += paddingAndSize;
			} else if (yAlign === 'bottom') {
				pt.y -= size.height + paddingAndSize;
			} else {
				pt.y -= (size.height / 2);
			}

			if (yAlign === 'center') {
				if (xAlign === 'left') {
					pt.x += paddingAndSize;
				} else if (xAlign === 'right') {
					pt.x -= paddingAndSize;
				}
			} else {
				if (xAlign === 'left') {
					pt.x -= radiusAndPadding;
				} else if (xAlign === 'right') {
					pt.x += radiusAndPadding;
				}
			}

			return pt;
		},
		drawCaret: function(tooltipPoint, size, opacity) {
			var vm = this._view;
			var ctx = this._chart.ctx;
			var x1, x2, x3;
			var y1, y2, y3;
			var caretSize = vm.caretSize;
			var cornerRadius = vm.cornerRadius;
			var xAlign = vm.xAlign,
				yAlign = vm.yAlign;
			var ptX = tooltipPoint.x,
				ptY = tooltipPoint.y;
			var width = size.width,
				height = size.height;

			if (yAlign === 'center') {
				// Left or right side
				if (xAlign === 'left') {
					x1 = ptX;
					x2 = x1 - caretSize;
					x3 = x1;
				} else {
					x1 = ptX + width;
					x2 = x1 + caretSize;
					x3 = x1;
				}

				y2 = ptY + (height / 2);
				y1 = y2 - caretSize;
				y3 = y2 + caretSize;
			} else {
				if (xAlign === 'left') {
					x1 = ptX + cornerRadius;
					x2 = x1 + caretSize;
					x3 = x2 + caretSize;
				} else if (xAlign === 'right') {
					x1 = ptX + width - cornerRadius;
					x2 = x1 - caretSize;
					x3 = x2 - caretSize;
				} else {
					x2 = ptX + (width / 2);
					x1 = x2 - caretSize;
					x3 = x2 + caretSize;
				}

				if (yAlign === 'top') {
					y1 = ptY;
					y2 = y1 - caretSize;
					y3 = y1;
				} else {
					y1 = ptY + height;
					y2 = y1 + caretSize;
					y3 = y1;
				}
			}

			var bgColor = helpers.color(vm.backgroundColor);
			ctx.fillStyle = bgColor.alpha(opacity * bgColor.alpha()).rgbString();
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.lineTo(x3, y3);
			ctx.closePath();
			ctx.fill();
		},
		drawTitle: function(pt, vm, ctx, opacity) {
			var title = vm.title;

			if (title.length) {
				ctx.textAlign = vm._titleAlign;
				ctx.textBaseline = "top";

				var titleFontSize = vm.titleFontSize,
					titleSpacing = vm.titleSpacing;

				var titleFontColor = helpers.color(vm.titleFontColor);
				ctx.fillStyle = titleFontColor.alpha(opacity * titleFontColor.alpha()).rgbString();
				ctx.font = helpers.fontString(titleFontSize, vm._titleFontStyle, vm._titleFontFamily);

				var i, len;
				for (i = 0, len = title.length; i < len; ++i) {
					ctx.fillText(title[i], pt.x, pt.y);
					pt.y += titleFontSize + titleSpacing; // Line Height and spacing

					if (i + 1 === title.length) {
						pt.y += vm.titleMarginBottom - titleSpacing; // If Last, add margin, remove spacing
					}
				}
			}
		},
		drawBody: function(pt, vm, ctx, opacity) {
			var bodyFontSize = vm.bodyFontSize;
			var bodySpacing = vm.bodySpacing;
			var body = vm.body;

			ctx.textAlign = vm._bodyAlign;
			ctx.textBaseline = "top";

			var bodyFontColor = helpers.color(vm.bodyFontColor);
			var textColor = bodyFontColor.alpha(opacity * bodyFontColor.alpha()).rgbString();
			ctx.fillStyle = textColor;
			ctx.font = helpers.fontString(bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);

			// Before Body
			var xLinePadding = 0;
			var fillLineOfText = function(line) {
				ctx.fillText(line, pt.x + xLinePadding, pt.y);
				pt.y += bodyFontSize + bodySpacing;
			};

			// Before body lines
			helpers.each(vm.beforeBody, fillLineOfText);

			var drawColorBoxes = body.length > 1;
			xLinePadding = drawColorBoxes ? (bodyFontSize + 2) : 0;

			// Draw body lines now
			helpers.each(body, function(bodyItem, i) {
				helpers.each(bodyItem.before, fillLineOfText);

				helpers.each(bodyItem.lines, function(line) {
					// Draw Legend-like boxes if needed
					if (drawColorBoxes) {
						// Fill a white rect so that colours merge nicely if the opacity is < 1
						ctx.fillStyle = helpers.color(vm.legendColorBackground).alpha(opacity).rgbaString();
						ctx.fillRect(pt.x, pt.y, bodyFontSize, bodyFontSize);

						// Border
						ctx.strokeStyle = helpers.color(vm.labelColors[i].borderColor).alpha(opacity).rgbaString();
						ctx.strokeRect(pt.x, pt.y, bodyFontSize, bodyFontSize);

						// Inner square
						ctx.fillStyle = helpers.color(vm.labelColors[i].backgroundColor).alpha(opacity).rgbaString();
						ctx.fillRect(pt.x + 1, pt.y + 1, bodyFontSize - 2, bodyFontSize - 2);

						ctx.fillStyle = textColor;
					}

					fillLineOfText(line);
				});

				helpers.each(bodyItem.after, fillLineOfText);
			});

			// Reset back to 0 for after body
			xLinePadding = 0;

			// After body lines
			helpers.each(vm.afterBody, fillLineOfText);
			pt.y -= bodySpacing; // Remove last body spacing
		},
		drawFooter: function(pt, vm, ctx, opacity) {
			var footer = vm.footer;

			if (footer.length) {
				pt.y += vm.footerMarginTop;

				ctx.textAlign = vm._footerAlign;
				ctx.textBaseline = "top";

				var footerFontColor = helpers.color(vm.footerFontColor);
				ctx.fillStyle = footerFontColor.alpha(opacity * footerFontColor.alpha()).rgbString();
				ctx.font = helpers.fontString(vm.footerFontSize, vm._footerFontStyle, vm._footerFontFamily);

				helpers.each(footer, function(line) {
					ctx.fillText(line, pt.x, pt.y);
					pt.y += vm.footerFontSize + vm.footerSpacing;
				});
			}
		},
		draw: function() {
			var ctx = this._chart.ctx;
			var vm = this._view;

			if (vm.opacity === 0) {
				return;
			}

			var tooltipSize = this.getTooltipSize(vm);
			var pt = {
				x: vm.x,
				y: vm.y
			};

			// IE11/Edge does not like very small opacities, so snap to 0
			var opacity = Math.abs(vm.opacity < 1e-3) ? 0 : vm.opacity;

			if (this._options.enabled) {
				// Draw Background
				var bgColor = helpers.color(vm.backgroundColor);
				ctx.fillStyle = bgColor.alpha(opacity * bgColor.alpha()).rgbString();
				helpers.drawRoundedRectangle(ctx, pt.x, pt.y, tooltipSize.width, tooltipSize.height, vm.cornerRadius);
				ctx.fill();

				// Draw Caret
				this.drawCaret(pt, tooltipSize, opacity);

				// Draw Title, Body, and Footer
				pt.x += vm.xPadding;
				pt.y += vm.yPadding;

				// Titles
				this.drawTitle(pt, vm, ctx, opacity);

				// Body
				this.drawBody(pt, vm, ctx, opacity);

				// Footer
				this.drawFooter(pt, vm, ctx, opacity);
			}
		}
	});
};

},{}],35:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

  var helpers = Chart.helpers,
    globalOpts = Chart.defaults.global;

  globalOpts.elements.arc = {
    backgroundColor: globalOpts.defaultColor,
    borderColor: "#fff",
    borderWidth: 2
  };

  Chart.elements.Arc = Chart.Element.extend({
    inLabelRange: function(mouseX) {
      var vm = this._view;

      if (vm) {
        return (Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hoverRadius, 2));
      } else {
        return false;
      }
    },
    inRange: function(chartX, chartY) {
      var vm = this._view;

      if (vm) {
        var pointRelativePosition = helpers.getAngleFromPoint(vm, {
            x: chartX,
            y: chartY
          }),
          angle = pointRelativePosition.angle,
          distance = pointRelativePosition.distance;

        //Sanitise angle range
        var startAngle = vm.startAngle;
        var endAngle = vm.endAngle;
        while (endAngle < startAngle) {
          endAngle += 2.0 * Math.PI;
        }
        while (angle > endAngle) {
          angle -= 2.0 * Math.PI;
        }
        while (angle < startAngle) {
          angle += 2.0 * Math.PI;
        }

        //Check if within the range of the open/close angle
        var betweenAngles = (angle >= startAngle && angle <= endAngle),
          withinRadius = (distance >= vm.innerRadius && distance <= vm.outerRadius);

        return (betweenAngles && withinRadius);
      } else {
        return false;
      }
    },
    tooltipPosition: function() {
      var vm = this._view;

      var centreAngle = vm.startAngle + ((vm.endAngle - vm.startAngle) / 2),
        rangeFromCentre = (vm.outerRadius - vm.innerRadius) / 2 + vm.innerRadius;
      return {
        x: vm.x + (Math.cos(centreAngle) * rangeFromCentre),
        y: vm.y + (Math.sin(centreAngle) * rangeFromCentre)
      };
    },
    draw: function() {

      var ctx = this._chart.ctx,
        vm = this._view,
        sA = vm.startAngle,
        eA = vm.endAngle;

      ctx.beginPath();

      ctx.arc(vm.x, vm.y, vm.outerRadius, sA, eA);
      ctx.arc(vm.x, vm.y, vm.innerRadius, eA, sA, true);

      ctx.closePath();
      ctx.strokeStyle = vm.borderColor;
      ctx.lineWidth = vm.borderWidth;

      ctx.fillStyle = vm.backgroundColor;

      ctx.fill();
      ctx.lineJoin = 'bevel';

      if (vm.borderWidth) {
        ctx.stroke();
      }
    }
  });
};

},{}],36:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;
	var globalDefaults = Chart.defaults.global;

	Chart.defaults.global.elements.line = {
		tension: 0.4,
		backgroundColor: globalDefaults.defaultColor,
		borderWidth: 3,
		borderColor: globalDefaults.defaultColor,
		borderCapStyle: 'butt',
		borderDash: [],
		borderDashOffset: 0.0,
		borderJoinStyle: 'miter',
		capBezierPoints: true,
		fill: true // do we fill in the area between the line and its base axis
	};

	Chart.elements.Line = Chart.Element.extend({
		draw: function() {
			var me = this;
			var vm = me._view;
			var spanGaps = vm.spanGaps;
			var scaleZero = vm.scaleZero;
			var loop = me._loop;

			var ctx = me._chart.ctx;
			ctx.save();

			// Helper function to draw a line to a point
			function lineToPoint(previousPoint, point) {
				var vm = point._view;
				if (point._view.steppedLine === true) {
					ctx.lineTo(point._view.x, previousPoint._view.y);
					ctx.lineTo(point._view.x, point._view.y);				
				} else if (point._view.tension === 0) {
					ctx.lineTo(vm.x, vm.y);
				} else {
					ctx.bezierCurveTo(
						previousPoint._view.controlPointNextX,
						previousPoint._view.controlPointNextY,
						vm.controlPointPreviousX,
						vm.controlPointPreviousY,
						vm.x,
						vm.y
					);
				}
			}

			var points = me._children.slice(); // clone array
			var lastDrawnIndex = -1;

			// If we are looping, adding the first point again
			if (loop && points.length) {
				points.push(points[0]);
			}

			var index, current, previous, currentVM;

			// Fill Line
			if (points.length && vm.fill) {
				ctx.beginPath();

				for (index = 0; index < points.length; ++index) {
					current = points[index];
					previous = helpers.previousItem(points, index);
					currentVM = current._view;

					// First point moves to it's starting position no matter what
					if (index === 0) {
						if (loop) {
							ctx.moveTo(scaleZero.x, scaleZero.y);
						} else {
							ctx.moveTo(currentVM.x, scaleZero);
						}

						if (!currentVM.skip) {
							lastDrawnIndex = index;
							ctx.lineTo(currentVM.x, currentVM.y);
						}
					} else {
						previous = lastDrawnIndex === -1 ? previous : points[lastDrawnIndex];

						if (currentVM.skip) {
							// Only do this if this is the first point that is skipped
							if (!spanGaps && lastDrawnIndex === (index - 1)) {
								if (loop) {
									ctx.lineTo(scaleZero.x, scaleZero.y);
								} else {
									ctx.lineTo(previous._view.x, scaleZero);
								}
							}
						} else {
							if (lastDrawnIndex !== (index - 1)) {
								// There was a gap and this is the first point after the gap. If we've never drawn a point, this is a special case. 
								// If the first data point is NaN, then there is no real gap to skip
								if (spanGaps && lastDrawnIndex !== -1) {
									// We are spanning the gap, so simple draw a line to this point
									lineToPoint(previous, current);
								} else {
									if (loop) {
										ctx.lineTo(currentVM.x, currentVM.y);
									} else {
										ctx.lineTo(currentVM.x, scaleZero);
										ctx.lineTo(currentVM.x, currentVM.y);
									}
								}
							} else {
								// Line to next point
								lineToPoint(previous, current);
							}
							lastDrawnIndex = index;
						}
					}
				}

				if (!loop && lastDrawnIndex !== -1) {
					ctx.lineTo(points[lastDrawnIndex]._view.x, scaleZero);
				}

				ctx.fillStyle = vm.backgroundColor || globalDefaults.defaultColor;
				ctx.closePath();
				ctx.fill();
			}

			// Stroke Line Options
			var globalOptionLineElements = globalDefaults.elements.line;
			ctx.lineCap = vm.borderCapStyle || globalOptionLineElements.borderCapStyle;

			// IE 9 and 10 do not support line dash
			if (ctx.setLineDash) {
				ctx.setLineDash(vm.borderDash || globalOptionLineElements.borderDash);
			}

			ctx.lineDashOffset = vm.borderDashOffset || globalOptionLineElements.borderDashOffset;
			ctx.lineJoin = vm.borderJoinStyle || globalOptionLineElements.borderJoinStyle;
			ctx.lineWidth = vm.borderWidth || globalOptionLineElements.borderWidth;
			ctx.strokeStyle = vm.borderColor || globalDefaults.defaultColor;

			// Stroke Line
			ctx.beginPath();
			lastDrawnIndex = -1;

			for (index = 0; index < points.length; ++index) {
				current = points[index];
				previous = helpers.previousItem(points, index);
				currentVM = current._view;

				// First point moves to it's starting position no matter what
				if (index === 0) {
					if (!currentVM.skip) {
						ctx.moveTo(currentVM.x, currentVM.y);
						lastDrawnIndex = index;
					}
				} else {
					previous = lastDrawnIndex === -1 ? previous : points[lastDrawnIndex];

					if (!currentVM.skip) {
						if ((lastDrawnIndex !== (index - 1) && !spanGaps) || lastDrawnIndex === -1) {
							// There was a gap and this is the first point after the gap
							ctx.moveTo(currentVM.x, currentVM.y);
						} else {
							// Line to next point
							lineToPoint(previous, current);
						}
						lastDrawnIndex = index;
					}
				}
			}

			ctx.stroke();
			ctx.restore();
		}
	});
};
},{}],37:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers,
		globalOpts = Chart.defaults.global,
		defaultColor = globalOpts.defaultColor;

	globalOpts.elements.point = {
		radius: 3,
		pointStyle: 'circle',
		backgroundColor: defaultColor,
		borderWidth: 1,
		borderColor: defaultColor,
		// Hover
		hitRadius: 1,
		hoverRadius: 4,
		hoverBorderWidth: 1
	};

	Chart.elements.Point = Chart.Element.extend({
		inRange: function(mouseX, mouseY) {
			var vm = this._view;
			return vm ? ((Math.pow(mouseX - vm.x, 2) + Math.pow(mouseY - vm.y, 2)) < Math.pow(vm.hitRadius + vm.radius, 2)) : false;
		},
		inLabelRange: function(mouseX) {
			var vm = this._view;
			return vm ? (Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hitRadius, 2)) : false;
		},
		tooltipPosition: function() {
			var vm = this._view;
			return {
				x: vm.x,
				y: vm.y,
				padding: vm.radius + vm.borderWidth
			};
		},
		draw: function() {
			var vm = this._view;
			var ctx = this._chart.ctx;
			var pointStyle = vm.pointStyle;
			var radius = vm.radius;
			var x = vm.x;
			var y = vm.y;

			if (vm.skip) {
				return;
			}

			ctx.strokeStyle = vm.borderColor || defaultColor;
			ctx.lineWidth = helpers.getValueOrDefault(vm.borderWidth, globalOpts.elements.point.borderWidth);
			ctx.fillStyle = vm.backgroundColor || defaultColor;

			Chart.canvasHelpers.drawPoint(ctx, pointStyle, radius, x, y);
		}
	});
};

},{}],38:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var globalOpts = Chart.defaults.global;

	globalOpts.elements.rectangle = {
		backgroundColor: globalOpts.defaultColor,
		borderWidth: 0,
		borderColor: globalOpts.defaultColor,
		borderSkipped: 'bottom'
	};

	Chart.elements.Rectangle = Chart.Element.extend({
		draw: function() {
			var ctx = this._chart.ctx;
			var vm = this._view;

			var halfWidth = vm.width / 2,
				leftX = vm.x - halfWidth,
				rightX = vm.x + halfWidth,
				top = vm.base - (vm.base - vm.y),
				halfStroke = vm.borderWidth / 2;

			// Canvas doesn't allow us to stroke inside the width so we can
			// adjust the sizes to fit if we're setting a stroke on the line
			if (vm.borderWidth) {
				leftX += halfStroke;
				rightX -= halfStroke;
				top += halfStroke;
			}

			ctx.beginPath();
			ctx.fillStyle = vm.backgroundColor;
			ctx.strokeStyle = vm.borderColor;
			ctx.lineWidth = vm.borderWidth;

			// Corner points, from bottom-left to bottom-right clockwise
			// | 1 2 |
			// | 0 3 |
			var corners = [
				[leftX, vm.base],
				[leftX, top],
				[rightX, top],
				[rightX, vm.base]
			];

			// Find first (starting) corner with fallback to 'bottom'
			var borders = ['bottom', 'left', 'top', 'right'];
			var startCorner = borders.indexOf(vm.borderSkipped, 0);
			if (startCorner === -1)
				startCorner = 0;

			function cornerAt(index) {
				return corners[(startCorner + index) % 4];
			}

			// Draw rectangle from 'startCorner'
			ctx.moveTo.apply(ctx, cornerAt(0));
			for (var i = 1; i < 4; i++)
				ctx.lineTo.apply(ctx, cornerAt(i));

			ctx.fill();
			if (vm.borderWidth) {
				ctx.stroke();
			}
		},
		height: function() {
			var vm = this._view;
			return vm.base - vm.y;
		},
		inRange: function(mouseX, mouseY) {
			var vm = this._view;
			return vm ?
					(vm.y < vm.base ?
						(mouseX >= vm.x - vm.width / 2 && mouseX <= vm.x + vm.width / 2) && (mouseY >= vm.y && mouseY <= vm.base) :
						(mouseX >= vm.x - vm.width / 2 && mouseX <= vm.x + vm.width / 2) && (mouseY >= vm.base && mouseY <= vm.y)) :
					false;
		},
		inLabelRange: function(mouseX) {
			var vm = this._view;
			return vm ? (mouseX >= vm.x - vm.width / 2 && mouseX <= vm.x + vm.width / 2) : false;
		},
		tooltipPosition: function() {
			var vm = this._view;
			return {
				x: vm.x,
				y: vm.y
			};
		}
	});

};
},{}],39:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;
	// Default config for a category scale
	var defaultConfig = {
		position: "bottom"
	};

	var DatasetScale = Chart.Scale.extend({
		/**
		* Internal function to get the correct labels. If data.xLabels or data.yLabels are defined, use tose
		* else fall back to data.labels
		* @private
		*/
		getLabels: function() {
			var data = this.chart.data;
			return (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels;
		},
		// Implement this so that
		determineDataLimits: function() {
			var me = this;
			var labels = me.getLabels();
			me.minIndex = 0;
			me.maxIndex = labels.length - 1;
			var findIndex;

			if (me.options.ticks.min !== undefined) {
				// user specified min value
				findIndex = helpers.indexOf(labels, me.options.ticks.min);
				me.minIndex = findIndex !== -1 ? findIndex : me.minIndex;
			}

			if (me.options.ticks.max !== undefined) {
				// user specified max value
				findIndex = helpers.indexOf(labels, me.options.ticks.max);
				me.maxIndex = findIndex !== -1 ? findIndex : me.maxIndex;
			}

			me.min = labels[me.minIndex];
			me.max = labels[me.maxIndex];
		},

		buildTicks: function() {
			var me = this;
			var labels = me.getLabels();
			// If we are viewing some subset of labels, slice the original array
			me.ticks = (me.minIndex === 0 && me.maxIndex === labels.length - 1) ? labels : labels.slice(me.minIndex, me.maxIndex + 1);
		},

		getLabelForIndex: function(index) {
			return this.ticks[index];
		},

		// Used to get data value locations.  Value can either be an index or a numerical value
		getPixelForValue: function(value, index, datasetIndex, includeOffset) {
			var me = this;
			// 1 is added because we need the length but we have the indexes
			var offsetAmt = Math.max((me.maxIndex + 1 - me.minIndex - ((me.options.gridLines.offsetGridLines) ? 0 : 1)), 1);

			if (value !== undefined && isNaN(index)) {
				var labels = me.getLabels();
				var idx = labels.indexOf(value);
				index = idx !== -1 ? idx : index;
			}

			if (me.isHorizontal()) {
				var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
				var valueWidth = innerWidth / offsetAmt;
				var widthOffset = (valueWidth * (index - me.minIndex)) + me.paddingLeft;

			if (me.options.gridLines.offsetGridLines && includeOffset || me.maxIndex === me.minIndex && includeOffset) {
					widthOffset += (valueWidth / 2);
			}

				return me.left + Math.round(widthOffset);
			} else {
				var innerHeight = me.height - (me.paddingTop + me.paddingBottom);
				var valueHeight = innerHeight / offsetAmt;
				var heightOffset = (valueHeight * (index - me.minIndex)) + me.paddingTop;

				if (me.options.gridLines.offsetGridLines && includeOffset) {
					heightOffset += (valueHeight / 2);
				}

				return me.top + Math.round(heightOffset);
			}
		},
		getPixelForTick: function(index, includeOffset) {
			return this.getPixelForValue(this.ticks[index], index + this.minIndex, null, includeOffset);
		},
		getValueForPixel: function(pixel) {
			var me = this;
			var value;
			var offsetAmt = Math.max((me.ticks.length - ((me.options.gridLines.offsetGridLines) ? 0 : 1)), 1);
			var horz = me.isHorizontal();
			var innerDimension = horz ? me.width - (me.paddingLeft + me.paddingRight) : me.height - (me.paddingTop + me.paddingBottom);
			var valueDimension = innerDimension / offsetAmt;

			pixel -= horz ? me.left : me.top;

			if (me.options.gridLines.offsetGridLines) {
				pixel -= (valueDimension / 2);
			}
			pixel -= horz ? me.paddingLeft : me.paddingTop;

			if (pixel <= 0) {
				value = 0;
			} else {
				value = Math.round(pixel / valueDimension);
			}

			return value;
		},
		getBasePixel: function() {
			return this.bottom;
		}
	});

	Chart.scaleService.registerScaleType("category", DatasetScale, defaultConfig);

};
},{}],40:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	var defaultConfig = {
		position: "left",
		ticks: {
			callback: function(tickValue, index, ticks) {
				// If we have lots of ticks, don't use the ones
				var delta = ticks.length > 3 ? ticks[2] - ticks[1] : ticks[1] - ticks[0];

				// If we have a number like 2.5 as the delta, figure out how many decimal places we need
				if (Math.abs(delta) > 1) {
					if (tickValue !== Math.floor(tickValue)) {
						// not an integer
						delta = tickValue - Math.floor(tickValue);
					}
				}

				var logDelta = helpers.log10(Math.abs(delta));
				var tickString = '';

				if (tickValue !== 0) {
					var numDecimal = -1 * Math.floor(logDelta);
					numDecimal = Math.max(Math.min(numDecimal, 20), 0); // toFixed has a max of 20 decimal places
					tickString = tickValue.toFixed(numDecimal);
				} else {
					tickString = '0'; // never show decimal places for 0
				}

				return tickString;
			}
		}
	};

	var LinearScale = Chart.LinearScaleBase.extend({
		determineDataLimits: function() {
			var me = this;
			var opts = me.options;
			var chart = me.chart;
			var data = chart.data;
			var datasets = data.datasets;
			var isHorizontal = me.isHorizontal();

			function IDMatches(meta) {
				return isHorizontal ? meta.xAxisID === me.id : meta.yAxisID === me.id;
			}

			// First Calculate the range
			me.min = null;
			me.max = null;

			if (opts.stacked) {
				var valuesPerType = {};
				var hasPositiveValues = false;
				var hasNegativeValues = false;

				helpers.each(datasets, function(dataset, datasetIndex) {
					var meta = chart.getDatasetMeta(datasetIndex);
					if (valuesPerType[meta.type] === undefined) {
						valuesPerType[meta.type] = {
							positiveValues: [],
							negativeValues: []
						};
					}

					// Store these per type
					var positiveValues = valuesPerType[meta.type].positiveValues;
					var negativeValues = valuesPerType[meta.type].negativeValues;

					if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
						helpers.each(dataset.data, function(rawValue, index) {
							var value = +me.getRightValue(rawValue);
							if (isNaN(value) || meta.data[index].hidden) {
								return;
							}

							positiveValues[index] = positiveValues[index] || 0;
							negativeValues[index] = negativeValues[index] || 0;

							if (opts.relativePoints) {
								positiveValues[index] = 100;
							} else {
								if (value < 0) {
									hasNegativeValues = true;
									negativeValues[index] += value;
								} else {
									hasPositiveValues = true;
									positiveValues[index] += value;
								}
							}
						});
					}
				});

				helpers.each(valuesPerType, function(valuesForType) {
					var values = valuesForType.positiveValues.concat(valuesForType.negativeValues);
					var minVal = helpers.min(values);
					var maxVal = helpers.max(values);
					me.min = me.min === null ? minVal : Math.min(me.min, minVal);
					me.max = me.max === null ? maxVal : Math.max(me.max, maxVal);
				});

			} else {
				helpers.each(datasets, function(dataset, datasetIndex) {
					var meta = chart.getDatasetMeta(datasetIndex);
					if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
						helpers.each(dataset.data, function(rawValue, index) {
							var value = +me.getRightValue(rawValue);
							if (isNaN(value) || meta.data[index].hidden) {
								return;
							}

							if (me.min === null) {
								me.min = value;
							} else if (value < me.min) {
								me.min = value;
							}

							if (me.max === null) {
								me.max = value;
							} else if (value > me.max) {
								me.max = value;
							}
						});
					}
				});
			}

			// Common base implementation to handle ticks.min, ticks.max, ticks.beginAtZero
			this.handleTickRangeOptions();
		},
		getTickLimit: function() {
			var maxTicks;
			var me = this;
			var tickOpts = me.options.ticks;

			if (me.isHorizontal()) {
				maxTicks = Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(me.width / 50));
			} else {
				// The factor of 2 used to scale the font size has been experimentally determined.
				var tickFontSize = helpers.getValueOrDefault(tickOpts.fontSize, Chart.defaults.global.defaultFontSize);
				maxTicks = Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(me.height / (2 * tickFontSize)));
			}

			return maxTicks;
		},
		// Called after the ticks are built. We need
		handleDirectionalChanges: function() {
			if (!this.isHorizontal()) {
				// We are in a vertical orientation. The top value is the highest. So reverse the array
				this.ticks.reverse();
			}
		},
		getLabelForIndex: function(index, datasetIndex) {
			return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
		},
		// Utils
		getPixelForValue: function(value) {
			// This must be called after fit has been run so that
			// this.left, this.top, this.right, and this.bottom have been defined
			var me = this;
			var paddingLeft = me.paddingLeft;
			var paddingBottom = me.paddingBottom;
			var start = me.start;

			var rightValue = +me.getRightValue(value);
			var pixel;
			var innerDimension;
			var range = me.end - start;

			if (me.isHorizontal()) {
				innerDimension = me.width - (paddingLeft + me.paddingRight);
				pixel = me.left + (innerDimension / range * (rightValue - start));
				return Math.round(pixel + paddingLeft);
			} else {
				innerDimension = me.height - (me.paddingTop + paddingBottom);
				pixel = (me.bottom - paddingBottom) - (innerDimension / range * (rightValue - start));
				return Math.round(pixel);
			}
		},
		getValueForPixel: function(pixel) {
			var me = this;
			var isHorizontal = me.isHorizontal();
			var paddingLeft = me.paddingLeft;
			var paddingBottom = me.paddingBottom;
			var innerDimension = isHorizontal ? me.width - (paddingLeft + me.paddingRight) : me.height - (me.paddingTop + paddingBottom);
			var offset = (isHorizontal ? pixel - me.left - paddingLeft : me.bottom - paddingBottom - pixel) / innerDimension;
			return me.start + ((me.end - me.start) * offset);
		},
		getPixelForTick: function(index) {
			return this.getPixelForValue(this.ticksAsNumbers[index]);
		}
	});
	Chart.scaleService.registerScaleType("linear", LinearScale, defaultConfig);

};
},{}],41:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers,
		noop = helpers.noop;

	Chart.LinearScaleBase = Chart.Scale.extend({
		handleTickRangeOptions: function() {
			var me = this;
			var opts = me.options;
			var tickOpts = opts.ticks;

			// If we are forcing it to begin at 0, but 0 will already be rendered on the chart,
			// do nothing since that would make the chart weird. If the user really wants a weird chart
			// axis, they can manually override it
			if (tickOpts.beginAtZero) {
				var minSign = helpers.sign(me.min);
				var maxSign = helpers.sign(me.max);

				if (minSign < 0 && maxSign < 0) {
					// move the top up to 0
					me.max = 0;
				} else if (minSign > 0 && maxSign > 0) {
					// move the botttom down to 0
					me.min = 0;
				}
			}

			if (tickOpts.min !== undefined) {
				me.min = tickOpts.min;
			} else if (tickOpts.suggestedMin !== undefined) {
				me.min = Math.min(me.min, tickOpts.suggestedMin);
			}

			if (tickOpts.max !== undefined) {
				me.max = tickOpts.max;
			} else if (tickOpts.suggestedMax !== undefined) {
				me.max = Math.max(me.max, tickOpts.suggestedMax);
			}

			if (me.min === me.max) {
				me.max++;

				if (!tickOpts.beginAtZero) {
					me.min--;
				}
			}
		},
		getTickLimit: noop,
		handleDirectionalChanges: noop,

		buildTicks: function() {
			var me = this;
			var opts = me.options;
			var ticks = me.ticks = [];
			var tickOpts = opts.ticks;
			var getValueOrDefault = helpers.getValueOrDefault;

			// Figure out what the max number of ticks we can support it is based on the size of
			// the axis area. For now, we say that the minimum tick spacing in pixels must be 50
			// We also limit the maximum number of ticks to 11 which gives a nice 10 squares on
			// the graph

			var maxTicks = me.getTickLimit();

			// Make sure we always have at least 2 ticks
			maxTicks = Math.max(2, maxTicks);

			// To get a "nice" value for the tick spacing, we will use the appropriately named
			// "nice number" algorithm. See http://stackoverflow.com/questions/8506881/nice-label-algorithm-for-charts-with-minimum-ticks
			// for details.

			var spacing;
			var fixedStepSizeSet = (tickOpts.fixedStepSize && tickOpts.fixedStepSize > 0) || (tickOpts.stepSize && tickOpts.stepSize > 0);
			if (fixedStepSizeSet) {
				spacing = getValueOrDefault(tickOpts.fixedStepSize, tickOpts.stepSize);
			} else {
				var niceRange = helpers.niceNum(me.max - me.min, false);
				spacing = helpers.niceNum(niceRange / (maxTicks - 1), true);
			}
			var niceMin = Math.floor(me.min / spacing) * spacing;
			var niceMax = Math.ceil(me.max / spacing) * spacing;
			var numSpaces = (niceMax - niceMin) / spacing;

			// If very close to our rounded value, use it.
			if (helpers.almostEquals(numSpaces, Math.round(numSpaces), spacing / 1000)) {
				numSpaces = Math.round(numSpaces);
			} else {
				numSpaces = Math.ceil(numSpaces);
			}

			// Put the values into the ticks array
			ticks.push(tickOpts.min !== undefined ? tickOpts.min : niceMin);
			for (var j = 1; j < numSpaces; ++j) {
				ticks.push(niceMin + (j * spacing));
			}
			ticks.push(tickOpts.max !== undefined ? tickOpts.max : niceMax);

			me.handleDirectionalChanges();

			// At this point, we need to update our max and min given the tick values since we have expanded the
			// range of the scale
			me.max = helpers.max(ticks);
			me.min = helpers.min(ticks);

			if (tickOpts.reverse) {
				ticks.reverse();

				me.start = me.max;
				me.end = me.min;
			} else {
				me.start = me.min;
				me.end = me.max;
			}
		},
		convertTicksToLabels: function() {
			var me = this;
			me.ticksAsNumbers = me.ticks.slice();
			me.zeroLineIndex = me.ticks.indexOf(0);

			Chart.Scale.prototype.convertTicksToLabels.call(me);
		}
	});
};
},{}],42:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	var defaultConfig = {
		position: "left",

		// label settings
		ticks: {
			callback: function(value, index, arr) {
				var remain = value / (Math.pow(10, Math.floor(helpers.log10(value))));

				if (value === 0){
					return '0';
				} else if (remain === 1 || remain === 2 || remain === 5 || index === 0 || index === arr.length - 1) {
					return value.toExponential();
				} else {
					return '';
				}
			}
		}
	};

	var LogarithmicScale = Chart.Scale.extend({
		determineDataLimits: function() {
			var me = this;
			var opts = me.options;
			var tickOpts = opts.ticks;
			var chart = me.chart;
			var data = chart.data;
			var datasets = data.datasets;
			var getValueOrDefault = helpers.getValueOrDefault;
			var isHorizontal = me.isHorizontal();
			function IDMatches(meta) {
				return isHorizontal ? meta.xAxisID === me.id : meta.yAxisID === me.id;
			}

			// Calculate Range
			me.min = null;
			me.max = null;
			me.minNotZero = null;

			if (opts.stacked) {
				var valuesPerType = {};

				helpers.each(datasets, function(dataset, datasetIndex) {
					var meta = chart.getDatasetMeta(datasetIndex);
					if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
						if (valuesPerType[meta.type] === undefined) {
							valuesPerType[meta.type] = [];
						}

						helpers.each(dataset.data, function(rawValue, index) {
							var values = valuesPerType[meta.type];
							var value = +me.getRightValue(rawValue);
							if (isNaN(value) || meta.data[index].hidden) {
								return;
							}

							values[index] = values[index] || 0;

							if (opts.relativePoints) {
								values[index] = 100;
							} else {
								// Don't need to split positive and negative since the log scale can't handle a 0 crossing
								values[index] += value;
							}
						});
					}
				});

				helpers.each(valuesPerType, function(valuesForType) {
					var minVal = helpers.min(valuesForType);
					var maxVal = helpers.max(valuesForType);
					me.min = me.min === null ? minVal : Math.min(me.min, minVal);
					me.max = me.max === null ? maxVal : Math.max(me.max, maxVal);
				});

			} else {
				helpers.each(datasets, function(dataset, datasetIndex) {
					var meta = chart.getDatasetMeta(datasetIndex);
					if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
						helpers.each(dataset.data, function(rawValue, index) {
							var value = +me.getRightValue(rawValue);
							if (isNaN(value) || meta.data[index].hidden) {
								return;
							}

							if (me.min === null) {
								me.min = value;
							} else if (value < me.min) {
								me.min = value;
							}

							if (me.max === null) {
								me.max = value;
							} else if (value > me.max) {
								me.max = value;
							}

							if(value !== 0 && (me.minNotZero === null || value < me.minNotZero)) {
								me.minNotZero = value;
							}
						});
					}
				});
			}

			me.min = getValueOrDefault(tickOpts.min, me.min);
			me.max = getValueOrDefault(tickOpts.max, me.max);

			if (me.min === me.max) {
				if (me.min !== 0 && me.min !== null) {
					me.min = Math.pow(10, Math.floor(helpers.log10(me.min)) - 1);
					me.max = Math.pow(10, Math.floor(helpers.log10(me.max)) + 1);
				} else {
					me.min = 1;
					me.max = 10;
				}
			}
		},
		buildTicks: function() {
			var me = this;
			var opts = me.options;
			var tickOpts = opts.ticks;
			var getValueOrDefault = helpers.getValueOrDefault;

			// Reset the ticks array. Later on, we will draw a grid line at these positions
			// The array simply contains the numerical value of the spots where ticks will be
			var ticks = me.ticks = [];

			// Figure out what the max number of ticks we can support it is based on the size of
			// the axis area. For now, we say that the minimum tick spacing in pixels must be 50
			// We also limit the maximum number of ticks to 11 which gives a nice 10 squares on
			// the graph

			var tickVal = getValueOrDefault(tickOpts.min, Math.pow(10, Math.floor(helpers.log10(me.min))));

			while (tickVal < me.max) {
				ticks.push(tickVal);

				var exp;
				var significand;

				if(tickVal === 0){
					exp = Math.floor(helpers.log10(me.minNotZero));
					significand = Math.round(me.minNotZero / Math.pow(10, exp));
				} else {
					exp = Math.floor(helpers.log10(tickVal));
					significand = Math.floor(tickVal / Math.pow(10, exp)) + 1;
				}

				if (significand === 10) {
					significand = 1;
					++exp;
				}

				tickVal = significand * Math.pow(10, exp);
			}

			var lastTick = getValueOrDefault(tickOpts.max, tickVal);
			ticks.push(lastTick);

			if (!me.isHorizontal()) {
				// We are in a vertical orientation. The top value is the highest. So reverse the array
				ticks.reverse();
			}

			// At this point, we need to update our max and min given the tick values since we have expanded the
			// range of the scale
			me.max = helpers.max(ticks);
			me.min = helpers.min(ticks);

			if (tickOpts.reverse) {
				ticks.reverse();

				me.start = me.max;
				me.end = me.min;
			} else {
				me.start = me.min;
				me.end = me.max;
			}
		},
		convertTicksToLabels: function() {
			this.tickValues = this.ticks.slice();

			Chart.Scale.prototype.convertTicksToLabels.call(this);
		},
		// Get the correct tooltip label
		getLabelForIndex: function(index, datasetIndex) {
			return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
		},
		getPixelForTick: function(index) {
			return this.getPixelForValue(this.tickValues[index]);
		},
		getPixelForValue: function(value) {
			var me = this;
			var innerDimension;
			var pixel;

			var start = me.start;
			var newVal = +me.getRightValue(value);
			var range;
			var paddingTop = me.paddingTop;
			var paddingBottom = me.paddingBottom;
			var paddingLeft = me.paddingLeft;
			var opts = me.options;
			var tickOpts = opts.ticks;

			if (me.isHorizontal()) {
				range = helpers.log10(me.end) - helpers.log10(start); // todo: if start === 0
				if (newVal === 0) {
					pixel = me.left + paddingLeft;
				} else {
					innerDimension = me.width - (paddingLeft + me.paddingRight);
					pixel = me.left + (innerDimension / range * (helpers.log10(newVal) - helpers.log10(start)));
					pixel += paddingLeft;
				}
			} else {
				// Bottom - top since pixels increase downard on a screen
				innerDimension = me.height - (paddingTop + paddingBottom);
				if(start === 0 && !tickOpts.reverse){
					range = helpers.log10(me.end) - helpers.log10(me.minNotZero);
					if (newVal === start) {
						pixel = me.bottom - paddingBottom;
					} else if(newVal === me.minNotZero){
						pixel = me.bottom - paddingBottom - innerDimension * 0.02;
					} else {
						pixel = me.bottom - paddingBottom - innerDimension * 0.02 - (innerDimension * 0.98/ range * (helpers.log10(newVal)-helpers.log10(me.minNotZero)));
					}
				} else if (me.end === 0 && tickOpts.reverse){
					range = helpers.log10(me.start) - helpers.log10(me.minNotZero);
					if (newVal === me.end) {
						pixel = me.top + paddingTop;
					} else if(newVal === me.minNotZero){
						pixel = me.top + paddingTop + innerDimension * 0.02;
					} else {
						pixel = me.top + paddingTop + innerDimension * 0.02 + (innerDimension * 0.98/ range * (helpers.log10(newVal)-helpers.log10(me.minNotZero)));
					}
				} else {
					range = helpers.log10(me.end) - helpers.log10(start);
					innerDimension = me.height - (paddingTop + paddingBottom);
					pixel = (me.bottom - paddingBottom) - (innerDimension / range * (helpers.log10(newVal) - helpers.log10(start)));
			   }
			}
			return pixel;
		},
		getValueForPixel: function(pixel) {
			var me = this;
			var range = helpers.log10(me.end) - helpers.log10(me.start);
			var value, innerDimension;

			if (me.isHorizontal()) {
				innerDimension = me.width - (me.paddingLeft + me.paddingRight);
				value = me.start * Math.pow(10, (pixel - me.left - me.paddingLeft) * range / innerDimension);
			} else {  // todo: if start === 0
				innerDimension = me.height - (me.paddingTop + me.paddingBottom);
				value = Math.pow(10, (me.bottom - me.paddingBottom - pixel) * range / innerDimension) / me.start;
			}
			return value;
		}
	});
	Chart.scaleService.registerScaleType("logarithmic", LogarithmicScale, defaultConfig);

};
},{}],43:[function(require,module,exports){
"use strict";

module.exports = function(Chart) {

	var helpers = Chart.helpers;
	var globalDefaults = Chart.defaults.global;

	var defaultConfig = {
		display: true,

		//Boolean - Whether to animate scaling the chart from the centre
		animate: true,
		lineArc: false,
		position: "chartArea",

		angleLines: {
			display: true,
			color: "rgba(0, 0, 0, 0.1)",
			lineWidth: 1
		},

		// label settings
		ticks: {
			//Boolean - Show a backdrop to the scale label
			showLabelBackdrop: true,

			//String - The colour of the label backdrop
			backdropColor: "rgba(255,255,255,0.75)",

			//Number - The backdrop padding above & below the label in pixels
			backdropPaddingY: 2,

			//Number - The backdrop padding to the side of the label in pixels
			backdropPaddingX: 2
		},

		pointLabels: {
			//Number - Point label font size in pixels
			fontSize: 10,

			//Function - Used to convert point labels
			callback: function(label) {
				return label;
			}
		}
	};

	var LinearRadialScale = Chart.LinearScaleBase.extend({
		getValueCount: function() {
			return this.chart.data.labels.length;
		},
		setDimensions: function() {
			var me = this;
			var opts = me.options;
			var tickOpts = opts.ticks;
			// Set the unconstrained dimension before label rotation
			me.width = me.maxWidth;
			me.height = me.maxHeight;
			me.xCenter = Math.round(me.width / 2);
			me.yCenter = Math.round(me.height / 2);

			var minSize = helpers.min([me.height, me.width]);
			var tickFontSize = helpers.getValueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
			me.drawingArea = opts.display ? (minSize / 2) - (tickFontSize / 2 + tickOpts.backdropPaddingY) : (minSize / 2);
		},
		determineDataLimits: function() {
			var me = this;
			var chart = me.chart;
			me.min = null;
			me.max = null;


			helpers.each(chart.data.datasets, function(dataset, datasetIndex) {
				if (chart.isDatasetVisible(datasetIndex)) {
					var meta = chart.getDatasetMeta(datasetIndex);

					helpers.each(dataset.data, function(rawValue, index) {
						var value = +me.getRightValue(rawValue);
						if (isNaN(value) || meta.data[index].hidden) {
							return;
						}

						if (me.min === null) {
							me.min = value;
						} else if (value < me.min) {
							me.min = value;
						}

						if (me.max === null) {
							me.max = value;
						} else if (value > me.max) {
							me.max = value;
						}
					});
				}
			});

			// Common base implementation to handle ticks.min, ticks.max, ticks.beginAtZero
			me.handleTickRangeOptions();
		},
		getTickLimit: function() {
			var tickOpts = this.options.ticks;
			var tickFontSize = helpers.getValueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
			return Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * tickFontSize)));
		},
		convertTicksToLabels: function() {
			var me = this;
			Chart.LinearScaleBase.prototype.convertTicksToLabels.call(me);

			// Point labels
			me.pointLabels = me.chart.data.labels.map(me.options.pointLabels.callback, me);
		},
		getLabelForIndex: function(index, datasetIndex) {
			return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
		},
		fit: function() {
			/*
			 * Right, this is really confusing and there is a lot of maths going on here
			 * The gist of the problem is here: https://gist.github.com/nnnick/696cc9c55f4b0beb8fe9
			 *
			 * Reaction: https://dl.dropboxusercontent.com/u/34601363/toomuchscience.gif
			 *
			 * Solution:
			 *
			 * We assume the radius of the polygon is half the size of the canvas at first
			 * at each index we check if the text overlaps.
			 *
			 * Where it does, we store that angle and that index.
			 *
			 * After finding the largest index and angle we calculate how much we need to remove
			 * from the shape radius to move the point inwards by that x.
			 *
			 * We average the left and right distances to get the maximum shape radius that can fit in the box
			 * along with labels.
			 *
			 * Once we have that, we can find the centre point for the chart, by taking the x text protrusion
			 * on each side, removing that from the size, halving it and adding the left x protrusion width.
			 *
			 * This will mean we have a shape fitted to the canvas, as large as it can be with the labels
			 * and position it in the most space efficient manner
			 *
			 * https://dl.dropboxusercontent.com/u/34601363/yeahscience.gif
			 */

			var pointLabels = this.options.pointLabels;
			var pointLabelFontSize = helpers.getValueOrDefault(pointLabels.fontSize, globalDefaults.defaultFontSize);
			var pointLabeFontStyle = helpers.getValueOrDefault(pointLabels.fontStyle, globalDefaults.defaultFontStyle);
			var pointLabeFontFamily = helpers.getValueOrDefault(pointLabels.fontFamily, globalDefaults.defaultFontFamily);
			var pointLabeFont = helpers.fontString(pointLabelFontSize, pointLabeFontStyle, pointLabeFontFamily);

			// Get maximum radius of the polygon. Either half the height (minus the text width) or half the width.
			// Use this to calculate the offset + change. - Make sure L/R protrusion is at least 0 to stop issues with centre points
			var largestPossibleRadius = helpers.min([(this.height / 2 - pointLabelFontSize - 5), this.width / 2]),
				pointPosition,
				i,
				textWidth,
				halfTextWidth,
				furthestRight = this.width,
				furthestRightIndex,
				furthestRightAngle,
				furthestLeft = 0,
				furthestLeftIndex,
				furthestLeftAngle,
				xProtrusionLeft,
				xProtrusionRight,
				radiusReductionRight,
				radiusReductionLeft;
			this.ctx.font = pointLabeFont;

			for (i = 0; i < this.getValueCount(); i++) {
				// 5px to space the text slightly out - similar to what we do in the draw function.
				pointPosition = this.getPointPosition(i, largestPossibleRadius);
				textWidth = this.ctx.measureText(this.pointLabels[i] ? this.pointLabels[i] : '').width + 5;

				// Add quarter circle to make degree 0 mean top of circle
				var angleRadians = this.getIndexAngle(i) + (Math.PI / 2);
				var angle = (angleRadians * 360 / (2 * Math.PI)) % 360;

				if (angle === 0 || angle === 180) {
					// At angle 0 and 180, we're at exactly the top/bottom
					// of the radar chart, so text will be aligned centrally, so we'll half it and compare
					// w/left and right text sizes
					halfTextWidth = textWidth / 2;
					if (pointPosition.x + halfTextWidth > furthestRight) {
						furthestRight = pointPosition.x + halfTextWidth;
						furthestRightIndex = i;
					}
					if (pointPosition.x - halfTextWidth < furthestLeft) {
						furthestLeft = pointPosition.x - halfTextWidth;
						furthestLeftIndex = i;
					}
				} else if (angle < 180) {
					// Less than half the values means we'll left align the text
					if (pointPosition.x + textWidth > furthestRight) {
						furthestRight = pointPosition.x + textWidth;
						furthestRightIndex = i;
					}
				} else {
					// More than half the values means we'll right align the text
					if (pointPosition.x - textWidth < furthestLeft) {
						furthestLeft = pointPosition.x - textWidth;
						furthestLeftIndex = i;
					}
				}
			}

			xProtrusionLeft = furthestLeft;
			xProtrusionRight = Math.ceil(furthestRight - this.width);

			furthestRightAngle = this.getIndexAngle(furthestRightIndex);
			furthestLeftAngle = this.getIndexAngle(furthestLeftIndex);

			radiusReductionRight = xProtrusionRight / Math.sin(furthestRightAngle + Math.PI / 2);
			radiusReductionLeft = xProtrusionLeft / Math.sin(furthestLeftAngle + Math.PI / 2);

			// Ensure we actually need to reduce the size of the chart
			radiusReductionRight = (helpers.isNumber(radiusReductionRight)) ? radiusReductionRight : 0;
			radiusReductionLeft = (helpers.isNumber(radiusReductionLeft)) ? radiusReductionLeft : 0;

			this.drawingArea = Math.round(largestPossibleRadius - (radiusReductionLeft + radiusReductionRight) / 2);
			this.setCenterPoint(radiusReductionLeft, radiusReductionRight);
		},
		setCenterPoint: function(leftMovement, rightMovement) {
			var me = this;
			var maxRight = me.width - rightMovement - me.drawingArea,
				maxLeft = leftMovement + me.drawingArea;

			me.xCenter = Math.round(((maxLeft + maxRight) / 2) + me.left);
			// Always vertically in the centre as the text height doesn't change
			me.yCenter = Math.round((me.height / 2) + me.top);
		},

		getIndexAngle: function(index) {
			var angleMultiplier = (Math.PI * 2) / this.getValueCount();
			var startAngle = this.chart.options && this.chart.options.startAngle ?
				this.chart.options.startAngle :
				0;

			var startAngleRadians = startAngle * Math.PI * 2 / 360;

			// Start from the top instead of right, so remove a quarter of the circle
			return index * angleMultiplier - (Math.PI / 2) + startAngleRadians;
		},
		getDistanceFromCenterForValue: function(value) {
			var me = this;

			if (value === null) {
				return 0; // null always in center
			}

			// Take into account half font size + the yPadding of the top value
			var scalingFactor = me.drawingArea / (me.max - me.min);
			if (me.options.reverse) {
				return (me.max - value) * scalingFactor;
			} else {
				return (value - me.min) * scalingFactor;
			}
		},
		getPointPosition: function(index, distanceFromCenter) {
			var me = this;
			var thisAngle = me.getIndexAngle(index);
			return {
				x: Math.round(Math.cos(thisAngle) * distanceFromCenter) + me.xCenter,
				y: Math.round(Math.sin(thisAngle) * distanceFromCenter) + me.yCenter
			};
		},
		getPointPositionForValue: function(index, value) {
			return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
		},

		getBasePosition: function() {
			var me = this;
			var min = me.min;
			var max = me.max;

			return me.getPointPositionForValue(0,
				me.beginAtZero? 0:
				min < 0 && max < 0? max :
				min > 0 && max > 0? min :
				0);
		},

		draw: function() {
			var me = this;
			var opts = me.options;
			var gridLineOpts = opts.gridLines;
			var tickOpts = opts.ticks;
			var angleLineOpts = opts.angleLines;
			var pointLabelOpts = opts.pointLabels;
			var getValueOrDefault = helpers.getValueOrDefault;

			if (opts.display) {
				var ctx = me.ctx;

				// Tick Font
				var tickFontSize = getValueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
				var tickFontStyle = getValueOrDefault(tickOpts.fontStyle, globalDefaults.defaultFontStyle);
				var tickFontFamily = getValueOrDefault(tickOpts.fontFamily, globalDefaults.defaultFontFamily);
				var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);

				helpers.each(me.ticks, function(label, index) {
					// Don't draw a centre value (if it is minimum)
					if (index > 0 || opts.reverse) {
						var yCenterOffset = me.getDistanceFromCenterForValue(me.ticksAsNumbers[index]);
						var yHeight = me.yCenter - yCenterOffset;

						// Draw circular lines around the scale
						if (gridLineOpts.display && index !== 0) {
							ctx.strokeStyle = helpers.getValueAtIndexOrDefault(gridLineOpts.color, index - 1);
							ctx.lineWidth = helpers.getValueAtIndexOrDefault(gridLineOpts.lineWidth, index - 1);

							if (opts.lineArc) {
								// Draw circular arcs between the points
								ctx.beginPath();
								ctx.arc(me.xCenter, me.yCenter, yCenterOffset, 0, Math.PI * 2);
								ctx.closePath();
								ctx.stroke();
							} else {
								// Draw straight lines connecting each index
								ctx.beginPath();
								for (var i = 0; i < me.getValueCount(); i++) {
									var pointPosition = me.getPointPosition(i, yCenterOffset);
									if (i === 0) {
										ctx.moveTo(pointPosition.x, pointPosition.y);
									} else {
										ctx.lineTo(pointPosition.x, pointPosition.y);
									}
								}
								ctx.closePath();
								ctx.stroke();
							}
						}

						if (tickOpts.display) {
							var tickFontColor = getValueOrDefault(tickOpts.fontColor, globalDefaults.defaultFontColor);
							ctx.font = tickLabelFont;

							if (tickOpts.showLabelBackdrop) {
								var labelWidth = ctx.measureText(label).width;
								ctx.fillStyle = tickOpts.backdropColor;
								ctx.fillRect(
									me.xCenter - labelWidth / 2 - tickOpts.backdropPaddingX,
									yHeight - tickFontSize / 2 - tickOpts.backdropPaddingY,
									labelWidth + tickOpts.backdropPaddingX * 2,
									tickFontSize + tickOpts.backdropPaddingY * 2
								);
							}

							ctx.textAlign = 'center';
							ctx.textBaseline = "middle";
							ctx.fillStyle = tickFontColor;
							ctx.fillText(label, me.xCenter, yHeight);
						}
					}
				});

				if (!opts.lineArc) {
					ctx.lineWidth = angleLineOpts.lineWidth;
					ctx.strokeStyle = angleLineOpts.color;

					var outerDistance = me.getDistanceFromCenterForValue(opts.reverse ? me.min : me.max);

					// Point Label Font
					var pointLabelFontSize = getValueOrDefault(pointLabelOpts.fontSize, globalDefaults.defaultFontSize);
					var pointLabeFontStyle = getValueOrDefault(pointLabelOpts.fontStyle, globalDefaults.defaultFontStyle);
					var pointLabeFontFamily = getValueOrDefault(pointLabelOpts.fontFamily, globalDefaults.defaultFontFamily);
					var pointLabeFont = helpers.fontString(pointLabelFontSize, pointLabeFontStyle, pointLabeFontFamily);

					for (var i = me.getValueCount() - 1; i >= 0; i--) {
						if (angleLineOpts.display) {
							var outerPosition = me.getPointPosition(i, outerDistance);
							ctx.beginPath();
							ctx.moveTo(me.xCenter, me.yCenter);
							ctx.lineTo(outerPosition.x, outerPosition.y);
							ctx.stroke();
							ctx.closePath();
						}
						// Extra 3px out for some label spacing
						var pointLabelPosition = me.getPointPosition(i, outerDistance + 5);

						// Keep this in loop since we may support array properties here
						var pointLabelFontColor = getValueOrDefault(pointLabelOpts.fontColor, globalDefaults.defaultFontColor);
						ctx.font = pointLabeFont;
						ctx.fillStyle = pointLabelFontColor;

						var pointLabels = me.pointLabels;

						// Add quarter circle to make degree 0 mean top of circle
						var angleRadians = this.getIndexAngle(i) + (Math.PI / 2);
						var angle = (angleRadians * 360 / (2 * Math.PI)) % 360;

						if (angle === 0 || angle === 180) {
							ctx.textAlign = 'center';
						} else if (angle < 180) {
							ctx.textAlign = 'left';
						} else {
							ctx.textAlign = 'right';
						}

						// Set the correct text baseline based on outer positioning
						if (angle === 90 || angle === 270) {
							ctx.textBaseline = 'middle';
						} else if (angle > 270 || angle < 90) {
							ctx.textBaseline = 'bottom';
						} else {
							ctx.textBaseline = 'top';
						}

						ctx.fillText(pointLabels[i] ? pointLabels[i] : '', pointLabelPosition.x, pointLabelPosition.y);
					}
				}
			}
		}
	});
	Chart.scaleService.registerScaleType("radialLinear", LinearRadialScale, defaultConfig);

};

},{}],44:[function(require,module,exports){
/*global window: false */
"use strict";

var moment = require(1);
moment = typeof(moment) === 'function' ? moment : window.moment;

module.exports = function(Chart) {

	var helpers = Chart.helpers;
	var time = {
		units: [{
			name: 'millisecond',
			steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
		}, {
			name: 'second',
			steps: [1, 2, 5, 10, 30]
		}, {
			name: 'minute',
			steps: [1, 2, 5, 10, 30]
		}, {
			name: 'hour',
			steps: [1, 2, 3, 6, 12]
		}, {
			name: 'day',
			steps: [1, 2, 5]
		}, {
			name: 'week',
			maxStep: 4
		}, {
			name: 'month',
			maxStep: 3
		}, {
			name: 'quarter',
			maxStep: 4
		}, {
			name: 'year',
			maxStep: false
		}]
	};

	var defaultConfig = {
		position: "bottom",

		time: {
			parser: false, // false == a pattern string from http://momentjs.com/docs/#/parsing/string-format/ or a custom callback that converts its argument to a moment
			format: false, // DEPRECATED false == date objects, moment object, callback or a pattern string from http://momentjs.com/docs/#/parsing/string-format/
			unit: false, // false == automatic or override with week, month, year, etc.
			round: false, // none, or override with week, month, year, etc.
			displayFormat: false, // DEPRECATED
			isoWeekday: false, // override week start day - see http://momentjs.com/docs/#/get-set/iso-weekday/

			// defaults to unit's corresponding unitFormat below or override using pattern string from http://momentjs.com/docs/#/displaying/format/
			displayFormats: {
				'millisecond': 'h:mm:ss.SSS a', // 11:20:01.123 AM,
				'second': 'h:mm:ss a', // 11:20:01 AM
				'minute': 'h:mm:ss a', // 11:20:01 AM
				'hour': 'MMM D, hA', // Sept 4, 5PM
				'day': 'll', // Sep 4 2015
				'week': 'll', // Week 46, or maybe "[W]WW - YYYY" ?
				'month': 'MMM YYYY', // Sept 2015
				'quarter': '[Q]Q - YYYY', // Q3
				'year': 'YYYY' // 2015
			}
		},
		ticks: {
			autoSkip: false
		}
	};

	var TimeScale = Chart.Scale.extend({
		initialize: function() {
			if (!moment) {
				throw new Error('Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com');
			}

			Chart.Scale.prototype.initialize.call(this);
		},
		getLabelMoment: function(datasetIndex, index) {
			if (typeof this.labelMoments[datasetIndex] != 'undefined') {
				return this.labelMoments[datasetIndex][index];
			}

			return null;
		},
		getMomentStartOf: function(tick) {
			var me = this;
			if (me.options.time.unit === 'week' && me.options.time.isoWeekday !== false) {
				return tick.clone().startOf('isoWeek').isoWeekday(me.options.time.isoWeekday);
			} else {
				return tick.clone().startOf(me.tickUnit);
			}
		},
		determineDataLimits: function() {
			var me = this;
			me.labelMoments = [];

			// Only parse these once. If the dataset does not have data as x,y pairs, we will use
			// these
			var scaleLabelMoments = [];
			if (me.chart.data.labels && me.chart.data.labels.length > 0) {
				helpers.each(me.chart.data.labels, function(label) {
					var labelMoment = me.parseTime(label);

					if (labelMoment.isValid()) {
						if (me.options.time.round) {
							labelMoment.startOf(me.options.time.round);
						}
						scaleLabelMoments.push(labelMoment);
					}
				}, me);

				me.firstTick = moment.min.call(me, scaleLabelMoments);
				me.lastTick = moment.max.call(me, scaleLabelMoments);
			} else {
				me.firstTick = null;
				me.lastTick = null;
			}

			helpers.each(me.chart.data.datasets, function(dataset, datasetIndex) {
				var momentsForDataset = [];
				var datasetVisible = me.chart.isDatasetVisible(datasetIndex);

				if (typeof dataset.data[0] === 'object' && dataset.data[0] !== null) {
					helpers.each(dataset.data, function(value) {
						var labelMoment = me.parseTime(me.getRightValue(value));

						if (labelMoment.isValid()) {
							if (me.options.time.round) {
								labelMoment.startOf(me.options.time.round);
							}
							momentsForDataset.push(labelMoment);

							if (datasetVisible) {
								// May have gone outside the scale ranges, make sure we keep the first and last ticks updated
								me.firstTick = me.firstTick !== null ? moment.min(me.firstTick, labelMoment) : labelMoment;
								me.lastTick = me.lastTick !== null ? moment.max(me.lastTick, labelMoment) : labelMoment;
							}
						}
					}, me);
				} else {
					// We have no labels. Use the ones from the scale
					momentsForDataset = scaleLabelMoments;
				}

				me.labelMoments.push(momentsForDataset);
			}, me);

			// Set these after we've done all the data
			if (me.options.time.min) {
				me.firstTick = me.parseTime(me.options.time.min);
			}

			if (me.options.time.max) {
				me.lastTick = me.parseTime(me.options.time.max);
			}

			// We will modify these, so clone for later
			me.firstTick = (me.firstTick || moment()).clone();
			me.lastTick = (me.lastTick || moment()).clone();
		},
		buildTicks: function() {
			var me = this;

			me.ctx.save();
			var tickFontSize = helpers.getValueOrDefault(me.options.ticks.fontSize, Chart.defaults.global.defaultFontSize);
			var tickFontStyle = helpers.getValueOrDefault(me.options.ticks.fontStyle, Chart.defaults.global.defaultFontStyle);
			var tickFontFamily = helpers.getValueOrDefault(me.options.ticks.fontFamily, Chart.defaults.global.defaultFontFamily);
			var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
			me.ctx.font = tickLabelFont;

			me.ticks = [];
			me.unitScale = 1; // How much we scale the unit by, ie 2 means 2x unit per step
			me.scaleSizeInUnits = 0; // How large the scale is in the base unit (seconds, minutes, etc)

			// Set unit override if applicable
			if (me.options.time.unit) {
				me.tickUnit = me.options.time.unit || 'day';
				me.displayFormat = me.options.time.displayFormats[me.tickUnit];
				me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true);
				me.unitScale = helpers.getValueOrDefault(me.options.time.unitStepSize, 1);
			} else {
				// Determine the smallest needed unit of the time
				var innerWidth = me.isHorizontal() ? me.width - (me.paddingLeft + me.paddingRight) : me.height - (me.paddingTop + me.paddingBottom);

				// Crude approximation of what the label length might be
				var tempFirstLabel = me.tickFormatFunction(me.firstTick, 0, []);
				var tickLabelWidth = me.ctx.measureText(tempFirstLabel).width;
				var cosRotation = Math.cos(helpers.toRadians(me.options.ticks.maxRotation));
				var sinRotation = Math.sin(helpers.toRadians(me.options.ticks.maxRotation));
				tickLabelWidth = (tickLabelWidth * cosRotation) + (tickFontSize * sinRotation);
				var labelCapacity = innerWidth / (tickLabelWidth);

				// Start as small as possible
				me.tickUnit = 'millisecond';
				me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true);
				me.displayFormat = me.options.time.displayFormats[me.tickUnit];

				var unitDefinitionIndex = 0;
				var unitDefinition = time.units[unitDefinitionIndex];

				// While we aren't ideal and we don't have units left
				while (unitDefinitionIndex < time.units.length) {
					// Can we scale this unit. If `false` we can scale infinitely
					me.unitScale = 1;

					if (helpers.isArray(unitDefinition.steps) && Math.ceil(me.scaleSizeInUnits / labelCapacity) < helpers.max(unitDefinition.steps)) {
						// Use one of the prefedined steps
						for (var idx = 0; idx < unitDefinition.steps.length; ++idx) {
							if (unitDefinition.steps[idx] >= Math.ceil(me.scaleSizeInUnits / labelCapacity)) {
								me.unitScale = helpers.getValueOrDefault(me.options.time.unitStepSize, unitDefinition.steps[idx]);
								break;
							}
						}

						break;
					} else if ((unitDefinition.maxStep === false) || (Math.ceil(me.scaleSizeInUnits / labelCapacity) < unitDefinition.maxStep)) {
						// We have a max step. Scale this unit
						me.unitScale = helpers.getValueOrDefault(me.options.time.unitStepSize, Math.ceil(me.scaleSizeInUnits / labelCapacity));
						break;
					} else {
						// Move to the next unit up
						++unitDefinitionIndex;
						unitDefinition = time.units[unitDefinitionIndex];

						me.tickUnit = unitDefinition.name;
						var leadingUnitBuffer = me.firstTick.diff(me.getMomentStartOf(me.firstTick), me.tickUnit, true);
						var trailingUnitBuffer = me.getMomentStartOf(me.lastTick.clone().add(1, me.tickUnit)).diff(me.lastTick, me.tickUnit, true);
						me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true) + leadingUnitBuffer + trailingUnitBuffer;
						me.displayFormat = me.options.time.displayFormats[unitDefinition.name];
					}
				}
			}

			var roundedStart;

			// Only round the first tick if we have no hard minimum
			if (!me.options.time.min) {
				me.firstTick = me.getMomentStartOf(me.firstTick);
				roundedStart = me.firstTick;
			} else {
				roundedStart = me.getMomentStartOf(me.firstTick);
			}

			// Only round the last tick if we have no hard maximum
			if (!me.options.time.max) {
				var roundedEnd = me.getMomentStartOf(me.lastTick);
				var delta = roundedEnd.diff(me.lastTick, me.tickUnit, true);
				if (delta < 0) {
					// Do not use end of because we need me to be in the next time unit
					me.lastTick = me.getMomentStartOf(me.lastTick.add(1, me.tickUnit));
				} else if (delta >= 0) {
					me.lastTick = roundedEnd;
				}

				me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true);
			}

			// Tick displayFormat override
			if (me.options.time.displayFormat) {
				me.displayFormat = me.options.time.displayFormat;
			}

			// first tick. will have been rounded correctly if options.time.min is not specified
			me.ticks.push(me.firstTick.clone());

			// For every unit in between the first and last moment, create a moment and add it to the ticks tick
			for (var i = 1; i <= me.scaleSizeInUnits; ++i) {
				var newTick = roundedStart.clone().add(i, me.tickUnit);

				// Are we greater than the max time
				if (me.options.time.max && newTick.diff(me.lastTick, me.tickUnit, true) >= 0) {
					break;
				}

				if (i % me.unitScale === 0) {
					me.ticks.push(newTick);
				}
			}

			// Always show the right tick
			var diff = me.ticks[me.ticks.length - 1].diff(me.lastTick, me.tickUnit);
			if (diff !== 0 || me.scaleSizeInUnits === 0) {
				// this is a weird case. If the <max> option is the same as the end option, we can't just diff the times because the tick was created from the roundedStart
				// but the last tick was not rounded.
				if (me.options.time.max) {
					me.ticks.push(me.lastTick.clone());
					me.scaleSizeInUnits = me.lastTick.diff(me.ticks[0], me.tickUnit, true);
				} else {
					me.ticks.push(me.lastTick.clone());
					me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true);
				}
			}

			me.ctx.restore();
		},
		// Get tooltip label
		getLabelForIndex: function(index, datasetIndex) {
			var me = this;
			var label = me.chart.data.labels && index < me.chart.data.labels.length ? me.chart.data.labels[index] : '';

			if (typeof me.chart.data.datasets[datasetIndex].data[0] === 'object') {
				label = me.getRightValue(me.chart.data.datasets[datasetIndex].data[index]);
			}

			// Format nicely
			if (me.options.time.tooltipFormat) {
				label = me.parseTime(label).format(me.options.time.tooltipFormat);
			}

			return label;
		},
		// Function to format an individual tick mark
		tickFormatFunction: function(tick, index, ticks) {
			var formattedTick = tick.format(this.displayFormat);
			var tickOpts = this.options.ticks;
			var callback = helpers.getValueOrDefault(tickOpts.callback, tickOpts.userCallback);

			if (callback) {
				return callback(formattedTick, index, ticks);
			} else {
				return formattedTick;
			}
		},
		convertTicksToLabels: function() {
			var me = this;
			me.tickMoments = me.ticks;
			me.ticks = me.ticks.map(me.tickFormatFunction, me);
		},
		getPixelForValue: function(value, index, datasetIndex) {
			var me = this;
			if (!value || !value.isValid) {
				// not already a moment object
				value = me.parseTime(me.getRightValue(value));
			}
			var labelMoment = value && value.isValid && value.isValid() ? value : me.getLabelMoment(datasetIndex, index);

			if (labelMoment) {
				var offset = labelMoment.diff(me.firstTick, me.tickUnit, true);

				var decimal = offset !== 0 ? offset / me.scaleSizeInUnits : offset;

				if (me.isHorizontal()) {
					var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
					var valueOffset = (innerWidth * decimal) + me.paddingLeft;

					return me.left + Math.round(valueOffset);
				} else {
					var innerHeight = me.height - (me.paddingTop + me.paddingBottom);
					var heightOffset = (innerHeight * decimal) + me.paddingTop;

					return me.top + Math.round(heightOffset);
				}
			}
		},
		getPixelForTick: function(index) {
			return this.getPixelForValue(this.tickMoments[index], null, null);
		},
		getValueForPixel: function(pixel) {
			var me = this;
			var innerDimension = me.isHorizontal() ? me.width - (me.paddingLeft + me.paddingRight) : me.height - (me.paddingTop + me.paddingBottom);
			var offset = (pixel - (me.isHorizontal() ? me.left + me.paddingLeft : me.top + me.paddingTop)) / innerDimension;
			offset *= me.scaleSizeInUnits;
			return me.firstTick.clone().add(moment.duration(offset, me.tickUnit).asSeconds(), 'seconds');
		},
		parseTime: function(label) {
			var me = this;
			if (typeof me.options.time.parser === 'string') {
				return moment(label, me.options.time.parser);
			}
			if (typeof me.options.time.parser === 'function') {
				return me.options.time.parser(label);
			}
			// Date objects
			if (typeof label.getMonth === 'function' || typeof label === 'number') {
				return moment(label);
			}
			// Moment support
			if (label.isValid && label.isValid()) {
				return label;
			}
			// Custom parsing (return an instance of moment)
			if (typeof me.options.time.format !== 'string' && me.options.time.format.call) {
				console.warn("options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale");
				return me.options.time.format(label);
			}
			// Moment format parsing
			return moment(label, me.options.time.format);
		}
	});
	Chart.scaleService.registerScaleType("time", TimeScale, defaultConfig);

};

},{"1":1}]},{},[7])(7)
});
/*****************************************************************\
|*** REFACTOR MOOTOOLS DRAG FOR MOBILE *****************************|
|*******************************************************************|
|*** Refactors the MooTools Drag class to use touch events.      ***|
|*******************************************************************|
\*****************************************************************/

if ('MooTools' in window && 'version' in MooTools && parseFloat(MooTools.version) >= 1.5 && parseFloat(MooTools.version) < 1.6) {

    Class.refactor(Drag, {
        attach: function () {
            this.handles.addEvent('touchstart', this.bound.start);
            return this.previous.apply(this, arguments);
        },
        detach: function () {
            this.handles.removeEvent('touchstart', this.bound.start);
            return this.previous.apply(this, arguments);
        },
        start: function (event) {
            if (event.type && event.type == 'touchstart') {
                event.preventDefault();
                event.stop();
            }
            var events = {
                touchmove: this.bound.check,
                touchend: this.bound.cancel
            };
            this.document.addEvents(events);
            this.previous.apply(this, arguments);
        },
        check: function (event) {
            if (event.type && event.type == 'touchmove') {
                event.preventDefault();
                event.stop();
            }
            if (this.options.preventDefault) event.preventDefault();
            var distance = Math.round(Math.sqrt(Math.pow(event.page.x - this.mouse.start.x, 2) + Math.pow(event.page.y - this.mouse.start.y, 2)));
            if (distance > this.options.snap) {
                this.cancel();
                this.document.addEvents({
                    touchmove: this.bound.drag,
                    touchend: this.bound.stop
                });
                this.fireEvent('start', [this.element, event]).fireEvent('snap', this.element);
            }
        },
        cancel: function (event) {
            this.document.removeEvents({
                touchmove: this.bound.check,
                touchend: this.bound.cancel
            });
        },
        stop: function (event) {
            var events = {
                touchmove: this.bound.drag,
                touchend: this.bound.stop
            };
            events[this.selection] = this.bound.eventStop;
            this.document.removeEvents(events);
            this.mouse.start = null;
            if (event) this.fireEvent('complete', [this.element, event]);
        }
    });

}

/*****************************************************************\
|*** REFACTOR MOOTOOLS SORTABLE ************************************|
|*******************************************************************|
|*** Refactors the MooTools Sortable class to use touch events.  ***|
|*******************************************************************|
\*****************************************************************/


if ('MooTools' in window && 'version' in MooTools && parseFloat(MooTools.version) >= 1.5 && parseFloat(MooTools.version) < 1.6) {

    Class.refactor(Sortables, {
        addItems: function () {
            Array.flatten(arguments).each(function (element) {
                this.elements.push(element);
                var start = element.retrieve('sortables:start', function (event) {
                    this.start.call(this, event, element);
                }.bind(this));
                (this.options.handle ? element.getElement(this.options.handle) || element : element).addEvent('touchstart', start);
            }, this);
            return this;
        },
        removeItems: function () {
            return $$(Array.flatten(arguments).map(function (element) {
                this.elements.erase(element);
                var start = element.retrieve('sortables:start');
                (this.options.handle ? element.getElement(this.options.handle) || element : element).removeEvent('touchstart', start);
                return element;
            }, this));
        },
        getClone: function (event, element) {
            if (!this.options.clone) return new Element(element.tagName).inject(document.body);
            if (typeOf(this.options.clone) == 'function') return this.options.clone.call(this, event, element, this.list);
            var clone = element.clone(true).setStyles({
                margin: 0,
                position: 'absolute',
                visibility: 'hidden',
                width: element.getStyle('width')
            }).addEvent('touchstart', function (event) {
                element.fireEvent('touchstart', event);
            });
            if (clone.get('html').test('radio')) {
                clone.getElements('input[type=radio]').each(function (input, i) {
                    input.set('name', 'clone_' + i);
                    if (input.get('checked')) element.getElements('input[type=radio]')[i].set('checked', true);
                });
            }
            return clone.inject(this.list).setPosition(this.getDroppableCoordinates(this.element));
        },
    });

}

/*! Hammer.JS - v2.0.8 - 2016-04-23
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function (a, b, c, d) { "use strict"; function e(a, b, c) { return setTimeout(j(a, c), b) } function f(a, b, c) { return Array.isArray(a) ? (g(a, c[b], c), !0) : !1 } function g(a, b, c) { var e; if (a) if (a.forEach) a.forEach(b, c); else if (a.length !== d) for (e = 0; e < a.length;) b.call(c, a[e], e, a), e++; else for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a) } function h(b, c, d) { var e = "DEPRECATED METHOD: " + c + "\n" + d + " AT \n"; return function () { var c = new Error("get-stack-trace"), d = c && c.stack ? c.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace", f = a.console && (a.console.warn || a.console.log); return f && f.call(a.console, e, d), b.apply(this, arguments) } } function i(a, b, c) { var d, e = b.prototype; d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && la(d, c) } function j(a, b) { return function () { return a.apply(b, arguments) } } function k(a, b) { return typeof a == oa ? a.apply(b ? b[0] || d : d, b) : a } function l(a, b) { return a === d ? b : a } function m(a, b, c) { g(q(b), function (b) { a.addEventListener(b, c, !1) }) } function n(a, b, c) { g(q(b), function (b) { a.removeEventListener(b, c, !1) }) } function o(a, b) { for (; a;) { if (a == b) return !0; a = a.parentNode } return !1 } function p(a, b) { return a.indexOf(b) > -1 } function q(a) { return a.trim().split(/\s+/g) } function r(a, b, c) { if (a.indexOf && !c) return a.indexOf(b); for (var d = 0; d < a.length;) { if (c && a[d][c] == b || !c && a[d] === b) return d; d++ } return -1 } function s(a) { return Array.prototype.slice.call(a, 0) } function t(a, b, c) { for (var d = [], e = [], f = 0; f < a.length;) { var g = b ? a[f][b] : a[f]; r(e, g) < 0 && d.push(a[f]), e[f] = g, f++ } return c && (d = b ? d.sort(function (a, c) { return a[b] > c[b] }) : d.sort()), d } function u(a, b) { for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ma.length;) { if (c = ma[g], e = c ? c + f : b, e in a) return e; g++ } return d } function v() { return ua++ } function w(b) { var c = b.ownerDocument || b; return c.defaultView || c.parentWindow || a } function x(a, b) { var c = this; this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function (b) { k(a.options.enable, [a]) && c.handler(b) }, this.init() } function y(a) { var b, c = a.options.inputClass; return new (b = c ? c : xa ? M : ya ? P : wa ? R : L)(a, z) } function z(a, b, c) { var d = c.pointers.length, e = c.changedPointers.length, f = b & Ea && d - e === 0, g = b & (Ga | Ha) && d - e === 0; c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, A(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c } function A(a, b) { var c = a.session, d = b.pointers, e = d.length; c.firstInput || (c.firstInput = D(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = D(b) : 1 === e && (c.firstMultiple = !1); var f = c.firstInput, g = c.firstMultiple, h = g ? g.center : f.center, i = b.center = E(d); b.timeStamp = ra(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = I(h, i), b.distance = H(h, i), B(c, b), b.offsetDirection = G(b.deltaX, b.deltaY); var j = F(b.deltaTime, b.deltaX, b.deltaY); b.overallVelocityX = j.x, b.overallVelocityY = j.y, b.overallVelocity = qa(j.x) > qa(j.y) ? j.x : j.y, b.scale = g ? K(g.pointers, d) : 1, b.rotation = g ? J(g.pointers, d) : 0, b.maxPointers = c.prevInput ? b.pointers.length > c.prevInput.maxPointers ? b.pointers.length : c.prevInput.maxPointers : b.pointers.length, C(c, b); var k = a.element; o(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k } function B(a, b) { var c = b.center, d = a.offsetDelta || {}, e = a.prevDelta || {}, f = a.prevInput || {}; b.eventType !== Ea && f.eventType !== Ga || (e = a.prevDelta = { x: f.deltaX || 0, y: f.deltaY || 0 }, d = a.offsetDelta = { x: c.x, y: c.y }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y) } function C(a, b) { var c, e, f, g, h = a.lastInterval || b, i = b.timeStamp - h.timeStamp; if (b.eventType != Ha && (i > Da || h.velocity === d)) { var j = b.deltaX - h.deltaX, k = b.deltaY - h.deltaY, l = F(i, j, k); e = l.x, f = l.y, c = qa(l.x) > qa(l.y) ? l.x : l.y, g = G(j, k), a.lastInterval = b } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction; b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g } function D(a) { for (var b = [], c = 0; c < a.pointers.length;) b[c] = { clientX: pa(a.pointers[c].clientX), clientY: pa(a.pointers[c].clientY) }, c++; return { timeStamp: ra(), pointers: b, center: E(b), deltaX: a.deltaX, deltaY: a.deltaY } } function E(a) { var b = a.length; if (1 === b) return { x: pa(a[0].clientX), y: pa(a[0].clientY) }; for (var c = 0, d = 0, e = 0; b > e;) c += a[e].clientX, d += a[e].clientY, e++; return { x: pa(c / b), y: pa(d / b) } } function F(a, b, c) { return { x: b / a || 0, y: c / a || 0 } } function G(a, b) { return a === b ? Ia : qa(a) >= qa(b) ? 0 > a ? Ja : Ka : 0 > b ? La : Ma } function H(a, b, c) { c || (c = Qa); var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]]; return Math.sqrt(d * d + e * e) } function I(a, b, c) { c || (c = Qa); var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]]; return 180 * Math.atan2(e, d) / Math.PI } function J(a, b) { return I(b[1], b[0], Ra) + I(a[1], a[0], Ra) } function K(a, b) { return H(b[0], b[1], Ra) / H(a[0], a[1], Ra) } function L() { this.evEl = Ta, this.evWin = Ua, this.pressed = !1, x.apply(this, arguments) } function M() { this.evEl = Xa, this.evWin = Ya, x.apply(this, arguments), this.store = this.manager.session.pointerEvents = [] } function N() { this.evTarget = $a, this.evWin = _a, this.started = !1, x.apply(this, arguments) } function O(a, b) { var c = s(a.touches), d = s(a.changedTouches); return b & (Ga | Ha) && (c = t(c.concat(d), "identifier", !0)), [c, d] } function P() { this.evTarget = bb, this.targetIds = {}, x.apply(this, arguments) } function Q(a, b) { var c = s(a.touches), d = this.targetIds; if (b & (Ea | Fa) && 1 === c.length) return d[c[0].identifier] = !0, [c, c]; var e, f, g = s(a.changedTouches), h = [], i = this.target; if (f = c.filter(function (a) { return o(a.target, i) }), b === Ea) for (e = 0; e < f.length;) d[f[e].identifier] = !0, e++; for (e = 0; e < g.length;) d[g[e].identifier] && h.push(g[e]), b & (Ga | Ha) && delete d[g[e].identifier], e++; return h.length ? [t(f.concat(h), "identifier", !0), h] : void 0 } function R() { x.apply(this, arguments); var a = j(this.handler, this); this.touch = new P(this.manager, a), this.mouse = new L(this.manager, a), this.primaryTouch = null, this.lastTouches = [] } function S(a, b) { a & Ea ? (this.primaryTouch = b.changedPointers[0].identifier, T.call(this, b)) : a & (Ga | Ha) && T.call(this, b) } function T(a) { var b = a.changedPointers[0]; if (b.identifier === this.primaryTouch) { var c = { x: b.clientX, y: b.clientY }; this.lastTouches.push(c); var d = this.lastTouches, e = function () { var a = d.indexOf(c); a > -1 && d.splice(a, 1) }; setTimeout(e, cb) } } function U(a) { for (var b = a.srcEvent.clientX, c = a.srcEvent.clientY, d = 0; d < this.lastTouches.length; d++) { var e = this.lastTouches[d], f = Math.abs(b - e.x), g = Math.abs(c - e.y); if (db >= f && db >= g) return !0 } return !1 } function V(a, b) { this.manager = a, this.set(b) } function W(a) { if (p(a, jb)) return jb; var b = p(a, kb), c = p(a, lb); return b && c ? jb : b || c ? b ? kb : lb : p(a, ib) ? ib : hb } function X() { if (!fb) return !1; var b = {}, c = a.CSS && a.CSS.supports; return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function (d) { b[d] = c ? a.CSS.supports("touch-action", d) : !0 }), b } function Y(a) { this.options = la({}, this.defaults, a || {}), this.id = v(), this.manager = null, this.options.enable = l(this.options.enable, !0), this.state = nb, this.simultaneous = {}, this.requireFail = [] } function Z(a) { return a & sb ? "cancel" : a & qb ? "end" : a & pb ? "move" : a & ob ? "start" : "" } function $(a) { return a == Ma ? "down" : a == La ? "up" : a == Ja ? "left" : a == Ka ? "right" : "" } function _(a, b) { var c = b.manager; return c ? c.get(a) : a } function aa() { Y.apply(this, arguments) } function ba() { aa.apply(this, arguments), this.pX = null, this.pY = null } function ca() { aa.apply(this, arguments) } function da() { Y.apply(this, arguments), this._timer = null, this._input = null } function ea() { aa.apply(this, arguments) } function fa() { aa.apply(this, arguments) } function ga() { Y.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0 } function ha(a, b) { return b = b || {}, b.recognizers = l(b.recognizers, ha.defaults.preset), new ia(a, b) } function ia(a, b) { this.options = la({}, ha.defaults, b || {}), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = a, this.input = y(this), this.touchAction = new V(this, this.options.touchAction), ja(this, !0), g(this.options.recognizers, function (a) { var b = this.add(new a[0](a[1])); a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]) }, this) } function ja(a, b) { var c = a.element; if (c.style) { var d; g(a.options.cssProps, function (e, f) { d = u(c.style, f), b ? (a.oldCssProps[d] = c.style[d], c.style[d] = e) : c.style[d] = a.oldCssProps[d] || "" }), b || (a.oldCssProps = {}) } } function ka(a, c) { var d = b.createEvent("Event"); d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d) } var la, ma = ["", "webkit", "Moz", "MS", "ms", "o"], na = b.createElement("div"), oa = "function", pa = Math.round, qa = Math.abs, ra = Date.now; la = "function" != typeof Object.assign ? function (a) { if (a === d || null === a) throw new TypeError("Cannot convert undefined or null to object"); for (var b = Object(a), c = 1; c < arguments.length; c++) { var e = arguments[c]; if (e !== d && null !== e) for (var f in e) e.hasOwnProperty(f) && (b[f] = e[f]) } return b } : Object.assign; var sa = h(function (a, b, c) { for (var e = Object.keys(b), f = 0; f < e.length;) (!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++; return a }, "extend", "Use `assign`."), ta = h(function (a, b) { return sa(a, b, !0) }, "merge", "Use `assign`."), ua = 1, va = /mobile|tablet|ip(ad|hone|od)|android/i, wa = "ontouchstart" in a, xa = u(a, "PointerEvent") !== d, ya = wa && va.test(navigator.userAgent), za = "touch", Aa = "pen", Ba = "mouse", Ca = "kinect", Da = 25, Ea = 1, Fa = 2, Ga = 4, Ha = 8, Ia = 1, Ja = 2, Ka = 4, La = 8, Ma = 16, Na = Ja | Ka, Oa = La | Ma, Pa = Na | Oa, Qa = ["x", "y"], Ra = ["clientX", "clientY"]; x.prototype = { handler: function () { }, init: function () { this.evEl && m(this.element, this.evEl, this.domHandler), this.evTarget && m(this.target, this.evTarget, this.domHandler), this.evWin && m(w(this.element), this.evWin, this.domHandler) }, destroy: function () { this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(w(this.element), this.evWin, this.domHandler) } }; var Sa = { mousedown: Ea, mousemove: Fa, mouseup: Ga }, Ta = "mousedown", Ua = "mousemove mouseup"; i(L, x, { handler: function (a) { var b = Sa[a.type]; b & Ea && 0 === a.button && (this.pressed = !0), b & Fa && 1 !== a.which && (b = Ga), this.pressed && (b & Ga && (this.pressed = !1), this.callback(this.manager, b, { pointers: [a], changedPointers: [a], pointerType: Ba, srcEvent: a })) } }); var Va = { pointerdown: Ea, pointermove: Fa, pointerup: Ga, pointercancel: Ha, pointerout: Ha }, Wa = { 2: za, 3: Aa, 4: Ba, 5: Ca }, Xa = "pointerdown", Ya = "pointermove pointerup pointercancel"; a.MSPointerEvent && !a.PointerEvent && (Xa = "MSPointerDown", Ya = "MSPointerMove MSPointerUp MSPointerCancel"), i(M, x, { handler: function (a) { var b = this.store, c = !1, d = a.type.toLowerCase().replace("ms", ""), e = Va[d], f = Wa[a.pointerType] || a.pointerType, g = f == za, h = r(b, a.pointerId, "pointerId"); e & Ea && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ga | Ha) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, { pointers: b, changedPointers: [a], pointerType: f, srcEvent: a }), c && b.splice(h, 1)) } }); var Za = { touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha }, $a = "touchstart", _a = "touchstart touchmove touchend touchcancel"; i(N, x, { handler: function (a) { var b = Za[a.type]; if (b === Ea && (this.started = !0), this.started) { var c = O.call(this, a, b); b & (Ga | Ha) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: za, srcEvent: a }) } } }); var ab = { touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha }, bb = "touchstart touchmove touchend touchcancel"; i(P, x, { handler: function (a) { var b = ab[a.type], c = Q.call(this, a, b); c && this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: za, srcEvent: a }) } }); var cb = 2500, db = 25; i(R, x, { handler: function (a, b, c) { var d = c.pointerType == za, e = c.pointerType == Ba; if (!(e && c.sourceCapabilities && c.sourceCapabilities.firesTouchEvents)) { if (d) S.call(this, b, c); else if (e && U.call(this, c)) return; this.callback(a, b, c) } }, destroy: function () { this.touch.destroy(), this.mouse.destroy() } }); var eb = u(na.style, "touchAction"), fb = eb !== d, gb = "compute", hb = "auto", ib = "manipulation", jb = "none", kb = "pan-x", lb = "pan-y", mb = X(); V.prototype = { set: function (a) { a == gb && (a = this.compute()), fb && this.manager.element.style && mb[a] && (this.manager.element.style[eb] = a), this.actions = a.toLowerCase().trim() }, update: function () { this.set(this.manager.options.touchAction) }, compute: function () { var a = []; return g(this.manager.recognizers, function (b) { k(b.options.enable, [b]) && (a = a.concat(b.getTouchAction())) }), W(a.join(" ")) }, preventDefaults: function (a) { var b = a.srcEvent, c = a.offsetDirection; if (this.manager.session.prevented) return void b.preventDefault(); var d = this.actions, e = p(d, jb) && !mb[jb], f = p(d, lb) && !mb[lb], g = p(d, kb) && !mb[kb]; if (e) { var h = 1 === a.pointers.length, i = a.distance < 2, j = a.deltaTime < 250; if (h && i && j) return } return g && f ? void 0 : e || f && c & Na || g && c & Oa ? this.preventSrc(b) : void 0 }, preventSrc: function (a) { this.manager.session.prevented = !0, a.preventDefault() } }; var nb = 1, ob = 2, pb = 4, qb = 8, rb = qb, sb = 16, tb = 32; Y.prototype = { defaults: {}, set: function (a) { return la(this.options, a), this.manager && this.manager.touchAction.update(), this }, recognizeWith: function (a) { if (f(a, "recognizeWith", this)) return this; var b = this.simultaneous; return a = _(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this }, dropRecognizeWith: function (a) { return f(a, "dropRecognizeWith", this) ? this : (a = _(a, this), delete this.simultaneous[a.id], this) }, requireFailure: function (a) { if (f(a, "requireFailure", this)) return this; var b = this.requireFail; return a = _(a, this), -1 === r(b, a) && (b.push(a), a.requireFailure(this)), this }, dropRequireFailure: function (a) { if (f(a, "dropRequireFailure", this)) return this; a = _(a, this); var b = r(this.requireFail, a); return b > -1 && this.requireFail.splice(b, 1), this }, hasRequireFailures: function () { return this.requireFail.length > 0 }, canRecognizeWith: function (a) { return !!this.simultaneous[a.id] }, emit: function (a) { function b(b) { c.manager.emit(b, a) } var c = this, d = this.state; qb > d && b(c.options.event + Z(d)), b(c.options.event), a.additionalEvent && b(a.additionalEvent), d >= qb && b(c.options.event + Z(d)) }, tryEmit: function (a) { return this.canEmit() ? this.emit(a) : void (this.state = tb) }, canEmit: function () { for (var a = 0; a < this.requireFail.length;) { if (!(this.requireFail[a].state & (tb | nb))) return !1; a++ } return !0 }, recognize: function (a) { var b = la({}, a); return k(this.options.enable, [this, b]) ? (this.state & (rb | sb | tb) && (this.state = nb), this.state = this.process(b), void (this.state & (ob | pb | qb | sb) && this.tryEmit(b))) : (this.reset(), void (this.state = tb)) }, process: function (a) { }, getTouchAction: function () { }, reset: function () { } }, i(aa, Y, { defaults: { pointers: 1 }, attrTest: function (a) { var b = this.options.pointers; return 0 === b || a.pointers.length === b }, process: function (a) { var b = this.state, c = a.eventType, d = b & (ob | pb), e = this.attrTest(a); return d && (c & Ha || !e) ? b | sb : d || e ? c & Ga ? b | qb : b & ob ? b | pb : ob : tb } }), i(ba, aa, { defaults: { event: "pan", threshold: 10, pointers: 1, direction: Pa }, getTouchAction: function () { var a = this.options.direction, b = []; return a & Na && b.push(lb), a & Oa && b.push(kb), b }, directionTest: function (a) { var b = this.options, c = !0, d = a.distance, e = a.direction, f = a.deltaX, g = a.deltaY; return e & b.direction || (b.direction & Na ? (e = 0 === f ? Ia : 0 > f ? Ja : Ka, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ia : 0 > g ? La : Ma, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction }, attrTest: function (a) { return aa.prototype.attrTest.call(this, a) && (this.state & ob || !(this.state & ob) && this.directionTest(a)) }, emit: function (a) { this.pX = a.deltaX, this.pY = a.deltaY; var b = $(a.direction); b && (a.additionalEvent = this.options.event + b), this._super.emit.call(this, a) } }), i(ca, aa, { defaults: { event: "pinch", threshold: 0, pointers: 2 }, getTouchAction: function () { return [jb] }, attrTest: function (a) { return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & ob) }, emit: function (a) { if (1 !== a.scale) { var b = a.scale < 1 ? "in" : "out"; a.additionalEvent = this.options.event + b } this._super.emit.call(this, a) } }), i(da, Y, { defaults: { event: "press", pointers: 1, time: 251, threshold: 9 }, getTouchAction: function () { return [hb] }, process: function (a) { var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold, f = a.deltaTime > b.time; if (this._input = a, !d || !c || a.eventType & (Ga | Ha) && !f) this.reset(); else if (a.eventType & Ea) this.reset(), this._timer = e(function () { this.state = rb, this.tryEmit() }, b.time, this); else if (a.eventType & Ga) return rb; return tb }, reset: function () { clearTimeout(this._timer) }, emit: function (a) { this.state === rb && (a && a.eventType & Ga ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = ra(), this.manager.emit(this.options.event, this._input))) } }), i(ea, aa, { defaults: { event: "rotate", threshold: 0, pointers: 2 }, getTouchAction: function () { return [jb] }, attrTest: function (a) { return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & ob) } }), i(fa, aa, { defaults: { event: "swipe", threshold: 10, velocity: .3, direction: Na | Oa, pointers: 1 }, getTouchAction: function () { return ba.prototype.getTouchAction.call(this) }, attrTest: function (a) { var b, c = this.options.direction; return c & (Na | Oa) ? b = a.overallVelocity : c & Na ? b = a.overallVelocityX : c & Oa && (b = a.overallVelocityY), this._super.attrTest.call(this, a) && c & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && qa(b) > this.options.velocity && a.eventType & Ga }, emit: function (a) { var b = $(a.offsetDirection); b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a) } }), i(ga, Y, { defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 9, posThreshold: 10 }, getTouchAction: function () { return [ib] }, process: function (a) { var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold, f = a.deltaTime < b.time; if (this.reset(), a.eventType & Ea && 0 === this.count) return this.failTimeout(); if (d && f && c) { if (a.eventType != Ga) return this.failTimeout(); var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0, h = !this.pCenter || H(this.pCenter, a.center) < b.posThreshold; this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a; var i = this.count % b.taps; if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function () { this.state = rb, this.tryEmit() }, b.interval, this), ob) : rb } return tb }, failTimeout: function () { return this._timer = e(function () { this.state = tb }, this.options.interval, this), tb }, reset: function () { clearTimeout(this._timer) }, emit: function () { this.state == rb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input)) } }), ha.VERSION = "2.0.8", ha.defaults = { domEvents: !1, touchAction: gb, enable: !0, inputTarget: null, inputClass: null, preset: [[ea, { enable: !1 }], [ca, { enable: !1 }, ["rotate"]], [fa, { direction: Na }], [ba, { direction: Na }, ["swipe"]], [ga], [ga, { event: "doubletap", taps: 2 }, ["tap"]], [da]], cssProps: { userSelect: "none", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" } }; var ub = 1, vb = 2; ia.prototype = { set: function (a) { return la(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this }, stop: function (a) { this.session.stopped = a ? vb : ub }, recognize: function (a) { var b = this.session; if (!b.stopped) { this.touchAction.preventDefaults(a); var c, d = this.recognizers, e = b.curRecognizer; (!e || e && e.state & rb) && (e = b.curRecognizer = null); for (var f = 0; f < d.length;) c = d[f], b.stopped === vb || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (ob | pb | qb) && (e = b.curRecognizer = c), f++ } }, get: function (a) { if (a instanceof Y) return a; for (var b = this.recognizers, c = 0; c < b.length; c++) if (b[c].options.event == a) return b[c]; return null }, add: function (a) { if (f(a, "add", this)) return this; var b = this.get(a.options.event); return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a }, remove: function (a) { if (f(a, "remove", this)) return this; if (a = this.get(a)) { var b = this.recognizers, c = r(b, a); -1 !== c && (b.splice(c, 1), this.touchAction.update()) } return this }, on: function (a, b) { if (a !== d && b !== d) { var c = this.handlers; return g(q(a), function (a) { c[a] = c[a] || [], c[a].push(b) }), this } }, off: function (a, b) { if (a !== d) { var c = this.handlers; return g(q(a), function (a) { b ? c[a] && c[a].splice(r(c[a], b), 1) : delete c[a] }), this } }, emit: function (a, b) { this.options.domEvents && ka(a, b); var c = this.handlers[a] && this.handlers[a].slice(); if (c && c.length) { b.type = a, b.preventDefault = function () { b.srcEvent.preventDefault() }; for (var d = 0; d < c.length;) c[d](b), d++ } }, destroy: function () { this.element && ja(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null } }, la(ha, { INPUT_START: Ea, INPUT_MOVE: Fa, INPUT_END: Ga, INPUT_CANCEL: Ha, STATE_POSSIBLE: nb, STATE_BEGAN: ob, STATE_CHANGED: pb, STATE_ENDED: qb, STATE_RECOGNIZED: rb, STATE_CANCELLED: sb, STATE_FAILED: tb, DIRECTION_NONE: Ia, DIRECTION_LEFT: Ja, DIRECTION_RIGHT: Ka, DIRECTION_UP: La, DIRECTION_DOWN: Ma, DIRECTION_HORIZONTAL: Na, DIRECTION_VERTICAL: Oa, DIRECTION_ALL: Pa, Manager: ia, Input: x, TouchAction: V, TouchInput: P, MouseInput: L, PointerEventInput: M, TouchMouseInput: R, SingleTouchInput: N, Recognizer: Y, AttrRecognizer: aa, Tap: ga, Pan: ba, Swipe: fa, Pinch: ca, Rotate: ea, Press: da, on: m, off: n, each: g, merge: ta, extend: sa, assign: la, inherit: i, bindFn: j, prefixed: u }); var wb = "undefined" != typeof a ? a : "undefined" != typeof self ? self : {}; wb.Hammer = ha, "function" == typeof define && define.amd ? define(function () { return ha }) : "undefined" != typeof module && module.exports ? module.exports = ha : a[c] = ha }(window, document, "Hammer");

//Hammer.defaults.touchAction = 'pan-y';

/*****************************************************************\
|*** STOP HAMMER EVNETS ********************************************|
|*******************************************************************|
|*** Attempt to stop Hammer and src events.                      ***|
|*******************************************************************|
\*****************************************************************/

Affinity.stopHammerEvent = function (e) {
    var event = typeOf(e) !== 'null' ? e : false;
    var srcEvent = event && typeOf(event.srcEvent) !== 'null' ? event.srcEvent : false;
    if (event) {
        try {
            e.stopPropagation();
        } catch (_ex) { }
        try {
            e.preventDefault();
        } catch (_ex) { }
    }
    if (srcEvent) {
        try {
            srcEvent.stopPropagation();
        } catch (_ex) { }
        try {
            srcEvent.preventDefault();
        } catch (_ex) { }
    }
};

/*****************************************************************\
|*** ANDROID BACK BUTTON LISTENER **********************************|
|*******************************************************************|
|*** Listen for document mobile back and fire generic win event. ***|
|*******************************************************************|
\*****************************************************************/

Affinity.mobileHistory = {};
Affinity.mobileHistory.set = function () {
    if (window.history.state===null) {
        var hashes = [];
        var uri = window.location.href;
        if (uri.indexOf('#') > -1) {
            hashes = uri.substring(uri.indexOf('#') + 1).split(',');
            uri = uri.substring(0, uri.indexOf('#'));
        }
        hashes.push('m');
        hashes = hashes.unique();
        uri += '#' + hashes.join(',');
        window.history.pushState('forward', null, uri);
    }
};
if (window.history && window.history.pushState) {
    window.addEvent('popstate', function (e) {
        try { e.stop(); } catch (e) { }
        try { e.preventDefault(); } catch (e) { }
        try { e.stopPropagation(); } catch (e) { }
        Affinity.mobileHistory.set();
        window.fireEvent('mobileback');
    });
    Affinity.mobileHistory.set();
}

/*
document.addEvent('backbutton', function (e) {
    try{
        e.stop();
    } catch (e) { }
    try {
        e.preventDefault();
    } catch (e) { }
    try {
        e.stopPropagation();
    } catch (e) { }
    alert('mobile back\r\n' + e.toString());
    window.fireEvent('mobileback');
});
*/

/*****************************************************************\
|*** RE-ASSIGN EVENT REFERENCE TO TOUCH ****************************|
|*******************************************************************|
|*** Exactly what is says on the tin.                            ***|
|*******************************************************************|
\*****************************************************************/

Affinity.mobile = true;
Affinity.events = {
    over: 'touchstart',
    out: 'touchstart',
    overAll: 'touchstart',
    outAll: 'touchend',
    start: 'touchstart',
    move: 'touchmove',
    end: 'touchend',
    click: 'touchstart'
};
