const Emotions = [['RAGE','ANGER'],['ANGER', 'ANNOYANCE'], ['LOATHING', 'DISGUST'], ['DISGUST', 'BOREDOM'], ['ADMIRATION', 'TRUST']
                , ['TRUST', 'ACCEPTANCE'], ['TERROR', 'FEAR'], ['FEAR', 'APPREHENSION'], ['AMAZEMENT', 'SURPRISE'], ['SURPRISE', 'DISTRACTION'],
                ['GRIEF', 'SADNESS'], ['SADNESS', 'PENSIVENESS'], ['VIGILANCE', 'ANTICIPATION'], ['ANTICIPATION', 'INTEREST'], ['ECSTACY','JOY'], ['JOY', 'SERENITY']]

const CompoundEmotions = ['AGGRESSIVENESS','CONTEMPT', 'REMORSE', 'DISAPPROVAL', 'AWE', 'SUBMISSION', 'LOVE','OPTIMISM']

const allEmotions = ['RAGE','ANGER','ANNOYANCE','LOATHING','DISGUST','BOREDOM','ADMIRATION','TRUST','ACCEPTANCE','TERROR',
                    'FEAR','APPREHENSION','AMAZEMENT','SURPRISE','GRIEF','SADNESS','PENSIVENESS','VIGILANCE','ANTICIPATION',
                    'INTEREST','ECSTACY','JOY','SERENITY', 'AGGRESSIVENESS','CONTEMPT','REMORSE','DISAPPROVAL','AWE','LOVE','SUBMISSION'
                    ,'OPTIMISM']

const EmotionsAccordingToColor = [
{
    emotion : 'RAGE',
    color : 'DarkIshRed',
    colorTwo : 'Red',
    colorThree : 'R'
},
{
    emotion : 'ANGER',
    color : 'LightRed',
    colorTwo : 'Red',
    colorThree : 'R'
},{
    emotion : 'ANNOYANCE',
    color : 'LightRed',
    colorTwo : 'Reddish',
    colorThree : 'R'
},{
    emotion : 'VIGILANCE',
    color : 'DarkishOrange',
    colorTwo : 'Orange',
    colorThree : 'O'
},{
    emotion : 'ANTICIPATION',
    color : 'LightOrange',
    colorTwo : 'Orange',
    colorThree : 'O'
},{
    emotion : 'INTEREST',
    color : 'LightOrange',
    colorTwo : 'O',
    colorThree : 'O'
},{
    emotion : 'ECSTACY',
    color : 'DarkIshYellow',
    colorTwo : 'Yellow',
    colorThree : 'Y'
},{
    emotion : 'JOY',
    color : 'LightYellow',
    colorTwo : 'Yellow',
    colorThree : 'Y'
},{
    emotion : 'SERENITY',
    color : 'LightYellow',
    colorTwo : 'Y',
    colorThree : 'Y'
},{
    emotion : 'ADMIRATION',
    color : 'DarkIshGreen',
    colorTwo : 'Green',
    colorThree : 'G'
},{
    emotion : 'TRUST',
    color : 'LightGreen',
    colorTwo : 'Green',
    colorThree : 'G'
},{
    emotion : 'ACCEPTANCE',
    color : 'LightGreen',
    colorTwo : 'G',
    colorThree : 'G'
},{
    emotion : 'TERROR',
    color : 'DarkIshCyan',
    colorTwo : 'Cyan',
    colorThree : 'Cy'
},{
    emotion : 'FEAR',
    color : 'LightCyan',
    colorTwo : 'Cyan',
    colorThree : 'Cy'
},{
    emotion : 'APPREHENSION',
    color : 'LightCyan',
    colorTwo : 'C',
    colorThree : 'Cy'
},{
    emotion : 'AMAZEMENT',
    color : 'DarkIshBlue',
    colorTwo : 'Blue',
    colorThree : 'Bl'
},{
    emotion : 'SURPRISE',
    color : 'LightBlue',
    colorTwo : 'Blue',
    colorThree : 'Bl'
},{
    emotion : 'DISTRACTION',
    color : 'LightBlue',
    colorTwo : 'B',
    colorThree : 'Bl'
},{
    emotion : 'GRIEF',
    color : 'DarkIshPurple',
    colorTwo : 'Purple',
    colorThree : 'Pu'
},{
    emotion : 'SADNESS',
    color : 'LightPurple',
    colorTwo : 'Purple',
    colorThree : 'Pu'
},{
    emotion : 'PENSIVENESS',
    color : 'LightPurple',
    colorTwo : 'P',
    colorThree : 'Pu'
},{
    emotion : 'LOATHING',
    color : 'DarkishViolet',
    colorTwo : 'Violet',
    colorThree : 'Vi'
},{
    emotion : 'DISGUST',
    color : 'LightViolet',
    colorTwo : 'Violet',
    colorThree : 'Vi'
},{
    emotion : 'BOREDOM',
    color : 'LightViolet',
    colorTwo : 'V',
    colorThree : 'Vi'
}]

