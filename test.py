from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

model = load_model("plant_disease_model.h5")

image_size = (224, 224)

test_image_path = "plant_disease_dataset/Tomato_Early_blight/1f402ddb-f3e8-4907-a793-320c8e43446a___RS_Erly.B 9460.JPG"

if not os.path.exists(test_image_path):
    print(f"Error: The file '{test_image_path}' does not exist. Please check the path.")
    exit()

img = image.load_img(test_image_path, target_size=image_size)
img_array = image.img_to_array(img) / 255.0 
img_array = np.expand_dims(img_array, axis=0)  

prediction = model.predict(img_array)

class_index = np.argmax(prediction)
confidence = np.max(prediction) * 100  

class_labels = {0: 'Tomato___Early_Blight', 1: 'Tomato___Late_Blight', 2: 'Healthy_Plant'}  

class_label = class_labels.get(class_index, "Unknown")

print(f"Prediction: {class_label} ({confidence:.2f}%)")
