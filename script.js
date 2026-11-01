// ========================================
// NSS-JARVIS-AI
// PERSONAL VOICE ASSISTANT
// ========================================


// SYSTEM VARIABLES

const synth = window.speechSynthesis;

let recognition = null;
let isListening = false;

const statusText = document.getElementById("status");
const answer = document.getElementById("answer");


// ========================================
// SPEAK FUNCTION
// ========================================

function speak(text) {

    answer.innerText = text;

    synth.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "bn-BD";
    speech.rate = 1;
    speech.pitch = 1;

    synth.speak(speech);
}


// ========================================
// VOICE RECOGNITION
// ========================================

function listen() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        speak("দুঃখিত, তোমার ব্রাউজারে ভয়েস রিকগনিশন সাপোর্ট নেই।");

        return;
    }

    if (isListening) {
        return;
    }

    recognition = new SpeechRecognition();

    recognition.lang = "bn-BD";
    recognition.interimResults = false;
    recognition.continuous = false;

    isListening = true;

    statusText.innerText = "LISTENING...";

    recognition.onresult = function(event) {

        const command =
            event.results[0][0].transcript.toLowerCase();

        answer.innerText = command;

        processCommand(command);

    };


    recognition.onerror = function(event) {
    isListening = false;

    document.getElementById("status").innerText = "VOICE ERROR";

    document.getElementById("answer").innerText =
        "Voice Error: " + event.error;
};

recognition.onend = function() {
    isListening = false;

    if (document.getElementById("status").innerText !== "VOICE ERROR") {
        document.getElementById("status").innerText = "JARVIS READY";
    }
};

try {
    recognition.start();
} catch (error) {
    isListening = false;

    document.getElementById("status").innerText = "VOICE ERROR";

    document.getElementById("answer").innerText =
        "Start Error: " + error.message;
}
}


// ========================================
// COMMAND PROCESSING SYSTEM
// ========================================

function processCommand(command) {


    // GREETING

    if (
        command.includes("হ্যালো") ||
        command.includes("হাই") ||
        command.includes("hello") ||
        command.includes("hi jarvis")
    ) {

        speak(
            "হ্যালো! আমি জার্ভিস। কীভাবে তোমাকে সাহায্য করতে পারি?"
        );

    }


    // TIME

    else if (
        command.includes("সময়") ||
        command.includes("কয়টা বাজে") ||
        command.includes("time")
    ) {

        const time = new Date().toLocaleTimeString("bn-BD");

        speak("এখন সময় " + time);

    }


    // DATE

    else if (
        command.includes("তারিখ") ||
        command.includes("date")
    ) {

        const date = new Date().toLocaleDateString("bn-BD");

        speak("আজকের তারিখ " + date);

    }


    // YOUTUBE

    else if (
        command.includes("ইউটিউব") ||
        command.includes("youtube")
    ) {

        speak("ইউটিউব খোলার চেষ্টা করছি।");

        window.open(
            "https://www.youtube.com",
            "_blank"
        );

    }


    // GOOGLE

    else if (
        command.includes("গুগল") ||
        command.includes("google")
    ) {

        speak("গুগল খুল
