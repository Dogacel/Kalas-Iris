# Kalas-Iris

Feel free to edit this document.

## About

Kalas-Iris CS491/2 Senior Design Project, Clothes recognition and rich attribute prediction using computer vision service for online clothing retail

[Project Specifications Report](Reports/Project_Specifications_Report.pdf)

[Analysis Report](Reports/Analysis_Report.pdf)

### TODO:

- [:white_check_mark:] Determine a CSS Framework (Material, Ant...)
- [:white_check_mark:] Add database connection (decide NoSQL vs SQL)
- [:white_check_mark:] Create single image upload page
- [ ] Fix MMFashion codebase
- [ ] Add documentation for MMFashion
- [ ] Add more tasks

## Project Structure

- `api/` flask app for the web app api.
- `web/` node app for the web app ui.
- `Scripts/` python scripts for data analysis / machine learning.

## Project Setup

Note that sometimes command `python/pip` might refer to python2.7 and `python3/pip3 might `refer to python3.\*. Use python3 and pip3 instead of python/pip if you are facing this problem.

### Requirements

Prefered dev env. is Linux or WSL under Windows. Machine Learning scripts can be run under Anaconda for windows for CUDA integrity.)

### Python3 (3.8 prefered)

```bash
$ sudo add-apt-repository ppa:deadsnakes/ppa
$ sudo apt update
$ sudo apt install python3.8
$ pip install virtualenv # Required
```

### Node (14.4) and NPM

[More info](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/#installing-nodejs-and-npm-using-nvm)

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash # Install node version manager (nvm)
$ nvm install 14.4 # Install the required npm version
```

### Setup

You only have to setup once unless there are new features added.

```bash
$ cd api # Locate to the api/ folder
$ python -m virtualenv venv # Create a virtual env for python
$ . venv/bin/activate # Activate the virtual env use don't forget to use 'deactivate' to exit venv
$ source venv/bin/activate # Mac users should use this to activate the virtual env
$ pip install -r requirements.txt # Install python dependencies
```

_Note_: There are no database connections right now. The setup instructions are open to change.

### Running

#### API

```bash
$ cd api
$ sh run.sh # Or ./run.sh
```

#### Website

```bash
$ cd web
$ npm start # This might take a while on the first run. It will install dependencies
```

#### MMFashion (WIP)

```bash
$ echo "WIP"
```

#### MongoDB 
After gaining permission to the database, create a .env file containing your username and password. It should have the following format. 
```bash
$ DATABASE_USERNAME = "yourusername"
$ DATABASE_PASSWORD = "yourpassword"
```
For more on .env files, you can visit [here](https://pypi.org/project/python-dotenv/) and [here](https://www.ibm.com/support/knowledgecenter/ssw_aix_72/osmanagement/env_file.html)

### About Git and Github

If you are having troubles using git on command line, I highly suggest you to use [GitKraken](https://www.gitkraken.com/). You can also see their [tutorials](https://www.gitkraken.com/learn/git) they are short. But still I will try to explain some about the workflow.

- Use issues and pull requests.

- Everyone uses their own branches ideally. Those branches get merged after they are completed. For example if you want to add an about page, create a branch ata/about-page. Work on that branch. If someone needs to work with you, they will also work on that branch. This might not be the case in the beginning of the project, it is OK to use until codebase gets complex. But still, please don't upload broken commits.

- **Never force push.**

- Stash your local changes before you pull.

- Pull the master or the branch you are working on everytime you start doing something. **NEVER** pull while you have local changes and merge. Unnecessary merge commits will make git repository very complex and hard to deal with. Also you might mess up the code.

- When a merge is necessary, please don't just overwrite the incoming changes. Take your time and work on it.

### Useful Links

- [React](https://reactjs.org/tutorial/tutorial.html)
- [Flask](https://flask.palletsprojects.com/en/1.1.x/tutorial/) (Ignore blueprints, we have react)
- [MMFashion](https://github.com/open-mmlab/mmfashion)
- [MongoDB](https://www.mongodb.com)
- [AntDesign](https://ant.design/)
