/*************************************************************************************************************************/
/**                            *******************************************************************************************/
/**   UI FRAMEWORK             *******************************************************************************************/
/**                            *******************************************************************************************/
/*************************************************************************************************************************/
/**
 * Summary.     UI Framework init code
 *
 * Description. Common inline scripts and functions used in all cases and docs.
 *              Includes overrides, prototypes and extended behaviours.
 *              The following code assumes MooTools Core 1.6.0 has been included.
 *              The following code assumes MooTools More 1.6.0 has been included. 
 *
 * @since       0.0.0.1
 * @version     6.0.34.1
 * @deprecated  n/a
 * @access      public
 *
 * @class       n/a 
 * @augments    n/a 
 * @mixes       n/a 
 * 
 * @alias       Affinity (commons)
 * @memberof    window.Affinity
 *
 * @see         UI Documentation in Confluence
 * @link URL    n/a
 * @global      n/a
 *
 * @fires       UiReady
 * @listens     PageReady
 * @listens     DashboardReady
 *
 * @param       {type}   var           Description.
 * 
 * @return      n/a
 */

if (!('Affinity' in window)) { window.Affinity = {}; }
if (!('Components' in Affinity)) { Affinity.Components = {}; }
Affinity.started = (new Date()).getTime();
Affinity.views = {};
Affinity.Components.Commons = {};
Affinity.Components.Commons.Version = '6.0.34.1';
Affinity.Components.Commons.Sequence = 30;
Affinity.Components.Commons.Name = 'UI Framework Commons';
Affinity.Components.Commons.File = 'commons.6.0.0.js';
Affinity.Components.Commons.Jira = '';
Affinity.Components.Commons.Notes = 'Add Affinity.IsElement method'

/**   MOO COMPONENTS             *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/
/**
 * Summary.     Required Mootolls versins and info
 *
 * Description. This version of commons requires Mootools.
 *
 * @since       1.5.2
 * @version     1.6.0
 */

Affinity.Components.MooTools = {};
Affinity.Components.MooTools.Version = '1.6.0';
Affinity.Components.MooTools.Sequence = 10;
Affinity.Components.MooTools.Name = 'MooTools Core';
Affinity.Components.MooTools.File = 'MooTools-Core-1.6.0.js';
Affinity.Components.MooTools.Jira = '';
Affinity.Components.MooTools.Notes = '';

Affinity.Components.MoreTools = {};
Affinity.Components.MoreTools.Version = '1.6.0';
Affinity.Components.MoreTools.Sequence = 20;
Affinity.Components.MoreTools.Name = 'MooTools More';
Affinity.Components.MoreTools.File = 'MooTools-More-1.6.0.js';
Affinity.Components.MoreTools.Jira = '';
Affinity.Components.MoreTools.Notes = '';


/**   OVERRIDE MISSING CONSOLE   *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/
/**
 * Summary.     Override console for older browsers
 *
 * Description. To avoid errors if console.log etc is left in code.
 */


if (typeof console === "undefined")
{
  console = {
    log: function () { }
  };
}

/**   CHECK FOR MOOTOOLS         *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/
/**
 * Summary.     Check Mootools has been included
 */

if (typeof MooTools === "undefined")
{
  throw new ReferenceError('This site requires MooTools 1.6.0 and MooTools.More 1.6.0');
}

/**   SET USER AGENT             *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/
/**
 * Summary.     Paramatise user agent
 */

var doc = document.documentElement;
doc.setAttribute('data-useragent', navigator.userAgent);

/*************************************************************************************************************************/
/**                            *******************************************************************************************/
/**   MOUSE / TOUCH EVENTS     *******************************************************************************************/
/**                            *******************************************************************************************/
/*************************************************************************************************************************/
/**
 * Summary.     Interaction event params
 *
 * Description. These values get overridden by values in the touch.js script which should be included in the cassette
 *              bundles when a mobile (touch) device is detected. See _Layout.cshtm. See docs on "page setup".
 */

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
/**   AFFINITY COLORS          *******************************************************************************************/
/**                            *******************************************************************************************/
/*************************************************************************************************************************/
/**
 * Summary.     Paramatise theme colours
 */

Affinity.colors = {
  green: '#7abd2d',
  blue: '#44b5ec',
  lightblue: '#e3eef3',
  orange: '#ff6600',
  yellow: '#ffbd00',
  red: '#ff0000',
  grey: '#888888'
};

/*************************************************************************************************************************/
/**                            *******************************************************************************************/
/**   ICONS FROM ICON FONT     *******************************************************************************************/
/**                            *******************************************************************************************/
/*************************************************************************************************************************/
/**
 * Summary.     Paramatised list / codes for all font glyph icons
 */

Affinity.icons = {
  AddToList: '&#xe096;',
  Adobe: '&#xe91c;',
  Air: '&#xe047;',
  Alarm: '&#xe855;',
  AlarmAdd: '&#xe856;',
  AppAddRow: '&#xe91b;',
  AppFilter: '&#xe919;',
  AppGridAdd: '&#xe91a;',
  AppHelp: '&#xe918;',
  AppReport: '&#xe917;',
  AppShare: '&#xe916;',
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
  CalView: '&#xe911;',
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
  Cleverforms: '&#xe939;',
  CleverformsAdmin: '&#xe93a;',
  CleverformsDesigner: '&#xe93c;',
  CleverformsFlow: '&#xe93b;',
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
  CommsHangouts: '&#xe933;',
  CommsMsteams: '&#xe931;',
  CommsSkype: '&#xe930;',
  CommsSlack: '&#xe932;',
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
  DetailView: '&#xe913;',
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
  File: '&#xe91d;',
  FileEdit: '&#xe91e;',
  FileExcel: '&#xe922;',
  FileExcelOld: '&#xe908;',
  FilePdf: '&#xe920;',
  FilePdfOld: '&#xe902;',
  FilePowerpoint: '&#xe923;',
  FileUser: '&#xe93f;',
  FileView: '&#xe91f;',
  FileWord: '&#xe921;',
  FileWordOld: '&#xe907;',
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
  Google: '&#xe926;',
  GoogleDrive: '&#xe928;',
  GoogleMaps: '&#xe927;',
  GoogleTranslate: '&#xe929;',
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
  MailGmail: '&#xe934;',
  MailHotmail: '&#xe935;',
  MailOutlook: '&#xe936;',
  Map: '&#xe015;',
  Maps: '&#xe925;',
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
  PageEmpty: '&#xe93e;',
  PageFull: '&#xe93d;',
  Palette: '&#xe033;',
  Paperclip: '&#xe00a;',
  Paperplane: '&#xe007;',
  Pause: '&#xe0ae;',
  Pencil: '&#xe008;',
  PeriodView: '&#xe912;',
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
  SocialFacebook: '&#xe92a;',
  SocialInstagram: '&#xe92c;',
  SocialLinkedin: '&#xe92e;',
  SocialTwitter: '&#xe92b;',
  SocialYammer: '&#xe92f;',
  SocialYoutube: '&#xe92d;',
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
  TeamView: '&#xe914;',
  Thermometer: '&#xe06e;',
  ThumbsDown: '&#xe020;',
  ThumbsUp: '&#xe01f;',
  Thunder: '&#xe043;',
  Tick: '&#xe079;',
  Ticket: '&#xe06b;',
  Tools: '&#xe02d;',
  Traffic: '&#xe565;',
  Translate: '&#xe924;',
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
  ViewRefresh: '&#xe915;',
  Voicemail: '&#xe067;',
  Volume: '&#xe0b7;',
  Warning: '&#xe089;',
  Wikipedia: '&#xe938;',
  Wireless: '&#xe06d;',
  Wordpress: '&#xe937;',
  Wrench: '&#xe0f9;',
  Zzz: '&#xe106;'
};

/**   GET ICON                   *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/
/**
 * Summary.     Return icon code based on icon name
 *
 * @access      public
 *
 * @augments    Affinity.icons.getIcon 
 * 
 * @memberof    window.Affinity
 *
 * @param       {string}   str           name of icon to attempt to find.
 * @param       {string}   defaultStr    code to use if no match found.
 * 
 * @return      {string}   HTML entity code.
 */

Affinity.icons.getIcon = function (str, defaultStr)
{
  if (str && str in Affinity.icons)
  {
    return Affinity.icons[str];
  }
  if (str)
  {
    str = str.replace('icon', '').trim().camelCase();
    if (str in Affinity.icons)
    {
      return Affinity.icons[str];
    }
  }
  if (defaultStr && defaultStr in Affinity.icons)
  {
    return Affinity.icons[defaultStr];
  }
  return '';
};

/*************************************************************************************************************************/
/**                            *******************************************************************************************/
/**   GLOABL CONFIG SETTINGS   *******************************************************************************************/
/**                            *******************************************************************************************/
/*************************************************************************************************************************/
/**
 * Summary.     Default config settings
 *
 * Description. The defaut settings for Affinity UI.
 *              IMPORTANT - DO NOT MODIFY - Adjustable params are at the end of this document.
 *
 * @access      public
 * 
 * @alias       Affinity (commons)
 * @memberof    window.Affinity
 */

Affinity.appname = 'none';
Affinity.apiversion = 2;
Affinity.urlroot = '';
Affinity.authroot = '';
Affinity.zelosroot = '';
Affinity.lookupapi = '';

Affinity.debug = parseInt(Affinity.Components.Commons.Version.split('.')[2]) % 2 === 0 ? false : true;

Affinity.uisession = String.uniqueID();
Affinity.uiready = false;
Affinity.commonsReady = true;
Affinity.login = null;
Affinity.loaders = {};
Affinity.loaders.dark = 'data:image/gif;base64,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';
Affinity.loaders.light = 'data:image/gif;base64,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';
Affinity.loaders.blue = 'data:image/gif;base64,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';
Affinity.loaders.large = {};
Affinity.loaders.large.light = 'data:image/gif;base64,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';
Affinity.loaders.large.dark = 'data:image/gif;base64,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';
Affinity.agent = window.navigator.userAgent;
Affinity.oldess = false;
Affinity.oldessLaunched = false;
Affinity.oldessFrame = false;
Affinity.oldessWindow = false;

