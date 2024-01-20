from datetime import date
from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class ProposalsBase(BaseModel):
    by: str
    to: str
    message: str

class ProposalsCreate(ProposalsBase):
    by: str
    to: str
    message: str

class ShowProposals(ProposalsBase):
    by: str
    to: str
    message: str
    owner_id: int

    class Config:  # to convert non dict obj to json
        from_attributes = True
