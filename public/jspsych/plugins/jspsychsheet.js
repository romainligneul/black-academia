// jspsychsheet - A simple JavaScript library to use jsPsych and Google Sheet Apps Script to run behavioral experiments online.
// Created by Shashi Kant Gupta, May 19, 2020.

var jsPsychSheet = {

  uploadData: function(all_data){

    var data_rows = all_data.split(/\r?\n|\r/);

    var i;
    var data = [];
    for(i=0; i<data_rows.length; i++){
      var row = data_rows[i];
      row = row.slice(1, row.length-1)
      row = row.split('","');
      if(row.length > 1){
        data.push(row);
      }
    }

  }
}
