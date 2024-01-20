from datetime import date
from datetime import datetime
from typing import Optional

from pydantic import BaseModel


# shared properties
class ProposalsBase(BaseModel):
    product_name: Optional[str] = None
    contact: Optional[str] = None
    quantity: Optional[int] = 1
    location: Optional[str] = "Remote"
    description: Optional[str] = None
    date_posted: Optional[date] = datetime.now().date()


# this will be used to validate data while creating a Job
class ProposalsCreate(ProposalsBase):
    product_name: str
    contact: str
    location: str
    description: str
    quantity: int


# this will be used to format the response to not to have id,owner_id etc
class ShowProposals(ProposalsBase):
    product_name: str
    contact: str
    quantity: int
    location: str
    date_posted: date
    description: Optional[str]
    owner_id: int

    class Config:  # to convert non dict obj to json
        orm_mode = True
