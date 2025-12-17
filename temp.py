import pyodbc 

conn = pyodbc.connect(
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=localhost;"
    "Database=EMS;"
    "Trusted_Connection=yes;"
)
cursor = conn.cursor()
sql = "Select * from users where id = 1"

cursor.execute(sql)
res = cursor.fetchone()
print(res[2])