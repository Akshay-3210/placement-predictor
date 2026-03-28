document.getElementById('predictionForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const cgpa = document.getElementById('cgpa').value;
    const iq = document.getElementById('iq').value;
    
    // Validate inputs
    if (!cgpa || !iq) {
        showError('Please enter both CGPA and IQ values');
        return;
    }
    
    if (parseFloat(cgpa) < 0 || parseFloat(cgpa) > 10) {
        showError('CGPA must be between 0 and 10');
        return;
    }
    
    if (parseFloat(iq) < 50 || parseFloat(iq) > 200) {
        showError('IQ score must be between 50 and 200');
        return;
    }
    
    // Show loading state
    showLoading(true);
    hideError();
    
    try {
        // Create FormData to send
        const formData = new FormData();
        formData.append('cgpa', cgpa);
        formData.append('iq', iq);
        
        // Send prediction request
        const response = await fetch('/predict', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Prediction failed');
        }
        
        const data = await response.json();
        
        // Display result
        displayResult(data);
        
    } catch (error) {
        console.error('Error:', error);
        showError('An error occurred during prediction. Please try again.');
    } finally {
        showLoading(false);
    }
});

function displayResult(data) {
    const resultContainer = document.getElementById('resultContainer');
    const resultDiv = document.getElementById('result');
    
    const prediction = data.prediction;
    const probability = data.probability;
    
    // Clear previous result
    resultDiv.innerHTML = '';
    
    if (prediction === 1) {
        resultDiv.innerHTML = `
            <div class="result placed">
                🎉 Placed! 🎉
            </div>
            <div class="result probability">
                Placement Probability: ${(probability * 100).toFixed(2)}%
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <div class="result not-placed">
                ❌ Not Placed
            </div>
            <div class="result probability">
                Placement Probability: ${(probability * 100).toFixed(2)}%
            </div>
        `;
    }
    
    resultContainer.classList.remove('hidden');
    hideError();
}

function showError(message) {
    const errorContainer = document.getElementById('errorContainer');
    const errorMessage = document.getElementById('errorMessage');
    
    errorMessage.textContent = message;
    errorContainer.classList.remove('hidden');
    document.getElementById('resultContainer').classList.add('hidden');
}

function hideError() {
    document.getElementById('errorContainer').classList.add('hidden');
}

function showLoading(show) {
    const loadingContainer = document.getElementById('loadingContainer');
    if (show) {
        loadingContainer.classList.remove('hidden');
    } else {
        loadingContainer.classList.add('hidden');
    }
}

function resetForm() {
    document.getElementById('predictionForm').reset();
    document.getElementById('resultContainer').classList.add('hidden');
    document.getElementById('cgpa').focus();
}
