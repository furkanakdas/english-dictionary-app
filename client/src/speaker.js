export const engLangNames = ["Google UK English Female","Google UK English Male","Google US English"];
export const trLangNames = ["Microsoft Tolga - Turkish (Turkey)"];


let speech = new SpeechSynthesisUtterance();
let speech2 = new SpeechSynthesisUtterance();

let speaker = window.speechSynthesis;


function getVoiceByLang(lang){
    return speaker.getVoices().find(voice => voice.name.toLowerCase() == lang.toLowerCase())
}


export function setText(text){
    speech.text = text;
}

export function setVoice(lang){
    speech.voice = getVoiceByLang(lang);
}

export function setRate(rate){
    speech.rate = Number(rate);
}

export function speak(){
    speaker.speak(speech)
}

export function turnOffVolume(){
    speech.volume = 0;
}

export function turnOnVolume(){
    speech.volume = 0.8;
}


export function setSpeakRepeatedly(fun){

    speech2.addEventListener("end", (event) => {

        fun();
        
    });

}

export function unsetSpeakRepeatedly(fun){
    speech2.removeEventListener("end",fun)
}

export function speakRepeatedly(){
    speech2.text = speech.text;
    speech2.voice = speech.voice;
    speech2.rate = speech.rate;
    speech2.volume = speech.volume;

    speaker.speak(speech2);

}



// export function speakRepeatedly(second){
//     speaker.speak(speech);
    
//     speech.addEventListener("end", (event) => {

//         setTimeout((e)=>{speaker.speak(speech)},second * 3)
    
//     });
// }