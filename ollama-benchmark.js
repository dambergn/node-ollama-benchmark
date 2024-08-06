const now = require('performance-now');
const fs = require('fs');
const path = require('path');

// Save to JSON file
async function saveToJSON(return_data, filePath) {
    // const filePath = '/tmp/temp.json';
    const dataStringify = JSON.stringify(return_data, null, 2);
    fs.writeFile(filePath, dataStringify, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Successfully wrote file!');
        }
    });
}

function msToTime(milliseconds) {
    // Convert milliseconds to seconds
    let totalSeconds = Math.floor(milliseconds / 1000);

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format the time as HH:MM:SS
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

const nanoToSeconds = (nanos) => {
    return Math.round(nanos / 1e9 * 1000) / 1000;
};

async function makeApiCall(server, model, prompt) {
    const response = await fetch(`http://${server}:11434/api/generate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: model,
            prompt: prompt,
            stream: false
        })
    });

    const data = await response.json();
    // console.log(data);
    return data
}

async function main() {
    const start = now();
    const server = "192.168.1.40" // GPU server
    // const model = "llama3.1"
    const model = "llama3.1:70b"
    // const model = "gemma2:2b"
    const prompt = "Why is the sky blue?";
    // const prompt = "What is the speed of light?";
    // const prompt = "What is red greens famous tagline?";
    let response = await makeApiCall(server, model, prompt);
    const end = now();
    const elapsedTime = (end - start).toFixed(2); // in milliseconds
    console.log(response)
    console.log(`Elapsed time: ${msToTime(elapsedTime)} ms`);
    let tps = response.eval_count / nanoToSeconds(response.total_duration)
    console.log("TOPs:", tps)
    saveToJSON(response, `./results/${Date()}.json`)
}

main()