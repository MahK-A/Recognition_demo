import "./styles.css";

if (window.webkitSpeechRecognition) {
  const startButton = document.getElementById("startRecord");
  const stopButton = document.getElementById("stopRecord");
  const undoButton = document.getElementById("undo");
  const resultText = document.getElementById("resultText");
  const resulltList = document.getElementById("resultList");

  startButton.addEventListener("click", startRec);
  stopButton.addEventListener("click", stopRec);
  undoButton.addEventListener("click", undo);

  let isRecording = false;
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = true;

  recognition.onend = function() {
    console.log("end!");
  };

  recognition.onresult = function(event) {
    console.dir(event);
    const results = event.results[0][0].transcript;
    console.log(`results : ${results}`);
    //console.lof('results' + results);
    //resultText.innerText = results;

    const resultItem = document.createElement("li");
    resultItem.innerText = results;
    resultList.appendChild(resultItem);
  };

  function startRec() {
    console.log("recording start!");
    isRecording = true;
    recognition.start();
  }

  function stopRec() {
    console.log("recording stop!");
    isRecording = false;
    recognition.stop();
  }

  function undo() {
    console.log("undo");
    const latestResult = resulltList.lastChild;
    if (latestResult) {
      latestResult.remove();
    }
  }
} else {
  console.log("sorry, cannnot use recognition API");
}
