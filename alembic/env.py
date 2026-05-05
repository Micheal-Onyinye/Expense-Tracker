import os
from logging.config import fileConfig
from sqlalchemy import create_engine, pool
from alembic import context

# Import your models and metadata
from app.database import Base
from app.models import User, Expense, MonthlyReport  

config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata

def get_url():
    url = os.environ.get("DATABASE_URL")
    if not url:
        from app.database import DATABASE_URL
        url = DATABASE_URL
    if url and url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)
    return url

def run_migrations_online() -> None:
    # We use create_engine directly to bypass configparser interpolation issues (%)
    connectable = create_engine(get_url(), poolclass=pool.NullPool)

    with connectable.connect() as connection:
        context.configure(
            connection=connection, 
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    context.configure(url=get_url(), target_metadata=target_metadata, literal_binds=True)
    with context.begin_transaction():
        context.run_migrations()
else:
    run_migrations_online()
