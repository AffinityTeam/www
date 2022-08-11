var Leave = new Class({

    Implements: [Options, Events],

    Binds: [
        'init',
        'stopEvents',
        'setDates',
        'selectTabsArray','removeTabs', 'removeTab', 'returnTab',
        'resetPanels', 'resetTabs',
        'switchToEmployeeView', 'doSwitchToEmployeeView',
        'switchToManagerView', 'doSwitchToManagerView',
        /**/
        //These should be pulled out into an utility class
        'cleanBadDate', 'cleanUnit', 'toFixed', 'cleanResponse', 'handleXHRErrors', 'isErrorInJson',
        'lockui', 'unlockui', 'forceunlockui',
        /**/
        'initLeave',
        'generatePageButtons',
        'checkManagerStatus',
        /**/
        'populateAttachments', //This needs to be merged with detail version and stored in a single place
        'deleteAttachment', //This needs to be merged with detail version and stored in a single place
        //'postAttachments',
        /**/
        'logout',
        'loggedin', 'loggedout',
        'doPositionUpdateOrValidation',
        /**/
        //'populateForwardHistory', //moved to detail
        //'leaveDetailData',
        //'populateDetailData',
    ],

    options: {
        apiroot: '',
        employeeTarget: null,
        managerTarget: null,
        configTarget: null
    },

    employee: false, // reserved for employee view
    manager: false, // reserved for manager view

    initialize: function (options) {

        this.setOptions(options);

        this.apiroot = this.options.apiroot;

    },

    init: function(){
        this.apiOverlay = new Element('div', { 'class': 'leave-api-overlay hidden', 'tabindex': 0 }).inject(document.body, 'bottom');

        this.isManager = false;

        this.tabBox = document.getElement('.section-nav ul');

        this.configTabs = ['backTab','logoutTab'];
        this.employeeTabs = ['logoutTab'];
        this.managerTabs = ['myTab', 'teamTab', 'logoutTab'];
        this.adminTabs = ['teamTab', 'configTab', 'logoutTab'];

        this.isConfig = this.options.configTarget === null ? false : true;

        /* Requests */

        this.managerStatusRequest = new Request.JSON({
            onRequest: function () {
                Affinity.leave.lockui('leave-checkManagerStatus');
            },
            onFailure: function (e) {
                Affinity.leave.unlockui('leave-checkManagerStatus');
                Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
            },
            onException: function () {
                Affinity.leave.unlockui('leave-checkManagerStatus');
            },
            onCancel: function () {
                Affinity.leave.unlockui('leave-checkManagerStatus');
            },
            onSuccess: function (response) {
                Affinity.leave.unlockui('leave-checkManagerStatus');
                if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName)) {
                    this.initLeave(response);
                }
            }.bind(this)
        });

        this.deleteAttachmentRequest = new Request.JSON({
            onRequest: function () {
                Affinity.leave.lockui('leave-deleteAttachmentRequest');
            },
            onFailure: function (e) {
                Affinity.leave.unlockui('leave-deleteAttachmentRequest');
                Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
                if ('_methodResponse' in this && typeOf(this._methodResponse) === 'function') {
                    this._methodResponse(false);
                    this._methodResponse = null;
                    delete this._methodResponse;
                }
            }.bind(this),
            onException: function () {
                Affinity.leave.unlockui('leave-deleteAttachmentRequest');
                if ('_methodResponse' in this && typeOf(this._methodResponse) === 'function') {
                    this._methodResponse(false);
                    this._methodResponse = null;
                    delete this._methodResponse;
                }
            }.bind(this),
            onCancel: function () {
                Affinity.leave.unlockui('leave-deleteAttachmentRequest');
                if ('_methodResponse' in this && typeOf(this._methodResponse) === 'function') {
                    this._methodResponse(false);
                    this._methodResponse = null;
                    delete this._methodResponse;
                }
            }.bind(this),
            onSuccess: function (response) {
                Affinity.leave.unlockui('leave-deleteAttachmentRequest');
                if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName)) {
                    if ('_methodResponse' in this && typeOf(this._methodResponse) === 'function') {
                        if (this.isManager) {
                            this._methodResponse(response);
                        }
                        else {
                            this._methodResponse(false);
                        }
                        this._methodResponse = null;
                        delete this._methodResponse;
                    }
                }
            }.bind(this)
        });

        this.hiddenAttachment = document.getElement('#invisible');
    },

    initLeave: function (response) {
        this.isManager = false;

        if (response && response.Data) {
            this.isManager = true;
            this.switchToManagerView();
        } else
        {
            this.switchToEmployeeView();
        }

        this.resetTabs();
    },

    /* INTERFACE */

    selectTabsArray: function () {
        this.tabs = this.employeeTabs;
        if (this.isConfig) {
            this.tabs = this.configTabs;
        } else {
            if (this.isManager) {
                this.tabs = this.managerTabs;
            } else {
                this.tabs = this.employeeTabs;
            }
            if (this.isAdmin) {
                this.tabs = this.adminTabs;
            }
        }
    },

    removeTabs: function () {
        Array.each(this.tabBox.getElements('li'), function (tab) {
            tab.removeEvents();
            tab.destroy();
        });
        this.tabBox.empty();
        this.tabs = [];
    },

    removeTab: function (tab) {
        if (this[tab]) {
            switch (tab) {
                case 'myTab':
                    this[tab].removeEvents();
                    break;
                case 'teamTab':
                    this[tab].removeEvents();
                    break;
                case 'configTab':
                    this[tab].removeEvents();
                    break;
                case 'backTab':
                    this[tab].removeEvents();
                    break;
                case 'logoutTab':
                    this[tab].removeEvents();
                    break;
            }
            this[tab].destroy();
        }
    },

    returnTab: function (tab) {
        this.removeTab(tab);
        var element = new Element('li');
        element.addEvent(Affinity.events.start, this.stopEvents);
        switch (tab) {
            case 'myTab':
                element.addClass('mine u-blue');
                element.set('html', '<span>' + Affinity.icons.User + '</span><span>My Leave</span>');
                element.addEvent(Affinity.events.start, this.switchToEmployeeView);
                break;
            case 'teamTab':
                element.addClass('manager u-blue');
                element.set('html', '<span>' + Affinity.icons.Users + '</span><span>Team Leave</span>');
                element.addEvent(Affinity.events.start, this.switchToManagerView);
                break;
            case 'configTab':
                element.addClass('settings link u-yellow');
                if (Affinity.mobile) {
                    element.set('html', '<a href="./Config"><span>' + Affinity.icons.Cog + '</span>Config</a>');
                } else {
                    element.addClass('ui-has-tooltip');
                    element.set('data-tooltip', 'Leave Configuration');
                    element.set('data-tooltip-dir', 'bottom,left');
                    element.set('html', '<a href="./Config"><span>' + Affinity.icons.Cog + '</span></a>');
                }
                break;
            case 'backTab':
                element.addClass('back link u-yellow back');
                element.set('html', '<a href="./"><span>' + Affinity.icons.Return + '</span><span>Back to Leave</span></a>');
                break;
            case 'logoutTab':
                element.addClass('logout orange u-orange');
                element.set('id', 'logout');
                if (this.lanched) {
                    element.set('html', '<span>' + Affinity.icons.Logout + '</span><span>Close</span>');
                } else {
                    element.set('html', '<span>' + Affinity.icons.Logout + '</span><span>Logout</span>');
                }
                element.addEvent(Affinity.events.start, this.logoutViaTab);
                break;
        }
        this[tab] = element;
        delete element;
        return this[tab];
    },

    stopEvents: function (e) {
        e.preventDefault();
        e.stopPropagation();
    },

    resetPanels: function () {
        if (this.employee) {
            this.employee.reset();
        }
        if (this.manager) {
            this.manager.reset();
        }
        if (this.config) {
            this.config.reset();
        }
    },

    resetTabs: function () {
        this.removeTabs();
        this.selectTabsArray();
        var tab;
        Array.each(this.tabs, function (tabname) {
            tab = this.returnTab(tabname);
            tab.inject(this.tabBox);
        }.bind(this));
        this.tabBox.getElements('li').removeClass('selected');
        if (!this.isAdmin && !this.isManager) {
            if (this.myTab) { this.myTab.addClass('selected'); }
        }
        else
        {
            if (this.teamTab) { this.teamTab.addClass('selected'); }
        }
    },

    /**/

    switchToEmployeeView: function (e) {
        this.doSwitchToEmployeeView(e);
    },
    doSwitchToEmployeeView: function (e) {
        if (typeOf(e) !== 'null') { e.stopPropagation(); }
        /**/
        if (this.currentView !== 'employee') {
            this.currentView = 'employee';
            /**/
            if (!this.employee) {
                this.employee = new EmployeeLeave({
                    target: this.options.employeeTarget
                });
            }
            /**/
            this.resetPanels();
            this.employee.init();
            /**/
            this.tabBox.getElements('li').removeClass('selected');
            if (this.myTab) { this.myTab.addClass('selected'); }
        }
    },
    
    switchToManagerView: function (e) {
        this.doSwitchToManagerView(e);
    },

    doSwitchToManagerView: function (e) {
        if (typeOf(e) !== 'null') { e.stopPropagation(); }
        /**/
        if (this.currentView !== 'manager') {
            this.currentView = 'manager';
            /**/
            if (!this.manager) {
                this.manager = new TeamLeave({
                    target: this.options.managerTarget
                });
            }
            /**/
            this.resetPanels();
            this.manager.init();
            /**/
            this.tabBox.getElements('li').removeClass('selected');
            if (this.teamTab) { this.teamTab.addClass('selected'); }
        }
    },

    switchToConfigView: function (e) {
        if (!this.isConfig) {
            this.initLeave();
            return;
        }
        this.doSwitchToConfigView(e);
    },
    doSwitchToConfigView: function (e) {
        if(!this.isConfig){
            this.initLeave();
            return;
        }
        if (typeOf(e) !== 'null') { e.stopPropagation(); }
        /**/
        if (this.currentView !== 'config') {
            this.currentView = 'config';
            /**/
            if (!this.config) {
                this.config = new UILeaveConfig({
                    target: this.options.configTarget
                });
            }
            /**/
            this.resetPanels();
            this.config.init();
            /**/
        }
    },

    /**/

    checkManagerStatus: function () {
        // Called on login
        var employeeNum = Affinity.login.profile.employeeNumber;
        this._methodName = 'ui.leave.js -> checkManagerStatus';
        this._api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'CanManageLeave/' + employeeNum);
        if (this.managerStatusRequest && this.managerStatusRequest.isRunning()) {
            this.managerStatusRequest.cancel();
        }
        this.managerStatusRequest.url = this.managerStatusRequest.options.url = this._api;
        this.managerStatusRequest.get();
    },

    /* LEAVE HELPERS */

    /* clean bad date */
    cleanBadDate: function (mixed) {
        if (typeOf(mixed) === 'date' && 'isValid' in mixed && mixed.isValid()) {
            return mixed;
        }
        if (typeOf(mixed) === 'string') {
            if (isNaN(mixed.replace(/\W/g, ''))) {
                mixed = mixed.toLowerCase();
                var month;
                var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
                for (var i = 0; i < months.length; i++) {
                    month = months[i];
                    if (mixed.contains(month)) {
                        mixed = mixed.replace(month, i + 1);
                        break;
                    }
                }
            }
        }
        var date = Date.parse(mixed);
        return date;
    },

    /* clean units */
    cleanUnit: function (unit, initial) {
        var val = unit === '' ? '0' : unit + '';
        val = val.trim().replace(/[^0-9.]/g, '');
        if (isNaN(parseFloat(val)) && typeOf(initial)!=='null') {
            val = initial;
        }
        return Affinity.leave.toFixed(val === '' ? 0 : val);
    },

    /* to fixed */
    toFixed: function (val, decimals) {
        if(typeOf(parseFloat(val))==='number'){
            return parseFloat(val).toFixed(decimals || 2);
        }
        try{
            console.error('Error: Trying to pass "' + val + '" as float with ' + decimals + ' decimals');

        } catch (e) { }
        if (val === null || typeOf(val) === 'null') {
            return '';
        }
        return val;
    },

    /* Clean acknowledgment response */
    cleanResponse: function (response) {
        if (typeOf(response) === 'string') {
            var res = response + '';
            res = res.replace('\r', '<br />');
            res = res.replace('\n', '<br />');
            res = res.replace('. Total', '.<br /><br />Total');
            res = res.replace('. Reason', '.<br /><br />Reason');
            res = res.replace('. Your', '.<br /><br />Your');
            res = res.replace('. Sent', '.<br /><br />Sent');
            res = res.replace('successfully saved', '<strong>successfully saved</strong>');
            res = res.replace('successfully submitted', '<strong>successfully submitted</strong>');
            res = res.replace('successfully approved', '<strong>successfully approved</strong>');
            res = res.replace('successfully declined', '<strong>successfully declined</strong>');
            res = res.replace('successfully deleted', '<strong>successfully deleted</strong>');
            res = res.replace('..', '.');
            if(res.contains(' from ') && res.contains(' to ')){
                res = res.replace(' from ', ' from <strong>');
                res = res.replace(' to ', ' to <strong>');
                res = res.replace(/ a.m./g, ' am</strong>');
                res = res.replace(/ p.m./g, ' pm</strong>');
            }
            res = res.replace('for approval.', 'for approval. <br /><br />');
            return res;
        }
        return response;
    },

    /* handle XHR errors */
    handleXHRErrors: function (xhr, url, methodName, suppress) {
        if ('response' in xhr) {
            if (this.isErrorInJson(xhr.response, url, methodName, suppress))
                return true;
        } else {
            if (typeOf(suppress) === 'null' || (typeOf(suppress) === 'boolean' && !suppress)) {
                uialert({
                    'message': 'Oops! Something went wrong.',
                    showButtons: true,
                    noClose: false
                });
            }
            try {
                console.log('// XHR ERROR ///////////////////////////////////////');
                console.log('Method info  :' + method);
                console.log('URL called   :' + url);
                console.log('XHR Object   :');
                console.log(xhr);
                console.log('////////////////////////////////////////////////////');
                console.log('');
            } catch (e) { }
        }
        if(xhr.status === 401){
            this.logout();
            return true;
        }

        return false;
    },

    /* generic JSON response handler */
    isErrorInJson: function (jsonData, url, method, suppress) {
        var hasError = false;
        var hasWarning = false;
        if (typeOf(jsonData) === 'string') {
            parsed = false;
            try{
                parsed = JSON.parse(jsonData);
            } catch (e) { }
            if (typeOf(parsed) === 'object') {
                jsonData = parsed;
            }
        }
        if (typeOf(jsonData) === 'object') {
            var messages = [];
            var exceptions = [];
            if (
                'Messages' in jsonData &&
                typeOf(jsonData.Messages) === 'array' &&
                jsonData.Messages.length > 0
            ) {
                /** we have an explainable error **/
                Array.each(jsonData.Messages, function (message, index) {
                    messages.push(message.Message);
                    if (message.MessageType === 1) { /** is just a warning **/
                        hasWarning = true;
                    } else if (message.MessageType === 0) {
                        hasError = true;
                    }
                });
            }
            if (
                'Exception' in jsonData &&
                typeOf(jsonData.Exception) === 'object' &&
                'Message' in jsonData.Exception &&
                jsonData.Exception.Message !== ''
            ) {
                /** we have a system error **/
                exceptions.push('<span class="color-red">' + jsonData.Exception.Message + '</span>');
                hasError = true;
            }
            if (hasError || hasWarning) {
                var messageStr = '';
                if (hasError) {
                    messageStr += 'Oops! Something went wrong.<br />';
                } else {
                    if (hasWarning) {
                        messageStr += 'Warning!<br />';
                    }
                }
                messageStr += messages.join('<br />');
                if (exceptions.length > 0) {
                    messageStr += '<br />';
                    messageStr += exceptions.join('<br />');
                }

                try {
                    if (!hasError) {
                        console.log('// JSON WARNING ////////////////////////////////////');
                    } else if (hasError && hasWarning) {
                        console.log('// JSON ERROR & WARNING ////////////////////////////');
                    } else {
                        console.log('// JSON ERROR //////////////////////////////////////');
                    }
                    console.log('Method info  :' + method);
                    console.log('URL called   :' + url);
                    console.log('Messages     :');
                    console.log(messageStr.replace('<br />', '\r\n').stripTags());
                    console.log('Returned Obj :');
                    console.log(jsonData);
                    //console.log('////////////////////////////////////////////////////');
                    console.log('');
                } catch (e) { }
                    if (typeOf(suppress) === 'null' || (typeOf(suppress) === 'boolean' && !suppress)) {
                        uialert({
                            'message': messageStr,
                            showButtons: true,
                            noClose: false
                        });
                }

                if (!hasError) {
                    return false;
                }
                return messageStr;
            } 
        }
        return false;
    },

    /* UI LOCK */

    apiLockTimer: null,
    apiPendingMap: [],
    apiOverlayFocus: null,

    lockui: function (ApiId) {
            if (!this.apiPendingMap.contains(ApiId)) {
                this.apiPendingMap.push(ApiId);
            }
            this.apiOverlay.removeClass('hidden');
            this.apiOverlay.addEvent('keyup', function (e) { e.stop(); });
            this.apiOverlay.addEvent('keydown', function (e) { e.stop(); });
            this.apiOverlay.addEvent('mousedown', function (e) { e.stop(); });
            this.apiOverlay.addEvent('click', function (e) { e.stop(); });
            if (this.apiOverlayFocus === null) {
                this.apiOverlayFocus = document.activeElement;
            }
            this.apiOverlay.focus();
            clearTimeout(this.apiLockTimer);
            this.apiLockTimer = this.forceunlockui.delay(10000);
    },

    unlockui: function (ApiId) {
        if (this.apiPendingMap.contains(ApiId)) {
            var index = this.apiPendingMap.indexOf(ApiId);
            if (index > -1) {
                this.apiPendingMap.splice(index, 1);
            }
        }
        if (this.apiPendingMap.length === 0) {
            clearTimeout(this.apiLockTimer);
            this.apiOverlay.addClass('hidden');
            this.apiOverlay.removeEvents();
            if (this.apiOverlayFocus!==null && document.body.contains(this.apiOverlayFocus)) {
                this.apiOverlayFocus.focus();
                this.apiOverlayFocus = null;
            }
        }
    },

    forceunlockui: function () {
        clearTimeout(this.apiLockTimer);
        this.apiPendingMap = [];
        this.apiOverlay.addClass('hidden');
        this.apiOverlay.removeEvents();
        if (this.apiOverlayFocus !== null && document.body.contains(this.apiOverlayFocus)) {
            this.apiOverlayFocus.focus();
            this.apiOverlayFocus = null;
        }
    },

    /**/

    logout: function(){
        window.fireEvent('logout');
    },
    logoutViaTab: function(){
        window.fireEvent('logoutViaTab');
    },
    loggedin: function () {
        this.isAdmin = parseInt(Affinity.login.profile.employeeNumber) > 1000000 ? true : false;

        //this.checkManagerStatus();
        this.resetPanels();
        if (this.isConfig) {
            this.switchToConfigView();
        } else if (this.isAdmin) {
            this.isManager = true;
            this.switchToManagerView();
            this.resetTabs();
        }
        else {
            //this.switchToEmployeeView();
            this.checkManagerStatus();
        }

        if (!this.config) {
            hj('tagRecording', ['emp: ' + Affinity.login.profile.employeeNumber, 'co: ' + Affinity.login.profile.companyNumber]);
        }

    },

    loggedout: function () {
        if (this.managerStatusRequest && this.managerStatusRequest.isRunning()) {
            this.managerStatusRequest.cancel();
        }
        this.currentView = '';
        this.resetPanels();
        if (this.manager) {
            this.manager.destroy();
            this.manager = false;
        }
        if (this.employee) {
            this.employee.destroy();
            this.employee = false;
        }
        if (this.config) {
            this.config.destroy();
            this.config = false;
        }
        this.forceunlockui();
    },
    doPositionUpdateOrValidation: function (tsGroupId, methodToExecuteIfPassed, param) {
        this._methodName = 'ui.leave.js -> doPositionUpdateOrValidation ()';
        this._api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'DoPositionUpdateOrValidation/' + tsGroupId);
        new Request.JSON({
            url: this._api,
            onRequest: function () {
                Affinity.leave.lockui('leave-doPositionUpdateOrValidation');
                if (!this._noAlerts) {
                    uialert({
                        message: ' ',
                        showLoader: true,
                        showButtons: false,
                        noClose: true
                    });
                }
            }.bind(this),
            onSuccess: function (response) {
                Affinity.leave.unlockui('leave-doPositionUpdateOrValidation');
                prompts.hide();
                if (response.IsValid != undefined && response.IsValid) {
                    if (methodToExecuteIfPassed && typeof (methodToExecuteIfPassed) === 'function') {
                        methodToExecuteIfPassed(param);
                    }
                } else if (response.IsValid != undefined && !response.IsValid) {
                        uialert({
                            'message': response.Message,
                            showButtons: true,
                            noClose: false
                        });
                    
                }
               

            }.bind(this)
        }).post();
    },

    /**/
    populateLeaveActivity: function ( parentEl, employeeNo, leaveId )
    {
        if (!parentEl)
            return;

        var activityBox = new Element('div', { 'class': 'leave-activity' });

        parentEl.adopt(activityBox);

        var toggleButton = new Element('div', {
            'class': 'toggle-button',
            'html': Affinity.icons.ArrowLineSmallDown,
        });
        var toggleLabel = new Element('label', {
            'class': 'activity-label details-label',
            'html': 'Show Activity'
        });
        var toggleBar = new Element('div', {
            'class': 'activity-heading form-row ui-has-tooltip',
            'data-tooltip': 'Toggle Show Activity',
            'data-tooltip-dir': 'top'
        }).adopt(toggleLabel, toggleButton).inject(activityBox);

        this.activityEl = new Element('div', {
            'class': 'activity-content',
            'html': 'loading ...'
        }).inject(activityBox);
        this.activityEl.dissolve();
        toggleButton.store('state', 'closed');

        var toggleEvent = function (e) {
            if (toggleButton.retrieve('state') === 'closed') {

                this.activityEl.reveal();

                toggleButton.store('state', 'open');
                toggleButton.set('html', Affinity.icons.ArrowLineSmallUp);
                toggleLabel.set('html', 'Activity');
                this.getLeaveActivity(employeeNo, leaveId);
            } else {

                this.activityEl.dissolve();

                toggleButton.store('state', 'closed');
                toggleButton.set('html', Affinity.icons.ArrowLineSmallDown);
                toggleLabel.set('html', 'Show Activity');
                this.activityEl.set('html', '');
            }
            e.stopPropagation();
        }.bind(this);

        toggleBar.addEvent(Affinity.events.click, toggleEvent);
        toggleButton.addEvent(Affinity.events.click, toggleEvent);
    },

    getLeaveActivity: function (employeeNo, leaveId)
    {
        var methodName = 'ui.myLeave.js -> GetLeaveActivity';
        var api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'LeaveActivity/' + employeeNo + '/' + leaveId);

        new Request.JSON({
            url: api,
            //onRequest: function () {
            //    Affinity.leave.lockui('myleave-leaveEditDetailData');
            //},
            onFailure: function (e) {
                Affinity.leave.handleXHRErrors(e, api, methodName);
            },
            onSuccess: function (response) {
                if (!Affinity.leave.isErrorInJson(response, api, methodName)) {
                    var container = new Element('div', { 'class': 'activity-events' });
                    this.activityEl.set('html', '');
                    this.activityEl.adopt(container);
                    if (response.Data.length == 0) {
                        container.set('html', 'No activity recorded.');
                    }                    
                     
                    Array.each(response.Data, function (event, index) {
                        //console.log(event);
                        var eventEl = new Element('div', { 'class': 'activity-event' });
                        var eventHeader = new Element('div', { 'class': 'activity-event-header' });
                        var eventDescription  = new Element('div', { 'class': 'activity-event-description' });
                        var eventDetail = new Element('div', { 'class': 'activity-event-detail' });
                        //var eventSpace = new Element('div', { 'class': 'activity-event-rowspace' }).inject(container, 'top');

                        if (Affinity.login.profile.employeeNumber == event.EmployeeNo) {
                            eventEl.setStyle('border-color', '#7abd2d');
                            eventEl.setStyle('margin-left', '40px');

                            //eventDescription.setStyle('margin-right', '150px');
                            var eventRow = (new Element('div')).adopt(eventDescription, eventHeader);
                            eventHeader.setStyle('text-align', 'right');
                        }
                        else {
                            eventEl.setStyle('border-color', '#44b5ec');
                            eventEl.setStyle('margin-right', '40px');
                            var eventRow = (new Element('div')).adopt(eventHeader, eventDescription);
                            //eventHeader.setStyle('float', 'left');
                        }                  


                        eventHeader.adopt(
                            new Element('div', { 'class': 'activity-event-employee', 'html': '<b>' + event.EmployeeName + '</b> (' + event.EmployeeNo + ')' }),
                            new Element('div', { 'class': 'activity-event-time', 'html': Date.parse(event.EventDateTime).format('%d %b %Y %X') })
                            );

                        //build event text
                        var eventText = event.EventText;
                        if (event.Audits.length > 1) {
                            eventText += ' (' + event.Audits.length + ' changes)';

                            var toggleButton = new Element('div', {
                                'class': 'toggle-button',
                                'html': Affinity.icons.ArrowLineSmallDown
                            }).inject(eventDescription);

                            //eventDescription.setStyle('min-height', '30px');
                            eventDescription.addClass('ui-has-tooltip');
                            eventDescription.setProperty('data-tooltip', 'Toggle Show Activity Detail');
                            eventDescription.setProperty('data-tooltip-dir', 'left');

                            eventDetail.dissolve();
                            toggleButton.store('state', 'closed');

                            var toggleEvent = function (e) {
                                if (toggleButton.retrieve('state') === 'closed') {
                                    eventDetail.reveal();
                                    toggleButton.store('state', 'open');
                                    toggleButton.set('html', Affinity.icons.ArrowLineSmallUp);
                                } else {
                                    eventDetail.dissolve();
                                    toggleButton.store('state', 'closed');
                                    toggleButton.set('html', Affinity.icons.ArrowLineSmallDown);
                                }
                                e.stopPropagation();
                            }.bind(this);

                            eventDescription.addEvent(Affinity.events.click, toggleEvent);
                            toggleButton.addEvent(Affinity.events.click, toggleEvent);
                        }
                        //else if (event.Audits.length == 1) {
                        //    eventDescription.setStyle('min-height', '30px');
                        //}
                        eventText = '<b>' + eventText + '</b>';

                        eventDescription.adopt(
                            new Element('div', { 'class': 'activity-event-text', 'html': eventText })
                            );

                        Array.each(event.Audits, function (audit, index) {
                            var auditEl = new Element('div', { 'class': 'activity-event-audit' }).inject(eventDetail);
                            var tag = new Element('div', { 'class': 'event-audit-tag' }).inject(auditEl)
                            var auditDescription = new Element('span', { 'class': 'tag w-icon', 'html': '<span class="event-audit-description">' + audit.Description + '</span>' }).inject(tag);

                            if (audit.UpdateType == "Insert") {
                                auditDescription.addClass('green');
                                new Element('pre', { 'html': audit.NewValue, 'class': 'event-audit-value'}).inject(auditEl);
                                new Element('span', { 'html': Affinity.icons.Plus }).inject(auditDescription, 'top');
                            } else if (audit.UpdateType == "Edit") {
                                auditDescription.addClass('blue');
                                new Element('span', { 'html': Affinity.icons.Pencil }).inject(auditDescription, 'top');
                                new Element('pre', { 'html': audit.OldValue, 'class': 'event-audit-old' }).inject(auditEl);
                                new Element('span', { 'class': 'icon-arrow-right color blue event-audit-arrow' }).inject(auditEl);
                                new Element('pre', { 'html': audit.NewValue, 'class': 'event-audit-new' }).inject(auditEl);
                            } else if (audit.UpdateType == "Delete") {
                                auditDescription.addClass('red');
                                new Element('span', { 'html': Affinity.icons.Trash }).inject(auditDescription, 'top');
                                new Element('pre', { 'html': audit.OldValue, 'class': 'event-audit-value'}).inject(auditEl);
                            }                           
                        }.bind(this));

                        //var maxHeight = Math.max(col1.getComputedSize({ styles: ['padding', 'border', 'margin'] }).height, col2.getComputedSize({ styles: ['padding', 'border', 'margin'] }).height, col3.getComputedSize({ styles: ['padding', 'border', 'margin'] }).height)
                        //col1.setStyle("height", maxHeight);
                        //col2.setStyle("height", maxHeight);
                        //col3.setStyle("height", maxHeight);
                        eventEl.adopt(eventRow, eventDetail).inject(container, 'top');
                    }.bind(this));
                        
                    //var show = function () {

                    //}.bind(this);
                    //show.delay(500);                    
                }
            }.bind(this)
        }).get();
    },

    populateAttachments: function (leave, attachments, attachWidget, attachWidgetDiv) {
        //var components = this.editData.Components;
        if (attachments && attachments.length > 0) {
            Affinity.uploaders.reset(attachWidgetDiv);
            (function () {
                var url, name;
                var table = document.getElement('.edit-leave-attachment').getElement('.uidone').getElement('table.ui-grid');
                Array.each(attachments, function (attachment, index) {
                    url = Affinity.leave.apiroot + 'GetLeaveAttachment/' + leave.EmployeeNo + '/' + leave.TSGroupId + '/' + attachment.Id;
                    name = attachment.Name.contains('fakepath') ? attachment.Name.substring(attachment.Name.indexOf('fakepath') + 9) : attachment.Name;
                    name = attachment.Name.contains('/') ? attachment.Name.substring(attachment.Name.lastIndexOf('/') + 1) : attachment.Name;
                    name = attachment.Name.contains('\\') ? attachment.Name.substring(attachment.Name.lastIndexOf('\\') + 1) : attachment.Name;
                    attachWidget.addFileRow(table, name, attachment.Id, 'docs_file' + index, url);
                }.bind(this));
            }).delay(500, this);
        }
        prompts.hide();
    },

    deleteAttachment: function (employeeNo, leaveId, attachmentId, responseMethod) {
        if (typeOf(responseMethod) === 'function') {
            this._methodResponse = responseMethod;
        }
        this._methodName = 'ui.leave.apply.js -> deleteAttachment';
        this._api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'DeleteLeaveAttachment/' + employeeNo + '/' + leaveId + '/' + attachmentId);
        if (this.deleteAttachmentRequest && this.deleteAttachmentRequest.isRunning()) {
            this.deleteAttachmentRequest.cancel();
        }
        this.deleteAttachmentRequest.url = this.deleteAttachmentRequest.options.url = this._api;
        this.deleteAttachmentRequest.get();
    },

    postAttachements: function (empNo, leaveId, responseMethod) {
        var api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'CreateLeaveAttachment/' + empNo + '/' + leaveId);
        var iframeDocument = this.hiddenAttachment.contentDocument || this.hiddenAttachment.contentWindow.document;
        var formPost = new Element('form', {
            'class': 'attachment-form-submit',
            'enctype': 'multipart/form-data',
            'method': 'post',
            'action': api,
            'target': '_self'
        });
        var attachments = document.getElements('.uploadmulti label input');
        if (attachments.length > 0) {
            var newInp;
            Array.each(attachments, function (attachment, index) {
                if (!attachment.hasClass('initialValues')) {
                    if (attachment.files.length > 0 && attachment.value !== '') {
                        attachment.inject(formPost);
                        attachment.set('id', 'new_file_post_' + index);
                        attachment.set('name', 'fileUpload');
                        attachment.removeEvents();
                    }
                }
            });
            formPost.inject(iframeDocument.body);
            if (typeOf(responseMethod) === 'function') {
                (function () {
                    this.hiddenAttachment.addEvent('load', function () {
                        var iframeDocument = this.hiddenAttachment.contentDocument || this.hiddenAttachment.contentWindow.document;
                        var result;
                        try {
                            result = JSON.parse(iframeDocument.body.innerHTML);
                        } catch (e) { result = iframeDocument.body.innerHTML; }
                        responseMethod(result);
                        this.hiddenAttachment.removeEvents();
                    }.bind(this));
                    formPost.submit();
                }).delay(1000, this);
            } else {
                formPost.submit();
            }
        }
    },

    setDates: function (element, date) {
        if (
            element &&
            typeOf(element) === 'element' &&
            element.getElement('.day') &&
            element.getElement('.date') &&
            element.getElement('.month') &&
            element.getElement('.year')
        ) {
            var dayStr = '';
            var dateStr = '';
            var monthStr = '';
            var yearStr = '';
            if (typeOf(date) === 'date' && date.isValid()) {
                dayStr = date.format('%a');
                dateStr = date.format('%e');
                monthStr = date.format('%b');
                yearStr = date.format('%Y');
            }
            element.getElement('.day').set('html', dayStr);
            element.getElement('.date').set('html', dateStr);
            element.getElement('.month').set('html', monthStr);
            element.getElement('.year').set('html', yearStr);
        }
    }

});
var UILeaveHistory = new Class({

    Implements: [Options, Events],

    Binds: [
        'hide',
        'show',
        'toggle',
        'getHistory',
        'leaveHistoryFilters',
        'teamLeaveHistoryFilters',
        'refreshHistory',
        'applyFilters',
        'generateHistoryRow',
        'generateHistoryRows',
        'clearFilters',
        'clearHistoryRows',
        'historyPaginate',
        'clearPagination',
        'updateEmployeeFilter',
        //'acknowledgementModal',
        'reset', 'destroy',

        //employee functions
        //'submitSaved', 'resubmitLeave',
    ],

    options: {
        target: null,
        //configData: null,
        isManager: false
    },

    initialize: function (options) {
        this.setOptions(options);
        Affinity.mobile = false; // Force property to false to load JS for desktop

        this.filteredHistoryUri = false;

        this.historyCurrentPage = 1;
        this.historyPagingCount = 8;

        /* BUILD HTML */

        this.target = this.options.target;
        this.isManager = this.options.isManager ? true : false;

        this.section = new Element('div', { 'class': 'section' });
        this.sectionBody = new Element('div', { 'class': 'section-body' }).inject(this.section);
        this.form = new Element('div', { 'class': 'default-form' }).inject(this.sectionBody);

        this.leaveHistory = new Element('div', { 'class': 'leave-history' }).inject(this.form)
        //this.teamHistory = new Element('div', { 'class': 'team-leave-history' }).inject(this.form)

        var title;
        if (this.isManager) {
            title = 'Team Leave History';
        } else {
            title = 'View Leave History';
        }
        this.titlebar = new Element('div', { 'class': 'section-title leave-history-title ui-has-tooltip', 'html': title, 'data-tooltip': 'Open / Close', 'data-tooltip-dir': 'top' })
            .addEvent(Affinity.events.click, this.toggle)
            .inject(this.leaveHistory);
        //this.titlebar = new Element('div', { 'class': 'section-title team-leave-history-title ui-has-tooltip', 'html': 'Team Leave History', 'data-tooltip': 'Open / Close', 'data-tooltip-dir': 'top' }).addEvent(Affinity.events.click, this.toggle).inject(this.teamHistory);

        this.toggleButton = new Element('div', { 'class': 'toggle-button', 'html': Affinity.icons.ArrowLineSmallDown })
            .store('state', 'closed')
            .inject(this.titlebar);
        //this.toggleButton = new Element('div', { 'class': 'toggle-button', 'html': Affinity.icons.ArrowLineSmallDown }).store('state', 'closed').inject(this.titlebar);     

        this.leaveHistoryBox = new Element('div', { 'class': 'history-table', 'style': 'display: block;' }).inject(this.leaveHistory);

        //        this.historyTableBox = new Element('div', { 'class': 'team-leave-history-table', 'style': 'display: block;' })
        this.filterBox = new Element('div', { 'class': 'history-filter-box form-row' }).inject(this.leaveHistoryBox);

        if (this.isManager) {
            this.filterBox.addClass('history-filter-box-manager')
        }
        this.noHistoryMessage = new Element('div', { 'class': 'hidden', 'style': 'padding: 10px;', 'html': 'There are no leave applications to show.' });

        this.leaveHistoryTable = new Element('table', { 'class': 'leave hide-submitted-date' }).adopt(
           new Element('thead').adopt(
               this.tableHeaderRow = new Element('tr')
           ),
           this.historyTableBody = new Element('tbody', { 'class': 'history-table-body' })
        ),

        new Element('th', { 'class': 'active first', 'html': 'Status' }).inject(this.tableHeaderRow);
        if (this.isManager)
            new Element('th', { 'class': 'active', 'html': 'Employee' }).inject(this.tableHeaderRow);
        new Element('th', { 'class': 'active', 'html': 'Leave Type' }).inject(this.tableHeaderRow);
        new Element('th', { 'class': 'active', 'html': 'Start Date' }).inject(this.tableHeaderRow);
        new Element('th', { 'class': 'active', 'html': 'End Date' }).inject(this.tableHeaderRow);
        new Element('th', { 'class': 'active', 'html': 'Units' }).inject(this.tableHeaderRow);
        if (!this.isManager) {
            new Element('th', { 'class': 'active', 'html': 'Authoriser' }).inject(this.tableHeaderRow);
        }
        else {
            new Element('th', { 'class': 'active submitted-date', 'html': 'Submitted Date' }).inject(this.tableHeaderRow);
        }

        this.tableSection = new Element('div', { 'class': 'section-table' })
            .adopt(this.noHistoryMessage, this.leaveHistoryTable).inject(this.leaveHistoryBox);

        this.paginateBox = new Element('div', { 'class': 'paginate-box pagination' }).inject(this.leaveHistoryBox);
        this.groupStatusType = new Element('div', { 'class': 'filter-group-box' }).inject(this.filterBox);
        this.groupDates = new Element('div', { 'class': 'filter-group-box' }).inject(this.filterBox);
        this.groupEmployee = new Element('div', { 'class': 'filter-group-box' }).inject(this.filterBox);
        if (this.isManager)
            this.groupSubmittedDate = new Element('div', { 'class': 'filter-group-box' }).inject(this.filterBox);
        //this.groupOrder = new Element('div', { 'class': 'filter-group-box' }).inject(this.filterBox);
        this.groupOrderButtons = new Element('div', { 'class': 'filter-group-box' }).inject(this.filterBox);
        this.panelStatus = new Element('div', { 'class': 'filter-item' }).inject(this.groupStatusType);
        this.panelType = new Element('div', { 'class': 'filter-item' }).inject(this.groupStatusType);
        this.panelDateTo = new Element('div', { 'class': 'filter-item' }).inject(this.groupDates);
        this.panelDateFrom = new Element('div', { 'class': 'filter-item' }).inject(this.groupDates);
        this.panelEmployee = new Element('div', { 'class': 'filter-item' }).inject(this.groupEmployee);
       
        if (this.isManager) {
            this.panelIndirect = new Element('div', { 'class': 'filter-item' }).inject(this.groupEmployee);
            this.panelShares = new Element('div', { 'class': 'filter-item' }).inject(this.groupEmployee);
            this.panelSubmittedDate = new Element('div', { 'class': 'filter-item' }).inject(this.groupSubmittedDate);
        }
            
        this.panelOrder = new Element('div', { 'class': 'filter-item' }).inject(this.groupOrderButtons);
        this.panelButtons = new Element('div', { 'class': 'filter-item ' }).inject(this.groupOrderButtons);
        this.panelButtonWrapper = new Element('div', {class: 'filter-buttons-box'}).inject(this.panelButtons);

        new Element('span', { 'class': 'filter-label', 'html': 'Status' }).inject(this.panelStatus);
        this.leaveStatusFilter = new Element('select', { 'class': 'history-filter-select status-filter inline' }).adopt(
            new Element('option', { 'value': '0', 'html': 'All', 'id': null }),
            new Element('option', { 'value': '1', 'html': 'Approved', 'id': '3' }),
            new Element('option', { 'value': '2', 'html': 'Declined', 'id': '2' }),
            new Element('option', { 'value': '3', 'html': 'Pending', 'id': '0' }),
            new Element('option', { 'value': '4', 'html': 'Cancelled', 'id': '6' })
        ).inject(this.panelStatus);

        if (this.isManager) {
            new Element('span', { 'class': 'filter-label', 'html': 'Employee' }).inject(this.panelEmployee);
            this.employeeFilter = new Element('select', { 'class': 'history-filter-select data-hj-whitelist leave-employee-filter' }).inject(this.panelEmployee);
            new Element('span', { 'class': 'filter-label include-indirect-filter', 'html': 'Include Indirect' }).inject(this.panelIndirect);
            new Element('span', { 'class': 'filter-label leave-action-filter', 'html': 'Leave to Action' }).inject(this.panelShares);

            this.includeIndirectWrapper = new Element('div', {'class': 'input-wrapper'}).inject(this.panelIndirect);
            this.includeIndirect = new Element('input', { 'type': 'checkbox', 'class': 'include-indirect-filter', 'value': 'includeIndirect' }).inject(this.includeIndirectWrapper);
            this.includeIndirect.addEvent('change', function (e) {
                if (this.employeeFilter) {
                    this.updateEmployeeFilter(this.includeIndirect.checked, this.employeeFilter[this.employeeFilter.selectedIndex].get('id'));
                }   
            }.bind(this));

            this.excludeNonApproversWrapper = new Element('div', {'class': 'input-wrapper'}).inject(this.panelShares);
            this.excludeNonApprovers = new Element('input', { 'type': 'checkbox', 'class': 'leave-action-filter-checkbox', 'value': 'excludeNonApprovers' }).inject(this.excludeNonApproversWrapper);
            
            if (this.isManager) {
                new Element('span', { 'class': 'filter-label show-submitted-date', 'html': 'Show Submitted Date' }).inject(this.panelSubmittedDate);
                this.includeSubmittedDateWrapper = new Element('div', {'class': 'input-wrapper'}).inject(this.panelSubmittedDate);
                this.includeSubmittedDate = new Element('input', { 'type': 'checkbox', 'class': 'show-submitted-date', 'value': 'showSubmittedDate' }).inject(this.includeSubmittedDateWrapper);
            }
            this.includeSubmittedDateValue = false;
            this.includeSubmittedDate.addEvent('change', function (e) {
                this.includeSubmittedDateValue = e.target.checked;
                if (this.includeSubmittedDateValue) {
                    this.leaveHistoryTable.removeClass('hide-submitted-date');
                }
                else {
                    this.leaveHistoryTable.addClass('hide-submitted-date');
                }
                
            }.bind(this));
            
            var multiPositionCompanies = [2593, 6593, 5000, 5111, 9593];
            if (multiPositionCompanies.indexOf(Affinity.login.profile.companyNumber) > 0) { //multi position comps only
                this.panelShares.hide();
            }
        }
        else {
            //new Element('option', { 'value': '4', 'html': 'Saved', 'id': '-01' }).inject(this.leaveStatusFilter);

            new Element('span', { 'class': 'filter-label', 'html': 'Submitted To' }).inject(this.panelEmployee);
            this.leaveSubmittedToFilter = new Element('select', { 'class': 'history-filter-select data-hj-whitelist submitted-to-filter inline' }).adopt(
                new Element('option', { 'value': '0', 'html': 'All', 'id': null })
            ).inject(this.panelEmployee);
        }

        new Element('span', { 'class': 'filter-label', 'html': 'Leave Type' }).inject(this.panelType);
        this.leaveTypeFilter = new Element('select', { 'class': 'history-filter-select data-hj-whitelist leave-type-filter inline' }).adopt(
            new Element('option', { 'value': '0', 'html': 'All', 'id': null })
        ).inject(this.panelType);

        new Element('span', { 'class': 'filter-label', 'html': 'Date From' }).inject(this.panelDateTo);
        new Element('span', { 'class': 'form-row inline' }).adopt(
            this.dateFromFilter = new Element('input', { 'type': 'text', 'id': 'history-date-from', 'class': 'data-hj-whitelist history-filter-date-from leave-filter-date inline uidate-calendar', 'data-calendar-display-format': '%d/%m/%y', 'data-calendar-return-format': '%d/%m/%Y', 'data-start-date': 'none', 'data-calendar-nullable': 'true', 'value': null })
        ).inject(this.panelDateTo);

        new Element('span', { 'class': 'filter-label', 'html': 'Date to' }).inject(this.panelDateFrom);
        new Element('span', { 'class': 'form-row inline' }).adopt(
            this.dateToFilter = new Element('input', { 'type': 'text', 'id': 'history-date-to', 'class': 'data-hj-whitelist history-filter-date-to leave-filter-date inline uidate-calendar', 'data-calendar-display-format': '%d/%m/%y', 'data-calendar-return-format': '%d/%m/%Y', 'data-start-date': 'none', 'data-calendar-nullable': 'true', 'value': null })
        ).inject(this.panelDateFrom);

        if(this.isManager){
            this.dateSubmittedOption =  new Element('option', { 'value': '4', 'html': 'Submitted Date', 'id': 'DateSubmitted' });
        }else{
            this.dateSubmittedOption = null;
        }

        new Element('span', { 'class': 'filter-label', 'html': 'Order By' }).inject(this.panelOrder);
        this.leaveOrderFilter = new Element('select', { 'class': 'history-filter-select order-filter inline', 'value' :  '3' }).adopt(
            new Element('option', { 'value': '0', 'html': ' ', 'id': null }),
            new Element('option', { 'value': '1', 'html': 'Start Date', 'id': 'DateFrom' }),
            new Element('option', { 'value': '2', 'html': 'End Date', 'id': 'DateTo' }),
            new Element('option', { 'value': '3', 'html': 'Units', 'id': 'Hours' }),
            this.dateSubmittedOption
        ).inject(this.panelOrder);
        this.leaveOrderFilter.value = this.isManager ? '4' : '1'

        this.applyFilter = new Element('span', { 'class': 'history-filter-apply button blue' }).adopt(
            new Element('span', { 'html': 'Filter' })
        ).inject(this.panelButtonWrapper);

        this.clearFilter = new Element('span', { 'class': 'history-filter-clear button grey ml-4' }).adopt(
            new Element('span', { 'html': 'Clear' })
        ).inject(this.panelButtonWrapper);

        //Push it to DOM
        this.section.inject(this.target);

        /*   REQUESTS         */
        this.getHistoryRequest = new Request.JSON({
            headers: { 'Pragma': 'no-cache' },
            onRequest: function () {
                Affinity.leave.lockui('leaveHistory-getHistoryRequest');
                if (!this._noAlerts) {
                    uialert({
                        message: 'Loading History',
                        showLoader: true,
                        showButtons: false,
                        noClose: true
                    });
                }
            }.bind(this),
            onFailure: function (e) {
                Affinity.leave.unlockui('leaveHistory-getHistoryRequest');
                if (!this._noAlerts) {
                    prompts.hide();
                }
                Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
            }.bind(this),
            onException: function () {
                Affinity.leave.unlockui('leaveHistory-getHistoryRequest');
            },
            onCancel: function () {
                Affinity.leave.unlockui('leaveHistory-getHistoryRequest');
                if (!this._noAlerts) {
                    prompts.hide();
                }
            },
            onSuccess: function (response) {
                Affinity.leave.unlockui('leaveHistory-getHistoryRequest');
                if (!this._noAlerts) {
                    prompts.hide();
                }
                if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName)) {
                    this.data = response.Data;
                    if (this.isManager && Affinity.leave.manager) {
                        Affinity.leave.manager.applyTeamConfig(this.generateHistoryRows);
                    }
                    else if (Affinity.leave.employee) {
                        Affinity.leave.employee.applyConfig(this.generateHistoryRows);
                    }
                }
            }.bind(this)
        });

        Affinity.uiDateCalendar.processNew();

        if (this.isManager) {
            Affinity.leave.manager.applyTeamConfig(this.teamLeaveHistoryFilters);
        }
        else {
            Affinity.leave.employee.applyConfig(this.leaveHistoryFilters);
        }


        /**/

        window.addEvent('DeleteLeaveSuccess', this.refreshHistory);

        /**/


        this.getHistory();

        this.show();
    },

    getHistory: function () {
        var employeeNum = Affinity.login.profile.employeeNumber;
        var path;
        if (this.isManager) {
            var dateFrom = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).format('%d-%b-%Y');
            path = 'ManagerTeamLeaveHistory/' + employeeNum + '?StatusCode=0&dateFrom='+dateFrom+'&orderBy=DateSubmitted&isAscending=true';
        }
        else {
            path = 'MyLeaveHistory/' + employeeNum;
        }

        this._methodName = 'ui.leave.history.js -> getHistory';

        this._api = this.filteredHistoryUri ? this.filteredHistoryUri : Affinity.GetCacheSafePath(Affinity.leave.apiroot + path);

        if (this.getHistoryRequest && this.getHistoryRequest.isRunning()) {
            this.getHistoryRequest.cancel();
        }
        this.getHistoryRequest.url = this.getHistoryRequest.options.url = this._api;
        this.getHistoryRequest.get();
    },

    applyFilters: function (pageNo) {

        var employeeNum = Affinity.login.profile.employeeNumber;

        var uriObj;

        if (this.isManager) {
            uriObj = new URI(Affinity.leave.apiroot + 'ManagerTeamLeaveHistory/' + employeeNum);
        }
        else {
            uriObj = new URI(Affinity.leave.apiroot + 'MyLeaveHistory/' + employeeNum);
        }

        var query = typeOf(uriObj.parsed.query) === 'null' ? {} : uriObj.parsed.query.parseQueryString();

        query.PageNo = pageNo;

        var status = this.leaveStatusFilter[this.leaveStatusFilter.selectedIndex].get('id');
        if (status !== null) {
            query.StatusCode = status;
        }

        if (this.isManager) {
            var employee = this.employeeFilter[this.employeeFilter.selectedIndex].get('id');
            if (employee) {
                //query.EmployeeNo = employee;
                query.EmployeeFilter = employee;
            }

            var includeIndirect = this.includeIndirect.checked;
            if (this.includeIndirect && includeIndirect) {
                query.includeIndirect = true;
            }
            if (this.excludeNonApprovers && this.excludeNonApprovers.checked) {
                query.excludeNonApprovers = true;
            }
        } else {
            var submittedTo = this.leaveSubmittedToFilter[this.leaveSubmittedToFilter.selectedIndex].get('id');
            if (submittedTo !== null) {
                query.submittedTo = submittedTo;
            }
        }

        var type = this.leaveTypeFilter[this.leaveTypeFilter.selectedIndex].get('id');
        if (type !== null) {
            query.LeaveCode = type;
        }

        var d;
        var dateFrom = this.dateFromFilter.getWidget().getRawDate();
        var dateTo = this.dateToFilter.getWidget().getRawDate();
        if (dateFrom && typeOf(dateFrom) === 'date' && dateFrom.isValid()) {
            d = dateFrom.format('%d-%b-%Y');
            query.DateFrom = d;
        }
        if (dateTo && typeOf(dateTo) === 'date' && dateTo.isValid()) {
            d = dateTo.format('%d-%b-%Y');
            query.DateTo = d;
        }

        var orderBy = this.leaveOrderFilter[this.leaveOrderFilter.selectedIndex].get('id');
        if (orderBy !== null) {
            query.orderBy = orderBy;
        } else {
            if (this.isManager) {
                query.orderBy = "DateSubmitted";
                query.isAscending = true;
            }
        }
        uriObj.parsed.query = Object.toQueryString(query);

        this._methodName = 'ui.leave.history.js -> applyFilters';

        this._api = Affinity.GetCacheSafePath(uriObj.toString());
        this.filteredHistoryUri = this._api;

        if (this.getHistoryRequest && this.getHistoryRequest.isRunning()) {
            this.getHistoryRequest.cancel();
        }
        this.getHistoryRequest.url = this.getHistoryRequest.options.url = this._api;
        this.getHistoryRequest.get();

    },

    refreshHistory: function (noAlerts) {
        this._noAlerts = typeOf(noAlerts) === 'null' ? false : noAlerts;
        this.getHistory();
    },

    leaveHistoryFilters: function (config) {
        this.leaveTypeFilter.empty();
        new Element('option', { 'value': '0', 'html': 'All', 'id': null }).inject(this.leaveTypeFilter);

        Array.each(config.LeaveCodes, function (code, index) {

            new Element('option', {
                'html': code.Description,
                'id': code.LeaveCode,
                'value': index
            }).inject(this.leaveTypeFilter);

        }.bind(this));

        this.leaveSubmittedToFilter.empty();
        new Element('option', { 'value': '0', 'html': 'All', 'id': null }).inject(this.leaveSubmittedToFilter);

        Array.each(config.Positions, function (position, index) {

            Array.each(position.SubmittedTos, function (approver, index) {

                new Element('option', {
                    'html': approver.EmployeeName + ' (' + approver.EmployeeNo + ')',
                    'id': approver.EmployeeNo,
                    'value': index
                }).inject(this.leaveSubmittedToFilter);

            }.bind(this));

        }.bind(this));

        this.applyFilter.removeEvents();
        this.applyFilter.addEvent(Affinity.events.click, function () {

            this.applyFilters(1);
            this.historyCurrentPage = 1;
        }.bind(this));

        this.clearFilter.removeEvents();
        this.clearFilter.addEvent(Affinity.events.click, function () {

            this.reset();
            this.getHistory();

        }.bind(this));

    },

    updateEmployeeFilter: function (includeIndirect, selectedEmployeeNo) {
        if (this.employeeFilter && this.Employees) {

            //clear list
            this.employeeFilter.empty();

            //add default
            new Element('option', { 'value': '0', 'html': 'All', 'id': null }).inject(this.employeeFilter);

            var selectedIndex = 0, currentIndex = 0;
            //add employees
            Array.each(this.Employees, function (emp, index) {               
                if (includeIndirect || emp.IsDirect) { // direct or everything
                    new Element('option', {
                        'html': emp.EmployeeName + ' (' + emp.EmployeeNo + ')',
                        'id': emp.EmployeeNo,
                        'value': index + 1
                    }).inject(this.employeeFilter);
                    currentIndex++;
                    if (selectedEmployeeNo == emp.EmployeeNo) {
                        selectedIndex = currentIndex;
                    }
                }
            }.bind(this));

            this.employeeFilter.selectedIndex = selectedIndex;

            if (this.employeeFilterAutocomplete) {
                this.employeeFilterAutocomplete.revert();
            }

            this.employeeFilterAutocomplete = new UIAutoCompleteWidget({
                stopInitialChange: true,
                selectElement: this.employeeFilter
            });
        }
    },

    teamLeaveHistoryFilters: function (data) {

        this.leaveStatusFilter.selectedIndex = 3;
        this.dateFromFilter.getWidget().setDate(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));

        Array.each(data.AllCompanyLeaveCodes, function (code, index) {

            new Element('option', {
                'html': code.Description,
                'id': code.LeaveCode,
                'value': index
            }).inject(this.leaveTypeFilter);

        }.bind(this));

        this.Employees = data.Employees;
        this.updateEmployeeFilter(false);

        this.applyFilter.removeEvents();
        this.applyFilter.addEvent(Affinity.events.click, function () {

            this.applyFilters(1);
            this.historyCurrentPage = 1;
        }.bind(this));

        this.clearFilter.removeEvents();
        this.clearFilter.addEvent(Affinity.events.click, function () {

            this.reset();
            this.getHistory();

        }.bind(this));

    },

    generateHistoryRows: function (config) {
        this.clearHistoryRows();

        var rows = this.data.History;

        Array.each(this.data.History, function (rowData, index) {

            this.generateHistoryRow(rowData, config);

        }.bind(this));

        if (rows.length > 0) {

            this.leaveHistoryTable.removeClass('hidden');
            this.noHistoryMessage.addClass('hidden');

        } else {

            this.leaveHistoryTable.addClass('hidden');
            this.noHistoryMessage.removeClass('hidden');

        }

        Affinity.tooltips.processNew();
        this.historyPaginate();
    },

    generateHistoryRow: function (rowData, config) {
        var row = new Element('tr', { 'id': rowData.TSGroupId, 'class': '' });
        var partialApproved = false;

        var bossData;
        if (this.isManager) {
            if (!rowData.AdminView && rowData.Authorisations && rowData.Authorisations.length > 0) {
                bossData = rowData.Authorisations[0];
            }
            else {
                bossData = {
                    AuthorisationId: -1,
                    StatusCode: rowData.StatusCode
                };
            }
        }

        var icon = '';
        var color = 'grey';
        var iconColor = 'grey';
        var tooltip = '';
        switch (rowData.StatusCode) {
            case -1:
                //status.set('html', '<div class="message-icon orange print-hidden ui-has-tooltip" data-tooltip="">' + Affinity.icons.Save + '</div>');
                //status.addClass('orange');
                icon = Affinity.icons.Save
                iconColor = 'orange';
                color = 'orange';
                tooltip = 'Leave has been saved';
                break;
            case 0:
                iconColor = 'blue';

                Array.each(rowData.Authorisations, function (approver, index) {
                    if (approver.StatusCode == 3) {
                        partialApproved = true
                    }
                });

                if (partialApproved) {
                    icon = Affinity.icons.ThumbsUp;
                    color = 'green-blue';
                    iconColor = 'yellow';
                    tooltip = 'Leave has been partially approved but still pending';
                }
                else {
                    icon = Affinity.icons.Hourglass;
                    color = 'blue';
                    tooltip = 'Leave is pending approval';
                }
                break;
            case 2:
                icon = Affinity.icons.ThumbsDown;
                color = 'red';
                iconColor = 'red';
                tooltip = 'Leave has been declined';
                break;
            case 3:
                color = 'green';
                iconColor = 'green';
                if (rowData.Status.test(/external/gi)) {
                    icon = Affinity.icons.ThumbsUp;
                    tooltip = 'Leave has been approved';
                    var color = 'grey';
                    var iconColor = 'grey';
                } else if (rowData.Status.test(/paid/gi)) {
                    icon = Affinity.icons.ThumbsUp;
                    tooltip = 'Leave has been approved';
                } else {
                    icon = Affinity.icons.ThumbsUp;
                    tooltip = 'Leave has been approved';
                }
                break;
            case 6:
                icon = Affinity.icons.Cancel;
                color = 'grey';
                iconColor = 'grey';
                tooltip = 'Leave has been cancelled';
                break;
            case 7:
                icon = Affinity.icons.Cancel;
                color = 'blue';
                iconColor = 'blue';
                tooltip = 'Leave cancellation is pending approval';
                break;
        }

        var status = new Element('td', { 'class': 'active col-id-status indicate first ' + color, 'html': '<div class="message-icon ' + iconColor + ' print-hidden ui-has-tooltip" data-tooltip="' + tooltip + '">' + icon + '</div>' }).inject(row);

        if (this.isManager) {
            var employee = new Element('td', { 'class': 'active col-id-employee indicate first', 'html': rowData.EmployeeName + ' (' + rowData.EmployeeNo + ')' }).inject(row);
        }

        var type = new Element('td', { 'class': 'active col-id-type', 'html': rowData.CodeDescription }).inject(row);
        var startDate = new Element('td', { 'class': 'active col-id-startdate', 'html': Date.parse(rowData.DateFrom).format('%d-%b-%Y') }).inject(row);
        var endDate = new Element('td', { 'class': 'active col-id-enddate', 'html': Date.parse(rowData.DateTo).format('%d-%b-%Y') }).inject(row);

        var unitLabel = ' hours';
        var totalUnits = rowData.TotalHours;
        
        if (rowData.UnitType === 'D') {
            unitLabel = ' days';
            totalUnits = rowData.TotalDays;
        } else if (rowData.UnitType === 'W') {
            unitLabel = ' weeks';
            totalUnits = rowData.TotalWeeks;
        }

        var unitString = Affinity.leave.toFixed(totalUnits, 2) + unitLabel;
        var units = new Element('td', { 'class': 'active col-id-units', 'html': unitString }).inject(row);

        if (!this.isManager) {
            var nameList = ''
            Array.each(rowData.Authorisations, function (bossMan, index) {
                if (bossMan.ApprovedBy) {
                    if (bossMan.ApprovedBy == -100) {
                        nameList += rowData.ApprovedByName;
                    } else {
                        nameList += bossMan.ApprovedByName + ' (' + bossMan.ApprovedBy + ')';
                    }
                }
                else {                   
                    if (bossMan.SubmittedTo == -100) {
                        nameList += rowData.SubmittedToName;
                    } else {
                        nameList += bossMan.SubmittedToName + ' (' + bossMan.SubmittedTo + ')';
                    }
                }
                if (index < rowData.Authorisations.length - 1) {
                    nameList += ', ';
                }
            });

            this.submittedTo = new Element('td', {
                'class': 'active col-id-authoriserid',
                'html': nameList
            }).inject(row);
        }
        else {
            this.submittedDate = new Element('td', {
                'class': 'active col-id-submitted-date',
                'html': rowData.TimeSubmitted ? Date.parse(rowData.TimeSubmitted).format('%d-%b-%Y %X') : ''
            }).inject(row);
        }
        /* Buttons */
        var viewDetail = function () {
            if (this.isManager) {
                Affinity.leave.manager.leaveDetail.getDetail(rowData.EmployeeNo, rowData.TSGroupId, bossData);
            }
            else {
                Affinity.leave.employee.leaveDetail.getDetail(rowData.EmployeeNo, rowData.TSGroupId, bossData);
            }
            //Affinity.leave.leaveDetailData(rowData.EmployeeNo, rowData.TSGroupId, bossData);
        }.bind(this);

        

        if (this.isManager) {
            var tryCreateAuditLogForImportedLeave = function () {
                if (Affinity.leave.manager !== undefined &&
                    Affinity.leave.manager !== null &&
                    Affinity.leave.manager.leaveDetail !== undefined &&
                    Affinity.leave.manager.leaveDetail !== null) {
                    Affinity.leave.manager.leaveDetail.tryCreateAuditLogForImportedLeave(rowData.EmployeeNo, rowData.TSGroupId);
                }
            }.bind(this);
        } else {
            var tryCreateAuditLogForImportedLeave = function () {
                if (Affinity.leave.employee !== undefined &&
                    Affinity.leave.employee !== null &&
                    Affinity.leave.employee.leaveDetail !== undefined &&
                    Affinity.leave.employee.leaveDetail !== null) {
                    Affinity.leave.employee.leaveDetail.tryCreateAuditLogForImportedLeave(rowData.EmployeeNo, rowData.TSGroupId);
                }
            }.bind(this);
        }
        

        // row.addEvent(Affinity.events.click, tryCreateAuditLogForImportedLeave);
        // row.addEvent(Affinity.events.click, viewDetail);
        row.addEvent("click", tryCreateAuditLogForImportedLeave);
        row.addEvent("click", viewDetail);
        
        //var buttons = new Element('td', { 'class': 'active col-id-rowbutton' }).inject(row);
        //var detailsButton = new Element('span', { 'class': 'button blue w-icon-only ui-has-tooltip', 'data-tooltip': 'Details', 'data-tooltip-dir': 'left' }).adopt(
        //    new Element('span', { 'html': Affinity.icons.Browser })
        //).inject(buttons);
        row.inject(this.historyTableBody);
    },

    historyPaginate: function () {

        if (typeOf(this.historyCurrentPage) === 'null' || !('historyCurrentPage' in this)) {
            this.historyCurrentPage = 1;
        }
        this.clearPagination();
        var pageCount = this.data.PageCount;

        this.pageFirst = new Element('span', { 'class': 'pagination-first', 'html': 'First' }).inject(this.paginateBox);
        this.pageBack = new Element('span', { 'class': 'pagination-back', 'html': 'Previous' }).inject(this.paginateBox);
        this.pages = new Element('div', { 'class': 'pagination-pages' }).inject(this.paginateBox);
        this.pageForward = new Element('span', { 'class': 'pagination-forward', 'html': 'Next' }).inject(this.paginateBox);
        this.pageLast = new Element('span', { 'class': 'pagination-last', 'html': 'Last' }).inject(this.paginateBox);
        var historyCount = this.data.History.length;
        if (historyCount > 0) {
            var firstHistory = ((this.historyCurrentPage - 1) * 15) + 1;
            var subText = 'showing ' + firstHistory + ' to ' + (firstHistory + historyCount - 1) + ' of ' + this.data.Count;
            this.pageSubText = new Element('div', { 'class': 'pagination-sub-text', 'html': subText }).inject(this.paginateBox);
        }

        var count = 0;
        var page;
        for (i = 1; i <= pageCount; i++) {
            if (i > this.historyCurrentPage - 1 - (this.historyPagingCount / 2) && count <= this.historyPagingCount) {
                count++;

                if (i == this.historyCurrentPage) {
                    page = new Element('input', {
                        'type': 'text',
                        'class': 'paginate-page-numbers data-hj-whitelist',
                        'value': i
                    }).inject(this.pages);
                    (function (page) {
                        //if (index == this.historyCurrentPage)
                        //    page.addClass('selected');
                        page.addEvent('change', function (e) {
                            var value = page.get('value');
                            var index = parseInt(value);
                            if (index == value && index > 0 && index <= pageCount) {
                                this.applyFilters(index);
                                this.historyCurrentPage = index;
                            } else {
                                uialert({
                                    message: 'Unable to display page ' + value,
                                    //showButtons: true,
                                    noClose: false
                                });
                            }
                        }.bind(this));
                    }.bind(this))(page);
                }
                else {
                    page = new Element('span', {
                        'class': 'paginate-page-numbers',
                        'html': i
                    }).inject(this.pages);
                    (function (page, index) {
                        //if (index == this.historyCurrentPage)
                        //    page.addClass('selected');
                        page.addEvent(Affinity.events.click, function (e) {
                            this.applyFilters(index);
                            this.historyCurrentPage = index;
                        }.bind(this));
                    }.bind(this))(page, i);
                }
            }
            else if (i == 1 || i == pageCount) {
                page = new Element('span', {
                    'class': 'paginate-page-numbers not-clickable',
                    'html': '...'
                }).inject(this.pages);
            }
        }

        if (pageCount > 0 && this.historyCurrentPage != 1) {
            this.pageFirst.removeEvents();
            this.pageFirst.addEvent(Affinity.events.click, function () {
                this.applyFilters(1);
                this.historyCurrentPage = 1;
            }.bind(this));
            this.pageBack.removeEvents();
            this.pageBack.addEvent(Affinity.events.click, function () {
                this.applyFilters(this.historyCurrentPage - 1);
                this.historyCurrentPage = this.historyCurrentPage - 1;
            }.bind(this));

        } else {
            this.pageFirst.addClass('not-active');
            this.pageBack.addClass('not-active');
        }

        if (pageCount > 0 && this.historyCurrentPage != this.data.PageCount) {
            this.pageLast.removeEvents();
            this.pageLast.addEvent(Affinity.events.click, function () {
                this.applyFilters(this.data.PageCount);
                this.historyCurrentPage = this.data.PageCount;
            }.bind(this));
            this.pageForward.removeEvents();
            this.pageForward.addEvent(Affinity.events.click, function () {
                this.applyFilters(this.historyCurrentPage + 1);
                this.historyCurrentPage = this.historyCurrentPage + 1;
            }.bind(this));

        } else {
            this.pageLast.addClass('not-active');
            this.pageForward.addClass('not-active');
        }

    },

    clearFilters: function () {

        if (this.isManager) {
            if (this.leaveStatusFilter) {
                this.leaveStatusFilter.selectedIndex = 3;
                //this.statusFilter.value = '3';
            }

            if (this.employeeFilter) {
                this.employeeFilter.selectedIndex = 0;
                //this.employeeFilter.value = '0';
            }

            if (this.employeeFilterAutocomplete) {
                this.employeeFilterAutocomplete.setValue('0');
            }

            if (this.includeIndirect) {
                this.includeIndirect.checked = false;
            }
        }
        else {
            if (this.leaveSubmittedToFilter) {
                this.leaveSubmittedToFilter.selectedIndex = 0;
                //this.leaveSubmittedToFiler.value = '0';
            }

            if (this.leaveStatusFilter) {
                this.leaveStatusFilter.selectedIndex = 0;
                //this.statusFilter.value = '0';
            }
        }

        if (this.leaveTypeFilter) {
            this.leaveTypeFilter.selectedIndex = 0;
            //this.typeFilter.value = '0';
        }

        if (this.dateFromFilter) {
            this.dateFromFilter.value = null;
        }

        if (this.dateToFilter) {
            this.dateToFilter.value = null;
        }

        if (this.dateFromFilter && 'getWidget' in this.dateFromFilter) {
            try {
                this.dateFromFilter.getWidget().setNone();
            } catch (e) { }
        }

        if (this.dateToFilter && 'getWidget' in this.dateToFilter) {
            try {
                this.dateToFilter.getWidget().setNone();
            } catch (e) { }
        }

        if (this.leaveOrderFilter) {
            this.leaveOrderFilter.selectedIndex = 0;
        }

        this.filteredHistoryUri = false;
        //this.clearHistoryRows();
    },

    clearPagination: function () {
        if (this.paginateBox) {
            if (this.pageFirst)
                this.pageFirst.removeEvents();
            if (this.pageBack)
                this.pageBack.removeEvents();
            if (this.pageForward)
                this.pageForward.removeEvents();
            if (this.pageLast)
                this.pageLast.removeEvents();
            if (this.pages)
                Array.each(this.pages.getElements('.paginate-page-numbers'), function (el) { el.removeEvents(); });
            this.paginateBox.empty();
        }
    },

    clearHistoryRows: function () {
        if (this.leaveHistoryTable && this.historyTableBody) {
            Array.each(this.historyTableBody.getElements('.button'), function (el) { el.removeEvents(); });
            this.historyTableBody.empty();
        }
    },

    hide: function () {

        this.toggleButton.set('html', Affinity.icons.ArrowLineSmallDown).store('state', 'closed');
        this.leaveHistoryBox.dissolve();

    },

    show: function () {
        this.toggleButton.set('html', Affinity.icons.ArrowLineSmallUp).store('state', 'open');
        this.leaveHistoryBox.reveal();

    },

    toggle: function () {
        if (this.toggleButton.retrieve('state') === 'open') {
            this.hide();
        } else {
            this.show();
        }
    },

    reset: function (keepFilters) {
        if (this.getHistoryRequest && this.getHistoryRequest.isRunning()) {
            this.getHistoryRequest.cancel();
        }

        if (!keepFilters) {
            this.clearFilters();
            this.clearPagination();
        }
        this.clearHistoryRows();
    },

    destroy: function () {
        window.removeEvent('DeleteLeaveSuccess', this.refreshHistory);
        this.reset();
        if (this.applyFilter) { this.applyFilter.removeEvents(); }
        if (this.clearFilter) { this.clearFilter.removeEvents(); }
        if (this.IsManager && this.employeeFilterAutocomplete) { this.employeeFilterAutocomplete.destroy(); }
        if (this.section) {
            try { this.titlebar.removeEvents(); } catch (e) { }
            Array.each(this.section.getElements('.button'), function (el) { el.removeEvents(); });
            Array.each(this.section.getElements('.ui-calendar-display'), function (el) { el.getWidget().destroy(); });
            this.section.empty();
            this.section.destroy();
        }
        Object.each(this, function (val, key) {
            this[key] = null;
            delete this[key];
        }.bind(this));
    }
});

var UILeaveApply = new Class({

    Implements: [Options, Events],

    Binds: [
        'hide',
        'show',
        'toggle',
        'loadConfig',
        'generatePositions',
        'refreshApprovers',
        'generateLeaveCodes',
        'initiateReasonSelector',
        'initiateDateRange',
        'initiateAttachmentWidget',
        'initiateInputFields',
        'validateTotalUnitsAppliedFor',
        'refreshEmployeeConfig',
        'selectedEmployeeNumber',
        'setLeaveCode',
        'generateCalendar',
        'editTimeModal',
        'edititableDates',
        'updateEditableDays',
        'setHoursEvents',
        'populateEditable',
        'injectEdit',
        'updatePosUnit',
        'checkHours',
        'setDates',
        'leaveUnits',
        'getLeaveUnits',
        'processUnits',
        'createResponseField',
        'generateAttachments',
        'generateApplyButtons',
        'acknowledgementModal',
        'save',
        'submit',
        'resetForm',
        'reset', 'destroy',
        //employee        

        //manager
        'generateEmployees',
        'updateEmployeeSelector',
        'setEmployee',
        'setEmployeeAndConfig',
        'updateButtons'
        
    ],

    options: {
        target: null,
        isManager: false
        //configData: null //Remove?
    },

    hide: function () {

        this.toggleButton.set('html', Affinity.icons.ArrowLineSmallDown).store('state', 'closed');
        this.applyForm.dissolve();

    },

    show: function () {
        this.toggleButton.set('html', Affinity.icons.ArrowLineSmallUp).store('state', 'open');
        this.applyForm.reveal();

    },

    toggle: function () {
        if (this.toggleButton.retrieve('state') === 'open') {
            this.hide();
        } else {
            this.show();
        }
    },

    refreshEmployeeConfig: function () {
        if (this.isManager) {
            if (this.employeeSelector && this.Employees) {
                var selectedEmployee = this.employeeSelector[this.employeeSelector.selectedIndex].get('id');
                this.updateEmployeeSelector(this.includeIndirect.checked, this.employeeSelector[this.employeeSelector.selectedIndex].get('id'));
                this.setEmployeeAndConfig(this.Employees[this.employeeSelector[this.employeeSelector.selectedIndex].get('value') - 1]);
                this.timeinputs.addClass('hidden');
          
            }
        }
        
    },

    initialize: function (options) {
        this.setOptions(options);

        /* BUILD HTML */
        this.target = this.options.target;
        this.isManager = this.options.isManager ? true : false;

        this.section = new Element('div', { 'class': 'section' }).inject(this.target);
        this.sectionBody = new Element('div', { 'class': 'section-body' }).inject(this.section);

        this.form = new Element('div', { 'class': 'default-form create-leave-form' }).inject(this.sectionBody);
        this.ealInfo = null;
        var sTitle;
        if (this.isManager) {
            sTitle = 'Create Team Leave';
        }
        else {
            sTitle = 'Apply for Leave';
        }
        this.ealProjectionReturned = false;
        this.leaveAvailabilityCounter = 0;
        this.nonconfiguredLeaveTypes = ['A', 'B', 'C', 'D', 'E', 'S'];
        this.availableLeaveCodes = ['07', '09', '10', '12', '13', '11'];
        this.title = new Element('div', { 'class': 'section-title leave-apply-title ui-has-tooltip', 'html': sTitle, 'data-tooltip': 'Open / Close', 'data-tooltip-dir': 'top' })
            .addEvent(Affinity.events.click, this.toggle).inject(this.form);
        this.toggleButton = new Element('div', { 'class': 'toggle-button', 'html': Affinity.icons.ArrowLineSmallDown }).store('state', 'closed').inject(this.title);
        this.applyForm = new Element('div', { 'class': 'leave-apply-form', 'style': 'display:block; padding: 20px;' }).inject(this.form);
        this.leaveData = new Element('div', { 'class': 'leave-form default-form' }).inject(this.applyForm);
        this.formData = new Element('form').inject(this.leaveData);
        if (this.isManager) {
            this.employee = new Element('div', { 'class': 'form-row leave-apply-employee' }).inject(this.formData);
            this.employeeIndirect = new Element('div', { 'class': 'form-row leave-apply-indirect' }).inject(this.formData);
            new Element('label', { 'html': 'Include Indirect' }).inject(this.employeeIndirect);
            this.includeIndirect = new Element('input', { 'type': 'checkbox', 'class': 'include-indirect-filter', 'value': 'includeIndirect' }).inject(this.employeeIndirect);
            this.includeIndirect.addEvent('change', function (e) {
                if (this.employeeSelector && this.Employees) {
                    var selectedEmployee = this.employeeSelector[this.employeeSelector.selectedIndex].get('id');
                    this.updateEmployeeSelector(this.includeIndirect.checked, this.employeeSelector[this.employeeSelector.selectedIndex].get('id'));
                    if (selectedEmployee != this.employeeSelector[this.employeeSelector.selectedIndex].get('id')) {
                        this.setEmployee(this.Employees[this.employeeSelector[this.employeeSelector.selectedIndex].get('value') - 1]);
                    }
                }
            }.bind(this));
        }
        this.position = new Element('div', { 'class': 'form-row leave-apply-position' }).inject(this.formData);
        if (this.isManager)
            this.position.addClass('hidden');
        new Element('label', { 'html': 'Position' }).inject(this.position);
        this.type = new Element('div', { 'class': 'form-row leave-apply-type' }).inject(this.formData);
        this.reason = new Element('div', { 'class': 'form-row leave-apply-reason' }).inject(this.formData);
        this.reasonLabel = new Element('label', { 'html': 'Reason' }).inject(this.reason);
        this.reasonSelector = new Element('select', { 'class': 'apply-reason-selector' }).inject(this.reason);
        this.dates = new Element('div', { 'class': 'leave-dates' }).inject(this.leaveData);
        this.commentData = new Element('div', { 'class': 'apply-comment-form default-form' }).inject(this.leaveData);
        this.commentForm = new Element('form').inject(this.commentData);
        this.commentRow = new Element('div', { 'class': 'form-row leave-apply-comment' }).inject(this.commentForm);
        this.commentTitle = new Element('label', { 'html': 'Comment' }).inject(this.commentRow);
        this.commentBox = new Element('textarea', { 'class': 'apply-comment-box data-hj-whitelist', 'rows': '4', 'id': 'comment', 'name': 'comment' }).inject(this.commentRow);
        this.attachmentForm = new Element('form', { 'class': 'apply-attachment-form' }).inject(this.leaveData);
        this.attachment = new Element('div', { 'class': 'form-row leave-apply-attachment' }).inject(this.commentForm);
        this.approversForm = new Element('form').inject(this.leaveData);
        this.approvers = new Element('div', { 'class': 'form-row leave-apply-approvers' }).inject(this.approversForm);
        this.hiddenApprovers = new Element('div', { 'class': 'hidden' }).inject(this.approversForm);
        this.hiddenResponse = new Element('span', { 'class': 'leave-response' }).store('data', '').inject(this.leaveData);
        this.buttons = new Element('div', { 'class': 'form-row apply-buttons' }).inject(this.leaveData);
        this.applyForm.toggle();
        this.updateEditableDaysRequest = new Request.JSON({
            onRequest: function () {
                Affinity.leave.lockui('leaveApply-updateEditableDaysRequest');
            },
            onFailure: function (e) {
                Affinity.leave.unlockui('leaveApply-updateEditableDaysRequest');
                Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
            }.bind(this),
            onException: function () {
                Affinity.leave.unlockui('leaveApply-updateEditableDaysRequest');
            },
            onCancel: function () {
                Affinity.leave.unlockui('leaveApply-updateEditableDaysRequest');
            },
            onSuccess: function (response) {
                Affinity.leave.unlockui('leaveApply-updateEditableDaysRequest');
                if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName)) {
                    this.populateEditable(response, this._dataDateRange);
                }
            }.bind(this)
        });

        this.projectBalanceRequest = new Request.JSON({
            headers: { 'Pragma': 'no-cache' },
            onFailure: function (e) {
                Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
            },
            onSuccess: function (response) {
                if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName)) {
                    if (response.Data.ComponentBalances.length > 0 && response.Data.ComponentBalances[0].CodeBalances.length > 0 && 
                        this.typeSelector.selectedIndex !== 0) {
                        this.ealProjectionReturned = true;
                        this.ealInfo = response.Data.ComponentBalances[0].CodeBalances[0];
                       
                        var inlineEalSummary = document.getElementById("inlineEalSummary");
                        var inlineEalStory = document.getElementById("inlineEalStory");
                        if (inlineEalStory && inlineEalSummary) {
                            document.getElementById("inlineProjectionInfo").style.display = "inline-block";
                            if (this.ealInfo.UnitType == "H") {
                                inlineEalSummary.innerText = this.ealInfo.TotalHours + " hours";
                            } else {
                                inlineEalSummary.innerText = this.ealInfo.TotalDays + " days";
                            }
                        }
                    } else {
                        document.getElementById("inlineProjectionInfo").style.display = "none";
                    }
                }
            }.bind(this)
        })

        this.leaveUnitsRequest = new Request.JSON({
            method: 'get',
            onRequest: function () {
                this.updateButtons(false);
                Affinity.leave.lockui('leaveApply-leaveUnitsRequest');
            }.bind(this),
            onFailure: function (e) {
                Affinity.leave.unlockui('leaveApply-leaveUnitsRequest');
                if (!Affinity.leave.handleXHRErrors(e, this._api, this._methodName)) {
                    uialert({
                        message: 'We can\'t load that information. Please try again.',
                        okText: 'Retry',
                        showCancel: true,                
                        onOk: function () {
                            this.leaveUnitsRequest.send();
                        }.bind(this)
                    });
                }
            }.bind(this),
            onException: function () {
                Affinity.leave.unlockui('leaveApply-leaveUnitsRequest');
            },
            onCancel: function () {
                Affinity.leave.unlockui('leaveApply-leaveUnitsRequest');
            },
            onSuccess: function (response) {
                Affinity.leave.unlockui('leaveApply-leaveUnitsRequest');
                if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName)) {

                    if (this.retainTotalUnitsAppliedFor &&
                        this.savedData) {
                        this.data = this.savedData;


                        if (this.leaveCode) {
                            var total = 0;
                            var unitType = this.leaveCode.UnitType;
                            var days = response.Data.Days;
                            Array.each(this.data, function (unit, index) {
                                if (unitType === 'H' &&
                                    unit.Hours) {
                                    total += parseFloat(unit.Hours);
                                   // var day = days.filter(x => x.Date == unit.Date);
                                    var day = days.filter(function (day) {
                                        if (day.Date == unit.Date) {
                                            return day;
                                        }
                                    });
                                    if (day.length > 0) {
                                        day[0].TotalHoursAppliedFor = unit.Hours;
                                        //var position = day[0].PositionUnits.filter(x => x.PositionCode == unit.PositionCode);
                                        var position = day[0].PositionUnits.filter(function (positionUnit) {
                                            if (positionUnit.PositionCode == unit.PositionCode) {
                                                return positionUnit;
                                            }
                                        });
                                        if (position.length > 0) {
                                            position[0].HoursAppliedFor = unit.Hours;
                                        }
                                    }
                                    

                                } else if (unitType === 'D' &&
                                    unit.Days) {
                                    total += parseFloat(unit.Days);
                                    //SSL-1702 - Re-calculate the hours if it's in Days 
                                    unit.Hours = unit.Hours * unit.Days;

                                    //var day = days.filter(x => x.Date == unit.Date);
                                    var day = days.filter(function (day) {
                                        if (day.Date == unit.Date) {
                                            return day;
                                        }
                                    });
                                    if (day.length > 0) {
                                        day[0].TotalDaysAppliedFor = unit.Days;
                                        //var position = day[0].PositionUnits.filter(x => x.PositionCode == unit.PositionCode);
                                        var position = day[0].PositionUnits.filter(function (positionUnit) {
                                            if (positionUnit.PositionCode == unit.PositionCode) {
                                                return positionUnit;
                                            }
                                        });
                                        if (position.length > 0) {
                                            position[0].DaysAppliedFor = unit.Days;
                                        }
                                    }
                                    
                                   
                                } else if (unitType === 'W') {
                                    total += parseFloat(unit.Weeks);
                                }
                            });


                            if (unitType == 'H') {
                                response.Data.TotalHoursAppliedFor = total;
                                //Update Days
                                
                            } else if (unitType == 'D') {
                                response.Data.TotalDaysAppliedFor = total;
                            }

                            

                            this.unitInput.set('html', parseFloat(total).toFixed(2));
                            this.unitInput.set('id', total);

                            this.clearBorderHilights();
                            this.calculateLeaveAvailability(total);

                            //this.injectEdit();
                            this.checkHours(this.data);
                        }

                        this.retainTotalUnitsAppliedFor = false;
                    }

                    //else if (!this.retainTotalUnitsAppliedFor) {

                    //    this.savedData = this.data;
                    //}


                    this.responseData = response.Data;
                    if (this.processUnits(response.Data)) {
                        this.checkHours(response.Data);
                        this.createResponseField(response.Data);
                        this.updateButtons(true);

                    }

                    
                }
            }.bind(this)
        });

        this.sendApplicationRequest = new Request.JSON({
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            urlEncoded: false,
            onRequest: function () {
                Affinity.leave.lockui('leaveApply-sendApplicationRequest');
                uialert({
                    message: 'Processing leave application. Please wait',
                    showLoader: true,
                    showButtons: false,
                    noClose: true
                });
            },
            onFailure: function (e) {
                Affinity.leave.unlockui('leaveApply-sendApplicationRequest');
                prompts.hide();
                Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
            }.bind(this),
            onException: function () {
                Affinity.leave.unlockui('leaveApply-sendApplicationRequest');
                prompts.hide();
            },
            onCancel: function () {
                Affinity.leave.unlockui('leaveApply-sendApplicationRequest');
                prompts.hide();
            },
            onSuccess: function (response) {
               
                if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName, true)) {
                    var vm = this;
                    var requestResponse = response;
                    Affinity.leave.postAttachements(response.Data.EmployeeNo, response.Data.TSGroupId, function (response) {
                        Affinity.leave.unlockui('leaveApply-sendApplicationRequest');
                        prompts.hide();
                        vm.acknowledgementModal(requestResponse, true);
                    }.bind(this));


                    if ( this.isManager ) {
                        Affinity.leave.manager.refreshAll();
                    }
                    else {
                        Affinity.leave.employee.refreshAll();
                    }
                    this.resetForm();
                    this.initiateInputFields();
                    this.savedData = undefined;
                }
                else {
                    Affinity.leave.unlockui('leaveApply-sendApplicationRequest');
                    prompts.hide();
                    this.acknowledgementModal(response, true);
                }
            }.bind(this)
        });

        this.generateAttachments();
        this.generateApplyButtons();
        if (this.isManager) {
            Affinity.leave.manager.applyTeamConfig(this.loadConfig);
        }
        else {
            Affinity.leave.employee.applyConfig(this.loadConfig);
        }
    },

    loadConfig: function (config) {
        this.leaveTypeMap = config.LeaveCodes.mapFromKey('LeaveCode');
        this.generateLeaveCodes(config.LeaveCodes);
        this.generateCalendar(config);
        this.setLeaveCode(); //require config
        if (this.isManager) {
            this.generateEmployees(config.Employees);
        } else {
            this.generatePositions(config.Positions);
        }
    },

    

    generatePositions: function (positions) {
        var hasMultiPosition = positions.length > 1;
        if (positions.length === 1) {
            this.positionDescription = new Element('span', { 'class': 'position', 'html': positions[0].PositionTitle, 'id': positions[0].PositionCode }).inject(this.position);
        } else {
            this.positionSelector = new Element('select', { 'class': 'leave-position-selector' }).inject(this.position);
            new Element('option', { 'value': '0', 'html': 'All', 'id': '-01' }).inject(this.positionSelector, 'top');
            Array.each(positions, function (position, index) {
                var positionTitle = position.PositionTitle;
                if (position.IsExpired) {
                    positionTitle += ' (expired)';
                }
                new Element('option', { 'value': index + 1, 'html': positionTitle, 'id': position.PositionCode }).inject(this.positionSelector);
            }.bind(this));

            this.positionSelector.addEvent('change', function (e) {
                this.refreshApprovers(positions, e.target.selectedIndex - 1);
                this.leaveUnits();
            }.bind(this));
        }

        Array.each(positions, function (position, index) {
            this.approverBox = new Element('div', { 'class': 'leave-approver-box' }).inject(this.approvers);

            if (hasMultiPosition) {
                this.label = new Element('label', { 'html': 'Approver - ' + position.PositionTitle }).inject(this.approverBox);
            } else {
                this.label = new Element('label', { 'html': 'Approver'}).inject(this.approverBox);
            }
            

            this.approverSelector = new Element('select', { 'class': 'leave-approver-selector' }).inject(this.approverBox);

            if (position !== undefined &&
                position !== null &&
                position.SubmittedTos !== undefined &&
                position.SubmittedTos !== null &&
                position.SubmittedTos.length > 1) {
                this.def = new Element('option', { 'value': '0', 'html': '' }).inject(this.approverSelector, 'top');
            }
            

            this.approverSelector.selectedIndex = 0;
            this.approverBox.set('id', position.PositionCode);
            this.approverSelector.set('id', position.PositionCode);

            

            Array.each(position.SubmittedTos, function (approver, index) {
                new Element('option', { 'value': index + 1, 'html': approver.EmployeeName + ' (' + approver.EmployeeNo + ')', 'id': approver.EmployeeNo }).inject(this.approverSelector);
            }.bind(this));
        }.bind(this));
    },

    refreshApprovers: function (data, index) {
        this.approvers.set('html', '');
        var hasMultiPosition = data.length > 1;
        if ( data && typeOf(data) === 'array' ) {
            Array.each(data, function (position, i) {
                if (index < 0 || index == i) {
                    this.approverBox = new Element('div', { 'class': 'leave-approver-box' }).inject(this.approvers);
                    if (hasMultiPosition) {
                        this.label = new Element('label', { 'html': 'Approver - ' + position.PositionTitle }).inject(this.approverBox);
                    } else {
                        this.label = new Element('label', { 'html': 'Approver'}).inject(this.approverBox);
                    }

                    this.approverSelector = new Element('select', { 'class': 'leave-approver-selector' }).inject(this.approverBox);
                    this.approverSelector.selectedIndex = 0;
                    this.approverBox.set('id', position.PositionCode);
                    this.approverSelector.set('id', position.PositionCode);

                    Array.each(position.SubmittedTos, function (approver, j) {
                        this.option = new Element('option', { 'value': j + 1, 'html': approver.EmployeeName + ' (' + approver.EmployeeNo + ')', 'id': approver.EmployeeNo }).inject(this.approverSelector);
                    }.bind(this));
                }
            }.bind(this));
        }
    },

    updateEmployeeSelector: function (includeIndirect, selectedEmployeeNo) {
        if (this.employeeSelector && this.Employees) {
            this.employeeSelector.empty();
            var def = new Element('option', { 'value': '0', 'id': '0', 'html': '' }).inject(this.employeeSelector, 'top');

            var selectedIndex = 0, currentIndex = 0;
            //add employees
            Array.each(this.Employees, function (emp, index) {
                if (includeIndirect || emp.IsDirect) { // direct or everything
                    new Element('option', {
                        'html': emp.EmployeeName + ' (' + emp.EmployeeNo + ')',
                        'id': emp.EmployeeNo,
                        'value': index + 1
                    }).inject(this.employeeSelector);
                    currentIndex++;
                    if (selectedEmployeeNo == emp.EmployeeNo) {
                        selectedIndex = currentIndex;
                    }
                }
            }.bind(this));
            this.employeeSelector.selectedIndex = selectedIndex;

            if (this.employeeSelectorAutocomplete) {
                this.employeeSelectorAutocomplete.revert();
            }

            this.employeeSelectorAutocomplete = new UIAutoCompleteWidget({
                stopInitialChange: true,
                selectElement: this.employeeSelector
            });
        }
    },

    generateEmployees: function (employees) {
        this.Employees = employees;
        var label = new Element('label', { 'html': 'Employee' }).inject(this.employee);
        this.employeeSelector = new Element('select', { 'class': 'leave-employee-selector' }).inject(this.employee);
        this.employeeSelector.addEvent('change',
            function () {
                this.updateButtons(false);
                (
                    function ()
                    {
                        var employee = this.Employees[this.employeeSelector[this.employeeSelector.selectedIndex].get('value') - 1];
                        this.setEmployee(employee);
                        if (employee) {
                            this.position.removeClass('hidden');
                            if (this.selectedEmployeeNumber !== employee.EmployeeNo) {
                                this.timeinputs.addClass('hidden');
                            }
                            
                        } else {
                            this.position.addClass('hidden');
                            
                        }
                    }.bind(this)
                ).delay(1000, this);
            }.bind(this)
        );
        this.updateEmployeeSelector(false)
    },
    initiateDateRange: function () {
        var today = new Date();
        var dd = String(today.getDate());   //.padStart(2, '0');
        var mm = String(today.getMonth() + 1);  //.padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;

        var dateToday = Date.parse(today);

        Affinity.leave.setDates(this.fromDateBox, dateToday);
        Affinity.leave.setDates(this.toDateBox, dateToday);

        this.fromDateWidget.setDate(dateToday);
        this.toDateWidget.setDate(dateToday);

        this.clearBorderHilights();
        //document.getElementById("outOfRangeInfo").style.display = "none";

        if (this.leaveCode != undefined &&
            this.leaveCode !== null) {
            this.leaveUnits();
        }
        
    },
    initiateAttachmentWidget: function () {
        if (this.attachWidgetDiv) {
           // this.generateAttachments();
           // Affinity.uploaders.reset(this.attachWidgetDiv);
            
     
      
        }
    },
    initiateInputFields: function () {
        this.typeSelector.selectedIndex = 0;
        this.leaveCode = null;
        this.initiateReasonSelector();
        this.initiateDateRange();
        this.commentBox.value = '';
        this.initiateAttachmentWidget();

        this.updateButtons(false);
        this.timeinputs.addClass('hidden');
        
        var projectionInfo = document.getElementById("inlineProjectionInfo");
        if (projectionInfo !== undefined &&
            projectionInfo !== null &&
            projectionInfo.style !== undefined &&
            projectionInfo.style.display !== undefined) {
            projectionInfo.style.display = "none";
        }
        
    },
    setEmployeeAndConfig: function (employee) {

        if (this.positionDescription) {
            this.positionDescription.destroy();
        }
        if (this.positionSelector) {
            this.positionSelector.destroy();
        }

            var approvers = document.getElements('.leave-approver-box');
            if (approvers && approvers.length > 0) {
                approvers.destroy();
        }

            if (employee && employee.EmployeeNo) {
                Affinity.leave.manager.getManagerEmployeeConfigFromBackend(employee.EmployeeNo, function (empData) {
                    if (this.timeinputs !== undefined &&
                        this.timeinputs.hasClass('hidden')) {
                        this.retainTotalUnitsAppliedFor = false;
                    } else {
                        this.retainTotalUnitsAppliedFor = true;
                    }
                    this.generatePositions(empData.Positions);
                    this.leaveUnits();
                    this.leaveTypeMap = empData.LeaveCodes.mapFromKey('LeaveCode');
                    var previouslySelectedLeaveTypeIndex = this.typeSelector.selectedIndex;
                    this.generateLeaveCodes(empData.LeaveCodes);
                    this.typeSelector.selectedIndex = previouslySelectedLeaveTypeIndex;
                }.bind(this));
            }
      



    },
    setEmployee: function (employee) {
        var toInitiateEmployeeConfig = false;
        if (employee !== undefined &&
            employee.EmployeeNo !== null) {

            if (this.selectedEmployeeNumber !== employee.EmployeeNo) {
                toInitiateEmployeeConfig = true;
            }

            this.selectedEmployeeNumber = employee.EmployeeNo;
        }

        if (toInitiateEmployeeConfig) {
            if (this.positionDescription) {
                this.positionDescription.destroy();
            }
            if (this.positionSelector) {
                this.positionSelector.destroy();
            }

            var approvers = document.getElements('.leave-approver-box');
            if (approvers && approvers.length > 0) {
                approvers.destroy();
            }

            this.initiateInputFields();
            if (employee && employee.EmployeeNo) {
                Affinity.leave.manager.getManagerEmployeeConfig(employee.EmployeeNo, function (empData) {
                    this.generatePositions(empData.Positions);
                    this.leaveUnits();
                    this.leaveTypeMap = empData.LeaveCodes.mapFromKey('LeaveCode');
                    this.generateLeaveCodes(empData.LeaveCodes);
                    this.leaveCode = null;

                }.bind(this));
                //Get current balances of Employee...
            }
        } else {
            if (employee && employee.EmployeeNo) {
                this.updateButtons(true);
                if (this.typeSelector.selectedIndex > 0) {
                    this.timeinputs.removeClass('hidden');
                }
            } 
        }

    },
    typeSelectorChanged: function () {
        this.updateButtons(false);
        var leaveType = this.typeSelector[this.typeSelector.selectedIndex].get('id');
        this.setLeaveCode(this.leaveTypeMap[leaveType]);

        var selectedEmployee = true;
        if (this.isManager) {
            selectedEmployee = this.employeeSelector[this.employeeSelector.selectedIndex].get('id') > 0;
        }

        if (this.leaveCode && selectedEmployee) {
            this.timeinputs.removeClass('hidden');
        } else {
            this.timeinputs.addClass('hidden');
        }
    },
    generateLeaveCodes: function (leaveCodes) {
        if (this.typeSelector) { this.typeSelector.removeEvents(); }
        this.type.set('html', null);

        this.label = new Element('label', { 'html': 'Leave Type' }).inject(this.type);
       
        this.typeSelector = new Element('select', { 'class': 'leave-type-selector data-hj-whitelist' }).inject(this.type);
        this.def = new Element('option', { 'value': '0', 'html': '' }).inject(this.typeSelector, 'top');
       
        this.typeSelector.addEvent('change', function () {
            this.typeSelectorChanged();
        }.bind(this));
        var multiPositionCompanies = [2593, 6593, 5000, 5111, 9593];
        if (multiPositionCompanies.indexOf(Affinity.login.profile.companyNumber) < 0) { //non-multi position comps only
            
            this.label = new Element('br').inject(this.type);
            this.label = new Element('label', { 'html': '' }).inject(this.type);
            this.inlineProjectionInfo = new Element('div', {
                'id': 'inlineProjectionInfo',
                'class': 'projection-controls',
                'style': 'display: none; margin-top: 10px; max-width: 415px;',
            }).adopt(
                new Element('b', { 'html': 'Available Leave: ' }),
                new Element('span', { 'id': 'inlineEalSummary', 'html': '' }),
                new Element('span', {
                    'class': 'tooltip-view active col-id-employee indicate ui-has-tooltip', 'html': '<span class="button more w-icon"><span class="icon-info"></span><span>More</span></span>'
                }).addEvent(Affinity.events.click, function (e) {
                    var storyHtml = this.generateEalTableHtml(this.ealInfo);
                    var totalStory = this.ealInfo.PpeTotalsStory;
                    if (this.isManager && Affinity.leave.manager) {
                        totalStory = this.ealInfo.PpeTotalsStoryManagerView;
                    }

                    var hiddenInfo = "<div class='eal-ppeTotalStory'><div class='eal-ppeTotalStoryTitle'><b>Totals at last pay period</b></div> <div>" + totalStory + "</div></div>";
                    uialert({
                        message: storyHtml,
                        okText: "Close",
                        okIcon: ' ',
                        cssSelector: "tlbPrompt",
                        showButtons: true,
                        noClose: false,
                        showHiddenInfo: true,
                        hiddenInfoMessage: hiddenInfo,
                        hiddenInfoButtonText: 'Totals at last pay period',
                    });


                }.bind(this)),
                new Element('div', { 'id': 'inlineEalStory', 'style': 'max-height: 0px; opacity: 0;', 'html': '' })
            ).inject(this.type);
        }

        this.outOfRangeInfo = new Element('div', {
            'id': 'outOfRangeInfo',
            'style': 'display: none; margin-top: 10px; max-width: 415px;',
            'html': 'You can only estimate leave up to one year in advance.'
        }).inject(this.type);

        Array.each(leaveCodes, function (leaveCode, index) {
            this.option = new Element('option', { 'value': index + 1, 'html': leaveCode.Description, 'id': leaveCode.LeaveCode }).inject(this.typeSelector);
        }.bind(this));
    },
    parseISOLocal: function (s) {
        var b = s.split(/\D/);
        return new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5]);
    },
    evaluateCssClassByValue: function (value) {
        if (value < 0) {
            return "red";
        }
        return "";
    },
    generateEalTableHtml: function (leaveInfo) {
        console.log(leaveInfo)
        console.log(this.isManager)
        var userPronoun = "Your";
        if (this.isManager) {
            userPronoun = leaveInfo.EmployeeFirstName+"'s";
        }
        var unitLabel = leaveInfo.UnitType == "H" ? "Hours" : "Days";
        var balDate = this.parseISOLocal(leaveInfo.BalanceDate);
        var formattedBalDate = balDate.getDate() + "/" + (balDate.getMonth() + 1) + "/" + balDate.getFullYear();

        var operator = "+";
        if (parseFloat((leaveInfo.PostProjectedAccruals + leaveInfo.Accrual).toFixed(2)) < 0) {
            operator = "";
        }

        var storyHtml = "<div class='ealStory'><div class='leftText ealTableTitle'>How " + userPronoun +" Estimated Leave Is Calculated</div> <br /><table class='ealTable popup'><thead><tr><th>Breakdown</th><th class='centerText'>" + unitLabel + "</th></tr></thead>" +
            "<tbody><tr><td>Leave balance at last period end</td><td class='centerText " + this.evaluateCssClassByValue(leaveInfo.Entitlement) + "'>" + leaveInfo.Entitlement + "</td></tr><tr><td>Add leave accruals</td><td class='centerText " + this.evaluateCssClassByValue(leaveInfo.PostProjectedAccruals + leaveInfo.Accrual) + "'>" + operator + + +(leaveInfo.PostProjectedAccruals + leaveInfo.Accrual).toFixed(2) + "</td></tr>";
        var totalAmount = leaveInfo.UnitType == "H" ? leaveInfo.TotalHours : leaveInfo.TotalDays;
        if (leaveInfo.LeaveItems != null) {
            for (var i = 0; i < leaveInfo.LeaveItems.length; i++) {
                var leaveDate = this.parseISOLocal(leaveInfo.LeaveItems[i].DateFrom);
                var formattedLeaveDate = leaveDate.getDate() + "/" + (leaveDate.getMonth() + 1) + "/" + leaveDate.getFullYear();
                if (leaveInfo.LeaveItems[i].Credit) {
                    storyHtml += "<tr><td>Credit cancelled/declined leave booked on " + formattedLeaveDate + "</td><td class='centerText " + this.evaluateCssClassByValue(leaveInfo.LeaveItems[i].Units) + "'>+" + leaveInfo.LeaveItems[i].Units + "</td></tr>"
                } else {
                    storyHtml += "<tr><td>Subtract leave booked on " + formattedLeaveDate + "</td><td class='centerText " + this.evaluateCssClassByValue(-leaveInfo.LeaveItems[i].Units) + "'>-" + leaveInfo.LeaveItems[i].Units + "</td></tr>"
                }
            }
        }
        storyHtml += "<tfoot><tr><th>Total estimated leave available on " + formattedBalDate + "</th><th class='centerText " + this.evaluateCssClassByValue(totalAmount) + "'>" + totalAmount + "</th></tr> </tfoot>";


        storyHtml += "</table><br /></div>";

        return storyHtml;
    },
    initiateReasonSelector: function() {
        this.reasonSelector.set('html', '');
        this.def = new Element('option', { 'value': '0', 'html': '** Please select a leave type first **' }).inject(this.reasonSelector, 'top');
        this.reasonSelector.selectedIndex = 0;
    },
    
    setLeaveCode: function (leaveCode) {
        this.initiateReasonSelector();
        this.leaveCode = leaveCode;
        var inlineProjectionInfo = document.getElementById("inlineProjectionInfo");
        if (leaveCode) {
            if (inlineProjectionInfo) {
                if (!this.checkLeaveIsConfigured(leaveCode.LeaveCode, leaveCode.Description))
                {
                    inlineProjectionInfo.style.display = "none";
                }
            }

            if (leaveCode.Reasons) {
                Array.each(leaveCode.Reasons, function (leaveReason, index) {
                    this.option = new Element('option', { 'value': index, 'html': leaveReason.Description, 'id': leaveReason.ReasonCode }).inject(this.reasonSelector);
                }.bind(this));
            }

            if (this.editTimeButton) {
                this.editTimeButton.removeEvents();
                this.editTimeButton.destroy();
            }
            if (leaveCode.CanEditByDays) {
                if (!this.editTime)
                    this.editTime = new Element('div', { 'class': 'leave-time-button', 'style': 'text-align:right' }).inject(this.timeinputs);


                this.editTimeButton = new Element('span', {
                    'class': 'button blue',
                }).adopt(
                    new Element('span', {
                        'class': 'icon-pencil',
                    }),
                    new Element('span', {
                        'html': 'Edit'
                    })
                ).inject(this.editTime);


                this.editTimeButton.addEvent('click', function () {
                    this.editTimeModal();
                }.bind(this));
            }

            if (this.requiredReason) {
                this.requiredReason.destroy();
            }
            if (this.requiredAttachment) {
                this.requiredAttachment.destroy();
            }
            if (leaveCode.MandatoryReason) {
                this.requiredReason = new Element('span', { 'class': 'required', 'html': '*required' }).inject(this.reasonLabel, 'bottom');
            }
            if (leaveCode.MandatoryAttachment) {
                this.requiredAttachment = new Element('span', { 'class': 'required', 'html': '*required' }).inject(this.attachmentLabel, 'bottom');
            }
            
        } else {
            if (inlineProjectionInfo) {
                inlineProjectionInfo.style.display = "none";
            }
        }
        this.leaveUnits();
    },

    checkLeaveIsConfigured: function(leaveCode, leaveDescription){
        var description = leaveDescription.split("Leave ");
        var descriptionCharCheck = null;
        if (description.length > 1) {
            descriptionCharCheck = description[1];
        }
        if (!(this.nonconfiguredLeaveTypes.indexOf(descriptionCharCheck) > -1)) {
            return true;
        }
        return false;
    },

    generateCalendar: function (config) {
        var startDate = new Date();
        var endDate = new Date();

        this.dateBox = new Element('div', { 'class': 'leave-date-box' }).inject(this.dates);

        this.leaveStart = new Element('div', { 'class': 'leave-date leave-start' }).adopt(
            this.leaveStartLabel = new Element('div', { 'class': 'title', 'html': 'First Day' }),
            this.fromDateBox = new Element('div', { 'class': 'leave-date-picker selectable' }).adopt(
                this.leaveStartDay = new Element('div', { 'class': 'day' }),
                this.leaveStartDate = new Element('div', { 'class': 'date' }),
                this.leaveStartMonth = new Element('div', { 'class': 'month' }),
                this.leaveStartYear = new Element('div', { 'class': 'year' })
            )
        ).inject(this.dateBox);

        this.leaveStop = new Element('div', { 'class': 'leave-date leave-stop' }).adopt(
            this.leaveStopLabel = new Element('div', { 'class': 'title', 'html': 'Last Day' }),
            this.toDateBox = new Element('div', { 'class': 'leave-date-picker selectable' }).adopt(
                this.leaveStopDay = new Element('div', { 'class': 'day' }),
                this.leaveStopDate = new Element('div', { 'class': 'date' }),
                this.leaveStopMonth = new Element('div', { 'class': 'month' }),
                this.leaveStopYeah = new Element('div', { 'class': 'year' })
            )
        ).inject(this.dateBox);

        this.hiddenDateDiv = new Element('div', { 'class': 'hidden' }).inject(this.dates, 'top');
        this.hiddenDateDivFrom = new Element('div', { 'class': 'from-selector' }).inject(this.hiddenDateDiv);
        this.hiddenDateDivTo = new Element('div', { 'class': 'to-selector' }).inject(this.hiddenDateDiv);

        this.hiddenDateInputFrom = new Element('input', { 'type': 'text', 'id': 'apply-date-from', 'class': 'scaled data-hj-whitelist'}).inject(this.hiddenDateDivFrom);
        this.hiddenDateInputTo = new Element('input', { 'type': 'text', 'id': 'apply-date-to', 'class': 'scaled data-hj-whitelist' }).inject(this.hiddenDateDivTo);

        this.fromDateWidget = new UIDateTimeWidget({
            outputFormat: '%d.%m.%Y',
            displayFormat: '%a %e %b %Y',
            showCalendar: true,
            showTime: false,
            startDate: startDate.clone(),
            labelName: '',
            postId: '',
            postName: '',
            validationMethods: '',
            validationErrorStr: '',
            target: this.hiddenDateInputFrom
        });
        this.fromDateWidget.positionOverride = this.fromDateBox;
        this.fromDateWidget.addEvent('dateClicked', function (date) { // only update when date is clicked (IE: A new date is chosen)
            var fromDate = this.fromDateWidget.getRawDate().clone();
            var toDate = this.toDateWidget.getRawDate().clone();
            if (fromDate.greaterThan(toDate)) {
                this.fromDateWidget.setDate(fromDate);
                this.toDateWidget.setDate(fromDate);
            }
            Affinity.leave.setDates(this.fromDateBox, this.fromDateWidget.getRawDate());
            Affinity.leave.setDates(this.toDateBox, this.toDateWidget.getRawDate());
            this.leaveUnits();

            //this.validateTotalUnitsAppliedFor();
        }.bind(this));

        this.toDateWidget = new UIDateTimeWidget({
            outputFormat: '%d.%m.%Y',
            displayFormat: '%a %e %b %Y',
            showCalendar: true,
            showTime: false,
            startDate: endDate.clone(),
            labelName: '',
            postId: '',
            postName: '',
            validationMethods: '',
            validationErrorStr: '',
            target: this.hiddenDateInputTo
        });
        this.toDateWidget.positionOverride = this.toDateBox;
        this.toDateWidget.addEvent('dateClicked', function (date) { // only update when date is clicked (IE: A new date is chosen)
            var fromDate = this.fromDateWidget.getRawDate().clone();
            var toDate = this.toDateWidget.getRawDate().clone();
            if (toDate.lessThan(fromDate)) {
                this.fromDateWidget.setDate(toDate);
                this.toDateWidget.setDate(toDate);
            }
            Affinity.leave.setDates(this.fromDateBox, this.fromDateWidget.getRawDate());
            Affinity.leave.setDates(this.toDateBox, this.toDateWidget.getRawDate());
            this.leaveUnits();
            //this.validateTotalUnitsAppliedFor();
            
        }.bind(this));

        this.fromDateBox.addEvent(Affinity.events.click, function (e) {
            this.fromDateWidget.externalShow(e);
        }.bind(this));
        this.toDateBox.addEvent(Affinity.events.click, function (e) {
            this.toDateWidget.externalShow(e);
        }.bind(this));

        Affinity.leave.setDates(this.fromDateBox, startDate);
        Affinity.leave.setDates(this.toDateBox, endDate);

        this.timeinputs = new Element('div', { 'class': 'leave-time-inputs hidden' }).inject(this.dates, 'top');

        this.units = new Element('div', { 'class': 'leave-time-units' }).adopt(
            this.unitLabel = new Element('span', { 'class': 'title unit-label units', 'html': 'Total Hours ' }),
            this.unitInput = new Element('span', { 'class': 'units widget unit-input', 'id': '' })
        ).inject(this.timeinputs);
        this.leaveUnits();
    },
    validateTotalUnitsAppliedFor: function () {
        if (this.unitInput !== undefined &&
            this.unitInput !== null) {
            var vm = this;
            Affinity.leave.employee.getConfigWithHandle(function (data) {

                if (vm.timeinputs !== undefined &&
                    vm.timeinputs.hasClass('hidden')) {
                    vm.retainTotalUnitsAppliedFor = false;
                } else {
                    vm.retainTotalUnitsAppliedFor = true;
                }
                

                Affinity.leave.employee.config = data;

                if (vm.positionDescription) {
                    vm.positionDescription.destroy();
                }
                if (vm.positionSelector) {
                    vm.positionSelector.destroy();
                }

                var approvers = document.getElements('.leave-approver-box');
                if (approvers && approvers.length > 0) {
                    approvers.destroy();
                }

                vm.generatePositions(data.Positions);
                vm.leaveUnits();
                vm.leaveTypeMap = data.LeaveCodes.mapFromKey('LeaveCode');
                var previouslySelectedLeaveTypeIndex = vm.typeSelector.selectedIndex;
                vm.generateLeaveCodes(data.LeaveCodes);
                vm.typeSelector.selectedIndex = previouslySelectedLeaveTypeIndex;

                vm.clearBorderHilights();
                if (!vm.timeinputs.classList.contains("hidden")) {
                    var totalUnitsApplied = +vm.unitInput.get('id');
                    
                    vm.calculateLeaveAvailability(totalUnitsApplied);

                  
                }

            });


            
        }
       
    },
    editTimeModal: function () {
        if (this.leaveCode && (!this.employeeSelector || this.employeeSelector.selectedIndex > 0)) {
            Affinity.modal.show();
            Affinity.modal.clear();
            Affinity.modal.position();

            this.modalData = new Element('div', { 'class': 'modal-data', 'style': 'min-height: 120px; width: 700px;' });
            this.unitForm = new Element('div', { 'class': 'form-row' }).inject(this.modalData);
            this.unitsBox = new Element('div', { 'class': 'details-positions-box' }).inject(this.unitForm);
            this.units = new Element('div', { 'class': 'details-positions' }).inject(this.unitsBox, 'bottom');
            this.positionsLabels = new Element('div', { 'class': 'position-labels' }).inject(this.units);
            this.unitScrollerBox = new Element('div', { 'class': 'unit-scroller-box' }).inject(this.units);
            this.scroller = new Element('div', { 'class': 'details-units-scroller' }).inject(this.unitScrollerBox);

            this.updateButton = new Element('button', { 'class': 'grey', 'style': 'float:right;', 'html': 'Update' }).inject(this.unitForm);
            this.updateButton.addEvent(Affinity.events.click, function () { this.updatePosUnit() }.bind(this));

            //This modal thing is buggy
            (function () {
                    Affinity.modal.setElement(this.modalData)
                }.bind(this)).delay(200, this);

            this.edititableDates();
        }
    },

    edititableDates: function () {
        this.dataDateRange = [];
        this.currentDate = new Date(this.fromDateWidget.getRawDate());
        while (this.currentDate.lessThanOrEqualTo(this.toDateWidget.getRawDate())) {
            this.dataDateRange.push(this.currentDate.clone());
            this.currentDate.increment('day', 1);
        }
        this.updateEditableDays(this.dataDateRange);
    },

    updateEditableDays: function (dataDateRange) {
        //if (this.leaveCode && this.employeeSelector.selectedIndex > 0) {
            var employeeNum;
            var positionCode = false;
            if (this.isManager) {
                employeeNum = this.employeeSelector.getElements('option')[this.employeeSelector.selectedIndex].get('id');
                //leaveCode = Affinity.leave.manager.config.LeaveCodes[this.selectedType];
                positionCode = this.positionSelector ? this.positionSelector.getElements('option')[this.positionSelector.selectedIndex].get('id') : this.positionDescription.get('id');
            } else {
                employeeNum = Affinity.login.profile.employeeNumber;
                //leaveCode = Affinity.leave.employee.config.LeaveCodes[this.selectedType];
            }

            var startDate = this.fromDateWidget.getRawDate().format('%d-%b-%Y');
            var endDate = this.toDateWidget.getRawDate().format('%d-%b-%Y');
            this._dataDateRange = dataDateRange;
            this._methodName = 'ui.leave.apply.js -> updateEditableDays';
            var path = Affinity.leave.apiroot + 'CalculateLeaveUnits/' + employeeNum + '/' + startDate + '/' + endDate + '/' + this.leaveCode.LeaveCode;
            if (positionCode && positionCode != '-01')
                path = path + '?positionCode=' + encodeURIComponent(positionCode)
            this._api = Affinity.GetCacheSafePath(path);

            if (this.updateEditableDaysRequest && this.updateEditableDaysRequest.isRunning()) {
                this.updateEditableDaysRequest.cancel();
            }
            this.updateEditableDaysRequest.url = this.updateEditableDaysRequest.options.url = this._api;
            this.updateEditableDaysRequest.get();
        //}
        //else
        //    this.unitInput.set('html', '');
    },

    setUnitInputEvents: function (input, hoursInput, day, unit, unitType) {
        input.addEvent(Affinity.events.start, function (e) {
            e.target.store('initial-value', e.target.value);
        });
        input.addEvent('blur', function (e) {
            e.target.value = parseFloat(typeOf(parseFloat(e.target.value)) !== 'null' ? e.target.value : e.target.retrieve('initial-value')).toFixed(2);
            e.target.removeClass('error-border');

            var validation = input.retrieve('validation');
            if (validation) {
                validation.destroy();
                input.eliminate('validation');
            }

            var enableUpdateButton = true;
            var units = document.querySelectorAll('.edit-position-hours, .edit-position-days');
            Array.each(units, function (u) {
                if (u.retrieve('validation')) {
                    enableUpdateButton = false;
                    return;
                }
            }.bind(this));

            if (enableUpdateButton) {
                this.updateButton.set('disabled', null);
                this.updateButton.removeClass('disabled');
            }

            var maxUnit = 24;
            var unitLabel = '';
            if (unitType === 'H') {
                maxUnit = unit.MaxHours;
                unitLabel = ' hours';
            } else if (unitType === 'D') {
                maxUnit = 1;
                unitLabel = ' day';
            }

            if (e.target.value > maxUnit) {
                e.target.addClass('error-border');

                this.updateButton.set('disabled', 'disabled');
                this.updateButton.addClass('disabled');

                var validation = new Element('div', { 'class': 'form-row unit-validation' }).adopt(
                    new Element('span', { 'class': 'icon-warning' }),
                    new Element('span', {
                        'html': 'Please enter a value up to ' + maxUnit + unitLabel + ' on ' + Affinity.leave.cleanBadDate(day.Date).format('%d/%b/%y') + ' for ' + unit.PositionTitle + '.'
                    }));
                this.modalData.adopt(validation);
                input.store('validation', validation);
            } else {
                if (hoursInput) {
                    var schedHours = unit.HoursWorkScheduled;

                    if (!schedHours || schedHours <= 0)
                        schedHours = unit.HoursStandard;

                    if (schedHours > 0) {
                        hoursInput.set('value', (e.target.value * schedHours).toFixed(2));
                    }
                }
            }
        }.bind(this));
    },

    populateEditable: function (response, dataDateRange) {
        var scrollerWidth = 0;
        this.unitsGrid = new Element('div', { 'class': 'unit-grid' }).inject(this.scroller);
        this.gridHeader = new Element('div', { 'class': 'unit-gridheader' }).inject(this.unitsGrid);
        this.gridBody = new Element('div', { 'class': 'unit-gridbody' }).inject(this.unitsGrid);

        var tempDate, dateCell;
        Array.each(dataDateRange, function (day, index) {
            //new Element('div', { 'class': 'day-class', 'id': Date.parse(day).format('%d/%b/%y'), 'html': Date.parse(day).format('%d/%m/%y') }).inject(this.gridHeader);
            tempDate = Affinity.leave.cleanBadDate(day);
            dateCell = new Element('div', { 'class': 'day-class d-' + tempDate.format('%d-%b-%y'), 'id': tempDate.format('%d/%b/%y')/*, 'html': Date.parse(day).format('%d/%m/%y')*/ }).inject(this.gridHeader);
            dateCell.adopt(
                new Element('div', { 'class': 'day-class-day', 'html': tempDate.format('%a') }),
                new Element('div', { 'class': 'day-class-date', 'html': tempDate.format('%e') }),
                new Element('div', { 'class': 'day-class-my', 'html': tempDate.format('%b \'%y') }),
                new Element('div', { 'class': 'hol-icon icon-plane ui-has-tooltip' })
            );
            scrollerWidth += 79;
        }.bind(this));
        this.scroller.setStyle('width', scrollerWidth);
        this.scroller.store('scrollerWidth', scrollerWidth);

        if (typeOf(response.Data) === 'null') {
            var messages = [];
            Array.each(response.Messages, function (messageObj) {
                if (!messages.contains(messageObj.Message)) {
                    messages.push(messageObj.Message);
                }
            });
            uialert({
                'message': 'Oops! Something went wrong!<br />' + messages.join('<br />'),
                showButtons: true
            });
            Affinity.modal.hide();
            return;
        }

        this.days = response.Data.Days;
        this.savedData = this.data;
        Array.each(this.savedData, function (cheeseypoof, index) {
            Array.each(this.days, function (day, index) {
                if (cheeseypoof.Date === day.Date) {
                    Array.each(day.PositionUnits, function (posUnit, index) {
                        if (cheeseypoof.PositionCode === posUnit.PositionCode) {
                            posUnit.HoursAppliedFor = parseFloat(cheeseypoof.Hours);
                            posUnit.DaysAppliedFor = parseFloat(cheeseypoof.Days);
                            posUnit.WeeksAppliedFor = parseFloat(cheeseypoof.Weeks);
                        }
                    }.bind(this));
                }
            }.bind(this));
        }.bind(this));

        var fBuildUnits = function (position, dates, unitType) {
            var pos = new Element('div', {'class': 'position-label'}).inject(this.positionsLabels);
            var posTitle = new Element('div', { 'class': 'position-title' }).inject(pos);
            new Element('label', { 'html': position.get('html') }).inject(posTitle);

            var posDaysRow;
            var posHoursRow;

            if (unitType === 'H') {
                posHoursRow = new Element('div', { 'class': 'positions-hours', 'id': position.get('id') }).inject(this.gridBody);
            } else if (unitType === 'D') {
                posDaysRow = new Element('div', { 'class': 'positions-days', 'id': position.get('id') }).inject(this.gridBody);
                var unitLabels = new Element('div', { 'class': 'position-unit-label' }).inject(pos);
                new Element('label', { 'html': '(Days)', 'class': 'position-unit-days' }).inject(unitLabels);
                //new Element('label', { 'html': '(Hours)', 'class': 'position-unit-hours' }).inject(unitLabels);
            }

            var hours;
            var days;
            Array.each(dates, function (dayEl, index) {
                Array.each(this.days, function (day, index) {
                    var posDate = Affinity.leave.cleanBadDate(day.Date).format('%d/%b/%y');
                    var date = Affinity.leave.cleanBadDate(dayEl.get('id')).format('%d/%b/%y');
                    if (date === posDate) {
                        Array.each(day.PositionUnits, function (pUnit, Index) {
                            if (pUnit.PositionCode === position.get('id')) {
                                if (unitType === 'H') {
                                    hours = new Element('input', { 'class': 'edit-position-hours data-hj-whitelist', 'id': date, 'value': '0', 'type': 'text' }).inject(posHoursRow);
                                    hours.set('value', (pUnit.HoursAppliedFor || 0).toFixed(2));
                                    hours.store('old', (pUnit.HoursAppliedFor || 0).toFixed(2));
                                    this.setUnitInputEvents(hours, null, day, pUnit, 'H');
                                } else if (unitType === 'D') {
                                    days = new Element('input', { 'class': 'edit-position-days data-hj-whitelist', 'id': date, 'value': '0', 'type': 'text' }).inject(posDaysRow);
                                    days.set('value', (pUnit.DaysAppliedFor ? pUnit.DaysAppliedFor : 0).toFixed(2));
                                    days.store('old', (pUnit.DaysAppliedFor ? pUnit.DaysAppliedFor : 0).toFixed(2));
                                    this.setUnitInputEvents(days, hours, day, pUnit, 'D');
                                }

                                if (typeOf(day.IsPublicHoliday) === 'boolean' && day.IsPublicHoliday === true) {
                                    if (unitType === 'H') {
                                        hours.addClass('public-holiday').addClass('ui-has-tooltip').set('data-tooltip', day.PublicHolidayName).set('data-tooltip-dir', 'bottom,center');
                                    }
                                    
                                    if (unitType === 'D') {
                                        days.addClass('public-holiday').addClass('ui-has-tooltip').set('data-tooltip', day.PublicHolidayName).set('data-tooltip-dir', 'bottom,center');
                                    }
                                    this.unitsGrid.getElement('.day-class.d-' + posDate.replace(/\//gi, '-')).addClass('public-holiday').getElement('.hol-icon').set('data-tooltip', day.PublicHolidayName).set('data-tooltip-dir', 'bottom,center');
                                }
                            }
                        }.bind(this));

                        if (posHoursRow && !hours)
                            new Element('div', { 'class': 'edit-position-hours', 'id': date }).inject(posHoursRow);
                        if (posDaysRow && !days)
                            new Element('div', { 'class': 'edit-days-hours', 'id': date }).inject(posDaysRow);
                    }
                }.bind(this));
            }.bind(this));
        }.bind(this);
        
        if (this.leaveCode) {
            var unitType = this.leaveCode.UnitType;
            var dates = this.gridHeader.getElements('.day-class');
            if (this.positionSelector) {
                this.posies = this.positionSelector.getElements('option');
                this.selectedPos = this.positionSelector[this.positionSelector.selectedIndex];

                if (this.selectedPos.get('id') && this.selectedPos.get('id').toString() === '-01') {
                    Array.each(this.posies, function (pos, index) {
                        if (pos.get('id') != -01) {
                            fBuildUnits(pos, dates, unitType);
                        }
                    }.bind(this));
                } else {
                    fBuildUnits(this.selectedPos, dates, unitType);
                }
            } else {
                this.pos = this.position.getElement('.position');
                fBuildUnits(this.pos, dates, unitType);
            }
        }

        var containerSize = this.unitScrollerBox.measure(function () { return this.getSize().x; });
        var scrollerSize = this.scroller.measure(function () { return this.getScrollSize().x; });
        if (scrollerSize > containerSize) {
            this.unitScrollerBox.setStyle('overflow-x', 'scroll');
        } else {
            this.unitScrollerBox.setStyle('overflow-x', 'hidden');
        }

        Affinity.tooltips.processNew();
    },

    injectEdit: function () {


        if (!this.editTime && this.leaveCode) {
            var canEditByDays = this.leaveCode.CanEditByDays;
            if (canEditByDays) {
                this.editTime = new Element('div', { 'class': 'leave-time-button' }).inject(this.timeinputs);
                if (this.editTimeButton) {
                    this.editTimeButton.removeEvents();
                    this.editTimeButton.destroy();
                }
                this.editTimeButton = new Element('button', { 'class': 'blue edit-time', 'html': 'Edit' }).inject(this.editTime);
                this.editTimeButton.addEvent('click', function () {
                    this.editTimeModal();
                }.bind(this));
            }
        }
    },

    updatePosUnit: function () {
        if (!this.data)
            return;

        var fUpfatePosUnits = function(unitType) {
            var positions = document.getElements('.positions-' + unitType.toLowerCase());
            Array.each(positions, function (position, index) {
                var inputs = position.getElements('.edit-position-' + unitType.toLowerCase());
                Array.each(inputs, function (input, index) {
                    Array.each(this.data, function (unit, index) {
                        var inputDate = Affinity.leave.cleanBadDate(input.get('id')).format('%d/%b/%y');
                        var responseDate = Affinity.leave.cleanBadDate(unit.Date).format('%d/%b/%y');

                        if (inputDate === responseDate) {
                            if (unit.PositionCode === position.get('id')) {
                                unit[unitType] = parseFloat(input.value);
                            }
                        }
                    }.bind(this));
                }.bind(this));
            }.bind(this));           
        }.bind(this);

        fUpfatePosUnits('Hours');
        fUpfatePosUnits('Days');

        if (this.leaveCode) {
            var total = 0;
            var unitType = this.leaveCode.UnitType;
            Array.each(this.data, function (unit, index) {
                if (unitType === 'H') {
                    total += parseFloat(unit.Hours);
                } else if (unitType === 'D') {
                    total += parseFloat(unit.Days);
                    //SSL-1702 - Re-calculate the hours if it's in Days 
                    unit.Hours = unit.Hours * unit.Days;
                    
                } else if (unitType === 'W') {
                    total += parseFloat(unit.Weeks);
                }
            });

            this.unitInput.set('html', parseFloat(total).toFixed(2));
            this.unitInput.set('id', total);

            this.clearBorderHilights();
            this.calculateLeaveAvailability(total);

            //this.injectEdit();
            this.checkHours(this.data);
        }

        Affinity.modal.closeButtonCloser();
    },

    updateButtons: function (enable) {
        var toggleHideButtons = function (btn) {
            if (enable) {
                btn.set('disabled', null);
                btn.removeClass('disabled');
            } else {
                btn.set('disabled', 'disabled');
                btn.addClass('disabled');
            }
        };

        var buttons = this.buttons.getElementsByClassName('button');
        Array.each(buttons, toggleHideButtons);
        if (this.editTimeButton) {
            toggleHideButtons(this.editTimeButton);
        }
    },

    checkHours: function (data) {

        if (this.leaveCode) {
            var approverList = document.getElements('.leave-approver-box');
            var unitType = this.leaveCode.UnitType;
            var positionsArray = [];

            if ('Days' in data && typeOf(data.Days) === 'array') {
                Array.each(data.Days, function (day, index) {
                    Array.each(day.PositionUnits, function (position, index) {
                        var added = 0;
                        Array.each(positionsArray, function (savedPos, index) {
                            if (Object.contains(savedPos, position.PositionCode)) {
                                if (unitType === 'H') {
                                    savedPos.units += parseFloat(position.HoursAppliedFor ? position.HoursAppliedFor : 0);
                                } else if (unitType === 'D') {
                                    savedPos.units += parseFloat(position.DaysAppliedFor ? position.DaysAppliedFor : 0);
                                } else if (unitType === 'W') {
                                    savedPos.units += parseFloat(position.WeeksAppliedFor ? position.WeeksAppliedFor : 0);
                                }
                                added = 1;
                            }
                        });

                        if (added === 0) {
                            var pos = new Object();
                            pos.positionName = position.PositionCode;
                            if (unitType === 'H') {
                                pos.units = parseFloat(position.HoursAppliedFor ? position.HoursAppliedFor : 0);
                            } else if (unitType === 'D') {
                                pos.units = parseFloat(position.DaysAppliedFor ? position.DaysAppliedFor : 0);
                            } else if (unitType === 'W') {
                                pos.units = parseFloat(position.WeeksAppliedFor ? position.WeeksAppliedFor : 0);
                            }
                            positionsArray.push(pos);
                        }
                    });
                });
            } else {
                Array.each(data, function (day, index) {
                    var added = 0;
                    Array.each(positionsArray, function (savedPos, index) {
                        if (Object.contains(savedPos, day.PositionCode)) {
                            if (unitType === 'H') {
                                savedPos.units += day.Hours ? day.Hours : 0;
                            } else if (unitType === 'D') {
                                savedPos.units += day.Days ? day.Days : 0;
                            } else if (unitType === 'W') {
                                savedPos.units += day.Weeks ? day.Weeks : 0;
                            }

                            added = 1;
                        }
                    });

                    if (added === 0) {
                        var pos = new Object();
                        pos.positionName = day.PositionCode;

                        if (unitType === 'H') {
                            pos.units = day.Hours ? day.Hours : 0;
                        } else if (unitType === 'D') {
                            pos.units = day.Days ? day.Days : 0;
                        } else if (unitType === 'W') {
                            pos.units = day.Weeks ? day.Weeks : 0;
                        }

                        positionsArray.push(pos);
                    }
                });
            }

            Array.each(approverList, function (approver, index) {
                //approver.addClass('hidden');
                approver.getElement('.leave-approver-selector').addClass('hidden');
                if (approver.getParent().getElement('#hint-' + approver.get('id'))) {
                    approver.getParent().getElement('#hint-' + approver.get('id')).destroy();
                }
            });

            Array.each(positionsArray, function (position, index) {
                if (position.units > 0) {
                    Array.each(approverList, function (approver, index) {
                        if (approver.get('id') === position.positionName) {
                            //approver.removeClass('hidden');
                            approver.getElement('.leave-approver-selector').removeClass('hidden');
                            if (approver.getElement('.leave-approver-hint')) {
                                approver.getElement('.leave-approver-hint').destroy();
                            }
                        }
                    });
                } else {
                    Array.each(approverList, function (approver, index) {
                        if (approver.get('id') === position.positionName) {
                            if (!approver.getElement('.leave-approver-hint')) {
                                new Element('span', { 'class': 'leave-approver-hint' }).inject(approver);
                            }
                            approver.getElement('.leave-approver-hint').set('html', 'No hours assigned.');
                        }
                    });
                }
            });
        }
    },

    leaveUnits: function () {
        if (this.leaveCode) {
            var employeeNum;
            var startDate = this.fromDateWidget.getRawDate().format('%d-%b-%Y');
            var endDate = this.toDateWidget.getRawDate().format('%d-%b-%Y');

            if (this.isManager) {
                employeeNum = this.employeeSelector.getElements('option')[this.employeeSelector.selectedIndex].get('id');
                if (employeeNum > 0) {
                    var position = false;
                    Affinity.leave.manager.getManagerEmployeeConfig(employeeNum, function (empData) {
                        if (!empData.AllPositions) {
                            if (empData.Positions.length > 1) {
                                var select = new Element('select');
                                new Element('option', { 'html': '', 'value': 'none' }).inject(select);

                                Array.each(empData.Positions, function (posData)
                                {
                                    new Element('option', { 'html': posData.PositionTitle, 'value': posData.PositionCode }).inject(select);
                                });

                                uialert({
                                    message: 'Choose Position<br /><br />',
                                    showButtons: true,
                                    showCancel: true,
                                    onOk: function ()
                                    {
                                        var option = select.getElements('option')[select.selectedIndex];
                                        if (option.value !== 'none') {
                                            position = option.value;
                                            this.getLeaveUnits(employeeNum, this.leaveCode, startDate, endDate, position);
                                        }
                                        if (select.getWidget()) {
                                            select.getWidget().destroy();
                                        }
                                        select.destroy();
                                    }.bind(this),
                                    onCancel: function ()
                                    {
                                        if (select.getWidget()) {
                                            select.getWidget().destroy();
                                        }
                                        select.destroy();
                                    }
                                });
                                Affinity.prompts.adopt(select);
                            } else {
                                position = empData.Positions[0].PositionCode;
                                this.getLeaveUnits(employeeNum, this.leaveCode, startDate, endDate, position);
                            }
                        } else {
                            this.getLeaveUnits(employeeNum, this.leaveCode, startDate, endDate, false);
                        }
                    }.bind(this));
                }
            } else {
                employeeNum = Affinity.login.profile.employeeNumber;
                this.getLeaveUnits(employeeNum, this.leaveCode, startDate, endDate, false);
            }
        }
        else {
            this.timeinputs.addClass('hidden');
        }
    },

    getLeaveUnits: function (employeeNum, leaveObj, startDate, endDate, position) {
        this.clearBorderHilights(); 
        document.getElementById("outOfRangeInfo").style.display = "none"; 

        this._methodName = 'ui.leave.apply.js -> getLeaveUnits';
        var api = Affinity.leave.apiroot + 'CalculateLeaveUnits/' + employeeNum + '/' + startDate + '/' + endDate;

        if (leaveObj.LeaveCode) {
            api = api + '/' + leaveObj.LeaveCode;
        }
        if (position) {
            api = api + '?positionCode=' + encodeURIComponent(position);
        }
        this._api = Affinity.GetCacheSafePath(api);
        if (this.leaveUnitsRequest && this.leaveUnitsRequest.isRunning()) {
            this.leaveUnitsRequest.cancel();
        }
        this.leaveUnitsRequest.url = this.leaveUnitsRequest.options.url = this._api;
        this.leaveUnitsRequest.send();
        var startDateParsed = Date.parse(startDate.replace(/-/g, ' '));
        if (!startDateParsed || typeOf(startDateParsed) !== 'date' || !startDateParsed.isValid()) {
            document.getElementById("inlineProjectionInfo").style.display = "none";
            return false;
        }
        if (startDateParsed.lessThan(new Date())) {
            document.getElementById("inlineProjectionInfo").style.display = "none";
            return false;
        } else if (startDateParsed.greaterThan(new Date(new Date().setFullYear(new Date().getFullYear() + 1)))) {
            document.getElementById("inlineProjectionInfo").style.display = "none";
            if (this.checkLeaveIsConfigured(leaveObj.LeaveCode, leaveObj.Description)) {
                document.getElementById("outOfRangeInfo").style.display = "inline-block"; 
            }
            return false;
        }
        //Project leave at this point if it is projectable
        if (this.checkLeaveIsConfigured(leaveObj.LeaveCode, leaveObj.Description)) {
            this.leaveProjectionRequest(employeeNum, leaveObj.LeaveCode, endDate);
        }
    },

    leaveProjectionRequest: function (employeeNum, leaveCode, startDate) {
        this.ealProjectionReturned = false;
        this._methodName = 'ui.leaveBalances.js -> projectBalances';
        var api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'EmployeeLeaveBalance/' + employeeNum);
        api = this.addToApiUrl(api, 'dateTo=' + startDate);
        api = this.addToApiUrl(api, 'leaveCode=' + leaveCode);
        if (this.isManager) {
            api = this.addToApiUrl(api, 'tsGroupIdToIgnore=');
            api = this.addToApiUrl(api, 'firstPerson=' + "false");
        }
        this._api = api;
        if (this.projectBalanceRequest && this.projectBalanceRequest.isRunning()) {
            this.projectBalanceRequest.cancel();
        }
        this.projectBalanceRequest.url = this.projectBalanceRequest.options.url = this._api;
        this.projectBalanceRequest.get();
    },

    processUnits: function (data) {
        if (typeOf(data) === 'null') {
            uialert({
                message: "This user is not setup to process leave totals",
                showButtons: true,
                canClose: true
            });
            return false;
        }

        var unitType = 'H';
        if (this.leaveCode)
            unitType = this.leaveCode.UnitType;
        else
            return;

        if (unitType === 'H') {
            this.unitLabel.set('html', 'Total Hours ');
        } else if (unitType === 'D') {
            this.unitLabel.set('html', 'Total Days ');
        } else if (unitType === 'W') {
            this.unitLabel.set('html', 'Total Weeks ');
        }

        var unitsAppFor = 0;
        var isMultiposition = document.getElements('.leave-position-selector').length > 0;
        Array.each(data.Days, function (day, index) {
            if (isMultiposition) {
                Array.each(day.PositionUnits, function (position, index) {
                    var approverDropDowns = document.getElements('.leave-position-selector');
                    Array.each(approverDropDowns, function (selected, index) {
                        var approverIndex = selected.selectedIndex;

                        var select = selected[approverIndex].get('id');
                        if (select != -1) {
                            if (position.PositionCode === select) {
                                if (unitType === 'H') {
                                    unitsAppFor += parseFloat(position.HoursAppliedFor ? position.HoursAppliedFor : 0);
                                } else if (unitType === 'D') {
                                    unitsAppFor += parseFloat(position.DaysAppliedFor ? position.DaysAppliedFor : 0);
                                } else if (unitType === 'W') {
                                    unitsAppFor += parseFloat(position.WeeksAppliedFor ? position.WeeksAppliedFor : 0);
                                }
                            }
                        } else {
                            if (unitType === 'H') {
                                unitsAppFor = parseFloat(data.TotalHoursAppliedFor);
                            } else if (unitType === 'D') {
                                unitsAppFor = parseFloat(data.TotalDaysAppliedFor);
                            } else if (unitType === 'W') {
                                unitsAppFor = parseFloat(data.TotalWeeksAppliedFor);
                            }
                        }
                    });
                });
            } else {
                if (document.getElement('.position').get('id')) {
                    Array.each(day.PositionUnits, function (position, index) {
                        var select = document.getElement('.position').get('id');
                        if (position.PositionCode === select) {
                            if (unitType === 'H') {
                                unitsAppFor += parseFloat(position.HoursAppliedFor ? position.HoursAppliedFor : 0);
                            } else if (unitType === 'D') {
                                unitsAppFor += parseFloat(position.DaysAppliedFor ? position.DaysAppliedFor : 0);
                            } else if (unitType === 'W') {
                                unitsAppFor += parseFloat(position.WeeksAppliedFor ? position.WeeksAppliedFor : 0);
                            }
                        }
                    });
                }
            }
            this.unitInput.set('html', parseFloat(unitsAppFor).toFixed(2));
            this.unitInput.set('id', unitsAppFor);
            this.unitInput.set('value', unitsAppFor);       
            //Trigger projection availability calculation logic if it is configured
            if (this.checkLeaveIsConfigured(this.leaveCode.LeaveCode, this.leaveCode.Description)) {
                this.calculateLeaveAvailability(unitsAppFor);
            }
        }.bind(this));

        return true;
    },

    calculateLeaveAvailability: function (unitsAppFor) {
        var currentUnitsBal = 0;
        var config = this.isManager ? this.Employees[this.employeeSelector[this.employeeSelector.selectedIndex].get('value') - 1]
            : Affinity.leave.employee.config;
        var hoursOverLimit = null;
        var leaveAppValid = true;
        var leaveLimitType = null;
        var projectedUnitsBal = 0;
        var actionOverLimit = null;
        if (this.ealProjectionReturned) { //Need to know employee number here.. this.currentEmpBalances
            this.leaveAvailabilityCounter = 0;
            if (this.ealInfo.UnitType == "H") {
                projectedUnitsBal = this.ealInfo.TotalHours;
            } else {
                projectedUnitsBal = this.ealInfo.TotalDays;
            }
            for (var i = 0; i < config.LeaveCodes.length; i++) {
                if (config.LeaveCodes[i].LeaveCode == this.ealInfo.LeaveCode) {
                    currentUnitsBal = config.LeaveCodes[i].CurrentUnitsBal;
                    hoursOverLimit = config.LeaveCodes[i].HoursOverLimit;
                    leaveLimitType = config.LeaveCodes[i].LeaveLimitType;
                    actionOverLimit = config.LeaveCodes[i].ActionOverLimit;
                    break;
                }
            }
            if (hoursOverLimit != null && leaveLimitType != null ) {
                switch (leaveLimitType) {
                    case "CurrentBalance":
                        if (unitsAppFor > (currentUnitsBal + hoursOverLimit)) {
                            leaveAppValid = false;
                        }
                        break;
                    case "ProjectedBalance":
                        if (unitsAppFor > (projectedUnitsBal + hoursOverLimit)) {
                            leaveAppValid = false;
                        }
                        break;
                    case "FixedLimit":
                        if (unitsAppFor > hoursOverLimit) {
                            leaveAppValid = false;
                        }
                        break;
                    default:
                        leaveAppValid = true;
                        break;
                }
            }
            var datePickers = document.getElementsByClassName("leave-date-picker");
            var limitClass = actionOverLimit == "Error" ? "redBorderHilight" : "orangeBorderHilight";
            for (var i = 0; i < datePickers.length; i++) {
                if (!leaveAppValid) {
                    datePickers[i].classList.add(limitClass);
                } 
            }
        } else {
            if (this.leaveAvailabilityCounter < 5000) {
                this.leaveAvailabilityCounter++;
                setTimeout(function () {
                    //Waiting for the leave projection to return here...
                    //Retry until timeout or the projection is returned...
                    this.calculateLeaveAvailability(unitsAppFor);
                }.bind(this), 100);
            }
        }
    },
    clearBorderHilights: function () {
        var datePickers = document.getElementsByClassName("leave-date-picker");
        for (var i = 0; i < datePickers.length; i++) {
            datePickers[i].classList.remove("redBorderHilight");
            datePickers[i].classList.remove("orangeBorderHilight");
        }
    },
    addToApiUrl: function (api, value) {
        if (api.indexOf('?') > -1) {
            api += '&';
        } else {
            api += '?';
        }
        api += value;
        return api;
    },

    createResponseField: function (data) {

        this.data = null;
        if (this.leaveCode) {
            var unitType = this.leaveCode.UnitType;
        }
        else {
            return;
        }

        var isMultiposition = document.getElements('.leave-position-selector').length > 0;
        var saveMe = [];

        var addDay = function (day, position) {

            var dayObject = new Object();
            dayObject.Date = day.Date;
            dayObject.PositionCode = position.PositionCode;

            dayObject.Hours = position.HoursAppliedFor ? position.HoursAppliedFor : 0;
            if (unitType === 'D') {
                dayObject.Days = position.DaysAppliedFor ? position.DaysAppliedFor : 0;
            }

            if (typeof (dayObject) != 'undefined' || dayObject != null) {
                saveMe.push(dayObject);
            }
        };

        var positionSelected = -1;
        if (isMultiposition) {
            var positionSelector = document.getElement('.leave-position-selector');
            positionSelected = positionSelector[positionSelector.selectedIndex].get('id');
        }

        Array.each(data.Days, function (day, index) {
            Array.each(day.PositionUnits, function (position, index) {
                if (positionSelected == -1 || position.PositionCode === positionSelected) {
                    addDay(day, position);
                }
            }.bind(this));
        }.bind(this));

        this.data = saveMe;
    },

    generateAttachments: function () {
        this.attachWidgetDiv = new Element('div', {
            'class': 'uploadmulti ',
            'data-question-name': 'docs'
        });

        this.attachment.adopt(
            this.attachmentLabel = new Element('label', {
                'html': 'Attach Files '
            }).adopt(
                new Element('span', {
                    'class': 'indicator grey help print-hidden ui-has-tooltip',
                    'html': '?',
                    'data-tooltip': 'Attach Medical Certificate or ACC forms'
                })
            ),

            this.attachWidgetDiv.adopt(
                new Element('input', {
                    'type': 'file'
                }),
                new Element('input', {
                    'type': 'hidden',
                    'class': 'initialValues'
                })
            )
        );

        new UIUplaodersMulti({
            maxsize: 20963328 /* 19.99 MB */
        });

        window.addEvent('multiFileTooLarge', this.fileTooLarge);
    },

    fileTooLarge: function (data) {

        var maxsize = (data.maxsize / 1024 / 1024).round(2);
        var size = (data.size / 1024 / 1024).round(2);

        window.uialert({
            message: 'You can only attach a document that is less than 20MB in size. Please try again.'
        });


    },

    generateApplyButtons: function () {
        if (this.buttons) {
            new Element('label').inject(this.buttons);

           // var resetButton = new Element('span', { 'class': 'button grey icon-cross', 'html': 'Clear' }).inject(this.buttons);

            var resetButton = new Element('span', {
                'class': 'button grey',
            }).adopt(
                new Element('span', {
                    'class': 'icon-cross',
                }),
                new Element('span', {
                    'html': 'Clear'
                })
            ).inject(this.buttons);


            resetButton.addEvent(Affinity.events.click, this.resetForm);

            //if (!this.isManager) {
            //    var saveButton = new Element('span', { 'class': 'button blue w-icon', 'html': 'Save', 'style': 'margin-left: 10px;' }).inject(this.buttons);
            //    saveButton.addEvent(Affinity.events.click, function () { this.submit(-1) }.bind(this));
            //}

            //var submitButton = new Element('span', { 'class': 'button green w-icon', 'html': 'Submit', 'style': 'margin-left: 10px;' }).inject(this.buttons);

            var submitButton = new Element('span', {
                'class': 'button green',
                'style': 'margin-left:10px;'
            }).adopt(
                new Element('span', {
                'class': 'icon-paperplane',
                }),
                new Element('span', {
                    'html': 'Submit'
                })
            ).inject(this.buttons);



            submitButton.addEvent(Affinity.events.click, function () { this.submit(0) }.bind(this));

            if (this.isManager) {
                var approveButton = new Element('span', {
                    'class': 'button green w-icon-only',
                    'style': 'margin-left: 10px;'
                }).adopt(
                    new Element('span', { 'html': Affinity.icons.ThumbsUp }),
                    new Element('span', { 'html': 'Approve' })
                ).inject(this.buttons);


                approveButton.addEvent(Affinity.events.click, function () { this.submit(3) }.bind(this));
            }
        }
    },

    acknowledgementModal: function (response, autoclose) {
        Affinity.modal.show();
        Affinity.modal.clear();
        Affinity.modal.position();

        var modalData = new Element('div', { 'class': 'modal-data', 'style': 'width:700px;' });
        var header = new Element('div', { 'class': 'acknowledgement-header' }).inject(modalData);
        var content = new Element('div', { 'class': 'acknowledgement-content' }).inject(modalData);
        var errors = new Element('div').inject(modalData);
        var eList = new Element('ul').inject(errors);
        var warnings = new Element('div').inject(modalData);
        var wList = new Element('ul').inject(warnings);
        //var header = new Element('div', { 'class': 'acknowledgement-header' }).adopt(
        //    new Element('span', { 'class': '', 'html': 'You have applied for:<br /><br />' })
        //).inject(modalData);
        if (response.Messages.length > 0) {
            Array.each(response.Messages, function (message, index) {
                if (message.MessageType === 1) {
                    new Element('li', { 'html': message.Message }).inject(wList);
                    warnings.addClass('acknowledgement-warnings');
                }
                if (message.MessageType === 0) {
                    new Element('li', { 'html': message.Message }).inject(eList);
                    errors.addClass('ackfnowledgement-errors');
                }
            });
        }

        if (autoclose) {
            var autoCloseTimer = null;
            var autoCloseCounter = 5;
            var bntWrap = new Element('div', { 'class': 'modal-button-ok' }).inject(modalData);
            var closeAcknowledgePrompt = function () {
                Affinity.modal.clear();
                Affinity.modal.hide();
                clearInterval(autoCloseTimer);
                autoCloseTimer = null;
            }
            var btnOk = new Element('span', {
                'class': 'button blue',
                'html': 'OK (' + autoCloseCounter + ')',
                'events': {
                    'click': function(){
                        closeAcknowledgePrompt();
                    }
                }
            });
            btnOk.inject(bntWrap);
            autoCloseTimer = window.setInterval(function () {
                autoCloseCounter -= 1;
                if (autoCloseCounter == 0) {
                    closeAcknowledgePrompt();
                }
                btnOk.textContent = 'OK (' + autoCloseCounter + ')';
            }, 1000)
        }

        if (response.Exception != null) {
            errors.addClass('acknowledgement-errors');
            errors.set('html', response.Exception);
        } else {
            //content.set('html', response.Response);
            content.set('html', Affinity.leave.cleanResponse(response.Response));
        }

        Affinity.modal.setElement(modalData);
        Affinity.modal.show();
    },
    hasAttachedFiles: function () {
        var attachmentDetails = document.getElementsByClassName('details-attachments');
        if (attachmentDetails &&
            attachmentDetails.length > 0) {
            var attachments = attachmentDetails[0].getElements('li');
            if (attachments !== undefined &&
                attachments.length > 0) {
                return true;
            }
        } else {
            var attachmentDetails = document.getElementsByClassName("upload-table");
            if (attachmentDetails &&
                attachmentDetails.length > 0) {

                for (var i = 0; i < attachmentDetails.length; i++) {
                    var hasHiddenClass = attachmentDetails[i].hasClass("hidden");
                    if (!hasHiddenClass) {
                        var table = attachmentDetails[i].getElement("table");
                        if (table) {
                            var rows = table.getElements("tbody tr");
                            if (rows &&
                                rows.length > 0) {
                                return true;
                            }
                        }
                    }
                }

                var attachments = attachmentDetails[0].getElements('li');
                if (attachments !== undefined &&
                    attachments.length > 0) {
                    return true;
                }
            }
        }
        return false;
    },
    isAttachmentMandatoryForLeaveType: function () {

        var isAttachmentMandatory = false;

        var leaveCodes = null;
        if (this.isManager &&
            Affinity.leave.manager) {
            if (Affinity.leave.manager.config !== undefined &&
                Affinity.leave.manager.config.Employees !== undefined) {
                var employees = Affinity.leave.manager.config.Employees;

                
                for (var i = 0; i < employees.length; i++) {
                    if (employees[i].LeaveCodes !== undefined) {
                        leaveCodes = employees[i].LeaveCodes;
                        break;
                    }
                }
            } else if (this.config) {
                leaveCodes = this.config.LeaveCodes;
            }

        } else {
            if (Affinity.leave.employee.config !== undefined &&
                Affinity.leave.employee.config.LeaveCodes !== undefined) {
                leaveCodes = Affinity.leave.employee.config.LeaveCodes;
            }
            else {
                leaveCodes = this.config.LeaveCodes;
            }

        }

        if (leaveCodes) {
     

            var typeSelector = document.getElementsByClassName("leave-type-selector")[0];
            if (typeSelector) {
            var selectedLeaveType = typeSelector.getElement('option:selected').get('id');

            for (var i = 0; i < leaveCodes.length; i++) {
                var leaveCode = leaveCodes[i].LeaveCode;
                if (selectedLeaveType === leaveCode) {
                    isAttachmentMandatory = leaveCodes[i].MandatoryAttachment;
                    break;
                }
            }

            }

        }

        return isAttachmentMandatory;

    },
    validateAttachmentRequirement: function () {
        if (!this.hasAttachedFiles() && this.isAttachmentMandatoryForLeaveType()) {
            return false;
        }
        return true;
    },
    submit: function (statusCode) {
        var employeeNum;


        if (!this.validateAttachmentRequirement()) {
            uialert({
                message: 'You must attach supporting documentation when applying for this type of leave.',
                showLoader: false,
                showButtons: true,
                noClose: false
            });

            return;
        }


        if (this.isManager) {
            employeeNum = this.employeeSelector.getElements('option')[this.employeeSelector.selectedIndex].get('id');
        }
        else {
            employeeNum = Affinity.login.profile.employeeNumber;
        }
        if (!employeeNum) {
            uialert({
                message: 'Oops! You forgot to chose an employee.',
                showButtons: true,
                noClose: false,
                showLoader: false
            });
            return;
        }

        if (!this.leaveCode) {
            uialert({
                message: 'Oops! You forgot to chose a leave type.',
                showButtons: true,
                noClose: false,
                showLoader: false
            });
            return;
        }

        var leaveReason = this.reasonSelector[this.reasonSelector.selectedIndex].get('id');
        if (this.leaveCode.MandatoryReason) {
            if (typeOf(leaveReason) === 'null' || leaveReason === 'null' || leaveReason === '') {
                uialert({
                    message: 'Oops! You forgot to chose a leave reason.',
                    showButtons: true,
                    noClose: false,
                    showLoader: false
                });
                return;
            }
        }

        var units = this.data;
        var finalUnits = [];
        var total = 0;
        var unitType = this.leaveCode.UnitType;
        var unitLabel = 'hours';
        if (unitType == 'D') {
            unitLabel = 'days';
        }

        Array.each(units, function (position, index) {
            if (unitType == 'D') {
                total += parseFloat(position.Days);
            }
            else {
                total += parseFloat(position.Hours);
            }
            if (position.Hours > 0 || position.Days > 0) {
                finalUnits.push(position);
            }
        });

        if (total == 0) {

            var action = 'save';
            switch (statusCode) {
                case 0:
                    action = 'submit';
                    break;
                case 3:
                    action = 'approve';
                    break;
            }

            uialert({
                message: '<span class="icon-warning"></span> You can\'t ' + action + ' leave for <b>zero ' + unitLabel + '</b>. Please try again.',
                showButtons: true,
                noClose: false,
                showLoader: false
            });
            return;
        }

        var approvers = [];
        var approverDropDowns = document.getElements('.leave-approver-selector');
        var hiddenApproverDropDowns = document.getElements('.leave-approver-selector.hidden');
        var validApproverDropDowns = approverDropDowns.filter(function (x) { return hiddenApproverDropDowns.indexOf(x) < 0 })
        var approverFail = false;
        Array.each(validApproverDropDowns, function (selected, index) {
            if (selected.getElements('option').length === 0) {
                approverFail = true;
            } else {
                var objj = new Object();
                objj.PositionCode = selected.get('id');
                if (typeOf(selected.selectedIndex) === 'number' && selected.selectedIndex > -1) {
                    var approverIndex = selected.selectedIndex;
                    try {
                        objj.SubmittedTo = selected[approverIndex].get('id');
                        approvers.push(objj);
                    } catch (e) {
                        approverFail = true;
                    }
                } else {
                    approverFail = true;
                }
            }
        });
        if (approverFail) {
            uialert({
                message: 'Oops! Something went wrong!<br />It would appear there are no valid approvers to choose from.<br />The Leave configuration may be faulty.<br />Please contact your administrator.',
                showLoader: false,
                showButtons: true,
                noClose: false
            });
            return;
        } else {
            if (this.approverSelector !== undefined &&
                this.approverSelector !== null &&
                this.approverSelector.selectedIndex !== undefined &&
                this.approverSelector.selectedIndex !== null &&
                this.approverSelector.selectedIndex >= 0 &&
                this.approverSelector[this.approverSelector.selectedIndex].innerHTML !== undefined &&
                this.approverSelector[this.approverSelector.selectedIndex].innerHTML === '') {
                uialert({
                    message: 'Oops! You forgot to chose an approver.',
                    showButtons: true,
                    noClose: false,
                    showLoader: false
                });
                return;
            }
        }

        var positionKey = null;
        if (document.getElement('.position')) {
            positionKey = document.getElement('.position').get('id');
        } else if (document.getElement('.leave-position-selector')) {
            var positionIndex = document.getElement('.leave-position-selector').selectedIndex;
            if (positionIndex === 0) {
                positionKey = null;
            } else {
                positionKey = document.getElement('.leave-position-selector')[positionIndex].get('id');
            }
        }

        var obj = new Object();
        var attachments = document.getElements('.uploadmulti label input');
        if (attachments.length > 0) {
            Array.each(attachments, function (attachment, index) {
                if (!attachment.hasClass('initialValues')) {
                    if (attachment.files.length > 0 && attachment.value !== '') {
                        obj.HasAttachment = true;
                    }
                }
            });
        }

        obj.EmployeeNo = employeeNum;
        obj.PositionCode = positionKey;
        obj.LeaveCode = this.leaveCode.LeaveCode;
        obj.DateFrom = this.fromDateWidget.getRawDate().format('%d/%b/%Y');
        obj.DateTo = this.toDateWidget.getRawDate().format('%d/%b/%Y');
        obj.ReasonCode = leaveReason;
        obj.TotalUnits = this.unitInput.get('id');
        obj.SubmittedBy = Affinity.login.profile.employeeNumber;
        obj.Authorisations = approvers;
        obj.Comment = this.commentBox.value;
        obj.StatusCode = statusCode;
        obj.UnitType = this.leaveCode.UnitType;
        obj.Reply = null;
        obj.Units = finalUnits;

        this._methodName = 'ui.leave.apply.js -> submit';

        this._api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'LeaveApplication/' + obj.EmployeeNo);
        if (this.sendApplicationRequest && this.sendApplicationRequest.isRunning()) {
            this.sendApplicationRequest.cancel();
        }
        this.sendApplicationRequest.url = this.sendApplicationRequest.options.url = this._api;
        this.sendApplicationRequest.post(JSON.stringify(obj));
    },

    resetForm: function () {
        var today = new Date();
        this.fromDateWidget.setDate(today);
        this.toDateWidget.setDate(today);
        document.getElements('.ui-calendar').getElements('.ui-calendar-day.selected')[1].removeClass('selected');
        Affinity.leave.setDates(this.fromDateBox, today);
        Affinity.leave.setDates(this.toDateBox, today);

        //this.leaveUnits();
        this.unitInput.set('html', '');
        if (this.employeeSelector) {
            this.employeeSelector.selectedIndex = 0;
        }
        if (this.employeeSelectorAutocomplete) {
            this.employeeSelectorAutocomplete.setValue('0');
        }
        if (this.positionSelector) {
            this.positionSelector.selectedIndex = 0;
        }
        if (this.typeSelector) {
            this.typeSelector.selectedIndex = 0;
        }
        if (this.reasonSelector) {
            this.reasonSelector.set('html', '');
            this.def = new Element('option', { 'value': '0', 'html': '** Please select a leave type first **' }).inject(this.reasonSelector, 'top');
        }
        if (this.approvers) {
            var approverDropDowns = document.getElements('.leave-approver-selector');
            Array.each(approverDropDowns, function (selected, index) {
                selected.selectedIndex = 0;
            });
        }
        if (this.requiredReason) {
            this.requiredReason.destroy();
        }
        if (this.requiredAttachment) {
            this.requiredAttachment.destroy();
        }
        if (this.attachWidgetDiv) {
            Affinity.uploaders.reset(this.attachWidgetDiv);
            Affinity.uploaders.setMaxSize(20963328); //19.99MB
        }
        if (this.commentRow) {
            this.commentBox.value = '';
        }

        if (this.isManager)
            this.position.addClass('hidden');

        this.timeinputs.addClass('hidden');
    },

    reset: function () {
        //if (this.leaveConfigRequest && this.leaveConfigRequest.isRunning()) {
        //    this.leaveConfigRequest.cancel();
        //}
        if (this.updateEditableDaysRequest && this.updateEditableDaysRequest.isRunning()) {
            this.updateEditableDaysRequest.cancel();
        }
        if (this.leaveUnitsRequest && this.leaveUnitsRequest.isRunning()) {
            this.leaveUnitsRequest.cancel();
        }
        //if (this.deleteAttachmentRequest && this.deleteAttachmentRequest.isRunning()) {
        //    this.deleteAttachmentRequest.cancel();
        //}
        if (this.sendApplicationRequest && this.sendApplicationRequest.isRunning()) {
            this.sendApplicationRequest.cancel();
        }
        //this.resetForm();
    },

    destroy: function () {
        //window.removeEvent('multiFileDeleted', this.deleteAttachmentEvent);
        this.reset();
        //manager 
        if (this.employeeSelector) { this.employeeSelector.removeEvents(); }
        if (this.employeeSelectorAutocomplete) { this.employeeSelectorAutocomplete.destroy(); }

        if (this.title)
            this.title.removeEvents();
        if (this.positionSelector) { this.positionSelector.removeEvents(); }
        if (this.typeSelector) { this.typeSelector.removeEvents(); }
        if (this.editTimeButton) { this.editTimeButton.removeEvents(); }
        if (this.updateButton) { this.updateButton.removeEvents(); }

        if (this.fromDateWidget) { this.fromDateWidget.removeEvents(); }
        if (this.toDateWidget) { this.toDateWidget.removeEvents(); }
        if (this.fromDateBox) { this.fromDateBox.removeEvents(); }
        if (this.toDateBox) { this.toDateBox.removeEvents(); }
        if (this.fromDateWidget) { this.fromDateWidget.destroy(); }
        if (this.toDateWidget) { this.toDateWidget.destroy(); }
        if (this.section) {
            Array.each(this.section.getElements('.button'), function (el) { el.removeEvents(); });
            Array.each(this.section.getElements('input'), function (el) { el.removeEvents(); });
            this.section.empty();
        }
        Object.each(this, function (val, key) {
            this[key] = null;
            delete this[key];
        }.bind(this));
    }
});

var UILeaveDetail = new Class({

    Implements: [Options, Events],

    State: ['Closed', 'View', 'Edit'],

    Binds: [
        'getDetail',
        'viewDetail',
        'editDetail',
        'doEditDetail',
        'tryCreateAuditLogForImportedLeave',
        'initializeSubmitLeaveRequest',
        'getLeaveStatusWhereForwardToIsNotAllowed',
        'toHideForwardToBasedFromLeaveInstance',
        'createCommentReplyEdits',
        'createButtons',
        'createEditableDates',
        'newLeaveReason',
        'setStartDate',
        'setEndDate',

        'setUnitInputEvents', // this needs to be merged between the detail and apply version
        'buildUnitsTotals',
        'populateForwardHistory',

        'updateDate',
        'updateUnits',
        'doUpdateUnits',

        'updateAuthoriser',
        'doUpdateAuthoriser',
        'deleteAttachment',
        'postAttachments',
        'deleteLeave',
        'submitLeave',

        'acknowledgementModal',

        'reset', 'destroy'
    ],

    options: {
        target: null,
        isManager: false
    },

    initialize: function (options) {
        this.setOptions(options);
        this.target = this.options.target;
        this.isManager = this.options.isManager ? true : false;

        /*      Requests        */
        this.leaveDetailRequest = new Request.JSON({
            onRequest: function () {
                Affinity.leave.lockui('leaveDetail-leaveDetailRequest');
            },
            onFailure: function (e) {
                Affinity.leave.unlockui('leaveDetail-leaveDetailRequest');
                prompts.hide();
                Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
            },
            onException: function () {
                Affinity.leave.unlockui('leaveDetail-leaveDetailRequest');
            },
            onCancel: function () {
                Affinity.leave.unlockui('leaveDetail-leaveDetailRequest');
            },
            onSuccess: function (response) {
                Affinity.leave.unlockui('leaveDetail-leaveDetailRequest');
                if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName)) {
                    this.data = response.Data;
                    this.timeLastModified = this.data.LeaveHeader.TimeLastModified ? Date.parse(this.data.LeaveHeader.TimeLastModified) : null;
                    this.requireUpdate = false;
                    this.viewDetail();
                    prompts.hide();
                }
            }.bind(this)
        });


        this.tryCreateActivityLogRequest = new Request.JSON({
            onSuccess: function (response) {

            }.bind(this)
        });

        this.updateUnitsRequest = new Request.JSON({
            method: 'post',
            emulation: false,
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            urlEncoded: false,
            onRequest: function () {
                Affinity.leave.lockui('leaveDetail-updateUnitsRequest');
            },
            onFailure: function (e) {
                Affinity.leave.unlockui('leaveDetail-updateUnitsRequest');
                Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
            },
            onException: function () {
                Affinity.leave.unlockui('leaveDetail-updateUnitsRequest');
            },
            onCancel: function () {
                Affinity.leave.unlockui('leaveDetail-updateUnitsRequest');
            },
            onSuccess: function (response) {
                Affinity.leave.unlockui('leaveDetail-updateUnitsRequest');
                if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName, true)) {
                    var newTimeStamp = this.data.LeaveHeader.TimeLastModified ? Date.parse(this.data.LeaveHeader.TimeLastModified) : null;
                    if (Affinity.leave.manager) {
                        this.requireUpdate = this.requireUpdate || response.RequireUpdate;
                        if (!this.requireUpdate && (!this.timeLastModified || newTimeStamp.getTime() > this.timeLastModified.getTime()))
                            this.timeLastModified = newTimeStamp;
                    }
                    this.data = response.Data;
                    this.buildUnitsTotals(this.data.Components);
                    this.createApproverBoxes(this.data.Components, this.positions);
                    this.createEditableDates(this.data.LeaveHeader, this.data.Components, this.positions);
                    Affinity.tooltips.processNew();

                    if (this.isManager) {
                        Affinity.leave.manager.refreshAll();
                    } else {
                        Affinity.leave.employee.refreshAll();
                    }
                }
                prompts.hide();
                this.errorChecking(response);
            }.bind(this)
        });

        if (this.isManager) {
            this.bossResponseRequest = new Request.JSON({
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                urlEncoded: false,
                onRequest: function () {
                    Affinity.leave.lockui('leaveDetail-bossResponseRequest');
                },
                onFailure: function (e) {
                    Affinity.leave.unlockui('leaveDetail-bossResponseRequest');
                    Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
                }.bind(this),
                onException: function () {
                    Affinity.leave.unlockui('leaveDetail-bossResponseRequest');
                },
                onCancel: function () {
                    Affinity.leave.unlockui('leaveDetail-bossResponseRequest');
                },
                onSuccess: function (response) {
                    Affinity.leave.unlockui('leaveDetail-bossResponseRequest');
                    prompts.hide();

                    if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName, true)) {
                        //Affinity.modal.closeButtonCloser();
                        if (!response.Response) {
                            var subject = "Leave application";
                            if (this.bossResponseRequest.isCancellation)
                                subject = "Leave cancellation";

                            if (this._statusChange === 3) {
                                response.Response = subject + " has been approved";
                            } else {
                                response.Response = subject + " has been declined";
                            }
                        }
                        if (response.Messages.length > 0 &&
                            response.Messages[0].Message !== undefined &&
                            response.Messages[0].Message !== null &&
                            response.Messages[0].Message.indexOf('position has changed') > -1) {
                            uialert({
                                'message': response.Messages[0].Message,
                                showButtons: true,
                                noClose: false
                            });
                        } else {
                            this.acknowledgementModal(response, null, true);
                            Affinity.leave.manager.refreshAll();
                        }
                        
                        //this.refreshHistory();
                    }
                    else {
                        //Need something to pop the error, we are already in a modal
                        this.errorChecking(response);
                    }
                }.bind(this)
            });
            this.initializeSubmitLeaveRequest();
        }
        else {
            this.initializeSubmitLeaveRequest();
        }
    },

    tryCreateAuditLogForImportedLeave: function (empNo, leaveId) {
        this._methodName = 'ui.leave.detail.js -> tryCreateAuditLogForImportedLeave ()';
        this._api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'ActivityLog/' + empNo + '/' + leaveId);


        this.tryCreateActivityLogRequest.url = this.tryCreateActivityLogRequest.options.url = this._api;
        this.tryCreateActivityLogRequest.post();
    },
    getDetail: function (empNo, leaveId, authorisation) {
        uialert({
            message: 'Loading Leave Detail',
            showLoader: true,
            showButtons: false,
            noClose: false
        });

        if (typeof authorisation != 'undefined' && authorisation != 'undefined' && authorisation != null) {
            this._methodName = 'ui.leave.detail.js -> getDetail (with authId)';
            var path = Affinity.leave.apiroot + 'LeaveDetail/' + empNo + '/' + leaveId;
            if (authorisation.AuthorisationId != -1) {
                path = path + '/' + authorisation.AuthorisationId;
                this.authorisationId = authorisation.AuthorisationId;
            }
            this._api = Affinity.GetCacheSafePath(path);
            this.authorisation = authorisation;
        } else {
            this._methodName = 'ui.leave.detail.js -> getDetail (without authId)';
            this._api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'LeaveDetail/' + empNo + '/' + leaveId);
            this.authorisation = null;
        }

        if (this.leaveDetailRequest && this.leaveDetailRequest.isRunning()) {
            this.leaveDetailRequest.cancel();
        }
        this.leaveDetailRequest.url = this.leaveDetailRequest.options.url = this._api;
        this.leaveDetailRequest.get();
        if (this.isManager) {
            Affinity.leave.manager.getManagerEmployeeConfig(empNo, function (employee) {

            }.bind(this));
        }

        
    },
    initializeSubmitLeaveRequest: function () {
        this.submitLeaveRequest = new Request.JSON({
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            urlEncoded: false,
            onRequest: function () {
                Affinity.leave.lockui('leaveDetail-submitLeaveRequest');
            },
            onFailure: function (e) {
                Affinity.leave.unlockui('leaveDetail-submitLeaveRequest');
                prompts.hide();
                Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
            }.bind(this),
            onException: function () {
                Affinity.leave.unlockui('leaveDetail-submitLeaveRequest');
                prompts.hide();
            },
            onCancel: function () {
                Affinity.leave.unlockui('leaveDetail-submitLeaveRequest');
                prompts.hide();
            },
            onSuccess: function (response) {
                Affinity.leave.unlockui('leaveDetail-submitLeaveRequest');
                prompts.hide();
                if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName, true)) {
                    if (this._onResponse) {
                        this._onResponse(response);
                    }
                    Affinity.leave.employee.refreshAll(); /** global in ui.myLeave.js **/
                }
                this.errorChecking(response);
            }.bind(this)
        });
    },
    viewDetail: function () {
        var leaveHeader = this.data.LeaveHeader;
        var components = this.data.Components;

        Affinity.modal.show();
        Affinity.modal.clear();
        Affinity.modal.position();

        var modalData = new Element('div', {
            'class': 'modal-data'
        });
        var section = new Element('div', {
            'class': 'section'
        }).inject(modalData);
        var form = new Element('div', {
            'class': 'default-form'
        }).inject(section);
        var messages = new Element('div', {
            'class': 'messages'
        }).inject(form);
        /**/

        if (Affinity.login.profile.employeeNumber !== leaveHeader.EmployeeNo) {
            this.balanceBox = new Element('div').inject(form, 'top');
            this.balanceWidget = new EmployeeBalancesWidget({
                target: this.balanceBox,
                employeeId: leaveHeader.EmployeeNo,
                filter: leaveHeader.CodeDescription
            });
        }

        /**/

        var dateForm = new Element('div', {
            'class': 'form-row'
        }).inject(form);
        var dateRange = new Element('div', {
            'class': 'details-date-range'
        }).inject(dateForm);
        var startDate = new Element('div', {
            'class': 'leave-date leave-start'
        }).adopt(
            new Element('div', {
                'class': 'title', 'html': 'First Day'
            }),
            new Element('div', {
                'class': 'leave-date-picker'
            }).adopt(
                new Element('div', {
                    'class': 'day'
                }),
                new Element('div', {
                    'class': 'date'
                }),
                new Element('div', {
                    'class': 'month'
                }),
                new Element('div', {
                    'class': 'year'
                })
            )
        ).inject(dateRange);

        var stopDate = new Element('div', {
            'class': 'leave-date leave-stop'
        }).adopt(
            new Element('div', {
                'class': 'title', 'html': 'Last Day'
            }),
            new Element('div', {
                'class': 'leave-date-picker'
            }).adopt(
                new Element('div', {
                    'class': 'day'
                }),
                new Element('div', {
                    'class': 'date'
                }),
                new Element('div', {
                    'class': 'month'
                }),
                new Element('div', {
                    'class': 'year'
                })
            )
        ).inject(dateRange);

        var typeForm = new Element('div', {
            'class': 'form-row'
        }).inject(form);
        var typeBox = new Element('div', {
            'class': 'details-type-box'
        }).inject(typeForm);
        var typeLabel = new Element('label', {
            'class': 'details-label',
            'html': 'Leave Type'
        }).inject(typeBox);
        var type = new Element('div', {
            'class': 'details-type'
        }).inject(typeBox);

        var reasonForm = new Element('div', {
            'class': 'form-row'
        }).inject(form);
        var reasonBox = new Element('div', {
            'class': 'details-reason-box'
        }).inject(reasonForm);
        var reasonLabel = new Element('label', {
            'class': 'details-label',
            'html': 'Leave Reason'
        }).inject(reasonBox);
        var reason = new Element('div', {
            'class': 'details-reason'
        }).inject(reasonBox);

        this.unitForm = new Element('div', {
            'class': 'form-row'
        }).inject(form);
        this.unitsBox = new Element('div', {
            'class': 'details-positions-box'
        }).inject(this.unitForm);
        this.unitsLabel = new Element('label', {
            'class': 'details-label',
            'style': 'display: block;',
            'html': 'Units'
        }).inject(this.unitsBox);
        this.totalUnitsSection = new Element('div', {
            'class': 'total-units-box'
        }).inject(this.unitsBox);
        this.buildUnitsTotals(components);

        var approverBox = new Element('div', {
            'class': 'details-approver-box'
        }).inject(this.unitsBox);

        //var approvalIcons = new Element('div', {
        //    'class': 'details-approval-icons'
        //}).inject(unitsBox);
        this.partialApproved = false;
        Array.each(components, function (componant, index) {
            var posBox = new Element('div', {
                'class': 'details-position-approver'
            }).inject(approverBox);
            var approverSelector = new Element('span', {
                //'style': 'display:block'
            }).inject(posBox);
            if (componant.Authorisation) {
                if (componant.Authorisation.ApprovedBy) {
                    approverSelector.set('html', componant.Authorisation.ApprovedByName);
                } else {
                    approverSelector.set('html', componant.Authorisation.SubmittedToName);
                }

                if (this.data.LeaveHeader.StatusCode != -1 && this.data.LeaveHeader.StatusCode != 6) {
                    var approved = new Element('span', {
                        'class': 'tickcross color'
                    }).inject(posBox);
                    if (componant.Authorisation.StatusCode === 3) {
                        approved.addClass('ui-has-tooltip').set('data-tooltip', 'Leave is approved');
                        approved.addClass('icon-thumbs-up');
                        approved.addClass('green');
                        this.partialApproved = true;
                    } else if (componant.Authorisation.StatusCode === 2) {
                        approved.addClass('red');
                        approved.addClass('ui-has-tooltip').set('data-tooltip', 'Leave is declined');
                        approved.addClass('icon-thumbs-down');
                    } else if (componant.Authorisation.StatusCode === 7) {
                        approved.addClass('ui-has-tooltip').set('data-tooltip', 'Leave cancellation is pending approval');
                        approved.addClass('icon-cancel');
                        approved.addClass('blue');
                    } else {
                        approved.addClass('ui-has-tooltip').set('data-tooltip', 'Leave is pending approval');
                        approved.addClass('icon-hourglass');
                        approved.addClass('blue');
                    }
                }
            }
        }.bind(this));

        this.units = new Element('div', {
            'class': 'details-positions'
        }).inject(this.unitsBox);
        this.positionsLabels = new Element('div', {
            'class': 'position-labels'
        }).inject(this.units);
        var scrollerBox = new Element('div', {
            'class': 'unit-scroller-box'
        }).inject(this.units);
        var scroller = new Element('div', {
            'class': 'details-units-scroller'
        }).inject(scrollerBox);
        this.createCommentReplyEdits(form, leaveHeader);

        startDate.getElement('.day').set('html', Affinity.leave.cleanBadDate(leaveHeader.DateFrom).format('%a'));
        startDate.getElement('.date').set('html', Affinity.leave.cleanBadDate(leaveHeader.DateFrom).format('%e'));
        startDate.getElement('.month').set('html', Affinity.leave.cleanBadDate(leaveHeader.DateFrom).format('%b'));
        startDate.getElement('.year').set('html', Affinity.leave.cleanBadDate(leaveHeader.DateFrom).format('%Y'));

        stopDate.getElement('.day').set('html', Affinity.leave.cleanBadDate(leaveHeader.DateTo).format('%a'));
        stopDate.getElement('.date').set('html', Affinity.leave.cleanBadDate(leaveHeader.DateTo).format('%e'));
        stopDate.getElement('.month').set('html', Affinity.leave.cleanBadDate(leaveHeader.DateTo).format('%b'));
        stopDate.getElement('.year').set('html', Affinity.leave.cleanBadDate(leaveHeader.DateTo).format('%Y'));

        type.set('html', leaveHeader.CodeDescription);
        reason.set('html', leaveHeader.ReasonDescription);

        var firstDate = Affinity.leave.cleanBadDate(leaveHeader.DateFrom);
        var lastDate = Affinity.leave.cleanBadDate(leaveHeader.DateTo);
        var dateRange = [];
        var currentDate = firstDate.clone();

        while (currentDate.lessThanOrEqualTo(lastDate)) {
            dateRange.push(currentDate.clone());
            currentDate.increment('day', 1);
        }

        var scrollerWidth = 0;
        var unitsGrid = new Element('div', {
            'class': 'unit-grid'
        }).inject(scroller);

        var gridHeader = new Element('div', {
            'class': 'unit-gridheader'
        }).inject(unitsGrid);

        var gridBody = new Element('div', {
            'class': 'unit-gridbody'
        }).inject(unitsGrid);

        var tempDate, dateCell;
        Array.each(dateRange, function (day, index) {
            /*
            var date = new Element('div', {
                'class': 'day-class',
                'html': Date.parse(day).format('%d/%m/%y')
            }).inject(gridHeader);
            */

            tempDate = Affinity.leave.cleanBadDate(day);
            dateCell = new Element('div', { 'class': 'day-class d-' + tempDate.format('%d-%b-%y'), 'id': tempDate.format('%d/%b/%y') }).inject(gridHeader);
            dateCell.adopt(
                new Element('div', { 'class': 'day-class-day', 'html': tempDate.format('%a') }),
                new Element('div', { 'class': 'day-class-date', 'html': tempDate.format('%e') }),
                new Element('div', { 'class': 'day-class-my', 'html': tempDate.format('%b \'%y') }),
                new Element('div', { 'class': 'hol-icon icon-plane ui-has-tooltip' })
            );
            scrollerWidth += 79;
        });
        scroller.store('width', scrollerWidth);
        scroller.setStyle('width', scrollerWidth);

        if (this.data.Attachments.length > 0) {
            var attachmentForm = new Element('div', {
                'class': 'form-row'
            }).inject(form);
            var attachmentsBox = new Element('div', {
                'class': 'details-attachments-box'
            }).inject(attachmentForm);
            var attachmentsLabel = new Element('label', {
                'class': 'details-label',
                'html': 'Attachments'
            }).inject(attachmentsBox);
            var attachments = new Element('ul', {
                'class': 'details-attachments'
            }).inject(attachmentsBox);

            Array.each(this.data.Attachments, function (attachment, index) {
                url = Affinity.leave.apiroot + 'GetLeaveAttachment/' + leaveHeader.EmployeeNo + '/' + leaveHeader.TSGroupId + '/' + attachment.Id;
                var link = new Element('a', {
                    'href': url
                }).inject(attachments);
                var attach = new Element('li', {
                    'class': 'details-attachment'
                }).inject(link);
                attach.set('html', attachment.Name);
            });
        }

        if (leaveHeader.StatusCode === 7) {
            this.createForwardingFeature(form);
        } else {
            //Only managers sees the forward box.
            if (Affinity.login.profile.employeeNumber !== leaveHeader.EmployeeNo) {
                this.populateForwardHistory(this.data.Forwards, form);
            }
        }
        

        

        this.createButtons(form, false);

        Array.each(components, function (position, index) {
            var pos = new Element('div', { 'class': 'position-label' }).inject(this.positionsLabels);
            var posTitle = new Element('div', { 'class': 'position-title' }).inject(pos);
            new Element('label', {
                'html': position.PositionTitle, 'class': 'ui-has-tooltip',
                'data-tooltip': position.PositionTitle, 'data-tooltip-dir': 'bottom'
            }).inject(posTitle);

            var daysRow;

            var unitLabels = new Element('div', { 'class': 'position-unit-label' }).inject(pos);
            if (leaveHeader.UnitType === 'D') {
                daysRow = new Element('div', { 'class': 'positions-days', 'id': position.PositionCode }).inject(gridBody);
                new Element('label', { 'html': '(Days)' }).inject(unitLabels);
            }
            else {
                new Element('label', { 'html': '(Hours)' }).inject(unitLabels);
            }
            var hoursRow = new Element('div', { 'class': 'positions-hours', 'id': position.PositionCode }).inject(gridBody);
            if (leaveHeader.UnitType === 'D') {
                hoursRow.addClass('hidden');
            }

            Array.each(dateRange, function (day, index) {
                var date = Affinity.leave.cleanBadDate(day).format('%d/%b/%y');
                var hours = new Element('span', { 'class': 'details-position-units fake-input', 'id': date, 'html': '0.00' }).inject(hoursRow);
                var days = null;
                if (leaveHeader.UnitType === 'D') {
                    var days = new Element('span', { 'class': 'details-position-units fake-input', 'id': date, 'html': '0.00' }).inject(daysRow);
                }

                Array.each(components, function (component, Index) {
                    if (component.PositionCode === position.PositionCode) {
                        Array.each(component.Units, function (unit, unitIndex) {
                            var posDate = Affinity.leave.cleanBadDate(unit.Date).format('%d/%b/%y');
                            if (date === posDate) {
                                hours.set('html', unit.HoursAppliedFor.toFixed(2));
                                if (leaveHeader.UnitType === 'D') {
                                    days.set('html', unit.DaysAppliedFor.toFixed(2));
                                }
                                //hours.set('value', unitsAppliedFor.toFixed(2));
                                //hours.store('old', unitsAppliedFor);

                                if (typeOf(unit.IsPublicHoliday) === 'boolean' && unit.IsPublicHoliday === true) {
                                    hours.addClass('public-holiday').addClass('ui-has-tooltip').set('data-tooltip', unit.PublicHolidayName).set('data-tooltip-dir', 'bottom,center');
                                    if (leaveHeader.UnitType === 'D') {
                                        days.addClass('public-holiday').addClass('ui-has-tooltip').set('data-tooltip', unit.PublicHolidayName).set('data-tooltip-dir', 'bottom,center');
                                    }
                                    unitsGrid.getElement('.day-class.d-' + posDate.replace(/\//gi, '-')).addClass('public-holiday').getElement('.hol-icon').set('data-tooltip', unit.PublicHolidayName).set('data-tooltip-dir', 'bottom,center');
                                }
                            }
                        });
                    }
                });
            });
        }.bind(this));

        Affinity.leave.populateLeaveActivity(form, leaveHeader.EmployeeNo, leaveHeader.TSGroupId);

        Affinity.modal.setElement(modalData);

        var containerSize = scrollerBox.measure(function () { return this.getSize().x; });
        var scrollerSize = scroller.measure(function () { return this.getScrollSize().x; });

        if (scrollerSize > containerSize) {
            scrollerBox.setStyle('overflow-x', 'scroll');
        } else {
            scrollerBox.setStyle('overflow-x', 'hidden');
        }

        Affinity.tooltips.processNew();
    },


    editDetail: function () {

            if (this.isManager) {
                if (Affinity.leave.manager) {
                    Affinity.leave.manager.getManagerEmployeeConfig(this.data.LeaveHeader.EmployeeNo, function (employee) {
                        if (employee) {
                            this.doEditDetail(employee);
                        }
                        else {
                            this.doEditDetail(Affinity.leave.manager.config); 
                         }
                    }.bind(this));
                }
            }
            else {
                if (Affinity.leave.employee.config) {
                    this.doEditDetail(Affinity.leave.employee.config);

                }
            }
       
    },

    createForwardingFeature: function (form) {
        /*      Forwarding      */
        if (this.isManager) {
            this.populateForwardHistory(this.data.Forwards, form);

            if (this.allowForwardToBasedFromLeaveInstance(this.data.LeaveHeader)) {
                this.forwardSelector = new Element('div',
                    {
                        'class': 'forward-to-selector form-row'
                    }).inject(form);
                this.forwardsToLabel = new Element('label',
                    {
                        'class': 'details-label',
                        'html': 'Forward To'
                    }).inject(this.forwardSelector);
                this.forwardTo = new Element('select',
                    {
                        'class': 'details-forward-to ui-autocomplete'
                    }).inject(this.forwardSelector);

                new Element('option', { 'html': '', 'id': null, 'value': '' }).inject(this.forwardTo);
                if (Affinity.leave.manager.config &&
                    typeOf(Affinity.leave.manager.config.ForwardToManagers) === 'array' &&
                    Affinity.leave.manager.config.ForwardToManagers.length > 0
                ) {
                    Array.each(Affinity.leave.manager.config.ForwardToManagers,
                        function (manager, index) {
                            new Element('option',
                                {
                                    'html': manager.EmployeeName + ' (' + manager.EmployeeNo + ')',
                                    'id': manager.EmployeeNo,
                                    'value': manager.EmployeeNo
                                }).inject(this.forwardTo);
                        }.bind(this));
                }

                this.forwardReason = new Element('div',
                    {
                        'class': 'forward-to-reason form-row hidden'
                    }).inject(form);
                this.forwardReasonLabel = new Element('label',
                    {
                        'class': 'details-label',
                        'html': 'Forward Reason:'
                    }).inject(this.forwardReason);
                this.forwardReasonText = new Element('textarea',
                    {
                        'class': 'forward-reason-text data-hj-whitelist',
                        'rows': '3'
                    }).inject(this.forwardReason);
            }
        }
    },

    doEditDetail: function (employeeConfig) {


        var leaveHeader = this.data.LeaveHeader;
        var components = this.data.Components;

     

        Affinity.modal.show();
        Affinity.modal.clear();
        Affinity.modal.position();

        this.modalData = new Element('div', {
            'class': 'modal-data'
        });

        this.section = new Element('div', {
            'class': 'section'
        }).inject(this.modalData);

        this.form = new Element('div', {
            'class': 'default-form'
        }).inject(this.section);

        new Element('div', {
            'class': 'leave-id hidden'
        }).inject(this.form).store('old', leaveHeader.TSGroupId);

        var messages = new Element('div', {
            'class': 'messages'
        }).inject(this.form);

        var positions;
        if (employeeConfig) {
            this.config = employeeConfig;
            positions = employeeConfig.positions;
        }

        if (this.isManager) {
            this.balanceBox = new Element('div', { 'class': 'leave-detail-balance' }).inject(this.form);
            this.balanceWidget = new EmployeeBalancesWidget({
                target: this.balanceBox,
                employeeId: leaveHeader.EmployeeNo,
                filter: leaveHeader.CodeDescription
            });
            if (Affinity.leave.manager && !positions) {
                positions = components; // Fix for forwarded applications
            }
        }
        else {
            if (Affinity.leave.employee.config) {
                positions = Affinity.leave.employee.config.Positions;
            }
        }
        this.positions = positions;

        //limit positions by application position
        if (leaveHeader.PositionCode && leaveHeader.PositionCode != '') {
            var singlePosition;
            positions.map(function (p) {
                if (p.PositionCode == leaveHeader.PositionCode) {
                    singlePosition = p;
                }
            }.bind(this));
            if (singlePosition)
                positions = [singlePosition];
        }

        this.dateRange = new Element('div', {
            'class': 'details-date-range'
        }).inject(this.form);

        this.startDate = new Element('div', {
            'class': 'leave-date leave-start'
        }).adopt(
            new Element('div', { 'class': 'title', 'html': 'First Day' }),
            this.fromDateBox = new Element('div', { 'class': 'leave-date-picker selectable' }).adopt(
                new Element('div', { 'class': 'day' }),
                new Element('div', { 'class': 'date' }),
                new Element('div', { 'class': 'month' }),
                new Element('div', { 'class': 'year' })
            )
        ).inject(this.dateRange);

        this.stopDate = new Element('div', { 'class': 'leave-date leave-stop' }).adopt(
            new Element('div', { 'class': 'title', 'html': 'Last Day' }),
            this.toDateBox = new Element('div', { 'class': 'leave-date-picker selectable' }).adopt(
                new Element('div', { 'class': 'day' }),
                new Element('div', { 'class': 'date' }),
                new Element('div', { 'class': 'month' }),
                new Element('div', { 'class': 'year' })
            )
        ).inject(this.dateRange);

        var startDate = Affinity.leave.cleanBadDate(leaveHeader.DateFrom);
        var endDate = Affinity.leave.cleanBadDate(leaveHeader.DateTo);
        //if ( this.isManager ) {
        //    Affinity.leave.setDates(this.fromDateBox, startDate);
        //    Affinity.leave.setDates(this.toDateBox, endDate);
        //} else {
        new Element('div', {
            'class': 'old-startDate hidden'
        }).inject(this.form).store('old', leaveHeader.DateFrom);
        new Element('div', {
            'class': 'old-endDate hidden'
        }).inject(this.form).store('old', leaveHeader.DateTo);
        new Element('div', {
            'class': 'globalDateRange hidden'
        }).inject(this.form);

        var hiddenDateDiv = new Element('div', {
            'class': 'hidden'
        }).inject(this.dateRange, 'top');
        var hiddenDateDivFrom = new Element('div', {
            'class': 'from-selector'
        }).inject(hiddenDateDiv);
        var hiddenDateDivTo = new Element('div', {
            'class': 'to-selector'
        }).inject(hiddenDateDiv);
        var hiddenDateInputFrom = new Element('input', {
            'type': 'text', 'id': 'detail-date-from', 'class': 'data-hj-whitelist'
        }).inject(hiddenDateDivFrom);
        var hiddenDateInputTo = new Element('input', {
            'type': 'text', 'id': 'detail-date-to', 'class': 'data-hj-whitelist'
        }).inject(hiddenDateDivTo);

        this.fromDateWidget = new UIDateTimeWidget({
            outputFormat: '%d.%m.%Y',
            displayFormat: '%a %e %b %Y',
            showCalendar: true,
            showTime: false,
            startDate: startDate.clone(),
            labelName: '',
            postId: '',
            postName: '',
            validationMethods: '',
            validationErrorStr: '',
            target: hiddenDateInputFrom,
            cssPosition: 'fixed'
        });

        this.modalEls = {};
        this.modalEls.fromDateWidget = this.fromDateWidget;
        this.modalEls.fromDateBox = this.fromDateBox;
        this.modalEls.fromDateHidden = hiddenDateInputFrom;
        this.modalEls.fromDateOld = startDate.clone();

        this.fromDateWidget.positionOverride = this.startDate;
        this.fromDateWidget.addEvent('dateClicked', function () {
            var dateOld = this.modalEls.fromDateOld.format('%d-%b-%y');
            if (this.setStartDate()) {
                var dateNew = this.fromDateWidget.getRawDate().format('%d-%b-%y');

                this.updateDate('DateFrom', dateNew, dateOld, positions);
                this.modalEls.fromDateOld = this.fromDateWidget.getRawDate();
            }
            else {
                this.fromDateWidget.setDate(this.modalEls.fromDateOld);
            }

        }.bind(this));

        this.toDateWidget = new UIDateTimeWidget({
            outputFormat: '%d.%m.%Y',
            displayFormat: '%a %e %b %Y',
            showCalendar: true,
            showTime: false,
            startDate: endDate.clone(),
            labelName: '',
            postId: '',
            postName: '',
            validationMethods: '',
            validationErrorStr: '',
            target: hiddenDateInputTo,
            cssPosition: 'fixed'
        });

        this.modalEls.toDateWidget = this.toDateWidget;
        this.modalEls.toDateBox = this.toDateBox;
        this.modalEls.toDateHidden = hiddenDateInputTo;
        this.modalEls.toDateOld = endDate.clone();

        this.toDateWidget.positionOverride = this.stopDate;
        this.toDateWidget.addEvent('dateClicked', function () {
            var dateOld = this.modalEls.toDateOld.format('%d-%b-%y');
            if (this.setEndDate()) {
                var dateNew = this.toDateWidget.getRawDate().format('%d-%b-%y');
                this.updateDate('DateTo', dateNew, dateOld, positions);
                //this.unitChanges(positions, 'stopdate', dateOld, dateNew, leaveHeader.PositionCode);
                this.modalEls.toDateOld = this.toDateWidget.getRawDate();
            }
            else {
                this.toDateWidget.setDate(this.modalEls.toDateOld);
            }
        }.bind(this));

        this.startDate.addEvent('click', function (e) {
            this.fromDateWidget.externalShow(e);
        }.bind(this));
        this.stopDate.addEvent('click', function (e) {
            this.toDateWidget.externalShow(e);
        }.bind(this));
        this.setStartDate();
        this.setEndDate();
        //}

        this.typeForm = new Element('div', {
            'class': 'form-row'
        }).inject(this.form);

        this.typeBox = new Element('div', {
            'class': 'details-type-box'
        }).inject(this.typeForm);

        this.typeLabel = new Element('label', {
            'class': 'details-label',
            'html': 'Leave Type'
        }).inject(this.typeBox);

        //if (this.isManager) {
        //    this.type = new Element('div', {
        //        'class': 'details-type',
        //        'html': leaveHeader.CodeDescription
        //    }).inject(this.typeBox);
        //}
        //else {
        this.typeSelector = new Element('select', {
            'class': 'edit-type-selector'
        }).inject(this.typeBox);
        this.typeSelector.addEvent('change', function (e) {
            var leaveCode = this.typeSelector.getElement('option:selected').get('id');
            this.update('LeaveCode', leaveCode, this.data.LeaveHeader.LeaveCode, leaveHeader.EmployeeNo, leaveHeader.TSGroupId, this.data.LeaveHeader.TimeLastModified,

                function (response, errorMessage) {
                    if (response != null && response !== "error") {
                        this.newLeaveReason(Affinity.leave.employee.config, this.typeSelector.selectedIndex);
                        this.reasonSelector.selectedIndex = 0;
                        if (this.data) {
                            this.data.LeaveHeader.LeaveCode = response.LeaveHeader.leaveCode;
                            this.data.LeaveHeader.ReasonCode = null;
                            this.data.LeaveHeader.TimeLastModified = response.LeaveHeader.TimeLastModified;
                            this.createEditableDates(this.data.LeaveHeader, this.data.Components, this.positions);
                        }
                    } else if (response === "error") {
                        var errMessage = "Something's stopping the Leave Type field from updating. Check your selection then try again.<br /><br />";

                        uialert({
                            'message': errMessage,
                            okText: 'Close',
                            showButtons: true,
                            noClose: false
                        });
                        // this.data.LeaveHeader.Comment = this.data.LeaveHeader.Comment;
                        // this.comments.value = this.data.LeaveHeader.Comment;
                        //var originIndex = this.typeSelector.getElements("options").indexOf(this.typeSelector.getElement("#" + this.data.LeaveHeader.LeaveCode));

                        var originIndex = -1;
                        for (var i = 0; i < this.typeSelector.getElements("option").length; i++) {
                            var currentOption = this.typeSelector.getElements("option")[i];
                            if (currentOption.id === this.data.LeaveHeader.LeaveCode) {
                                originIndex = currentOption.index;
                                break;
                            }
                        }
                        if (originIndex != - 1) {
                            this.typeSelector.selectedIndex = originIndex;
                        }

                    }
                }.bind(this),
                function (fieldName, oldValue, newValue) {
                    if (fieldName === "LeaveCode") {
                        var selectedIndex = -1;
                        for (var i = 0; i < this.typeSelector.length; i++) {
                            if (oldValue === this.typeSelector[i].id) {
                                selectedIndex = i;
                            }
                            this.typeSelector.selectedIndex = selectedIndex;
                        }
                    }
                }.bind(this));
        }.bind(this));
        //this.typeSelector.store('old', leaveHeader.LeaveCode);
        // }

        this.reasonForm = new Element('div', {
            'class': 'form-row'
        }).inject(this.form);
        this.reasonBox = new Element('div', {
            'class': 'details-reason-box'
        }).inject(this.reasonForm);
        this.reasonLabel = new Element('label', {
            'class': 'details-label',
            'html': 'Leave Reason'
        }).inject(this.reasonBox);
        //if (this.isManager) {
        //    this.reason = new Element('div', {
        //        'class': 'details-reason',
        //        'html': leaveHeader.ReasonDescription
        //    }).inject(this.reasonBox);
        //}
        //else {
        var leaveCodes = null;
        leaveCodes = employeeConfig.LeaveCodes;
        //if (this.isManager) {
        //    leaveCodes = Affinity.leave.manager.config.LeaveCodes;
        //} else {
        //    leaveCodes = leaveCodes = Affinity.leave.employee.config.LeaveCodes;
        //}
        Array.each(leaveCodes, function (leaveCode, codeIndex) {
            var typeOption = new Element('option', {
                'value': parseInt(codeIndex)
            }).inject(this.typeSelector);
            typeOption.set('html', leaveCode.Description);
            typeOption.set('id', leaveCode.LeaveCode);
            if (leaveCode.LeaveCode === leaveHeader.LeaveCode) {
                this.typeSelector.selectedIndex = codeIndex;
                this.reasonSelector = new Element('select', {
                    'class': 'edit-reason-selector'
                }).inject(this.reasonBox);
                new Element('option', {
                    'value': '',
                    'id': 'null', //SG: ideally need to pass actual null not string. this will do for now. 
                    'html': ''
                }).inject(this.reasonSelector, 'top')
                //this.reasonSelector.store('old', leaveHeader.ReasonCode);
                this.reasonSelector.addEvent('change', function (e) {
                    var reasonCode = this.reasonSelector.getElement('option:selected').get('id');
                    this.update('ReasonCode', reasonCode, this.data.LeaveHeader.ReasonCode, leaveHeader.EmployeeNo, leaveHeader.TSGroupId, this.data.LeaveHeader.TimeLastModified,



                        function (response, errorMessage) {
                            if (this.data && response !== "error") {
                                this.data.LeaveHeader.ReasonCode = response.LeaveHeader.ReasonCode;
                                this.data.LeaveHeader.TimeLastModified = response.LeaveHeader.TimeLastModified;
                            } else if (response === "error") {
                                var errMessage = "Something's stopping the Leave Reason field from updating. Check your selection then try again.<br /><br />";

                                uialert({
                                    'message': errMessage,
                                    okText: 'Close',
                                    showButtons: true,
                                    noClose: false
                                });
                                var originIndex = -1;
                                for (var i = 0; i < this.reasonSelector.getElements("option").length; i++) {
                                    var currentOption = this.reasonSelector.getElements("option")[i];
                                    if (currentOption.id === this.data.LeaveHeader.ReasonCode) {
                                        originIndex = currentOption.index;
                                        break;
                                    }
                                }
                                if (originIndex != - 1) {
                                    this.reasonSelector.selectedIndex = originIndex;
                                }
                            }
                        }.bind(this));
                }.bind(this));
                if (typeof (leaveCodes[this.typeSelector.selectedIndex]) != 'undefined' && leaveCodes[this.typeSelector.selectedIndex].Reasons) {
                    var reasons = leaveCodes[this.typeSelector.selectedIndex].Reasons
                    Array.each(reasons, function (leaveReason, reasonIndex) {
                        var reasonOption = new Element('option', {
                            'value': reasonIndex
                        }).inject(this.reasonSelector);
                        reasonOption.set('html', leaveReason.Description);
                        reasonOption.set('id', leaveReason.ReasonCode);
                        if (leaveReason.ReasonCode === leaveHeader.ReasonCode) {
                            this.reasonSelector.selectedIndex = reasonIndex + 1;
                        }
                    }.bind(this));
                }
            }
        }.bind(this));
        // }

        this.unitForm = new Element('div', {
            'class': 'form-row'
        }).inject(this.form);
        this.unitsBox = new Element('div', {
            'class': 'details-positions-box'
        }).inject(this.unitForm);
        this.unitsLabel = new Element('label', {
            'class': 'details-label',
            'style': 'display: block;',
            'html': 'Units'
        }).inject(this.unitsBox);
        this.totalUnitsSection = new Element('div', {
            'class': 'total-units-box'
        }).inject(this.unitsBox);
        this.buildUnitsTotals(components);

        this.approverBox = new Element('div', {
            'class': 'detail-approver-box'
        }).inject(this.unitsBox);

        this.createApproverBoxes(components, positions);

        // Units Edits
        this.units = new Element('div', {
            'class': 'details-positions'
        }).inject(this.unitsBox, 'bottom');

        this.rebuildUnits = function () {
            this.buildUnitsTotals(this.data.Components);
            this.createEditableDates(this.data.LeaveHeader, this.data.Components, this.positions);
            Affinity.tooltips.processNew();
        }.bind(this);

        this.unitsEdit = new InputEditWidget({
            target: this.units,
            updateInput: this.updateUnits,
            cancelInput: this.rebuildUnits
        });

        this.positionsLabels = new Element('div', {
            'class': 'position-labels'
        }).inject(this.units);
        this.scrollerBox = new Element('div', {
            'class': 'unit-scroller-box'
        }).inject(this.units);
        this.scroller = new Element('div', {
            'class': 'details-units-scroller'
        }).inject(this.scrollerBox);

        this.createCommentReplyEdits(this.form, leaveHeader);

        /*      Attachments     */
        this.attachmentform = new Element('div', {
            'class': 'form-row'
        }).inject(this.form);
        this.attachWidgetDiv = new Element('div', {
            'class': 'uploadmulti print-hidden',
            'data-question-name': 'docs'
        }).adopt(
            this.attachWidgetInput = new Element('input', {
                'type': 'file'
            }),
            new Element('input', {
                'hidden': 'file',
                'class': 'initialValues'
            })
        );
        this.attachmentbox = new Element('div', {
            'class': 'edit-leave-attachment'
        }).adopt(
            new Element('label', { 'class': 'details-label', 'html': 'Attachments' }),
            this.attachWidgetDiv
        ).inject(this.attachmentform);



        this.attachWidgetDiv.addEvent('multiFileDeleted', this.deleteAttachment);
        this.attachWidgetDiv.addEvent('multiFileAdded', this.postAttachments);
        this.attachWidgetDiv.addEvent('validateMultiFileDelete', this.validateFileDeletion);
        window.addEvent('multiFileDeletedFromConfirmation', this.deleteAttachment);
        window.addEvent('attachmentRequired', this.setAttachmentRequiredValue);
        window.addEvent('leaveEditDetailCloses', this.validateBeforeClosingModal);

        Affinity.modal.beforeClose = function () {
            if (this.attachWidgetDiv) {
                this.attachWidgetDiv.removeEvent('multiFileDeleted', this.deleteAttachment);
                this.attachWidgetDiv.removeEvent('multiFileAdded', this.postAttachments);
                this.attachWidgetDiv.removeEvent('validateMultiFileDelete', this.validateFileDeletion);
                window.removeEvent('multiFileDeletedFromConfirmation', this.deleteAttachment);
                window.removeEvent('attachmentRequired', this.setAttachmentRequiredValue);
                window.removeEvent('leaveEditDetailCloses', this.validateBeforeClosingModal);
            }
            if (this.fromDateWidget) {
                this.fromDateWidget.removeEvents();
            }
            if (this.toDateWidget) {
                this.toDateWidget.removeEvents();
            }
            if (this.startDate) {
                this.startDate.removeEvents();
            }
            if (this.toDate) {
                this.toDate.removeEvents();
            }
            if (this.typeSelector) {
                this.typeSelector.removeEvents();
            }
            if (this.reasonSelector) {
                this.reasonSelector.removeEvents();
            }
            if (this.approverSelector) {
                this.approverSelector.removeEvents();
            }
            if (this.reply) {
                this.reply.removeEvents();
            }
            if (this.comments) {
                this.comments.removeEvents();
            }
            if (this.forward) {
                this.forward.removeEvents();
            }
            if (this.forwardTo) {
                this.forwardTo.removeEvents();
            }
            if (this.acceptButton) {
                this.acceptButton.removeEvents();
            }
            if (this.declineButton) {
                this.declineButton.removeEvents();
            }
            if (this.submitButton) {
                this.submitButton.removeEvents();
            }
            if (this.deleteButton) {
                this.deleteButton.removeEvents();
            }
            if (this.closeButton) {
                this.closeButton.removeEvents();
            }
            if (this.editButton) {
                this.editButton.removeEvents();
            }
            window.removeEvents('UpdateLeaveSuccess');
            window.removeEvents('DeleteLeaveUnitSuccess');
            window.removeEvents('CreateMissingLeaveUnitsSuccess');
            Affinity.modal.beforeClose = null;
            delete Affinity.modal.beforeClose;
        }.bind(this);

        this.createForwardingFeature(this.form);

        /*      Buttons     */
        this.createButtons(this.form, true);

        /*      Activity      */
        Affinity.leave.populateLeaveActivity(this.form, leaveHeader.EmployeeNo, leaveHeader.TSGroupId);

        this.createEditableDates(leaveHeader, components, positions);

        //Show
        Affinity.modal.setElement(this.modalData);

        //populate attachments
        this.attachWidget = new UIUplaodersMulti({
            maxsize: 20963328 /* 19.99 MB */
        });

        this.attachWidget.addEvent('multiFileTooLarge', this.fileTooLarge);

        Affinity.leave.populateAttachments(leaveHeader, this.data.Attachments, this.attachWidget, this.attachWidgetDiv);

        //Resize units scroller
        var containerSize = this.scrollerBox.measure(function () { return this.getSize().x; });
        var scrollerSize = this.scroller.measure(function () { return this.getScrollSize().x; });
        if (scrollerSize > containerSize) {
            this.scrollerBox.setStyle('overflow-x', 'scroll');
        } else {
            this.scrollerBox.setStyle('overflow-x', 'hidden');
        }
        //this.editUnitsButtons.setStyle('top', (this.units.getSize().y - 4) + 'px');
        Affinity.tooltips.processNew();
    },

    fileTooLarge: function (data) {

        var maxsize = (data.maxsize / 1024 / 1024).round(2);
        var size = (data.size / 1024 / 1024).round(2);

        window.uialert({
            message: 'You can only attach a document that is less than 20MB in size. Please try again.'
        });

    },

    getLeaveStatusWhereForwardToIsNotAllowed: function () {
        var notAllowedStatusCodes = [3, 2, 6];

        return notAllowedStatusCodes;
    },
    allowForwardToBasedFromLeaveInstance: function (leaveInstance) {
        var returnValue = false;
        var notAllowedStatusCodes = this.getLeaveStatusWhereForwardToIsNotAllowed();
        if (leaveInstance !== undefined &&
            leaveInstance.StatusCode !== undefined &&
            notAllowedStatusCodes.indexOf(leaveInstance.StatusCode) === -1) {
            returnValue = true;
        }
        return returnValue;
    },
    createButtons: function (target, isEdit) {

        var buttonLabel = "";
        if (this.data.LeaveHeader.StatusCode === 7) {
            buttonLabel = "Leave Cancellation";
        } else if (this.data.LeaveHeader.StatusCode === 0) {
            buttonLabel = "Leave Request";
        }

        this.buttons = new Element('div', {
            'class': 'form-row'
        }).inject(target);

        this.buttonsBoxContainer = new Element('div', {
            'class': 'details-comments-box'
        }).inject(this.buttons);

        this.buttonsLabelBox = new Element('label', {
            'class': 'details-label',
            'html': buttonLabel
        }).inject(this.buttonsBoxContainer);

        this.buttonsBox = new Element('div', {
            'class': 'details-buttons-box'
        }).inject(this.buttonsBoxContainer);





        if (!this.data.LeaveHeader.isExternal) {
            if (this.isManager) {
                if ((isEdit || this.data.LeaveHeader.StatusCode === 7) && this.allowForwardToBasedFromLeaveInstance(this.data.LeaveHeader)) {
                    this.forward = new Element('span',
                        {
                            'class': 'button blue hidden w-icon-only'
                        }).adopt(
                            new Element('span', { 'html': Affinity.icons.Forward }),
                            new Element('span', { 'html': 'Forward' })
                        ).inject(this.buttonsBox);
                    if (this.forwardTo.value !== '') {
                        this.forward.removeClass('hidden');
                        this.forwardReason.removeClass('hidden');
                    }
                    this.forwardTo.addEvent('change',
                        function (e) {
                            if (e.target.value === '') {
                                // hide forward buttons
                                this.forward.addClass('hidden');
                                this.forwardReason.addClass('hidden');
                            } else {
                                this.forward.removeClass('hidden');
                                this.forwardReason.removeClass('hidden');
                            }
                        }.bind(this));
                    this.forward.addEvent('click',
                        function () {
                            var index = this.forwardTo.selectedIndex;
                            var option = this.forwardTo[index];
                            var id = option.get('id');
                            var value = {
                                ForwardedTo: id,
                                AuthorisationId: this.data.Components[0].Authorisation.AuthorisationId,
                                Comment: this.forwardReasonText.get('value')
                            };

                            if (value.ForwardedTo === '') {
                                uialert({
                                    message: 'Please select someone to forward to'
                                });
                                return;
                            }

                            var empNo = this.data.LeaveHeader.EmployeeNo;
                            var leaveId = this.data.LeaveHeader.TSGroupId;
                            var methodName = 'leave.detail.js -> createButtons (forward on click)';
                            var api = Affinity.GetCacheSafePath(Affinity.leave.apiroot +
                                'LeaveForwarding/' +
                                empNo +
                                '/' +
                                leaveId);
                            new Request.JSON({
                                url: api,
                                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                                urlEncoded: false,
                                onRequest: function () {
                                    Affinity.leave.lockui('teamleave-forward');
                                },
                                onFailure: function (e) {
                                    Affinity.leave.unlockui('teamleave-forward');
                                    Affinity.leave.handleXHRErrors(e, api, methodName);
                                },
                                onException: function () {
                                    Affinity.leave.unlockui('teamleave-forward');
                                },
                                onCancel: function () {
                                    Affinity.leave.unlockui('teamleave-forward');
                                },
                                onSuccess: function (response) {
                                    Affinity.leave.unlockui('teamleave-forward');
                                    Affinity.modal.hide();
                                    if (!Affinity.leave.isErrorInJson(response, api, methodName)) {
                                        Affinity.leave.manager.refreshAll();
                                    }
                                }.bind(this)
                            }).post(JSON.stringify(value));
                        }.bind(this));
                }

                if (this.data.LeaveHeader.StatusCode !== -1) {
                    //No Approving or Declining for non-pending cancelled applications.

                    this.acceptButton = new Element('span', {
                        'class': 'button green w-icon-only'
                    }).adopt(
                        new Element('span', { 'html': Affinity.icons.ThumbsUp }),
                        new Element('span', { 'html': 'Approve' })
                    ).inject(this.buttonsBox);
                    this.acceptButton.addEvent('click', function () {
                        if (this.validateAttachmentRequirement()) {
                            var statusChange = 3;
                            var leaveId = this.data.LeaveHeader.TSGroupId;
                            var empNo = this.data.LeaveHeader.EmployeeNo;
                            if (this.requireUpdate) {
                                uialert({
                                    message: 'Oops! This leave application has been changed by someone else, please reload.',
                                    showButtons: true,
                                    noClose: false,
                                    showLoader: false
                                });
                            }
                            else if (this.totalUnitsUnits.get('html') == 0) {
                                uialert({
                                    message: 'Oops! There are no hours to approve for this leave.',
                                    showButtons: true,
                                    noClose: false,
                                    showLoader: false
                                });
                            }
                            else {
                                //this.applyForLeave.postAttachements(empNo, leaveId);
                                //this.bossResponse(empNo, leaveId, oldStatus, statusChange, authId);
                                this.bossResponse(empNo, leaveId, this.authorisation.StatusCode, statusChange, this.authorisation.AuthorisationId, this.data.LeaveHeader.TimeLastModified);
                            }
                        } else {
                            this.displayAttachmentRequiredModalMessage();
                        } 
                        
                    }.bind(this));

                    if (this.data.LeaveHeader.StatusCode !== 6) {
                        this.declineButton = new Element('span', {
                            'class': 'button red w-icon-only'
                        }).adopt(
                            new Element('span', { 'html': Affinity.icons.ThumbsDown }),
                            new Element('span', { 'html': 'Decline' })
                        ).inject(this.buttonsBox);
                        this.declineButton.addEvent('click', function () {
                            window.fireEvent('attachmentRequired', false);
                            var statusChange = 2;
                            var leaveId = this.data.LeaveHeader.TSGroupId;
                            var empNo = this.data.LeaveHeader.EmployeeNo;
                            if (this.requireUpdate) {
                                uialert({
                                    message: 'Oops! This leave application has been changed by someone else, please reload.',
                                    showButtons: true,
                                    noClose: false,
                                    showLoader: false
                                });
                            }
                            //else if (this.totalUnitsUnits.get('html') == 0) {
                            //    uialert({
                            //        message: 'Oops! There are no hours to decline for this leave.',
                            //        showButtons: true,
                            //        noClose: false,
                            //        showLoader: false
                            //    });
                            //}
                            else {
                                //this.bossResponse(empNo, leaveId, oldStatus, statusChange, authId);
                                this.bossResponse(empNo, leaveId, this.authorisation.StatusCode, statusChange, this.authorisation.AuthorisationId, this.data.LeaveHeader.timeLastModified);
                            }
                        }.bind(this));
                    }

                    if (this.data.LeaveHeader.StatusCode === 6) {
                        this.submitButton = new Element('span', {
                            'class': 'button green w-icon-only'
                        }).adopt(
                            new Element('span', { 'html': Affinity.icons.Plane }),
                            new Element('span', { 'html': 'Submit' })
                        ).inject(this.buttonsBox);
                        this.submitButton.addEvent(Affinity.events.click, function () {

                            if (this.validateAttachmentRequirement()) {
                                this.submitLeave(this.data.LeaveHeader.TSGroupId, 0, this.data.LeaveHeader.StatusCode,
                                    function (response) {
                                        if (response.Response != null &&
                                            response.Response.indexOf("position has changed since") !== -1) {
                                            uialert({
                                                'message': response.Response,
                                                showButtons: true,
                                                noClose: false
                                            });

                                        } else {
                                            this.acknowledgementModal(response, 'Your leave has been submitted');
                                        }
                                    }.bind(this));
                            } else {
                                this.displayAttachmentRequiredModalMessage();
                            }

                            
                        }.bind(this));
                    }

                }
            } else {
                if (this.data.LeaveHeader.StatusCode === -1 || this.data.LeaveHeader.StatusCode === 6) {
                    this.submitButton = new Element('span', {
                        'class': 'button green w-icon-only'
                    }).adopt(
                        new Element('span', { 'html': Affinity.icons.Plane }),
                        new Element('span', { 'html': 'Submit' })
                    ).inject(this.buttonsBox);
                    this.submitButton.addEvent(Affinity.events.click, function () {

                        if (this.validateAttachmentRequirement()) {

                            this.submitLeave(this.data.LeaveHeader.TSGroupId, 0, this.data.LeaveHeader.StatusCode,
                                function (response) {
                                    if (response.Response != null &&
                                        response.Response.indexOf("position has changed since") !== -1) {
                                        uialert({
                                            'message': response.Response,
                                            showButtons: true,
                                            noClose: false
                                        });

                                    } else {
                                        this.acknowledgementModal(response, 'Your leave has been submitted');
                                    }
                                }.bind(this));
                        } else {
                            this.displayAttachmentRequiredModalMessage();
                        }
                        
                    }.bind(this));
                }
                if (this.data.LeaveHeader.StatusCode === -1) {
                    this.deleteButton = new Element('button', {
                        'class': 'red detail-delete-button w-icon-only'
                    }).adopt(
                        new Element('span', { 'html': Affinity.icons.Trash }),
                        new Element('span', { 'html': 'Delete' })
                    ).inject(this.buttonsBox);
                    this.deleteButton.addEvent(Affinity.events.click, function () {
                        this.deleteLeave(this.data.LeaveHeader.EmployeeNo, this.data.LeaveHeader.TSGroupId);
                        Affinity.modal.closeButtonCloser();
                    }.bind(this));
                } else if (this.data.LeaveHeader.StatusCode === 0 || this.data.LeaveHeader.StatusCode === 2 || this.data.LeaveHeader.StatusCode === 3) {
                    this.cancelButton = new Element('span', {
                        'class': 'button red w-icon-only'
                    }).adopt(
                        new Element('span', { 'html': Affinity.icons.Cancel }),
                        new Element('span', { 'html': 'Cancel Leave' })
                    ).inject(this.buttonsBox);
                    this.cancelButton.addEvent(Affinity.events.click, function () {
                        if (this.data.LeaveHeader.StatusCode == 2) {
                            window.fireEvent('attachmentRequired', false);
                            this.doLeaveCancellation();
                        } else {
                            uialert({
                                message: 'Are you sure you want to cancel your leave?',
                                showButtons: true,
                                showCancel: true,
                                okText: 'Yes',
                                cancelText: 'No',
                                onOk: function () {
                                    window.fireEvent('attachmentRequired', false);
                                    this.doLeaveCancellation();
                                }.bind(this),
                            });
                        }
                    }.bind(this));
                }
            }

            if (!isEdit && ((this.data.LeaveHeader.StatusCode != 7)
                || this.data.LeaveHeader.StatusCode == 0)) {
                this.editButton = new Element('button', {
                    'class': 'blue details-edit-leave-button w-icon-only',
                }).adopt(
                    new Element('span', { 'html': Affinity.icons.Pencil }),
                    new Element('span', { 'html': 'Edit' })
                ).inject(this.buttonsBox);
                this.editButton.addEvent('click', function () {
                    var response = function (data) {
                        if ((data !== null &&
                            data.Data !== null) || data === null) {
                            this.data.LeaveHeader.StatusCode = 6;
                            this.editDetail();
                        }

                       
                       
                    }.bind(this);

                    var editDetail = function () {
                        this.editDetail();
                    }.bind(this);

                    var validationResponse = function (data) {
                        if (!this.isManager && this.data.LeaveHeader.StatusCode == 3) {
                            uialert({
                                message: 'Approved/paid leave must first be cancelled before you can update it. Continue?',
                                showButtons: true,
                                showCancel: true,
                                okText: "Yes",
                                cancelText: 'No',
                                onOk: function () {
                                    this.submitLeave(this.data.LeaveHeader.TSGroupId, 6, 3, response);
                                }.bind(this),
                                onCancel: function () {
                                }
                            });
                        } else if (!this.isManager && this.partialApproved) {
                            uialert({
                                message: 'This Leave Application is partially approved. <br /> Do you want to cancel it to make it editable?',
                                showButtons: true,
                                showCancel: true,
                                okText: 'Yes - Cancel and Edit',
                                okIcon: Affinity.icons.Plane,
                                onOk: function () {
                                    this.submitLeave(this.data.LeaveHeader.TSGroupId, 6, 0, response);
                                }.bind(this),
                                onCancel: function () {
                                }
                            });
                        }
                    }.bind(this);

                    if (!this.isManager && this.data.LeaveHeader.StatusCode == 3) {
                        Affinity.leave.doPositionUpdateOrValidation(this.data.LeaveHeader.TSGroupId, validationResponse, null);
                    } else if (!this.isManager && this.partialApproved) {
                        Affinity.leave.doPositionUpdateOrValidation(this.data.LeaveHeader.TSGroupId, validationResponse, null);
                    } else {
                        Affinity.leave.doPositionUpdateOrValidation(this.data.LeaveHeader.TSGroupId, editDetail, null);
                      //  this.editDetail();
                    }
                }.bind(this));
            }
        }
        this.closeButton = new Element('button', {
            'class': 'grey details-close-leave-button w-icon-only'
        }).adopt(
            new Element('span', { 'html': Affinity.icons.Cross }),
            new Element('span', { 'html': 'Close' })
        ).inject(this.buttonsBox);
        this.closeButton.addEvent('click', function () {
            //if (isEdit) {
            //    if (this.isManager) {
            //        Affinity.leave.manager.refreshAll();
            //    } else {
            //        Affinity.leave.employee.refreshAll();
            //    }
            //}
            Affinity.modal.closeButtonCloser();
        }.bind(this));
    },
    doLeaveCancellation: function () {
        this.submitLeave(this.data.LeaveHeader.TSGroupId, 6, this.data.LeaveHeader.statusCode,
            function (response) {
                if (response.Data !== null) {
                    if (response.Data.LeaveHeader.StatusCode == 6) {
                        this.acknowledgementModal(response, 'Your leave has been cancelled');
                    }
                    else if (response.Data.LeaveHeader.StatusCode == 7) {
                        this.acknowledgementModal(response, 'Leave cancellation has been requested');
                    }
                } else {
                    if (response.Messages[0].length > 0 &&
                        response.Messages[0].Message !== null &&
                        response.Messages[0].Message !== undefined &&
                        response.Messages[0].Message.indexOf('position has changed') > -1) {
                        uialert({
                            'message': response.Messages[0].Message,
                            showButtons: true,
                            noClose: false
                        });
                    }
                }
               
            }.bind(this));
    },

    createCommentReplyEdits: function (target, leaveHeader) {
        this.commentForm = null;
        this.replyForm = null;
        if (!this.isManager || leaveHeader.Comment) {
            this.commentForm = new Element('div', {
                'class': 'form-row'
            });
            this.commentsBox = new Element('div', {
                'class': 'details-comments-box'
            }).inject(this.commentForm);
            this.commentsLabel = new Element('label', {
                'class': 'details-label',
                'html': 'Comments'
            }).inject(this.commentsBox);
        }

        if (this.isManager || leaveHeader.Reply) {
            this.replyForm = new Element('div', {
                'class': 'form-row'
            })
            this.replyBox = new Element('div', {
                'class': 'details-comments-box'
            }).inject(this.replyForm);
            this.replyLabel = new Element('label', {
                'class': 'details-label',
                'html': 'Manager Comments'
            }).inject(this.replyBox);
        }

        if (this.isManager) {
            if (this.commentForm) {
                this.comments = new Element('div', {
                    'class': 'details-comments',
                    'html': leaveHeader.Comment
                }).inject(this.commentsBox);
            }

            this.reply = new Element('textarea', {
                'class': 'edit-reply data-hj-whitelist',
                'rows': '4',
                'html': leaveHeader.Reply
            }).inject(this.replyBox);
            this.replyEdit = new InputEditWidget({
                target: this.replyBox,
                input: this.reply,
                updateInput: function () {
                    var newReply = this.reply.value;
                    if (newReply != this.data.LeaveHeader.Reply) {
                        this.update('Reply', newReply, this.data.LeaveHeader.Reply, leaveHeader.EmployeeNo, leaveHeader.TSGroupId, this.data.LeaveHeader.TimeLastModified,
                            function (response) {
                                if (this.data) {
                                    this.data.LeaveHeader.Reply = response.LeaveHeader.Reply;
                                    this.data.LeaveHeader.TimeLastModified = response.LeaveHeader.TimeLastModified;
                                }
                            }.bind(this));


                    }
                }.bind(this),
                cancelInput: function () {
                    this.reply.set('value', leaveHeader.Reply);
                }.bind(this)
            });
        }
        else {
            if (this.replyForm) {
                this.reply = new Element('div', {
                    'class': 'details-comments',
                    'html': leaveHeader.Reply
                }).inject(this.replyBox);
            }

            this.comments = new Element('textarea', {
                'class': 'edit-comments data-hj-whitelist',
                'rows': '4',
                'html': leaveHeader.Comment
            }).inject(this.commentsBox);
            this.replyEdit = new InputEditWidget({
                target: this.commentsBox,
                input: this.comments,
                updateInput: function () {
                    var newComment = this.comments.value;
                    if (newComment != this.data.LeaveHeader.Comment) {
                        this.update('Comment', newComment, this.data.LeaveHeader.Comment, leaveHeader.EmployeeNo, leaveHeader.TSGroupId, this.data.LeaveHeader.TimeLastModified,
                            function (response, errorMessage) {
                                if (this.data && response !== "error") {
                                    this.data.LeaveHeader.Comment = response.LeaveHeader.Comment;
                                    this.data.LeaveHeader.TimeLastModified = response.LeaveHeader.TimeLastModified;
                                } else if (response === 'error') {
                                    //alert(errorMessage);

                                    var errMessage = "Something's stopping the Comment field from updating. Try again.<br /><br />";
                                    //errMessage += '<span class="color-red">' + errorMessage + '</span>';

                                    uialert({
                                        'message': errMessage,
                                        okText: 'Close',
                                        showButtons: true,
                                        noClose: false
                                    });
                                    // this.data.LeaveHeader.Comment = this.data.LeaveHeader.Comment;
                                    this.comments.value = this.data.LeaveHeader.Comment;
                                }
                            }.bind(this));
                    }
                }.bind(this),
                cancelInput: function () {
                    this.comments.set('value', leaveHeader.Comment);
                }.bind(this)
            });
        }
        if (this.commentForm)
            this.commentForm.inject(target);
        if (this.replyForm)
            this.replyForm.inject(target);
    },

    buildUnitsTotals: function (components) {
        if (this.totalUnitsSection)
            this.totalUnitsSection.empty();
        var isMultiPosition = components.length > 1;
        var positionBoxStyle = 'display:none';
        if (isMultiPosition) {
            positionBoxStyle = 'display:block';
        }
        var total = 0;
        Array.each(components, function (position, index) {
            var positionbox = new Element('div', {
                'class': 'position-units-box',
                'style': positionBoxStyle
            }).inject(this.totalUnitsSection);
            var positionName = new Element('span', {
                'class': 'position-name ui-has-tooltip',
                'html': position.PositionTitle + ': ',
                'data-tooltip': position.PositionTitle,
                'data-tooltip-dir': 'bottom'
            }).inject(positionbox);
            var units = new Element('span', {
                'class': 'position-units',
                'html': position.TotalUnits.toFixed(2),
                'id': position.PositionCode
            }).store('units', position.TotalUnits).inject(positionbox);
            total += position.TotalUnits;
        }.bind(this));

        this.totalUnits = new Element('div', {
            'class': 'total-units'
        }).inject(this.totalUnitsSection, 'bottom');
        this.totalUnitsName = new Element('span', {
            'class': 'total-units-name',
            'html': 'Total: '
        }).inject(this.totalUnits);
        this.totalUnitsUnits = new Element('span', {
            'class': 'total-units-units',
            'html': total.toFixed(2)
        }).inject(this.totalUnits);
        this.totalUnitsUnits.store('total', total);
    },

    createEditableDates: function (leaveHeader, components, positions) {
        var firstDate = Affinity.leave.cleanBadDate(leaveHeader.DateFrom);
        var lastDate = Affinity.leave.cleanBadDate(leaveHeader.DateTo);
        var dateRange = [];
        var currentDate = new Date(firstDate);
        while (currentDate <= lastDate) {
            dateRange.push(new Date(currentDate));
            currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
        }

        var units = this.units.querySelectorAll('.edit-position-hours, .edit-position-days');
        Array.each(units, function (unit) {
            var validation = unit.retrieve('validation');
            if (validation) {
                validation.destroy();
                unit.eliminate('validation');
            }
        }.bind(this));

        var scrollerWidth = 0;
        if (this.gridBody) { this.gridBody.removeEvents(); }
        this.scroller.empty();

        this.positionsLabels.empty();
        var unitsGrid = new Element('div', { 'class': 'unit-grid' }).inject(this.scroller);
        var gridHeader = new Element('div', { 'class': 'unit-gridheader' }).inject(unitsGrid);
        this.gridBody = new Element('div', { 'class': 'unit-gridbody' }).inject(unitsGrid);

        var readOnly = false;
        Array.each(this.config.LeaveCodes, function (code, index) {
            if (leaveHeader.LeaveCode == code.LeaveCode && code.CanEditByDays != undefined) {
                readOnly = !code.CanEditByDays;
            }
        });

        if (!readOnly) {
            this.unitsEdit.attachToInput(this.gridBody);
        }

        var tempDate, dateCell;
        Array.each(dateRange, function (day, index) {
            tempDate = Affinity.leave.cleanBadDate(day);

            dateCell = new Element('div', { 'class': 'day-class d-' + tempDate.format('%d-%b-%y'), 'id': tempDate.format('%d/%b/%y') }).inject(gridHeader);
            dateCell.adopt(
                new Element('div', { 'class': 'day-class-day', 'html': tempDate.format('%a') }),
                new Element('div', { 'class': 'day-class-date', 'html': tempDate.format('%e') }),
                new Element('div', { 'class': 'day-class-my', 'html': tempDate.format('%b \'%y') }),
                new Element('div', { 'class': 'hol-icon icon-plane ui-has-tooltip' })
            );

            scrollerWidth += 79;
        });
        this.scroller.store('width', scrollerWidth);
        this.scroller.setStyle('width', scrollerWidth);

        //var posUnits = [];
        var daysRow, hoursRow, posName, posDate, hours, days, date, component;

        var isEmployeeMultiPositions = true;
        var componentPositions = new Array();
        component = null;
        Array.each(components, function (comp, Index) {
            if (componentPositions.length === 0) {
                componentPositions.push(comp.positionCode);
            } else if (componentPositions.length > 0 &&
                componentPositions.indexOf(comp.positionCode) < 0) {
                componentPositions.push(comp.positionCode);
            }
        });

        if (componentPositions.length === 1 && positions.length == 1) {
            isEmployeeMultiPositions = false;
        }

        Array.each(positions, function (position, index) {
            var pos = new Element('div', { 'class': 'position-label' }).inject(this.positionsLabels);
            var posTitle = new Element('div', { 'class': 'position-title' }).inject(pos);
            new Element('label', {
                'html': position.PositionTitle, 'class': 'ui-has-tooltip',
                'data-tooltip': position.PositionTitle, 'data-tooltip-dir': 'bottom'
            }).inject(posTitle);

            var daysRow;
            var unitLabels = new Element('div', { 'class': 'position-unit-label' }).inject(pos);
            if (leaveHeader.UnitType === 'D') {
                daysRow = new Element('div', { 'class': 'positions-days', 'id': position.PositionCode }).inject(this.gridBody);
                new Element('label', { 'html': '(Days)' }).inject(unitLabels);
            }
            else {
                new Element('label', { 'html': '(Hours)' }).inject(unitLabels);
            }
            hoursRow = new Element('div', { 'class': 'positions-hours', 'id': position.PositionCode }).inject(this.gridBody);
            if (leaveHeader.UnitType === 'D') {
                hoursRow.addClass('hidden');
            }

            component = null;
            Array.each(components, function (comp, Index) {
                if ((comp.PositionCode === position.PositionCode && isEmployeeMultiPositions) ||
                    !isEmployeeMultiPositions) {
                    component = comp;
                }
            });
            if (component) {
                Array.each(dateRange, function (day, index) {
                    date = Affinity.leave.cleanBadDate(day).format('%d/%b/%y');
                    hours = new Element('input', {
                        'class': 'edit-position-hours data-hj-whitelist', 'id': date, 'value': '0.00'
                    }).inject(hoursRow);
                    hours.readOnly = readOnly;
                    if (leaveHeader.UnitType === 'D') {
                        days = new Element('input', {
                            'class': 'edit-position-days data-hj-whitelist', 'id': date, 'value': '0.00'
                        }).inject(daysRow);
                        days.readOnly = readOnly;
                    }

                    (function (hours, days) {
                        var maxHours = 0;
                        var validateUnits;
                        Array.each(component.Units, function (unit, unitIndex) {
                            posDate = Affinity.leave.cleanBadDate(unit.Date).format('%d/%b/%y');
                            if (date === posDate) {
                                maxHours = unit.MaxHours;
                                var h = 0;
                                if (typeOf(unit.HoursAppliedFor) === 'number') {
                                    h = unit.HoursAppliedFor.toFixed(2);
                                }
                                hours.store('old', h);
                                hours.store('init', h);
                                hours.set('value', h);

                                if (!readOnly)
                                    this.setUnitInputEvents(hours, null, day, component, unit, 'H');

                                if (leaveHeader.UnitType === 'D') {
                                    var d = 0;
                                    if (typeOf(unit.DaysAppliedFor) === 'number') {
                                        d = unit.DaysAppliedFor.toFixed(2);
                                    }
                                    days.store('old', d);
                                    days.store('init', d);
                                    days.set('value', d);

                                    if (!readOnly)
                                        this.setUnitInputEvents(days, hours, day, component, unit, 'D');
                                }

                                if (typeOf(unit.IsPublicHoliday) === 'boolean' && unit.IsPublicHoliday === true) {
                                    hours.addClass('public-holiday').addClass('ui-has-tooltip').set('data-tooltip', unit.PublicHolidayName).set('data-tooltip-dir', 'bottom,center');
                                    hours.getParent('.unit-grid').getElement('.day-class.d-' + posDate.replace(/\//gi, '-')).addClass('public-holiday').getElement('.hol-icon').set('data-tooltip', unit.PublicHolidayName).set('data-tooltip-dir', 'bottom,center');
                                }
                            }
                        }.bind(this));
                    }.bind(this))(hours, days);

                }.bind(this));
            }
        }.bind(this));

        //Resize units scroller
        var containerSize = this.scrollerBox.measure(function () { return this.getSize().x; });
        var scrollerSize = this.scroller.measure(function () { return this.getScrollSize().x; });
        if (scrollerSize > containerSize) {
            this.scrollerBox.setStyle('overflow-x', 'scroll');
        } else {
            this.scrollerBox.setStyle('overflow-x', 'hidden');
        }
        //this.editUnitsButtons.setStyle('top', (this.units.getSize().y - 4) + 'px');
        // Affinity.tooltips.processNew();
    },

    setUnitInputEvents: function (input, hoursInput, day, position, unit, unitType) {
        input.addEvent('blur', function (e) {
            e.target.value = Affinity.leave.cleanUnit(e.target.value, e.target.retrieve('initial-value'));
        }.bind(this));

        input.addEvent('change', function (e) {
            input.removeClass('error-border');

            var validation = input.retrieve('validation');
            if (validation) {
                validation.destroy();
                input.eliminate('validation');
            }

            var enableButtons = true;
            var units = this.units.querySelectorAll('.edit-position-hours, .edit-position-days');
            Array.each(units, function (u) {
                if (u.retrieve('validation')) {
                    enableButtons = false;
                    return;
                }
            }.bind(this));

            if (enableButtons) {
                if (this.acceptButton) {
                    this.acceptButton.set('disabled', null);
                    this.acceptButton.removeClass('disabled');
                }
                if (this.declineButton) {
                    this.declineButton.set('disabled', null);
                    this.declineButton.removeClass('disabled');
                }
                if (this.unitsEdit)
                    this.unitsEdit.enableSave();
            }

            var maxUnits = 24;
            var unitLabel = '';
            if (unitType === 'H') {
                maxUnits = unit.MaxHours;
                unitLabel = ' hours';
            } else if (unitType === 'D') {
                if (unit.MaxHours > 0)
                    maxUnits = 1;
                else
                    maxUnits = 0;
                unitLabel = ' day';
            }

            if (input.value > maxUnits) {
                input.addClass('error-border');

                if (this.acceptButton) {
                    this.acceptButton.set('disabled', 'disabled');
                    this.acceptButton.addClass('disabled');
                }
                if (this.declineButton) {
                    this.declineButton.set('disabled', 'disabled');
                    this.declineButton.addClass('disabled');
                }
                if (this.unitsEdit)
                    this.unitsEdit.disableSave();

                var validation = new Element('div', { 'class': 'form-row unit-validation' }).adopt(
                    new Element('span', { 'class': 'icon-warning' }),
                    new Element('span', {
                        'html': 'Please enter a value up to ' + maxUnits + ' ' + unitLabel + ' on ' + Affinity.leave.cleanBadDate(day).format('%d/%b/%y') + ' for ' + position.PositionTitle + '.'
                    })
                );
                this.units.adopt(validation);
                input.store('validation', validation);
            } else {
                var value = input.value === '' ? 0 : parseFloat(input.value);
                this.updateTotals(value, input.retrieve('old'), position.PositionCode);
                input.store('old', value);

                if (hoursInput) {
                    var schedHours = unit.HoursWorkScheduled;

                    if (!schedHours || schedHours <= 0)
                        schedHours = unit.HoursStandard;

                    if (schedHours > 0) {
                        hoursInput.set('value', (value * schedHours).toFixed(2));
                    }
                }
            }
            //this.editUnitsButtons.setStyle('top', (this.units.getSize().y - 4) + 'px');
        }.bind(this));
    },

    updateTotals: function (newValue, oldValue, positionCode) {

        //SG: If the edit modal is already closed then no need to update totals, however we need to refresh the page.

        if (document.id('uimodal') && document.id('uimodal').style.visibility != 'hidden') {
            var totals = document.getElements('.position-units');
            var totalUnits = document.getElement('.total-units-units');

            var diff = Math.abs(newValue - oldValue);

            var posValue, newTotal, oldT, newT, foundApprover, approverSelectors, approvers;

            Array.each(totals, function (posTotal, index) {

                if (posTotal.get('id') === positionCode) {

                    if (newValue > oldValue) {

                        posValue = posTotal.retrieve('units');
                        newTotal = posValue + diff;

                        posTotal.set('html', newTotal.toFixed(2));
                        posTotal.store('units', newTotal);

                        oldT = totalUnits.retrieve('total');
                        newT = oldT + diff;

                        totalUnits.set('html', newT.toFixed(2));
                        totalUnits.store('total', newT);

                    } else {

                        posValue = posTotal.retrieve('units');
                        newTotal = posValue - diff;

                        posTotal.set('html', newTotal.toFixed(2));
                        posTotal.store('units', newTotal);

                        oldT = totalUnits.retrieve('total');
                        newT = oldT - diff;

                        totalUnits.set('html', newT.toFixed(2));
                        totalUnits.store('total', newT);

                    }

                    if (newTotal == 0 && posValue != 0) {
                        posTotal.getParent().destroy();

                        foundApprover = false;
                        approverSelectors = document.getElements('.details-positions-box .leave-approver-selector');

                        Array.each(approverSelectors, function (approverSelector) {
                            if (!foundApprover && approverSelector.get('id') == positionCode) {
                                approverSelector.getParent().destroy();
                                foundApprover = true;
                            }
                        });

                        if (!foundApprover) {
                            approvers = document.getElements('.details-position-approver');
                            Array.each(approvers, function (approver) {
                                if (!foundApprover && approver.get('id') == positionCode) {
                                    approver.destroy();
                                    foundApprover = true;
                                }
                            });
                        }
                    }
                }
            });
        }
        else {
            if (!this.isManager && 'employee' in Affinity.leave) {
                //document.getElement('.leave-info-panels').empty();
                //document.getElement('.myLeaveHistoryTable').empty();
                Affinity.leave.employee.refreshAll();
            } else if (this.isManager && 'manager' in Affinity.leave) {
                Affinity.leave.manager.refreshAll();
            }
        }
    },
    doUpdateUnits: function (updates, updateTotals, updateUnits, doOnUpdate) {
        new Request.JSON({
            url: this._api,
            method: 'post',
            emulation: false,
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            urlEncoded: false,
            onRequest: function () {
                Affinity.leave.lockui('leaveDetail-updateUnitsRequest');
            },
            onFailure: function (e) {
                Affinity.leave.unlockui('leaveDetail-updateUnitsRequest');
                prompts.hide();
                if (doOnUpdate && typeOf(doOnUpdate) === 'function') {
                    var errorMessage = "";
                    var parsed = false;
                    var jsonData = e.response;
                    try {
                        parsed = JSON.parse(jsonData);
                    } catch (e) { }
                    if (typeOf(parsed) === 'object') {
                        if (parsed.Exception !== undefined &&
                            parsed.Exception.Message !== undefined) {
                            errorMessage = parsed.Exception.Message;
                        }
                        doOnUpdate("error", updateTotals, updateUnits, errorMessage);
                    } else {
                        doOnUpdate("error", updateTotals, updateUnits, "Internal Server Error");
                    }
                }
                //Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
            },
            onException: function () {
                Affinity.leave.unlockui('leaveDetail-updateUnitsRequest');
                prompts.hide();
                if (doOnUpdate && typeOf(doOnUpdate) === 'function') {
                    var errorMessage = "";
                    var parsed = false;
                    var jsonData = e.response;
                    try {
                        parsed = JSON.parse(jsonData);
                    } catch (e) { }
                    if (typeOf(parsed) === 'object') {
                        if (parsed.Exception !== undefined &&
                            parsed.Exception.Message !== undefined) {
                            errorMessage = parsed.Exception.Message;
                        }
                        doOnUpdate("error", updateTotals, updateUnits, errorMessage);
                    } else {
                        doOnUpdate("error", updateTotals, updateUnits, "Internal Server Error");
                    }
                }

            },
            onCancel: function () {
                Affinity.leave.unlockui('leaveDetail-updateUnitsRequest');
            },
            onSuccess: function (response) {
                Affinity.leave.unlockui('leaveDetail-updateUnitsRequest');
                if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName, true)) {
                    var newTimeStamp = this.data.LeaveHeader.TimeLastModified ? Date.parse(this.data.LeaveHeader.TimeLastModified) : null;
                    if (Affinity.leave.manager) {
                        this.requireUpdate = this.requireUpdate || response.RequireUpdate;
                        if (!this.requireUpdate && (!this.timeLastModified || newTimeStamp.getTime() > this.timeLastModified.getTime()))
                            this.timeLastModified = newTimeStamp;
                    }
                    this.data = response.Data;
                    if (this.data.Components !== undefined &&
                        this.data.Components.length !== undefined &&
                        this.data.Components.length > 0 &&
                        this.data.Components[0].Authorisation !== undefined &&
                        this.data.Components[0].Authorisation.AuthorisationId !== undefined) {
                        if (this.authorisation !== undefined &&
                            this.authorisation !== null) {
                            this.authorisation.AuthorisationId = this.data.Components[0].Authorisation.AuthorisationId;
                            this.authorisationId = this.authorisation.AuthorisationId;
                        }

                    }

                    this.buildUnitsTotals(this.data.Components);
                    this.createApproverBoxes(this.data.Components, this.positions);
                    this.createEditableDates(this.data.LeaveHeader, this.data.Components, this.positions);
                    Affinity.tooltips.processNew();

                    if (this.isManager) {
                        Affinity.leave.manager.refreshAll();
                    } else {
                        Affinity.leave.employee.refreshAll();
                    }
                }
                prompts.hide();
                this.errorChecking(response);
            }.bind(this)
        }).post(JSON.stringify(updates));
    },
    updateUnits: function () {
        var posHoursArray = this.gridBody.getElements('.positions-hours');
        var posDaysArray = this.gridBody.getElements('.positions-days');
        var updates = [];
        var inDays = this.data.LeaveHeader.UnitType == 'D';
        var posCode, date, posDays, days, newHours, oldHours, newDays, oldDays;

        Array.each(posHoursArray, function (posHours, i) {
            posCode = posHours.get('id');
            if (inDays)
                posDays = posDaysArray[i].getElements('.edit-position-days');

            Array.each(posHours.getElements('.edit-position-hours'), function (hours, j) {
                date = hours.get('id');
                if (inDays)
                    days = posDays[j];

                newHours = hours.value === '' ? 0 : parseFloat(hours.value);
                oldHours = hours.retrieve('init');
                if (!oldHours || oldHours === '')
                    oldHours = 0;
                if (inDays) {
                    newDays = days.value === '' ? 0 : parseFloat(days.value);
                    oldDays = days.retrieve('init');
                    if (!oldDays || oldDays === '')
                        oldDays = 0;
                }

                if (newHours != oldHours || newDays != oldDays) {
                    updates.push({
                        PositionCode: posCode,
                        Date: date,
                        NewHours: newHours,
                        OldHours: oldHours,
                        NewDays: newDays,
                        OldDays: oldDays
                    });
                }
            });
        });

        if (updates.length > 0) {
            if (!this.updateUnitsRequest)
                return;

            uialert({
                message: 'Updating Leave Units',
                showLoader: true,
                showButtons: false,
                noClose: true
            });

            this._methodName = 'ui.leave.detail.js -> updateUnits';
            var path = 'UpdateLeaveUnits/' + this.data.LeaveHeader.EmployeeNo + '/' + this.data.LeaveHeader.TSGroupId;
            if (this.isManager && this.data.LeaveHeader.TimeLastModified) {
                path = path + '?timeLastModified=' + this.data.LeaveHeader.TimeLastModified;
            }

            this._api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + path);
            if (this.updateUnitsRequest && this.updateUnitsRequest.isRunning()) {
                this.updateUnitsRequest.cancel();
            }
            this.updateUnitsRequest.url = this.updateUnitsRequest.options.url = this._api;
            var positionCode = this.data.LeaveHeader.PositionCode;

            //this.updateUnitsRequest.post(JSON.stringify(updates));
            this.doUpdateUnits(updates, this.updateTotals, this.updateUnits, function (response, updateTotals, updateUnits, errorMessage) {
                if (response === 'error') {
                    if (inDays) {
                        document.getElementsByClassName("edit-position-days")[0].value = oldDays;
                        updateTotals(oldDays, newDays, positionCode);
                        //input.store('old', value);
                        document.getElementsByClassName("edit-position-days")[0].store('old', oldDays);
                    } else {
                        document.getElementsByClassName("edit-position-hours")[0].value = oldHours;
                        updateTotals(oldHours, newHours, positionCode);
                        document.getElementsByClassName("edit-position-hours")[0].store('old', oldHours);

                    }

                    var errMessage = "Something's stopping the Unit field from updating. Try again.<br /><br />";
                    //errMessage += '<span class="color-red">' + errorMessage + '</span>';

                    //uialert({
                    //    'message': errMessage,
                    //    showButtons: false,
                    //    noClose: false
                    //});

                    uialert({
                        message: errMessage,
                        okText: 'Close',
                        showButtons: true,
                        showCancel: false,
                        noClose: false
                    });

                }
            });


        }
    },

    newLeaveReason: function (config, typeIndex) {
        if (this.reasonBox && this.reasonSelector) {
            this.reasonSelector.empty();

            new Element('option', {
                'value': '',
                'id': 'null', //SG: ideally need to pass actual null not string. this will do for now. 
                'html': ''
            }).inject(this.reasonSelector, 'top')



            var leaveCodes = null;


            //if (config !== undefined && config.LeaveCodes !== undefined) {
            //    config.LeaveCodes;
            //}

            if (this.isManager) {
                leaveCodes = Affinity.leave.manager.config.LeaveCodes;
            } else {
                leaveCodes = leaveCodes = Affinity.leave.employee.config.LeaveCodes;
            }

            if (typeof (leaveCodes[typeIndex]) != 'undefined' && leaveCodes[typeIndex].Reasons) {
                var reasons = leaveCodes[typeIndex].Reasons
                Array.each(reasons, function (leaveReason, index) {
                    var option = new Element('option',
                        {
                            'value': index,
                            'html': leaveReason.Description,
                            'id': leaveReason.ReasonCode
                        }).inject(this.reasonSelector);
                }.bind(this));
                this.reasonSelector.selectedIndex = 0;
            }
        }

        if (document.getElement('.details-reason-box .required')) {
            document.getElement('.details-reason-box .required').remove();
        }
        if (document.getElement('.edit-leave-attachment .required')) {
            document.getElement('.edit-leave-attachment .required').remove();
        }
        if (typeof (leaveCodes[typeIndex]) != 'undefined') {
            if (leaveCodes[typeIndex].MandatoryReason === true) {
                var label = document.getElement('.details-reason-box label');
                new Element('span', {
                    'class': 'required',
                    'html': '*required'
                }).inject(label, 'bottom');
            }

            if (leaveCodes[typeIndex].MandatoryAttachment === true) {
                var label = document.getElement('.edit-leave-attachment label');
                new Element('span', {
                    'class': 'required',
                    'html': '*required'
                }).inject(label, 'bottom');
            }
        }
    },

    setStartDate: function () {
        //var fromDateWidget = Affinity.leave.employee.modalEls.fromDateWidget;
        //var toDateWidget = Affinity.leave.employee.modalEls.toDateWidget;
        //var fromDateBox = Affinity.leave.employee.modalEls.fromDateBox;
        //var toDateBox = Affinity.leave.employee.modalEls.toDateBox;
        var fromDateHidden = this.modalEls.fromDateHidden;
        var toDateHidden = this.modalEls.toDateHidden;
        if (this.fromDateWidget.getRawDate().greaterThan(this.toDateWidget.getRawDate())) {
            //var fromDate = this.fromDateWidget.getRawDate().clone();
            //var toDate = fromDate.clone();
            //this.fromDateWidget.setDate(fromDate);
            //this.toDateWidget.setDate(toDate);
            uialert({
                message: 'Oops! Something went wrong!<br /> Unable to change First Day to after Last Day.',
                showLoader: false,
                showButtons: true,
                noClose: false
            });
            return false;
        }
        Affinity.leave.setDates(this.fromDateBox, this.fromDateWidget.getRawDate());
        Affinity.leave.setDates(this.toDateBox, this.toDateWidget.getRawDate());
        this.modalEls.fromDateHidden = this.fromDateWidget.getDate();
        this.modalEls.toDateHidden = this.toDateWidget.getDate();
        return true;
    },

    setEndDate: function () {
        //var fromDateWidget = Affinity.leave.employee.modalEls.fromDateWidget;
        //var toDateWidget = Affinity.leave.employee.modalEls.toDateWidget;
        //var fromDateBox = Affinity.leave.employee.modalEls.fromDateBox;
        //var toDateBox = Affinity.leave.employee.modalEls.toDateBox;
        var fromDateHidden = this.modalEls.fromDateHidden;
        var toDateHidden = this.modalEls.toDateHidden;
        if (this.toDateWidget.getRawDate().lessThan(this.fromDateWidget.getRawDate())) {
            //var toDate = this.toDateWidget.getRawDate().clone();
            //var fromDate = toDate.clone();
            //this.fromDateWidget.setDate(fromDate);
            //this.toDateWidget.setDate(toDate);
            uialert({
                message: 'Oops! Something went wrong!<br /> Unable to change Last Day to before First Day.',
                showLoader: false,
                showButtons: true,
                noClose: false
            });
            return false;
        }
        Affinity.leave.setDates(this.fromDateBox, this.fromDateWidget.getRawDate());
        Affinity.leave.setDates(this.toDateBox, this.toDateWidget.getRawDate());
        this.modalEls.fromDateHidden = this.fromDateWidget.getDate();
        this.modalEls.toDateHidden = this.toDateWidget.getDate();
        return true;
    },

    updateDate: function (field, newDate, oldDate, positions) {

        //window.fireEvent('CreateMissingLeaveUnitsSuccess');
        this.update(field, newDate, oldDate, this.data.LeaveHeader.EmployeeNo, this.data.LeaveHeader.TSGroupId, this.data.LeaveHeader.TimeLastModified, function (leave) {
            this.buildUnitsTotals(leave.Components);
            this.createApproverBoxes(leave.Components, positions);
            this.createEditableDates(leave.LeaveHeader, leave.Components, positions);
            this.data.LeaveHeader.TimeLastModified = leave.LeaveHeader.TimeLastModified;

            Affinity.tooltips.processNew();
            //this.createPositionUnits(positions, response, daterange, field, newDate);
            if (this.isManager) {
                Affinity.leave.manager.refreshAll();
            } else {
                Affinity.leave.employee.refreshAll();
            }
        }.bind(this));
    },

    createApproverBoxes: function (components, positions) {

        //var approverBox = new Element('div', {
        //    'class': 'detail-approver-box'
        //}).inject(this.unitsBox);

        var isEmployeeMultiPositions = true;
        var componentPositions = new Array();
        component = null;
        Array.each(components, function (comp, Index) {
            if (componentPositions.length === 0) {
                componentPositions.push(comp.positionCode);
            } else if (componentPositions.length > 0 &&
                componentPositions.indexOf(comp.positionCode) < 0) {
                componentPositions.push(comp.positionCode);
            }
        });

        if (componentPositions.length === 1 && positions.length == 1) {
            isEmployeeMultiPositions = false;
        }

        if (this.approverBox)
            this.approverBox.empty();

        Array.each(components, function (componant, index) {
            var posBox = new Element('div', {
                'class': 'details-position-approver authoriserId',
                'id': componant.PositionCode
            }).inject(this.approverBox);
            if (componant.Authorisation) {
                posBox.store('authId', componant.Authorisation.AuthorisationId);
            }

            if (this.isManager) {
                var approverSelector = new Element('span').inject(posBox);
                if (componant.Authorisation) {
                    if (componant.Authorisation.ApprovedBy) {
                        approverSelector.set('html', componant.Authorisation.ApprovedByName);
                    } else {
                        approverSelector.set('html', componant.Authorisation.SubmittedToName);
                    }
                }
            } else {
                var approverSelector = new Element('select', {
                    'class': 'leave-approver-selector authoriserId'
                }).inject(posBox);
                approverSelector.addEvent('change', this.updateAuthoriser);


                

                if (componant.Authorisation && componant.Authorisation.AuthorisationId) {
                    approverSelector.store('authId', componant.Authorisation.AuthorisationId);
                    //var positions = Affinity.leave.employee.config.Positions;
                    Array.each(positions, function (position) {
                        if ((componant.PositionCode == position.PositionCode && isEmployeeMultiPositions) ||
                            !isEmployeeMultiPositions) {
                            Array.each(position.SubmittedTos, function (approver, index) {
                                var option = new Element('option', {
                                    'value': index + 1
                                }).inject(approverSelector);
                                option.set('html', approver.EmployeeName + ' (' + approver.EmployeeNo + ')');
                                option.set('id', approver.EmployeeNo);
                                if (/*componant.Authorisation &&*/ (parseInt(componant.Authorisation.SubmittedTo) === parseInt(approver.EmployeeNo))) {
                                    option.set('selected', 'selected');
                                    approverSelector.store('old', approver.EmployeeNo);
                                }
                            });
                        }
                    });
                } else {
                    Affinity.modal.clear();
                    Affinity.modal.hide();
                    prompts.hide();
                    Affinity.tooltips.hideAll();
                    (function () {
                        Affinity.modal.clear();
                        Affinity.modal.hide();
                        prompts.hide();
                        Affinity.tooltips.hideAll();
                        uialert({
                            showLoader: false,
                            noClose: false,
                            showButtons: true,
                            message: 'Can not find an Authoriser ID.<br />This Leave record is missing vital information or is corrupted.<br />Please contact your administrator.'
                        });
                    }).delay(1000, this);
                    return;
                }
            }

            if (this.data.LeaveHeader.StatusCode != -1 && this.data.LeaveHeader.StatusCode != 6) {
                var approved = new Element('div', {
                    'class': 'tickcross font-icons color'
                }).inject(posBox);
                if (componant.Authorisation && componant.Authorisation.StatusCode === 3) {
                    approved.addClass('ui-has-tooltip').set('data-tooltip', 'Leave is approved');
                    approved.addClass('icon-thumbs-up');
                    approved.addClass('green');
                } else if (componant.Authorisation && componant.Authorisation.StatusCode === 2) {
                    approved.addClass('red');
                    approved.addClass('ui-has-tooltip').set('data-tooltip', 'Leave is declined');
                    approved.addClass('icon-thumbs-down');
                } else if (componant.Authorisation) {
                    approved.addClass('ui-has-tooltip').set('data-tooltip', 'Leave is pending approval');
                    approved.addClass('icon-hourglass');
                    approved.addClass('blue');
                }
            }
        }.bind(this));
    },

    populateForwardHistory: function (forwards, parentEl) {
        //var forwardsForm = new Element('div', {
        //    'class': 'form-row'
        //}).inject(parentEl);

        if (forwards && parentEl && forwards.length > 0) {

            var forwardsBox = new Element('div', {
                'class': 'details-forwards-box form-row'
            }).inject(parentEl);

            var forwardsLabel = new Element('label', {
                'class': 'details-label',
                'html': 'Forwards'
            }).inject(forwardsBox);

            var forwardsHistory = new Element('table', {
                'class': 'details-forwards-history'
            }).inject(forwardsBox);

            var forwardHead = new Element('thead', {
                'class': ''
            }).inject(forwardsHistory);

            new Element('tr', {
                'class': 'forward-row'
            }).adopt(

                new Element('th', {
                    'class': '',
                    'html': 'Date Forwarded'
                }),

                new Element('th', {
                    'class': '',
                    'html': 'Forwarded By'
                }),

                new Element('th', {
                    'class': '',
                    'html': 'Forwarded To'
                }),

                //new Element('th', {
                //    'class': '',
                //    'html': 'Approved'
                //}),

                new Element('th', {
                    'class': '',
                    'html': 'Reason'
                })

            ).inject(forwardHead);

            var forwardBody = new Element('tbody', {
                'class': ''
            }).inject(forwardsHistory);

            Array.each(forwards, function (forward, index) {

                new Element('tr', { 'class': 'forward-row' }).adopt(

                    new Element('td', {
                        'class': '',
                        'html': Affinity.leave.cleanBadDate(forward.TimeForwarded).format('%d-%b-%Y')
                    }),

                    new Element('td', {
                        'class': '',
                        'html': forward.ForwardedByName
                    }),

                    new Element('td', {
                        'class': '',
                        'html': forward.ForwardedToName
                    }),

                    //new Element('td', {
                    //    'class': '',
                    //    'html': forward.Approved
                    //}),

                    new Element('td', {
                        'class': '',
                        'html': forward.Comment
                    })

                ).inject(forwardBody);

            });
        }

        //return forwardsBox;
    },

    update: function (fieldName, newValue, oldValue, employeeNo, leaveId, timeLastModified, doOnSuccess, doOnError) {

        var value = {
            FieldName: fieldName,
            NewValue: newValue,
            OldValue: oldValue
        };

        var methodName = 'ui.myLeave.js -> update';

        var employeeNum = typeOf(employeeNo) !== 'null' ? employeeNo : Affinity.login.profile.employeeNumber;

        var queryString = '';
        if (timeLastModified) {
            queryString = '?timeLastModified=' + timeLastModified;
        }

        if (!leaveId) {
            leaveId = document.getElement('.leave-id').retrieve('old');
        }

        var api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'UpdateLeave/' + employeeNum + '/' + leaveId + queryString);
        new Request.JSON({
            url: api,
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            urlEncoded: false,
            onRequest: function () {
                Affinity.leave.lockui('myleave-update');
            },
            onFailure: function (e) {
                Affinity.leave.unlockui('myleave-update');
                if (fieldName === 'Comment' ||
                    fieldName === 'LeaveCode' ||
                    fieldName === 'ReasonCode') {
                    if (doOnSuccess && typeOf(doOnSuccess) === 'function') {
                        var errorMessage = "";
                        var parsed = false;
                        var jsonData = e.response;
                        try {
                            parsed = JSON.parse(jsonData);
                        } catch (e) { }
                        if (typeOf(parsed) === 'object') {
                            if (parsed.Exception !== undefined &&
                                parsed.Exception.Message !== undefined) {
                                errorMessage = parsed.Exception.Message;
                            }
                        }


                        doOnSuccess("error", errorMessage);
                    }
                } else {
                    Affinity.leave.handleXHRErrors(e, api, methodName);
                }



            },
            onException: function () {
                Affinity.leave.unlockui('myleave-update');
                if (fieldName === 'Comment' ||
                    fieldName === 'LeaveCode' ||
                    fieldName === 'ReasonCode') {
                    if (doOnSuccess && typeOf(doOnSuccess) === 'function') {
                        var errorMessage = "";
                        var parsed = false;
                        var jsonData = e.response;
                        try {
                            parsed = JSON.parse(jsonData);
                        } catch (e) { }
                        if (typeOf(parsed) === 'object') {
                            if (parsed.Exception !== undefined &&
                                parsed.Exception.Message !== undefined) {
                                errorMessage = parsed.Exception.Message;
                            }
                        }


                        doOnSuccess("error", errorMessage);
                    }
                }
            },
            onCancel: function () {
                Affinity.leave.unlockui('myleave-update');
            },
            onSuccess: function (response) {
                Affinity.leave.unlockui('myleave-update');
                if (!Affinity.leave.isErrorInJson(response, api, methodName, true)) {
                    window.fireEvent('UpdateLeaveSuccess');

                    console.debug('Time stamp log start');
                    console.debug('Old timestamp: ' + timeLastModified);
                    if (Affinity.leave.manager && timeLastModified && response.Data != null) {
                        //Affinity.leave.manager.leaveHistory.getHistory(null, true); 
                        //Affinity.leave.manager.leaveHistory.refreshHistory(false)// refresh timestamps on history
                        console.debug('New time stamp: ' + response.Data.LeaveHeader.TimeLastModified);
                        var newTimeStamp = Affinity.leave.cleanBadDate(response.Data.LeaveHeader.TimeLastModified);
                        console.debug('Cleaned time stamp: ' + newTimeStamp);
                        console.debug('Stored timestamp: ' + Affinity.leave.manager.leaveDetail.timeLastModified);
                        if (!Affinity.leave.manager.leaveDetail.timeLastModified || newTimeStamp.getTime() > Affinity.leave.manager.leaveDetail.timeLastModified.getTime()) {
                            console.debug('Time stamp update succeeded');
                            Affinity.leave.manager.leaveDetail.timeLastModified = newTimeStamp;
                        }
                        else {
                            console.debug('Time stamp update failed');
                        }
                        Affinity.leave.manager.leaveDetail.requireUpdate = Affinity.leave.manager.leaveDetail.requireUpdate || response.RequireUpdate;
                    }

                    if (doOnSuccess && typeOf(doOnSuccess) === 'function') {
                        if ((fieldName === 'Comment' ||
                            fieldName === 'LeaveCode' ||
                            fieldName === 'ReasonCode') &&
                            response.Data === null &&
                            response.Response != null) {
                            doOnSuccess("error", response.Response);
                        } else {
                            doOnSuccess(response.Data);
                        }

                    }
                } else {
                    //doOnError(fieldName, oldValue, newValue);
                    this.errorChecking(response);
                }

                this.errorChecking(response);
            }.bind(this)
        }).post(JSON.stringify(value));

    },

    errorChecking: function (response) {
        if (document.getElement('.messages')) {
            var messages = document.getElement('.messages').empty();
            var warnings = new Element('div').inject(messages);
            var wList = new Element('ul').inject(warnings);
            var hasWarning = false;
            var errors = new Element('div').inject(messages);
            var eList = new Element('ul').inject(errors);
            var hasError = false;
            if (response.Messages.length > 0) {
                Array.each(response.Messages, function (message, index) {
                    if (message.MessageType === 1) {
                        
                        uialert({
                            message: message.Message,
                            showButtons: true,
                            showCancel: false,
                            okText: 'OK',
                        });
                    }
                    if (message.MessageType === 0) {
                        if (message.Message === 'You must attach supporting documentation when applying for this type of leave.') {
                            //window.fireEvent('attachmentRequired', true);
                            uialert({
                                message: message.Message,
                                showButtons: true,
                                showCancel: false,
                                okText: 'OK',
                            });
                            //hasError = true;
                        } else {
                            new Element('li', { 'html': message.Message }).inject(eList);
                            hasError = true;
                        }
                        
                    }
                });
            }

            if (response.Exception != null) {
                new Element('li', { 'html': response.Exception }).inject(eList);
                hasError = true;
            }

            if (hasError) {
                errors.addClass('acknowledgement-errors');
            }
        }
    },
    doUpdateAuthoriser: function (apiUrl, value, authSelect, doOnUpdate) {
        new Request.JSON({
            url: apiUrl,
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            urlEncoded: false,
            onRequest: function () {
                Affinity.leave.lockui('leaveDetail-updateAuthoriser');
            },
            onFailure: function (e) {
                Affinity.leave.unlockui('leaveDetail-updateAuthoriser');
                // Affinity.leave.handleXHRErrors(e, api, methodName);
                if (doOnUpdate && typeOf(doOnUpdate) === 'function') {
                    var errorMessage = "";
                    var parsed = false;
                    var jsonData = e.response;
                    try {
                        parsed = JSON.parse(jsonData);
                    } catch (e) { }
                    if (typeOf(parsed) === 'object') {
                        if (parsed.Exception !== undefined &&
                            parsed.Exception.Message !== undefined) {
                            errorMessage = parsed.Exception.Message;
                        }
                        doOnUpdate("error", errorMessage);
                    } else {
                        doOnUpdate("error", "Internal Server Error.");
                    }
                }
            },
            onException: function () {
                Affinity.leave.unlockui('leaveDetail-updateAuthoriser');
                if (doOnUpdate && typeOf(doOnUpdate) === 'function') {
                    var errorMessage = "";
                    var parsed = false;
                    var jsonData = e.response;
                    try {
                        parsed = JSON.parse(jsonData);
                    } catch (e) { }
                    if (typeOf(parsed) === 'object') {
                        if (parsed.Exception !== undefined &&
                            parsed.Exception.Message !== undefined) {
                            errorMessage = parsed.Exception.Message;
                        }
                        doOnUpdate("error", errorMessage);
                    } else {
                        doOnUpdate("error", "Internal Server Error.");
                    }
                }
            },
            onCancel: function () {
                Affinity.leave.unlockui('leaveDetail-updateAuthoriser');
            },
            onSuccess: function (response) {
                Affinity.leave.unlockui('leaveDetail-updateAuthoriser');
                if (!Affinity.leave.isErrorInJson(response, api, methodName)) {
                    authSelect.store('old', newValue);
                } else {
                    var index = authSelect.getElements('option').indexOf(authSelect.getElement('#' + oldValue));
                    authSelect.selectedIndex = index;
                }
            }
        }).post(JSON.stringify(value));
    },
    updateAuthoriser: function (e) {
        var authSelect = e.target;
        var authorisationId = authSelect.retrieve('authId');
        var oldValue = authSelect.retrieve('old');
        var newValue = authSelect.getElements('option')[authSelect.selectedIndex].get('id');
        var leaveId = authSelect.getParent('.default-form').getElement('.leave-id').retrieve('old');
        var value = {
            FieldName: 'SubmittedTo',
            NewValue: newValue,
            OldValue: oldValue
        };
        var employeeNum = Affinity.login.profile.employeeNumber;
        var methodName = 'ui.leave.detail.js -> updateAuthoriser';
        var api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'UpdateLeaveAuthorisation/' + employeeNum + '/' + leaveId + '/' + authorisationId);
        this.doUpdateAuthoriser(api, value, authSelect,
            function (response, errorMessage) {
                if (response === "error") {
                    var errMessage = "Something's stopping the Employee field from updating. Check your selection then try again.<br /><br />";

                    uialert({
                        'message': errMessage,
                        okText: 'Close',
                        showButtons: true,
                        noClose: false
                    });
                    // this.data.LeaveHeader.Comment = this.data.LeaveHeader.Comment;
                    // this.comments.value = this.data.LeaveHeader.Comment;
                    //var originIndex = this.typeSelector.getElements("options").indexOf(this.typeSelector.getElement("#" + this.data.LeaveHeader.LeaveCode));

                    var originIndex = -1;
                    for (var i = 0; i < authSelect.getElements("option").length; i++) {
                        var currentOption = authSelect.getElements("option")[i];
                        if (currentOption.id === oldValue.toString()) {
                            originIndex = currentOption.index;
                            break;
                        }
                    }
                    if (originIndex != - 1) {
                        authSelect.selectedIndex = originIndex;
                    }
                }

            });
    },

    bossResponse: function (empNo, leaveId, oldStatus, statusChange, authorisationId, timeStamp) {
        if (!this.bossResponseRequest)
            return;

        uialert({
            message: (statusChange === 3 ? 'Approving' : statusChange === 2 ? 'Declining' : 'Processing') + ' Leave',
            showLoader: true,
            noClose: true,
            showButtons: false
        });

        var value = {
            FieldName: 'StatusCode',
            NewValue: statusChange,
            OldValue: oldStatus
        };
        this._statusChange = statusChange;
        this._methodName = 'ui.leave.detail.js -> bossResponse';
        var path = 'UpdateLeave/' + empNo + '/' + leaveId;
        this.bossResponseRequest.isCancellation = oldStatus == 7;
        if (authorisationId == '-1') {
            if (this.bossResponseRequest.isCancellation === false) {
                if (oldStatus == 7) {
                    if (statusChange == 3) {
                        path = 'ApproveCancelled/' + empNo + '/' + leaveId;
                    }
                    else {
                        value.NewValue = '3';
                    }
                }
            }

        } else {
            if (this.bossResponseRequest.isCancellation === false) {
                path = 'UpdateLeaveAuthorisation/' + empNo + '/' + leaveId + '/' + authorisationId;
            }

        }
        if (timeStamp) {
            path = path + '?timeLastModified=' + timeStamp;
        }

        this._api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + path);
        (function () {
            if (this.bossResponseRequest && this.bossResponseRequest.isRunning()) {
                this.bossResponseRequest.cancel();
            }
            this.bossResponseRequest.url = this.bossResponseRequest.options.url = this._api;
            this.bossResponseRequest.post(JSON.stringify(value));
        }).delay(1000, this);
    },

    deleteLeave: function (empNo, leaveId) {
        var methodName = 'ui.leave.detail.js -> deleteLeave';
        var api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'DeleteLeave/' + empNo + '/' + leaveId);
        new Request.JSON({
            url: api,
            onRequest: function () {
                Affinity.leave.lockui('myleaveleaveDetail-deleteLeave');
            },
            onFailure: function (e) {
                Affinity.leave.unlockui('leaveDetail-deleteLeave');
                Affinity.leave.handleXHRErrors(e, api, methodName);
            },
            onException: function () {
                Affinity.leave.unlockui('leaveDetail-deleteLeave');
            },
            onCancel: function () {
                Affinity.leave.unlockui('leaveDetail-deleteLeave');
            },
            onSuccess: function (response) {
                Affinity.leave.unlockui('leaveDetail-deleteLeave');
                if (!Affinity.leave.isErrorInJson(response, api, methodName)) {
                    window.fireEvent('DeleteLeaveSuccess');
                }
            }
        }).get();
    },

    submitLeave: function (leaveID, newStatus, oldStatus, onResponse) {
        window.fireEvent('attachmentRequired', false);
        if (!this.submitLeaveRequest)
            return;

        var value = {
            FieldName: 'StatusCode',
            NewValue: newStatus,
            OldValue: oldStatus //0 to resubmit partial approved leave
        };

        var alertText;
        if (newStatus == 6) {
            alertText = 'Cancelling Leave Application'
        }
        else if (newStatus == 0) {
            alertText = 'Submitting Leave Application'
        }
        setTimeout(function () {
            uialert({
                message: alertText,
                showButtons: false,
                showLoader: true,
                noClose: true
            });
        }, 10);

        this._methodName = 'ui.leave.history.js -> resubmitLeave';
        this._onResponse = onResponse;

        if (this.isManager &&
            newStatus === 0) {
            this._api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'UpdateLeave/' + this.data.LeaveHeader.EmployeeNo + '/' + leaveID);
        } else {
            this._api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'UpdateLeave/' + Affinity.login.profile.employeeNumber + '/' + leaveID);
        }



        if (this.submitLeaveRequest && this.submitLeaveRequest.isRunning()) {
            this.submitLeaveRequest.cancel();
        }
        this.submitLeaveRequest.url = this.submitLeaveRequest.options.url = this._api;
        this.submitLeaveRequest.post(JSON.stringify(value));
    },
    checkAttachmentsFileSize: function (e) {

        var maxFileSize = 20963328; /* 19.99 MB */
        if (e !== undefined &&
            e.fileElement !== undefined &&
            e.fileElement.files !== undefined) {
            var numberOfFiles = e.fileElement.files.length;
            var files = e.fileElement.files;
            for (var i = 0; i < numberOfFiles; i++) {
                if (files[i].size !== undefined &&
                    files[i].size > maxFileSize) {

                    var trElements = this.attachWidgetDiv.getElements("table tbody tr");
                    for (var j = 0; j < trElements.length; j++) {
                        if (trElements[j].innerText.indexOf(files[i].name) !== -1) {
                            //this.attachWidgetDiv.remove(trElements[j]);
                            trElements[j].destroy();
                        }
                    }

                    return false;
                }
            }
        }

        return true;
    },
    postAttachments: function (e) {

        if (!this.checkAttachmentsFileSize(e)) {
            window.uialert({
                message: 'You can only attach a document that is less than 20MB in size. Please try again.'
            });
            return;
        }

        Affinity.leave.lockui('leaveDetail-postAttachments');
        uialert({
            message: 'Attaching file',
            showLoader: true,
            showButtons: false,
            noClose: true
        });
        var leaveId = this.data.LeaveHeader.TSGroupId;
        var empNo = this.data.LeaveHeader.EmployeeNo;
        Affinity.leave.postAttachements(empNo, leaveId, function (response) {
            //this.getAttachments();
            Affinity.leave.populateAttachments(this.data.LeaveHeader, response.Data, this.attachWidget, this.attachWidgetDiv);
            Affinity.leave.unlockui('leaveDetail-postAttachments');
            window.fireEvent('attachmentRequired', false);
        }.bind(this));
    },

    deleteAttachment: function (e) {
        Affinity.leave.lockui('leaveDetail-deleteAttachment');
        uialert({
            message: 'Deleting file',
            showLoader: true,
            showButtons: false,
            noClose: true
        });
        var leaveId = this.data.LeaveHeader.TSGroupId;
        var empNo = this.data.LeaveHeader.EmployeeNo;
        Affinity.leave.deleteAttachment(empNo, leaveId, e.deletedId, function (response) {
            //this.getAttachments();
            Affinity.leave.populateAttachments(this.data.LeaveHeader, response.Data, this.attachWidget, this.attachWidgetDiv);
            Affinity.leave.unlockui('leaveDetail-deleteAttachment');
        }.bind(this));
    },
    attachmentRequired: false,
    setAttachmentRequiredValue: function (val) {
        this.attachmentRequired = val;
    },
    displayAttachmentRequiredModalMessage: function () {
        uialert({
            message: 'You must attach supporting documentation when applying for this type of leave.',
            showLoader: false,
            showButtons: true,
            noClose: false
        });
    },
    isAttachmentMandatoryForLeaveType: function () {

        var isAttachmentMandatory = false;
       
            var leaveCodes = null;
        if (Affinity.leave.manager) {
            if (Affinity.leave.manager.config !== undefined &&
                Affinity.leave.manager.config.Employees !== undefined) {
                var employees = Affinity.leave.manager.config.Employees;

                for (var i = 0; i < employees.length; i++) {
                    if (employees[i].LeaveCodes !== undefined) {
                        leaveCodes = employees[i].LeaveCodes;
                        break;
                    }
                }
            } else if (this.config) {
                leaveCodes = this.config.LeaveCodes;
            }
                
            } else {
                if (Affinity.leave.employee.config !== undefined &&
                    Affinity.leave.employee.config.LeaveCodes !== undefined) {
                    leaveCodes = Affinity.leave.employee.config.LeaveCodes;
                }
                else {
                    leaveCodes = this.config.LeaveCodes;
                }
                
            }

            if (leaveCodes) {

                //var typeSelector = document.getElementsByClassName("edit-type-selector")[0];
                //if (typeSelector) {
                var selectedLeaveType = this.data.LeaveHeader.LeaveCode; //typeSelector.getElement('option:selected').get('id');

                    for (var i = 0; i < leaveCodes.length; i++) {
                        var leaveCode = leaveCodes[i].LeaveCode;
                        if (selectedLeaveType === leaveCode) {
                            isAttachmentMandatory = leaveCodes[i].MandatoryAttachment;
                            break;
                        }
                    }

                //}

            }

            return isAttachmentMandatory;
     
    },
    validateAttachmentRequirement: function () {
        if (!this.hasAttachedFiles() && this.isAttachmentMandatoryForLeaveType()) {
            return false;
        }
        return true;
    },
    hasAttachedFiles: function () {
        var attachmentDetails = document.getElementsByClassName('details-attachments');
        if (attachmentDetails &&
            attachmentDetails.length > 0) {
            var attachments = attachmentDetails[0].getElements('li');
            if (attachments !== undefined &&
                attachments.length > 0) {
                return true;
            }
        } else {
            var attachmentDetails = document.getElementsByClassName("upload-table");
            if (attachmentDetails &&
                attachmentDetails.length > 0) {

                for (var i = 0; i < attachmentDetails.length; i++) {
                    var hasHiddenClass = attachmentDetails[i].hasClass("hidden");
                    if (!hasHiddenClass) {
                        var table = attachmentDetails[i].getElement("table");
                        if (table) {
                            var rows = table.getElements("tbody tr");
                            if (rows &&
                                rows.length > 0) {
                                return true;
                            }
                        }
                    }
                }

                var attachments = attachmentDetails[0].getElements('li');
                if (attachments !== undefined &&
                    attachments.length > 0) {
                    return true;
                }
            }
        }
        return false;
    },
    validateBeforeClosingModal: function (param) {
        var isCancelledLeave = false;

        var greenButtons = document.getElementsByClassName('button green w-icon-only');
        if (greenButtons &&
            greenButtons.length > 0) {
            for (var i = 0; i < greenButtons.length; i++) {
                var containsSubmitButton = greenButtons[i].innerText.contains("Submit");
                if (containsSubmitButton) {
                    isCancelledLeave = true;
                    break;
                }
            }
        }


        if (this.attachmentRequired && !isCancelledLeave) {
            Affinity.modal.backgroundCloses = false;
            uialert({
                message: 'You must attach supporting documentation when applying for this type of leave.',
                showLoader: false,
                showButtons: true,
                noClose: false
            });
        } else {
            Affinity.modal.backgroundCloses = true;
        }
        

    },

    validateFileDeletion: function (e) {

        var rows = e.table.getElements('tbody tr');
        if (rows) {

            var isAttachmentMandatory = false;

            var leaveCodes = null;
            if (Affinity.leave.manager &&
                Affinity.leave.manager.leaveDetail.config &&
                Affinity.leave.manager.leaveDetail.config.LeaveCodes) {
                leaveCodes = Affinity.leave.manager.leaveDetail.config.LeaveCodes;
            } else {
                leaveCodes = Affinity.leave.employee.leaveDetail.config.LeaveCodes;
            }

            if (leaveCodes) {

                var typeSelector = document.getElementsByClassName("edit-type-selector")[0];
                if (typeSelector) {
                    var selectedLeaveType = typeSelector.getElement('option:selected').get('id');

                    for (var i = 0; i < leaveCodes.length; i++) {
                        var leaveCode = leaveCodes[i].LeaveCode;
                        if (selectedLeaveType === leaveCode) {
                            isAttachmentMandatory = leaveCodes[i].MandatoryAttachment;
                            break;
                        }
                    }

                }

            }

            if (isAttachmentMandatory && rows.length === 1) {
                window.fireEvent('attachmentRequired', true);
            } else {
                window.fireEvent('attachmentRequired', false);
            }
                e.row.addClass('preventDeletion');
                uiconfirm({
                    message: 'Are you sure you want to delete this?',
                    onOk: function () {
                        window.fireEvent('multiFileDeletedFromConfirmation', e.deletionTarget);
                        e.row.destroy();
                        Affinity.uiGrid.zebra(e.table);

                        if (e.table.getElements('tbody tr').length == 0) {
                            e.table.getParent().addClass('hidden');
                        }
                    }.bind(this),
                    onCancel: function () {
                        window.fireEvent('attachmentRequired', false);
                    }.bind(this)
                });

        }
    },
    acknowledgementModal: function (response, message, autoclose) {
        Affinity.modal.show();
        Affinity.modal.clear();
        Affinity.modal.position();

        var modalData = new Element('div', { 'class': 'modal-data', 'style': 'width:700px;' });
        var warnings = new Element('div').inject(modalData);
        var wList = new Element('ul').inject(warnings);
        var errors = new Element('div').inject(modalData);
        var eList = new Element('ul').inject(errors);
        if (message && typeOf(message) === 'string') {
            var msg = new Element('div', { 'class': 'acknowledgement-header' }).adopt(

                new Element('span', { 'class': '', 'html': message })

            ).inject(modalData);
        }

        var content = new Element('div', { 'class': 'acknowledgement-content' }).inject(modalData);
        if (response.Messages.length > 0) {
            Array.each(response.Messages, function (message, index) {
                if (message.MessageType === 1) {
                    new Element('li', { 'html': message.Message }).inject(wList);
                    warnings.addClass('acknowledgement-warnings');
                }

                if (message.MessageType === 0) {
                    new Element('li', { 'html': message.Message }).inject(eList);
                    errors.addClass('acknowledgement-errors');
                }
            });
        }

        if (autoclose) {
            var autoCloseTimer = null;
            var autoCloseCounter = 5;
            var bntWrap = new Element('div', { 'class': 'modal-button-ok' }).inject(modalData);
            var closeAcknowledgePrompt = function () {
                Affinity.modal.clear();
                Affinity.modal.hide();
                clearInterval(autoCloseTimer);
                autoCloseTimer = null;
            }
            var btnOk = new Element('span', {
                'class': 'button blue',
                'html': 'OK (' + autoCloseCounter + ')',
                'events': {
                    'click': function(){
                        closeAcknowledgePrompt();
                    }
                }
            });
            btnOk.inject(bntWrap);
            autoCloseTimer = window.setInterval(function () {
                autoCloseCounter -= 1;
                if (autoCloseCounter == 0) {
                    closeAcknowledgePrompt();
                }
                btnOk.textContent = 'OK (' + autoCloseCounter + ')';
            }, 1000)
        }

        if (response.Exception != null) {
            errors.addClass('acknowledgement-errors');
            errors.set('html', response.Exception);
        } else {
            content.set('html', Affinity.leave.cleanResponse(response.Response));
        }
        Affinity.modal.setElement(modalData);
        Affinity.modal.show();
    },

    reset: function () {
        if (this.leaveDetailRequest && this.leaveDetailRequest.isRunning()) {
            this.leaveDetailRequest.cancel();
        }

        if (this.isManager) {
            if (this.bossResponseRequest && this.bossResponseRequest.isRunning()) {
                this.bossResponseRequest.cancel();
            }
        }
        else {
            if (this.submitLeaveRequest && this.submitLeaveRequest.isRunning()) {
                this.submitLeaveRequest.cancel();
            }
        }
    },

    destroy: function () {
        //window.removeEvent('multiFileDeleted', this.deleteAttachmentEvent);
        this.reset();

        if (this.acceptButton) { this.acceptButton.removeEvents(); }
        if (this.declineButton) { this.declineButton.removeEvents(); }
        if (this.closeButton) { this.closeButton.removeEvents(); }

        Object.each(this, function (val, key) {
            this[key] = null;
            delete this[key];
        }.bind(this));
    }
});

var UIEmployeeLeaveBalances = new Class({
    Implements: [Options, Events],
    Binds: [
        'getBalances',
        'processEmployee',
        'createProjectionDate',
        'createProjectionButtonMultiposition',
        'reset', 'destroy'
    ],
    options: {
        target: null
    },
    initialize: function (options, isChild) {

        if (!isChild) {
            this.setOptions(options);
            /* BUILD HTML */
            this.target = this.options.target;
            this.section = new Element('div', { 'class': 'section leave-balance' }).inject(this.target);
            this.sectionBody = new Element('div', { 'class': 'section-body' }).inject(this.section);
            this.form = new Element('div', { 'class': 'default-form' }).inject(this.sectionBody);
            this.title = new Element('div', { 'class': 'section-title', 'html': 'Estimated Leave' }).inject(this.form);
            this.panels = new Element('div', { 'class': 'leave-info-panels' }).inject(this.form);
            this.employeeNumber = Affinity.login.profile.employeeNumber;
            this.multiPositionCompanies = [2593, 6593, 5000, 5111, 9593];

        }
        this.employeeBalanceRequest = new Request.JSON({
            headers: { 'Pragma': 'no-cache' },
            onFailure: function (e) {
                Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
            },
            onSuccess: function (response) {
                if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName)) {

                    this.processEmployee(response.Data.ComponentBalances);
                }
            }.bind(this)
        });
        if (!isChild)
            this.getBalances();
    },
    getBalances: function () {
        if (this.employeeNumber && this.employeeNumber > 0) {
            this._methodName = 'ui.leaveBalances.js -> getBalances';
            this._api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'EmployeeLeaveBalance/' + this.employeeNumber);
            if (this.employeeBalanceRequest && this.employeeBalanceRequest.isRunning()) {
                this.employeeBalanceRequest.cancel();
            }
            this.employeeBalanceRequest.url = this.employeeBalanceRequest.options.url = this._api;
            this.employeeBalanceRequest.get();
        }
    },
    projectBalances: function (leaveCode, dateTo, leavePanel) {
        if (leavePanel.getElementsByClassName("resultUnits")[0] != null) {
            leavePanel.getElementsByClassName("resultUnits")[0].addClass("hidden");
        }
        leavePanel.getElementsByClassName("lookup-spinner")[0].removeClass("hidden");
        var projectBalanceRequest = new Request.JSON({
            headers: { 'Pragma': 'no-cache' },
            onFailure: function (e) {
                Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
            },
            onSuccess: function (response) {
                leavePanel.getElementsByClassName("lookup-spinner")[0].addClass("hidden");
                if (leavePanel.getElementsByClassName("resultUnits")[0] != null) {
                    leavePanel.getElementsByClassName("resultUnits")[0].removeClass("hidden");
                }

                if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName)) {
                    if (response.Data.ComponentBalances.length > 0) {
                        var ealInfo = response.Data.ComponentBalances[0].CodeBalances[0];
                        var newLeaveUnits = ealInfo.TotalHours;
                        if (ealInfo.UnitType == "D") {
                            newLeaveUnits = ealInfo.TotalDays;
                        }
                        leavePanel.getElementsByClassName("tileLeaveUnits")[0].innerHTML = newLeaveUnits;
                        leavePanel.getElementsByClassName("ealTableContainer")[0].parentNode.removeChild(leavePanel.getElementsByClassName("ealTableContainer")[0]);
                        this.renderEalStory(leavePanel.getElementsByClassName("ealStoryContainer")[0], response.Data.ComponentBalances[0].CodeBalances[0]);
                    }
                }
            }.bind(this)
        });
        if (this.employeeNumber && this.employeeNumber > 0) {
            this._methodName = 'ui.leaveBalances.js -> projectBalances';
            var api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'EmployeeLeaveBalance/' + this.employeeNumber);
            api = this.addToApiUrl(api, 'dateTo=' + dateTo);
            api = this.addToApiUrl(api, 'leaveCode=' + leaveCode);
            this._api = api;
            if (projectBalanceRequest && projectBalanceRequest.isRunning()) {
                this.projectBalanceRequest.cancel();
            }
            projectBalanceRequest.url = projectBalanceRequest.options.url = this._api;
            projectBalanceRequest.get();
        }
    },
    sendFeedback: function (feedback) {
        var sendFeedbackRequest = new Request.JSON({
            headers: { 'Pragma': 'no-cache' },
            onFailure: function (e) {
                Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
            }.bind(this)
        });
        if (feedback && feedback.length > 0) {
            this._methodName = 'ui.leaveBalances.js -> SendFeedback';
            var api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'SendFeedback/' + this.employeeNumber);
            api = this.addToApiUrl(api, 'companyNo=' + Affinity.login.profile.companyNumber);
            api = this.addToApiUrl(api, 'feedback=' + feedback);
            this._api = api;
            if (sendFeedbackRequest && sendFeedbackRequest.isRunning()) {
                this.sendFeedbackRequest.cancel();
            }
            sendFeedbackRequest.url = sendFeedbackRequest.options.url = this._api;
            sendFeedbackRequest.get();
        }
    },
    processEmployee: function (data) {
        this.panelEntitlement = false;
        this.panelAccrual = false;
        this.panelUnapproved = false;
        this.panelApprovedNotPaid = false;

        var defaultLeaveCodes = ['07', '09', '10', '12', '13', '11'];

        if (this.multiPositionCompanies.indexOf(Affinity.login.profile.companyNumber) > -1) { // multi position
            Array.each(data, function (panelbox, index) {
                var where = 'top';
                if (panelbox.PositionTitle != 'All') {
                    this.position = new Element('h4', {
                        'class': '',
                        'html': panelbox.PositionTitle
                    }).inject(this.panels);
                    if (panelbox.IsExpired) {
                        this.position.innerHTML = this.position.innerHTML + ' (<span class="required">expired</span>)';
                    }
                    where = 'bottom';
                }
                Array.each(panelbox.CodeBalances, function (panel, index) {
                    if (defaultLeaveCodes.indexOf(panel.LeaveCode) > -1) {
                        var totalUnits = panel.TotalHours;
                        var approxUnits = panel.TotalDays;
                        var totalLabel = 'Hours';
                        var approxLabel = 'Days';
                        if (panel.UnitType === 'D') {
                            totalUnits = panel.TotalDays;
                            approxUnits = panel.TotalHours;
                            totalLabel = 'Days';
                            approxLabel = 'Hours';
                        }
                        this.leavePanel = new Element('div', {
                            'class': 'leave-info-panel'
                        }).inject(this.panels, where);
                        this.main = new Element('div', {
                            'class': 'leave-info-main'
                        }).inject(this.leavePanel);
                        this.balancebox = new Element('div', {
                            'class': 'leave-info-main-balance'
                        }).inject(this.main);
                        this.flip = new Element('div', {
                            'class': 'leave-info-main-flip',
                            'html': Affinity.leave.toFixed(totalUnits, 2)
                        }).inject(this.balancebox);
                        this.totalLabel = new Element('div', {
                            'class': 'days',
                            'html': totalLabel
                        }).inject(this.balancebox);
                        this.titlebox = new Element('div', {
                            'class': 'leave-info-main-title'
                        }).inject(this.main);
                        this.title = new Element('div', {
                            'class': 'title',
                            'html': panel.CodeDescription.replace('Long Service Leave', 'Long Service')
                        }).inject(this.titlebox);

                        this.detailsBox = new Element('div', {
                            'class': 'details-box'
                        }).inject(this.leavePanel);
                        this.panelCols = new Element('div', {
                            'class': 'panel-cols'
                        }).inject(this.detailsBox);
                        this.createProjectionButtonMultiposition(panel);
                        if (panel.Entitlement != null || panel.Accrual != null) {
                            this.col1 = new Element('div', {
                                'class': 'col'
                            }).inject(this.panelCols);
                            if (panel.Entitlement != null) {
                                this.panelEntitlement = true;
                                this.row1 = new Element('div', {
                                    'class': 'row'
                                }).inject(this.col1);
                                this.title1 = new Element('div', {
                                    'class': 'title',
                                    'html': 'Entitled'
                                }).inject(this.row1);
                                this.value1 = new Element('div', {
                                    'class': 'value',
                                    'html': Affinity.leave.toFixed(panel.Entitlement, 2) + ' ' + totalLabel.toLowerCase()
                                }).inject(this.row1);
                            }
                            if (panel.Accrual != null) {
                                this.panelAccrual = true;
                                this.row2 = new Element('div', {
                                    'class': 'row'
                                }).inject(this.col1);
                                this.title2 = new Element('div', {
                                    'class': 'title',
                                    'html': 'Accrued'
                                }).inject(this.row2);
                                this.value2 = new Element('div', {
                                    'class': 'value',
                                    'html': Affinity.leave.toFixed(panel.Accrual, 2) + ' ' + totalLabel.toLowerCase()
                                }).inject(this.row2);
                            }
                        }
                        if (panel.Unapproved != null || panel.ApprovedNotPaid != null) {
                            this.col2 = new Element('div', {
                                'class': 'col'
                            }).inject(this.panelCols);
                            if (panel.Unapproved != null) {
                                this.panelUnapproved = true;
                                this.row3 = new Element('div', {
                                    'class': 'row'
                                }).inject(this.col2);
                                this.title3 = new Element('div', {
                                    'class': 'title',
                                    'html': 'Pending'
                                }).inject(this.row3);
                                this.value3 = new Element('div', {
                                    'class': 'value',
                                    'html': Affinity.leave.toFixed(panel.Unapproved, 2) + ' ' + totalLabel.toLowerCase()
                                }).inject(this.row3);
                            }
                            if (panel.ApprovedNotPaid != null) {
                                this.panelApprovedNotPaid = true;
                                this.row4 = new Element('div', {
                                    'class': 'row'
                                }).inject(this.col2);
                                this.title4 = new Element('div', {
                                    'class': 'title',
                                    'html': 'Approved'
                                }).inject(this.row4);
                                this.value4 = new Element('div', {
                                    'class': 'value',
                                    'html': Affinity.leave.toFixed(panel.ApprovedNotPaid, 2) + ' ' + totalLabel.toLowerCase()
                                }).inject(this.row4);
                            }
                        }
                    }

                }.bind(this));
            }.bind(this));
        }
        else {
            Array.each(data, function (panelbox) {
                Array.each(panelbox.CodeBalances, function (panel) {
                    if (defaultLeaveCodes.indexOf(panel.LeaveCode) > -1) {
                        var totalUnits = panel.TotalHours;
                        var totalLabel = 'Hours';
                        if (panel.UnitType === 'D') {
                            totalUnits = panel.TotalDays;
                            approxUnits = panel.TotalHours;
                            totalLabel = 'Days';
                        }

                        this.leavePanel = new Element('div', {
                            'class': 'leave-info-panel'
                        }).inject(this.panels);
                        this.main = new Element('div', {
                            'class': 'leave-info-main'
                        }).inject(this.leavePanel);
                        this.balancebox = new Element('div', {
                            'class': 'leave-info-main-balance'
                        }).inject(this.main);
                        this.titlebox = new Element('div', {
                            'class': 'leave-info-main-title inlineBlock'
                        }).inject(this.main);


                        this.title = new Element('div', {
                            'class': 'title',
                            'html': panel.CodeDescription.replace('Long Service Leave', 'Long Service')
                        }).inject(this.titlebox);

                        var subtitleDatePicker = new Element('input', {
                            'type': 'text',
                            'class': 'uidate-calendar uidate-preserve data-hj-whitelist',
                            'data-calendar-type': 'date',
                            'data-calendar-display-format': '%d/%m/%Y',
                            'data-calendar-return-format': '%d/%m/%Y',
                            'data-start-date': 'none'
                        });

                        var datePickerWrapper = new Element('div', { 'class': 'calendarContainer inlineBlock', 'style': 'margin: 15px 0;' }).adopt(subtitleDatePicker);

                        if (totalUnits == 1) {
                            totalLabel = totalLabel.substring(0, totalLabel.length - 1);
                        }
                        var preDateTitle = 'Your available leave on ';
                        var postDateTitle = ' is <span class="resultUnits"><span class="tileLeaveUnits">' + totalUnits + '</span> ' + totalLabel.toLowerCase() + "</span>";
                        var spinner = new Element('span', { 'html': '<img src="' + Affinity.loaders.light + '" />', 'class': 'lookup-spinner hidden' });
                        if (totalUnits == 0) {
                            preDateTitle = 'You have no leave available on ';
                            postDateTitle = '';
                        }
                        new Element('div', { 'class': 'tileSummaryContainer' }).adopt(
                            new Element('span', { 'html': preDateTitle }),
                            datePickerWrapper,
                            new Element('span', { 'html': postDateTitle }),
                            spinner
                        ).inject(this.titlebox);

                        Affinity.UI.calendars.processNew(); // build calendar widgets
                        subtitleDatePicker.getWidget().setDate(new Date());
                        subtitleDatePicker.addEvent("change", function (e) {
                            this.calcEntitlement(subtitleDatePicker, panel);
                        }.bind(this));
                        this.detailsBox = new Element('div', {
                            'class': 'details-box',
                            'style': 'margin-top: 15px;'
                        }).inject(this.leavePanel);
                        this.detailsWrapper = new Element('div', { 'class': 'detailsWrapper', 'style': 'padding: 0 15px;' }).inject(this.detailsBox);
                        this.storyContainer = new Element('div', { 'class': 'ealStoryContainer', 'style': 'padding: 0 15px;' }).inject(this.detailsWrapper);
                        this.renderEalStory(this.storyContainer, panel);
                        this.ppeTotalsStory = new Element('div', { 'class': 'ppeTotalsStory', 'style': 'display: none;', 'html': '<br />' + panel.PpeTotalsStory }).inject(this.detailsWrapper);
                    }

                }.bind(this));
            }.bind(this));
        }

        this.infoTileBoxes = document.getElements('.leave-info-main');
        this.infoDetailsBoxes = document.getElements('.details-box');
        Array.each(this.infoTileBoxes, function (infoTileBox, index) {
            this.detailsButton = new Element('div', {
                'class': 'tooltip-view ui-has-tooltip more-button tile-more-button', 
                'html': '<span class="button more w-icon"><span class="icon-info"></span><span class="btn-tag tile-more">More</span></span>'
            }).store('state', 'closed').inject(infoTileBox);

            var details = this.infoDetailsBoxes[index];
            details.set('reveal', { duration: 250 });
            details.toggle();
            if (this.multiPositionCompanies.indexOf(Affinity.login.profile.companyNumber) == -1) { // multi position
                var parentPanel = this.infoTileBoxes[index].closest(".leave-info-panel");
                var ppeButton = new Element('div', {
                    'class': 'tooltip-view ui-has-tooltip more-button tile-more-button', 'style': 'text-align: center;', 'html': '<br /><span class="button more w-icon"><span class="icon-info"></span><span class="btn-tag tile-more">Totals at last pay period</span></span>'
                }).inject(parentPanel.getElementsByClassName("detailsWrapper")[0]);

                var closePpeButton = new Element('div', {
                    'class': 'tooltip-view ui-has-tooltip more-button tile-more-button',
                    'style': 'text-align: center;',
                    'html': '<span class="button more w-icon"><span></span><span class="btn-tag tile-more">Hide</span></span>'
                }).inject(parentPanel.getElementsByClassName("ppeTotalsStory")[0]);

                ppeButton.addEvent(Affinity.events.click, function (e) {
                    parentPanel.getElementsByClassName("ppeTotalsStory")[0].style.display = "block";
                    ppeButton.style.display = "none";
                }.bind(this));

                closePpeButton.addEvent(Affinity.events.click, function (e) {
                    parentPanel.getElementsByClassName("ppeTotalsStory")[0].style.display = "none";
                    ppeButton.style.display = "block";
                }.bind(this));
            }
            // this.detailsButton.addEvent(Affinity.events.start, function (e) {
            //     e.stop();
            // }.bind(this));

            this.detailsButton.addEvent(Affinity.events.click, function (e) {
                this.button = e.getTarget('more-button');
                var leavePanel = this.button.closest(".leave-info-panel");

                if (this.button.retrieve('state') === 'closed') {
                    details.reveal();
                    this.button.getElementsByClassName("tile-more")[0].innerText = "Less";
                    this.button.store('state', 'open');
                } else {
                    details.dissolve();
                    this.button.getElementsByClassName("tile-more")[0].innerText = "More";
                    this.button.store('state', 'closed');
                }
            }.bind(this));
        }.bind(this));
    },
    renderEalStory: function (container, leaveInfo) {
        var storyHtml = this.generateEalTableHtml(leaveInfo);
        new Element('div', { 'class': 'ealTableContainer', 'html': storyHtml, 'style': 'padding: 0 15px;' }).inject(container);
        //new Element('span', { "html": '<div class="ppeTotalsStory">' + leaveInfo.PpeTotalsStory + "</div>" }).inject(container.parentNode);
    },
    generateEalTableHtml: function (leaveInfo) {
        var unitLabel = leaveInfo.UnitType == "H" ? "Hours" : "Days";
        var balDate = this.parseISOLocal(leaveInfo.BalanceDate);
        var formattedBalDate = balDate.getDate() + "/" + (balDate.getMonth() + 1) + "/" + balDate.getFullYear();

        var operator = "+";
        if (parseFloat((leaveInfo.PostProjectedAccruals + leaveInfo.Accrual).toFixed(2)) < 0) {
            operator = "";
        }

        var storyHtml = "<div class='leftText'>How Your Estimated Leave Is Calculated</div><br /><table class='ealTable'><thead><tr><th>Breakdown</th><th class='centerText'>" + unitLabel + "</th></tr></thead>" +
            "<tbody><tr><td>Leave balance at last period end</td><td class='centerText " + this.evaluateCssClassByValue(leaveInfo.Entitlement) + "'>" + leaveInfo.Entitlement + "</td></tr><tr><td>Add leave accruals</td><td class='centerText " + this.evaluateCssClassByValue(leaveInfo.PostProjectedAccruals + leaveInfo.Accrual) + "'>" + operator + + +(leaveInfo.PostProjectedAccruals + leaveInfo.Accrual).toFixed(2) + "</td></tr>";
        var totalAmount = leaveInfo.UnitType == "H" ? leaveInfo.TotalHours : leaveInfo.TotalDays;
        if (leaveInfo.LeaveItems != null) {
            for (var i = 0; i < leaveInfo.LeaveItems.length; i++) {
                var leaveDate = this.parseISOLocal(leaveInfo.LeaveItems[i].DateFrom);
                var formattedLeaveDate = leaveDate.getDate() + "/" + (leaveDate.getMonth() + 1) + "/" + leaveDate.getFullYear();
                if (leaveInfo.LeaveItems[i].Credit) {
                    storyHtml += "<tr><td>Credit cancelled/declined leave booked on " + formattedLeaveDate + "</td><td class='centerText " + this.evaluateCssClassByValue(leaveInfo.LeaveItems[i].Units) + "'>+" + leaveInfo.LeaveItems[i].Units + "</td></tr>"
                } else {
                    storyHtml += "<tr><td>Subtract leave booked on " + formattedLeaveDate + "</td><td class='centerText " + this.evaluateCssClassByValue(-leaveInfo.LeaveItems[i].Units) + "'>-" + leaveInfo.LeaveItems[i].Units + "</td></tr>"
                }
            }
        }
        storyHtml += "<tfoot><tr><th>Total estimated leave available on " + formattedBalDate + "</th><th class='centerText " + this.evaluateCssClassByValue(totalAmount) + "'>" + totalAmount + "</th></tr> </tfoot>";
        storyHtml += "</table><br />";
        return storyHtml;
    },
    parseISOLocal: function(s) {
        var b = s.split(/\D/);
        return new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5]);
    },
    evaluateCssClassByValue: function(value) {
        if (value < 0) {
            return "red";
        }
        return "";
    },
    addToApiUrl: function (api, value) {
        if (api.indexOf('?') > -1) {
            api += '&';
        } else {
            api += '?';
        }
        api += value;
        return api;
    },
    calcEntitlement: function (datePicker, panel) {
        var dateTo = datePicker.getWidget().getRawDate();
        var leavePanel = datePicker.closest(".leave-info-panel");
        if (dateTo && typeOf(dateTo) === 'date' && dateTo.isValid()) {
            dateTo = dateTo.format('%d-%b-%Y');
        } else {
            uialert({
                message: 'Date is invalid.',
                noClose: false
            });
            return false;
        }
        var dateParsed = Date.parse(dateTo.replace(/-/g, ' '));
        if (dateParsed.lessThan(new Date())) {
            uialert({
                message: 'Past dates are invalid.',
                noClose: false
            });
            return false;
        } else if (dateParsed.greaterThan(new Date(new Date().setFullYear(new Date().getFullYear() + 1)))) {
            uialert({
                message: 'You can only estimate leave up to one year in advance.',
                noClose: false
            });
            return false;
        }
        this.projectBalances(panel.LeaveCode, dateTo, leavePanel);
    },
    registerFeedback: function (target, feedback, comment) {
        var button = target.getTarget('message-icon').closest(".leave-info-panel");
        var thumbsContainer = button.getElementsByClassName("feedbackThumbsContainer")[0];
        var commentContainer = button.getElementsByClassName("feedbackCommentContainer")[0];
        var feedbackMoreInfo = button.getElementsByClassName("feedbackMoreInfo")[0];
        var story = button.getElementsByClassName("ealStory")[0].innerText;
        feedbackMoreInfo.style.display = 'inline';

        feedbackMoreInfo.fade("in");
        thumbsContainer.fade('out');
        commentContainer.fade('in');
        commentContainer.style.display = 'block';
        switch (feedback) {
            case 0:
                var textBox = button.getElementsByClassName("feedbackMoreInfoTextbox")[0];
                var feedbackSend = button.getElementsByClassName("feedbackSend")[0];
                textBox.fade("in");
                feedbackSend.fade("in");
                feedbackMoreInfo.innerText = "Help us to improve.";
                textBox.style.display = 'block';
                feedbackSend.style.display = 'inline-block';
                ga('send', 'event', {
                    'eventCategory': 'ThumbsFeedback',
                    'eventAction': 'Bad',
                    'eventLabel': 'e: ' + Affinity.login.profile.employeeNumber + ' | c:' + Affinity.login.profile.companyNumber + ' | story: ' + story
                });
                break;
            case 1:
                feedbackMoreInfo.innerText = "Thanks for your feedback.";
                ga('send', 'event', {
                    'eventCategory': 'ThumbsFeedback',
                    'eventAction': 'Good',
                    'eventLabel': 'e: ' + Affinity.login.profile.employeeNumber + ' | c:' + Affinity.login.profile.companyNumber + ' | story: ' + story
                });
                break;
            default:
                var textBox = button.getElementsByClassName("feedbackMoreInfoTextbox")[0];
                var feedbackSend = button.getElementsByClassName("feedbackSend")[0];
                var feedback = textBox.value;
                ga('send', 'event', {
                    'eventCategory': 'ThumbsFeedback',
                    'eventAction': 'Comment',
                    'eventLabel': 'e: ' + Affinity.login.profile.employeeNumber + ' | c:' + Affinity.login.profile.companyNumber + ' | story: ' + story + ' | feedback: ' + feedback
                });
                //this.sendFeedback(feedback);
                textBox.fade("out");
                feedbackSend.fade("out");
                textBox.style.display = 'none';
                feedbackSend.style.display = 'none';
                feedbackMoreInfo.innerText = "Thanks for your feedback.";
                break;
        }
        
    },

    createProjectionButtonMultiposition: function (panel) {
        if (panel.LeaveCode == '09') //leave projection for annual leave
        {
            this.leavePanel.addClass('projection')
            this.projectionButton = new Element('div', {
                'class': 'toggle-button ui-has-tooltip',
                'html': Affinity.icons.GraphStatistics,
                'data-tooltip': 'Show leave projection',
                'data-tooltip-dir': 'left'
            }).inject(this.main);

            this.projectionButton.addEvent(Affinity.events.click, function (e) {

                //Today's balance calculation
                var today = new Date();
                today.setHours(0);
                today.setMinutes(0);
                today.setSeconds(0);
                today.setMilliseconds(0);

                var annualEntitlement = 160;
                if (panel.AnnualEntitlement) {
                    annualEntitlement = panel.AnnualEntitlement;
                }

                var periodEndDate = Date.parse(panel.PeriodEndDate);
                var balanceTotal = panel.TotalHours;
                var dailyEntitlement = annualEntitlement / 365;
                var timeDiff = today.getTime() - periodEndDate.getTime();
                var daysToToday = Math.round(timeDiff / (1000 * 3600 * 24));
                this.todayBalance = balanceTotal + (daysToToday * dailyEntitlement);

                Affinity.modal.show();
                Affinity.modal.clear();
                Affinity.modal.position();

                this.modalData = new Element('div', { 'class': 'modal-data section', 'style': 'width:700px;' });

                this.modalHeader = new Element('h1', { 'html': 'Annual Leave Projection' }).inject(this.modalData);

                this.projectionControls = new Element('div', { 'class': 'projection-controls default-form' }).inject(this.modalData);

                this.annualEntitlement = new Element('div', { 'class': 'annual-entitlement form-row' }).inject(this.projectionControls);

                this.calcEntitlement = function () {
                    var dailyEntitlement = this.annualEntitlementInput.get('value') / 365;
                    var widget = this.projectionDateInput.retrieve('widget');
                    var date = new Date(today);
                    if (widget) {
                        date = new Date(widget.date);
                    }

                    if (date.getTime() < today.getTime()) {
                        date = new Date(today);
                        widget.setDate(new Date(date));
                        this.projectedEntInput.set('value', Math.round(this.todayBalance * 100) / 100);
                    }
                    else {
                        var timeDiff = date.getTime() - today.getTime();
                        var days = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        this.projectedEntitlement = this.todayBalance + (days * dailyEntitlement);
                        this.projectedEntInput.set('value', Math.round(this.projectedEntitlement * 100) / 100);
                    }
                }.bind(this);

                new Element('label', { 'html': 'Entitlement Per Year (estimated hours)' }).inject(this.annualEntitlement);
                this.annualEntitlementInput = new Element('input', { 'type': 'text', 'value': annualEntitlement }).inject(this.annualEntitlement);
                this.annualEntitlementInput.addEvent('change', function () {
                    var dailyEntitlement = this.annualEntitlementInput.get('value') / 365;
                    this.todayBalance = balanceTotal + (daysToToday * dailyEntitlement);
                    this.calcEntitlement();
                }.bind(this));

                this.projectionDate = new Element('div', { 'class': 'projection-date form-row' }).inject(this.projectionControls);
                new Element('label', { 'html': 'Projection Date' }).inject(this.projectionDate);
                this.projectionDateInput = new Element('input', {
                    'type': 'text',
                    'class': 'uidate-calendar uidate-preserve',
                    'data-calendar-type': 'date',
                    'data-calendar-display-format': '%d/%m/%Y',
                    'data-calendar-return-format': '%d/%m/%Y',
                    'data-start-date': today.format('%d/%b/%y')
                }).inject(this.projectionDate);
                this.projectionDateInput.addEvent('change', this.calcEntitlement);

                this.projectedEntRow = new Element('div', { 'class': 'projected-entitlement form-row' }).inject(this.projectionControls);
                new Element('label', { 'html': 'Estimated Entitlement' }).inject(this.projectedEntRow);
                this.projectedEntInput = new Element('input', { 'type': 'text' }).inject(this.projectedEntRow);
                this.projectedEntInput.addEvent('change', function () {
                    var dailyEntitlement = this.annualEntitlementInput.get('value') / 365;
                    //var span = this.projectedEntInput.get('value');
                    var finalEntitlement = this.projectedEntInput.get('value');

                    var widget = this.projectionDateInput.retrieve('widget');
                    if (widget) {
                        if (isNaN(finalEntitlement) || finalEntitlement < this.todayBalance) {
                            date = new Date(today);
                            widget.setDate(new Date(date));
                            this.projectedEntInput.set('value', Math.round(this.todayBalance * 100) / 100);
                        }
                        else {
                            var days = Math.ceil((finalEntitlement - this.todayBalance) / dailyEntitlement);
                            date = new Date(today);
                            date.setDate(date.getDate() + days);
                            widget.setDate(new Date(date));
                        }
                    }
                }.bind(this));

                this.canvas = new Element('canvas', { 'id': 'projection-chart', 'class': 'hidden', 'width': 650, 'height': 400 }).inject(this.modalData);

                this.projection = {};

                this.projection.dataSet = {
                    label: 'Annual Leave Total',
                    pointBackgroundColor: '#44b5ec',
                    pointHoverRadius: 6,
                    data: []
                };
                this.projection.data = {
                    labels: [],
                    datasets: [this.projection.dataSet]
                };

                this.projection.options = {
                    responsive: false,
                    title: {
                        display: true,
                        text: 'Annual Leave Projection'
                    },
                    tooltips: {
                        mode: 'label',
                    },
                    hover: {
                        mode: 'single'
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Date'
                            },
                            ticks: {
                                autoSkip: false,
                                //maxTicksLimit: 13,
                                maxRotation: 0
                            },
                            afterTickToLabelConversion: function (data) {
                                var xLabels = data.ticks;
                                var skip = data.chart.options.scales.xAxes[0].ticks.stepSize;
                                var month = "";
                                var count = 0;

                                //Show month only for the first label of the month
                                xLabels.forEach(function (labels, i) {
                                    if (month == xLabels[i][1]) {
                                        count++;
                                        if (skip < 10) {
                                            if (count % skip != 0)
                                                xLabels[i] = '';
                                            else
                                                xLabels[i] = xLabels[i][0];
                                        }
                                        else {
                                            if (xLabels[i][0] != 15)
                                                xLabels[i] = '';
                                            else
                                                xLabels[i] = xLabels[i][0];
                                        }
                                    }
                                    else {
                                        month = xLabels[i][1];
                                        count = 0;
                                    }

                                    //if (count > skip)
                                    //    xLabels[i] = xLabels[i][0];
                                });
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Annual Leave (hours)'
                            },
                            ticks: {
                                stepSize: 10,
                                autoSkip: false
                                //suggestedMin: Math.floor(minBalance / 40) * 40,
                                //suggestedMax: Math.ceil(currentBalance / 40) * 40,
                            }
                        }]
                    },
                    legend: {
                        display: false
                    }
                };

                this.projection.buildData = function (dailyEntitlement, span, startDate, currentBalance) {

                    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    var minimumBalance = currentBalance;
                    var labels = [];
                    var data = [];
                    var totalMonth = 1;
                    if (span === '1') {
                        totalMonth = 1;
                        this.projection.options.scales.xAxes[0].ticks.stepSize = 2;
                        this.projection.options.scales.xAxes[0].ticks.maxRotation = 0;
                    } else if (span === '3') {
                        totalMonth = 3;
                        this.projection.options.scales.xAxes[0].ticks.stepSize = 15;
                        this.projection.options.scales.xAxes[0].ticks.maxRotation = 0;
                    } else if (span === '6') {
                        totalMonth = 6;
                        this.projection.options.scales.xAxes[0].ticks.stepSize = 15;
                        this.projection.options.scales.xAxes[0].ticks.maxRotation = 0;
                    } else if (span === '12') {
                        totalMonth = 12;
                        this.projection.options.scales.xAxes[0].ticks.stepSize = 15;
                        this.projection.options.scales.xAxes[0].ticks.maxRotation = 15;
                    }
                    var today = new Date(startDate);
                    var finishDay = new Date(startDate);
                    finishDay.setMonth(finishDay.getMonth() + totalMonth);
                    while (today.getTime() <= finishDay.getTime()) {
                        labels.push([today.getDate(), monthNames[today.getMonth()]]);
                        data.push(Math.round(currentBalance * 100) / 100);

                        today.setDate(today.getDate() + 1);
                        currentBalance += dailyEntitlement;
                    }

                    this.projection.data.labels = labels;
                    this.projection.dataSet.data = data;
                    this.projection.options.scales.yAxes[0].ticks.min = Math.floor(minimumBalance / 40) * 40;
                    this.projection.options.scales.yAxes[0].ticks.max = Math.ceil(currentBalance / 40) * 40;

                    if (this.projectionChart) {
                        this.projectionChart.destroy();
                    }

                    this.canvas.removeClass('hidden');

                    this.projectionChart = new Chart(this.canvas, {
                        type: "line",
                        'data': this.projection.data,
                        options: this.projection.options
                    })
                }.bind(this);

                Affinity.modal.setElement(this.modalData);
                Affinity.modal.show();

                Affinity.UI.calendars.processNew(); // build calendar widgets

                this.projectionDate.getElement('span.ui-calendar-buttons').addClass('hidden');

            }.bind(this));
        }
    },

    reset: function () {
        if (this.employeeBalanceRequest && this.employeeBalanceRequest.isRunning()) {
            this.employeeBalanceRequest.cancel();
        }
        if (this.panels) {
            Array.each(this.panels.getElements('.button'), function (el) { el.removeEvents(); });
            Array.each(this.panels.getElements('.toggle-button'), function (el) { el.removeEvents(); });
            this.panels.empty();
        }
    },
    destroy: function () {
        this.reset();
        if (this.section) {
            Array.each(this.section.getElements('.button'), function (el) { el.removeEvents(); });
            Array.each(this.section.getElements('.toggle-button'), function (el) { el.removeEvents(); });
            this.section.empty();
            this.section.destroy();
        }
        Object.each(this, function (val, key) {
            this[key] = null;
            delete this[key];
        }.bind(this));
    }
});

if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var el = this;

        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

var InputEditWidget = new Class({

    Implements: [Options, Events],

    Binds: [
        'attachToInput',
        'select',
        'deselect',
        'enableSave',
        'disableSave'
    ],

    options: {
        target: null,
        input: null,
        updateInput: null,
        cancelInput: null
    },

    initialize: function (options) {
        this.setOptions(options);
        this.target = this.options.target;
        this.input = this.options.input;
        this.updateInput = this.options.updateInput;
        this.cancelInput = this.options.cancelInput;
        this.selected = false;
        this.delayDeselectTimeout = null;

        /**/

        if (this.input) {
            this.attachToInput(this.input);
        }

        this.inputEditButtons = new Element('div', { 'class': 'edit-input-buttons' }).inject(this.target);

        this.saveInputEdit = new Element('span', {
            'class': 'button green w-icon-only ui-has-tooltip',
            'data-tooltip': 'Save',
            'data-tooltip-dir': 'bottom'
        })
            .adopt(new Element('span', { 'html': Affinity.icons.Save }))
            .inject(this.inputEditButtons);

        this.saveInputEdit.addEvent('click', function () {
            this.updateInput();
            (function () { this.target.removeClass('selected'); }).delay(500, this);
            this.inputEditButtons.dissolve();
            this.selected = false;
        }.bind(this));

        this.cancelInputEdit = new Element('span', {
            'class': 'button grey w-icon-only ui-has-tooltip',
            'data-tooltip': 'Cancel',
            'data-tooltip-dir': 'bottom'
        }).adopt(
                new Element('span', { 'html': Affinity.icons.Cancel })
            ).inject(this.inputEditButtons);
        this.cancelInputEdit.addEvent('click', function () {          
            this.inputEditButtons.dissolve();
            (function () { this.target.removeClass('selected'); }).delay(500, this);
            this.cancelInput();
            this.selected = false;
            this.enableSave();
        }.bind(this));
        this.inputEditButtons.hide();
    },

    attachToInput: function(input) {
        if (input) {
            if (this.input) {
                this.input.removeEvents();
            }

            this.input = input;
            this.input.addEvent('focusin', function (e) {
                this.select(e);
            }.bind(this));
            this.input.addEvent('focusout', function (e) {
                this.deselect(e);
            }.bind(this));
        }
    },

    select: function () {
        this.inInput = true;

        if (!this.selected) {
            this.selected = true;
            (function () {
                if (this.delayDeselectTimeout) {
                    clearTimeout(this.delayDeselectTimeout);
                }
                this.target.addClass('selected');
                this.inputEditButtons.setStyle('top', (this.target.getSize().y - 4) + 'px');
                this.inputEditButtons.reveal();
            }.bind(this)).delay(250, this);
        }
    },

    deselect: function (e) {
        this.inInput = false;
        //Realign buttons incase something has resized.
        this.inputEditButtons.setStyle('top', (this.target.getSize().y - 4) + 'px');

        if (this.delayFocusoutTimeout) {
            clearTimeout(this.delayFocusoutTimeout);
        }

        this.delayFocusoutTimeout = (function () {
            if (this.selected && !this.inInput) {
                if (this.saveInputEdit.get('disabled')) {
                    (function () {
                        e.target.focus();
                    })();
                }
                else {
                    this.delayDeselectTimeout = (function () {
                        this.target.removeClass('selected');
                    }.bind(this)).delay(500, this);
                    this.inputEditButtons.dissolve();
                    this.selected = false;
                    this.updateInput();
                }
            }
        }).delay(250, this);
    },

    enableSave: function () {
        if (this.saveInputEdit) {
            this.saveInputEdit.set('disabled', null);
            this.saveInputEdit.removeClass('disabled');
        }
    },

    disableSave: function () {
        if (this.saveInputEdit) {
            this.saveInputEdit.set('disabled', 'disabled');
            this.saveInputEdit.addClass('disabled');
        }
    }
});
