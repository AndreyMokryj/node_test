<h2>Pre-requirements:</h2>
- Docker
<h4>OR</h4>
- Node JS
- Tesseract OCR

<h2>Clone the repo</h2>

~~~
$ git clone https://github.com/AndreyMokryj/node_test
~~~
<h2>Run with Docker:</h2>

<h3>Building an image</h3>

~~~
$ docker-compose build
~~~

<h3>Running containers</h3>

~~~
$ docker-compose up
~~~

<h3>Stopping containers</h3>

~~~
$ docker-compose down
~~~

<h2>Alternatively, you can run with npm</h2>

1. Install packages
~~~
$ npm i
~~~

2. Run app
~~~
$ npm run app
~~~

2. Run worker in separate terminal tab
~~~
$ npm run worker
~~~

<h2>Test the results</h2>
http://127.0.0.1:10000/api/image

<h3>Request body</h3>

~~~
{
    "fileUrl": "https://previews.123rf.com/images/happyroman/happyroman1611/happyroman161100004/67968361-atm-transaction-printed-paper-receipt-bill-vector.jpg"
}
~~~

<h3>Server's response</h3>

~~~
{
    "message": "File url has been sent to queue."
}
~~~

<h3>Worker's response</h3>

~~~
Result:

ATM TRANSACTION

 

TERMINAL # 65425899
SEQUNCE # 8564
DATE 15:18 08/10/2016

CARD NUMBER XXXXXXXXXXXX5698

CUSTOMER NAME JOHN EMPTY
REQUSTED AMOUNT $100.00
TERMINAL FEE S125

TOTAL AMOUNT $101.25
~~~
