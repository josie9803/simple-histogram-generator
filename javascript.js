function init(){
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
}
function handleFileSelect(event){
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0]);
    myFunction(reader.result);
}
var input = document.querySelectorAll("input[type='number']");
var data;
var pair;
var grades = [];
var max = parseFloat((document.getElementById("Max")).value);
var min = parseFloat((document.getElementById("F")).value);

function handleFileLoad(event) {
    console.log(event); 
    //document.getElementById('fileContent').textContent = event.target.result;
    
    //Your logic should go here.. you can remove unnecessary parts
    pair = (event.target.result).split('\r\n');
    data = convertString(event.target.result);
    updateArray();
    updateStats();
    updateHistogram();   
}

for(let i = 0; i < input.length; i++){
    input[i].addEventListener("change", function() {
        clearHistogram();
        var target = parseFloat(input[i].value);
        var upper, lower;
        max = parseFloat((document.getElementById("Max")).value);
        min = parseFloat((document.getElementById("F")).value);
        
        if (input[i].id != "Max" && input[i].id != "F"){
            upper = parseFloat((document.getElementById(input[i - 1].id)).value);
            lower = parseFloat((document.getElementById(input[i + 1].id)).value);
        }
        else{
            if (input[i].id == "Max"){
                upper = parseFloat((document.getElementById("Max")).value) + 1;
                lower = parseFloat((document.getElementById(input[i + 1].id)).value);
            }
            else if (input[i].id == "F"){
                upper = parseFloat((document.getElementById(input[i - 1].id)).value);
                lower = parseFloat((document.getElementById("F")).value) - 1;
            }
        }
        if(target > upper || target < lower){
            alert("invalid input! please try again!");    
        }
        else{
            updateArray();
            updateHistogram();
            updateStats();
        }  
    })
}
function updateArray(){
    let count = 0;
    grades = [];    
    for (let i = 0; i < data.length; i++){
        if (!(data[i] > min && data[i] < max)){
            count++;
        }
        else{
            grades.push(data[i]);
        }
    }
    if (count > 0){
        alert(count + " student(s) will be not counted in Stats & Histogram due to bounds setting");
    }
}
function clearHistogram(){
    for (let i = 1; i < input.length; i++){
        document.getElementById(i).innerHTML = " ";
    }
    document.getElementById("highest").innerHTML = " ";
    document.getElementById("lowest").innerHTML = " ";
    document.getElementById("median").innerHTML = " ";
    document.getElementById("mean").innerHTML = " ";
}
function updateHistogram(){
    for (let i = 0; i < grades.length; i++){
        for (let j = 1; j < input.length; j++)
        {
            var bounds = document.getElementById(input[j].id);
            var histogram = document.getElementById(j);
            if (grades[i] > min && grades[i] < max){
                if (grades[i] >= parseFloat(bounds.value)){
                    histogram.innerHTML += "🌹";
                    break;  
                }
            }   
        }
    }
}
function updateStats(){
    var highest = document.getElementById("highest");
    var highestCalculated = findHighest(grades);
    var indexOfHighest = data.indexOf(highestCalculated);
    highest.innerHTML = pair[indexOfHighest + 1].split(",")[0].trim() + " (" + highestCalculated + "%)";

    var lowest = document.getElementById("lowest");
    var lowestCalculated = findLowest(grades);
    var indexOfLowest = data.indexOf(lowestCalculated);
    lowest.innerHTML = pair[indexOfLowest + 1].split(",")[0].trim() + " (" + lowestCalculated + "%)";

    var mean = document.getElementById("mean");
    mean.innerHTML = calculateMean(grades).toPrecision(4);

    var median = document.getElementById("median");
    median.innerHTML = calculateMedian(grades);
}
function convertString(data){
    var grades = data.match(/(\d+)(\.\d+)?/g);
    var nums = grades.map((grade) => {
        return parseFloat(grade);
    });
    return nums;
}
function findHighest(arr){
    var highest = arr[0];
    for (let i = 1; i < arr.length; i++){
        if (arr[i] > highest){
            highest = arr[i];
        }   
    }
    return highest;
}
function findLowest(arr){
    var lowest = arr[0];
    for (let i = 1; i < arr.length; i++){
        if (arr[i] < lowest){
            lowest = arr[i];        
        }     
    }
    return lowest;
}
function calculateMean(arr){
    //add all numbers, divide by # of values
    var total = 0;
    for (let i = 0; i < arr.length; i++){
        total += arr[i];
    }
    return (total)/(arr.length);
}
function calculateMedian(arr){
    //middle value
    var temp = [];
    for (let i = 0; i < arr.length; i++){
        temp.push(arr[i]);
    }
    temp.sort(function(a,b){return a -b});
    if (temp.length % 2 != 0)
        return temp[Math.floor((temp.length)/2)];
    else
        return temp[Math.floor((temp.length)/2) + 1]; 
}
function myFunction(result){
    
}

