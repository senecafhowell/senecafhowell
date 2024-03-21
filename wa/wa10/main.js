const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
    const random = Math.floor(Math.random()*array.length);
    return array[random];
}

const storyText = "Because Bob's PC heated up to 200 fahrenheit while playing :insertx:, they decided to throw the 300 pound machine out their window and go to :inserty:. While there, Bob decided to :insertz:.";
const insertX = ['Roblox High School', 'Dream Daddy', 'It Takes Two alone'];
const insertY = ['Hell', 'a speed dating event', 'a furry convention'];
const insertZ = ['scream at anyone who came within ten feet of them', 'have a mental breakdown', 'be a little bit silly and goofy'];

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;

    const xItem = randomValueFromArray(insertX);

    const yItem = randomValueFromArray(insertY);

    const ZItem = randomValueFromArray(insertZ);

    newStory = newStory.replace(':insertx:', randomValueFromArray(insertX));

    newStory = newStory.replace(':inserty:', randomValueFromArray(insertY));

    newStory = newStory.replace(':insertz:', randomValueFromArray(insertZ));

    if(customName.value !== '') {
        const name = customName.value;
        newStory = newStory.replaceAll('Bob', name);
    }
    

    if(document.getElementById("uk").checked) {
        const weight = `${Math.round(300/14)} stone`;
        
        const temperature =  `${Math.round((200-32)*(5/9))} centigrade`;
        
        newStory = newStory.replace('200 fahrenheit', temperature);

        newStory = newStory.replace('300 pound', weight);
    }

    story.textContent = newStory;
    story.style.visibility = 'visible';
}