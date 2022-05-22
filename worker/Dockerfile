FROM python:3.11-rc-slim

COPY requirements.txt /usr/src/app/
RUN pip install --no-cache-dir -r /usr/src/app/requirements.txt

COPY *.py /usr/src/app/

CMD ["python3", "-u", "/usr/src/app/worker.py"]