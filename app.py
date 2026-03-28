from flask import Flask, request, render_template, jsonify
import pickle
import numpy as np
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)

# Load model
try:
    model = pickle.load(open("model.pkl", "rb"))
except FileNotFoundError:
    print("ERROR: model.pkl not found. Please train and save your model.")
    model = None

# Initialize and fit StandardScaler once
# Fit with your training data from Colab (replace with actual values)
scaler = StandardScaler()
# Example: If your training data had CGPA range 6-10 and IQ range 80-150
# Fit with your actual training data
X_train_sample = np.array([[6, 80], [10, 150], [8, 120]])  # Sample data for fitting
scaler.fit(X_train_sample)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if model is None:
            return jsonify({
                "error": "Model not loaded. Please ensure model.pkl exists."
            }), 500
        
        # Get CGPA and IQ from form
        cgpa = float(request.form.get('cgpa'))
        iq = float(request.form.get('iq'))
        
        # Prepare input data
        input_data = np.array([[cgpa, iq]])
        
        # Scale the input
        input_scaled = scaler.transform(input_data)
        
        # Make prediction
        prediction = model.predict(input_scaled)[0]
        probability = model.predict_proba(input_scaled)[0]
        
        # Get probability for positive class (placement = 1)
        placement_probability = probability[1] if len(probability) > 1 else probability[0]
        
        return jsonify({
            "prediction": int(prediction),
            "probability": float(placement_probability),
            "cgpa": cgpa,
            "iq": iq
        })
    
    except ValueError:
        return jsonify({
            "error": "Invalid input. Please enter valid numbers for CGPA and IQ."
        }), 400
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({
            "error": "An error occurred during prediction."
        }), 500

if __name__ == "__main__":
    app.run(debug=True)