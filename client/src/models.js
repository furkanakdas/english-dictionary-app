import { engLangNames } from "./speaker";

export const WordTypes =  Object.freeze({Word:"word",Expression:"expression"});
export const WordLevels = Object.freeze({Easy:"easy",Medium:"medium",Hard:"hard"});


export const KelimeFields = Object.freeze({
  Id:"_id",
  English:"english",
  Turkish:"turkish",
  Pronounce:"pronounce",
  Type:"type",
  Level:"level",
  CreatedAt:"createdAt",
  View:"view"
})

export class Kelime{

  constructor(english,turkish,pronounce,
  type,level,_id,createdAt,view){

     this._id=_id
     this.english  = english;
     this.turkish  = turkish;
     this.pronounce  = pronounce;
     this.type  = type;
     this.level  = level;
     this.createdAt=createdAt;
     this.view=view;
  }

  copyToThis({english,turkish,pronounce,type,level,_id,createdAt,view}){
    this._id=_id
    this.english  = english;
    this.turkish  = turkish;
    this.pronounce  = pronounce;
    this.type  = type;
    this.level  = level;
    this.createdAt=createdAt;
    this.view=view;
  }

    //    copy = function(word){
    //     word.english  = this.english;
    //     word.turkish  = this.turkish;
    //     word.pronounce  = this.pronounce;
    //     word.type  = this.type;
    //     word.level  = this.level;
    //     word.editable  = this.editable;
    // }
}

export const DictionaryFields = Object.freeze({
   Editable:"editable",
   ...KelimeFields
})

export class DictionaryClass extends Kelime {

  constructor(english,turkish,pronounce,type,level,_id,createdAt,view,editable){
    super(english,turkish,pronounce,type,level,_id,createdAt,view)
    this.editable = editable;
  }

  copyToThis({english,turkish,pronounce,type,level,_id,createdAt,view,editable}){
    super.copyToThis({english,turkish,pronounce,type,level,_id,createdAt,view});
    this.editable = editable;
  }

}

export const EngLanguages = Object.freeze({UKFemale:engLangNames[0],UKMale:engLangNames[1]
  ,USFemale:engLangNames[2]})

export const VoiceFields = Object.freeze({
  Delay:"delay",
  Speed:"speed",
  EngLang:"engLang",
  Volume:"volume"
})

export class Voice{

  constructor(delay,speed,engLang,volume){
    this.delay=delay;
    this.speed=speed;
    this.engLang=engLang;
    this.volume=volume;
  }

  copyToThis({delay,speed,engLang,volume}){
    this.delay=delay;
    this.speed=speed;
    this.engLang=engLang;
    this.volume=volume;
  }

}

export const FilterWordLevels = Object.freeze({
  All:-1,
  ...WordLevels
})

export const FilterWordTypes = Object.freeze({
  All:-1,
  ...WordTypes
})


export const FilterFields=Object.freeze({
  Type:"type",
  Level:"level"
})

export class Filter{
  constructor(type,level){
    this.type=type;
    this.level=level;
  }

  copyToThis({type,level}){
    this.type=type;
    this.level=level;
  }
}


// export const  Word = Object.freeze( {
//     English:"english",
//     Turkish:"turkish",
//     Pronounce:"pronounce",
//     Type:"type",
//     Level:"level"
//   })

//   export const WordObject = Object.freeze({
//     [Word.English]:"",[Word.Turkish]:"",[Word.Pronounce]:"",[Word.Type]:"",[Word.Level]:""
//   })
  
//   export const enumType = Object.freeze({Word:"word",Expression:"expression"})
  
//   export const enumLevel = Object.freeze({Easy:"easy",Medium:"medium",Hard:"hard"})

//   function Word(english="",turkish="",pronounce="",type=0,level=0,editable="false"){
    
//     this.english  = english;
//     this.turkish  = turkish;
//     this.pronounce  = pronounce;
//     this.type  = type;
//     this.level  = level;
//     this.editable  = editable;

//     this.copy = function(word){
//         word.english  = this.english;
//         word.turkish  = this.turkish;
//         word.pronounce  = this.pronounce;
//         word.type  = this.type;
//         word.level  = this.level;
//         word.editable  = this.editable;
//     }
// }