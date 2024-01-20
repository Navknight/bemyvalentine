from db.base_class import Base
from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import Date
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import relationship


class Proposals(Base):
    id = Column(Integer, primary_key=True, index=True)
    by = Column(String, nullable=False)
    to = Column(String, nullable=False)
    message = Column(String, nullable=False)
    owner_id = Column(Integer, ForeignKey("user.id"))
    owner = relationship("User", back_populates="proposals")
