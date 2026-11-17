
const durationSelect = document.getElementById("duration");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const errorsDisplay = document.getElementById("errors");
const typingInput = document.getElementById("typingInput");
const passage = document.getElementById("passage");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const message = document.getElementById("message");

const defaultMode = document.getElementById("defaultMode");
const importMode = document.getElementById("importMode");
const pasteMode = document.getElementById("pasteMode");
const fileInput = document.getElementById("fileInput");
const customPassageArea = document.getElementById("customPassageArea");
const customPassage = document.getElementById("customPassage");
const usePassageButton = document.getElementById("usePassage");


const passages = {
    1: [
        `A beautiful morning brings fresh energy and new opportunities. The birds sing, the flowers bloom, and the world feels peaceful. Every day is a chance to learn something useful. Start with a positive thought, stay focused, and enjoy the little things in life.`,

        `Reading books is a wonderful habit. It improves our knowledge, develops imagination, and helps us understand the world. A few minutes of reading every day can make a big difference. Choose a good book, find a quiet place, and enjoy the journey.`,

        `Good habits make our lives better. Waking up early, drinking enough water, and exercising regularly can improve our health. We should also respect others, speak kindly, and use our time wisely. Small steps can create great changes.`
    ],

    2: [
        `Learning a new skill requires patience and regular practice. Typing is useful for students, professionals, and anyone who works with computers. At first, accuracy may seem difficult, but improvement comes with time. Keep your hands relaxed, look at the screen, and focus on every letter.`,

        `Travelling allows us to explore different cultures and meet interesting people. Every place has its own traditions, food, history, and natural beauty. A journey can teach us valuable lessons about the world. Planning carefully and remaining curious can make every trip memorable.`,

        `Time is one of the most valuable resources we have. Once a moment passes, it cannot be recovered. People who plan their activities carefully often achieve better results. Setting clear goals, avoiding distractions, and completing tasks on time can make everyday life more productive.`
    ],

    5: [
        `Technology has changed the way people communicate, study, and work. Computers allow us to access information, create documents, and connect with people across the world. However, technology is most useful when it is combined with responsibility and good judgment. Developing digital skills can create new opportunities for education and employment. Regular practice helps people become more confident and efficient.`,

        `Nature provides everything that living beings need to survive. Forests produce oxygen, rivers supply water, and fertile soil supports agriculture. Unfortunately, pollution and careless human activities threaten many natural resources. Protecting the environment requires cooperation, awareness, and responsible choices. Every person can contribute by reducing waste, saving water, and planting trees.`,

        `A successful team depends on trust, communication, and cooperation. Every member brings different abilities and experiences to a shared goal. Listening carefully helps people understand one another and prevents unnecessary confusion. When difficulties appear, a strong team focuses on solutions instead of blame. Cooperation often produces better results than individual effort alone.`
    ],

    10: [
        `The development of human knowledge has always depended on curiosity and experimentation. Throughout history, people have observed the natural world, asked questions, tested explanations, and shared discoveries. Scientific progress rarely follows a perfectly straight path. Researchers sometimes encounter unexpected results that require them to reconsider their assumptions. These experiences demonstrate why patience, careful observation, and honest reporting are essential. Modern technology has made it possible to examine problems at a scale that earlier generations could hardly imagine. Nevertheless, reliable knowledge still depends on evidence, critical thinking, and the willingness to accept corrections. Education should encourage people not only to remember information but also to understand how conclusions are reached. When individuals learn to examine claims carefully, they become better prepared to make informed decisions in everyday life.`,

        `Financial responsibility begins with understanding how money is earned, spent, and saved. Creating a simple budget can help individuals recognise their priorities and avoid unnecessary expenses. Before purchasing something, it is useful to consider whether the item is essential, affordable, and likely to provide lasting value. Saving regularly, even in small amounts, can provide security during unexpected situations. People should also learn to distinguish between reliable information and unrealistic promises. Financial knowledge does not guarantee wealth, but it can reduce confusion and support sensible decisions. Developing these habits early can make it easier to plan for education, family responsibilities, and future goals. Patience is especially important because long-term progress usually comes from consistent decisions rather than sudden changes.`,

        `Communication is more than the exchange of words. It involves listening, observing, understanding emotions, and presenting ideas in a clear manner. In classrooms and workplaces, effective communication helps people share knowledge and solve problems. Misunderstandings often occur when individuals make assumptions without asking questions. A thoughtful listener gives others enough time to explain their views and responds with respect. Written communication also requires attention to grammar, structure, and tone. Digital messages may travel quickly, but they should still be accurate and considerate. Strong communication skills improve relationships and make cooperation easier. They also help individuals express disagreement without creating unnecessary conflict.`
    ],

    15: [
        `The modern world offers remarkable opportunities for people who are willing to learn and adapt. New industries appear, existing professions change, and technology introduces tools that influence nearly every part of daily life. These developments make education a continuous responsibility rather than an activity limited to childhood or formal institutions. Individuals who remain curious are often better prepared to recognise opportunities and respond to unfamiliar situations. However, learning effectively requires more than collecting information. It involves comparing ideas, checking evidence, asking meaningful questions, and applying knowledge to practical problems. A person may read many books and still struggle to make good decisions if they never reflect on what those books contain. Experience becomes valuable when people examine their successes and failures honestly. By combining knowledge with patience and responsible action, individuals can build skills that remain useful even when circumstances change.`,

        `Cities are complex places where millions of people share limited space, transport systems, public services, and natural resources. Good urban planning attempts to make these environments safer, healthier, and more convenient for everyone. Public transport can reduce traffic congestion, while parks provide spaces for recreation and improve the quality of urban life. Reliable water supplies, effective waste management, and accessible healthcare are equally important. Yet cities face difficult challenges, including population growth, pollution, housing shortages, and unequal access to opportunities. Addressing these problems requires cooperation between residents, businesses, planners, and public institutions. Long-term solutions should consider not only immediate convenience but also environmental effects and the needs of future generations. A successful city is not simply a place with impressive buildings and busy streets. It is a community where people can live with dignity, safety, and a reasonable opportunity to improve their lives.`,

        `Creativity is often misunderstood as a special talent possessed by only a small number of people. In reality, creative thinking can develop through observation, experimentation, and regular practice. It begins when someone notices a problem and becomes curious about possible solutions. Artists, engineers, teachers, and entrepreneurs all use creativity in different ways. Some improve existing methods, while others develop entirely new approaches. The process is rarely perfect at the beginning. Initial ideas may be incomplete, impractical, or confusing. Instead of abandoning them immediately, creative individuals examine what works, identify weaknesses, and make improvements. Collaboration can also introduce perspectives that one person might never discover alone. A supportive environment allows people to ask questions and take reasonable risks without feeling embarrassed by every mistake. Creativity becomes especially powerful when imagination is combined with discipline, knowledge, and a willingness to complete difficult work.`
    ]
};

