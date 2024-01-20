from db.models.products import Proposals
from schemas.proposals import ProposalsCreate
from sqlalchemy.orm import Session


def create_new_proposals(job: ProposalsCreate, db: Session, owner_id: int):
    job_object = Proposals(**job.dict(), owner_id=owner_id)
    db.add(job_object)
    db.commit()
    db.refresh(job_object)
    return job_object


def retreive_proposal(id: int, db: Session):
    item = db.query(Proposals).filter(Proposals.id == id).first()
    return item


def delete_proposals_by_id(id: int, db: Session, owner_id):
    existing_job = db.query(Proposals).filter(Proposals.id == id)
    if not existing_job.first():
        return 0
    existing_job.delete(synchronize_session=False)
    db.commit()
    return 1
