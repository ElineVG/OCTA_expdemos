/**
 * jspsych-custom-survey-html-form
 * a jspsych plugin for free html forms
 *
 * documentation: docs.jspsych.org
 *
 */

jsPsych.plugins['custom-survey-html-form'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'custom-survey-html-form',
    description: '',
    parameters: {
      html: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'HTML',
        default: null,
        description: 'HTML formatted string containing all the input elements to display. Every element has to have its own distinctive name attribute. The <form> tag must not be included and is generated by the plugin.'
      },
      preamble: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Preamble',
        default: null,
        description: 'HTML formatted string to display at the top of the page above all the questions.'
      },
      stimulus: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Stimulus',
        default: null,
        description: 'HTML formatted string to display stimulus next to the questions.'
      },
      questions: {
        type: jsPsych.plugins.parameterType.COMPLEX,
        array: true,
        pretty_name: 'Questions',
        nested: {
          prompt: {
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'Prompt',
            default: undefined,
            description: 'Questions that are associated with the slider.'
          },
          /*labels: {
            type: jsPsych.plugins.parameterType.STRING,
            array: true,
            pretty_name: 'Labels',
            default: undefined,
            description: 'Labels to display for individual question.'
          },
          required: {
            type: jsPsych.plugins.parameterType.BOOL,
            pretty_name: 'Required',
            default: false,
            description: 'Makes answering the question required.'
          },*/
          name: {
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'Question Name',
            default: '',
            description: 'Controls the name of data values associated with this question'
          }
        }
      },
      randomize_question_order: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Randomize Question Order',
        default: false,
        description: 'If true, the order of the questions will be randomized'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        description: 'The text that appears on the button to finish the trial.'
      },
      dataAsArray: {
        type: jsPsych.plugins.parameterType.BOOLEAN,
        pretty_name: 'Data As Array',
        default:  false,
        description: 'Retrieve the data as an array e.g. [{name: "INPUT_NAME", value: "INPUT_VALUE"}, ...] instead of an object e.g. {INPUT_NAME: INPUT_VALUE, ...}.'
      }
    }
  }

  plugin.trial = function(display_element, trial) {

    var html = '';
     
    // add image
    if(trial.stimulus !== null){
        
      html += '<div style = "float:left; width: 50%;  margin-right:0%;"><p style = "text-align:right; font-size: .9em;">Characteristics you think apply to this image:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div style = "float:right; margin-right:0%;">'+trial.stimulus+'</div></p></div>'
    }
      
    // start form
    html += '<form id="jspsych-custom-survey-html-form" style="width: 45%; float:left; margin-left:5%;">'


    html += '<p style = "text-align:left; width: 500px;  margin-left:20%; margin-right: auto; margin-bottom:5%; font-size: .8em; line-height: 100%;"> </br> 1 - not at all</br>2 - clearly not</br> 3 - rather not</br> 4 - neither nor </br> 5 - rather </br> 6 - clearly </br> 7 - extremely</p>'
      
    html += '<table class="striped-columns border" style = "width: 100%;"> <thead> <tr> <th ></th>  <th style = "width:12%;"></th>  <th style = "width:12%;"> </th> <th style = "width:12%;"> </th> <th style = "width:12%;"> </th> <th style = "width:12%;"> </th><th style = "width:12%;"> </th> <th style = "width:12%;"></th> </tr>  <tr> <th style = "text-align:right; padding: 10px;"></th>  <th style = "width:12%;text-align:center;">1</th>  <th style = "width:12%;text-align:center;">2</th> <th style = "width:12%;text-align:center;">3</th>  <th style = "width:12%;text-align:center;">4</th> <th style = "width:12%;text-align:center;">5</th> <th style = "width:12%;text-align:center;">6</th> <th style = "width:12%;text-align:center;">7</th> </tr> </thead>'
      
    var question_order = [];
    for(var i=0; i<trial.questions.length; i++){
      question_order.push(i);
    }
    if(trial.randomize_question_order){
      question_order = jsPsych.randomization.shuffle(question_order);
    }

    for (var i = 0; i < trial.questions.length; i++) {
      var question = trial.questions[question_order[i]];
      // add question
      if(i % 2 == 0){
          var background_color = '#f8f8f8';
      }
      else {
          var background_color = '#ededed';
      }
        
    html +=  '<tr style="background:' + background_color + '"> <td style = "text-align:right; padding: 10px;">' + question.prompt + '</td> <td style="width:12%;"><input type="radio" style="width:60%;" value="1" name="' + question.name + '" required/></td> <td style="width:12%;"><input type="radio" style="width:60%;" value="2" name="' + question.name + '"/></td> <td style="width:12%;"><input type="radio" style="width:60%;" value="3" name="' + question.name + '"/></td> <td style="width:12%;"><input type="radio" style="width:60%;" value="4" name="' + question.name + '"/></td> <td style="width:12%;"><input type="radio" style="width:60%;" value="5" name="' + question.name + '"/></td> <td style="width:12%;"><input type="radio" style="width:60%;" value="6" name="' + question.name + '"/></td>   <td style="width:12%;"><input type="radio" style="width:60%;" value="7" name="' + question.name + '"/></td>  </tr>';
        
      }
    html += '<tr style = "height:50px;"></tr><tr><td></td><td colspan="7"  ">'+'<input type="submit" id="jspsych-survey-html-form-next" class="rating-btn jspsych-survey-html-form" style="display:block; " value="'+trial.button_label+'"></input>'+'</tr>';

    html += '</form>';
      
    display_element.innerHTML = html;

    display_element.querySelector('#jspsych-custom-survey-html-form').addEventListener('submit', function(event) {
      // don't submit form
      event.preventDefault();

      // measure response time
      var endTime = performance.now();
      var response_time = endTime - startTime;

      var question_data = serializeArray(this);

      if (!trial.dataAsArray) {
        question_data = objectifyForm(question_data);
      }

      // save data
      var trialdata = {
        "rt": response_time,
        "responses": JSON.stringify(question_data)
      };

      display_element.innerHTML = '';

      // next trial
      jsPsych.finishTrial(trialdata);
    });

    var startTime = performance.now();
  };

  /*!
   * Serialize all form data into an array
   * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
   * @param  {Node}   form The form to serialize
   * @return {String}      The serialized form data
   */
  var serializeArray = function (form) {
    // Setup our serialized data
    var serialized = [];

    // Loop through each field in the form
    for (var i = 0; i < form.elements.length; i++) {
      var field = form.elements[i];

      // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
      if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

      // If a multi-select, get all selections
      if (field.type === 'select-multiple') {
        for (var n = 0; n < field.options.length; n++) {
          if (!field.options[n].selected) continue;
          serialized.push({
            name: field.name,
            value: field.options[n].value
          });
        }
      }

      // Convert field data to a query string
      else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
        serialized.push({
          name: field.name,
          value: field.value
        });
      }
    }

    return serialized;
  };

  // from https://stackoverflow.com/questions/1184624/convert-form-data-to-javascript-object-with-jquery
  function objectifyForm(formArray) {//serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
      returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
  }

  return plugin;
})();
