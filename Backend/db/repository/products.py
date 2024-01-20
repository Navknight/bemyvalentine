from db.models.products import Proposals
from schemas.proposals import ProposalsCreate
from sqlalchemy.orm import Session


def create_new_proposals(propsal: ProposalsCreate, db: Session, owner_id: int):
    proposal_object = Proposals(**propsal.model_dump(), owner_id=owner_id)
    db.add(proposal_object)
    db.commit()
    db.refresh(proposal_object)
    return proposal_object


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
