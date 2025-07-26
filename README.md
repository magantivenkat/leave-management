Steps to run the app: 

1. git clone https://github.com/magantivenkat/leave-management.git
2. Backend - go to LMS folder and run solution in visual studio
3. Run entity framework migrations
   
     dotnet ef migrations add "initial migration" 
     dotnet ef database update

     Admin - This will be created when you run the backend app
     Username – admin 
     Password - Admin123!
   
5. Frontend - cd to LeaveManagement.UI.Angular -> npm run start
6. Create Employee user by Register
7. Login and test the app


