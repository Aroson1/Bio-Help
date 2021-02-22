const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'The pigment that provides the slight yellow colour to urine',
        choice1: 'Urochrome',
        choice2: 'Bilirubin',
        choice3: 'Yellow spot',
        choice4: 'Glycosuria',
        answer: 1,
    },
    {
        question:
            "The fluid obtained after ultrafiltartion",
        choice1: "Urine",
        choice2: "Golmerular filtrate",
        choice3: "Water",
        choice4: "None of the above",
        answer: 2,
    },
    {
        question: "_____ equalizes of pressure on each side of the eardrum",
        choice1: "Eustachian tube",
        choice2: "Lacrimal Duct",
        choice3: "ENT Tube",
        choice4: "Dimethylmercury Injection",
        answer: 1,
    },
    {
        question: "Two hormones produced by the adrenal glands",
        choice1: "Epinephrine and Adrenaline",
        choice2: "Norepinephrine and Noradrenaline",
        choice3: "Noradrenaline and Epinephrine",
        choice4: "Nope it is a useless gland that does nothing",
        answer: 3,
    },
    {
        question: "Hormones that simulate other endocrine glands to produce their hormones",
        choice1: "Helper hormones",
        choice2: "TSH hormone",
        choice3: "HAHA hormone",
        choice4: "Tropic hormones",
        answer: 4,
    },
    {
        question: "The solvent used to dissolve the chlorophyll pigments while testing a leaf for starch",
        choice1: "Methylated spirit",
        choice2: "Methylated alcohol",
        choice3: "Methylated acid",
        choice4: "Methylated oxide",
        answer: 1,
    },
    {
        question: "What type sugar does DNA have and between which bases does triple bond occur",
        choice1: "Galactose, Adenine and Thymine",
        choice2: "Pentose, Guanine and Cytosine",
        choice3: "Glucose, No tiple bond in DNA",
        choice4: "Pentose, Nucleotide and Histones",
        answer: 2,
    },
    {
        question: "The fluid that transports fatty acids and glycerol",
        choice1: "Plasma",
        choice2: "Blood",
        choice3: "Lymph",
        choice4: "Saliva",
        answer: 3,
    },
    {
        question: "The part of the brain that carries impluses from one hemisphere of the cerebellum to the other",
        choice1: "Pons",
        choice2: "Corpus Callosum",
        choice3: "Brain Stem",
        choice4: "Thalamus",
        answer: 1,
    },
    {
        question: "Process by which homologous chromosomes exchange respective chromatid segments",
        choice1: "Crossing over",
        choice2: "Chisma",
        choice3: "centromere",
        choice4: "I like turtles",
        answer: 1,
    },
    {
        question: "Who is Alex?",
        choice1: "Why is this question here?",
        choice2: "I'll do you one better, why is Alex",
        choice3: "An amazing and incredible person",
        choice4: "Do you know what the guards outside of a samsung store are called? 'The gardians of the galaxy'.",
        answer: 3,
    }
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 11

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()