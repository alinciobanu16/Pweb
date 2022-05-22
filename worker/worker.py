import pika
import time
import smtplib
import json
from email.message import EmailMessage

time.sleep(30)

print("Worker started")

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='rabbitmq'))
channel = connection.channel()
channel.queue_declare(queue='task_queue', durable=True)

print("Worker connected")


def callback(ch, method, properties, body):
    cmd = body.decode()
    y = json.loads(cmd)
    msg = EmailMessage()
    msg.set_content("Hello,\n    Refugee "+y["refName"]+" could use your services: "+y["helpService"]+".\n    You can send him an email at: "+y["refEmail"]+"\n    You can call him at: "+y["refPhoneNumber"])

    msg['Subject'] = "Refugee "+y["refName"]+" accepted your help"
    msg['From'] = "refugeeApp@email.com"
    msg['To'] = y["sendTo"]

    gmail_user = 'rares3270@gmail.com'
    gmail_password = 'qefmjrxhygfimpim'

    try:
        smtp_server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        smtp_server.ehlo()
        smtp_server.login(gmail_user, gmail_password)
        smtp_server.send_message(msg)
        smtp_server.close()
        print ("Email sent successfully!")
    except Exception as ex:
        print ("Something went wrong….",ex)

    print("Received %s" % cmd)
    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='task_queue', on_message_callback=callback)
channel.start_consuming()
