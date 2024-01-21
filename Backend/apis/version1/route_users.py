from db.repository.users import create_new_user
from db.session import get_db
from fastapi import APIRouter
from fastapi import Depends
from schemas.users import UserCreate
from schemas.users import ShowUser
from sqlalchemy.orm import Session
import datetime
from fastapi_utils.tasks import repeat_every
import smtplib
import random

router = APIRouter()

HOST = "smtp-mail.outlook.com"
PORT = 587
FROM_EMAIL = "bemyvalentine-iit@outlook.com"
URL = "http://localhost:5173"

otp_list = {}

# @router.on_event('startup')
# @repeat_every(seconds=10)
# async def clean_otp():
#     print("hi")

@router.get("/verify/{email}/{code}" , response_model=ShowUser)
def verify(code: int, email: str, db: Session = Depends(get_db)):
    user = otp_list[email][1]
    print(otp_list)
    print(user)
    if code == otp_list[email][0] and datetime.datetime.now() < otp_list[email][2]:
        new_user = create_new_user(user=user, db=db)
        return new_user
    else:
        return {"msg": "failed"}
    

@router.post("/signup")
def create_user(user: UserCreate):
    # send verification mail and verify 
    global otp_list
    code = random.randint(100000, 999999)
    try:
        # http://localhost:5173/verify?email=anshanandp@gmail.com&otp=929523
        link = URL + "/verify?email=" + (user.email) + '&otp=' + str(code) 
        BODY = "\r\n".join((
            "From: %s" % FROM_EMAIL,
            "To: %s" % user.email,
            "Subject: %s" % "test email from gpt" ,
            "",
            "Welcome to ConnectGPT!",
            "Follow the below link to verify : " + link,
            ))
        server = smtplib.SMTP(HOST, PORT)
        server.starttls()
        server.login(FROM_EMAIL, "1@2@3@4@")
        server.sendmail(FROM_EMAIL, user.email, BODY )
        server.quit()
        otp_list[user.email] = [code, user ,
                                datetime.datetime.now() + datetime.timedelta(hours=1)]
    except Exception as e:
        print(e)
        print("Error: error while sending mail")
    return {"msg": "success"}
