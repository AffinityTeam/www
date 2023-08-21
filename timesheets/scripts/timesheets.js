﻿Affinity.Components = Affinity.Components || {};
Affinity.Components.Favourites = {
  Version: '1.0.10.0',
  Sequence: 10030,
  Name: 'Favourites',
  File: 'ts.favourites.js',
  Jira: '',
  Notes: 'Add hide new master laoder'
};

var Favourites = new Class({

  Implements: [Options, Events],

  Binds: [
    'init', 'initContinue',
    'insertMobileMenuHeader',
    'dashboardLoginDelayHack',
    'getFavs', 'getEmployeeFavs', 'gotFavs',
    'insertRow',
    'processError',
    'reset',
    'checkMobileMenuSwipeOpen', 'mobileMenuOpen', 'mobileMenuClose',
    'loggedin', 'loggedout'
  ],

  options: {
    target: null
  },

  emptyRowTemplate: '',
  rowTemplate: '',

  initialize: function (options)
  {
    Affinity.timesheets = Affinity.timesheets || {};
    Affinity.timesheets.init = Affinity.timesheets.init || {};
    Affinity.timesheets.init.currentView = 'Favourites';
    Affinity.timesheets.favouritesInit = this;

    this.setOptions(options);
    this.table = this.options.target;
    this.tbody = this.table.getElement('tbody');
    this.emptyRowTemplate = this.tbody.getElement('tr').innerHTML;
    this.rowTemplate = this.tbody.getElement('tr.fav-row-template').innerHTML;

    this.reset(this.emptyRowTemplate);
  },

  employeeProfile: false,

  init: function ()
  {
    window.removeEvent('UiReady', this.init);
    if (document.body.classList.contains('ss-dashboard-wrapper')) document.querySelector('.pagewrapper').classList.add('dashboard');
    this.initContinue();
  },

  initContinue: function (ev)
  {

    this.baseLang = Affinity.languages.english.features;
    this.baseAppLang = Affinity.languages.english.application.timesheets.features;

    this.table.querySelectorAll('thead th')[0].innerHTML = this.baseAppLang.favourites.views.manage.columnName;
    this.table.querySelectorAll('thead th')[1].innerHTML = this.baseAppLang.favourites.views.manage.columnType;
    this.table.querySelectorAll('thead th')[2].innerHTML = this.baseAppLang.favourites.views.manage.columnFields;

    this.isManager = false;
    this.employeNumer = false;
    this.hasDates = false;
    this.favs = [];

    this.tabBox = document.getElement('.section-nav ul').removeClass('hidden');
    /**/
    if (document.getElement('li#logout'))
    {
      this.logoutButton = document.getElement('#logout');
      if (Affinity.hasDashboardWrapper())
      {
        this.logoutButton.addClass('hidden');
      }
      else
      {
        this.logoutButtonLabel = this.logoutButton.getElement('span.text');
        if (Affinity.oldess)
        {
          this.logoutButtonLabel.set('html', 'Close');
          this.logoutButton.addClass('ui-has-tooltip').set('data-tooltip', 'Will not log out of ESS').set('data-tooltip-dir', 'bottom');
        }
        else
        {
          this.logoutButtonLabel.set('html', 'Logout');
        }
      }
    }
    if (Affinity.Browser.ismobile)
    {
      this.tabBoxContainer = document.getElement('.section-nav');
      this.tabBoxListContainer = this.tabBoxContainer.querySelector('ul');
      this.tabBoxButton = document.getElement('.section-nav-icon');
      this.tabBoxButton.addEvent(Affinity.events.click, this.mobileMenuOpen);
      this.hammer = new Hammer(window, { domEvents: true, threshold: Affinity.panThreshold });
      this.hammer.get('pan').set({ domEvents: true, threshold: Affinity.panThreshold });
      this.hammer.on('panleft', this.checkMobileMenuSwipeOpen);
      this.hammer.on('panright', this.mobileMenuClose);
      window.addEvent('mobileback', this.mobileMenuClose);
      window.addEvent('touchstart', function (e) { this.tochStartX = e.client.x; }.bind(this));
      this.tabBoxListContainer.addEventListener('touchstart', Affinity.StopEvent);
      this.tabBoxListContainer.addEventListener('click', Affinity.StopEvent);
      this.insertMobileMenuHeader();
      if (this.tabBoxContainer.querySelector('a'))
      {
        var links = this.tabBoxContainer.querySelectorAll('a');
        for (var a = 0; a < links.length; a++)
        {
          var aNode = links[a];
          var liNode = aNode.parentNode;
          aNode.removeEvents();
          liNode.removeEventListener(event, this.homeClicked);
          liNode.addEventListener(Affinity.Browser.ismobile ? 'touchstart' : 'click', function ()
          {
            //window.location.href = aNode.href;
            Affinity.OpenLink(aNode.href, aNode.target);
          });
        }
      }
    }
    this.tabBox.parentNode.parentNode.classList.add('has-nav');

    if (Affinity.isLoggedIn)
    {
      this.loggedin();
      setTimeout(function ()
      {
        window.addEvent('loggedin', this.loggedin);
        window.addEvent('loggedout', this.loggedout);
      }.bind(this), 1000);
    }
    else
    {
      window.addEvent('loggedin', this.loggedin);
      window.addEvent('loggedout', this.loggedout);
    }

    Affinity.AwardModels = {
      Widgets: [],
      closeAll: function () { Affinity.AwardModels.Widgets.forEach(function (widget) { if (widget && widget.hasOwnProperty('close') && typeof widget.close === 'function') widget.close(); }); }
    };

    Affinity.HideMasterLoader(1000);

    return true;

  },

  insertMobileMenuHeader: function ()
  {
    if (Affinity.Browser.ismobile && this.tabBoxContainer)
    {
      if (!document.querySelector('.mobile-close-header'))
      {
        var mobileMenuCloseHeaderNode = document.createElement('div');
        mobileMenuCloseHeaderNode.classList.add('mobile-close-header');

        var mobileMenuCloseLabelNode = document.createElement('div');
        mobileMenuCloseLabelNode.classList.add('mobile-close-header-label');
        mobileMenuCloseLabelNode.innerHTML = 'Favourites';
        mobileMenuCloseHeaderNode.appendChild(mobileMenuCloseLabelNode);

        var mobileMenuCloseButtonNode = document.createElement('div');
        mobileMenuCloseButtonNode.classList.add('mobile-close-header-button');
        mobileMenuCloseButtonNode.innerHTML = '<svg class="stroke-ico  ss-dashboard-wrapper-ico-close" width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M7.90381 6.90381L17.0962 16.0962" stroke="#344356" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.0962 6.90381L7.90379 16.0962" stroke="#344356" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
        mobileMenuCloseHeaderNode.appendChild(mobileMenuCloseButtonNode);

        mobileMenuCloseHeaderNode.addEventListener('click', this.mobileMenuClose);

        this.tabBoxContainer.insertBefore(mobileMenuCloseHeaderNode, this.tabBoxContainer.firstChild);
      }
    }
  },

  dashboardLoginDelayHackPasses: 0,
  dashboardLoginDelayHackTimer: false,
  dashboardLoginDelayHack: function ()
  {
    this.dashboardLoginDelayHackTimer = setTimeout(function ()
    {
      clearTimeout(this.dashboardLoginDelayHackTimer);
      this.dashboardLoginDelayHackPasses++;
      if (Affinity.SessionLoginReady() && Affinity.isloggedin) this.loggedin();
      else this.dashboardLoginDelayHack();
    }.bind(this), 1000);
  },

  /**/

  getFavsLoader: false,
  getFavs: function ()
  {
    window.scrollTo(0, 0);
    Affinity.prompts.clearOnClose();
    Affinity.prompts.hide();
    this.reset('<span class="spinner small light"></span>');
    if (this.isManager) this.getEmployeeFavs();
    else this.getEmployeeFavs(this.employeNumer);
  },

  getEmployeeFavs: function (empNum)
  {
    var url, getFavsLoader;
    url = Affinity.zelosroot + '?api=Favourite/GetFavouriteNamesExt';
    if (empNum) url += '&employeeNo=' + empNum;
    getFavsLoader = new Request.JSON({
      method: 'get',
      noCache: true,
      url: url,
      onSuccess: function (result)
      {
        if (!JSON.Unauthorized(result))
        {
          var errormsg;
          if (result.hasOwnProperty('error') && typeOf(result.error) === 'string')
          {
            errormsg = result.error.trim() !== '' ? result.error.trim() : Affinity.languages.english.generic.error,
            errormsg = Affinity.CheckFavError(result, errormsg);
            console.log(errorStr);
          }
          else if (result.hasOwnProperty('errorMsg') && typeOf(result.errorMsg) === 'string')
          {
            errormsg = result.errorMsg.trim() !== '' ? result.errorMsg.trim() : Affinity.languages.english.generic.error,
            errormsg = Affinity.CheckFavError(result, errormsg);
            console.log(errorStr);
          }
          else
          {
            if (typeOf(result) === 'array' && result.length > 0)
            {
              this.gotFavs(result);
            }
            else
            {
              this.reset();
            }
          }
        }
        else
        {
          this.processError("Unauthorised");
        }
      }.bind(this)
    }).get();
  },

  returnHash: function (data)
  {
    var hash = [];
    Object.each(JSON.decode(data.Fields), function (value, key)
    {
      hash.push(key + ':' + value);
    });
    hash.push('Type:' + data.Type);
    hash.push('EmployeeNo:' + data.EmployeeNo);
    hash.push('Name:' + data.Name);
    hash.sort();
    hash = hash.join(',');
    return hash;
  },

  gotFavs: function (favData)
  {
    this.favs = [];
    if (favData.length === 0)
    {
      this.reset(this.emptyRowTemplate);
      return;
    }
    else
    {
      if (this.options.isManager)
      {
        this.favs = Affinity.FavResultSort(favData, 'Name', 'EmployeeName');
      }
      else
      {
        this.favs = Affinity.FavResultSort(favData, 'Name');
      }
    }
    this.tbody.empty();
    var hashes = [], hash;
    Array.each(this.favs, function (data)
    {
      hash = this.returnHash(data);
      if (hashes.indexOf(hash) === -1)
      {
        hashes.push(hash);
        data.Type = data.hasOwnProperty('Type') ? data.Type : this.defaultType;
        data.EmployeeNo = data.hasOwnProperty('EmployeeNo') ? parseInt(data.EmployeeNo) : data.hasOwnProperty('Item1') ? parseInt(data.Item1) : '?';
        data.EmployeeName = data.hasOwnProperty('EmployeeName') ? data.EmployeeName : data.hasOwnProperty('Item2') ? data.Item2 : '?';
        data.Name = data.hasOwnProperty('Name') ? data.Name : data.hasOwnProperty('Item3') ? data.Item3 : '?';
        data.Fields = data.hasOwnProperty('Fields') ? JSON.decode(data.Fields) : data.hasOwnProperty('Item4') ? JSON.decode(data.Item4) : {};
        data.Created = data.hasOwnProperty('Created') ? Date.parse(data.Created) : new Date();
        this.insertRow(data);
      }
    }.bind(this));
    if (Affinity.uiGrid) { Affinity.uiGrid.zebra(this.table, 'fav-row'); }
  },

  insertRow: function (data, rowIndex)
  {
    var rowWidget = new FavouriteRow(data, this.rowTemplate, this);
    rowWidget.element.inject(this.tbody);
  },

  processError: function (errorStr)
  {
    this.reset(errorStr);
  },

  reset: function (html)
  {
    this.tbody.empty();
    new Element('tr').adopt(
      new Element('td', { colspan: (this.hasDates ? 5 : 4), 'html': html ? html : this.baseAppLang.favourites.views.manage.none })
    ).inject(this.tbody);
  },

  /**/

  mobileCloseDelay: false,
  checkMobileMenuSwipeOpen: function (e)
  {
    if (!Affinity.Browser.ismobile) return;
    Affinity.stopHammerEvent(e);
    if (
      e && 'additionalEvent' in e
      && e.additionalEvent.toLowerCase() === 'panleft'
      && this.tochStartX > window.getSize().x - Affinity.panThreshold
    )
    {
      this.mobileMenuOpen();
    }
  },
  mobileMenuOpen: function (e)
  {
    if (!Affinity.Browser.ismobile) return;
    if (e !== undefined)
    {
      Affinity.stopHammerEvent(e);
      e.preventDefault();
      e.stopPropagation();
    }
    clearTimeout(this.mobileCloseDelay);
    this.tabBoxContainer.addClass('open');
    window.removeEvent(Affinity.events.click, this.mobileMenuClose);
    window.removeEvent('mobileback', this.mobileMenuClose);
    this.mobileCloseDelay = (function ()
    {
      window.addEvent(Affinity.events.click, this.mobileMenuClose);
      window.addEvent('mobileback', this.mobileMenuClose);
      this.tabBoxContainer.addClass('ready');
    }).delay(250, this);
  },
  mobileMenuClose: function (e)
  {
    if (!Affinity.Browser.ismobile) return;
    Affinity.stopHammerEvent(e);
    clearTimeout(this.mobileCloseDelay);
    this.tabBoxContainer.removeClass('open');
    this.tabBoxContainer.removeClass('ready');
    window.removeEvent(Affinity.events.click, this.mobileMenuClose);
    window.removeEvent('mobileback', this.mobileMenuClose);
  },

  loggedin: function (sessionKey)
  {

    if (document.getElement('li#logout'))
    {
      if (Affinity.oldess && Affinity.oldessLaunched)
      {
        document.getElement('li#logout span.text').set('html', 'Close');
      }
      else
      {
        document.getElement('li#logout span.text').set('html', 'Logout');
      }
    }

    Affinity.enableFavourites = false;
    if (!Affinity.mobile && Affinity.enableFavouritesGlobal)
    {
      if (Affinity.login.areas.Timesheet.hasOwnProperty('EnableFavourite'))
      {
        Affinity.enableFavourites = Affinity.login.areas.Timesheet.EnableFavourite;
      }
    }

    this.isManager = Affinity.login && Affinity.login.hasOwnProperty('areas') ? Affinity.login.areas.Timesheet.IsManager : false;
    this.employeNumer = Affinity.login && Affinity.login.hasOwnProperty('profile') ? Affinity.login.profile.employeeNumber : false;

    this.getFavs();

  },

  loggedout: function ()
  {
    window.onbeforeunload = function () { };
    this.reset();
    this.isManager = false;
    this.employeNumer = false;
    this.hasDates = false;
    this.favs = [];
    window.location.href = './';
  }

});

