import numpy as np
import pandas as pd

import tensorflow as tf

mnist = tf.keras.datasets.mnist
((X_train, y_train), (X_test, y_test)) = mnist.load_data()

print(X_train.shape)
print(y_train.shape)
print(X_test.shape)
print(y_test.shape)
x_train = X_train.reshape((60000, 28, 28, 1))
x_test = X_test.reshape((10000, 28, 28, 1))
x_train, x_test = x_train.astype('float32')  / 255.0, x_test.astype('float32')  / 255.0

x_train_dat = x_train[:50000]
x_val = x_train[50000:]
y_train_dat = y_train[:50000]
y_val = y_train[50000:]