/* Minification failed. Returning unminified contents.
(280,54-55): run-time error JS1100: Expected ',': =
(465,57-58): run-time error JS1195: Expected expression: >
(467,18-19): run-time error JS1195: Expected expression: ,
(474,13-15): run-time error JS1009: Expected '}': if
(474,42-43): run-time error JS1004: Expected ';': {
(483,9-10): run-time error JS1002: Syntax error: }
(485,35-39): run-time error JS1004: Expected ';': this
(486,5-6): run-time error JS1002: Syntax error: }
(488,39-40): run-time error JS1004: Expected ';': {
(499,6-7): run-time error JS1195: Expected expression: ,
(501,27-28): run-time error JS1004: Expected ';': {
(508,6-7): run-time error JS1195: Expected expression: ,
(510,21-22): run-time error JS1195: Expected expression: )
(510,23-24): run-time error JS1004: Expected ';': {
(526,6-7): run-time error JS1195: Expected expression: ,
(528,23-24): run-time error JS1195: Expected expression: )
(528,25-26): run-time error JS1004: Expected ';': {
(535,6-7): run-time error JS1195: Expected expression: ,
(537,21-22): run-time error JS1195: Expected expression: )
(537,23-24): run-time error JS1004: Expected ';': {
(544,6-7): run-time error JS1195: Expected expression: ,
(546,26-27): run-time error JS1195: Expected expression: )
(546,28-29): run-time error JS1004: Expected ';': {
(567,6-7): run-time error JS1195: Expected expression: ,
(569,28-29): run-time error JS1195: Expected expression: )
(569,30-31): run-time error JS1004: Expected ';': {
(589,6-7): run-time error JS1195: Expected expression: ,
(591,37-38): run-time error JS1004: Expected ';': {
(602,6-7): run-time error JS1195: Expected expression: ,
(604,49-50): run-time error JS1004: Expected ';': {
(616,6-7): run-time error JS1195: Expected expression: ,
(618,35-36): run-time error JS1195: Expected expression: )
(618,37-38): run-time error JS1004: Expected ';': {
(690,6-7): run-time error JS1195: Expected expression: ,
(692,43-44): run-time error JS1004: Expected ';': {
(810,6-7): run-time error JS1195: Expected expression: ,
(812,37-38): run-time error JS1195: Expected expression: )
(812,39-40): run-time error JS1004: Expected ';': {
(914,6-7): run-time error JS1195: Expected expression: ,
(916,23-31): run-time error JS1197: Too many errors. The file might not be a JavaScript file: function
(529,36-42): run-time error JS1018: 'return' statement outside of function: return
 */
