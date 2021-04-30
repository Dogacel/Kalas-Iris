# Kalas-Iris User Manual

## 1) Build From Source

In this section we will explain how to build our project from source for exploration, testing or development.

Prefered development environment is Linux with 30GB+ disk space available. A CUDA supported GPU is required for running Machine Learning services such as image annotation and image retrieval.

Before starting you should fetch the repository from it's source:

```bash
$ git clone git@github.com:Dogacel/Kalas-Iris.git
$ cd Kalas-Iris && git pull --recurse-submodules
```

### Required Tools

#### Python3 (3.8 prefered)

```bash
$ sudo add-apt-repository ppa:deadsnakes/ppa
$ sudo apt update
$ sudo apt install python3.8
$ pip install virtualenv # Highly Suggested
```
#### NVIDIA CUDA drivers
Please install NVIDIA CUDA 11.0 drivers on your machine.
[Link](https://pytorch.org/get-started/locally/)

#### Node (14.4) and NPM

[More info](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/#installing-nodejs-and-npm-using-nvm)

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash # Install node version manager (nvm)
$ nvm install 14.4 # Install the required npm version
```

#### Flutter 2.0.5

Install flutter from [source](https://flutter.dev/docs/get-started/install) and follow the instructions given.

Spin up an Android emulator or connect your Android device and enable USB debugging.

Run the application using the following command:

```bash
$ cd mobile
$ flutter pub get
$ flutter run
```

### Pre-Build configuration


#### Download python packages
```bash
$ cd api # Locate to the api/ folder
$ python -m virtualenv venv # Create a virtual env for python
$ . venv/bin/activate # Activate the virtual env use don't forget to use 'deactivate' to exit venv
$ source venv/bin/activate # Mac users should use this to activate the virtual env
$ pip install -r requirements.txt # Install python dependencies
```

Repeat the steps above again for the `mmfashion` folder as well.


#### Download MMFashion module dependencies

MMFashion setup is highly complex, you can always visit [MMFashion Docs](https://github.com/open-mmlab/mmfashion/blob/master/docs/GETTING_STARTED.md) when you need.


##### Download Pre-Trained Models
First, visit the [Model Zoo Page](https://github.com/open-mmlab/mmfashion/blob/master/docs/MODEL_ZOO.md) and download the following models:
- VGG-16 Backbone => `checkpoint/vgg16.pth`
- Attribute Prediction Coarse / ResNet-50 Global Pooling => `checkpoint/resnet_coarse_global.pth`
- Category Attribute Prediction Fine / VGG-16 Global Pooling => `checkpoint/vgg16_fine_global.pth`
- In-Shop Clothes Retrieval / VGG-16 Global Pooling => `checkpoint/Retrieve/vgg/global/epoch_100.pth`

##### Prepare Data
[MMFashion Data Preperation Docs](https://github.com/open-mmlab/mmfashion/blob/master/docs/DATA_PREPARATION.md)

[Download DeepFashion Dataset](http://mmlab.ie.cuhk.edu.hk/projects/DeepFashion.html) and put it under `mmfashion/data`.

Set your file structure as the following:
```
In-shop
├── Anno
│   ├── segmentation
│   |   ├── DeepFashion_segmentation_train.json
│   |   ├── DeepFashion_segmentation_query.json
│   |   ├── DeepFashion_segmentation_gallery.json
│   ├── list_bbox_inshop.txt
│   ├── list_description_inshop.json
│   ├── list_item_inshop.txt
│   └── list_landmarks_inshop.txt
├── Eval
│   └── list_eval_partition.txt
└── Img
    ├── img
    |   ├──XXX.jpg
    ├── img_highres
    └── ├──XXX.jpg
```

And run `python prepare_in_shop.py` to arrange the dataset. For more information check [MMFashion Dataset Docs](https://github.com/open-mmlab/mmfashion/blob/master/docs/dataset/IN_SHOP_DATASET.md).

Finally update your backend IP address to point your local under `web/src/api/api.js` and `api/flaskr/routes/image.py`.

##### MongoDB 
Create a MongoDB instance on your local or on the Mongo Atlas cloud. Update your server paths under `api/flaskr/db.py`

After creating a database, create a .env file containing your username and password. It should have the following format. 
```bash
$ DATABASE_USERNAME = "yourusername"
$ DATABASE_PASSWORD = "yourpassword"
```
For more on .env files, you can visit [here](https://pypi.org/project/python-dotenv/) and [here](https://www.ibm.com/support/knowledgecenter/ssw_aix_72/osmanagement/env_file.html)


## 2) Running

### API

```bash
$ cd api
$ sh run.sh # Or ./run.sh
```

### Website

```bash
$ cd web
$ npm start # This might take a while on the first run. It will install dependencies
```

### MMFashion

```bash
$ cd mmfashion
$ sudp python app.py
```

## 3) Using Web Interface

### Annotating Clothing Images
![](docs/imgs/manual/web_annotate.png)


### Suggesting Better Annotations



### Reviewing Suggestions
![](docs/imgs/manual/review_instructions.png)

### Retrieving Similar Products
![](docs/imgs/manual/web_retrieve.png)

## 4) Enabling Auto Annotation For E-Commerce Websites

### Signing Up To Kalas-Iris Services

### Woo Commerce API Key setup

### Adding API Key to Kalas-Iris

### Woo Commerce Demo Flow

## 5) Using Mobile Interface

### Installing the APK

### Taking and Editing a Photo
<div style="text-align:center">
<img src="docs/imgs/manual/app_camera.png" style="width:300px; margin-right:100px"/>
<img src="docs/imgs/manual/app_crop.png" style="width:300px;"/>
</div>

### Using the Annotation Service

<div style="text-align:center">
<img src="docs/imgs/manual/app_gallery.png" style="width:300px;"/>
<img src="docs/imgs/manual/app_annotate.png" style="width:300px;"/>
</div>


### Using the Retrieval Service
<div style="text-align:center">
<img src="docs/imgs/manual/app_retrieve.png" style="width:300px;"/>
</div>
