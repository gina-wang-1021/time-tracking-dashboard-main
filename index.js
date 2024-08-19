// fetch buttons from DOM
const dayBtn = document.getElementById('dailyBtn');
const weekBtn = document.getElementById('weeklyBtn');
const monthBtn = document.getElementById('monthlyBtn');

// placeholder for data
let ourData = '';

// set variables for each data
let work = document.getElementById('work_time');
let work_last = document.getElementById('work_time_previous');
let play = document.getElementById('play_time');
let play_last = document.getElementById('play_time_previous');
let study = document.getElementById('study_time');
let study_last = document.getElementById('study_time_previous');
let exercise = document.getElementById('exercise_time');
let exercise_last = document.getElementById('exercise_time_previous');
let social = document.getElementById('social_time');
let social_last = document.getElementById('social_time_previous');
let selfCare = document.getElementById('self_time');
let selfCare_last = document.getElementById('self_time_previous');

let unit = '';
let unit_UI = '';

// helper functions
async function populate(){
    await fetch('./data.json').then((request) => {
        if (!request.ok){
            // add warning pop out to users
            console.log('Something went wrong with request');
            return null;
        }
        return request.json();
    }).then((data) => {
        ourData = data;
    })
}

function checkFocus(){
    if (document.activeElement === dayBtn){
        unit = "daily";
        unit_UI = "Day";
    }
    else if (document.activeElement === weekBtn){
        unit = "weekly";
        unit_UI = "Week";
    }
    else{
        unit = "monthly";
        unit_UI = "Month";
    }
}

// main function
async function main(){
    await populate();

    checkFocus();

    work.innerHTML = ourData[0]["timeframes"][unit]["current"] + "hrs";
    work_last.innerHTML = `Last ${unit_UI} - ` + ourData[0]["timeframes"][unit]["previous"] + "hrs";
    play.innerHTML = ourData[1]["timeframes"][unit]["current"] + "hrs";
    play_last.innerHTML = `Last ${unit_UI} - ` + ourData[1]["timeframes"][unit]["previous"] + "hrs";
    study.innerHTML = ourData[2]["timeframes"][unit]["current"] + "hrs";
    study_last.innerHTML = `Last ${unit_UI} - ` + ourData[2]["timeframes"][unit]["previous"] + "hrs";
    exercise.innerHTML = ourData[3]["timeframes"][unit]["current"] + "hrs";
    exercise_last.innerHTML = `Last ${unit_UI} - ` + ourData[3]["timeframes"][unit]["previous"] + "hrs";
    social.innerHTML = ourData[4]["timeframes"][unit]["current"] + "hrs";
    social_last.innerHTML = `Last ${unit_UI} - ` + ourData[4]["timeframes"][unit]["previous"] + "hrs";
    selfCare.innerHTML = ourData[5]["timeframes"][unit]["current"] + "hrs";
    selfCare_last.innerHTML = `Last ${unit_UI} - ` + ourData[5]["timeframes"][unit]["previous"] + "hrs";
}

// execution & link buttons
main();

dayBtn.addEventListener("click", () => {
    main();
})

weekBtn.addEventListener("click", () => {
    main();
})

monthBtn.addEventListener("click", () => {
    main();
})