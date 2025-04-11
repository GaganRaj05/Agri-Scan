from PIL import Image
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.models import Model
import numpy as np
from tensorflow.keras.preprocessing import image

dataset_dir = "plant_disease_dataset"  
batch_size = 32 
image_size = (224, 224)  
epochs = 5 

datagen = ImageDataGenerator(
    rescale=1./255,        
    validation_split=0.2     
)

train_generator = datagen.flow_from_directory(
    dataset_dir,
    target_size=image_size,
    batch_size=batch_size,
    class_mode='categorical',  
    subset='training'          
)

val_generator = datagen.flow_from_directory(
    dataset_dir,
    target_size=image_size,
    batch_size=batch_size,
    class_mode='categorical',
    subset='validation'       
)

print("Class labels:", train_generator.class_indices)

base_model = MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,       
    weights='imagenet'       
)
base_model.trainable = False
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(256, activation='relu')(x)
predictions = Dense(train_generator.num_classes, activation='softmax')(x)  

model = Model(inputs=base_model.input, outputs=predictions)

model.compile(
    optimizer='adam',           
    loss='categorical_crossentropy',
    metrics=['accuracy']        
)

model.summary()

history = model.fit(
    train_generator,
    epochs=epochs,            
    validation_data=val_generator 
)

model.save('plant_disease_model.h5')  
print("Model saved!")


test_image_path = "plant_disease_dataset/Tomato___Early_Blight/0001.jpg"
img = image.load_img(test_image_path, target_size=image_size)
img_array = image.img_to_array(img) / 255.0  
img_array = np.expand_dims(img_array, axis=0)  

prediction = model.predict(img_array)
class_index = np.argmax(prediction)
class_label = list(train_generator.class_indices.keys())[class_index]
confidence = np.max(prediction) * 100

print(f"Prediction: {class_label} ({confidence:.2f}%)")