# Building backend:
Run the following command after you have setup and installed the pipenv Python environment and are inside the pipenv shell:
```bash
pyinstaller --onefile .\backend\run.py
```

A .exe file will be built in the ./dist folder that is created. Currently this .exe will only work if the file is executed within the ./dist dir and within the pipenv shell created by the pipfile/pipfile.lock.

Ensure that you you build on the target operating system for the correct executable file. Ensrue that the dependencies are installed and that this is ran inside the pipenv shell env.
