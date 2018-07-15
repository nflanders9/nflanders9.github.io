async function animate() {
    var commands = document.getElementsByClassName("terminal-type");
    var results = document.getElementsByClassName("terminal-output");
    var prompts = document.getElementsByClassName("terminal-prompt");
    for (var i = 0; i < commands.length; ++i) {
        commands[i].hidden = true;
        results[i].hidden = true;
        var prompt = prompts[i + 1];
        if (prompt != null) {
            prompt.hidden = true;
        }
    }
    await sleep(2000);
    for (var i = 0; i < commands.length; ++i) {
        await animateElement(commands[i], results[i], prompts[i + 1]);
        await sleep(2000);
    }
}

async function animateElement(command, result, nextPrompt) {
    var originalHTML = command.innerHTML;
    var originalText = command.textContent;
    command.textContent = "";
    command.hidden = false;
    for (var i = 0; i < originalText.length; ++i) {
        command.textContent = command.textContent.slice(0, -1) + originalText[i] + "\u258B";
        if (Math.random() < 0.03 && i + 1 < originalText.length) {
            await typo(command, originalText, i);
        }
        await sleep(getRandomKeyDelay());
    }
    command.innerHTML = originalHTML;
    await sleep(200)
    result.hidden = false;
    if (nextPrompt != null) {
        nextPrompt.hidden = false;
    }
}

async function typo(element, text, index) {
    element.textContent = element.textContent.slice(0, -1) + String.fromCharCode(Math.floor((Math.random() * 97) + 26));
    await sleep(getRandomKeyDelay());
    var addedChars = 0;
    for (var i = index + 1; i < index + (3 + Math.random() * 5) && (i < text.length); ++i) {
        element.textContent = element.textContent.slice(0, -1) + text[i] + "\u258B";
        ++addedChars;
        await sleep(getRandomKeyDelay());
    }
    await sleep(150);
    for (; addedChars > 0; --addedChars) {
        element.textContent = element.textContent.slice(0, -2) + "\u258B";
        await sleep(getRandomKeyDelay());
    }
}

function getRandomKeyDelay(lastCharacter) {
    return (Math.random() * 75) + (lastCharacter == ' ' ? 350 : 50);
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
