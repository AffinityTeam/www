/* Minification failed. Returning unminified contents.
(1258,77-78): run-time error JS1014: Invalid character: `
(1258,92-93): run-time error JS1100: Expected ',': :
(1258,108-109): run-time error JS1195: Expected expression: %
(1258,130-131): run-time error JS1004: Expected ';': :
(1258,160-161): run-time error JS1002: Syntax error: }
(1258,163-164): run-time error JS1014: Invalid character: `
(1294,28-29): run-time error JS1197: Too many errors. The file might not be a JavaScript file: ;
 */
var EmployeeLeave = new Class({

    Implements: [Options, Events],

    Binds: [
        'init',
        'employeeBalance',
        //'balanceData',
        'employeeApply',
        'employeeHistory',
        'initLeaveDetail',
        //'leaveHistoryData',
        'generateMyLeaveCalendar',
        'generateTeamLeaveCalendar',
        'refreshApplyForLeave',
        //'leaveEditDetailData', 'leaveEditConfigData', 'populateEditData',
        //'leaveSetStartDate', 'leaveSetEndDate',
        //'addingEvents',
        //'errorChecking',
        'update', 'deleteLeave',
        //'deleteAttachment', 'postAttachments',
        'newLeaveReason',
        'editableDateRange',
        'populateDates',
        'populatePositionUnits',
        //'unitChanges',
        //'createUnits',
        //'deleteUnits',
        //'createPositionUnits',
        //'deletePositionUnits',
        //'CreateNewUnit',
        //'updateUnit',
        //'updateTotals',
        //'updateAuthoriser',
        'refreshBalance',
        'refreshHistory',
        'refreshAll',
        'reset', 'destroy',
        'checkApplicationEditable',
        'getConfig',
        'getConfigWithHandle',
        'applyConfig'
    ],

    options: {
        target: null
    },

    initialize: function (options) {
        this.setOptions(options);
        this.target = this.options.target;
    },

    configData: null,

    leaveBlanaces: false,
    leaveHistory: false,
    applyForLeave: false,
    leaveDetail: false,

    init: function () {


        /* REQUESTS */
        this.leaveConfigRequest = new Request.JSON({
            onRequest: function () {
                Affinity.leave.lockui('employee-leaveConfigRequest');
                uialert({
                    message: 'Loading Employee Configuration',
                    showLoader: true,
                    showButtons: false,
                    noClose: true
                });
            },
            onFailure: function (e) {
                Affinity.leave.unlockui('employee-leaveConfigRequest');
                prompts.hide();
                Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
            }.bind(this),
            onException: function () {
                Affinity.leave.unlockui('employee-leaveConfigRequest');
                prompts.hide();
            },
            onCancel: function () {
                Affinity.leave.unlockui('employee-leaveConfigRequest');
                prompts.hide();
            },
            onSuccess: function (response) {
                Affinity.leave.unlockui('employee-leaveConfigRequest');
                prompts.hide();
                if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName)) {
                    this.config = response.Data;

                    if (this.configQueue && this.configQueue.length > 0) {
                        Array.each(this.configQueue, function (execution, index) {
                            if (execution && typeOf(execution) === 'function')
                                execution(this.config);
                        }.bind(this));

                        this.configQueue = [];
                    }

                    if (this._onSuccess) {
                        this._onSuccess(response.Data);
                        this._onSuccess = null;
                    }

                    this.employeeBalance();
                    if (!response.Data.CompanyHasAccessToLeaveInDaysUI) {
                        this.setLeaveApplyV1();
                        this.employeeHistory();
                        this.setLeaveDetailV1();
                    } else {
                        this.employeeApply();
                        this.employeeHistory();
                        this.initLeaveDetail();
                    }


                    this.generateMyLeaveCalendar();
                    this.generateTeamLeaveCalendar();
                    Affinity.tooltips.processNew();
                    this.target.removeClass('hidden');


                }
            }.bind(this)
        });


        /**/
        this.configQueue = [];
        this.getConfig();
        //this.employeeBalance();
        ////this.employeeApply();
        //this.employeeHistory();
        //this.initLeaveDetail();
        //this.generateMyLeaveCalendar();
        //this.generateTeamLeaveCalendar();
        //Affinity.tooltips.processNew();
        //this.target.removeClass('hidden');
    },

    employeeBalance: function () {
        this.leaveBlanaces = new UIEmployeeLeaveBalances({
            target: this.target
        });
    },

    initLeaveDetail: function () {
        this.leaveDetail = new UILeaveDetail({
            target: this.target,
            isManager: false
        });
    },
    //initMultiPositionLeaveDetail
    setLeaveDetailV1: function () {
        this.leaveDetail = new UILeaveDetailV1({
            target: this.target,
            isManager: false
        });
    },

    //balanceData: function () {
    //    if (this.leaveBlanaces) {
    //        this.leaveBlanaces.reset();
    //        this.leaveBlanaces.getBalances();
    //    }
    //},

    refreshBalance: function () {
        if (this.leaveBlanaces) {
            this.leaveBlanaces.reset();
            this.leaveBlanaces.getBalances();
        }
    },
    //employeeMultiPositionApply
    setLeaveApplyV1: function () {
        this.applyForLeave = new UILeaveApplyV1({
            target: this.target,
            isManager: false
        });
    },

    employeeApply: function () {
        this.applyForLeave = new UILeaveApply({
            target: this.target,
            isManager: false
        });
    },

    employeeHistory: function () {
        this.leaveHistory = new UILeaveHistory({
            target: this.target,
            isManager: false
        });
    },

    //leaveHistoryData: function() {
    //    if (this.leaveHistory) {
    //        this.leaveHistory.reset();
    //        this.leaveHistory.leaveHistoryData();
    //    }
    //},

    refreshHistory: function () {
        if (this.leaveHistory) {
            this.leaveHistory.reset(true); //keep filters
            this.leaveHistory.refreshHistory(true); //no alerts
        }
    },

    refreshAll: function () {
        this.refreshBalance();
        this.refreshHistory();
        //this.refreshApplyForLeave();
    },

    refreshApplyForLeave: function () {
        this.applyForLeave.validateTotalUnitsAppliedFor();
    },

    /* LEAVE CALENDAR */

    generateMyLeaveCalendar: function () {
        var datefrom = new Date();
        datefrom.setDate(1);
        var from = datefrom.setMonth(datefrom.getMonth() - 13);

        var date = new Date();
        date.setMonth(date.getMonth() + 11);
        var to = new Date(date.getFullYear(), date.getMonth(), 0);

        this.mycalendar = new UILeaveCalendar({
            target: this.target,
            fromDate: from,
            toDate: to
        });

    },

    generateTeamLeaveCalendar: function () {
        var datefrom = new Date();
        datefrom.setDate(1);
        var from = datefrom.setMonth(datefrom.getMonth() - 13);

        var date = new Date();
        date.setMonth(date.getMonth() + 11);
        var to = new Date(date.getFullYear(), date.getMonth(), 0);

        this.teamcalendar = new UITeamLeaveCalendar({
            target: this.target,
            fromDate: from,
            toDate: to
        });
    },

    deleteLeave: function (empNo, leaveId) {

        var methodName = 'ui.myLeave.js -> deleteLeave';

        var api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'DeleteLeave/' + empNo + '/' + leaveId);

        new Request.JSON({
            url: api,
            onRequest: function () {
                Affinity.leave.lockui('myleave-deleteLeave');
            },
            onFailure: function (e) {
                Affinity.leave.unlockui('myleave-deleteLeave');
                Affinity.leave.handleXHRErrors(e, api, methodName);
            },
            onException: function () {
                Affinity.leave.unlockui('myleave-deleteLeave');
            },
            onCancel: function () {
                Affinity.leave.unlockui('myleave-deleteLeave');
            },
            onSuccess: function (response) {
                Affinity.leave.unlockui('myleave-deleteLeave');
                if (!Affinity.leave.isErrorInJson(response, api, methodName)) {
                    window.fireEvent('DeleteLeaveSuccess');
                }
            }
        }).get();

    },

    //postAttachments: function (e) {
    //    Affinity.leave.lockui('myleave-edit-postAttachments');
    //    uialert({
    //        message: 'Attaching file',
    //        showLoader: true,
    //        noClose: true,
    //        showButtons: false
    //    });
    //    var leaveId = this.editData.LeaveHeader.TSGroupId;
    //    var empNo = this.editData.LeaveHeader.EmployeeNo;
    //    Affinity.leave.postAttachements(empNo, leaveId, function (response) {
    //        //this.getAttachments();
    //        if ( response )
    //            Affinity.leave.populateAttachments(this.editData.LeaveHeader, response.Data, this.attachWidget, this.attachWidgetDiv);
    //        Affinity.leave.unlockui('myleave-edit-postAttachments');
    //    }.bind(this));
    //},

    //deleteAttachment: function (e) {
    //    Affinity.leave.lockui('myLeave-edit-deleteAttachment');
    //    uialert({
    //        message: 'Deleting file',
    //        showLoader: true,
    //        noClose: true,
    //        showButtons: false
    //    });
    //    var leaveId = this.editData.LeaveHeader.TSGroupId;
    //    var empNo = this.editData.LeaveHeader.EmployeeNo;
    //    Affinity.leave.deleteAttachment(empNo, leaveId, e.deletedId, function (response) {
    //        //this.getAttachments();
    //        if ( response )
    //            Affinity.leave.populateAttachments(this.editData.LeaveHeader, response.Data, this.attachWidget, this.attachWidgetDiv);
    //        Affinity.leave.unlockui('myLeave-edit-deleteAttachment');
    //    }.bind(this));
    //},

    /**/

    newLeaveReason: function (configData, typeIndex) {

        if (document.getElement('.details-reason-box')) {

            var reason = document.getElement('.details-reason-box');

            var selector = document.getElement('.edit-reason-selector');

            selector.empty();

            new Element('option', {
                'value': '',
                'id': 'null', //SG: ideally need to pass actual null not string. this will do for now. 
                'html': ''
            }).inject(selector, 'top')

            var leaveCodes = configData.Data.LeaveCodes;

            if (typeof (leaveCodes[typeIndex]) != 'undefined' && leaveCodes[typeIndex].Reasons) {

                var reasons = leaveCodes[typeIndex].Reasons

                Array.each(reasons, function (leaveReason, index) {

                    var option = new Element('option', {
                        'value': index
                    }).inject(selector);

                    option.set('html', leaveReason.Description);
                    option.set('id', leaveReason.ReasonCode);

                });

                selector.selectedIndex = 0;

            }

        }

        if (document.getElement('.details-label .required')) {

            document.getElement('.details-label .required').remove();

        }

        if (document.getElement('.edit-leave-attachment .required')) {

            document.getElement('.edit-leave-attachment .required').remove();

        }

        if (typeof (leaveCodes[typeIndex]) != 'undefined') {

            if (leaveCodes[typeIndex].MandatoryReason === true) {

                var label = document.getElement('.details-label label');

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

    /**/

    editableDateRange: function (components, positions, isSingleApprover) {

        var firstDate = this.modalEls.fromDateWidget.getRawDate();
        var lastDate = this.modalEls.toDateWidget.getRawDate();

        var dataDateRange = [];
        var currentDate = firstDate.clone();

        while (currentDate.lessThanOrEqualTo(lastDate)) {
            dataDateRange.push(currentDate.clone());
            currentDate.increment('day', 1);
        }

        var globalDateRange = document.getElement('.globalDateRange');

        globalDateRange.store('dateRange', dataDateRange);

        this.populateDates(components, positions, dataDateRange, isSingleApprover);

    },

    populateDates: function (components, positions, dataDateRange, isSingleApprover) {

        var daterange = (dataDateRange.concat(document.getElement('.globalDateRange').retrieve('dateRange'))).sort();

        var scrollerWidth = 0;
        var scrollerBox = document.getElement('.unit-scroller-box');
        var scroller = document.getElement('.details-units-scroller');
        var units = document.getElement('.details-positions');

        var unitsGrid = new Element('div', {
            'class': 'unit-grid'
        }).inject(scroller);

        var gridHeader = new Element('div', {
            'class': 'unit-gridheader'
        }).inject(unitsGrid);

        var gridBody = new Element('div', {
            'class': 'unit-gridbody'
        }).inject(unitsGrid);

        var tempdate, dateCell;
        Array.each(dataDateRange, function (day, index) {

            tempDate = Affinity.leave.cleanBadDate(day);

            dateCell = new Element('div', { 'class': 'day-class d-' + tempDate.format('%d-%b-%y'), 'id': tempDate.format('%d/%b/%y')/*, 'html': Affinity.leave.cleanBadDate(day).format('%d/%m/%y')*/ }).inject(gridHeader);

            dateCell.adopt(
                new Element('div', { 'class': 'day-class-day', 'html': tempDate.format('%a') }),
                new Element('div', { 'class': 'day-class-date', 'html': tempDate.format('%e') }),
                new Element('div', { 'class': 'day-class-my', 'html': tempDate.format('%b \'%y') }),
                new Element('div', { 'class': 'hol-icon icon-plane ui-has-tooltip' })
            );

            scrollerWidth += 79;

        });

        scroller.setStyle('width', scrollerWidth);
        scroller.store('scrollerWidth', scrollerWidth);

        var containerSize = scrollerBox.measure(function () { return this.getSize().x; });
        var scrollerSize = scroller.measure(function () { return this.getScrollSize().x; });

        if (scrollerSize > containerSize) {
            scrollerBox.setStyle('overflow-x', 'scroll');
        } else {
            scrollerBox.setStyle('overflow-x', 'hidden');
        }

        this.populatePositionUnits(components, positions, dataDateRange, isSingleApprover);

    },

    populatePositionUnits: function (components, positions, dataDateRange, isSingleApprover) {

        isSingleApprover = typeOf(isSingleApprover) === 'null' ? false : isSingleApprover;

        var unitsAppliedFor;
        var gridBody = document.getElement('.unit-gridbody');
        var positionsLabels = document.getElement('.position-labels');

        var createdRows = [];

        var positionCode, posRow, posName, hours, posDate, date;

        Array.each(positions, function (position, index) {

            positionCode = isSingleApprover ? isSingleApprover + '' : position.PositionCode;

            if (position.PositionCode === positionCode) {

                posRow = new Element('div', {
                    'class': 'positions-units',
                    'id': positionCode
                }).inject(gridBody);

                posName = new Element('label', {
                    'html': position.PositionTitle,
                    'class': 'ui-has-tooltip',
                    'data-tooltip': position.PositionTitle,
                    'data-tooltip-dir': 'bottom'
                }).inject(positionsLabels);

                Array.each(dataDateRange, function (day, index) {

                    hours = new Element('input', {
                        'class': 'edit-position-units data-hj-whitelist',
                        'id': Affinity.leave.cleanBadDate(day).format('%d/%b/%y'),
                        'value': '0.00'
                    }).inject(posRow);

                    Array.each(components, function (component, Index) {

                        if (component.PositionCode === positionCode) {

                            Array.each(component.Units, function (unit, unitIndex) {

                                posDate = Affinity.leave.cleanBadDate(unit.Date).format('%d/%b/%y');
                                date = hours.get('id');

                                if (date === posDate) {

                                    unitsAppliedFor = 0;
                                    if (typeOf(unit.UnitsAppliedFor) === 'number') {
                                        unitsAppliedFor = unit.UnitsAppliedFor;
                                        hours.store('old', unitsAppliedFor); //old value needs to be null for null unitsappliedfor.
                                    }
                                    hours.set('value', unitsAppliedFor.toFixed(2));


                                    if (typeOf(unit.IsPublicHoliday) === 'boolean' && unit.IsPublicHoliday === true) {

                                        hours.addClass('public-holiday').addClass('ui-has-tooltip').set('data-tooltip', unit.PublicHolidayName).set('data-tooltip-dir', 'bottom,center');
                                        hours.getParent('.unit-grid').getElement('.day-class.d-' + posDate.replace(/\//gi, '-')).addClass('public-holiday').getElement('.hol-icon').set('data-tooltip', unit.PublicHolidayName).set('data-tooltip-dir', 'bottom,center');

                                    }

                                }

                            });

                        }

                    });

                    Affinity.tooltips.processNew();

                });

            }

        });

    },

    /**/

    //unitChanges: function(positions, updated, dateOld, dateNew) {

    //    dateOld = Affinity.leave.cleanBadDate(dateOld);
    //    dateNew = Affinity.leave.cleanBadDate(dateNew);

    //    var daterange, currentDate;

    //    if (dateOld.lessThan(dateNew)) {
    //        if (updated === 'startdate') {
    //            daterange = [];
    //            currentDate= dateOld.clone();
    //            while (currentDate.lessThan(dateNew)) {
    //                daterange.push(currentDate.clone());
    //                currentDate.increment('day', 1);
    //            }
    //            this.deleteUnits(daterange, 'DateFrom', dateOld, dateNew);
    //            window.addEvent('DeleteLeaveUnitSuccess', function () {
    //                if (document.getElement('.old-startDate')) {
    //                    document.getElement('.old-startDate').store('old', dateNew);
    //                }
    //            });
    //        } else {
    //            daterange = [];
    //            currentDate = dateOld.clone();
    //            currentDate.increment('day', 1);

    //            while (currentDate.lessThanOrEqualTo(dateNew)) {
    //                daterange.push(currentDate.clone());
    //                currentDate.increment('day', 1);
    //            }
    //            this.createUnits(positions, daterange, 'DateTo', dateOld, dateNew);
    //            window.addEvent('CreateMissingLeaveUnitsSuccess', function () {
    //                if (document.getElement('.old-endDate')) {
    //                    document.getElement('.old-endDate').store('old', dateNew);
    //                }
    //            });
    //        }
    //    } else if (dateOld > dateNew) {
    //        if (updated === 'startdate') {
    //            daterange = [];
    //            currentDate = dateNew.clone();

    //            while (currentDate.lessThan(dateOld)) {
    //                daterange.push(currentDate.clone());
    //                currentDate.increment('day', 1);
    //            }
    //            this.createUnits(positions, daterange, 'DateFrom', dateOld, dateNew);
    //            window.addEvent('CreateMissingLeaveUnitsSuccess', function () {
    //                if (document.getElement('.old-startDate')) {
    //                    document.getElement('.old-startDate').store('old', dateNew);
    //                }
    //            });
    //        } else {
    //            daterange = [];
    //            currentDate = dateNew.clone();
    //            currentDate.increment('day', 1);

    //            while (currentDate.lessThanOrEqualTo(dateOld)) {
    //                daterange.push(currentDate.clone());
    //                currentDate.increment('day', 1);
    //            }
    //            this.deleteUnits(daterange, 'DateTo', dateOld, dateNew);
    //            window.addEvent('DeleteLeaveUnitSuccess', function () {
    //                if (document.getElement('.old-endDate')) {
    //                    document.getElement('.old-endDate').store('old', dateNew);
    //                }
    //            });
    //        }

    //    }

    //},

    //createUnits: function(positions, daterange, field, oldDate, newDate) {

    //    var employeeNum = Affinity.login.profile.employeeNumber;

    //    var startDate, endDate;

    //    if (field === 'DateFrom') {
    //        startDate = Affinity.leave.cleanBadDate(daterange[0]).format('%d-%b-%y');
    //        endDate = Affinity.leave.cleanBadDate(daterange[daterange.length - 1]).format('%d-%b-%y');
    //    } else {
    //        startDate = Affinity.leave.cleanBadDate(daterange[0]).format('%d-%b-%y');
    //        endDate = Affinity.leave.cleanBadDate(daterange[daterange.length - 1]).format('%d-%b-%y');
    //    }

    //    var leaveId = document.getElement('.leave-id').retrieve('old');

    //    var methodName = 'ui.myLeave.js -> createUnits';

    //    var api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'CreateMissingLeaveUnits/' + employeeNum + '/' + leaveId + '/' + startDate + '/' + endDate);

    //    new Request.JSON({
    //        url: api,
    //        onRequest: function(){
    //            Affinity.leave.lockui('myleave-createUnits');
    //        },
    //        onFailure: function (e) {
    //            Affinity.leave.unlockui('myleave-createUnits');
    //            Affinity.leave.handleXHRErrors(e, api, methodName);
    //        },
    //        onException: function () {
    //            Affinity.leave.unlockui('myleave-createUnits');
    //        },
    //        onCancel: function () {
    //            Affinity.leave.unlockui('myleave-createUnits');
    //        },
    //        onSuccess: function (response) {
    //            Affinity.leave.unlockui('myleave-createUnits');
    //            if (!Affinity.leave.isErrorInJson(response, api, methodName)) {
    //                if ('Data' in response && typeOf(response.Data) === 'object') {
    //                    this.createPositionUnits(positions, response, daterange, field, newDate);
    //                    window.fireEvent('CreateMissingLeaveUnitsSuccess');
    //                    Affinity.leave.update(field, newDate.format('%d-%b-%y'), oldDate.format('%d-%b-%y'));
    //                } else {
    //                    uialert({
    //                        'message': 'Oops! Something went wrong.<br />Data is missing or null.',
    //                        showButtons: true,
    //                        noClose: false
    //                    });
    //                    throw ('Error: Data is NULL');
    //                    return;
    //                }
    //            }
    //        }.bind(this)
    //    }).get();

    //},

    //deleteUnits: function(daterange, field, oldDate, newDate) {

    //    var employeeNum = Affinity.login.profile.employeeNumber;
    //    var leaveId = document.getElement('.leave-id').retrieve('old');

    //    var methodName = 'ui.myLeave.js -> deleteUnits';

    //    var api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'DeleteLeaveUnits/' + employeeNum + '/' + leaveId + '/' + Affinity.leave.cleanBadDate(daterange[0]).format('%d-%b-%y') + '/' + Affinity.leave.cleanBadDate(daterange[daterange.length - 1]).format('%d-%b-%y'));

    //    new Request.JSON({
    //        url: api,
    //        onRequest: function () {
    //            Affinity.leave.lockui('myleave-deleteUnits');
    //        },
    //        onFailure: function (e) {
    //            Affinity.leave.unlockui('myleave-deleteUnits');
    //            Affinity.leave.handleXHRErrors(e, api, methodName);
    //        },
    //        onException: function () {
    //            Affinity.leave.unlockui('myleave-deleteUnits');
    //        },
    //        onCancel: function () {
    //            Affinity.leave.unlockui('myleave-deleteUnits');
    //        },
    //        onSuccess: function (response) {
    //            Affinity.leave.unlockui('myleave-deleteUnits');
    //            if (!Affinity.leave.isErrorInJson(response, api, methodName)) {
    //                this.deletePositionUnits(daterange, field);
    //                window.fireEvent('DeleteLeaveUnitSuccess');
    //                Affinity.leave.update(field, newDate.format('%d-%b-%y'), oldDate.format('%d-%b-%y'));
    //            }
    //        }.bind(this)
    //    }).get();

    //},

    /**/

    //createPositionUnits: function (positions, response, daterange, field, newDate) {

    //    var scrollerWidth = document.getElement('.details-units-scroller').retrieve('scrollerWidth');

    //    var scroller = document.getElement('.details-units-scroller');
    //    var units = document.getElement('.details-positions');

    //    var gridHeader = document.getElement('.unit-gridheader');
    //    var gridBody = document.getElement('.unit-gridbody');

    //    var dateranger, tempDate, dateCell, posRow;

    //    if (field === 'DateFrom') {

    //        dateranger = daterange.reverse();

    //        Array.each(dateranger, function (day, index) {

    //            tempDate = Affinity.leave.cleanBadDate(day);

    //            dateCell = new Element('div', { 'class': 'day-class d-' + tempDate.format('%d-%b-%y'), 'id': tempDate.format('%d/%b/%y')/*, 'html': Date.parse(day).format('%d/%m/%y')*/ }).inject(gridHeader, 'top');

    //            dateCell.adopt(
    //                new Element('div', { 'class': 'day-class-day', 'html': tempDate.format('%a') }),
    //                new Element('div', { 'class': 'day-class-date', 'html': tempDate.format('%e') }),
    //                new Element('div', { 'class': 'day-class-my', 'html': tempDate.format('%b \'%y') }),
    //                new Element('div', { 'class': 'hol-icon icon-plane ui-has-tooltip' })
    //            );

    //            scrollerWidth += 79;

    //        });

    //        scroller.setStyle('width', scrollerWidth);
    //        scroller.store('scrollerWidth', scrollerWidth);

    //        posRow = document.getElements('.positions-units');

    //        Array.each(posRow, function (position, index) {

    //            Array.each(dateranger, function (day, index) {

    //                var dayinput = new Element('input', {
    //                    'class': 'edit-position-units',
    //                    'id': Affinity.leave.cleanBadDate(day).format('%d/%b/%y'),
    //                    'value': '0.00'
    //                }).inject(position, 'top');

    //                dayinput.addEvent(Affinity.events.start, function (e) {
    //                    e.target.store('initial-value', e.target.value);
    //                });
    //                dayinput.addEvent('blur', function (e) {
    //                    e.target.value = Affinity.leave.cleanUnit(e.target.value, e.target.retrieve('initial-value'));
    //                });

    //                dayinput.addEvent('change', function (e) {
    //                    Affinity.leave.apiOverlayFocus = e.target;
    //                    var date = Affinity.leave.cleanBadDate(e.target.get('id'));
    //                    var value = dayinput.value === '' ? 0 : parseFloat(dayinput.value);
    //                    if (typeOf(parseFloat(value)) !== 'null') {
    //                        Affinity.leave.updateUnit(Affinity.login.profile.employeeNumber, value, dayinput.retrieve('old'), position.get('id'), date.format('%d-%b-%y'), positions, null);
    //                    }
    //                }.bind(this));

    //                window.addEvent('DeleteLeaveUnitSuccess', function () {
    //                    dayinput.store('old', dayinput.value);
    //                });
    //                window.addEvent('CreateLeaveUnitSuccess', function () {
    //                    dayinput.store('old', dayinput.value);
    //                });
    //                window.addEvent('UpdateLeaveUnitSuccess', function () {
    //                    dayinput.store('old', dayinput.value);
    //                });

    //            }.bind(this));

    //        }.bind(this));

    //    } else {

    //        dateranger = daterange;

    //        Array.each(dateranger, function (day, index) {

    //            tempDate = Affinity.leave.cleanBadDate(day);

    //            dateCell = new Element('div', { 'class': 'day-class d-' + tempDate.format('%d-%b-%y'), 'id': tempDate.format('%d/%b/%y')/*, 'html': Date.parse(day).format('%d/%m/%y')*/ }).inject(gridHeader, 'bottom');

    //            dateCell.adopt(
    //                new Element('div', { 'class': 'day-class-day', 'html': tempDate.format('%a') }),
    //                new Element('div', { 'class': 'day-class-date', 'html': tempDate.format('%e') }),
    //                new Element('div', { 'class': 'day-class-my', 'html': tempDate.format('%b \'%y') }),
    //                new Element('div', { 'class': 'hol-icon icon-plane ui-has-tooltip' })
    //            );

    //            scrollerWidth += 79;

    //        });

    //        scroller.setStyle('width', scrollerWidth);
    //        scroller.store('scrollerWidth', scrollerWidth);

    //        posRow = document.getElements('.positions-units');

    //        var dayinput;

    //        Array.each(posRow, function (position, index) {

    //            Array.each(dateranger, function (day, index) {

    //                dayinput = new Element('input', {
    //                    'class': 'edit-position-units',
    //                    'id': Affinity.leave.cleanBadDate(day).format('%d/%b/%y'),
    //                    'value': '0.00'
    //                }).inject(position, 'bottom');

    //                dayinput.addEvent(Affinity.events.start, function (e) {
    //                    e.target.store('initial-value', e.target.value);
    //                });
    //                dayinput.addEvent('blur', function (e) {
    //                    e.target.value = Affinity.leave.cleanUnit(e.target.value, e.target.retrieve('initial-value'));
    //                });

    //                dayinput.addEvent('change', function (e) {
    //                    Affinity.leave.apiOverlayFocus = e.target;
    //                    var date = Affinity.leave.cleanBadDate(e.target.get('id'));
    //                    var value = dayinput.value === '' ? 0 : parseFloat(dayinput.value);
    //                    if (typeOf(parseFloat(value)) !== 'null') {
    //                        Affinity.leave.updateUnit(Affinity.login.profile.employeeNumber, value, dayinput.retrieve('old'), position.get('id'), date.format('%d-%b-%y'), positions, null);
    //                    }
    //                }.bind(this));

    //                window.addEvent('DeleteLeaveUnitSuccess', function () {
    //                    dayinput.store('old', dayinput.value);
    //                });
    //                window.addEvent('CreateLeaveUnitSuccess', function () {
    //                    dayinput.store('old', dayinput.value);
    //                });
    //                window.addEvent('UpdateLeaveUnitSuccess', function () {
    //                    dayinput.store('old', dayinput.value);
    //                });

    //            }.bind(this));

    //        }.bind(this));

    //    }

    //    var responseJSON = response;
    //    var daiz = responseJSON.Data.Days;

    //    var rowInputs, posDate, curDate, posi, totalUnits, oldUnits, newU, oldTotal, newT;

    //    Array.each(positions, function (position, index) {

    //        posRow = document.getElements('.positions-units');

    //        Array.each(posRow, function (row, index) {

    //            rowInputs = row.getElements('input');

    //            Array.each(rowInputs, function (dayInput, index) {

    //                Array.each(daiz, function (dai, Index) {

    //                    posDate = Affinity.leave.cleanBadDate(dai.Date).format('%d/%b/%y');

    //                    curDate = Affinity.leave.cleanBadDate(dayInput.get('id')).format('%d/%b/%y');

    //                    if (curDate === posDate) {

    //                        Array.each(dai.PositionUnits, function (uni, Index) {

    //                            if (uni.PositionCode === row.get('id')) {

    //                                if (typeOf(uni.UnitsAppliedFor)==='null') {
    //                                    uni.UnitsAppliedFor = 0; // SG: this is occasionally null - what should we do here? (as NULL is not 0, so the code below will run)
    //                                }

    //                                if (uni.UnitsAppliedFor != 0) {

    //                                    dayInput.set('value', Affinity.leave.cleanUnit(uni.UnitsAppliedFor));
    //                                    dayInput.store('old', uni.UnitsAppliedFor);

    //                                    posi = document.getElements('.position-units');
    //                                    totalUnits = document.getElement('.total-units-units');

    //                                    Array.each(posi, function (posit, index) {

    //                                        if (posit.get('id') === row.get('id')) {

    //                                            oldUnits = posit.retrieve('units');
    //                                            newU = oldUnits + uni.UnitsAppliedFor;

    //                                            posit.set('html', newU.toFixed(2));
    //                                            posit.store('units', newU);

    //                                            oldTotal = totalUnits.retrieve('total');
    //                                            newT = oldTotal + uni.UnitsAppliedFor;

    //                                            totalUnits.set('html', newT.toFixed(2));
    //                                            totalUnits.store('total', newT);

    //                                        }

    //                                    });

    //                                }

    //                            }

    //                        });

    //                    }

    //                });

    //            });

    //        });

    //    });

    //    var container = scroller.getParent();

    //    var containerSize = container.measure(function () { return this.getSize().x; });
    //    var scrollerSize = scroller.measure(function () { return this.getScrollSize().x; });

    //    if (scrollerSize > containerSize) {
    //        container.setStyle('overflow-x','scroll');
    //    }else{
    //        container.setStyle('overflow-x', 'hidden');
    //    }

    //},

    /**/

    //deletePositionUnits: function(daterange, field) {

    //    var dayDates = document.getElements('.day-class');
    //    var dayInputs = document.getElements('.edit-position-units');

    //    var scroller = document.getElement('.details-units-scroller');
    //    var scrollerWidth = scroller.retrieve('scrollerWidth');

    //    var range;

    //    //if (field === 'DateTo') {
    //    //    range = daterange;
    //    //} else {
    //        range = daterange;
    //    //}

    //    Array.each(range, function (date, index) {
    //        Array.each(dayDates, function (dayDate, index) {
    //            if (Affinity.leave.cleanBadDate(date).format('%d/%b/%y') === dayDate.get('id')) {
    //                dayDate.destroy();
    //                scrollerWidth -= 79;
    //            }
    //        });

    //        Array.each(dayInputs, function (input, index) {
    //            if (Affinity.leave.cleanBadDate(date).format('%d/%b/%y') === input.get('id')) {
    //                input.removeEvents();
    //                input.destroy();
    //            }
    //        });
    //    });
    //    scroller.setStyle('width', scrollerWidth);
    //    scroller.store('scrollerWidth', scrollerWidth);
    //},

    /**/

    checkApplicationEditable: function (leaveID, Status, doOnSuccess, doOnFailure) {
        var statusText = '';
        if (Status == 3) {
            statusText = 'Approved';
        }
        else if (Status == 2) {
            statusText = 'Declined';
        }

        if (statusText != '') {
            uialert({
                message: 'This Leave Application has been approved. <br /> Do you want to resubmit application to make it editable?',
                showButtons: true,
                showCancel: true,
                okText: 'Yes - resubmit application',
                okIcon: Affinity.icons.Plane,
                onOk: function () {
                    var value = {
                        FieldName: 'StatusCode',
                        NewValue: 0,
                        OldValue: Status //0 to resubmit partial approved leave
                    };

                    this._methodName = 'ui.myLeave.js -> resubmitApplication';

                    this._api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'UpdateLeave/' + Affinity.login.profile.employeeNumber + '/' + leaveID);

                    this.resubmitApprovedRequest.doOnSuccess = doOnSuccess;
                    this.resubmitApprovedRequest.doOnFailure = doOnFailure;

                    if (this.resubmitApprovedRequest && this.resubmitApprovedRequest.isRunning()) {
                        this.resubmitApprovedRequest.cancel();
                    }
                    this.resubmitApprovedRequest.url = this.resubmitApprovedRequest.options.url = this._api;
                    this.resubmitApprovedRequest.post(JSON.stringify(value));
                }.bind(this),
                onCancel: function () {
                    if (doOnFailure)
                        doOnFailure();
                }
            });
        }
        else {
            if (doOnSuccess)
                doOnSuccess();
        }
    },

    //updateAuthoriser: function (e) {

    //    var authSelect = e.target;
    //    var authorisationId = authSelect.retrieve('authId');
    //    var oldValue = authSelect.retrieve('old');
    //    var newValue = authSelect.getElements('option')[authSelect.selectedIndex].get('id');
    //    var leaveId = authSelect.getParent('.default-form').getElement('.leave-id').retrieve('old');

    //    var value = {
    //        FieldName: 'SubmittedTo',
    //        NewValue: newValue,
    //        OldValue: oldValue
    //    };

    //    var employeeNum = Affinity.login.profile.employeeNumber;

    //    var methodName = 'ui.myLeave.js -> updateAuthoriser';

    //    var api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'UpdateLeaveAuthorisation/' + employeeNum + '/' + leaveId + '/' + authorisationId);

    //    new Request.JSON({
    //        url: api,
    //        headers: { 'Content-Type': 'application/json; charset=utf-8' },
    //        urlEncoded: false,
    //        onRequest: function () {
    //            Affinity.leave.lockui('myleave-updateAuthoriser');
    //        },
    //        onFailure: function (e) {
    //            Affinity.leave.unlockui('myleave-updateAuthoriser');
    //            Affinity.leave.handleXHRErrors(e, api, methodName);
    //        },
    //        onException: function () {
    //            Affinity.leave.unlockui('myleave-updateAuthoriser');
    //        },
    //        onCancel: function () {
    //            Affinity.leave.unlockui('myleave-updateAuthoriser');
    //        },
    //        onSuccess: function (response) {
    //            Affinity.leave.unlockui('myleave-updateAuthoriser');
    //            if (!Affinity.leave.isErrorInJson(response, api, methodName)) {
    //                authSelect.store('old', newValue);
    //            } else {
    //                var index = authSelect.getElements('option').indexOf(authSelect.getElement('#' + oldValue));
    //                authSelect.selectedIndex = index;
    //            }
    //        }
    //    }).post(JSON.stringify(value));

    //},

    getConfig: function () {

        var employeeNum = Affinity.login.profile.employeeNumber;

        this._methodName = 'ui.myLeave.js -> getConfig';

        this._api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'LeaveConfig/' + employeeNum);

        if (this.leaveConfigRequest && this.leaveConfigRequest.isRunning()) {
            this.leaveConfigRequest.cancel();
        }
        this.leaveConfigRequest.url = this.leaveConfigRequest.options.url = this._api;
        this.leaveConfigRequest.get();

    },
    getConfigWithHandle: function (onSuccess) {

        var employeeNum = Affinity.login.profile.employeeNumber;

        this._methodName = 'ui.myLeave.js -> getConfig';

        this._api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'LeaveConfig/' + employeeNum);

        if (this.leaveConfigRequest && this.leaveConfigRequest.isRunning()) {
            this.leaveConfigRequest.cancel();
        }
        this._onSuccess = onSuccess;
        this.leaveConfigRequest.url = this.leaveConfigRequest.options.url = this._api;
        this.leaveConfigRequest.get();

    },

    applyConfig: function (doOnConfig) {
        if (this.config) {
            doOnConfig(this.config)
        }
        else {
            this.configQueue.push(doOnConfig);
        }
    },

    reset: function () {
        //if (this.deleteAttachmentsRequest && this.deleteAttachmentsRequest.isRunning()) {
        //    this.deleteAttachmentsRequest.cancel();
        //}
        if (this.leaveBlanaces) { this.leaveBlanaces.reset(); }
        if (this.leaveHistory) { this.leaveHistory.reset(); }
        if (this.applyForLeave) { this.applyForLeave.reset(); }
        if (this.mycalendar) { this.mycalendar.reset(); }
        if (this.teamcalendar) { this.teamcalendar.reset(); }
        this.target.empty();
        this.target.addClass('hidden');
    },

    destroy: function () {
        this.reset();
        if (this.leaveBlanaces) { this.leaveBlanaces.destroy(); }
        if (this.leaveHistory) { this.leaveHistory.destroy(); }
        if (this.applyForLeave) { this.applyForLeave.destroy(); }
        if (this.mycalendar) { this.mycalendar.destroy(); }
        if (this.teamcalendar) { this.teamcalendar.destroy(); }
    }

});
;
var UILeaveCalendar = new Class({

    Implements: [Options, Events],

    Binds: [
        'hide', 'show', 'toggle',
        'init',
        'buildHistoryFrames',
        'getHolidays', 'myLeave', 'getExisitingLeave', 'processExistingLeave',
        'buildHistoryControls', 'scrollFromMarker', 'positionKeyMarker', 'positionKeyMarkerOnScroll',
        'reset', 'destroy'
    ],

    options: {
        target: null,
        fromDate: false,
        toDate: false,
        startDay: 0
    },

    initialize: function (options) {

        this.setOptions(options);

        /**/

        this.width = '90%';

        this.today = new Date();

        this.currentMonth = Date.parse(this.options.fromDate).getMonth() + 1;

        this.fromDate = Date.parse(this.options.fromDate);
        this.toDate = Date.parse(this.options.toDate);

        this.days = Math.ceil((this.toDate - this.fromDate) / 86400000);

        this.visibleWidth = '90%';

        this.segmentWidth = this.days * 20 < this.width ? this.width / this.days : 20;

        this.totalWidth = this.segmentWidth * this.days;

        /* BUILD HTML */

        this.target = this.options.target;

        this.section = new Element('div', { 'class': 'section calendar-section' }).adopt(

            new Element('div', { 'class': 'section-body' }).adopt(

                this.calendarForm = new Element('div', { 'class': 'default-form leave-calendar-form' })

            )

        ).inject(this.target);

        // this.section.setStyle('opacity', 0);

        this.titlebox = new Element('div', { 'class': 'section-title ui-has-tooltip', 'html': 'Leave Calendar', 'data-tooltip': 'Open / Close', 'data-tooltip-dir': 'top' }).addEvent(Affinity.events.click, this.toggle).inject(this.calendarForm);

        this.toggleButton = new Element('div', { 'class': 'toggle-button', 'html': Affinity.icons.ArrowLineSmallDown }).store('state', 'closed').inject(this.titlebox);;

        this.hiddenBox = new Element('div', { 'class': 'calendar-generator', 'style': 'opacity: 0;' }).inject(this.target, 'bottom');

        this.box = new Element('div', { 'class': 'calendarbox', 'style': 'opacity:1' }).inject(this.hiddenBox);
		// this.employeeBoxWrap = new Element('div', { 'class': 'calendarbox-wrapper' }).inject(this.box);

        // this.leaveTypes = new Element('div', { 'class': 'leave-types', 'style': 'padding-top: 26px;' }).setStyle('width', '8%').inject(this.employeeBoxWrap, 'top');

        // this.historyContainer = new Element('div', { 'class': 'calendar-history', 'style': 'display:inline-block;' }).setStyle('width', this.visibleWidth).inject(this.employeeBoxWrap);

        // this.historyFrame = new Element('div', { 'class': 'calendar-history-frame employee-calendar-frame' }).setStyle('width', '100%').inject(this.historyContainer);

        // this.historyTitles = new Element('div', { 'class': 'calendar-history-titles' }).setStyle('width', this.totalWidth).inject(this.historyFrame);

        // this.historySlider = new Element('div', { 'class': '', 'html': '' }).inject(this.box);

        this.scrollPosition = null;

        // Insert IFrame for the new Calendar UI
		this.calendarIframe = new Element('iframe');
		this.calendarIframeLoaded = false;
		var screenRatio = (window.screen.height / window.screen.width) * 100;
		new Element('div', { 'class': 'ss-app-iframe employee-calendar', 'style': `--screen-ratio: ${screenRatio}%; --screen-max-height: ${window.screen.height - 240}px` })
			.adopt(this.calendarIframe).inject(this.box, "top");

        /* REQUESTS */

        // this.leaveRequest = new Request.JSON({
        //     onFailure: function (e) {
        //         Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
        //     },
        //     onSuccess: function (response) {
        //         if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName)) {
        //             this.getExisitingLeave(response.Data.LeaveTypeBlocks);
        //         }
        //     }.bind(this)
        // });

        // this.holidayRequest = new Request.JSON({
        //     onFailure: function (e) {
        //         Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
        //     },
        //     onSuccess: function (response) {
        //         if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName)) {
        //             this.renderHolidays(response.Data);
        //         }
        //     }.bind(this)
        // });

        /**/

        // this.init();

        // this.section.addEvent('calendarloaded', function () {

            this.box.inject(this.calendarForm);

            this.box.toggle();
            this.hide(true);
            (function () {
                this.section.setStyle('opacity', null);
            }).delay(500, this);

            this.hiddenBox.set('html', '');

            Affinity.tooltips.processNew();

        // }.bind(this));

    },

    hide: function (init) {
        if (!init) {
            // this.scrollPosition = this.historyFrame.scrollLeft;
        }

        this.toggleButton.set('html', Affinity.icons.ArrowLineSmallDown).store('state', 'closed');
        this.box.dissolve();

    },

    show: function () {
        this.toggleButton.set('html', Affinity.icons.ArrowLineSmallUp).store('state', 'open');
        this.box.reveal();

        if (!this.calendarIframeLoaded) {
			const calendarUrl = window.location.href.includes("test") ? "https://leave-ui.testaffinitylogon.com/employee-calendar" : "https://leave-ui.affinitylogon.com/employee-calendar";
			this.calendarIframeLoaded = true;
			this.calendarIframe.src = calendarUrl;
		}

        // if not scroll poisition not initiallized then scroll to mid
        // if (this.scrollPosition === null) {
        //     this.historyFrame.scrollLeft = this.scrollPosition = this.historyFrame.scrollWidth / 2;
        // } else {
        //     this.historyFrame.scrollLeft = this.scrollPosition;
        // }
    },

    toggle: function () {
        if (this.toggleButton.retrieve('state') === 'open') {
            this.hide();
        } else {
            this.show();
        }
    },

    init: function () {
 
        // this.getHolidays();

        this.section.addEvent('myScheduleReturned', function () {

            this.buildHistoryFrames();

        }.bind(this));

    },

    myLeave: function () {

        var employeeNum = Affinity.login.profile.employeeNumber;

        this._methodName = 'ui.leaveCalandar.js -> myLeave';

        this._api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'EmployeeLeaveCalendar/' + employeeNum + '/' + this.fromDate.format('%d-%b-%Y') + '/' + this.toDate.format('%d-%b-%Y'));

        if (this.leaveRequest && this.leaveRequest.isRunning()) {
            this.leaveRequest.cancel();
        }
        this.leaveRequest.url = this.leaveRequest.options.url = this._api;
        this.leaveRequest.get();

    },
    
    getHolidays: function () {

        var employeeNum = Affinity.login.profile.employeeNumber;

        this._methodName = ' ui.leaveCalendar.js -> getHolidays';

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

        this.section.fireEvent('myScheduleReturned');

    },

    getExisitingLeave: function (myLeaveData) {

        var leave;

        var data = {};

        data.myleave = [];

        data.myleave.push(myLeaveData);

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

        this.myLeave();

    },

    processExistingLeave: function (data) {

        var offset = 20;
        var days, width, left, klass, message;
        var _t = this;
        this.currentFocusedDay = undefined;
        this.currentTooltip = undefined;
        var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

        if (data.myleave && data.myleave.length > 0) {
            document.addEventListener("scroll", function(e) {
                if (_t.currentFocusedDay) {
                    _t.currentFocusedDay.removeClass("focused");
                    _t.currentTooltip && _t.currentTooltip.remove();

                    _t.currentTooltip = undefined;
                    _t.currentFocusedDay = undefined;
                    document.getElementById("calendarToolTipOverlay").remove();
                }
            })

            Array.each(data.myleave[0], function (leave) {

                var high = 0;

                this.leaveCodeBox = new Element('div', {
                    'class': 'leave-code'
                }).inject(this.leaveTypes);

                this.leaveCodeTitle = new Element('div', {
                    'class': 'leave-code-title',
                    'html': leave.CodeDescription
                }).inject(this.leaveCodeBox);

                if (leave.ApprovedBlocks.length > 0) {

                    high += 1;

                    Array.each(leave.ApprovedBlocks, function (app, index) {

                        days = Math.round((Date.parse(app.DateTo).getTime() - Date.parse(app.DateFrom).getTime()) / (1000 * 60 * 60 * 24)) + 1;
                        width = days * this.segmentWidth;
                        var fromDate = this.fromDate.getFullYear() + '-' + (this.fromDate.getMonth() + 1) + '-' + this.fromDate.getDate() + 'T00:00:00';
                        left = (Math.round((Date.parse(app.DateFrom).getTime() - Date.parse(fromDate).getTime()) / (1000 * 60 * 60 * 24)) * this.segmentWidth);
                        klass = 'calendar-history-item';
                        klass += ' ui-has-tooltip';
                        message = '<h1 class=\'' + klass + '\'>' + 'Approved' + '</h1>';
                        message += '<strong>' + leave.CodeDescription + '</strong>' + '<br />';
                        Array.each(app.LeaveApplications, function (ts, index) {
                            message += '<div class=\'details\'>';
                            message += '<strong>Leave ID</strong> ' + ts.TSGroupId + '<br />';
                            message += '<strong>From</strong> ' + Date.parse(ts.DateFrom).format('%A %B %e%o %Y') + '<br />';
                            message += '<strong>To</strong> ' + Date.parse(ts.DateTo).format('%A %B %e%o %Y') + '<br />';
                            message += '</div>';
                        });

                        var el = new Element('div')
                            .addClass(klass)
                            .addClass('approved')
                            .setStyles({
                                'margin-left': left,
                                'width': width,
                                'top': offset,
                            });
                            
                        if (vw >= 768) {
                            el.set('data-tooltip', message);
                            el.set('data-tooltip-direction', 'top');
                        }  else {
                            el.set('data-content', message);
                        }
                        el.store('leave', app).inject(this.historyFrame);

                    }.bind(this));

                    offset += 25;

                }

                if (leave.SubmittedBlocks.length > 0) {

                    high += 1;

                    Array.each(leave.SubmittedBlocks, function (sub, index) {

                        days = Math.round((Date.parse(sub.DateTo).getTime() - Date.parse(sub.DateFrom).getTime()) / (1000 * 60 * 60 * 24)) + 1;
                        width = days * this.segmentWidth;
                        var fromDate = this.fromDate.getFullYear() + '-' + (this.fromDate.getMonth() + 1) + '-' + this.fromDate.getDate() + 'T00:00:00';
                        left = Math.round((Date.parse(sub.DateFrom).getTime() - Date.parse(fromDate).getTime()) / (1000 * 60 * 60 * 24)) * this.segmentWidth;
                        klass = 'calendar-history-item';
                        klass += ' ui-has-tooltip';
                        message = '<h1 class=\'' + klass + '\'>' + 'Submitted' + '</h1>';
                        message += '<strong>' + leave.CodeDescription + '</strong>' + '<br />';
                        Array.each(sub.LeaveApplications, function (ts, index) {
                            message += '<div class=\'details\'>';
                            message += '<strong>Leave ID</strong> ' + ts.TSGroupId + '<br />';
                            message += '<strong>From</strong> ' + Date.parse(ts.DateFrom).format('%A %B %e%o %Y') + '<br />';
                            message += '<strong>To</strong> ' + Date.parse(ts.DateTo).format('%A %B %e%o %Y') + '<br />';
                            message += '</div>';
                        });

                        var el = new Element('div')
                            .addClass(klass)
                            .addClass('submitted')
                            .setStyles({
                                'margin-left': left,
                                'width': width,
                                'top': offset,
                            });
                        if (vw >= 768) {
                            el.set('data-tooltip', message);
                            el.set('data-tooltip-direction', 'top');
                        } else {
                            el.set('data-content', message);
                        }
                        el.store('leave', sub).inject(this.historyFrame);

                    }.bind(this));

                    offset += 25;

                }

                if (leave.PendingBlocks.length > 0) {

                    high += 1;

                    Array.each(leave.PendingBlocks, function (pen, index) {

                        days = Math.round((Date.parse(pen.DateTo).getTime() - Date.parse(pen.DateFrom).getTime()) / (1000 * 60 * 60 * 24)) + 1;
                        width = days * this.segmentWidth;
                        var fromDate = this.fromDate.getFullYear() + '-' + (this.fromDate.getMonth() + 1) + '-' + this.fromDate.getDate() + 'T00:00:00';
                        left = Math.round((Date.parse(pen.DateFrom).getTime() - Date.parse(fromDate).getTime()) / (1000 * 60 * 60 * 24)) * this.segmentWidth;
                        klass = 'calendar-history-item';
                        klass += ' ui-has-tooltip';
                        message = '<h1 class=\'' + klass + '\'>' + 'Pending' + '</h1>';
                        message += '<strong>' + leave.CodeDescription + '</strong>' + '<br />';
                        Array.each(pen.LeaveApplications, function (ts, index) {
                            message += '<div class=\'details\'>';
                            message += '<strong>Leave ID</strong> ' + ts.TSGroupId + '<br />';
                            message += '<strong>From</strong> ' + Date.parse(ts.DateFrom).format('%A %B %e%o %Y') + '<br />';
                            message += '<strong>To</strong> ' + Date.parse(ts.DateTo).format('%A %B %e%o %Y') + '<br />';
                            message += '</div>';
                        });

                        var el = new Element('div')
                            .addClass(klass)
                            .addClass('pending')
                            .setStyles({
                                'margin-left': left,
                                'width': width,
                                'top': offset,
                            });

                        if (vw >= 768) {
                            el.set('data-tooltip', message);
                            el.set('data-tooltip-direction', 'top');
                        } else {
                            el.set('data-content', message);
                        }
                        el.store('leave', pen).inject(this.historyFrame);

                    }.bind(this));

                    offset += 25;

                }

                if (leave.DeclinedBlocks.length > 0) {

                    high += 1;

                    Array.each(leave.DeclinedBlocks, function (dec, index) {

                        days = Math.round((Date.parse(dec.DateTo).getTime() - Date.parse(dec.DateFrom).getTime()) / (1000 * 60 * 60 * 24)) + 1;
                        width = days * this.segmentWidth;
                        var fromDate = this.fromDate.getFullYear() + '-' + (this.fromDate.getMonth() + 1) + '-' + this.fromDate.getDate() + 'T00:00:00';
                        left = Math.round((Date.parse(dec.DateFrom).getTime() - Date.parse(fromDate).getTime()) / (1000 * 60 * 60 * 24)) * this.segmentWidth;
                        klass = 'calendar-history-item';
                        klass += ' ui-has-tooltip';
                        message = '<h1 class=\'' + klass + '\'>' + 'Declined' + '</h1>';
                        message += '<strong>' + leave.CodeDescription + '</strong>' + '<br />';
                        Array.each(dec.LeaveApplications, function (ts, index) {
                            message += '<div class=\'details\'>';
                            message += '<strong>Leave ID</strong> ' + ts.TSGroupId + '<br />';
                            message += '<strong>From</strong> ' + Date.parse(ts.DateFrom).format('%A %B %e%o %Y') + '<br />';
                            message += '<strong>To</strong> ' + Date.parse(ts.DateTo).format('%A %B %e%o %Y') + '<br />';
                            message += '</div>';
                        });

                        var el = new Element('div')
                            .addClass(klass)
                            .addClass('declined')
                            .setStyles({
                                'margin-left': left,
                                'width': width,
                                'top': offset,
                            });
                        
                        if (vw >= 768) {
                            el.set('data-tooltip', message);
                            el.set('data-tooltip-direction', 'top');
                        } else {
                            el.set('data-content', message);
                        }
                        el.store('leave', dec).inject(this.historyFrame);

                    }.bind(this));

                    offset += 25;

                }

                new Element('div', {
                    'style': 'border-bottom:1px solid lightgrey; position:absolute;'
                }).setStyles({
                    'width': this.totalWidth,
                    'top': offset + 5,
                }).inject(this.historyFrame);

                var heighten = ((high * 25) + 5);

                this.leaveCodeBox.setStyle('height', heighten);

                offset += 5;

            }.bind(this));

        }

        this.historyFrame.setStyle('height', offset + 25);
        this.leaveTypes.setStyle('height', offset + 25);

        Affinity.tooltips.processNew();

        /* build control slider */
        this.buildHistoryControls.delay(100, this);
        
        /* Tooltip for mobile size */
        if (vw < 768) {
            $$('.employee-calendar-frame .calendar-history-item').addEvent("click", function(e) {
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

            var keywrapper = new Element('div', { 'id': 'keyWrapper' });

            keywrapper.setStyles({
                'width': '100%',
                'height': (height * this.keyScale),
                'margin': '20px 0 30px 0',
                'border': '1px solid #ccc',
                'overflow': 'hidden'
            });
            keywrapper.inject(this.historyContainer);

            this.historyKey = this.historyFrame.clone();

            this.historyKey.setStyles({
                'width': this.totalWidth,
                'transform-origin': '0 0',
                'transform': 'scale(' + this.keyScale + ',' + this.keyScale + ')',
                'overflow': 'hidden'
            });
            this.historyKey.addClass('historyKey');
            this.historyKey.inject(keywrapper);

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
                .addClass('mine')
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

        this.section.fireEvent('calendarloaded');

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
    }

});
;
var UITeamLeaveCalendar = new Class({

	Implements: [Options, Events],

	Binds: [
		'hide', 'show', 'toggle',
		'init',
		'buildHistoryFrames',
		'getHolidays', 'teamLeave', 'processExistingLeave',
		'buildHistoryControls', 'scrollFromMarker', 'positionKeyMarker', 'positionKeyMarkerOnScroll',
		'reset', 'destroy'
	],

	options: {
		target: null,
		fromDate: false,
		toDate: false,
		startDay: 0
	},

	initialize: function (options) {

		this.setOptions(options);

		/**/

		this.width = '90%';

		this.today = new Date();

		this.currentMonth = Date.parse(this.options.fromDate).getMonth() + 1;

		this.fromDate = Date.parse(this.options.fromDate);
		this.toDate = Date.parse(this.options.toDate);

		this.days = Math.ceil((this.toDate - this.fromDate) / 86400000);

		this.visibleWidth = '90%';

		this.segmentWidth = this.days * 20 < this.width ? this.width / this.days : 20;

		this.totalWidth = this.segmentWidth * this.days;

		/* BULD HTML */

		this.target = this.options.target;

		this.section = new Element('div', { 'class': 'section calendar-section' }).adopt(

			new Element('div', { 'class': 'section-body' }).adopt(

				this.calendarForm = new Element('div', { 'class': 'default-form team-leave-calendar-form' })

			)

		).inject(this.target);

		// this.section.setStyle('opacity', 0);

		this.titlebox = new Element('div', { 'class': 'section-title ui-has-tooltip', 'html': 'Team Leave Calendar', 'data-tooltip': 'Open / Close', 'data-tooltip-dir': 'top' }).addEvent(Affinity.events.click, this.toggle).inject(this.calendarForm);

		this.toggleButton = new Element('div', { 'class': 'toggle-button', 'html': Affinity.icons.ArrowLineSmallDown }).store('state', 'closed').inject(this.titlebox);;

		this.hiddenBox = new Element('div', { 'class': 'team-calendar-generator', 'style': 'opacity: 0;' }).inject(this.target, 'bottom');

		this.box = new Element('div', { 'class': 'team-calendarbox', 'style': 'opacity:1' }).inject(this.hiddenBox);
		// this.teamBoxWrap = new Element('div', { 'class': 'calendarbox-wrapper' }).inject(this.box);

		// this.teamMembers = new Element('div', { 'class': 'team-members' }).setStyle('width', '8%').inject(this.teamBoxWrap, 'top');

		// this.historyContainer = new Element('div', { 'class': 'calendar-history', 'style': 'display:inline-block' }).setStyle('width', this.visibleWidth).inject(this.teamBoxWrap);

		// this.historyFrame = new Element('div', { 'class': 'calendar-history-frame employee-team-calendar-frame' }).setStyle('width', '100%').inject(this.historyContainer);

		// this.historyTitles = new Element('div', { 'class': 'calendar-history-titles' }).setStyle('width', this.totalWidth).inject(this.historyFrame);

		// this.historySlider = new Element('div', { 'class': '', 'html': '' }).inject(this.box);

		this.scrollPosition = null;

		// Insert IFrame for the new Calendar UI
		this.calendarIframe = new Element('iframe');
		this.calendarIframeLoaded = false;
		var screenRatio = (window.screen.height / window.screen.width) * 100;
		new Element('div', { 'class': 'ss-app-iframe', 'style': `--screen-ratio: ${screenRatio}%; --screen-max-height: ${window.screen.height - 240}px` })
			.adopt(this.calendarIframe).inject(this.box, "top");

		/* REQUESTS */

		// this.leaveRequest = new Request.JSON({
		// 	onFailure: function (e) {
		// 		Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
		// 	},
		// 	onSuccess: function (response) {
		// 		if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName)) {
		// 			this.processExistingLeave(response.Data);
		// 		}
		// 	}.bind(this)
		// });

		// this.holidayRequest = new Request.JSON({
		// 	onFailure: function (e) {
		// 		Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
		// 	},
		// 	onSuccess: function (response) {
		// 		if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName)) {
		// 			this.renderHolidays(response.Data);
		// 		}
		// 	}.bind(this)
		// });

		/**/

		// this.init();

		// this.section.addEvent('teamcalendarloaded', function () {

			this.box.inject(this.calendarForm);

			this.box.toggle();
			this.hide(true);
			(function () {
				this.section.setStyle('opacity', null);
			}).delay(500, this);

			this.hiddenBox.set('html', '');

			Affinity.tooltips.processNew();

		// }.bind(this));

	},

	hide: function (init) {
		if (!init) {
				// this.scrollPosition = this.historyFrame.scrollLeft;
		}

		this.toggleButton.set('html', Affinity.icons.ArrowLineSmallDown).store('state', 'closed');
		this.box.dissolve();
	   
	},

	show: function () {
		this.toggleButton.set('html', Affinity.icons.ArrowLineSmallUp).store('state', 'open');
		this.box.reveal();

		if (!this.calendarIframeLoaded) {
			const calendarUrl = window.location.href.includes("test") ? "https://leave-ui.testaffinitylogon.com/employee-team-calendar" : "https://leave-ui.affinitylogon.com/employee-team-calendar";
			this.calendarIframeLoaded = true;
			this.calendarIframe.src = calendarUrl;
		}

		// if (this.scrollPosition === null) {
		// 	this.historyFrame.scrollLeft = this.scrollPosition = this.historyFrame.scrollWidth / 2;
		// } else {
		// 	this.historyFrame.scrollLeft = this.scrollPosition;
		// }
	},

	toggle: function () {
		if (this.toggleButton.retrieve('state') === 'open') {
			this.hide();
		} else {
			this.show();
		}
	},

	init: function () {

		// this.getHolidays();

		this.section.addEvent('teamScheduleReturned', function () {

			this.buildHistoryFrames();

		}.bind(this));

	},

	teamLeave: function () {

		var employeeNum = Affinity.login.profile.employeeNumber;

		this._methodName = 'ui.teamCalendar.js -> teamLeave';

		this._api = Affinity.GetCacheSafePath(Affinity.leave.apiroot + 'EmployeeTeamCalendar/' + this.fromDate.format('%d-%b-%Y') + '/' + this.toDate.format('%d-%b-%Y'));

		if (this.leaveRequest && this.leaveRequest.isRunning()) {
			this.leaveRequest.cancel();
		}
		this.leaveRequest.url = this.leaveRequest.options.url = this._api;
		this.leaveRequest.get();

	},

	getHolidays: function () {

		var employeeNum = Affinity.login.profile.employeeNumber;

		this._methodName = 'ui.teamCalendar.js -> getHolidays';

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

		this.section.fireEvent('teamScheduleReturned');

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

		var offset = 27;
		var days, width, left, kass, massage;
        var _t = this;
        this.currentFocusedDay = undefined;
        this.currentTooltip = undefined;
        var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

		if (data && data.length > 0) {
            document.addEventListener("scroll", function(e) {
                if (_t.currentFocusedDay) {
                    _t.currentFocusedDay.removeClass("focused");
                    _t.currentTooltip && _t.currentTooltip.remove();

                    _t.currentTooltip = undefined;
                    _t.currentFocusedDay = undefined;
                    document.getElementById("calendarToolTipOverlay").remove();
                }
            })

			Array.each(data, function (person) {

				this.teamMemberName = new Element('div', {
					'class': 'team-members-name',
					'html': person.EmployeeName
				}).inject(this.teamMembers);

				Array.each(person.LeaveBlocks, function (range, index) {

					days = Math.round((Date.parse(range.DateTo).getTime() - Date.parse(range.DateFrom).getTime()) / (1000 * 60 * 60 * 24)) + 1;
                    width = days * this.segmentWidth;
                    var fromDate = this.fromDate.getFullYear() + '-' + (this.fromDate.getMonth() + 1) + '-' + this.fromDate.getDate() + 'T00:00:00';
                    left = Math.round((Date.parse(range.DateFrom).getTime() - Date.parse(fromDate).getTime()) / (1000 * 60 * 60 * 24)) * this.segmentWidth;
					kass = 'calendar-history-item';
					kass += ' ui-has-tooltip';
					massage = '<div class=\'details\'>';
					massage += '<strong>From</strong> ' + Date.parse(range.DateFrom).format('%A %B %e%o %Y') + '<br />';
					massage += '<strong>To</strong> ' + Date.parse(range.DateTo).format('%A %B %e%o %Y') + '<br />';
					massage += '</div>';

					var el = new Element('div')
						.addClass(kass)
						.addClass('approved')
						.setStyles({
							'margin-left': left,
							'width': width,
							'top': offset,
						});

					if (vw >= 768) {
						el.set('data-tooltip', massage)
						el.set('data-tooltip-direction', 'top')
					} else {
                        el.set('data-content', massage)
					}

					el.inject(this.historyFrame);
					

				}.bind(this));

				offset += 35;

			}.bind(this));

			this.historyFrame.setStyle('height', offset + 25);
			this.teamMembers.setStyle('height', offset + 25);

			Affinity.tooltips.processNew();

			/* build control slider */
			this.buildHistoryControls.delay(100, this);
			this.teamMembers.removeClass('hidden');
        
			/* Tooltip for mobile size */
			if (vw < 768) {
				$$('.employee-team-calendar-frame .calendar-history-item').addEvent("click", function(e) {
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
		}
		else {
		    this.section.addClass('hidden');
		    this.hiddenBox.addClass('hidden');
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

			var height = this.historyFrame.getSize().y;

			var keywrapper = new Element('div', { 'id': 'keyWrapper' });

			keywrapper.setStyles({
				'width': this.histroryFrameSize.x,
				'height': (height * this.keyScale),
				'margin': '20px 0 30px 0',
				'border': '1px solid #ccc',
				'overflow': 'hidden'
			});
			keywrapper.inject(this.historyContainer);

			this.historyKey = this.historyFrame.clone();

			this.historyKey.setStyles({
				'width': this.totalWidth,
				'transform-origin': '0 0',
				'transform': 'scale(' + this.keyScale + ',' + this.keyScale + ')',
				'overflow': 'hidden'
			});
			this.historyKey.addClass('historyKey');
			this.historyKey.inject(keywrapper);

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

			this.section.addEvent('teamLeaveCalendarScroll', function (scrollper) {

				this.historyFrame.scrollTo(((this.totalWidth - this.histroryFrameSize.x) * scrollper), 0);

			}.bind(this));

			/**/

			delete pos; delete size;
		}

		/**/

		this.box.setStyle('opacity', 1).set('reveal', { duration: 250 });

		prompts.hide();

		this.section.fireEvent('teamcalendarloaded');

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
		console.log("positionKeyMarker");
		this.keyButtonMarker.setStyle('margin-left', pos);
		this.scrollFromMarker();
		delete pos;
	},

	positionKeyMarkerOnScroll: function () {
		var fullScroll = this.totalWidth - this.histroryFrameSize.x;
		var scrollx = this.historyFrame.getScroll().x;
		var scrollPer = scrollx / fullScroll;
		this.keyButtonMarker.setStyle('margin-left', scrollx * this.keyScale);
		this.section.fireEvent('teamLeaveHistoryScroll', scrollPer);
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

	}

});
;
