
from flask import Flask, render_template, request
import base64
import io
import cv2
from imageio import imread
import numpy as np
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

app = Flask(__name__)

@app.route("/predict", methods = ["GET", "POST"])
def save():
    if request.method == "GET":

        return render_template("index.html")
    
    elif request.method == "POST":

        data = request.form['url']
        draw = data.split(",")[1]

        decoded_data=base64.b64decode((draw))

        img = imread(io.BytesIO(decoded_data)) # working thill here
        resized = cv2.resize(img, (28, 28), cv2.INTER_AREA)

        # #make mask of where the transparent bits are
        # trans_mask = resized[:,:,3] == 0

        # #replace areas of transparency with white and not transparent
        # resized[trans_mask] = [255, 255, 255, 255]

        #new image without alpha channel...
        new_img = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)

        array = np.asarray(new_img).reshape(1, 28, 28)
        array = np.reshape(array, (1, 28, 28, 1)).astype("float")

        array = array / 255.0
  
        # Displaying the image 
        cv2.imwrite("reconstructed.png", new_img)


        img_file = open('image1112.png', 'wb')
        img_file.write(decoded_data)
        img_file.close()

        from tensorflow.keras.models import load_model
        model = load_model('number_recognizer50.h5')
        pred = model.predict(array)
        print("Pred = {0}".format(pred))
        pred = np.argmax(pred)
        print("Prediction = {0}".format(pred))
        return render_template("index.html", data = pred)
        
    
if __name__ == '__main__':
   app.run(debug = True)