var TeamLeave = new Class({

    Implements: [Options, Events],

    Binds: [
        'init',
        'getTeamConfig',
        'initConfig',
        'managerHistory',
        'managerBalance',
        'managerApply',
        'managerDetail',
        'generateLeaveCalendar',
        'applyTeamConfig',
        'refreshBalance', 'refreshHistory', 'refreshAll',
        'getManagerEmployeeConfig',
        'getManagerEmployeeConfigFromBackend',
        'reset', 'destroy'
    ],

    options: {
        target: null
    },

    initialize: function (options) {
        this.setOptions(options);
        this.target = this.options.target;
    },

    configData: null,

    requireUpdate: false,
    timeLastModified: null,

    leaveBlanaces: false,
    leaveHistory: false,
    leaveDetail: false,

    init: function (data) {
        this.configQueue = [];
        this.getTeamConfig();

        this.employeeConfigRequest = new Request.JSON({
            //url: api,
            onRequest: function () {
                Affinity.leave.lockui('teamleave-managerEmployeeConfig');
            },
            onFailure: function (e) {
                Affinity.leave.unlockui('teamleave-managerEmployeeConfig');
                prompts.hide();
                Affinity.leave.handleXHRErrors(e, this._api, 'ui.teamLeave.js -> managerEmployeeConfig');
            }.bind(this),
            onException: function () {
                Affinity.leave.unlockui('teamleave-managerEmployeeConfig');
            },
            onCancel: function () {
                Affinity.leave.unlockui('teamleave-managerEmployeeConfig');
            },
            onSuccess: function (response) {
                Affinity.leave.unlockui('teamleave-managerEmployeeConfig');
                prompts.hide();
                var eIndex = -1;
                if (!Affinity.leave.isErrorInJson(response, this._api, 'ui.teamLeave.js -> managerEmployeeConfig')) {
                    if (response.Data) {
                        Array.each(response.Data.Positions, function (position, index) {
                            if (!position.SubmittedTos || position.SubmittedTos.length == 0) {
                                position.SubmittedTos = this.config.ForwardToManagers;
                            }
                        });

                        Array.each(this.config.Employees, function (employee, index) {
                            if (employee.EmployeeNo == this._employeeNo)
                                eIndex = index;
                        }.bind(this))
                        if (eIndex == -1) {
                            this.config.Employees.push(response.Data);
                        }
                        else {
                            this.config.Employees[eIndex] = response.Data;
                        }
                    }

                    if (this._onSuccess) {
                        this._onSuccess(response.Data);
                        this._onSuccess = null;
                    }
                }
            }.bind(this)
        })
    },

    getManagerEmployeeConfig: function (employeeNo, onSuccess) {
        var found = false;
        Array.each(this.config.Employees, function (employee, index) {
            if (employee.EmployeeNo == employeeNo && employee.Positions) {
                if (onSuccess) {
                    onSuccess(employee);
                }
                found = true;
                return;
            }
        }.bind(this));

        if (!found) {
            uialert({
                message: 'Loading Employee Configuration',
                showLoader: true,
                showButtons: false,
                noClose: false
            });
            this._employeeNo = employeeNo;
            this._onSuccess = onSuccess;
            this.employeeConfigRequest.options.url = this.employeeConfigRequest.url = this._api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'LeaveManagerEmployeeConfig/' + employeeNo);
            this.employeeConfigRequest.get();
        }
    },

    getManagerEmployeeConfigFromBackend: function (employeeNo, onSuccess) {


        uialert({
            message: ' ',
            showLoader: true,
            showButtons: false,
            noClose: false
        });

        this._employeeNo = employeeNo;
        this._onSuccess = onSuccess;
        this.employeeConfigRequest.options.url = this.employeeConfigRequest.url = this._api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'LeaveManagerEmployeeConfig/' + employeeNo);
        this.employeeConfigRequest.get();
    },


    getTeamConfig: function () {
        uialert({
            message: 'Loading Manager Configuration',
            showLoader: true,
            showButtons: false,
            noClose: false
        });
        var employeeNum = Affinity.login.profile.employeeNumber;
        var methodName = 'ui.teamLeave.js -> teamLeaveConfig';
        var api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'LeaveManagerConfig/' + employeeNum);
        new Request.JSON({
            url: api,
            onRequest: function () {
                Affinity.leave.lockui('teamleave-teamLeaveConfig');
            },
            onFailure: function (e) {
                Affinity.leave.unlockui('teamleave-teamLeaveConfig');
                prompts.hide();
                Affinity.leave.handleXHRErrors(e, api, methodName);
            },
            onException: function () {
                Affinity.leave.unlockui('teamleave-teamLeaveConfig');
            },
            onCancel: function () {
                Affinity.leave.unlockui('teamleave-teamLeaveConfig');
            },
            onSuccess: function (response) {
                Affinity.leave.unlockui('teamleave-teamLeaveConfig');
                prompts.hide();
                if (!Affinity.leave.isErrorInJson(response, api, methodName)) {
                    this.config = response.Data;

                    if (this.configQueue && this.configQueue.length > 0) {
                        Array.each(this.configQueue, function (execution, index) {
                            if (execution && typeOf(execution) === 'function')
                                execution(this.config);
                        }.bind(this));

                        this.configQueue = [];
                    }

                    var newCalendarUI = response.Data.CompanyHasAccessToNewLeaveCalendarUI;
                    // If NEW Calendar UI is enabled, then generate the calendar on TOP
                    if (newCalendarUI) this.generateLeaveCalendar(newCalendarUI);
                    this.managerHistory(newCalendarUI);
                    if (!response.Data.CompanyHasAccessToLeaveInDaysUI) {
                        this.setLeaveApplyV1();
                        this.setLeaveDetailV1();
                    } else {
                        this.managerApply();
                        this.managerDetail();
                    }
                    
                    var isManager = document.querySelector(".section-nav.leave-nav li.u-blue.selected").classList.contains("manager");
                    if (isManager) {
                        this.initConfig(response.Data);
                    }

                }
            }.bind(this)
        }).get();
    },

    initConfig: function (configData) {
        this.managerBalance(configData);
        // If NOT NEW Calendar UI is enabled, it should next to Leave Balances tab
        if (!configData.CompanyHasAccessToNewLeaveCalendarUI) {
            this.generateLeaveCalendar(configData.CompanyHasAccessToNewLeaveCalendarUI);
        }
        Affinity.tooltips.processNew();
        this.target.removeClass('hidden');
    },

    managerHistory: function (isNewCalendar) {
        this.leaveHistory = new UILeaveHistory({
            target: this.target,
            isManager: true,
            isNewCalendarUI: isNewCalendar
        });
        Affinity.leave.manager.history = this.leaveHistory;
    },

    refreshHistory: function () {
        if (this.leaveHistory) {
            this.leaveHistory.reset(true); //keep filters
            this.leaveHistory.refreshHistory(true); //no alerts
        }
    },


    refreshBalance: function () {
        if (this.leaveBlanaces) {
            this.leaveBlanaces.reset();
            if (this.leaveBlanaces.balanceTable) {
                this.leaveBlanaces.getBalances();
            }
        }
    },

    refreshAll: function () {
        this.refreshHistory();
        this.refreshBalance();
        // this.refreshApplyForLeave();
    },

    refreshApplyForLeave: function () {
        this.applyForLeave.refreshEmployeeConfig();
    },

    managerBalance: function (configData) {
        this.leaveBlanaces = new UIManagerLeaveBalances({
            target: this.target,
            configData: configData
        });
    },
    //managerMultiPositionApply
    setLeaveApplyV1: function () {
        this.applyForLeave = new UILeaveApplyV1({
            target: this.target,
            isManager: true
        });
    },


    managerApply: function () {
        this.applyForLeave = new UILeaveApply({
            target: this.target,
            isManager: true
        });
    },

    managerDetail: function () {
        this.leaveDetail = new UILeaveDetail({
            target: this.target,
            isManager: true
        });
    },
    //managerMultiPositionDetail
    setLeaveDetailV1: function () {
        this.leaveDetail = new UILeaveDetailV1({
            target: this.target,
            isManager: true
        });
    },

    generateLeaveCalendar: function (isNewCalendarUI = false) {

        var date = new Date();

        var datefrom = new Date();
        datefrom.setDate(1);
        var from = datefrom.setMonth(datefrom.getMonth() - 13);

        date.setMonth(date.getMonth() + 11);
        var to = new Date(date.getFullYear(), date.getMonth(), 0);

        this.calendar = new UIManagerLeaveCalendar({
            target: this.target,
            fromDate: from,
            toDate: to,
            isNewCalendarUI: isNewCalendarUI,
        });

    },


    applyTeamConfig: function (doOnConfig) {
        if (this.config) {
            doOnConfig(this.config)
        }
        else {
            this.configQueue.push(doOnConfig);
        }
    },

    reset: function () {
        if (this.leaveBlanaces) { this.leaveBlanaces.reset(); }
        if (this.leaveHistory) { this.leaveHistory.reset(); }
        if (this.applyForLeave) { this.applyForLeave.reset(); }
        if (this.calendar) { this.calendar.reset(); }
        this.target.empty();
        this.target.addClass('hidden');
    },

    destroy: function () {
        this.reset();
        if (this.leaveBlanaces) { this.leaveBlanaces.destroy(); }
        if (this.leaveHistory) { this.leaveHistory.destroy(); }
        if (this.applyForLeave) { this.applyForLeave.destroy(); }
        if (this.calendar) { this.calendar.destroy(); }
    }

});
;
var UIManagerLeaveCalendar = new Class({

    Implements: [Options, Events],

    Binds: [
        'hide', 'show', 'toggle',
        'init',
        'buildHistoryFrames',
        'getHolidays', 'teamLeave', 'getExisitingLeave', 'processExistingLeave',
        'buildHistoryControls', 'scrollFromMarker', 'positionKeyMarker', 'positionKeyMarkerOnScroll',
        'setNewUICalendarIFrame', 'setUrlForNewUICalendar',
        'reset', 'destroy'
    ],

    options: {
        target: null,
        fromDate: false,
        toDate: false,
        startDay: 0,
        isNewCalendarUI: false
    },

    initialize: function (options) {
        this.setOptions(options);

        /**/

        this.width = '90%';

        this.today = new Date();

        this.currentMonth = Date.parse(this.options.fromDate).getMonth() + 1;

        this.fromDate = Date.parse(this.options.fromDate);
        this.toDate = Date.parse(this.options.toDate);
        this.isNewCalendarUI = this.options.isNewCalendarUI;
        this.disableToggleBtn = false;

        this.days = Math.ceil((this.toDate - this.fromDate) / 86400000);

        this.visibleWidth = '90%';

        this.segmentWidth = this.days * 20 < this.width ? this.width / this.days : 20;

        this.totalWidth = this.segmentWidth * this.days;

        /* BULD HTML */

        this.target = this.options.target;

        this.section = new Element('div', { 'class': 'section calendar-section' }).adopt(

            new Element('div', { 'class': 'section-body' }).adopt(

                this.calendarForm = new Element('div', { 'class': 'default-form manager-leave-calendar-form' })

            )

        ).inject(this.target);

        this.section.setStyle('opacity', 0);

        this.titlebox = new Element('div', { 'class': 'section-title ui-has-tooltip', 'html': 'Team Leave Calendar', 'data-tooltip': 'Open / Close', 'data-tooltip-dir': 'top' })
            .addEvent(Affinity.events.click, this.toggle).inject(this.calendarForm);

        this.toggleButton = new Element('div', { 'class': 'toggle-button', 'html': Affinity.icons.ArrowLineSmallDown }).store('state', 'closed').inject(this.titlebox);;

        this.hiddenBox = new Element('div', { 'class': 'manager-calendar-generator', 'style': 'opacity: 0;' }).inject(this.target, 'bottom');

        this.box = new Element('div', { 'class': 'manager-calendarbox', 'style': 'opacity:1' }).inject(this.hiddenBox);
		this.managerBoxWrap = new Element('div', { 'class': 'calendarbox-wrapper' }).inject(this.box);
        this.teamMembers = new Element('div', { 'class': 'team-members' }).setStyle('width', '8%').inject(this.managerBoxWrap, 'top');
        this.historyContainer = new Element('div', { 'class': 'calendar-history', 'style': 'display:inline-block' }).setStyle('width', this.visibleWidth).inject(this.managerBoxWrap);

        this.historyFrame = new Element('div', { 'class': 'calendar-history-frame manager-calendar-frame' }).setStyle('width', '100%').inject(this.historyContainer);
        this.historyTitles = new Element('div', { 'class': 'calendar-history-titles' }).setStyle('width', this.totalWidth).inject(this.historyFrame);
        this.historySlider = new Element('div', { 'class': '', 'html': '' }).inject(this.box);

        this.sectionBody = new Element('div', { 'class': 'section-body' }).inject(this.calendarForm);
        if (this.isNewCalendarUI) {
            this.setNewUICalendarIFrame();
        } else {
            this.filters = new Element('div', { 'class': 'calendar-filters form-row' }).inject(this.sectionBody);
            //this.filters.toggle();
            this.includeIndirect = new Element('label', { 'class': 'include-indirect-label', 'html': 'Include Indirect' }).inject(this.filters);
            this.includeIndirect = new Element('input', { 'type': 'checkbox', 'class': 'include-indirect-filter', 'value': 'includeIndirect' }).inject(this.filters);
            this.includeIndirect.addEvent('change', function (e) {
                this.preventReloadEvent = true;
                this.teamLeave();
            }.bind(this));
            // prevent reload calendar event when click includeIndeirect checkbox.

            /* REQUESTS */

            this.leaveRequest = new Request.JSON({
                onFailure: function (e) {
                    Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
                },
                onSuccess: function (response) {
                    if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName)) {
                        this.getExisitingLeave(response.Data);
                    }
                }.bind(this)
            });

            this.holidayRequest = new Request.JSON({
                onFailure: function (e) {
                    Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
                },
                onSuccess: function (response) {
                    if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName)) {
                        this.renderHolidays(response.Data);
                    }
                }.bind(this)
            });

            /**/
        }
        
        this.preventReloadEvent = false;
        this.scrollPosition = null;

        this.init();

        this.section.addEvent('managercalendarloaded', function () {

            if (!this.isNewCalendarUI) this.box.inject(this.sectionBody);

            //this.box.toggle();
            (function () {
                this.section.setStyle('opacity', null);
            }).delay(500, this);

            this.hiddenBox.set('html', '');
            Affinity.tooltips.processNew();
            if (this.isNewCalendarUI) {
                window.addEventListener('message', (e) => {
                    this.toggleDisableButton(e);
                }, );
                this.setUrlForNewUICalendar();
                this.toggleButton.set('html', Affinity.icons.ArrowLineSmallUp).store('state', 'open');
                this.sectionBody.reveal();
            }

            // supress the scorll problem caused by reload.
            if (this.preventReloadEvent) {
                this.sectionBody.reveal();

                if (this.scrollPosition === null) {
                    this.historyFrame.scrollLeft = this.scrollPosition = this.historyFrame.scrollWidth / 2;
                } else {
                    this.historyFrame.scrollLeft = this.scrollPosition;
                }    
            }
        }.bind(this));

        if (this.isNewCalendarUI) this.section.fireEvent('managercalendarloaded');
    },

    toggleDisableButton: function (e) {
        if (e.origin.includes("leave-ui")) {
            switch (e.data) {
                case "DraggableNavLoaded":
                    this.disableToggleBtn = false;
                    break;
                case "DraggableNavUnLoaded":
                    this.disableToggleBtn = true;
                    break;
            }
        }
    },

    hide: function (init) {
        if (!init) {
            this.scrollPosition = this.historyFrame.scrollLeft;
        }
        
        this.toggleButton.set('html', Affinity.icons.ArrowLineSmallDown).store('state', 'closed');
        this.sectionBody.dissolve();
    },

    show: function () {
        this.toggleButton.set('html', Affinity.icons.ArrowLineSmallUp).store('state', 'open');
        this.sectionBody.reveal();

        if (!this.isNewCalendarUI) {
           // if not scroll poisition not initiallized then scroll to mid
            if (this.scrollPosition === null) {
                this.historyFrame.scrollLeft = this.scrollPosition = this.historyFrame.scrollWidth / 2;
            } else {
                this.historyFrame.scrollLeft = this.scrollPosition;
            }
        }
        var _offset = this.toggleButton.offsetParent.getOffsets();
        setTimeout(function() {
            window.scrollTo({ top: _offset.y })
        }, 500)
    },

    toggle: function () {
        if (this.disableToggleBtn) return;
        if (this.toggleButton.retrieve('state') === 'open') {
            this.hide();
        } else {
            this.show();
        }
    },

    init: function () {
        this.hide(true);

        if (!this.isNewCalendarUI) this.getHolidays();

        this.section.addEvent('managerScheduleReturned', this.buildHistoryFrames);

    },

    teamLeave: function () {

        var employeeNum = Affinity.login.profile.employeeNumber;

        this._methodName = 'ui.managerCalendar.js -> teamLeave';

        var url = Affinity.leave.apiroot + 'ManagerTeamCalendar/' + this.fromDate.format('%d-%b-%Y') + '/' + this.toDate.format('%d-%b-%Y');
        if (this.includeIndirect.checked) {
            url += '?includeIndirect=true';
        }
        this._api = Affinity.GetCacheSafePath(url);



        if (this.leaveRequest && this.leaveRequest.isRunning()) {
            this.leaveRequest.cancel();
        }
        this.leaveRequest.url = this.leaveRequest.options.url = this._api;
        this.leaveRequest.get();


    },

    getHolidays: function () {

        var employeeNum = Affinity.login.profile.employeeNumber;

        this._methodName = 'ui.managerCalendar.js -> getHolidays';

        this._api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'Holidays/' + employeeNum + '/' + Date.parse(this.fromDate).format('%d-%b-%Y') + '/' + Date.parse(this.toDate).format('%d-%b-%Y'));

        this.holidays = {};

        this.dayStarts = this.today.clone().clearTime().set('Hours', 8).set('Minutes', 30);
        this.dayEnds = this.today.clone().clearTime().set('Hours', 17).set('Minutes', 30);
        this.weekends = [0, 6]; // Sunday, Saturday

        if (this.holidayRequest && this.holidayRequest.isRunning()) {
            this.holidayRequest.cancel();
        }
        this.holidayRequest.url = this.holidayRequest.options.url = this._api;
        this.holidayRequest.get();

    },

    renderHolidays: function (hols) {

        Array.each(hols, function (holiday, index) {

            var date = 't' + Date.parse(holiday.Date).clone().clearTime().format('%s');
            this.holidays[date] = holiday.Name;

        }.bind(this));

        this.section.fireEvent('managerScheduleReturned');

    },

    getExisitingLeave: function (teamLeaveData) {

        var leave;

        var data = {};

        data.teamleave = [];

        data.teamleave.push(teamLeaveData);

        this.processExistingLeave(data);

    },

    buildHistoryFrames: function () {

        var date = this.fromDate.clone().clearTime();

        var i, titleWidth, klass, bklass, tooltip, tooltipdir, seg;

        for (i = 0; i < this.days; i++) {

            if (i === 0 || date.getDate() === 1) {
                titleWidth = this.segmentWidth * date.get('lastdayofmonth');
                if (i === 0) { titleWidth = this.segmentWidth * (date.get('lastdayofmonth') - this.fromDate.getDate() + 1); }
                new Element('div')
					.addClass('title')
					.setStyle('width', titleWidth + 'px')
					.set('html', date.format('%B %Y'))
					.inject(this.historyTitles)
                ;
            }

            tooltip = date.format('%A %B %e%o %Y');

            klass = 'calendar-history-segment ui-has-tooltip ';
            if (date.clearTime().getTime() == this.today.clearTime().getTime()) {
                klass += 'today ';
                tooltip += '<br />Today';
            }

            bklass = 'bottom';
            if (date.getDate() === 1) { bklass += ' month' }
            if (this.weekends.contains(date.getDay())) { bklass += ' weekend' }
            if (this.holidays['t' + date.format('%s')]) {
                bklass += ' holiday',
                tooltip += '<br />' + this.holidays['t' + date.format('%s')]
            }

            tooltipdir = i < (this.days / 2) ? 'top,right' : 'top,left';

            seg = new Element('div', {
                'class': klass,
                'data-tooltip': tooltip,
                'data-tooltip-dir': tooltipdir
            }).adopt(
                new Element('div', { 'class': 'top' }),
                new Element('div', { 'class': bklass })
            ).inject(this.historyFrame);

            seg.store('date', date.clone());

            seg.setStyles({
                width: this.segmentWidth,
                left: this.segmentWidth * i
            });

            date.increment('day', 1);

        }

        this.historyTitles.setStyle('width', this.segmentWidth * i);

        /* tidy up titles */

        if (this.fromDate.getDate() > 15) {
            this.historyTitles.getElement('.title').set('html', '');
        }
        if (this.toDate.getDate() < 15) {
            this.historyTitles.getLast('.title').destroy();
        } else {
            this.historyTitles.getLast('.title').setStyle('width', 'auto');
        }

        this.teamLeave();

    },

    processExistingLeave: function (data) {

        this.teamMembers.set('html', '');
        this.historyFrame.getElements('.calendar-history-item').destroy();

        var offset = 45;
        var days, width, left, kass, message;
        var _t = this;
        this.currentFocusedDay = undefined;
        this.currentTooltip = undefined;
        var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

        if (data.teamleave && data.teamleave.length > 0) {
            document.addEventListener("scroll", function(e) {
                if (_t.currentFocusedDay) {
                    _t.currentFocusedDay.removeClass("focused");
                    _t.currentTooltip && _t.currentTooltip.remove();

                    _t.currentTooltip = undefined;
                    _t.currentFocusedDay = undefined;
                    document.getElementById("calendarToolTipOverlay").remove();
                }
            })

            Array.each(data.teamleave[0], function (person) {

                this.teamMemberName = new Element('div', {
                    'class': 'team-members-name',
                    'html': person.EmployeeName
                }).inject(this.teamMembers);

                Array.each(person.LeaveBlocks, function (range, index) {

                    days = Math.round((Date.parse(range.DateTo).getTime() - Date.parse(range.DateFrom).getTime()) / (1000 * 60 * 60 * 24)) + 1;
                    width = days * this.segmentWidth;
                    //left = (Math.round((Date.parse(range.DateFrom).getTime() - this.fromDate.getTime()) / (1000 * 60 * 60 * 24)) * this.segmentWidth);
                    var fromDate = this.fromDate.getFullYear() + '-' + (this.fromDate.getMonth() + 1) + '-' + this.fromDate.getDate() + 'T00:00:00';
                    left = (Math.round((Date.parse(range.DateFrom).getTime() - Date.parse(fromDate).getTime()) / (1000 * 60 * 60 * 24)) * this.segmentWidth);
                    kass = 'calendar-history-item';
                    kass += ' ui-has-tooltip';
                    message = '<div class=\'details\'>';
                    message += '<strong>' + person.EmployeeName + '</strong><br />';
                    message += '<p> </p>';
                    message += '<strong>From</strong> ' + Date.parse(range.DateFrom).format('%A %B %e%o %Y') + '<br />';
                    message += '<strong>To</strong> ' + Date.parse(range.DateTo).format('%A %B %e%o %Y') + '<br />';
                    message += '<p> </p>';
                    message += '<div>';
                    Array.each(range.LeaveDescriptions, function (description, index) {
                        message += ' - ' + '<strong>' + description + '</strong>' + '<br />';
                    });
                    message += '</div>';
                    message += '</div>';

                    var el = new Element('div')
                        .addClass(kass)
                        .setStyles({
                            'margin-left': left,
                            'width': width,
                            'top': offset,
                            'background-color': '#BEBEBE'
                        });
                    
                    if (vw >= 768) {
                        el.set('data-tooltip', message)
                        el.set('data-tooltip-direction', 'top')
                    } else {
                        el.set('data-content', message)
                    }
                    el.inject(this.historyFrame);

                }.bind(this));

                offset += 35;

            }.bind(this));
        }

        this.historyFrame.setStyle('height', offset + 25);
        this.teamMembers.setStyle('height', offset + 25);

        Affinity.tooltips.processNew();

        /* build control slider */
        this.buildHistoryControls.delay(100, this);
        
        /* Tooltip for mobile size */
        if (vw < 768) {
            $$('.manager-calendar-frame .calendar-history-item').addEvent("click", function(e) {
                e.stopPropagation();
                if (_t.currentFocusedDay) return;
                _t.currentFocusedDay = e.target;

                _t.currentFocusedDay.addClass("focused");
                var coor = _t.currentFocusedDay.getBoundingClientRect();
                _t.currentTooltip = new Element('div')
                    .addClass("calendar-history-day")
                    .set("html", _t.currentFocusedDay.get('data-content'))
                    .inject(document.body);

                _t.currentTooltip.setStyles({
                    top: coor.top - _t.currentTooltip.offsetHeight - coor.height, // minus the he
                })
                new Element('div')
                    .addClass("calendar-history-day-overlay")
                    .set("id", "calendarToolTipOverlay")
                    .addEvent("touchstart", function(e) {
                        e.stopPropagation();
                        e.target.remove();
                        _t.currentFocusedDay.removeClass("focused");

                        _t.currentTooltip && _t.currentTooltip.remove();
                        _t.currentTooltip = undefined;
                        _t.currentFocusedDay = undefined;
                    })
                    .inject(document.body);

            })
        }
    },

    buildHistoryControls: function () {

        if (this.historyFrame.scrollWidth > this.historyFrame.clientWidth) {

            this.histroryFrameSize = this.historyFrame.measure(function () { return this.getSize(); });

            //This is a haunted function to fix overscrolling on calendar
            if (!Affinity.mobile) {
                this.histroryFrameSize.x -= (Affinity.scrollBarSize * 1.5);
            }

            this.keyScale = this.histroryFrameSize.x / this.totalWidth;

            var height = this.histroryFrameSize.y;

            if (this.keyWrapper)
                this.keyWrapper.destroy();

            this.keyWrapper = new Element('div', { 'id': 'keyWrapper' });

            this.keyWrapper.setStyles({
                'width': this.histroryFrameSize.x,
                'height': (height * this.keyScale),
                'margin': '20px 0 30px 0',
                'border': '1px solid #ccc',
                'overflow': 'hidden'
            });
            this.keyWrapper.inject(this.historyContainer);

            this.historyKey = this.historyFrame.clone();

            this.historyKey.setStyles({
                'width': this.totalWidth,
                'transform-origin': '0 0',
                'transform': 'scale(' + this.keyScale + ',' + this.keyScale + ')',
                'overflow': 'hidden'
            });
            this.historyKey.addClass('historyKey');
            this.historyKey.inject(this.keyWrapper);

            /**/

            var pos = this.historyKey.getPosition(this.historyContainer);
            var size = this.historyKey.getSize();

            /**/

            this.keyButton = new Element('div')
				.addClass('history-key-button has-events')
				.setStyles({
				    'width': size.x,
				    'height': size.y,
				    'top': pos.y,
				    'left': pos.x
				})
				.addEvent(Affinity.events.click, this.positionKeyMarker)
				.inject(this.historyKey, 'after')
            ;
            this.keyMarkerWidth = size.x * this.keyScale;

            this.keyButtonMarker = new Element('div')
				.addClass('history-key-button-marker')
				.setStyles({
				    'width': this.keyMarkerWidth,
				    'height': size.y + 20,
				    'top': pos.y - 10,
				    'left': pos.x
				})
				.inject(this.keyButton, 'after')
            ;

            /**/

            new Drag(this.keyButtonMarker, {
                limit: { x: [0, this.histroryFrameSize.x - this.keyMarkerWidth - 2], y: [0, 0] },
                modifiers: { x: 'margin-left', y: 'margin-top' },
                onDrag: this.scrollFromMarker
            });

            /**/

            this.historyFrame.addEvent('scroll', this.positionKeyMarkerOnScroll);

            this.section.addEvent('LeaveCalendarScroll', function (scrollper) {

                this.historyFrame.scrollTo(((this.totalWidth - this.histroryFrameSize.x) * scrollper), 0);

            }.bind(this));

            /**/

            delete pos; delete size;
        }

        /**/

        this.box.setStyle('opacity', 1).set('reveal', { duration: 250 });

        prompts.hide();

        this.section.fireEvent('managercalendarloaded');

    },

    scrollFromMarker: function () {
        var fullScroll = this.totalWidth - this.histroryFrameSize.x;
        var scaleWidth = this.histroryFrameSize.x - this.keyMarkerWidth - 2;
        var markerPos = this.keyButtonMarker.getPosition(this.historyContainer).x - this.keyButton.getPosition(this.historyContainer).x;
        this.historyFrame.scrollTo(fullScroll * (markerPos / scaleWidth), 0);
        delete fullScroll; delete scaleWidth; delete markerPos;
    },

    positionKeyMarker: function (e) {
        var pos = (e.client.x - this.keyButton.getPosition(this.historyContainer).x) - (this.keyMarkerWidth / 2);
        pos = pos < 0 ? 0 : pos > this.histroryFrameSize.x - this.keyMarkerWidth ? this.histroryFrameSize.x - this.keyMarkerWidth : pos
        this.keyButtonMarker.setStyle('margin-left', pos);
        this.scrollFromMarker();
        delete pos;
    },

    positionKeyMarkerOnScroll: function () {
        var fullScroll = this.totalWidth - this.histroryFrameSize.x;
        var scrollx = this.historyFrame.getScroll().x;
        var scrollPer = scrollx / fullScroll;
        this.keyButtonMarker.setStyle('margin-left', scrollx * this.keyScale);
        this.section.fireEvent('LeaveHistoryScroll', scrollPer);
        delete fullScroll; delete scrollx; delete scrollPer;
    },

    reset: function () {
        if (this.leaveRequest && this.leaveRequest.isRunning()) {
            this.leaveRequest.cancel();
        }
        if (this.holidayRequest && this.holidayRequest.isRunning()) {
            this.holidayRequest.cancel();
        }
    },

    destroy: function () {
        this.reset();
        if (this.section) {
            this.section.removeEvents();
            try { this.titlebox.removeEvents(); } catch (e) { }
            try { this.historyFrame.removeEvents(); } catch (e) { }
            Array.each(this.section.getElements('.has-events'), function (el) { el.removeEvents(); });
            Array.each(this.section.getElements('.button'), function (el) { el.removeEvents(); });
            this.section.empty();
            this.section.destroy();
        }

    },

    setNewUICalendarIFrame: function() {
        // Insert IFrame for the new Calendar UI
        this.disableToggleBtn = true;
        this.calendarIframe = new Element('iframe');
        var screenRatio = (window.screen.height / window.screen.width) * 100;
        new Element('div', { 'class': 'ss-app-iframe', 'style': `--screen-ratio: ${screenRatio}%; --screen-max-height: ${window.screen.height - 240}px` })
            .adopt(this.calendarIframe).inject(this.sectionBody, "top");
        
    },
        
    setUrlForNewUICalendar: function() {
        const calendarUrl = window.location.href.includes("test") ? "https://leave-ui.testaffinitylogon.com/manager-team-calendar" : "https://leave-ui.affinitylogon.com/manager-team-calendar";
        this.calendarIframe.src = calendarUrl;        
    }

});
;
var UIManagerLeaveBalances = new Class({

    Implements: [Options, Events],

    Extends: UIEmployeeLeaveBalances,

    Binds: [
        'hide',
        'show',
        'toggle',
        'getBalances',
        'refreshEmployeeSelector',
        'processTeam',
        'leavePaginate',
        'populateLeaveFilters',
        'reset', 'destroy'
    ],

    options: {
        target: null,
        configData: null
    },

    initialize: function (options) {

        this.setOptions(options);

        this.parent(options, true);

        //request url
        var employeeNum = Affinity.login.profile.employeeNumber;
        this.balanceUrl = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'ManagerTeamLeaveBalance/' + employeeNum);
        this.leaveTypesUrl = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'LeaveTypes/' + employeeNum);
        /* BUILD HTML */
        this.target = this.options.target;
        this.managerConfig = this.options.configData;
        this.isManager = true;
        this.section = new Element('div', { 'class': 'section' }).inject(this.target);
        this.sectionBody = new Element('div', { 'class': 'section-body' }).inject(this.section);
        this.unitType = 'H';
        this.unitLabel = 'Hour';
        this.totalRecords = 0;
        this.getBalancesType = "ui";
        this.csvOffset = 1;
        this.csvContentArr = [];
        this.csvBatchSize = 50;
        this.tlbContent = null;
        this.tlbContentWrap = null;
        this.form = new Element('div', { 'class': 'default-form' }).inject(this.sectionBody);
        this.teamBalances = new Element('div', { 'class': 'team-leave-balance' }).inject(this.form);
        this.titlebar = new Element('div', { 'class': 'section-title team-leave-balance-title ui-has-tooltip', 'html': 'Estimated Available Leave', 'data-tooltip': 'Open / Close', 'data-tooltip-dir': 'top' }).addEvent(Affinity.events.click, this.toggle).inject(this.teamBalances);
        this.toggleButton = new Element('div', { 'class': 'toggle-button', 'html': Affinity.icons.ArrowLineSmallDown }).store('state', 'closed').inject(this.titlebar)
        this.teamBalancesBody = new Element('div', { 'class': 'team-balance-body' }).inject(this.teamBalances);
        this.toggleFullView = new Element('span', { 'class': 'button footer-button detailed-view blue' }).adopt(
            new Element('span', {'id': 'toggle-button-wording', 'html': 'Detailed View' })
        ).addEvent(Affinity.events.click, function () {
            this.toggleTableView();
        }.bind(this));
        this.exportButton = new Element('span', { 'class': 'button green footer-button ui-has-tooltip', 'data-tooltip': 'Export all team leave balances as csv', 'data-tooltip-dir': 'right' }).adopt(
            new Element('span', { 'html': 'Export All' })
        ).addEvent(Affinity.events.click, function () {
            if (!this.validateInput()) {
                return;
            }
            if (this.totalRecords == 0) {
                uialert({
                    message: 'Please ensure balances are displayed on screen before exporting.',
                    noClose: false
                });
            } else {
                this.buildCsv(null);
            }
        }.bind(this));
        this.tableContainer = new Element('div');
        this.balanceTable = null;
        this.balanceSelector = null;
        this.currentPage = 1;
        this.leavePagingCount = 8;
        this.leaveTotalPages = 1;
        this.leaveConfigOptions = null;
        this.employeeFromSearch = 0;
        this.selection = 0;
        this.dateTo = null;
        this.payPeriodEndDate = new Date();
        this.employeeSelector = new Element('select', { 'class': 'leave-employee-selector ui-autocomplete' });
        this.leaveTypeFilter = new Element('select', { 'class': 'leave-filter-select leave-type-filter inline' }).adopt(
            new Element('option', { 'value': '0', 'html': 'Annual Leave', 'id': '09' })
        );
        this.leaveTypeElement = new Element('span').adopt(
            new Element('span', { 'class': 'filter-label', 'html': 'Select Leave Type' }),
            this.leaveTypeFilter
        );

        this.annualLeaveHeader = new Element('span', { 'html': 'Anual Leave' });
        this.showButton = new Element('span', { 'class': 'form-row team-balance-selector team-balance-button' }).adopt(
            new Element('span', { 'class': 'button blue', 'html': 'Show' })
        );

        this.annualLeaveTooltip = new Element('span', { 'class': 'icon small icon-help-round ui-has-tooltip', 'data-tooltip': 'Leave available at the end of the last pay period', 'data-tooltip-dir': 'left' });
        this.approvedLeaveTooltip = new Element('span', { 'class': 'icon small icon-help-round ui-has-tooltip', 'data-tooltip': "Approved not-yet-paid leave", 'data-tooltip-dir': 'left' });
        this.unapprovedLeaveTooltip = new Element('span', { 'class': 'icon small icon-help-round ui-has-tooltip', 'data-tooltip': 'Leave applied for awaiting approval', 'data-tooltip-dir': 'left' });
        this.accruedLeaveTooltip = new Element('span', { 'class': 'icon small icon-help-round ui-has-tooltip', 'data-tooltip': 'Leave that accrued since the end of the last pay period', 'data-tooltip-dir': 'left' });
        this.availableLeaveTooltip = new Element('span', { 'class': 'icon small icon-help-round ui-has-tooltip', 'data-tooltip': 'Estimated leave available on this date', 'data-tooltip-dir': 'left' });
        this.availableHoursLeaveTooltip = new Element('span', { 'class': 'icon small icon-help-round ui-has-tooltip', 'data-tooltip': 'Estimated leave available on this date in hours', 'data-tooltip-dir': 'left' });
        this.availableDaysLeaveTooltip = new Element('span', { 'class': 'icon small icon-help-round ui-has-tooltip', 'data-tooltip': 'Estimated leave available on this date in days', 'data-tooltip-dir': 'left' });

        this.nonconfiguredLeaveTypes = ['A', 'B', 'C', 'D', 'E', 'S'];
        this.availableLeaveCodes = ['07', '09', '10', '12', '13', '11'];
        this.leaveBalanceDatePicker = new Element('span').adopt(
            new Element('span', { 'class': 'filter-label', 'html': 'Select a Date' }),
            new Element('span', { 'class': 'form-row inline' }).adopt(
                this.dateToFilter = new Element('input', { 'type': 'text', 'id': 'leave-date-to', 'class': 'data-hj-whitelist leave-filter-date inline uidate-calendar', 'data-calendar-display-format': '%d/%m/%y', 'data-calendar-return-format': '%d/%m/%Y', 'data-start-date': 'none', 'data-calendar-nullable': 'true', 'value': null })
            )
        );

        this.tooltips = new Element('span', { 'class': 'hidden' }).adopt(
            this.annualLeaveTooltip,
            this.approvedLeaveTooltip,
            this.unapprovedLeaveTooltip,
            this.accruedLeaveTooltip,
            this.availableLeaveTooltip,
            this.availableDaysLeaveTooltip
        );

        this.loadingBar = new Element('div', { 'class': 'loadingBarContainer', 'id': 'loadingBarContainer' }).adopt(
           new Element('div', { 'id': 'loadingBarMessage', 'class': 'color-orange' }),
           new Element('div', { 'class': 'barProgress', 'id': 'barProgress' }).adopt(new Element('div', { 'class': 'loadingBar', 'id': 'loadingBar' }))
       );

        this.balanceSelector = new Element('div', { 'class': 'form-row team-balance-selector' }).adopt(
            this.employeeSelector,
            this.leaveTypeElement,
            this.leaveBalanceDatePicker,
            this.showButton,
            this.tooltips,
            this.loadingBar,
            this.tableContainer,
            this.toggleFullView,
            this.exportButton
        ).inject(this.teamBalancesBody);
        
        this.paginateBox = new Element('div', { 'class': 'paginate-box pagination' }).inject(this.teamBalances, 'bottom');

        this.showButton.addEvent(Affinity.events.click, function () {
            this.getBalances("ui");
        }.bind(this));
        this.employeeSelector.addEvent('change', function () {
            (function () {
                this.selection = this.employeeSelector.getSelected()[0].get('value');
                if (this.selection == -1) {
                    //Nothing's selected.
                    this.employeeFromSearch = 0;
                    this.selection = 0;
                    return
                } else if (this.selection == -2) {
                    this.includeIndirect = false;
                    this.employeeFromSearch = 0;
                } else if (this.selection == -3) {
                    this.includeIndirect = true;
                    this.employeeFromSearch = 0;
                } else {
                    this.employeeFromSearch = this.selection;
                    this.includeIndirect = true;
                }
            }.bind(this)).delay(10, this)
        }.bind(this));

        this.refreshEmployeeSelector(false);

        this.panels = new Element('div', { 'class': 'leave-info-panels' }).inject(this.teamBalancesBody);

        this.employeeNumber = null;

        /* REQUESTS */
        this.teamBalanceRequest = new Request.JSON({
            headers: { 'Pragma': 'no-cache' },
            onRequest: function () {
                if (this.getBalancesType != "csv") {
                    uialert({
                        message: 'Projecting Leave',
                        showLoader: true,
                        showButtons: false,
                        noClose: true
                    });
                } else {

                }
            }.bind(this),
            onFailure: function (e) {
                prompts.hide();
                Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
            },
            onSuccess: function (response) {
                prompts.hide();
                this.data = response.Data;

                if (this.data.hasOwnProperty("PayPeriodEndDate")) {
                    this.payPeriodEndDate = new Date(this.data.PayPeriodEndDate);
                }
                if (this.getBalancesType == "csv") {
                    this.buildCsv(this.data);
                } else {
                    this.annualLeaveHeader.innerHTML = "Leave Balance <br> (as at " + this.payPeriodEndDate.format('%d-%b-%Y') + ")";
                    if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName)) {
                        this.process(this.data);
                    }
                    this.leavePaginate();
                }
            }.bind(this)
        });

        this.leaveTypeRequest = new Request.JSON({
            headers: { 'Pragma': 'no-cache' },
            onSuccess: function (response) {
                this.data = response.Data;
                if (this.leaveConfigOptions == null && this.data.hasOwnProperty("LeaveCodes")) {
                    this.leaveConfigOptions = this.data.LeaveCodes;
                    this.populateLeaveFilters(this.leaveConfigOptions);
                }
            }.bind(this)
        });
        this.leaveTypeRequest.url = this.leaveTypeRequest.options.url = this.leaveTypesUrl;
        this.leaveTypeRequest.get();
        Affinity.uiDateCalendar.processNew();
        // Uncollapse this section when New Calendar Config is enabled
        if (this.managerConfig.CompanyHasAccessToNewLeaveCalendarUI) {
            this.hide();
        } else {
            this.show();
        }
    },

    refreshEmployeeSelector: function (selectedEmployeeNo) {
        if (this.employeeSelector && this.managerConfig.Employees) {
            this.employeeSelector.empty();
            //add default
            new Element('option', { 'value': '-1', 'class': 'grey-text', 'html': 'Select an employee' }).inject(this.employeeSelector, 'top');
            new Element('option', { 'value': '-2', 'html': 'All Direct Employees' }).inject(this.employeeSelector);
            new Element('option', { 'value': '-3', 'html': 'All Direct and Indirect Employees' }).inject(this.employeeSelector);

            var selectedIndex = 0, currentIndex = 0;
            //add employees
            Array.each(this.managerConfig.Employees, function (emp, index) {
                if (emp.IsDirect) { // direct or everything
                    new Element('option', {
                        'html': emp.EmployeeName + ' (' + emp.EmployeeNo + ')',
                        'value': emp.EmployeeNo
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

    getWording: function (value, singular) {
        var ret = (value == 1 || value == -1) ? value + " " + singular : value + " " + singular + "s";
        return ret;
    },

    buildCsv: function (data) {
        if (data != null) {
            //add to CSV array
            var source = 'ProjectedLeave' in data ? data.ProjectedLeave : data;
            let csvArr = this.csvContentArr;
            var unitLabel = this.unitLabel;
            Array.each(source, function (rowData, index) {
                var csvRow = [];
                switch (rowData.CalcUnit) {
                    case "D":
                        unitLabel = "Days";
                        break;
                    case "W":
                        unitLabel = "Weeks";
                        break;
                    case "H":
                    default:
                        unitLabel = "Hours";
                        break;
                }
                csvRow.push(rowData.EmployeeName + ' (' + rowData.EmployeeNo + ')',
                    unitLabel,
                    rowData.PpeEntitlement,
                    rowData.PpeAccrual,
                    rowData.LeaveBalance,
                    rowData.ApprovedLeaveDisplay,
                    rowData.PendingLeaveDisplay,
                    rowData.AccruedProjectedLeave,
                    rowData.TotalProjectedHours,
                    rowData.TotalProjectedDays
                );
                csvArr.push(csvRow);
            });
            this.csvContentArr = csvArr;
        }
        if (this.totalRecords != 0) {
            var numberOfRequests = Math.ceil(this.totalRecords / this.csvBatchSize);
            var percentageIncrement = 100 / numberOfRequests;
            var container = document.getElementById("loadingBarContainer");
            container.style.display = "block";
            this.incrementProgressBar(percentageIncrement, numberOfRequests);

            if (this.csvOffset <= numberOfRequests) {
                this.getBalances("csv");
                this.csvOffset++;
            } else {
                if (this.csvContentArr.length > 0) {
                    //Download CSV
                    container.style.display = "none";
                    var csvHeaders = ["Employee", "Units","Entitlement","Accrual", "Leave Balance (as at " + this.payPeriodEndDate.format('%d-%b-%Y') + ")", "Approved Leave", "Unapproved Leave", "Accrued Leave", "Available Leave (hours)", "Available Leave (days)"];
                    this.csvContentArr.unshift(csvHeaders);
                    let rows = this.csvContentArr;
                    let csvContent = "";
                    //Might need to be a recursive function...
                    rows.forEach(function (rowArray) {
                        let row = rowArray.join(",");
                        csvContent += row + "\r\n";
                    });

                    if (navigator.msSaveBlob) { // IE 10+
                        var filename = "TeamLeaveBalance.csv";
                        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                        navigator.msSaveBlob(blob, filename);
                    } else {
                        csvContent = "data:text/csv;charset=utf-8," + csvContent;
                        var encodedUri = encodeURI(csvContent);
                        var link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", "TeamLeaveBalance.csv");
                        document.body.appendChild(link); // Required for FF
                        link.click(); //Download the data file.
                        link.parentNode.removeChild(link); //Remove link.
                        this.csvContentArr = []; //Reset array.
                        this.csvOffset = 1;
                        document.getElementById("loadingBar").style.width = "0%";
                    }
                }
            }
        }
    },
    generateEalTableHtmlWithWeeks: function (leaveInfo) {
        console.log(leaveInfo)
        var unitLabel = leaveInfo.calcUnit == "H" ? "Hours" : "Days";
        var balDate = this.parseISOLocal(leaveInfo.balanceDate);
        var formattedBalDate = balDate.getDate() + "/" + (balDate.getMonth() + 1) + "/" + balDate.getFullYear();

        var operator = "+";
        if (parseFloat((leaveInfo.postProjectedAccruals + leaveInfo.unitlessProjectedAccruals).toFixed(2)) < 0) {
            operator = "";
        }

        var storyHtml =
            "<div class='leftText ealTableTitle'>How " + leaveInfo.employeeFirstName +
            "'s Estimated Leave Is Calculated</div> <br /><table class='ealTable popup'><thead><tr><th>Breakdown</th><th class='centerText'>" + unitLabel + "</th><th class='centerText'>Weeks</th></tr></thead>" +
            "<tbody><tr><td>Leave balance at last period end</td><td class='centerText " + this.evaluateCssClassByValue(leaveInfo.unitlessLeaveBalance) + "'>" + parseFloat(leaveInfo.unitlessLeaveBalance).toFixed(2) +
            "</td>" +
            "<td class='centerText " + this.evaluateCssClassByValue(leaveInfo.unitlessLeaveBalanceInWeeks) + "'>" + parseFloat(leaveInfo.unitlessLeaveBalanceInWeeks).toFixed(2) +
            "</td>" + "</tr>" +
            "<tr>" +
            "<td>Add leave accruals</td>" +
            "<td class='centerText " + this.evaluateCssClassByValue(leaveInfo.postProjectedAccruals + leaveInfo.unitlessProjectedAccruals) + "'>" + operator + + + parseFloat(leaveInfo.postProjectedAccruals + leaveInfo.unitlessProjectedAccruals).toFixed(2) + "</td>" +
            "<td class='centerText " + this.evaluateCssClassByValue(leaveInfo.postProjectedAccrualsInWeeks + leaveInfo.unitlessProjectedAccrualsInWeeks) + "'>" + operator + + + parseFloat(leaveInfo.postProjectedAccrualsInWeeks + leaveInfo.unitlessProjectedAccrualsInWeeks).toFixed(2) + "</td>" +
            "</tr>";
        var totalAmount = leaveInfo.calcUnit == "H" ? leaveInfo.unitlessTotalProjectedHours : leaveInfo.unitlessTotalProjectedDays;
        if (leaveInfo.leaveItems != null) {
            for (var i = 0; i < leaveInfo.leaveItems.length; i++) {
                var leaveDate = this.parseISOLocal(leaveInfo.leaveItems[i].DateFrom);
                var formattedLeaveDate = leaveDate.getDate() + "/" + (leaveDate.getMonth() + 1) + "/" + leaveDate.getFullYear();
                if (leaveInfo.leaveItems[i].Credit) {
                    storyHtml += "<tr><td>Credit cancelled/declined leave booked on " + formattedLeaveDate +
                        "</td>" +
                        "<td class='centerText " + this.evaluateCssClassByValue(leaveInfo.leaveItems[i].Units) + "'>+" + parseFloat(leaveInfo.leaveItems[i].Units).toFixed(2) + "</td>" +
                        "<td class='centerText " + this.evaluateCssClassByValue(leaveInfo.leaveItems[i].UnitsInWeeks) + "'>+" + parseFloat(leaveInfo.leaveItems[i].UnitsInWeeks).toFixed(2) + "</td>" +
                        "</tr>"
                } else {
                    storyHtml += "<tr><td>Subtract leave booked on " + formattedLeaveDate +
                        "</td>" +
                        "<td class='centerText " + this.evaluateCssClassByValue(-leaveInfo.leaveItems[i].Units) + "'>-" + parseFloat(leaveInfo.leaveItems[i].Units).toFixed(2) + "</td>" +
                        "<td class='centerText " + this.evaluateCssClassByValue(leaveInfo.leaveItems[i].UnitsInWeeks) + "'>-" + parseFloat(leaveInfo.leaveItems[i].UnitsInWeeks).toFixed(2) + "</td>" +
                        "</tr>"
                }
            }
        }
        storyHtml += "<tfoot><tr><th>Total estimated leave available on " + formattedBalDate + "</th>" +
            "<th class='centerText " + this.evaluateCssClassByValue(totalAmount) + "'>" + parseFloat(totalAmount).toFixed(2) + "</th>" +
            "<th class='centerText " + this.evaluateCssClassByValue(leaveInfo.unitlessTotalProjectedWeeks) + "'>" + parseFloat(leaveInfo.unitlessTotalProjectedWeeks).toFixed(2) + "</th>" +
            "</tr> </tfoot>";
        storyHtml += "</table><br />";
        return storyHtml;
    },
    generateEalTableHtml: function (leaveInfo) {
        console.log(leaveInfo)
        var unitLabel = leaveInfo.calcUnit == "H" ? "Hours" : "Days";
        var balDate = this.parseISOLocal(leaveInfo.balanceDate);
        var formattedBalDate = balDate.getDate() + "/" + (balDate.getMonth() + 1) + "/" + balDate.getFullYear();

        var operator = "+";
        if (parseFloat((leaveInfo.postProjectedAccruals + leaveInfo.unitlessProjectedAccruals).toFixed(2)) < 0) {
            operator = "";
        }

        var storyHtml = "<div class='leftText ealTableTitle'>How " + leaveInfo.employeeFirstName + "'s Estimated Leave Is Calculated</div> <br /><table class='ealTable popup'><thead><tr><th>Breakdown</th><th class='centerText'>" + unitLabel + "</th></tr></thead>" +
            "<tbody><tr><td>Leave balance at last period end</td><td class='centerText " + this.evaluateCssClassByValue(leaveInfo.unitlessLeaveBalance) + "'>" + leaveInfo.unitlessLeaveBalance + "</td></tr><tr><td>Add leave accruals</td><td class='centerText " + this.evaluateCssClassByValue(leaveInfo.postProjectedAccruals + leaveInfo.unitlessProjectedAccruals) + "'>" + operator + + +(leaveInfo.postProjectedAccruals + leaveInfo.unitlessProjectedAccruals).toFixed(2) + "</td></tr>";
        var totalAmount = leaveInfo.calcUnit == "H" ? leaveInfo.unitlessTotalProjectedHours : leaveInfo.unitlessTotalProjectedDays;
        if (leaveInfo.leaveItems != null) {
            for (var i = 0; i < leaveInfo.leaveItems.length; i++) {
                var leaveDate = this.parseISOLocal(leaveInfo.leaveItems[i].DateFrom);
                var formattedLeaveDate = leaveDate.getDate() + "/" + (leaveDate.getMonth() + 1) + "/" + leaveDate.getFullYear();
                if (leaveInfo.leaveItems[i].Credit) {
                    storyHtml += "<tr><td>Credit cancelled/declined leave booked on " + formattedLeaveDate + "</td><td class='centerText " + this.evaluateCssClassByValue(leaveInfo.leaveItems[i].Units) + "'>+" + leaveInfo.leaveItems[i].Units + "</td></tr>"
                } else {
                    storyHtml += "<tr><td>Subtract leave booked on " + formattedLeaveDate + "</td><td class='centerText " + this.evaluateCssClassByValue(-leaveInfo.leaveItems[i].Units) + "'>-" + leaveInfo.leaveItems[i].Units + "</td></tr>"
                }
            }
        }
        storyHtml += "<tfoot><tr><th>Total estimated leave available on " + formattedBalDate + "</th><th class='centerText " + this.evaluateCssClassByValue(totalAmount) + "'>" + totalAmount + "</th></tr> </tfoot>";
        storyHtml += "</table><br />";
        return storyHtml;
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
    incrementProgressBar: function (percentageIncrement, numberOfRequests) {
        var progressBar = document.getElementById("loadingBar"),
            progressBarContainer = document.getElementById("barProgress"),
            percentageWidth = (progressBar.clientWidth / progressBarContainer.clientWidth) * 100
        totalPercentage = percentageWidth + percentageIncrement
        message = document.getElementById("loadingBarMessage");

        progressBar.style.width = totalPercentage + '%';
        if ((totalPercentage >= 100 - percentageIncrement && numberOfRequests > 2) || (numberOfRequests <= 2 && Math.round(totalPercentage) == 100)) {
            message.innerText = "We're almost there..."
        } else {
            message.innerText = "Exporting. " + Math.round(totalPercentage) + "% complete. Don't navigate away from this page."
        }
    },
    hide: function () {
        this.toggleButton.set('html', Affinity.icons.ArrowLineSmallDown).store('state', 'closed');
        this.teamBalancesBody.dissolve();
    },

    show: function () {
        this.toggleButton.set('html', Affinity.icons.ArrowLineSmallUp).store('state', 'open');
        this.teamBalancesBody.reveal();
    },

    toggle: function () {
        if (this.toggleButton.retrieve('state') === 'open') {
            this.hide();
        } else {
            this.show();
        }
    },

    getBalances: function (type) {
        if (type.length) {
            this.getBalancesType = type;
        } else {
            this.getBalancesType = "ui";
        }
        if (this.teamBalanceRequest && this.teamBalanceRequest.isRunning()) {
            this.teamBalanceRequest.cancel();
        }

        if (this.balanceTable && this.getBalancesType != "csv") {
            this.balanceTable.destroy();
        }
        if (this.getBalancesType == "ui") {
            this.balanceTable = new Element('div', { 'class': 'team-balance-table' }).inject(this.tableContainer, 'bottom');
            this._methodName = 'ui.managerBalances.js -> getBalances';
            if (!this.validateInput()) {
                return;
            }
        }

        if (this.getBalancesType == "csv") {
            this._api = this.getLeaveBalanceApiUrl(false);
        } else {
            this._api = this.getLeaveBalanceApiUrl(true);
        }
        this.teamBalanceRequest.url = this.teamBalanceRequest.options.url = this._api;
        this.teamBalanceRequest.get();
    },
    validateInput: function () {
        if (this.selection == -1) {
            //Error - nothing was selected.
            uialert({
                message: 'Please select an employee to view.',
                //showButtons: true,
                noClose: false
            });
            return false;
        }
        this.dateTo = this.dateToFilter.getWidget().getRawDate();
        if (this.dateTo && typeOf(this.dateTo) === 'date' && this.dateTo.isValid()) {
            this.dateTo = this.dateTo.format('%d-%b-%Y');
        } else {
            this.dateTo = null;
        }

        if (this.dateTo == null) {
            //Error - no date or date is invalid
            uialert({
                message: 'Date selection is invalid',
                //showButtons: true,
                noClose: false
            });
            return false;
        } else {
            var dateParsed = Date.parse(this.dateTo.replace(/-/g, ' '));
            if (dateParsed.lessThan(new Date())) {
                uialert({
                    message: 'Past dates are invalid.',
                    //showButtons: true,
                    noClose: false
                });
                return false;
            } else if (dateParsed.greaterThan(new Date(new Date().setFullYear(new Date().getFullYear() + 1)))) {
                uialert({
                    message: 'You can only estimate leave up to one year in advance.',
                    //showButtons: true,
                    noClose: false
                });
                return false;
            }
        }

        return true;
    },

    process: function (data) {
        
        var source = 'ProjectedLeave' in data ? data.ProjectedLeave : data;
        if (!this.balanceTable)
            return; //Not in table mode

        this.balanceTable.empty();
        var leaveTypes = {};
        var employees = [];
        console.log(data);
        Array.each(source, function (rowData, index) {
            this.unitType = rowData.CalcUnit;
            switch (this.unitType) {
                case "D":
                    this.unitLabel = "Day";
                    break;
                case "W":
                    this.unitLabel = "Week";
                    break;
                case "H":
                default:
                    this.unitLabel = "Hour";
                    break;
            }

            employees.push({
                employee: rowData.EmployeeName + ' (' + rowData.EmployeeNo + ')',
                employeeFirstName: !this.isEmptyOrSpaces(rowData.EmployeeFirstName) ? rowData.EmployeeFirstName : "this employee",
                accruedProjectedLeave: this.getWording(rowData.AccruedProjectedLeave, this.unitLabel),
                unitlessProjectedAccruals: rowData.AccruedProjectedLeave,
                unitlessProjectedAccrualsInWeeks: rowData.AccruedProjectedLeaveInWeeks,
                postProjectedAccruals: rowData.PostProjectedAccruals,
                postProjectedAccrualsInWeeks: rowData.PostProjectedAccrualsInWeeks,
                approvedNotPaidLeave: this.getWording(rowData.ApprovedLeaveDisplay + rowData.PostProjectedApprovedLeaveDisplay, this.unitLabel),
                pendingApprovalLeave: this.getWording(rowData.PendingLeaveDisplay + rowData.PostProjectedPendingLeaveDisplay, this.unitLabel),
                leaveBalance: this.getWording(rowData.LeaveBalance, this.unitLabel),
                leaveBalanceInWeeks: this.getWording(rowData.LeaveBalanceInWeeks, "Week"),
                unitlessLeaveBalance: rowData.LeaveBalance,
                unitlessLeaveBalanceInWeeks: rowData.LeaveBalanceInWeeks,
                totalProjectedHours: this.getWording(rowData.TotalProjectedHours, "Hour"),
                totalProjectedDays: this.getWording(rowData.TotalProjectedDays, "Day"),
                unitlessTotalProjectedHours: rowData.TotalProjectedHours,
                unitlessTotalProjectedDays: rowData.TotalProjectedDays,
                unitlessTotalProjectedWeeks: rowData.TotalProjectedWeeks,
                calcUnit: rowData.CalcUnit,
                story: rowData.Story,
                totalsStory: rowData.TotalStory,
                balanceDate: rowData.BalanceDate,
                leaveItems: rowData.LeaveItems,
                isLeaveInWeeksConfigured: rowData.IsLeaveInWeeksConfigured,
            });
        }.bind(this));

        var row;
        var types = Object.keys(leaveTypes);
        types.sort();
        var headerRow;
        var tableBody;
        this.tlbContent = new Element('table', { 'class': 'leave' }).adopt(
            new Element('thead').adopt(
                headerRow = new Element('tr').adopt(
                    new Element('th', { 'class': 'active tooltip-view', 'html': 'Employee' }),
                    new Element('th', { 'class': 'active full-view', 'html': 'Employee' }),
                    new Element('th', { 'class': 'full-view active', 'html': '' }).adopt(this.annualLeaveHeader, this.annualLeaveTooltip),
                    new Element('th', { 'class': 'full-view active', 'html': 'Approved Leave' }).adopt(this.approvedLeaveTooltip),
                    new Element('th', { 'class': 'full-view active', 'html': 'Unapproved Leave' }).adopt(this.unapprovedLeaveTooltip),
                    new Element('th', { 'class': 'full-view active', 'html': 'Accrued Leave' }).adopt(this.accruedLeaveTooltip),
                    new Element('th', { 'class': 'full-view active', 'html': 'Available Leave (hours)' }).adopt(this.availableHoursLeaveTooltip),
                    new Element('th', { 'class': 'full-view active', 'html': 'Available Leave (days)' }).adopt(this.availableDaysLeaveTooltip),
                    new Element('th', { 'class': 'tooltip-view active', 'html': 'Available Leave' }).adopt(this.availableLeaveTooltip),
                    new Element('th', { 'class': 'tooltip-view active', 'html': '' })
                )
            ),
            tableBody = new Element('tbody', { 'class': 'teamLeaveBalancesTable' })
        );
        this.tlbContentWrap = new Element('div', { 'class': 'section-table summaryView' }).adopt(
             this.tlbContent
         ).inject(this.balanceTable);

        Array.each(employees, function (employee, index) {
            row = new Element('tr').inject(tableBody);
            //TEMP. Will remove once the tooltip can follow the cursor.
            new Element('td', {
                'class': 'active tooltip-view col-id-employee indicate first', 'html': employee.employee
             }).inject(row);
            new Element('td', { 'class': 'active full-view col-id-employee indicate first', 'html': employee.employee }).inject(row);
            new Element('td', { 'class': 'active full-view col-id-employee indicate first', 'html': employee.leaveBalance }).inject(row);
            new Element('td', { 'class': 'active full-view col-id-employee indicate first', 'html': employee.approvedNotPaidLeave }).inject(row);
            new Element('td', { 'class': 'active full-view col-id-employee indicate first', 'html': employee.pendingApprovalLeave }).inject(row);
            new Element('td', { 'class': 'active full-view col-id-employee indicate first', 'html': employee.accruedProjectedLeave }).inject(row);
            new Element('td', { 'class': 'active full-view col-id-employee indicate first', 'html': employee.totalProjectedHours }).inject(row);
            new Element('td', { 'class': 'active full-view col-id-employee indicate first', 'html': employee.totalProjectedDays }).inject(row);
            
            var totalUnits = employee.totalProjectedHours;
            if(employee.calcUnit == "D"){
                totalUnits = employee.totalProjectedDays;
            }
            new Element('td', { 'class': 'tooltip-view active col-id-employee indicate', 'html': totalUnits }).inject(row);
            new Element('td', {
                'class': 'tooltip-view active col-id-employee indicate ui-has-tooltip', 'html': '<span class="button more w-icon"><span class="icon-info"></span><span>More Info</span></span>'
            }).addEvent(Affinity.events.click, function (e) {
             
                var storyHtml = this.generateEalTableHtml(employee);
                if (employee.isLeaveInWeeksConfigured) {
                    storyHtml = this.generateEalTableHtmlWithWeeks(employee);
                }

                var hiddenInfo = "<div class='eal-ppeTotalStory'><div class='eal-ppeTotalStoryTitle'><b>Totals at last pay period</b></div> <div>" + employee.totalsStory + "</div></div>";
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


            }.bind(this)).inject(row);

        }.bind(this));
        Affinity.tooltips.processNew();
        var footerButtons = document.getElementsByClassName('footer-button');
        for (var i = 0; i < footerButtons.length; i++) {
            footerButtons[i].style.display = "inline-block";
        }
        document.getElementById('toggle-button-wording').innerText = "Detailed View";
    },

    reset: function (isParent) {
        this.parent();

        if (!isParent) {
            if (this.teamBalanceRequest && this.teamBalanceRequest.isRunning()) {
                this.teamBalanceRequest.cancel();
            }
            if (this.balanceTable) {
                this.balanceTable.destroy();
            }
        }
    },
    isEmptyOrSpaces: function(str){
        return str === null || str.match(/^ *$/) !== null;
    },
    toggleTableView: function () {
        var tooltipRows = document.getElementsByClassName('tooltip-view'),
            fullViewRows = document.getElementsByClassName('full-view'),
            tooltipEl;

        if (tooltipRows.length) {
            tooltipEl = tooltipRows[0];
        }
        var tableDisplay = "table-cell";
        var tooltipDisplay = "table-cell";
        var buttonWording = "Summary View";
        var tooltipElStyle = window.getComputedStyle(tooltipEl);
        if (tooltipElStyle.display === 'none') {
            //Tooltip view hidden;
            tableDisplay = "none";
            buttonWording = "Detailed View";
            this.tlbContentWrap.addClass("summaryView");
            ga('send', 'event', {
                'eventCategory': 'EAL Manager Details',
                'eventAction': 'Show Summary View',
                'eventLabel': 'e: ' + Affinity.login.profile.employeeNumber + ' | c:' + Affinity.login.profile.companyNumber
            });
        } else {
            tooltipDisplay = "none";
            this.tlbContentWrap.removeClass("summaryView");
            ga('send', 'event', {
                'eventCategory': 'EAL Manager Details',
                'eventAction': 'Show Detailed View',
                'eventLabel': 'e: ' + Affinity.login.profile.employeeNumber + ' | c:' + Affinity.login.profile.companyNumber
            });
        }

        for (var i = 0; i < fullViewRows.length; i++) {
            fullViewRows[i].style.display = tableDisplay;
        }

        for (var i = 0; i < tooltipRows.length; i++) {
            tooltipRows[i].style.display = tooltipDisplay;
        }
        document.getElementById('toggle-button-wording').innerText = buttonWording;
        
    },
    getLeaveBalanceApiUrl: function (isUi) {
        var api = this.balanceUrl;
        api = this.addToApiUrl(api, 'dateTo=' + this.dateTo);
        if (this.includeIndirect) {
            api = this.addToApiUrl(api, 'includeIndirect=true');
        } else {
            api = this.addToApiUrl(api, 'includeIndirect=false');
        }
        api = this.addToApiUrl(api, 'employeeNo=' + this.employeeFromSearch);
        var leaveCode = this.leaveTypeFilter[this.leaveTypeFilter.selectedIndex].get('id');
        if (leaveCode.length) {
            api = this.addToApiUrl(api, 'leaveCode=' + leaveCode);
        }

        if (isUi) {
            api = this.addToApiUrl(api, 'pageNo=' + this.currentPage);
        } else {
            api = this.addToApiUrl(api, 'pageNo=' + this.csvOffset)
            api = this.addToApiUrl(api, 'pageSize=' + this.csvBatchSize);
        }

        return api;
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
    leavePaginate: function () {

        if (typeOf(this.currentPage) === 'null' || !('currentPage' in this)) {
            this.currentPage = 1;
        }
        this.clearPagination();
        var pageCount = this.data.PageCount;

        this.pageFirst = new Element('span', { 'class': 'pagination-first', 'html': 'First' }).inject(this.paginateBox);
        this.pageBack = new Element('span', { 'class': 'pagination-back', 'html': 'Previous' }).inject(this.paginateBox);
        this.pages = new Element('div', { 'class': 'pagination-pages' }).inject(this.paginateBox);
        this.pageForward = new Element('span', { 'class': 'pagination-forward', 'html': 'Next' }).inject(this.paginateBox);
        this.pageLast = new Element('span', { 'class': 'pagination-last', 'html': 'Last' }).inject(this.paginateBox);

        var leaveBalanceCount = this.data.ProjectedLeave.length;

        if (leaveBalanceCount > 0) {
            var firstLeaveBalance = ((this.currentPage - 1) * 20) + 1;
            var subText = 'showing ' + firstLeaveBalance + ' to ' + (firstLeaveBalance + leaveBalanceCount - 1) + ' of ' + this.data.Count;
            this.pageSubText = new Element('div', { 'class': 'pagination-sub-text', 'html': subText }).inject(this.paginateBox);
        }

        var count = 0;
        var page;
        for (i = 1; i <= pageCount; i++) {
            if (i > this.currentPage - 1 - (this.leavePagingCount / 2) && count <= this.leavePagingCount) {
                count++;

                if (i == this.currentPage) {
                    page = new Element('input', {
                        'type': 'text',
                        'class': 'paginate-page-numbers data-hj-whitelist',
                        'value': i
                    }).inject(this.pages);
                    (function (page) {
                        page.addEvent('change', function (e) {
                            var value = page.get('value');
                            var index = parseInt(value);
                            if (index == value && index > 0 && index <= pageCount) {
                                this.currentPage = index;
                                this.getBalances("ui");
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
                        page.addEvent(Affinity.events.click, function (e) {
                            this.currentPage = index;
                            this.getBalances("ui");
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
        this.totalRecords = this.data.Count;
        if (pageCount > 0 && this.currentPage != 1) {
            this.pageFirst.removeEvents();
            this.pageFirst.addEvent(Affinity.events.click, function () {
                this.currentPage = 1;
                this.getBalances("ui");
            }.bind(this));
            this.pageBack.removeEvents();
            this.pageBack.addEvent(Affinity.events.click, function () {
                this.currentPage = this.currentPage - 1;
                this.getBalances("ui");
            }.bind(this));

        } else {
            this.pageFirst.addClass('not-active');
            this.pageBack.addClass('not-active');
        }

        if (pageCount > 0 && this.currentPage != this.data.PageCount) {
            this.pageLast.removeEvents();
            this.pageLast.addEvent(Affinity.events.click, function () {
                this.currentPage = this.data.PageCount;
                this.getBalances("ui");
            }.bind(this));
            this.pageForward.removeEvents();
            this.pageForward.addEvent(Affinity.events.click, function () {
                this.currentPage = this.currentPage + 1;
                this.getBalances("ui");
            }.bind(this));

        } else {
            this.pageLast.addClass('not-active');
            this.pageForward.addClass('not-active');
        }

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
    populateLeaveFilters: function (config) {
        this.leaveTypeFilter.empty();
        new Element('option', { 'value': '0', 'html': 'Annual Leave', 'id': '09' }).inject(this.leaveTypeFilter);
        Array.each(config, function (code, index) {
            if (code.Code != '09') {
                var description = code.Description.split("Leave ");
                var descriptionCharCheck = null;
                if (description.length > 1) {
                    descriptionCharCheck = description[1];
                }
                if (this.inArray(code.Code, this.availableLeaveCodes) && !this.inArray(descriptionCharCheck, this.nonconfiguredLeaveTypes)) {
                    new Element('option', {
                        'html': code.Description,
                        'id': code.Code,
                        'value': config.index
                    }).inject(this.leaveTypeFilter);
                }
            }
        }.bind(this));
    },
    inArray: function (val, arr) {
        return arr.indexOf(val) > -1;
    },
    destroy: function () {
        this.reset();

        if (this.employeeSelector) { this.employeeSelector.removeEvents(); }
        if (this.employeeSelectorAutocomplete) { this.employeeSelectorAutocomplete.destroy(); }

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
;
var EmployeeBalancesWidget = new Class({

    Implements: [Options, Events],

    Binds: [
        'init',
        'getData',
        'buildPosition', 'updatePosition',
        'updateInterface',
        'refresh',
        'reset', 'destroy'
    ],

    options: {
        target: null,
        employeeId: null,
        managerId: null,
        filter: false,
    },

    initialize: function (options) {
        this.setOptions(options);
        this.target = this.options.target;
        this.employeeId = this.options.employeeId;
        this.managerId = this.options.managerId;
        this.filter = this.options.filter;

        /**/

        this.box = new Element('div', { 'class': 'balance-box' });
        this.table = new HtmlTable({
            properties: {
                'border': 0,
                'cellspacing': 0,
                'class': 'ui-none'
            },
            headers: ['', 'Total', Affinity.icons.ThumbsUp, Affinity.icons.Hourglass]
        }).inject(this.box);
        this.balanceDate = new Element('div', { 'class': 'balance-date' }).inject(this.box);
        this.tbody = this.table.body;
        this.thead = this.table.head;

        if (typeOf(this.target) !== 'null' && !this.target.getElement('.balance-box')) {
            this.box.inject(this.target);
        }

        /**/

        this.balanceRequest = new Request.JSON({
            onFailure: function (e) {
                Affinity.leave.handleXHRErrors(e, this._api, this._methodName, true); // true param suppresses alerts
            },
            onSuccess: function (response) {
                if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName, true)) { // true param suppresses alerts
                      this.updateInterface(response.Data);
                }
            }.bind(this)
        });

        /**/

        if (typeOf(this.employeeId) !== 'null') {
            this.refresh();
        }

    },

    loading: false,
    refresh: function () {
        if (typeOf(this.employeeId) !== 'null') {
            if (this.loading) { return; }
            this.getData();
        }
    },

    getDataDelay: false,
    getData: function () {
        if (typeOf(this.employeeId) !== 'null') {
            this.box.addClass('hidden');
            clearTimeout(this.getDataDelay);
            if (this.loading) {
                this.getDataDelay = this.getData.delay(1000, this);
                return;
            }
            this.loading = true;

            /**/

            this._api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'EmployeeLeaveBalance/' + this.employeeId);
            this._methodName = 'ui.employee.balances.widget.js -> getData';

            if (this.balanceRequest && this.balanceRequest.isRunning()) {
                this.balanceRequest.cancel();
            }
            this.balanceRequest.url = this.balanceRequest.options.url = this._api;
            this.balanceRequest.get();

            /**/

        }
    },

    buildPosition: function (balanceData) {
        //var box = new Element('div', { 'class': 'position-box position-' + balanceData.LeaveCode }).inject(this.box);
        this.table.push(['','','',''], { 'class': 'position-' + balanceData.LeaveCode});
        this.updatePosition(balanceData);
    },

    updatePosition: function (balanceData) {
        var row;
        if (this.tbody.getElement('tr.position-' + balanceData.LeaveCode)) {
            row = this.tbody.getElement('tr.position-' + balanceData.LeaveCode);
            var total = balanceData.TotalHours;
            if (balanceData.UnitType === 'D') {
                total = balanceData.TotalDays;
            }
            this.table.update(row, [
                balanceData.CodeDescription,
                parseFloat(total).format({ decimals: 2 }),
                parseFloat(balanceData.ApprovedNotPaid).format({ decimals: 2 }),
                parseFloat(balanceData.Unapproved).format({ decimals: 2 })
            ]);
            var subText = 'as at ' + Date.parse(balanceData.PeriodEndDate).format('%d %b %Y');
            if (balanceData.IncludeFutureLeave) {
                subText += ' (inc. future leave)';
            }
            else {
                subText += ' (exc. future leave)';
            }
            this.balanceDate.set('html', subText);
            this.box.removeClass('hidden');
            //box.set('html', '<pre>' + JSON.stringify(balanceData, false, 2) + '</pre>');
        } else {
            this.buildPosition(balanceData);
        }
    },

    updateInterface: function (data) {
        if (data === null) return;
        Array.each(data.ComponentBalances, function (componentData) {
            Array.each(componentData.CodeBalances, function (balanceData) {
                if (typeOf(this.filter) !== 'boolean') {
                    if (typeOf(this.filter) === 'array') {
                        Array.each(this.filter, function (filteron) {
                            if (typeOf(filteron) === 'string') {
                                if (filteron.toLowerCase().indexOf((balanceData.CodeDescription.toLowerCase())) > -1) {
                                    this.updatePosition(balanceData);
                                }
                            }
                        });
                    }
                    if (typeOf(this.filter) === 'string') {
                        if (this.filter.toLowerCase().indexOf((balanceData.CodeDescription.toLowerCase())) > -1){
                            this.updatePosition(balanceData);
                        }
                    }
                } else {
                    this.updatePosition(balanceData);
                }
            }.bind(this));
        }.bind(this));
        if (typeOf(this.target) !== 'null' && !this.target.getElement('.balance-box')) {
            this.box.inject(this.target);
        }
        this.loading = false;
    }

});;
