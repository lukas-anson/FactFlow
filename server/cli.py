# server/cli.py
import asyncio
import typer

app = typer.Typer()

# python -m server.cli reset-db
@app.command()
def reset_db():
    """Reset the database (drops and recreates all tables)"""
    from server.database import drop_db_and_tables, create_db_and_tables
    
    if typer.confirm("This will delete all data. Continue?"):
        asyncio.run(drop_db_and_tables())
        asyncio.run(create_db_and_tables())
        typer.echo("Database reset complete!")
    else:
        typer.echo("Cancelled.")

if __name__ == "__main__":
    app()