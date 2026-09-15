import os
from dotenv import load_dotenv
import psycopg2

load_dotenv()

DATABASE_URL = os.environ["DATABASE_URL"]

try:
    conexao = psycopg2.connect(DATABASE_URL)
    print("Conectado no banco da Render com sucesso!")

    cursor = conexao.cursor()
    cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public';")
    print("Tabelas encontradas:", cursor.fetchall())

    cursor.close()
    conexao.close()
except Exception as e:
    print("Erro:", e)