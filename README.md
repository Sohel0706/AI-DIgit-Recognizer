# AI-DIgit-Recognizer

Steps to run : 

a. clone the repo
b. download dependencies from requirements.txt
c. run "python app.py" to lauch flask app in localhost

Steps to reproduce :

1. Import data from mnist dataset containing 70000 handwritten digits and their respective labels.
2. Create a CNN model from tf.keras containing convolutional, pooling, flatten and dense layers.
3. Train the CNN model on the mnist dataset, for a greater number of epochs for better prediction accuracy. Save the model using model.save("filename").
4. Create a HTML page in the templates folder of Flask app directory with canvas element in it.
5. Link a javascript file with the html, which will have the necessary function to draw on the canvas according to the movement of the mouse between mousedown and mouseup event. When the "predict" button is pressed canvas.toDataUrl() function converts the drawing into an image and sends a POST type XmlHttpRequest to your flask api with the image in the payload.
6. The Flask api receives the image, preprocesses it using CV2(Computer Vision) and numpy library, and runs predict on the preprocessed input using the h5 file which was saved from the model in Step 3, and then it renders the html template(same in get method type) with the correct prediction, made by the supervised model.
