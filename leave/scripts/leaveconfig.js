var UILeaveConfig=new Class({Implements:[Options,Events],Binds:["init","getConfigOptions","getAllConfigs","getConfigDetail","CreateConfigHeader","deleteConfig","getBoolean","updateConfigDetail","updateConfigPriority","renderConfigDetail","renderSelectRow","renderCheckboxRow","renderTextInputRow","renderConfigHeaderRecursive","renderConfigElements","createNewConfig","deleteConfigRows","reset","destroy","viewCompanyConfigs","renderCompanyConfigs",],options:{target:null},initialize:function(n){this.setOptions(n);this.target=this.options.target;this.selectionTarget=this.target.getElement("div.configSelection");this.detailTarget=this.target.getElement("div.configDetail");this.detailValues=this.detailTarget.getElement("div.configValues");var t=this.target.getElement(".companyConfig");t&&t.addEvent(Affinity.events.click,function(){this.viewCompanyConfigs()}.bind(this));window.addEvent("leaveConfigRefreshToolTips",function(){Affinity.tooltips.processNew()});this.companyConfigsRequest=new Request.JSON({onFailure:function(n){Affinity.leave.handleXHRErrors(n,this._cc_api,this._cc_methodName)},onSuccess:function(n){Affinity.leave.isErrorInJson(n,this._cc_api,this._cc_methodName)||this.renderCompanyConfigs(n.Data)}.bind(this)});this.configOptionsRequest=new Request.JSON({onFailure:function(n){Affinity.leave.handleXHRErrors(n,this._co_api,this._co_methodName)},onSuccess:function(n){if(prompts.hide(),!Affinity.leave.isErrorInJson(n,this._co_api,this._co_methodName)){var t=n.Data;this.userGroupOptions=t.UserGroups;this.leaveCodeOptions=t.LeaveCodes;this.allDedCodeOptions=t.AllDedCodes}}.bind(this)});this.allConfigsRequest=new Request.JSON({onFailure:function(n){Affinity.leave.handleXHRErrors(n,this._ac_api,this._ac_methodName)},onSuccess:function(n){Affinity.leave.isErrorInJson(n,this._ac_api,this._ac_methodName)||(this.deleteConfigRows(),this.renderConfigHeaderRecursive(n.Data,this.selectionTarget)&&window.fireEvent("leaveConfigRefreshToolTips"))}.bind(this)});this.configDetailRequest=new Request.JSON({onFailure:function(n){Affinity.leave.handleXHRErrors(n,this._cd_api,this._cd_methodName)},onSuccess:function(n){Affinity.leave.isErrorInJson(n,this._cd_api,this._cd_methodName)||this.renderConfigDetail(n.Data,this.detailTarget)&&prompts.hide()}.bind(this)});this.createHeaderRequest=new Request.JSON({headers:{"Content-Type":"application/json; charset=utf-8"},urlEncoded:!1,onFailure:function(n){Affinity.leave.handleXHRErrors(n,this._api,this._methodName)},onComplete:function(n){prompts.hide();Affinity.leave.isErrorInJson(n,this._api,this._methodName)||this.getAllConfigs()}.bind(this)});this.deleteConfigRequest=new Request.JSON({onFailure:function(n){Affinity.leave.handleXHRErrors(n,this._api,this._methodName)},onSuccess:function(n){prompts.hide();Affinity.leave.isErrorInJson(n,this._api,this._methodName)||(this.getAllConfigs(),this.detailTarget.addClass("hidden"))}.bind(this)});this.updateConfigDetailRequest=new Request.JSON({headers:{"Content-Type":"application/json; charset=utf-8"},urlEncoded:!1,onFailure:function(n){Affinity.leave.handleXHRErrors(n,this._api,this._methodName)},onSuccess:function(n){Affinity.leave.isErrorInJson(n,this._api,this._methodName)||(this.getAllConfigs(),prompts.hide())}.bind(this)});this.updateConfigPriorityRequest=new Request.JSON({headers:{"Content-Type":"application/json; charset=utf-8"},urlEncoded:!1,onFailure:function(n){Affinity.leave.handleXHRErrors(n,this._api,this._methodName)},onSuccess:function(n){Affinity.leave.isErrorInJson(n,this._api,this._methodName)||(this.getAllConfigs(),prompts.hide())}.bind(this)})},init:function(){uialert({message:"Loading Configurations",showLoader:!0,showButtons:!1,noClose:!1});this.reset();this.getConfigOptions();this.getAllConfigs()},viewCompanyConfigs:function(){this._cc_methodName="ui.leaveconfig.js -> viewCompanyConfigs";this._cc_api=Affinity.GetCacheSafePath(Affinity.apiroot+"config/companyconfigs");this.companyConfigsRequest&&this.companyConfigsRequest.isRunning()&&this.companyConfigsRequest.cancel();this.companyConfigsRequest.url=this.companyConfigsRequest.options.url=this._cc_api;this.companyConfigsRequest.get()},getConfigOptions:function(){this._co_methodName="ui.leaveconfig.js -> getConfigOptions";this._co_api=Affinity.GetCacheSafePath(Affinity.apiroot+"config/options");this.configOptionsRequest&&this.configOptionsRequest.isRunning()&&this.configOptionsRequest.cancel();this.configOptionsRequest.url=this.configOptionsRequest.options.url=this._co_api;this.configOptionsRequest.get()},getAllConfigs:function(){this._ac_methodName="ui.leaveconfig.js -> ";this._ac_api=Affinity.GetCacheSafePath(Affinity.apiroot+"config/root");this.allConfigsRequest&&this.allConfigsRequest.isRunning()&&this.allConfigsRequest.cancel();this.allConfigsRequest.url=this.allConfigsRequest.options.url=this._ac_api;this.allConfigsRequest.get()},getConfigDetail:function(n){uialert({message:"Loading Configuration Detail",showLoader:!0,showButtons:!1,noClose:!1});this._cd_methodName="ui.leaveconfig.js -> getConfigDetail";this._cd_api=Affinity.GetCacheSafePath(Affinity.apiroot+"config/detail/"+n);this.configDetailRequest&&this.configDetailRequest.isRunning()&&this.configDetailRequest.cancel();this.configDetailRequest.url=this.configDetailRequest.options.url=this._cd_api;this.configDetailRequest.get()},CreateConfigHeader:function(n){var i={},f=n.parentElement.parentElement,s=n.getElement("span.configPriority").get("html"),r,u,e,t,o;i.parentId=f.id;i.PriorityOrder=s;r=n.getElement("select.configUserGroup");u=n.getElement("select.configLeaveCode");typeof r!="undefined"&&r!=null?(t=r.getElement("option:selected"),e=t.get("html"),e!=="All"&&(i.UserGroupId=t.id)):e=f.getElement("span.configUserGroup").get("html");typeof u!="undefined"&&u!=null?(t=u.getElement("option:selected"),o=t.get("html"),o!=="All"&&(i.LeaveCode=t.id)):o=f.getElement("span.configLeaveCode").get("html");uialert({message:"Saving Configuration",showLoader:!0,showButtons:!1,noClose:!1});this._methodName="ui.leaveconfig.js -> CreateConfigHeader";this._api=Affinity.GetCacheSafePath(Affinity.apiroot+"config/CreateHeader");this.createHeaderRequest&&this.createHeaderRequest.isRunning()&&this.createHeaderRequest.cancel();this.createHeaderRequest.url=this.createHeaderRequest.options.url=this._api;this.createHeaderRequest.post(JSON.stringify(i))},deleteConfig:function(n){uialert({message:"Removing Configuration",showLoader:!0,showButtons:!1,noClose:!1});this._methodName="ui.leaveconfig.js -> deleteConfig";this._api=Affinity.GetCacheSafePath(Affinity.apiroot+"config/deleteconfig/"+n.id);this.deleteConfigRequest&&this.deleteConfigRequest.isRunning()&&this.deleteConfigRequest.cancel();this.deleteConfigRequest.url=this.deleteConfigRequest.options.url=this._api;this.deleteConfigRequest.get()},getBoolean:function(n){return n===""?null:n==="true"},updateConfigDetail:function(n,t){var i={};i.Id=t;i.DisplayBalance=this.getBoolean(n.getElement(".DisplayBalance select").getElement("option:selected").value);i.CanApply=this.getBoolean(n.getElement(".CanApply select").getElement("option:selected").value);i.MandatoryReason=this.getBoolean(n.getElement(".MandatoryReason select").getElement("option:selected").value);i.AttachmentRequirement=n.getElement(".AttachmentRequirement select").getElement("option:selected").value;i.AttachmentLimit=n.getElement(".AttachmentLimit input").value;i.CanEditDayByDay=this.getBoolean(n.getElement(".CanEditDayByDay select").getElement("option:selected").value);i.LimitType=n.getElement(".LimitType select").getElement("option:selected").value;i.ActionOverLimit=n.getElement(".ActionOverLimit select").getElement("option:selected").value;i.LimitUnits=n.getElement(".LimitUnits input").value;i.DisplayTeamCalendar=this.getBoolean(n.getElement(".DisplayTeamCalendar select").getElement("option:selected").value);i.DefaultSalaryAdjCode=n.getElement(".DefaultSalaryAdjCode select option:selected").value;i.RequireApprovalForCancellation=n.getElement(".RequireApprovalForCancellation select option:selected").value;i.OverlapLeaveAction=n.getElement(".OverlapLeaveAction select option:selected").value;i.WorkscheduleLimitExclusions=n.getElement(".WorkscheduleLimitExclusions input").value;i.BalanceCalculationMethod=n.getElement(".BalanceCalculationMethod select option:selected").value;i.EnableLeaveEmailNotifications=this.getBoolean(n.getElement(".EnableLeaveEmailNotifications select").getElement("option:selected").value);uialert({message:"Updating config detail",showLoader:!0,showButtons:!1,noClose:!1});this._methodName="ui.leaveconfig.js -> updateConfigDetail";this._api=Affinity.GetCacheSafePath(Affinity.apiroot+"config/Detail/"+t);this.updateConfigDetailRequest&&this.updateConfigDetailRequest.isRunning()&&this.updateConfigDetailRequest.cancel();this.updateConfigDetailRequest.url=this.updateConfigDetailRequest.options.url=this._api;this.updateConfigDetailRequest.post(JSON.stringify(i))},updateConfigPriority:function(n,t){uialert({message:"Updating priority",showLoader:!0,showButtons:!1,noClose:!1});var i={};i.FieldName="PriorityOrder";i.NewValue=t;i.OldValue=null;this._methodName="ui.leaveconfig.js -> updateConfigPriority";this._api=Affinity.GetCacheSafePath(Affinity.apiroot+"config/updateheader/"+n);this.updateConfigPriorityRequest&&this.updateConfigPriorityRequest.isRunning()&&this.updateConfigPriorityRequest.cancel();this.updateConfigPriorityRequest.url=this.updateConfigPriorityRequest.options.url=this._api;this.updateConfigPriorityRequest.post(JSON.stringify(i))},renderCompanyConfigs:function(n){var u;Affinity.modal.show();Affinity.modal.clear();Affinity.modal.position();var i=new Element("div",{"class":"modal-data leaveCompanyConfig"}),f=new Element("div",{"class":"section shadow"}).inject(i),t=new Element("div",{"class":"section-body"}).inject(f),e=new Element("div",{"class":"section-title",html:"Company Configuration"}).inject(t),r=new Element("div",{"class":"default-form"}).inject(t);n.length==0&&r.set("html","No custom configurations set");Array.each(n,function(n){var t=new Element("div",{"class":"form-row "+n.Name}).inject(r);new Element("label",{html:n.Name}).inject(t);new Element("span",{html:n.Value}).inject(t)});u=new Element("div",{"class":"blue button details-close-leave-button",html:"Close"}).inject(t);u.addEvent("click",function(){Affinity.modal.closeButtonCloser()});Affinity.modal.setElement(i)},renderConfigDetail:function(n,t){var i=this.detailValues,u,f,r;i.empty();u=t.getElement(".detailHeader span.detailUserGroup");f=t.getElement(".detailHeader span.detailLeaveCode");u.set("html",n.UserGroupName);f.set("html",n.LeaveCodeDescription);new Element("div",{"class":"section-title",html:"Balances"}).inject(i);this.renderSelectRow(i,[{val:"Entitlement",txt:"Entitlement"},{val:"EntitlementAccrual",txt:"Entitlement + Accrual"},{val:"EntitlementAccrualApproved",txt:"Entitlement + Accrual - Approved"},{val:"EntitlementAccrualApprovedPending",txt:"Entitlement + Accrual - Approved - Pending"},],"BalanceCalculationMethod",n.BalanceCalculationMethodDisplayName,n.BalanceCalculationMethod,n.ParentBalanceCalculationMethod,"val","txt");this.renderCheckboxRow(i,"DisplayBalance",n.DisplayBalanceDisplayName,n.DisplayBalance,n.ParentDisplayBalance);new Element("div",{"class":"section-title",html:"General"}).inject(i);this.renderCheckboxRow(i,"CanApply",n.CanApplyDisplayName,n.CanApply,n.ParentCanApply);this.renderCheckboxRow(i,"MandatoryReason",n.MandatoryReasonDisplayName,n.MandatoryReason,n.ParentMandatoryReason);this.renderSelectRow(i,["None",{val:"TotalUnitsLimit",txt:"Total Units Limit"},"Mandatory",],"AttachmentRequirement",n.AttachmentRequirementDisplayName,n.AttachmentRequirement,n.ParentAttachmentRequirement,"val","txt");this.renderTextInputRow(i,"AttachmentLimit",n.AttachmentLimitDisplayName,n.AttachmentLimit,n.ParentAttachmentLimit);this.renderCheckboxRow(i,"CanEditDayByDay",n.CanEditDayByDayDisplayName,n.CanEditDayByDay,n.ParentCanEditDayByDay);this.renderCheckboxRow(i,"DisplayTeamCalendar",n.DisplayTeamCalendarDisplayName,n.DisplayTeamCalendar,n.ParentDisplayTeamCalendar);this.renderSelectRow(i,this.allDedCodeOptions,"DefaultSalaryAdjCode",n.DefaultSalaryAdjCodeDisplayName,n.DefaultSalaryAdjCode,n.ParentDefaultSalaryAdjCode,"Code","Description",!0);this.renderCheckboxRow(i,"RequireApprovalForCancellation",n.RequireApprovalForCancellationDisplayName,n.RequireApprovalForCancellation,n.ParentRequireApprovalForCancellation);this.renderCheckboxRow(i,"EnableLeaveEmailNotifications",n.EnableLeaveEmailNotificationsDisplayName,n.EnableLeaveEmailNotifications,n.ParentEnableLeaveEmailNotifications);new Element("div",{"class":"section-title",html:"Application"}).inject(i);r=[{val:"CurrentBalance",txt:"Current Balance"},{val:"FixedLimit",txt:"Fixed Limit"},"Unlimited",];(n.LeaveCode==="07"||n.LeaveCode==="09"||n.LeaveCode==="10"||n.LeaveCode==="11"||n.LeaveCode==="12"||n.LeaveCode==="13")&&r.splice(1,0,{val:"ProjectedBalance",txt:"Projected Balance"});this.renderSelectRow(i,r,"LimitType",n.LimitTypeDisplayName,n.LimitType,n.ParentLimitType,"val","txt");this.renderSelectRow(i,["Warning","Error"],"ActionOverLimit",n.ActionOverLimitDisplayName,n.ActionOverLimit,n.ParentActionOverLimit);this.renderTextInputRow(i,"LimitUnits",n.LimitUnitsDisplayName,n.LimitUnits,n.ParentLimitUnits);this.renderSelectRow(i,[{val:"NoAction",txt:"No Action"},"Warning","Error"],"OverlapLeaveAction",n.OverlapLeaveActionDisplayName,n.OverlapLeaveAction,n.ParentOverlapLeaveAction,"val","txt");this.renderTextInputRow(i,"WorkscheduleLimitExclusions",n.WorkscheduleLimitExclusionsDisplayName,n.WorkscheduleLimitExclusions,n.ParentWorkscheduleLimitExclusions);var e=new Element("div",{"class":"form-row detailButtonBox"}).inject(i),o=new Element("span",{"class":"button green saveDetail",html:"Save"}).addEvent(Affinity.events.click,function(){this.updateConfigDetail(i,n.Id)}.bind(this)).inject(e),s=new Element("span",{"class":"button red cancelDetail",html:"Cancel"}).addEvent("click",function(){this.getConfigDetail(n.Id)}.bind(this)).inject(e);return i.inject(t),t.removeClass("hidden"),!0},renderSelectRow:function(n,t,i,r,u,f,e,o,s){var c=new Element("div",{"class":"form-row"}).inject(n),h,l;c.addClass(i);new Element("label",{html:r}).inject(c);h=new Element("select",{name:i}).inject(c);new Element("option",{value:"",html:""}).inject(h);Array.each(t,function(n,t){var i=n,r=n;typeOf(n)=="object"&&(i=n[o]||"",r=n[e],i==""?i=r:s&&(i="{value} ({text})".substitute({value:r,text:i})));new Element("option",{value:r,html:i}).inject(h);r===u&&(h.selectedIndex=t+1)});i=="BalanceCalculationMethod"&&f==null&&h[0].destroy();l=new Element("div",{"class":"default-config-value"});new Element("label",{html:"Default"}).inject(l);new Element("span",{html:f}).inject(l);l.inject(c)},renderCheckboxRow:function(n,t,i,r,u){var o=new Element("div",{"class":"form-row "+t}).inject(n),f,s,e;new Element("label",{html:i}).inject(o);f=new Element("select",{name:t}).inject(o);new Element("option",{value:"",html:""}).inject(f);new Element("option",{value:"true",html:"Yes"}).inject(f);new Element("option",{value:"false",html:"No"}).inject(f);f.selectedIndex=r==null?0:r.toLowerCase()==="true"?1:2;s=u==null?"":u.toLowerCase()==="true"?"Yes":"No";e=new Element("div",{"class":"default-config-value"});new Element("label",{html:"Default"}).inject(e);new Element("span",{html:s}).inject(e);e.inject(o)},renderTextInputRow:function(n,t,i,r,u){var e=new Element("div",{"class":"form-row "+t}).inject(n),o,f;new Element("label",{html:i}).inject(e);o=new Element("input",{type:"text","class":"data-hj-whitelist",value:r}).inject(e);f=new Element("div",{"class":"default-config-value"});new Element("label",{html:"Default","class":""}).inject(f);new Element("span",{html:u}).inject(f);f.inject(e)},renderConfigHeaderRecursive:function(n,t){var r=new Element("div",{"class":"config",id:n.Id}).addEvent("click",function(t){t.stopPropagation();this.getConfigDetail(n.Id)}.bind(this)).inject(t),i=this.renderConfigElements(r,n);return n.Children.length>0?Array.each(n.Children,function(n){this.renderConfigHeaderRecursive(n,i)}.bind(this)):i.hide(),!0},renderConfigElements:function(n,t){var i=new Element("div",{"class":"configParent ui-has-tooltip","data-tooltip":"Click to view/edit details","data-tooltip-dir":"top,center"}),h=new Element("span",{"class":"configPriority",html:t.PriorityOrder}).inject(i),c=new Element("span",{"class":"configUserGroup",html:t.UserGroupName}).inject(i),l=new Element("span",{"class":"configLeaveCode",html:t.LeaveCodeDescription}).inject(i),r=new Element("span",{"class":"configActions"}).inject(i),u=new Element("div",{"class":"configChildren"}),s,f,e,o;return t.UserGroupName==="All"||t.LeaveCodeDescription==="All"?(s=new Element("span",{"class":"green button addChild w-icon-only ui-has-tooltip","data-tooltip":"Add a child config","data-tooltip-dir":"top,center"}).addEvent(Affinity.events.click,function(t){t.stopPropagation();this.createNewConfig(n,u)}.bind(this)).inject(r),new Element("span",{html:Affinity.icons.Plus}).inject(s)):r.set("style","padding-left : 36px"),t.Id!=1?(f=new Element("span",{"class":"red button remove w-icon-only ui-has-tooltip","data-tooltip":"Remove config and children","data-tooltip-dir":"top,center"}).inject(r),new Element("span",{html:Affinity.icons.Trash}).inject(f),f.addEvent(Affinity.events.click,function(t){t.stopPropagation();this.deleteConfig(n)}.bind(this)),e=new Element("span",{"class":"blue button higherPriority w-icon-only ui-has-tooltip","data-tooltip":"Lower Priority","data-tooltip-dir":"top,center"}).inject(r),new Element("span",{html:Affinity.icons.ArrowDown}).inject(e),e.addEvent(Affinity.events.click,function(n){n.stopPropagation();this.updateConfigPriority(t.Id,t.PriorityOrder+1)}.bind(this)),o=new Element("span",{"class":"blue button lowerPriority w-icon-only ui-has-tooltip","data-tooltip":"Higher priority","data-tooltip-dir":"top,center"}).inject(r),new Element("span",{html:Affinity.icons.ArrowUp}).inject(o),o.addEvent(Affinity.events.click,function(n){n.stopPropagation();this.updateConfigPriority(t.Id,t.PriorityOrder-1)}.bind(this))):h.set("html","Default"),i.inject(n),u.inject(n),u},createNewConfig:function(n,t){var i=new Element("div",{"class":"config"}).addEvent(Affinity.events.click,function(n){n.stopPropagation()}),c=t.children.length+1,v=new Element("span",{"class":"configPriority",html:c}).inject(i),e=n.getElement(".configUserGroup").get("html"),o=n.getElement(".configLeaveCode").get("html"),r,l,u,a,f,s,h;e==="All"?(r=new Element("select",{"class":"configUserGroup"}).inject(i),new Element("option",{value:0,html:"All"}).inject(r),Array.each(this.userGroupOptions,function(n,t){new Element("option",{id:n.Id,value:t,html:n.Name}).inject(r)}.bind(this))):l=new Element("span",{"class":"configUserGroup",html:e}).inject(i);o==="All"?(u=new Element("select",{"class":"configLeaveCode"}).inject(i),new Element("option",{value:0,html:"All"}).inject(u),Array.each(this.leaveCodeOptions,function(n,t){new Element("option",{id:n.Code,value:t,html:n.Description}).inject(u)})):a=new Element("span",{"class":"configLeaveCode",html:o}).inject(i);f=new Element("span",{"class":"configActions"}).inject(i);s=new Element("span",{"class":"green button",html:"Save"}).inject(f);s.addEvent(Affinity.events.click,function(){this.CreateConfigHeader(i)}.bind(this));h=new Element("span",{"class":"red button",html:"Cancel"}).inject(f);h.addEvent(Affinity.events.click,function(){i.destroy();t.children.length==0&&t.hide()});i.inject(t);t.show()},deleteConfigRows:function(){Array.each(this.target.getElements("div.config"),function(n){Array.each(n.getElements(".button"),function(n){n.removeEvents()});n.removeEvents();n.destroy()})},reset:function(){this.configOptionsRequest&&this.configOptionsRequest.isRunning()&&this.configOptionsRequest.cancel();this.allConfigsRequest&&this.allConfigsRequest.isRunning()&&this.allConfigsRequest.cancel();this.configDetailRequest&&this.configDetailRequest.isRunning()&&this.configDetailRequest.cancel();this.createHeaderRequest&&this.createHeaderRequest.isRunning()&&this.createHeaderRequest.cancel();this.deleteConfigRequest&&this.deleteConfigRequest.isRunning()&&this.deleteConfigRequest.cancel();this.updateConfigDetailRequest&&this.updateConfigDetailRequest.isRunning()&&this.updateConfigDetailRequest.cancel();this.updateConfigPriorityRequest&&this.updateConfigPriorityRequest.isRunning()&&this.updateConfigPriorityRequest.cancel();this.deleteConfigRows();this.detailValues.empty()},destroy:function(){this.reset()}})