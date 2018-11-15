const studNumb = 15; //total number of students
//print student number
document.querySelector('.totStud').appendChild(document.createTextNode(studNumb));

let tableDate = new Date(); //create first lection date
tableDate.setFullYear(2018, 3, 28);

let totalDays = 0; //create total day's variable

let missedLesson = 0; //create missed lesson's variable

//add eventlistener to add button 
document.querySelector('.addBTN').addEventListener("click", function() {
    missedLesson += studNumb; //increase missed lesson by 15 because of the number ofstudents 
    let parent = document.querySelector('.studentscore'); //select div with classname .studentscore
    let grade = document.createElement('div'); //create div element
    grade.setAttribute('class', 'grade'); //create div with classname grade
    parent.appendChild(grade);
    let butt = document.querySelector('.RMBTN'); //select remove button
    document.querySelector('.RMBTN').style.pointerEvents = 'painted'; //make remove button clickable
    //print grade column with date title
    for(let i=0; i<=studNumb; i++) {
        let myDiv = document.createElement('div'); //create div element
        myDiv.setAttribute('class', `box${i}`); //set div classname box1...15
        if(i==0) {
            //print date in first row and save last date in tableDate variable
            myDiv.setAttribute('class', 'boxTitle');
            if (tableDate.getDay() == 1 || tableDate.getDay() == 3 || tableDate.getDay() == 6) {
                tableDate = new Date(tableDate.getFullYear(), tableDate.getMonth(), tableDate.getDate() + 2)
                myDiv.appendChild(document.createTextNode(tableDate.toLocaleString({ timeZone: 'UTC' }).split(',')[0]));
            } else {
                tableDate = new Date(tableDate.getFullYear(), tableDate.getMonth(), tableDate.getDate() + 1)
                myDiv.appendChild(document.createTextNode(tableDate.toLocaleString({ timeZone: 'UTC' }).split(',')[0]));
            }
        } else {
            myDiv.appendChild(document.createTextNode('0')); //insert 0 to all row of gradecolumn
            myDiv.addEventListener("click", function() { //add eventlistener to each grade box
                let x = prompt("Enter Grade"); //enter grade by user
                if(isNaN(x)) {
                    alert("Input must be Number")
                } else {
                if(x < 0) { 
                    x = 0;
                } else if(x > 5) {
                    x = 5;
                }
                if(x > 0) {
                    myDiv.style.backgroundColor = 'rgb(255, 153, 0)'; //set background style
                    if(myDiv.childNodes[0].textContent == 0) { //check if current grade is 0
                        missedLesson -= 1; 
                    } 
                } else { //if prompt is 0 
                    myDiv.style.backgroundColor = 'rgb(158, 9, 9)'; //set background style
                    if(myDiv.childNodes[0].textContent > 0) { //check if current grade is over 0
                        missedLesson += 1; 
                    }
                    }
                    myDiv.replaceChild(document.createTextNode(x), myDiv.childNodes[0]); //update old grade to new grade
                    averageCount(); //call average count function
                    averMark(); //call average mark count function
                    //update the number of missed lessons 
                    document.querySelector('.missLesson').replaceChild(document.createTextNode(missedLesson), document.querySelector('.missLesson').childNodes[0]);
                }
            })
        }
        grade.appendChild(myDiv);
    }
    //to increase the number of days
    totalDays += 1;
    document.querySelector('.totalDay').replaceChild(document.createTextNode(totalDays), document.querySelector('.totalDay').childNodes[0]);
    
    //count missed lessons
    document.querySelector('.missLesson').replaceChild(document.createTextNode(missedLesson), document.querySelector('.missLesson').childNodes[0]);
    
    averageCount(); //call average count function
    averMark(); //call average mark count function
});

//add eventlistener to remove button 
document.querySelector('.RMBTN').addEventListener("click", function() {
    //update number of missed lesson after remove day
    for(let i=0; i <= studNumb; i++) { 
        if(document.querySelector('.grade:last-child').childNodes[i].textContent == '0')
        missedLesson -= 1;
    } //update date after remove day
    if (tableDate.getDay() == 1 || tableDate.getDay() == 3 || tableDate.getDay() == 5) {
        tableDate = new Date(tableDate.getFullYear(), tableDate.getMonth(), tableDate.getDate() - 2)
        let box = document.querySelector('.grade:last-child');
        box.parentNode.removeChild(box);
    } else {
        tableDate = new Date(tableDate.getFullYear(), tableDate.getMonth(), tableDate.getDate() - 1)
        let box = document.querySelector('.grade:last-child');
        box.parentNode.removeChild(box);
    }
    //make remove button noclickable
    if(!(document.querySelector('.grade'))) {
        document.querySelector('.RMBTN').style.pointerEvents = 'none';
    }
    //update number missed lesson in statistic table
    document.querySelector('.missLesson').replaceChild(document.createTextNode(missedLesson), document.querySelector('.missLesson').childNodes[0]);
    //update number of total days
    totalDays -= 1;
    document.querySelector('.totalDay').replaceChild(document.createTextNode(totalDays), document.querySelector('.totalDay').childNodes[0]);
    averageCount(); //call average count function
    averMark(); //call average mark count function
});

//average count function
function averageCount(){
    //count avarage by row
    for(let j=1; j<=studNumb; j++) {
        let aver=document.querySelectorAll(`.box${j}`);
        let sum = 0;
        let fullsum = 0;
        for(let i=0; i < totalDays; i++) {
            sum += Number(aver[i].textContent);
        } 
        if(totalDays != 0) { //check if total day is 0
            fullsum = Math.round(((sum/totalDays)*100))/100;
        }
    //update old avarage score to new score
        document.querySelector(`.avarageScore${j}`).replaceChild(document.createTextNode(fullsum), document.querySelector(`.avarageScore${j}`).childNodes[0]);
    }
}

//avarage mark count function
function averMark() {
    let sumM=0;
    //sum of all avarage score
    for(let i=1; i <= studNumb; i++) {
        sumM += Number(document.querySelector(`.avarageScore${i}`).textContent);
    }
    //update old avarage score to new score
    document.querySelector('.averageMark').replaceChild(document.createTextNode(Math.round(((sumM / studNumb)*100))/100), document.querySelector('.averageMark').childNodes[0]);
}



//// add function

// document.querySelector(".UPBTN").addEventListener("click", function(){
//     let newValue = prompt("Enter New Number");
//     let box = document.querySelector('.grade:last-child');
//     if(isNaN(newValue)) {
//         alert("Input must be Number")
//     } else {
//     if(newValue < 0) { 
//         newValue = 0;
//     } else if(newValue > 5) {
//         newValue = 5;
//     }
//     if(newValue > 0) {
//         for(let i=1; i<=studNumb; i++) {
//             box.childNodes[i].textContent=newValue;
//             box.childNodes[i].style.backgroundColor = 'rgb(255, 153, 0)';
//         }
//     } else { //if prompt is 0 
//         for(let i=1; i<=studNumb; i++) {
//             box.childNodes[i].textContent=newValue;
//             box.childNodes[i].style.backgroundColor = 'red';
//         }}}
    

    
// })
