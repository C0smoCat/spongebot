module.exports = {
    bot: {
        group_id: undefined, // your group id
        polling_timeout: 90,
        token: undefined // long poll token
    },
    call_test: /^\[?(тест\-бот|@?club163714642)?\|?(тест\-бот|@?club163714642)\]?,?\s*/i, // set your screen_name
    start_test: /^\s*\/*\s*\\*\s*(начать|старт|start|go|song)\s*$/i, // trigger
    song: {
        title: "Губка Боб Квадратные Штаны",
        short: "spangebob",
        lyrics: [
            {
                text: "Вы готовы дети?",
                attachments: ["photo-163714642_457239030"],
                answers: ["Да, Капитан!"]
            },
            {
                trigger: /^\s*-?\s*да+\s*,?\s*капита+н\s*!?\s*$/i,
                text: "Я не слыыышуууу!",
                answers: ["ТАК ТОЧНО, КАПИТАН!"]
            },
            {
                trigger: /^\s*-?\s*та+к\s*точно+\s*,?\s*капита+н\s*!?\s*$/i,
                text: "Ооооооооооооо........."
            },
            {
                trigger: undefined,
                text: "Кто проживает на дне океана?",
                answers: ["Спанч Боб Square Pants!", "Губка Боб Квадратные Штаны!"]
            },
            {
                trigger: /^\s*(спанч|гу[бп]ка)\s*боб\s*(square|квадратные|скв[еэ]р)\s*(pants|штаны|п[еэ]нт?[сз])\s*!?\s*$/i,
                text: "Желтая губка, малыш без изъяна...",
                answers: ["Губка Боб Квадратные Штаны!", "Спанч Боб Square Pants!"]
            },
            {
                trigger: /^\s*(спанч|гу[бп]ка)\s*боб\s*(square|квадратные|скв[еэ]р)\s*(pants|штаны|п[еэ]нт?[сз])\s*!?\s*$/i,
                text: "Кто побеждает всегда и везде?",
                answers: ["Спанч Боб Square Pants!", "Губка Боб Квадратные Штаны!"]
            },
            {
                trigger: /^\s*(спанч|гу[бп]ка)\s*боб\s*(square|квадратные|скв[еэ]р)\s*(pants|штаны|п[еэ]нт?[сз])\s*!?\s*$/i,
                text: "Кто также ловок как рыба в воде?",
                answers: ["Губка Боб Квадратные Штаны!", "Спанч Боб Square Pants!"]
            },
            {
                trigger: /^\s*(спанч|гу[бп]ка)\s*боб\s*(square|квадратные|скв[еэ]р)\s*(pants|штаны|п[еэ]нт?[сз])\s*!?\s*$/i,
                text: "Спанч Боб Square Pants!"
            },
            {
                trigger: undefined,
                text: "Спанч Боб Square Pants!"
            },
            {
                trigger: undefined,
                text: "Спанч Боб Square Pants!"
            },
            {
                trigger: undefined,
                text: "Спанч Боб... Square Pants!"
            },
            {
                trigger: undefined,
                attachments: ["photo-163714642_457239031"]
            }
        ]
    }
};