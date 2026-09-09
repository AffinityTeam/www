
var UILeaveConfig = new Class({

    Implements: [Options, Events],

    Binds: [
        'init',
        'getConfigOptions',
        'getAllConfigs',
        'getConfigDetail',
        'CreateConfigHeader',
        'deleteConfig',
        'getBoolean',
        'updateConfigDetail',
        'updateConfigPriority',
        'renderConfigDetail',
        'renderSelectRow',
        'renderCheckboxRow',
        'renderTextInputRow',
        'renderConfigHeaderRecursive',
        'renderConfigElements',
        'highlightSelectedConfig',
        'createNewConfig',
        'deleteConfigRows',
        'reset', 'destroy',
        'viewCompanyConfigs',
        'renderCompanyConfigs'
    ],

    options: {
        target: null
    },

    initialize: function (options) {
        this.setOptions(options);
        this.target = this.options.target;
        Affinity.events.click = "click"; // Override if mobile property is true

        this.selectionTarget = this.target.getElement('div.configSelection')
        this.detailTarget = this.target.getElement('div.configDetail');
        this.detailValues = this.detailTarget.getElement('div.configValues');

        var viewCompanyConfigsButton = this.target.getElement('.companyConfig');

        if (viewCompanyConfigsButton)
        {
            viewCompanyConfigsButton.addEvent(Affinity.events.click, function () {
                this.viewCompanyConfigs();
            }.bind(this))
        }

        /**/

        window.addEvent('leaveConfigRefreshToolTips', function () {
            Affinity.tooltips.processNew();
        });

        /* requests */

        this.companyConfigsRequest = new Request.JSON({
            onFailure: function (e) {
                Affinity.leave.handleXHRErrors(e, this._cc_api, this._cc_methodName);
            },
            onSuccess: function (response) {
                if (!Affinity.leave.isErrorInJson(response, this._cc_api, this._cc_methodName)) {
                    this.renderCompanyConfigs(response.Data);
                }
            }.bind(this)
        });

        this.configOptionsRequest = new Request.JSON({
            onFailure: function (e) {
                Affinity.leave.handleXHRErrors(e, this._co_api, this._co_methodName);
            },
            onSuccess: function (response) {
                prompts.hide();
                if (!Affinity.leave.isErrorInJson(response, this._co_api, this._co_methodName)) {
                    var data = response.Data;
                    this.userGroupOptions = data.UserGroups;
                    this.leaveCodeOptions = data.LeaveCodes;
                    this.allDedCodeOptions = data.AllDedCodes;
                }
            }.bind(this)
        });

        this.allConfigsRequest = new Request.JSON({
            onFailure: function (e) {
                Affinity.leave.handleXHRErrors(e, this._ac_api, this._ac_methodName);
            },
            onSuccess: function (response) {
                if (!Affinity.leave.isErrorInJson(response, this._ac_api, this._ac_methodName)) {
                    this.deleteConfigRows();
                    if (
                        this.renderConfigHeaderRecursive(
                            response.Data,
                            this.selectionTarget
                        ) //Start with root config render all configs recursively
                    ) {
                        window.fireEvent('leaveConfigRefreshToolTips');
                    }
                }
            }.bind(this)
        });

        this.configDetailRequest = new Request.JSON({
            onFailure: function (e) {
                Affinity.leave.handleXHRErrors(e, this._cd_api, this._cd_methodName);
            },
            onSuccess: function (response) {
                if (!Affinity.leave.isErrorInJson(response, this._cd_api, this._cd_methodName)) {
                    if (
                        this.renderConfigDetail(
                            response.Data,
                            this.detailTarget
                        )
                    ) {
                        prompts.hide();
                    }
                }
            }.bind(this)
        });

        this.createHeaderRequest = new Request.JSON({
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            urlEncoded: false,
            onFailure: function (e) {
                Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
            },
            onComplete: function (response) {
                prompts.hide();
                if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName)) {
                    this.getAllConfigs();
                }
            }.bind(this)
        });

        this.deleteConfigRequest = new Request.JSON({
            onFailure: function (e) {
                Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
            },
            onSuccess: function (response) {
                prompts.hide();
                if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName)) {
                    this.getAllConfigs();
                    this.detailTarget.addClass('hidden');
                }
            }.bind(this)
        });

        this.updateConfigDetailRequest = new Request.JSON({
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            urlEncoded: false,
            onFailure: function (e) {
                Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
            },
            onSuccess: function (response) {
                if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName)) {
                    this.getAllConfigs();
                    //this.detailTarget.addClass('hidden');
                    prompts.hide();
                }
            }.bind(this)
        });

        this.updateConfigPriorityRequest = new Request.JSON({
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            urlEncoded: false,
            onFailure: function (e) {
                Affinity.leave.handleXHRErrors(e, this._api, this._methodName);
            },
            onSuccess: function (response) {
                if (!Affinity.leave.isErrorInJson(response, this._api, this._methodName)) {
                    this.getAllConfigs();
                    prompts.hide();
                }
            }.bind(this)
        });
         
        /**/

    },

    init: function(){
        uialert({
            message: 'Loading Configurations',
            showLoader: true,
            showButtons: false,
            noClose: false
        });
        this.reset();
        this.getConfigOptions(); //get options for new configs
        this.getAllConfigs(); //get existing configs
    },

    viewCompanyConfigs: function () { //view read only company configs
        this._cc_methodName = 'ui.leaveconfig.js -> viewCompanyConfigs';
        this._cc_api = Affinity.GetCacheSafePath(Affinity.apiroot + 'config/companyconfigs');
        if (this.companyConfigsRequest && this.companyConfigsRequest.isRunning()) {
            this.companyConfigsRequest.cancel();
        }
        this.companyConfigsRequest.url = this.companyConfigsRequest.options.url = this._cc_api;
        this.companyConfigsRequest.get();
    },

    getConfigOptions: function () { //Options for when creating new config
        this._co_methodName = 'ui.leaveconfig.js -> getConfigOptions';
        this._co_api = Affinity.GetCacheSafePath(Affinity.apiroot + 'config/options');
        if (this.configOptionsRequest && this.configOptionsRequest.isRunning()) {
            this.configOptionsRequest.cancel();
        }
        this.configOptionsRequest.url = this.configOptionsRequest.options.url = this._co_api;
        this.configOptionsRequest.get();
    },

    getAllConfigs: function () { //get all existing configs, returned in heirarchical structure.
        this._ac_methodName = 'ui.leaveconfig.js -> ';
        this._ac_api = Affinity.GetCacheSafePath(Affinity.apiroot + 'config/root');
        if (this.allConfigsRequest && this.allConfigsRequest.isRunning()) {
            this.allConfigsRequest.cancel();
        }
        this.allConfigsRequest.url = this.allConfigsRequest.options.url = this._ac_api;
        this.allConfigsRequest.get();
    },

    getConfigDetail: function (configId) {
        uialert({
            message: 'Loading Configuration Detail',
            showLoader: true,
            showButtons: false,
            noClose: false
        });
        this._cd_methodName = 'ui.leaveconfig.js -> getConfigDetail';
        this._cd_api = Affinity.GetCacheSafePath(Affinity.apiroot + 'config/detail/' + configId);
        if (this.configDetailRequest && this.configDetailRequest.isRunning()) {
            this.configDetailRequest.cancel();
        }
        this.configDetailRequest.url = this.configDetailRequest.options.url = this._cd_api;
        this.configDetailRequest.get();
    },

    CreateConfigHeader: function (config) { //save a new config. replace it with non-editable version.
        var newConfig = new Object(); //post object    
        var parent = config.parentElement.parentElement;
        var priority = config.getElement('span.configPriority').get('html');
        newConfig.parentId = parent.id;
        newConfig.PriorityOrder = priority

        //Look for selectors, determine leave code and user group
        var userGroupSelector = config.getElement('select.configUserGroup');
        var leaveCodeSelector = config.getElement('select.configLeaveCode');
        if (typeof userGroupSelector !== 'undefined' && userGroupSelector != null) {
            var option = userGroupSelector.getElement('option:selected');
            var userGroup = option.get('html');
            if (userGroup !== 'All')
                newConfig.UserGroupId = option.id;
        } else {
            var userGroup = parent.getElement('span.configUserGroup').get('html');
        }

        if (typeof leaveCodeSelector !== 'undefined' && leaveCodeSelector != null) {
            var option = leaveCodeSelector.getElement('option:selected');
            var leaveCode = option.get('html');
            if (leaveCode !== 'All')
                newConfig.LeaveCode = option.id;
        } else {
            var leaveCode = parent.getElement('span.configLeaveCode').get('html');
        }
        
        uialert({
            message: 'Saving Configuration',
            showLoader: true,
            showButtons: false,
            noClose: false
        });

        this._methodName = 'ui.leaveconfig.js -> CreateConfigHeader';
        this._api = Affinity.GetCacheSafePath(Affinity.apiroot + 'config/CreateHeader');
        if (this.createHeaderRequest && this.createHeaderRequest.isRunning()) {
            this.createHeaderRequest.cancel();
        }
        this.createHeaderRequest.url = this.createHeaderRequest.options.url = this._api;
        this.createHeaderRequest.post(JSON.stringify(newConfig));

    },

    deleteConfig: function (element) { //remove a config and it's children

        uialert({
            message: 'Removing Configuration',
            showLoader: true,
            showButtons: false,
            noClose: false
        });

        this._methodName = 'ui.leaveconfig.js -> deleteConfig';
        this._api = Affinity.GetCacheSafePath(Affinity.apiroot + 'config/deleteconfig/' + element.id);
        if (this.deleteConfigRequest && this.deleteConfigRequest.isRunning()) {
            this.deleteConfigRequest.cancel();
        }
        this.deleteConfigRequest.url = this.deleteConfigRequest.options.url = this._api;
        this.deleteConfigRequest.post();
    },

    getBoolean: function (value) {
        if (value === '')
            return null;
        else
            return value === 'true';
    },
    updateConfigDetail: function (element, id) {
        var object = new Object();
        object.Id = id;
        object.DisplayBalance = this.getBoolean(element.getElement('.DisplayBalance select').getElement('option:selected').value);
        //object.DisplayDetail = this.getBoolean(element.getElement('.DisplayDetail select').getElement('option:selected').value);
        //object.DisplayAccrual = this.getBoolean(element.getElement('.DisplayAccrual select').getElement('option:selected').value);
        //object.DisplayEntitlement = this.getBoolean(element.getElement('.DisplayEntitlement select').getElement('option:selected').value);
        //object.DisplayPending = this.getBoolean(element.getElement('.DisplayPending select').getElement('option:selected').value);
        //object.DisplayApproved = this.getBoolean(element.getElement('.DisplayApproved select').getElement('option:selected').value);
        object.CanApply = this.getBoolean(element.getElement('.CanApply select').getElement('option:selected').value);
        object.MandatoryReason = this.getBoolean(element.getElement('.MandatoryReason select').getElement('option:selected').value);
        object.AttachmentRequirement = element.getElement('.AttachmentRequirement select').getElement('option:selected').value;
        object.AttachmentLimit = Affinity.leave.htmlEncode(element.getElement('.AttachmentLimit input').value);
        object.CanEditDayByDay = this.getBoolean(element.getElement('.CanEditDayByDay select').getElement('option:selected').value);
        object.LimitType = element.getElement('.LimitType select').getElement('option:selected').value;
        object.ActionOverLimit = element.getElement('.ActionOverLimit select').getElement('option:selected').value;
        object.LimitUnits = Affinity.leave.htmlEncode(element.getElement('.LimitUnits input').value);
        object.DisplayTeamCalendar = this.getBoolean(element.getElement('.DisplayTeamCalendar select').getElement('option:selected').value);
        object.DefaultSalaryAdjCode = element.getElement('.DefaultSalaryAdjCode select option:selected').value;
        object.RequireApprovalForCancellation = element.getElement('.RequireApprovalForCancellation select option:selected').value;
        object.OverlapLeaveAction = element.getElement('.OverlapLeaveAction select option:selected').value;
        object.WorkscheduleLimitExclusions = Affinity.leave.htmlEncode(element.getElement('.WorkscheduleLimitExclusions input').value);
        object.BalanceCalculationMethod = element.getElement('.BalanceCalculationMethod select option:selected').value;
        object.EnableLeaveEmailNotifications = this.getBoolean(element.getElement('.EnableLeaveEmailNotifications select').getElement('option:selected').value);
        //object.BalanceTotal = element.getElement('.BalanceTotal select').getElement('option:selected').value;

        uialert({
            message: 'Updating config detail',
            showLoader: true,
            showButtons: false,
            noClose: false
        });

        this._methodName = 'ui.leaveconfig.js -> updateConfigDetail';
        this._api = Affinity.GetCacheSafePath(Affinity.apiroot + 'config/Detail/' + id);
        if (this.updateConfigDetailRequest && this.updateConfigDetailRequest.isRunning()) {
            this.updateConfigDetailRequest.cancel();
        }
        this.updateConfigDetailRequest.url = this.updateConfigDetailRequest.options.url = this._api;
        this.updateConfigDetailRequest.post(JSON.stringify(object));
    },

    updateConfigPriority: function (configId, priority) {
        uialert({
            message: 'Updating priority',
            showLoader: true,
            showButtons: false,
            noClose: false
        });

        var object = new Object();
        object.FieldName = 'PriorityOrder';
        object.NewValue = priority;
        object.OldValue = null;

        this._methodName = 'ui.leaveconfig.js -> updateConfigPriority';
        this._api = Affinity.GetCacheSafePath(Affinity.apiroot + 'config/updateheader/' + configId);
        if (this.updateConfigPriorityRequest && this.updateConfigPriorityRequest.isRunning()) {
            this.updateConfigPriorityRequest.cancel();
        }
        this.updateConfigPriorityRequest.url = this.updateConfigPriorityRequest.options.url = this._api;
        this.updateConfigPriorityRequest.post(JSON.stringify(object));
    },

    /* renderers */
    renderCompanyConfigs : function (data)
    {
        Affinity.modal.show();
        Affinity.modal.clear();
        Affinity.modal.position();

        var modalData = new Element('div', {
            'class': 'modal-data leaveCompanyConfig'
        });

        var section = new Element('div', {
            'class': 'section'
        }).inject(modalData);

        var sectionBody = new Element('div', {
            'class': 'section-body'
        }).inject(section);

        var sectionTitle = new Element('div', {
            'class': 'section-title',
            'html': 'Company Configuration'
        }).inject(sectionBody);

        var form = new Element('div', {
            'class': 'default-form',
        }).inject(sectionBody);

        if (data.length == 0)
            form.set('html', 'No custom configurations set');

        Array.each(data, function (companyConfig) {
            var row = new Element('div', {
                'class': 'form-row ' + companyConfig.Name
            }).inject(form);

            new Element('label', {
                'html': companyConfig.Name
            }).inject(row);

            new Element('span', {
                'html': companyConfig.Value
            }).inject(row);
        });

        var closeButton = new Element('div', {
            'class': 'blue button details-close-leave-button',
            'html': 'Close'
        }).inject(sectionBody);

        closeButton.addEvent('click', function () {

            Affinity.modal.closeButtonCloser();

        });

        Affinity.modal.setElement(modalData);

    },

    renderConfigDetail: function (detail, element) {
        var values = this.detailValues;

        values.empty();
        var userGroup = element.getElement('.detailHeader span.detailUserGroup');
        var leaveCode = element.getElement('.detailHeader span.detailLeaveCode');

        userGroup.set('html', detail.UserGroupName);
        leaveCode.set('html', detail.LeaveCodeDescription);

        //Balances

        new Element('div', {
            'class': 'section-title',
            'html': 'Balances'
        }).inject(values);

        this.renderSelectRow(values,
            [
                { val: 'Entitlement', txt: 'Entitlement' },
                { val: 'EntitlementAccrual', txt: 'Entitlement + Accrual' },
                { val: 'EntitlementAccrualApproved', txt: 'Entitlement + Accrual - Approved' },
                { val: 'EntitlementAccrualApprovedPending', txt: 'Entitlement + Accrual - Approved - Pending' }
            ],
            'BalanceCalculationMethod',
            detail.BalanceCalculationMethodDisplayName,
            detail.BalanceCalculationMethod,
            detail.ParentBalanceCalculationMethod,
            'val', 'txt'
        );
        this.renderCheckboxRow(values,
            'DisplayBalance',
            detail.DisplayBalanceDisplayName,
            detail.DisplayBalance,
            detail.ParentDisplayBalance
        );

        //this.renderCheckboxRow(values,
        //    'DisplayDetail',
        //    detail.DisplayDetailDisplayName,
        //    detail.DisplayDetail,
        //    detail.ParentDisplayDetail
        //);

        //this.renderCheckboxRow(values,
        //    'DisplayAccrual',
        //    detail.DisplayAccrualDisplayName,
        //    detail.DisplayAccrual,
        //    detail.ParentDisplayAccrual
        //);

        //this.renderCheckboxRow(values,
        //    'DisplayEntitlement',
        //    detail.DisplayEntitlementDisplayName,
        //    detail.DisplayEntitlement,
        //    detail.ParentDisplayEntitlement
        //);

        //this.renderCheckboxRow(values,
        //    'DisplayPending',
        //    detail.DisplayPendingDisplayName,
        //    detail.DisplayPending,
        //    detail.ParentDisplayPending
        //);

        //this.renderCheckboxRow(values,
        //    'DisplayApproved',
        //    detail.DisplayApprovedDisplayName,
        //    detail.DisplayApproved,
        //    detail.ParentDisplayApproved
        //);

        //General

        new Element('div', {
            'class': 'section-title',
            'html': 'General'
        }).inject(values);

        this.renderCheckboxRow(values,
            'CanApply',
            detail.CanApplyDisplayName,
            detail.CanApply,
            detail.ParentCanApply
        );

        this.renderCheckboxRow(values,
            'MandatoryReason',
            detail.MandatoryReasonDisplayName,
            detail.MandatoryReason,
            detail.ParentMandatoryReason
        );

        this.renderSelectRow(values,
            ['None', {val: 'TotalUnitsLimit', txt: 'Total Units Limit'}, 'Mandatory'],
            'AttachmentRequirement',
            detail.AttachmentRequirementDisplayName,
            detail.AttachmentRequirement,
            detail.ParentAttachmentRequirement,
            'val', 'txt'
        );

        this.renderTextInputRow(values,
            'AttachmentLimit',
            detail.AttachmentLimitDisplayName,
            detail.AttachmentLimit,
            detail.ParentAttachmentLimit
        );

        this.renderCheckboxRow(values,
            'CanEditDayByDay',
            detail.CanEditDayByDayDisplayName,
            detail.CanEditDayByDay,
            detail.ParentCanEditDayByDay
        );

        this.renderCheckboxRow(values,
            'DisplayTeamCalendar',
            detail.DisplayTeamCalendarDisplayName,
            detail.DisplayTeamCalendar,
            detail.ParentDisplayTeamCalendar
        );

        this.renderSelectRow(values,
            this.allDedCodeOptions,
            'DefaultSalaryAdjCode',
            detail.DefaultSalaryAdjCodeDisplayName,
            detail.DefaultSalaryAdjCode,
            detail.ParentDefaultSalaryAdjCode,
            'Code', 'Description', true
        );

        this.renderCheckboxRow(values,
            'RequireApprovalForCancellation',
            detail.RequireApprovalForCancellationDisplayName,
            detail.RequireApprovalForCancellation,
            detail.ParentRequireApprovalForCancellation
        );

        this.renderCheckboxRow(values,
            'EnableLeaveEmailNotifications',
            detail.EnableLeaveEmailNotificationsDisplayName,
            detail.EnableLeaveEmailNotifications,
            detail.ParentEnableLeaveEmailNotifications
        );

        //Application

        new Element('div', {
            'class': 'section-title',
            'html': 'Application'
        }).inject(values);

        var limitTypes = [{val: 'CurrentBalance', txt: 'Current Balance'}, {val: 'FixedLimit', txt: 'Fixed Limit'}, 'Unlimited'];
        if (detail.LeaveCode === '07' ||
            detail.LeaveCode === '09' ||
            detail.LeaveCode === '10' ||
            detail.LeaveCode === '11' ||
            detail.LeaveCode === '12' ||
            detail.LeaveCode === '13') {
            limitTypes.splice(1, 0, { val: 'ProjectedBalance', txt: 'Projected Balance' });
        }
            

        this.renderSelectRow(values,
            limitTypes,
            'LimitType',
            detail.LimitTypeDisplayName,
            detail.LimitType,
            detail.ParentLimitType,
            'val', 'txt'
        );
     
        this.renderSelectRow(values,
            ['Warning', 'Error'],
            'ActionOverLimit',
            detail.ActionOverLimitDisplayName,
            detail.ActionOverLimit,
            detail.ParentActionOverLimit
        );

        this.renderTextInputRow(values,
            'LimitUnits',
            detail.LimitUnitsDisplayName,
            detail.LimitUnits,
            detail.ParentLimitUnits
        );

        this.renderSelectRow(values,
            [{ val: 'NoAction', txt: 'No Action' }, 'Warning', 'Error'],
            'OverlapLeaveAction',
            detail.OverlapLeaveActionDisplayName,
            detail.OverlapLeaveAction,
            detail.ParentOverlapLeaveAction,
            'val', 'txt'
        );            

        this.renderTextInputRow(values,
            'WorkscheduleLimitExclusions',
            detail.WorkscheduleLimitExclusionsDisplayName,
            detail.WorkscheduleLimitExclusions,
            detail.ParentWorkscheduleLimitExclusions
        );

        //Detail Buttons

        var buttonBox = new Element('div', {
            'class': 'form-row detailButtonBox',
        }).inject(values);

        var save = new Element('span', {
            'class': 'button green saveDetail',
            'html': 'Save'
        }).addEvent("click", function () { // }).addEvent(Affinity.events.click, function () { 
            this.updateConfigDetail(values, detail.Id);
        }.bind(this)).inject(buttonBox);

        var cancel = new Element('span', {
            'class': 'button red cancelDetail',
            'html': 'Cancel'
        }).addEvent(Affinity.events.click, function () {
            // why reload detail when click cancel?
            this.getConfigDetail(detail.Id);
            
            this.selectionTarget.getElement('.configChildren').setStyles({
                height: "auto"
            });
            this.selectedConfigId = undefined;
            this.selectionTarget.getElements('.config').removeClass('selected');
            this.detailTarget.addClass('hidden');
        }.bind(this)).inject(buttonBox);

        values.inject(element);
        element.removeClass('hidden');
        return true;

    },

    renderSelectRow: function (element, options, name, label, value, parentValue, propValue, propText, textAsAppendix) {

        var row = new Element('div', {
            'class': 'form-row'
        }).inject(element);
        row.addClass(name);

        new Element('label', {
            'html': label
        }).inject(row);

        var select = new Element('select', {
            'name': name
        }).inject(row);
       
        new Element('option', {
            'value': '',
            'html': '',
        }).inject(select);

        Array.each(options, function (option, index) {
            var txt = option;
            var val = option;

            if (typeOf(option) == 'object') {
                txt = option[propText] || '';
                val = option[propValue];

                if (txt == '') txt = val;
                else if (textAsAppendix) txt = '{value} ({text})'.substitute({
                    value: val,
                    text: txt
                });
            }

            new Element('option', {
                'value': val,
                'html': txt,
            }).inject(select);
            if (val === value) {
                select.selectedIndex = index + 1;
                
            }
            

        });
        if (name == "BalanceCalculationMethod" && parentValue == null) {
            select[0].destroy();
        }

        new Element('label', {
            'html': 'Default'
        }).inject(row);

        new Element('span', {
            'html': parentValue
        }).inject(row);

    },

    renderCheckboxRow: function (element, name, label, value, parentValue) {

        var row = new Element('div', {
            'class': 'form-row ' + name
        }).inject(element);

        new Element('label', {
            'html': label
        }).inject(row);

        var select = new Element('select', {
            'name': name
        }).inject(row);

        new Element('option', {
            'value': '',
            'html': '',
        }).inject(select);

        new Element('option', {
            'value': 'true',
            'html': 'Yes',
        }).inject(select);

        new Element('option', {
            'value': 'false',
            'html': 'No',
        }).inject(select);

        if (value == null) {
            select.selectedIndex = 0;
        } else {
            if (value.toLowerCase() === 'true') {
                select.selectedIndex = 1;
            } else {
                select.selectedIndex = 2;
            }
        }

        if (parentValue == null) {
            var parentText = '';
        } else if (parentValue.toLowerCase() === 'true') {
            var parentText = 'Yes';
        } else {
            var parentText = 'No';
        }

        new Element('label', {
            'html': 'Default'
        }).inject(row);

        new Element('span', {
            'html': parentText
        }).inject(row);

    },

    renderTextInputRow: function (element, name, label, value, parentValue) {

        var row = new Element('div', {
            'class': 'form-row ' + name
        }).inject(element);

        new Element('label', {
            'html': label
        }).inject(row);

        var input = new Element('input', {
            'type': 'text',
            'class': 'data-hj-whitelist',
            'value': Affinity.leave.htmlDecode(value)
        }).inject(row);

        new Element('label', {
            'html': 'Default'
        }).inject(row);

        new Element('span', {
            'html': parentValue
        }).inject(row);

    },

    renderConfigHeaderRecursive: function (config, element) { //render configs recursively
        var div = new Element('div', {
            'class': 'config',
            'id': config.Id
        }).addEvent(Affinity.events.click, function (e) {
            e.stopPropagation();
            this.getConfigDetail(config.Id);
            this.highlightSelectedConfig(element, div, config.Id);
        }.bind(this)).inject(element);

        var children = this.renderConfigElements(div, config); //render data in a config

        if (config.Children.length > 0) {
            Array.each(config.Children, function (child) {
                this.renderConfigHeaderRecursive(child, children); //recurse
            }.bind(this));
        } else {
            children.hide();
        }

        if (config.Id === this.selectedConfigId && this.selectedConfigId !== undefined) {
            this.highlightSelectedConfig(element, div, config.Id)
        }

        return true;

    },

    highlightSelectedConfig: function (parent, element, configId) { //highlight the selected config
        
        // reduce the height of selection target
        this.selectionTarget.getElement('.configChildren').setStyles({
            'height': '200px',
            'overflow': 'auto'
        });

        // remove all selected class then add selected class to the selected config
        this.selectionTarget.getElements('.config').removeClass('selected');
        element.addClass('selected');
        this.selectedConfigId = configId;
    },

    renderConfigElements: function (configElement, config) { //render the spans in a config div

        var parent = new Element('div', {
            'class': 'configParent ui-has-tooltip',
            'data-tooltip': 'Click to view/edit details',
            'data-tooltip-dir': 'top,center'
        });

        var priority = new Element('span', {
            'class': 'configPriority',
            'html': config.PriorityOrder
        }).inject(parent);

        var userGroup = new Element('span', {
            'class': 'configUserGroup',
            'html': config.UserGroupName
        }).inject(parent);

        var leavecode = new Element('span', {
            'class': 'configLeaveCode',
            'html': config.LeaveCodeDescription
        }).inject(parent);

        var actions = new Element('span', {
            'class': 'configActions'
        }).inject(parent);

        var children = new Element('div', {
            'class': 'configChildren'
        });

        //Can Create Child

        if (config.UserGroupName === 'All' || config.LeaveCodeDescription === 'All') {

            var addChild = new Element('span', {
                'class': 'green button addChild w-icon-only ui-has-tooltip',
                'data-tooltip': 'Add a child config',
                'data-tooltip-dir': 'top,center'
            }).addEvent(Affinity.events.click, function (e) {
                e.stopPropagation();
                this.createNewConfig(configElement, children);
            }.bind(this)).inject(actions);

            new Element('span', {
                'html': Affinity.icons.Plus
            }).inject(addChild);

        } else {

            actions.set('style', 'padding-left : 36px');

        }

        //Not default configuration

        if (config.Id != 1) {

            var remove = new Element('span', {
                'class': 'red button remove w-icon-only ui-has-tooltip',
                'data-tooltip': 'Remove config and children',
                'data-tooltip-dir': 'top,center'
            }).inject(actions);

            new Element('span', {
                'html': Affinity.icons.Trash
            }).inject(remove);

            remove.addEvent(Affinity.events.click, function (e) {
                e.stopPropagation();
                this.deleteConfig(configElement)
            }.bind(this));

            var higherPriority = new Element('span', {
                'class': 'blue button higherPriority w-icon-only ui-has-tooltip',
                'data-tooltip': 'Lower Priority',
                'data-tooltip-dir': 'top,center'
            }).inject(actions);

            new Element('span', {
                'html': Affinity.icons.ArrowDown
            }).inject(higherPriority);

            higherPriority.addEvent(Affinity.events.click, function (e) {
                e.stopPropagation();
                this.updateConfigPriority(config.Id, config.PriorityOrder + 1);
            }.bind(this));

            var lowerPriority = new Element('span', {
                'class': 'blue button lowerPriority w-icon-only ui-has-tooltip',
                'data-tooltip': 'Higher priority',
                'data-tooltip-dir': 'top,center'
            }).inject(actions);

            new Element('span', {
                'html': Affinity.icons.ArrowUp
            }).inject(lowerPriority);

            lowerPriority.addEvent(Affinity.events.click, function (e) {
                e.stopPropagation();
                this.updateConfigPriority(config.Id, config.PriorityOrder - 1);
            }.bind(this));

        } else {

            priority.set('html', 'Default');

        }

        parent.inject(configElement);
        children.inject(configElement);

        return children;

    },

    createNewConfig: function (parent, element) { //create a config under a parent, make it available to edit, save or cancel.

        var div = new Element('div', {
            'class': 'config'
        }).addEvent(Affinity.events.click, function (e) {
            e.stopPropagation();
        });

        var newPriority = element.children.length + 1;

        var priority = new Element('span', {
            'class': 'configPriority',
            'html': newPriority
        }).inject(div);

        var userGroupName = parent.getElement('.configUserGroup').get('html');

        var leaveCodeDescription = parent.getElement('.configLeaveCode').get('html');

        if (userGroupName === 'All') {

            var userGroupSelector = new Element('select', { 'class': 'configUserGroup' }).inject(div);

            new Element('option', {
                'value': 0,
                'html': 'All'
            }).inject(userGroupSelector);

            Array.each(this.userGroupOptions, function (group, index) {
                new Element('option', { 'id': group.Id, 'value': index, 'html': group.Name }).inject(userGroupSelector);
            }.bind(this));

        } else {

            var userGroup = new Element('span', { 'class': 'configUserGroup', 'html': userGroupName }).inject(div);

        }

        if (leaveCodeDescription === 'All') {

            var leaveCodeSelector = new Element('select', {
                'class': 'configLeaveCode'
            }).inject(div);

            new Element('option', {
                'value': 0,
                'html': 'All'
            }).inject(leaveCodeSelector);

            Array.each(this.leaveCodeOptions, function (code, index) {
                new Element('option', {
                    'id': code.Code,
                    'value': index,
                    'html': code.Description
                }).inject(leaveCodeSelector);
            });

        } else {

            var leavecode = new Element('span', {
                'class': 'configLeaveCode',
                'html': leaveCodeDescription
            }).inject(div);

        }

        var actions = new Element('span', {
            'class': 'configActions'
        }).inject(div);

        var save = new Element('span', {
            'class': 'green button',
            'html': 'Save'
        }).inject(actions);

        save.addEvent(Affinity.events.click, function (e) {
            this.CreateConfigHeader(div);
        }.bind(this));

        var cancel = new Element('span', {
            'class': 'red button',
            'html': 'Cancel'
        }).inject(actions);

        cancel.addEvent(Affinity.events.click, function (e) {
            div.destroy();
            if (element.children.length == 0) {
                element.hide();
            }
        });

        div.inject(element);

        element.show();

    },

    /**/

    deleteConfigRows: function(){
        Array.each(this.target.getElements('div.config'), function (config) {
            Array.each(config.getElements('.button'), function (button) {
                button.removeEvents();
            });
            config.removeEvents();
            config.destroy();
        });
    },

    /**/

    reset: function () {
        if (this.configOptionsRequest && this.configOptionsRequest.isRunning()) {
            this.configOptionsRequest.cancel();
        }
        if (this.allConfigsRequest && this.allConfigsRequest.isRunning()) {
            this.allConfigsRequest.cancel();
        }
        if (this.configDetailRequest && this.configDetailRequest.isRunning()) {
            this.configDetailRequest.cancel();
        }
        if (this.createHeaderRequest && this.createHeaderRequest.isRunning()) {
            this.createHeaderRequest.cancel();
        }
        if (this.deleteConfigRequest && this.deleteConfigRequest.isRunning()) {
            this.deleteConfigRequest.cancel();
        }
        if (this.updateConfigDetailRequest && this.updateConfigDetailRequest.isRunning()) {
            this.updateConfigDetailRequest.cancel();
        }
        if (this.updateConfigPriorityRequest && this.updateConfigPriorityRequest.isRunning()) {
            this.updateConfigPriorityRequest.cancel();
        }
        this.deleteConfigRows();
        //this.selectionTarget.empty();
        this.detailValues.empty();
    },

    destroy: function(){
        this.reset();
    }

});
