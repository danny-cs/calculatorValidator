/*
    -Danny Nguyen
    -danny_nguyen1@student.uml.edu
    -University Of Massachusetts Lowell - 96.161 GUI Programming 1
    -Last updated November 15th, 2016
*/

// this jquery function handles the case where the max row and column number entered must be greater 
// the minimum row and column number entered
$(function() {
    $.validator.addMethod("greaterThan", function (value, element, param) {
        var $min = $(param);
        if(isNaN(value)) {
            return true;
        }
        return parseInt(value) > parseInt($min.val());
    }, "Max row and column number must be greater than min row and column");

    // This jquery validator makes sure that the user enters a valid number which is greater than 0
    //    error messages are prompted underneath whichever number entered was invali

    $(".form-control").on('input',function() {
        $("#calculatorForm").validate({
            rules: {
                num1: {
                    required: true,
                    min: 0,
                    digits: true
                },
                num2: {
                    required:true,
                    greaterThan: "#num1",
                    digits:true            
                },
                num3: {
                    required:true,
                    min: 0,
                    digits:true
                },
                num4: {
                    required:true,
                    greaterThan: "#num3",
                    digits:true
                }
            },
            submitHandler: calculate
        });
    });
});


function calculate() {
    $("table").children().remove();
    //creates the place holder for the numbers
    var num1 = Number(document.forms["calculatorForm"]["num1"].value);
    var num2 = Number(document.forms["calculatorForm"]["num2"].value);
    var num3 = Number(document.forms["calculatorForm"]["num3"].value);
    var num4 = Number(document.forms["calculatorForm"]["num4"].value);
    console.log(num1, num2, num3, num4);  

    var table = document.getElementById("timesTable");

    // First row header
    var firstRow = table.insertRow(0);
    // Empty cell
    firstRow.insertCell(0);
    for (var j = 0; j <= (num2 - num1); j++) {
        // Add header titles
        var cell = firstRow.insertCell(j + 1);
        cell.innerHTML = "<p>" + (j + (num1)) + "</p>";
    }
    for (var i = 0; i <= (num4 - num3); i++) {
        var row = table.insertRow(i + 1);
        // Add row title as first cell
        var firstCell = row.insertCell(0);
        firstCell.innerHTML = "<p>" + (i + num3) + "</p>";
        for (var j = 0; j <= (num2 - num1); j++) {
            var cell = row.insertCell(j + 1);
            cell.innerHTML = "<p>" + ((num3 + i) * (num1 + j)) + "</p>";
        }
    }
    return false;
}