Affinity.ismac = false;
Affinity.isie = false;
Affinity.isEdge = false;
Affinity.ieversion = false;
Affinity.iedocmode = false;
Affinity.ismobile = false;

Affinity.isloggedin = false;

Affinity.isTeampayoffice = false;
Affinity.isTeampayofficeBranch = false;


Affinity.scrollBarSize = 0;
Affinity.supportsPassiveEvents = false;
Affinity.supportsDatalist = false;
Affinity.loginsThisSession = 0;

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
Affinity.UI.delayAutoKill = function (uuid, killid)
{
  if (document.getElement('.' + killid))
  {
    document.getElement('.' + killid).removeEvents();
    document.getElement('.' + killid).destroy();
  }
  window.Affinity.UI.lastAutoKill[uuid] = null;
  delete window.Affinity.UI.lastAutoKill[uuid];
}

Affinity.DarkMode = false;

/**   AUTOSCROLL ON DRAG TO BOTTOM  **************************************************************************************/
/**   ----------------------------  **************************************************************************************/
/**
 * Summary.     Autoscroll on DOM element drag
 *
 * Description. When dragging a DOM element in a DOM element with scroll, ensure parent scrolls up when drag is at
 *              top or scroll down when drag is at bottom of the visible region.
 *
 * @access      public
 *
 * @augments    Affinity.UI.autoscroll
 *              Affinity.EstablishAutosrollOnDragEvents
 * 
 * @alias       Affinity (commons)
 * @memberof    window.Affinity.UI
 *
 * @global      {bool}  Affinity.UI.scrolling
 *
 * @param       {int}   delta           The drag delta (direction: -1 up, +1 down)
 * 
 * @return      n/a
 */

Affinity.UI.scrolling = false;
Affinity.UI.autoscroll = function (delta)
{
  var win = window;
  if (Affinity.oldessFrame) // if in OLD ESS iframe
  {
    try
    {
      win = window.parent.window;
    }
    catch (e) {}
  }
  try
  {
    var doc = win.document.documentElement, body = win.document.body;
    var scroll = (doc && doc.scrollTop || body && body.scrollTop || 0);
    if (delta > 0) { win.scrollTo(0, scroll + 10); }
    if (delta < 0) { win.scrollTo(0, scroll - 10); }
  }
  catch (e) { }
};

Affinity.EstablishAutosrollOnDragEvents = function ()
{
  document.addEventListener(Affinity.events.move, function (e)
  {
    if (Affinity.UI.drageventFired)
    {
      var mousey = e.client.y;
      var winheight = window.innerHeight || window.document.documentElement.clientHeight;
      var topCheck = 50;
      var bottomCheck = winheight - 50;
      if (Affinity.oldessFrame) // if in OLD ESS iframe
      {
        try
        {
          var win = window.parent;
          winheight = win.innerHeight || win.document.documentElement.clientHeight;
          var doc = win.document.documentElement, body = win.document.body;
          var parentScroll = (doc && doc.scrollTop || body && body.scrollTop || 0);
          var framePosition = 0;
          if (document.documentMode && document.documentMode < 9)
          {
            framePosition = Affinity.oldessFrame.querySelectorAll(".ContentBody")[0].offsetTop;
          }
          else
          {
            framePosition = Affinity.oldessFrame.getElementsByClassName("ContentBody")[0].offsetTop;
          }
          var relativeTop = parentScroll - framePosition;
          var topCheck = 50 + relativeTop;
          var bottomCheck = (relativeTop + winheight) - 50;
        } catch (e) { }
      }
      if (mousey > bottomCheck)
      {
        if (!Affinity.UI.scrolling)
        {
          if (document.getElement('.dragger')) { document.getElement('.dragger').setStyle('display', 'none'); }
          Affinity.UI.scrolling = true;
          Affinity.UI.scroller = Affinity.UI.autoscroll.periodical(25, window, [1]);
        }
      }
      else if (mousey < topCheck)
      {
        if (!Affinity.UI.scrolling)
        {
          if (document.getElement('.dragger')) { document.getElement('.dragger').setStyle('display', 'none'); }
          Affinity.UI.scrolling = true;
          Affinity.UI.scroller = Affinity.UI.autoscroll.periodical(25, window, [-1]);
        }
      }
      else
      {
        if (Affinity.UI.scrolling)
        {
          if (document.getElement('.dragger')) { document.getElement('.dragger').setStyle('display', 'block'); }
          Affinity.UI.scrolling = false;
          clearInterval(Affinity.UI.scroller);
        }
      }
    }
  }, Affinity.supportsPassiveEvents ? { passive: true } : false);

  document.addEventListener(Affinity.events.end, function ()
  {
    Affinity.UI.drageventFired = false;
    if (Affinity.UI.scrolling)
    {
      if (document.getElement('.dragger')) { document.getElement('.dragger').setStyle('display', 'block'); }
      Affinity.UI.scrolling = false;
      clearInterval(Affinity.UI.scroller);
    }
  });

  Affinity.EstablishAutosrollOnDragEvents = null;
  delete Affinity.EstablishAutosrollOnDragEvents;
}

/*************************************************************************************************************************/
/**                            *******************************************************************************************/
/**   KANOMI CODE              *******************************************************************************************/
/**                            *******************************************************************************************/
/*************************************************************************************************************************/
/**
 * Summary.     KANOMI code listener
 *
 * Description. Creates silent listener for passive key entry of the Konami code.
 *              Code: [up], [up], [down], [down], [left], [right], [left], [right], [A], [B].
 *              As used by Error page Stack Trace reveal.
 *
 * @access      public
 *
 * @class       Affinity.Konami
 * @augments    initialize
 * 
 * @memberof    window.Affinity
 *
 * @listens     keydown
 *
 * @param       {object}     options               KANOMI Settings.
 * @param       {function}   options.onSuccess     Method to call on succesfull KANOMI code key sequence.
 * 
 * @return      n/a
 */

