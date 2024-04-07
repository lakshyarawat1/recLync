FROM python:3.9

COPY . /app

WORKDIR /app

RUN pip install --upgrade pip

# RUN apk update

# RUN apk add

# RUN apk add make automake gcc g++ subversion python3-dev

# RUN  apk add --no-cache  gfortran

# RUN apk add openblas-dev

RUN  pip3 install scipy

RUN pip install -r requirements.txt

EXPOSE 4000

ENTRYPOINT [ "python" ]

CMD [ "init.py" ]