let defaultText = passages[1][0];


let originalText = defaultText;
let timer = null;
let timeLeft = 60;
let started = false;

function displayPassage() {
    passage.innerHTML = "";

    [...originalText].forEach(character => {
        const span = document.createElement("span");
        span.textContent = character;
        span.className = "pending";
        passage.appendChild(span);
    });
}

function resetTest() {
    clearInterval(timer);
    timer = null;
    started = false;

    timeLeft = Number(durationSelect.value) * 60;

    const minutes = Math.floor(timeLeft / 60);
const seconds = timeLeft % 60;

timeDisplay.textContent =
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0");
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100%";
    errorsDisplay.textContent = "0";

    typingInput.value = "";
    typingInput.disabled = true;
    startButton.disabled = false;
    startButton.textContent = "Start Test";

    message.textContent = "Press Start Test when you are ready.";

    displayPassage();
}

function startTest() {
    resetTest();

    if (!originalText.trim()) {
        message.textContent = "Please choose a passage first.";
        return;
    }

    started = true;
    typingInput.disabled = false;
    typingInput.focus();

    startButton.disabled = true;
    startButton.textContent = "Test Running";

    message.textContent = "Start typing!";

    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        updateStats();

        if (timeLeft <= 0) {
            finishTest();
        }
    }, 1000);
}

function updateStats() {
    const typedText = typingInput.value;
    const characters = passage.querySelectorAll("span");

    let correct = 0;
    let errors = 0;

    characters.forEach((span, index) => {
        span.className = "pending";

        if (index < typedText.length) {
            if (typedText[index] === originalText[index]) {
                span.className = "correct";
                correct++;
            } else {
                span.className = "incorrect";
                errors++;
            }
        } else if (index === typedText.length) {
            span.className = "current";
        }
    });

    const accuracy = typedText.length === 0
        ? 100
        : Math.round((correct / typedText.length) * 100);

    const elapsedSeconds =
        Number(durationSelect.value) * 60 - timeLeft;

    const wpm = elapsedSeconds > 0
        ? Math.round((correct / 5) / (elapsedSeconds / 60))
        : 0;

    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy + "%";
    errorsDisplay.textContent = errors;
}

function finishTest() {
    clearInterval(timer);
    timer = null;
    started = false;

    typingInput.disabled = true;
    startButton.disabled = false;
    startButton.textContent = "Start Again";

    message.textContent = "Test completed! Well done!";
}

function changePassage(newText) {
    if (!newText.trim()) {
        message.textContent = "Please enter a valid passage.";
        return;
    }

    originalText = newText.trim();
    customPassageArea.style.display = "none";
    resetTest();

    message.textContent = "Your new passage is ready!";
}

defaultMode.addEventListener("click", () => {
    changePassage(defaultText);
});

importMode.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".txt")) {
        message.textContent = "Please select a .txt file.";
        return;
    }

    const reader = new FileReader();

    reader.onload = () => {
        changePassage(reader.result);
    };

    reader.onerror = () => {
        message.textContent = "Could not read this file.";
    };

    reader.readAsText(file);
    fileInput.value = "";
});

pasteMode.addEventListener("click", () => {
    customPassageArea.style.display = "block";
    customPassage.focus();
});

usePassageButton.addEventListener("click", () => {
    changePassage(customPassage.value);
});

startButton.addEventListener("click", startTest);
resetButton.addEventListener("click", resetTest);

typingInput.addEventListener("input", () => {
    if (!started) return;

    updateStats();

    if (typingInput.value.length >= originalText.length) {
        finishTest();
    }
});


durationSelect.addEventListener("change", () => {
    const selectedTime = Number(durationSelect.value);

    // Select a random passage for the chosen duration
    const options = passages[selectedTime];
    const randomIndex = Math.floor(Math.random() * options.length);

    defaultText = options[randomIndex];
    originalText = defaultText;

    // Reset the test with the new passage
    resetTest();

    message.textContent = "A new passage is ready!";
});


resetTest();
