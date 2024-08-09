// https://github.com/ollama/ollama/blob/main/docs/api.md

// Generate a completion
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

// Generate a chat completion

// Create a Model

// List Local Models
async function listLocalModels(server) {
    const response = await fetch(`http://${server}:11434/api/tags`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const data = await response.json();
    // console.log(data);
    return data   
}

// Show Model Information

// Copy a Model

// Delete a Model

// Pull a Model

// Push a Model

// Generate Embeddings

// List Running Models
async function listRunninglModels(server) {
    const response = await fetch(`http://${server}:11434/api/ps`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const data = await response.json();
    console.log(data);
    return data   
}

listRunninglModels('192.168.1.40')