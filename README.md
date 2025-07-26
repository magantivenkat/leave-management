Steps to run the app: 

1. git clone https://github.com/magantivenkat/leave-management.git
2. Backend - go to LMS folder and run the solution in visual studio
3. Run entity framework migrations
   
     1. dotnet ef migrations add "initial migration" 
     2. dotnet ef database update

     Admin - This user will be created when you run the backend app
     1. Username – admin 
     2. Password - Admin123!
   
5. Frontend - cd to LeaveManagement.UI.Angular -> npm run start
6. Create Employee user by Register
7. Login and test the app


