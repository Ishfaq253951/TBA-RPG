const textElement = document.querySelector("#text")
const optionButtonsElement = document.querySelector("#option-buttons")

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement("button")
            button.innerText = option.text
            button.classList.add("btn")
            button.addEventListener("click", () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: "You wake up in a strange place and see a jar of blue goo near you.",
        options: [
            {
                text: "Take the goo",
                setState: { blueGoo: true },
                nextText: 2
            },
            {
                text: "Leave the goo",
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "You venture forth in search of answers to where you are when you come across a merchant.",
        options: [
            {
                text: "Trade the goo for a sword",
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, sword: true },
                nextText: 3
            },
            {
                text: "Trade the goo for a shield",
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, shield: true },
                nextText: 3
            },
            {
                text: "Take a free unkown potion",
                setState: {unknownPotion: true},    //revival Potion
                nextText: 3
            },
            {
                text: "Ignore merchant.",
                nextText: 3
            },
        ]
    },
    {
        id: 3,
        text: "After leaving the merchant you start to feel exhausted and stmble upon a small village next to an eerie castle.",
        options: [
            {
                text: "Explore the castle",
                nextText: 4
            },
            {
                text: "Find a room to sleep at in the small village",
                nextText: 5
            },
            {
                text: "Find some hay in a stable nearby to sleep in",
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: "You are so tired that you suddenly collapse and your head smashes against the floor. You die instantly!",
        options: [
            {
                text: "Start form beginning",
                nextText: -1
            },
            {
                text: "Try my luck with unkown potion",
                requiredState: (currentState) =>currentState.unknownPotion,
                setState: {unknownPotion: false},
                nextText: 7
            }
        ]
    },
    {
        id: 5,
        text: "Without any gold coins to buy a room, you  break into the nearest inn and fall asleep. After a few hours, the owner of the inn finds you and has the village guard lock you in a cell.",
        options: [
            {
                text: "Try my luck with the unknown potion",
                requiredState: (currentState) => currentState.unknownPotion,
                nextText: 8
            },
            {
                text: "Restart from beginning",
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: "You wake up well rested and full of energy ready to explore the nearby castle.",
        options: [
            {
                text: "Explore the castle",
                nextText: 9    
            },
            {
                text: "Ignore the castle and do nothing",
                nextText: 10
            }
        ]
    },
    {
        id: 7,
        text: "Oh! You were revived with a revival potion but you are still very weary. You exit the castle.",
        options: [
            {
                text: "Return to castle",
                nextText: 4
            },
            {
                text: "Find a room where you could rest",
                nextText: 5
            },
            {
                text: "Find a hay stack where you could sleep quietly",
                nextText: 6
            }
        ]
    },
    {
        id: 8,
        text: "You drink the unknown potion. Nothing happens because it was a revival potion and you are already alive.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 9,
        text: "While exploring the castle, you come across a huge, fierce dragon.",
        options: [
            {
                text: "Try to run away",
                nextText: 12
            },
            {
                text: "Attack it with your sword",
                requiredState: (currentState) => currentState.sword,
                nextText: 13
            },
            {
                text: "Hide behind your shield",
                requiredState: (currentState) => currentState.shield,
                nextText: 14
            },
            {
                text: "Throw the blue goo at the dragon",
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo: false},
                nextText: 15
            }
        ]
    },
    {
        id: 10,
        text: "You decided to ignore the castle and do nothing. You lazy prick!",
        options: [
            {
                text: "Now Explore the castle",
                nextText: 9
            },
            {
                text: "Still not doing anything",
                nextText: 11
            }
        ]
    },
    {
        id: 11,
        text: "You are a coward, so you died.",
        options: [
            {
                text: "Restart with honor",
                nextText: -1
            }
        ]
    },
    {
        id: 12,
        text: "Your attempts to run are vain and the monster easily gobbles you up.",
        options: [
            {
                text: "Restart",
                nextText: -1
            },
            {
                text: "Try luck with unknown potion",
                requiredState: (currentState) => currentState.unknownPotion,
                setState: {unknownPotion: false},
                nextText: 9
            }
        ]

    },
    {
        id: 13,
        text: "You foolishly thought this monster could be slain with a single sword.",
        options: [
            {
                text: "Restart",
                nextText: -1
            },
            {
                text: "Try your luck with unkown potion",
                requiredState: (currentState) => currentState.unknownPotion,
                setState: {unknownPotion: false},
                nextText: 9
            }
        ]
    },
    {
        id: 14,
        text: "The beast laughs as you hide behind your shiel like a coward. It ate you whole.",
        options: [
            {
                text: "Try your luck with unknown potion",
                requiredState: (currentState) => currentState.unknownPotion,
                setState: { unknownPotion: false },
                nextText: 9
            },
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 15,
        text: "You threw your jar of goo at the monster and it exploded. After the dust settled, you saw that the monster was destroyed. Seeing your victory, you decided to claim this castle as yours and live out the rest of your days there.",
        options: [
            {
                text: "Congratulations. Play Again.",
                nextText: -1
            }
        ]
    }
]

startGame()