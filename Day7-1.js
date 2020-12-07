const fs = require('fs');

const rules = Array.from(
        fs.readFileSync('day7-input.txt', 'utf-8')
        .matchAll(/^\s*(.*) bags contain (.*)\.\s*$/gm)
    )
    .map(ruleParts => ({
        color: ruleParts[1],
        contents: ruleParts[2]
            .split(/,/g)
            .filter(ruleContent => !/no other bags/.test(ruleContent))
            .map(ruleContent => {
                const contentParts = ruleContent.match(/^\s*(\d+) (.*) bags?\.?\s*$/);
                return {
                    count: parseInt(contentParts[1]),
                    color: contentParts[2]
                };
            })
    })
);


const rulesMap = rules.reduce((ruleMap, rule) => {
    ruleMap.set(rule.color, rule);
    return ruleMap;
}, new Map());

function canBagContainColor(containerColor, targetColor) {
    const rule = rulesMap.get(containerColor);

    if (!rule) {        
        return false;
    }

    if (rule.contents.some(content => content.color === targetColor)) {
        return true;
    }

    if (rule.contents.some(content => canBagContainColor(content.color, targetColor))) {
        return true;
    }

    return false;
}

const colorsThatContainShinyGold = new Set(
    rules
    .filter(rule => canBagContainColor(rule.color, 'shiny gold'))
    .map(rule => rule.color)
);

console.log(colorsThatContainShinyGold.size);