/***************************************************************************************************************************/

var FavouriteRow = new Class({

  Implements: [Events],

  Binds: [
    'edit', 'del', 'destroy'
  ],

  element: null,
  data: {},

  initialize: function (favdata, templateHTML, parentWidget)
  {

    this.baseLang = Affinity.languages.english.features;
    this.baseAppLang = Affinity.languages.english.application.timesheets.features;

    this.data = favdata;

    this.parent = parentWidget;

    this.element = new Element('tr', { 'class': 'fav-row', 'html': templateHTML });

    this.nameRow = this.element.getElement('td.fav-name');
    this.typeRow = this.element.getElement('td.fav-type');
    this.fieldsRow = this.element.getElement('td.fav-fields');
    if (this.parent.hasDates) this.dateRow = this.element.getElement('td.fav-date');
    this.buttonsRow = this.element.getElement('td.fav-buttons');

    this.editButton = this.buttonsRow.getElement('.fav-edit-button');
    this.delButton = this.buttonsRow.getElement('.fav-del-button');

    this.nameRow.innerHTML = this.returnNameString(this.data);
    this.typeRow.innerHTML = this.returnTypeString(this.data);
    this.fieldsRow.innerHTML = this.returnFieldsString(this.data);
    if (this.parent.hasDates) this.dateRow.innerHTML = this.returnDateString(this.data);

    this.editButton.addEvent('click', this.edit);
    this.delButton.addEvent('click', this.del);

  },

  returnNameString: function (data)
  {
    var name = Affinity.login.profile.commonName;
    if (data.hasOwnProperty('Name'))
    {
      if (data.hasOwnProperty('EmployeeName'))
      {
        name = data.EmployeeName + ' - ' + data.Name.replace('_', ' ');
      }
      else
      {
        name = data.Name.replace('_', ' ');
      }
    }
    return name;
  },

  returnTypeString: function (data)
  {
    var type = parseInt(data.Type);
    switch (type)
    {
      case 1:
        return 'Timesheet ';
      case 2:
        return 'Allowance ';
      case 3:
        return 'Leave';
      case 4:
        return 'Mileage';
      default:
        return '';
    }
  },

  returnFieldsString: function (data)
  {
    var fieldsStr = '', fields = [];
    if (data.hasOwnProperty('Fields'))
    {
      fieldsStr = 'Template contains \'';
      if (typeOf(this.data.Fields) !== 'object')
      {
        fieldsStr += 'no data';
      }
      else
      {
        Object.each(this.data.Fields, function (value, key)
        {
          if ((value + '').trim() !== '')
          {
            fields.push(key + ': ' + value);
          }
        });
      }
      fieldsStr = fields.join(', ');
    }
    return fieldsStr;
  },

  returnDateString: function (data)
  {
    var date = new Date();
    if (data.hasOwnProperty('Created')) date = Date.parse(data.Created);
    return date.toWords() + ' (' + date.toSimple() + ' ' + date.toTime12() + ')';
  },

  edit: function (error, attempt)
  {
    if (Affinity.enableFavourites)
    {
      var api = Affinity.zelosroot + '?api=Favourite/RenameFavourite&timesheetType=' + this.data.Type + '&employeeNo=' + this.data.EmployeeNo + '&OldName=' + this.data.Name + '&NewName=',
          message = this.baseAppLang.favourites.renameMessage;

      if (error && typeof error === 'string')
      {
        error = error.trim() !== '' ? error.trim() : Affinity.languages.english.generic.error,
        error = Affinity.CheckFavError(result, errormsg);
        message = error + '<br />Please try again.';
      }

      uiprompt({
        message: message,
        showButtons: true,
        noClose: false,
        value: typeOf(attempt) === 'string' ? attempt : this.data.Name,
        onOk: function (newName)
        {

          var validObj = this.baseLang.favourites.validation.validateName(newName);
          if (!validObj.isValid)
          {
            this.edit.delay(50, this, [validObj.error, newName]);
            return;
          }

          uialert({ 'message': this.baseAppLang.favourites.renamingMessage + '<img src="' + Affinity.loaders.dark + '" />', noClose: true });

          api += newName.trim();

          var favsLoader = new Request.JSON({
            url: api,
            onComplete: function (result)
            {
              if (result.hasOwnProperty('success'))
              {
                if (result.success === false)
                {
                  if (result.hasOwnProperty('error') && typeOf(result.error) === 'string')
                  {
                    var errormsg = result.error.trim() !== '' ? result.error.trim() : Affinity.languages.english.generic.error,
                      errormsg = Affinity.CheckFavError(result, errormsg);
                    uialert({
                      message: 'Oops! ' + errormsg + '<br />Please try again.',
                      showButtons: true,
                      onClose: this.parent.getFavs
                    });
                    return;
                  }
                }
              }
              Affinity.uiPompts.hide();
              this.parent.getFavs();

            }.bind(this),
            onFailure: function (xhr)
            {

              uialert({
                message: Affinity.languages.english.generic.error + '<br />Please try again.',
                showButtons: true,
                onClose: this.parent.getFavs
              });

            }.bind(this),
            onError: function (err)
            {

              var errormsg = Affinity.CheckFavError(err, Affinity.languages.english.generic.error + '<br />Please try again.');
              uialert({
                message: errormsg,
                showButtons: true,
                onClose: this.parent.getFavs
              });

            }.bind(this)
          }).post();

        }.bind(this)
      });
    }
  },

  del: function ()
  {
    if (Affinity.enableFavourites)
    {
      var api = Affinity.zelosroot + '?api=Favourite/RemoveFavourite?employeeNo=' + this.data.EmployeeNo + '&timesheetType=' + this.data.Type + '&Name=' + this.data.Name,
          message = this.baseAppLang.favourites.deleteMessage;
      Affinity
      uiconfirm({
        message: message,
        showButtons: true,
        noClose: false,
        onOk: function ()
        {

          uialert({ 'message': this.baseAppLang.favourites.deletingMessage + ' <img src="' + Affinity.loaders.dark + '" />', noClose: true });

          var favsLoader = new Request.JSON({
            url: api,
            onComplete: function (result)
            {
              if (result.hasOwnProperty('OK'))
              {
                if (result.OK === false)
                {
                  var errormsg = Affinity.languages.english.generic.error;
                  if (result.hasOwnProperty('error') && typeOf(result.error) === 'string')
                  {
                    errormsg = result.error.trim() !== '' ? result.error.trim() : errormsg;
                  }
                  errormsg = Affinity.CheckFavError(result, errormsg);
                  uialert({
                    message: 'Oops! ' + errormsg + '<br />Please try again.',
                    showButtons: true,
                    onClose: this.parent.getFavs
                  });
                  return;
                }
              }
              Affinity.uiPompts.hide();
              this.parent.getFavs();
            }.bind(this),
            onFailure: function ()
            {

              uialert({
                message: Affinity.languages.english.generic.error + '<br />Please try again.',
                showButtons: true,
                onClose: this.parent.getFavs
              });

            }.bind(this),
            onError: function (err)
            {

              var errormsg = Affinity.CheckFavError(err, Affinity.languages.english.generic.error + '<br />Please try again.');
              uialert({
                message: errormsg,
                showButtons: true,
                onClose: this.parent.getFavs
              });

            }
          }).post();

        }.bind(this)
      });
    }
  },

  destroy: function ()
  {

  }

});