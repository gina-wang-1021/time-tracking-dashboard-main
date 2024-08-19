// fetch buttons from DOM
const dayBtn = document.getElementById('dailyBtn');
const weekBtn = document.getElementById('weeklyBtn');
const monthBtn = document.getElementById('monthlyBtn');

// placeholder for data
let ourData = '';

// set variables for each data
const times = [document.getElementById('work_time'), document.getElementById('play_time'), document.getElementById('study_time'), document.getElementById('exercise_time'), document.getElementById('social_time'), document.getElementById('self_time')];
console.log(times);
const past_times = [document.getElementById('work_time_previous'), document.getElementById('play_time_previous'), document.getElementById('study_time_previous'), document.getElementById('exercise_time_previous'), document.getElementById('social_time_previous'), document.getElementById('self_time_previous')];
console.log(past_times);

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

    let hours_unit = '';
    let hours;

    for (let i = 0; i < 6; i++){
        hours = ourData[i]["timeframes"][unit]["current"];
        if (Number(hours) > 1){ hours_unit = 'hrs'}
        else{hours_unit = 'hr'};
        times[i].innerHTML = hours + hours_unit;

        hours = ourData[0]["timeframes"][unit]["previous"];
        if (Number(hours) > 1){ hours_unit = 'hrs'}
        else{hours_unit = 'hr'};
        past_times[i].innerHTML = `Last ${unit_UI} - ` + ourData[0]["timeframes"][unit]["previous"] + hours_unit;
    }
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