Affinity.Konami = new Class({
  Implements: [Options],
  options: { onSuccess: function () { } },
  input: "",
  pattern: "38384040373937396665",
  initialize: function (options)
  {
    this.setOptions(options);
    document.addEvent('keydown', function (e) {
      this.input += e.code;
      if (this.input.length > this.pattern.length) { this.input = this.input.substr((this.input.length - this.pattern.length)); }
      if (this.input === this.pattern) { this.options.onSuccess(); }
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
/**
 * Summary.     'Rick Roll' Easter Egg
 *
 * Description. JUST FOR FUN!!!.
 *              Code: [R], [I], [C], [K], [R], [O], [L], [L]
 *              Creates silent listener for passive key entry that plays youtube clip of Rick Astley's "Never Gonna Give You Up".
 *
 * @access      public
 *
 * @class       Affinity.RickRoll
 * 
 * @alias       Affinity (commons)
 * @memberof    window.Affinity
 *
 * @listens     keydown
 */

Affinity.RickRoll = new Class({
  Binds: ['inject', 'destroy'],
  options: {},
  input: "",
  ytBox: false,
  pattern: "8273677582797676",
  initialize: function ()
  {
    document.addEvent('keydown', function (e) {
      this.input += e.code;
      if (this.input.length > this.pattern.length) { this.input = this.input.substr((this.input.length - this.pattern.length)); }
      if (this.input === this.pattern) { this.inject(); }
    }.bind(this));
  },
  inject: function ()
  {
    this.destroy();
    this.ytBox = new Element('div').setStyles({ 'position': 'fixed', 'top': 0, 'left': 0, 'width': '100%', 'height': '100%', 'background': 'rgba(255,255,255,0.8)', 'text-align': 'center', 'z-index': 99999999999 })
    .inject(document.body, 'bottom')
    .set('html', '<iframe width="420" height="315" style="position:fixed;top:50%;left:50%;margin:-157px 0 0 -210px;" src="https:/' + '/www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&amp;autoplay=1&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>')
    .addEvent('click', this.destroy);
  },
  destroy: function ()
  {
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
/**
 * Summary.     UI Framework init code
 *
 * Description. Common inline scripts and functions used in all cases and docs.
 *              Includes overrides, prototypes and extended behaviours.
 *              The following code assumes MooTools Core 1.6.0 has been included.
 *              The following code assumes MooTools More 1.6.0 has been included. 
 *
 * @since       0.0.0.1
 * @version     6.0.23.2
 * @deprecated  n/a
 * @access      public
 *
 * @class       n/a 
 * @augments    n/a 
 * @mixes       n/a 
 * 
 * @alias       Affinity (commons)
 * @memberof    window.Affinity
 *
 * @see         Mootools 1.6.0 / Moretools 1.6.0
 * @link URL    n/a
 * @global      n/a
 *
 * @fires       UiReady
 * @listens     PageReady
 * @listens     DashboardReady
 *
 * @param       {type}   var           Description.
 * 
 * @return      n/a
 */

Affinity.CookieMonster = new (new Class({
  Read: function (cookiename)
  {
    var raw;
    if (Affinity.isie)
    {
      var offset = document.cookie.indexOf(cookiename + '=');
      if (offset !== -1) // if cookie exists
      {
        offset += cookiename.length + 1;
        var end = document.cookie.indexOf(";", offset);
        if (end === -1) { end = document.cookie.length; }
        // IE hates some chars in cookies, so we unescape the escaped data
        return unescape(document.cookie.substring(offset, end));
      }
    }
    else
    {
      return Cookie.read(cookiename);
    }
  },
  Write: function (cookiename, data, expires)
  {
    // IE hates some chars in cookies, so we escape the data. IE also requires a full date rather than a day value for 'expires'
    var domain = new URI(window.location.href).parsed.host;
    var dateNow = new Date();
    if (typeOf(expires) !== 'null' && !isNaN(expires) && parseFloat(expires) > 0)
    {
      var dateExpires = new Date(dateNow.getTime() + (expires * 60000));
      var dateNowStr = dateNow.toUTCString();
      var dateExpiresStr = dateExpires.toUTCString();
      log('&#169; Cookie Write Expires - name: ' + cookiename + ', value: ' + data);
      log('  expires: ' + dateExpiresStr + ', now: ' + dateNowStr + ', expires value: ' + expires + ', in days: ' + (parseFloat(expires) / 1440) + ', domain: ' + domain);
      if (Affinity.isie)
      {
        try
        {
          document.cookie = cookiename + '=' + escape(data) + '; expires=' + dateExpiresStr + '; domain:' + domain + '; SameSite=None; Secure';
          return data;
        }
        catch (er)
        {
          return false;
        }
      }
      else
      {
        try
        {
          Cookie.write(cookiename, data, { duration: parseFloat(expires) / 1440 }); // expires is in mins - convert to days
          return data;
        }
        catch (er)
        {
          return false;
        }
      }
    }
    else
    {
      log('&#169; Cookie Write - name: ' + cookiename + ', value: ' + data);
      if (Affinity.isie)
      {
        try
        {
          document.cookie = cookiename + '=' + escape(data) + '; SameSite=None; Secure';
          return data;
        }
        catch (er)
        {
          return false;
        }
      }
      else
      {
        try
        {
          Cookie.write(cookiename, data);
          return data;
        }
        catch (er)
        {
          return false;
        }
      }
    }
  },
  Delete: function (cookiename)
  {
    log('&#169; Cookie Delete - name: ' + cookiename);
    if (Affinity.isie)
    {
      document.cookie = cookiename + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; SameSite=None; Secure';
      try
      {
        Cookie.dispose(cookiename);
        return true;
      }
      catch (er)
      {
        return false;
      }
    }
    else
    {
      try
      {
        Cookie.dispose(cookiename);
        return true;
      }
      catch (er)
      {
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
/**   Required for logging and debugging as IE console changes IE cache and DOM behaviour.                               **/
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
  Cloud	                                  &#9729;
  Umbrella	                              &#9730;
  Snowman	                                &#9731;
  Comet	                                  &#9732;
  Black Star	                            &#9733;
  White Star	                            &#9734;
  Lightning	                              &#9735;
  Thunderstorm	                          &#9736;
  Sun	                                    &#9737;
  Ascending Node	                        &#9738;
  Descending Node	                        &#9739;
  Conjunction	                            &#9740;
  Opposition	                            &#9741;
  Black Telephone	                        &#9742;
  White Telephone	                        &#9743;
  Ballot Box	                            &#9744;
  Ballot Box With Check	                  &#9745;
  Ballot Box With X	                      &#9746;
  Large X	                                &#9747;
  Umbrella With Rain Drops	              &#9748;
  Hot Beverage	                          &#9749;
  White Shogi Piece	                      &#9750;
  Black Shogi Piece	                      &#9751;
  Shamrock	                              &#9752;
  Reversed Rotated Floral Heart Bullet	  &#9753;
  Black Left Pointing Finger	            &#9754;
  Black Right Pointing Finger         	  &#9755;
  White Left Pointing Finger	            &#9756;
  White Up Pointing Finger	              &#9757;
  White Right Pointing Finger	            &#9758;
  White Down Pointing Finger	            &#9759;
  Skull And Crossbones	                  &#9760;
  Caution Sign	                          &#9761;
  Radioactive Sign	                      &#9762;
  Biohazard Sign	                        &#9763;
  Caduceus	                              &#9764;
  Ankh	                                  &#9765;
  Orthodox Cross	                        &#9766;
  Chi Rho	                                &#9767;
  Cross Of Lorraine	                      &#9768;
  Cross Of Jerusalem	                    &#9769;
  Star And Crescent	                      &#9770;
  Farsi Symbol	                          &#9771;
  Adi Shakti	                            &#9772;
  Hammer And Sickle	                      &#9773;
  Peace Symbol	                          &#9774;
  Yin Yang	                              &#9775;
  Trigram For Heaven	                    &#9776;
  Trigram For Lake	                      &#9777;
  Trigram For Fire	                      &#9778;
  Trigram For Thunder	                    &#9779;
  Trigram For Wind	                      &#9780;
  Trigram For Water	                      &#9781;
  Trigram For Mountain	                  &#9782;
  Trigram For Earth	                      &#9783;
  Wheel Of Dharma	                        &#9784;
  White Frowning Face	                    &#9785;
  White Smiling Face	                    &#9786;
  Black Smiling Face	                    &#9787;
  White Sun With Rays	                    &#9788;
  First Quarter Moon	                    &#9789;
  Last Quarter Moon	                      &#9790;
  Mercury	                                &#9791;
  Female Sign	                            &#9792;
  Earth	                                  &#9793;
  Male Sign	                              &#9794;
  Jupiter	                                &#9795;
  Saturn	                                &#9796;
  Uranus	                                &#9797;
  Neptune	                                &#9798;
  Pluto	                                  &#9799;
  Aries	                                  &#9800;
  Taurus	                                &#9801;
  Gemini	                                &#9802;
  Cancer	                                &#9803;
  Leo	                                    &#9804;
  Virgo	                                  &#9805;
  Libra	                                  &#9806;
  Scorpius	                              &#9807;
  Sagittarius	                            &#9808;
  Capricorn	                              &#9809;
  Aquarius	                              &#9810;
  Pisces	                                &#9811;
  White Chess King	                      &#9812;
  White Chess Queen	                      &#9813;
  White Chess Rook	                      &#9814;
  White Chess Bishop	                    &#9815;
  White Chess Knight	                    &#9816;
  White Chess Pawn	                      &#9817;
  Black Chess King	                      &#9818;
  Black Chess Queen	                      &#9819;
  Black Chess Rook	                      &#9820;
  Black Chess Bishop	                    &#9821;
  Black Chess Knight	                    &#9822;
  Black Chess Pawn	                      &#9823;
  Black Spade Suit	                      &#9824;
  White Heart Suit	                      &#9825;
  White Diamond Suit	                    &#9826;
  Black Club Suit	                        &#9827;
  White Spade Suit	                      &#9828;
  Black Heart Suit	                      &#9829;
  Black Diamond Suit	                    &#9830;
  White Club Suit	                        &#9831;
  Hot Springs	                            &#9832;
  Quarter Note	                          &#9833;
  Eighth Note	                            &#9834;
  Beamed Eighth Notes	                    &#9835;
  Beamed Sixteenth Notes	                &#9836;
  Music Flat Sign	                        &#9837;
  Music Natural Sign	                    &#9838;
  Music Sharp Sign	                      &#9839;
  West Syriac Cross	                      &#9840;
  East Syriac Cross	                      &#9841;
  Universal Recycling Symbol	            &#9842;
  Recycling Symbol For Type-1 Plastics	  &#9843;
  Recycling Symbol For Type-2 Plastics	  &#9844;
  Recycling Symbol For Type-3 Plastics	  &#9845;
  Recycling Symbol For Type-4 Plastics	  &#9846;
  Recycling Symbol For Type-5 Plastics	  &#9847;
  Recycling Symbol For Type-6 Plastics	  &#9848;
  Recycling Symbol For Type-7 Plastics	  &#9849;
  Recycling Symbol For Generic Materials	&#9850;
  Black Universal Recycling Symbol	      &#9851;
  Recycled Paper Symbol	                  &#9852;
  Partially-Recycled Paper Symbol	        &#9853;
  Permanent Paper Sign	                  &#9854;
  Wheelchair Symbol	                      &#9855;
  Die Face-1	                            &#9856;
  Die Face-2	                            &#9857;
  Die Face-3	                            &#9858;
  Die Face-4	                            &#9859;
  Die Face-5	                            &#9860;
  Die Face-6	                            &#9861;
  White Circle With Dot Right	            &#9862;
  White Circle With Two Dots	            &#9863;
  Black Circle With White Dot Right	      &#9864;
  Black Circle With Two White Dots	      &#9865;
  Monogram For Yang	                      &#9866;
  Monogram For Yin	                      &#9867;
  Digram For Greater Yang	                &#9868;
  Digram For Lesser Yin	                  &#9869;
  Digram For Lesser Yang	                &#9870;
  Digram For Greater Yin	                &#9871;
  White Flag	                            &#9872;
  Black Flag	                            &#9873;
  Hammer And Pick	                        &#9874;
  Anchor	                                &#9875;
  Crossed Swords	                        &#9876;
  Staff Of Aesculapius	                  &#9877;
  Scales	                                &#9878;
  Alembic	                                &#9879;
  Flower	                                &#9880;
  Gear	                                  &#9881;
  Staff Of Hermes	                        &#9882;
  Atom Symbol	                            &#9883;
  Fleur-De-Lis	                          &#9884;
  Outlined White Star	                    &#9885;
  Warning Sign	                          &#9888;
  High Voltage Sign	                      &#9889;
  Doubled Female Sign	                    &#9890;
  Doubled Male Sign	                      &#9891;
  Interlocked Female And Male Sign	      &#9892;
  Male And Female Sign	                  &#9893;
  Male With Stroke Sign	                  &#9894;
  Male With Stroke & Male & Female Sign	  &#9895;
  Vertical Male With Stroke Sign	        &#9896;
  Horizontal Male With Stroke Sign	      &#9897;
  Medium White Circle	                    &#9898;
  Medium Black Circle	                    &#9899;
  Medium Small White Circle	              &#9900;
  Marriage Symbol	                        &#9901;
  Divorce Symbol	                        &#9902;
  Unmarried Partnership Symbol	          &#9903;
  Ceres	                                  &#9907;
  Pallas	                                &#9908;
  Juno	                                  &#9909;
  Vesta	                                  &#9910;
  Chiron	                                &#9911;
  Black Moon Lilith	                      &#9912;
  Sextile	                                &#9913;
  Semisextile	                            &#9914;
  Quincunx	                              &#9915;
  Sesquiquadrate	                        &#9916;
  Soccer Ball	                            &#9917;
  Baseball	                              &#9918;
  Snowman Without Snow	                  &#9924;
  Sun Behind Cloud	                      &#9925;
  Ophiuchus	                              &#9934;
  No Entry	                              &#9940;
  Church	                                &#9962;
  Fountain	                              &#9970;
  Flag In Hole	                          &#9971;
  Sailboat	                              &#9973;
  Tent	                                  &#9978;
  Fuel Pump	                              &#9981;
  */
  Binds: ['build', 'enable', 'disable', 'enableLog', 'disableLog', 'log', 'clear', 'open', 'close'],
  enabled: false,
  __prelog: [],
  initialize: function ()
  {
    window.log = this.log;
    window.logClear = this.clear;
    window.logEnable = this.enableLog;
    window.logDisable = this.disableLog;
  },
  build: function ()
  {
    if (!Affinity.uiready)
    {
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
    if (this.__prelog.length > 0)
    {
      Array.each(this.__prelog, function (__prelog) { this.log(__prelog[0], __prelog[1]); }.bind(this));
    }
    this.enabled = false;
    window.fireEvent('LogReady');
  },
  enable: function ()
  {
    this.destroy();
    this.build();
    this.open();
  },
  disable: function ()
  {
    this.destroy();
  },
  enableLog: function ()
  {
    this.enabled = true;
    this.log('/' + '/ log enabled ' + new Date());
    return 'Log Enabled. Enter "disableLog()" to stop.';
  },
  disableLog: function ()
  {
    this.log('/' + '/ log disabled ' + new Date());
    this.enabled = false;
    return 'Log disabled. Enter "enableLog()" to start.';
  },
  log: function (mixed, style)
  {
    if (this.enabled)
    {
      if (typeOf(mixed) === 'string' && (mixed === 'show' || mixed === 'open'))
      {
        this.open();
        return;
      }
      var outStr = typeOf(mixed) === 'object' || typeOf(mixed) === 'array' ? JSON.stringify(mixed, null, 2) : typeOf(mixed) === 'element' ? 'element type: ' + mixed.get('tag') + '\r\n' + JSON.stringify(mixed.getProperties('id', 'class', 'style', 'src', 'title', 'alt'), null, 2) : mixed;
      //this.logsBox.adopt(new Element('<pre>', { 'html': outStr }));
      if (typeOf(style) === 'object')
      {
        new Element('<pre>', { 'html': outStr }).inject(this.logsBox, 'top').setStyles(style);
      }
      else if (typeOf(style) === 'string')
      {
        new Element('<pre>', { 'html': outStr }).inject(this.logsBox, 'top').set('style', style);
      }
      else
      {
        new Element('<pre>', { 'html': outStr }).inject(this.logsBox, 'top');
      }
    }
    else
    {
      this.__prelog.push([mixed, style]);
    }
  },
  clear: function ()
  {
    if (this.enabled)
    {
      this.logsBox.empty();
      this.log('/' + '/ log cleared ' + new Date());
    }
  },
  open: function ()
  {
    if (this.enabled)
    {
      if (this.logBox.getStyle('display') === 'none')
      {
        this.logBox.setStyle('display', 'block');
      }
      else
      {
        this.logBox.setStyle('display', 'none');
      }
    }
  },
  close: function ()
  {
    if (this.enabled)
    {
      if (this.logBox.getStyle('display') === 'block') {
        this.logBox.setStyle('display', 'none');
      }
      else
      {
        this.logBox.setStyle('display', 'block');
      }
    }
  },
  destroy: function ()
  {
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
/**   Ensures IE click on scroll bar or buttons does not auto close                                                     **/
/**                                                                                                                     **/
/*************************************************************************************************************************/

Affinity.SmartClose = new Class({
  Binds: ['isActive', 'checkActive', 'isOver', 'setClose', 'overAll', 'outAll', 'windowClick'],
  over: false,
  isOverCheckTimer: false,
  initialize: function (element, options)
  {
    if (Affinity.mobile)
    {
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
  isActive: function ()
  {
    if (!document.activeElement)
    {
      return false;
    }
    else
    {
      if (document.activeElement === this.element || document.activeElement.getParent('.' + this.class) === this.element)
      {
        return true;
      }
    }
    return true;
  },
  checkActive: function ()
  {
    if (!this.isActive())
    {
      this.over = false;
      this.windowClick();
    }
  },
  isOver: function ()
  {
    if (!this.isActive())
    {
      this.over = false;
    }
    return this.over;
  },
  setClose: function ()
  {
    window.removeEvent(Affinity.events.click, this.windowClick);
    window.addEvent(Affinity.events.click, this.windowClick);
  },
  overAll: function ()
  {
    clearTimeout(this.isOverCheckTimer);
    this.setClose();
    this.over = true;
    this.isOverCheckTimer = this.checkActive.delay(1000, this);
  },
  outAll: function ()
  {
    clearTimeout(this.isOverCheckTimer);
    this.over = false;
  },
  windowClick: function ()
  {
    if (!this.over)
    {
      this.element.fireEvent('SmartClose');
      window.removeEvent(Affinity.events.click, this.windowClick);
    }
  }
});

/**   TRIGGER RESIZE ON PINCH    *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

Affinity.UI.mobileZooming = false;
if (Affinity.mobile)
{
  window.addEvents({
    'touchmove': function (e)
    {
      if (e.touches.length === 2) {
        Affinity.UI.mobileZooming = true;
      }
    },
    'touchend': function (e)
    {
      if (Affinity.UI.mobileZooming)
      {
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

Affinity.GetCacheSafePath = function (path)
{
  if (!Affinity.isie || typeOf(path) !== 'string') { return path; }
  var uri = path + (path.contains('?') ? '&ran=' : '?ran=') + String.uniqueID() + '-' + Date.parse(new Date()).format('%s');
  return uri;
};


/**   PROCESS URL                *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

Affinity.ProcessUrl = function (api)
{
  var url, preUrl = '/_Api/Zelos', mainUrl, useUrl, uriObj, query, queryObj;
  mainUrl = api.replace('%3F', '?');
  mainUrl = Affinity.isTeampayoffice && new RegExp('timesheets' + preUrl, 'i').test(mainUrl) ? mainUrl.replace(new RegExp('timesheets' + preUrl, 'i'), preUrl) : mainUrl;
  mainUrl = Affinity.isTeampayofficeBranch && new RegExp('tb' + preUrl, 'i').test(mainUrl) ? mainUrl.replace(new RegExp('tb' + preUrl, 'i'), preUrl) : mainUrl;
  mainUrl = mainUrl.replace(preUrl + '?', '');
  useUrl = (mainUrl.indexOf('&') > -1 && mainUrl.indexOf('?') === -1) ? mainUrl.replace('&', '?') : mainUrl;
  uriObj = new URI(useUrl);
  query = {};
  if (typeOf(uriObj.parsed.query) !== 'null')
  {
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
/**   CHECK IF IS DOM ELEMENT    *****************************************************************************************/
/**                              *****************************************************************************************/
/*************************************************************************************************************************/

Affinity.IsElement = function (obj)
{
  try
  {
    return obj instanceof HTMLElement;
  }
  catch (e)
  {
    return (typeof obj === "object") && (obj.nodeType === 1) && (typeof obj.style === "object") && (typeof obj.ownerDocument === "object");
  }
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

/**   TO CAMEL CASE              *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

String.implement({

  ToCamelCase: function ()
  {
    return this.toLowerCase().replace(/(_|-)([a-z])/g, function (str) { return str[1].toUpperCase(); });
  }

});


/**   STRING NULL OR EMPTY       *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

String.implement({

  isNullOrEmpty: function ()
  {
    if(typeof this === 'string')
    {
      if (this === null || this.trim().toLowerCase() === 'null' || this.trim() === '') return true;
    }
    return false;
  }

});


/**   STRING FORMAT              *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

if (!Affinity.hasOwnProperty('isWindow'))
{
  Affinity.isWindow = function (obj)
  {
    return obj != null && obj === obj.window;
  };
  Affinity.isWindowReturn = function (obj)
  {
    return Affinity.isWindow(obj) ? obj : false;
  };
}

if (!Affinity.hasOwnProperty('isObject'))
{
  Affinity.isObject = function (obj)
  {
    if (obj === null || typeof obj !== "object" || obj.nodeType || Affinity.isWindow(obj))
    {
      return false;
    }
    if (
      obj.constructor
      && !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")
    )
    {
      return false;
    }
    return true;
  };
  Affinity.isObjectReturn = function (obj)
  {
    return Affinity.isObject(obj) ? obj : false;
  };
}

if (!(Affinity.hasOwnProperty('FormatString')))
{
  Affinity.FormatString = function (string, args)
  {
    if (typeof string === 'object')
    {
      string = Object.keys(string).map(function (key)
      {
        return string[key]
      }).join('')
    }
    if (args.length === 1 && Affinity.isObject(args[0]))
    {
      var obj = args[0], key, regex, regexp;
      for (key in obj)
      {
        if (obj.hasOwnProperty(key))
        {
          string = string.replace(new RegExp('{' + key + '}', 'g'), obj[key]);
        }
      }
      return string;
    }
    else
    {
      return string.replace(/{(\d+)}/g, function (match, number)
      {
        return typeof args[number] != 'undefined' ? args[number] : match;
      });
    }
  };
}

if (!String.prototype.format)
{
  String.prototype.format = function ()
  {
    var args = [].slice.call(arguments);
    return Affinity.FormatString(this, args);
  };
}


/**   ES5 ALT FOR ES6 FIND       *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

Array.implement({

  FindIn: function (key, value) {
    for (var i = this.length - 1; i < -1; i--) {
      if (this[i][key] === value) {
        return this[i];
      }
    }
    return null;
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

/**   ARRAY OF OBJECTS TO MAP    *****************************************************************************************/
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

/**   OBJECT DEEP MERGE          *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

Affinity.DeepMergeObjects = function (objArray, options) {

  function isMergeableObject(val) {
    var nonNullObject = val && typeof val === 'object'
    return nonNullObject
        && Object.prototype.toString.call(val) !== '[object RegExp]'
        && Object.prototype.toString.call(val) !== '[object Date]'
  }

  function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
  }

  function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
  }

  function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice()
    source.forEach(function (e, i) {
      if (typeof destination[i] === 'undefined') {
        destination[i] = cloneIfNecessary(e, optionsArgument)
      } else if (isMergeableObject(e)) {
        destination[i] = deepmerge(target[i], e, optionsArgument)
      } else if (target.indexOf(e) === -1) {
        destination.push(cloneIfNecessary(e, optionsArgument))
      }
    })
    return destination
  }

  function mergeObject(target, source, optionsArgument) {
    var destination = {}
    if (isMergeableObject(target)) {
      Object.keys(target).forEach(function (key) {
        destination[key] = cloneIfNecessary(target[key], optionsArgument)
      })
    }
    Object.keys(source).forEach(function (key) {
      if (!isMergeableObject(source[key]) || !target[key]) {
        destination[key] = cloneIfNecessary(source[key], optionsArgument)
      } else {
        destination[key] = deepmerge(target[key], source[key], optionsArgument)
      }
    })
    return destination
  }

  function deepmerge(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge }
    var arrayMerge = options.arrayMerge || defaultArrayMerge
    if (array) {
      return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
    } else {
      return mergeObject(target, source, optionsArgument)
    }
  }
  deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
      throw new Error('first argument should be an array with at least two elements')
    }
    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function (prev, next) {
      return deepmerge(prev, next, optionsArgument)
    })
  }

  return deepmerge.all(objArray);

};

/**   JSON HAS 401 UNAUTHORISED  *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

JSON.Unauthorized = function (json, reference) {
  var unauthorized = false;
  var type = typeOf(json);
  if (type === 'object' || type === 'array')
  {
    json = JSON.encode(json);
    type = 'string';
  }
  if (type === 'string' && json.indexOf('[{"Key":') !== 0)
  {
    if (
      json.test('unauthorized', 'gi') ||
      json.test('unauthorised', 'gi') ||
      json.test('/(401/)', 'gi') ||
      json.test('/(403/)', 'gi')
    )
    {
      log('&#x270B; json response is unauthorized' + (typeOf(reference) !== null ? ' (' + unescape(reference) + ')' : '') + ' &#x270B;');
      log(JSON.stringify(json, null, 2));
      log('&#x270B; END json response is unauthorized log &#x270B;');
      if (window.prompts) { Affinity.prompts.hide(); }
      //window.fireEvent('unauthorized');
      unauthorized = true;
    }
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
    if (name && this.retrieve(name)) {
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
    widget = null;
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
	  added to the element, event.target may be button or label.
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
  WidgetName: 'FormElement',
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


/**   ELEEMNT CHANGE TRACKER     *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

Affinity.ElementValueTracker = new Class({
  Implements: [Options, Events],
  WidgetName: 'ValueTracker',
  Binds: ['__removeEvents', '__addEvents', '__elementChanged', '__elementBlured', '__doChangeCheck', '__doChangeCheckThrottled', '__lookupComplete', 'addElement', 'removeElement', 'setValue', 'hasChanged', 'hasRestored', 'getValue', 'getDefault', 'getLast', 'changeStatus'],
  options: {},
  elements: [],
  values: [],
  valuesDefault: [],
  valuesLast: [],
  id: false,
  initialize: function (element)
  {
    this.id = String.uniqueID();
    if (element && !element.hasClass('has-change-tracker'))
    {
      this.addElement(element);
    }
  },
  /** PRIVATES **/
  __removeEvents: function (element)
  {
    element.removeEvent('change', this.__elementChanged);
    element.removeEvent('blur', this.__elementBlured);
  },
  __addEvents: function (element)
  {
    element.addEvent('change', this.__elementChanged);
    element.addEvent('blur', this.__elementBlured);
  },
  __cloneValue: function (val)
  {
    var isnum = typeOf(val) === 'number' ? true : false;
    var clone = (val + '').trim();
    return isnum ? parseFloat(clone) : clone;
  },
  __sanatiseValue: function (val)
  {
    try
    {
      return val === null || val === undefined || val.trim() === '' ? '' : val;
    }
    catch (er)
    {
      return val;
    }
  },
  __isSame: function (val1, val2)
  {
    var val1str = val1 + '';
    var val2str = val2 + '';
    if (val1str.isNullOrEmpty() && val2str.isNullOrEmpty()) return false;
    return val1str.trim().toLowerCase() === val2str.trim().toLowerCase();
  },
  __doChangeCheck: function (ev)
  {
    clearTimeout(this.__doChangeCheckThrottle);
    this.__doChangeCheckThrottle = this.__doChangeCheckThrottled.delay(100, this, [ev]);
  },
  __doChangeCheckThrottle: false,
  __doChangeCheckThrottled: function (ev)
  {
    if (ev && ['object', 'event', 'domevent'].contains(typeOf(ev)) && 'target' in ev && this.elements.indexOf(ev.target) > -1)
    {
      var changed, restored;
      Array.each(this.elements, function (element, index)
      {
        changed = restored = false;
        this.values[index] = this.__sanatiseValue(element.value);
        if (!this.__isSame(this.values[index], this.valuesDefault[index])) changed = true;
        else restored = true;
        element.removeClass('cant-select-default');
        if (changed)
        {
          element.removeClass('value-restored').addClass('value-changed');
          element.fireEvent('ElementChanged', { value: this.values[index], last: this.valuesLast[index], default: this.valuesDefault[index] });
          this.fireEvent('ElementChanged', { value: this.values[index], last: this.valuesLast[index], default: this.valuesDefault[index] });
          window.fireEvent('AnElementChanged', { target: this.elements[index], value: this.values[index], last: this.valuesLast[index], default: this.valuesDefault[index] });
          if (this.values[index] !== this.valuesDefault[index])
          {
            if (
              element.get('class').test(new RegExp('dependencies', 'gi'))
              || element.get('class').test(new RegExp('lookup', 'gi'))
            )
            {
              element.addClass('cant-select-default');
            }
          }
        }
        if (restored)
        {
          element.removeClass('value-changed').addClass('value-restored');
          element.fireEvent('ElementRestored', { value: this.values[index], last: this.valuesLast[index], default: this.valuesDefault[index] });
          this.fireEvent('ElementRestored', { value: this.values[index], last: this.valuesLast[index], default: this.valuesDefault[index] });
          window.fireEvent('AnElementRestored', { target: this.elements[index], value: this.values[index], last: this.valuesLast[index], default: this.valuesDefault[index] });
        }
        this.valuesLast[index] = this.values[index];
      }.bind(this));
    }
  },
  __elementChanged: function (ev)
  {
    this.__doChangeCheck(ev);
  },
  __elementBlured: function (ev)
  {
    this.__doChangeCheck(ev);
  },
  __lookupComplete: function (ev)
  {
    //var done = this.__doChangeCheck(ev);
    //var status = this.changeStatus();
    //console.log(status);
    this.__doChangeCheck.delay(500, this, [ev]);
  },
  /** PUBLICS **/
  addElement: function (element)
  {
    if (!element.retrieve('changetracker'))
    {
      var val = 'value' in element ? element.value : '',
          def = element.get('data-default-value') ? element.get('data-default-value') : val;
      if (this.elements.indexOf(element) === -1)
      {
        this.elements.push(element);
        this.values.push(val);
        this.valuesDefault.push(def);
        this.valuesLast.push(val);
        this.__removeEvents(element);
        this.__addEvents(element);
        element.addEvent('lookupComplete', this.__lookupComplete);
        element.addClass('has-change-tracker');
        element.store('changetracker', this);
      }
      else
      {
        this.setValue(element, val);
      }
    }
  },
  removeElement: function (element)
  {
    if (this.elements.indexOf(element) !== -1)
    {
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
  setValue: function (element, val)
  {
    if (this.elements.indexOf(element) !== -1)
    {
      var index = this.elements.indexOf(element);
      element.value = val;
      element.removeClass('value-restored').removeClass('value-changed');
      this.values[index] = val;
      this.valuesDefault[index] = val;
      this.valuesLast[index] = val;
      this.__removeEvents(element);
      this.__addEvents(element);
    }
    else
    {
      this.addElement(element);
    }
  },
  hasChanged: function ()
  {
    var changed = false;
    Array.each(this.elements, function (element, index)
    {
      if (element.hasClass('value-changed'))
      {
        changed = true;
      }
      /* manual detection for non-change elements - do I need this? */
      if (!this.__isSame(this.values[index], this.valuesDefault[index]))
      {
        changed = true;
      }
    }.bind(this));
    return changed;
  },
  hasRestored: function ()
  {
    var restored = false;
    Array.each(this.elements, function (element)
    {
      if (element.hasClass('value-restored'))
      {
        restored = true;
      }
    }.bind(this));
    return restored;
  },
  getValue: function (element)
  {
    var el = element || this.elements[0];
    var index = this.elements.indexOf(el);
    if (index !== -1)
    {
      return this.values[index];
    }
    else
    {
      throw new Error("Target element not tracked");
    }
  },
  getDefault: function (element)
  {
    var el = element || this.elements[0];
    var index = this.elements.indexOf(el);
    if (index !== -1)
    {
      return this.valuesDefault[index];
    }
    else
    {
      throw new Error("Target element not tracked");
    }
  },
  getLast: function (element)
  {
    var el = element || this.elements[0];
    var index = this.elements.indexOf(el);
    if (index !== -1)
    {
      return this.valuesLast[index];
    }
    else
    {
      throw new Error("Target element not tracked");
    }
  },
  changeStatus: function ()
  {
    return { changed: this.hasChanged(), restored: this.hasRestored(), values: this.values, last: this.valuesLast, defaults: this.valuesDefault };
  },
  destroy: function ()
  {
    Array.each(this.elements, function (element)
    {
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
  if (FirstLetter === "H" || FirstLetter === "W") {
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
    if (CurChar === LastChar) {
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
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
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

/**   Mootools Request.File fix  *************************************************************************************/
/**   ------------------------   *************************************************************************************/
/*    Extends Mootools File request object                                                                           */

if (typeOf(File) === 'null') { var File = {}; } // IE is a dick
if (typeOf(Request) === 'null') { var File = {}; } // IE is a dick

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
      if (self.options.url.charAt(self.options.url.length - 1) !== '?') self.options.url += '&';
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
      input = document.id(input),
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

/**   DOM NODE SHAKER            *************************************************************************************/
/**   ------------------------   *************************************************************************************/
/*    Shake it off .. or something ...                                                                               */

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
    d = null;
  },
  stop: function () {
    this.loops = this.options.loops;
    this.tween.cancel();
    this.element.setStyle('margin-left', 0);
  }
});

/**   AUTH USER REQUEST          *************************************************************************************/
/**   ------------------------   *************************************************************************************/
/*    Generic user authentication request object - retuens JSON object                                               */

Affinity.user = null;

AuthRequest = new Class({
  initialize: function (options) {
    this._req = new Request(options);
  },
  send: function () {
    this._authorize(function () {
      this._req.send();
    }.bind(this));
  },
  get: function () {
    this._authorize(function () {
      this._req.get();
    }.bind(this));
  },
  post: function () {
    this._authorize(function () {
      this._req.post();
    }.bind(this));
  },
  _authorize: function (callback) {
    var self = this;
    if (!Affinity.user) {
      new Request.JSON({
        url: '/Auth/GetInfo',
        onSuccess: function (data) {
          Affinity.user = data;
          if (data.ExpiryTimeout < 0) {
            Affinity.user.AccessToken = '';
            return self._authorize(callback);
          }
          self._setAccessTimeout(data.ExpiryTimeout * 1000);
          self._setAuthHeader();
          callback();
        }
      }).post();
    } else if (!Affinity.user.AccessToken) {
      new Request.JSON({
        url: '/Auth/RefreshAccessToken',
        onSuccess: function (data) {
          if (data.error) return location.reload();
          Affinity.user.AccessToken = data.AccessToken;
          self._setAccessTimeout(data.ExpiryTimeout * 1000);
          self._setAuthHeader();
          callback();
        },
        onFailure: function (err) {
          console.log('Failed to refresh access token.');
        }
      }).post();
    } else {
      self._setAuthHeader();
      callback();
    }
  },
  _setAuthHeader: function () {
    this._req.options.headers.Authorization = 'Bearer ' + Affinity.user.AccessToken;
  },
  _setAccessTimeout: function (timeout) {
    clearTimeout(this._accessTimeout)
    this._accessTimeout = setTimeout(function () {
      Affinity.user.AccessToken = '';
    }, timeout);
  }
});

AuthRequest.JSON = new Class({
  Extends: AuthRequest,
  initialize: function (options) {
    this._req = new Request.JSON(options);
  }
});

//Backward compatibility
Request.AuthJSON = AuthRequest.JSON;

/*************************************************************************************************************************/
/**                            *******************************************************************************************/
/**   LANGUAGE AND COPY        *******************************************************************************************/
/**                            *******************************************************************************************/
/*************************************************************************************************************************/
/**                                                                                                                     **/
/**   Specified langiage and copy loaded from root "lang.json"                                                          **/
/**   Includes sub strings and methods                                                                                  **/
/**                                                                                                                     **/
/*************************************************************************************************************************/

Affinity.languages = {
  english: {
    helpIcon: Affinity.icons.HelpRound,
    helpTabTooltip: "Help"
  }
};

Affinity.Lang  = new (new Class({
  /** PUBLIC ****************************************/
  Load: function (path) {
    new Request.JSON({
      url: path || './lang.json?ran=' + (new Date()).getTime(),
      onComplete: this._process,
      onError: this._loadFailed,
      onFailure: this._loadFailed
    }).get();
  },
  CheckPath: function (pathStr)
  {
    var path = Affinity.languages.english;
    var patharray = pathStr.replace('l:', '').replace('join:', '').split('.');
    for (var p = 0; p < patharray.length; p++) if (path.hasOwnProperty(patharray[p])) path = path[patharray[p]];
    if (path) return true;
    return false;
  },
  ReturnPath: function (pathStr)
  {
    var path = Affinity.languages.english;
    var patharray = pathStr.replace('l:', '').replace('join:', '').split('.');
    for (var p = 0; p < patharray.length; p++) if (path.hasOwnProperty(patharray[p])) path = path[patharray[p]];
    if (path) return path;
    return null;
  },
  /** PRIVATE ***************************************/
  _returnIcon: function (str, pathStr)
  {
    var path = window;
    var patharray = pathStr.replace('i:', '').split('.');
    for (var p = 0; p < patharray.length; p++) if (path.hasOwnProperty(patharray[p])) path = path[patharray[p]];
    if (path && typeof path === 'string') return str.replace('{{' + pathStr + '}}', path);
    return str;
  },
  _returnLabel: function (str, pathStr)
  {
    var path = Affinity.languages.english;
    var joinArray = pathStr.contains('join:');
    var patharray = pathStr.replace('l:', '').replace('join:', '').split('.');
    for (var p = 0; p < patharray.length; p++) if (path.hasOwnProperty(patharray[p])) path = path[patharray[p]];
    if (path)
    {
      if (joinArray && Array.isArray(path)) return str.replace('{{' + pathStr + '}}', path.join(' '));
      if (!joinArray && (typeof path === 'string' || typeof path === 'number')) return str.replace('{{' + pathStr + '}}', path);
    }
    return str;
  },
  _retuenMethodRef: function (str, pathStr)
  {
    var path = window;
    var patharray = pathStr.replace('m:', '').split('.');
    for (var p = 0; p < patharray.length; p++) if (path.hasOwnProperty(patharray[p])) path = path[patharray[p]];
    if (path && typeof path === 'function') return path;
    return function () { };
  },
  _processString: function (str)
  {
    if (str.contains('{{') && str.contains('}}'))
    {
      var braceRegExp = /[^{{\}}]+(?=}})/g;
      var matches = str.match(braceRegExp);
      if (matches !== null)
      {
        var m, match, type, patharray, newStr;
        for (m = 0; m < matches.length; m++)
        {
          match = matches[m];
          type = match.substr(0, 2);
          switch (type)
          {
            case 'i:': // Icon
              str = this._returnIcon(str, match);
              break;
            case 'l:': // Label
              str = this._returnLabel(str, match);
              break;
            case 'm:': // Method
              str = this._retuenMethodRef(str, match);
              break;
          }
        }
      }
    }
    return str;
  },
  _check: function (obj)
  {
    if (typeof obj === 'object')
    {
      for (key in obj)
      {
        if (typeof obj[key] === 'object') this._check(obj[key]);
        else if (typeof obj[key] === 'string') obj[key] = this._processString(obj[key]);
      }
    }
    return obj;
  },
  _process: function(json)
  {
    if (json.hasOwnProperty('languages') && json.languages.hasOwnProperty('english')) {
      if (typeof json.languages.english === 'object')
      {
        Affinity.languages.english = Affinity.DeepMergeObjects([Affinity.languages.english, json.languages.english]);
        Affinity.languages.english = this._check(Affinity.languages.english);
      }
    }
    window.fireEvent('langComplete');
  },
  _loadFailed: function()
  {
    window.fireEvent('langComplete');
  },
  /**************************************************/
  initialize: function () { },
  Binds: ['Load', 'CheckPath', 'ReturnPath', '_returnIcon', '_returnLabel', '_retuenMethodRef', '_processString', '_check', '_process', '_loadFailed']
}));

/*************************************************************************************************************************/
/**                            *******************************************************************************************/
/**   FAV NAME VALIDATION      *******************************************************************************************/
/**                            *******************************************************************************************/
/*************************************************************************************************************************/
/**                                                                                                                     **/
/**   Validates a Favourite name srteing prior tpo posting                                                              **/
/**   Refers to Lang methods and paths                                                                                  **/
/**                                                                                                                     **/
/*************************************************************************************************************************/

Affinity.FavResultSort = function(response, sortOn, groupBy)
{
  var basicAlphaSort = function (arr, key)
  {
    arr.sort(function (a, b)
    {
      var textA = (a[key] + '').toUpperCase(), textB = (b[key] + '').toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    return arr;
  };
  sortOn = sortOn || 'Name';
  groupBy = groupBy || false;
  if (groupBy)
  {
    if (response.length > 0 && response[0].hasOwnProperty(sortOn) && response[0].hasOwnProperty(groupBy))
    {
      var groups = {}, groupkey, sortedData = [];
      response.forEach(function (favdata)
      {
        groupkey = (favdata[groupBy] + '').trim().replace(/\s/g, '');
        if (!groups.hasOwnProperty(groupkey)) groups[groupkey] = [];
        groups[groupkey].push(favdata);
      });
      Object.keys(groups).sort().forEach(function (secondKey)
      {
        basicAlphaSort(groups[secondKey], sortOn).forEach(function (data)
        {
          sortedData.push(data);
        });
      });
      return sortedData;
    }
  }
  else
  {
    if (response.length > 0 && response[0].hasOwnProperty(sortOn)) return basicAlphaSort(response, sortOn);
  }
  return response;
};

Affinity.FavNameValidation = function (name) {
  var rtn = {
    isValid: true,
    error: false
  };
  if (Affinity.Lang.CheckPath('features.favourites.validation') && Affinity.Lang.CheckPath('application.timesheets.features.favourites'))
  {
    var favConstraints = Affinity.languages.english.features.favourites.validation,
      messageBase = Affinity.languages.english.application.timesheets.features.favourites,
      illegalchars = favConstraints.illegalchars,
      maxlength = favConstraints.max,
      minLength = favConstraints.min,
      illegalMessage = messageBase.illegalMessage,
      badMessage = messageBase.badMessage,
      tooLongMessage = messageBase.tooLongMessage,
      tooShortMessage = messageBase.tooShortMessage;
    if (name.length === 0 || name === null || name === undefined)
    {
      // no length or no value
      rtn.isValid = false;
      rtn.error = tooShortMessage;
      return rtn;
    }
    if (illegalchars && illegalMessage)
    {
      for (var c = illegalchars.length - 1; c > -1; c--)
      {
        // check for illegal chars
        if (name.indexOf(illegalchars[c]) !== -1)
        {
          rtn.isValid = false;
          rtn.error = illegalMessage;
          return rtn;
        }
      }
    }
    if (new RegExp(/^\d+$/).test(name.trim()) || !isNaN(parseInt(name.trim().charAt(0))))
    {
      // is numerical only or starts with a number
      rtn.isValid = false;
      rtn.error = badMessage;
      return rtn;
    }
    if (name.trim().length > maxlength)
    {
      // is too long
      rtn.isValid = false;
      rtn.error = tooLongMessage;
      return rtn;
    }
    if (name.trim().length < minLength)
    {
      // is too short
      rtn.isValid = false;
      rtn.error = tooShortMessage;
      return rtn;
    }
  }
  return rtn;
};

Affinity.CheckFavError = function (response, defaultValue)
{
  var hasError = response.hasOwnProperty('error'),
     isString = hasError ? typeof response.error === 'string' : false,
     isNotNull = isString ? response.error !== '' : false,
     errorStr = isNotNull ? response.error : typeof response === 'string' ? response : defaultValue;
     isNotUnique = errorStr.toUpperCase().contains('UNIQUE KEY') ? true : false,
     isNotUnique = errorStr.toLowerCase().contains('already exists') ? true : isNotUnique;
  if (isNotUnique) return Affinity.languages.english.application.timesheets.features.favourites.alreadyExistsError;
  if (response.error.contains('Not found')) return response.error.replace('Not found', 'Could not find:<br />');
  return defaultValue;
};

/*************************************************************************************************************************/
/**                            *******************************************************************************************/
/**   MASTER LOADER SPINNER    *******************************************************************************************/
/**                            *******************************************************************************************/
/*************************************************************************************************************************/
/**                                                                                                                     **/
/**                                                                                                                     **/
/*************************************************************************************************************************/

Affinity.ShowMasterLoader = function (delay)
{
  if (typeof delay === 'number') time = delay;
  else time = false;
  if (time)
  {
    setTimeout(function () { document.querySelector('body').classList.add('newload-lock'); }, time);
  }
  else
  {
    document.querySelector('body').classList.add('newload-lock');
  }
};

Affinity.HideMasterLoader = function (delay)
{
  if (typeof delay === 'number') time = delay;
  else time = false;
  if(time)
  {
    setTimeout(function () { document.querySelector('body').classList.remove('newload-lock'); }, time);
  }
  else
  {
    document.querySelector('body').classList.remove('newload-lock');
  }
};

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

Affinity.FeatureChecks = {

  /**   CALC SCROLLBAR WIDTH       *************************************************************************************/
  /**   ------------------------   *************************************************************************************/
  /*    get scrollbar width for thisborwser type                                                                       */

  ScrollBarWidth: function ()
  {
    var inner, outer, w1, w2;
    inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";
    outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);
    document.body.appendChild(outer);
    w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;
    document.body.removeChild(outer);
    Affinity.scrollBarSize = (w1 - w2);
    return Affinity.scrollBarSize;
  },

  /**   DATALIST DETECTION         *************************************************************************************/
  /**   ------------------------   *************************************************************************************/
  /*    check if select type "datalist" is avaiable                                                                    */

  DatalistTest: function ()
  {
    var testEl = document.createElement('datalist');
    if (testEl && 'options' in testEl) {
      Affinity.supportsDatalist = true;
    }
    testEl = null;
  },

  /**   PASSIVE EVENT DETECTION    *************************************************************************************/
  /**   ------------------------   *************************************************************************************/
  /*    check if browser supports passive events                                                                       */

  PassiveEvents: function ()
  {
    var passivetest = false;
    try { document.addEventListener("test", null, { get passive() { passivetest = true } }); } catch (e) { }
    Affinity.supportsPassiveEvents = passivetest;
  },

  /**   TYPE DETECTION             *************************************************************************************/
  /**   ------------------------   *************************************************************************************/
  /*    collect information from body class                                                                            */

  TypeDetection: function ()
  {
    var classes = document.body.classList;
    Affinity.ismac = classes.contains('mac') ? true : false;
    Affinity.isie = classes.contains('ie') ? true : false;
    Affinity.isEdge = classes.contains('ieedge');
    if (Affinity.isie) Affinity.ieversion = Browser.version;
    if (Affinity.isie) Affinity.iedocmode = document.documentMode ? document.documentMode : false;
    Affinity.ismobile = classes.contains('mobile') ? true : false;
    if (Affinity.mobile) Affinity.ismobile = true; // override from included touch.js libs - see above.
    Affinity.isTeampayoffice = window.location.href.toLowerCase().indexOf('teampayoffice') !== -1 ? true : false;
    Affinity.isTeampayofficeBranch = Affinity.isTeampayoffice ? window.location.href.toLowerCase().indexOf('/tb') !== -1 ? true : false : false;
    if (Affinity.isie && Affinity.iedocmode === 8) document.getElementsByTagName('body')[0].classList.add('ie8');
    if (Affinity.isie && Affinity.iedocmode === 9) document.getElementsByTagName('body')[0].classList.add('ie9');
    if (Affinity.isie && Affinity.iedocmode === 10) document.getElementsByTagName('body')[0].classList.add('ie10');
    if (Affinity.isie && !Affinity.isEdge && Affinity.iedocmode < 11) document.getElementsByTagName('body')[0].classList.add('not-supported');
  },

  /**   DASHBOARD DETECTION        *************************************************************************************/
  /**   ------------------------   *************************************************************************************/
  /*    check global value or body class for "dashboard wrapper"                                                       */

  DashboardWrapper: function ()
  {
    var checkKeys = ['Dashboard', 'dashboard', 'IsDashboard', 'isDashboard', 'isdashboard', 'HasDashboard', 'hasDashboard', 'hasdashboard'],
        hasDashboard = false,
        i = 0,
        key;
    for (; i < checkKeys.length; i++) {
      key = checkKeys[i];
      if (Affinity.hasOwnProperty(key)) {
        if(typeOf(Affinity[key]) === 'boolean'){
          if(Affinity[key] !== false){
            hasDashboard = true;
          }
        } else if (typeOf(Affinity[key]) !== 'null') {
          hasDashboard = true;
        }
      }
    }
    if (!('hasDashboardWrapper' in Affinity))
    {
      Affinity.hasDashboard = hasDashboard;
      Affinity.hasDashboardWrapper = function () { return Affinity.hasDashboard; };
    }
    return hasDashboard;
  },

  /**   WEB WORKER DETECTION       *************************************************************************************/
  /**   ------------------------   *************************************************************************************/
  /*    check if web workers are avaiable                                                                              */

  CheckWebWorkers: function ()
  {
    if(!Affinity.hasOwnProperty('CheckForWorkers')) Affinity.CheckForWorkers = true; // no Web.Config value set
    if (Affinity.CheckForWorkers) Affinity.CheckForWorkers = Affinity.isie && Affinity.ieversion <= 11 ? false : Affinity.CheckForWorkers;
    if (Affinity.CheckForWorkers) Affinity.supportsWebWorkers = typeof (Worker) !== "undefined" ? true : false;
    delete Affinity.CheckForWorkers;
  },

  /**   ELEMENT CLOSEST            *************************************************************************************/
  /**   ------------------------   *************************************************************************************/
  /*    check for Element.Closest() and polyfill if missing                                                            */

  CheckElementClosest: function ()
  {
    if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    if (!Element.prototype.closest)
    {
      Element.prototype.closest = function (s)
      {
        var el = this;
        if (!document.documentElement.contains(el)) return null;
        do
        {
          if (el.matches(s)) return el;
          el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
      };
    }
  },

  /**   POLYFILL - FOREACH         *************************************************************************************/
  /**   ------------------------   *************************************************************************************/
  /*    check for Array.forEach and NodeList.forEach - if missing, set polyfill                                        */

  CheckForArrayForEach: function ()
  {
    if (!Array.prototype.forEach)
    {
      Array.prototype.forEach = function (callback/*, thisArg*/)
      {
        var T, k;
        if (this == null) throw new TypeError('this is null or not defined');
        // 1. Let O be the result of calling toObject() passing the
        // |this| value as the argument.
        var O = Object(this);
        // 2. Let lenValue be the result of calling the Get() internal
        // method of O with the argument "length".
        // 3. Let len be toUint32(lenValue).
        var len = O.length >>> 0;
        // 4. If isCallable(callback) is false, throw a TypeError exception. 
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
        // 5. If thisArg was supplied, let T be thisArg; else let
        // T be undefined.
        if (arguments.length > 1) T = arguments[1];
        // 6. Let k be 0.
        k = 0;
        // 7. Repeat while k < len.
        while (k < len)
        {
          var kValue;
          // a. Let Pk be ToString(k).
          //    This is implicit for LHS operands of the in operator.
          // b. Let kPresent be the result of calling the HasProperty
          //    internal method of O with argument Pk.
          //    This step can be combined with c.
          // c. If kPresent is true, then
          if (k in O)
          {
            // i. Let kValue be the result of calling the Get internal
            // method of O with argument Pk.
            kValue = O[k];
            // ii. Call the Call internal method of callback with T as
            // the this value and argument list containing kValue, k, and O.
            callback.call(T, kValue, k, O);
          }
          // d. Increase k by 1.
          k++;
        }
        // 8. return undefined.
      };
    };
    if (window.NodeList && !NodeList.prototype.forEach)
    {
      NodeList.prototype.forEach = Array.prototype.forEach;
    }
  }

};

/*************************************************************************************************************************/
/**                            *******************************************************************************************/
/**   PRINCIPLE READY CHECKS   *******************************************************************************************/
/**                            *******************************************************************************************/
/*************************************************************************************************************************/

Affinity.TimesheetsReady = function ()
{
  return
    Affinity.hasOwnProperty('timesheets') &&
    Affinity.timesheets !== null &&
    Affinity.timesheets.hasOwnProperty('ready') &&
    typeof Affinity.timesheets.ready === 'boolean' &&
    Affinity.timesheets.ready === true;
};

Affinity.SessionLoginExists = function ()
{
  return Affinity.hasOwnProperty('login') && Affinity.login !== null ? true : false;
};

Affinity.SessionLoginReady = function ()
{
  return Affinity.SessionLoginExists() && Affinity.login.hasOwnProperty('ready') && typeof Affinity.login.ready === 'boolean' && Affinity.login.ready === true ? true : false;
};

/*************************************************************************************************************************/
/**                        ***********************************************************************************************/
/**   ON PAGE READY        ***********************************************************************************************/
/**                        ***********************************************************************************************/
/*************************************************************************************************************************/

Affinity.PageReady = function (ev)
{

  if ('onreadystatechange' in document) document.onreadystatechange = null;
  else document.removeEventListener('DOMContentLoaded', Affinity.PageReady, false);
  window.removeEventListener('PageReady', Affinity.PageReady, false);

  /**   RUN ALL UI TESTS           ************************************************************************************/
  /**   ------------------------   ************************************************************************************/
  /**   Run all tests in Affinity.Tests obnjcet above                                                                **/

  Object.keys(Affinity.FeatureChecks).map(function (objectKey, index)
  {
    Affinity.FeatureChecks[objectKey]();
  });

  /**   SET API ROOTS              ************************************************************************************/
  /**   ------------------------   ************************************************************************************/
  /**   set API path roots values based on API version                                                               **/

  if (Affinity.apiversion > 1)
  {
    Affinity.zelosroot = Affinity.zelosroot;
    Affinity.lookupapi = Affinity.zelosroot + '?api=Lookup/Get';
  }
  else
  {
    Affinity.lookupapi = Affinity.zelosroot + '?api=Lookup/Get';
  }

  Affinity.EstablishAutosrollOnDragEvents();

  /**   REFRESH PROTECTION         ************************************************************************************/
  /**   ------------------------   ************************************************************************************/
  /**   Stop aggressive refreshing!                                                                                  **/

  Affinity.refreshControll = {};
  Affinity.refreshControll.initialLoad = true;
  Affinity.refreshControll.lastRefresh = new Date().getTime();
  window.addEvent('keydown', function (e)
  {
    if (
      e.key === 'f5' || e.key === 'F5' ||
      (e.control && (e.key === 'r' || e.key === 'R'))
    )
    {
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

  /**   DARK MODE                  ************************************************************************************/
  /**   ------------------------   ************************************************************************************/
  /**   Toggle dark mode for users in low light conditions                                                           **/

  (function ()
  {
    var timer, darkmode = function ()
    {
      clearTimeout(timer);
      if (document.body)
      {
        Affinity.DarkMode = false;
        if (Affinity.CookieMonster.Read('dark-mode'))
        {
          var dm = Affinity.CookieMonster.Read('dark-mode');
          if (typeof dm === 'string') dm = dm.toLowerCase().trim() === 'true' ? true : false;
          Affinity.DarkMode = dm;
        }
        if (Affinity.DarkMode) document.body.classList.add('dark');
        else document.body.classList.remove('dark');
        return;
      }
      timer = setTimeout(darkmode, 10);
    };
    darkmode();
    window.addEventListener('keydown', function (e)
    {
      if (e.ctrlKey && e.altKey && (e.key === 'd' || e.key === 'D'))
      {
        Affinity.DarkMode = !Affinity.DarkMode;
        Affinity.CookieMonster.Write('dark-mode', Affinity.DarkMode);
        if (Affinity.DarkMode) document.body.classList.add('dark');
        else document.body.classList.remove('dark');
      }
    });
  })();

  /**   IE FIXES     **************************************************************************************************/
  /**   ------------------------   ************************************************************************************/
  /**   Prevent backspace performing history back in IE8 when select is focused                                      **/

  if (Affinity && Affinity.isie && Affinity.ieversion < 9)
  {
    document.addEvent('keydown', function (e)
    {
      if (e.key === 8 || e.key === 'backspace')
      {
        if (e.target.get('tag').test('select', 'gi') || e.target.disabled || e.target.readOnly)
        {
          e.preventDefault();
        }
      }
    });
  }

  /**   SET GLOBAL DISPLAY NAME    ************************************************************************************/
  /**   ------------------------   ************************************************************************************/
  /**   if login is implemented, populate global 'employee name' DOM elements                                        **/

  window.addEvent('userComplete', function (user)
  {
    document.getElements('.displayname').set('html', user.commonName ? user.commonName : user.displayName ? user.displayName : '');
  });

  /**   BARAN ESS FRAME RESIZE     ************************************************************************************/
  /**   ------------------------   ************************************************************************************/
  /**   Fire frame resize events (used when nested in Baran's ESS iFrame)                                            **/
  /**   This can DIE a horrible terrible painfull death as soon as ESS dies once and for all                         **/

  try{
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

  /**   REDRAW ESS IFRAME WIN8     *****************************************************************************************/
  /**   ------------------------   *****************************************************************************************/
  /**   Check if nested in ESS, browser is Chrome and OS is Win 8                                                         **/

  if (Affinity.oldess && Affinity.oldessFrame && Affinity.agent.contains('Chrome') && Affinity.agent.contains('Windows NT 6.2')) {
    /* old ess nested iframe redraw issue for chrome on win 8 */
    window.addEvent('click', function () {
      if (document.getElement('body').className.contains('redraw')) {
        document.getElement('body').setStyle('width', '100%');
        document.getElement('body').classList.remove('redraw');
      } else {
        document.getElement('body').setStyle('width', '99.9%');
        document.getElement('body').classList.add('redraw');
      }
    });
  }

  /**   BARAN ESS CHECK            *****************************************************************************************/
  /**   ------------------------   *****************************************************************************************/

  Affinity.essmessage = '';
  (function () {
    Affinity.oldess = false;
    var uriObj = new URI(window.location.href);
    var queryObj = typeOf(uriObj.parsed.query) === 'null' ? {} : uriObj.parsed.query.parseQueryString();
    if ('sessionKey' in queryObj || 'isEss' in queryObj) {
      Affinity.oldess = true;
      if ('iframe' in queryObj) {
        Affinity.oldessLaunched = false;
        Affinity.oldessFrame = true;
        Affinity.oldessWindow = window.parent;
      }
      if ('external' in queryObj) {
        Affinity.oldessLaunched = true;
        Affinity.oldessFrame = false;
        Affinity.oldessWindow = window.opener;
      }
      if (Affinity.oldess && !('external' in queryObj) && !('iframe' in queryObj)) {
        window.addEvent('UiReady', function () {
          if (Affinity.appname === 'cleverforms') {
            Affinity.oldessLaunched = false;
            Affinity.oldessFrame = true;
            Affinity.oldessWindow = window.parent;
          } else {
            Affinity.oldessLaunched = true;
            Affinity.oldessFrame = false;
            Affinity.oldessWindow = window.opener;
          }
        });
      }
    }
  })();

  /**   OLD IE MASTER MESSAGE    *******************************************************************************************/
  /**   ------------------------   *****************************************************************************************/
  /**   Creates a master message that loads over top of any app warning of OLD IE.                                        **/

  Affinity.IeWarning = function () {
    if (typeof window.masterMessage !== 'undefined' && Affinity.isie && Affinity.ieversion < Affinity.minIEVersion) {
      var recomendedIE = Affinity.minIEVersion < 12 ? 'IE' + Affinity.minIEVersion : 'Edge', message = '';
      message += '<strong class="color red large">Warning!</strong><br /><br />';
      message += 'We do not support Internet Explorer ' + (Affinity.minIEVersion - 1) + ' and less.<br />';
      message += 'Some functionality may not work.<br /><br />';
      message += 'We recommend <a href="https:/' + '/www.google.com/chrome/browser/desktop/" target="_blank" class="color green">Chrome</a> or updating to at least ' + recomendedIE + '.<br /><br />';
      message += 'Continue at your own risk.';
      masterMessage({
        message: message,
        okText: 'Accept and Continue'
      });
    }
    window.removeEvent('UiReady', Affinity.IeWarning);
    Affinity.IeWarning = null;
    delete Affinity.IeWarning;
  };
  window.addEvent('UiReady', Affinity.IeWarning);

  /**   FINAL CLEANUP            *******************************************************************************************/
  
  if (Affinity.debug) console.info('<< affinity ready >>');

  setTimeout(function () {

    Affinity.Tests = null
    delete Affinity.Tests;
    if (Affinity.debug) console.info('\taffinity detections cleaned up');

    Affinity.PageReady = null;
    delete Affinity.PageReady;
    if (Affinity.debug) console.info('\taffinity cleaned up');

  }, 1000);

  if (Affinity.hasLangFile)
  {
    window.addEvent('langComplete', function () {
      if (Affinity.debug) console.info('\tlang loaded and processed');
      Affinity.commonsReady = true;
      window.fireEvent('AffinityReady');
    });
    Affinity.Lang.Load(Affinity.langFilePath + '?last=' + Affinity.langFileAge);
  }
  else
  {
    Affinity.commonsReady = true;
    window.fireEvent('AffinityReady');
  }

};

window.addEventListener('PageReady', Affinity.PageReady, false);
if ('onreadystatechange' in document) {
  document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
      Affinity.PageReady();
    }
  }
} else {
  document.addEventListener('DOMContentLoaded', Affinity.PageReady, false);
}

/**   AUTOFIRE PAGEREADY         *****************************************************************************************/
/**   ------------------------   *****************************************************************************************/

/* NO!!! Use Dmitri's thing instead?? Don't know why .. 'cos dashbaord, that's why ... none of it makes any sense ...
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
Affinity.prettyuploads = true;
Affinity.selectToAutoNum = 0;
Affinity.selectmax = 2000;
Affinity.enableSelectLimit = true;
Affinity.disableAutoPageReady = false;
Affinity.showProdConsole = false;
Affinity.minIEVersion = 11;

// TODO: Remove this when all legacy UI has replaced document with window
window.config = document.config = Affinity;
