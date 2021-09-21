Affinity.Components = Affinity.Components || {};
Affinity.Components.ZelosInit = {
  Version: '1.0.2.1',
  Sequence: 10100,
  Name: 'Zelos Init',
  File: 'ui.zelos.init.js',
  Jira: '',
  Notes: 'Fix compile issues'
};

if (!window.hasOwnProperty('Affinity')) { window.Affinity = {}; }
Affinity.zelos = {};
Affinity.zelos.Elements = {};

function ZelosError(message)
{
  var test = "find me in minified source";
  this.name = "ZelosError";
  this.message = (message || "");
  return test;
};

ZelosError.prototype = Error.prototype;

var ZelosInit = new Class({

  Implements: [Options, Events],

  Binds: [
    'loadHtmlTemplate', 'htmlTemplateLoadError', 'htmlTemplayeLoaded'
  ],

  options: {
    htmlTemplateUrl: '/Content/html/ZelosHtmlTemplates.html',
    requiredUiComponenets: [
      'UITabs',
      'UIGrid',
      'UIHelpBubble',
      'UIHelpIcon',
      'UITooltips',
      'UIDrawPanels',
      'UIModal',
      'UIPompts',
      'UISelectLookup',
      'UIUplaodersMulti',
      'UIDateCalendar',
      'UIValidation',
      'UIHidables'
    ],
    requiredZelosComponenets: [
      'ZelosTemplateLoad',
      'ZelosTemplateProcess'
    ]
  },

  initialize: function (options)
  {

    this.setOptions(options);

    var rewuiredComponents = this.options.requiredUiComponenets.combine(this.options.requiredZelosComponenets);
    var missingComponents = [];

    Array.each(rewuiredComponents, function (classname)
    {
      if (typeOf(window[classname]) != 'class')
      {
        missingComponents.push(classname);
      }
    });

    if (missingComponents.length > 0)
    {
      throw new ZelosError("There are components missing that are required for Zelos to run:\n" + missingComponents.join('\n') + "\nPlease refer to 'Setting up Zelos UI' in documentation.");
    }

    Affinity.zelos.getElement = this.getElement;
    Affinity.zelos.getElementFromData = this.getElementFromData;

    this.loadHtmlTemplate();

  },

  loadHtmlTemplate: function ()
  {

    this.fireEvent('request', Affinity.basepath + this.options.htmlTemplateUrl);
    new Request.HTML({
      url: Affinity.basepath + this.options.htmlTemplateUrl,
      evalScripts: false,
      onFailure: this.htmlTemplateLoadError,
      onError: this.htmlTemplateLoadError,
      onSuccess: this.htmlTemplayeLoaded
    }).get();

  },

  htmlTemplateLoadError: function ()
  {
    if (ga)
    {
      ga('send', 'event', 'Zelos', 'HtmlTemplate', 'load failed (' + Affinity.basepath + this.options.htmlTemplateUrl + ')');
    }
    Affinity.prompts.hide();
    this.fireEvent('error', '"' + Affinity.basepath + this.options.htmlTemplateUrl + '" must exist in your project.');
  },

  htmlTemplayeLoaded: function (responseTree)
  {
    var tableElement;
    Array.each(responseTree, function (element)
    {
      if (typeOf(element) == 'element' || typeOf(element) == 'table')
      {
        if (element.get('data-form-element') && element.get('data-form-element') != '')
        {
          if (element.hasClass('get-tr'))
          {
            Affinity.zelos.Elements[element.get('data-form-element')] = element.getElement('tr');
          } else
          {
            Affinity.zelos.Elements[element.get('data-form-element')] = element;
          }
        }
      }
    });
    this.fireEvent('complete');
  },

  setTemplateElement: function (identifier, element)
  {
    Affinity.zelos.Elements[identifier] = element;
  },

  getElement: function (name)
  {
    if (Affinity.zelos.Elements[name])
    {
      return Affinity.zelos.Elements[name].clone();
    }
    console.log('NO template for ' + name + '.');
    return false;
  },

  getElementFromData: function (data)
  {
    if (typeOf(data) !== 'null')
    {
      var use = data.ElementType ? data.ElementType : data.InputType;
      var from = data.ElementType ? 'ElementType' : 'InputType';
      var el, uuid;
      if (typeOf(Affinity.zelos.Elements[use]) === 'class')
      {
        return Affinity.zelos.Elements[use];
      }
      if (data.ElementType == "FieldEdit" || data.ElementType == "FieldDisplay")
      {
        switch (data.InputType)
        {
          case 'Currency':
            if (Affinity.zelos.Elements.CurrencyInput)
            {
              return Affinity.zelos.Elements.CurrencyInput.clone();
            }
            else
            {
              console.log('NO template for FieldEdit with inputType CurrencyInput found from ' + from + '.');
              return false;
            }
          default:
            return Affinity.zelos.Elements[use].clone();
        }
      }
      if (Affinity.zelos.Elements[use])
      {
        return Affinity.zelos.Elements[use].clone();
      }
    }
    console.log('NO template for ' + use + ' found from ' + from + '.');
    return false;
  }

});

/**/

(function (i, s, o, g, r, a, m)
{
  i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function ()
  {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date(); a = s.createElement(o),
  m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '/' + '/www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-45869305-1', 'teampayoffice.com');
ga('create', 'UA-45869305-1', {
  'cookieDomain': 'none'
});
ga('send', 'pageview');