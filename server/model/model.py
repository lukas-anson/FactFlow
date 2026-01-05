from typing import List, Optional
from datetime import datetime
from sqlalchemy import ForeignKey, String, CheckConstraint
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "user"
      
    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(30))
    last_name: Mapped[str] = mapped_column(String(30))
    email: Mapped[str] = mapped_column(String(255), unique=True)
    username: Mapped[str] = mapped_column(String(20), unique=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    comment_count: Mapped[int] = mapped_column(default=0)
    like_count: Mapped[int] = mapped_column(default=0)
    view_count: Mapped[int] = mapped_column(default=0)
    
    comments: Mapped[List["Comment"]] = relationship(
        back_populates="user", 
        cascade="all, delete-orphan"
    )

    saved_cards: Mapped[List["Card"]] = relationship(
        secondary="user_saved_card",
        back_populates="saved_by_users"
    )

    preferences: Mapped[List["UserPreference"]] = relationship(
        back_populates="user"
    )

    
    def __repr__(self) -> str:
        return f"User(id={self.id!r}, first_name={self.first_name!r}, last_name={self.last_name!r}, username={self.username!r})"

class Card(Base):
    __tablename__ = "card"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(25))
    short_description: Mapped[str] = mapped_column(String(60))
    long_description: Mapped[str] = mapped_column(String(300))
    image_url: Mapped[str] = mapped_column()
    category: Mapped[str] = mapped_column()
    created: Mapped[datetime] = mapped_column()
    like_count: Mapped[int] = mapped_column(default=0)
    view_count: Mapped[int] = mapped_column(default=0)

    comments: Mapped[List["Comment"]] = relationship(
        back_populates="card",
        cascade="all, delete-orphan"
    )

    saved_by_users: Mapped[List["User"]] = relationship(
        secondary="user_saved_card",
        back_populates="saved_cards"
    )

    def __repr__(self) -> str:
        return f"Card(id={self.id!r}, title={self.title!r})"
    
class Comment(Base):
    __tablename__ = "comment"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    card_id: Mapped[int] = mapped_column(ForeignKey("card.id"))
    comment: Mapped[str] = mapped_column(String(100))
    created: Mapped[datetime] = mapped_column()

    user: Mapped["User"] = relationship(
        foreign_keys=[user_id],
        back_populates="comments",
    )

    card: Mapped["Card"] = relationship(
        foreign_keys=[card_id],
        back_populates="comments",
    )

    def __repr__(self) -> str:
        return f"Comment(id={self.id!r}, user_id={self.user_id!r}, card_id={self.card_id!r})"


class ViewHistory(Base):
    __tablename__ = 'view_history'

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), primary_key=True)
    card_id: Mapped[int] = mapped_column(ForeignKey("card.id"), primary_key=True)

    def __repr__(self) -> str:
        return f"ViewHistory(user_id={self.user_id!r}, card_id={self.card_id!r})"


class SavedCard(Base):
    __tablename__ = 'user_saved_card'

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), primary_key=True)
    card_id: Mapped[int] = mapped_column(ForeignKey("card.id"), primary_key=True)

    def __repr__(self) -> str:
        return f"SavedCards(user_id={self.user_id!r}, card_id={self.card_id!r})"

class UserPreference(Base):
    __tablename__ = 'user_preference'

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), primary_key=True)
    category: Mapped[str] = mapped_column(primary_key=True)
    weight: Mapped[int] = mapped_column()

    user: Mapped["User"] = relationship(
        back_populates="preferences"
    )

    __table_args__ = (
        CheckConstraint("weight >= 0 AND weight <= 255", name="weight_range_check"),
    )

    def __repr__(self) -> str:
        return f"UserPreference(user_id={self.user_id!r}, category={self.category!r}, weight={self.weight!r})"