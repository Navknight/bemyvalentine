from apis.version1.route_login import get_current_user_from_token
from db.models.users import User
from db.repository.proposals import create_new_proposals
from db.repository.proposals import delete_proposals_by_id
from db.repository.proposals import retreive_proposal
from db.session import get_db
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from schemas.proposals import ProposalsCreate
from schemas.proposals import ShowProposals
from schemas.users import ShowUser
from sqlalchemy.orm import Session

router = APIRouter()

# returns all the info about the logged in user (except hashed password)
@router.post("/profile/", response_model=ShowUser)
def profile(
    current_user: User = Depends(get_current_user_from_token),):
    return current_user

# creates a new proposal and returns the proposal info
@router.post("/create-proposal/", response_model=ShowProposals)
def create_proposal(
    proposal: ProposalsCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_from_token),
):
    proposal = create_new_proposals(propsal=proposal, db=db, owner_id=current_user.id)
    return proposal


@router.get("/get-propsal/{id}", response_model=ShowProposals
)  # if we keep just "{id}" . it would stat catching all routes
def read_proposal(id: int, db: Session = Depends(get_db)):
    proposal = retreive_proposal(id=id, db=db)
    if not proposal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Proposal with this id {id} does not exist",
        )
    return proposal


@router.delete("/delete/{id}")
def delete_proposal(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_from_token),
):
    proposal = retreive_proposal(id=id, db=db)
    if not proposal:
        return HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Proposal with id {id} does not exist",
        )
    print(proposal.owner_id, current_user.id, current_user.is_superuser)
    if proposal.owner_id == current_user.id or current_user.is_superuser:
        delete_proposals_by_id(id=id, db=db, owner_id=current_user.id)
        return {"detail": "Successfully deleted."}
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authorized"
    )

