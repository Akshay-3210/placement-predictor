# Student Placement Predictor

A machine learning web application that predicts whether a student will get placement based on their CGPA and IQ score.

## Features

- **ML Model**: Logistic Regression classifier trained on student placement data
- **Web Interface**: Beautiful, responsive UI built with HTML, CSS, and JavaScript
- **Real-time Predictions**: Get instant placement predictions with probability scores
- **Input Validation**: Client-side and server-side validation for data integrity
- **Feature Scaling**: StandardScaler for normalized input features

## Project Structure

```
ml-web-app/
├── app.py                  # Flask backend application
├── requirements.txt        # Python dependencies
├── model.pkl              # Trained logistic regression model
├── README.md              # This file
├── templates/
│   └── index.html         # Frontend UI
└── static/
    ├── style.css          # Styling
    └── script.js          # Client-side logic
```

## Requirements

- Python 3.14+
- Flask 3.1.3
- scikit-learn 1.8.0
- NumPy 2.4.3
- Pandas 3.0.1

## Installation

1. **Clone/Download** this repository

2. **Create Virtual Environment** (optional but recommended):
   ```bash
   python -m venv placement
   ```

3. **Activate Virtual Environment**:
   - Windows:
     ```bash
     .\placement\Scripts\activate
     ```
   - Mac/Linux:
     ```bash
     source placement/bin/activate
     ```

4. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. **Start the Flask App**:
   ```bash
   python app.py
   ```

2. **Open in Browser**:
   - Navigate to `http://127.0.0.1:5000`

3. **Make Predictions**:
   - Enter CGPA (0-10)
   - Enter IQ Score (50-200)
   - Click "Predict"
   - View result with placement probability

## Model Training (Colab)

To retrain the model with your own data:

1. **In Google Colab**:
   ```python
   from sklearn.linear_model import LogisticRegression
   from sklearn.preprocessing import StandardScaler
   import pandas as pd
   import pickle
   
   # Load your data
   df = pd.read_csv('your_data.csv')
   X = df[['cgpa', 'iq']]
   y = df['placed']
   
   # Scale and train
   scaler = StandardScaler()
   X_train_scaled = scaler.fit_transform(X_train)
   
   model = LogisticRegression(random_state=42, max_iter=1000)
   model.fit(X_train_scaled, y_train)
   
   # Save model
   pickle.dump(model, open('model.pkl', 'wb'))
   ```

2. **Download** `model.pkl` from Colab

3. **Replace** the old `model.pkl` in your project

4. **Update** `app.py` line 16 with your actual training data for StandardScaler

## API Endpoints

### GET `/`
Returns the prediction form (index.html)

### POST `/predict`
**Request**:
```json
{
  "cgpa": 8.5,
  "iq": 120
}
```

**Response**:
```json
{
  "prediction": 1,
  "probability": 0.875,
  "cgpa": 8.5,
  "iq": 120
}
```

Where:
- `prediction`: 1 = Placed, 0 = Not Placed
- `probability`: Confidence score (0-1)

## Model Performance

- **Algorithm**: Logistic Regression
- **Input Features**: CGPA, IQ Score
- **Output**: Binary Classification (Placed: 1, Not Placed: 0)
- **Scaling**: StandardScaler (fitted on training data)

## Configuration

To modify StandardScaler fitting data in `app.py`:

```python
# Line 15-16: Update with your actual training data
X_train_sample = np.array([
    [7.5, 110],
    [8.0, 115],
    [6.5, 105],
    # ... add your actual training data points
])
```

## Troubleshooting

**Error: "model.pkl not found"**
- Ensure `model.pkl` is in the project root directory

**Input validation errors**
- CGPA must be 0-10
- IQ must be 50-200

**Prediction errors**
- Check that model.pkl is properly formatted
- Verify training data in StandardScaler matches your model training data

## Technologies Used

- **Backend**: Flask (Python)
- **ML**: scikit-learn, pandas, NumPy
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Deployment**: Flask Development Server

## Future Enhancements

- Add more features (internship experience, projects, etc.)
- Deploy to cloud (Heroku, AWS, Google Cloud)
- Add model evaluation metrics
- Store predictions in database
- Add user authentication

## Author

Akshay Sharma

## License

Open source - Free to use and modify