(function(e){function t(t){for(var s,o,n=t[0],l=t[1],u=t[2],c=0,m=[];c<n.length;c++)o=n[c],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&m.push(a[o][0]),a[o]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);d&&d(t);while(m.length)m.shift()();return i.push.apply(i,u||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],s=!0,n=1;n<r.length;n++){var l=r[n];0!==a[l]&&(s=!1)}s&&(i.splice(t--,1),e=o(o.s=r[0]))}return e}var s={},a={app:0},i=[];function o(t){if(s[t])return s[t].exports;var r=s[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=s,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(r,s,function(t){return e[t]}.bind(null,s));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],l=n.push.bind(n);n.push=t,n=n.slice();for(var u=0;u<n.length;u++)t(n[u]);var d=l;i.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"56d7":function(e,t,r){"use strict";r.r(t);var s=r("2b0e"),a=function(){var e=this,t=e._self._c;return t("router-view")},i=[],o=r("2877"),n={},l=Object(o["a"])(n,a,i,!1,null,null,null),u=l.exports,d=r("8c4f"),c=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"login-underlay",attrs:{id:"login-underlay"}},[t("Header"),t("Footer")],1),t("div",{staticClass:"login"},[t("div",{staticClass:"login-box-bg hidden",attrs:{id:"login-box-bg"}}),t("div",{staticClass:"login-box-wrapper"},[t("div",{staticClass:"login-box smaller",attrs:{id:"login-box"}},[t("div",{staticClass:"box-title"},[e._v(" Login ")]),t("div",{staticClass:"box-body"},[t("div",{staticClass:"errormsg",domProps:{innerHTML:e._s(this.error)}}),t("form",{on:{submit:function(t){return t.preventDefault(),e.handleFormSubmit.apply(null,arguments)}}},[t("fieldset",[t("div",{staticClass:"errormsg hidden"},[e._v("We could not log you in")]),t("div",{staticClass:"login-box-row label"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.userName,expression:"userName"}],attrs:{type:"text",id:"username",name:"username",autocomplete:"off",placeholder:"Username or email"},domProps:{value:e.userName},on:{change:e.checkEmail,input:function(t){t.target.composing||(e.userName=t.target.value)}}}),t("div",{directives:[{name:"tooltip",rawName:"v-tooltip",value:e.usernameHelp,expression:"usernameHelp"}],staticClass:"username-question"},[t("span",{staticClass:"icon-help-round"})])]),e.showEmailUsers?t("div",{staticClass:"login-box-row label"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.emailUser,expression:"emailUser"}],attrs:{id:"emailuser",name:"emailuser"},on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.emailUser=t.target.multiple?r:r[0]}}},[t("option",{attrs:{value:"null",disabled:"",selected:""}},[e._v("Username and company")]),e._l(e.availableEmailUsers,(function(r){return t("option",{key:r.UserName,domProps:{value:r.UserName}},[e._v(" "+e._s(r.UserName)+", "+e._s(r.CompanyName)+" ("+e._s(r.CompanyNumber)+") ")])}))],2)]):e._e(),t("div",{staticClass:"login-box-row label"},[t("input",{ref:"password",attrs:{type:"password",id:"password",name:"password",autocomplete:"off",placeholder:"Password"}})]),t("div",{staticClass:"login-box-row buttons"},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"loader"}),t("input",{directives:[{name:"show",rawName:"v-show",value:!e.loading,expression:"!loading"}],staticClass:"button green",attrs:{type:"submit",value:"Login",id:"loginButton"}})]),t("div",{staticClass:"login-box-row buttons"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.rememberMe,expression:"rememberMe"}],attrs:{type:"checkbox",id:"rememberMe",name:"rememberMe"},domProps:{checked:Array.isArray(e.rememberMe)?e._i(e.rememberMe,null)>-1:e.rememberMe},on:{change:function(t){var r=e.rememberMe,s=t.target,a=!!s.checked;if(Array.isArray(r)){var i=null,o=e._i(r,i);s.checked?o<0&&(e.rememberMe=r.concat([i])):o>-1&&(e.rememberMe=r.slice(0,o).concat(r.slice(o+1)))}else e.rememberMe=a}}}),t("label",{attrs:{for:"rememberMe"}},[e._v("Remember my username")])]),t("div",{staticClass:"login-box-row buttons stacked"},[t("router-link",{attrs:{to:{path:"/Recover",query:{redirectUrl:e.redirectUrl}}}},[e._v(" I have forgotten my password ")])],1)])])])])]),t("CitrixLogin")],1)])},m=[],p=function(){var e=this;e._self._c;return e._m(0)},h=[function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"citrixlogin"}},[t("a",{attrs:{href:"https://citrix.affinitylogon.com/"}},[e._v("Affinity Desktop User Login")])])}],v={name:"CitrixLogin"},f=v,g=Object(o["a"])(f,p,h,!1,null,null,null),w=g.exports,b=function(){var e=this;e._self._c;return e._m(0)},y=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"login-underlay-header"},[t("div",{staticClass:"companylogo"},[t("img",{attrs:{alt:"",src:"https://cdn.jsdelivr.net/gh/affinityteam/www-assets/v1/images/logo/affinity1_300_90.png"}})]),t("div",{staticClass:"heading"},[e._v("Affinity Self Service")]),t("div",{staticClass:"heading mobile"},[e._v("Self Service")])])}],A={name:"Header"},P=A,C=Object(o["a"])(P,b,y,!1,null,null,null),E=C.exports,U=function(){var e=this;e._self._c;return e._m(0)},x=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"login-underlay-footer"},[t("img",{attrs:{alt:"",src:"data:image/png;base64,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"}})])}],S={name:"Footer"},N=S,T=Object(o["a"])(N,U,x,!1,null,null,null),R=T.exports,_={name:"Login",props:["errorMsg"],components:{CitrixLogin:w,Header:E,Footer:R},data(){return{usernameHelp:"This can be your username, email, or membership number (but not your surname).",error:this.errorMsg||"",loading:!1,userName:"",availableEmailUsers:null,rememberMe:!1,redirectUrl:"",emailUser:null}},computed:{showEmailUsers(){return this.availableEmailUsers&&this.availableEmailUsers.length>1}},methods:{populatePage(){this.loading=!0,"undefined"!=typeof this.$route.query&&"undefined"!=typeof this.$route.query.redirectUrl&&(this.redirectUrl=this.$route.query.redirectUrl),this.$ajax.post("/auth/PopulatePage",{RedirectUrl:this.redirectUrl}).then(e=>{if("undefined"!=typeof e.data){if(e.data.Error)this.error=e.data.Error;else if(e.data.ClientRedirect&&e.data.RedirectUrl)window.location.href=e.data.RedirectUrl;else if(null!=e.data.RedirectPage){var t={};"SetupQuestions"==e.data.RedirectPage&&e.data.Questions.length&&(t={questions:e.data.Questions}),this.$router.push({name:e.data.RedirectPage,params:t,query:{redirectUrl:e.data.RedirectUrl}})}e.data.RememberMe&&e.data.UserName&&(this.userName=e.data.UserName,this.rememberMe=!0),null!=e.data.EmailUsers&&null!=e.data.EmailUsers.Users&&(this.availableEmailUsers=e.data.EmailUsers.Users)}}).catch(()=>{}).then(()=>{this.loading=!1})},checkEmail(){let e=this.userName;e&&this.$validateEmail(e)&&(this.loading=!0,this.$ajax.get("/auth/CheckEmail",{params:{email:e}}).then(e=>{this.userName==e.data.EmailAddress&&(this.availableEmailUsers=e.data.Users)}).catch().then(()=>{this.loading=!1}))},handleFormSubmit(){let e={redirectUrl:this.redirectUrl,userName:this.userName,password:this.$refs.password.value,rememberMe:this.rememberMe,emailUser:this.emailUser};this.error="",""==e.userName&&""==e.password?this.error="Username and Password cannot be blank.":""==e.userName?this.error="Username cannot be blank.":""==e.password&&(this.error="Password cannot be blank."),""==this.error&&(this.loading=!0,this.$ajax.post("/auth/login",e).then(e=>{if("undefined"!=typeof e.data)if(null!=e.data.Error)this.error=e.data.Error;else if(e.data.ClientRedirect&&e.data.RedirectUrl.length)window.location.href=e.data.RedirectUrl;else if(e.data.RedirectPage.length){var t={};"SetupQuestions"==e.data.RedirectPage&&e.data.Questions.length&&(t={questions:e.data.Questions}),this.$router.push({name:e.data.RedirectPage,params:t,query:{redirectUrl:e.data.RedirectUrl}})}}).catch(()=>{}).then(()=>{this.loading=!1}))}},mounted(){this.populatePage()}},q=_,O=Object(o["a"])(q,c,m,!1,null,null,null),k=O.exports,D=function(){var e=this,t=e._self._c;return t("setup",{attrs:{title:"Setup Your Email",error:e.error}},[t("form",{staticClass:"card-body",attrs:{method:"post"},on:{submit:function(t){return t.preventDefault(),e.handleFormSubmit.apply(null,arguments)}}},[t("div",{staticClass:"default-form w-border",staticStyle:{"text-align":"left",margin:"auto"}},[t("div",{staticClass:"form-row"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.WorkEmail,expression:"WorkEmail"}],staticClass:"long",attrs:{type:"text",placeholder:"Enter Work Email (optional)"},domProps:{value:e.WorkEmail},on:{input:function(t){t.target.composing||(e.WorkEmail=t.target.value)}}})]),t("div",{staticClass:"form-row"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.HomeEmail,expression:"HomeEmail"}],staticClass:"long",attrs:{type:"text",placeholder:"Enter Personal Email (optional)"},domProps:{value:e.HomeEmail},on:{input:function(t){t.target.composing||(e.HomeEmail=t.target.value)}}})]),t("div",{staticClass:"form-row",staticStyle:{"text-align":"center"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"spinner small light"}),t("input",{directives:[{name:"show",rawName:"v-show",value:!e.loading,expression:"!loading"}],staticClass:"button large blue",attrs:{type:"submit",value:"Continue"}})])])])])},L=[],I=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"login-underlay",attrs:{id:"login-underlay"}},[t("Header"),t("Footer")],1),t("div",{staticClass:"absolut-full content errorpage"},[t("div",{staticClass:"section setup-body"},[t("div",{staticClass:"section-body"},[t("div",{staticClass:"setup-content"},[t("h1",{directives:[{name:"show",rawName:"v-show",value:!e.hidePageTitle,expression:"!hidePageTitle"}]},[e._v(" "+e._s(e.title)+" ")]),e.success?t("div",{},[t("p",{staticStyle:{color:"#44ec72"}},[e._v(e._s(e.success))])]):e._e(),e.error?t("div",{},[t("p",{staticStyle:{color:"red"},domProps:{innerHTML:e._s(e.error)}})]):e._e(),t("div",{},[e._t("default")],2)])])])])])},$=[],j={name:"Setup",components:{Header:E,Footer:R},props:["title","error","hidePageTitle","success"],mounted(){}},H=j,Q=Object(o["a"])(H,I,$,!1,null,null,null),F=Q.exports,V={name:"Emails",components:{Setup:F},data(){return{error:"",loading:!1,redirectUrl:"",WorkEmail:"",HomeEmail:""}},methods:{handleFormSubmit(){let e={redirectUrl:this.redirectUrl,HomeEmail:this.HomeEmail,WorkEmail:this.WorkEmail};this.error="","undefined"!=typeof e.WorkEmail&&e.WorkEmail.length&&!this.$validateEmail(e.WorkEmail)?this.error="Work email is not valid.":"undefined"!=typeof e.HomeEmail&&e.HomeEmail.length&&!this.$validateEmail(e.HomeEmail)&&(this.error="Personal email is not valid."),""==this.error&&(this.loading=!0,this.$ajax.post("/Setup/Emails",e).then(e=>{if("undefined"!=typeof e.data)if(null!=e.data.Error)this.error=e.data.Error;else if(e.data.ClientRedirect&&e.data.RedirectUrl.length)window.location.href=e.data.RedirectUrl;else if(null!=e.data.RedirectPage){var t=null!=e.data.RedirectUrl?{redirectUrl:e.data.RedirectUrl}:{};this.$router.push({name:e.data.RedirectPage,query:t})}}).catch(()=>{}).then(()=>{this.loading=!1}))}},mounted(){"undefined"!=typeof this.$route.query&&"undefined"!=typeof this.$route.query.redirectUrl&&(this.redirectUrl=this.$route.query.redirectUrl)}},M=V,z=Object(o["a"])(M,D,L,!1,null,null,null),W=z.exports,Y=function(){var e=this,t=e._self._c;return t("setup",{attrs:{title:"Reset Your Password",error:e.error,hidePageTitle:e.hidePageTitle}},[t("form",{staticClass:"card-body",attrs:{method:"post"},on:{submit:function(t){return t.preventDefault(),e.handleFormSubmit.apply(null,arguments)}}},[t("div",{staticClass:"default-form w-border",staticStyle:{"text-align":"center",margin:"auto"}},[t("div",{staticClass:"form-row"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.userName,expression:"userName"},{name:"show",rawName:"v-show",value:!e.hideInput,expression:"!hideInput"}],staticClass:"long",attrs:{type:"text",autocomplete:"off",placeholder:"Username or email"},domProps:{value:e.userName},on:{input:[function(t){t.target.composing||(e.userName=t.target.value)},e.checkEmail]}})]),e.showEmailUsers?t("div",{staticClass:"form-row label"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.emailUser,expression:"emailUser"}],staticStyle:{width:"500px","box-sizing":"content-box"},attrs:{id:"emailuser",name:"emailuser"},on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.emailUser=t.target.multiple?r:r[0]}}},[t("option",{attrs:{value:"null",disabled:"",selected:""}},[e._v(" Username and company ")]),e._l(e.availableEmailUsers,(function(r){return t("option",{key:r.EmployeeNumber,domProps:{value:r.UserName}},[e._v(" "+e._s(r.UserName)+", "+e._s(r.CompanyName)+" ("+e._s(r.CompanyNumber)+") ")])}))],2)]):e._e(),t("div",{staticClass:"mt-4",staticStyle:{"text-align":"center"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"spinner small light"}),t("input",{directives:[{name:"show",rawName:"v-show",value:!e.loading,expression:"!loading"}],staticClass:"button large blue",attrs:{type:"submit",value:"Continue"}})])])])])},B=[],G={name:"Recover",data(){return{error:"",loading:!1,userName:"",redirectUrl:"",availableEmailUsers:null,instructionsMessage:"",hideInput:!1,emailUser:null,hidePageTitle:!1}},components:{Setup:F},computed:{showEmailUsers(){return this.availableEmailUsers&&this.availableEmailUsers.length>1}},methods:{handleFormSubmit(){let e={redirectUrl:this.redirectUrl,userName:this.userName,emailUser:this.emailUser,targetPath:this.$route.path};this.error="",""==e.userName&&(this.error="Username cannot be blank."),""==this.error&&(this.loading=!0,this.$ajax.post("/Password/Recover",e).then(e=>{if(e.data)if(e.data.Error)this.error=e.data.Error;else{const t=!!e.data.email||!e.data.mobileNumber&&null;if(e.data.hasCompleteAnswers||null!==t){const r={sentToEmail:t,email:e.data.email,mobileNumber:e.data.mobileNumber,token:e.data.token};this.$router.push({name:null==t?"VerifyAnswer":"OTP",params:r})}else this.$router.push({name:"Login",params:{errorMsg:"Your email, phone number and security questions are not set up. Please contact your admin to reset your password."},query:this.redirectUrl?{redirectUrl:this.redirectUrl}:void 0})}}).finally(()=>{this.loading=!1}))},validateEmail(e){var t=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(String(e).toLowerCase())},checkEmail(){let e=this.userName;e&&this.validateEmail(e)&&(this.loading=!0,this.$ajax.get("/auth/CheckEmail",{params:{email:e}}).then(e=>{this.userName==e.data.EmailAddress&&(this.availableEmailUsers=e.data.Users),this.error=""}).catch().then(()=>{this.loading=!1}))},verifyToken(e,t){this.hideInput=!0,this.loading=!0,this.hidePageTitle=!0;let r={token:e,userId:t,redirectUrl:this.redirectUrl};this.$ajax.post("/Password/VerifyToken",r).then(e=>{"undefined"!=typeof e.data&&(null!=e.data.Error?this.error=e.data.Error:null!=e.data.RedirectPage&&(this.instructionsMessage=e.data.InstructionsMessage,this.$router.push({name:e.data.RedirectPage,query:{redirectUrl:this.redirectUrl}})))}).catch(()=>{}).then(()=>{this.loading=!1})}},mounted(){this.$route.query,this.redirectUrl=this.$route.query.redirectUrl||"","undefined"!=typeof this.$route.query.token&&"undefined"!=typeof this.$route.query.userId&&this.verifyToken(this.$route.query.token,this.$route.query.userId)}},X=G,Z=Object(o["a"])(X,Y,B,!1,null,null,null),K=Z.exports,J=function(){var e=this,t=e._self._c;return t("setup",{attrs:{title:"Setup Password",error:e.error}},[t("form",{staticClass:"card-body",attrs:{method:"post"},on:{submit:function(t){return t.preventDefault(),e.handleFormSubmit.apply(null,arguments)}}},[t("passwordPage",{attrs:{loading:e.loading},model:{value:e.output,callback:function(t){e.output=t},expression:"output"}})],1)])},ee=[],te={name:"SetupPassword",data(){return{error:"",loading:!1,redirectUrl:"",output:{password:"",confirmPassword:""}}},components:{Setup:F},methods:{handleFormSubmit(){let e={redirectUrl:this.redirectUrl,password:this.output.password,confirmPassword:this.output.confirmPassword};this.error="",""==e.password&&""==e.confirmPassword?this.error="Password fields cannot be blank.":""==e.confirmPassword?this.error="Confirm Password field cannot be blank.":""==e.password?this.error="Password field cannot be blank.":e.password!=e.confirmPassword&&(this.error="Password fields do not match."),""==this.error&&(this.loading=!0,this.$ajax.post("/Setup/Password",e).then(e=>{if("undefined"!=typeof e.data)if(null!=e.data.Error)this.error=e.data.Error;else if(e.data.ClientRedirect&&e.data.RedirectUrl.length)window.location.href=e.data.RedirectUrl;else if(null!=e.data.RedirectPage){var t=null!=e.data.RedirectUrl?{redirectUrl:e.data.RedirectUrl}:{};this.$router.push({name:e.data.RedirectPage,query:t})}}).catch(()=>{}).then(()=>{this.loading=!1}))}},mounted(){"undefined"!=typeof this.$route.query&&"undefined"!=typeof this.$route.query.redirectUrl&&(this.redirectUrl=this.$route.query.redirectUrl)}},re=te,se=Object(o["a"])(re,J,ee,!1,null,null,null),ae=se.exports,ie=function(){var e=this,t=e._self._c;return t("setup",{attrs:{title:"Setup Security Questions",error:e.error}},[t("form",{staticClass:"card-body",attrs:{method:"post",id:"form-questions-setup"},on:{submit:function(t){return t.preventDefault(),e.handleFormSubmit.apply(null,arguments)}}},[t("div",{staticClass:"default-form w-border",staticStyle:{"text-align":"left",margin:"auto"}},[e._l(e.answers,(function(r){return t("div",{key:r,staticStyle:{display:"inline-block"}},[t("div",{staticClass:"title-row section-title"},[e._v(" Question "+e._s(r.count)+" ")]),t("div",{staticClass:"form-row"},[t("select",{directives:[{name:"model",rawName:"v-model",value:r.questionId,expression:"answer.questionId"}],staticClass:"long",on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(r,"questionId",t.target.multiple?s:s[0])}}},e._l(e.questionList,(function(r){return t("option",{key:r,domProps:{value:r.Value}},[e._v(" "+e._s(r.Text)+" ")])})),0)]),t("div",{staticClass:"form-row"},[t("input",{directives:[{name:"model",rawName:"v-model",value:r.value,expression:"answer.value"}],staticClass:"long",attrs:{type:"text"},domProps:{value:r.value},on:{input:function(t){t.target.composing||e.$set(r,"value",t.target.value)}}})])])})),t("div",{staticClass:"form-row",staticStyle:{"text-align":"center"}},[t("div",{staticClass:"mt-4"},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"spinner small light"}),t("input",{directives:[{name:"show",rawName:"v-show",value:!e.loading,expression:"!loading"}],staticClass:"button large blue",attrs:{type:"submit",value:"Continue"}})])])],2)])])},oe=[],ne=(r("caad"),{name:"SetupQuestions",props:["questions"],components:{Setup:F},data(){return{error:"",loading:!1,questionList:this.questions,redirectUrl:"",data:{},answers:{answer1:{count:"1",questionId:1,value:""},answer2:{count:"2",questionId:1,value:""},answer3:{count:"3",questionId:1,value:""}}}},methods:{handleFormSubmit(){let e=Object.assign({},this.answers);e.redirectUrl=this.redirectUrl,this.error="";let t=[];for(var r in this.answers)if(this.answers.hasOwnProperty(r)){if(""==this.answers[r].value){this.error="All answers must be filled out.";break}if(t.includes(this.answers[r].questionId)){this.error="You need to select and answer three different questions.";break}t.push(this.answers[r].questionId)}""==this.error&&(this.loading=!0,this.$ajax.post("/Setup/Questions",e).then(e=>{"undefined"!=typeof e.data&&(null!=e.data.Error?this.error=e.data.Error:e.data.ClientRedirect&&e.data.RedirectUrl.length?window.location.href=e.data.RedirectUrl:null!=e.data.RedirectPage&&this.$router.push({name:e.data.RedirectPage,query:{redirectUrl:e.data.RedirectUrl}}))}).catch(()=>{}).then(()=>{this.loading=!1}))},populatePage(){this.loading=!0,this.$ajax.get("/Setup/Questions").then(e=>{"undefined"!=typeof e.data&&(null!=e.data.Error?this.error=e.data.Error:null!=e.data.Questions&&(this.questionList=e.data.Questions))}).catch(()=>{}).then(()=>{this.loading=!1})}},mounted(){null==this.questionList&&this.populatePage(),"undefined"!=typeof this.$route.query&&"undefined"!=typeof this.$route.query.redirectUrl&&(this.redirectUrl=this.$route.query.redirectUrl)}}),le=ne,ue=Object(o["a"])(le,ie,oe,!1,null,null,null),de=ue.exports,ce=function(){var e=this,t=e._self._c;return t("setup",{attrs:{title:"Answer Security Questions",error:e.error}},[t("form",{staticClass:"card-body",attrs:{method:"post",id:"form-questions-setup"},on:{submit:function(t){return t.preventDefault(),e.handleFormSubmit.apply(null,arguments)}}},[t("div",{staticClass:"default-form w-border",staticStyle:{margin:"0 auto","text-align":"left"}},[t("div",{staticClass:"title-row section-title",staticStyle:{"text-align":"center"}},[e._v(" "+e._s(e.userInfo)+" ")]),e._l(e.questionList,(function(r,s){return t("div",{key:r.id,staticClass:"form-row security-question"},[t("span",[e._v(" "+e._s(r.Text)+" ")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.questionList[s].Id,expression:"questionList[index].Id"}],attrs:{type:"hidden"},domProps:{value:e.questionList[s].Id},on:{input:function(t){t.target.composing||e.$set(e.questionList[s],"Id",t.target.value)}}}),t("input",{directives:[{name:"model",rawName:"v-model",value:e.questionList[s].Text,expression:"questionList[index].Text"}],attrs:{type:"hidden"},domProps:{value:e.questionList[s].Text},on:{input:function(t){t.target.composing||e.$set(e.questionList[s],"Text",t.target.value)}}}),t("input",{directives:[{name:"model",rawName:"v-model",value:e.questionList[s].AnswerId,expression:"questionList[index].AnswerId"}],attrs:{type:"hidden"},domProps:{value:e.questionList[s].AnswerId},on:{input:function(t){t.target.composing||e.$set(e.questionList[s],"AnswerId",t.target.value)}}}),t("input",{directives:[{name:"model",rawName:"v-model",value:e.questionList[s].AnswerText,expression:"questionList[index].AnswerText"}],staticClass:"long",attrs:{type:"text"},domProps:{value:e.questionList[s].AnswerText},on:{input:function(t){t.target.composing||e.$set(e.questionList[s],"AnswerText",t.target.value)}}})])})),t("div",{staticClass:"form-row",staticStyle:{"text-align":"center"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"spinner small light"}),t("input",{directives:[{name:"show",rawName:"v-show",value:!e.loading,expression:"!loading"}],staticClass:"button large blue",attrs:{type:"submit",value:"Continue"}})]),t("div",{directives:[{name:"show",rawName:"v-show",value:null!==e.sentToEmail,expression:"sentToEmail !== null"}],staticClass:"form-row",staticStyle:{"text-align":"center"}},[t("button",{staticClass:"button large green",on:{click:e.handleGoToOTP}},[e._v(" Back to OTP ")])])],2)])])},me=[],pe=r("bc3a"),he=r.n(pe),ve={install(e,t){he.a.defaults.headers.common["X-Requested-With"]="XMLHttpRequest",t&&t.handleUnautorized&&he.a.interceptors.response.use(e=>e,e=>Promise.reject(e.response.data)),e.prototype.$ajax=he.a,e.ajax=he.a}};const fe={SUCCESS:"SUCCESS",FAILED:"FAILED",TOKEN_EXPIRED:"TOKEN_EXPIRED",EXPIRED:"EXPIRED",UNKNOWN_USER:"UNKNOWN_USER",BAD_REQUEST:"BAD_REQUEST",NOT_FOUND:"NOT_FOUND",SERVER_ERROR:"SERVER_ERROR"},ge=(e,t)=>{switch(e){case fe.FAILED:if("QUESTIONS"===t)return"You need to answer all three security questions correctly before your password can be reset.";if("PASSWORD"===t)return"Please complete all fields.";if("SEND_OTP"===t)return"Sending of OTP confirmation code has failed. Please try again later.";if("VERIFY_OTP"===t)return"You entered the wrong code. Please try again.";case fe.TOKEN_EXPIRED:return"You are away for several minutes.";case fe.EXPIRED:return"Confirmation code is already expired.";case fe.UNKNOWN_USER:return"You need to enter a valid username or email address.";case fe.BAD_REQUEST:return"Something went wrong. Please try again after 5 minutes.";case fe.SERVER_ERROR:return"Something went wrong. Please try again after 5 minutes.";default:return""}};var we={name:"VerifyAnswer",props:["redirectUrl","sentToEmail","email","mobileNumber","token","questions"],components:{Setup:F},data(){return{error:"",loading:!1,questionList:[],data:{},userInfo:""}},methods:{handleFormSubmit(){if(this.error="",this.questionList.forEach(e=>{""===e.AnswerText&&(this.error="All answers must be filled out.")}),""!=this.error)return;this.loading=!0;const e={Questions:this.questionList};this.$ajax.post("/Password/VerifyAnswers",e,{headers:{Authorization:this.token}}).then(e=>{const t=ge(e.data.result,"QUESTIONS");t?(this.error=t,this.loading=!1):e.data.verified&&this.$router.push({name:"SetNew",params:{redirectUrl:this.redirectUrl},query:{token:e.data.token}})}).then(e=>{const t=this;"UNATHORIZED"==e.result&&(this.error="Your session has expired! Redirecting you back to Forgot Password page.",setTimeout(()=>{t.$router.push({name:"Recover",query:this.redirectUrl?{redirectUrl:this.redirectUrl}:void 0})},5e3)),this.loading=!1})},handleGoToOTP(){const e={sentToEmail:this.sentToEmail,email:this.email,mobileNumber:this.mobileNumber,token:this.token};this.$router.push({name:"OTP",params:e})},populatePage(){this.loading=!0,this.$ajax.get("/Password/GetSecurityQuestions",{headers:{Authorization:this.token}}).then(e=>{"undefined"!=typeof e.data&&(e.data.error?this.error=e.data.errorMsg:e.data.Questions.length&&(this.questionList=e.data.Questions,this.userInfo=`${e.data.companyname} / ${e.data.firstname} ${e.data.lastname}`))}).catch(()=>{}).then(()=>{this.loading=!1})}},mounted(){this.token?this.populatePage():this.$router.push({name:"Recover",query:this.$route.query.redirectUrl?{redirectUrl:this.$route.query.redirectUrl}:void 0})}},be=we,ye=Object(o["a"])(be,ce,me,!1,null,null,null),Ae=ye.exports,Pe=function(){var e=this,t=e._self._c;return t("setup",{attrs:{title:"Reset Password",error:e.error,success:e.success}},[t("form",{staticClass:"card-body",attrs:{method:"post"},on:{submit:function(t){return t.preventDefault(),e.handleFormSubmit.apply(null,arguments)}}},[t("h3",[e._v(e._s(e.pageSubtitle))]),t("passwordPage",{attrs:{loading:e.loading},model:{value:e.output,callback:function(t){e.output=t},expression:"output"}})],1)])},Ce=[],Ee=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"default-form w-border",staticStyle:{"text-align":"left",margin:"auto"}},[t("div",{staticClass:"form-row"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.output.password,expression:"output.password"}],staticClass:"long",attrs:{type:"password",placeholder:"Enter your new password"},domProps:{value:e.output.password},on:{input:function(t){t.target.composing||e.$set(e.output,"password",t.target.value)}}})]),t("div",{staticClass:"form-row"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.output.confirmPassword,expression:"output.confirmPassword"}],staticClass:"long",attrs:{type:"password",placeholder:"Re-enter your new password"},domProps:{value:e.output.confirmPassword},on:{input:function(t){t.target.composing||e.$set(e.output,"confirmPassword",t.target.value)}}})]),t("div",{staticClass:"form-row",staticStyle:{"text-align":"center"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"spinner small light"}),t("input",{directives:[{name:"show",rawName:"v-show",value:!e.loading,expression:"!loading"}],staticClass:"button large blue",attrs:{type:"submit",value:"Continue"}})])])},Ue=[];let xe=s["a"].extend({name:"PasswordPage",props:["passwordVal","confirmPasswordVal","loading"],data(){return{output:{password:"",confirmPassword:""}}},watch:{"output.password":function(){this.$emit("input",this.output)},"output.confirmPassword":function(){this.$emit("input",this.output)}}});s["a"].component("passwordPage",xe);var Se=xe,Ne=Se,Te=Object(o["a"])(Ne,Ee,Ue,!1,null,null,null),Re=Te.exports,_e={name:"SetNew",props:["pageSubtitle","userId","redirectUrl"],components:{PasswordPage:Re},data(){return{error:"",loading:!1,token:"",success:"",output:{password:"",confirmPassword:""}}},components:{Setup:F},methods:{handleFormSubmit(){let e={Password:this.output.password,ConfirmPassword:this.output.confirmPassword,UserId:this.userId};if(this.error="",""==e.Password&&""==e.ConfirmPassword?this.error="Password fields cannot be blank.":""==e.ConfirmPassword?this.error="Confirm Password field cannot be blank.":""==e.Password?this.error="Password field cannot be blank.":e.Password!=e.ConfirmPassword&&(this.error="Password fields do not match."),""!=this.error)return;this.loading=!0;const t=this;this.$ajax.post("/Password/SetNew",e,{headers:{Authorization:this.token}}).then(e=>{"undefined"!=typeof e.data&&("FAILED"===e.data.result?(this.error=e.data.message,this.loading=!1):(this.success="You have successfully reset your password. You will be redirected to Login page in 5 seconds.",setTimeout(()=>{t.$router.push({name:"Login",query:this.redirectUrl?{redirectUrl:this.redirectUrl}:void 0})},5e3)))}).catch(e=>{"UNAUTHORIZED"===e.result?(this.error="Your session has expired! Redirecting you back to Forgot Password page.",setTimeout(()=>{t.$router.push({name:"Recover",query:this.redirectUrl?{redirectUrl:this.redirectUrl}:void 0})},5e3)):(this.loading=!1,this.error="This password reset has timed out. Go back to the login page and click I have forgotten my password.")})}},mounted(){this.token=this.$route.query.token||""}},qe=_e,Oe=Object(o["a"])(qe,Pe,Ce,!1,null,null,null),ke=Oe.exports,De=function(){var e=this,t=e._self._c;return t("setup",{attrs:{title:"Reset Your Password",error:e.error,hidePageTitle:e.hidePageTitle}},[e.sendingOtp?t("div",{staticClass:"otp-sending-progress"},[t("div",[t("span",[e._v("Sending your code")])])]):e._e(),e.verifyingOtp?t("div",{staticClass:"otp-sending-progress"},[t("div",[e._v(" Verifying confirmation code..."),t("span",{staticStyle:{"white-space":"nowrap"}},[e._v("Please wait")])])]):e._e(),t("form",{staticClass:"card-body",attrs:{method:"post"},on:{submit:function(t){return t.preventDefault(),e.handleFormSubmit.apply(null,arguments)}}},[t("div",{staticClass:"default-form w-border",staticStyle:{"text-align":"center",margin:"auto"}},[t("p",{staticClass:"p-activation-note"},[t("strong",[e._v("To confirm your identity, ")]),e._v(" enter the code sent to"),t("br"),t("span",[e._v(e._s(e.otpToEmail?e.email:e.mobileNumber))])]),t("div",{staticClass:"form-row"},[t("div",{staticClass:"otp-control"},[t("v-otp-input",{ref:"otpInput",attrs:{"input-classes":"otp-input",separator:"","num-inputs":6,"should-auto-focus":!0,"is-input-num":!1},on:{"on-change":e.handleOtpChange,"on-complete":e.handleOtpComplete}})],1)]),t("div",{staticClass:"form-row"},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.verifyingOtp,expression:"verifyingOtp"}],staticClass:"spinner small light"}),t("input",{directives:[{name:"show",rawName:"v-show",value:!e.verifyingOtp,expression:"!verifyingOtp"}],ref:"submitBtn",staticClass:"button large blue",attrs:{type:"submit",value:"Verify Code"}})]),t("div",{staticClass:"form-row",staticStyle:{"line-height":"2em"}},[t("a",{staticStyle:{cursor:"pointer"},on:{click:e.sendOtp}},[e._v("Resend the code")]),t("br"),e.email&&!e.otpToEmail?t("span",{},[t("a",{staticStyle:{cursor:"pointer"},on:{click:e.handleSwitchOtpReceiver}},[e._v("Send the code ("+e._s(e.email)+")")]),t("br")]):e._e(),e.mobileNumber&&e.otpToEmail?t("span",{},[t("a",{staticStyle:{cursor:"pointer"},on:{click:e.handleSwitchOtpReceiver}},[e._v("Send the code ("+e._s(e.mobileNumber)+")")]),t("br")]):e._e(),t("a",{staticStyle:{cursor:"pointer"},on:{click:e.handleGoToQuestions}},[e._v("Take me to my secret questions")])])])])])},Le=[],Ie={name:"OTP",props:["sentToEmail","email","mobileNumber","redirectUrl","token"],data(){return{otpToEmail:this.$props.sentToEmail,sendingOtp:!1,verifyingOtp:!1,code:"",error:"",hidePageTitle:!1}},methods:{handleFormSubmit(){if(!this.code||this.code.length<6)return this.error="Insert the confirmation code that was sent to your\n\t\t\t\t\t\t"+(this.otpToEmail?"email address ("+this.email+")":"contact number ("+this.mobileNumber+")"),!1;this.error="";const e=this.otpToEmail?"/Password/VerifyEmailOTP":"/Password/VerifySMSOTP";this.verifyingOtp=!0,this.$ajax.post(e,{verificationCode:this.code},{headers:{Authorization:this.token}}).then(e=>{this.verifyingOtp=!1;const t=ge(e.data.result,"VERIFY_OTP");""===t?this.$router.push({name:"SetNew",params:{redirectUrl:this.redirectUrl},query:{token:e.data.token}}):(this.error=t,this.$refs.otpInput.clearInput())}).finally(()=>this.verifyingOtp=!1)},handleOtpChange(e){this.code=e},handleOtpComplete(e){this.code=e,setTimeout(()=>{this.$refs.submitBtn.focus()},10)},sendOtp(){const e=this.otpToEmail?"/Password/SendOTPToEmail":"/Password/SendOTPToSMS";this.sendingOtp=!0,this.$ajax.get(e,{headers:{Authorization:this.token}}).then(e=>{const t=ge(e.result,"SEND_OTP");t&&(this.error=t)}).catch(e=>{const t=this;"UNAUTHORIZED"===e.result&&(this.error="Your session has expired! Redirecting you back to Forgot Password page.",setTimeout(()=>{t.$router.push({name:"Recover",query:this.redirectUrl?{redirectUrl:this.redirectUrl}:void 0})},5e3))}).finally(()=>{this.sendingOtp=!1})},handleSwitchOtpReceiver(){this.otpToEmail=!this.otpToEmail,this.sendOtp()},handleGoToQuestions(){this.$router.push({name:"VerifyAnswer",params:{redirectUrl:this.redirectUrl,email:this.email,sentToEmail:this.sentToEmail,mobileNumber:this.mobileNumber,token:this.token}})}},components:{Setup:F},mounted(){this.token?this.sendOtp():this.$router.push({name:"Recover",query:{redirectUrl:this.$route.query.redirectUrl}})}},$e=Ie,je=Object(o["a"])($e,De,Le,!1,null,null,null),He=je.exports;s["a"].use(d["a"]);const Qe=[{path:"/",name:"Login",component:k,props:!0,meta:{title:"Login"}},{path:"/Emails",name:"Emails",component:W,meta:{title:"Emails"}},{path:"/Recover",name:"Recover",component:K,meta:{title:"Forgot Password"}},{path:"/SetupPassword",name:"SetupPassword",component:ae,meta:{title:"Reset Password"}},{path:"/SetupQuestions",name:"SetupQuestions",component:de,props:!0,meta:{title:"Answer Security Password"}},{path:"/VerifyAnswer",name:"VerifyAnswer",component:Ae,props:!0,meta:{title:"Answer Security Password"}},{path:"/SetNew",name:"SetNew",component:ke,props:!0,meta:{title:"Reset Password"}},{path:"/Otp",name:"OTP",component:He,props:!0,meta:{title:"One Time Password"}}],Fe=new d["a"]({mode:"history",base:"/",routes:Qe});var Ve=Fe,Me=r("e37d"),ze=r("cc46"),We=r.n(ze);r("a1a3");s["a"].component("v-otp-input",We.a),s["a"].use(ve,{handleUnautorized:!0}),s["a"].use(Me["a"]),s["a"].prototype.$validateEmail=function(e){var t=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(String(e).toLowerCase())},Ve.afterEach((e,t)=>{s["a"].nextTick(()=>{document.title=e.meta.title||"Login"})}),s["a"].config.productionTip=!1,new s["a"]({router:Ve,render:e=>e(u)}).$mount("#app")},a1a3:function(e,t,r){}});
//# sourceMappingURL=app.js.map