const EmotionsAccordingToColorSeparatedInArray = [
[{
    emotion : 'RAGE',
    color : 'DarkIshRed',
    colorTwo : 'Red',
    colorThree : 'R'
},
{
    emotion : 'ANGER',
    color : 'LightRed',
    colorTwo : 'Red',
    colorThree : 'R'
},{
    emotion : 'ANNOYANCE',
    color : 'LightRed',
    colorTwo : 'Reddish',
    colorThree : 'R'
}],
[{
    emotion : 'VIGILANCE',
    color : 'DarkishOrange',
    colorTwo : 'Orange',
    colorThree : 'O'
},{
    emotion : 'ANTICIPATION',
    color : 'LightOrange',
    colorTwo : 'Orange',
    colorThree : 'O'
},{
    emotion : 'INTEREST',
    color : 'LightOrange',
    colorTwo : 'O',
    colorThree : 'O'
}],
[{
    emotion : 'ECSTACY',
    color : 'DarkIshYellow',
    colorTwo : 'Yellow',
    colorThree : 'Y'
},{
    emotion : 'JOY',
    color : 'LightYellow',
    colorTwo : 'Yellow',
    colorThree : 'Y'
},{
    emotion : 'SERENITY',
    color : 'LightYellow',
    colorTwo : 'Y',
    colorThree : 'Y'
}],
[{
    emotion : 'ADMIRATION',
    color : 'DarkIshGreen',
    colorTwo : 'Green',
    colorThree : 'G'
},{
    emotion : 'TRUST',
    color : 'LightGreen',
    colorTwo : 'Green',
    colorThree : 'G'
},{
    emotion : 'ACCEPTANCE',
    color : 'LightGreen',
    colorTwo : 'G',
    colorThree : 'G'
}],
[{
    emotion : 'TERROR',
    color : 'DarkIshCyan',
    colorTwo : 'Cyan',
    colorThree : 'Cy'
},{
    emotion : 'FEAR',
    color : 'LightCyan',
    colorTwo : 'Cyan',
    colorThree : 'Cy'
},{
    emotion : 'APPREHENSION',
    color : 'LightCyan',
    colorTwo : 'C',
    colorThree : 'Cy'
}],
[{
    emotion : 'AMAZEMENT',
    color : 'DarkIshBlue',
    colorTwo : 'Blue',
    colorThree : 'Bl'
},{
    emotion : 'SURPRISE',
    color : 'LightBlue',
    colorTwo : 'Blue',
    colorThree : 'Bl'
},{
    emotion : 'DISTRACTION',
    color : 'LightBlue',
    colorTwo : 'B',
    colorThree : 'Bl'
}],
[{
    emotion : 'GRIEF',
    color : 'DarkIshPurple',
    colorTwo : 'Purple',
    colorThree : 'Pu'
},{
    emotion : 'SADNESS',
    color : 'LightPurple',
    colorTwo : 'Purple',
    colorThree : 'Pu'
},{
    emotion : 'PENSIVENESS',
    color : 'LightPurple',
    colorTwo : 'P',
    colorThree : 'Pu'
}],
[{
    emotion : 'LOATHING',
    color : 'DarkishViolet',
    colorTwo : 'Violet',
    colorThree : 'Vi'
},{
    emotion : 'DISGUST',
    color : 'LightViolet',
    colorTwo : 'Violet',
    colorThree : 'Vi'
},{
    emotion : 'BOREDOM',
    color : 'LightViolet',
    colorTwo : 'V',
    colorThree : 'Vi'
}], 
]

module.exports = {Emotions, CompoundEmotions, EmotionsAccordingToColor, allEmotions, EmotionsAccordingToColorSeparatedInArray}